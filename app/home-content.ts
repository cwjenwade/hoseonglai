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

export type HomeImageCrop = {
  src: string;
  alt: string;
  scale: number;
  x: number;
  y: number;
};

export type HomeCardContent = {
  key: string;
  label: string;
  title: string;
  description: string;
  meta: string;
  href: string;
  ctaLabel: string;
  image: HomeImageCrop;
};

export type HomeNewsletterContent = {
  title: string;
  description: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  buttonLabel: string;
  loadingLabel: string;
  successTitle: string;
  successDescription: string;
};

export type HomeFooterContent = {
  brandName: string;
  tagline: string;
  description: string;
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
  brandTitle: string;
  brandSubtitle: string;
  mainDescription: string;
  hero: HomeHeroControl;
  sections: HomeSectionControl[];
  cards: {
    research: HomeCardContent[];
    groups: HomeCardContent[];
    support: HomeCardContent[];
  };
  newsletter: HomeNewsletterContent;
  footer: HomeFooterContent;
};

export const HOME_SECTION_SELECTED_ID_HINTS: Record<HomeSectionKey, string> = {
  positioningBanner: "此 banner 不選內容本體；留空即可。eyebrow / title / description 只控制首頁定位文案。",
  researchExhibitions:
    "使用 research video tag，每行一筆，例如 alexithymia。留空或找不到時，首頁會 fallback 顯示前 4 筆 research videos。",
  groupTherapyGallery:
    "使用首頁實際 group slug，每行一筆；留空或找不到時，首頁會 fallback 顯示目前可見的 group therapy 項目。",
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
    title: "Ho-Se 好勢",
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
    title: "RESEARCH",
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
    title: "GROUP COUNSELING",
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
  brandTitle: "Ho-Se 好勢",
  brandSubtitle: "Ong-Lai 旺來",
  mainDescription: "Research, creative content, community, and collaborative practice",
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
  cards: {
    research: [
      {
        key: "alexithymia",
        label: "Research",
        title: "當情緒失去形狀",
        description: "五分鐘看懂 alexithymia、情緒分化與情緒結構。",
        meta: "研究影片 · 5 分鐘",
        href: "/heartfelt-momentum#alexithymia",
        ctaLabel: "",
        image: {
          src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1200&q=80",
          alt: "當情緒失去形狀",
          scale: 1,
          x: 0,
          y: 0,
        },
      },
      {
        key: "emotion differentiation",
        label: "Research",
        title: "相近情緒為何混在一起",
        description: "從情緒分化理解 sad、regretful、lonely 為何難以拆開。",
        meta: "研究影片 · 5 分鐘",
        href: "/heartfelt-momentum#emotion%20differentiation",
        ctaLabel: "",
        image: {
          src: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=1200&q=80",
          alt: "相近情緒為何混在一起",
          scale: 1,
          x: 0,
          y: 0,
        },
      },
      {
        key: "group process",
        label: "Research",
        title: "情緒如何在團體中擴散",
        description: "團體裡的情緒如何彼此感染、累積與轉變。",
        meta: "研究影片 · 5 分鐘",
        href: "/heartfelt-momentum#group%20process",
        ctaLabel: "",
        image: {
          src: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80",
          alt: "情緒如何在團體中擴散",
          scale: 1,
          x: 0,
          y: 0,
        },
      },
      {
        key: "empathy",
        label: "Research",
        title: "同理是怎麼發生的",
        description: "同理如何從辨識、理解到回應逐步形成。",
        meta: "研究影片 · 5 分鐘",
        href: "/heartfelt-momentum#empathy",
        ctaLabel: "",
        image: {
          src: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80",
          alt: "同理是怎麼發生的",
          scale: 1,
          x: 0,
          y: 0,
        },
      },
    ],
    groups: [
      {
        key: "group-counseling",
        label: "Group Counseling",
        title: "團體諮商",
        description: "在安全且保密的團體中探索情緒與關係。透過傾聽與回饋逐漸理解自己。",
        meta: "Open for inquiry",
        href: "/togetherness/group-counseling",
        ctaLabel: "",
        image: {
          src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop",
          alt: "團體諮商",
          scale: 1,
          x: 0,
          y: 0,
        },
      },
      {
        key: "group-psychotherapy",
        label: "Group Psychotherapy",
        title: "團體心理治療",
        description: "深入探索依附、情緒與關係模式。在互動中建立新的心理經驗。",
        meta: "Open for inquiry",
        href: "/togetherness/group-psychotherapy",
        ctaLabel: "",
        image: {
          src: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=1600&auto=format&fit=crop",
          alt: "團體心理治療",
          scale: 1,
          x: 0,
          y: 0,
        },
      },
      {
        key: "interpersonal-group",
        label: "Interpersonal Process Group",
        title: "人際歷程團體",
        description: "透過即時互動理解人際模式。練習新的表達與關係方式。",
        meta: "Open for inquiry",
        href: "/togetherness/interpersonal-group",
        ctaLabel: "",
        image: {
          src: "https://images.unsplash.com/photo-1529336953121-a0ce2d6a5c6d?q=80&w=1600&auto=format&fit=crop",
          alt: "人際歷程團體",
          scale: 1,
          x: 0,
          y: 0,
        },
      },
    ],
    support: [
      {
        key: "identity",
        label: "",
        title: "Brand identity",
        description: "先理解 Ho-Se 好勢 Ong-Lai 旺來的品牌身份、主體與背後的心理學實踐。",
        meta: "",
        href: "/brand-philosophy",
        ctaLabel: "",
        image: {
          src: "",
          alt: "Brand identity",
          scale: 1,
          x: 0,
          y: 0,
        },
      },
      {
        key: "research",
        label: "",
        title: "Participate in research",
        description: "目前開放的研究會導向研究專屬 Google Form，讓參與者可以閱讀說明後再填寫資料。",
        meta: "",
        href: "/collaborative-prosperity",
        ctaLabel: "",
        image: {
          src: "",
          alt: "Participate in research",
          scale: 1,
          x: 0,
          y: 0,
        },
      },
    ],
  },
  newsletter: {
    title: "訂閱電子報",
    description: "第一時間收到最新講座、研究與心理資源資訊",
    namePlaceholder: "你的名字（選填）",
    emailPlaceholder: "你的 Email",
    buttonLabel: "訂閱",
    loadingLabel: "訂閱中...",
    successTitle: "訂閱成功！",
    successDescription: "感謝你的訂閱，我們會定期寄送資訊給你。",
  },
  footer: {
    brandName: "Ho-Se 好勢 ｜ Ong-Lai 旺來",
    tagline: "以心聚勢，以運旺來，團圓共好",
    description: "Research, creative content, community, and collaborative practice",
  },
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

function normalizeOptionalString(value: unknown, fallback: string): string {
  return typeof value === "string" ? value : fallback;
}

function normalizeNumberInRange(value: unknown, fallback: number, min: number, max: number): number {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(min, number));
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

function normalizeImageCrop(value: unknown, fallback: HomeImageCrop): HomeImageCrop {
  const candidate =
    value && typeof value === "object" ? (value as Partial<HomeImageCrop>) : {};

  return {
    src: normalizeOptionalString(candidate.src, fallback.src).trim(),
    alt: normalizeOptionalString(candidate.alt, fallback.alt).trim(),
    scale: normalizeNumberInRange(candidate.scale, fallback.scale, 0.5, 3),
    x: normalizeNumberInRange(candidate.x, fallback.x, -200, 200),
    y: normalizeNumberInRange(candidate.y, fallback.y, -200, 200),
  };
}

function normalizeCardContent(value: unknown, fallback: HomeCardContent): HomeCardContent {
  const candidate =
    value && typeof value === "object" ? (value as Partial<HomeCardContent>) : {};

  return {
    key: fallback.key,
    label: normalizeOptionalString(candidate.label, fallback.label),
    title: normalizeString(candidate.title, fallback.title),
    description: normalizeOptionalString(candidate.description, fallback.description),
    meta: normalizeOptionalString(candidate.meta, fallback.meta),
    href: normalizeString(candidate.href, fallback.href),
    ctaLabel: normalizeOptionalString(candidate.ctaLabel, fallback.ctaLabel),
    image: normalizeImageCrop(candidate.image, fallback.image),
  };
}

function normalizeCardList(value: unknown, fallback: HomeCardContent[]): HomeCardContent[] {
  const rawItems = Array.isArray(value) ? value : [];
  const fallbackKeys = new Set(fallback.map((item) => item.key));
  const extraCards = rawItems
    .filter((item) => {
      const key = String((item as { key?: unknown })?.key || "").trim();
      return key && !fallbackKeys.has(key);
    })
    .map((item) => {
      const candidate = item as Partial<HomeCardContent>;
      const key = String(candidate.key || "").trim();
      return normalizeCardContent(item, {
        key,
        label: "",
        title: key,
        description: "",
        meta: "",
        href: "#",
        ctaLabel: "",
        image: {
          src: "",
          alt: key,
          scale: 1,
          x: 0,
          y: 0,
        },
      });
    });

  return fallback.map((fallbackCard) => {
    const rawCard = rawItems.find((item) => String((item as { key?: unknown })?.key || "") === fallbackCard.key);
    return normalizeCardContent(rawCard, fallbackCard);
  }).concat(extraCards);
}

function normalizeNewsletter(value: unknown): HomeNewsletterContent {
  const fallback = DEFAULT_HOME_PAGE_CONTENT.newsletter;
  const candidate =
    value && typeof value === "object" ? (value as Partial<HomeNewsletterContent>) : {};

  return {
    title: normalizeString(candidate.title, fallback.title),
    description: normalizeOptionalString(candidate.description, fallback.description),
    namePlaceholder: normalizeString(candidate.namePlaceholder, fallback.namePlaceholder),
    emailPlaceholder: normalizeString(candidate.emailPlaceholder, fallback.emailPlaceholder),
    buttonLabel: normalizeString(candidate.buttonLabel, fallback.buttonLabel),
    loadingLabel: normalizeString(candidate.loadingLabel, fallback.loadingLabel),
    successTitle: normalizeString(candidate.successTitle, fallback.successTitle),
    successDescription: normalizeOptionalString(candidate.successDescription, fallback.successDescription),
  };
}

function normalizeFooter(value: unknown): HomeFooterContent {
  const fallback = DEFAULT_HOME_PAGE_CONTENT.footer;
  const candidate =
    value && typeof value === "object" ? (value as Partial<HomeFooterContent>) : {};

  return {
    brandName: normalizeString(candidate.brandName, fallback.brandName),
    tagline: normalizeOptionalString(candidate.tagline, fallback.tagline),
    description: normalizeOptionalString(candidate.description, fallback.description),
  };
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
    brandTitle:
      String(value?.brandTitle || DEFAULT_HOME_PAGE_CONTENT.brandTitle).trim() ||
      DEFAULT_HOME_PAGE_CONTENT.brandTitle,
    brandSubtitle:
      String(value?.brandSubtitle || DEFAULT_HOME_PAGE_CONTENT.brandSubtitle).trim() ||
      DEFAULT_HOME_PAGE_CONTENT.brandSubtitle,
    mainDescription:
      String(value?.mainDescription || DEFAULT_HOME_PAGE_CONTENT.mainDescription).trim() ||
      DEFAULT_HOME_PAGE_CONTENT.mainDescription,
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
    cards: {
      research: normalizeCardList(value?.cards?.research, DEFAULT_HOME_PAGE_CONTENT.cards.research),
      groups: normalizeCardList(value?.cards?.groups, DEFAULT_HOME_PAGE_CONTENT.cards.groups),
      support: normalizeCardList(value?.cards?.support, DEFAULT_HOME_PAGE_CONTENT.cards.support),
    },
    newsletter: normalizeNewsletter(value?.newsletter),
    footer: normalizeFooter(value?.footer),
  };
}
