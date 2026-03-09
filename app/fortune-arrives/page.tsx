"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  UserRound,
  Tag,
  X,
  ChevronDown,
} from "lucide-react";
import LectureRegistrationForm from "./LectureRegistrationForm";

type Lecture = {
  id: string;
  title: string;
  speaker: string;
  time: string;
  intro: string;
  highlights: string[];
  tag: string;
  coverImage: string;
  speakerImage: string;
};

const lectures: Lecture[] = [
  {
    id: "lecture-1",
    title: "「愛你卻不能夠給你我全部」談迴避型人格及其伴侶自處",
    speaker: "講者：待補",
    time: "2026/04/10 19:30 - 21:00",
    intro:
      "從親密關係中的退縮、抽離、降低回應與保持距離出發，整理迴避型人格在關係中的互動樣態，也討論伴侶如何理解界線、失落與靠近的節奏。",
    highlights: ["迴避型互動樣態", "伴侶如何自處", "界線與靠近的節奏"],
    tag: "依附與距離",
    coverImage: "/lectures/lecture-1-cover.jpg",
    speakerImage: "/speakers/lecture-1.jpg",
  },
  {
    id: "lecture-2",
    title: "「一定是我不夠好 所以你才想要逃」談那些在愛情中責怪自己的人及伴侶",
    speaker: "講者：宥語",
    time: "2026/04/17 19:30 - 21:00",
    intro:
      "聚焦自責、自我貶抑與關係中的內在歸因，討論個體如何把關係困難收進自己身上，也思考伴侶能如何回應這樣的脆弱與不安。",
    highlights: ["自責與羞愧", "低自我價值感", "伴侶回應方式"],
    tag: "自我與親密",
    coverImage: "/lectures/lecture-2-cover.jpg",
    speakerImage: "/speakers/lecture-2.jpg",
  },
  {
    id: "lecture-3",
    title: "「他要我我就不能走，得堅守不放手」傲嬌仔及其伴侶的攻防守備",
    speaker: "講者：待補",
    time: "2026/04/24 19:30 - 21:00",
    intro:
      "從嘴硬、拉扯、試探與期待被懂的情境切入，討論傲嬌式互動背後的情感需求，以及伴侶在靠近與回應時常見的耗損。",
    highlights: ["嘴硬與試探", "被需要的渴望", "互動中的攻防節奏"],
    tag: "互動樣態",
    coverImage: "/lectures/lecture-3-cover.jpg",
    speakerImage: "/speakers/lecture-3.jpg",
  },
  {
    id: "lecture-4",
    title: "「一個人撐傘、一個人擦淚、一個人好累」焦慮型人格的追趕跑跳碰",
    speaker: "講者：待補",
    time: "2026/05/01 19:30 - 21:00",
    intro:
      "整理焦慮型人格在關係中的追趕、確認、害怕失去與情緒耗竭，也討論伴侶如何在不失去自己之下維持連結。",
    highlights: ["害怕失去", "高需求與高不安", "如何穩住關係"],
    tag: "依附與焦慮",
    coverImage: "/lectures/lecture-4-cover.jpg",
    speakerImage: "/speakers/lecture-4.jpg",
  },
  {
    id: "lecture-5",
    title: "「平凡之中製造一些些浪漫」這樣談感情更幸福",
    speaker: "講者：待補",
    time: "2026/05/08 19:30 - 21:00",
    intro:
      "從日常互動、語言表達與小型儀式切入，討論伴侶如何在生活裡維持溫度，累積穩定而可持續的親密感。",
    highlights: ["日常浪漫", "幸福感的累積", "伴侶溝通細節"],
    tag: "關係實作",
    coverImage: "/lectures/lecture-5-cover.jpg",
    speakerImage: "/speakers/lecture-5.jpg",
  },
  {
    id: "lecture-6",
    title: "「歌詞」亞斯伴侶的支持",
    speaker: "講者：待補",
    time: "2026/05/15 19:30 - 21:00",
    intro:
      "討論亞斯特質進入親密關係後，雙方在情緒表達、理解方式、生活安排與溝通節奏上可能出現的差異，以及支持彼此的方法。",
    highlights: ["亞斯特質與伴侶關係", "溝通差異", "支持與共處方式"],
    tag: "神經多樣性",
    coverImage: "/lectures/lecture-6-cover.jpg",
    speakerImage: "/speakers/lecture-6.jpg",
  },
  {
    id: "lecture-7",
    title: "諮商倫理",
    speaker: "講者：宥語、雅婷、祈蔚",
    time: "2026/05/22 19:30 - 21:00",
    intro:
      "整理助人工作中的界線、保密、雙重關係、知情同意與風險處理，從實務情境理解倫理判準如何落在工作現場。",
    highlights: ["專業界線", "保密與知情同意", "倫理判準"],
    tag: "專業實務",
    coverImage: "/lectures/lecture-7-cover.jpg",
    speakerImage: "/speakers/lecture-7.jpg",
  },
  {
    id: "lecture-8",
    title: "「網路愛情，撲朔迷離，似幻似真，猶夢未醒」網路愛情的白皮書",
    speaker: "講者：待補",
    time: "2026/05/29 19:30 - 21:00",
    intro:
      "從線上互動、投射、親密感生成到失落與不確定，整理網路愛情中的心理現象，也討論如何辨識關係中的真實感。",
    highlights: ["網路親密感", "投射與想像", "真實性的判讀"],
    tag: "數位親密",
    coverImage: "/lectures/lecture-8-cover.jpg",
    speakerImage: "/speakers/lecture-8.jpg",
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
    coverImage: "/lectures/lecture-9-cover.jpg",
    speakerImage: "/speakers/lecture-9.jpg",
  },
];

function ImageSlot({
  src,
  alt,
  ratio = "aspect-[4/3]",
  label = "Image",
  muted = false,
}: {
  src: string;
  alt: string;
  ratio?: string;
  label?: string;
  muted?: boolean;
}) {
  const [hasError, setHasError] = useState(false);
  const showPlaceholder = !src || hasError;

  return (
    <div
      className={`relative w-full overflow-hidden border border-[#E8E5DE] bg-[#F7F5F0] ${ratio} ${
        muted ? "opacity-95" : ""
      }`}
    >
      {!showPlaceholder ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#8A867E]">
              {label}
            </p>
            <p className="mt-3 text-sm leading-7 text-[#7A756D]">
              預留圖片插入區塊
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PsychologyLectureMuseumPage() {
  const [activeLecture, setActiveLecture] = useState<Lecture | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);

  const featuredLecture = useMemo(() => lectures[0], []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white text-[#151515]">
      <main className="w-full px-[clamp(20px,4vw,72px)] pb-24 pt-8">
        <header className="pb-10">
          <div className="grid gap-6 border-b border-[#E8E5DE] pb-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <h1 className="font-display text-[clamp(2.5rem,5vw,5.5rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-[#151515]">
                親密關係心理講座計畫
              </h1>
            </div>
            <div className="md:col-span-4 md:text-right">
              <p className="font-body text-[15px] leading-8 tracking-[-0.01em] text-[#5F5B53]">
                2026 春季系列
              </p>
              <p className="font-body text-[15px] leading-8 tracking-[-0.01em] text-[#5F5B53]">
                Love, Attachment, Ethics, Music
              </p>
            </div>
          </div>
        </header>

        <section className="grid gap-10 border-b border-[#E8E5DE] py-12 md:grid-cols-12 lg:py-16">
          <div className="md:col-span-8">
            <h2 className="font-display max-w-[11ch] text-[clamp(3.5rem,8vw,7.8rem)] font-semibold leading-[0.88] tracking-[-0.07em] text-[#151515]">
              從愛、依附與失落，
              <br />
              重新觀看親密關係
            </h2>
          </div>

          <div className="md:col-span-4 md:pt-2">
            <p className="font-body max-w-[32rem] text-[1.02rem] leading-[1.9] tracking-[-0.012em] text-[#4E4A43]">
              這是一組以心理學觀看愛情與關係的講座企劃。從迴避、自責、焦慮、亞斯伴侶、網路愛情到音樂經驗，將親密關係作為一個可被閱讀、可被理解、可被再次經驗的心理現場。
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  setActiveLecture(featuredLecture);
                  setShowRegistration(false);
                }}
                className="inline-flex items-center gap-2 bg-[#151515] px-5 py-3 text-[13px] font-medium tracking-[0.01em] text-white transition hover:bg-[#2A2A2A]"
              >
                查看主打講座
                <ArrowRight className="h-4 w-4" />
              </button>

              <a
                href="#programme-list"
                className="inline-flex items-center gap-2 border border-[#D9D5CD] px-5 py-3 text-[13px] font-medium tracking-[0.01em] text-[#151515] transition hover:bg-[#F7F5F0]"
              >
                查看全部場次
                <ChevronDown className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-14">
          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-8">
              <ImageSlot
                src="/banners/relationship-lecture-banner.jpg"
                alt="心理學講座主視覺"
                ratio="aspect-[16/5]"
                label="Season Banner"
              />
            </div>
            <div className="flex border border-[#E8E5DE] px-6 py-6 md:col-span-4 md:px-8 md:py-8">
              <div className="my-auto">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#8A867E]">
                  Banner Text
                </p>
                <h3 className="font-display mt-4 max-w-[13ch] text-[clamp(2rem,3.2vw,3.4rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-[#151515]">
                  關係並不是答案，
                  <br />
                  而是一種觀看人的方式
                </h3>
                <p className="font-body mt-5 max-w-[28rem] text-[0.98rem] leading-[1.9] tracking-[-0.01em] text-[#4E4A43]">
                  這是一條獨立的中段 banner。你可以放主視覺、抽象圖像、系列標語，讓頁面中段產生節奏與停頓。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-8 border-y border-[#E8E5DE] py-12 md:grid-cols-12 lg:py-16">
          <div className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#8A867E]">
              Curatorial Note
            </p>
          </div>

          <div className="md:col-span-9">
            <div className="font-body max-w-[42rem] space-y-6 text-[1.04rem] leading-[1.95] tracking-[-0.012em] text-[#302D29]">
              <p>
                這個系列不把親密關係處理成單一的幸福敘事。它把愛情視為一個混合距離、依賴、羞愧、追趕、理想化、誤解與修復的場域。
              </p>
              <p>
                因此，這組講座不是傳遞標準答案，而是提供不同觀看位置。不同場次分別處理退縮、自責、焦慮、日常浪漫、神經多樣性、倫理、網路親密與音樂經驗。
              </p>
              <p>每一場講座都像一件展品。觀看他人，也回到自己。</p>
            </div>
          </div>
        </section>

        <section className="grid gap-8 border-b border-[#E8E5DE] py-12 md:grid-cols-12 lg:py-16">
          <div className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#8A867E]">
              This Season
            </p>
          </div>

          <div className="md:col-span-9">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="border border-[#E8E5DE] p-6">
                <p className="font-body text-sm text-[#8A867E]">場次</p>
                <p className="font-display mt-4 text-4xl font-semibold leading-none tracking-[-0.05em]">
                  09
                </p>
              </div>
              <div className="border border-[#E8E5DE] p-6">
                <p className="font-body text-sm text-[#8A867E]">核心主題</p>
                <p className="font-display mt-4 text-4xl font-semibold leading-none tracking-[-0.05em]">
                  08
                </p>
              </div>
              <div className="border border-[#E8E5DE] p-6">
                <p className="font-body text-sm text-[#8A867E]">系列期間</p>
                <p className="font-display mt-4 text-[2rem] font-semibold leading-[1] tracking-[-0.045em]">
                  04.10 → 06.05
                </p>
              </div>
              <div className="border border-[#E8E5DE] p-6">
                <p className="font-body text-sm text-[#8A867E]">形式</p>
                <p className="font-display mt-4 text-[2rem] font-semibold leading-[1] tracking-[-0.045em]">
                  Lecture / Dialogue
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="programme-list" className="py-12 lg:py-16">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#8A867E]">
                Programme
              </p>
            </div>

            <div className="md:col-span-9">
              <div className="border-t border-[#E8E5DE]">
                {lectures.map((lecture, index) => (
                  <button
                    key={lecture.id}
                    type="button"
                    onClick={() => {
                      setActiveLecture(lecture);
                      setShowRegistration(false);
                    }}
                    className="group grid w-full grid-cols-12 gap-5 border-b border-[#E8E5DE] py-7 text-left transition hover:bg-[#FBFAF7]"
                  >
                    <div className="col-span-12 md:col-span-3">
                      <div className="grid gap-4 sm:grid-cols-[56px_1fr] md:grid-cols-1">
                        <div className="font-body text-sm text-[#6A655D]">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                        <ImageSlot
                          src={lecture.coverImage}
                          alt={lecture.title}
                          ratio="aspect-[4/3]"
                          label="Lecture Cover"
                          muted
                        />
                      </div>
                    </div>

                    <div className="col-span-12 md:col-span-6">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-[#8A867E]">
                        {lecture.tag}
                      </p>
                      <h3 className="font-editorial mt-3 max-w-[22ch] text-[clamp(1.85rem,2.7vw,2.7rem)] font-semibold leading-[1.02] tracking-[-0.05em] text-[#151515] transition group-hover:text-[#35312C]">
                        {lecture.title}
                      </h3>
                    </div>

                    <div className="col-span-12 md:col-span-3">
                      <div className="font-body text-[0.95rem] leading-[1.9] tracking-[-0.01em] text-[#5F5B53]">
                        <p>{lecture.speaker}</p>
                        <p>{lecture.time}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {activeLecture && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/24">
          <div className="min-h-screen px-4 py-6 md:px-8 md:py-10">
            <div className="mx-auto w-full max-w-[1520px] bg-white shadow-[0_10px_42px_rgba(0,0,0,0.10)]">
              <div className="flex items-center justify-between border-b border-[#E8E5DE] px-6 py-4 md:px-8">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#8A867E]">
                  Lecture Detail
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveLecture(null);
                    setShowRegistration(false);
                  }}
                  className="inline-flex h-10 w-10 items-center justify-center border border-[#DEDAD2] text-[#5F5B53] transition hover:bg-[#F7F5F0]"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid gap-0 xl:grid-cols-12">
                <div className="border-b border-[#E8E5DE] px-6 py-8 xl:col-span-3 xl:border-b-0 xl:border-r xl:px-8 xl:py-10">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#8A867E]">
                    Speaker Portrait
                  </p>
                  <div className="mt-4">
                    <ImageSlot
                      src={activeLecture.speakerImage}
                      alt={activeLecture.speaker}
                      ratio="aspect-[4/5]"
                      label="Speaker Image"
                    />
                  </div>
                </div>

                <div className="border-b border-[#E8E5DE] px-6 py-8 xl:col-span-5 xl:border-b-0 xl:border-r xl:px-8 xl:py-10">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#8A867E]">
                    {activeLecture.tag}
                  </p>

                  <h2 className="font-display mt-4 max-w-[13ch] text-[clamp(2.6rem,4.6vw,5.4rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-[#151515]">
                    {activeLecture.title}
                  </h2>

                  <div className="font-body mt-8 max-w-[38rem] space-y-4 text-[1.02rem] leading-[1.92] tracking-[-0.012em] text-[#302D29]">
                    <p>{activeLecture.intro}</p>
                  </div>

                  <div className="mt-10 border-t border-[#E8E5DE] pt-6">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#8A867E]">
                      Focus
                    </p>

                    <div className="mt-4 flex flex-wrap gap-3">
                      {activeLecture.highlights.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center border border-[#DEDAD2] px-4 py-2 text-[13px] tracking-[0.01em] text-[#302D29]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-6 py-8 xl:col-span-4 xl:px-8 xl:py-10">
                  <div className="space-y-6">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-[#8A867E]">
                        Information
                      </p>
                    </div>

                    <div className="space-y-5 border-b border-[#E8E5DE] pb-6">
                      <div className="flex items-start gap-3">
                        <UserRound className="mt-0.5 h-4 w-4 text-[#8A867E]" />
                        <div className="font-body text-[0.95rem] leading-[1.85] tracking-[-0.01em] text-[#4E4A43]">
                          <p className="text-[11px] uppercase tracking-[0.18em] text-[#8A867E]">
                            Speaker
                          </p>
                          <p className="mt-1">{activeLecture.speaker}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <CalendarDays className="mt-0.5 h-4 w-4 text-[#8A867E]" />
                        <div className="font-body text-[0.95rem] leading-[1.85] tracking-[-0.01em] text-[#4E4A43]">
                          <p className="text-[11px] uppercase tracking-[0.18em] text-[#8A867E]">
                            Date & Time
                          </p>
                          <p className="mt-1">{activeLecture.time}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Tag className="mt-0.5 h-4 w-4 text-[#8A867E]" />
                        <div className="font-body text-[0.95rem] leading-[1.85] tracking-[-0.01em] text-[#4E4A43]">
                          <p className="text-[11px] uppercase tracking-[0.18em] text-[#8A867E]">
                            Theme
                          </p>
                          <p className="mt-1">{activeLecture.tag}</p>
                        </div>
                      </div>
                    </div>

                    {!showRegistration ? (
                      <div className="space-y-3">
                        <button
                          type="button"
                          onClick={() => setShowRegistration(true)}
                          className="inline-flex w-full items-center justify-center gap-2 bg-[#151515] px-5 py-4 text-[13px] font-medium tracking-[0.01em] text-white transition hover:bg-[#2A2A2A]"
                        >
                          我要參加這場講座
                          <ArrowRight className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setActiveLecture(null);
                            setShowRegistration(false);
                          }}
                          className="inline-flex w-full items-center justify-center border border-[#DEDAD2] px-5 py-4 text-[13px] font-medium tracking-[0.01em] text-[#151515] transition hover:bg-[#F7F5F0]"
                        >
                          回到講座列表
                        </button>
                      </div>
                    ) : (
                      <div className="border border-[#E8E5DE] bg-[#FCFCFA] p-4">
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
        </div>
      )}
    </div>
  );
}