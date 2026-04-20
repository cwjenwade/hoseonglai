import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DEFAULT_BRAND_PAGE_CONTENT, normalizeBrandPageContent } from "@/app/brand-philosophy/brand-content";
import {
  DEFAULT_HOME_PAGE_CONTENT,
  getHomeSectionControl,
  getHomeSectionCta,
  normalizeHomePageContent,
  type HomeSectionKey,
} from "@/app/home-content";
import HomeMobileMenu from "@/app/HomeMobileMenu";
import { HEARTFELT_VIDEOS, type HeartfeltVideoItem } from "@/app/heartfelt-momentum/videos-data";
import {
  normalizeResearchProjects,
  RESEARCH_PROJECTS,
  type ResearchProject,
} from "@/app/collaborative-prosperity/projects";
import { GROUPS, isGroupVisible, type GroupItem } from "@/app/togetherness/group-data";
import { getSiteContentSection } from "@/lib/site-content-server";

export const metadata: Metadata = {
  title: "Ho-Se 好勢｜Ong-Lai 旺來",
  description:
    "Ho-Se 好勢・Ong-Lai 旺來首頁，整合研究、內容、團體與協作實踐。",
};

function getTypedSelectedIds(selectedIds: string[], type: string): string[] {
  const prefix = `${type}:`;
  return selectedIds
    .filter((id) => id.startsWith(prefix))
    .map((id) => id.slice(prefix.length).trim())
    .filter(Boolean);
}

function selectHomeItems<T>(
  items: T[],
  selectedIds: string[],
  getId: (item: T) => string,
  limit: number,
  type?: string,
): T[] {
  const ids = type ? getTypedSelectedIds(selectedIds, type) : selectedIds;
  const selected = ids
    .map((id) => items.find((item) => getId(item) === id))
    .filter((item): item is T => Boolean(item));

  // Empty or unmatched selectedIds intentionally falls back to the existing module order.
  return (selected.length > 0 ? selected : items).slice(0, limit);
}

function researchCardHref(video: HeartfeltVideoItem): string {
  return `/heartfelt-momentum#${encodeURIComponent(video.tag)}`;
}

function groupCardHref(group: GroupItem): string {
  return `/togetherness/${group.slug}`;
}

function getResearchImageAspectClass(index: number): string {
  switch (index % 4) {
    case 1:
      return "aspect-[0.73]";
    case 2:
      return "aspect-[0.75]";
    case 3:
      return "aspect-[1.51]";
    default:
      return "aspect-[1.58]";
  }
}

function getGalleryImageAspectClass(index: number): string {
  switch (index % 4) {
    case 1:
      return "aspect-[0.73]";
    case 2:
      return "aspect-[0.75]";
    case 3:
      return "aspect-[1.51]";
    default:
      return "aspect-[1.58]";
  }
}

export default async function Home() {
  const [homeContentValue, videosContent, groupsContent, researchProjectsContent, brandContentValue] =
    await Promise.all([
      getSiteContentSection("home_page_content", DEFAULT_HOME_PAGE_CONTENT),
      getSiteContentSection("heartfelt_momentum_videos", HEARTFELT_VIDEOS),
      getSiteContentSection("togetherness_groups", GROUPS),
      getSiteContentSection("collaborative_prosperity_projects", RESEARCH_PROJECTS),
      getSiteContentSection("brand_philosophy_page", DEFAULT_BRAND_PAGE_CONTENT),
    ]);

  const homeContent = normalizeHomePageContent(homeContentValue);
  const bannerControl = getHomeSectionControl(homeContent, "positioningBanner");
  const researchControl = getHomeSectionControl(homeContent, "researchExhibitions");
  const galleryControl = getHomeSectionControl(homeContent, "groupTherapyGallery");
  const supportControl = getHomeSectionControl(homeContent, "supportUs");
  const bannerResearchCta = getHomeSectionCta(bannerControl, "research");
  const bannerGroupsCta = getHomeSectionCta(bannerControl, "groups");
  const researchCta = getHomeSectionCta(researchControl);
  const galleryCta = getHomeSectionCta(galleryControl);
  const supportIdentityCta = getHomeSectionCta(supportControl, "identity");
  const supportResearchCta = getHomeSectionCta(supportControl, "research");

  const videos = Array.isArray(videosContent) && videosContent.length > 0 ? videosContent : HEARTFELT_VIDEOS;
  const visibleGroups = (Array.isArray(groupsContent) && groupsContent.length > 0 ? groupsContent : GROUPS).filter(
    isGroupVisible,
  );
  const publishedProjects = normalizeResearchProjects(researchProjectsContent, RESEARCH_PROJECTS);
  const brandContent = normalizeBrandPageContent(brandContentValue);
  const director = brandContent.director;

  const researchItems = selectHomeItems(videos, researchControl.selectedIds, (video) => video.tag, 4);
  const galleryItems = selectHomeItems(
    visibleGroups.length > 0 ? visibleGroups : GROUPS.filter(isGroupVisible),
    galleryControl.selectedIds,
    (group) => group.slug,
    4,
  );
  const supportProject = selectHomeItems<ResearchProject>(
    publishedProjects.length > 0 ? publishedProjects : normalizeResearchProjects(RESEARCH_PROJECTS),
    supportControl.selectedIds,
    (project) => project.id,
    1,
    "project",
  )[0];
  const supportIdentityImage =
    director.photo || researchItems[0]?.image || HEARTFELT_VIDEOS[0].image;
  const supportResearchImage =
    galleryItems[0]?.image || researchItems[1]?.image || supportIdentityImage;
  const orderedSections = homeContent.sections.filter((section) => section.visible);

  function renderHomeSection(sectionKey: HomeSectionKey) {
    switch (sectionKey) {
      case "positioningBanner":
        return (
          <section
            key={sectionKey}
            aria-label="Site positioning"
            className="border-b border-black/10 bg-[#f7f7f2]"
          >
            <div className="mx-auto grid max-w-[1680px] lg:grid-cols-[0.42fr_0.58fr]">
              <div className="flex min-h-[260px] flex-col justify-between border-b border-black/10 px-6 py-8 md:px-10 lg:border-b-0 lg:border-r lg:py-12">
                <p
                  className="text-[0.82rem] uppercase tracking-[0.34em] text-black/56"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  {bannerControl.eyebrow}
                </p>
                <div>
                  <h1
                    className="text-[3.1rem] leading-[0.94] tracking-[-0.055em] text-black md:text-[5.4rem] xl:text-[6.6rem]"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    Ho-Se 好勢
                    <br />
                    Ong-Lai 旺來
                  </h1>
                  <p
                    className="mt-7 max-w-[46rem] text-[0.78rem] uppercase tracking-[0.26em] text-black/38"
                    style={{ fontFamily: "var(--font-geist-sans)" }}
                  >
                    Research, creative content, community, and collaborative practice
                  </p>
                </div>
              </div>

              <div className="flex min-h-[260px] flex-col justify-center px-6 py-10 md:px-10 lg:px-16">
                <p
                  className="text-[0.78rem] uppercase tracking-[0.32em] text-black/42"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  {bannerControl.title}
                </p>
                <p
                  className="mt-5 max-w-[32ch] text-[1.45rem] leading-[1.45] tracking-[-0.02em] text-black md:text-[2rem]"
                  style={{ fontFamily: "var(--font-noto-serif)" }}
                >
                  {bannerControl.description}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  {[bannerResearchCta, bannerGroupsCta].map((cta) => (
                    <Link
                      key={cta.key}
                      href={cta.href}
                      className="inline-flex min-h-14 items-center justify-between gap-6 border border-black/26 bg-[#fbfbf8] px-5 text-[0.82rem] uppercase tracking-[0.2em] text-black transition hover:bg-black hover:text-white"
                      style={{ fontFamily: "var(--font-geist-sans)" }}
                    >
                      {cta.label}
                      <span aria-hidden="true">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );

      case "researchExhibitions":
        return (
          <section key={sectionKey} className="bg-[#f7f7f2] px-6 py-24 md:px-10 md:py-36">
            <div className="mx-auto max-w-[1360px]">
              <div className="mx-auto max-w-3xl text-center">
                <p
                  className="text-[0.68rem] uppercase tracking-[0.34em] text-black/36"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  {researchControl.eyebrow}
                </p>
                <h2
                  className="mt-5 text-[2.55rem] uppercase leading-none tracking-[0.25em] text-black md:text-[3.65rem]"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  {researchControl.title}
                </h2>
                <p
                  className="mx-auto mt-7 max-w-[36rem] text-[0.98rem] leading-[1.85] text-black/52"
                  style={{ fontFamily: "var(--font-noto-serif)" }}
                >
                  {researchControl.description}
                </p>
              </div>

              <div className="mx-auto mt-24 grid max-w-[1484px] items-start gap-x-8 gap-y-24 md:grid-cols-2 xl:grid-cols-4 xl:gap-x-[26px]">
                {researchItems.map((video, index) => (
                  <Link
                    key={video.tag}
                    href={researchCardHref(video)}
                    className="group block w-full"
                  >
                    <div className={["relative overflow-hidden bg-zinc-200", getResearchImageAspectClass(index)].join(" ")}>
                      <Image
                        src={video.image}
                        alt={video.title}
                        fill
                        sizes="(min-width: 1280px) 352px, (min-width: 768px) 42vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="mt-5">
                      <span
                        className="inline-flex border border-black/12 bg-[#fbfbf8] px-2 py-0.5 text-[0.64rem] uppercase tracking-[0.22em] text-black/48"
                        style={{ fontFamily: "var(--font-geist-sans)" }}
                      >
                        Research
                      </span>
                      <h3
                        className="mt-4 text-[1.32rem] leading-[1.22] tracking-[-0.02em] text-black md:text-[1.48rem]"
                        style={{ fontFamily: "var(--font-noto-serif)" }}
                      >
                        {video.title}
                      </h3>
                      <p
                        className="mt-3 text-[0.94rem] leading-[1.75] text-black/52"
                        style={{ fontFamily: "var(--font-noto-serif)" }}
                      >
                        {video.description}
                      </p>
                      <p
                        className="mt-5 text-[0.68rem] uppercase tracking-[0.2em] text-black/58"
                        style={{ fontFamily: "var(--font-geist-sans)" }}
                      >
                        {video.category} · {video.duration}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-16 flex justify-end">
                <Link
                  href={researchCta.href}
                  className="inline-flex min-h-14 min-w-[16.5rem] items-center justify-between border border-black/30 bg-[#fbfbf8] px-6 text-[0.9rem] tracking-[0.08em] text-black transition hover:bg-black hover:text-white"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  {researchCta.label}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </section>
        );

      case "groupTherapyGallery":
        return (
          <section key={sectionKey} className="border-t border-black/10 bg-[#f7f7f2] px-6 py-24 md:px-10 md:py-36">
            <div className="mx-auto max-w-[1360px]">
              <div className="mx-auto max-w-3xl text-center">
                <p
                  className="text-[0.68rem] uppercase tracking-[0.34em] text-black/36"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  {galleryControl.eyebrow}
                </p>
                <h2
                  className="mt-5 text-[2.55rem] uppercase leading-none tracking-[0.25em] text-black md:text-[3.65rem]"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  {galleryControl.title}
                </h2>
                <p
                  className="mx-auto mt-7 max-w-[36rem] text-[0.98rem] leading-[1.85] text-black/52"
                  style={{ fontFamily: "var(--font-noto-serif)" }}
                >
                  {galleryControl.description}
                </p>
              </div>

              <div className="mx-auto mt-24 grid max-w-[1484px] items-start gap-x-8 gap-y-24 md:grid-cols-2 xl:grid-cols-4 xl:gap-x-[26px]">
                {galleryItems.map((group, index) => (
                  <Link
                    key={group.slug}
                    href={groupCardHref(group)}
                    className="group block w-full"
                  >
                    <div className={["relative overflow-hidden bg-zinc-200", getGalleryImageAspectClass(index)].join(" ")}>
                      <Image
                        src={group.image}
                        alt={group.title}
                        fill
                        sizes="(min-width: 1280px) 352px, (min-width: 768px) 42vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="mt-5">
                      <h3
                        className="text-[1.32rem] leading-[1.22] tracking-[-0.02em] text-black md:text-[1.48rem]"
                        style={{ fontFamily: "var(--font-noto-serif)" }}
                      >
                        {group.title}
                      </h3>
                      <p
                        className="mt-3 text-[0.74rem] uppercase tracking-[0.18em] text-black/42"
                        style={{ fontFamily: "var(--font-geist-sans)" }}
                      >
                        {group.subtitle}
                      </p>
                      <p
                        className="mt-4 text-[0.94rem] leading-[1.75] text-black/52"
                        style={{ fontFamily: "var(--font-noto-serif)" }}
                      >
                        {group.description}
                      </p>
                      <p
                        className="mt-5 text-[0.68rem] uppercase tracking-[0.2em] text-black/58"
                        style={{ fontFamily: "var(--font-geist-sans)" }}
                      >
                        Open for inquiry
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-16 flex justify-end">
                <Link
                  href={galleryCta.href}
                  className="inline-flex min-h-14 min-w-[16.5rem] items-center justify-between border border-black/30 bg-[#fbfbf8] px-6 text-[0.9rem] tracking-[0.08em] text-black transition hover:bg-black hover:text-white"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  {galleryCta.label}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </section>
        );

      case "supportUs":
        return (
          <section key={sectionKey} className="border-t border-black/10 bg-[#f7f7f2] px-6 py-16 md:px-10 md:py-24">
            <div className="mx-auto max-w-[1680px]">
              <div className="mx-auto max-w-4xl text-center">
                <p
                  className="text-[0.76rem] uppercase tracking-[0.34em] text-black/38"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  {supportControl.eyebrow}
                </p>
                <h2
                  className="mt-4 text-[2.75rem] uppercase leading-none tracking-[0.24em] text-black md:text-[4rem]"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  {supportControl.title}
                </h2>
                <p
                  className="mx-auto mt-5 max-w-[42rem] text-[1.02rem] leading-[1.8] text-black/58"
                  style={{ fontFamily: "var(--font-noto-serif)" }}
                >
                  {supportControl.description}
                </p>
              </div>

              <div className="mt-14 grid gap-8 lg:grid-cols-2">
                <Link href={supportIdentityCta.href} className="group block">
                  <div className="relative aspect-[1.72] overflow-hidden bg-zinc-200">
                    <Image
                      src={supportIdentityImage}
                      alt={director.nameZh}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <h3
                    className="mt-6 text-[2rem] leading-tight tracking-[-0.035em] text-black"
                    style={{ fontFamily: "var(--font-noto-serif)" }}
                  >
                    {supportIdentityCta.label}
                  </h3>
                  <p
                    className="mt-3 max-w-[40rem] text-[1rem] leading-[1.75] text-black/56"
                    style={{ fontFamily: "var(--font-noto-serif)" }}
                  >
                    先理解 Ho-Se 好勢 Ong-Lai 旺來的品牌身份、主體與背後的心理學實踐。
                  </p>
                </Link>

                <Link href={supportResearchCta.href} className="group block">
                  <div className="relative aspect-[1.72] overflow-hidden bg-zinc-200">
                    <Image
                      src={supportResearchImage}
                      alt={supportProject?.title || "Participate in research"}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <h3
                    className="mt-6 text-[2rem] leading-tight tracking-[-0.035em] text-black"
                    style={{ fontFamily: "var(--font-noto-serif)" }}
                  >
                    {supportResearchCta.label}
                  </h3>
                  <p
                    className="mt-3 max-w-[40rem] text-[1rem] leading-[1.75] text-black/56"
                    style={{ fontFamily: "var(--font-noto-serif)" }}
                  >
                    {supportProject?.researchAudiencePurpose ||
                      "目前開放的研究會導向研究專屬 Google Form，讓參與者可以閱讀說明後再填寫資料。"}
                  </p>
                </Link>
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  }

  return (
    <div className="w-full bg-[#f7f7f2] text-neutral-950">
      {homeContent.hero.visible ? (
        <section aria-label="Homepage film" className="border-b border-black/10">
          <div className="relative isolate overflow-hidden bg-[#1b1815]">
            <video
              className="h-[78vh] min-h-[520px] w-full object-cover md:h-screen"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={homeContent.hero.videoSrc} type="video/mp4" />
            </video>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/12 to-black/18" />

            <div className="absolute right-4 top-4 z-10 md:right-6 md:top-6">
              <HomeMobileMenu showOnDesktop />
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 px-6 pb-6 md:px-10 md:pb-10">
              <p
                className="text-[0.72rem] uppercase tracking-[0.34em] text-white/72"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                {homeContent.hero.eyebrow}
              </p>
            </div>
          </div>
        </section>
      ) : null}

      {orderedSections.map((section) => renderHomeSection(section.key))}
    </div>
  );
}
