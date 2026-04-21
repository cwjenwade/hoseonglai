import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getSiteContentSection } from "@/lib/site-content-server";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import { DEFAULT_BRAND_PAGE_CONTENT, normalizeBrandPageContent } from "@/app/brand-philosophy/brand-content";
import { DEFAULT_HOME_PAGE_CONTENT, normalizeHomePageContent } from "@/app/home-content";
import { HEARTFELT_VIDEOS } from "@/app/heartfelt-momentum/videos-data";
import { LECTURES } from "@/app/fortune-arrives/lectures-data";
import { GROUPS } from "@/app/togetherness/group-data";
import { RESEARCH_PROJECTS, normalizeResearchProjects } from "@/app/collaborative-prosperity/projects";
import { DEFAULT_PSYCHOMETRIC_SCALES } from "@/app/collaborative-prosperity/assessment-data";
import { DEFAULT_RESEARCH_CONSENTS } from "@/app/collaborative-prosperity/consent-data";
import { adminLogout } from "../actions";
import { isLocalAdminPreviewAuthenticated } from "../local-preview-auth";
import { deleteProjectData } from "./actions";

export const metadata: Metadata = {
  title: "管理後台儀表板",
  robots: {
    index: false,
    follow: false,
  },
};

type RegistrationData = {
  id: string;
  created_at: string;
  [key: string]: unknown;
};

type PsychAnswerRow = {
  test_id: string;
  participant_code: string;
  answer_map: unknown;
};

type AdminDashboardPageProps = {
  searchParams: Promise<{
    tab?: string;
    researchView?: string;
    deleted?: string;
    project?: string;
    deleteError?: string;
  }>;
};

const TABS = [
  { id: "lectures", label: "講座報名", table: "lecture_registrations" },
  { id: "groups", label: "團體報名", table: "group_registrations" },
  { id: "research", label: "研究報名", table: "research_registrations" },
  { id: "psych", label: "心理測驗", table: "psych_test_results" },
  { id: "newsletter", label: "電子報訂閱", table: "newsletter_subscribers" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const DELETE_CONFIRM_CODE = "DELETETHESEDATA";
const PAGE_SIZE = 1000;

function safeString(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return String(value);
}

function parseResearchMeta(
  value: unknown,
): {
  projectId?: string;
  projectStatus?: string;
  registrationKind?: string;
  contactVisibility?: string;
  age?: number;
} | null {
  if (typeof value !== "string" || !value.trim()) return null;

  try {
    const parsed = JSON.parse(value) as {
      projectId?: unknown;
      projectStatus?: unknown;
      registrationKind?: unknown;
      contactVisibility?: unknown;
      age?: unknown;
    };
    return {
      projectId: typeof parsed.projectId === "string" ? parsed.projectId : undefined,
      projectStatus:
        typeof parsed.projectStatus === "string" ? parsed.projectStatus : undefined,
      registrationKind:
        typeof parsed.registrationKind === "string"
          ? parsed.registrationKind
          : undefined,
      contactVisibility:
        typeof parsed.contactVisibility === "string"
          ? parsed.contactVisibility
          : undefined,
      age: typeof parsed.age === "number" ? parsed.age : undefined,
    };
  } catch {
    return null;
  }
}

function normalizeAnswerMap(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return Object.entries(value as Record<string, unknown>).reduce<Record<string, unknown>>(
    (acc, [key, entryValue]) => {
      acc[String(key)] = entryValue;
      return acc;
    },
    {},
  );
}

function answerMapFromArray(answers: unknown): Record<string, unknown> {
  if (!Array.isArray(answers)) return {};

  return Object.fromEntries(
    answers.map((value, index) => [String(index + 1).padStart(3, "0"), value]),
  );
}

function psychProjectTitle(testTitle: unknown, testId: unknown): string {
  const title = safeString(testTitle);
  if (!title) return safeString(testId) || "未命名專案";
  return title.split("|")[0]?.trim() || safeString(testId) || "未命名專案";
}

function countRowsWithinDays(rows: RegistrationData[], days: number) {
  const now = Date.now();
  const threshold = now - days * 24 * 60 * 60 * 1000;

  return rows.filter((row) => {
    const createdAt = Date.parse(String(row.created_at || ""));
    return Number.isFinite(createdAt) && createdAt >= threshold;
  }).length;
}

function latestUpdated(items: Array<{ updatedAt?: unknown }>): string {
  const values = items
    .map((item) => String(item.updatedAt || "").trim())
    .filter(Boolean)
    .sort();

  return values.at(-1) || "";
}

async function fetchAllRows(
  supabase: Awaited<ReturnType<typeof getSupabaseServerClient>>,
  table: string,
) {
  const rows: RegistrationData[] = [];
  let from = 0;

  while (true) {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order("created_at", { ascending: false })
      .range(from, from + PAGE_SIZE - 1);

    if (error) {
      return { rows: [] as RegistrationData[], error: error.message };
    }

    const chunk = (data || []) as RegistrationData[];
    rows.push(...chunk);

    if (chunk.length < PAGE_SIZE) {
      break;
    }

    from += PAGE_SIZE;
  }

  return { rows, error: null as string | null };
}

type ProjectBlock = {
  projectKey: string;
  projectLabel: string;
  rows: RegistrationData[];
  ids: string[];
};

const RESEARCH_VIEWS = [
  { id: "waiting_list", label: "Waiting List" },
  { id: "quantitative_enroll", label: "Quantitative" },
  { id: "qualitative_enroll", label: "Qualitative" },
] as const;

type ResearchViewId = (typeof RESEARCH_VIEWS)[number]["id"];

function getResearchViewLabel(value: string | undefined): string {
  const match = RESEARCH_VIEWS.find((item) => item.id === value);
  return match?.label || "Research";
}

export default async function AdminDashboardPage({
  searchParams,
}: AdminDashboardPageProps) {
  const resolvedSearchParams = await searchParams;
  const activeTab = (resolvedSearchParams.tab || "lectures") as TabId;
  const tab = TABS.find((t) => t.id === activeTab) || TABS[0];
  const activeResearchView = RESEARCH_VIEWS.some(
    (view) => view.id === resolvedSearchParams.researchView,
  )
    ? (resolvedSearchParams.researchView as ResearchViewId)
    : "waiting_list";

  const supabase = await getSupabaseServerClient();
  const localPreviewAdmin = await isLocalAdminPreviewAuthenticated();

  if (!localPreviewAdmin) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/admin");
    }

    const { data: adminRow, error: adminError } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (adminError || !adminRow) {
      return (
        <div className="mx-auto w-full max-w-3xl px-6 py-12">
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-zinc-900">管理儀表板</h1>
            <p className="mt-3 text-sm leading-7 text-zinc-700">
              你已登入，但尚未被授權為 admin。
            </p>
            <p className="mt-3 text-sm leading-7 text-zinc-600">
              請在 Supabase 資料庫建立 admin_users 記錄後再試。
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/"
                className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100"
              >
                返回首頁
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

            {adminError ? (
              <pre className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-xs text-zinc-700">
                {safeString(adminError.message)}
              </pre>
            ) : null}
          </div>
        </div>
      );
    }
  }

  const [
    lectureSummary,
    groupSummary,
    researchSummary,
    newsletterSummary,
    homeContent,
    brandContent,
    heartfeltVideos,
    lecturesContent,
    groupsContent,
    researchProjectsContent,
    psychometricsContent,
    consentsContent,
  ] = await Promise.all([
    fetchAllRows(supabase, "lecture_registrations"),
    fetchAllRows(supabase, "group_registrations"),
    fetchAllRows(supabase, "research_registrations"),
    fetchAllRows(supabase, "newsletter_subscribers"),
    getSiteContentSection("home_page_content", DEFAULT_HOME_PAGE_CONTENT).then((value) =>
      normalizeHomePageContent(value),
    ),
    getSiteContentSection("brand_philosophy_page", DEFAULT_BRAND_PAGE_CONTENT).then((value) =>
      normalizeBrandPageContent(value),
    ),
    getSiteContentSection("heartfelt_momentum_videos", HEARTFELT_VIDEOS),
    getSiteContentSection("fortune_arrives_lectures", LECTURES),
    getSiteContentSection("togetherness_groups", GROUPS),
    getSiteContentSection("collaborative_prosperity_projects", RESEARCH_PROJECTS).then((value) =>
      normalizeResearchProjects(value, RESEARCH_PROJECTS),
    ),
    getSiteContentSection(
      "collaborative_prosperity_assessments",
      DEFAULT_PSYCHOMETRIC_SCALES,
    ),
    getSiteContentSection(
      "collaborative_prosperity_consents",
      DEFAULT_RESEARCH_CONSENTS,
    ),
  ]);

  const opsSummary = [
    {
      key: "lectures",
      label: "講座報名數",
      total: lectureSummary.rows.length,
      delta: countRowsWithinDays(lectureSummary.rows, 7),
    },
    {
      key: "groups",
      label: "團體報名數",
      total: groupSummary.rows.length,
      delta: countRowsWithinDays(groupSummary.rows, 7),
    },
    {
      key: "research",
      label: "研究報名數",
      total: researchSummary.rows.length,
      delta: countRowsWithinDays(researchSummary.rows, 7),
    },
    {
      key: "newsletter",
      label: "電子報訂閱數",
      total: newsletterSummary.rows.length,
      delta: countRowsWithinDays(newsletterSummary.rows, 7),
    },
  ];

  const contentSummary = [
    {
      key: "home",
      label: "Home",
      total: 1,
      published: homeContent.isPublished === false ? 0 : 1,
      draft: homeContent.isPublished === false ? 1 : 0,
      updatedAt: latestUpdated([homeContent]),
    },
    {
      key: "brand",
      label: "Brand",
      total: 1,
      published: brandContent.isPublished === false ? 0 : 1,
      draft: brandContent.isPublished === false ? 1 : 0,
      updatedAt: latestUpdated([brandContent]),
    },
    {
      key: "research-videos",
      label: "Research Videos",
      total: heartfeltVideos.length,
      published: heartfeltVideos.filter((item) => item.isPublished !== false).length,
      draft: heartfeltVideos.filter((item) => item.isPublished === false).length,
      updatedAt: latestUpdated(heartfeltVideos),
    },
    {
      key: "lectures",
      label: "Lectures & Events",
      total: lecturesContent.length,
      published: lecturesContent.filter((item) => item.isPublished !== false).length,
      draft: lecturesContent.filter((item) => item.isPublished === false).length,
      updatedAt: latestUpdated(lecturesContent),
    },
    {
      key: "groups",
      label: "Groups",
      total: groupsContent.length,
      published: groupsContent.filter((item) => item.isPublished !== false).length,
      draft: groupsContent.filter((item) => item.isPublished === false).length,
      updatedAt: latestUpdated(groupsContent),
    },
    {
      key: "research-projects",
      label: "Research Projects",
      total: researchProjectsContent.length,
      published: researchProjectsContent.filter((item) => item.isPublished !== false).length,
      draft: researchProjectsContent.filter((item) => item.isPublished === false).length,
      updatedAt: latestUpdated(researchProjectsContent),
    },
    {
      key: "psychometrics",
      label: "Psychometrics",
      total: psychometricsContent.length,
      published: psychometricsContent.filter((item) => item.isPublished !== false).length,
      draft: psychometricsContent.filter((item) => item.isPublished === false).length,
      updatedAt: latestUpdated(psychometricsContent),
    },
    {
      key: "consents",
      label: "Consents",
      total: consentsContent.length,
      published: consentsContent.filter((item) => item.isPublished !== false).length,
      draft: consentsContent.filter((item) => item.isPublished === false).length,
      updatedAt: latestUpdated(consentsContent),
    },
  ];

  const { rows, error } = await fetchAllRows(supabase, tab.table);
  const visibleRows =
    tab.id === "research"
      ? rows.filter((row) => {
          const meta = parseResearchMeta(row.interest_note);
          return (meta?.registrationKind || "waiting_list") === activeResearchView;
        })
      : rows;

  const psychAnswerLookup = new Map<string, Record<string, unknown>>();
  if (tab.id === "psych") {
    const { rows: answerRows } = await fetchAllRows(supabase, "psych_test_answer_columns");
    (answerRows as unknown as PsychAnswerRow[]).forEach((row) => {
      const key = `${safeString(row.test_id)}::${safeString(row.participant_code)}`;
      psychAnswerLookup.set(key, normalizeAnswerMap(row.answer_map));
    });
  }

  const blockMap = new Map<string, ProjectBlock>();

  if (tab.id === "newsletter") {
    blockMap.set("newsletter_all", {
      projectKey: "newsletter_all",
      projectLabel: "全部訂閱",
      rows: visibleRows,
      ids: visibleRows.map((row) => safeString(row.id)).filter(Boolean),
    });
  } else {
    visibleRows.forEach((row) => {
      let projectKey = "unknown";
      let projectLabel = "未命名專案";

      if (tab.id === "lectures") {
        projectKey = safeString(row.lecture_id) || "unknown";
        projectLabel = safeString(row.lecture_title) || projectKey;
      }

      if (tab.id === "groups") {
        projectKey = safeString(row.group_slug) || "unknown";
        projectLabel = safeString(row.group_title) || projectKey;
      }

      if (tab.id === "research") {
        const meta = parseResearchMeta(row.interest_note);
        const baseProjectKey =
          meta?.projectId || safeString(row.video_url) || "unknown";
        const kind = meta?.registrationKind || activeResearchView;
        projectKey = `${kind}::${baseProjectKey}`;
        projectLabel = `${safeString(row.video_title) || baseProjectKey} · ${getResearchViewLabel(kind)}`;
      }

      if (tab.id === "psych") {
        projectKey = safeString(row.test_id) || "unknown";
        projectLabel = psychProjectTitle(row.test_title, row.test_id);
      }

      const existing = blockMap.get(projectKey);
      if (existing) {
        existing.rows.push(row);
        existing.ids.push(safeString(row.id));
      } else {
        blockMap.set(projectKey, {
          projectKey,
          projectLabel,
          rows: [row],
          ids: [safeString(row.id)],
        });
      }
    });
  }

  const blocks = Array.from(blockMap.values()).sort((a, b) => b.rows.length - a.rows.length);

  const deleteErrorMessage =
    resolvedSearchParams.deleteError === "invalid_code"
      ? `保護碼錯誤，請輸入 ${DELETE_CONFIRM_CODE}`
      : resolvedSearchParams.deleteError === "forbidden"
        ? "你沒有刪除權限"
        : resolvedSearchParams.deleteError
          ? "刪除失敗，請稍後再試"
          : "";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">管理儀表板</h1>
          <p className="mt-1 text-sm text-zinc-600">查看與管理各專案報名與訂閱資料</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/dashboard/content"
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100"
          >
            內容管理
          </Link>
          <Link
            href="/"
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100"
          >
            返回首頁
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

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {opsSummary.map((item) => (
          <article
            key={item.key}
            className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              {item.label}
            </p>
            <p className="mt-3 text-3xl font-bold text-zinc-900">{item.total}</p>
            <p className="mt-2 text-sm text-emerald-700">近 7 天 +{item.delta}</p>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">內容狀態摘要</h2>
            <p className="mt-1 text-sm text-zinc-600">
              依模組統計總筆數、已發布數、未發布數與最後更新時間。
            </p>
          </div>
          <Link
            href="/admin/dashboard/content"
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100"
          >
            前往內容管理
          </Link>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200">
                <th className="pb-3 font-semibold text-zinc-900">模組</th>
                <th className="pb-3 font-semibold text-zinc-900">總筆數</th>
                <th className="pb-3 font-semibold text-zinc-900">已發布</th>
                <th className="pb-3 font-semibold text-zinc-900">未發布</th>
                <th className="pb-3 font-semibold text-zinc-900">最後更新</th>
              </tr>
            </thead>
            <tbody>
              {contentSummary.map((item) => (
                <tr key={item.key} className="border-b border-zinc-100">
                  <td className="py-3 font-medium text-zinc-900">{item.label}</td>
                  <td className="py-3 text-zinc-700">{item.total}</td>
                  <td className="py-3 text-emerald-700">{item.published}</td>
                  <td className="py-3 text-amber-700">{item.draft}</td>
                  <td className="py-3 text-zinc-500">
                    {item.updatedAt
                      ? new Date(item.updatedAt).toLocaleString("zh-TW")
                      : "未記錄"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-4">
          <div className="flex flex-wrap gap-2">
            {TABS.map((t) => (
              <Link
                key={t.id}
                href={`/admin/dashboard?tab=${encodeURIComponent(t.id)}`}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  t.id === tab.id
                    ? "bg-amber-600 text-white"
                    : "border border-zinc-300 text-zinc-700 hover:bg-zinc-100"
                }`}
              >
                {t.label}
              </Link>
            ))}
          </div>

          <Link
            href={`/api/admin/export?table=${encodeURIComponent(tab.table)}&scope=all${
              tab.id === "research"
                ? `&researchView=${encodeURIComponent(activeResearchView)}`
                : ""
            }`}
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100"
          >
            匯出 CSV（全部）
          </Link>
        </div>

        {tab.id === "research" ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {RESEARCH_VIEWS.map((view) => {
              const isActive = view.id === activeResearchView;
              return (
                <Link
                  key={view.id}
                  href={`/admin/dashboard?tab=research&researchView=${encodeURIComponent(view.id)}`}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-zinc-900 text-white"
                      : "border border-zinc-300 text-zinc-700 hover:bg-zinc-100"
                  }`}
                >
                  {view.label}
                </Link>
              );
            })}
          </div>
        ) : null}

        {resolvedSearchParams.deleted === "1" ? (
          <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            已刪除專案資料：{safeString(resolvedSearchParams.project) || "(未提供專案代碼)"}
          </p>
        ) : null}

        {deleteErrorMessage ? (
          <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {deleteErrorMessage}
          </p>
        ) : null}

        <div className="mt-4">
          {error ? (
            <p className="text-sm text-red-700">載入資料失敗：{safeString(error)}</p>
          ) : visibleRows.length === 0 ? (
            <p className="text-center text-sm text-zinc-500">尚無資料</p>
          ) : (
            <div className="space-y-6">
              {blocks.map((block) => (
                <section
                  key={`${tab.id}-${block.projectKey}`}
                  className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-zinc-900">{block.projectLabel}</h3>
                      <p className="mt-1 text-xs text-zinc-600">
                        專案代碼：
                        {tab.id === "research"
                          ? block.projectKey.split("::").slice(1).join("::")
                          : block.projectKey}{" "}
                        ｜ 共 {block.rows.length} 筆
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {tab.id !== "newsletter" ? (
                        <Link
                          href={`/api/admin/export?table=${encodeURIComponent(tab.table)}&scope=project&project=${encodeURIComponent(
                            tab.id === "research"
                              ? block.projectKey.split("::").slice(1).join("::")
                              : block.projectKey,
                          )}${
                            tab.id === "research"
                              ? `&researchView=${encodeURIComponent(activeResearchView)}`
                              : ""
                          }`}
                          className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs text-zinc-700 transition hover:bg-zinc-100"
                        >
                          匯出此專案（全數）
                        </Link>
                      ) : null}

                      {tab.id !== "newsletter" ? (
                        <form action={deleteProjectData} className="flex flex-wrap items-center gap-2">
                          <input type="hidden" name="tab" value={tab.id} />
                          {tab.id === "research" ? (
                            <input type="hidden" name="researchView" value={activeResearchView} />
                          ) : null}
                          <input type="hidden" name="table" value={tab.table} />
                          <input type="hidden" name="projectKey" value={block.projectKey} />
                          <input type="hidden" name="ids" value={block.ids.join(",")} />
                          <input
                            type="text"
                            name="confirmCode"
                            placeholder={DELETE_CONFIRM_CODE}
                            className="w-44 rounded-full border border-red-300 bg-white px-3 py-1.5 text-xs text-red-700 placeholder:text-red-300"
                            required
                          />
                          <button
                            type="submit"
                            className="rounded-full border border-red-300 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-100"
                          >
                            刪除此專案資料
                          </button>
                        </form>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-zinc-200">
                          <th className="pb-3 font-semibold text-zinc-900">ID</th>
                          {tab.id === "lectures" && (
                            <>
                              <th className="pb-3 font-semibold text-zinc-900">姓名</th>
                              <th className="pb-3 font-semibold text-zinc-900">Email</th>
                              <th className="pb-3 font-semibold text-zinc-900">手機</th>
                            </>
                          )}
                          {tab.id === "groups" && (
                            <>
                              <th className="pb-3 font-semibold text-zinc-900">姓名</th>
                              <th className="pb-3 font-semibold text-zinc-900">Email</th>
                              <th className="pb-3 font-semibold text-zinc-900">手機</th>
                              <th className="pb-3 font-semibold text-zinc-900">時段</th>
                            </>
                          )}
                          {tab.id === "research" && (
                            <>
                              <th className="pb-3 font-semibold text-zinc-900">姓名</th>
                              <th className="pb-3 font-semibold text-zinc-900">Email</th>
                              <th className="pb-3 font-semibold text-zinc-900">類型 / 備註</th>
                            </>
                          )}
                          {tab.id === "psych" && (
                            <>
                              <th className="pb-3 font-semibold text-zinc-900">受試者代碼</th>
                              <th className="pb-3 font-semibold text-zinc-900">得分</th>
                              <th className="pb-3 font-semibold text-zinc-900">每題答案</th>
                            </>
                          )}
                          {tab.id === "newsletter" && (
                            <>
                              <th className="pb-3 font-semibold text-zinc-900">姓名</th>
                              <th className="pb-3 font-semibold text-zinc-900">Email</th>
                            </>
                          )}
                          <th className="pb-3 font-semibold text-zinc-900">建立時間</th>
                        </tr>
                      </thead>
                      <tbody>
                        {block.rows.map((item) => {
                          const participantCode = safeString(item.user_name);
                          const answerKey = `${safeString(item.test_id)}::${participantCode}`;
                          const answerMap =
                            tab.id === "psych"
                              ? psychAnswerLookup.get(answerKey) || answerMapFromArray(item.answers)
                              : {};
                          const researchMeta =
                            tab.id === "research" ? parseResearchMeta(item.interest_note) : null;

                          return (
                            <tr key={safeString(item.id)} className="border-b border-zinc-100 align-top">
                              <td className="py-3 text-xs text-zinc-500">
                                {safeString(item.id).slice(0, 8)}...
                              </td>
                              {tab.id === "lectures" && (
                                <>
                                  <td className="py-3 text-zinc-700">{safeString(item.user_name)}</td>
                                  <td className="py-3 text-zinc-700">{safeString(item.user_email)}</td>
                                  <td className="py-3 text-zinc-700">{safeString(item.user_phone)}</td>
                                </>
                              )}
                              {tab.id === "groups" && (
                                <>
                                  <td className="py-3 text-zinc-700">{safeString(item.user_name)}</td>
                                  <td className="py-3 text-zinc-700">{safeString(item.user_email)}</td>
                                  <td className="py-3 text-zinc-700">{safeString(item.user_phone)}</td>
                                  <td className="py-3 text-zinc-700">
                                    {Array.isArray(item.availability_slots)
                                      ? (item.availability_slots as unknown[]).join(", ")
                                      : "-"}
                                  </td>
                                </>
                              )}
                              {tab.id === "research" && (
                                <>
                                  <td className="py-3 text-zinc-700">{safeString(item.user_name)}</td>
                                  <td className="py-3 text-zinc-700">{safeString(item.user_email)}</td>
                                  <td className="py-3 text-zinc-700">
                                    {researchMeta ? (
                                      <div className="space-y-1 text-xs text-zinc-600">
                                        <p>status: {researchMeta.projectStatus || "-"}</p>
                                        <p>kind: {researchMeta.registrationKind || "-"}</p>
                                        <p>visibility: {researchMeta.contactVisibility || "-"}</p>
                                        <p>age: {researchMeta.age ?? "-"}</p>
                                      </div>
                                    ) : (
                                      safeString(item.interest_note) || "-"
                                    )}
                                  </td>
                                </>
                              )}
                              {tab.id === "psych" && (
                                <>
                                  <td className="py-3 text-zinc-700">{participantCode}</td>
                                  <td className="py-3 text-zinc-700">{safeString(item.total_score)}</td>
                                  <td className="py-3 text-zinc-700">
                                    <details>
                                      <summary className="cursor-pointer text-xs text-zinc-600">
                                        {Object.keys(answerMap).length} 題
                                      </summary>
                                      <pre className="mt-2 max-h-36 overflow-auto rounded-xl bg-zinc-100 p-2 text-xs">
                                        {JSON.stringify(answerMap, null, 2)}
                                      </pre>
                                    </details>
                                  </td>
                                </>
                              )}
                              {tab.id === "newsletter" && (
                                <>
                                  <td className="py-3 text-zinc-700">{safeString(item.name) || "-"}</td>
                                  <td className="py-3 text-zinc-700">{safeString(item.email)}</td>
                                </>
                              )}
                              <td className="py-3 text-xs text-zinc-500">
                                {item.created_at
                                  ? new Date(String(item.created_at)).toLocaleString("zh-TW")
                                  : ""}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
