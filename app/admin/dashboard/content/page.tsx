import Link from "next/link";
import { redirect } from "next/navigation";
import { adminLogout } from "@/app/admin/actions";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import { getSiteContentSection, type SiteContentSection } from "@/lib/site-content-server";
import { saveSiteContent, uploadSectionImage } from "./actions";
import { TEAM_MEMBERS } from "@/app/brand-philosophy/team-data";
import { HEARTFELT_VIDEOS } from "@/app/heartfelt-momentum/videos-data";
import { LECTURES } from "@/app/fortune-arrives/lectures-data";
import { GROUPS } from "@/app/togetherness/group-data";
import { RESEARCH_PROJECTS } from "@/app/collaborative-prosperity/projects";

type PageProps = {
	searchParams: Promise<{
		saved?: string;
		error?: string;
		section?: string;
		uploaded?: string;
	}>;
};

type SectionDef = {
	section: SiteContentSection;
	title: string;
	description: string;
	fallback: unknown;
};

const SECTIONS: SectionDef[] = [
	{
		section: "brand_philosophy_team",
		title: "Brand Philosophy｜Team 成員",
		description: "可新增/修改成員資料（姓名、介紹、圖片）。",
		fallback: TEAM_MEMBERS,
	},
	{
		section: "heartfelt_momentum_videos",
		title: "Heartfelt Momentum｜影片卡片",
		description: "可修改每張卡片標題、內文、圖片、tag。",
		fallback: HEARTFELT_VIDEOS,
	},
	{
		section: "fortune_arrives_lectures",
		title: "Fortune Arrives｜講座卡片",
		description: "可修改講座清單與講座詳情欄位。",
		fallback: LECTURES,
	},
	{
		section: "togetherness_groups",
		title: "Togetherness｜團體卡片",
		description: "可修改團體標題、描述、圖片。",
		fallback: GROUPS,
	},
	{
		section: "collaborative_prosperity_projects",
		title: "Collaborative Prosperity｜研究專案",
		description: "可修改研究卡片標題、內文與測驗路徑。",
		fallback: RESEARCH_PROJECTS,
	},
];

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

	return (
		<div className="space-y-6">
			<div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
				<div>
					<h1 className="text-2xl font-bold text-zinc-900">內容管理（前台資料）</h1>
					<p className="mt-1 text-sm text-zinc-600">只更新資料，不更動前台版型。</p>
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

			{resolvedSearchParams.saved ? (
				<div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
					已更新：{resolvedSearchParams.saved}
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
						? "JSON 格式錯誤，請修正後再儲存。"
						: resolvedSearchParams.error === "missing"
							? "缺少欄位，請重新提交。"
							: resolvedSearchParams.error === "upload_type"
								? "只能上傳圖片檔案。"
								: resolvedSearchParams.error === "upload_size"
									? "圖片大小不可超過 8MB。"
									: resolvedSearchParams.error === "upload"
										? "圖片上傳失敗，請稍後再試。"
										: "儲存失敗，請稍後再試。"}
					{resolvedSearchParams.section ? `（${resolvedSearchParams.section}）` : ""}
				</div>
			) : null}

			<div className="space-y-6">
				{await Promise.all(
					SECTIONS.map(async (item) => {
						const currentData = await getSiteContentSection(item.section, item.fallback);
						const jsonText = JSON.stringify(currentData, null, 2);

						return (
							<section
								key={item.section}
								className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
							>
								<div className="mb-4">
									<h2 className="text-xl font-semibold text-zinc-900">{item.title}</h2>
									<p className="mt-1 text-sm text-zinc-600">{item.description}</p>
								</div>

								<div className="mb-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
									<p className="mb-3 text-xs text-zinc-600">圖片上傳（上傳後把 URL 貼進下方 JSON）</p>
									<form action={uploadSectionImage} className="flex flex-wrap items-center gap-3">
										<input type="hidden" name="section" value={item.section} />
										<input
											type="file"
											name="imageFile"
											accept="image/*"
											className="text-xs text-zinc-700"
											required
										/>
										<button
											type="submit"
											className="rounded-full border border-zinc-300 px-4 py-2 text-xs text-zinc-700 transition hover:bg-zinc-100"
										>
											上傳圖片
										</button>
									</form>
								</div>

								<form action={saveSiteContent} className="space-y-4">
									<input type="hidden" name="section" value={item.section} />
									<textarea
										name="jsonData"
										defaultValue={jsonText}
										className="h-80 w-full rounded-2xl border border-zinc-300 bg-zinc-50 p-4 font-mono text-xs leading-6 text-zinc-800 outline-none focus:border-amber-400"
										spellCheck={false}
										required
									/>

									<div className="flex flex-wrap items-center gap-3">
										<button
											type="submit"
											className="rounded-full bg-amber-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-amber-500"
										>
											儲存這個區塊
										</button>
										<p className="text-xs text-zinc-500">建議先複製備份，再編輯 JSON。</p>
									</div>
								</form>
							</section>
						);
					}),
				)}
			</div>
		</div>
	);
}
