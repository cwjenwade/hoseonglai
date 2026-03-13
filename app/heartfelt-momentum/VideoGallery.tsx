"use client";

import { useEffect, useState } from "react";
import type { HeartfeltVideoItem } from "./videos-data";

type VideoGalleryProps = {
  videos: HeartfeltVideoItem[];
};

function getYouTubeEmbedUrl(url?: string): string {
  if (!url) return "";

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = parsed.pathname.replace("/", "").trim();
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsed.pathname === "/watch") {
        const id = parsed.searchParams.get("v") || "";
        return id ? `https://www.youtube.com/embed/${id}` : "";
      }

      if (parsed.pathname.startsWith("/embed/")) {
        return parsed.toString();
      }

      if (parsed.pathname.startsWith("/shorts/")) {
        const id = parsed.pathname.replace("/shorts/", "").trim();
        return id ? `https://www.youtube.com/embed/${id}` : "";
      }
    }
  } catch {
    return "";
  }

  return "";
}

function getCurrentPageUrl() {
  if (typeof window === "undefined") return "https://hoseonglai.vercel.app/heartfelt-momentum";
  return window.location.href;
}

export function VideoGallery({ videos }: VideoGalleryProps) {
  const [activeVideo, setActiveVideo] = useState<HeartfeltVideoItem | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!activeVideo) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveVideo(null);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeVideo]);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timer);
  }, [copied]);

  const youtubeEmbedUrl = getYouTubeEmbedUrl(activeVideo?.youtubeUrl);
  const youtubeChannelUrl = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL || "https://www.youtube.com";
  const shareUrl = activeVideo?.youtubeUrl || getCurrentPageUrl();
  const shareText = activeVideo ? `${activeVideo.title}｜Ho-Se Ong-Lai` : "Ho-Se Ong-Lai";

  const lineShareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`;
  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const xShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(
    shareText,
  )}`;

  return (
    <>
      <div className="grid gap-x-7 gap-y-14 md:grid-cols-2 xl:grid-cols-4 xl:gap-y-16">
        {videos.map((video) => (
          <button
            key={video.title}
            type="button"
            onClick={() => setActiveVideo(video)}
            className="group relative z-0 w-full p-0 text-left transition-[padding,transform,box-shadow] duration-300 ease-out hover:z-20 hover:-translate-y-2 hover:p-5 hover:shadow-[0_22px_44px_-28px_rgba(0,0,0,0.55)] focus-visible:z-20 focus-visible:-translate-y-2 focus-visible:p-5 focus-visible:shadow-[0_22px_44px_-28px_rgba(0,0,0,0.55)] focus-visible:outline-none"
          >
            <article>
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#f1eee8]">
                <img
                  src={video.image}
                  alt={video.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
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
          </button>
        ))}
      </div>

      {activeVideo ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-8"
          role="dialog"
          aria-modal="true"
          aria-label={activeVideo.title}
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-2xl bg-white p-6 shadow-2xl md:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-xl text-black/65 transition hover:bg-black/5 hover:text-black focus-visible:outline-none"
              aria-label="關閉彈跳視窗"
            >
              ×
            </button>

            <h3
              className="pr-12 text-[1.8rem] leading-tight tracking-[-0.03em] text-black/90"
              style={{ fontFamily: "var(--font-noto-serif)" }}
            >
              {activeVideo.title}
            </h3>

            <p
              className="mt-2 text-[0.74rem] uppercase tracking-[0.24em] text-black/35"
              style={{ fontFamily: "var(--font-geist)" }}
            >
              {activeVideo.titleEn}
            </p>

            <p
              className="mt-4 text-[0.95rem] leading-[1.8] text-black/65"
              style={{ fontFamily: "var(--font-noto-serif)" }}
            >
              {activeVideo.description}
            </p>

            <div className="mt-6 min-h-[340px] overflow-hidden rounded-xl border border-dashed border-black/15 bg-[#fdfdfc]">
              {youtubeEmbedUrl ? (
                <iframe
                  title={activeVideo.title}
                  src={youtubeEmbedUrl}
                  className="h-[340px] w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <div className="flex h-[340px] items-center justify-center px-5 text-center text-sm text-black/45">
                  尚未設定 YouTube 影片網址，請到後台 Heartfelt 分頁補上。
                </div>
              )}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <a
                href={lineShareUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-black/15 px-3 py-1.5 text-xs text-black/70 transition hover:bg-black/5"
              >
                分享 LINE
              </a>
              <a
                href={fbShareUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-black/15 px-3 py-1.5 text-xs text-black/70 transition hover:bg-black/5"
              >
                分享 FB
              </a>
              <a
                href={xShareUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-black/15 px-3 py-1.5 text-xs text-black/70 transition hover:bg-black/5"
              >
                分享 X
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-black/15 px-3 py-1.5 text-xs text-black/70 transition hover:bg-black/5"
              >
                打開 IG
              </a>
              <button
                type="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(shareUrl);
                    setCopied(true);
                  } catch {
                    setCopied(false);
                  }
                }}
                className="rounded-full border border-black/15 px-3 py-1.5 text-xs text-black/70 transition hover:bg-black/5"
              >
                {copied ? "已複製連結" : "複製連結"}
              </button>
              <a
                href={youtubeChannelUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs text-red-700 transition hover:bg-red-100"
              >
                前往 YouTube 頻道
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
