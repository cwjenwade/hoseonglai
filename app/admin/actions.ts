"use server";

import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase-server";

export type AdminLoginState = {
  ok: boolean;
  message?: string;
};

export async function adminLogin(
  _prevState: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "").trim();

  if (!email || !password) {
    return { ok: false, message: "請輸入 Email 與密碼" };
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
  const supabase = await getSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin");
}
