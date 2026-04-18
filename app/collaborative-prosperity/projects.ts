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

export type ResearchProject = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: ResearchProjectStatus;
  topic: string;
  purpose: string;
  duration: string;
  participationMethod: string;
  summary: string;
  target: string;
  pdfUrl: string;
  testUrl: string;
  contactVisibility: ProjectContactVisibility;
};

function defaultContactVisibility(
  status: ResearchProjectStatus,
): ProjectContactVisibility {
  return status === "qualitative" ? "share_with_pi" : "admin_only";
}

export function normalizeResearchProject(
  project: Partial<ResearchProject>,
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
  const duration = String(project.duration || "").trim();
  const target = String(project.target || "").trim();
  const participationMethod = String(project.participationMethod || target).trim();
  const summary = String(project.summary || description).trim();
  const topic = String(project.topic || title).trim();
  const purpose = String(project.purpose || description).trim();
  const pdfUrl = String(project.pdfUrl || "").trim();
  const testUrl = String(project.testUrl || "").trim();
  const rawVisibility = String(project.contactVisibility || "").trim();
  const contactVisibility: ProjectContactVisibility =
    PROJECT_CONTACT_VISIBILITIES.includes(
      rawVisibility as ProjectContactVisibility,
    )
      ? (rawVisibility as ProjectContactVisibility)
      : defaultContactVisibility(status);

  return {
    id,
    title,
    subtitle,
    description: description || summary || purpose,
    status,
    topic,
    purpose: purpose || description,
    duration,
    participationMethod: participationMethod || "線上填寫",
    summary: summary || description || purpose,
    target,
    pdfUrl,
    testUrl,
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
    purpose: "理解情緒感受、調節方式與心理狀態之間的關係。",
    duration: "約 12–15 分鐘",
    participationMethod: "閱讀研究說明後，線上完成同意與心理量表填答。",
    summary:
      "本研究聚焦情緒經驗與調節傾向，完成同意後可直接進入量表填答流程。",
    target: "一般成人",
    pdfUrl: "",
    testUrl: "/collaborative-prosperity/tests/emotion-patterns",
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
    purpose: "理解在高壓情境下的身心反應與調適模式。",
    duration: "約 10–12 分鐘",
    participationMethod: "閱讀研究說明後，線上完成同意與心理量表填答。",
    summary:
      "本研究將收集壓力來源、調適策略與心理感受資料，作為後續分析基礎。",
    target: "學生與上班族",
    pdfUrl: "",
    testUrl: "/collaborative-prosperity/tests/stress-adaptation",
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
    purpose: "探索關係中的安全感、依附模式與互動風格。",
    duration: "約 15–18 分鐘",
    participationMethod: "閱讀研究說明後，線上完成同意與心理量表填答。",
    summary:
      "本研究以親密關係與社交互動經驗為核心，蒐集作答資料作為研究分析使用。",
    target: "一般成人",
    pdfUrl: "",
    testUrl: "/collaborative-prosperity/tests/relationship-style",
    contactVisibility: "admin_only",
  },
];
