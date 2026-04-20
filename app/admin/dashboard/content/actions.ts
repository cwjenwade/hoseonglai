"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { enforceRateLimit, getIpFromHeaders } from "@/lib/rate-limit";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import {
	getSiteContentSection,
	saveSiteContentDocument,
	saveSiteContentImage,
	saveSiteContentSection,
} from "@/lib/site-content-server";
import {
	normalizeBrandPageContent,
	type BrandPageContent,
} from "@/app/brand-philosophy/brand-content";
import {
	normalizeHomePageContent,
	type HomePageContent,
} from "@/app/home-content";
import {
	getResearchProjectTestUrl,
	getResearchProjectType,
	normalizeResearchProjects,
	normalizeResearchProject,
	type ResearchProject,
} from "@/app/collaborative-prosperity/projects";
import type { PsychometricScale } from "@/app/collaborative-prosperity/assessment-data";
import type { ResearchConsent } from "@/app/collaborative-prosperity/consent-data";
import type { ResearchScheduling } from "@/app/collaborative-prosperity/scheduling-data";
import type { LectureItem } from "@/app/fortune-arrives/lectures-data";
import type { HeartfeltVideoItem } from "@/app/heartfelt-momentum/videos-data";
import {
	type GroupItem,
	DEFAULT_GROUP_CONSULTATION_NOTE,
	DEFAULT_GROUP_INTRO_DESCRIPTION,
	DEFAULT_GROUP_INTRO_HEADING,
	DEFAULT_GROUP_LEADER_NAME_EN,
	DEFAULT_GROUP_LEADER_NAME_ZH,
	DEFAULT_GROUP_LEADER_TITLE_ZH,
	DEFAULT_GROUP_REGISTRATION_DESCRIPTION,
	DEFAULT_GROUP_REGISTRATION_HEADING,
} from "@/app/togetherness/group-data";
import {
	normalizeContentGovernance,
	sortByDisplayOrder,
	type ContentGovernanceFields,
} from "@/lib/content-governance";
import { buildResearchWorkspace, validateResearchWorkspace } from "./research-workspace";

async function requireAdminUser() {
	const requestHeaders = await headers();
	const rateLimit = await enforceRateLimit({
		scope: "admin_content_write",
		identifier: getIpFromHeaders(requestHeaders),
		maxRequests: 40,
		windowMs: 15 * 60 * 1000,
	});

	if (!rateLimit.ok) {
		redirect("/admin/dashboard/content?error=rate_limited");
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
		redirect("/admin/dashboard");
	}
}

function buildContentHref(
	module: string,
	item?: string,
	params?: Record<string, string | undefined>,
) {
	const searchParams = new URLSearchParams();
	searchParams.set("module", module);
	if (item) {
		searchParams.set("item", item);
	}

	Object.entries(params || {}).forEach(([key, value]) => {
		if (value) searchParams.set(key, value);
	});

	return `/admin/dashboard/content?${searchParams.toString()}`;
}

function touchGovernance<T extends ContentGovernanceFields>(
	value: T,
	fallbackOrder: number,
): T {
	const governance = normalizeContentGovernance(value, fallbackOrder);
	return {
		...value,
		...governance,
		updatedAt: new Date().toISOString(),
	};
}

function upsertByKey<T>(
	items: T[],
	nextItem: T,
	getKey: (item: T) => string,
	originalKey?: string,
) {
	const matchKey = String(originalKey || getKey(nextItem) || "").trim();
	const index = items.findIndex((item) => getKey(item) === matchKey);

	if (index >= 0) {
		return items.map((item, itemIndex) => (itemIndex === index ? nextItem : item));
	}

	return [...items, nextItem];
}

export async function saveBrandPageContent(formData: FormData) {
	await requireAdminUser();

	const payload = String(formData.get("payload") || "").trim();
	if (!payload) {
		redirect(buildContentHref("brand", "brand", { error: "missing" }));
	}

	let parsed: BrandPageContent;
	try {
		parsed = touchGovernance(
			normalizeBrandPageContent(JSON.parse(payload) as BrandPageContent),
			0,
		);
	} catch {
		redirect(buildContentHref("brand", "brand", { error: "json" }));
	}

	try {
		await saveSiteContentSection("brand_philosophy_page", parsed);
	} catch (error) {
		if (error instanceof Error && error.message === "READ_ONLY_FS") {
			redirect(buildContentHref("brand", "brand", { error: "readonly_fs" }));
		}

		const detail = encodeURIComponent(
			error instanceof Error ? error.message : "unknown_save_error",
		);
		console.error("BRAND_SAVE_ERROR", error);
		redirect(buildContentHref("brand", "brand", { error: "save", detail }));
	}

	revalidatePath("/brand-philosophy");
	revalidatePath("/admin/dashboard/content");
	redirect(buildContentHref("brand", "brand", { saved: "brand" }));
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

export async function saveHomePageContent(formData: FormData) {
	await requireAdminUser();

	const payload = String(formData.get("payload") || "").trim();
	if (!payload) {
		redirect(buildContentHref("home", "home", { error: "missing" }));
	}

	let parsed: HomePageContent;
	try {
		parsed = touchGovernance(
			normalizeHomePageContent(JSON.parse(payload) as HomePageContent),
			0,
		);
	} catch {
		redirect(buildContentHref("home", "home", { error: "json" }));
	}

	try {
		await saveSiteContentSection("home_page_content", parsed);
	} catch (error) {
		if (error instanceof Error && error.message === "READ_ONLY_FS") {
			redirect(buildContentHref("home", "home", { error: "readonly_fs" }));
		}

		const detail = encodeURIComponent(
			error instanceof Error ? error.message : "unknown_save_error",
		);
		redirect(buildContentHref("home", "home", { error: "save", detail }));
	}

	revalidatePath("/");
	revalidatePath("/", "layout");
	revalidatePath("/admin/dashboard/content");
	redirect(buildContentHref("home", "home", { saved: "home" }));
}

export async function uploadModuleImage(formData: FormData) {
	await requireAdminUser();

	const moduleKey = String(formData.get("module") || "").trim();
	const itemKey = String(formData.get("item") || "").trim();
	const researchTab = String(formData.get("researchTab") || "").trim();
	const section = String(formData.get("section") || "").trim();
	const file = formData.get("imageFile");

	if (!(file instanceof File) || file.size <= 0) {
		redirect(buildContentHref(moduleKey || "brand", itemKey || undefined, { error: "upload", researchTab }));
	}

	if (!file.type.startsWith("image/")) {
		redirect(buildContentHref(moduleKey || "brand", itemKey || undefined, { error: "upload_type", researchTab }));
	}

	const allowedSections = new Set([
		"home_page_content",
		"brand_philosophy_page",
		"heartfelt_momentum_videos",
		"togetherness_groups",
	]);
	if (!allowedSections.has(section)) {
		redirect(buildContentHref(moduleKey || "brand", itemKey || undefined, { error: "upload", researchTab }));
	}

	let url = "";
	try {
		url = await saveSiteContentImage(section as Parameters<typeof saveSiteContentImage>[0], file);
	} catch (error) {
		if (error instanceof Error && error.message === "READ_ONLY_FS_UPLOAD") {
			redirect(buildContentHref(moduleKey || "brand", itemKey || undefined, { error: "readonly_upload", researchTab }));
		}
		const detail = encodeURIComponent(error instanceof Error ? error.message : "unknown_upload_error");
		redirect(buildContentHref(moduleKey || "brand", itemKey || undefined, { error: "upload", detail, researchTab }));
	}

	revalidatePath("/admin/dashboard/content");
	redirect(buildContentHref(moduleKey || "brand", itemKey || undefined, { uploaded: url, researchTab }));
}

export async function uploadModulePdf(formData: FormData) {
	await requireAdminUser();

	const moduleKey = String(formData.get("module") || "").trim() || "consents";
	const itemKey = String(formData.get("item") || "").trim();
	const researchTab = String(formData.get("researchTab") || "").trim();
	const file = formData.get("pdfFile");

	if (!(file instanceof File) || file.size <= 0) {
		redirect(buildContentHref(moduleKey, itemKey || undefined, { error: "upload", researchTab }));
	}

	const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
	if (!isPdf) {
		redirect(buildContentHref(moduleKey, itemKey || undefined, { error: "upload_type", researchTab }));
	}

	let url = "";
	try {
		url = await saveSiteContentDocument("collaborative_prosperity_consents", file);
	} catch (error) {
		if (error instanceof Error && error.message === "READ_ONLY_FS_UPLOAD") {
			redirect(buildContentHref(moduleKey, itemKey || undefined, { error: "readonly_upload", researchTab }));
		}
		const detail = encodeURIComponent(error instanceof Error ? error.message : "unknown_upload_error");
		redirect(buildContentHref(moduleKey, itemKey || undefined, { error: "upload", detail, researchTab }));
	}

	revalidatePath("/admin/dashboard/content");
	redirect(buildContentHref(moduleKey, itemKey || undefined, { uploadedPdf: url, researchTab }));
}

export async function saveCollaborativeProjectsContent(formData: FormData) {
	await requireAdminUser();

	const redirectWithMissingDetail = (message: string) =>
		redirect(
			`/admin/dashboard/content?tab=collaborative&error=missing&detail=${encodeURIComponent(message)}`,
		);

	const payload = String(formData.get("payload") || "").trim();
	if (!payload) {
		redirectWithMissingDetail("表單 payload 是空的，可能是頁面草稿尚未成功寫入。");
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

	const invalidRows: string[] = [];
	const cleanedProjects: ResearchProject[] = parsed
		.map((project, index) => {
			if (!project || typeof project !== "object") {
				invalidRows.push(`第 ${index + 1} 筆資料不是有效物件`);
				return null;
			}

			const normalized = normalizeResearchProject(project as Partial<ResearchProject>);
			if (!normalized) {
				const candidate = project as Partial<ResearchProject>;
				const label =
					String(candidate.title || "").trim() ||
					String(candidate.id || "").trim() ||
					`第 ${index + 1} 筆`;
				invalidRows.push(`${label}：缺少專案 ID / 中文標題 / 英文副標`);
				return null;
			}

			return normalized;
		})
		.filter((project): project is ResearchProject => project !== null);

	if (cleanedProjects.length === 0) {
		redirectWithMissingDetail(
			invalidRows.length > 0
				? invalidRows.join("；")
				: "沒有任何有效的 collaborative 專案可儲存。",
		);
	}

	const currentScales = await getSiteContentSection<PsychometricScale[]>(
		"collaborative_prosperity_assessments",
		[],
	);
	const currentConsents = await getSiteContentSection<ResearchConsent[]>(
		"collaborative_prosperity_consents",
		[],
	);
	const scaleIds = new Set(currentScales.map((scale) => scale.projectId));
	const consentIds = new Set(currentConsents.map((consent) => consent.projectId));

	const linkedProjects = cleanedProjects.map((project) => ({
		...project,
		assessmentSourceProjectId:
			project.status === "quantitative"
				? String(project.assessmentSourceProjectId || "").trim() ||
					(scaleIds.has(project.id) ? project.id : "")
				: "",
		consentSourceProjectId:
			project.status !== "preparing"
				? String(project.consentSourceProjectId || "").trim() ||
					(consentIds.has(project.id) ? project.id : "")
				: "",
	}));

	const validationDetails: string[] = [];

	linkedProjects.forEach((project) => {
		const projectLabel = project.title || project.id || "未命名專案";
		const checks: Array<[string, string]> = [
			[project.description, "卡片描述"],
			[project.topic, "A. 研究主題"],
			[project.principalInvestigator, "B. 計畫主持人"],
			[project.researchContact, "C. 研究聯絡人"],
			[project.participationDetails, "D. 參與方式與時間"],
			[project.researchAudiencePurpose, "E. 研究對象與目的"],
		];

		checks.forEach(([value, label]) => {
			if (!String(value || "").trim()) {
				validationDetails.push(`${projectLabel}：${label}`);
			}
		});

		if (project.status === "quantitative" && !project.testUrl) {
			validationDetails.push(`${projectLabel}：Legacy assessment URL`);
		}

		if (
			project.status === "quantitative" &&
			!String(project.assessmentSourceProjectId || "").trim()
		) {
			validationDetails.push(`${projectLabel}：Legacy 量表來源`);
		}

		if (
			project.status !== "preparing" &&
			!String(project.consentSourceProjectId || "").trim()
		) {
			validationDetails.push(`${projectLabel}：研究計劃書 / 同意書來源`);
		}

		if (
			project.status === "quantitative" &&
			String(project.assessmentSourceProjectId || "").trim() &&
			!scaleIds.has(String(project.assessmentSourceProjectId || "").trim())
		) {
			validationDetails.push(`${projectLabel}：Legacy 量表來源不存在`);
		}

		if (
			project.status !== "preparing" &&
			String(project.consentSourceProjectId || "").trim() &&
			!consentIds.has(String(project.consentSourceProjectId || "").trim())
		) {
			validationDetails.push(`${projectLabel}：研究計劃書 / 同意書來源不存在`);
		}
	});

	if (validationDetails.length > 0) {
		const detail = encodeURIComponent(
			[...invalidRows, ...validationDetails].slice(0, 12).join("；"),
		);
		redirect(`/admin/dashboard/content?tab=collaborative&error=missing&detail=${detail}`);
	}

	try {
		await saveSiteContentSection("collaborative_prosperity_projects", linkedProjects);
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
	linkedProjects.forEach((project) => {
		revalidatePath(`/collaborative-prosperity/${project.id}`);
	});
	revalidatePath("/admin/dashboard/content");
	redirect("/admin/dashboard/content?tab=collaborative&saved=collaborative&clearDraft=1");
}

export async function uploadResearchConsentPdf(formData: FormData) {
	await requireAdminUser();

	const file = formData.get("pdfFile");

	if (!(file instanceof File) || file.size <= 0) {
		redirect("/admin/dashboard/content?tab=consent&error=upload");
	}

	const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
	if (!isPdf) {
		redirect("/admin/dashboard/content?tab=consent&error=upload_type");
	}

	if (file.size > 15 * 1024 * 1024) {
		redirect("/admin/dashboard/content?tab=consent&error=upload_size");
	}

	let url = "";
	try {
		url = await saveSiteContentDocument("collaborative_prosperity_consents", file);
	} catch (error) {
		if (error instanceof Error && error.message === "READ_ONLY_FS_UPLOAD") {
			redirect("/admin/dashboard/content?tab=consent&error=readonly_upload");
		}

		const detail = encodeURIComponent(
			error instanceof Error ? error.message : "unknown_upload_error",
		);
		console.error("CONSENT_PDF_UPLOAD_ERROR", error);
		redirect(`/admin/dashboard/content?tab=consent&error=upload&detail=${detail}`);
	}

	revalidatePath("/admin/dashboard/content");
	redirect(`/admin/dashboard/content?tab=consent&uploadedPdf=${encodeURIComponent(url)}`);
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

			const fallbackDate = "2026-12-31";
			const fallbackDateLabel = "31 Dec 2026";
			const fallbackTime = "19:00–21:00";

			if (dateMode === "month") {
				if (!/^\d{4}$/.test(approxYear)) {
					return null;
				}

				const monthNumber = Number(approxMonth);
				if (!Number.isInteger(monthNumber) || monthNumber < 1 || monthNumber > 12) {
					return null;
				}
			}

			const normalizedExactDate = date || fallbackDate;
			const normalizedExactDateLabel = dateLabel || fallbackDateLabel;
			const normalizedExactTime = time || fallbackTime;

			return {
				id,
				slug,
				type,
				category: category as LectureItem["category"],
				dateMode,
				date: dateMode === "month" ? "" : normalizedExactDate,
				dateLabel: dateMode === "month" ? dateLabel : normalizedExactDateLabel,
				time: dateMode === "month" ? "" : normalizedExactTime,
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
		if (cleanedScales.length === 0) {
			redirect("/admin/dashboard/content?tab=psychometrics&error=missing");
		}

		await saveSiteContentSection("collaborative_prosperity_assessments", cleanedScales);
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
			const pdfUrl = String(item.pdfUrl || "").trim();
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
				pdfUrl,
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
		await saveSiteContentSection("collaborative_prosperity_consents", cleanedConsents);
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

	const rawGroups = Array.isArray(parsed)
		? parsed
		: parsed && typeof parsed === "object" && Array.isArray((parsed as { groups?: unknown[] }).groups)
			? (parsed as { groups: unknown[] }).groups
			: null;

	if (!rawGroups) {
		redirect("/admin/dashboard/content?tab=togetherness&error=json");
	}

	const cleanedGroups: GroupItem[] = [];

	for (let index = 0; index < rawGroups.length; index += 1) {
		const group = rawGroups[index];
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
		const isVisible = item.isVisible !== false;
		const leaderProfileId = String(item.leaderProfileId || "").trim();
		const leaderNameZh = String(item.leaderNameZh || "").trim() || DEFAULT_GROUP_LEADER_NAME_ZH;
		const leaderNameEn = String(item.leaderNameEn || "").trim() || DEFAULT_GROUP_LEADER_NAME_EN;
		const leaderTitleZh = String(item.leaderTitleZh || "").trim() || DEFAULT_GROUP_LEADER_TITLE_ZH;
		const leaderPhoto = String(item.leaderPhoto || "").trim();
		const introHeading = String(item.introHeading || "").trim() || DEFAULT_GROUP_INTRO_HEADING;
		const introDescription = String(item.introDescription || "").trim() || DEFAULT_GROUP_INTRO_DESCRIPTION;
		const consultationNote =
			String(item.consultationNote || "").trim() || DEFAULT_GROUP_CONSULTATION_NOTE;
		const registrationHeading =
			String(item.registrationHeading || "").trim() || DEFAULT_GROUP_REGISTRATION_HEADING;
		const registrationDescription =
			String(item.registrationDescription || "").trim() ||
			DEFAULT_GROUP_REGISTRATION_DESCRIPTION;

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
			isVisible,
			leaderProfileId: leaderProfileId || undefined,
			leaderNameZh,
			leaderNameEn,
			leaderTitleZh,
			leaderPhoto: leaderPhoto || undefined,
			introHeading,
			introDescription,
			consultationNote,
			registrationHeading,
			registrationDescription,
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

export async function saveHeartfeltVideoEntry(formData: FormData) {
	await requireAdminUser();

	const originalKey = String(formData.get("entryKey") || "").trim();
	const payload = String(formData.get("payload") || "").trim();
	if (!payload) {
		redirect(buildContentHref("research-videos", originalKey || undefined, { error: "missing" }));
	}

	let parsed: HeartfeltVideoItem;
	try {
		const item = JSON.parse(payload) as Partial<HeartfeltVideoItem>;
		const normalized = touchGovernance(
			{
				title: String(item.title || "").trim(),
				titleEn: String(item.titleEn || "").trim(),
				tag: String(item.tag || "").trim(),
				description: String(item.description || "").trim(),
				category: String(item.category || "").trim(),
				duration: String(item.duration || "").trim(),
				image: String(item.image || "").trim(),
				youtubeUrl: String(item.youtubeUrl || "").trim() || undefined,
				isPublished: item.isPublished !== false,
				displayOrder: item.displayOrder,
				updatedAt: String(item.updatedAt || "").trim(),
				internalNote: String(item.internalNote || "").trim(),
			},
			0,
		);
		if (
			!normalized.title ||
			!normalized.titleEn ||
			!normalized.tag ||
			!normalized.description ||
			!normalized.category ||
			!normalized.duration ||
			!normalized.image
		) {
			redirect(buildContentHref("research-videos", originalKey || normalized.tag || undefined, { error: "missing" }));
		}
		parsed = normalized;
	} catch {
		redirect(buildContentHref("research-videos", originalKey || undefined, { error: "json" }));
	}

	const current = await getSiteContentSection<HeartfeltVideoItem[]>("heartfelt_momentum_videos", []);
	const next = sortByDisplayOrder(
		upsertByKey(current, parsed, (item) => String(item.tag || "").trim(), originalKey),
	);
	await saveSiteContentSection("heartfelt_momentum_videos", next);

	revalidatePath("/heartfelt-momentum");
	revalidatePath("/admin/dashboard/content");
	redirect(buildContentHref("research-videos", parsed.tag, { saved: "research-videos" }));
}

export async function saveFortuneLectureEntry(formData: FormData) {
	await requireAdminUser();

	const originalKey = String(formData.get("entryKey") || "").trim();
	const payload = String(formData.get("payload") || "").trim();
	if (!payload) {
		redirect(buildContentHref("lectures", originalKey || undefined, { error: "missing" }));
	}

	let parsed: LectureItem;
	try {
		const item = JSON.parse(payload) as Partial<LectureItem>;
		const category = Array.isArray(item.category)
			? item.category.map((value) => String(value || "").trim()).filter(Boolean)
			: [];
		const normalized = touchGovernance(
			{
				id: String(item.id || "").trim(),
				slug: String(item.slug || "").trim(),
				type: String(item.type || "LECTURE").trim() as LectureItem["type"],
				category: category as LectureItem["category"],
				dateMode: item.dateMode === "month" ? ("month" as const) : ("exact" as const),
				date: String(item.date || "").trim(),
				dateLabel: String(item.dateLabel || "").trim(),
				time: String(item.time || "").trim(),
				approxYear: String(item.approxYear || "").trim() || undefined,
				approxMonth: String(item.approxMonth || "").trim() || undefined,
				titleZh: String(item.titleZh || "").trim(),
				titleEn: String(item.titleEn || "").trim() || undefined,
				subtitleEn: String(item.subtitleEn || "").trim(),
				speaker: String(item.speaker || "").trim(),
				speakerEn: String(item.speakerEn || "").trim() || undefined,
				summary: String(item.summary || "").trim(),
				href: String(item.href || "").trim(),
				locationZh: String(item.locationZh || "").trim(),
				addressZh: String(item.addressZh || "").trim() || undefined,
				isPublished: item.isPublished !== false,
				displayOrder: item.displayOrder,
				updatedAt: String(item.updatedAt || "").trim(),
				internalNote: String(item.internalNote || "").trim(),
			},
			0,
		);
		if (
			!normalized.id ||
			!normalized.slug ||
			!normalized.titleZh ||
			!normalized.href ||
			category.length === 0
		) {
			redirect(buildContentHref("lectures", originalKey || normalized.id || undefined, { error: "missing" }));
		}
		parsed = normalized;
	} catch {
		redirect(buildContentHref("lectures", originalKey || undefined, { error: "json" }));
	}

	const current = await getSiteContentSection<LectureItem[]>("fortune_arrives_lectures", []);
	const next = sortByDisplayOrder(
		upsertByKey(current, parsed, (item) => String(item.id || "").trim(), originalKey),
	);
	await saveSiteContentSection("fortune_arrives_lectures", next);

	revalidatePath("/fortune-arrives");
	revalidatePath(`/fortune-arrives/${parsed.slug}`);
	revalidatePath("/admin/dashboard/content");
	redirect(buildContentHref("lectures", parsed.id, { saved: "lectures" }));
}

export async function saveTogethernessGroupEntry(formData: FormData) {
	await requireAdminUser();

	const originalKey = String(formData.get("entryKey") || "").trim();
	const payload = String(formData.get("payload") || "").trim();
	if (!payload) {
		redirect(buildContentHref("groups", originalKey || undefined, { error: "missing" }));
	}

	let parsed: GroupItem;
	try {
		const item = JSON.parse(payload) as Partial<GroupItem>;
		const normalized = touchGovernance(
			{
				slug: String(item.slug || "").trim(),
				title: String(item.title || "").trim(),
				subtitle: String(item.subtitle || "").trim(),
				description: String(item.description || "").trim(),
				image: String(item.image || "").trim(),
				isVisible: item.isVisible !== false,
				leaderProfileId: String(item.leaderProfileId || "").trim() || undefined,
				leaderNameZh: String(item.leaderNameZh || "").trim() || DEFAULT_GROUP_LEADER_NAME_ZH,
				leaderNameEn: String(item.leaderNameEn || "").trim() || DEFAULT_GROUP_LEADER_NAME_EN,
				leaderTitleZh: String(item.leaderTitleZh || "").trim() || DEFAULT_GROUP_LEADER_TITLE_ZH,
				leaderPhoto: String(item.leaderPhoto || "").trim() || undefined,
				introHeading: String(item.introHeading || "").trim() || DEFAULT_GROUP_INTRO_HEADING,
				introDescription:
					String(item.introDescription || "").trim() || DEFAULT_GROUP_INTRO_DESCRIPTION,
				consultationNote:
					String(item.consultationNote || "").trim() || DEFAULT_GROUP_CONSULTATION_NOTE,
				registrationHeading:
					String(item.registrationHeading || "").trim() || DEFAULT_GROUP_REGISTRATION_HEADING,
				registrationDescription:
					String(item.registrationDescription || "").trim() ||
					DEFAULT_GROUP_REGISTRATION_DESCRIPTION,
				isPublished: item.isPublished !== false,
				displayOrder: item.displayOrder,
				updatedAt: String(item.updatedAt || "").trim(),
				internalNote: String(item.internalNote || "").trim(),
			},
			0,
		);
		if (
			!normalized.slug ||
			!normalized.title ||
			!normalized.subtitle ||
			!normalized.description ||
			!normalized.image
		) {
			redirect(buildContentHref("groups", originalKey || normalized.slug || undefined, { error: "missing" }));
		}
		parsed = normalized;
	} catch {
		redirect(buildContentHref("groups", originalKey || undefined, { error: "json" }));
	}

	const current = await getSiteContentSection<GroupItem[]>("togetherness_groups", []);
	const next = sortByDisplayOrder(
		upsertByKey(current, parsed, (item) => String(item.slug || "").trim(), originalKey),
	);
	await saveSiteContentSection("togetherness_groups", next);

	revalidatePath("/togetherness");
	revalidatePath(`/togetherness/${parsed.slug}`);
	revalidatePath("/admin/dashboard/content");
	redirect(buildContentHref("groups", parsed.slug, { saved: "groups" }));
}

export async function savePsychometricScaleEntry(formData: FormData) {
	await requireAdminUser();

	const originalKey = String(formData.get("entryKey") || "").trim();
	const payload = String(formData.get("payload") || "").trim();
	if (!payload) {
		redirect(buildContentHref("psychometrics", originalKey || undefined, { error: "missing" }));
	}

	let parsed: PsychometricScale;
	try {
		const item = JSON.parse(payload) as Partial<PsychometricScale>;
		const normalized = touchGovernance(
			{
				projectId: String(item.projectId || "").trim(),
				projectTitleZh: String(item.projectTitleZh || "").trim(),
				projectTitleEn: String(item.projectTitleEn || "").trim(),
				scalePrompt: String(item.scalePrompt || "").trim(),
				options: Array.isArray(item.options)
					? item.options.map((value) => String(value || "").trim()).filter(Boolean)
					: [],
				questions: Array.isArray(item.questions)
					? item.questions.map((value) => String(value || "").trim()).filter(Boolean)
					: [],
				isPublished: item.isPublished !== false,
				displayOrder: item.displayOrder,
				updatedAt: String(item.updatedAt || "").trim(),
				internalNote: String(item.internalNote || "").trim(),
			},
			0,
		);
		if (
			!normalized.projectId ||
			!normalized.projectTitleZh ||
			!normalized.projectTitleEn ||
			!normalized.scalePrompt ||
			normalized.options.length < 2 ||
			normalized.questions.length < 1
		) {
			redirect(buildContentHref("psychometrics", originalKey || normalized.projectId || undefined, { error: "missing" }));
		}
		parsed = normalized;
	} catch {
		redirect(buildContentHref("psychometrics", originalKey || undefined, { error: "json" }));
	}

	const current = await getSiteContentSection<PsychometricScale[]>(
		"collaborative_prosperity_assessments",
		[],
	);
	const next = sortByDisplayOrder(
		upsertByKey(current, parsed, (item) => String(item.projectId || "").trim(), originalKey),
	);
	await saveSiteContentSection("collaborative_prosperity_assessments", next);

	revalidatePath("/collaborative-prosperity");
	revalidatePath("/admin/dashboard/content");
	redirect(buildContentHref("psychometrics", parsed.projectId, { saved: "psychometrics" }));
}

export async function saveResearchConsentEntry(formData: FormData) {
	await requireAdminUser();

	const originalKey = String(formData.get("entryKey") || "").trim();
	const payload = String(formData.get("payload") || "").trim();
	if (!payload) {
		redirect(buildContentHref("consents", originalKey || undefined, { error: "missing" }));
	}

	let parsed: ResearchConsent;
	try {
		const item = JSON.parse(payload) as Partial<ResearchConsent>;
		const normalized = touchGovernance(
			{
				projectId: String(item.projectId || "").trim(),
				projectTitleZh: String(item.projectTitleZh || "").trim(),
				projectTitleEn: String(item.projectTitleEn || "").trim(),
				pdfUrl: String(item.pdfUrl || "").trim() || undefined,
				principalInvestigator: String(item.principalInvestigator || "").trim(),
				researchUnit: String(item.researchUnit || "").trim(),
				researchDescription: String(item.researchDescription || "").trim(),
				isPublished: item.isPublished !== false,
				displayOrder: item.displayOrder,
				updatedAt: String(item.updatedAt || "").trim(),
				internalNote: String(item.internalNote || "").trim(),
			},
			0,
		);
		if (
			!normalized.projectId ||
			!normalized.projectTitleZh ||
			!normalized.projectTitleEn ||
			!normalized.principalInvestigator ||
			!normalized.researchUnit ||
			!normalized.researchDescription
		) {
			redirect(buildContentHref("consents", originalKey || normalized.projectId || undefined, { error: "missing" }));
		}
		parsed = normalized;
	} catch {
		redirect(buildContentHref("consents", originalKey || undefined, { error: "json" }));
	}

	const current = await getSiteContentSection<ResearchConsent[]>(
		"collaborative_prosperity_consents",
		[],
	);
	const next = sortByDisplayOrder(
		upsertByKey(current, parsed, (item) => String(item.projectId || "").trim(), originalKey),
	);
	await saveSiteContentSection("collaborative_prosperity_consents", next);

	revalidatePath("/collaborative-prosperity");
	revalidatePath("/admin/dashboard/content");
	redirect(buildContentHref("consents", parsed.projectId, { saved: "consents" }));
}

export async function saveResearchProjectEntry(formData: FormData) {
	await requireAdminUser();

	const originalKey = String(formData.get("entryKey") || "").trim();
	const payload = String(formData.get("payload") || "").trim();
	if (!payload) {
		redirect(buildContentHref("research-projects", originalKey || undefined, { error: "missing" }));
	}

	let parsed: ResearchProject;
	try {
		const normalized = normalizeResearchProject(
			JSON.parse(payload) as Partial<ResearchProject>,
		);
		if (!normalized) {
			redirect(buildContentHref("research-projects", originalKey || undefined, { error: "missing" }));
		}

		const currentScales = await getSiteContentSection<PsychometricScale[]>(
			"collaborative_prosperity_assessments",
			[],
		);
		const currentConsents = await getSiteContentSection<ResearchConsent[]>(
			"collaborative_prosperity_consents",
			[],
		);
		const scaleIds = new Set(currentScales.map((scale) => scale.projectId));
		const consentIds = new Set(currentConsents.map((consent) => consent.projectId));

		if (
			!normalized.description ||
			!normalized.topic ||
			!normalized.principalInvestigator ||
			!normalized.researchContact ||
			!normalized.participationDetails ||
			!normalized.researchAudiencePurpose
		) {
			redirect(buildContentHref("research-projects", originalKey || normalized.id || undefined, { error: "missing" }));
		}

		if (
			normalized.status === "quantitative" &&
			(!normalized.assessmentSourceProjectId || !scaleIds.has(normalized.assessmentSourceProjectId))
		) {
			redirect(buildContentHref("research-projects", originalKey || normalized.id || undefined, { error: "missing", detail: "Legacy 量表來源需對應既有 psychometrics。" }));
		}

		if (
			normalized.status !== "preparing" &&
			(!normalized.consentSourceProjectId || !consentIds.has(normalized.consentSourceProjectId))
		) {
			redirect(buildContentHref("research-projects", originalKey || normalized.id || undefined, { error: "missing", detail: "研究計劃書 / 同意書來源需對應既有 consents。" }));
		}

		parsed = touchGovernance(normalized, 0);
	} catch {
		redirect(buildContentHref("research-projects", originalKey || undefined, { error: "json" }));
	}

	const current = await getSiteContentSection<ResearchProject[]>(
		"collaborative_prosperity_projects",
		[],
	);
	const next = sortByDisplayOrder(
		upsertByKey(current, parsed, (item) => String(item.id || "").trim(), originalKey),
	);
	await saveSiteContentSection("collaborative_prosperity_projects", next);

	revalidatePath("/collaborative-prosperity");
	revalidatePath(`/collaborative-prosperity/${parsed.id}`);
	revalidatePath("/admin/dashboard/content");
	redirect(buildContentHref("research-projects", parsed.id, { saved: "research-projects" }));
}

export async function saveResearchWorkspaceEntry(formData: FormData) {
	await requireAdminUser();

	const originalKey = String(formData.get("entryKey") || "").trim();
	const currentTab = String(formData.get("researchTab") || "project").trim() || "project";
	const projectPayload = String(formData.get("projectPayload") || "").trim();
	const consentPayload = String(formData.get("consentPayload") || "").trim();
	const assessmentPayload = String(formData.get("assessmentPayload") || "").trim();
	const schedulingPayload = String(formData.get("schedulingPayload") || "").trim();

	if (!projectPayload || !consentPayload) {
		redirect(buildContentHref("research-projects", originalKey || undefined, {
			error: "missing",
			researchTab: currentTab,
		}));
	}

	let project: ResearchProject;
	let consent: ResearchConsent;
	let assessment: PsychometricScale | null = null;
	let scheduling: ResearchScheduling | null = null;

	try {
		const normalizedProject = normalizeResearchProject(
			JSON.parse(projectPayload) as Partial<ResearchProject>,
		);
		if (!normalizedProject) {
			redirect(buildContentHref("research-projects", originalKey || undefined, {
				error: "missing",
				researchTab: currentTab,
			}));
		}

		const parsedConsent = JSON.parse(consentPayload) as Partial<ResearchConsent>;
		const normalizedConsent = touchGovernance(
			{
				projectId: String(parsedConsent.projectId || normalizedProject.id).trim(),
				projectTitleZh:
					String(parsedConsent.projectTitleZh || normalizedProject.title).trim(),
				projectTitleEn:
					String(parsedConsent.projectTitleEn || normalizedProject.subtitle).trim(),
				pdfUrl: String(parsedConsent.pdfUrl || "").trim() || undefined,
				principalInvestigator:
					String(parsedConsent.principalInvestigator || normalizedProject.principalInvestigator).trim(),
				researchUnit: String(parsedConsent.researchUnit || "").trim(),
				researchDescription: String(parsedConsent.researchDescription || "").trim(),
				isPublished: parsedConsent.isPublished !== false,
				displayOrder: parsedConsent.displayOrder,
				updatedAt: String(parsedConsent.updatedAt || "").trim(),
				internalNote: String(parsedConsent.internalNote || "").trim(),
			},
			Number(normalizedProject.displayOrder || 0),
		);

		project = touchGovernance(normalizedProject, Number(normalizedProject.displayOrder || 0));
		project.publishStatus = project.publishStatus || "preparing";
		project.researchType = project.researchType || getResearchProjectType(project);
		project.status =
			project.publishStatus === "published" ? project.researchType : "preparing";
		project.isPublished = project.publishStatus === "published";
		project.testUrl = project.researchType === "quantitative" ? getResearchProjectTestUrl(project.id) : "";
		project.contactVisibility =
			project.researchType === "qualitative" ? "share_with_pi" : "admin_only";
		project.assessmentSourceProjectId = "";
		project.consentSourceProjectId = project.publishStatus === "published" ? "" : "";

		consent = normalizedConsent;

		if (project.researchType === "quantitative") {
			const parsedAssessment = assessmentPayload
				? (JSON.parse(assessmentPayload) as Partial<PsychometricScale> | null)
				: null;
			assessment = touchGovernance(
				{
					projectId: project.id,
					projectTitleZh: project.title,
					projectTitleEn: project.subtitle,
					scalePrompt: String(parsedAssessment?.scalePrompt || "").trim(),
					options: Array.isArray(parsedAssessment?.options)
						? parsedAssessment?.options.map((value) => String(value || "").trim()).filter(Boolean)
						: [],
					questions: Array.isArray(parsedAssessment?.questions)
						? parsedAssessment?.questions.map((value) => String(value || "").trim()).filter(Boolean)
						: [],
					isPublished: parsedAssessment?.isPublished !== false,
					displayOrder: parsedAssessment?.displayOrder,
					updatedAt: String(parsedAssessment?.updatedAt || "").trim(),
					internalNote: String(parsedAssessment?.internalNote || "").trim(),
				},
				Number(project.displayOrder || 0),
			);
		}

		if (project.researchType === "qualitative") {
			const parsedScheduling = schedulingPayload
				? (JSON.parse(schedulingPayload) as Partial<ResearchScheduling> | null)
				: null;
			scheduling = touchGovernance(
				{
					projectId: project.id,
					projectTitleZh: project.title,
					projectTitleEn: project.subtitle,
					schedulingPrompt: String(parsedScheduling?.schedulingPrompt || "").trim(),
					selectionNote: String(parsedScheduling?.selectionNote || "").trim(),
					allowMultiple: parsedScheduling?.allowMultiple !== false,
					availabilitySlots: Array.isArray(parsedScheduling?.availabilitySlots)
						? parsedScheduling?.availabilitySlots
								.map((value) => String(value || "").trim())
								.filter(Boolean)
						: [],
					isPublished: parsedScheduling?.isPublished !== false,
					displayOrder: parsedScheduling?.displayOrder,
					updatedAt: String(parsedScheduling?.updatedAt || "").trim(),
					internalNote: String(parsedScheduling?.internalNote || "").trim(),
				},
				Number(project.displayOrder || 0),
			);
		}
	} catch {
		redirect(buildContentHref("research-projects", originalKey || undefined, {
			error: "json",
			researchTab: currentTab,
		}));
	}

	if (project.publishStatus === "published") {
		const missingFields = validateResearchWorkspace(project, consent);
		if (missingFields.length > 0) {
			redirect(buildContentHref("research-projects", originalKey || project.id, {
				error: "missing",
				detail: missingFields.join("；"),
				researchTab: currentTab,
			}));
		}
	}

	const [currentProjects, currentConsents, currentAssessments, currentScheduling] =
		await Promise.all([
			getSiteContentSection<ResearchProject[]>("collaborative_prosperity_projects", []),
			getSiteContentSection<ResearchConsent[]>("collaborative_prosperity_consents", []),
			getSiteContentSection<PsychometricScale[]>("collaborative_prosperity_assessments", []),
			getSiteContentSection<ResearchScheduling[]>("collaborative_prosperity_scheduling", []),
		]);

	const nextProjects = sortByDisplayOrder(
		upsertByKey(currentProjects, project, (item) => String(item.id || "").trim(), originalKey),
	);
	const nextConsents = sortByDisplayOrder(
		upsertByKey(currentConsents, consent, (item) => String(item.projectId || "").trim(), originalKey),
	);

	let nextAssessments = currentAssessments.filter(
		(item) => String(item.projectId || "").trim() !== String(originalKey || project.id),
	);
	let nextScheduling = currentScheduling.filter(
		(item) => String(item.projectId || "").trim() !== String(originalKey || project.id),
	);

	if (assessment) {
		nextAssessments = sortByDisplayOrder([...nextAssessments, assessment]);
	}
	if (scheduling) {
		nextScheduling = sortByDisplayOrder([...nextScheduling, scheduling]);
	}

	await Promise.all([
		saveSiteContentSection("collaborative_prosperity_projects", nextProjects),
		saveSiteContentSection("collaborative_prosperity_consents", nextConsents),
		saveSiteContentSection("collaborative_prosperity_assessments", nextAssessments),
		saveSiteContentSection("collaborative_prosperity_scheduling", nextScheduling),
	]);

	revalidatePath("/collaborative-prosperity");
	revalidatePath(`/collaborative-prosperity/${project.id}`);
	revalidatePath("/admin/dashboard/content");
	redirect(buildContentHref("research-projects", project.id, {
		saved: "research-projects",
		clearDraft: "1",
		researchTab: currentTab,
	}));
}

export async function setResearchWorkspacePublishStatus(formData: FormData) {
	await requireAdminUser();

	const projectId = String(formData.get("projectId") || "").trim();
	const rawTargetStatus = String(formData.get("targetStatus") || "").trim();

	if (!projectId || (rawTargetStatus !== "preparing" && rawTargetStatus !== "published")) {
		redirect(buildContentHref("research-projects", undefined, { error: "missing" }));
	}
	const targetStatus = rawTargetStatus as "preparing" | "published";

	const [rawProjects, currentConsents, currentAssessments, currentScheduling] = await Promise.all([
		getSiteContentSection<ResearchProject[]>("collaborative_prosperity_projects", []),
		getSiteContentSection<ResearchConsent[]>("collaborative_prosperity_consents", []),
		getSiteContentSection<PsychometricScale[]>("collaborative_prosperity_assessments", []),
		getSiteContentSection<ResearchScheduling[]>("collaborative_prosperity_scheduling", []),
	]);

	const projects = normalizeResearchProjects(rawProjects, [], {
		includeUnpublished: true,
	});
	const currentProject = projects.find((item) => item.id === projectId);

	if (!currentProject) {
		redirect(buildContentHref("research-projects", undefined, { error: "missing" }));
	}

	const nextProject = touchGovernance(
		{
			...currentProject,
			publishStatus: targetStatus,
			status:
				(targetStatus === "published"
					? getResearchProjectType(currentProject)
					: "preparing") as ResearchProject["status"],
			isPublished: targetStatus === "published",
		},
		Number(currentProject.displayOrder || 0),
	);

	if (targetStatus === "published") {
		const workspace = buildResearchWorkspace(
			nextProject,
			currentConsents,
			currentAssessments,
			currentScheduling,
		);
		const missingFields = validateResearchWorkspace(workspace.project, workspace.consent);

		if (missingFields.length > 0) {
			redirect(
				buildContentHref("research-projects", undefined, {
					error: "missing",
					detail: missingFields.join("；"),
					failedProject: projectId,
				}),
			);
		}
	}

	const nextProjects = sortByDisplayOrder(
		upsertByKey(rawProjects, nextProject, (item) => String(item.id || "").trim(), projectId),
	);
	await saveSiteContentSection("collaborative_prosperity_projects", nextProjects);

	revalidatePath("/collaborative-prosperity");
	revalidatePath(`/collaborative-prosperity/${projectId}`);
	revalidatePath("/admin/dashboard/content");
	redirect(buildContentHref("research-projects", undefined, { saved: "research-projects" }));
}
