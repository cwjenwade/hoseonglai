"use client";

import { useMemo, useState } from "react";
import LectureRegistrationForm from "./LectureRegistrationForm";

type Lecture = {
  id: string;
  title: string;
  subtitle?: string;
  speaker: string;
  speakerTitle?: string;
  speakerBio?: string;
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
    subtitle: "在靠近與退後之間，理解親密關係中的抽離、失落與界線節奏",
    speaker: "待補",
    speakerTitle: "Speaker",
    speakerBio:
      "本場講座聚焦親密關係中的距離感、退縮與情感保留，討論當事人如何維持心理安全，也討論伴侶如何在不過度逼近的情況下維持連結與理解。",
    time: "2026/04/10 19:30 - 21:00",
    intro:
      "從親密關係中的退縮、抽離、降低回應與保持距離出發，整理迴避型人格在關係中的互動樣態，也討論伴侶如何理解界線、失落與靠近的節奏。",
    highlights: ["Avoidant personality", "Relationship withdrawal", "Emotional distance"],
    tag: "依附與距離",
    coverImage: "/lectures/lecture-1-cover.jpg",
    speakerImage: "/speakers/lecture-1.jpg",
  },
  {
    id: "lecture-2",
    title: "「一定是我不夠好 所以你才想要逃」談那些在愛情中責怪自己的人及伴侶",
    subtitle: "自責、羞愧與關係中的內在歸因",
    speaker: "宥語",
    speakerTitle: "Speaker",
    speakerBio:
      "本場講座處理自責、自我貶抑與低自我價值感如何進入親密關係，並討論伴侶如何理解脆弱與不安，而非只回應表面的黏附或退縮。",
    time: "2026/04/17 19:30 - 21:00",
    intro:
      "聚焦自責、自我貶抑與關係中的內在歸因，討論個體如何把關係困難收進自己身上，也思考伴侶能如何回應這樣的脆弱與不安。",
    highlights: ["Self-blame", "Shame and worth", "Partner response"],
    tag: "自我與親密",
    coverImage: "/lectures/lecture-2-cover.jpg",
    speakerImage: "/speakers/lecture-2.jpg",
  },
  {
    id: "lecture-3",
    title: "「他要我我就不能走，得堅守不放手」傲嬌仔及其伴侶的攻防守備",
    subtitle: "嘴硬、試探與期待被懂的情感配置",
    speaker: "待補",
    speakerTitle: "Speaker",
    speakerBio:
      "本場講座從拉扯、試探與等待被理解的互動場景切入，討論強硬外表下的依戀需求，以及伴侶在靠近時常感到的疲累與困惑。",
    time: "2026/04/24 19:30 - 21:00",
    intro:
      "從嘴硬、拉扯、試探與期待被懂的情境切入，討論傲嬌式互動背後的情感需求，以及伴侶在靠近與回應時常見的耗損。",
    highlights: ["Testing and defence", "Need to be wanted", "Relational tension"],
    tag: "互動樣態",
    coverImage: "/lectures/lecture-3-cover.jpg",
    speakerImage: "/speakers/lecture-3.jpg",
  },
  {
    id: "lecture-4",
    title: "「一個人撐傘、一個人擦淚、一個人好累」焦慮型人格的追趕跑跳碰",
    subtitle: "高需求、高不安與失去恐懼的關係經驗",
    speaker: "待補",
    speakerTitle: "Speaker",
    speakerBio:
      "本場講座整理焦慮型人格在關係中的追趕、確認與耗竭，並討論伴侶如何維持支持，同時不失去自身界線與穩定度。",
    time: "2026/05/01 19:30 - 21:00",
    intro:
      "整理焦慮型人格在關係中的追趕、確認、害怕失去與情緒耗竭，也討論伴侶如何在不失去自己之下維持連結。",
    highlights: ["Fear of loss", "High need and insecurity", "Staying connected"],
    tag: "依附與焦慮",
    coverImage: "/lectures/lecture-4-cover.jpg",
    speakerImage: "/speakers/lecture-4.jpg",
  },
  {
    id: "lecture-5",
    title: "「平凡之中製造一些些浪漫」這樣談感情更幸福",
    subtitle: "從日常互動累積穩定而可持續的親密感",
    speaker: "待補",
    speakerTitle: "Speaker",
    speakerBio:
      "本場講座討論伴侶如何透過日常細節、語言與小型儀式維持關係溫度，將幸福感理解為累積性的互動實作。",
    time: "2026/05/08 19:30 - 21:00",
    intro:
      "從日常互動、語言表達與小型儀式切入，討論伴侶如何在生活裡維持溫度，累積穩定而可持續的親密感。",
    highlights: ["Everyday romance", "Small rituals", "Sustainable intimacy"],
    tag: "關係實作",
    coverImage: "/lectures/lecture-5-cover.jpg",
    speakerImage: "/speakers/lecture-5.jpg",
  },
  {
    id: "lecture-6",
    title: "「歌詞」亞斯伴侶的支持",
    subtitle: "在理解方式與生活節奏差異中建立支持",
    speaker: "待補",
    speakerTitle: "Speaker",
    speakerBio:
      "本場講座處理神經多樣性進入伴侶關係後，雙方在溝通、情緒表達與生活安排上可能經驗到的差異，以及支持彼此的方法。",
    time: "2026/05/15 19:30 - 21:00",
    intro:
      "討論亞斯特質進入親密關係後，雙方在情緒表達、理解方式、生活安排與溝通節奏上可能出現的差異，以及支持彼此的方法。",
    highlights: ["Neurodiversity", "Communication differences", "Support in partnership"],
    tag: "神經多樣性",
    coverImage: "/lectures/lecture-6-cover.jpg",
    speakerImage: "/speakers/lecture-6.jpg",
  },
  {
    id: "lecture-7",
    title: "諮商倫理",
    subtitle: "界線、保密、知情同意與風險處理",
    speaker: "宥語、雅婷、祈蔚",
    speakerTitle: "Speakers",
    speakerBio:
      "本場講座從實務情境出發，整理助人工作中的界線、保密、雙重關係、知情同意與風險處理，理解倫理判準如何落在工作現場。",
    time: "2026/05/22 19:30 - 21:00",
    intro:
      "整理助人工作中的界線、保密、雙重關係、知情同意與風險處理，從實務情境理解倫理判準如何落在工作現場。",
    highlights: ["Professional boundaries", "Confidentiality", "Ethical judgement"],
    tag: "專業實務",
    coverImage: "/lectures/lecture-7-cover.jpg",
    speakerImage: "/speakers/lecture-7.jpg",
  },
  {
    id: "lecture-8",
    title: "「網路愛情，撲朔迷離，似幻似真，猶夢未醒」網路愛情的白皮書",
    subtitle: "線上親密、投射與真實感的判讀",
    speaker: "待補",
    speakerTitle: "Speaker",
    speakerBio:
      "本場講座討論線上互動中的投射、親密感生成、失落與不確定，並整理人如何在虛擬關係中判讀真實性與期待落差。",
    time: "2026/05/29 19:30 - 21:00",
    intro:
      "從線上互動、投射、親密感生成到失落與不確定，整理網路愛情中的心理現象，也討論如何辨識關係中的真實感。",
    highlights: ["Digital intimacy", "Projection", "Reading reality"],
    tag: "數位親密",
    coverImage: "/lectures/lecture-8-cover.jpg",
    speakerImage: "/speakers/lecture-8.jpg",
  },
  {
    id: "lecture-9",
    title: "「兩顆心都迷惑，怎麼說，怎麼說都沒有救」從音樂中再一次經驗愛",
    subtitle: "在歌詞與旋律中重新接觸愛的記憶",
    speaker: "待補",
    speakerTitle: "Speaker",
    speakerBio:
      "本場講座從音樂與歌詞的情感經驗切入，討論人如何透過聲音重新接觸關係中的失落、渴望、誤解與依戀記憶。",
    time: "2026/06/05 19:30 - 21:00",
    intro:
      "透過音樂與歌詞經驗親密關係中的失落、渴望、誤解與牽掛，討論人如何在聽歌時重新接觸自己對愛的感受與記憶。",
    highlights: ["Music and affect", "Lyrics and projection", "Memory of love"],
    tag: "音樂與情感",
    coverImage: "/lectures/lecture-9-cover.jpg",
    speakerImage: "/speakers/lecture-9.jpg",
  },
];

const artFallbacks = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1459908676235-d5f02a50184b?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1494253109108-2e30c049369b?auto=format&fit=crop&w=1600&q=80",
];

function getFallbackImage(seed: string) {
  const index =
    seed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    artFallbacks.length;
  return artFallbacks[index];
}

function parseLectureTime(time: string) {
  const [datePart = "", timePart = ""] = time.split(" ");
  const date = datePart.replaceAll("/", ".");
  const range = timePart.includes("-") ? timePart.split("-") : ["", ""];
  return {
    date,
    start: range[0]?.trim() || "",
    end: range[1]?.trim() || "",
  };
}

function MuseumImage({
  src,
  alt,
  ratio = "aspect-[3/2]",
  caption,
  seed,
}: {
  src?: string;
  alt: string;
  ratio?: string;
  caption?: string;
  seed: string;
}) {
  const [hasError, setHasError] = useState(false);
  const displaySrc = !src || hasError ? getFallbackImage(seed) : src;

  return (
    <figure className="w-full">
      <div
        className={`relative w-full overflow-hidden border border-[rgba(0,0,0,0.08)] bg-[#f5f4f1] ${ratio}`}
      >
        <img
          src={displaySrc}
          alt={alt}
          className="h-full w-full object-cover"
          onError={() => setHasError(true)}
        />
      </div>
      {caption ? (
        <figcaption
          className="mt-4 text-[12px] leading-[1.4] tracking-[0.04em] text-[#6b6b6b]"
          style={{ fontFamily: "var(--font-geist-sans), var(--font-noto-sans-tc), sans-serif" }}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[11px] uppercase leading-[1.2] tracking-[0.22em] text-[#9c9c9c]"
      style={{ fontFamily: "var(--font-geist-sans), var(--font-noto-sans-tc), sans-serif" }}
    >
      {children}
    </p>
  );
}

export default function PsychologyLectureMuseumPage() {
  const [activeLectureId, setActiveLectureId] = useState(lectures[0].id);
  const [showRegistration, setShowRegistration] = useState(false);

  const activeLecture = useMemo(
    () => lectures.find((lecture) => lecture.id === activeLectureId) ?? lectures[0],
    [activeLectureId]
  );

  const meta = parseLectureTime(activeLecture.time);

  return (
    <div className="min-h-screen w-full bg-[#f6f3ee] text-[#1a1a1a]">
      <main className="mx-auto w-full max-w-[1680px] px-[clamp(20px,4vw,72px)] pb-[120px] pt-8">
        <section className="border-b border-[rgba(0,0,0,0.08)] pb-[120px] pt-[72px] md:pt-[96px]">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <Label>Lecture / Talk / Event</Label>
              <h1
                className="mt-5 max-w-[12ch] text-[clamp(56px,7vw,72px)] font-semibold leading-[1] tracking-[-0.03em] text-[#1a1a1a]"
                style={{ fontFamily: "var(--font-playfair), var(--font-noto-serif-tc), serif" }}
              >
                {activeLecture.title}
              </h1>
              <p
                className="mt-8 max-w-[30ch] text-[22px] leading-[1.35] tracking-[0.02em] text-[#4a4a4a]"
                style={{ fontFamily: "var(--font-playfair), var(--font-noto-serif-tc), serif" }}
              >
                {activeLecture.subtitle || activeLecture.tag}
              </p>
            </div>

            <div className="md:col-span-5 md:pt-2">
              <MuseumImage
                src={activeLecture.coverImage}
                alt={activeLecture.title}
                ratio="aspect-[3/2]"
                seed={`${activeLecture.id}-cover`}
                caption="Lecture image"
              />
            </div>
          </div>
        </section>

        <section className="border-b border-[rgba(0,0,0,0.08)] py-[120px]">
          <div className="grid gap-10 md:grid-cols-3 md:gap-12">
            <div>
              <Label>Date</Label>
              <p
                className="mt-4 text-[18px] font-medium leading-[1.5] tracking-[0.01em] text-[#1a1a1a]"
                style={{ fontFamily: "var(--font-geist-sans), var(--font-noto-sans-tc), sans-serif" }}
              >
                {meta.date}
              </p>
            </div>

            <div>
              <Label>Time</Label>
              <p
                className="mt-4 text-[18px] font-medium leading-[1.5] tracking-[0.01em] text-[#1a1a1a]"
                style={{ fontFamily: "var(--font-geist-sans), var(--font-noto-sans-tc), sans-serif" }}
              >
                {meta.start}
                {meta.end ? `–${meta.end}` : ""}
              </p>
            </div>

            <div>
              <Label>Speaker</Label>
              <p
                className="mt-4 text-[18px] font-medium leading-[1.5] tracking-[0.01em] text-[#1a1a1a]"
                style={{ fontFamily: "var(--font-geist-sans), var(--font-noto-sans-tc), sans-serif" }}
              >
                {activeLecture.speaker}
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-[rgba(0,0,0,0.08)] py-[120px]">
          <div className="grid gap-16 md:grid-cols-12 md:gap-20">
            <div className="md:col-span-3">
              <Label>Introduction</Label>
            </div>

            <div className="md:col-span-9">
              <div className="max-w-[680px]">
                <p
                  className="text-[18px] leading-[1.6] tracking-[0.01em] text-[#1a1a1a]"
                  style={{ fontFamily: "var(--font-geist-sans), var(--font-noto-sans-tc), sans-serif" }}
                >
                  {activeLecture.intro}
                </p>

                <div className="mt-8">
                  <Label>Topics</Label>
                  <div className="mt-6 space-y-3">
                    {activeLecture.highlights.map((item) => (
                      <p
                        key={item}
                        className="text-[16px] leading-[1.5] tracking-[0.01em] text-[#1a1a1a]"
                        style={{ fontFamily: "var(--font-geist-sans), var(--font-noto-sans-tc), sans-serif" }}
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[rgba(0,0,0,0.08)] py-[120px]">
          <div className="grid gap-16 md:grid-cols-12 md:gap-20">
            <div className="md:col-span-5">
              <MuseumImage
                src={activeLecture.speakerImage}
                alt={activeLecture.speaker}
                ratio="aspect-[4/5]"
                seed={`${activeLecture.id}-speaker`}
                caption="Speaker portrait"
              />
            </div>

            <div className="md:col-span-7">
              <Label>Speaker</Label>

              <h2
                className="mt-5 text-[28px] leading-[1.2] tracking-[-0.01em] text-[#1a1a1a]"
                style={{ fontFamily: "var(--font-playfair), var(--font-noto-serif-tc), serif" }}
              >
                {activeLecture.speaker}
              </h2>

              <p
                className="mt-4 text-[14px] uppercase leading-[1.3] tracking-[0.18em] text-[#6b6b6b]"
                style={{ fontFamily: "var(--font-geist-sans), var(--font-noto-sans-tc), sans-serif" }}
              >
                {activeLecture.speakerTitle || "Speaker"}
              </p>

              <div className="mt-8 max-w-[640px]">
                <p
                  className="text-[16px] leading-[1.5] tracking-[0.01em] text-[#1a1a1a]"
                  style={{ fontFamily: "var(--font-geist-sans), var(--font-noto-sans-tc), sans-serif" }}
                >
                  {activeLecture.speakerBio || activeLecture.intro}
                </p>
              </div>

              <div className="mt-12">
                {!showRegistration ? (
                  <button
                    type="button"
                    onClick={() => setShowRegistration(true)}
                    className="inline-flex items-center justify-center border border-[#1a1a1a] bg-[#f6f3ee] px-6 py-[14px] text-[14px] uppercase leading-none tracking-[0.12em] text-[#1a1a1a] transition-colors duration-200 hover:bg-[#f1eee7]"
                    style={{ fontFamily: "var(--font-geist-sans), var(--font-noto-sans-tc), sans-serif" }}
                  >
                    Register
                  </button>
                ) : (
                  <div className="max-w-[720px] border border-[rgba(0,0,0,0.08)] p-6">
                    <div className="mb-6 flex items-center justify-between gap-6">
                      <Label>Registration</Label>
                      <button
                        type="button"
                        onClick={() => setShowRegistration(false)}
                        className="border border-[rgba(0,0,0,0.08)] px-4 py-3 text-[12px] uppercase tracking-[0.16em] text-[#6b6b6b] transition-colors duration-200 hover:bg-[#f1eee7]"
                        style={{ fontFamily: "var(--font-geist-sans), var(--font-noto-sans-tc), sans-serif" }}
                      >
                        Close
                      </button>
                    </div>

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
        </section>

        <section className="py-[120px]">
          <div className="grid gap-16 md:grid-cols-12 md:gap-20">
            <div className="md:col-span-3">
              <Label>Programme</Label>
            </div>

            <div className="md:col-span-9">
              <div className="border-t border-[rgba(0,0,0,0.08)]">
                {lectures.map((lecture) => {
                  const parsed = parseLectureTime(lecture.time);
                  const isActive = lecture.id === activeLecture.id;

                  return (
                    <button
                      key={lecture.id}
                      type="button"
                      onClick={() => {
                        setActiveLectureId(lecture.id);
                        setShowRegistration(false);
                      }}
                      className="grid w-full grid-cols-12 gap-6 border-b border-[rgba(0,0,0,0.08)] py-10 text-left transition-colors duration-200 hover:bg-[rgba(0,0,0,0.015)]"
                    >
                      <div className="col-span-12 md:col-span-2">
                        <p
                          className="text-[12px] leading-[1.4] tracking-[0.04em] text-[#6b6b6b]"
                          style={{ fontFamily: "var(--font-geist-sans), var(--font-noto-sans-tc), sans-serif" }}
                        >
                          {parsed.date}
                        </p>
                      </div>

                      <div className="col-span-12 md:col-span-7">
                        <p
                          className="text-[11px] uppercase leading-[1.2] tracking-[0.22em] text-[#9c9c9c]"
                          style={{ fontFamily: "var(--font-geist-sans), var(--font-noto-sans-tc), sans-serif" }}
                        >
                          {lecture.tag}
                        </p>

                        <h3
                          className={`mt-3 max-w-[18ch] text-[clamp(28px,4vw,36px)] leading-[1.08] tracking-[-0.01em] ${
                            isActive ? "text-[#1a1a1a]" : "text-[#2e2e2e]"
                          }`}
                          style={{ fontFamily: "var(--font-playfair), var(--font-noto-serif-tc), serif" }}
                        >
                          {lecture.title}
                        </h3>
                      </div>

                      <div className="col-span-12 md:col-span-3">
                        <p
                          className="text-[16px] leading-[1.5] tracking-[0.01em] text-[#1a1a1a]"
                          style={{ fontFamily: "var(--font-geist-sans), var(--font-noto-sans-tc), sans-serif" }}
                        >
                          {lecture.speaker}
                        </p>
                        <p
                          className="mt-2 text-[12px] leading-[1.4] tracking-[0.04em] text-[#6b6b6b]"
                          style={{ fontFamily: "var(--font-geist-sans), var(--font-noto-sans-tc), sans-serif" }}
                        >
                          {parsed.start}
                          {parsed.end ? `–${parsed.end}` : ""}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}