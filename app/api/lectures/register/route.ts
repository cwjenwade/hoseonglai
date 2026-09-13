import { NextRequest, NextResponse } from "next/server";
import { sendLectureRegistrationEmail } from "@/lib/email";
import { enforceRateLimit, getRequestIp } from "@/lib/rate-limit";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";

type RegisterPayload = {
  lectureId: string;
  lectureTitle: string;
  name: string;
  email: string;
  phone: string;
  dateLabel?: string;
  time?: string;
  location?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const ip = getRequestIp(req);
    const rateLimit = await enforceRateLimit({
      scope: "lecture_register",
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

    const body = (await req.json()) as RegisterPayload;
    const {
      lectureId,
      lectureTitle,
      name,
      email,
      phone,
      dateLabel,
      time,
      location,
    } = body;

    const normalizedEmail = String(email || "").trim().toLowerCase();
    const normalizedName = String(name || "").trim();
    const normalizedPhone = String(phone || "").trim();
    if (!lectureId || !lectureTitle || !normalizedName || !normalizedPhone || !EMAIL_PATTERN.test(normalizedEmail)) {
      return NextResponse.json({ message: "缺少必要欄位" }, { status: 400 });
    }
    if (String(lectureId).length > 120 || String(lectureTitle).length > 200 || normalizedName.length > 120 || normalizedEmail.length > 254 || normalizedPhone.length > 40) {
      return NextResponse.json({ message: "欄位長度不正確" }, { status: 400 });
    }

    const supabase = getSupabaseAdminClient();

    const { error: insertError } = await supabase.from("lecture_registrations").insert({
      lecture_id: lectureId,
      lecture_title: lectureTitle,
      user_name: normalizedName,
      user_email: normalizedEmail,
      user_phone: normalizedPhone,
    });

    if (insertError) {
      console.error("LECTURE_REGISTRATION_INSERT_ERROR", insertError);
      return NextResponse.json({ message: "無法儲存報名資料" }, { status: 500 });
    }

    try {
      await sendLectureRegistrationEmail({
        to: normalizedEmail,
        name: normalizedName,
        lectureTitle,
        dateLabel,
        time,
        location,
      });
    } catch (emailError) {
      console.error("LECTURE_REGISTRATION_EMAIL_ERROR", emailError);
      return NextResponse.json({
        ok: true,
        emailSent: false,
        message: "報名成功，但確認信寄送失敗。",
      });
    }

    return NextResponse.json({ ok: true, emailSent: true });
  } catch (error) {
    console.error("LECTURE_REGISTRATION_ERROR", error);
    return NextResponse.json({ message: "系統錯誤" }, { status: 500 });
  }
}
