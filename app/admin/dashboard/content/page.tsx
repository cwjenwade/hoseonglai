import Link from "next/link";
import { redirect } from "next/navigation";
import { adminLogout } from "@/app/admin/actions";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import { getSiteContentSection } from "@/lib/site-content-server";
import { DEFAULT_BRAND_PAGE_CONTENT } from "@/app/brand-philosophy/brand-content";
import BrandEditor from "./BrandEditor";
import { saveBrandPageContent, uploadBrandImage } from "./actions";

type PageProps = {
	searchParams: Promise<{ saved?: string; error?: string; uploaded?: string; detail?: string }>;
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

	const modules = [
		{ name: "Brand Philosophy", status: "已完成（本頁）" },
		{ name: "Heartfelt Momentum", status: "下一步" },
		{ name: "Fortune Arrives", status: "下一步" },
		{ name: "Togetherness", status: "下一步" },
		{ name: "Collaborative Prosperity", status: "下一步" },
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

			{resolvedSearchParams.saved ? (
				<div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
					Brand 內容已更新
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
		</div>
	);
}
