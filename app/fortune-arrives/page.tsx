"use client";

import { useState } from "react";
import { Brain, Heart, Sparkles, Users, Music, ShieldCheck, Laptop, Compass, X } from "lucide-react";
import LectureRegistrationForm from "./LectureRegistrationForm";

type Lecture = {
  id: string;
  title: string;
  speaker: string;
  time: string;
  intro: string;
  highlights: string[];
  tag: string;
  palette: {
    cardBg: string;
    chipBg: string;
    accent: string;
    button: string;
    buttonHover: string;
  };
  icon: React.ReactNode;
};

const lectures: Lecture[] = [
  {
    id: "lecture-1",
    title: "「愛你卻不能夠給你我全部」談迴避型人格及其伴侶自處",
    speaker: "講者：待補",
    time: "2026/04/10 19:30 - 21:00",
    intro:
      "從親密關係中的退縮、抽離與保持距離出發，整理迴避型人格在關係裡的互動模式，也討論伴侶如何理解界線、失落與靠近的節奏。",
    highlights: ["迴避型互動模式", "伴侶如何自處", "關係中的界線與靠近"],
    tag: "親密關係心理",
    palette: {
      cardBg: "bg-[#FFE8D6]",
      chipBg: "bg-[#FFF3E8]",
      accent: "text-[#A85A14]",
      button: "bg-[#DD821D]",
      buttonHover: "hover:bg-[#C87015]",
    },
    icon: <Compass className="h-5 w-5" />,
  },
  {
    id: "lecture-2",
    title: "「一定是我不夠好 所以你才想要逃」談那些在愛情中責怪自己的人及伴侶",
    speaker: "講者：宥語",
    time: "2026/04/17 19:30 - 21:00",
    intro:
      "聚焦自責、自我貶低與關係中的內在歸因，討論個體如何把關係困難全數收進自己身上，也思考伴侶能如何回應這樣的脆弱。",
    highlights: ["自責與羞愧感", "低自我價值感", "伴侶回應方式"],
    tag: "自我價值與愛",
    palette: {
      cardBg: "bg-[#FFF1C6]",
      chipBg: "bg-[#FFF8E2]",
      accent: "text-[#8B6B00]",
      button: "bg-[#D4B810]",
      buttonHover: "hover:bg-[#BEA30E]",
    },
    icon: <Heart className="h-5 w-5" />,
  },
  {
    id: "lecture-3",
    title: "「他要我我就不能走，得堅守不放手」傲嬌仔及其伴侶的攻防守備",
    speaker: "講者：待補",
    time: "2026/04/24 19:30 - 21:00",
    intro:
      "從嘴硬、拉扯、試探與期待被懂的情境切入，討論傲嬌風格背後的情感需求，以及伴侶在靠近與回應時常見的困境。",
    highlights: ["嘴硬與試探", "被需要的渴望", "互動中的攻防節奏"],
    tag: "互動攻防",
    palette: {
      cardBg: "bg-[#EDE7D6]",
      chipBg: "bg-[#F7F2E8]",
      accent: "text-[#6E6540]",
      button: "bg-[#88854E]",
      buttonHover: "hover:bg-[#727042]",
    },
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    id: "lecture-4",
    title: "「一個人撐傘、一個人擦淚、一個人好累」焦慮型人格的追趕跑跳碰",
    speaker: "講者：待補",
    time: "2026/05/01 19:30 - 21:00",
    intro:
      "整理焦慮型人格在關係中的追趕、確認、害怕失去與情緒耗竭，並討論伴侶如何在不失去自己之下維持連結。",
    highlights: ["害怕失去", "高需求與高不安", "伴侶如何穩住關係"],
    tag: "依附與焦慮",
    palette: {
      cardBg: "bg-[#FCE4EC]",
      chipBg: "bg-[#FFF0F5]",
      accent: "text-[#A63D66]",
      button: "bg-[#D96C95]",
      buttonHover: "hover:bg-[#C45882]",
    },
    icon: <Brain className="h-5 w-5" />,
  },
  {
    id: "lecture-5",
    title: "「平凡之中製造一些些浪漫」這樣談感情更幸福",
    speaker: "講者：待補",
    time: "2026/05/08 19:30 - 21:00",
    intro:
      "從日常互動、語言表達與小型儀式感切入，討論伴侶如何在平凡生活中維持溫度，累積穩定而可持續的親密感。",
    highlights: ["日常浪漫感", "幸福感的累積", "伴侶溝通細節"],
    tag: "幸福關係",
    palette: {
      cardBg: "bg-[#EAF7E8]",
      chipBg: "bg-[#F4FBF2]",
      accent: "text-[#4F7A45]",
      button: "bg-[#76A667]",
      buttonHover: "hover:bg-[#648E57]",
    },
    icon: <Heart className="h-5 w-5" />,
  },
  {
    id: "lecture-6",
    title: "「歌詞」亞斯伴侶的支持",
    speaker: "講者：待補",
    time: "2026/05/15 19:30 - 21:00",
    intro:
      "討論亞斯特質進入親密關係後，雙方在情緒表達、溝通節奏、理解方式與生活安排上可能出現的差異，以及支持彼此的方法。",
    highlights: ["亞斯特質與伴侶關係", "溝通差異", "支持與共處方式"],
    tag: "神經多樣性",
    palette: {
      cardBg: "bg-[#E6F2FF]",
      chipBg: "bg-[#F0F7FF]",
      accent: "text-[#2F6B9A]",
      button: "bg-[#4C89B8]",
      buttonHover: "hover:bg-[#3D739D]",
    },
    icon: <Users className="h-5 w-5" />,
  },
  {
    id: "lecture-7",
    title: "諮商倫理",
    speaker: "講者：宥語、雅婷、祈蔚",
    time: "2026/05/22 19:30 - 21:00",
    intro:
      "整理助人工作中的專業界線、保密、雙重關係、知情同意與風險處理，從實務情境理解倫理判準如何落在真實工作現場。",
    highlights: ["專業界線", "保密與知情同意", "倫理困境判斷"],
    tag: "專業實務",
    palette: {
      cardBg: "bg-[#E8F0EC]",
      chipBg: "bg-[#F3F7F5]",
      accent: "text-[#47675A]",
      button: "bg-[#5D8A76]",
      buttonHover: "hover:bg-[#4E7463]",
    },
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    id: "lecture-8",
    title: "「網路愛情，撲朔迷離，似幻似真，猶夢未醒」網路愛情的白皮書",
    speaker: "講者：待補",
    time: "2026/05/29 19:30 - 21:00",
    intro:
      "從線上互動、投射、親密感生成到失落與不確定，整理網路愛情中的心理現象與風險，也討論如何辨識關係中的真實感。",
    highlights: ["網路親密感", "投射與想像", "關係真實性的判讀"],
    tag: "數位親密關係",
    palette: {
      cardBg: "bg-[#EFE7FF]",
      chipBg: "bg-[#F6F1FF]",
      accent: "text-[#6849A3]",
      button: "bg-[#7C62C9]",
      buttonHover: "hover:bg-[#684FB2]",
    },
    icon: <Laptop className="h-5 w-5" />,
  },
  {
    id: "lecture-9",
    title: "「兩顆心都迷惑，怎麼說，怎麼說都沒有救」從音樂中再一次經驗愛",
    speaker: "講者：待補",
    time: "2026/06/05 19:30 - 21:00",
    intro:
      "透過音樂與歌詞經驗親密關係中的失落、渴望、誤解與牽掛，討論人如何在聽歌時重新接觸自己對愛的感受與記憶。",
    highlights: ["音樂與情感經驗", "歌詞中的關係投射", "重新接觸愛的記憶"],
    tag: "音樂與情感",
    palette: {
      cardBg: "bg-[#FFE7EF]",
      chipBg: "bg-[#FFF2F6]",
      accent: "text-[#A84668]",
      button: "bg-[#D96A8A]",
      buttonHover: "hover:bg-[#C55778]",
    },
    icon: <Music className="h-5 w-5" />,
  },
];

export default function PsychologyLectureFestivalPage() {
  const [activeLecture, setActiveLecture] = useState<Lecture | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FFF9F2] text-[#2E2A26]">
      <div className="pointer-events-none absolute left-[-80px] top-[-60px] h-64 w-64 rounded-full bg-[#F7C98B]/40 blur-3xl" />
      <div className="pointer-events-none absolute right-[-100px] top-[120px] h-72 w-72 rounded-full bg-[#DDE3B4]/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-120px] left-[20%] h-80 w-80 rounded-full bg-[#FFDFA8]/30 blur-3xl" />

      <main className="mx-auto max-w-7xl px-6 py-8 md:px-10 lg:px-12 lg:py-12">
        <section className="relative overflow-hidden rounded-[32px] bg-[#2E2A26] px-7 py-10 text-[#FFF9F2] shadow-[0_20px_60px_rgba(46,42,38,0.18)] md:px-10 md:py-14">
          <div className="absolute right-0 top-0 h-36 w-36 translate-x-8 -translate-y-8 rounded-full bg-[#DD821D]/30 blur-2xl" />
          <div className="absolute bottom-0 left-0 h-40 w-40 -translate-x-10 translate-y-10 rounded-full bg-[#D4B810]/20 blur-2xl" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="inline-flex rounded-full bg-white/10 px-4 py-1.5 text-sm tracking-wide text-[#FFE3BA]">
                Psychology Lecture Project
              </p>
              <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight md:text-5xl">
                心理學講座企劃
                <span className="mt-2 block text-[#F6C15A]">把愛、關係與人心講得更好看</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#F8ECDD]/90 md:text-lg">
                這不是一排制式公告。這是一組有情緒、有主題、有觀看慾望的心理學講座頁面。把親密關係、人格風格、倫理與音樂經驗整理成一場一場可被打開的探索。
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <span className="rounded-full bg-[#DD821D] px-4 py-2 text-sm font-medium text-white">
                  親密關係
                </span>
                <span className="rounded-full bg-[#88854E] px-4 py-2 text-sm font-medium text-white">
                  人格與依附
                </span>
                <span className="rounded-full bg-[#D4B810] px-4 py-2 text-sm font-medium text-[#2E2A26]">
                  音樂與情感
                </span>
              </div>
            </div>

            <div className="grid gap-3 rounded-[28px] bg-white/8 p-5 backdrop-blur-sm">
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-sm text-[#FFE3BA]">系列主題</p>
                <p className="mt-2 text-xl font-bold">愛、焦慮、依附、界線、倫理、數位親密</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-2xl font-black text-[#F6C15A]">9</p>
                  <p className="mt-1 text-sm text-[#F8ECDD]/80">場講座</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-2xl font-black text-[#F6C15A]">3</p>
                  <p className="mt-1 text-sm text-[#F8ECDD]/80">核心主軸</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-2xl font-black text-[#F6C15A]">1</p>
                  <p className="mt-1 text-sm text-[#F8ECDD]/80">系列企劃</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {lectures.map((lecture) => (
            <button
              key={lecture.id}
              type="button"
              onClick={() => {
                setActiveLecture(lecture);
                setShowRegistration(false);
              }}
              className={`group relative overflow-hidden rounded-[28px] p-6 text-left shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-1 hover:rotate-[-0.6deg] hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)] ${lecture.palette.cardBg}`}
            >
              <div className="absolute right-[-20px] top-[-20px] h-28 w-28 rounded-full bg-white/40 blur-2xl" />

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${lecture.palette.chipBg} ${lecture.palette.accent}`}
                  >
                    {lecture.icon}
                    {lecture.tag}
                  </span>
                  <span className="rounded-full bg-white/70 px-3 py-1 text-xs text-[#5C554F]">
                    點擊展開
                  </span>
                </div>

                <h2 className="mt-4 line-clamp-3 text-2xl font-black leading-snug text-[#2E2A26]">
                  {lecture.title}
                </h2>

                <p className="mt-4 text-sm font-medium text-[#5D554D]">{lecture.speaker}</p>
                <p className="mt-1 text-sm text-[#6B635B]">{lecture.time}</p>

                <p className="mt-4 line-clamp-3 text-sm leading-7 text-[#4F4943]">
                  {lecture.intro}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {lecture.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="rounded-full bg-white/75 px-3 py-1 text-xs text-[#4B443D]"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className="mt-6">
                  <span
                    className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold text-white transition ${lecture.palette.button} ${lecture.palette.buttonHover}`}
                  >
                    查看講座詳情
                  </span>
                </div>
              </div>
            </button>
          ))}
        </section>

        <section className="mt-8 rounded-[32px] bg-white p-7 shadow-[0_12px_30px_rgba(0,0,0,0.06)] md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold tracking-wide text-[#A85A14]">LECTURE SERIES NOTE</p>
              <h3 className="mt-2 text-3xl font-black text-[#2E2A26]">把心理學講座做成有人會想點開的企劃</h3>
              <p className="mt-4 max-w-3xl text-base leading-8 text-[#5C554F]">
                重點不是把資訊塞滿，而是讓每一場講座都有自己的情緒表面、主題辨識與觀看入口。這樣使用者會先被吸引，再理解內容，最後才願意報名。
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                if (lectures.length > 0) {
                  setActiveLecture(lectures[0]);
                  setShowRegistration(false);
                }
              }}
              className="rounded-full bg-[#2E2A26] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1F1C19]"
            >
              先看第一場
            </button>
          </div>
        </section>
      </main>

      {activeLecture && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px]">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-[32px] bg-[#FFF9F2] shadow-[0_24px_80px_rgba(0,0,0,0.24)]">
            <div className={`h-3 w-full ${activeLecture.palette.button}`} />

            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="max-w-2xl">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${activeLecture.palette.chipBg} ${activeLecture.palette.accent}`}
                  >
                    {activeLecture.icon}
                    {activeLecture.tag}
                  </span>

                  <h2 className="mt-4 text-3xl font-black leading-snug text-[#2E2A26]">
                    {activeLecture.title}
                  </h2>

                  <p className="mt-4 text-sm font-medium text-[#5D554D]">{activeLecture.speaker}</p>
                  <p className="mt-1 text-sm text-[#6B635B]">{activeLecture.time}</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setActiveLecture(null);
                    setShowRegistration(false);
                  }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#DDD2C7] bg-white text-[#5D554D] transition hover:bg-[#F5EEE7]"
                  aria-label="關閉視窗"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <div className="rounded-[24px] bg-white p-5 shadow-[0_8px_20px_rgba(0,0,0,0.05)]">
                    <p className="text-sm font-semibold text-[#A85A14]">講座簡介</p>
                    <p className="mt-3 text-[15px] leading-8 text-[#4F4943]">
                      {activeLecture.intro}
                    </p>
                  </div>

                  <div className="mt-4 rounded-[24px] bg-white p-5 shadow-[0_8px_20px_rgba(0,0,0,0.05)]">
                    <p className="text-sm font-semibold text-[#A85A14]">講座重點</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {activeLecture.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="rounded-full bg-[#F6EFE7] px-3 py-1.5 text-sm text-[#4A433D]"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-[24px] bg-[#2E2A26] p-5 text-[#FFF9F2] shadow-[0_12px_28px_rgba(46,42,38,0.15)]">
                  <p className="text-sm text-[#F2C98F]">參與這場講座</p>
                  <h3 className="mt-2 text-2xl font-black">打開一段關於愛的心理經驗</h3>
                  <p className="mt-3 text-sm leading-7 text-[#F8ECDD]/90">
                    你可以在這裡放報名表單、活動提醒、講者資訊，或報名須知。右側區塊設計成固定的行動區，比原本單純按鈕更像真正的活動頁。
                  </p>

                  {!showRegistration ? (
                    <div className="mt-6 space-y-3">
                      <button
                        type="button"
                        onClick={() => setShowRegistration(true)}
                        className={`w-full rounded-full px-5 py-3 text-sm font-semibold text-white transition ${activeLecture.palette.button} ${activeLecture.palette.buttonHover}`}
                      >
                        我要參加這場講座
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setActiveLecture(null);
                          setShowRegistration(false);
                        }}
                        className="w-full rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-[#FFF9F2] transition hover:bg-white/10"
                      >
                        先看看其他場次
                      </button>
                    </div>
                  ) : (
                    <div className="mt-6 rounded-[20px] bg-white p-4 text-[#2E2A26]">
                      <LectureRegistrationForm
                        lectureId={activeLecture.id}
                        lectureTitle={activeLecture.title}
                        onClose={() => setShowRegistration(false)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}