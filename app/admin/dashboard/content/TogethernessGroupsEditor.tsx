"use client";

import { useMemo, useState } from "react";
import type { GroupItem } from "@/app/togetherness/group-data";

type TogethernessGroupsEditorProps = {
  initialGroups: GroupItem[];
  uploadedUrl?: string;
};

function createEmptyGroup(): GroupItem {
  const slug = `group-${Date.now().toString(36)}`;
  return {
    slug,
    title: "",
    subtitle: "",
    description: "",
    image: "",
  };
}

export default function TogethernessGroupsEditor({
  initialGroups,
  uploadedUrl,
}: TogethernessGroupsEditorProps) {
  const [groups, setGroups] = useState<GroupItem[]>(initialGroups || []);

  const payload = useMemo(() => groups, [groups]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900">Togetherness 編輯器</h2>
          <p className="mt-1 text-sm text-zinc-600">管理團體諮商卡片（slug、標題、副標、描述、圖片）。</p>
        </div>

        <button
          type="button"
          onClick={() => setGroups((prev) => [...prev, createEmptyGroup()])}
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100"
        >
          新增團體
        </button>
      </div>

      <div className="space-y-4">
        {groups.map((group, index) => (
          <article key={`${group.slug}-${index}`} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
            <div className="grid gap-3 md:grid-cols-2">
              <label className="text-xs text-zinc-700">
                Slug
                <input
                  value={group.slug}
                  onChange={(e) =>
                    setGroups((prev) =>
                      prev.map((item, i) => (i === index ? { ...item, slug: e.target.value } : item)),
                    )
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                  placeholder="group-counseling"
                />
              </label>

              <label className="text-xs text-zinc-700">
                中文標題
                <input
                  value={group.title}
                  onChange={(e) =>
                    setGroups((prev) =>
                      prev.map((item, i) => (i === index ? { ...item, title: e.target.value } : item)),
                    )
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                />
              </label>
            </div>

            <label className="mt-3 block text-xs text-zinc-700">
              英文副標
              <input
                value={group.subtitle}
                onChange={(e) =>
                  setGroups((prev) =>
                    prev.map((item, i) => (i === index ? { ...item, subtitle: e.target.value } : item)),
                  )
                }
                className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                placeholder="Group Counseling"
              />
            </label>

            <label className="mt-3 block text-xs text-zinc-700">
              內容描述
              <textarea
                value={group.description}
                onChange={(e) =>
                  setGroups((prev) =>
                    prev.map((item, i) => (i === index ? { ...item, description: e.target.value } : item)),
                  )
                }
                className="mt-1 h-24 w-full rounded-lg border border-zinc-300 p-3 text-sm outline-none focus:border-amber-400"
              />
            </label>

            <div className="mt-3 grid gap-3 md:grid-cols-[1fr_auto]">
              <label className="text-xs text-zinc-700">
                圖片網址
                <input
                  value={group.image}
                  onChange={(e) =>
                    setGroups((prev) =>
                      prev.map((item, i) => (i === index ? { ...item, image: e.target.value } : item)),
                    )
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                />
              </label>

              {uploadedUrl ? (
                <button
                  type="button"
                  onClick={() =>
                    setGroups((prev) =>
                      prev.map((item, i) => (i === index ? { ...item, image: uploadedUrl } : item)),
                    )
                  }
                  className="mt-5 rounded-full border border-sky-300 px-3 py-2 text-xs text-sky-700 transition hover:bg-sky-100"
                >
                  套用最新上傳
                </button>
              ) : null}
            </div>

            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setGroups((prev) => prev.filter((_, i) => i !== index))}
                className="rounded-full border border-red-200 px-3 py-1 text-xs text-red-600 transition hover:bg-red-50"
              >
                刪除團體
              </button>
            </div>
          </article>
        ))}
      </div>

      <input type="hidden" name="payload" value={JSON.stringify(payload)} />
    </div>
  );
}
