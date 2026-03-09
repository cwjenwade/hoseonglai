"use client";

import type { Metadata } from "next";
import { useState } from "react";
import ResearchRegistrationForm from "./ResearchRegistrationForm";

type VideoItem = {
  title: string;
  artist: string;
  url: string;
  category: "K-POP" | "Mandopop" | "Pop";
  researchNote: string;
  hashtags: string[];
};

const videos: VideoItem[] = [
  {
    title: "Dynamite",
    artist: "BTS",
    url: "https://www.youtube.com/watch?v=gdZLi9oWNZg",
    category: "K-POP",
    researchNote:
      "色彩飽和、鏡頭節奏快，主打正向與活力氛圍。適合參考在品牌短影音中使用高飽和色塊與群體舞動畫面，快速拉高情緒。",
    hashtags: ["#MV", "#KPOP", "#FeelGood", "#Colorful"],
  },
  {
    title: "告白氣球",
    artist: "周杰倫",
    url: "https://www.youtube.com/watch?v=bu7nU9Mhpyo",
    category: "Mandopop",
    researchNote:
      "敘事溫柔、畫面乾淨，運用場景與人物互動建立浪漫記憶點。可借鏡於品牌形象片中，強化日常情境與情感連結。",
    hashtags: ["#MV", "#Mandopop", "#Storytelling", "#WarmTone"],
  },
  {
    title: "Shape of You",
    artist: "Ed Sheeran",
    url: "https://www.youtube.com/watch?v=JGwWNGJdvx8",
    category: "Pop",
    researchNote:
      "單一主線敘事搭配高辨識節奏，重複元素強化記憶。可應用在品牌內容節奏設計，讓重點訊息在 15 秒內被記住。",
    hashtags: ["#MV", "#Pop", "#Rhythm", "#Memorable"],
  },
  {
    title: "How You Like That",
    artist: "BLACKPINK",
    url: "https://www.youtube.com/watch?v=ioNng23DkIM",
    category: "K-POP",
    researchNote:
      "視覺衝擊強、切景密度高，善用造型與場景反差創造話題。可參考其高對比視覺語言，提升活動主視覺吸睛度。",
    hashtags: ["#MV", "#KPOP", "#HighImpact", "#Visual"],
  },
];

export default function HeartfeltMomentumPage() {
  const [showRegistration, setShowRegistration] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-zinc-900">有心好勢｜YouTube 5 mins research</h2>
        <p className="mt-4 leading-8 text-zinc-700">
          這頁整理了 4 支可直接連到 YouTube 的 MV，並搭配每支影片的快速研究摘要、標題與 hashtag，
          幫助團隊在 5 分鐘內掌握影片風格、情緒與可借鑑方向。
        </p>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h3 className="text-2xl font-bold text-zinc-900">MV Research List</h3>
        <p className="mt-2 text-zinc-600">可用搜尋欄與分類選單快速查找，並直接前往 YouTube。</p>

        <div className="mt-5 grid gap-3 md:grid-cols-[1fr_220px]">
          <input
            placeholder="搜尋影片標題、歌手或 hashtag..."
            className="h-11 rounded-xl border border-zinc-300 px-4 text-sm outline-none transition focus:border-amber-400"
            aria-label="搜尋影片"
          />

          <select
            className="h-11 rounded-xl border border-zinc-300 bg-white px-3 text-sm outline-none transition focus:border-amber-400"
            aria-label="選擇影片分類"
          >
            <option>All</option>
            <option>K-POP</option>
            <option>Mandopop</option>
            <option>Pop</option>
          </select>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {videos.map((video) => (
            <article key={video.url} className="rounded-2xl border border-zinc-200 p-5">
              <p className="text-xs font-semibold tracking-wide text-amber-700">5 mins research</p>
              <h4 className="mt-2 text-lg font-semibold text-zinc-900">{video.title}</h4>
              <p className="text-sm text-zinc-500">
                {video.artist} · {video.category}
              </p>
              <p className="mt-3 text-sm leading-7 text-zinc-600">{video.researchNote}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {video.hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-zinc-300 bg-zinc-50 px-2.5 py-1 text-xs text-zinc-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={video.url}
               div className="mt-4 flex gap-2">
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                >
                  前往 YouTube
                </a>
                <button
                  onClick={() => setShowRegistration(video.url)}
                  className="rounded-full border border-sky-600 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 transition hover:bg-sky-100"
                >
                  登記研究興趣
                </button>
              </div>

              {showRegistration === video.url && (
                <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                  <ResearchRegistrationForm
                    videoUrl={video.url}
                    videoTitle={video.title}
                    onClose={() => setShowRegistration(null)}
                  />
                </div>
              )}
        </div>
      </section>
    </div>
  );
}
