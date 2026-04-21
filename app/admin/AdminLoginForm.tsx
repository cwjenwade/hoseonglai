"use client";

import { useActionState } from "react";
import type { AdminLoginState } from "./actions";
import { adminLogin } from "./actions";

const initialState: AdminLoginState = { ok: true };

export default function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(
    adminLogin,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4">
      {!state.ok && state.message ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-center text-sm text-red-700">
          {state.message}
        </div>
      ) : null}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-zinc-700">
          Email / localhost username
        </label>
        <input
          id="email"
          name="email"
          type="text"
          className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-4 text-sm outline-none transition focus:border-amber-400"
          placeholder="admin@example.com / localhost: admin"
          autoComplete="username"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-zinc-700">
          密碼
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-4 text-sm outline-none transition focus:border-amber-400"
          placeholder="輸入密碼"
          autoComplete="current-password"
          required
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="h-11 w-full rounded-xl bg-zinc-800 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:opacity-50"
      >
        {pending ? "登入中..." : "登入"}
      </button>
    </form>
  );
}
