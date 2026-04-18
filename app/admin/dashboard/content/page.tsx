import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { adminLogout } from "@/app/admin/actions";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import { getSiteContentSection } from "@/lib/site-content-server";
import {
	DEFAULT_BRAND_PAGE_CONTENT,
	normalizeBrandPageContent,
} from "@/app/brand-philosophy/brand-content";
import {
	RESEARCH_PROJECTS,
	normalizeResearchProjects,
} from "@/app/collaborative-prosperity/projects";
import { DEFAULT_PSYCHOMETRIC_SCALES } from "@/app/collaborative-prosperity/assessment-data";
import { DEFAULT_RESEARCH_CONSENTS } from "@/app/collaborative-prosperity/consent-data";
import { LECTURES } from "@/app/fortune-arrives/lectures-data";
import { HEARTFELT_VIDEOS } from "@/app/heartfelt-momentum/videos-data";
import { GROUPS } from "@/app/togetherness/group-data";
import BrandEditor from "./BrandEditor";
import CollaborativeProjectsEditor from "./CollaborativeProjectsEditor";
import FortuneLecturesEditor from "./FortuneLecturesEditor";
import HeartfeltVideosEditor from "./HeartfeltVideosEditor";
import PsychometricScalesEditor from "./PsychometricScalesEditor";
import ResearchConsentsEditor from "./ResearchConsentsEditor";
import TogethernessGroupsEditor from "./TogethernessGroupsEditor";
import {
	saveBrandPageContent,
	saveCollaborativeProjectsContent,
	saveFortuneLecturesContent,
	saveHeartfeltVideosContent,
	saveResearchConsentsContent,
	savePsychometricScalesContent,
	saveTogethernessGroupsContent,
	uploadResearchConsentPdf,
	uploadHeartfeltImage,
	uploadTogethernessImage,
	uploadBrandImage,
} from "./actions";

export const metadata: Metadata = {
	title: "管理後台內容編輯",
	robots: {
		index: false,
		follow: false,
	},
};

type PageProps = {
	searchParams: Promise<{ saved?: string; error?: string; uploaded?: string; uploadedPdf?: string; detail?: string; tab?: string }>;
};

export default async function AdminContentPage({ searchParams }: PageProps) {
	const resolvedSearchParams = await searchParams;

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

	const brandContent = normalizeBrandPageContent(
		await getSiteContentSection("brand_philosophy_page", DEFAULT_BRAND_PAGE_CONTENT),
	);
	const collaborativeProjects = normalizeResearchProjects(
		await getSiteContentSection(
			"collaborative_prosperity_projects",
			RESEARCH_PROJECTS,
		),
		RESEARCH_PROJECTS,
	);
	const fortuneLectures = await getSiteContentSection("fortune_arrives_lectures", LECTURES);
	const heartfeltVideos = await getSiteContentSection("heartfelt_momentum_videos", HEARTFELT_VIDEOS);
	const togethernessGroups = await getSiteContentSection("togetherness_groups", GROUPS);
	const togethernessLeaderOptions = [
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
	const psychometricScales = await getSiteContentSection(
		"collaborative_prosperity_assessments",
		DEFAULT_PSYCHOMETRIC_SCALES,
	);
	const researchConsents = await getSiteContentSection(
		"collaborative_prosperity_consents",
		DEFAULT_RESEARCH_CONSENTS,
	);

	const tabs = [
		{ key: "brand", name: "品牌理念" },
		{ key: "collaborative", name: "協力招來" },
		{ key: "psychometrics", name: "心理量表" },
		{ key: "consent", name: "研究同意書" },
		{ key: "heartfelt", name: "有心好勢｜5 mins research" },
		{ key: "fortune", name: "有運旺來｜講座" },
		{ key: "togetherness", name: "團體諮商" },
	] as const;

	const activeTab = tabs.some((tab) => tab.key === resolvedSearchParams.tab)
		? (resolvedSearchParams.tab as (typeof tabs)[number]["key"])
		: "brand";
	const errorDetails = resolvedSearchParams.detail
		? resolvedSearchParams.detail
				.split("；")
				.map((item) => item.trim())
				.filter(Boolean)
		: [];

	const modules = [
		{ name: "品牌理念", status: "已完成" },
		{ name: "協力招來", status: "已完成" },
		{ name: "心理量表", status: "已完成" },
		{ name: "研究同意書", status: "已完成" },
		{ name: "有心好勢｜5 mins research", status: "已完成" },
		{ name: "有運旺來｜講座", status: "已完成" },
		{ name: "團體諮商", status: "已完成" },
	];

	return (
		<div className="space-y-6">
			<div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
				<div>
					<h1 className="text-2xl font-bold text-zinc-900">內容管理（前台資料）</h1>
					<p className="mt-1 text-sm text-zinc-600">先完成 Brand 編輯器，其它模組已先列出。</p>
				</div>

				<div className="flex gap-3">
					<Link
						href="/admin/dashboard"
						className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100"
					>
						返回儀表板
					</Link>
					<form action={adminLogout}>
						<button
							type="submit"
							className="rounded-full bg-zinc-800 px-4 py-2 text-sm text-white transition hover:bg-zinc-700"
						>
							登出
						</button>
					</form>
				</div>
			</div>

			<div className="grid gap-3 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm md:grid-cols-6">
				{modules.map((m) => (
					<div key={m.name} className="rounded-2xl border border-zinc-200 p-3">
						<p className="text-sm font-semibold text-zinc-900">{m.name}</p>
						<p className="mt-1 text-xs text-zinc-500">{m.status}</p>
					</div>
				))}
			</div>

			<div className="flex flex-wrap gap-2 rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm">
				{tabs.map((tab) => {
					const isActive = activeTab === tab.key;
					return (
						<Link
							key={tab.key}
							href={`/admin/dashboard/content?tab=${tab.key}`}
							className={
								"rounded-full px-4 py-2 text-sm transition " +
								(isActive
									? "bg-zinc-900 text-white"
									: "border border-zinc-300 text-zinc-700 hover:bg-zinc-100")
							}
						>
							{tab.name}
						</Link>
					);
				})}
			</div>

			{resolvedSearchParams.saved ? (
				<div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 flex items-center gap-2">
					<span className="text-lg">✓</span>
					<span>
						{resolvedSearchParams.saved === "brand"
							? "品牌理念內容已更新"
							: resolvedSearchParams.saved === "collaborative"
								? "協力招來內容已更新"
								: resolvedSearchParams.saved === "psychometrics"
									? "心理量表內容已更新"
									: resolvedSearchParams.saved === "consent"
										? "研究同意書內容已更新"
								: resolvedSearchParams.saved === "heartfelt"
									? "有心好勢內容已更新"
								: resolvedSearchParams.saved === "fortune"
									? "有運旺來內容已更新"
								: resolvedSearchParams.saved === "togetherness"
									? "團體諮商內容已更新"
								: "內容已更新"}
					</span>
				</div>
			) : null}

			{resolvedSearchParams.uploaded ? (
				<div className="rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-700">
					圖片已上傳：
					<a className="ml-1 underline" href={resolvedSearchParams.uploaded} target="_blank">
						{resolvedSearchParams.uploaded}
					</a>
				</div>
			) : null}

			{resolvedSearchParams.error ? (
				<div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
					{resolvedSearchParams.error === "json"
						? "資料格式錯誤，請重新送出。"
						: resolvedSearchParams.error === "missing"
							? activeTab === "collaborative"
								? "這次儲存沒有通過，下面列的是實際卡住的欄位或資料。"
								: "缺少欄位，請重新提交。"
						: resolvedSearchParams.error === "readonly_upload"
								? "目前部署環境是唯讀檔案系統，無法直接上傳圖片。請改用外部圖片 URL（例如 Cloudinary/Imgur）貼到照片路徑。"
								: resolvedSearchParams.error === "readonly_fs"
							? "目前部署環境是唯讀檔案系統，無法儲存本地內容檔。若要線上可編輯，需改用外部儲存（例如 Supabase/Blob）。"
							: resolvedSearchParams.error === "upload_type"
								? activeTab === "collaborative"
									? "只能上傳 PDF 檔案。"
									: "只能上傳圖片檔案。"
								: resolvedSearchParams.error === "upload_size"
									? activeTab === "collaborative"
										? "PDF 大小不可超過 15MB。"
										: "圖片大小不可超過 8MB。"
									: "儲存或上傳失敗，請稍後再試。"}
					{errorDetails.length > 0 ? (
						<div className="mt-3 space-y-1 rounded-xl border border-red-200 bg-white/70 p-3 text-xs text-red-700">
							{errorDetails.map((item, index) => (
								<p key={`${item}-${index}`}>- {item}</p>
							))}
						</div>
					) : resolvedSearchParams.detail ? (
						<p className="mt-2 text-xs text-red-600">detail: {resolvedSearchParams.detail}</p>
					) : null}
				</div>
			) : null}

			{activeTab === "brand" ? (
				<section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
					<div className="mb-4 flex flex-wrap items-center justify-between gap-3">
						<div>
							<h2 className="text-xl font-semibold text-zinc-900">Brand Philosophy 編輯器</h2>
							<p className="mt-1 text-sm text-zinc-600">Director + Team 的完整表單編輯。</p>
						</div>
					</div>

					<div className="mb-5 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
						<p className="mb-2 text-xs text-zinc-600">圖片上傳（上傳後可套用到 Director 或 Team）</p>
						<form action={uploadBrandImage} className="flex flex-wrap items-center gap-3">
							<input type="file" name="imageFile" accept="image/*" className="text-xs text-zinc-700" required />
							<button
								type="submit"
								className="rounded-full border border-zinc-300 px-4 py-2 text-xs text-zinc-700 transition hover:bg-zinc-100"
							>
								上傳圖片
							</button>
						</form>
					</div>

					<form action={saveBrandPageContent} className="space-y-4">
						<BrandEditor
							initialContent={brandContent}
							uploadedUrl={resolvedSearchParams.uploaded}
						/>

						<div className="mt-5 flex justify-end gap-3">
							<p className="text-xs text-zinc-500 flex items-center">按儲存後會自動保存，請勿重複按</p>
							<button
								type="submit"
								className="rounded-full bg-amber-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								儲存 Brand 內容
							</button>
						</div>
					</form>
				</section>
			) : null}

			{activeTab === "collaborative" ? (
				<section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
					<form action={saveCollaborativeProjectsContent} className="space-y-4">
						<CollaborativeProjectsEditor
							initialProjects={collaborativeProjects}
							scales={psychometricScales}
							consents={researchConsents}
						/>

						<div className="mt-5 flex justify-end gap-3">
							<p className="text-xs text-zinc-500 flex items-center">按儲存後會自動保存，請勿重複按</p>
							<button
								type="submit"
								className="rounded-full bg-amber-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-amber-500"
							>
								儲存協力招來內容
							</button>
						</div>
					</form>
				</section>
			) : null}

			{activeTab === "psychometrics" ? (
				<section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
					<form action={savePsychometricScalesContent} className="space-y-4">
						<PsychometricScalesEditor initialScales={psychometricScales} />

						<div className="mt-5 flex justify-end gap-3">
							<p className="text-xs text-zinc-500 flex items-center">按儲存後會自動保存，請勿重複按</p>
							<button
								type="submit"
								className="rounded-full bg-amber-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-amber-500"
							>
								儲存心理量表內容
							</button>
						</div>
					</form>
				</section>
			) : null}

			{activeTab === "consent" ? (
				<section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
					<div className="mb-5 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
						<p className="mb-2 text-xs text-zinc-600">PDF 上傳（研究計劃書 / 同意書附件）</p>
						<form action={uploadResearchConsentPdf} className="flex flex-wrap items-center gap-3">
							<input type="file" name="pdfFile" accept="application/pdf,.pdf" className="text-xs text-zinc-700" required />
							<button
								type="submit"
								className="rounded-full border border-zinc-300 px-4 py-2 text-xs text-zinc-700 transition hover:bg-zinc-100"
							>
								上傳 PDF
							</button>
						</form>
						{resolvedSearchParams.uploadedPdf ? (
							<p className="mt-3 text-xs text-sky-700">
								已上傳：
								<a className="ml-1 underline" href={resolvedSearchParams.uploadedPdf} target="_blank">
									{resolvedSearchParams.uploadedPdf}
								</a>
							</p>
						) : null}
					</div>

					<form action={saveResearchConsentsContent} className="space-y-4">
						<ResearchConsentsEditor
							initialConsents={researchConsents}
							uploadedPdfUrl={resolvedSearchParams.uploadedPdf}
						/>

						<div className="mt-5 flex justify-end gap-3">
							<p className="text-xs text-zinc-500 flex items-center">按儲存後會自動保存，請勿重複按</p>
							<button
								type="submit"
								className="rounded-full bg-amber-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-amber-500"
							>
								儲存研究同意書內容
							</button>
						</div>
					</form>
				</section>
			) : null}

			{activeTab === "fortune" ? (
				<section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
					<form action={saveFortuneLecturesContent} className="space-y-4">
						<FortuneLecturesEditor initialLectures={fortuneLectures} />

						<div className="mt-5 flex justify-end gap-3">
							<p className="text-xs text-zinc-500 flex items-center">按儲存後會自動保存，請勿重複按</p>
							<button
								type="submit"
								className="rounded-full bg-amber-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								儲存 Fortune 內容
							</button>
						</div>
					</form>
				</section>
			) : null}

			{activeTab === "heartfelt" ? (
				<section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
					<div className="mb-5 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
						<p className="mb-2 text-xs text-zinc-600">圖片上傳（上傳後可套用到影片封面）</p>
						<form action={uploadHeartfeltImage} className="flex flex-wrap items-center gap-3">
							<input type="file" name="imageFile" accept="image/*" className="text-xs text-zinc-700" required />
							<button
								type="submit"
								className="rounded-full border border-zinc-300 px-4 py-2 text-xs text-zinc-700 transition hover:bg-zinc-100"
							>
								上傳圖片
							</button>
						</form>
					</div>

					<form action={saveHeartfeltVideosContent} className="space-y-4">
						<HeartfeltVideosEditor
							initialVideos={heartfeltVideos}
							uploadedUrl={resolvedSearchParams.uploaded}
						/>

						<div className="mt-5 flex justify-end gap-3">
							<p className="text-xs text-zinc-500 flex items-center">按儲存後會自動保存，請勿重複按</p>
							<button
								type="submit"
								className="rounded-full bg-amber-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								儲存 Heartfelt 內容
							</button>
						</div>
					</form>
				</section>
			) : null}

			{activeTab === "togetherness" ? (
				<section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
					<div className="mb-5 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
						<p className="mb-2 text-xs text-zinc-600">圖片上傳（上傳後可套用到團體封面）</p>
						<form action={uploadTogethernessImage} className="flex flex-wrap items-center gap-3">
							<input type="file" name="imageFile" accept="image/*" className="text-xs text-zinc-700" required />
							<button
								type="submit"
								className="rounded-full border border-zinc-300 px-4 py-2 text-xs text-zinc-700 transition hover:bg-zinc-100"
							>
								上傳圖片
							</button>
						</form>
					</div>

					<form action={saveTogethernessGroupsContent} className="space-y-4">
						<TogethernessGroupsEditor
							initialGroups={togethernessGroups}
							leaderOptions={togethernessLeaderOptions}
							uploadedUrl={resolvedSearchParams.uploaded}
						/>

						<div className="mt-5 flex justify-end gap-3">
							<p className="text-xs text-zinc-500 flex items-center">按儲存後會自動保存，請勿重複按</p>
							<button
								type="submit"
								className="rounded-full bg-amber-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								儲存 Togetherness 內容
							</button>
						</div>
					</form>
				</section>
			) : null}
		</div>
	);
}
