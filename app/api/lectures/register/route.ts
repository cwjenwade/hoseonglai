import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendLectureRegistrationEmail } from "@/lib/email";

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

export async function POST(req: NextRequest) {
  try {
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

    if (!lectureId || !lectureTitle || !name?.trim() || !email?.trim() || !phone?.trim()) {
      return NextResponse.json({ message: "缺少必要欄位" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ message: "Supabase 環境變數未設定" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { error: insertError } = await supabase.from("lecture_registrations").insert({
      lecture_id: lectureId,
      lecture_title: lectureTitle,
      user_name: name.trim(),
      user_email: email.trim().toLowerCase(),
      user_phone: phone.trim(),
    });

    if (insertError) {
      console.error("LECTURE_REGISTRATION_INSERT_ERROR", insertError);
      return NextResponse.json({ message: "無法儲存報名資料" }, { status: 500 });
    }

    try {
      await sendLectureRegistrationEmail({
        to: email.trim().toLowerCase(),
        name: name.trim(),
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
