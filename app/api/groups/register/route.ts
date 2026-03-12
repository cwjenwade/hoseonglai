import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ message: "Supabase 環境變數未設定" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("GROUP_REGISTRATION_ERROR", error);
    return NextResponse.json({ message: "系統錯誤" }, { status: 500 });
  }
}
