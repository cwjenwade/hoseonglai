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
    eyebrow: "",
    title: "Ho-Se 好勢",
    description: "",
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
    eyebrow: "",
    title: "RESEARCH",
    description: "",
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
    eyebrow: "",
    title: "GROUP COUNSELING",
    description: "",
    selectedIds: ["1", "2", "group-mnt7oxhc", "group-mnt7r4p6"],
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
    eyebrow: "",
    title: "Support Us",
    description: "",
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
        key: "1",
        label: "A Support Group for Trans and Gender Diverse People",
        title: "跨性別支持團體「我成為我，不需要被允許」",
        description:
          "為跨性別與多元性別者提供安全且可安心交流的支持空間，陪伴成員整理性別認同、自我關係、身體經驗與社會處境，逐步建立更穩定的自我感與生活位置。",
        meta: "Open for inquiry",
        href: "/togetherness/1",
        ctaLabel: "",
        image: {
          src: "https://a4g4ds4vkqtoundz.public.blob.vercel-storage.com/site-content/images/togetherness_groups/1775844960330-e5e67bed-058a-48a8-8cb3-a75fd177b50b.png",
          alt: "跨性別支持團體「我成為我，不需要被允許」",
          scale: 1,
          x: 0,
          y: 0,
        },
      },
      {
        key: "2",
        label: "A Support Group for Sexual Minority Men",
        title: "性少數男性支持團體「擁有親密的人際關係」",
        description:
          "為性少數男性提供一個能安心說話、探索自我、整理情感與關係經驗的支持空間，在不需迎合期待的狀態下，慢慢靠近更真實的自己。",
        meta: "Open for inquiry",
        href: "/togetherness/2",
        ctaLabel: "",
        image: {
          src: "https://a4g4ds4vkqtoundz.public.blob.vercel-storage.com/site-content/images/togetherness_groups/1775842004090-1d1e3460-be3f-453b-961c-1c785524c304.png",
          alt: "性少數男性支持團體「擁有親密的人際關係」",
          scale: 1,
          x: 0,
          y: 0,
        },
      },
      {
        key: "group-mnt7oxhc",
        label: "An Interpersonal Group for Indigenous Sexual Minority Men",
        title: "原住民性少數男性人際團體「有些話，不用解釋太多也會被懂」",
        description:
          "以原住民性少數男性為主體，陪伴成員在人際關係中練習信任、表達、靠近與界線，整理文化處境、性別經驗與關係互動中的壓力，發展更自在且不必過度防備的連結方式。",
        meta: "Open for inquiry",
        href: "/togetherness/group-mnt7oxhc",
        ctaLabel: "",
        image: {
          src: "https://a4g4ds4vkqtoundz.public.blob.vercel-storage.com/site-content/images/togetherness_groups/1775843986589-aee277a4-5f05-44c6-ad05-e163d6de47db.png",
          alt: "原住民性少數男性人際團體「有些話，不用解釋太多也會被懂」",
          scale: 1,
          x: 0,
          y: 0,
        },
      },
      {
        key: "group-mnt7r4p6",
        label: "A Relationship Group for Gay Men Focused on Attachment and Intimacy",
        title: "男同志依附與親密關係團體「不是沒人愛，只是很難安心去愛」",
        description:
          "聚焦男同志在親密關係中的焦慮、逃避、患得患失與自我保護，協助成員理解依附經驗如何影響關係，建立更有安全感的連結。",
        meta: "Open for inquiry",
        href: "/togetherness/group-mnt7r4p6",
        ctaLabel: "",
        image: {
          src: "https://a4g4ds4vkqtoundz.public.blob.vercel-storage.com/site-content/images/togetherness_groups/1775844792204-40957fe2-28fe-447d-912d-6ce7401906f6.png",
          alt: "男同志依附與親密關係團體「不是沒人愛，只是很難安心去愛」",
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
