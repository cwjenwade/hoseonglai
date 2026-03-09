"use client";

import React, { useState } from "react";

// 東方色譜系統配置
const Palette = {
  小紅: "#E67762", // R230 G119 B98 - 應用層/大眾連結
  岱赭: "#DD6B4F", // R221 G107 B79 - 輔助標記
  艷熾: "#CB523E", // R203 G82 B62  - 視覺焦點
  石榴裙: "#B13B2E",// R177 G59 B46  - 互動觸發
  鶴頂紅: "#D24735",// R210 G71 B53  - 機制轉折
  朱殷: "#B93A26", // R185 G58 B38  - 理論核心
  朱湛: "#95302E", // R149 G48 B46  - 深度解析
  大赭: "#822327", // R130 G35 B39  - 學術基底/底色
};

type Chapter = {
  id: string;
  timeLabel: string;
  timestamp: number; // 秒數
  title: string;
  psychologicalPoint: string;
  color: string;
};

type VideoItem = {
  id: string;
  title: string;
  targetMedia: string;
  url: string;
  chapters: Chapter[];
  expertReview: string;
  academicLinks: string[];
};

const database: VideoItem[] = [
  {
    id: "case-01",
    title: "高頻率視覺刺激與情緒標記歷程",
    targetMedia: "BLACKPINK - How You Like That",
    url: "https://www.youtube.com/watch?v=ioNng23DkIM",
    chapters: [
      {
        id: "c1-1",
        timeLabel: "0:25",
        timestamp: 25,
        title: "場景空間的壓迫與擴張",
        psychologicalPoint: "物理空間之劇烈轉換觸發防衛機制退行（Regression），建立早期客體關係之視覺重現。",
        color: Palette.鶴頂紅,
      },
      {
        id: "c1-2",
        timeLabel: "1:15",
        timestamp: 75,
        title: "高對比色彩與感官過載",
        psychologicalPoint: "高喚起狀態（High Arousal）干擾內在情緒辨識，形成短暫之述情障礙（Alexithymia）特徵。",
        color: Palette.朱殷,
      },
      {
        id: "c1-3",
        timeLabel: "2:30",
        timestamp: 150,
        title: "凝視與鏡像神經元",
        psychologicalPoint: "直視鏡頭打破第四面牆，啟動觀看者之投射認同（Projective Identification）。",
        color: Palette.朱湛,
      },
    ],
    expertReview:
      "影像節奏與色彩對比構成強烈之外在刺激源。快速切換之視覺資訊佔用工作記憶（Working Memory）容量，限縮個體進行情緒認知重評（Cognitive Reappraisal）之空間。觀看過程之情緒體驗停留在軀體化（Somatization）層次，缺乏語言化之標記歷程。",
    academicLinks: [
      "Taylor, G. J. (2000). Recent developments in alexithymia theory and research.",
      "Gross, J. J. (2015). Emotion regulation: Current status and future prospects.",
    ],
  },
];

export default function PsychoeducationDashboard() {
  const [activeVideo, setActiveVideo] = useState<VideoItem>(database[0]);
  const [activeChapterId, setActiveChapterId] = useState<string>(
    database[0].chapters[0].id
  );

  return (
    <div className="min-h-screen bg-[#FDF7F5] p-8 font-sans text-zinc-900">
      <header className="mb-10 border-b-2 border-zinc-200 pb-6">
        <h1 
          className="text-4xl font-bold tracking-tight"
          style={{ color: Palette.大赭 }}
        >
          心智歷程影像觀測
        </h1>
        <p className="mt-2 text-lg text-zinc-700">
          影像刺激與心理防衛機制之結構關聯
        </p>
      </header>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* 左側：影像觀測與進度區 */}
        <section className="lg:col-span-7">
          <div className="overflow-hidden rounded-xl bg-black shadow-xl">
            {/* 模擬 YouTube 播放器區域 */}
            <div className="relative aspect-video w-full bg-zinc-900">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-zinc-500">影像觀測區位 [{activeVideo.targetMedia}]</span>
              </div>
            </div>

            {/* 語意進度條 */}
            <div className="bg-zinc-800 p-4">
              <div className="relative h-2 w-full rounded-full bg-zinc-600">
                {activeVideo.chapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => setActiveChapterId(chapter.id)}
                    className="absolute top-1/2 h-4 w-4 -translate-y-1/2 transform rounded-full border-2 border-zinc-800 transition-transform hover:scale-150"
                    style={{
                      left: `${(chapter.timestamp / 200) * 100}%`, // 模擬進度比例
                      backgroundColor: chapter.color,
                      zIndex: activeChapterId === chapter.id ? 10 : 1,
                      boxShadow: activeChapterId === chapter.id ? `0 0 10px ${chapter.color}` : 'none'
                    }}
                    title={chapter.title}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold" style={{ color: Palette.朱湛 }}>研究者詮釋</h2>
            <p className="mt-4 leading-relaxed text-zinc-700">
              {activeVideo.expertReview}
            </p>
          </div>
        </section>

        {/* 右側：同步劇本與機制解析區 */}
        <section className="space-y-6 lg:col-span-5">
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold border-b border-zinc-100 pb-2" style={{ color: Palette.大赭 }}>
              時間軸機制解析
            </h3>
            <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-3 before:w-0.5 before:bg-zinc-100">
              {activeVideo.chapters.map((chapter) => {
                const isActive = activeChapterId === chapter.id;
                return (
                  <div 
                    key={chapter.id} 
                    className={`relative cursor-pointer rounded-lg p-4 transition-all ${
                      isActive ? "bg-zinc-50 shadow-md transform translate-x-1" : "hover:bg-zinc-50/50"
                    }`}
                    onClick={() => setActiveChapterId(chapter.id)}
                  >
                    <div 
                      className="absolute left-2 top-6 h-2.5 w-2.5 rounded-full border border-white"
                      style={{ backgroundColor: chapter.color, marginLeft: '-0.35rem' }}
                    />
                    <div className="ml-6">
                      <span 
                        className="inline-block rounded px-2 py-0.5 text-xs font-semibold text-white mb-2"
                        style={{ backgroundColor: isActive ? chapter.color : Palette.岱赭 }}
                      >
                        {chapter.timeLabel}
                      </span>
                      <h4 className="font-bold text-zinc-900">{chapter.title}</h4>
                      {isActive && (
                        <p className="mt-2 text-sm leading-relaxed text-zinc-700 border-l-2 pl-3" style={{ borderColor: chapter.color }}>
                          {chapter.psychologicalPoint}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-zinc-500">
              理論文獻參照
            </h3>
            <ul className="space-y-3 text-sm text-zinc-600">
              {activeVideo.academicLinks.map((link, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span style={{ color: Palette.朱殷 }}>•</span>
                  <span>{link}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}