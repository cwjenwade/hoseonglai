"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import LectureRegistrationForm from "@/app/fortune-arrives/LectureRegistrationForm";

type LectureDetail = {
  id: string;
  slug: string;
  titleZh: string;
  dateLabel: string;
  time: string;
  speaker: string;
  locationZh: string;
};

const LECTURES: LectureDetail[] = [
  {
    id: "1",
    slug: "avoidant-attachment",
    titleZh: "「愛你卻不能夠給你我全部」 談迴避型人格及其伴侶自處",
    dateLabel: "10 Apr 2026",
    time: "19:00–21:00",
    speaker: "王涵羽 心理師",
    locationZh: "新竹 光合",
  },
  {
    id: "2",
    slug: "self-blame-in-love",
    titleZh: "「一定是我不夠好 所以你才想要逃」談那些在愛情中責怪自己的人及伴侶",
    dateLabel: "17 Apr 2026",
    time: "19:00–21:00",
    speaker: "陳宥語 心理師",
    locationZh: "嘉義",
  },
  {
    id: "3",
    slug: "tsundere-dynamics",
    titleZh: "「他要我我就不能走，得堅守不放手」傲嬌仔及其伴侶的攻防守備",
    dateLabel: "24 Apr 2026",
    time: "19:00–21:00",
    speaker: "任祈蔚 心理師",
    locationZh: "新竹 光合",
  },
  {
    id: "4",
    slug: "anxious-attachment",
    titleZh: "「一個人撐傘、一個人擦淚、一個人好累」焦慮型人格的追趕跑跳碰",
    dateLabel: "01 May 2026",
    time: "19:00–21:00",
    speaker: "任祈蔚 心理師",
    locationZh: "新竹 光合",
  },
  {
    id: "5",
    slug: "romance-in-ordinary",
    titleZh: "「平凡之中製造一些些浪漫」這樣談感情更幸福",
    dateLabel: "08 May 2026",
    time: "19:00–21:00",
    speaker: "",
    locationZh: "",
  },
  {
    id: "6",
    slug: "asperger-partner-support",
    titleZh: "「你以為愛 就是被愛 你揮霍了我的崇拜」亞斯伴侶的支持",
    dateLabel: "15 May 2026",
    time: "19:00–21:00",
    speaker: "甘雅婷 心理師",
    locationZh: "線上",
  },
  {
    id: "7",
    slug: "counseling-ethics",
    titleZh: "諮商倫理（宥語、雅婷、祈蔚）",
    dateLabel: "22 May 2026",
    time: "19:00–21:00",
    speaker: "陳宥語、甘雅婷、任祈蔚 心理師",
    locationZh: "線上",
  },
  {
    id: "8",
    slug: "online-dating",
    titleZh: "「網路愛情，撲朔迷離，似幻似真，猶夢未醒」網路愛情的白皮書",
    dateLabel: "29 May 2026",
    time: "19:00–21:00",
    speaker: "王涵羽 心理師",
    locationZh: "新竹 光合",
  },
  {
    id: "9",
    slug: "music-therapy-love",
    titleZh: "「兩顆心都迷惑，怎麼說，怎麼說都沒有救」從音樂中再一次經驗愛",
    dateLabel: "05 Jun 2026",
    time: "19:00–21:00",
    speaker: "李昀儒 音樂治療師",
    locationZh: "新竹 光合",
  },
];

export default function LectureDetailPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();

  const lecture = LECTURES.find((item) => item.slug === params.slug);

  if (!lecture) {
    return (
      <main className="min-h-screen bg-[#f6f3ee] px-6 py-20 text-[#1a1a1a] sm:px-8 lg:px-12">
        <p className="text-sm uppercase tracking-[0.22em] text-[#9c9c9c]">Lecture</p>
        <h1 className="mt-6 text-[2rem] tracking-[-0.02em]">找不到此講座</h1>
        <Link href="/fortune-arrives" className="mt-8 inline-flex border border-black/20 px-5 py-3 text-sm">
          Back to lectures
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f3ee] text-[#1a1a1a]">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-14 sm:px-8 lg:px-12 lg:py-20">
        <Link href="/fortune-arrives" className="text-[12px] uppercase tracking-[0.24em] text-[#8d8d8d]">
          ← Back to lectures
        </Link>

        <section className="mt-10 grid gap-10 border-t border-black/10 pt-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[12px] uppercase tracking-[0.24em] text-[#8d8d8d]">Lecture Detail</p>
            <h1
              className="mt-5 text-[2.2rem] leading-[1.16] tracking-[-0.02em] sm:text-[2.6rem]"
              style={{ fontFamily: "var(--font-noto-serif), var(--font-playfair), serif" }}
            >
              {lecture.titleZh}
            </h1>

            <div className="mt-8 space-y-2 text-[16px] text-[#4a4a4a]">
              <p>講者：{lecture.speaker || "待公布"}</p>
              <p>日期：{lecture.dateLabel}</p>
              <p>時間：{lecture.time}</p>
              <p>地點：{lecture.locationZh || "待公布"}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white/60 p-6">
            <LectureRegistrationForm
              lectureId={lecture.id}
              lectureTitle={lecture.titleZh}
              dateLabel={lecture.dateLabel}
              time={lecture.time}
              location={lecture.locationZh}
              onClose={() => router.push("/fortune-arrives")}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
