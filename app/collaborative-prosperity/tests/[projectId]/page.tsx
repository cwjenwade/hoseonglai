"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { getTestQuestions } from "../../test-questions";

type SessionPayload = {
  participantCode: string;
  name: string;
  projectId: string;
  projectTitle: string;
};

const OPTIONS = ["非常不同意", "不同意", "普通", "同意", "非常同意"];

export default function TestProjectPage() {
  const params = useParams<{ projectId: string }>();
  const searchParams = useSearchParams();

  const token = searchParams.get("token") || "";
  const projectId = params.projectId;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [session, setSession] = useState<SessionPayload | null>(null);
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submittedCode, setSubmittedCode] = useState("");

  const allAnswered = useMemo(() => !answers.includes(-1), [answers]);

  useEffect(() => {
    async function loadSession() {
      if (!token) {
        setError("缺少驗證連結，請回到研究頁面重新申請");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `/api/research/session?token=${encodeURIComponent(token)}`,
          { cache: "no-store" }
        );
        const data = await res.json();

        if (!res.ok || !data?.payload) {
          throw new Error(
            data?.message || "驗證失敗，請回到研究頁面重新申請"
          );
        }

        if (data.payload.projectId !== projectId) {
          throw new Error("此連結與目前的研究專案不符");
        }

        setSession(data.payload as SessionPayload);
        
        // 載入該專案的題目
        const projectQuestions = getTestQuestions(projectId);
        setQuestions(projectQuestions);
        setAnswers(new Array(projectQuestions.length).fill(-1));
      } catch (err) {
        const message = err instanceof Error ? err.message : "驗證失敗";
        console.error("SESSION_LOAD_ERROR", message);
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    loadSession();
  }, [token, projectId]);

  async function submitAssessment() {
    if (!session || !allAnswered) {
      setError("請完成所有題目");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/research/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          projectId,
          answers,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "送出失敗");
      }

      setSubmittedCode(data.participantCode || session.participantCode);
    } catch (err) {
      setError(err instanceof Error ? err.message : "送出失敗");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="w-full bg-[#f3f3f2] px-6 py-24 text-neutral-900 lg:px-20">
        <p style={{ fontFamily: "var(--font-sans)" }}>讀取中...</p>
      </div>
    );
  }

  if (error && !session) {
    return (
      <div className="w-full bg-[#f3f3f2] px-6 py-24 text-neutral-900 lg:px-20">
        <p
          className="text-[0.68rem] uppercase tracking-[0.34em] text-neutral-400"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Access denied
        </p>

        <h1
          className="mt-6 text-[2.8rem] tracking-[-0.03em]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          無法進入此測驗
        </h1>

        <p
          className="mt-6 max-w-[62ch] text-[1.05rem] leading-[1.9] text-neutral-700"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {error}
        </p>

        <Link
          href="/collaborative-prosperity"
          className="mt-10 inline-flex border border-neutral-900 px-6 py-3 text-[0.72rem] uppercase tracking-[0.22em] hover:bg-neutral-900 hover:text-[#f3f3f2]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Back to projects
        </Link>
      </div>
    );
  }

  if (submittedCode) {
    return (
      <div className="w-full bg-[#f3f3f2] text-neutral-900">
        <section className="border-b border-neutral-300/60">
          <div className="px-6 py-24 lg:px-20">
            <p
              className="text-[0.65rem] uppercase tracking-[0.38em] text-neutral-400"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Completed
            </p>
            <h1
              className="mt-6 text-[3rem] tracking-[-0.025em]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              測驗已完成並儲存
            </h1>
            <p
              className="mt-6 max-w-[62ch] text-[1.05rem] leading-[1.9] text-neutral-700"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              感謝你的參與。你的資料已以受試者代碼儲存，研究資料不含 email。
            </p>
            <p
              className="mt-4 text-neutral-700"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              受試者代碼：{submittedCode}
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#f3f3f2] text-neutral-900">
      <section className="border-b border-neutral-300/60">
        <div className="px-6 py-24 lg:px-20">
          <p
            className="text-[0.65rem] uppercase tracking-[0.38em] text-neutral-400"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Assessment
          </p>

          <h1
            className="mt-6 text-[3rem] tracking-[-0.025em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {session?.projectTitle}
          </h1>

          <p
            className="mt-6 max-w-[62ch] text-[1.05rem] leading-[1.9] text-neutral-700"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            受試者：{session?.name}（代碼 {session?.participantCode}）
          </p>

          <div className="mt-12 space-y-8 border-t border-neutral-300/60 pt-10">
            {questions.map((q: string, index: number) => (
              <div key={q} className="space-y-4">
                <label
                  className="block text-neutral-700"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {String(index + 1).padStart(3, "0")}. {q}
                </label>
                <select
                  value={answers[index]}
                  onChange={(e) => {
                    const next = [...answers];
                    next[index] = Number(e.target.value);
                    setAnswers(next);
                  }}
                  className="w-full max-w-md border border-neutral-300 bg-transparent px-4 py-3 outline-none"
                >
                  <option value={-1}>請選擇</option>
                  {OPTIONS.map((opt, optIdx) => (
                    <option key={opt} value={optIdx}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            {error ? (
              <p className="text-sm text-red-600" style={{ fontFamily: "var(--font-sans)" }}>
                {error}
              </p>
            ) : null}

            <button
              type="button"
              onClick={submitAssessment}
              disabled={submitting}
              className="inline-flex min-h-11 items-center justify-center border border-neutral-900 px-6 text-[0.72rem] uppercase tracking-[0.22em] transition hover:bg-neutral-900 hover:text-[#f3f3f2] disabled:opacity-50"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
