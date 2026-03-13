"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Playfair_Display,
  Noto_Serif_TC,
  Geist,
  Noto_Sans_TC,
} from "next/font/google";
import {
  LECTURE_FILTERS,
  type LectureCategory,
  type LectureItem,
} from "./lectures-data";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
});

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

function formatZhDate(date: string): string {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

function extractLocationZh(summary: string): string {
  return summary.replace(/^地點：\s*/, "").trim();
}

type LectureIndexClientProps = {
  lectures: LectureItem[];
};

export default function LectureIndexClient({ lectures }: LectureIndexClientProps) {
  const [activeFilter, setActiveFilter] = useState<LectureCategory>("All");

  const filteredLectures = useMemo(() => {
    if (activeFilter === "All") return lectures;
    return lectures.filter((lecture) => lecture.category.includes(activeFilter));
  }, [activeFilter, lectures]);

  return (
    <main
      className={[
        playfair.variable,
        notoSerifTC.variable,
        geist.variable,
        notoSansTC.variable,
        "min-h-screen bg-[#f6f3ee] text-[#1a1a1a]",
      ].join(" ")}
    >
      <div className="w-full px-6 sm:px-8 lg:px-12">
        <section className="border-b border-black/10 py-20 md:py-24 lg:py-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-10">
            <div className="lg:col-span-5">
              <p
                className="mb-6 text-[11px] uppercase tracking-[0.28em] text-[#9c9c9c]"
                style={{ fontFamily: "var(--font-geist), var(--font-noto-sans-tc), sans-serif" }}
              >
                Programs / Lectures / Talk Series
              </p>

              <h1
                className="max-w-[10ch] text-[3.5rem] leading-none tracking-[-0.035em] text-[#1a1a1a] sm:text-[4.25rem] lg:text-[4.5rem]"
                style={{
                  fontFamily:
                    "var(--font-playfair), var(--font-noto-serif-tc), serif",
                }}
              >
                講座系列
              </h1>
            </div>

            <div className="lg:col-span-4">
              <div className="mx-auto mt-2 max-w-[28ch] space-y-5">
                <p
                  className="text-center text-[18px] leading-[1.8] text-[#3f3f3f]"
                  style={{ fontFamily: "var(--font-noto-sans-tc), var(--font-geist), sans-serif" }}
                >
                  致力於藝術研究、書寫、策展與公民生活的公共計畫。
                  <br />
                  講座、工作坊與對話在此展開，
                  <br />
                  一場一場，累積成持續生成的公共學知。
                </p>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="ml-auto mt-2 max-w-[26ch]">
                <p
                  className="text-right text-[14px] leading-[1.8] text-[#8a8a8a]"
                  style={{ fontFamily: "var(--font-geist), var(--font-noto-sans-tc), sans-serif" }}
                >
                  Public programs devoted to research, writing, curation, and the civic life of art.
                  Lectures, workshops, and conversations are presented as part of an ongoing archive of public study.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-10">
          <nav aria-label="Lecture filters" className="flex flex-wrap gap-x-8 gap-y-3">
            {LECTURE_FILTERS.map((filter) => {
              const isActive = activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={[
                    "border-b pb-1 text-[14px] transition-[color,border-color,opacity] duration-200",
                    isActive
                      ? "border-black/70 text-[#1a1a1a]"
                      : "border-transparent text-[#9c9c9c] hover:text-[#6b6b6b]",
                  ].join(" ")}
                  style={{ fontFamily: "var(--font-geist), var(--font-noto-sans-tc), sans-serif" }}
                >
                  {filter}
                </button>
              );
            })}
          </nav>
        </section>

        <section aria-label="Lecture archive" className="pb-20 md:pb-24 lg:pb-28">
          <div className="border-t border-black/10">
            {filteredLectures.map((lecture) => (
              <article
                key={lecture.id}
                className="border-b border-black/10 py-10 md:py-12"
              >
                <div className="grid grid-cols-1 gap-8 md:gap-10 lg:grid-cols-12">
                  <div className="lg:col-span-2">
                    <p
                      className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#9c9c9c]"
                      style={{
                        fontFamily:
                          "var(--font-geist), var(--font-noto-sans-tc), sans-serif",
                      }}
                    >
                      {lecture.type}
                    </p>

                    <div
                      className="space-y-1 text-[14px] leading-[1.7] text-[#6b6b6b] md:text-[15px]"
                      style={{
                        fontFamily:
                          "var(--font-geist), var(--font-noto-sans-tc), sans-serif",
                      }}
                    >
                      <p>{formatZhDate(lecture.date)}</p>
                      <p>{lecture.dateLabel}</p>
                      <p>{lecture.time}</p>
                    </div>
                  </div>

                  <div className="lg:col-span-7">
                    <div className="max-w-[42rem]">
                      <h2
                        className="text-[1.9rem] leading-[1.08] tracking-[-0.03em] text-[#1a1a1a] sm:text-[2.15rem] lg:text-[33px]"
                        style={{
                          fontFamily:
                            "var(--font-playfair), var(--font-noto-serif-tc), serif",
                        }}
                      >
                        {lecture.titleZh}
                      </h2>

                      <p
                        className="mt-6 max-w-[42ch] text-[16px] leading-[1.65] text-[#1a1a1a]"
                        style={{
                          fontFamily:
                            "var(--font-geist), var(--font-noto-sans-tc), sans-serif",
                        }}
                      >
                        {lecture.speaker ? `講者：${lecture.speaker}` : ""}
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-3 lg:pl-4">
                    <div
                      className="flex h-full flex-col justify-between"
                      style={{
                        fontFamily:
                          "var(--font-geist), var(--font-noto-sans-tc), sans-serif",
                      }}
                    >
                      <div className="space-y-1 text-[14px] leading-[1.7] text-[#6b6b6b] md:text-[15px]">
                        <p className="text-[#1a1a1a]">地點｜{extractLocationZh(lecture.summary)}</p>
                        {lecture.subtitleEn ? <p>Location｜{lecture.subtitleEn}</p> : null}
                      </div>

                      <div className="pt-8">
                        <Link
                          href={lecture.href}
                          className="group inline-flex items-center gap-2 text-[14px] text-[#1a1a1a] transition-opacity duration-200 hover:opacity-70"
                        >
                          <span>View detail</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className="border-t border-black/10 py-10 md:py-12">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p
                className="max-w-[48ch] text-[15px] leading-[1.75] text-[#6b6b6b]"
                style={{ fontFamily: "var(--font-geist), var(--font-noto-sans-tc), sans-serif" }}
              >
                For registration updates, research collaboration, and program
                notices, please refer to each lecture page or subscribe to the
                public programs newsletter.
              </p>
            </div>

            <div className="lg:col-span-4 lg:text-right">
              <Link
                href="/programs/subscribe"
                className="inline-flex items-center border border-black/10 px-5 py-3 text-[14px] text-[#1a1a1a] transition-colors duration-200 hover:border-black/20"
                style={{ fontFamily: "var(--font-geist), var(--font-noto-sans-tc), sans-serif" }}
              >
                Subscribe
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
