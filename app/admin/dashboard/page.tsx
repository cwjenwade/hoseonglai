"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type RegistrationData = {
  id: string;
  created_at: string;
  [key: string]: any;
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"lectures" | "research" | "psych" | "newsletter">("lectures");
  const [data, setData] = useState<RegistrationData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 檢查登入狀態
    const loggedIn = localStorage.getItem("admin_logged_in");
    if (!loggedIn) {
      router.push("/admin");
      return;
    }

    loadData();
  }, [activeTab, router]);

  const loadData = async () => {
    setLoading(true);
    try {
      let tableName = "";
      switch (activeTab) {
        case "lectures":
          tableName = "lecture_registrations";
          break;
        case "research":
          tableName = "research_registrations";
          break;
        case "psych":
          tableName = "psych_test_results";
          break;
        case "newsletter":
          tableName = "newsletter_subscribers";
          break;
      }

      const { data: results, error } = await supabase
        .from(tableName)
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setData(results || []);
    } catch (error) {
      console.error("載入資料失敗：", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in");
    router.push("/admin");
  };

  const tabs = [
    { id: "lectures" as const, label: "講座報名" },
    { id: "research" as const, label: "研究報名" },
    { id: "psych" as const, label: "心理測驗" },
    { id: "newsletter" as const, label: "電子報訂閱" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
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
          <button
            onClick={handleLogout}
            className="rounded-full bg-zinc-800 px-4 py-2 text-sm text-white transition hover:bg-zinc-700"
          >
            登出
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap gap-2 border-b border-zinc-200 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeTab === tab.id
                  ? "bg-amber-600 text-white"
                  : "border border-zinc-300 text-zinc-700 hover:bg-zinc-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {loading ? (
            <p className="text-center text-sm text-zinc-500">載入中...</p>
          ) : data.length === 0 ? (
            <p className="text-center text-sm text-zinc-500">尚無資料</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-200">
                    <th className="pb-3 font-semibold text-zinc-900">ID</th>
                    {activeTab === "lectures" && (
                      <>
                        <th className="pb-3 font-semibold text-zinc-900">講座</th>
                        <th className="pb-3 font-semibold text-zinc-900">姓名</th>
                        <th className="pb-3 font-semibold text-zinc-900">Email</th>
                        <th className="pb-3 font-semibold text-zinc-900">手機</th>
                      </>
                    )}
                    {activeTab === "research" && (
                      <>
                        <th className="pb-3 font-semibold text-zinc-900">影片</th>
                        <th className="pb-3 font-semibold text-zinc-900">姓名</th>
                        <th className="pb-3 font-semibold text-zinc-900">Email</th>
                        <th className="pb-3 font-semibold text-zinc-900">備註</th>
                      </>
                    )}
                    {activeTab === "psych" && (
                      <>
                        <th className="pb-3 font-semibold text-zinc-900">測驗</th>
                        <th className="pb-3 font-semibold text-zinc-900">姓名</th>
                        <th className="pb-3 font-semibold text-zinc-900">Email</th>
                        <th className="pb-3 font-semibold text-zinc-900">得分</th>
                      </>
                    )}
                    {activeTab === "newsletter" && (
                      <>
                        <th className="pb-3 font-semibold text-zinc-900">姓名</th>
                        <th className="pb-3 font-semibold text-zinc-900">Email</th>
                      </>
                    )}
                    <th className="pb-3 font-semibold text-zinc-900">建立時間</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id} className="border-b border-zinc-100">
                      <td className="py-3 text-xs text-zinc-500">{item.id.slice(0, 8)}...</td>
                      {activeTab === "lectures" && (
                        <>
                          <td className="py-3 text-zinc-700">{item.lecture_title}</td>
                          <td className="py-3 text-zinc-700">{item.user_name}</td>
                          <td className="py-3 text-zinc-700">{item.user_email}</td>
                          <td className="py-3 text-zinc-700">{item.user_phone}</td>
                        </>
                      )}
                      {activeTab === "research" && (
                        <>
                          <td className="py-3 text-zinc-700">{item.video_title}</td>
                          <td className="py-3 text-zinc-700">{item.user_name}</td>
                          <td className="py-3 text-zinc-700">{item.user_email}</td>
                          <td className="py-3 text-zinc-700">{item.interest_note || "-"}</td>
                        </>
                      )}
                      {activeTab === "psych" && (
                        <>
                          <td className="py-3 text-zinc-700">{item.test_title}</td>
                          <td className="py-3 text-zinc-700">{item.user_name}</td>
                          <td className="py-3 text-zinc-700">{item.user_email}</td>
                          <td className="py-3 text-zinc-700">{item.total_score}</td>
                        </>
                      )}
                      {activeTab === "newsletter" && (
                        <>
                          <td className="py-3 text-zinc-700">{item.name || "-"}</td>
                          <td className="py-3 text-zinc-700">{item.email}</td>
                        </>
                      )}
                      <td className="py-3 text-xs text-zinc-500">
                        {new Date(item.created_at).toLocaleString("zh-TW")}
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
