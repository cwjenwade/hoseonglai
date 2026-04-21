"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { enforceRateLimit, getIpFromHeaders } from "@/lib/rate-limit";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import {
  clearLocalAdminPreviewSession,
  isLocalAdminPreviewRequest,
  setLocalAdminPreviewSession,
} from "./local-preview-auth";

export type AdminLoginState = {
  ok: boolean;
  message?: string;
};

export async function adminLogin(
  _prevState: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  const requestHeaders = await headers();
  const rateLimit = await enforceRateLimit({
    scope: "admin_login",
    identifier: getIpFromHeaders(requestHeaders),
    maxRequests: 8,
    windowMs: 15 * 60 * 1000,
  });

  if (!rateLimit.ok) {
    return { ok: false, message: "登入嘗試過於頻繁，請稍後再試" };
  }

  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "").trim();

  if (!email || !password) {
    return { ok: false, message: "請輸入 Email 與密碼" };
  }

  if (email === "admin" && password === "admin") {
    if (!(await isLocalAdminPreviewRequest())) {
      return { ok: false, message: "localhost 預覽登入只允許在本機使用" };
    }

    await setLocalAdminPreviewSession();
    redirect("/admin/dashboard/content?module=home&item=home");
  }

  const supabase = await getSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { ok: false, message: error.message };
  }

  redirect("/admin/dashboard");
}

export async function adminLogout() {
  await clearLocalAdminPreviewSession();
  const supabase = await getSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin");
}
