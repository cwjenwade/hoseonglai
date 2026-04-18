import { NextRequest, NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import crypto from "crypto";
import { sendResearchJoinEmail } from "@/lib/email";
import { signResearchToken } from "@/lib/research-token";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";
import { enforceRateLimit, getRequestIp } from "@/lib/rate-limit";
import type {
  ProjectContactVisibility,
  ResearchProjectStatus,
} from "@/app/collaborative-prosperity/projects";

type JoinPayload = {
  projectId: string;
  projectTitle: string;
  projectStatus?: ResearchProjectStatus;
  projectTestUrl?: string;
  nickname?: string;
  age?: number;
  email: string;
  consentAccepted?: boolean;
  directStart?: boolean;
  contactVisibility?: ProjectContactVisibility;
  acceptDeferred?: boolean;
  deferredPreference?: "tomorrow" | "day_after";
};

type RegistrationKind =
  | "waiting_list"
  | "quantitative_enroll"
  | "qualitative_enroll";

type RegistrationMeta = {
  participantCode?: string;
  projectId: string;
  projectStatus: ResearchProjectStatus;
  registrationKind: RegistrationKind;
  age?: number;
  consentAccepted: boolean;
  contactVisibility: ProjectContactVisibility;
  emailStatus?: "sent" | "queued" | "not_sent";
  deliveryMode: "direct" | "email" | "not_applicable";
  deferredPreference?: "tomorrow" | "day_after";
};

function getProjectStatus(
  value: string | undefined,
): ResearchProjectStatus {
  if (value === "preparing" || value === "qualitative") {
    return value;
  }

  return "quantitative";
}

function getContactVisibility(
  status: ResearchProjectStatus,
  value?: string,
): ProjectContactVisibility {
  if (value === "share_with_pi") {
    return "share_with_pi";
  }

  if (value === "admin_only") {
    return "admin_only";
  }

  return status === "qualitative" ? "share_with_pi" : "admin_only";
}

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
    const ip = getRequestIp(req);
    const rateLimit = await enforceRateLimit({
      scope: "research_join",
      identifier: ip,
      maxRequests: 20,
      windowMs: 15 * 60 * 1000,
    });

    if (!rateLimit.ok) {
      return NextResponse.json(
        { message: "請稍後再試，送出過於頻繁。" },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfterSeconds),
          },
        },
      );
    }

    const body = (await req.json()) as JoinPayload;

    const {
      projectId,
      projectTitle,
      projectTestUrl,
      nickname,
      age,
      email,
      consentAccepted,
      directStart,
      contactVisibility: requestedVisibility,
      acceptDeferred,
      deferredPreference,
    } = body;

    const projectStatus = getProjectStatus(body.projectStatus);
    const contactVisibility = getContactVisibility(
      projectStatus,
      requestedVisibility,
    );

    if (!projectId || !projectTitle || !email) {
      return NextResponse.json(
        { message: "缺少必要欄位" },
        { status: 400 }
      );
    }

    if (projectStatus !== "preparing" && !nickname) {
      return NextResponse.json(
        { message: "缺少必要欄位" },
        { status: 400 }
      );
    }

    if (
      projectStatus !== "preparing" &&
      (!Number.isFinite(age) || Number(age) < 10 || Number(age) > 120)
    ) {
      return NextResponse.json(
        { message: "年齡格式不正確" },
        { status: 400 }
      );
    }

    if (
      projectStatus !== "preparing" &&
      !consentAccepted
    ) {
      return NextResponse.json(
        { message: "請先閱讀文件並同意研究流程" },
        { status: 400 }
      );
    }

    if (projectStatus === "quantitative" && !projectTestUrl) {
      return NextResponse.json(
        { message: "量化研究尚未設定測驗路徑" },
        { status: 400 }
      );
    }

    try {
      const supabase = getSupabaseAdminClient();
      const supabaseAdmin: SupabaseClient | null = supabase;

      const normalizedEmail = email.trim().toLowerCase();
      const participantCode =
        projectStatus === "preparing"
          ? undefined
          : generateParticipantCode(normalizedEmail);

      const baseInsertPayload = {
        video_url:
          projectTestUrl || `/collaborative-prosperity/${encodeURIComponent(projectId)}`,
        video_title: projectTitle,
        user_name:
          projectStatus === "preparing" ? "Waiting List" : String(nickname || "").trim(),
        user_email: normalizedEmail,
      };

      if (projectStatus === "preparing") {
        const meta: RegistrationMeta = {
          projectId,
          projectStatus,
          registrationKind: "waiting_list",
          consentAccepted: false,
          contactVisibility,
          deliveryMode: "not_applicable",
        };

        const { error: insertError } = await supabase
          .from("research_registrations")
          .insert({
            ...baseInsertPayload,
            interest_note: JSON.stringify(meta),
          });

        if (insertError) {
          console.error("RESEARCH_WAITING_LIST_INSERT_ERROR", insertError);
          return NextResponse.json(
            { message: "目前無法儲存 waiting list 資料，請稍後再試。" },
            { status: 500 }
          );
        }

        return NextResponse.json({
          ok: true,
          waitingList: true,
        });
      }

      const dailyLimit = Number(process.env.RESEARCH_DAILY_EMAIL_LIMIT || 400);
      const todayStart = getTaipeiDayStartISO();
      const shouldSendEmail =
        projectStatus === "quantitative" && !directStart;
      let todaySentCount = 0;
      let emailStatus: RegistrationMeta["emailStatus"] =
        directStart ? "not_sent" : undefined;

      if (shouldSendEmail) {
        const { count, error: countError } = await supabase
          .from("research_registrations")
          .select("id", { count: "exact", head: true })
          .gte("created_at", todayStart)
          .like("interest_note", `%\"emailStatus\":\"sent\"%`);

        if (countError) {
          console.error("RESEARCH_EMAIL_COUNT_ERROR", countError);
        }

        todaySentCount = count || 0;
        const limitReached = todaySentCount >= dailyLimit;

        if (limitReached && !acceptDeferred) {
          return NextResponse.json(
            {
              code: "EMAIL_QUOTA_REACHED",
              sentToday: todaySentCount,
              dailyLimit,
              message:
                "今日研究信件額度已滿。是否願意改為明日或後日寄送同意書連結？",
            },
            { status: 429 }
          );
        }

        emailStatus = limitReached ? "queued" : "sent";
      }

      const meta: RegistrationMeta = {
        participantCode,
        projectId,
        projectStatus,
        registrationKind:
          projectStatus === "qualitative"
            ? "qualitative_enroll"
            : "quantitative_enroll",
        age: Number(age),
        consentAccepted: true,
        contactVisibility,
        emailStatus,
        deliveryMode: shouldSendEmail ? "email" : "direct",
        deferredPreference:
          emailStatus === "queued" ? deferredPreference || "tomorrow" : undefined,
      };

      const { data: registrationRow, error: insertError } = await supabase
        .from("research_registrations")
        .insert({
          ...baseInsertPayload,
          interest_note: JSON.stringify(meta),
        })
        .select("id")
        .single();

      if (insertError || !registrationRow?.id) {
        console.error("RESEARCH_REGISTRATION_INSERT_ERROR", insertError);
        return NextResponse.json(
          { message: "目前無法儲存報名資料，請稍後再試。" },
          { status: 500 }
        );
      }

      if (projectStatus === "qualitative") {
        return NextResponse.json({
          ok: true,
          participantCode,
          message: "質性研究報名已完成。",
        });
      }

      if (shouldSendEmail && emailStatus === "queued") {
        return NextResponse.json({
          ok: true,
          queued: true,
          participantCode,
          sentToday: todaySentCount || 0,
          dailyLimit,
          message:
            (deferredPreference || "tomorrow") === "day_after"
              ? "已登記後日寄送同意書信件。"
              : "已登記明日寄送同意書信件。",
        });
      }

      let token = "";
      try {
        token = signResearchToken({
          registrationId: String(registrationRow.id),
          projectId,
          participantCode: String(participantCode),
        });
      } catch (tokenError) {
        console.error("RESEARCH_TOKEN_SIGN_ERROR", tokenError);
        const message = tokenError instanceof Error ? tokenError.message : "token_sign_failed";
        if (message.includes("Missing RESEARCH_TOKEN_SECRET")) {
          return NextResponse.json(
            { message: "系統尚未完成安全設定（缺少 RESEARCH_TOKEN_SECRET），請通知管理員。" },
            { status: 500 },
          );
        }

        return NextResponse.json(
          { message: "目前無法建立驗證連結，請稍後再試。" },
          { status: 500 },
        );
      }

      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
      const startUrl = `${siteUrl}/collaborative-prosperity/start?token=${encodeURIComponent(
        token
      )}`;

      if (directStart) {
        return NextResponse.json({
          ok: true,
          participantCode,
          startUrl,
          emailSent: false,
          deliveryMode: "direct",
        });
      }

      const linkCode = generateLinkCode(normalizedEmail, projectId);
      const shortUrl = await shortenUrl(startUrl, linkCode, supabaseAdmin ?? supabase);

      let emailSent = true;
      try {
        await sendResearchJoinEmail({
          to: normalizedEmail,
          name: String(nickname || ""),
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
    } catch (adminClientError) {
      console.warn("SUPABASE_ADMIN_CLIENT_NOT_CONFIGURED", adminClientError);
      return NextResponse.json(
        { message: "Supabase 管理端環境變數未設定" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("JOIN_RESEARCH_ERROR", error);

    return NextResponse.json(
      { message: "目前系統忙碌，請稍後再試。" },
      { status: 500 }
    );
  }
}
