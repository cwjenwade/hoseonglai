import { RESEARCH_PROJECTS } from "./projects";

export type ResearchConsent = {
  projectId: string;
  projectTitleZh: string;
  projectTitleEn: string;
  pdfUrl?: string;
  principalInvestigator: string;
  researchUnit: string;
  researchDescription: string;
};

export const DEFAULT_RESEARCH_CONSENTS: ResearchConsent[] = RESEARCH_PROJECTS.map((project) => ({
  projectId: project.id,
  projectTitleZh: project.title,
  projectTitleEn: project.subtitle,
  pdfUrl: "",
  principalInvestigator: "待填寫",
  researchUnit: "Ho-Se 好勢旺來研究團隊",
  researchDescription: "本研究旨在了解受試者之心理狀態與經驗，填答資料僅供研究使用。",
}));
