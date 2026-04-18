"use client";

import { useMemo, useState } from "react";
import type { HomePageContent } from "@/app/home-content";
import type { BrandPageContent } from "@/app/brand-philosophy/brand-content";
import type { HeartfeltVideoItem } from "@/app/heartfelt-momentum/videos-data";
import type { LectureItem } from "@/app/fortune-arrives/lectures-data";
import type { GroupItem } from "@/app/togetherness/group-data";
import type { PsychometricScale } from "@/app/collaborative-prosperity/assessment-data";
import type { ResearchConsent } from "@/app/collaborative-prosperity/consent-data";
import {
  getProjectContactVisibilityLabel,
  getProjectStatusLabel,
  getResearchProjectTestUrl,
  type ResearchProject,
  type ResearchProjectStatus,
} from "@/app/collaborative-prosperity/projects";
import { EditorSection } from "./ui/EditorSection";
import { GovernanceFields } from "./ui/GovernanceFields";
import { RelationPicker } from "./ui/RelationPicker";
import BrandEditor from "./BrandEditor";

const LECTURE_CATEGORY_OPTIONS: Array<Exclude<LectureItem["category"][number], "All">> = [
  "Upcoming",
  "Past",
  "Research",
  "Public Talk",
];

type RelationOption = {
  value: string;
  label: string;
  description?: string;
};

type LeaderOption = {
  id: string;
  nameZh: string;
  nameEn: string;
  titleZh: string;
  photo: string;
};

function updateListItem<T>(list: T[], index: number, nextValue: T): T[] {
  return list.map((item, itemIndex) => (itemIndex === index ? nextValue : item));
}

export function HomePageEditor({ initialContent }: { initialContent: HomePageContent }) {
  const [content, setContent] = useState<HomePageContent>(initialContent);
  const payload = useMemo(() => content, [content]);

  return (
    <div className="space-y-5">
      <EditorSection
        title="首頁功能卡片"
        description="維持前台原有四張功能卡，只把內容來源移到後台管理。"
      >
        <div className="space-y-4">
          {content.platformFeatures.map((feature, index) => (
            <div key={`${feature.href}-${index}`} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <div className="grid gap-3 md:grid-cols-2">
                <label className="text-xs font-medium text-zinc-700">
                  卡片標題
                  <input
                    value={feature.title}
                    onChange={(event) =>
                      setContent((prev) => ({
                        ...prev,
                        platformFeatures: updateListItem(prev.platformFeatures, index, {
                          ...feature,
                          title: event.target.value,
                        }),
                      }))
                    }
                    className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900"
                  />
                </label>
                <label className="text-xs font-medium text-zinc-700">
                  連結
                  <input
                    value={feature.href}
                    onChange={(event) =>
                      setContent((prev) => ({
                        ...prev,
                        platformFeatures: updateListItem(prev.platformFeatures, index, {
                          ...feature,
                          href: event.target.value,
                        }),
                      }))
                    }
                    className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900"
                  />
                </label>
              </div>
              <label className="mt-3 block text-xs font-medium text-zinc-700">
                描述
                <textarea
                  value={feature.description}
                  onChange={(event) =>
                    setContent((prev) => ({
                      ...prev,
                      platformFeatures: updateListItem(prev.platformFeatures, index, {
                        ...feature,
                        description: event.target.value,
                      }),
                    }))
                  }
                  className="mt-1 h-24 w-full rounded-xl border border-zinc-300 p-3 text-sm outline-none focus:border-zinc-900"
                />
              </label>
            </div>
          ))}
        </div>
      </EditorSection>

      <EditorSection title="最新更新卡片" description="控制首頁最新研究與內容列表。">
        <div className="space-y-4">
          {content.recentUpdates.map((item, index) => (
            <div key={item.id} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <div className="grid gap-3 md:grid-cols-3">
                <label className="text-xs font-medium text-zinc-700">
                  ID
                  <input
                    value={item.id}
                    onChange={(event) =>
                      setContent((prev) => ({
                        ...prev,
                        recentUpdates: updateListItem(prev.recentUpdates, index, {
                          ...item,
                          id: event.target.value,
                        }),
                      }))
                    }
                    className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900"
                  />
                </label>
                <label className="text-xs font-medium text-zinc-700">
                  標籤
                  <input
                    value={item.tag}
                    onChange={(event) =>
                      setContent((prev) => ({
                        ...prev,
                        recentUpdates: updateListItem(prev.recentUpdates, index, {
                          ...item,
                          tag: event.target.value,
                        }),
                      }))
                    }
                    className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900"
                  />
                </label>
                <label className="text-xs font-medium text-zinc-700">
                  連結
                  <input
                    value={item.href || ""}
                    onChange={(event) =>
                      setContent((prev) => ({
                        ...prev,
                        recentUpdates: updateListItem(prev.recentUpdates, index, {
                          ...item,
                          href: event.target.value,
                        }),
                      }))
                    }
                    className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900"
                  />
                </label>
              </div>
              <label className="mt-3 block text-xs font-medium text-zinc-700">
                標題
                <input
                  value={item.title}
                  onChange={(event) =>
                    setContent((prev) => ({
                      ...prev,
                      recentUpdates: updateListItem(prev.recentUpdates, index, {
                        ...item,
                        title: event.target.value,
                      }),
                    }))
                  }
                  className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900"
                />
              </label>
            </div>
          ))}
        </div>
      </EditorSection>

      <EditorSection title="主要 CTA" description="維持 Hero 下方三顆按鈕的內容與連結。">
        <div className="grid gap-4 md:grid-cols-3">
          {content.primaryCallToActions.map((item, index) => (
            <div key={`${item.variant}-${index}`} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                {item.variant}
              </p>
              <label className="mt-3 block text-xs font-medium text-zinc-700">
                按鈕文字
                <input
                  value={item.label}
                  onChange={(event) =>
                    setContent((prev) => ({
                      ...prev,
                      primaryCallToActions: updateListItem(prev.primaryCallToActions, index, {
                        ...item,
                        label: event.target.value,
                      }),
                    }))
                  }
                  className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900"
                />
              </label>
              <label className="mt-3 block text-xs font-medium text-zinc-700">
                連結
                <input
                  value={item.href}
                  onChange={(event) =>
                    setContent((prev) => ({
                      ...prev,
                      primaryCallToActions: updateListItem(prev.primaryCallToActions, index, {
                        ...item,
                        href: event.target.value,
                      }),
                    }))
                  }
                  className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900"
                />
              </label>
            </div>
          ))}
        </div>
      </EditorSection>

      <EditorSection title="管理設定">
        <GovernanceFields
          value={content}
          onChange={(updates) => setContent((prev) => ({ ...prev, ...updates }))}
        />
      </EditorSection>

      <input type="hidden" name="payload" value={JSON.stringify(payload)} />
    </div>
  );
}

export function BrandPageSingleEditor({
  initialContent,
  uploadedUrl,
}: {
  initialContent: BrandPageContent;
  uploadedUrl?: string;
}) {
  return <BrandEditor initialContent={initialContent} uploadedUrl={uploadedUrl} />;
}

export function ResearchVideoItemEditor({
  initialItem,
  uploadedUrl,
}: {
  initialItem: HeartfeltVideoItem;
  uploadedUrl?: string;
}) {
  const [item, setItem] = useState<HeartfeltVideoItem>(initialItem);
  const payload = useMemo(() => item, [item]);

  return (
    <div className="space-y-5">
      <EditorSection title="基本資訊" description="維持研究影片卡片既有欄位與前台呈現。">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-xs font-medium text-zinc-700">
            中文標題
            <input value={item.title} onChange={(event) => setItem({ ...item, title: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
          </label>
          <label className="text-xs font-medium text-zinc-700">
            英文標題
            <input value={item.titleEn} onChange={(event) => setItem({ ...item, titleEn: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
          </label>
          <label className="text-xs font-medium text-zinc-700">
            Tag
            <input value={item.tag} onChange={(event) => setItem({ ...item, tag: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
          </label>
          <label className="text-xs font-medium text-zinc-700">
            類別
            <input value={item.category} onChange={(event) => setItem({ ...item, category: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
          </label>
          <label className="text-xs font-medium text-zinc-700">
            時長
            <input value={item.duration} onChange={(event) => setItem({ ...item, duration: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
          </label>
          <label className="text-xs font-medium text-zinc-700">
            YouTube 影片網址
            <input value={item.youtubeUrl || ""} onChange={(event) => setItem({ ...item, youtubeUrl: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
          </label>
        </div>
        <label className="mt-4 block text-xs font-medium text-zinc-700">
          內容描述
          <textarea value={item.description} onChange={(event) => setItem({ ...item, description: event.target.value })} className="mt-1 h-28 w-full rounded-xl border border-zinc-300 p-3 text-sm outline-none focus:border-zinc-900" />
        </label>
      </EditorSection>

      <EditorSection title="媒體設定">
        <label className="block text-xs font-medium text-zinc-700">
          封面圖片網址
          <input value={item.image} onChange={(event) => setItem({ ...item, image: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
        </label>
        {uploadedUrl ? (
          <div className="mt-3 flex flex-wrap items-center gap-3 rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-700">
            <span>最新上傳：{uploadedUrl}</span>
            <button type="button" onClick={() => setItem({ ...item, image: uploadedUrl })} className="rounded-full border border-sky-300 px-3 py-1.5 text-xs transition hover:bg-sky-100">
              套用圖片
            </button>
          </div>
        ) : null}
      </EditorSection>

      <EditorSection title="管理設定">
        <GovernanceFields value={item} onChange={(updates) => setItem({ ...item, ...updates })} />
      </EditorSection>

      <input type="hidden" name="payload" value={JSON.stringify(payload)} />
    </div>
  );
}

export function LectureItemEditor({ initialItem }: { initialItem: LectureItem }) {
  const [item, setItem] = useState<LectureItem>(initialItem);
  const payload = useMemo(() => item, [item]);

  return (
    <div className="space-y-5">
      <EditorSection title="基本資訊">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-xs font-medium text-zinc-700">
            ID
            <input value={item.id} onChange={(event) => setItem({ ...item, id: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
          </label>
          <label className="text-xs font-medium text-zinc-700">
            Slug
            <input value={item.slug} onChange={(event) => setItem({ ...item, slug: event.target.value, href: `/fortune-arrives/${event.target.value}` })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
          </label>
          <label className="text-xs font-medium text-zinc-700">
            中文標題
            <input value={item.titleZh} onChange={(event) => setItem({ ...item, titleZh: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
          </label>
          <label className="text-xs font-medium text-zinc-700">
            英文標題
            <input value={item.titleEn || ""} onChange={(event) => setItem({ ...item, titleEn: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
          </label>
          <label className="text-xs font-medium text-zinc-700">
            城市 / 副標
            <input value={item.subtitleEn} onChange={(event) => setItem({ ...item, subtitleEn: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
          </label>
          <label className="text-xs font-medium text-zinc-700">
            類型
            <select value={item.type} onChange={(event) => setItem({ ...item, type: event.target.value as LectureItem["type"] })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 bg-white px-3 text-sm outline-none focus:border-zinc-900">
              <option value="LECTURE">LECTURE</option>
              <option value="WORKSHOP">WORKSHOP</option>
              <option value="PUBLIC TALK">PUBLIC TALK</option>
            </select>
          </label>
        </div>
      </EditorSection>

      <EditorSection title="時間設定">
        <div className="grid gap-4 md:grid-cols-4">
          <label className="text-xs font-medium text-zinc-700">
            日期模式
            <select value={item.dateMode === "month" ? "month" : "exact"} onChange={(event) => setItem({ ...item, dateMode: event.target.value === "month" ? "month" : "exact" })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 bg-white px-3 text-sm outline-none focus:border-zinc-900">
              <option value="exact">指定日期</option>
              <option value="month">僅年月</option>
            </select>
          </label>
          {item.dateMode === "month" ? (
            <>
              <label className="text-xs font-medium text-zinc-700">
                年份
                <input value={item.approxYear || ""} onChange={(event) => setItem({ ...item, approxYear: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
              </label>
              <label className="text-xs font-medium text-zinc-700">
                月份
                <input value={item.approxMonth || ""} onChange={(event) => setItem({ ...item, approxMonth: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
              </label>
              <label className="text-xs font-medium text-zinc-700">
                顯示標籤
                <input value={item.dateLabel} onChange={(event) => setItem({ ...item, dateLabel: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
              </label>
            </>
          ) : (
            <>
              <label className="text-xs font-medium text-zinc-700">
                日期
                <input type="date" value={item.date} onChange={(event) => setItem({ ...item, date: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
              </label>
              <label className="text-xs font-medium text-zinc-700">
                日期標籤
                <input value={item.dateLabel} onChange={(event) => setItem({ ...item, dateLabel: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
              </label>
              <label className="text-xs font-medium text-zinc-700">
                時間
                <input value={item.time} onChange={(event) => setItem({ ...item, time: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
              </label>
            </>
          )}
        </div>
      </EditorSection>

      <EditorSection title="分類標籤" description="保留前台相容的 category[]，但後台改用可選 UI。">
        <div className="grid gap-3 md:grid-cols-4">
          {LECTURE_CATEGORY_OPTIONS.map((category) => {
            const checked = item.category.includes(category);
            return (
              <label key={category} className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(event) =>
                    setItem({
                      ...item,
                      category: event.target.checked
                        ? [...item.category, category]
                        : item.category.filter((entry) => entry !== category),
                    })
                  }
                  className="h-4 w-4 accent-zinc-900"
                />
                <span>{category}</span>
              </label>
            );
          })}
        </div>
      </EditorSection>

      <EditorSection title="地點資訊">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-xs font-medium text-zinc-700">
            講者
            <input value={item.speaker} onChange={(event) => setItem({ ...item, speaker: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
          </label>
          <label className="text-xs font-medium text-zinc-700">
            講者（英文）
            <input value={item.speakerEn || ""} onChange={(event) => setItem({ ...item, speakerEn: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
          </label>
          <label className="text-xs font-medium text-zinc-700">
            地點
            <input value={item.locationZh} onChange={(event) => setItem({ ...item, locationZh: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
          </label>
          <label className="text-xs font-medium text-zinc-700">
            地址
            <input value={item.addressZh || ""} onChange={(event) => setItem({ ...item, addressZh: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
          </label>
        </div>
        <label className="mt-4 block text-xs font-medium text-zinc-700">
          摘要
          <textarea value={item.summary} onChange={(event) => setItem({ ...item, summary: event.target.value })} className="mt-1 h-28 w-full rounded-xl border border-zinc-300 p-3 text-sm outline-none focus:border-zinc-900" />
        </label>
      </EditorSection>

      <EditorSection title="顯示設定">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-xs font-medium text-zinc-700">
            前台詳頁路徑
            <input value={item.href} onChange={(event) => setItem({ ...item, href: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
          </label>
        </div>
      </EditorSection>

      <EditorSection title="管理設定">
        <GovernanceFields value={item} onChange={(updates) => setItem({ ...item, ...updates })} />
      </EditorSection>

      <input type="hidden" name="payload" value={JSON.stringify(payload)} />
    </div>
  );
}

export function GroupItemEditor({
  initialItem,
  leaderOptions,
  uploadedUrl,
}: {
  initialItem: GroupItem;
  leaderOptions: LeaderOption[];
  uploadedUrl?: string;
}) {
  const [item, setItem] = useState<GroupItem>(initialItem);
  const payload = useMemo(() => item, [item]);

  return (
    <div className="space-y-5">
      <EditorSection title="方案基本資訊">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-xs font-medium text-zinc-700">
            Slug
            <input value={item.slug} onChange={(event) => setItem({ ...item, slug: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
          </label>
          <label className="text-xs font-medium text-zinc-700">
            中文標題
            <input value={item.title} onChange={(event) => setItem({ ...item, title: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
          </label>
          <label className="text-xs font-medium text-zinc-700">
            英文副標
            <input value={item.subtitle} onChange={(event) => setItem({ ...item, subtitle: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
          </label>
        </div>
        <label className="mt-4 block text-xs font-medium text-zinc-700">
          內容描述
          <textarea value={item.description} onChange={(event) => setItem({ ...item, description: event.target.value })} className="mt-1 h-28 w-full rounded-xl border border-zinc-300 p-3 text-sm outline-none focus:border-zinc-900" />
        </label>
      </EditorSection>

      <EditorSection title="帶領者資訊">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-xs font-medium text-zinc-700">
            套用 Brand 團隊成員
            <select
              value={item.leaderProfileId || ""}
              onChange={(event) => {
                const matched = leaderOptions.find((option) => option.id === event.target.value);
                if (!matched) {
                  setItem({ ...item, leaderProfileId: "" });
                  return;
                }
                setItem({
                  ...item,
                  leaderProfileId: matched.id,
                  leaderNameZh: matched.nameZh,
                  leaderNameEn: matched.nameEn,
                  leaderTitleZh: matched.titleZh,
                  leaderPhoto: matched.photo,
                });
              }}
              className="mt-1 h-11 w-full rounded-xl border border-zinc-300 bg-white px-3 text-sm outline-none focus:border-zinc-900"
            >
              <option value="">手動填寫</option>
              {leaderOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.nameZh} / {option.nameEn}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs font-medium text-zinc-700">
            帶領者照片
            <input value={item.leaderPhoto || ""} onChange={(event) => setItem({ ...item, leaderPhoto: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
          </label>
          <label className="text-xs font-medium text-zinc-700">
            中文姓名
            <input value={item.leaderNameZh || ""} onChange={(event) => setItem({ ...item, leaderNameZh: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
          </label>
          <label className="text-xs font-medium text-zinc-700">
            英文姓名
            <input value={item.leaderNameEn || ""} onChange={(event) => setItem({ ...item, leaderNameEn: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
          </label>
          <label className="text-xs font-medium text-zinc-700">
            角色標示
            <input value={item.leaderTitleZh || ""} onChange={(event) => setItem({ ...item, leaderTitleZh: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
          </label>
        </div>
      </EditorSection>

      <EditorSection title="介紹區塊">
        <label className="block text-xs font-medium text-zinc-700">
          封面圖片
          <input value={item.image} onChange={(event) => setItem({ ...item, image: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
        </label>
        {uploadedUrl ? (
          <div className="mt-3 flex flex-wrap items-center gap-3 rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-700">
            <span>最新上傳：{uploadedUrl}</span>
            <button type="button" onClick={() => setItem({ ...item, image: uploadedUrl })} className="rounded-full border border-sky-300 px-3 py-1.5 text-xs transition hover:bg-sky-100">
              套用為方案封面
            </button>
          </div>
        ) : null}
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="text-xs font-medium text-zinc-700">
            介紹標題
            <textarea value={item.introHeading || ""} onChange={(event) => setItem({ ...item, introHeading: event.target.value })} className="mt-1 h-24 w-full rounded-xl border border-zinc-300 p-3 text-sm outline-none focus:border-zinc-900" />
          </label>
          <label className="text-xs font-medium text-zinc-700">
            介紹內文
            <textarea value={item.introDescription || ""} onChange={(event) => setItem({ ...item, introDescription: event.target.value })} className="mt-1 h-24 w-full rounded-xl border border-zinc-300 p-3 text-sm outline-none focus:border-zinc-900" />
          </label>
        </div>
      </EditorSection>

      <EditorSection title="報名區塊">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-xs font-medium text-zinc-700">
            初談說明
            <textarea value={item.consultationNote || ""} onChange={(event) => setItem({ ...item, consultationNote: event.target.value })} className="mt-1 h-24 w-full rounded-xl border border-zinc-300 p-3 text-sm outline-none focus:border-zinc-900" />
          </label>
          <label className="text-xs font-medium text-zinc-700">
            報名標題
            <textarea value={item.registrationHeading || ""} onChange={(event) => setItem({ ...item, registrationHeading: event.target.value })} className="mt-1 h-24 w-full rounded-xl border border-zinc-300 p-3 text-sm outline-none focus:border-zinc-900" />
          </label>
        </div>
        <label className="mt-4 block text-xs font-medium text-zinc-700">
          報名內文
          <textarea value={item.registrationDescription || ""} onChange={(event) => setItem({ ...item, registrationDescription: event.target.value })} className="mt-1 h-28 w-full rounded-xl border border-zinc-300 p-3 text-sm outline-none focus:border-zinc-900" />
        </label>
      </EditorSection>

      <EditorSection title="可見性與排序">
        <div className="space-y-4">
          <label className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
            <input type="checkbox" checked={item.isVisible !== false} onChange={(event) => setItem({ ...item, isVisible: event.target.checked })} className="h-4 w-4 accent-zinc-900" />
            <span>前台顯示這個方案</span>
          </label>
          <GovernanceFields value={item} visibilityLabel="內容發布" onChange={(updates) => setItem({ ...item, ...updates })} />
        </div>
      </EditorSection>

      <input type="hidden" name="payload" value={JSON.stringify(payload)} />
    </div>
  );
}

export function PsychometricScaleItemEditor({
  initialItem,
}: {
  initialItem: PsychometricScale;
}) {
  const [item, setItem] = useState<PsychometricScale>(initialItem);
  const payload = useMemo(() => item, [item]);

  return (
    <div className="space-y-5">
      <EditorSection title="量表基本資訊">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-xs font-medium text-zinc-700">
            量表 ID
            <input value={item.projectId} onChange={(event) => setItem({ ...item, projectId: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
          </label>
          <label className="text-xs font-medium text-zinc-700">
            中文標題
            <input value={item.projectTitleZh} onChange={(event) => setItem({ ...item, projectTitleZh: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
          </label>
          <label className="text-xs font-medium text-zinc-700">
            英文標題
            <input value={item.projectTitleEn} onChange={(event) => setItem({ ...item, projectTitleEn: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
          </label>
        </div>
        <label className="mt-4 block text-xs font-medium text-zinc-700">
          量尺說明
          <input value={item.scalePrompt} onChange={(event) => setItem({ ...item, scalePrompt: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
        </label>
      </EditorSection>

      <EditorSection title="量尺選項">
        <textarea
          value={item.options.join("\n")}
          onChange={(event) =>
            setItem({
              ...item,
              options: event.target.value.split("\n").map((value) => value.trim()).filter(Boolean),
            })
          }
          className="h-36 w-full rounded-xl border border-zinc-300 p-3 text-sm outline-none focus:border-zinc-900"
        />
      </EditorSection>

      <EditorSection title="題項列表">
        <textarea
          value={item.questions.join("\n")}
          onChange={(event) =>
            setItem({
              ...item,
              questions: event.target.value.split("\n").map((value) => value.trim()).filter(Boolean),
            })
          }
          className="h-64 w-full rounded-xl border border-zinc-300 p-3 text-sm outline-none focus:border-zinc-900"
        />
      </EditorSection>

      <EditorSection title="管理設定">
        <GovernanceFields value={item} onChange={(updates) => setItem({ ...item, ...updates })} />
      </EditorSection>

      <input type="hidden" name="payload" value={JSON.stringify(payload)} />
    </div>
  );
}

export function ResearchConsentItemEditor({
  initialItem,
  uploadedPdfUrl,
}: {
  initialItem: ResearchConsent;
  uploadedPdfUrl?: string;
}) {
  const [item, setItem] = useState<ResearchConsent>(initialItem);
  const payload = useMemo(() => item, [item]);

  return (
    <div className="space-y-5">
      <EditorSection title="基本資訊">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-xs font-medium text-zinc-700">
            同意書 ID
            <input value={item.projectId} onChange={(event) => setItem({ ...item, projectId: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
          </label>
          <label className="text-xs font-medium text-zinc-700">
            中文標題
            <input value={item.projectTitleZh} onChange={(event) => setItem({ ...item, projectTitleZh: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
          </label>
          <label className="text-xs font-medium text-zinc-700">
            英文標題
            <input value={item.projectTitleEn} onChange={(event) => setItem({ ...item, projectTitleEn: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
          </label>
          <label className="text-xs font-medium text-zinc-700">
            計畫主持人
            <input value={item.principalInvestigator} onChange={(event) => setItem({ ...item, principalInvestigator: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
          </label>
        </div>
      </EditorSection>

      <EditorSection title="研究計畫書 PDF">
        <label className="block text-xs font-medium text-zinc-700">
          PDF 連結
          <input value={item.pdfUrl || ""} onChange={(event) => setItem({ ...item, pdfUrl: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
        </label>
        {uploadedPdfUrl ? (
          <div className="mt-3 flex flex-wrap items-center gap-3 rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-700">
            <span>最新上傳：{uploadedPdfUrl}</span>
            <button type="button" onClick={() => setItem({ ...item, pdfUrl: uploadedPdfUrl })} className="rounded-full border border-sky-300 px-3 py-1.5 text-xs transition hover:bg-sky-100">
              套用 PDF
            </button>
          </div>
        ) : null}
      </EditorSection>

      <EditorSection title="研究說明">
        <label className="block text-xs font-medium text-zinc-700">
          研究單位
          <input value={item.researchUnit} onChange={(event) => setItem({ ...item, researchUnit: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
        </label>
        <label className="mt-4 block text-xs font-medium text-zinc-700">
          研究說明
          <textarea value={item.researchDescription} onChange={(event) => setItem({ ...item, researchDescription: event.target.value })} className="mt-1 h-36 w-full rounded-xl border border-zinc-300 p-3 text-sm outline-none focus:border-zinc-900" />
        </label>
      </EditorSection>

      <EditorSection title="管理設定">
        <GovernanceFields value={item} onChange={(updates) => setItem({ ...item, ...updates })} />
      </EditorSection>

      <input type="hidden" name="payload" value={JSON.stringify(payload)} />
    </div>
  );
}

export function ResearchProjectItemEditor({
  initialItem,
  scaleOptions,
  consentOptions,
}: {
  initialItem: ResearchProject;
  scaleOptions: RelationOption[];
  consentOptions: RelationOption[];
}) {
  const [item, setItem] = useState<ResearchProject>(initialItem);
  const payload = useMemo(
    () => ({
      ...item,
      testUrl: item.status === "quantitative" ? getResearchProjectTestUrl(item.id) : "",
    }),
    [item],
  );

  const quantitative = item.status === "quantitative";
  const needsConsent = item.status !== "preparing";

  return (
    <div className="space-y-5">
      <EditorSection title="研究基本資訊">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-xs font-medium text-zinc-700">
            專案 ID
            <input value={item.id} onChange={(event) => setItem({ ...item, id: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
          </label>
          <label className="text-xs font-medium text-zinc-700">
            狀態
            <select value={item.status} onChange={(event) => setItem({ ...item, status: event.target.value as ResearchProjectStatus, contactVisibility: event.target.value === "qualitative" ? "share_with_pi" : "admin_only", assessmentSourceProjectId: event.target.value === "quantitative" ? item.assessmentSourceProjectId || "" : "", consentSourceProjectId: event.target.value === "preparing" ? "" : item.consentSourceProjectId || "" })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 bg-white px-3 text-sm outline-none focus:border-zinc-900">
              <option value="preparing">Preparing</option>
              <option value="quantitative">Quantitative</option>
              <option value="qualitative">Qualitative</option>
            </select>
          </label>
          <label className="text-xs font-medium text-zinc-700">
            中文標題
            <input value={item.title} onChange={(event) => setItem({ ...item, title: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
          </label>
          <label className="text-xs font-medium text-zinc-700">
            英文副標
            <input value={item.subtitle} onChange={(event) => setItem({ ...item, subtitle: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
          </label>
        </div>
        <label className="mt-4 block text-xs font-medium text-zinc-700">
          卡片描述
          <textarea value={item.description} onChange={(event) => setItem({ ...item, description: event.target.value })} className="mt-1 h-28 w-full rounded-xl border border-zinc-300 p-3 text-sm outline-none focus:border-zinc-900" />
        </label>
      </EditorSection>

      <EditorSection title="參與資訊">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-xs font-medium text-zinc-700">
            A. 研究主題
            <input value={item.topic} onChange={(event) => setItem({ ...item, topic: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
          </label>
          <label className="text-xs font-medium text-zinc-700">
            D. 參與方式與時間
            <textarea value={item.participationDetails} onChange={(event) => setItem({ ...item, participationDetails: event.target.value })} className="mt-1 h-24 w-full rounded-xl border border-zinc-300 p-3 text-sm outline-none focus:border-zinc-900" />
          </label>
        </div>
        <label className="mt-4 block text-xs font-medium text-zinc-700">
          E. 研究對象與目的
          <textarea value={item.researchAudiencePurpose} onChange={(event) => setItem({ ...item, researchAudiencePurpose: event.target.value })} className="mt-1 h-28 w-full rounded-xl border border-zinc-300 p-3 text-sm outline-none focus:border-zinc-900" />
        </label>
      </EditorSection>

      <EditorSection title="聯絡資訊">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-xs font-medium text-zinc-700">
            B. 計畫主持人
            <input value={item.principalInvestigator} onChange={(event) => setItem({ ...item, principalInvestigator: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
          </label>
          <label className="text-xs font-medium text-zinc-700">
            C. 研究聯絡人
            <input value={item.researchContact} onChange={(event) => setItem({ ...item, researchContact: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
          </label>
        </div>
        <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Email visibility</p>
          <p className="mt-2 text-sm font-medium text-zinc-900">
            {getProjectContactVisibilityLabel(item.contactVisibility)}
          </p>
          <p className="mt-2 text-sm text-zinc-600">
            {item.status === "qualitative"
              ? "Qualitative 參與者 email 會提供給 PI 與 admin。"
              : "Preparing / Quantitative 參與者 email 僅 admin 可見。"}
          </p>
        </div>
      </EditorSection>

      <EditorSection title="關聯資源" description="研究專案在後台明確串接 consent 與 psychometrics。">
        <div className="grid gap-5 lg:grid-cols-2">
          <RelationPicker
            label="Consent source"
            value={needsConsent ? item.consentSourceProjectId || "" : ""}
            options={consentOptions}
            emptyLabel={needsConsent ? "請選擇 consent" : "此狀態不使用 consent"}
            helper="Preparing 不需要 consent；Quantitative 與 Qualitative 會沿用指定 consent 的研究說明與 PDF。"
            onChange={(value) => setItem({ ...item, consentSourceProjectId: value })}
          />

          <RelationPicker
            label="Assessment source"
            value={quantitative ? item.assessmentSourceProjectId || "" : ""}
            options={scaleOptions}
            emptyLabel={quantitative ? "請選擇 psychometric scale" : "只有 Quantitative 需要量表"}
            helper="只有 Quantitative 會對應量表，且測驗網址會依專案 ID 自動生成。"
            onChange={(value) => setItem({ ...item, assessmentSourceProjectId: value })}
          />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Project status</p>
            <p className="mt-2 text-sm font-medium text-zinc-900">
              {getProjectStatusLabel(item.status)}
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Test URL</p>
            <p className="mt-2 break-all text-sm text-zinc-900">
              {quantitative ? getResearchProjectTestUrl(item.id) : "不啟用"}
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Current contact rule</p>
            <p className="mt-2 text-sm text-zinc-900">
              {getProjectContactVisibilityLabel(item.contactVisibility)}
            </p>
          </div>
        </div>
      </EditorSection>

      <EditorSection title="顯示設定">
        <GovernanceFields value={item} onChange={(updates) => setItem({ ...item, ...updates })} />
      </EditorSection>

      <input type="hidden" name="payload" value={JSON.stringify(payload)} />
    </div>
  );
}
