export const CONTENT_MODULES = [
  {
    key: "home",
    title: "Home",
    description: "首頁 hero、section 顯示排序、選取項目與首頁 CTA 控制層。",
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
    title: "Research Workspace",
    description: "單一研究工作台，整合 project settings、consent 與 Google Form 導流。",
    singleton: false,
    createLabel: "新增研究專案",
  },
] as const;

export type ContentModuleKey = (typeof CONTENT_MODULES)[number]["key"];

export function isContentModuleKey(value: string): value is ContentModuleKey {
  return CONTENT_MODULES.some((module) => module.key === value);
}
