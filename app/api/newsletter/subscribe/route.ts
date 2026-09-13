import { NextRequest, NextResponse } from "next/server";
import { enforceRateLimit, getRequestIp } from "@/lib/rate-limit";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const rateLimit = await enforceRateLimit({
      scope: "newsletter_subscribe",
      identifier: getRequestIp(req),
      maxRequests: 5,
      windowMs: 15 * 60 * 1000,
    });

    if (!rateLimit.ok) {
      return NextResponse.json(
        { message: "請稍後再試，訂閱過於頻繁。" },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
      );
    }

    const body = await req.json() as { email?: unknown; name?: unknown };
    const email = String(body.email || "").trim().toLowerCase();
    const name = String(body.name || "").trim();
    if (!EMAIL_PATTERN.test(email) || email.length > 254 || name.length > 120) {
      return NextResponse.json({ message: "請提供有效的 Email" }, { status: 400 });
    }

    const { error } = await getSupabaseAdminClient()
      .from("newsletter_subscribers")
      .upsert({ email, name: name || null }, { onConflict: "email" });
    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("NEWSLETTER_SUBSCRIBE_ERROR", error);
    return NextResponse.json({ message: "目前無法完成訂閱，請稍後再試。" }, { status: 500 });
  }
}
