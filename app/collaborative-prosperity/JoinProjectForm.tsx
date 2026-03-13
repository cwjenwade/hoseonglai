"use client";

import { useState } from "react";
import type { ResearchProject } from "./projects";

type Props = {
  project: ResearchProject;
};

export default function JoinProjectForm({ project }: Props) {
  const [nickname, setNickname] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(true);
  const [fallbackStartUrl, setFallbackStartUrl] = useState("");
  const [quotaReached, setQuotaReached] = useState(false);
  const [quotaCounter, setQuotaCounter] = useState<{ sentToday: number; dailyLimit: number } | null>(null);
  const [deferredPreference, setDeferredPreference] = useState<
    "tomorrow" | "day_after"
  >("tomorrow");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/research/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: project.id,
          projectTitle: project.title,
          projectTestUrl: project.testUrl,
          nickname,
          age: Number(age),
          email,
          acceptDeferred: quotaReached,
          deferredPreference,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429 && data?.code === "EMAIL_QUOTA_REACHED") {
          setQuotaReached(true);
          setQuotaCounter({
            sentToday: Number(data?.sentToday || 0),
            dailyLimit: Number(data?.dailyLimit || 0),
          });
          setError(data?.message || "今日寄信額度已滿");
          return;
        }
        throw new Error(data?.message || "送出失敗");
      }

      setSubmitted(true);
      setNickname("");
      setAge("");
      setEmail("");
      setEmailSent(data?.emailSent !== false);
      setFallbackStartUrl(String(data?.startUrl || ""));
      setQuotaReached(Boolean(data?.queued));
      setQuotaCounter({
        sentToday: Number(data?.sentToday || 0),
        dailyLimit: Number(data?.dailyLimit || 0),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "送出失敗");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="border border-neutral-300/60 bg-white/40 p-5">
        <p
          className="text-[0.7rem] uppercase tracking-[0.32em] text-neutral-400"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Email sent
        </p>
        <p
          className="mt-3 text-[1rem] leading-[1.9] text-neutral-700"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {quotaReached
            ? "今日發信額度已滿，系統已為你保留名額，將依你選擇的時段寄送同意書連結。"
            : emailSent
              ? "我們已將專屬連結寄送至你的信箱。請前往 email，點擊連結後即可開始填寫此研究專案的心理測驗。"
              : "報名已完成，但驗證信暫時寄送失敗。你可以先用下方備用連結開始，或稍後再試。"}
        </p>
        {!quotaReached && !emailSent && fallbackStartUrl ? (
          <a
            href={fallbackStartUrl}
            className="mt-3 inline-flex border border-neutral-900 px-4 py-2 text-[0.72rem] uppercase tracking-[0.2em] text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            使用備用連結開始
          </a>
        ) : null}
        {quotaCounter ? (
          <p className="mt-2 text-sm text-neutral-500" style={{ fontFamily: "var(--font-sans)" }}>
            今日發信計數：{quotaCounter.sentToday}/{quotaCounter.dailyLimit}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label
          className="mb-2 block text-[0.62rem] uppercase tracking-[0.32em] text-neutral-400"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Nickname
        </label>
        <input
          type="text"
          name="nickname"
          required
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="你的暱稱"
          className="w-full border-b border-neutral-300 bg-transparent px-0 py-3 text-neutral-900 outline-none placeholder:text-neutral-400"
          style={{ fontFamily: "var(--font-serif)" }}
        />
      </div>

      <div>
        <label
          className="mb-2 block text-[0.62rem] uppercase tracking-[0.32em] text-neutral-400"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Age
        </label>
        <input
          type="number"
          name="age"
          min={10}
          max={120}
          required
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="你的年齡"
          className="w-full border-b border-neutral-300 bg-transparent px-0 py-3 text-neutral-900 outline-none placeholder:text-neutral-400"
          style={{ fontFamily: "var(--font-serif)" }}
        />
      </div>

      <div>
        <label
          className="mb-2 block text-[0.62rem] uppercase tracking-[0.32em] text-neutral-400"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full border-b border-neutral-300 bg-transparent px-0 py-3 text-neutral-900 outline-none placeholder:text-neutral-400"
          style={{ fontFamily: "var(--font-serif)" }}
        />
      </div>

      {error ? (
        <p
          className="text-sm text-red-600"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {error}
        </p>
      ) : null}

      {quotaReached ? (
        <div className="space-y-3 rounded-md border border-neutral-300/60 p-3">
          {quotaCounter ? (
            <p className="text-xs text-neutral-500" style={{ fontFamily: "var(--font-sans)" }}>
              今日發信計數：{quotaCounter.sentToday}/{quotaCounter.dailyLimit}
            </p>
          ) : null}
          <p
            className="text-sm text-neutral-700"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            是否願意改為明日或後日寄送同意書連結？
          </p>
          <select
            value={deferredPreference}
            onChange={(e) =>
              setDeferredPreference(e.target.value as "tomorrow" | "day_after")
            }
            className="w-full border-b border-neutral-300 bg-transparent px-0 py-2 text-neutral-900 outline-none"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <option value="tomorrow">明日寄送</option>
            <option value="day_after">後日寄送</option>
          </select>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex min-h-11 items-center justify-center border border-neutral-900 px-6 text-[0.72rem] uppercase tracking-[0.22em] text-neutral-900 transition hover:bg-neutral-900 hover:text-[#f3f3f2] disabled:cursor-not-allowed disabled:opacity-50"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {loading
          ? "Sending..."
          : quotaReached
            ? "Confirm deferred send"
            : "Join project"}
      </button>
    </form>
  );
}