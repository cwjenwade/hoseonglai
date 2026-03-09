"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type ResearchRegistrationProps = {
  videoUrl: string;
  videoTitle: string;
  onClose: () => void;
};

export default function ResearchRegistrationForm({
  videoUrl,
  videoTitle,
  onClose,
}: ResearchRegistrationProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [autoSaved, setAutoSaved] = useState(false);

  const submitForm = async () => {
    if (loading || submitted) return;
    if (!name.trim() || !email.trim()) {
      alert("請至少填寫姓名與 Email");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("research_registrations").insert({
        video_url: videoUrl,
        video_title: videoTitle,
        user_name: name,
        user_email: email,
        interest_note: interest,
      });

      if (error) throw error;

      setSubmitted(true);
      setAutoSaved(true);
    } catch (error) {
      console.error("報名失敗：", error);
      alert("報名失敗，請稍後再試");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!name.trim() || !email.trim() || submitted) return;

    const timer = setTimeout(() => {
      void submitForm();
    }, 800);

    return () => clearTimeout(timer);
  }, [name, email, interest, submitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm();
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-center">
        <h5 className="text-lg font-bold text-emerald-800">登記成功！</h5>
        <p className="mt-2 text-sm text-emerald-700">
          感謝你對此研究主題的興趣，我們會將後續資訊寄到你的信箱。
        </p>
        <button
          onClick={onClose}
          className="mt-4 rounded-full bg-emerald-600 px-4 py-2 text-sm text-white transition hover:bg-emerald-700"
        >
          關閉
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h5 className="text-base font-semibold text-zinc-900">登記研究興趣</h5>
      {autoSaved && !submitted && (
        <p className="text-xs text-emerald-700">已自動保存草稿，稍後會自動送出。</p>
      )}

      <input
        type="text"
        placeholder="姓名"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="h-10 w-full rounded-xl border border-zinc-300 px-4 text-sm outline-none transition focus:border-amber-400"
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-10 w-full rounded-xl border border-zinc-300 px-4 text-sm outline-none transition focus:border-amber-400"
        required
      />

      <textarea
        placeholder="你對這主題有什麼想法或期待？（選填）"
        value={interest}
        onChange={(e) => setInterest(e.target.value)}
        className="w-full rounded-xl border border-zinc-300 px-4 py-2 text-sm outline-none transition focus:border-amber-400"
        rows={3}
      />

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-full bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700 disabled:opacity-50"
        >
          {loading ? "送出中..." : "確認登記"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100"
        >
          取消
        </button>
      </div>
    </form>
  );
}
