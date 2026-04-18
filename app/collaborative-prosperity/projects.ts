import type { ContentGovernanceFields } from "@/lib/content-governance";

export const RESEARCH_PROJECT_STATUSES = [
  "preparing",
  "quantitative",
  "qualitative",
] as const;

export type ResearchProjectStatus = (typeof RESEARCH_PROJECT_STATUSES)[number];

export const PROJECT_CONTACT_VISIBILITIES = [
  "admin_only",
  "share_with_pi",
] as const;

export type ProjectContactVisibility =
  (typeof PROJECT_CONTACT_VISIBILITIES)[number];

export type ResearchProject = ContentGovernanceFields & {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: ResearchProjectStatus;
  topic: string;
  principalInvestigator: string;
  researchContact: string;
  participationDetails: string;
  researchAudiencePurpose: string;
  testUrl: string;
  assessmentSourceProjectId?: string;
  consentSourceProjectId?: string;
  contactVisibility: ProjectContactVisibility;
};

type LegacyResearchProjectFields = {
  purpose?: string;
  duration?: string;
  participationMethod?: string;
  summary?: string;
  target?: string;
  pdfUrl?: string;
};

function defaultContactVisibility(
  status: ResearchProjectStatus,
): ProjectContactVisibility {
  return status === "qualitative" ? "share_with_pi" : "admin_only";
}

export function getResearchProjectTestUrl(projectId: string): string {
  return `/collaborative-prosperity/tests/${projectId}`;
}

export function getResearchProjectAssessmentSourceId(
  project: Pick<ResearchProject, "id" | "status" | "assessmentSourceProjectId">,
): string {
  if (project.status !== "quantitative") {
    return "";
  }

  const sourceId = String(project.assessmentSourceProjectId || "").trim();
  return sourceId || project.id;
}

export function getResearchProjectConsentSourceId(
  project: Pick<ResearchProject, "id" | "status" | "consentSourceProjectId">,
): string {
  if (project.status === "preparing") {
    return "";
  }

  const sourceId = String(project.consentSourceProjectId || "").trim();
  return sourceId || project.id;
}

export function normalizeResearchProject(
  project: Partial<ResearchProject> & LegacyResearchProjectFields,
): ResearchProject | null {
  const id = String(project.id || "").trim();
  const title = String(project.title || "").trim();
  const subtitle = String(project.subtitle || "").trim();

  if (!id || !title || !subtitle) {
    return null;
  }

  const rawStatus = String(project.status || "").trim();
  const status: ResearchProjectStatus = RESEARCH_PROJECT_STATUSES.includes(
    rawStatus as ResearchProjectStatus,
  )
    ? (rawStatus as ResearchProjectStatus)
    : "quantitative";

  const description = String(project.description || "").trim();
  const topic = String(project.topic || title).trim();
  const principalInvestigator = String(project.principalInvestigator || "").trim();
  const researchContact = String(project.researchContact || "").trim();
  const legacyDuration = String(project.duration || "").trim();
  const legacyTarget = String(project.target || "").trim();
  const legacyParticipationMethod = String(
    project.participationMethod || legacyTarget,
  ).trim();
  const participationDetails = String(
    project.participationDetails ||
      [legacyParticipationMethod, legacyDuration].filter(Boolean).join(" / ") ||
      legacyDuration ||
      legacyParticipationMethod,
  ).trim();
  const legacyPurpose = String(project.purpose || "").trim();
  const legacySummary = String(project.summary || description || legacyPurpose).trim();
  const researchAudiencePurpose = String(
    project.researchAudiencePurpose || legacySummary || legacyPurpose || description,
  ).trim();
  const rawAssessmentSourceProjectId = String(
    project.assessmentSourceProjectId || "",
  ).trim();
  const rawConsentSourceProjectId = String(project.consentSourceProjectId || "").trim();
  const testUrl =
    status === "quantitative" ? getResearchProjectTestUrl(id) : "";
  const rawVisibility = String(project.contactVisibility || "").trim();
  const contactVisibility: ProjectContactVisibility =
    PROJECT_CONTACT_VISIBILITIES.includes(
      rawVisibility as ProjectContactVisibility,
    )
      ? (rawVisibility as ProjectContactVisibility)
      : defaultContactVisibility(status);

  return {
    isPublished: project.isPublished !== false,
    displayOrder:
      Number.isFinite(Number(project.displayOrder))
        ? Number(project.displayOrder)
        : 0,
    updatedAt: String(project.updatedAt || "").trim(),
    internalNote: String(project.internalNote || "").trim(),
    id,
    title,
    subtitle,
    description: description || researchAudiencePurpose,
    status,
    topic,
    principalInvestigator,
    researchContact,
    participationDetails: participationDetails || "閱讀研究說明後依指示參與。",
    researchAudiencePurpose: researchAudiencePurpose || description,
    testUrl,
    assessmentSourceProjectId:
      status === "quantitative" && rawAssessmentSourceProjectId !== id
        ? rawAssessmentSourceProjectId
        : "",
    consentSourceProjectId:
      status !== "preparing" && rawConsentSourceProjectId !== id
        ? rawConsentSourceProjectId
        : "",
    contactVisibility,
  };
}

export function normalizeResearchProjects(
  projects: unknown,
  fallback: ResearchProject[] = [],
): ResearchProject[] {
  if (!Array.isArray(projects)) {
    return fallback;
  }

  const normalized = projects
    .map((project) =>
      project && typeof project === "object"
        ? normalizeResearchProject(project as Partial<ResearchProject>)
        : null,
    )
    .filter((project): project is ResearchProject => project !== null);

  return normalized.length > 0 ? normalized : fallback;
}

export function getProjectStatusLabel(status: ResearchProjectStatus): string {
  if (status === "preparing") return "Preparing";
  if (status === "qualitative") return "Qualitative";
  return "Quantitative";
}

export function getProjectContactVisibilityLabel(
  visibility: ProjectContactVisibility,
): string {
  return visibility === "share_with_pi" ? "PI + Admin" : "Admin only";
}

export const RESEARCH_PROJECTS: ResearchProject[] = [
  {
    id: "emotion-patterns",
    title: "情緒模式研究",
    subtitle: "Emotion Patterns Study",
    description:
      "探索個體在日常生活中的情緒感受、調節方式與反應傾向，理解情緒經驗與心理狀態之間的關係。",
    status: "quantitative",
    topic: "情緒模式與日常經驗",
    principalInvestigator: "Ho-Se 好勢｜Ong-Lai 旺來 研究團隊",
    researchContact: "Ho-Se 好勢｜Ong-Lai 旺來 研究聯絡窗口",
    participationDetails: "閱讀研究說明後，線上完成同意與心理量表填答，約 12–15 分鐘。",
    researchAudiencePurpose:
      "以年滿 18 歲成人為對象，探討日常情緒感受、調節方式與心理狀態之間的關聯。",
    testUrl: "/collaborative-prosperity/tests/emotion-patterns",
    assessmentSourceProjectId: "",
    consentSourceProjectId: "",
    contactVisibility: "admin_only",
  },
  {
    id: "stress-adaptation",
    title: "壓力調適研究",
    subtitle: "Stress Adaptation Study",
    description:
      "聚焦壓力來源、身心反應與調適資源，理解人們如何在高壓環境中維持生活與心理平衡。",
    status: "quantitative",
    topic: "壓力與調適資源",
    principalInvestigator: "Ho-Se 好勢｜Ong-Lai 旺來 研究團隊",
    researchContact: "Ho-Se 好勢｜Ong-Lai 旺來 研究聯絡窗口",
    participationDetails: "閱讀研究說明後，線上完成同意與心理量表填答，約 10–12 分鐘。",
    researchAudiencePurpose:
      "以年滿 18 歲成人為對象，探討壓力經驗、調適資源與心理狀態之間的關聯。",
    testUrl: "/collaborative-prosperity/tests/stress-adaptation",
    assessmentSourceProjectId: "",
    consentSourceProjectId: "",
    contactVisibility: "admin_only",
  },
  {
    id: "relationship-style",
    title: "人際關係風格研究",
    subtitle: "Relationship Style Study",
    description:
      "了解在親密關係、友誼與社交互動中的依附、安全感與互動風格，作為心理與社會連結的研究基礎。",
    status: "quantitative",
    topic: "人際關係與依附風格",
    principalInvestigator: "Ho-Se 好勢｜Ong-Lai 旺來 研究團隊",
    researchContact: "Ho-Se 好勢｜Ong-Lai 旺來 研究聯絡窗口",
    participationDetails: "閱讀研究說明後，線上完成同意與心理量表填答，約 15–18 分鐘。",
    researchAudiencePurpose:
      "以年滿 18 歲成人為對象，探討人際互動、依附風格與心理狀態之間的關聯。",
    testUrl: "/collaborative-prosperity/tests/relationship-style",
    assessmentSourceProjectId: "",
    consentSourceProjectId: "",
    contactVisibility: "admin_only",
  },
];
