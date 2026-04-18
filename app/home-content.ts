import type { ContentGovernanceFields } from "@/lib/content-governance";

export type HomeFeatureCard = {
  href: string;
  title: string;
  description: string;
};

export type HomeUpdateCard = {
  id: string;
  tag: string;
  title: string;
  href?: string;
};

export type HomeCallToAction = {
  href: string;
  label: string;
  variant: "primary" | "secondary" | "tertiary";
};

export type HomePageContent = ContentGovernanceFields & {
  title: string;
  platformFeatures: HomeFeatureCard[];
  recentUpdates: HomeUpdateCard[];
  primaryCallToActions: HomeCallToAction[];
};

export const DEFAULT_HOME_PAGE_CONTENT: HomePageContent = {
  title: "首頁",
  isPublished: true,
  displayOrder: 0,
  updatedAt: "",
  internalNote: "",
  platformFeatures: [
    {
      href: "/research-in-5-minutes",
      title: "5分鐘研究",
      description: "學術研究成果之精簡轉譯與知識傳播路徑。",
    },
    {
      href: "/participant-recruitment",
      title: "受試者招募",
      description: "研究樣本庫建置與實證資料蒐集機制。",
    },
    {
      href: "/cultural-products",
      title: "文創商品",
      description: "文化概念物質化之載體開發與流通介面。",
    },
    {
      href: "/group-therapy",
      title: "團體心理治療",
      description: "心理治療專業知識與臨床資源之整合節點。",
    },
  ],
  recentUpdates: [
    {
      id: "1",
      tag: "研究發布",
      title: "人際依附傾向與團體動力之交互作用測量",
    },
    {
      id: "2",
      tag: "受試招募",
      title: "伴侶關係衝突因應機制之縱貫性研究",
    },
    {
      id: "3",
      tag: "知識分享",
      title: "團體心理治療中凝聚力發展之階段性特徵",
    },
  ],
  primaryCallToActions: [
    {
      href: "/join-research",
      label: "加入研究",
      variant: "primary",
    },
    {
      href: "/group-therapy-info",
      label: "了解團體諮商",
      variant: "secondary",
    },
    {
      href: "/watch-5mins",
      label: "觀看研究5mins",
      variant: "tertiary",
    },
  ],
};

export function normalizeHomePageContent(
  value: Partial<HomePageContent> | null | undefined,
): HomePageContent {
  return {
    title: String(value?.title || DEFAULT_HOME_PAGE_CONTENT.title).trim() || "首頁",
    isPublished: value?.isPublished !== false,
    displayOrder:
      Number.isFinite(Number(value?.displayOrder))
        ? Number(value?.displayOrder)
        : DEFAULT_HOME_PAGE_CONTENT.displayOrder || 0,
    updatedAt: String(value?.updatedAt || "").trim(),
    internalNote: String(value?.internalNote || "").trim(),
    platformFeatures: Array.isArray(value?.platformFeatures)
      ? value.platformFeatures
          .map((item) => ({
            href: String(item?.href || "").trim(),
            title: String(item?.title || "").trim(),
            description: String(item?.description || "").trim(),
          }))
          .filter((item) => item.href && item.title && item.description)
      : DEFAULT_HOME_PAGE_CONTENT.platformFeatures,
    recentUpdates: Array.isArray(value?.recentUpdates)
      ? value.recentUpdates
          .map((item, index) => ({
            id: String(item?.id || `update-${index + 1}`).trim(),
            tag: String(item?.tag || "").trim(),
            title: String(item?.title || "").trim(),
            href: String(item?.href || "").trim() || undefined,
          }))
          .filter((item) => item.id && item.tag && item.title)
      : DEFAULT_HOME_PAGE_CONTENT.recentUpdates,
    primaryCallToActions: Array.isArray(value?.primaryCallToActions)
      ? value.primaryCallToActions
          .map((item) => {
            const variant: HomeCallToAction["variant"] =
              item?.variant === "secondary" || item?.variant === "tertiary"
                ? item.variant
                : "primary";
            return {
              href: String(item?.href || "").trim(),
              label: String(item?.label || "").trim(),
              variant,
            };
          })
          .filter((item) => item.href && item.label)
      : DEFAULT_HOME_PAGE_CONTENT.primaryCallToActions,
  };
}
