"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import {
	saveSiteContentImage,
	saveSiteContentSection,
	type SiteContentSection,
} from "@/lib/site-content-server";

const SECTION_REVALIDATE_PATHS: Record<SiteContentSection, string[]> = {
	brand_philosophy_team: ["/brand-philosophy"],
	heartfelt_momentum_videos: ["/heartfelt-momentum"],
	fortune_arrives_lectures: ["/fortune-arrives"],
	togetherness_groups: ["/togetherness"],
	collaborative_prosperity_projects: ["/collaborative-prosperity"],
};

async function requireAdminUser() {
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
		redirect("/admin/dashboard");
	}
}

export async function saveSiteContent(formData: FormData) {
	await requireAdminUser();

	const section = String(formData.get("section") || "") as SiteContentSection;
	const jsonData = String(formData.get("jsonData") || "").trim();

	if (!section || !jsonData) {
		redirect("/admin/dashboard/content?error=missing");
	}

	let parsed: unknown;
	try {
		parsed = JSON.parse(jsonData);
	} catch {
		redirect(`/admin/dashboard/content?error=json&section=${encodeURIComponent(section)}`);
	}

	try {
		await saveSiteContentSection(section, parsed);
	} catch {
		redirect(`/admin/dashboard/content?error=save&section=${encodeURIComponent(section)}`);
	}

	const paths = SECTION_REVALIDATE_PATHS[section] || [];
	for (const path of paths) {
		revalidatePath(path);
	}
	revalidatePath("/admin/dashboard/content");

	redirect(`/admin/dashboard/content?saved=${encodeURIComponent(section)}`);
}

export async function uploadSectionImage(formData: FormData) {
	await requireAdminUser();

	const section = String(formData.get("section") || "") as SiteContentSection;
	const file = formData.get("imageFile");

	if (!section || !(file instanceof File) || file.size <= 0) {
		redirect(`/admin/dashboard/content?error=upload&section=${encodeURIComponent(section || "")}`);
	}

	if (!file.type.startsWith("image/")) {
		redirect(`/admin/dashboard/content?error=upload_type&section=${encodeURIComponent(section)}`);
	}

	if (file.size > 8 * 1024 * 1024) {
		redirect(`/admin/dashboard/content?error=upload_size&section=${encodeURIComponent(section)}`);
	}

	try {
		const url = await saveSiteContentImage(section, file);
		revalidatePath("/admin/dashboard/content");
		redirect(
			`/admin/dashboard/content?uploaded=${encodeURIComponent(url)}&section=${encodeURIComponent(section)}`,
		);
	} catch {
		redirect(`/admin/dashboard/content?error=upload&section=${encodeURIComponent(section)}`);
	}
}
