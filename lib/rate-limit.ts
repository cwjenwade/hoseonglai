import "server-only";

import type { NextRequest } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";

type RateLimitOptions = {
  scope: string;
  identifier: string;
  maxRequests: number;
  windowMs: number;
};

type RateLimitRecord = {
  id: string;
  count: number;
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

function shouldFailOpen(message: string): boolean {
  const normalized = message.toLowerCase();
  return (
    normalized.includes("request_rate_limits") &&
    (normalized.includes("schema cache") ||
      normalized.includes("relation") ||
      normalized.includes("does not exist") ||
      normalized.includes("could not find the table"))
  );
}

function buildFailOpenResult(
  maxRequests: number,
  retryAfterSeconds: number
): RateLimitResult {
  return {
    ok: true,
    remaining: Math.max(0, maxRequests - 1),
    retryAfterSeconds,
  };
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

  const { data: existing, error: readError } = await supabase
    .from("request_rate_limits")
    .select("id, count")
    .eq("scope", scope)
    .eq("identifier", identifier)
    .eq("window_start", windowStart)
    .maybeSingle();

  if (readError) {
    if (shouldFailOpen(readError.message)) {
      console.warn(`RATE_LIMIT_DISABLED:${readError.message}`);
      return buildFailOpenResult(maxRequests, retryAfterSeconds);
    }

    throw new Error(`RATE_LIMIT_READ_FAILED:${readError.message}`);
  }

  const row = existing as RateLimitRecord | null;

  if (!row) {
    const { error: insertError } = await supabase
      .from("request_rate_limits")
      .insert({
        scope,
        identifier,
        window_start: windowStart,
        count: 1,
        expires_at: new Date(Date.parse(windowStart) + windowMs).toISOString(),
      });

    if (insertError) {
      if (shouldFailOpen(insertError.message)) {
        console.warn(`RATE_LIMIT_DISABLED:${insertError.message}`);
        return buildFailOpenResult(maxRequests, retryAfterSeconds);
      }

      throw new Error(`RATE_LIMIT_INSERT_FAILED:${insertError.message}`);
    }

    return {
      ok: true,
      remaining: Math.max(0, maxRequests - 1),
      retryAfterSeconds,
    };
  }

  if (row.count >= maxRequests) {
    return {
      ok: false,
      remaining: 0,
      retryAfterSeconds,
    };
  }

  const nextCount = row.count + 1;
  const { error: updateError } = await supabase
    .from("request_rate_limits")
    .update({
      count: nextCount,
      updated_at: new Date().toISOString(),
    })
    .eq("id", row.id);

  if (updateError) {
    if (shouldFailOpen(updateError.message)) {
      console.warn(`RATE_LIMIT_DISABLED:${updateError.message}`);
      return buildFailOpenResult(maxRequests, retryAfterSeconds);
    }

    throw new Error(`RATE_LIMIT_UPDATE_FAILED:${updateError.message}`);
  }

  return {
    ok: true,
    remaining: Math.max(0, maxRequests - nextCount),
    retryAfterSeconds,
  };
}
