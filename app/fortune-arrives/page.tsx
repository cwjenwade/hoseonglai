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
    category: ["Upcoming", "Public Talk"],
    date: "2026-04-10",
    dateLabel: "10 Apr 2026",
    time: "19:00–21:00",
    titleZh: "「愛你卻不能夠給你我全部」 談迴避型人格及其伴侶自處",
    subtitleEn: "Hsinchu",
    speaker: "王涵羽 心理師",
    summary: "地點：新竹 光合",
    href: "/lectures/avoidant-attachment",
  },
  {
    id: "2",
    type: "LECTURE",
    category: ["Upcoming", "Public Talk"],
    date: "2026-04-17",
    dateLabel: "17 Apr 2026",
    time: "19:00–21:00",
    titleZh: "「一定是我不夠好 所以你才想要逃」談那些在愛情中責怪自己的人及伴侶",
    subtitleEn: "Chiayi",
    speaker: "陳宥語 心理師",
    summary: "地點：嘉義",
    href: "/lectures/self-blame-in-love",
  },
  {
    id: "3",
    type: "LECTURE",
    category: ["Upcoming", "Public Talk"],
    date: "2026-04-24",
    dateLabel: "24 Apr 2026",
    time: "19:00–21:00",
    titleZh: "「他要我我就不能走，得堅守不放手」傲嬌仔及其伴侶的攻防守備",
    subtitleEn: "Hsinchu",
    speaker: "任祈蔚 心理師",
    summary: "地點：新竹 光合",
    href: "/lectures/tsundere-dynamics",
  },
  {
    id: "4",
    type: "LECTURE",
    category: ["Upcoming", "Public Talk"],
    date: "2026-05-01",
    dateLabel: "01 May 2026",
    time: "19:00–21:00",
    titleZh: "「一個人撐傘、一個人擦淚、一個人好累」焦慮型人格的追趕跑跳碰",
    subtitleEn: "Hsinchu",
    speaker: "任祈蔚 心理師",
    summary: "地點：新竹 光合",
    href: "/lectures/anxious-attachment",
  },
  {
    id: "5",
    type: "LECTURE",
    category: ["Upcoming", "Public Talk"],
    date: "2026-05-08",
    dateLabel: "08 May 2026",
    time: "19:00–21:00",
    titleZh: "「平凡之中製造一些些浪漫」這樣談感情更幸福",
    subtitleEn: "",
    speaker: "",
    summary: "",
    href: "/lectures/romance-in-ordinary",
  },
  {
    id: "6",
    type: "LECTURE",
    category: ["Upcoming", "Public Talk"],
    date: "2026-05-15",
    dateLabel: "15 May 2026",
    time: "19:00–21:00",
    titleZh: "「你以為愛 就是被愛 你揮霍了我的崇拜」亞斯伴侶的支持",
    subtitleEn: "Online",
    speaker: "甘雅婷 心理師",
    summary: "地點：線上",
    href: "/lectures/asperger-partner-support",
  },
  {
    id: "7",
    type: "LECTURE",
    category: ["Upcoming", "Public Talk"],
    date: "2026-05-22",
    dateLabel: "22 May 2026",
    time: "19:00–21:00",
    titleZh: "諮商倫理（宥語、雅婷、祈蔚）",
    subtitleEn: "Online",
    speaker: "陳宥語、甘雅婷、任祈蔚 心理師",
    summary: "地點：線上",
    href: "/lectures/counseling-ethics",
  },
  {
    id: "8",
    type: "LECTURE",
    category: ["Upcoming", "Public Talk"],
    date: "2026-05-29",
    dateLabel: "29 May 2026",
    time: "19:00–21:00",
    titleZh: "「網路愛情，撲朔迷離，似幻似真，猶夢未醒」網路愛情的白皮書",
    subtitleEn: "Hsinchu",
    speaker: "王涵羽 心理師",
    summary: "地點：新竹 光合",
    href: "/lectures/online-dating",
  },
  {
    id: "9",
    type: "LECTURE",
    category: ["Upcoming", "Public Talk"],
    date: "2026-06-05",
    dateLabel: "05 Jun 2026",
    time: "19:00–21:00",
    titleZh: "「兩顆心都迷惑，怎麼說，怎麼說都沒有救」從音樂中再一次經驗愛",
    subtitleEn: "Hsinchu",
    speaker: "李昀儒 音樂治療師",
    summary: "地點：新竹 光合",
    href: "/lectures/music-therapy-love",
  }
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
      <div className="w-full px-6 sm:px-8 lg:px-12">
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