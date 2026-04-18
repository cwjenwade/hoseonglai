import "server-only";

import { getSupabaseAdminClient } from "@/lib/supabase-admin";

export type ResearchRegistrationRow = {
  id: string;
  video_url: string;
  video_title: string;
  user_name: string;
  user_email: string;
  interest_note: string | null;
};

export type ResearchRegistrationMeta = {
  participantCode?: string;
  projectId?: string;
  projectStatus?: string;
  registrationKind?: string;
  age?: number;
  consentAccepted?: boolean;
  contactVisibility?: string;
  emailStatus?: string;
  deliveryMode?: string;
  deferredPreference?: string;
};

export function parseResearchRegistrationMeta(
  value: string | null | undefined,
): ResearchRegistrationMeta | null {
  if (!value?.trim()) return null;

  try {
    return JSON.parse(value) as ResearchRegistrationMeta;
  } catch {
    return null;
  }
}

export async function getResearchRegistrationById(
  id: string,
): Promise<ResearchRegistrationRow | null> {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("research_registrations")
    .select("id, video_url, video_title, user_name, user_email, interest_note")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data as ResearchRegistrationRow;
}
