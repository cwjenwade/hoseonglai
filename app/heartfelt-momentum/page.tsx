"use client";

import { Geist, Noto_Serif_TC, Playfair_Display } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const notoSerif = Noto_Serif_TC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-serif",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-playfair",
});

type VideoItem = {
  title: string;
  titleEn: string;
  tag: string;
  description: string;
  category: string;
  duration: string;
  image: string;
};

export default function PsychologyArtworkPage() {
  const videos: VideoItem[] = [
    {
      title: "當情緒失去形狀",
      titleEn: "When Emotions Lose Their Shape",
      tag: "alexithymia",
      description: "五分鐘看懂 alexithymia、情緒分化與情緒結構。",
      category: "研究影片",
      duration: "5 分鐘",
      image:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "相近情緒為何混在一起",
      titleEn: "Why Similar Feelings Blur Together",
      tag: "emotion differentiation",
      description: "從情緒分化理解 sad、regretful、lonely 為何難以拆開。",
      category: "研究影片",
      duration: "5 分鐘",
      image:
        "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "情緒如何在團體中擴散",
      titleEn: "How Group Emotions Spread",
      tag: "group process",
      description: "團體裡的情緒如何彼此感染、累積與轉變。",
      category: "研究影片",
      duration: "5 分鐘",
      image:
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "同理是怎麼發生的",
      titleEn: "What Makes Empathy Possible",
      tag: "empathy",
      description: "同理如何從辨識、理解到回應逐步形成。",
      category: "研究影片",
      duration: "5 分鐘",
      image:
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "為何有些感受說不出口",
      titleEn: "Why Some Feelings Resist Words",
      tag: "emotion language",
      description: "情緒概念與語言能力如何改變內在經驗。",
      category: "研究影片",
      duration: "5 分鐘",
      image:
        "https://images.unsplash.com/photo-1578301979108-0a2f6f91a4c0?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "心理測量如何理解情緒",
      titleEn: "How Research Measures Emotion",
      tag: "psychometrics",
      description: "心理測量如何捕捉看不見的情緒結構。",
      category: "研究影片",
      duration: "5 分鐘",
      image:
        "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "關係如何改變情緒經驗",
      titleEn: "When Relationships Shape Feeling",
      tag: "interpersonal dynamics",
      description: "人際脈絡如何改變情緒經驗與表達方式。",
      category: "研究影片",
      duration: "5 分鐘",
      image:
        "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "情緒強度真的比較高嗎",
      titleEn: "How Intense Is Emotion",
      tag: "emotion intensity",
      description: "情緒強度與情緒結構之間不一定是同一件事。",
      category: "研究影片",
      duration: "5 分鐘",
      image:
        "https://images.unsplash.com/photo-1577083165633-14ebcdb0f658?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  return (
    <main
      className={`${geist.variable} ${notoSerif.variable} ${playfair.variable} min-h-screen bg-[#fcfbf8] text-[#171717] antialiased`}
    >
      <section className="mx-auto w-full max-w-[1520px] px-6 py-12 md:px-10 md:py-16 xl:px-14 xl:py-20">
        <header className="mb-12 border-b border-black/8 pb-6 md:mb-16 md:pb-8">
          <p
            className="text-[0.64rem] uppercase tracking-[0.34em] text-black/34"
            style={{ fontFamily: "var(--font-geist)" }}
          >
            Psychology in 5 Minutes
          </p>
          <h1
            className="mt-5 text-center text-[2.5rem] leading-none tracking-[0.16em] text-black/92 md:text-[4rem] xl:text-[4.9rem]"
            style={{ fontFamily: "var(--font-geist)" }}
          >
            VIDEOS
          </h1>
        </header>

        <div className="grid gap-x-7 gap-y-14 md:grid-cols-2 xl:grid-cols-4 xl:gap-y-16">
          {videos.map((video, index) => (
            <article key={video.title} className="group">
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#f1eee8]">
                <img
                  src={video.image}
                  alt={video.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.015]"
                />
              </div>

              <div className="mt-4">
                <h2
                  className="mt-4 text-[2.02rem] leading-[1.04] tracking-[-0.045em] text-black/92"
                  style={{ fontFamily: "var(--font-noto-serif)" }}
                >
                  {video.title}
                </h2>

                <p
                  className="mt-2 text-[0.7rem] uppercase tracking-[0.24em] text-black/32"
                  style={{ fontFamily: "var(--font-geist)" }}
                >
                  {video.titleEn}
                </p>

                <p
                  className="mt-4 max-w-[25ch] text-[1.02rem] leading-[1.7] text-black/62"
                  style={{ fontFamily: "var(--font-noto-serif)" }}
                >
                  {video.description}
                </p>

                <div className="mt-6 space-y-2">
                  <p
                    className="text-[0.72rem] uppercase tracking-[0.2em] text-black/36"
                    style={{ fontFamily: "var(--font-geist)" }}
                  >
                    {video.tag}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
