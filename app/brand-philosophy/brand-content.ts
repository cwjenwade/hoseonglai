import {
  DEFAULT_TEAM_SECTIONS,
  TEAM_MEMBERS,
  TEAM_SECTION_IDS,
  type TeamMember,
  type TeamSection,
  type TeamSectionId,
} from "./team-data";

export type BrandDirector = {
  photo: string;
  nameZh: string;
  nameEn: string;
  affiliationLines: string[];
  introParagraphs: string[];
};

export type BrandPageContent = {
  director: BrandDirector;
  teamSections: TeamSection[];
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
  teamSections: DEFAULT_TEAM_SECTIONS,
  teamMembers: TEAM_MEMBERS,
};

function isTeamSectionId(value: string): value is TeamSectionId {
  return TEAM_SECTION_IDS.includes(value as TeamSectionId);
}

export function normalizeBrandPageContent(content: Partial<BrandPageContent> | null | undefined): BrandPageContent {
  const director = content?.director;
  const rawSections = Array.isArray(content?.teamSections) ? content.teamSections : DEFAULT_TEAM_SECTIONS;
  const rawMembers = Array.isArray(content?.teamMembers) ? content.teamMembers : TEAM_MEMBERS;

  const teamSections = DEFAULT_TEAM_SECTIONS.map((defaultSection) => {
    const matchedSection = rawSections.find((section) => section?.id === defaultSection.id);
    const title = String(matchedSection?.title || defaultSection.title).trim();

    return {
      id: defaultSection.id,
      title: title || defaultSection.title,
    };
  });

  const teamMembers = rawMembers.map((member, index) => {
    const rawSectionId = String(member?.sectionId || "");
    const sectionId = isTeamSectionId(rawSectionId) ? rawSectionId : "strategic_creative_team";

    return {
      id: String(member?.id || `member-${index + 1}`),
      nameZh: String(member?.nameZh || "").trim(),
      nameEn: String(member?.nameEn || "").trim(),
      profession: String(member?.profession || "").trim(),
      role: String(member?.role || "").trim(),
      bio: String(member?.bio || "").trim(),
      photo: String(member?.photo || "").trim(),
      color: String(member?.color || "from-zinc-500 to-zinc-600").trim(),
      sectionId,
    };
  });

  return {
    director: {
      photo: String(director?.photo || "").trim(),
      nameZh: String(director?.nameZh || DEFAULT_BRAND_PAGE_CONTENT.director.nameZh).trim(),
      nameEn: String(director?.nameEn || DEFAULT_BRAND_PAGE_CONTENT.director.nameEn).trim(),
      affiliationLines: Array.isArray(director?.affiliationLines)
        ? director.affiliationLines.map((line) => String(line).trim()).filter(Boolean)
        : DEFAULT_BRAND_PAGE_CONTENT.director.affiliationLines,
      introParagraphs: Array.isArray(director?.introParagraphs)
        ? director.introParagraphs.map((line) => String(line).trim()).filter(Boolean)
        : DEFAULT_BRAND_PAGE_CONTENT.director.introParagraphs,
    },
    teamSections,
    teamMembers,
  };
}
