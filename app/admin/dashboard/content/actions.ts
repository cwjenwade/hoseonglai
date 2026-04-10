"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import {
	getSiteContentSection,
	saveSiteContentImage,
	saveSiteContentSection,
} from "@/lib/site-content-server";
import {
	normalizeBrandPageContent,
	type BrandPageContent,
} from "@/app/brand-philosophy/brand-content";
import type { ResearchProject } from "@/app/collaborative-prosperity/projects";
import type { PsychometricScale } from "@/app/collaborative-prosperity/assessment-data";
import type { ResearchConsent } from "@/app/collaborative-prosperity/consent-data";
import type { LectureItem } from "@/app/fortune-arrives/lectures-data";
import type { HeartfeltVideoItem } from "@/app/heartfelt-momentum/videos-data";
import {
	normalizeGroupTags,
	suggestGroupTags,
	type GroupItem,
} from "@/app/togetherness/group-data";

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
		parsed = normalizeBrandPageContent(JSON.parse(payload) as BrandPageContent);
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
	redirect("/admin/dashboard");
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

		const currentScales = await getSiteContentSection<PsychometricScale[]>(
			"collaborative_prosperity_assessments",
			[],
		);
		const nextScales: PsychometricScale[] = cleanedProjects.map((project) => {
			const existing = currentScales.find((scale) => scale.projectId === project.id);
			if (existing) {
				return {
					...existing,
					projectId: project.id,
					projectTitleZh: existing.projectTitleZh || project.title,
					projectTitleEn: existing.projectTitleEn || project.subtitle,
				};
			}

			return {
				projectId: project.id,
				projectTitleZh: project.title,
				projectTitleEn: project.subtitle,
				scalePrompt: "請根據最近兩週的經驗，選擇最符合你的選項。",
				options: ["非常不同意", "不同意", "普通", "同意", "非常同意"],
				questions: ["請填寫第一題"],
			};
		});
		await saveSiteContentSection("collaborative_prosperity_assessments", nextScales);

		const currentConsents = await getSiteContentSection<ResearchConsent[]>(
			"collaborative_prosperity_consents",
			[],
		);
		const nextConsents: ResearchConsent[] = cleanedProjects.map((project) => {
			const existing = currentConsents.find((consent) => consent.projectId === project.id);
			if (existing) {
				return {
					...existing,
					projectId: project.id,
					projectTitleZh: existing.projectTitleZh || project.title,
					projectTitleEn: existing.projectTitleEn || project.subtitle,
				};
			}

			return {
				projectId: project.id,
				projectTitleZh: project.title,
				projectTitleEn: project.subtitle,
				principalInvestigator: "待填寫",
				researchUnit: "Ho-Se 好勢旺來研究團隊",
				researchDescription: "本研究旨在了解受試者之心理狀態與經驗，填答資料僅供研究使用。",
			};
		});
		await saveSiteContentSection("collaborative_prosperity_consents", nextConsents);
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
	redirect("/admin/dashboard");
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
			const dateMode = item.dateMode === "month" ? "month" : "exact";
			const date = String(item.date || "").trim();
			const dateLabel = String(item.dateLabel || "").trim();
			const time = String(item.time || "").trim();
			const approxYear = String(item.approxYear || "").trim();
			const approxMonth = String(item.approxMonth || "").trim();
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

			if (!id || !slug || !titleZh || !href) {
				return null;
			}

			if (type !== "LECTURE" && type !== "WORKSHOP" && type !== "PUBLIC TALK") {
				return null;
			}

			if (category.length === 0) {
				return null;
			}

			if (dateMode === "month") {
				if (!/^\d{4}$/.test(approxYear)) {
					return null;
				}

				const monthNumber = Number(approxMonth);
				if (!Number.isInteger(monthNumber) || monthNumber < 1 || monthNumber > 12) {
					return null;
				}
			} else {
				if (!date || !dateLabel || !time) {
					return null;
				}
			}

			return {
				id,
				slug,
				type,
				category: category as LectureItem["category"],
				dateMode,
				date: dateMode === "month" ? "" : date,
				dateLabel,
				time: dateMode === "month" ? "" : time,
				approxYear: dateMode === "month" ? approxYear : undefined,
				approxMonth: dateMode === "month" ? approxMonth : undefined,
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
	redirect("/admin/dashboard");
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
	redirect("/admin/dashboard");
}

export async function savePsychometricScalesContent(formData: FormData) {
	await requireAdminUser();

	const payload = String(formData.get("payload") || "").trim();
	if (!payload) {
		redirect("/admin/dashboard/content?tab=psychometrics&error=missing");
	}

	let parsed: unknown;
	try {
		parsed = JSON.parse(payload);
	} catch {
		redirect("/admin/dashboard/content?tab=psychometrics&error=json");
	}

	if (!Array.isArray(parsed)) {
		redirect("/admin/dashboard/content?tab=psychometrics&error=json");
	}

	const cleanedScales = parsed
		.map((scale): PsychometricScale | null => {
			if (!scale || typeof scale !== "object") return null;
			const item = scale as Partial<PsychometricScale>;

			const projectId = String(item.projectId || "").trim();
			const projectTitleZh = String(item.projectTitleZh || "").trim();
			const projectTitleEn = String(item.projectTitleEn || "").trim();
			const scalePrompt = String(item.scalePrompt || "").trim();
			const options = Array.isArray(item.options)
				? item.options.map((value) => String(value || "").trim()).filter(Boolean)
				: [];
			const questions = Array.isArray(item.questions)
				? item.questions.map((value) => String(value || "").trim()).filter(Boolean)
				: [];

			if (!projectId || !projectTitleZh || !projectTitleEn || !scalePrompt || options.length < 2 || questions.length < 1) {
				return null;
			}

			return {
				projectId,
				projectTitleZh,
				projectTitleEn,
				scalePrompt,
				options,
				questions,
			};
		})
		.filter((scale): scale is PsychometricScale => scale !== null);

	if (cleanedScales.length === 0) {
		redirect("/admin/dashboard/content?tab=psychometrics&error=missing");
	}

	try {
		await saveSiteContentSection("collaborative_prosperity_assessments", cleanedScales);

		const currentConsents = await getSiteContentSection<ResearchConsent[]>(
			"collaborative_prosperity_consents",
			[],
		);
		const nextConsents: ResearchConsent[] = cleanedScales.map((scale) => {
			const existing = currentConsents.find((consent) => consent.projectId === scale.projectId);
			if (existing) {
				return {
					...existing,
					projectId: scale.projectId,
					projectTitleZh: existing.projectTitleZh || scale.projectTitleZh,
					projectTitleEn: existing.projectTitleEn || scale.projectTitleEn,
				};
			}

			return {
				projectId: scale.projectId,
				projectTitleZh: scale.projectTitleZh,
				projectTitleEn: scale.projectTitleEn,
				principalInvestigator: "待填寫",
				researchUnit: "Ho-Se 好勢旺來研究團隊",
				researchDescription: "本研究旨在了解受試者之心理狀態與經驗，填答資料僅供研究使用。",
			};
		});
		await saveSiteContentSection("collaborative_prosperity_consents", nextConsents);
	} catch (error) {
		if (error instanceof Error && error.message === "READ_ONLY_FS") {
			redirect("/admin/dashboard/content?tab=psychometrics&error=readonly_fs");
		}

		const detail = encodeURIComponent(
			error instanceof Error ? error.message : "unknown_save_error",
		);
		console.error("PSYCHOMETRICS_SAVE_ERROR", error);
		redirect(`/admin/dashboard/content?tab=psychometrics&error=save&detail=${detail}`);
	}

	revalidatePath("/collaborative-prosperity");
	revalidatePath("/admin/dashboard/content");
	redirect("/admin/dashboard");
}

export async function saveResearchConsentsContent(formData: FormData) {
	await requireAdminUser();

	const payload = String(formData.get("payload") || "").trim();
	if (!payload) {
		redirect("/admin/dashboard/content?tab=consent&error=missing");
	}

	let parsed: unknown;
	try {
		parsed = JSON.parse(payload);
	} catch {
		redirect("/admin/dashboard/content?tab=consent&error=json");
	}

	if (!Array.isArray(parsed)) {
		redirect("/admin/dashboard/content?tab=consent&error=json");
	}

	const cleanedConsents = parsed
		.map((consent): ResearchConsent | null => {
			if (!consent || typeof consent !== "object") return null;
			const item = consent as Partial<ResearchConsent>;

			const projectId = String(item.projectId || "").trim();
			const projectTitleZh = String(item.projectTitleZh || "").trim();
			const projectTitleEn = String(item.projectTitleEn || "").trim();
			const principalInvestigator = String(item.principalInvestigator || "").trim();
			const researchUnit = String(item.researchUnit || "").trim();
			const researchDescription = String(item.researchDescription || "").trim();

			if (!projectId || !projectTitleZh || !projectTitleEn || !principalInvestigator || !researchUnit || !researchDescription) {
				return null;
			}

			return {
				projectId,
				projectTitleZh,
				projectTitleEn,
				principalInvestigator,
				researchUnit,
				researchDescription,
			};
		})
		.filter((consent): consent is ResearchConsent => consent !== null);

	if (cleanedConsents.length === 0) {
		redirect("/admin/dashboard/content?tab=consent&error=missing");
	}

	try {
		const scales = await getSiteContentSection<PsychometricScale[]>(
			"collaborative_prosperity_assessments",
			[],
		);

		const normalizedConsents: ResearchConsent[] = (scales.length ? scales : cleanedConsents).map((scale) => {
			if ("principalInvestigator" in scale) {
				const consentScale = scale as ResearchConsent;
				return {
					projectId: consentScale.projectId,
					projectTitleZh: consentScale.projectTitleZh,
					projectTitleEn: consentScale.projectTitleEn,
					principalInvestigator: consentScale.principalInvestigator,
					researchUnit: consentScale.researchUnit,
					researchDescription: consentScale.researchDescription,
				};
			}

			const psychometricScale = scale as PsychometricScale;
			const matched = cleanedConsents.find((consent) => consent.projectId === psychometricScale.projectId);
			if (matched) {
				return {
					...matched,
					projectId: psychometricScale.projectId,
					projectTitleZh: psychometricScale.projectTitleZh,
					projectTitleEn: psychometricScale.projectTitleEn,
				};
			}

			return {
				projectId: psychometricScale.projectId,
				projectTitleZh: psychometricScale.projectTitleZh,
				projectTitleEn: psychometricScale.projectTitleEn,
				principalInvestigator: "待填寫",
				researchUnit: "Ho-Se 好勢旺來研究團隊",
				researchDescription: "本研究旨在了解受試者之心理狀態與經驗，填答資料僅供研究使用。",
			};
		});

		await saveSiteContentSection("collaborative_prosperity_consents", normalizedConsents);
	} catch (error) {
		if (error instanceof Error && error.message === "READ_ONLY_FS") {
			redirect("/admin/dashboard/content?tab=consent&error=readonly_fs");
		}

		const detail = encodeURIComponent(
			error instanceof Error ? error.message : "unknown_save_error",
		);
		console.error("CONSENT_SAVE_ERROR", error);
		redirect(`/admin/dashboard/content?tab=consent&error=save&detail=${detail}`);
	}

	revalidatePath("/collaborative-prosperity/start");
	revalidatePath("/admin/dashboard/content");
	redirect("/admin/dashboard");
}

export async function uploadTogethernessImage(formData: FormData) {
	await requireAdminUser();

	const file = formData.get("imageFile");

	if (!(file instanceof File) || file.size <= 0) {
		redirect("/admin/dashboard/content?tab=togetherness&error=upload");
	}

	if (!file.type.startsWith("image/")) {
		redirect("/admin/dashboard/content?tab=togetherness&error=upload_type");
	}

	if (file.size > 8 * 1024 * 1024) {
		redirect("/admin/dashboard/content?tab=togetherness&error=upload_size");
	}

	let url = "";
	try {
		url = await saveSiteContentImage("togetherness_groups", file);
	} catch (error) {
		if (error instanceof Error && error.message === "READ_ONLY_FS_UPLOAD") {
			redirect("/admin/dashboard/content?tab=togetherness&error=readonly_upload");
		}

		const detail = encodeURIComponent(
			error instanceof Error ? error.message : "unknown_upload_error",
		);
		console.error("TOGETHERNESS_UPLOAD_ERROR", error);
		redirect(`/admin/dashboard/content?tab=togetherness&error=upload&detail=${detail}`);
	}

	revalidatePath("/admin/dashboard/content");
	redirect(`/admin/dashboard/content?tab=togetherness&uploaded=${encodeURIComponent(url)}`);
}

export async function saveTogethernessGroupsContent(formData: FormData) {
	await requireAdminUser();

	const payload = String(formData.get("payload") || "").trim();
	if (!payload) {
		redirect("/admin/dashboard/content?tab=togetherness&error=missing");
	}

	let parsed: unknown;
	try {
		parsed = JSON.parse(payload);
	} catch {
		redirect("/admin/dashboard/content?tab=togetherness&error=json");
	}

	if (!Array.isArray(parsed)) {
		redirect("/admin/dashboard/content?tab=togetherness&error=json");
	}

	const cleanedGroups: GroupItem[] = [];

	for (let index = 0; index < parsed.length; index += 1) {
		const group = parsed[index];
		if (!group || typeof group !== "object") {
			const detail = encodeURIComponent(`第${index + 1}筆資料格式錯誤`);
			redirect(`/admin/dashboard/content?tab=togetherness&error=json&detail=${detail}`);
		}

		const item = group as Partial<GroupItem>;
		const slug = String(item.slug || "").trim();
		const title = String(item.title || "").trim();
		const subtitle = String(item.subtitle || "").trim();
		const description = String(item.description || "").trim();
		const image = String(item.image || "").trim();
		const tags = normalizeGroupTags(
			Array.isArray(item.tags) && item.tags.length > 0
				? item.tags
				: suggestGroupTags({ slug, title, subtitle, description }),
		);

		if (!slug || !title || !subtitle || !description || !image) {
			const detail = encodeURIComponent(`第${index + 1}筆有未填欄位`);
			redirect(`/admin/dashboard/content?tab=togetherness&error=missing&detail=${detail}`);
		}

		cleanedGroups.push({
			slug,
			title,
			subtitle,
			description,
			image,
			tags,
		});
	}

	if (cleanedGroups.length === 0) {
		redirect("/admin/dashboard/content?tab=togetherness&error=missing");
	}

	try {
		await saveSiteContentSection("togetherness_groups", cleanedGroups);
	} catch (error) {
		if (error instanceof Error && error.message === "READ_ONLY_FS") {
			redirect("/admin/dashboard/content?tab=togetherness&error=readonly_fs");
		}

		const detail = encodeURIComponent(
			error instanceof Error ? error.message : "unknown_save_error",
		);
		console.error("TOGETHERNESS_SAVE_ERROR", error);
		redirect(`/admin/dashboard/content?tab=togetherness&error=save&detail=${detail}`);
	}

	revalidatePath("/togetherness");
	revalidatePath("/admin/dashboard/content");
	redirect("/admin/dashboard/content?tab=togetherness&saved=togetherness");
}
