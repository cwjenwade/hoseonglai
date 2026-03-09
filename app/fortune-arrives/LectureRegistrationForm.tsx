"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type LectureRegistrationProps = {
  lectureId: string;
  lectureTitle: string;
  onClose: () => void;
};

export default function LectureRegistrationForm({
  lectureId,
  lectureTitle,
  onClose,
}: LectureRegistrationProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !phone.trim()) {
      alert("請填寫所有欄位");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("lecture_registrations").insert({
        lecture_id: lectureId,
        lecture_title: lectureTitle,
        user_name: name,
        user_email: email,
        user_phone: phone,
      });

      if (error) throw error;

      setSubmitted(true);
    } catch (error) {
      console.error("報名失敗：", error);
      alert("報名失敗，請稍後再試");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <h5 className="text-xl font-bold text-emerald-800">報名成功！</h5>
        <p className="mt-2 text-sm text-emerald-700">
          我們已收到你的報名資訊，會在講座前 3 天寄送提醒信件到你的信箱。
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
      <h5 className="text-lg font-semibold text-zinc-900">填寫報名資訊</h5>

      <input
        type="text"
        placeholder="姓名"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="h-11 w-full rounded-xl border border-zinc-300 px-4 text-sm outline-none transition focus:border-amber-400"
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-11 w-full rounded-xl border border-zinc-300 px-4 text-sm outline-none transition focus:border-amber-400"
        required
      />

      <input
        type="tel"
        placeholder="手機號碼"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="h-11 w-full rounded-xl border border-zinc-300 px-4 text-sm outline-none transition focus:border-amber-400"
        required
      />

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:opacity-50"
        >
          {loading ? "送出中..." : "確認報名"}
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
