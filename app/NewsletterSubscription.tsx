"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function NewsletterSubscription() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("請輸入 Email");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("newsletter_subscribers").insert({
        email: email,
        name: name.trim() || null,
      });

      if (error) throw error;

      setSubmitted(true);
      setEmail("");
      setName("");

      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error("訂閱失敗：", error);
      alert("訂閱失敗，請稍後再試");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-amber-200 bg-white p-6">
      <h3 className="text-lg font-bold text-zinc-900">訂閱電子報</h3>
      <p className="mt-1 text-sm text-zinc-600">
        第一時間收到最新講座、研究與心理資源資訊
      </p>

      {submitted ? (
        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
          <p className="text-sm font-semibold text-emerald-800">訂閱成功！</p>
          <p className="mt-1 text-xs text-emerald-700">感謝你的訂閱，我們會定期寄送資訊給你。</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="你的名字（選填）"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 flex-1 rounded-xl border border-zinc-300 px-4 text-sm outline-none transition focus:border-amber-400"
          />
          <input
            type="email"
            placeholder="你的 Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 flex-1 rounded-xl border border-zinc-300 px-4 text-sm outline-none transition focus:border-amber-400"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="h-11 rounded-xl bg-amber-600 px-6 text-sm font-medium text-white transition hover:bg-amber-700 disabled:opacity-50"
          >
            {loading ? "訂閱中..." : "訂閱"}
          </button>
        </form>
      )}
    </div>
  );
}
