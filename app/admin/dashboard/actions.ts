"use server";

import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase-server";

const DELETE_CONFIRM_CODE = "DELETETHESEDATA";

const ALLOWED_TABLES = new Set([
  "lecture_registrations",
  "group_registrations",
  "research_registrations",
  "psych_test_results",
]);

function toCsvList(value: FormDataEntryValue | null): string[] {
  if (!value) return [];
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function deleteProjectData(formData: FormData) {
  const tab = String(formData.get("tab") || "lectures");
  const table = String(formData.get("table") || "").trim();
  const projectKey = String(formData.get("projectKey") || "").trim();
  const confirmCode = String(formData.get("confirmCode") || "").trim();
  const ids = toCsvList(formData.get("ids"));

  if (!ALLOWED_TABLES.has(table)) {
    redirect(`/admin/dashboard?tab=${encodeURIComponent(tab)}&deleteError=invalid_table`);
  }

  if (!projectKey) {
    redirect(`/admin/dashboard?tab=${encodeURIComponent(tab)}&deleteError=missing_project`);
  }

  if (confirmCode !== DELETE_CONFIRM_CODE) {
    redirect(`/admin/dashboard?tab=${encodeURIComponent(tab)}&deleteError=invalid_code`);
  }

  if (ids.length === 0) {
    redirect(`/admin/dashboard?tab=${encodeURIComponent(tab)}&deleteError=empty_ids`);
  }

  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin");
  }

  const { data: adminRow } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!adminRow) {
    redirect(`/admin/dashboard?tab=${encodeURIComponent(tab)}&deleteError=forbidden`);
  }

  const { error: deleteRowsError } = await supabase
    .from(table)
    .delete()
    .in("id", ids);

  if (deleteRowsError) {
    redirect(`/admin/dashboard?tab=${encodeURIComponent(tab)}&deleteError=delete_failed`);
  }

  if (table === "psych_test_results") {
    const { error: deleteAnswerMapError } = await supabase
      .from("psych_test_answer_columns")
      .delete()
      .eq("test_id", projectKey);

    if (deleteAnswerMapError) {
      redirect(`/admin/dashboard?tab=${encodeURIComponent(tab)}&deleteError=delete_answer_map_failed`);
    }
  }

  redirect(
    `/admin/dashboard?tab=${encodeURIComponent(tab)}&deleted=1&project=${encodeURIComponent(projectKey)}`,
  );
}
