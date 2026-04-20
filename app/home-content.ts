import type { ContentGovernanceFields } from "@/lib/content-governance";

export const HOME_SECTION_KEYS = [
  "brandIntro",
  "research",
  "gatherings",
  "programsCollaborations",
  "about",
] as const;

export type HomeSectionKey = (typeof HOME_SECTION_KEYS)[number];

export const HOME_SECTION_DISPLAY_MODES = [
  "statement",
  "feature",
  "featureReverse",
  "split",
  "short",
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
  selectedIds: string[];
  ctas: HomeSectionCallToAction[];
};

export type HomePageContent = ContentGovernanceFields & {
  title: string;
  hero: HomeHeroControl;
  sections: HomeSectionControl[];
};

export const HOME_SECTION_SELECTED_ID_HINTS: Record<HomeSectionKey, string> = {
  brandIntro: "此 section 不選內容本體；留空即可。",
  research: "使用 research video tag，例如 alexithymia。留空或找不到時，沿用首頁既有 research fallback。",
  gatherings: "使用 group slug，例如 group-counseling。留空或找不到時，沿用首頁既有 gatherings fallback。",
  programsCollaborations:
    "每行一筆：lecture:{lecture id 或 slug}、project:{project id}。可只填其中一種；留空或找不到時，沿用首頁既有 programs / collaborations fallback。",
  about: "目前僅支援 director；留空或找不到時，沿用 brand director fallback。",
};

const DEFAULT_HOME_SECTIONS: HomeSectionControl[] = [
  {
    key: "brandIntro",
    visible: true,
    order: 10,
    displayMode: "statement",
    selectedIds: [],
    ctas: [],
  },
  {
    key: "research",
    visible: true,
    order: 20,
    displayMode: "feature",
    selectedIds: ["alexithymia"],
    ctas: [
      {
        key: "primary",
        href: "/heartfelt-momentum",
        label: "Enter Research",
      },
    ],
  },
  {
    key: "gatherings",
    visible: true,
    order: 30,
    displayMode: "featureReverse",
    selectedIds: ["group-counseling"],
    ctas: [
      {
        key: "primary",
        href: "/togetherness",
        label: "Enter Gatherings",
      },
    ],
  },
  {
    key: "programsCollaborations",
    visible: true,
    order: 40,
    displayMode: "split",
    selectedIds: [],
    ctas: [
      {
        key: "programs",
        href: "/fortune-arrives",
        label: "View Programs",
      },
      {
        key: "collaborations",
        href: "/collaborative-prosperity",
        label: "View Collaborations",
      },
    ],
  },
  {
    key: "about",
    visible: true,
    order: 50,
    displayMode: "short",
    selectedIds: ["director"],
    ctas: [
      {
        key: "primary",
        href: "/brand-philosophy",
        label: "View Identity",
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
    selectedIds: normalizeSelectedIds(candidate.selectedIds, fallback.selectedIds),
    ctas: normalizeCtas(candidate.ctas, fallback.ctas),
  };
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
        rawSections.find((section) => section?.key === fallback.key),
        fallback,
      ),
    ).sort((left, right) => left.order - right.order),
  };
}
