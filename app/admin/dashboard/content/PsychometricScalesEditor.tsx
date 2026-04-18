"use client";

import { useMemo, useState } from "react";
import type { PsychometricScale } from "@/app/collaborative-prosperity/assessment-data";

type PsychometricScalesEditorProps = {
  initialScales: PsychometricScale[];
};

function createEmptyScale(): PsychometricScale {
  return {
    projectId: `new-scale-${Date.now().toString(36)}`,
    projectTitleZh: "",
    projectTitleEn: "",
    scalePrompt: "請依照實際情況作答。",
    options: ["非常不同意", "不同意", "普通", "同意", "非常同意"],
    questions: [""],
  };
}

export default function PsychometricScalesEditor({ initialScales }: PsychometricScalesEditorProps) {
  const [scales, setScales] = useState<PsychometricScale[]>(initialScales || []);

  const payload = useMemo(() => scales, [scales]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900">心理量表資料庫</h2>
          <p className="mt-1 text-sm text-zinc-600">
            管理量表題項與量尺選項。Collaborative Prosperity 的 Quantitative 專案可直接選用這裡的既有量表。
          </p>
        </div>

        <button
          type="button"
          onClick={() => setScales((prev) => [...prev, createEmptyScale()])}
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100"
        >
          新增量表
        </button>
      </div>

      <div className="space-y-4">
        {scales.map((scale, scaleIndex) => (
          <article key={`${scale.projectId}-${scaleIndex}`} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
            <div className="grid gap-3 md:grid-cols-2">
              <label className="text-xs text-zinc-700">
                專案 ID（對應 tests/[projectId]）
                <input
                  value={scale.projectId}
                  onChange={(e) =>
                    setScales((prev) =>
                      prev.map((item, i) => (i === scaleIndex ? { ...item, projectId: e.target.value } : item)),
                    )
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                />
              </label>

              <label className="text-xs text-zinc-700">
                研究標題（中文）
                <input
                  value={scale.projectTitleZh}
                  onChange={(e) =>
                    setScales((prev) =>
                      prev.map((item, i) => (i === scaleIndex ? { ...item, projectTitleZh: e.target.value } : item)),
                    )
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                />
              </label>

              <label className="text-xs text-zinc-700">
                研究標題（英文）
                <input
                  value={scale.projectTitleEn}
                  onChange={(e) =>
                    setScales((prev) =>
                      prev.map((item, i) => (i === scaleIndex ? { ...item, projectTitleEn: e.target.value } : item)),
                    )
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                />
              </label>
            </div>

            <p className="mt-2 text-xs text-zinc-500">
              受試者填寫頁：/collaborative-prosperity/tests/{scale.projectId || "<projectId>"}
            </p>

            <label className="mt-3 block text-xs text-zinc-700">
              量尺說明文字
              <input
                value={scale.scalePrompt}
                onChange={(e) =>
                  setScales((prev) =>
                    prev.map((item, i) => (i === scaleIndex ? { ...item, scalePrompt: e.target.value } : item)),
                  )
                }
                className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
              />
            </label>

            <div className="mt-3 rounded-xl border border-zinc-200 bg-white p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-medium text-zinc-700">量尺選項</p>
                <button
                  type="button"
                  onClick={() =>
                    setScales((prev) =>
                      prev.map((item, i) =>
                        i === scaleIndex ? { ...item, options: [...item.options, ""] } : item,
                      ),
                    )
                  }
                  className="rounded-full border border-zinc-300 px-3 py-1 text-xs text-zinc-700 transition hover:bg-zinc-100"
                >
                  新增選項
                </button>
              </div>

              <div className="space-y-2">
                {scale.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="grid grid-cols-[1fr_auto] gap-2">
                    <input
                      value={option}
                      onChange={(e) =>
                        setScales((prev) =>
                          prev.map((item, i) => {
                            if (i !== scaleIndex) return item;
                            const nextOptions = [...item.options];
                            nextOptions[optionIndex] = e.target.value;
                            return { ...item, options: nextOptions };
                          }),
                        )
                      }
                      className="h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setScales((prev) =>
                          prev.map((item, i) => {
                            if (i !== scaleIndex) return item;
                            return {
                              ...item,
                              options: item.options.filter((_, idx) => idx !== optionIndex),
                            };
                          }),
                        )
                      }
                      className="rounded-lg border border-red-200 px-3 text-xs text-red-600 transition hover:bg-red-50"
                    >
                      刪除
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 rounded-xl border border-zinc-200 bg-white p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-medium text-zinc-700">量表題項</p>
                <button
                  type="button"
                  onClick={() =>
                    setScales((prev) =>
                      prev.map((item, i) =>
                        i === scaleIndex ? { ...item, questions: [...item.questions, ""] } : item,
                      ),
                    )
                  }
                  className="rounded-full border border-zinc-300 px-3 py-1 text-xs text-zinc-700 transition hover:bg-zinc-100"
                >
                  新增題目
                </button>
              </div>

              <div className="space-y-2">
                {scale.questions.map((question, questionIndex) => (
                  <div key={questionIndex} className="grid grid-cols-[1fr_auto] gap-2">
                    <input
                      value={question}
                      onChange={(e) =>
                        setScales((prev) =>
                          prev.map((item, i) => {
                            if (i !== scaleIndex) return item;
                            const nextQuestions = [...item.questions];
                            nextQuestions[questionIndex] = e.target.value;
                            return { ...item, questions: nextQuestions };
                          }),
                        )
                      }
                      className="h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setScales((prev) =>
                          prev.map((item, i) => {
                            if (i !== scaleIndex) return item;
                            return {
                              ...item,
                              questions: item.questions.filter((_, idx) => idx !== questionIndex),
                            };
                          }),
                        )
                      }
                      className="rounded-lg border border-red-200 px-3 text-xs text-red-600 transition hover:bg-red-50"
                    >
                      刪除
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setScales((prev) => prev.filter((_, i) => i !== scaleIndex))}
                className="rounded-full border border-red-200 px-3 py-1 text-xs text-red-600 transition hover:bg-red-50"
              >
                刪除此量表
              </button>
            </div>
          </article>
        ))}
      </div>

      <input type="hidden" name="payload" value={JSON.stringify(payload)} />
    </div>
  );
}
