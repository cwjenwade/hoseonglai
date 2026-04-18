"use client";

import { useMemo, useState } from "react";
import type { ResearchConsent } from "@/app/collaborative-prosperity/consent-data";

type ResearchConsentsEditorProps = {
  initialConsents: ResearchConsent[];
};

function createEmptyConsent(): ResearchConsent {
  return {
    projectId: `consent-${Date.now().toString(36)}`,
    projectTitleZh: "",
    projectTitleEn: "",
    principalInvestigator: "",
    researchUnit: "Ho-Se 好勢旺來研究團隊",
    researchDescription: "",
  };
}

export default function ResearchConsentsEditor({ initialConsents }: ResearchConsentsEditorProps) {
  const [consents, setConsents] = useState<ResearchConsent[]>(initialConsents || []);

  const payload = useMemo(() => consents, [consents]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900">研究同意書資料庫</h2>
          <p className="mt-1 text-sm text-zinc-600">管理可供 collaborative 專案選用的研究計劃書 / 同意書資料。</p>
        </div>

        <button
          type="button"
          onClick={() => setConsents((prev) => [...prev, createEmptyConsent()])}
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100"
        >
          新增同意書
        </button>
      </div>

      <div className="space-y-4">
        {consents.map((consent, index) => (
          <article key={`${consent.projectId}-${index}`} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
            <div className="grid gap-3 md:grid-cols-2">
              <label className="text-xs text-zinc-700">
                同意書 ID
                <input
                  value={consent.projectId}
                  onChange={(e) =>
                    setConsents((prev) =>
                      prev.map((item, i) =>
                        i === index ? { ...item, projectId: e.target.value } : item,
                      ),
                    )
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                />
              </label>
              <label className="text-xs text-zinc-700">
                研究標題（中文）
                <input
                  value={consent.projectTitleZh}
                  onChange={(e) =>
                    setConsents((prev) =>
                      prev.map((item, i) =>
                        i === index ? { ...item, projectTitleZh: e.target.value } : item,
                      ),
                    )
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                />
              </label>
            </div>

            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <label className="text-xs text-zinc-700">
                研究標題（英文）
                <input
                  value={consent.projectTitleEn}
                  onChange={(e) =>
                    setConsents((prev) =>
                      prev.map((item, i) =>
                        i === index ? { ...item, projectTitleEn: e.target.value } : item,
                      ),
                    )
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                />
              </label>

              <label className="text-xs text-zinc-700">
                計劃主持人（PI）
                <input
                  value={consent.principalInvestigator}
                  onChange={(e) =>
                    setConsents((prev) =>
                      prev.map((item, i) =>
                        i === index ? { ...item, principalInvestigator: e.target.value } : item,
                      ),
                    )
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                />
              </label>
            </div>

            <label className="mt-3 block text-xs text-zinc-700">
              研究單位
              <input
                value={consent.researchUnit}
                onChange={(e) =>
                  setConsents((prev) =>
                    prev.map((item, i) => (i === index ? { ...item, researchUnit: e.target.value } : item)),
                  )
                }
                className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
              />
            </label>

            <label className="mt-3 block text-xs text-zinc-700">
              研究事項說明
              <textarea
                value={consent.researchDescription}
                onChange={(e) =>
                  setConsents((prev) =>
                    prev.map((item, i) =>
                      i === index ? { ...item, researchDescription: e.target.value } : item,
                    ),
                  )
                }
                className="mt-1 h-28 w-full rounded-lg border border-zinc-300 p-3 text-sm outline-none focus:border-amber-400"
              />
            </label>

            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setConsents((prev) => prev.filter((_, i) => i !== index))}
                className="rounded-full border border-red-200 px-3 py-1 text-xs text-red-600 transition hover:bg-red-50"
              >
                刪除此同意書
              </button>
            </div>
          </article>
        ))}
      </div>

      <input type="hidden" name="payload" value={JSON.stringify(payload)} />
    </div>
  );
}
