"use client";

import { useEffect } from "react";

const KEEP_ALIVE_INTERVAL_MS = 10 * 60 * 1000;

export default function SupabaseKeepAlive() {
  useEffect(() => {
    let cancelled = false;

    const ping = async () => {
      if (cancelled) return;
      try {
        await fetch("/api/supabase-keepalive", {
          method: "GET",
          cache: "no-store",
        });
      } catch {
        // keep-alive should be silent
      }
    };

    void ping();
    const timer = window.setInterval(() => {
      void ping();
    }, KEEP_ALIVE_INTERVAL_MS);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  return null;
}
