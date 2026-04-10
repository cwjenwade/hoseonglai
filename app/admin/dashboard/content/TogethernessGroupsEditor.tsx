"use client";

import { useMemo, useState } from "react";
import {
  GROUP_TAG_PRESETS,
  normalizeGroupTags,
  suggestGroupTags,
  type GroupItem,
} from "@/app/togetherness/group-data";

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
    tags: [],
  };
}

function normalizeInitialGroup(group: GroupItem): GroupItem {
  return {
    ...group,
    tags: normalizeGroupTags(group.tags?.length ? group.tags : suggestGroupTags(group)),
  };
}

export default function TogethernessGroupsEditor({
  initialGroups,
  uploadedUrl,
}: TogethernessGroupsEditorProps) {
  const [groups, setGroups] = useState<GroupItem[]>(() => (initialGroups || []).map(normalizeInitialGroup));

  const payload = useMemo(
    () =>
      groups.map((group) => ({
        ...group,
        tags: normalizeGroupTags(group.tags || []),
      })),
    [groups],
  );

  const updateGroupTags = (index: number, nextTags: string[]) => {
    setGroups((prev) => prev.map((item, i) => (i === index ? { ...item, tags: normalizeGroupTags(nextTags) } : item)));
  };

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

            <div className="mt-3">
              <label className="block text-xs text-zinc-700">
                標籤（逗號分隔，前台顯示 # 標籤）
                <input
                  value={(group.tags || []).join(", ")}
                  onChange={(e) =>
                    updateGroupTags(
                      index,
                      e.target.value
                        .split(",")
                        .map((tag) => tag.trim())
                        .filter(Boolean),
                    )
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                  placeholder="親密關係, 性少數, 存在主題"
                />
              </label>

              <div className="mt-2 flex flex-wrap gap-2">
                {GROUP_TAG_PRESETS.map((tag) => {
                  const active = (group.tags || []).includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        const current = group.tags || [];
                        updateGroupTags(
                          index,
                          active ? current.filter((item) => item !== tag) : [...current, tag],
                        );
                      }}
                      className={[
                        "rounded-full border px-3 py-1 text-[11px] transition",
                        active
                          ? "border-zinc-900 bg-zinc-900 text-white"
                          : "border-zinc-300 bg-white text-zinc-600 hover:border-zinc-500",
                      ].join(" ")}
                    >
                      #{tag}
                    </button>
                  );
                })}
              </div>
            </div>

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
