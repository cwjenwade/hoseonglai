import { TEST_QUESTIONS_DB } from "./test-questions";
import { RESEARCH_PROJECTS } from "./projects";

export type PsychometricScale = {
  projectId: string;
  projectTitleZh: string;
  projectTitleEn: string;
  principalInvestigator: string;
  researchUnit: string;
  researchDescription: string;
  scalePrompt: string;
  options: string[];
  questions: string[];
};

const DEFAULT_OPTIONS = ["非常不同意", "不同意", "普通", "同意", "非常同意"];

const PROJECT_TITLE_MAP = new Map(
  RESEARCH_PROJECTS.map((project) => [project.id, { zh: project.title, en: project.subtitle }]),
);

export const DEFAULT_PSYCHOMETRIC_SCALES: PsychometricScale[] = TEST_QUESTIONS_DB.map((item) => ({
  projectId: item.projectId,
  projectTitleZh: PROJECT_TITLE_MAP.get(item.projectId)?.zh || item.projectId,
  projectTitleEn: PROJECT_TITLE_MAP.get(item.projectId)?.en || item.projectId,
  principalInvestigator: "待填寫",
  researchUnit: "Ho-Se 好勢旺來研究團隊",
  researchDescription: "本研究旨在了解受試者之心理狀態與經驗，填答資料僅供研究使用。",
  scalePrompt: "請根據最近兩週的經驗，選擇最符合你的選項。",
  options: DEFAULT_OPTIONS,
  questions: item.questions,
}));
