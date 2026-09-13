import "server-only";

import type { NextRequest } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";

type RateLimitOptions = {
  scope: string;
  identifier: string;
  maxRequests: number;
  windowMs: number;
};

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

export function getIpFromHeaders(requestHeaders: Headers): string {
  const forwardedFor = requestHeaders.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }

  const realIp = requestHeaders.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  return "unknown";
}

function getWindowStart(windowMs: number): string {
  const timestamp = Math.floor(Date.now() / windowMs) * windowMs;
  return new Date(timestamp).toISOString();
}

export function getRequestIp(req: NextRequest): string {
  return getIpFromHeaders(req.headers);
}

export async function enforceRateLimit({
  scope,
  identifier,
  maxRequests,
  windowMs,
}: RateLimitOptions): Promise<RateLimitResult> {
  const supabase = getSupabaseAdminClient();
  const windowStart = getWindowStart(windowMs);
  const retryAfterSeconds = Math.max(1, Math.ceil(windowMs / 1000));

  const { data, error } = await supabase.rpc("consume_rate_limit", {
    p_scope: scope,
    p_identifier: identifier,
    p_window_start: windowStart,
    p_expires_at: new Date(Date.parse(windowStart) + windowMs).toISOString(),
    p_max_requests: maxRequests,
  });

  if (error) {
    throw new Error(`RATE_LIMIT_RPC_FAILED:${error.message}`);
  }

  const result = Array.isArray(data) ? data[0] : null;
  if (!result || typeof result.allowed !== "boolean") {
    throw new Error("RATE_LIMIT_RPC_INVALID_RESPONSE");
  }

  return {
    ok: result.allowed,
    remaining: Math.max(0, Number(result.remaining) || 0),
    retryAfterSeconds,
  };
}
