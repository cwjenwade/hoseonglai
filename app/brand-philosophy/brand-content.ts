import { TEAM_MEMBERS, type TeamMember } from "./team-data";

export type BrandDirector = {
  photo: string;
  nameZh: string;
  nameEn: string;
  affiliationLines: string[];
  introParagraphs: string[];
};

export type BrandPageContent = {
  director: BrandDirector;
  teamMembers: TeamMember[];
};

export const DEFAULT_BRAND_PAGE_CONTENT: BrandPageContent = {
  director: {
    photo: "",
    nameZh: "任祈蔚",
    nameEn: "Jen Chi-Wei",
    affiliationLines: [
      "Licensed Counselor",
      "Ph.D. Program in Clinical Psychology",
      "National Taiwan University",
      "諮商心理師",
      "台灣大學臨床心理博士研究生",
    ],
    introParagraphs: [
      "負責整體品牌概念、內容方向、視覺語言與對外表述，將心理學研究、團體實踐與文化內容整理為一致的品牌敘事。",
      "在 Ho-Se 好勢 Ong-Lai 旺來之中，品牌不是附加層，而是研究、文化與人際連結之間的一個共同界面。",
    ],
  },
  teamMembers: TEAM_MEMBERS,
};
