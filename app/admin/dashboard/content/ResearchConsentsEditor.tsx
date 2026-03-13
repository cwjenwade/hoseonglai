"use client";

import { useMemo, useState } from "react";
import type { ResearchConsent } from "@/app/collaborative-prosperity/consent-data";

type ResearchConsentsEditorProps = {
  initialConsents: ResearchConsent[];
};

export default function ResearchConsentsEditor({ initialConsents }: ResearchConsentsEditorProps) {
  const [consents, setConsents] = useState<ResearchConsent[]>(initialConsents || []);

  const payload = useMemo(() => consents, [consents]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900">研究同意書編輯器</h2>
          <p className="mt-1 text-sm text-zinc-600">每個研究固定自動對應一份同意書。可編輯 PI、研究單位與研究事項說明。</p>
        </div>
      </div>

      <div className="space-y-4">
        {consents.map((consent, index) => (
          <article key={`${consent.projectId}-${index}`} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
            <div className="grid gap-3 md:grid-cols-2">
              <label className="text-xs text-zinc-700">
                專案 ID（自動對應 tests/[projectId]）
                <input
                  value={consent.projectId}
                  readOnly
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 bg-zinc-100 px-3 text-sm text-zinc-600 outline-none"
                />
              </label>
              <label className="text-xs text-zinc-700">
                研究標題（中文）
                <input
                  value={consent.projectTitleZh}
                  readOnly
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 bg-zinc-100 px-3 text-sm text-zinc-600 outline-none"
                />
              </label>
            </div>

            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <label className="text-xs text-zinc-700">
                研究標題（英文）
                <input
                  value={consent.projectTitleEn}
                  readOnly
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 bg-zinc-100 px-3 text-sm text-zinc-600 outline-none"
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
          </article>
        ))}
      </div>

      <input type="hidden" name="payload" value={JSON.stringify(payload)} />
    </div>
  );
}
