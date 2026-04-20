"use client";

import { useMemo, useState } from "react";
import type { ResearchFlowContent } from "@/app/collaborative-prosperity/research-flow-content";

type ResearchFlowEditorProps = {
  initialContent: ResearchFlowContent;
};

export default function ResearchFlowEditor({ initialContent }: ResearchFlowEditorProps) {
  const [content, setContent] = useState<ResearchFlowContent>(initialContent);
  const payload = useMemo(() => content, [content]);

  return (
    <div className="space-y-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
      <div>
        <h3 className="text-base font-semibold text-zinc-900">Legacy Email 回流頁（start）文案編輯</h3>
        <p className="mt-1 text-xs text-zinc-600">
          Deprecated：前台主流程已改為 Google Form；此內容僅保留給歷史 token flow。
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <label className="text-xs text-zinc-700">
          失效提示標籤（eyebrow）
          <input
            value={content.invalidEyebrow}
            onChange={(e) => setContent((prev) => ({ ...prev, invalidEyebrow: e.target.value }))}
            className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
          />
        </label>

        <label className="text-xs text-zinc-700">
          失效頁按鈕文字
          <input
            value={content.invalidBackButtonLabel}
            onChange={(e) => setContent((prev) => ({ ...prev, invalidBackButtonLabel: e.target.value }))}
            className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
          />
        </label>
      </div>

      <label className="block text-xs text-zinc-700">
        失效頁標題
        <input
          value={content.invalidTitle}
          onChange={(e) => setContent((prev) => ({ ...prev, invalidTitle: e.target.value }))}
          className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
        />
      </label>

      <label className="block text-xs text-zinc-700">
        失效頁說明
        <textarea
          value={content.invalidDescription}
          onChange={(e) => setContent((prev) => ({ ...prev, invalidDescription: e.target.value }))}
          className="mt-1 min-h-20 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-amber-400"
        />
      </label>

      <div className="grid gap-3 md:grid-cols-2">
        <label className="text-xs text-zinc-700">
          正常頁標籤（eyebrow）
          <input
            value={content.accessEyebrow}
            onChange={(e) => setContent((prev) => ({ ...prev, accessEyebrow: e.target.value }))}
            className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
          />
        </label>

        <label className="text-xs text-zinc-700">
          確認按鈕文字
          <input
            value={content.confirmButtonLabel}
            onChange={(e) => setContent((prev) => ({ ...prev, confirmButtonLabel: e.target.value }))}
            className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
          />
        </label>
      </div>

      <label className="block text-xs text-zinc-700">
        歡迎標題前綴（姓名會自動顯示在下一行）
        <input
          value={content.welcomeHeading}
          onChange={(e) => setContent((prev) => ({ ...prev, welcomeHeading: e.target.value }))}
          className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
        />
      </label>

      <label className="block text-xs text-zinc-700">
        主要說明（可用 {'{projectTitle}'} 代入專案名稱）
        <textarea
          value={content.introPrimary}
          onChange={(e) => setContent((prev) => ({ ...prev, introPrimary: e.target.value }))}
          className="mt-1 min-h-20 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-amber-400"
        />
      </label>

      <label className="block text-xs text-zinc-700">
        次要說明
        <textarea
          value={content.introSecondary}
          onChange={(e) => setContent((prev) => ({ ...prev, introSecondary: e.target.value }))}
          className="mt-1 min-h-20 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-amber-400"
        />
      </label>

      <input type="hidden" name="flowPayload" value={JSON.stringify(payload)} />
    </div>
  );
}
