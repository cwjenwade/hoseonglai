"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { normalizeGroupTags, suggestGroupTags, type GroupItem } from "./group-data";

type TogethernessCatalogClientProps = {
  groups: GroupItem[];
  initialTag?: string;
};

function getGroupTags(group: GroupItem): string[] {
  return normalizeGroupTags(group.tags?.length ? group.tags : suggestGroupTags(group));
}

export default function TogethernessCatalogClient({ groups, initialTag }: TogethernessCatalogClientProps) {
  const allTags = useMemo(() => {
    const collected = groups.flatMap((group) => getGroupTags(group));
    return Array.from(new Set(collected));
  }, [groups]);

  const [activeTag, setActiveTag] = useState<string>(initialTag && allTags.includes(initialTag) ? initialTag : "全部");

  const filteredGroups = useMemo(() => {
    if (activeTag === "全部") return groups;
    return groups.filter((group) => getGroupTags(group).includes(activeTag));
  }, [activeTag, groups]);

  return (
    <>
      <section className="mb-16 rounded-[2rem] border border-neutral-300/60 bg-white/65 px-6 py-8 shadow-[0_18px_60px_-50px_rgba(0,0,0,0.4)] backdrop-blur-[2px] md:px-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-[42rem]">
            <p className="text-[0.64rem] uppercase tracking-[0.34em] text-neutral-400" style={{ fontFamily: "var(--font-geist-sans)" }}>
              # Tags / # Hashtags / # Found your group
            </p>
            <h2 className="mt-4 text-[1.35rem] leading-[1.35] text-neutral-900 md:text-[1.8rem]" style={{ fontFamily: "var(--font-noto-serif)" }}>
              點一個標籤，快速找到你可以加入的團體
            </h2>
            <p className="mt-3 max-w-[40rem] text-[0.95rem] leading-[1.85] text-neutral-600" style={{ fontFamily: "var(--font-noto-serif)" }}>
              我們先依團體名稱與描述幫你預設標籤，你也可以在後台直接修改。點擊標籤後，會立即篩選出相符的團體。
            </p>
          </div>

          <div className="flex items-center gap-3 text-[0.85rem] text-neutral-500" style={{ fontFamily: "var(--font-geist-sans)" }}>
            <span className="rounded-full border border-neutral-200 bg-white px-3 py-1">{filteredGroups.length} groups</span>
            <span className="rounded-full border border-neutral-200 bg-white px-3 py-1">{allTags.length} tags</span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => setActiveTag("全部")}
            className={[
              "rounded-full border px-4 py-2 text-sm transition",
              activeTag === "全部"
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-300 bg-white text-neutral-600 hover:border-neutral-500",
            ].join(" ")}
          >
            全部
          </button>

          {allTags.map((tag) => {
            const active = activeTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={[
                  "rounded-full border px-4 py-2 text-sm transition",
                  active
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-300 bg-white text-neutral-600 hover:border-neutral-500",
                ].join(" ")}
              >
                #{tag}
              </button>
            );
          })}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-10 xl:gap-y-20">
        {filteredGroups.map((group) => {
          const tags = getGroupTags(group);

          return (
            <article key={group.slug} className="group relative z-0">
              <Link
                href={`/togetherness/${group.slug}`}
                className="relative block p-0 text-left transition-[padding,transform,box-shadow] duration-300 ease-out hover:z-20 hover:-translate-y-2 hover:p-5 hover:shadow-[0_22px_44px_-28px_rgba(0,0,0,0.55)] focus-visible:z-20 focus-visible:-translate-y-2 focus-visible:p-5 focus-visible:shadow-[0_22px_44px_-28px_rgba(0,0,0,0.55)] focus-visible:outline-none"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-200">
                  <Image
                    src={group.image}
                    alt={group.title}
                    fill
                    sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                </div>

                <div className="mt-5">
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-neutral-300 bg-white/85 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-neutral-500"
                        style={{ fontFamily: "var(--font-geist-sans)" }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <h2 className="mt-4 text-[24px] font-medium leading-[1.25] text-neutral-900" style={{ fontFamily: "var(--font-noto-serif)" }}>
                    {group.title}
                  </h2>

                  <p className="mt-1 text-[13px] leading-[1.5] text-neutral-500" style={{ fontFamily: "var(--font-geist-sans)" }}>
                    {group.subtitle}
                  </p>

                  <p className="mt-4 max-w-[32ch] text-[15px] leading-[1.75] text-neutral-700 line-clamp-2" style={{ fontFamily: "var(--font-noto-serif)" }}>
                    {group.description}
                  </p>

                  <span
                    className="mt-5 inline-block border-b border-neutral-700 pb-[2px] text-[13px] text-neutral-700 transition-opacity duration-200 group-hover:opacity-60"
                    style={{ fontFamily: "var(--font-geist-sans)" }}
                  >
                    View detail / Register
                  </span>
                </div>
              </Link>
            </article>
          );
        })}
      </section>
    </>
  );
}
