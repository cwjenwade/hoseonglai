import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ shortCode: string }> }
) {
  const { shortCode } = await params;

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { message: "Server error" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data, error } = await supabase
      .from("url_shortcuts")
      .select("long_url")
      .eq("short_code", shortCode)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { message: "短連結無效或已失效" },
        { status: 404 }
      );
    }

    // 重定向到原始 URL
    return NextResponse.redirect(data.long_url, { status: 301 });
  } catch (error) {
    console.error("SHORT_URL_REDIRECT_ERROR", error);
    return NextResponse.json(
      { message: "無法處理此短連結" },
      { status: 500 }
    );
  }
}
