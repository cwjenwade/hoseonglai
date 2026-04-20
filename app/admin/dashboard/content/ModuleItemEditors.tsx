"use client";

import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  HOME_SECTION_DISPLAY_MODES,
  HOME_SECTION_SELECTED_ID_HINTS,
  type HomeCardContent,
  type HomeImageCrop,
  type HomePageContent,
  type HomeSectionCallToAction,
  type HomeSectionControl,
} from "@/app/home-content";
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

function inputClassName(extra = "") {
  return [
    "mt-1 h-11 w-full rounded-xl border border-zinc-300 bg-white px-3 text-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10",
    extra,
  ].join(" ");
}

function textareaClassName(extra = "") {
  return [
    "mt-1 min-h-24 w-full rounded-xl border border-zinc-300 bg-white p-3 text-sm leading-6 outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10",
    extra,
  ].join(" ");
}

function FieldLabel({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block text-xs font-medium text-zinc-700">
      {label}
      {children}
      {hint ? <span className="mt-1 block text-xs leading-5 text-zinc-500">{hint}</span> : null}
    </label>
  );
}

function ImageCropControl({
  title,
  image,
  uploadedUrl,
  onChange,
}: {
  title: string;
  image: HomeImageCrop;
  uploadedUrl?: string;
  onChange: (image: HomeImageCrop) => void;
}) {
  const [dragging, setDragging] = useState(false);
  const safeScale = Number.isFinite(image.scale) ? image.scale : 1;
  const safeX = Number.isFinite(image.x) ? image.x : 0;
  const safeY = Number.isFinite(image.y) ? image.y : 0;

  function update(updates: Partial<HomeImageCrop>) {
    onChange({ ...image, ...updates });
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-zinc-900">{title}</p>
          <p className="mt-1 text-xs leading-5 text-zinc-500">
            拖曳預覽圖調整位置；原圖不會被破壞，只儲存 scale / x / y。
          </p>
        </div>
        {uploadedUrl ? (
          <button
            type="button"
            onClick={() => update({ src: uploadedUrl })}
            className="rounded-full border border-zinc-300 px-3 py-1.5 text-xs text-zinc-700 transition hover:bg-zinc-100"
          >
            套用剛上傳圖片
          </button>
        ) : null}
      </div>

      <div
        className="relative mt-4 aspect-[1.35] cursor-move overflow-hidden rounded-xl bg-zinc-100 ring-1 ring-zinc-200"
        onPointerDown={(event) => {
          setDragging(true);
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!dragging) return;
          update({
            x: Math.max(-100, Math.min(100, safeX + event.movementX)),
            y: Math.max(-100, Math.min(100, safeY + event.movementY)),
          });
        }}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
      >
        {image.src ? (
          <Image
            src={image.src}
            alt={image.alt || title}
            fill
            sizes="360px"
            className="object-cover"
            style={{
              transform: `translate3d(${safeX}px, ${safeY}px, 0) scale(${safeScale})`,
              transformOrigin: "center",
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-zinc-500">
            尚未設定圖片
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 border border-white/60" />
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <FieldLabel label="圖片 URL">
          <input
            value={image.src}
            onChange={(event) => update({ src: event.target.value })}
            className={inputClassName()}
          />
        </FieldLabel>
        <FieldLabel label="Alt text">
          <input
            value={image.alt}
            onChange={(event) => update({ alt: event.target.value })}
            className={inputClassName()}
          />
        </FieldLabel>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <FieldLabel label={`Scale ${safeScale.toFixed(2)}`}>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.01"
            value={safeScale}
            onChange={(event) => update({ scale: Number(event.target.value) })}
            className="mt-3 w-full accent-zinc-900"
          />
        </FieldLabel>
        <FieldLabel label={`X ${Math.round(safeX)}px`}>
          <input
            type="range"
            min="-100"
            max="100"
            step="1"
            value={safeX}
            onChange={(event) => update({ x: Number(event.target.value) })}
            className="mt-3 w-full accent-zinc-900"
          />
        </FieldLabel>
        <FieldLabel label={`Y ${Math.round(safeY)}px`}>
          <input
            type="range"
            min="-100"
            max="100"
            step="1"
            value={safeY}
            onChange={(event) => update({ y: Number(event.target.value) })}
            className="mt-3 w-full accent-zinc-900"
          />
        </FieldLabel>
      </div>
    </div>
  );
}

export function HomePageEditor({
  initialContent,
  uploadedUrl,
}: {
  initialContent: HomePageContent;
  uploadedUrl?: string;
}) {
  const [content, setContent] = useState<HomePageContent>(initialContent);
  const payload = useMemo(() => content, [content]);

  function updateSection(index: number, updates: Partial<HomeSectionControl>) {
    setContent((prev) => ({
      ...prev,
      sections: updateListItem(prev.sections, index, {
        ...prev.sections[index],
        ...updates,
      }),
    }));
  }

  function updateSectionCta(
    sectionIndex: number,
    ctaIndex: number,
    updates: Partial<HomeSectionCallToAction>,
  ) {
    const section = content.sections[sectionIndex];
    updateSection(sectionIndex, {
      ctas: updateListItem(section.ctas, ctaIndex, {
        ...section.ctas[ctaIndex],
        ...updates,
      }),
    });
  }

  function updateCard(
    group: keyof HomePageContent["cards"],
    index: number,
    updates: Partial<HomeCardContent>,
  ) {
    setContent((prev) => ({
      ...prev,
      cards: {
        ...prev.cards,
        [group]: updateListItem(prev.cards[group], index, {
          ...prev.cards[group][index],
          ...updates,
        }),
      },
    }));
  }

  function updateCardImage(
    group: keyof HomePageContent["cards"],
    index: number,
    image: HomeImageCrop,
  ) {
    updateCard(group, index, { image });
  }

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[28px] border border-zinc-200 bg-zinc-950 text-white shadow-sm">
        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.28em] text-white/48">Home Base Module</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] md:text-4xl">
              首頁基礎內容工作台
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/62">
              這裡只管理首頁目前看得到的文字、連結與圖片顯示範圍。儲存後會直接反映在首頁，不建立文章系統、不新增多語系，也不改版型結構。
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                href="/"
                target="_blank"
                className="rounded-full bg-white px-4 py-2 text-xs font-medium text-zinc-950 transition hover:bg-zinc-200"
              >
                預覽首頁
              </Link>
              <Link
                href="/admin/dashboard/content"
                className="rounded-full border border-white/24 px-4 py-2 text-xs font-medium text-white/78 transition hover:bg-white/10"
              >
                取消
              </Link>
            </div>
          </div>
          <div className="border-t border-white/10 bg-white/5 p-6 md:p-8 lg:border-l lg:border-t-0">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/42">Text fields</p>
                <p className="mt-2 text-2xl font-semibold">Full</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/42">Image crop</p>
                <p className="mt-2 text-2xl font-semibold">Scale/X/Y</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/42">Publish</p>
                <p className="mt-2 text-2xl font-semibold">Instant</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EditorSection
        title="品牌首頁主視覺"
        description="品牌主標、副標、首頁主敘述與左側影片來源。按鈕文字與連結在 Positioning banner CTA 裡編輯。"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <FieldLabel label="品牌主標">
            <input
              value={content.brandTitle}
              onChange={(event) => setContent((prev) => ({ ...prev, brandTitle: event.target.value }))}
              className={inputClassName()}
            />
          </FieldLabel>
          <FieldLabel label="品牌副標">
            <input
              value={content.brandSubtitle}
              onChange={(event) => setContent((prev) => ({ ...prev, brandSubtitle: event.target.value }))}
              className={inputClassName()}
            />
          </FieldLabel>
          <label className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
            <input
              type="checkbox"
              checked={content.hero.visible}
              onChange={(event) =>
                setContent((prev) => ({
                  ...prev,
                  hero: { ...prev.hero, visible: event.target.checked },
                }))
              }
              className="h-4 w-4 accent-zinc-900"
            />
            <span>顯示首頁影片</span>
          </label>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <FieldLabel label="首頁主敘述">
            <textarea
              value={content.mainDescription}
              onChange={(event) => setContent((prev) => ({ ...prev, mainDescription: event.target.value }))}
              className={textareaClassName("min-h-20")}
            />
          </FieldLabel>
          <FieldLabel label="Hero video src">
            <input
              value={content.hero.videoSrc}
              onChange={(event) =>
                setContent((prev) => ({
                  ...prev,
                  hero: { ...prev.hero, videoSrc: event.target.value },
                }))
              }
              className={inputClassName()}
            />
          </FieldLabel>
        </div>
      </EditorSection>

      <EditorSection
        title="Section 標題、排序與 CTA"
        description="維持既有首頁版型與 section 順序；只改文字、連結、是否顯示與 selectedIds。"
      >
        <div className="space-y-4">
          {content.sections.map((section, sectionIndex) => (
            <div key={section.key} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <div className="grid gap-3 md:grid-cols-4">
                <label className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-3 py-3 text-sm text-zinc-700">
                  <input
                    type="checkbox"
                    checked={section.visible}
                    onChange={(event) =>
                      updateSection(sectionIndex, { visible: event.target.checked })
                    }
                    className="h-4 w-4 accent-zinc-900"
                  />
                  <span>{section.key}</span>
                </label>
                <label className="text-xs font-medium text-zinc-700">
                  排序
                  <input
                    type="number"
                    value={section.order}
                    onChange={(event) =>
                      updateSection(sectionIndex, { order: Number(event.target.value) })
                    }
                    className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900"
                  />
                </label>
                <label className="text-xs font-medium text-zinc-700 md:col-span-2">
                  Display mode
                  <select
                    value={section.displayMode}
                    onChange={(event) =>
                      updateSection(sectionIndex, {
                        displayMode: event.target.value as HomeSectionControl["displayMode"],
                      })
                    }
                    className="mt-1 h-11 w-full rounded-xl border border-zinc-300 bg-white px-3 text-sm outline-none focus:border-zinc-900"
                  >
                    {HOME_SECTION_DISPLAY_MODES.map((mode) => (
                      <option key={mode} value={mode}>
                        {mode}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <label className="text-xs font-medium text-zinc-700">
                  Title / 區塊標題
                  <input
                    value={section.title}
                    onChange={(event) =>
                      updateSection(sectionIndex, { title: event.target.value })
                    }
                    className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900"
                  />
                </label>
                <label className="text-xs font-medium text-zinc-700">
                  Eyebrow / 已不顯示但保留資料
                  <input
                    value={section.eyebrow}
                    onChange={(event) =>
                      updateSection(sectionIndex, { eyebrow: event.target.value })
                    }
                    className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900"
                  />
                </label>
              </div>

              <label className="mt-3 block text-xs font-medium text-zinc-700">
                Description / 首頁短說明
                <textarea
                  value={section.description}
                  onChange={(event) =>
                    updateSection(sectionIndex, { description: event.target.value })
                  }
                  className="mt-1 h-20 w-full rounded-xl border border-zinc-300 p-3 text-sm outline-none focus:border-zinc-900"
                />
                <span className="mt-1 block text-xs leading-5 text-zinc-500">
                  只作為首頁導覽與定位文案，不用來存放 research / group / project 的內容本體。
                </span>
              </label>

              <label className="mt-3 block text-xs font-medium text-zinc-700">
                selectedIds
                <textarea
                  value={section.selectedIds.join("\n")}
                  onChange={(event) =>
                    updateSection(sectionIndex, {
                      selectedIds: event.target.value
                        .split("\n")
                        .map((value) => value.trim())
                        .filter(Boolean),
                    })
                  }
                  className="mt-1 h-24 w-full rounded-xl border border-zinc-300 p-3 text-sm outline-none focus:border-zinc-900"
                />
                <span className="mt-1 block text-xs leading-5 text-zinc-500">
                  {HOME_SECTION_SELECTED_ID_HINTS[section.key]}
                </span>
              </label>

              {section.ctas.length > 0 ? (
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  {section.ctas.map((cta, ctaIndex) => (
                    <div key={`${section.key}-${cta.key}`} className="rounded-xl border border-zinc-200 bg-white p-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                        {cta.key}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-zinc-500">
                        CTA label / href 留空或格式無效時，會回到 Home module 預設值。
                      </p>
                      <label className="mt-2 block text-xs font-medium text-zinc-700">
                        CTA label
                        <input
                          value={cta.label}
                          onChange={(event) =>
                            updateSectionCta(sectionIndex, ctaIndex, {
                              label: event.target.value,
                            })
                          }
                          className="mt-1 h-10 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900"
                        />
                      </label>
                      <label className="mt-2 block text-xs font-medium text-zinc-700">
                        CTA href
                        <input
                          value={cta.href}
                          onChange={(event) =>
                            updateSectionCta(sectionIndex, ctaIndex, {
                              href: event.target.value,
                            })
                          }
                          className="mt-1 h-10 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900"
                        />
                      </label>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </EditorSection>

      <EditorSection
        title="首頁卡片文字、連結與圖片裁切"
        description="每張首頁卡片的標籤、標題、描述、meta、連結與圖片顯示範圍都在這裡改。手機與桌機共用同一組 scale / x / y。"
      >
        {(["research", "groups", "support"] as const).map((group) => (
          <div key={group} className="mt-5 first:mt-0">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
                {group}
              </h3>
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-500">
                {content.cards[group].length} cards
              </span>
            </div>
            <div className="space-y-4">
              {content.cards[group].map((card, cardIndex) => (
                <div key={card.key} className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-4">
                  <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
                    <div className="space-y-3">
                      <div className="grid gap-3 md:grid-cols-2">
                        <FieldLabel label="卡片 key">
                          <input value={card.key} readOnly className={inputClassName("bg-zinc-100 text-zinc-500")} />
                        </FieldLabel>
                        <FieldLabel label="卡片連結 href">
                          <input
                            value={card.href}
                            onChange={(event) => updateCard(group, cardIndex, { href: event.target.value })}
                            className={inputClassName()}
                          />
                        </FieldLabel>
                      </div>
                      <div className="grid gap-3 md:grid-cols-2">
                        <FieldLabel label="卡片標籤">
                          <input
                            value={card.label}
                            onChange={(event) => updateCard(group, cardIndex, { label: event.target.value })}
                            className={inputClassName()}
                          />
                        </FieldLabel>
                        <FieldLabel label="卡片 meta">
                          <input
                            value={card.meta}
                            onChange={(event) => updateCard(group, cardIndex, { meta: event.target.value })}
                            className={inputClassName()}
                          />
                        </FieldLabel>
                      </div>
                      <FieldLabel label="卡片標題">
                        <input
                          value={card.title}
                          onChange={(event) => updateCard(group, cardIndex, { title: event.target.value })}
                          className={inputClassName()}
                        />
                      </FieldLabel>
                      <FieldLabel label="卡片描述">
                        <textarea
                          value={card.description}
                          onChange={(event) => updateCard(group, cardIndex, { description: event.target.value })}
                          className={textareaClassName()}
                        />
                      </FieldLabel>
                      <FieldLabel label="卡片按鈕文字（目前首頁卡片不顯示按鈕，保留給既有欄位）">
                        <input
                          value={card.ctaLabel}
                          onChange={(event) => updateCard(group, cardIndex, { ctaLabel: event.target.value })}
                          className={inputClassName()}
                        />
                      </FieldLabel>
                    </div>
                    <ImageCropControl
                      title={card.title || card.key}
                      image={card.image}
                      uploadedUrl={uploadedUrl}
                      onChange={(image) => updateCardImage(group, cardIndex, image)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </EditorSection>

      <EditorSection title="電子報區塊">
        <div className="grid gap-4 md:grid-cols-2">
          <FieldLabel label="電子報標題">
            <input
              value={content.newsletter.title}
              onChange={(event) =>
                setContent((prev) => ({
                  ...prev,
                  newsletter: { ...prev.newsletter, title: event.target.value },
                }))
              }
              className={inputClassName()}
            />
          </FieldLabel>
          <FieldLabel label="電子報說明文字">
            <input
              value={content.newsletter.description}
              onChange={(event) =>
                setContent((prev) => ({
                  ...prev,
                  newsletter: { ...prev.newsletter, description: event.target.value },
                }))
              }
              className={inputClassName()}
            />
          </FieldLabel>
          {([
            ["namePlaceholder", "姓名欄 placeholder"],
            ["emailPlaceholder", "Email 欄 placeholder"],
            ["buttonLabel", "按鈕文字"],
            ["loadingLabel", "送出中按鈕文字"],
            ["successTitle", "成功標題"],
            ["successDescription", "成功說明"],
          ] as const).map(([key, label]) => (
            <FieldLabel key={key} label={label}>
              <input
                value={content.newsletter[key]}
                onChange={(event) =>
                  setContent((prev) => ({
                    ...prev,
                    newsletter: { ...prev.newsletter, [key]: event.target.value },
                  }))
                }
                className={inputClassName()}
              />
            </FieldLabel>
          ))}
        </div>
      </EditorSection>

      <EditorSection title="頁尾文字">
        <div className="grid gap-4 md:grid-cols-3">
          <FieldLabel label="頁尾品牌名稱">
            <input
              value={content.footer.brandName}
              onChange={(event) =>
                setContent((prev) => ({
                  ...prev,
                  footer: { ...prev.footer, brandName: event.target.value },
                }))
              }
              className={inputClassName()}
            />
          </FieldLabel>
          <FieldLabel label="頁尾標語">
            <input
              value={content.footer.tagline}
              onChange={(event) =>
                setContent((prev) => ({
                  ...prev,
                  footer: { ...prev.footer, tagline: event.target.value },
                }))
              }
              className={inputClassName()}
            />
          </FieldLabel>
          <FieldLabel label="頁尾描述">
            <input
              value={content.footer.description}
              onChange={(event) =>
                setContent((prev) => ({
                  ...prev,
                  footer: { ...prev.footer, description: event.target.value },
                }))
              }
              className={inputClassName()}
            />
          </FieldLabel>
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
            label="Legacy assessment source"
            value={quantitative ? item.assessmentSourceProjectId || "" : ""}
            options={scaleOptions}
            emptyLabel={quantitative ? "請選擇 legacy psychometric scale" : "只有 legacy Quantitative 需要量表"}
            helper="Deprecated：舊站內量表來源僅保留歷史資料；前台主流程已改為 Google Form。"
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
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Legacy assessment URL</p>
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
