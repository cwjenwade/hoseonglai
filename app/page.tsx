import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DEFAULT_BRAND_PAGE_CONTENT, normalizeBrandPageContent } from "@/app/brand-philosophy/brand-content";
import {
  LECTURES,
  type LectureItem,
} from "@/app/fortune-arrives/lectures-data";
import { HEARTFELT_VIDEOS } from "@/app/heartfelt-momentum/videos-data";
import {
  normalizeResearchProjects,
  RESEARCH_PROJECTS,
} from "@/app/collaborative-prosperity/projects";
import { GROUPS, isGroupVisible } from "@/app/togetherness/group-data";
import { getSiteContentSection } from "@/lib/site-content-server";

export const metadata: Metadata = {
  title: "Ho-Se 好勢｜Ong-Lai 旺來",
  description:
    "Ho-Se 好勢・Ong-Lai 旺來首頁，整合研究、內容、團體與協作實踐。",
};

function getLectureSortTimestamp(lecture: LectureItem): number {
  if (lecture.dateMode === "month") {
    const year = Number(lecture.approxYear || "");
    const month = Number(lecture.approxMonth || "");

    if (Number.isInteger(year) && Number.isInteger(month) && month >= 1 && month <= 12) {
      return new Date(year, month - 1, 1).getTime();
    }
  }

  const dateTimestamp = new Date(lecture.date).getTime();
  if (Number.isNaN(dateTimestamp)) {
    return Number.POSITIVE_INFINITY;
  }

  const startTime = lecture.time.split("–")[0]?.trim() || "00:00";
  const [hours, minutes] = startTime.split(":").map((value) => Number(value));

  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) {
    return dateTimestamp;
  }

  return dateTimestamp + hours * 60 * 60 * 1000 + minutes * 60 * 1000;
}

function pickUpcomingLecture(lectures: LectureItem[]): LectureItem | null {
  const sorted = [...lectures].sort(
    (left, right) => getLectureSortTimestamp(left) - getLectureSortTimestamp(right),
  );
  const now = Date.now();

  return sorted.find((lecture) => getLectureSortTimestamp(lecture) >= now) || sorted[0] || null;
}

export default async function Home() {
  const [videos, groups, lectures, researchProjectsContent, brandContentValue] = await Promise.all([
    getSiteContentSection("heartfelt_momentum_videos", HEARTFELT_VIDEOS),
    getSiteContentSection("togetherness_groups", GROUPS),
    getSiteContentSection("fortune_arrives_lectures", LECTURES),
    getSiteContentSection("collaborative_prosperity_projects", RESEARCH_PROJECTS),
    getSiteContentSection("brand_philosophy_page", DEFAULT_BRAND_PAGE_CONTENT),
  ]);

  const featuredResearch =
    videos.find((video) => video.tag === "alexithymia") || videos[0] || HEARTFELT_VIDEOS[0];
  const featuredGathering =
    groups.filter(isGroupVisible)[0] || GROUPS.find(isGroupVisible) || GROUPS[0];
  const publishedProjects = normalizeResearchProjects(researchProjectsContent, RESEARCH_PROJECTS);
  const featuredCollaboration = publishedProjects[0] || normalizeResearchProjects(RESEARCH_PROJECTS)[0];
  const featuredProgram = pickUpcomingLecture(lectures) || LECTURES[0];
  const brandContent = normalizeBrandPageContent(brandContentValue);
  const director = brandContent.director;
  const aboutText =
    director.introParagraphs[0] ||
    "整合心理學研究、團體實踐與文化內容，作為一個可被閱讀、參與與停留的場域。";

  return (
    <div className="w-full bg-[#f6f2eb] text-neutral-900">
      <section aria-label="Homepage film" className="border-b border-black/6">
        <div className="relative isolate overflow-hidden bg-[#1b1815]">
          <video
            className="h-[78vh] min-h-[520px] w-full object-cover md:h-screen"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src="/idenxhose.mp4" type="video/mp4" />
          </video>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/12 to-black/18" />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 px-6 pb-6 md:px-10 md:pb-10">
            <p
              className="text-[0.72rem] uppercase tracking-[0.34em] text-white/72"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Ho-Se 好勢 / Ong-Lai 旺來
            </p>
          </div>
        </div>
      </section>

      <section
        aria-label="Brand introduction"
        className="px-6 py-12 md:px-10 md:py-16 lg:py-20"
      >
        <div className="mx-auto max-w-[1520px]">
          <p
            className="text-[0.72rem] uppercase tracking-[0.28em] text-zinc-500"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            Brand Platform
          </p>

          <div className="mt-7 max-w-[1120px]">
            <h1
              className="text-[2.6rem] leading-none tracking-[-0.04em] text-zinc-950 sm:text-[3.4rem] lg:text-[4.3rem]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Ho-Se 好勢
              <br />
              Ong-Lai 旺來
            </h1>

            <div className="mt-8 max-w-4xl space-y-4 md:mt-10">
              <p
                className="text-[0.98rem] tracking-[0.08em] text-zinc-700 sm:text-[1.05rem]"
                style={{ fontFamily: "var(--font-noto-serif)" }}
              >
                以心聚勢，以運旺來，團圓共好
              </p>

              <p
                className="max-w-xl text-[0.76rem] uppercase tracking-[0.22em] text-zinc-400"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Research, creative content, community, and collaborative practice
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-8 pt-2 md:px-10 md:pb-12">
        <div className="mx-auto max-w-[1520px] overflow-hidden rounded-[2.5rem] bg-[#e8e0d6]">
          <div className="grid lg:grid-cols-[1.18fr_0.82fr]">
            <div className="relative min-h-[360px] lg:min-h-[640px]">
              <Image
                src={featuredResearch.image}
                alt={featuredResearch.title}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/8 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <p
                  className="text-[0.68rem] uppercase tracking-[0.3em] text-white/68"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  {featuredResearch.titleEn}
                </p>
                <p
                  className="mt-2 max-w-[24ch] text-[1.25rem] leading-[1.45] text-white/92 md:text-[1.5rem]"
                  style={{ fontFamily: "var(--font-noto-serif)" }}
                >
                  {featuredResearch.title}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-full px-7 py-10 md:px-10 md:py-14 lg:px-14 lg:py-16">
                <p
                  className="text-[0.72rem] uppercase tracking-[0.34em] text-black/38"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  First entry
                </p>
                <h2
                  className="mt-6 text-[2.5rem] leading-[1.02] tracking-[-0.04em] text-black/92 md:text-[3.8rem]"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Research
                </h2>
                <p
                  className="mt-5 max-w-[22ch] text-[1.06rem] leading-[1.9] text-black/62"
                  style={{ fontFamily: "var(--font-noto-serif)" }}
                >
                  研究影像、情緒語言與心理學轉譯，從影片之後繼續往內走。
                </p>
                <Link
                  href="/heartfelt-momentum"
                  className="mt-10 inline-flex items-center gap-3 border-b border-black/55 pb-1 text-[0.82rem] uppercase tracking-[0.28em] text-black/76 transition hover:opacity-62"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  Enter Research
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-10 md:px-10 md:py-14">
        <div className="mx-auto grid max-w-[1520px] gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch">
          <div className="flex min-h-[280px] flex-col justify-between rounded-[2.35rem] bg-[#e6ece5] px-7 py-8 md:px-10 md:py-10 lg:min-h-[600px] lg:px-12 lg:py-12">
            <div>
              <p
                className="text-[0.72rem] uppercase tracking-[0.34em] text-black/38"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Second entry
              </p>
              <h2
                className="mt-6 text-[2.5rem] leading-[1.02] tracking-[-0.04em] text-black/92 md:text-[3.8rem]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Gatherings
              </h2>
              <p
                className="mt-5 max-w-[22ch] text-[1.06rem] leading-[1.9] text-black/62"
                style={{ fontFamily: "var(--font-noto-serif)" }}
              >
                讓人與人一起停留、靠近、慢慢說話的團體場域。
              </p>
            </div>

            <div className="mt-10">
              <p
                className="text-[0.7rem] uppercase tracking-[0.26em] text-black/34"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                {featuredGathering.subtitle}
              </p>
              <p
                className="mt-3 max-w-[20ch] text-[1.35rem] leading-[1.4] text-black/86"
                style={{ fontFamily: "var(--font-noto-serif)" }}
              >
                {featuredGathering.title}
              </p>
              <Link
                href="/togetherness"
                className="mt-8 inline-flex items-center gap-3 border-b border-black/55 pb-1 text-[0.82rem] uppercase tracking-[0.28em] text-black/76 transition hover:opacity-62"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Enter Gatherings
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-[2.5rem] bg-[#d8dfda] lg:min-h-[600px]">
            <Image
              src={featuredGathering.image}
              alt={featuredGathering.title}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/24 via-transparent to-black/8" />
          </div>
        </div>
      </section>

      <section className="px-6 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-[1520px]">
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-[2rem] border border-black/8 bg-[#f3eee5] p-7 md:p-9">
              <p
                className="text-[0.72rem] uppercase tracking-[0.34em] text-black/38"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Programs
              </p>
              <div className="mt-8 max-w-[34rem]">
                <p
                  className="text-[0.78rem] uppercase tracking-[0.24em] text-black/34"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  {featuredProgram.dateLabel}
                </p>
                <h3
                  className="mt-4 text-[1.8rem] leading-[1.18] tracking-[-0.03em] text-black/92"
                  style={{ fontFamily: "var(--font-noto-serif)" }}
                >
                  {featuredProgram.titleZh}
                </h3>
                <p
                  className="mt-4 max-w-[28ch] text-[1rem] leading-[1.85] text-black/58"
                  style={{ fontFamily: "var(--font-noto-serif)" }}
                >
                  {featuredProgram.summary || featuredProgram.locationZh || "近期講座與公開活動持續展開中。"}
                </p>
              </div>
              <Link
                href="/fortune-arrives"
                className="mt-8 inline-flex items-center gap-3 text-[0.8rem] uppercase tracking-[0.28em] text-black/72 transition hover:opacity-62"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                View Programs
                <span aria-hidden="true">↗</span>
              </Link>
            </article>

            <article className="rounded-[2rem] border border-black/8 bg-[#fbf8f2] p-7 md:p-9">
              <p
                className="text-[0.72rem] uppercase tracking-[0.34em] text-black/38"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Collaborations
              </p>
              <div className="mt-8 max-w-[34rem]">
                <p
                  className="text-[0.78rem] uppercase tracking-[0.24em] text-black/34"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  {featuredCollaboration?.researchType || "research"}
                </p>
                <h3
                  className="mt-4 text-[1.8rem] leading-[1.18] tracking-[-0.03em] text-black/92"
                  style={{ fontFamily: "var(--font-noto-serif)" }}
                >
                  {featuredCollaboration?.title || "Current research studies"}
                </h3>
                <p
                  className="mt-4 max-w-[28ch] text-[1rem] leading-[1.85] text-black/58"
                  style={{ fontFamily: "var(--font-noto-serif)" }}
                >
                  {featuredCollaboration?.researchAudiencePurpose ||
                    "目前可參與的研究已開放，包含量化測驗與合作式研究流程。"}
                </p>
              </div>
              <Link
                href="/collaborative-prosperity"
                className="mt-8 inline-flex items-center gap-3 text-[0.8rem] uppercase tracking-[0.28em] text-black/72 transition hover:opacity-62"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                View Collaborations
                <span aria-hidden="true">↗</span>
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 pt-4 md:px-10 md:pb-24">
        <div className="mx-auto max-w-4xl border-t border-black/10 pt-8 md:pt-10">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div className="max-w-[42rem]">
              <p
                className="text-[0.72rem] uppercase tracking-[0.34em] text-black/38"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                About
              </p>
              <h2
                className="mt-4 text-[1.8rem] leading-[1.2] tracking-[-0.03em] text-black/92 md:text-[2.15rem]"
                style={{ fontFamily: "var(--font-noto-serif)" }}
              >
                {director.nameZh} {director.nameEn ? `｜${director.nameEn}` : ""}
              </h2>
              <p
                className="mt-4 max-w-[34ch] text-[1rem] leading-[1.9] text-black/60"
                style={{ fontFamily: "var(--font-noto-serif)" }}
              >
                {aboutText}
              </p>
            </div>

            <div>
              <Link
                href="/brand-philosophy"
                className="inline-flex items-center gap-3 border-b border-black/55 pb-1 text-[0.8rem] uppercase tracking-[0.28em] text-black/72 transition hover:opacity-62"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                View Identity
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
