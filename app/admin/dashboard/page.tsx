import Link from "next/link";
import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import { adminLogout } from "../actions";

type RegistrationData = {
  id: string;
  created_at: string;
  [key: string]: unknown;
};

type AdminDashboardPageProps = {
  searchParams: Promise<{ tab?: string }>;
};

const TABS = [
  { id: "lectures", label: "講座報名", table: "lecture_registrations" },
  { id: "groups", label: "團體報名", table: "group_registrations" },
  { id: "research", label: "研究報名", table: "research_registrations" },
  { id: "psych", label: "心理測驗", table: "psych_test_results" },
  { id: "newsletter", label: "電子報訂閱", table: "newsletter_subscribers" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function safeString(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return String(value);
}

export default async function AdminDashboardPage({
  searchParams,
}: AdminDashboardPageProps) {
  const resolvedSearchParams = await searchParams;
  const activeTab = (resolvedSearchParams.tab || "lectures") as TabId;
  const tab = TABS.find((t) => t.id === activeTab) || TABS[0];

  const supabase = await getSupabaseServerClient();
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

  const { data, error } = await supabase
    .from(tab.table)
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  const rows = (data || []) as RegistrationData[];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">管理儀表板</h1>
          <p className="mt-1 text-sm text-zinc-600">查看所有報名與訂閱資料</p>
        </div>
        <div className="flex gap-3">
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
            href={`/api/admin/export?table=${encodeURIComponent(tab.table)}`}
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100"
          >
            匯出 CSV（前 200 筆）
          </Link>
        </div>

        <div className="mt-4">
          {error ? (
            <p className="text-sm text-red-700">載入資料失敗：{safeString(error.message)}</p>
          ) : rows.length === 0 ? (
            <p className="text-center text-sm text-zinc-500">尚無資料</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-200">
                    <th className="pb-3 font-semibold text-zinc-900">ID</th>
                    {tab.id === "lectures" && (
                      <>
                        <th className="pb-3 font-semibold text-zinc-900">講座</th>
                        <th className="pb-3 font-semibold text-zinc-900">姓名</th>
                        <th className="pb-3 font-semibold text-zinc-900">Email</th>
                        <th className="pb-3 font-semibold text-zinc-900">手機</th>
                      </>
                    )}
                    {tab.id === "groups" && (
                      <>
                        <th className="pb-3 font-semibold text-zinc-900">團體</th>
                        <th className="pb-3 font-semibold text-zinc-900">姓名</th>
                        <th className="pb-3 font-semibold text-zinc-900">Email</th>
                        <th className="pb-3 font-semibold text-zinc-900">手機</th>
                        <th className="pb-3 font-semibold text-zinc-900">時段</th>
                      </>
                    )}
                    {tab.id === "research" && (
                      <>
                        <th className="pb-3 font-semibold text-zinc-900">專案</th>
                        <th className="pb-3 font-semibold text-zinc-900">姓名</th>
                        <th className="pb-3 font-semibold text-zinc-900">Email</th>
                        <th className="pb-3 font-semibold text-zinc-900">備註</th>
                      </>
                    )}
                    {tab.id === "psych" && (
                      <>
                        <th className="pb-3 font-semibold text-zinc-900">測驗</th>
                        <th className="pb-3 font-semibold text-zinc-900">受試者代碼</th>
                        <th className="pb-3 font-semibold text-zinc-900">得分</th>
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
                  {rows.map((item) => (
                    <tr key={item.id} className="border-b border-zinc-100">
                      <td className="py-3 text-xs text-zinc-500">
                        {safeString(item.id).slice(0, 8)}...
                      </td>
                      {tab.id === "lectures" && (
                        <>
                          <td className="py-3 text-zinc-700">{safeString(item.lecture_title)}</td>
                          <td className="py-3 text-zinc-700">{safeString(item.user_name)}</td>
                          <td className="py-3 text-zinc-700">{safeString(item.user_email)}</td>
                          <td className="py-3 text-zinc-700">{safeString(item.user_phone)}</td>
                        </>
                      )}
                      {tab.id === "groups" && (
                        <>
                          <td className="py-3 text-zinc-700">{safeString(item.group_title)}</td>
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
                          <td className="py-3 text-zinc-700">{safeString(item.video_title)}</td>
                          <td className="py-3 text-zinc-700">{safeString(item.user_name)}</td>
                          <td className="py-3 text-zinc-700">{safeString(item.user_email)}</td>
                          <td className="py-3 text-zinc-700">{safeString(item.interest_note) || "-"}</td>
                        </>
                      )}
                      {tab.id === "psych" && (
                        <>
                          <td className="py-3 text-zinc-700">{safeString(item.test_title)}</td>
                          <td className="py-3 text-zinc-700">{safeString(item.user_name)}</td>
                          <td className="py-3 text-zinc-700">{safeString(item.total_score)}</td>
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
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
