import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { adminLogout } from "@/app/admin/actions";
import { DEFAULT_BRAND_PAGE_CONTENT, normalizeBrandPageContent } from "@/app/brand-philosophy/brand-content";
import {
	DEFAULT_HOME_PAGE_CONTENT,
	normalizeHomePageContent,
} from "@/app/home-content";
import {
	DEFAULT_PSYCHOMETRIC_SCALES,
	type PsychometricScale,
} from "@/app/collaborative-prosperity/assessment-data";
import {
	DEFAULT_RESEARCH_CONSENTS,
	type ResearchConsent,
} from "@/app/collaborative-prosperity/consent-data";
import {
	RESEARCH_PROJECTS,
	normalizeResearchProjects,
} from "@/app/collaborative-prosperity/projects";
import { LECTURES, type LectureItem } from "@/app/fortune-arrives/lectures-data";
import { HEARTFELT_VIDEOS, type HeartfeltVideoItem } from "@/app/heartfelt-momentum/videos-data";
import { GROUPS, type GroupItem } from "@/app/togetherness/group-data";
import { formatAdminTimestamp, normalizeContentGovernance } from "@/lib/content-governance";
import { getSiteContentSection } from "@/lib/site-content-server";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import {
	saveBrandPageContent,
	saveFortuneLectureEntry,
	saveHeartfeltVideoEntry,
	saveHomePageContent,
	savePsychometricScaleEntry,
	saveResearchConsentEntry,
	saveResearchProjectEntry,
	saveTogethernessGroupEntry,
	uploadModuleImage,
	uploadModulePdf,
} from "./actions";
import {
	BrandPageSingleEditor,
	GroupItemEditor,
	HomePageEditor,
	LectureItemEditor,
	PsychometricScaleItemEditor,
	ResearchConsentItemEditor,
	ResearchProjectItemEditor,
	ResearchVideoItemEditor,
} from "./ModuleItemEditors";
import { CONTENT_MODULES, isContentModuleKey, type ContentModuleKey } from "./module-config";
import { ContentListTable } from "./ui/ContentListTable";
import { ModuleHeader } from "./ui/ModuleHeader";
import { StatusBadge } from "./ui/StatusBadge";

export const metadata: Metadata = {
	title: "內容管理後台",
	robots: {
		index: false,
		follow: false,
	},
};

type PageProps = {
	searchParams: Promise<{
		module?: string;
		item?: string;
		tab?: string;
		saved?: string;
		error?: string;
		uploaded?: string;
		uploadedPdf?: string;
		detail?: string;
	}>;
};

type ModuleCardSummary = {
	key: ContentModuleKey;
	title: string;
	description: string;
	count: number;
	lastUpdated: string;
	singleton: boolean;
};

const LEGACY_TAB_MAP: Record<string, ContentModuleKey> = {
	brand: "brand",
	heartfelt: "research-videos",
	fortune: "lectures",
	togetherness: "groups",
	collaborative: "research-projects",
	psychometrics: "psychometrics",
	consent: "consents",
};

function withGovernance<T extends { updatedAt?: string; displayOrder?: number; isPublished?: boolean; internalNote?: string }>(
	items: T[],
) {
	return items.map((item, index) => ({
		...item,
		...normalizeContentGovernance(item, index + 1),
	}));
}

function getErrorMessage(error?: string) {
	if (!error) return "";
	if (error === "json") return "資料格式錯誤，請重新送出。";
	if (error === "missing") return "缺少欄位，請補齊後再儲存。";
	if (error === "readonly_upload") return "目前部署環境是唯讀檔案系統，無法直接上傳檔案。";
	if (error === "readonly_fs") return "目前部署環境是唯讀檔案系統，無法直接儲存內容檔。";
	if (error === "upload_type") return "上傳檔案格式不正確。";
	if (error === "upload_size") return "上傳檔案大小超過限制。";
	if (error === "rate_limited") return "操作過於頻繁，請稍後再試。";
	return "儲存或上傳失敗，請稍後再試。";
}

function getLatestUpdated(values: Array<{ updatedAt?: string }>) {
	const latest = values
		.map((value) => String(value.updatedAt || "").trim())
		.filter(Boolean)
		.sort()
		.at(-1);
	return latest || "";
}

function normalizeModuleFromParams(module?: string, tab?: string): ContentModuleKey | null {
	if (module && isContentModuleKey(module)) return module;
	if (tab && LEGACY_TAB_MAP[tab]) return LEGACY_TAB_MAP[tab];
	return null;
}

export default async function AdminContentPage({ searchParams }: PageProps) {
	const resolvedSearchParams = await searchParams;
	const activeModule = normalizeModuleFromParams(
		resolvedSearchParams.module,
		resolvedSearchParams.tab,
	);
	const activeItem = String(resolvedSearchParams.item || "").trim();

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

	const homeContent = normalizeHomePageContent(
		await getSiteContentSection("home_page_content", DEFAULT_HOME_PAGE_CONTENT),
	);
	const brandContent = normalizeBrandPageContent(
		await getSiteContentSection("brand_philosophy_page", DEFAULT_BRAND_PAGE_CONTENT),
	);
	const researchVideos = withGovernance(
		(await getSiteContentSection(
			"heartfelt_momentum_videos",
			HEARTFELT_VIDEOS,
		)) as HeartfeltVideoItem[],
	);
	const lectures = withGovernance(
		(await getSiteContentSection("fortune_arrives_lectures", LECTURES)) as LectureItem[],
	);
	const groups = withGovernance(
		(await getSiteContentSection("togetherness_groups", GROUPS)) as GroupItem[],
	);
	const researchProjects = withGovernance(
		normalizeResearchProjects(
			await getSiteContentSection("collaborative_prosperity_projects", RESEARCH_PROJECTS),
			RESEARCH_PROJECTS,
		),
	);
	const psychometrics = withGovernance(
		(await getSiteContentSection(
			"collaborative_prosperity_assessments",
			DEFAULT_PSYCHOMETRIC_SCALES,
		)) as PsychometricScale[],
	);
	const consents = withGovernance(
		(await getSiteContentSection(
			"collaborative_prosperity_consents",
			DEFAULT_RESEARCH_CONSENTS,
		)) as ResearchConsent[],
	);

	const leaderOptions = [
		{
			id: "director",
			nameZh: brandContent.director.nameZh,
			nameEn: brandContent.director.nameEn,
			titleZh: "諮商心理師",
			photo: brandContent.director.photo,
		},
		...brandContent.teamMembers.map((member) => ({
			id: `member:${member.id}`,
			nameZh: member.nameZh,
			nameEn: member.nameEn,
			titleZh: member.role || member.profession,
			photo: member.photo,
		})),
	];

	const moduleCards: ModuleCardSummary[] = [
		{
			key: "home",
			title: "Home",
			description: "首頁功能卡、最新更新與 CTA。",
			count: 1,
			lastUpdated: homeContent.updatedAt || "",
			singleton: true,
		},
		{
			key: "brand",
			title: "Brand",
			description: "品牌頁 director 與團隊內容。",
			count: 1,
			lastUpdated: brandContent.updatedAt || "",
			singleton: true,
		},
		{
			key: "research-videos",
			title: "Research Videos",
			description: "有心好勢研究影片卡片。",
			count: researchVideos.length,
			lastUpdated: getLatestUpdated(researchVideos),
			singleton: false,
		},
		{
			key: "lectures",
			title: "Lectures & Events",
			description: "講座、工作坊與活動資料。",
			count: lectures.length,
			lastUpdated: getLatestUpdated(lectures),
			singleton: false,
		},
		{
			key: "groups",
			title: "Groups",
			description: "團體方案與帶領者資訊。",
			count: groups.length,
			lastUpdated: getLatestUpdated(groups),
			singleton: false,
		},
		{
			key: "research-projects",
			title: "Research Projects",
			description: "研究流程模組與參與設定。",
			count: researchProjects.length,
			lastUpdated: getLatestUpdated(researchProjects),
			singleton: false,
		},
		{
			key: "psychometrics",
			title: "Psychometrics",
			description: "量表題庫與量尺設定。",
			count: psychometrics.length,
			lastUpdated: getLatestUpdated(psychometrics),
			singleton: false,
		},
		{
			key: "consents",
			title: "Consents",
			description: "研究同意書與 PDF。",
			count: consents.length,
			lastUpdated: getLatestUpdated(consents),
			singleton: false,
		},
	];

	const activeModuleMeta = activeModule
		? CONTENT_MODULES.find((module) => module.key === activeModule) || null
		: null;
	const errorDetails = resolvedSearchParams.detail
		? resolvedSearchParams.detail
				.split("；")
				.map((item) => item.trim())
				.filter(Boolean)
		: [];

	return (
		<div className="space-y-6">
			<ModuleHeader
				eyebrow="Admin Content"
				title="內容模組管理"
				description="後台現在依照前台內容模組來管理，不再用頁面 tab 堆在一起。先選模組，再進列表，再編輯單筆內容。"
				backHref="/admin/dashboard"
				backLabel="返回儀表板"
				actions={[]}
			/>

			<div className="flex justify-end">
				<form action={adminLogout}>
					<button
						type="submit"
						className="rounded-full bg-zinc-900 px-4 py-2 text-sm text-white transition hover:bg-zinc-800"
					>
						登出
					</button>
				</form>
			</div>

			{resolvedSearchParams.saved ? (
				<div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
					內容已更新。
				</div>
			) : null}

			{resolvedSearchParams.uploaded ? (
				<div className="rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-700">
					檔案已上傳：
					<a className="ml-1 underline" href={resolvedSearchParams.uploaded} target="_blank">
						{resolvedSearchParams.uploaded}
					</a>
				</div>
			) : null}

			{resolvedSearchParams.uploadedPdf ? (
				<div className="rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-700">
					PDF 已上傳：
					<a className="ml-1 underline" href={resolvedSearchParams.uploadedPdf} target="_blank">
						{resolvedSearchParams.uploadedPdf}
					</a>
				</div>
			) : null}

			{resolvedSearchParams.error ? (
				<div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
					<p>{getErrorMessage(resolvedSearchParams.error)}</p>
					{errorDetails.length > 0 ? (
						<div className="mt-3 space-y-1 rounded-xl border border-red-200 bg-white/70 p-3 text-xs text-red-700">
							{errorDetails.map((item, index) => (
								<p key={`${item}-${index}`}>- {item}</p>
							))}
						</div>
					) : null}
				</div>
			) : null}

			{!activeModule ? (
				<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
					{moduleCards.map((module) => (
						<section
							key={module.key}
							className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm"
						>
							<div className="flex items-start justify-between gap-3">
								<div>
									<h2 className="text-lg font-semibold text-zinc-900">{module.title}</h2>
									<p className="mt-2 text-sm leading-6 text-zinc-600">
										{module.description}
									</p>
								</div>
								<StatusBadge
									tone="published"
									label={`${module.count} items`}
								/>
							</div>
							<div className="mt-4 space-y-2 text-sm text-zinc-600">
								<p>資料筆數：{module.count}</p>
								<p>最後更新：{formatAdminTimestamp(module.lastUpdated)}</p>
							</div>
							<div className="mt-5 flex flex-wrap gap-2">
								<Link
									href={`/admin/dashboard/content?module=${module.key}`}
									className="rounded-full border border-zinc-300 px-3 py-1.5 text-xs text-zinc-700 transition hover:bg-zinc-100"
								>
									查看列表
								</Link>
								<Link
									href={
										module.singleton
											? `/admin/dashboard/content?module=${module.key}&item=${module.key}`
											: `/admin/dashboard/content?module=${module.key}&item=new`
									}
									className="rounded-full bg-zinc-900 px-3 py-1.5 text-xs text-white transition hover:bg-zinc-800"
								>
									{module.singleton ? "編輯" : "新增"}
								</Link>
							</div>
						</section>
					))}
				</div>
			) : null}

			{activeModule && !activeItem ? (
				<>
					<ModuleHeader
						eyebrow="Module List"
						title={activeModuleMeta?.title || "內容模組"}
						description={activeModuleMeta?.description}
						backHref="/admin/dashboard/content"
						backLabel="返回模組首頁"
						actions={
							activeModuleMeta?.singleton
								? [
										{
											href: `/admin/dashboard/content?module=${activeModule}&item=${activeModule}`,
											label: "編輯",
										},
								  ]
								: [
										{
											href: `/admin/dashboard/content?module=${activeModule}&item=new`,
											label: activeModuleMeta?.createLabel || "新增",
										},
								  ]
						}
					/>

					{activeModule === "home" ? (
						<ContentListTable
							columns={[
								{ key: "title", label: "Title" },
								{ key: "status", label: "Status" },
								{ key: "updatedAt", label: "最後更新" },
								{ key: "displayOrder", label: "排序" },
							]}
							rows={[
								{
									id: "home",
									href: "/admin/dashboard/content?module=home&item=home",
									values: {
										title: homeContent.title,
										status: (
											<StatusBadge
												tone={homeContent.isPublished === false ? "draft" : "published"}
												label={homeContent.isPublished === false ? "Draft" : "Published"}
											/>
										),
										updatedAt: formatAdminTimestamp(homeContent.updatedAt),
										displayOrder: homeContent.displayOrder || 0,
									},
								},
							]}
							emptyLabel="尚無首頁內容。"
						/>
					) : null}

					{activeModule === "brand" ? (
						<ContentListTable
							columns={[
								{ key: "title", label: "Title" },
								{ key: "status", label: "Status" },
								{ key: "updatedAt", label: "最後更新" },
								{ key: "displayOrder", label: "排序" },
							]}
							rows={[
								{
									id: "brand",
									href: "/admin/dashboard/content?module=brand&item=brand",
									values: {
										title: "Brand Philosophy",
										status: (
											<StatusBadge
												tone={brandContent.isPublished === false ? "draft" : "published"}
												label={brandContent.isPublished === false ? "Draft" : "Published"}
											/>
										),
										updatedAt: formatAdminTimestamp(brandContent.updatedAt),
										displayOrder: brandContent.displayOrder || 0,
									},
								},
							]}
							emptyLabel="尚無 Brand 內容。"
						/>
					) : null}

					{activeModule === "research-videos" ? (
						<ContentListTable
							columns={[
								{ key: "title", label: "Title" },
								{ key: "status", label: "Status" },
								{ key: "updatedAt", label: "最後更新" },
								{ key: "displayOrder", label: "排序" },
							]}
							rows={researchVideos.map((item, index) => ({
								id: item.tag || `video-${index}`,
								href: `/admin/dashboard/content?module=research-videos&item=${encodeURIComponent(item.tag || `video-${index}`)}`,
								values: {
									title: (
										<div>
											<p className="font-medium text-zinc-900">{item.title}</p>
											<p className="text-xs text-zinc-500">{item.tag}</p>
										</div>
									),
									status: (
										<StatusBadge
											tone={item.isPublished === false ? "draft" : "published"}
											label={item.isPublished === false ? "Draft" : "Published"}
										/>
									),
									updatedAt: formatAdminTimestamp(item.updatedAt),
									displayOrder: item.displayOrder || index + 1,
								},
							}))}
							emptyLabel="尚無 Research Videos。"
						/>
					) : null}

					{activeModule === "lectures" ? (
						<ContentListTable
							columns={[
								{ key: "title", label: "Title" },
								{ key: "status", label: "Status" },
								{ key: "updatedAt", label: "最後更新" },
								{ key: "displayOrder", label: "排序" },
							]}
							rows={lectures.map((item, index) => ({
								id: item.id,
								href: `/admin/dashboard/content?module=lectures&item=${encodeURIComponent(item.id)}`,
								values: {
									title: (
										<div>
											<p className="font-medium text-zinc-900">{item.titleZh}</p>
											<p className="text-xs text-zinc-500">{item.slug}</p>
										</div>
									),
									status: (
										<div className="flex flex-wrap gap-2">
											<StatusBadge
												tone={item.isPublished === false ? "draft" : "published"}
												label={item.isPublished === false ? "Draft" : "Published"}
											/>
											{item.category.map((category) => (
												<StatusBadge key={category} tone="linked" label={category} />
											))}
										</div>
									),
									updatedAt: formatAdminTimestamp(item.updatedAt),
									displayOrder: item.displayOrder || index + 1,
								},
							}))}
							emptyLabel="尚無 Lectures & Events。"
						/>
					) : null}

					{activeModule === "groups" ? (
						<ContentListTable
							columns={[
								{ key: "title", label: "Title" },
								{ key: "status", label: "Status" },
								{ key: "updatedAt", label: "最後更新" },
								{ key: "displayOrder", label: "排序" },
							]}
							rows={groups.map((item, index) => ({
								id: item.slug,
								href: `/admin/dashboard/content?module=groups&item=${encodeURIComponent(item.slug)}`,
								values: {
									title: (
										<div>
											<p className="font-medium text-zinc-900">{item.title}</p>
											<p className="text-xs text-zinc-500">{item.slug} · {item.leaderNameZh || "未指定帶領者"}</p>
										</div>
									),
									status: (
										<div className="flex flex-wrap gap-2">
											<StatusBadge
												tone={item.isPublished === false ? "draft" : "published"}
												label={item.isPublished === false ? "Draft" : "Published"}
											/>
											<StatusBadge
												tone={item.isVisible === false ? "hidden" : "visible"}
												label={item.isVisible === false ? "Hidden" : "Visible"}
											/>
										</div>
									),
									updatedAt: formatAdminTimestamp(item.updatedAt),
									displayOrder: item.displayOrder || index + 1,
								},
							}))}
							emptyLabel="尚無 Groups。"
						/>
					) : null}

					{activeModule === "research-projects" ? (
						<ContentListTable
							columns={[
								{ key: "title", label: "Title" },
								{ key: "status", label: "Status" },
								{ key: "updatedAt", label: "最後更新" },
								{ key: "displayOrder", label: "排序" },
							]}
							rows={researchProjects.map((item, index) => ({
								id: item.id,
								href: `/admin/dashboard/content?module=research-projects&item=${encodeURIComponent(item.id)}`,
								values: {
									title: (
										<div>
											<p className="font-medium text-zinc-900">{item.title}</p>
											<p className="text-xs text-zinc-500">{item.id}</p>
										</div>
									),
									status: (
										<div className="flex flex-wrap gap-2">
											<StatusBadge
												tone={item.isPublished === false ? "draft" : "published"}
												label={item.isPublished === false ? "Draft" : "Published"}
											/>
											<StatusBadge tone="linked" label={item.status} />
										</div>
									),
									updatedAt: formatAdminTimestamp(item.updatedAt),
									displayOrder: item.displayOrder || index + 1,
								},
							}))}
							emptyLabel="尚無 Research Projects。"
						/>
					) : null}

					{activeModule === "psychometrics" ? (
						<ContentListTable
							columns={[
								{ key: "title", label: "Title" },
								{ key: "status", label: "Status" },
								{ key: "updatedAt", label: "最後更新" },
								{ key: "displayOrder", label: "排序" },
							]}
							rows={psychometrics.map((item, index) => ({
								id: item.projectId,
								href: `/admin/dashboard/content?module=psychometrics&item=${encodeURIComponent(item.projectId)}`,
								values: {
									title: (
										<div>
											<p className="font-medium text-zinc-900">{item.projectTitleZh}</p>
											<p className="text-xs text-zinc-500">{item.projectId}</p>
										</div>
									),
									status: (
										<StatusBadge
											tone={item.isPublished === false ? "draft" : "published"}
											label={item.isPublished === false ? "Draft" : "Published"}
										/>
									),
									updatedAt: formatAdminTimestamp(item.updatedAt),
									displayOrder: item.displayOrder || index + 1,
								},
							}))}
							emptyLabel="尚無 Psychometric scales。"
						/>
					) : null}

					{activeModule === "consents" ? (
						<ContentListTable
							columns={[
								{ key: "title", label: "Title" },
								{ key: "status", label: "Status" },
								{ key: "updatedAt", label: "最後更新" },
								{ key: "displayOrder", label: "排序" },
							]}
							rows={consents.map((item, index) => ({
								id: item.projectId,
								href: `/admin/dashboard/content?module=consents&item=${encodeURIComponent(item.projectId)}`,
								values: {
									title: (
										<div>
											<p className="font-medium text-zinc-900">{item.projectTitleZh}</p>
											<p className="text-xs text-zinc-500">{item.projectId}</p>
										</div>
									),
									status: (
										<StatusBadge
											tone={item.isPublished === false ? "draft" : "published"}
											label={item.isPublished === false ? "Draft" : "Published"}
										/>
									),
									updatedAt: formatAdminTimestamp(item.updatedAt),
									displayOrder: item.displayOrder || index + 1,
								},
							}))}
							emptyLabel="尚無 Consents。"
						/>
					) : null}
				</>
			) : null}

			{activeModule && activeItem ? (
				<>
					<ModuleHeader
						eyebrow="Single Editor"
						title={
							activeModuleMeta?.singleton
								? `${activeModuleMeta?.title} Editor`
								: `${activeModuleMeta?.title} / ${activeItem === "new" ? "新增項目" : activeItem}`
						}
						description={activeModuleMeta?.description}
						backHref={`/admin/dashboard/content?module=${activeModule}`}
						backLabel="返回列表"
					/>

					{activeModule === "home" ? (
						<form action={saveHomePageContent} className="space-y-5">
							<HomePageEditor initialContent={homeContent} />
							<div className="flex justify-end">
								<button type="submit" className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800">
									儲存 Home
								</button>
							</div>
						</form>
					) : null}

					{activeModule === "brand" ? (
						<>
							<section className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm">
								<p className="text-sm text-zinc-600">Brand 圖片可直接上傳後回填到 Director 或團隊成員。</p>
								<form action={uploadModuleImage} className="mt-4 flex flex-wrap items-center gap-3">
									<input type="hidden" name="module" value="brand" />
									<input type="hidden" name="item" value="brand" />
									<input type="hidden" name="section" value="brand_philosophy_page" />
									<input type="file" name="imageFile" accept="image/*" className="text-xs text-zinc-700" required />
									<button type="submit" className="rounded-full border border-zinc-300 px-4 py-2 text-xs text-zinc-700 transition hover:bg-zinc-100">
										上傳圖片
									</button>
								</form>
							</section>
							<form action={saveBrandPageContent} className="space-y-5">
								<BrandPageSingleEditor initialContent={brandContent} uploadedUrl={resolvedSearchParams.uploaded} />
								<div className="flex justify-end">
									<button type="submit" className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800">
										儲存 Brand
									</button>
								</div>
							</form>
						</>
					) : null}

					{activeModule === "research-videos" ? (
						<>
							<section className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm">
								<form action={uploadModuleImage} className="flex flex-wrap items-center gap-3">
									<input type="hidden" name="module" value="research-videos" />
									<input type="hidden" name="item" value={activeItem} />
									<input type="hidden" name="section" value="heartfelt_momentum_videos" />
									<input type="file" name="imageFile" accept="image/*" className="text-xs text-zinc-700" required />
									<button type="submit" className="rounded-full border border-zinc-300 px-4 py-2 text-xs text-zinc-700 transition hover:bg-zinc-100">
										上傳圖片
									</button>
								</form>
							</section>
							<form action={saveHeartfeltVideoEntry} className="space-y-5">
								<input type="hidden" name="entryKey" value={activeItem === "new" ? "" : activeItem} />
								<ResearchVideoItemEditor
									initialItem={
										researchVideos.find((item) => item.tag === activeItem) || {
											title: "",
											titleEn: "",
											tag: "",
											description: "",
											category: "研究影片",
											duration: "5 分鐘",
											image: "",
											youtubeUrl: "",
											isPublished: true,
											displayOrder: researchVideos.length + 1,
											updatedAt: "",
											internalNote: "",
										}
									}
									uploadedUrl={resolvedSearchParams.uploaded}
								/>
								<div className="flex justify-end">
									<button type="submit" className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800">
										儲存 Research Video
									</button>
								</div>
							</form>
						</>
					) : null}

					{activeModule === "lectures" ? (
						<form action={saveFortuneLectureEntry} className="space-y-5">
							<input type="hidden" name="entryKey" value={activeItem === "new" ? "" : activeItem} />
							<LectureItemEditor
								initialItem={
									lectures.find((item) => item.id === activeItem) || {
										id: "",
										slug: "",
										type: "LECTURE",
										category: ["Upcoming", "Public Talk"],
										dateMode: "exact",
										date: "",
										dateLabel: "",
										time: "",
										titleZh: "",
										titleEn: "",
										subtitleEn: "",
										speaker: "",
										speakerEn: "",
										summary: "",
										href: "",
										locationZh: "",
										addressZh: "",
										isPublished: true,
										displayOrder: lectures.length + 1,
										updatedAt: "",
										internalNote: "",
									}
								}
							/>
							<div className="flex justify-end">
								<button type="submit" className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800">
									儲存 Lecture
								</button>
							</div>
						</form>
					) : null}

					{activeModule === "groups" ? (
						<>
							<section className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm">
								<form action={uploadModuleImage} className="flex flex-wrap items-center gap-3">
									<input type="hidden" name="module" value="groups" />
									<input type="hidden" name="item" value={activeItem} />
									<input type="hidden" name="section" value="togetherness_groups" />
									<input type="file" name="imageFile" accept="image/*" className="text-xs text-zinc-700" required />
									<button type="submit" className="rounded-full border border-zinc-300 px-4 py-2 text-xs text-zinc-700 transition hover:bg-zinc-100">
										上傳圖片
									</button>
								</form>
							</section>
							<form action={saveTogethernessGroupEntry} className="space-y-5">
								<input type="hidden" name="entryKey" value={activeItem === "new" ? "" : activeItem} />
								<GroupItemEditor
									initialItem={
										groups.find((item) => item.slug === activeItem) || {
											slug: "",
											title: "",
											subtitle: "",
											description: "",
											image: "",
											isVisible: true,
											leaderProfileId: "",
											leaderNameZh: "",
											leaderNameEn: "",
											leaderTitleZh: "",
											leaderPhoto: "",
											introHeading: "",
											introDescription: "",
											consultationNote: "",
											registrationHeading: "",
											registrationDescription: "",
											isPublished: true,
											displayOrder: groups.length + 1,
											updatedAt: "",
											internalNote: "",
										}
									}
									leaderOptions={leaderOptions}
									uploadedUrl={resolvedSearchParams.uploaded}
								/>
								<div className="flex justify-end">
									<button type="submit" className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800">
										儲存 Group
									</button>
								</div>
							</form>
						</>
					) : null}

					{activeModule === "psychometrics" ? (
						<form action={savePsychometricScaleEntry} className="space-y-5">
							<input type="hidden" name="entryKey" value={activeItem === "new" ? "" : activeItem} />
							<PsychometricScaleItemEditor
								initialItem={
									psychometrics.find((item) => item.projectId === activeItem) || {
										projectId: "",
										projectTitleZh: "",
										projectTitleEn: "",
										scalePrompt: "請依照實際情況作答。",
										options: ["非常不同意", "不同意", "普通", "同意", "非常同意"],
										questions: [""],
										isPublished: true,
										displayOrder: psychometrics.length + 1,
										updatedAt: "",
										internalNote: "",
									}
								}
							/>
							<div className="flex justify-end">
								<button type="submit" className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800">
									儲存 Psychometric Scale
								</button>
							</div>
						</form>
					) : null}

					{activeModule === "consents" ? (
						<>
							<section className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm">
								<form action={uploadModulePdf} className="flex flex-wrap items-center gap-3">
									<input type="hidden" name="module" value="consents" />
									<input type="hidden" name="item" value={activeItem} />
									<input type="file" name="pdfFile" accept="application/pdf,.pdf" className="text-xs text-zinc-700" required />
									<button type="submit" className="rounded-full border border-zinc-300 px-4 py-2 text-xs text-zinc-700 transition hover:bg-zinc-100">
										上傳 PDF
									</button>
								</form>
							</section>
							<form action={saveResearchConsentEntry} className="space-y-5">
								<input type="hidden" name="entryKey" value={activeItem === "new" ? "" : activeItem} />
								<ResearchConsentItemEditor
									initialItem={
										consents.find((item) => item.projectId === activeItem) || {
											projectId: "",
											projectTitleZh: "",
											projectTitleEn: "",
											pdfUrl: "",
											principalInvestigator: "",
											researchUnit: "Ho-Se 好勢旺來研究團隊",
											researchDescription: "",
											isPublished: true,
											displayOrder: consents.length + 1,
											updatedAt: "",
											internalNote: "",
										}
									}
									uploadedPdfUrl={resolvedSearchParams.uploadedPdf}
								/>
								<div className="flex justify-end">
									<button type="submit" className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800">
										儲存 Consent
									</button>
								</div>
							</form>
						</>
					) : null}

					{activeModule === "research-projects" ? (
						(() => {
							const currentProject =
								researchProjects.find((item) => item.id === activeItem) || {
									id: "",
									title: "",
									subtitle: "",
									description: "",
									status: "preparing" as const,
									topic: "",
									principalInvestigator: "",
									researchContact: "",
									participationDetails: "",
									researchAudiencePurpose: "",
									testUrl: "",
									assessmentSourceProjectId: "",
									consentSourceProjectId: "",
									contactVisibility: "admin_only" as const,
									isPublished: true,
									displayOrder: researchProjects.length + 1,
									updatedAt: "",
									internalNote: "",
								};
							const linkedAssessment = psychometrics.find(
								(item) => item.projectId === currentProject.assessmentSourceProjectId,
							);
							const linkedConsent = consents.find(
								(item) => item.projectId === currentProject.consentSourceProjectId,
							);

							return (
								<form action={saveResearchProjectEntry} className="space-y-5">
									<input type="hidden" name="entryKey" value={activeItem === "new" ? "" : activeItem} />
									<ResearchProjectItemEditor
										initialItem={currentProject}
										scaleOptions={psychometrics.map((item) => ({
											value: item.projectId,
											label: `${item.projectTitleZh} / ${item.projectTitleEn}`,
											description: item.projectId,
										}))}
										consentOptions={consents.map((item) => ({
											value: item.projectId,
											label: `${item.projectTitleZh} / ${item.projectTitleEn}`,
											description: item.pdfUrl || item.projectId,
										}))}
									/>

									<section className="grid gap-4 lg:grid-cols-2">
										<div className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm">
											<p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
												Linked Assessment
											</p>
											<p className="mt-3 text-lg font-semibold text-zinc-900">
												{linkedAssessment?.projectTitleZh || "尚未指定量表"}
											</p>
											<p className="mt-2 text-sm text-zinc-600">
												{linkedAssessment?.projectId || "請先從 psychometrics 選擇量表來源。"}
											</p>
											<div className="mt-4">
												<Link
													href={`/admin/dashboard/content?module=psychometrics${linkedAssessment ? `&item=${encodeURIComponent(linkedAssessment.projectId)}` : ""}`}
													className="inline-flex rounded-full border border-zinc-300 px-3 py-1.5 text-xs text-zinc-700 transition hover:bg-zinc-100"
												>
													前往 Psychometrics
												</Link>
											</div>
										</div>

										<div className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm">
											<p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
												Linked Consent
											</p>
											<p className="mt-3 text-lg font-semibold text-zinc-900">
												{linkedConsent?.projectTitleZh || "尚未指定 consent"}
											</p>
											<p className="mt-2 text-sm text-zinc-600">
												{linkedConsent?.pdfUrl || "請先從 consents 選擇研究計畫書來源。"}
											</p>
											<div className="mt-4">
												<Link
													href={`/admin/dashboard/content?module=consents${linkedConsent ? `&item=${encodeURIComponent(linkedConsent.projectId)}` : ""}`}
													className="inline-flex rounded-full border border-zinc-300 px-3 py-1.5 text-xs text-zinc-700 transition hover:bg-zinc-100"
												>
													前往 Consents
												</Link>
											</div>
										</div>
									</section>

									<div className="flex justify-end">
										<button type="submit" className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800">
											儲存 Research Project
										</button>
									</div>
								</form>
							);
						})()
					) : null}
				</>
			) : null}
		</div>
	);
}
