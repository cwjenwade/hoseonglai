import { Geist, Noto_Serif_TC, Playfair_Display } from "next/font/google";
import { getSiteContentSection } from "@/lib/site-content-server";
import { HEARTFELT_VIDEOS } from "./videos-data";
import { VideoGallery } from "./VideoGallery";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "有心好勢｜內容與研究影片",
  description:
    "Ho-Se 好勢・Ong-Lai 旺來的內容與研究影片頁，整理心理健康與研究相關影音內容。",
};

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

export default async function PsychologyArtworkPage() {
  const videos = await getSiteContentSection(
    "heartfelt_momentum_videos",
    HEARTFELT_VIDEOS,
  );

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

        <VideoGallery videos={videos} />
      </section>
    </main>
  );
}
