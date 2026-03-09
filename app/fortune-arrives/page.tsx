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
  },
];

export default function PsychologyLectureMuseumPage() {
  const [activeLecture, setActiveLecture] = useState<Lecture | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);

  const featuredLecture = useMemo(() => lectures[0], []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F6F1E8] text-[#1E1E1A]">
      <main className="w-full px-6 pb-16 pt-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24">
        <header className="border-b border-[#D8D2C8] pb-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-black tracking-tight md:text-5xl">
                親密關係心理講座計畫
              </h1>
            </div>
            <div className="text-base leading-8 text-[#5C5A52] md:text-right">
              <p>2026 春季系列</p>
              <p>Love, Attachment, Ethics, Music</p>
            </div>
          </div>
        </header>

        <section className="grid gap-8 border-b border-[#D8D2C8] py-10 md:grid-cols-12 md:gap-10 lg:py-14">
          <div className="md:col-span-8">
            <h2 className="max-w-6xl text-5xl font-black leading-[0.98] tracking-tight md:text-7xl xl:text-[6.25rem]">
              從愛、依附與失落，
              <br />
              重新觀看親密關係
            </h2>
          </div>

          <div className="md:col-span-4 md:pt-2">
            <p className="text-base leading-8 text-[#4F4C45] md:text-lg">
              這是一組以心理學觀看愛情與關係的講座企劃。從迴避、自責、焦慮、亞斯伴侶、網路愛情到音樂經驗，將親密關係作為一個可被閱讀、可被理解、可被再次經驗的心理現場。
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  setActiveLecture(featuredLecture);
                  setShowRegistration(false);
                }}
                className="inline-flex items-center gap-2 rounded-full bg-[#C96A1B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#B85F16]"
              >
                查看主打講座
                <ArrowRight className="h-4 w-4" />
              </button>

              <a
                href="#programme-list"
                className="inline-flex items-center gap-2 rounded-full border border-[#CFC8BC] px-5 py-3 text-sm font-semibold text-[#1E1E1A] transition hover:bg-[#EFE8DD]"
              >
                查看全部場次
                <ChevronDown className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section className="grid gap-8 border-b border-[#D8D2C8] py-10 md:grid-cols-12 lg:py-14">
          <div className="md:col-span-3">
            <p className="text-xs tracking-[0.18em] text-[#8A844C] uppercase">
              Curatorial Note
            </p>
          </div>

          <div className="md:col-span-9">
            <div className="max-w-5xl space-y-6 text-lg leading-9 text-[#38352F]">
              <p>
                這個系列不把親密關係處理成單一的幸福敘事。它把愛情視為一個混合距離、依賴、羞愧、追趕、理想化、誤解與修復的場域。
              </p>
              <p>
                因此，這組講座不是傳遞標準答案，而是提供不同觀看位置。不同場次分別處理退縮、自責、焦慮、日常浪漫、神經多樣性、倫理、網路親密與音樂經驗。
              </p>
              <p>
                每一場講座都像一件展品。觀看他人，也回到自己。
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-8 border-b border-[#D8D2C8] py-10 md:grid-cols-12 lg:py-14">
          <div className="md:col-span-3">
            <p className="text-xs tracking-[0.18em] text-[#8A844C] uppercase">
              This Season
            </p>
          </div>

          <div className="md:col-span-9">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="border border-[#D8D2C8] p-5">
                <p className="text-sm text-[#8A844C]">場次</p>
                <p className="mt-3 text-4xl font-black">09</p>
              </div>
              <div className="border border-[#D8D2C8] p-5">
                <p className="text-sm text-[#8A844C]">核心主題</p>
                <p className="mt-3 text-4xl font-black">08</p>
              </div>
              <div className="border border-[#D8D2C8] p-5">
                <p className="text-sm text-[#8A844C]">系列期間</p>
                <p className="mt-3 text-2xl font-black">04.10 → 06.05</p>
              </div>
              <div className="border border-[#D8D2C8] p-5">
                <p className="text-sm text-[#8A844C]">形式</p>
                <p className="mt-3 text-2xl font-black">Lecture / Dialogue</p>
              </div>
            </div>
          </div>
        </section>

        <section id="programme-list" className="py-10 lg:py-14">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="text-xs tracking-[0.18em] text-[#8A844C] uppercase">
                Programme
              </p>
            </div>

            <div className="md:col-span-9">
              <div className="border-t border-[#D8D2C8]">
                {lectures.map((lecture, index) => (
                  <button
                    key={lecture.id}
                    type="button"
                    onClick={() => {
                      setActiveLecture(lecture);
                      setShowRegistration(false);
                    }}
                    className="grid w-full grid-cols-12 gap-4 border-b border-[#D8D2C8] px-0 py-6 text-left transition hover:bg-[#EFE8DD]"
                  >
                    <div className="col-span-12 text-sm text-[#5C5A52] md:col-span-1">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="col-span-12 md:col-span-7">
                      <p className="text-xs tracking-[0.14em] text-[#8A844C] uppercase">
                        {lecture.tag}
                      </p>
                      <h3 className="mt-2 text-2xl font-black leading-snug tracking-tight md:text-[1.95rem]">
                        {lecture.title}
                      </h3>
                    </div>

                    <div className="col-span-12 text-sm leading-7 text-[#5C5A52] md:col-span-4">
                      <p>{lecture.speaker}</p>
                      <p>{lecture.time}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {activeLecture && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/45">
          <div className="min-h-screen px-4 py-6 md:px-8 md:py-10">
            <div className="mx-auto w-full max-w-[1400px] bg-[#F6F1E8] shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
              <div className="flex items-center justify-between border-b border-[#D8D2C8] px-6 py-4 md:px-8">
                <p className="text-xs tracking-[0.18em] text-[#8A844C] uppercase">
                  Lecture Detail
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveLecture(null);
                    setShowRegistration(false);
                  }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D8D2C8] text-[#5C5A52] transition hover:bg-[#ECE4D8]"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid gap-0 md:grid-cols-12">
                <div className="border-b border-[#D8D2C8] px-6 py-8 md:col-span-7 md:border-b-0 md:border-r md:px-8 md:py-10">
                  <p className="text-xs tracking-[0.14em] text-[#8A844C] uppercase">
                    {activeLecture.tag}
                  </p>

                  <h2 className="mt-4 text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
                    {activeLecture.title}
                  </h2>

                  <div className="mt-8 space-y-4 text-base leading-8 text-[#3E3A34] md:text-lg md:leading-9">
                    <p>{activeLecture.intro}</p>
                  </div>

                  <div className="mt-10 border-t border-[#D8D2C8] pt-6">
                    <p className="text-xs tracking-[0.14em] text-[#8A844C] uppercase">
                      Focus
                    </p>

                    <div className="mt-4 flex flex-wrap gap-3">
                      {activeLecture.highlights.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center rounded-full border border-[#D8D2C8] px-4 py-2 text-sm text-[#3E3A34]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-6 py-8 md:col-span-5 md:px-8 md:py-10">
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs tracking-[0.14em] text-[#8A844C] uppercase">
                        Information
                      </p>
                    </div>

                    <div className="space-y-5 border-b border-[#D8D2C8] pb-6">
                      <div className="flex items-start gap-3">
                        <UserRound className="mt-0.5 h-4 w-4 text-[#8A844C]" />
                        <div className="text-sm leading-7 text-[#4F4C45]">
                          <p className="text-xs uppercase tracking-[0.12em] text-[#8A844C]">
                            Speaker
                          </p>
                          <p className="mt-1">{activeLecture.speaker}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <CalendarDays className="mt-0.5 h-4 w-4 text-[#8A844C]" />
                        <div className="text-sm leading-7 text-[#4F4C45]">
                          <p className="text-xs uppercase tracking-[0.12em] text-[#8A844C]">
                            Date & Time
                          </p>
                          <p className="mt-1">{activeLecture.time}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Tag className="mt-0.5 h-4 w-4 text-[#8A844C]" />
                        <div className="text-sm leading-7 text-[#4F4C45]">
                          <p className="text-xs uppercase tracking-[0.12em] text-[#8A844C]">
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
                          className="inline-flex w-full items-center justify-center gap-2 bg-[#C96A1B] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#B85F16]"
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
                          className="inline-flex w-full items-center justify-center border border-[#D8D2C8] px-5 py-4 text-sm font-semibold text-[#1E1E1A] transition hover:bg-[#ECE4D8]"
                        >
                          回到講座列表
                        </button>
                      </div>
                    ) : (
                      <div className="border border-[#D8D2C8] bg-[#FBF8F2] p-4">
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