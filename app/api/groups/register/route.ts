import { NextRequest, NextResponse } from "next/server";
import { sendGroupRegistrationEmail } from "@/lib/email";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";
import { enforceRateLimit, getRequestIp } from "@/lib/rate-limit";

type GroupRegisterPayload = {
  groupSlug: string;
  groupTitle: string;
  name: string;
  email: string;
  phone: string;
  note?: string;
  consultationSlots: string[];
  availabilitySlots: string[];
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const ip = getRequestIp(req);
    const rateLimit = await enforceRateLimit({
      scope: "group_register",
      identifier: ip,
      maxRequests: 10,
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

    const body = (await req.json()) as GroupRegisterPayload;
    const {
      groupSlug,
      groupTitle,
      name,
      email,
      phone,
      note,
      consultationSlots,
      availabilitySlots,
    } = body;

    const normalizedEmail = String(email || "").trim().toLowerCase();
    const normalizedName = String(name || "").trim();
    const normalizedPhone = String(phone || "").trim();
    const normalizedNote = String(note || "").trim();
    if (!groupSlug || !groupTitle || !normalizedName || !normalizedPhone || !EMAIL_PATTERN.test(normalizedEmail)) {
      return NextResponse.json({ message: "缺少必要欄位" }, { status: 400 });
    }
    if (String(groupSlug).length > 120 || String(groupTitle).length > 200 || normalizedName.length > 120 || normalizedEmail.length > 254 || normalizedPhone.length > 40 || normalizedNote.length > 4000) {
      return NextResponse.json({ message: "欄位長度不正確" }, { status: 400 });
    }

    if (!Array.isArray(consultationSlots) || consultationSlots.length < 2 || consultationSlots.length > 4) {
      return NextResponse.json({ message: "請提供 2 至 4 個初談時段" }, { status: 400 });
    }

    if (!Array.isArray(availabilitySlots) || availabilitySlots.length < 1 || availabilitySlots.length > 5) {
      return NextResponse.json({ message: "請提供 1 至 5 個團體可參與時段" }, { status: 400 });
    }

    const supabase = getSupabaseAdminClient();

    const { error } = await supabase.from("group_registrations").insert({
      group_slug: groupSlug,
      group_title: groupTitle,
      user_name: normalizedName,
      user_email: normalizedEmail,
      user_phone: normalizedPhone,
      note: normalizedNote || null,
      consultation_slots: consultationSlots,
      availability_slots: availabilitySlots,
    });

    if (error) {
      console.error("GROUP_REGISTRATION_INSERT_ERROR", error);
      return NextResponse.json({ message: "無法儲存報名資料" }, { status: 500 });
    }

    try {
      await sendGroupRegistrationEmail({
        to: normalizedEmail,
        name: normalizedName,
        groupTitle,
        consultationSlots,
        availabilitySlots,
      });
    } catch (emailError) {
      console.error("GROUP_REGISTRATION_EMAIL_ERROR", emailError);
      return NextResponse.json({
        ok: true,
        emailSent: false,
        message: "報名成功，但確認信寄送失敗。",
      });
    }

    return NextResponse.json({ ok: true, emailSent: true });
  } catch (error) {
    console.error("GROUP_REGISTRATION_ERROR", error);
    return NextResponse.json({ message: "系統錯誤" }, { status: 500 });
  }
}
