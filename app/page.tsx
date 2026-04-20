import type { Metadata } from "next";
import Link from "next/link";
import { DEFAULT_BRAND_PAGE_CONTENT, normalizeBrandPageContent } from "@/app/brand-philosophy/brand-content";
import {
  DEFAULT_HOME_PAGE_CONTENT,
  getHomeSectionControl,
  getHomeSectionCta,
  normalizeHomePageContent,
  type HomeCardContent,
  type HomeSectionKey,
} from "@/app/home-content";
import HomeCroppedImage from "@/app/HomeCroppedImage";
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

function getHomeCard(
  cards: HomeCardContent[],
  key: string,
  fallback: Omit<HomeCardContent, "key">,
): HomeCardContent {
  const card = cards.find((item) => item.key === key);
  return {
    key,
    label: card?.label ?? fallback.label,
    title: card?.title || fallback.title,
    description: card?.description ?? fallback.description,
    meta: card?.meta ?? fallback.meta,
    href: card?.href || fallback.href,
    ctaLabel: card?.ctaLabel ?? fallback.ctaLabel,
    image: {
      src: card?.image.src || fallback.image.src,
      alt: card?.image.alt || fallback.image.alt,
      scale: card?.image.scale ?? fallback.image.scale,
      x: card?.image.x ?? fallback.image.x,
      y: card?.image.y ?? fallback.image.y,
    },
  };
}

const homeResearchImageFrames = [
  { heightClass: "h-[390px]", objectPosition: "center center" },
  { heightClass: "h-[240px]", objectPosition: "center center" },
  { heightClass: "h-[320px]", objectPosition: "50% 42%" },
  { heightClass: "h-[340px]", objectPosition: "50% 38%" },
];

function getHomeResearchImageFrame(
  video: HeartfeltVideoItem,
  index: number,
): { heightClass: string; objectPosition: string } {
  const fallback = homeResearchImageFrames[index % homeResearchImageFrames.length];

  return {
    heightClass: video.homeImage?.heightClass || fallback.heightClass,
    objectPosition: video.homeImage?.objectPosition || fallback.objectPosition,
  };
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
            className="relative border-b border-black/10 bg-[#f7f7f2]"
          >
            <div className="absolute right-4 top-4 z-10 md:right-6 md:top-6">
              <HomeMobileMenu showOnDesktop />
            </div>

            <div className="mx-auto grid max-w-[1680px] lg:grid-cols-[0.42fr_0.58fr]">
              <div className="relative isolate min-h-[320px] overflow-hidden border-b border-black/10 bg-[#1b1815] md:min-h-[380px] lg:min-h-[420px] lg:border-b-0 lg:border-r">
                {homeContent.hero.visible ? (
                  <>
                    <video
                      className="h-full min-h-[320px] w-full object-cover md:min-h-[380px] lg:min-h-[420px]"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    >
                      <source src={homeContent.hero.videoSrc} type="video/mp4" />
                    </video>
                    <div className="pointer-events-none absolute inset-0 bg-gray-500/20" />
                  </>
                ) : null}
              </div>

              <div className="flex min-h-[320px] flex-col justify-center px-6 py-10 md:min-h-[380px] md:px-10 lg:min-h-[420px] lg:px-16">
                <div className="max-w-[32rem]">
                  <h1
                    className="text-[1.55rem] leading-[0.96] tracking-[-0.055em] text-black md:text-[2.7rem] xl:text-[3.3rem]"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {homeContent.brandTitle}
                    <br />
                    {homeContent.brandSubtitle}
                  </h1>
                  <p
                    className="mt-6 text-[0.78rem] uppercase tracking-[0.26em] text-black/38"
                    style={{ fontFamily: "var(--font-geist-sans)" }}
                  >
                    {homeContent.mainDescription}
                  </p>
                </div>
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

      case "researchExhibitions": {
        const lockedResearchExhibitionFrames = [
          { heightClass: "h-[176px]", objectPosition: "center center" },
          { heightClass: "h-[330px]", objectPosition: "center center" },
          { heightClass: "h-[323px]", objectPosition: "50% 42%" },
          { heightClass: "h-[162px]", objectPosition: "50% 38%" },
        ];

        return (
          <section
            key={sectionKey}
            className="bg-white px-6 pb-20 pt-20 md:px-8 md:pb-20 md:pt-24"
          >
            <div className="mx-auto w-full max-w-[1020px]">
              <div className="mx-auto max-w-3xl text-center">
                <h2
                  className="text-[2.55rem] uppercase leading-none tracking-[0.25em] text-black md:text-[3.65rem]"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  {researchControl.title}
                </h2>
                <div className="h-5" aria-hidden="true" />
              </div>

              <div className="mt-5 grid w-full items-start gap-x-8 gap-y-20 md:grid-cols-2 xl:hidden">
                {researchItems.map((video, index) => {
                  const homeImageFrame = getHomeResearchImageFrame(
                    video,
                    index,
                  );
                  const card = getHomeCard(homeContent.cards.research, video.tag, {
                    label: "Research",
                    title: video.title,
                    description: video.description,
                    meta: `${video.category} · ${video.duration}`,
                    href: researchCardHref(video),
                    ctaLabel: "",
                    image: {
                      src: video.image,
                      alt: video.title,
                      scale: 1,
                      x: 0,
                      y: 0,
                    },
                  });

                  return (
                    <Link
                      key={video.tag}
                      href={card.href}
                      className="group block w-full min-w-0 self-start"
                    >
                      <div
                        className={[
                          "relative w-full overflow-hidden bg-zinc-200 after:absolute after:inset-0 after:bg-black/40 after:opacity-0 after:transition-opacity group-hover:after:opacity-100",
                          homeImageFrame.heightClass,
                        ].join(" ")}
                      >
                        <HomeCroppedImage
                          image={card.image}
                          fallbackSrc={video.image}
                          fallbackAlt={video.title}
                          sizes="(min-width: 1536px) 321px, (min-width: 1280px) calc((100vw - 200px) / 4), (min-width: 768px) calc((100vw - 112px) / 2), calc(100vw - 48px)"
                        />
                      </div>
                      <div className="mt-4">
                        <span
                          className="inline-flex border border-black/12 bg-[#fbfbf8] px-2 py-0.5 text-[0.64rem] uppercase tracking-[0.22em] text-black/48"
                          style={{ fontFamily: "var(--font-geist-sans)" }}
                        >
                          {card.label}
                        </span>
                        <h3
                          className="mt-3 text-[1.32rem] leading-[1.22] tracking-[-0.02em] text-black md:text-[1.48rem]"
                          style={{ fontFamily: "var(--font-noto-serif)" }}
                        >
                          {card.title}
                        </h3>
                        <p
                          className="mt-2.5 text-[0.94rem] leading-[1.72] text-black/52"
                          style={{ fontFamily: "var(--font-noto-serif)" }}
                        >
                          {card.description}
                        </p>
                        <p
                          className="mt-4 text-[0.68rem] uppercase tracking-[0.2em] text-black/58"
                          style={{ fontFamily: "var(--font-geist-sans)" }}
                        >
                          {card.meta}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div
                className="mt-5 hidden items-start justify-center xl:grid"
                style={{
                  gridTemplateColumns: "241px 241px 241px 241px",
                  columnGap: "18px",
                  rowGap: "72px",
                }}
              >
                {researchItems.map((video, index) => {
                  const frame =
                    lockedResearchExhibitionFrames[
                      index % lockedResearchExhibitionFrames.length
                    ];
                  const card = getHomeCard(homeContent.cards.research, video.tag, {
                    label: "Research",
                    title: video.title,
                    description: video.description,
                    meta: `${video.category} · ${video.duration}`,
                    href: researchCardHref(video),
                    ctaLabel: "",
                    image: {
                      src: video.image,
                      alt: video.title,
                      scale: 1,
                      x: 0,
                      y: 0,
                    },
                  });

                  return (
                    <Link
                      key={video.tag}
                      href={card.href}
                      className="group block w-[241px] min-w-[241px] max-w-[241px] self-start"
                    >
                      <div
                        className={[
                          "relative w-[241px] min-w-[241px] max-w-[241px] overflow-hidden bg-zinc-200 after:absolute after:inset-0 after:bg-black/40 after:opacity-0 after:transition-opacity group-hover:after:opacity-100",
                          frame.heightClass,
                        ].join(" ")}
                      >
                        <HomeCroppedImage
                          image={card.image}
                          fallbackSrc={video.image}
                          fallbackAlt={video.title}
                          sizes="241px"
                        />
                      </div>
                      <div className="mt-4">
                        <span
                          className="inline-flex border border-black/12 bg-[#fbfbf8] px-2 py-0.5 text-[0.64rem] uppercase tracking-[0.22em] text-black/48"
                          style={{ fontFamily: "var(--font-geist-sans)" }}
                        >
                          {card.label}
                        </span>
                        <h3
                          className="mt-3 text-[1.32rem] leading-[1.22] tracking-[-0.02em] text-black md:text-[1.48rem]"
                          style={{ fontFamily: "var(--font-noto-serif)" }}
                        >
                          {card.title}
                        </h3>
                        <p
                          className="mt-2.5 text-[0.94rem] leading-[1.72] text-black/52"
                          style={{ fontFamily: "var(--font-noto-serif)" }}
                        >
                          {card.description}
                        </p>
                        <p
                          className="mt-4 text-[0.68rem] uppercase tracking-[0.2em] text-black/58"
                          style={{ fontFamily: "var(--font-geist-sans)" }}
                        >
                          {card.meta}
                        </p>
                      </div>
                    </Link>
                  );
                })}
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
      }

      case "groupTherapyGallery":
        return (
          <section key={sectionKey} className="bg-white px-6 pb-20 pt-0 md:px-10 md:pb-20 md:pt-0">
            <div className="mx-auto max-w-[1020px]">
              <div className="mx-auto max-w-3xl text-center">
                <h2
                  className="whitespace-nowrap text-[2rem] uppercase leading-none tracking-[0.12em] text-black md:text-[3rem] xl:text-[3.35rem]"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  {galleryControl.title}
                </h2>
                <div className="h-5" aria-hidden="true" />
              </div>

              <div className="mx-auto mt-5 grid max-w-[1020px] items-start gap-x-8 gap-y-24 md:grid-cols-2 xl:hidden">
                {galleryItems.map((group, index) => {
                  const card = getHomeCard(homeContent.cards.groups, group.slug, {
                    label: group.subtitle,
                    title: group.title,
                    description: group.description,
                    meta: "Open for inquiry",
                    href: groupCardHref(group),
                    ctaLabel: "",
                    image: {
                      src: group.image,
                      alt: group.title,
                      scale: 1,
                      x: 0,
                      y: 0,
                    },
                  });

                  return (
                    <Link
                      key={group.slug}
                      href={card.href}
                      className="group block w-full"
                    >
                      <div className={["relative overflow-hidden bg-zinc-200 after:absolute after:inset-0 after:bg-black/40 after:opacity-0 after:transition-opacity group-hover:after:opacity-100", getGalleryImageAspectClass(index)].join(" ")}>
                        <HomeCroppedImage
                          image={card.image}
                          fallbackSrc={group.image}
                          fallbackAlt={group.title}
                          sizes="(min-width: 1280px) 352px, (min-width: 768px) 42vw, 100vw"
                          className="transition duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="mt-5">
                        <h3
                          className="text-[1.32rem] leading-[1.22] tracking-[-0.02em] text-black md:text-[1.48rem]"
                          style={{ fontFamily: "var(--font-noto-serif)" }}
                        >
                          {card.title}
                        </h3>
                        <p
                          className="mt-3 text-[0.74rem] uppercase tracking-[0.18em] text-black/42"
                          style={{ fontFamily: "var(--font-geist-sans)" }}
                        >
                          {card.label}
                        </p>
                        <p
                          className="mt-4 text-[0.94rem] leading-[1.75] text-black/52"
                          style={{ fontFamily: "var(--font-noto-serif)" }}
                        >
                          {card.description}
                        </p>
                        <p
                          className="mt-5 text-[0.68rem] uppercase tracking-[0.2em] text-black/58"
                          style={{ fontFamily: "var(--font-geist-sans)" }}
                        >
                          {card.meta}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div
                className="mx-auto mt-5 hidden max-w-[1020px] items-start justify-center xl:grid"
                style={{
                  gridTemplateColumns: "241px 241px 241px 241px",
                  columnGap: "18px",
                  rowGap: "72px",
                }}
              >
                {galleryItems.map((group) => {
                  const card = getHomeCard(homeContent.cards.groups, group.slug, {
                    label: group.subtitle,
                    title: group.title,
                    description: group.description,
                    meta: "Open for inquiry",
                    href: groupCardHref(group),
                    ctaLabel: "",
                    image: {
                      src: group.image,
                      alt: group.title,
                      scale: 1,
                      x: 0,
                      y: 0,
                    },
                  });

                  return (
                    <Link
                      key={group.slug}
                      href={card.href}
                      className="group block w-[241px] min-w-[241px] max-w-[241px]"
                    >
                      <div className="relative h-[323px] w-[241px] min-w-[241px] max-w-[241px] overflow-hidden bg-zinc-200 after:absolute after:inset-0 after:bg-black/40 after:opacity-0 after:transition-opacity group-hover:after:opacity-100">
                        <HomeCroppedImage
                          image={card.image}
                          fallbackSrc={group.image}
                          fallbackAlt={group.title}
                          sizes="241px"
                          className="transition duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="mt-5">
                        <h3
                          className="text-[1.32rem] leading-[1.22] tracking-[-0.02em] text-black md:text-[1.48rem]"
                          style={{ fontFamily: "var(--font-noto-serif)" }}
                        >
                          {card.title}
                        </h3>
                        <p
                          className="mt-3 text-[0.74rem] uppercase tracking-[0.18em] text-black/42"
                          style={{ fontFamily: "var(--font-geist-sans)" }}
                        >
                          {card.label}
                        </p>
                        <p
                          className="mt-4 text-[0.94rem] leading-[1.75] text-black/52"
                          style={{ fontFamily: "var(--font-noto-serif)" }}
                        >
                          {card.description}
                        </p>
                        <p
                          className="mt-5 text-[0.68rem] uppercase tracking-[0.2em] text-black/58"
                          style={{ fontFamily: "var(--font-geist-sans)" }}
                        >
                          {card.meta}
                        </p>
                      </div>
                    </Link>
                  );
                })}
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
        {
          const supportIdentityCard = getHomeCard(homeContent.cards.support, "identity", {
            label: "",
            title: supportIdentityCta.label,
            description: "先理解 Ho-Se 好勢 Ong-Lai 旺來的品牌身份、主體與背後的心理學實踐。",
            meta: "",
            href: supportIdentityCta.href,
            ctaLabel: "",
            image: {
              src: supportIdentityImage,
              alt: director.nameZh,
              scale: 1,
              x: 0,
              y: 0,
            },
          });
          const supportResearchCard = getHomeCard(homeContent.cards.support, "research", {
            label: "",
            title: supportResearchCta.label,
            description:
              supportProject?.researchAudiencePurpose ||
              "目前開放的研究會導向研究專屬 Google Form，讓參與者可以閱讀說明後再填寫資料。",
            meta: "",
            href: supportResearchCta.href,
            ctaLabel: "",
            image: {
              src: supportResearchImage,
              alt: supportProject?.title || "Participate in research",
              scale: 1,
              x: 0,
              y: 0,
            },
          });

        return (
          <section key={sectionKey} className="bg-white px-6 pb-16 pt-0 md:px-10 md:pb-24 md:pt-0">
            <div className="mx-auto max-w-[1020px]">
              <div className="mx-auto max-w-4xl text-center">
                <h2
                  className="text-[2.75rem] uppercase leading-none tracking-[0.24em] text-black md:text-[4rem]"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  {supportControl.title}
                </h2>
              </div>

              <div className="mt-14 grid gap-8 lg:grid-cols-2">
                <Link href={supportIdentityCard.href} className="group block">
                  <div className="relative aspect-[1.72] overflow-hidden bg-zinc-200 after:absolute after:inset-0 after:bg-black/40 after:opacity-0 after:transition-opacity group-hover:after:opacity-100">
                    <HomeCroppedImage
                      image={supportIdentityCard.image}
                      fallbackSrc={supportIdentityImage}
                      fallbackAlt={director.nameZh}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <h3
                    className="mt-6 text-[2rem] leading-tight tracking-[-0.035em] text-black"
                    style={{ fontFamily: "var(--font-noto-serif)" }}
                  >
                    {supportIdentityCard.title}
                  </h3>
                  <p
                    className="mt-3 max-w-[40rem] text-[1rem] leading-[1.75] text-black/56"
                    style={{ fontFamily: "var(--font-noto-serif)" }}
                  >
                    {supportIdentityCard.description}
                  </p>
                </Link>

                <Link href={supportResearchCard.href} className="group block">
                  <div className="relative aspect-[1.72] overflow-hidden bg-zinc-200 after:absolute after:inset-0 after:bg-black/40 after:opacity-0 after:transition-opacity group-hover:after:opacity-100">
                    <HomeCroppedImage
                      image={supportResearchCard.image}
                      fallbackSrc={supportResearchImage}
                      fallbackAlt={supportProject?.title || "Participate in research"}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <h3
                    className="mt-6 text-[2rem] leading-tight tracking-[-0.035em] text-black"
                    style={{ fontFamily: "var(--font-noto-serif)" }}
                  >
                    {supportResearchCard.title}
                  </h3>
                  <p
                    className="mt-3 max-w-[40rem] text-[1rem] leading-[1.75] text-black/56"
                    style={{ fontFamily: "var(--font-noto-serif)" }}
                  >
                    {supportResearchCard.description}
                  </p>
                </Link>
              </div>
            </div>
          </section>
        );
        }

      default:
        return null;
    }
  }

  return (
    <div className="w-full bg-[#f7f7f2] text-neutral-950">
      {orderedSections.map((section) => renderHomeSection(section.key))}
    </div>
  );
}
