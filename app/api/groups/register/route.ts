import { NextRequest, NextResponse } from "next/server";
import { sendGroupRegistrationEmail } from "@/lib/email";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";

type GroupRegisterPayload = {
  groupSlug: string;
  groupTitle: string;
  name: string;
  email: string;
  phone: string;
  note?: string;
  availabilitySlots: string[];
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as GroupRegisterPayload;
    const {
      groupSlug,
      groupTitle,
      name,
      email,
      phone,
      note,
      availabilitySlots,
    } = body;

    if (!groupSlug || !groupTitle || !name?.trim() || !email?.trim() || !phone?.trim()) {
      return NextResponse.json({ message: "缺少必要欄位" }, { status: 400 });
    }

    if (!Array.isArray(availabilitySlots) || availabilitySlots.length < 3 || availabilitySlots.length > 5) {
      return NextResponse.json({ message: "請提供 3 至 5 個訪談時段" }, { status: 400 });
    }

    const supabase = getSupabaseAdminClient();

    const { error } = await supabase.from("group_registrations").insert({
      group_slug: groupSlug,
      group_title: groupTitle,
      user_name: name.trim(),
      user_email: email.trim().toLowerCase(),
      user_phone: phone.trim(),
      note: note?.trim() || null,
      availability_slots: availabilitySlots,
    });

    if (error) {
      console.error("GROUP_REGISTRATION_INSERT_ERROR", error);
      return NextResponse.json({ message: "無法儲存報名資料" }, { status: 500 });
    }

    try {
      await sendGroupRegistrationEmail({
        to: email.trim().toLowerCase(),
        name: name.trim(),
        groupTitle,
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
