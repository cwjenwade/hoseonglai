"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Geist,
  Noto_Sans_TC,
  Noto_Serif_TC,
} from "next/font/google";
import { normalizeGroupTags, suggestGroupTags, type GroupItem } from "./group-data";

const notoSerifTC = Noto_Serif_TC({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-noto-serif-tc",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-noto-sans-tc",
});

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
    <div className={[notoSerifTC.variable, geist.variable, notoSansTC.variable].join(" ")}>
      <section className="border-b border-black/10 py-20 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="lg:col-span-5">
            <p className="mb-6 text-[11px] uppercase tracking-[0.28em] text-[#9c9c9c]" style={{ fontFamily: "var(--font-geist)" }}>
              Group Therapy / Togetherness
            </p>

            <h2 className="max-w-[9ch] text-[3.25rem] font-semibold leading-[1.05] tracking-[-0.02em] text-[#1a1a1a] sm:text-[3.6rem] lg:text-[4rem]" style={{ fontFamily: "var(--font-noto-serif-tc)" }}>
              團體諮商
            </h2>

            <p className="mt-3 text-[28px] font-normal leading-[1.2] tracking-[0.02em] text-[#6b6b6b] sm:text-[32px] lg:text-[44px]" style={{ fontFamily: "var(--font-geist)" }}>
              Togetherness
            </p>
          </div>

          <div className="lg:col-span-4">
            <div className="mx-auto mt-2 max-w-[28ch] space-y-5">
              <p className="text-right text-[18px] leading-[1.8] text-[#3f3f3f]" style={{ fontFamily: "var(--font-noto-serif-tc)" }}>
                我們把可以靠近的時刻
                <br />
                留給願意走進團體的人。
                <br />
                在傾聽與回應之間，
                <br />
                找到新的自己。
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="ml-auto mt-2 max-w-[26ch]">
              <p className="text-right text-[18px] leading-[1.8] text-[#8a8a8a]" style={{ fontFamily: "var(--font-geist)" }}>
                A quiet, refined space for group therapy.
                <br />
                Find the group that fits your needs through tags, then explore and register.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <div className="flex flex-wrap items-center gap-4">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#9c9c9c]" style={{ fontFamily: "var(--font-geist)" }}>
            # Tags / # 找團體 / # Filter
          </p>
          <p className="text-[12px] text-[#9c9c9c]" style={{ fontFamily: "var(--font-geist)" }}>
            {filteredGroups.length} / {groups.length}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => setActiveTag("全部")}
            className={[
              "rounded-full border px-4 py-2 text-sm transition",
              activeTag === "全部"
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-300 bg-white text-neutral-600 hover:border-neutral-500",
            ].join(" ")}
            style={{ fontFamily: "var(--font-geist)" }}
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
                style={{ fontFamily: "var(--font-geist)" }}
              >
                #{tag}
              </button>
            );
          })}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-10 xl:gap-y-16">
        {filteredGroups.map((group) => {
          const tags = getGroupTags(group);

          return (
            <article key={group.slug} className="group relative z-0">
              <Link
                href={`/togetherness/${group.slug}`}
                className="relative block p-0 text-left transition-[transform,box-shadow,opacity] duration-300 ease-out hover:z-20 hover:shadow-[0_22px_44px_-28px_rgba(0,0,0,0.38)] hover:opacity-100 focus-visible:z-20 focus-visible:shadow-[0_22px_44px_-28px_rgba(0,0,0,0.38)] focus-visible:outline-none"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-200">
                  <Image
                    src={group.image}
                    alt={group.title}
                    fill
                    sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                  />
                </div>

                <div className="mt-5">
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-neutral-300 bg-white/85 px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] text-neutral-500"
                        style={{ fontFamily: "var(--font-geist)" }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <h2 className="mt-4 text-[24px] font-medium leading-[1.25] text-neutral-900" style={{ fontFamily: "var(--font-noto-serif-tc)" }}>
                    {group.title}
                  </h2>

                  <p className="mt-1 text-[13px] leading-[1.5] text-neutral-500" style={{ fontFamily: "var(--font-geist)" }}>
                    {group.subtitle}
                  </p>

                  <p className="mt-4 max-w-[32ch] text-[15px] leading-[1.75] text-neutral-700 line-clamp-2" style={{ fontFamily: "var(--font-noto-serif-tc)" }}>
                    {group.description}
                  </p>

                  <span
                    className="mt-5 inline-block border-b border-neutral-700 pb-[2px] text-[13px] text-neutral-700 transition-opacity duration-200 group-hover:opacity-60"
                    style={{ fontFamily: "var(--font-geist)" }}
                  >
                    View detail / Register
                  </span>
                </div>
              </Link>
            </article>
          );
        })}
      </section>
    </div>
  );
}
