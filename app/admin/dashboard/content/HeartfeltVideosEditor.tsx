"use client";

import { useMemo, useState } from "react";
import type { HeartfeltVideoItem } from "@/app/heartfelt-momentum/videos-data";

type HeartfeltVideosEditorProps = {
  initialVideos: HeartfeltVideoItem[];
  uploadedUrl?: string;
};

function createEmptyVideo(): HeartfeltVideoItem {
  return {
    title: "",
    titleEn: "",
    tag: "",
    description: "",
    category: "研究影片",
    duration: "5 分鐘",
    image: "",
    youtubeUrl: "",
  };
}

export default function HeartfeltVideosEditor({ initialVideos, uploadedUrl }: HeartfeltVideosEditorProps) {
  const [videos, setVideos] = useState<HeartfeltVideoItem[]>(initialVideos || []);

  const payload = useMemo(() => videos, [videos]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900">Heartfelt Momentum 編輯器</h2>
          <p className="mt-1 text-sm text-zinc-600">管理影片卡片（標題、描述、tag、時長、封面圖）。</p>
        </div>

        <button
          type="button"
          onClick={() => setVideos((prev) => [...prev, createEmptyVideo()])}
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100"
        >
          新增影片
        </button>
      </div>

      <div className="space-y-4">
        {videos.map((video, index) => (
          <article key={`${video.title}-${index}`} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
            <div className="grid gap-3 md:grid-cols-2">
              <label className="text-xs text-zinc-700">
                中文標題
                <input
                  value={video.title}
                  onChange={(e) =>
                    setVideos((prev) => prev.map((item, i) => (i === index ? { ...item, title: e.target.value } : item)))
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                />
              </label>

              <label className="text-xs text-zinc-700">
                英文標題
                <input
                  value={video.titleEn}
                  onChange={(e) =>
                    setVideos((prev) => prev.map((item, i) => (i === index ? { ...item, titleEn: e.target.value } : item)))
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                />
              </label>
            </div>

            <div className="mt-3 grid gap-3 md:grid-cols-3">
              <label className="text-xs text-zinc-700">
                Tag
                <input
                  value={video.tag}
                  onChange={(e) =>
                    setVideos((prev) => prev.map((item, i) => (i === index ? { ...item, tag: e.target.value } : item)))
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                  placeholder="emotion differentiation"
                />
              </label>

              <label className="text-xs text-zinc-700">
                類別
                <input
                  value={video.category}
                  onChange={(e) =>
                    setVideos((prev) => prev.map((item, i) => (i === index ? { ...item, category: e.target.value } : item)))
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                  placeholder="研究影片"
                />
              </label>

              <label className="text-xs text-zinc-700">
                時長
                <input
                  value={video.duration}
                  onChange={(e) =>
                    setVideos((prev) => prev.map((item, i) => (i === index ? { ...item, duration: e.target.value } : item)))
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                  placeholder="5 分鐘"
                />
              </label>
            </div>

            <label className="mt-3 block text-xs text-zinc-700">
              內容描述
              <textarea
                value={video.description}
                onChange={(e) =>
                  setVideos((prev) => prev.map((item, i) => (i === index ? { ...item, description: e.target.value } : item)))
                }
                className="mt-1 h-24 w-full rounded-lg border border-zinc-300 p-3 text-sm outline-none focus:border-amber-400"
              />
            </label>

            <div className="mt-3 grid gap-3 md:grid-cols-[1fr_auto]">
              <label className="text-xs text-zinc-700">
                封面圖片網址
                <input
                  value={video.image}
                  onChange={(e) =>
                    setVideos((prev) => prev.map((item, i) => (i === index ? { ...item, image: e.target.value } : item)))
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                />
              </label>

              {uploadedUrl ? (
                <button
                  type="button"
                  onClick={() =>
                    setVideos((prev) => prev.map((item, i) => (i === index ? { ...item, image: uploadedUrl } : item)))
                  }
                  className="mt-5 rounded-full border border-sky-300 px-3 py-2 text-xs text-sky-700 transition hover:bg-sky-100"
                >
                  套用最新上傳
                </button>
              ) : null}
            </div>

            <label className="mt-3 block text-xs text-zinc-700">
              YouTube 影片網址
              <input
                value={video.youtubeUrl || ""}
                onChange={(e) =>
                  setVideos((prev) =>
                    prev.map((item, i) => (i === index ? { ...item, youtubeUrl: e.target.value } : item)),
                  )
                }
                className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </label>

            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setVideos((prev) => prev.filter((_, i) => i !== index))}
                className="rounded-full border border-red-200 px-3 py-1 text-xs text-red-600 transition hover:bg-red-50"
              >
                刪除影片
              </button>
            </div>
          </article>
        ))}
      </div>

      <input type="hidden" name="payload" value={JSON.stringify(payload)} />
    </div>
  );
}
