import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";
import { enforceRateLimit, getRequestIp } from "@/lib/rate-limit";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ shortCode: string }> }
) {
  const { shortCode } = await params;

  try {
    const ip = getRequestIp(_req);
    const rateLimit = await enforceRateLimit({
      scope: "short_url_redirect",
      identifier: ip,
      maxRequests: 120,
      windowMs: 15 * 60 * 1000,
    });

    if (!rateLimit.ok) {
      return NextResponse.json(
        { message: "請稍後再試，存取過於頻繁。" },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfterSeconds),
          },
        },
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const siteOrigin = new URL(siteUrl).origin;
    const supabase = getSupabaseAdminClient();

    const { data, error } = await supabase
      .from("url_shortcuts")
      .select("long_url, expires_at")
      .eq("short_code", shortCode)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { message: "短連結無效或已失效" },
        { status: 404 }
      );
    }

    if (data.expires_at && Date.now() > new Date(data.expires_at).getTime()) {
      return NextResponse.json(
        { message: "短連結已失效" },
        { status: 410 }
      );
    }

    const redirectUrl = new URL(data.long_url, siteOrigin);
    if (redirectUrl.origin !== siteOrigin) {
      return NextResponse.json(
        { message: "短連結目標無效" },
        { status: 400 }
      );
    }

    return NextResponse.redirect(redirectUrl.toString(), { status: 302 });
  } catch (error) {
    console.error("SHORT_URL_REDIRECT_ERROR", error);
    return NextResponse.json(
      { message: "無法處理此短連結" },
      { status: 500 }
    );
  }
}
