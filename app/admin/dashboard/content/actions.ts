"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import {
	saveSiteContentImage,
	saveSiteContentSection,
} from "@/lib/site-content-server";
import type { BrandPageContent } from "@/app/brand-philosophy/brand-content";
import type { ResearchProject } from "@/app/collaborative-prosperity/projects";
import type { LectureItem } from "@/app/fortune-arrives/lectures-data";
import type { HeartfeltVideoItem } from "@/app/heartfelt-momentum/videos-data";

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
		redirect("/admin/dashboard/content?tab=brand&error=missing");
	}

	let parsed: BrandPageContent;
	try {
		parsed = JSON.parse(payload) as BrandPageContent;
	} catch {
		redirect("/admin/dashboard/content?tab=brand&error=json");
	}

	try {
		await saveSiteContentSection("brand_philosophy_page", parsed);
	} catch (error) {
		if (error instanceof Error && error.message === "READ_ONLY_FS") {
			redirect("/admin/dashboard/content?tab=brand&error=readonly_fs");
		}

		const detail = encodeURIComponent(
			error instanceof Error ? error.message : "unknown_save_error",
		);
		console.error("BRAND_SAVE_ERROR", error);
		redirect(`/admin/dashboard/content?tab=brand&error=save&detail=${detail}`);
	}

	revalidatePath("/brand-philosophy");
	revalidatePath("/admin/dashboard/content");
	redirect("/admin/dashboard/content?tab=brand&saved=brand");
}

export async function uploadBrandImage(formData: FormData) {
	await requireAdminUser();

	const file = formData.get("imageFile");

	if (!(file instanceof File) || file.size <= 0) {
		redirect("/admin/dashboard/content?tab=brand&error=upload");
	}

	if (!file.type.startsWith("image/")) {
		redirect("/admin/dashboard/content?tab=brand&error=upload_type");
	}

	if (file.size > 8 * 1024 * 1024) {
		redirect("/admin/dashboard/content?tab=brand&error=upload_size");
	}

	let url = "";
	try {
		url = await saveSiteContentImage("brand_philosophy_page", file);
	} catch (error) {
		if (error instanceof Error && error.message === "READ_ONLY_FS_UPLOAD") {
			redirect("/admin/dashboard/content?tab=brand&error=readonly_upload");
		}

		const detail = encodeURIComponent(
			error instanceof Error ? error.message : "unknown_upload_error",
		);
		console.error("BRAND_UPLOAD_ERROR", error);
		redirect(`/admin/dashboard/content?tab=brand&error=upload&detail=${detail}`);
	}

	revalidatePath("/admin/dashboard/content");
	redirect(`/admin/dashboard/content?tab=brand&uploaded=${encodeURIComponent(url)}`);
}

export async function saveCollaborativeProjectsContent(formData: FormData) {
	await requireAdminUser();

	const payload = String(formData.get("payload") || "").trim();
	if (!payload) {
		redirect("/admin/dashboard/content?tab=collaborative&error=missing");
	}

	let parsed: unknown;
	try {
		parsed = JSON.parse(payload);
	} catch {
		redirect("/admin/dashboard/content?tab=collaborative&error=json");
	}

	if (!Array.isArray(parsed)) {
		redirect("/admin/dashboard/content?tab=collaborative&error=json");
	}

	const cleanedProjects: ResearchProject[] = parsed
		.map((project) => {
			if (!project || typeof project !== "object") return null;
			const item = project as Partial<ResearchProject>;

			const id = String(item.id || "").trim();
			const title = String(item.title || "").trim();
			const subtitle = String(item.subtitle || "").trim();
			const description = String(item.description || "").trim();
			const duration = String(item.duration || "").trim();
			const target = String(item.target || "").trim();
			const testUrl = String(item.testUrl || "").trim();

			if (!id || !title || !subtitle || !description || !duration || !target || !testUrl) {
				return null;
			}

			return {
				id,
				title,
				subtitle,
				description,
				duration,
				target,
				testUrl,
			};
		})
		.filter((project): project is ResearchProject => project !== null);

	if (cleanedProjects.length === 0) {
		redirect("/admin/dashboard/content?tab=collaborative&error=missing");
	}

	try {
		await saveSiteContentSection("collaborative_prosperity_projects", cleanedProjects);
	} catch (error) {
		if (error instanceof Error && error.message === "READ_ONLY_FS") {
			redirect("/admin/dashboard/content?tab=collaborative&error=readonly_fs");
		}

		const detail = encodeURIComponent(
			error instanceof Error ? error.message : "unknown_save_error",
		);
		console.error("COLLABORATIVE_SAVE_ERROR", error);
		redirect(`/admin/dashboard/content?tab=collaborative&error=save&detail=${detail}`);
	}

	revalidatePath("/collaborative-prosperity");
	revalidatePath("/admin/dashboard/content");
	redirect("/admin/dashboard/content?tab=collaborative&saved=collaborative");
}

export async function saveFortuneLecturesContent(formData: FormData) {
	await requireAdminUser();

	const payload = String(formData.get("payload") || "").trim();
	if (!payload) {
		redirect("/admin/dashboard/content?tab=fortune&error=missing");
	}

	let parsed: unknown;
	try {
		parsed = JSON.parse(payload);
	} catch {
		redirect("/admin/dashboard/content?tab=fortune&error=json");
	}

	if (!Array.isArray(parsed)) {
		redirect("/admin/dashboard/content?tab=fortune&error=json");
	}

	const cleanedLectures = parsed
		.map((lecture): LectureItem | null => {
			if (!lecture || typeof lecture !== "object") return null;
			const item = lecture as Partial<LectureItem>;

			const id = String(item.id || "").trim();
			const slug = String(item.slug || "").trim();
			const type = String(item.type || "").trim() as LectureItem["type"];
			const date = String(item.date || "").trim();
			const dateLabel = String(item.dateLabel || "").trim();
			const time = String(item.time || "").trim();
			const titleZh = String(item.titleZh || "").trim();
			const titleEn = String(item.titleEn || "").trim();
			const subtitleEn = String(item.subtitleEn || "").trim();
			const speaker = String(item.speaker || "").trim();
			const speakerEn = String(item.speakerEn || "").trim();
			const summary = String(item.summary || "").trim();
			const href = String(item.href || "").trim();
			const locationZh = String(item.locationZh || "").trim();
			const addressZh = String(item.addressZh || "").trim();
			const category = Array.isArray(item.category)
				? item.category
						.map((value) => String(value || "").trim())
						.filter(Boolean)
				: [];

			if (!id || !slug || !date || !dateLabel || !time || !titleZh || !href) {
				return null;
			}

			if (type !== "LECTURE" && type !== "WORKSHOP" && type !== "PUBLIC TALK") {
				return null;
			}

			if (category.length === 0) {
				return null;
			}

			return {
				id,
				slug,
				type,
				category: category as LectureItem["category"],
				date,
				dateLabel,
				time,
				titleZh,
				titleEn: titleEn || undefined,
				subtitleEn,
				speaker,
				speakerEn: speakerEn || undefined,
				summary,
				href,
				locationZh,
				addressZh: addressZh || undefined,
			};
		})
		.filter((lecture): lecture is LectureItem => lecture !== null);

	if (cleanedLectures.length === 0) {
		redirect("/admin/dashboard/content?tab=fortune&error=missing");
	}

	try {
		await saveSiteContentSection("fortune_arrives_lectures", cleanedLectures);
	} catch (error) {
		if (error instanceof Error && error.message === "READ_ONLY_FS") {
			redirect("/admin/dashboard/content?tab=fortune&error=readonly_fs");
		}

		const detail = encodeURIComponent(
			error instanceof Error ? error.message : "unknown_save_error",
		);
		console.error("FORTUNE_SAVE_ERROR", error);
		redirect(`/admin/dashboard/content?tab=fortune&error=save&detail=${detail}`);
	}

	revalidatePath("/fortune-arrives");
	revalidatePath("/admin/dashboard/content");
	redirect("/admin/dashboard/content?tab=fortune&saved=fortune");
}

export async function uploadHeartfeltImage(formData: FormData) {
	await requireAdminUser();

	const file = formData.get("imageFile");

	if (!(file instanceof File) || file.size <= 0) {
		redirect("/admin/dashboard/content?tab=heartfelt&error=upload");
	}

	if (!file.type.startsWith("image/")) {
		redirect("/admin/dashboard/content?tab=heartfelt&error=upload_type");
	}

	if (file.size > 8 * 1024 * 1024) {
		redirect("/admin/dashboard/content?tab=heartfelt&error=upload_size");
	}

	let url = "";
	try {
		url = await saveSiteContentImage("heartfelt_momentum_videos", file);
	} catch (error) {
		if (error instanceof Error && error.message === "READ_ONLY_FS_UPLOAD") {
			redirect("/admin/dashboard/content?tab=heartfelt&error=readonly_upload");
		}

		const detail = encodeURIComponent(
			error instanceof Error ? error.message : "unknown_upload_error",
		);
		console.error("HEARTFELT_UPLOAD_ERROR", error);
		redirect(`/admin/dashboard/content?tab=heartfelt&error=upload&detail=${detail}`);
	}

	revalidatePath("/admin/dashboard/content");
	redirect(`/admin/dashboard/content?tab=heartfelt&uploaded=${encodeURIComponent(url)}`);
}

export async function saveHeartfeltVideosContent(formData: FormData) {
	await requireAdminUser();

	const payload = String(formData.get("payload") || "").trim();
	if (!payload) {
		redirect("/admin/dashboard/content?tab=heartfelt&error=missing");
	}

	let parsed: unknown;
	try {
		parsed = JSON.parse(payload);
	} catch {
		redirect("/admin/dashboard/content?tab=heartfelt&error=json");
	}

	if (!Array.isArray(parsed)) {
		redirect("/admin/dashboard/content?tab=heartfelt&error=json");
	}

	const cleanedVideos = parsed
		.map((video): HeartfeltVideoItem | null => {
			if (!video || typeof video !== "object") return null;
			const item = video as Partial<HeartfeltVideoItem>;

			const title = String(item.title || "").trim();
			const titleEn = String(item.titleEn || "").trim();
			const tag = String(item.tag || "").trim();
			const description = String(item.description || "").trim();
			const category = String(item.category || "").trim();
			const duration = String(item.duration || "").trim();
			const image = String(item.image || "").trim();
			const youtubeUrl = String(item.youtubeUrl || "").trim();

			if (!title || !titleEn || !tag || !description || !category || !duration || !image) {
				return null;
			}

			return {
				title,
				titleEn,
				tag,
				description,
				category,
				duration,
				image,
				youtubeUrl: youtubeUrl || undefined,
			};
		})
		.filter((video): video is HeartfeltVideoItem => video !== null);

	if (cleanedVideos.length === 0) {
		redirect("/admin/dashboard/content?tab=heartfelt&error=missing");
	}

	try {
		await saveSiteContentSection("heartfelt_momentum_videos", cleanedVideos);
	} catch (error) {
		if (error instanceof Error && error.message === "READ_ONLY_FS") {
			redirect("/admin/dashboard/content?tab=heartfelt&error=readonly_fs");
		}

		const detail = encodeURIComponent(
			error instanceof Error ? error.message : "unknown_save_error",
		);
		console.error("HEARTFELT_SAVE_ERROR", error);
		redirect(`/admin/dashboard/content?tab=heartfelt&error=save&detail=${detail}`);
	}

	revalidatePath("/heartfelt-momentum");
	revalidatePath("/admin/dashboard/content");
	redirect("/admin/dashboard/content?tab=heartfelt&saved=heartfelt");
}
