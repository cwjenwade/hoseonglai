"use client";

import { useState } from "react";
import type { ResearchProject } from "./projects";

type Props = {
  project: ResearchProject;
};

export default function JoinProjectForm({ project }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
          name,
          email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "送出失敗");
      }

      setSubmitted(true);
      setName("");
      setEmail("");
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
          我們已將專屬連結寄送至你的信箱。請前往 email，點擊連結後即可開始填寫此研究專案的心理測驗。
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
          Name
        </label>
        <input
          type="text"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="你的姓名"
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

      <button
        type="submit"
        disabled={loading}
        className="inline-flex min-h-11 items-center justify-center border border-neutral-900 px-6 text-[0.72rem] uppercase tracking-[0.22em] text-neutral-900 transition hover:bg-neutral-900 hover:text-[#f3f3f2] disabled:cursor-not-allowed disabled:opacity-50"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {loading ? "Sending..." : "Join project"}
      </button>
    </form>
  );
}