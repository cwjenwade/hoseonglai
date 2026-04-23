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
    isVisible: true,
    leaderProfileId: "",
    leaderNameZh: "",
    leaderNameEn: "",
    leaderTitleZh: "",
    leaderPhoto: "",
    introHeading: "",
    introDescription: "",
    consultationNote: "",
    registrationHeading: "",
    registrationDescription: "",
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
                  placeholder="group-mnt7r4p6"
                />
              </label>

              <label className="flex items-center gap-2 self-end rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-xs text-zinc-700">
                <input
                  type="checkbox"
                  checked={group.isVisible !== false}
                  onChange={(e) =>
                    setGroups((prev) =>
                      prev.map((item, i) =>
                        i === index ? { ...item, isVisible: e.target.checked } : item,
                      ),
                    )
                  }
                  className="h-4 w-4 accent-emerald-600"
                />
                <span>前台顯示（關閉後前台不顯示）</span>
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
                進入預約前標題
                <textarea
                  value={group.introHeading || ""}
                  onChange={(e) =>
                    setGroups((prev) =>
                      prev.map((item, i) => (i === index ? { ...item, introHeading: e.target.value } : item)),
                    )
                  }
                  className="mt-1 h-20 w-full rounded-lg border border-zinc-300 p-3 text-sm outline-none focus:border-amber-400"
                />
              </label>

              <label className="block text-xs text-zinc-700">
                進入預約前內文
                <textarea
                  value={group.introDescription || ""}
                  onChange={(e) =>
                    setGroups((prev) =>
                      prev.map((item, i) => (i === index ? { ...item, introDescription: e.target.value } : item)),
                    )
                  }
                  className="mt-1 h-20 w-full rounded-lg border border-zinc-300 p-3 text-sm outline-none focus:border-amber-400"
                />
              </label>
            </div>

            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <label className="block text-xs text-zinc-700">
                初談說明
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
                預約區標題
                <textarea
                  value={group.registrationHeading || ""}
                  onChange={(e) =>
                    setGroups((prev) =>
                      prev.map((item, i) => (i === index ? { ...item, registrationHeading: e.target.value } : item)),
                    )
                  }
                  className="mt-1 h-20 w-full rounded-lg border border-zinc-300 p-3 text-sm outline-none focus:border-amber-400"
                />
              </label>
            </div>

            <label className="mt-3 block text-xs text-zinc-700">
              預約區內文
              <textarea
                value={group.registrationDescription || ""}
                onChange={(e) =>
                  setGroups((prev) =>
                    prev.map((item, i) =>
                      i === index ? { ...item, registrationDescription: e.target.value } : item,
                    ),
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
