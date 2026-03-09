"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Playfair_Display,
  Noto_Serif_TC,
  Geist,
  Noto_Sans_TC,
} from "next/font/google";

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

type LectureCategory = "All" | "Upcoming" | "Past" | "Research" | "Public Talk";

type Lecture = {
  id: string;
  type: "LECTURE" | "WORKSHOP" | "PUBLIC TALK";
  category: Exclude<LectureCategory, "All">[];
  date: string;
  dateLabel: string;
  time: string;
  titleZh: string;
  subtitleEn: string;
  speaker: string;
  summary: string;
  href: string;
};

const lectures: Lecture[] = [
  {
    id: "1",
    type: "LECTURE",
    category: ["Upcoming", "Research"],
    date: "2026-04-10",
    dateLabel: "10 Apr 2026",
    time: "19:00–20:30",
    titleZh: "情緒、圖像與觀看的倫理",
    subtitleEn: "Image, affect, and the public conditions of attention",
    speaker: "Dr. Lin Yu-Han",
    summary:
      "本場講座處理影像展示、情緒召喚與公共觀看之間的關係，聚焦藝術場域中感受如何被安排、延遲與命名。",
    href: "/lectures/emotion-image-ethics",
  },
  {
    id: "2",
    type: "PUBLIC TALK",
    category: ["Upcoming", "Public Talk"],
    date: "2026-04-24",
    dateLabel: "24 Apr 2026",
    time: "14:30–16:00",
    titleZh: "博物館作為城市中的閱讀空間",
    subtitleEn: "Public program, civic tempo, and the architecture of pause",
    speaker: "Mei Chen",
    summary:
      "講座從城市文化機構的日常使用出發，討論博物館如何透過空間節奏、節目設計與文字編排形成新的公共閱讀經驗。",
    href: "/lectures/museum-as-reading-space",
  },
  {
    id: "3",
    type: "WORKSHOP",
    category: ["Upcoming", "Research"],
    date: "2026-05-08",
    dateLabel: "08 May 2026",
    time: "10:00–12:00",
    titleZh: "展覽文字與知識轉譯工作坊",
    subtitleEn: "Writing for audiences without reducing conceptual density",
    speaker: "Chao Wen-Hsu",
    summary:
      "工作坊聚焦展覽文本、教育材料與研究摘要的語言處理，處理知識密度、閱讀節奏與觀眾可及性之間的平衡。",
    href: "/lectures/exhibition-writing-workshop",
  },
  {
    id: "4",
    type: "LECTURE",
    category: ["Past", "Research"],
    date: "2025-11-15",
    dateLabel: "15 Nov 2025",
    time: "16:00–17:30",
    titleZh: "檔案、策展與機構記憶",
    subtitleEn: "Archival order and the afterlife of curatorial decisions",
    speaker: "Prof. Claire Hsu",
    summary:
      "本講座回到檔案與制度實作，討論策展決策如何在資料保存、再描述與再展示之中持續發生作用。",
    href: "/lectures/archive-curation-memory",
  },
  {
    id: "5",
    type: "PUBLIC TALK",
    category: ["Past", "Public Talk"],
    date: "2025-10-03",
    dateLabel: "03 Oct 2025",
    time: "19:30–21:00",
    titleZh: "當代藝術與觀眾的距離",
    subtitleEn: "On proximity, refusal, and the pace of interpretation",
    speaker: "Yao Ting",
    summary:
      "講者從展場經驗切入，處理作品理解、觀看停留與觀眾不確定感，討論距離如何成為公共節目的條件。",
    href: "/lectures/art-and-distance",
  },
  {
    id: "6",
    type: "LECTURE",
    category: ["Past", "Research"],
    date: "2025-08-21",
    dateLabel: "21 Aug 2025",
    time: "18:30–20:00",
    titleZh: "聲音、敘事與場館中的時間",
    subtitleEn: "Listening practices across lecture, gallery, and archive",
    speaker: "Dr. Wang Yi-Chieh",
    summary:
      "此場講座探討聲音如何改變觀眾對時間的感受，並檢視演講、展覽與檔案空間之間的敘事差異。",
    href: "/lectures/sound-narrative-time",
  },
];

const filters: LectureCategory[] = ["All", "Upcoming", "Past", "Research", "Public Talk"];

export default function LectureIndexPage() {
  const [activeFilter, setActiveFilter] = useState<LectureCategory>("All");

  const filteredLectures = useMemo(() => {
    if (activeFilter === "All") return lectures;
    return lectures.filter((lecture) => lecture.category.includes(activeFilter));
  }, [activeFilter]);

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
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <section className="border-b border-black/10 py-20 md:py-24 lg:py-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
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

            <div className="lg:col-span-4 lg:col-start-9">
              <p
                className="max-w-[34ch] text-[16px] leading-[1.75] text-[#6b6b6b] md:text-[17px]"
                style={{ fontFamily: "var(--font-geist), var(--font-noto-sans-tc), sans-serif" }}
              >
                Public programs devoted to research, writing, curation, and the
                civic life of art. Lectures, workshops, and conversations are
                presented as part of an ongoing archive of public study.
              </p>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-10">
          <nav aria-label="Lecture filters" className="flex flex-wrap gap-x-8 gap-y-3">
            {filters.map((filter) => {
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
                      <p>{lecture.dateLabel}</p>
                      <p>{lecture.time}</p>
                    </div>
                  </div>

                  <div className="lg:col-span-7">
                    <div className="max-w-[42rem]">
                      <h2
                        className="text-[1.9rem] leading-[1.08] tracking-[-0.03em] text-[#1a1a1a] sm:text-[2.15rem] lg:text-[2.3rem]"
                        style={{
                          fontFamily:
                            "var(--font-playfair), var(--font-noto-serif-tc), serif",
                        }}
                      >
                        {lecture.titleZh}
                      </h2>

                      <p
                        className="mt-3 text-[14px] leading-[1.7] text-[#6b6b6b] md:text-[15px]"
                        style={{
                          fontFamily:
                            "var(--font-geist), var(--font-noto-sans-tc), sans-serif",
                        }}
                      >
                        {lecture.subtitleEn}
                      </p>

                      <p
                        className="mt-6 max-w-[42ch] text-[16px] leading-[1.65] text-[#1a1a1a]"
                        style={{
                          fontFamily:
                            "var(--font-geist), var(--font-noto-sans-tc), sans-serif",
                        }}
                      >
                        {lecture.summary}
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
                        <p className="text-[#1a1a1a]">{lecture.speaker}</p>
                        <p>{lecture.dateLabel}</p>
                        <p>{lecture.time}</p>
                      </div>

                      <div className="pt-8">
                        <Link
                          href={lecture.href}
                          className="group inline-flex items-center gap-2 text-[14px] text-[#1a1a1a] transition-opacity duration-200 hover:opacity-70"
                        >
                          <span>View details</span>
                          <span className="inline-block transition-transform duration-200 group-hover:translate-x-[2px]">
                            →
                          </span>
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