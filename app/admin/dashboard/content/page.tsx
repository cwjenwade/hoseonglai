import Link from "next/link";
import { redirect } from "next/navigation";
import { adminLogout } from "@/app/admin/actions";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import { getSiteContentSection } from "@/lib/site-content-server";
import { DEFAULT_BRAND_PAGE_CONTENT } from "@/app/brand-philosophy/brand-content";
import { RESEARCH_PROJECTS } from "@/app/collaborative-prosperity/projects";
import { LECTURES } from "@/app/fortune-arrives/lectures-data";
import { HEARTFELT_VIDEOS } from "@/app/heartfelt-momentum/videos-data";
import BrandEditor from "./BrandEditor";
import CollaborativeProjectsEditor from "./CollaborativeProjectsEditor";
import FortuneLecturesEditor from "./FortuneLecturesEditor";
import HeartfeltVideosEditor from "./HeartfeltVideosEditor";
import {
	saveBrandPageContent,
	saveCollaborativeProjectsContent,
	saveFortuneLecturesContent,
	saveHeartfeltVideosContent,
	uploadHeartfeltImage,
	uploadBrandImage,
} from "./actions";

type PageProps = {
	searchParams: Promise<{ saved?: string; error?: string; uploaded?: string; detail?: string; tab?: string }>;
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

	const brandContent = await getSiteContentSection("brand_philosophy_page", DEFAULT_BRAND_PAGE_CONTENT);
	const collaborativeProjects = await getSiteContentSection(
		"collaborative_prosperity_projects",
		RESEARCH_PROJECTS,
	);
	const fortuneLectures = await getSiteContentSection("fortune_arrives_lectures", LECTURES);
	const heartfeltVideos = await getSiteContentSection("heartfelt_momentum_videos", HEARTFELT_VIDEOS);

	const tabs = [
		{ key: "brand", name: "Brand Philosophy" },
		{ key: "collaborative", name: "Collaborative Prosperity" },
		{ key: "heartfelt", name: "Heartfelt Momentum" },
		{ key: "fortune", name: "Fortune Arrives" },
		{ key: "togetherness", name: "Togetherness" },
	] as const;

	const activeTab = tabs.some((tab) => tab.key === resolvedSearchParams.tab)
		? (resolvedSearchParams.tab as (typeof tabs)[number]["key"])
		: "brand";

	const modules = [
		{ name: "Brand Philosophy", status: "已完成" },
		{ name: "Heartfelt Momentum", status: "已完成" },
		{ name: "Fortune Arrives", status: "已完成" },
		{ name: "Togetherness", status: "下一步" },
		{ name: "Collaborative Prosperity", status: "已完成" },
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

			<div className="grid gap-3 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm md:grid-cols-5">
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
				<div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
					{resolvedSearchParams.saved === "brand"
						? "Brand 內容已更新"
						: resolvedSearchParams.saved === "collaborative"
							? "Collaborative Prosperity 內容已更新"
							: resolvedSearchParams.saved === "heartfelt"
								? "Heartfelt Momentum 內容已更新"
							: resolvedSearchParams.saved === "fortune"
								? "Fortune Arrives 內容已更新"
							: "內容已更新"}
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
							? "缺少欄位，請重新提交。"
							: resolvedSearchParams.error === "readonly_upload"
								? "目前部署環境是唯讀檔案系統，無法直接上傳圖片。請改用外部圖片 URL（例如 Cloudinary/Imgur）貼到照片路徑。"
								: resolvedSearchParams.error === "readonly_fs"
									? "目前部署環境是唯讀檔案系統，無法儲存本地內容檔。若要線上可編輯，需改用外部儲存（例如 Supabase/Blob）。"
							: resolvedSearchParams.error === "upload_type"
								? "只能上傳圖片檔案。"
								: resolvedSearchParams.error === "upload_size"
									? "圖片大小不可超過 8MB。"
									: "儲存或上傳失敗，請稍後再試。"}
					{resolvedSearchParams.detail ? (
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

					<form action={saveBrandPageContent}>
						<BrandEditor
							initialContent={brandContent}
							uploadedUrl={resolvedSearchParams.uploaded}
						/>

						<div className="mt-5 flex justify-end">
							<button
								type="submit"
								className="rounded-full bg-amber-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-amber-500"
							>
								儲存 Brand 內容
							</button>
						</div>
					</form>
				</section>
			) : null}

			{activeTab === "collaborative" ? (
				<section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
					<form action={saveCollaborativeProjectsContent}>
						<CollaborativeProjectsEditor initialProjects={collaborativeProjects} />

						<div className="mt-5 flex justify-end">
							<button
								type="submit"
								className="rounded-full bg-amber-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-amber-500"
							>
								儲存 Collaborative 內容
							</button>
						</div>
					</form>
				</section>
			) : null}

			{activeTab === "fortune" ? (
				<section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
					<form action={saveFortuneLecturesContent}>
						<FortuneLecturesEditor initialLectures={fortuneLectures} />

						<div className="mt-5 flex justify-end">
							<button
								type="submit"
								className="rounded-full bg-amber-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-amber-500"
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

					<form action={saveHeartfeltVideosContent}>
						<HeartfeltVideosEditor
							initialVideos={heartfeltVideos}
							uploadedUrl={resolvedSearchParams.uploaded}
						/>

						<div className="mt-5 flex justify-end">
							<button
								type="submit"
								className="rounded-full bg-amber-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-amber-500"
							>
								儲存 Heartfelt 內容
							</button>
						</div>
					</form>
				</section>
			) : null}

			{activeTab === "togetherness" ? (
				<section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
					<h2 className="text-xl font-semibold text-zinc-900">此頁籤準備中</h2>
					<p className="mt-2 text-sm text-zinc-600">下一步會依同樣編輯邏輯補上此模組表單。</p>
				</section>
			) : null}
		</div>
	);
}
