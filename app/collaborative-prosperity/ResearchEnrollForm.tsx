"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ResearchProject } from "./projects";

// Deprecated: retained for historical in-app research flow only.
// Current frontend participation entry is the project Google Form CTA.
type Props = {
  project: ResearchProject;
};

export default function ResearchEnrollForm({ project }: Props) {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isQuantitative = project.status === "quantitative";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/research/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: project.id,
          projectTitle: project.title,
          projectStatus: project.status,
          projectTestUrl: project.testUrl,
          nickname,
          age: Number(age),
          email,
          consentAccepted,
          contactVisibility: project.contactVisibility,
          directStart: isQuantitative,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || "送出失敗");
      }

      if (isQuantitative && data?.startUrl) {
        router.push(String(data.startUrl));
        return;
      }

      setSubmitted(true);
      setNickname("");
      setAge("");
      setEmail("");
      setConsentAccepted(false);
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
          Enrolled
        </p>
        <p
          className="mt-3 text-[1rem] leading-[1.9] text-neutral-700"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          我們已收到你的資料。研究主持人之後會透過你提供的 email 與你聯繫。
        </p>
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
          onChange={(event) => setNickname(event.target.value)}
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
          onChange={(event) => setAge(event.target.value)}
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
          onChange={(event) => setEmail(event.target.value)}
          placeholder="your@email.com"
          className="w-full border-b border-neutral-300 bg-transparent px-0 py-3 text-neutral-900 outline-none placeholder:text-neutral-400"
          style={{ fontFamily: "var(--font-serif)" }}
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-neutral-700">
        <input
          type="checkbox"
          checked={consentAccepted}
          onChange={(event) => setConsentAccepted(event.target.checked)}
          className="mt-1 h-4 w-4 border-neutral-300"
        />
        <span style={{ fontFamily: "var(--font-serif)" }}>
          我已閱讀研究說明與 PDF 文件，並同意依照本研究流程提供資料。
        </span>
      </label>

      {error ? (
        <p
          className="text-sm text-red-600"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading || !consentAccepted}
        className="inline-flex min-h-11 items-center justify-center border border-neutral-900 px-6 text-[0.72rem] uppercase tracking-[0.22em] text-neutral-900 transition hover:bg-neutral-900 hover:text-[#f3f3f2] disabled:cursor-not-allowed disabled:opacity-50"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {loading
          ? "Processing..."
          : isQuantitative
            ? "Continue to consent"
            : "Complete enrollment"}
      </button>
    </form>
  );
}
