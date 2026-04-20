import type { ResearchProject, ResearchProjectType } from "@/app/collaborative-prosperity/projects";
import {
  getResearchProjectPublishStatus,
  getResearchProjectType,
  type ResearchPublishStatus,
} from "@/app/collaborative-prosperity/projects";
import type { ResearchConsent } from "@/app/collaborative-prosperity/consent-data";
import type { PsychometricScale } from "@/app/collaborative-prosperity/assessment-data";
import type { ResearchScheduling } from "@/app/collaborative-prosperity/scheduling-data";

export type ResearchWorkspace = {
  projectId: string;
  project: ResearchProject;
  consent: ResearchConsent;
  assessment: PsychometricScale | null;
  scheduling: ResearchScheduling | null;
  publishStatus: ResearchPublishStatus;
  researchType: ResearchProjectType;
  readiness: {
    projectSettingsComplete: boolean;
    consentComplete: boolean;
    flowComplete: boolean;
    frontendVisible: boolean;
    missingFields: string[];
  };
};

export function createDefaultConsent(project: ResearchProject): ResearchConsent {
  return {
    projectId: project.id,
    projectTitleZh: project.title,
    projectTitleEn: project.subtitle,
    pdfUrl: "",
    principalInvestigator: project.principalInvestigator || "",
    researchUnit: "Ho-Se 好勢旺來研究團隊",
    researchDescription: "",
    isPublished: project.isPublished !== false,
    displayOrder: project.displayOrder || 0,
    updatedAt: "",
    internalNote: "",
  };
}

export function createDefaultAssessment(project: ResearchProject): PsychometricScale {
  return {
    projectId: project.id,
    projectTitleZh: project.title,
    projectTitleEn: project.subtitle,
    scalePrompt: "請依照實際情況作答。",
    options: ["非常不同意", "不同意", "普通", "同意", "非常同意"],
    questions: [""],
    isPublished: project.isPublished !== false,
    displayOrder: project.displayOrder || 0,
    updatedAt: "",
    internalNote: "",
  };
}

export function createDefaultScheduling(project: ResearchProject): ResearchScheduling {
  return {
    projectId: project.id,
    projectTitleZh: project.title,
    projectTitleEn: project.subtitle,
    schedulingPrompt: "請勾選你方便參與訪談或研究安排的時段。",
    selectionNote: "研究團隊將依你選擇的時段與你聯繫後續安排。",
    allowMultiple: true,
    availabilitySlots: [],
    isPublished: project.isPublished !== false,
    displayOrder: project.displayOrder || 0,
    updatedAt: "",
    internalNote: "",
  };
}

export function validateResearchWorkspace(
  project: ResearchProject,
  consent: ResearchConsent,
): string[] {
  const missingFields: string[] = [];

  if (!String(project.id || "").trim()) missingFields.push("Project Settings：專案 ID");
  if (!String(project.title || "").trim()) missingFields.push("Project Settings：中文標題");
  if (!String(project.subtitle || "").trim()) missingFields.push("Project Settings：英文副標");
  if (!String(project.description || "").trim()) missingFields.push("Project Settings：卡片描述");
  if (!String(project.topic || "").trim()) missingFields.push("Project Settings：A. 研究主題");
  if (!String(project.principalInvestigator || "").trim()) missingFields.push("Project Settings：B. 計畫主持人");
  if (!String(project.researchContact || "").trim()) missingFields.push("Project Settings：C. 研究聯絡人");
  if (!String(project.participationDetails || "").trim()) missingFields.push("Project Settings：D. 參與方式與時間");
  if (!String(project.researchAudiencePurpose || "").trim()) missingFields.push("Project Settings：E. 研究對象與目的");
  if (!String(project.googleFormUrl || "").trim()) missingFields.push("Project Settings：Google Form URL");

  if (!String(consent.projectId || "").trim()) missingFields.push("Consent：projectId");
  if (!String(consent.projectTitleZh || "").trim()) missingFields.push("Consent：中文標題");
  if (!String(consent.projectTitleEn || "").trim()) missingFields.push("Consent：英文標題");
  if (!String(consent.principalInvestigator || "").trim()) missingFields.push("Consent：計畫主持人");
  if (!String(consent.researchUnit || "").trim()) missingFields.push("Consent：研究單位");
  if (!String(consent.researchDescription || "").trim()) missingFields.push("Consent：研究說明");
  if (!String(consent.pdfUrl || "").trim()) missingFields.push("Consent：PDF");

  return missingFields;
}

export function buildResearchWorkspace(
  project: ResearchProject,
  consents: ResearchConsent[],
  assessments: PsychometricScale[],
  schedulingConfigs: ResearchScheduling[],
): ResearchWorkspace {
  const publishStatus = getResearchProjectPublishStatus(project);
  const researchType = getResearchProjectType(project);
  const consent =
    consents.find((item) => item.projectId === project.id) || createDefaultConsent(project);
  const assessment =
    assessments.find((item) => item.projectId === project.id) ||
    (researchType === "quantitative" ? createDefaultAssessment(project) : null);
  const scheduling =
    schedulingConfigs.find((item) => item.projectId === project.id) ||
    (researchType === "qualitative" ? createDefaultScheduling(project) : null);
  const missingFields = validateResearchWorkspace(project, consent);

  return {
    projectId: project.id,
    project,
    consent,
    assessment,
    scheduling,
    publishStatus,
    researchType,
    readiness: {
      projectSettingsComplete: missingFields.every((item) => !item.startsWith("Project Settings")),
      consentComplete: missingFields.every((item) => !item.startsWith("Consent")),
      flowComplete:
        researchType === "quantitative"
          ? missingFields.every((item) => !item.startsWith("Assessment"))
          : missingFields.every((item) => !item.startsWith("Scheduling")),
      frontendVisible: publishStatus === "published" && project.isPublished !== false,
      missingFields,
    },
  };
}
