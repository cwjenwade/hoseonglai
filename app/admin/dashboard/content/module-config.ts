export const CONTENT_MODULES = [
  {
    key: "home",
    title: "Home",
    description: "首頁功能卡片、最新更新與 CTA 區塊。",
    singleton: true,
    createLabel: "編輯首頁",
  },
  {
    key: "brand",
    title: "Brand",
    description: "品牌頁 director 與團隊內容。",
    singleton: true,
    createLabel: "編輯 Brand",
  },
  {
    key: "research-videos",
    title: "Research Videos",
    description: "有心好勢研究影片卡片。",
    singleton: false,
    createLabel: "新增影片",
  },
  {
    key: "lectures",
    title: "Lectures & Events",
    description: "講座、課程與活動明細。",
    singleton: false,
    createLabel: "新增活動",
  },
  {
    key: "groups",
    title: "Groups",
    description: "團體方案與報名資訊。",
    singleton: false,
    createLabel: "新增方案",
  },
  {
    key: "research-projects",
    title: "Research Projects",
    description: "研究流程模組與參與設定。",
    singleton: false,
    createLabel: "新增研究專案",
  },
  {
    key: "psychometrics",
    title: "Psychometrics",
    description: "量表題庫與量尺設定。",
    singleton: false,
    createLabel: "新增量表",
  },
  {
    key: "consents",
    title: "Consents",
    description: "研究同意書與 PDF 資料。",
    singleton: false,
    createLabel: "新增同意書",
  },
] as const;

export type ContentModuleKey = (typeof CONTENT_MODULES)[number]["key"];

export function isContentModuleKey(value: string): value is ContentModuleKey {
  return CONTENT_MODULES.some((module) => module.key === value);
}
