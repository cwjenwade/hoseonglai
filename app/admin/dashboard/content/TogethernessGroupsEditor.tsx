"use client";

import { useMemo, useState } from "react";
import type { GroupItem } from "@/app/togetherness/group-data";

type LeaderOption = {
  id: string;
  nameZh: string;
  nameEn: string;
  titleZh: string;
  photo: string;
};

type TogethernessGroupsEditorProps = {
  initialGroups: GroupItem[];
  leaderOptions: LeaderOption[];
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
    leaderProfileId: "",
    leaderNameZh: "",
    leaderNameEn: "",
    leaderTitleZh: "",
    leaderPhoto: "",
    approach: "",
    suitableFor: "",
    consultationNote: "",
    followUpNote: "",
  };
}

export default function TogethernessGroupsEditor({
  initialGroups,
  leaderOptions,
  uploadedUrl,
}: TogethernessGroupsEditorProps) {
  const [groups, setGroups] = useState<GroupItem[]>(initialGroups || []);

  const payload = useMemo(() => groups, [groups]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900">Togetherness 編輯器</h2>
          <p className="mt-1 text-sm text-zinc-600">管理團體諮商卡片（每個團體可各自設定帶領者、文案、圖片）。</p>
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

            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <label className="text-xs text-zinc-700">
                團體帶領者（可從 Brand Identity 選）
                <select
                  value={group.leaderProfileId || ""}
                  onChange={(e) =>
                    setGroups((prev) =>
                      prev.map((item, i) => {
                        if (i !== index) return item;
                        const matched = leaderOptions.find((option) => option.id === e.target.value);
                        if (!matched) {
                          return {
                            ...item,
                            leaderProfileId: "",
                          };
                        }
                        return {
                          ...item,
                          leaderProfileId: matched.id,
                          leaderNameZh: matched.nameZh,
                          leaderNameEn: matched.nameEn,
                          leaderTitleZh: matched.titleZh,
                          leaderPhoto: matched.photo,
                        };
                      }),
                    )
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                >
                  <option value="">不指定（手動填寫）</option>
                  {leaderOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.nameZh} / {option.nameEn}
                    </option>
                  ))}
                </select>
              </label>

              <label className="text-xs text-zinc-700">
                帶領者頭像（圓框）
                <input
                  value={group.leaderPhoto || ""}
                  onChange={(e) =>
                    setGroups((prev) =>
                      prev.map((item, i) => (i === index ? { ...item, leaderPhoto: e.target.value } : item)),
                    )
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                  placeholder="https://..."
                />
              </label>
            </div>

            <div className="mt-3 grid gap-3 md:grid-cols-3">
              <label className="text-xs text-zinc-700">
                帶領者中文名
                <input
                  value={group.leaderNameZh || ""}
                  onChange={(e) =>
                    setGroups((prev) =>
                      prev.map((item, i) => (i === index ? { ...item, leaderNameZh: e.target.value } : item)),
                    )
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                  placeholder="任祈蔚"
                />
              </label>

              <label className="text-xs text-zinc-700">
                帶領者英文名
                <input
                  value={group.leaderNameEn || ""}
                  onChange={(e) =>
                    setGroups((prev) =>
                      prev.map((item, i) => (i === index ? { ...item, leaderNameEn: e.target.value } : item)),
                    )
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                  placeholder="Jen Chi-Wei"
                />
              </label>

              <label className="text-xs text-zinc-700">
                身分標示
                <input
                  value={group.leaderTitleZh || ""}
                  onChange={(e) =>
                    setGroups((prev) =>
                      prev.map((item, i) => (i === index ? { ...item, leaderTitleZh: e.target.value } : item)),
                    )
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                  placeholder="諮商心理師"
                />
              </label>
            </div>

            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <label className="block text-xs text-zinc-700">
                帶領方式（此團體）
                <textarea
                  value={group.approach || ""}
                  onChange={(e) =>
                    setGroups((prev) =>
                      prev.map((item, i) => (i === index ? { ...item, approach: e.target.value } : item)),
                    )
                  }
                  className="mt-1 h-20 w-full rounded-lg border border-zinc-300 p-3 text-sm outline-none focus:border-amber-400"
                />
              </label>

              <label className="block text-xs text-zinc-700">
                適合族群（此團體）
                <textarea
                  value={group.suitableFor || ""}
                  onChange={(e) =>
                    setGroups((prev) =>
                      prev.map((item, i) => (i === index ? { ...item, suitableFor: e.target.value } : item)),
                    )
                  }
                  className="mt-1 h-20 w-full rounded-lg border border-zinc-300 p-3 text-sm outline-none focus:border-amber-400"
                />
              </label>
            </div>

            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <label className="block text-xs text-zinc-700">
                初談說明（此團體）
                <textarea
                  value={group.consultationNote || ""}
                  onChange={(e) =>
                    setGroups((prev) =>
                      prev.map((item, i) => (i === index ? { ...item, consultationNote: e.target.value } : item)),
                    )
                  }
                  className="mt-1 h-20 w-full rounded-lg border border-zinc-300 p-3 text-sm outline-none focus:border-amber-400"
                />
              </label>

              <label className="block text-xs text-zinc-700">
                後續聯繫（此團體）
                <textarea
                  value={group.followUpNote || ""}
                  onChange={(e) =>
                    setGroups((prev) =>
                      prev.map((item, i) => (i === index ? { ...item, followUpNote: e.target.value } : item)),
                    )
                  }
                  className="mt-1 h-20 w-full rounded-lg border border-zinc-300 p-3 text-sm outline-none focus:border-amber-400"
                />
              </label>
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
