"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("請輸入帳號與密碼");
      return;
    }

    setLoading(true);

    // 這裡暫時用簡單驗證，實際應該連到 Supabase Auth 或後端 API
    // 預設帳號：admin / 密碼：admin123
    if (username === "admin" && password === "admin123") {
      // 儲存登入狀態到 localStorage
      localStorage.setItem("admin_logged_in", "true");
      
      // 導向管理儀表板
      router.push("/admin/dashboard");
    } else {
      setError("帳號或密碼錯誤");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-center text-sm text-red-700">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="username" className="block text-sm font-medium text-zinc-700">
          帳號
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-4 text-sm outline-none transition focus:border-amber-400"
          placeholder="請輸入帳號"
          autoComplete="username"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-zinc-700">
          密碼
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-4 text-sm outline-none transition focus:border-amber-400"
          placeholder="請輸入密碼"
          autoComplete="current-password"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="h-11 w-full rounded-xl bg-zinc-800 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:opacity-50"
      >
        {loading ? "登入中..." : "登入"}
      </button>

      <p className="text-center text-xs text-zinc-500">
        預設帳號：admin / 密碼：admin123
      </p>
    </form>
  );
}
