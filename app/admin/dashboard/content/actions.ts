"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import {
	saveSiteContentImage,
	saveSiteContentSection,
} from "@/lib/site-content-server";
import type { BrandPageContent } from "@/app/brand-philosophy/brand-content";

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

export async function saveBrandPageContent(formData: FormData) {
	await requireAdminUser();

	const payload = String(formData.get("payload") || "").trim();
	if (!payload) {
		redirect("/admin/dashboard/content?error=missing");
	}

	let parsed: BrandPageContent;
	try {
		parsed = JSON.parse(payload) as BrandPageContent;
	} catch {
		redirect("/admin/dashboard/content?error=json");
	}

	try {
		await saveSiteContentSection("brand_philosophy_page", parsed);
	} catch {
		redirect("/admin/dashboard/content?error=save");
	}

	revalidatePath("/brand-philosophy");
	revalidatePath("/admin/dashboard/content");
	redirect("/admin/dashboard/content?saved=brand");
}

export async function uploadBrandImage(formData: FormData) {
	await requireAdminUser();

	const file = formData.get("imageFile");

	if (!(file instanceof File) || file.size <= 0) {
		redirect("/admin/dashboard/content?error=upload");
	}

	if (!file.type.startsWith("image/")) {
		redirect("/admin/dashboard/content?error=upload_type");
	}

	if (file.size > 8 * 1024 * 1024) {
		redirect("/admin/dashboard/content?error=upload_size");
	}

	try {
		const url = await saveSiteContentImage("brand_philosophy_page", file);
		revalidatePath("/admin/dashboard/content");
		redirect(`/admin/dashboard/content?uploaded=${encodeURIComponent(url)}`);
	} catch {
		redirect("/admin/dashboard/content?error=upload");
	}
}
