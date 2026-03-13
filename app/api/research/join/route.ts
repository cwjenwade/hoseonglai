import { NextRequest, NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import crypto from "crypto";
import { sendResearchJoinEmail } from "@/lib/email";
import { signResearchToken } from "@/lib/research-token";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";

type JoinPayload = {
  projectId: string;
  projectTitle: string;
  projectTestUrl: string;
  nickname: string;
  age: number;
  email: string;
  acceptDeferred?: boolean;
  deferredPreference?: "tomorrow" | "day_after";
};

type RegistrationMeta = {
  participantCode: string;
  projectId: string;
  age: number;
  emailStatus: "sent" | "queued";
  deferredPreference?: "tomorrow" | "day_after";
};

function getTaipeiDayStartISO() {
  const now = new Date();
  const taipeiDate = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Taipei" })
  );
  taipeiDate.setHours(0, 0, 0, 0);
  return taipeiDate.toISOString();
}

function generateLinkCode(email: string, projectId: string): string {
  const normalized = `${email.trim().toLowerCase()}::${projectId}`;
  const digest = crypto.createHash("sha256").update(normalized).digest("hex");
  return `r${digest.slice(0, 11)}`;
}

async function shortenUrl(
  longUrl: string,
  shortCode: string,
  supabase: SupabaseClient
): Promise<string> {
  try {
    const { error } = await supabase.from("url_shortcuts").upsert({
      short_code: shortCode,
      long_url: longUrl,
      expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
    }, {
      onConflict: "short_code",
    });

    if (error) {
      console.warn("SHORTEN_URL_DB_ERROR", error);
      try {
        const fallbackRes = await fetch(
          `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`
        );
        const fallbackShortUrl = (await fallbackRes.text()).trim();
        if (fallbackShortUrl.startsWith("http")) return fallbackShortUrl;
      } catch (fallbackError) {
        console.warn("SHORTEN_URL_FALLBACK_ERROR", fallbackError);
      }
      return longUrl;
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    return `${siteUrl}/r/${shortCode}`;
  } catch (error) {
    console.warn("URL_SHORTEN_ERROR", error);
    return longUrl;
  }
}

function generateParticipantCode(email: string): string {
  const normalized = email.trim().toLowerCase();
  const digest = crypto.createHash("sha256").update(normalized).digest("hex");
  return `R-${digest.slice(0, 10).toUpperCase()}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as JoinPayload;

    const {
      projectId,
      projectTitle,
      projectTestUrl,
      nickname,
      age,
      email,
      acceptDeferred,
      deferredPreference,
    } = body;

    if (!projectId || !projectTitle || !projectTestUrl || !nickname || !email) {
      return NextResponse.json(
        { message: "缺少必要欄位" },
        { status: 400 }
      );
    }

    if (!Number.isFinite(age) || age < 10 || age > 120) {
      return NextResponse.json(
        { message: "年齡格式不正確" },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { message: "Supabase 環境變數未設定" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    let supabaseAdmin: SupabaseClient | null = null;

    try {
      supabaseAdmin = getSupabaseAdminClient();
    } catch (adminClientError) {
      console.warn("SUPABASE_ADMIN_CLIENT_NOT_CONFIGURED", adminClientError);
    }

    const normalizedEmail = email.trim().toLowerCase();
    const participantCode = generateParticipantCode(normalizedEmail);

    const dailyLimit = Number(process.env.RESEARCH_DAILY_EMAIL_LIMIT || 400);
    const todayStart = getTaipeiDayStartISO();
    const { count: todaySentCount, error: countError } = await supabase
      .from("research_registrations")
      .select("id", { count: "exact", head: true })
      .gte("created_at", todayStart)
      .like("interest_note", `%\"emailStatus\":\"sent\"%`);

    if (countError) {
      console.error("RESEARCH_EMAIL_COUNT_ERROR", countError);
    }

    const limitReached = (todaySentCount || 0) >= dailyLimit;

    if (limitReached && !acceptDeferred) {
      return NextResponse.json(
        {
          code: "EMAIL_QUOTA_REACHED",
          sentToday: todaySentCount || 0,
          dailyLimit,
          message:
            "今日研究信件額度已滿。是否願意改為明日或後日寄送同意書連結？",
        },
        { status: 429 }
      );
    }

    const finalDeferredPreference = deferredPreference || "tomorrow";
    const emailStatus: RegistrationMeta["emailStatus"] = limitReached
      ? "queued"
      : "sent";

    const meta: RegistrationMeta = {
      participantCode,
      projectId,
      age,
      emailStatus,
      deferredPreference: limitReached ? finalDeferredPreference : undefined,
    };

    const { error: insertError } = await supabase
      .from("research_registrations")
      .insert({
        video_url: projectTestUrl,
        video_title: projectTitle,
        user_name: nickname,
        user_email: normalizedEmail,
        interest_note: JSON.stringify(meta),
      });

    if (insertError) {
      console.error("RESEARCH_REGISTRATION_INSERT_ERROR", insertError);
      return NextResponse.json(
        { message: "目前無法儲存報名資料，請稍後再試。" },
        { status: 500 }
      );
    }

    if (emailStatus === "queued") {
      return NextResponse.json({
        ok: true,
        queued: true,
        participantCode,
        sentToday: todaySentCount || 0,
        dailyLimit,
        message:
          finalDeferredPreference === "day_after"
            ? "已登記後日寄送同意書信件。"
            : "已登記明日寄送同意書信件。",
      });
    }

    const token = signResearchToken({
      projectId,
      projectTitle,
      projectTestUrl,
      name: nickname,
      email: normalizedEmail,
      participantCode,
    });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const startUrl = `${siteUrl}/collaborative-prosperity/start?token=${encodeURIComponent(
      token
    )}`;

    const linkCode = generateLinkCode(normalizedEmail, projectId);
    const shortUrl = await shortenUrl(startUrl, linkCode, supabaseAdmin ?? supabase);

    let emailSent = true;
    try {
      await sendResearchJoinEmail({
        to: normalizedEmail,
        name: nickname,
        projectTitle,
        startUrl: shortUrl,
      });
    } catch (mailError) {
      emailSent = false;
      console.error("RESEARCH_JOIN_EMAIL_SEND_ERROR", mailError);
    }

    return NextResponse.json({
      ok: true,
      participantCode,
      sentToday: (todaySentCount || 0) + 1,
      dailyLimit,
      emailSent,
      shortUrl,
      startUrl,
      message: emailSent
        ? undefined
        : "報名已完成，但驗證信暫時寄送失敗，請使用備用連結或稍後再試。",
    });
  } catch (error) {
    console.error("JOIN_RESEARCH_ERROR", error);

    return NextResponse.json(
      { message: "目前無法寄送信件，請稍後再試。" },
      { status: 500 }
    );
  }
}