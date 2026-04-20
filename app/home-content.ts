import type { ContentGovernanceFields } from "@/lib/content-governance";

export const HOME_SECTION_KEYS = [
  "positioningBanner",
  "researchExhibitions",
  "groupTherapyGallery",
  "supportUs",
] as const;

export type HomeSectionKey = (typeof HOME_SECTION_KEYS)[number];

export const HOME_SECTION_DISPLAY_MODES = [
  "banner",
  "exhibitionGrid",
  "galleryGrid",
  "supportGrid",
] as const;

export type HomeSectionDisplayMode = (typeof HOME_SECTION_DISPLAY_MODES)[number];

export type HomeHeroControl = {
  visible: boolean;
  videoSrc: string;
  eyebrow: string;
};

export type HomeSectionCallToAction = {
  key: string;
  href: string;
  label: string;
};

export type HomeSectionControl = {
  key: HomeSectionKey;
  visible: boolean;
  order: number;
  displayMode: HomeSectionDisplayMode;
  eyebrow: string;
  title: string;
  description: string;
  selectedIds: string[];
  ctas: HomeSectionCallToAction[];
};

export type HomePageContent = ContentGovernanceFields & {
  title: string;
  hero: HomeHeroControl;
  sections: HomeSectionControl[];
};

export const HOME_SECTION_SELECTED_ID_HINTS: Record<HomeSectionKey, string> = {
  positioningBanner: "此 banner 不選內容本體；留空即可。eyebrow / title / description 只控制首頁定位文案。",
  researchExhibitions:
    "使用 research video tag，每行一筆，例如 alexithymia。留空或找不到時，首頁會 fallback 顯示前 4 筆 research videos。",
  groupTherapyGallery:
    "使用 group slug，每行一筆，例如 group-counseling。留空或找不到時，首頁會 fallback 顯示可見 group therapy 項目。",
  supportUs:
    "使用 project:{project id} 指定參與研究入口，例如 project:emotion-patterns。留空或找不到時，首頁會 fallback 顯示第一筆已發布 research project。",
};

const HOME_SECTION_LEGACY_KEY_ALIASES: Record<HomeSectionKey, string[]> = {
  positioningBanner: ["brandIntro"],
  researchExhibitions: ["research"],
  groupTherapyGallery: ["gatherings"],
  supportUs: ["programsCollaborations", "about"],
};

const DEFAULT_HOME_SECTIONS: HomeSectionControl[] = [
  {
    key: "positioningBanner",
    visible: true,
    order: 10,
    displayMode: "banner",
    eyebrow: "Brand Platform",
    title: "Ho-Se 好勢｜Ong-Lai 旺來",
    description:
      "以心理學研究、創作內容、團體陪伴與協作實踐，建立一個可以閱讀、參與與停留的品牌平台。",
    selectedIds: [],
    ctas: [
      {
        key: "research",
        href: "/heartfelt-momentum",
        label: "See research",
      },
      {
        key: "groups",
        href: "/togetherness",
        label: "Join a group",
      },
    ],
  },
  {
    key: "researchExhibitions",
    visible: true,
    order: 20,
    displayMode: "exhibitionGrid",
    eyebrow: "Research output",
    title: "Exhibitions",
    description: "以作品式展陳呈現團隊的研究影片與心理學轉譯內容。",
    selectedIds: ["alexithymia", "emotion differentiation", "group process", "empathy"],
    ctas: [
      {
        key: "primary",
        href: "/heartfelt-momentum",
        label: "See more research",
      },
    ],
  },
  {
    key: "groupTherapyGallery",
    visible: true,
    order: 30,
    displayMode: "galleryGrid",
    eyebrow: "Group therapy",
    title: "Galleries",
    description: "像走進一間 gallery，一起找到可以停留、回應與被陪伴的團體。",
    selectedIds: ["group-counseling", "group-psychotherapy", "interpersonal-group"],
    ctas: [
      {
        key: "primary",
        href: "/togetherness",
        label: "Visit group therapy",
      },
    ],
  },
  {
    key: "supportUs",
    visible: true,
    order: 40,
    displayMode: "supportGrid",
    eyebrow: "Support us",
    title: "Support Us",
    description: "透過理解品牌身份，或參與目前開放的研究，一起支持這個平台繼續發生。",
    selectedIds: ["project:emotion-patterns"],
    ctas: [
      {
        key: "identity",
        href: "/brand-philosophy",
        label: "Brand identity",
      },
      {
        key: "research",
        href: "/collaborative-prosperity",
        label: "Participate in research",
      },
    ],
  },
];

export const DEFAULT_HOME_PAGE_CONTENT: HomePageContent = {
  title: "首頁",
  isPublished: true,
  displayOrder: 0,
  updatedAt: "",
  internalNote: "",
  hero: {
    visible: true,
    videoSrc: "/idenxhose.mp4",
    eyebrow: "Ho-Se 好勢 / Ong-Lai 旺來",
  },
  sections: DEFAULT_HOME_SECTIONS,
};

function normalizeBoolean(value: unknown, fallback: boolean): boolean {
  return typeof value === "boolean" ? value : fallback;
}

function normalizeDisplayMode(
  value: unknown,
  fallback: HomeSectionDisplayMode,
): HomeSectionDisplayMode {
  const displayMode = String(value || "").trim();
  return HOME_SECTION_DISPLAY_MODES.includes(displayMode as HomeSectionDisplayMode)
    ? (displayMode as HomeSectionDisplayMode)
    : fallback;
}

function normalizeSelectedIds(value: unknown, fallback: string[]): string[] {
  if (!Array.isArray(value)) return fallback;

  return value
    .map((item) => String(item || "").trim())
    .filter(Boolean);
}

function normalizeString(value: unknown, fallback: string): string {
  const text = String(value || "").trim();
  return text || fallback;
}

function normalizeCtas(
  value: unknown,
  fallback: HomeSectionCallToAction[],
): HomeSectionCallToAction[] {
  if (!Array.isArray(value)) return fallback;

  const ctas = value
    .map((item, index) => {
      if (!item || typeof item !== "object") return null;
      const candidate = item as Partial<HomeSectionCallToAction>;
      const key = String(candidate.key || `cta-${index + 1}`).trim();
      const href = String(candidate.href || "").trim();
      const label = String(candidate.label || "").trim();

      if (!key || !href || !label) return null;
      return { key, href, label };
    })
    .filter((item): item is HomeSectionCallToAction => item !== null);

  return ctas.length > 0 ? ctas : fallback;
}

function normalizeSectionControl(
  value: unknown,
  fallback: HomeSectionControl,
): HomeSectionControl {
  const candidate =
    value && typeof value === "object"
      ? (value as Partial<HomeSectionControl>)
      : {};

  return {
    key: fallback.key,
    visible: normalizeBoolean(candidate.visible, fallback.visible),
    order: Number.isFinite(Number(candidate.order))
      ? Number(candidate.order)
      : fallback.order,
    displayMode: normalizeDisplayMode(candidate.displayMode, fallback.displayMode),
    eyebrow: normalizeString(candidate.eyebrow, fallback.eyebrow),
    title: normalizeString(candidate.title, fallback.title),
    description: normalizeString(candidate.description, fallback.description),
    selectedIds: normalizeSelectedIds(candidate.selectedIds, fallback.selectedIds),
    ctas: normalizeCtas(candidate.ctas, fallback.ctas),
  };
}

function findRawSectionForFallback(
  rawSections: Array<Partial<HomeSectionControl> | undefined>,
  fallback: HomeSectionControl,
): Partial<HomeSectionControl> | undefined {
  return rawSections.find((section) => {
    const rawKey = String(section?.key || "").trim();
    return (
      rawKey === fallback.key ||
      HOME_SECTION_LEGACY_KEY_ALIASES[fallback.key].includes(rawKey)
    );
  });
}

export function getHomeSectionControl(
  content: HomePageContent,
  key: HomeSectionKey,
): HomeSectionControl {
  return (
    content.sections.find((section) => section.key === key) ||
    DEFAULT_HOME_PAGE_CONTENT.sections.find((section) => section.key === key)!
  );
}

export function getHomeSectionCta(
  section: HomeSectionControl,
  key = "primary",
): HomeSectionCallToAction {
  const fallbackSection = DEFAULT_HOME_PAGE_CONTENT.sections.find(
    (item) => item.key === section.key,
  );
  const fallback =
    fallbackSection?.ctas.find((item) => item.key === key) ||
    fallbackSection?.ctas[0] ||
    { key, href: "#", label: "" };

  return section.ctas.find((item) => item.key === key) || fallback;
}

export function normalizeHomePageContent(
  value: Partial<HomePageContent> | null | undefined,
): HomePageContent {
  const rawSections = Array.isArray(value?.sections) ? value.sections : [];

  return {
    title: String(value?.title || DEFAULT_HOME_PAGE_CONTENT.title).trim() || "首頁",
    isPublished: value?.isPublished !== false,
    displayOrder:
      Number.isFinite(Number(value?.displayOrder))
        ? Number(value?.displayOrder)
        : DEFAULT_HOME_PAGE_CONTENT.displayOrder || 0,
    updatedAt: String(value?.updatedAt || "").trim(),
    internalNote: String(value?.internalNote || "").trim(),
    hero: {
      visible: normalizeBoolean(value?.hero?.visible, DEFAULT_HOME_PAGE_CONTENT.hero.visible),
      videoSrc:
        String(value?.hero?.videoSrc || DEFAULT_HOME_PAGE_CONTENT.hero.videoSrc).trim() ||
        DEFAULT_HOME_PAGE_CONTENT.hero.videoSrc,
      eyebrow:
        String(value?.hero?.eyebrow || DEFAULT_HOME_PAGE_CONTENT.hero.eyebrow).trim() ||
        DEFAULT_HOME_PAGE_CONTENT.hero.eyebrow,
    },
    sections: DEFAULT_HOME_SECTIONS.map((fallback) =>
      normalizeSectionControl(
        findRawSectionForFallback(rawSections, fallback),
        fallback,
      ),
    ).sort((left, right) => left.order - right.order),
  };
}
