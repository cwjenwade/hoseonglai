import type { Metadata } from "next";
import AdminLoginForm from "./AdminLoginForm";

export const metadata: Metadata = {
  title: "管理後台",
};

export default function AdminPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800 text-xl font-bold text-white">
            A
          </div>
          <h2 className="mt-4 text-2xl font-bold text-zinc-900">管理後台登入</h2>
          <p className="mt-2 text-sm text-zinc-600">請輸入帳號與密碼以繼續</p>
        </div>

        <AdminLoginForm />
      </div>
    </div>
  );
}
