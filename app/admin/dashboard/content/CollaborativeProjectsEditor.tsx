"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PsychometricScale } from "@/app/collaborative-prosperity/assessment-data";
import type { ResearchConsent } from "@/app/collaborative-prosperity/consent-data";
import {
  getResearchProjectTestUrl,
  normalizeResearchProject,
  type ProjectContactVisibility,
  PROJECT_CONTACT_VISIBILITIES,
  RESEARCH_PROJECT_STATUSES,
  type ResearchProject,
  type ResearchProjectStatus,
} from "@/app/collaborative-prosperity/projects";

type CollaborativeProjectsEditorProps = {
  initialProjects: ResearchProject[];
  scales: PsychometricScale[];
  consents: ResearchConsent[];
};

type ValidationIssue = {
  projectId: string;
  projectTitle: string;
  field: string;
  label: string;
};

const DRAFT_STORAGE_KEY = "collaborative-projects-draft-v4";
const LEGACY_DRAFT_STORAGE_KEYS = ["collaborative-projects-draft-v3"];

const STATUS_LABELS: Record<ResearchProjectStatus, string> = {
  preparing: "Preparing",
  quantitative: "Quantitative",
  qualitative: "Qualitative",
};

const STATUS_HELP: Record<ResearchProjectStatus, string> = {
  preparing: "只顯示 A-E 與 waiting list email 蒐集，不會出現 PDF 或量表流程。",
  quantitative:
    "會顯示 PDF、知情同意與心理量表流程。只有這個狀態會出現量表設定。",
  qualitative:
    "會顯示 PDF 與知情同意，完成後供 PI 後續聯繫，不會出現心理量表設定。",
};

const STATUS_TONES: Record<ResearchProjectStatus, string> = {
  preparing: "border-amber-200 bg-amber-50 text-amber-700",
  quantitative: "border-sky-200 bg-sky-50 text-sky-700",
  qualitative: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

function defaultContactVisibility(
  status: ResearchProjectStatus,
): ProjectContactVisibility {
  return status === "qualitative" ? "share_with_pi" : "admin_only";
}

function createEmptyProject(): ResearchProject {
  const id = `project-${Date.now().toString(36)}`;
  return {
    id,
    title: "",
    subtitle: "",
    description: "",
    status: "preparing",
    topic: "",
    principalInvestigator: "",
    researchContact: "",
    participationDetails: "",
    researchAudiencePurpose: "",
    testUrl: "",
    assessmentSourceProjectId: "",
    consentSourceProjectId: "",
    contactVisibility: "admin_only",
  };
}

function duplicateProject(project: ResearchProject): ResearchProject {
  const copyId = `${project.id || "project"}-${Date.now().toString(36)}`;
  return {
    ...project,
    id: copyId,
    title: project.title ? `${project.title}（副本）` : "",
    testUrl:
      project.status === "quantitative" ? getResearchProjectTestUrl(copyId) : "",
    consentSourceProjectId:
      project.consentSourceProjectId === project.id
        ? ""
        : project.consentSourceProjectId,
  };
}

function getContactRuleCopy(status: ResearchProjectStatus): string {
  if (status === "qualitative") {
    return "此狀態下 email 會提供給 PI 與 admin，用於後續聯繫。";
  }

  if (status === "quantitative") {
    return "此狀態下 email 固定只給 admin，看不到參與者真實 email。";
  }

  return "此狀態下 email 僅作 waiting list 蒐集，預設只有 admin 可管理。";
}

function getVisibleScaleOptions(
  scales: PsychometricScale[],
) {
  return scales.map((scale) => ({
    value: scale.projectId,
    label: `${scale.projectTitleZh || scale.projectId} / ${scale.projectTitleEn || scale.projectId}`,
    description: scale.projectId,
  }));
}

function getVisibleConsentOptions(
  consents: ResearchConsent[],
) {
  return consents.map((consent) => ({
    value: consent.projectId,
    label: `${consent.projectTitleZh || consent.projectId} / ${consent.projectTitleEn || consent.projectId}`,
    description: consent.projectId,
  }));
}

function normalizeDraftProject(
  project: Partial<ResearchProject>,
  scales: PsychometricScale[],
  consents: ResearchConsent[],
): ResearchProject | null {
  const normalized = normalizeResearchProject(project);
  if (!normalized) return null;

  return {
    ...normalized,
    assessmentSourceProjectId:
      normalized.status === "quantitative"
        ? String(normalized.assessmentSourceProjectId || "").trim() ||
          (scales.some((scale) => scale.projectId === normalized.id) ? String(normalized.id) : "")
        : "",
    consentSourceProjectId:
      normalized.status !== "preparing"
        ? String(normalized.consentSourceProjectId || "").trim() ||
          (consents.some((consent) => consent.projectId === normalized.id) ? String(normalized.id) : "")
        : "",
  };
}

function validateProjects(
  projects: ResearchProject[],
  scales: PsychometricScale[],
  consents: ResearchConsent[],
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const scaleIds = new Set(scales.map((scale) => scale.projectId));
  const consentIds = new Set(consents.map((consent) => consent.projectId));

  projects.forEach((project) => {
    const projectTitle = project.title || project.id || "未命名專案";

    const checks: Array<[string, string, string]> = [
      ["id", "專案 ID", project.id],
      ["title", "中文標題", project.title],
      ["subtitle", "英文副標", project.subtitle],
      ["description", "卡片描述", project.description],
      ["topic", "A. 研究主題", project.topic],
      ["principalInvestigator", "B. 計畫主持人", project.principalInvestigator],
      ["researchContact", "C. 研究聯絡人", project.researchContact],
      ["participationDetails", "D. 參與方式與時間", project.participationDetails],
      ["researchAudiencePurpose", "E. 研究對象與目的", project.researchAudiencePurpose],
    ];

    if (project.status === "quantitative") {
      checks.push([
        "assessmentSourceProjectId",
        "量表來源（需從 psychometrics 選擇）",
        project.assessmentSourceProjectId || "",
      ]);
    }

    if (project.status !== "preparing") {
      checks.push([
        "consentSourceProjectId",
        "研究計劃書 / 同意書來源（需從 consent 選擇）",
        project.consentSourceProjectId || "",
      ]);
    }

    checks.forEach(([field, label, value]) => {
      if (!String(value || "").trim()) {
        issues.push({
          projectId: project.id,
          projectTitle,
          field,
          label,
        });
      }
    });

    if (
      project.status === "quantitative" &&
      String(project.assessmentSourceProjectId || "").trim() &&
      !scaleIds.has(String(project.assessmentSourceProjectId || "").trim())
    ) {
      issues.push({
        projectId: project.id,
        projectTitle,
        field: "assessmentSourceProjectId",
        label: "量表來源不存在，請重新從 psychometrics 選擇",
      });
    }

    if (
      project.status !== "preparing" &&
      String(project.consentSourceProjectId || "").trim() &&
      !consentIds.has(String(project.consentSourceProjectId || "").trim())
    ) {
      issues.push({
        projectId: project.id,
        projectTitle,
        field: "consentSourceProjectId",
        label: "研究計劃書 / 同意書來源不存在，請重新從 consent 選擇",
      });
    }
  });

  return issues;
}

export default function CollaborativeProjectsEditor({
  initialProjects,
  scales,
  consents,
}: CollaborativeProjectsEditorProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [projects, setProjects] = useState<ResearchProject[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const params = new URLSearchParams(window.location.search);
        const shouldClearDraft =
          params.get("saved") === "collaborative" || params.get("clearDraft") === "1";

        if (shouldClearDraft) {
          window.localStorage.removeItem(DRAFT_STORAGE_KEY);
          LEGACY_DRAFT_STORAGE_KEYS.forEach((key) => window.localStorage.removeItem(key));
        }

        const raw = shouldClearDraft ? null : window.localStorage.getItem(DRAFT_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            const draftProjects = parsed
              .map((project) =>
                project && typeof project === "object"
                  ? normalizeDraftProject(project as Partial<ResearchProject>, scales, consents)
                  : null,
              )
              .filter((project): project is ResearchProject => project !== null);

            if (draftProjects.length > 0) {
              return draftProjects;
            }
          }
        }
      } catch {
        // ignore corrupted local draft
      }
    }

    const nextProjects =
      initialProjects.length > 0 ? initialProjects : [createEmptyProject()];

    return nextProjects.map((project) => ({
      ...project,
      assessmentSourceProjectId:
        project.status === "quantitative"
          ? project.assessmentSourceProjectId ||
            (scales.some((scale) => scale.projectId === project.id) ? project.id : "")
          : "",
      consentSourceProjectId:
        project.status !== "preparing"
          ? project.consentSourceProjectId ||
            (consents.some((consent) => consent.projectId === project.id) ? project.id : "")
          : "",
    }));
  });
  const [activeProjectId, setActiveProjectId] = useState<string>(
    initialProjects[0]?.id || "",
  );
  const [validationIssues, setValidationIssues] = useState<ValidationIssue[]>([]);

  const payload = useMemo(() => projects, [projects]);
  const resolvedActiveProjectId = projects.some(
    (project) => project.id === activeProjectId,
  )
    ? activeProjectId
    : (projects[0]?.id || "");
  const activeIndex = projects.findIndex(
    (project) => project.id === resolvedActiveProjectId,
  );
  const activeProject = activeIndex >= 0 ? projects[activeIndex] : projects[0] || null;
  const activeProjectIssues = useMemo(
    () =>
      validationIssues.filter((issue) => issue.projectId === activeProject?.id),
    [activeProject?.id, validationIssues],
  );
  const activeProjectIssueFields = useMemo(
    () => new Set(activeProjectIssues.map((issue) => issue.field)),
    [activeProjectIssues],
  );

  const stats = useMemo(() => {
    const preparing = projects.filter((project) => project.status === "preparing").length;
    const quantitative = projects.filter((project) => project.status === "quantitative").length;
    const qualitative = projects.filter((project) => project.status === "qualitative").length;
    return { preparing, quantitative, qualitative };
  }, [projects]);

  useEffect(() => {
    LEGACY_DRAFT_STORAGE_KEYS.forEach((key) => window.localStorage.removeItem(key));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    const form = rootRef.current?.closest("form");
    if (!form) return;

    const handleSubmit = (event: Event) => {
      const issues = validateProjects(projects, scales, consents);
      if (issues.length === 0) {
        setValidationIssues([]);
        return;
      }

      event.preventDefault();
      setValidationIssues(issues);
      setActiveProjectId(issues[0]?.projectId || activeProjectId);
    };

    form.addEventListener("submit", handleSubmit);
    return () => form.removeEventListener("submit", handleSubmit);
  }, [activeProjectId, consents, projects, scales]);

  function updateProject(
    index: number,
    updater: (project: ResearchProject) => ResearchProject,
  ) {
    setProjects((prev) =>
      prev.map((project, projectIndex) =>
        projectIndex === index ? updater(project) : project,
      ),
    );
  }

  function updateActiveProject(updater: (project: ResearchProject) => ResearchProject) {
    if (activeIndex < 0) return;
    updateProject(activeIndex, updater);
    if (validationIssues.length > 0) {
      setValidationIssues(validateProjects(projects.map((project, index) =>
        index === activeIndex ? updater(project) : project,
      ), scales, consents));
    }
  }

  function handleStatusChange(nextStatus: ResearchProjectStatus) {
    updateActiveProject((project) => ({
      ...project,
      status: nextStatus,
      contactVisibility: defaultContactVisibility(nextStatus),
      testUrl:
        nextStatus === "quantitative" ? getResearchProjectTestUrl(project.id) : "",
      assessmentSourceProjectId:
        nextStatus === "quantitative" ? project.assessmentSourceProjectId || "" : "",
      consentSourceProjectId:
        nextStatus === "preparing" ? "" : project.consentSourceProjectId || "",
    }));
  }

  function handleProjectIdChange(nextId: string) {
    const cleanedId = nextId.trim();

    updateActiveProject((project) => ({
      ...project,
      id: cleanedId,
      testUrl:
        project.status === "quantitative" && cleanedId
          ? getResearchProjectTestUrl(cleanedId)
          : "",
      assessmentSourceProjectId:
        project.assessmentSourceProjectId === project.id
          ? ""
          : project.assessmentSourceProjectId || "",
      consentSourceProjectId:
        project.consentSourceProjectId === project.id
          ? ""
          : project.consentSourceProjectId || "",
    }));

    setActiveProjectId(cleanedId);
  }

  return (
    <div ref={rootRef} className="space-y-6">
      {validationIssues.length > 0 ? (
        <div className="rounded-[28px] border border-red-200 bg-red-50 p-5 text-red-700">
          <p className="text-sm font-semibold">還有欄位沒有補齊，已幫你留在原頁面。</p>
          <p className="mt-2 text-sm">請先補完以下欄位再儲存：</p>
          <div className="mt-3 grid gap-2">
            {validationIssues.slice(0, 8).map((issue) => (
              <p key={`${issue.projectId}-${issue.field}`} className="text-sm">
                {issue.projectTitle}：{issue.label}
              </p>
            ))}
            {validationIssues.length > 8 ? (
              <p className="text-sm">另外還有 {validationIssues.length - 8} 個欄位未填。</p>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
              Collaborative Prosperity Editor
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-600">
              用狀態驅動的方式管理研究專案。Preparing 只收 waiting list，Quantitative
              才會出現量表設定，Qualitative 則保留 PI 聯繫流程。
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              const nextProject = createEmptyProject();
              setProjects((prev) => [...prev, nextProject]);
              setActiveProjectId(nextProject.id);
            }}
            className="rounded-full bg-zinc-900 px-4 py-2 text-sm text-white transition hover:bg-zinc-800"
          >
            新增專案
          </button>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-amber-700">Preparing</p>
            <p className="mt-2 text-2xl font-semibold text-amber-900">{stats.preparing}</p>
          </div>
          <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-sky-700">Quantitative</p>
            <p className="mt-2 text-2xl font-semibold text-sky-900">{stats.quantitative}</p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-emerald-700">Qualitative</p>
            <p className="mt-2 text-2xl font-semibold text-emerald-900">{stats.qualitative}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="rounded-[28px] border border-zinc-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-zinc-900">專案清單</p>
              <p className="mt-1 text-xs text-zinc-500">點一個專案進入詳細編輯</p>
            </div>
          </div>

          <div className="space-y-3">
            {projects.map((project) => {
              const isActive = project.id === activeProjectId;
              return (
                <button
                  key={project.id}
                  type="button"
                    onClick={() => setActiveProjectId(project.id)}
                    className={
                    "w-full rounded-2xl border p-4 text-left transition " +
                    (isActive
                      ? "border-zinc-900 bg-zinc-900 text-white shadow-sm"
                      : "border-zinc-200 bg-zinc-50 text-zinc-900 hover:border-zinc-300 hover:bg-zinc-100")
                  }
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold">
                      {project.title || "未命名專案"}
                    </p>
                    <span
                      className={
                        "rounded-full border px-2 py-1 text-[10px] uppercase tracking-[0.18em] " +
                        (isActive
                          ? "border-white/30 bg-white/10 text-white"
                          : STATUS_TONES[project.status])
                      }
                    >
                      {STATUS_LABELS[project.status]}
                    </span>
                  </div>

                  <p className={isActive ? "mt-2 text-xs text-white/75" : "mt-2 text-xs text-zinc-500"}>
                    ID: {project.id}
                  </p>
                  <p className={isActive ? "mt-2 text-xs text-white/80" : "mt-2 text-xs text-zinc-600"}>
                    {project.topic || project.description || "尚未填寫研究摘要"}
                  </p>
                </button>
              );
            })}
          </div>
        </aside>

        {activeProject ? (
          <section className="space-y-5">
            <div className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-semibold tracking-tight text-zinc-950">
                      {activeProject.title || "未命名專案"}
                    </h3>
                    <span
                      className={
                        "rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.24em] " +
                        STATUS_TONES[activeProject.status]
                      }
                    >
                      {STATUS_LABELS[activeProject.status]}
                    </span>
                  </div>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
                    {STATUS_HELP[activeProject.status]}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const copied = duplicateProject(activeProject);
                      setProjects((prev) => [...prev, copied]);
                      setActiveProjectId(copied.id);
                    }}
                    className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100"
                  >
                    複製專案
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setProjects((prev) =>
                        prev.filter((project) => project.id !== activeProject.id),
                      );
                      setActiveProjectId(
                        projects.find((project) => project.id !== activeProject.id)?.id || "",
                      );
                    }}
                    className="rounded-full border border-red-200 px-4 py-2 text-sm text-red-600 transition hover:bg-red-50"
                  >
                    刪除專案
                  </button>
                </div>
              </div>
            </div>

            <div className="grid gap-5 2xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
              <div className="space-y-5">
                <article className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm">
                  <h4 className="text-base font-semibold text-zinc-900">1. 專案基本資訊</h4>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <label className="text-xs font-medium text-zinc-700">
                      專案 ID
                      <input
                        value={activeProject.id}
                        onChange={(event) => handleProjectIdChange(event.target.value)}
                        className={
                          "mt-1 h-11 w-full rounded-xl px-3 text-sm outline-none transition focus:border-zinc-900 " +
                          (activeProjectIssueFields.has("id")
                            ? "border border-red-400 bg-red-50"
                            : "border border-zinc-300")
                        }
                        placeholder="emotion-patterns"
                      />
                    </label>

                    <div className="text-xs font-medium text-zinc-700">
                      研究狀態
                      <div className="mt-1 grid grid-cols-1 gap-2 md:grid-cols-3">
                        {RESEARCH_PROJECT_STATUSES.map((status) => {
                          const isActive = activeProject.status === status;
                          return (
                            <button
                              key={status}
                              type="button"
                              onClick={() => handleStatusChange(status)}
                              className={
                                "rounded-xl border px-3 py-3 text-left text-sm transition " +
                                (isActive
                                  ? "border-zinc-900 bg-zinc-900 text-white"
                                  : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400")
                              }
                            >
                              <div className="font-semibold">{STATUS_LABELS[status]}</div>
                              <div className={isActive ? "mt-1 text-xs text-white/80" : "mt-1 text-xs text-zinc-500"}>
                                {status}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <label className="text-xs font-medium text-zinc-700">
                      中文標題
                      <input
                        value={activeProject.title}
                        onChange={(event) =>
                          updateActiveProject((project) => ({
                            ...project,
                            title: event.target.value,
                          }))
                        }
                        className={
                          "mt-1 h-11 w-full rounded-xl px-3 text-sm outline-none transition focus:border-zinc-900 " +
                          (activeProjectIssueFields.has("title")
                            ? "border border-red-400 bg-red-50"
                            : "border border-zinc-300")
                        }
                      />
                    </label>

                    <label className="text-xs font-medium text-zinc-700">
                      英文副標
                      <input
                        value={activeProject.subtitle}
                        onChange={(event) =>
                          updateActiveProject((project) => ({
                            ...project,
                            subtitle: event.target.value,
                          }))
                        }
                        className={
                          "mt-1 h-11 w-full rounded-xl px-3 text-sm outline-none transition focus:border-zinc-900 " +
                          (activeProjectIssueFields.has("subtitle")
                            ? "border border-red-400 bg-red-50"
                            : "border border-zinc-300")
                        }
                      />
                    </label>
                  </div>

                  <label className="mt-4 block text-xs font-medium text-zinc-700">
                    卡片描述
                    <textarea
                      value={activeProject.description}
                      onChange={(event) =>
                        updateActiveProject((project) => ({
                          ...project,
                          description: event.target.value,
                        }))
                      }
                      className={
                        "mt-1 h-24 w-full rounded-xl p-3 text-sm outline-none transition focus:border-zinc-900 " +
                        (activeProjectIssueFields.has("description")
                          ? "border border-red-400 bg-red-50"
                          : "border border-zinc-300")
                      }
                    />
                  </label>
                </article>

                <article className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm">
                  <h4 className="text-base font-semibold text-zinc-900">2. A-E 研究資訊</h4>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <label className="text-xs font-medium text-zinc-700">
                      A. 研究主題
                      <input
                        value={activeProject.topic}
                        onChange={(event) =>
                          updateActiveProject((project) => ({
                            ...project,
                            topic: event.target.value,
                          }))
                        }
                        className={
                          "mt-1 h-11 w-full rounded-xl px-3 text-sm outline-none transition focus:border-zinc-900 " +
                          (activeProjectIssueFields.has("topic")
                            ? "border border-red-400 bg-red-50"
                            : "border border-zinc-300")
                        }
                      />
                    </label>

                    <label className="text-xs font-medium text-zinc-700">
                      B. 計畫主持人
                      <input
                        value={activeProject.principalInvestigator}
                        onChange={(event) =>
                          updateActiveProject((project) => ({
                            ...project,
                            principalInvestigator: event.target.value,
                          }))
                        }
                        className={
                          "mt-1 h-11 w-full rounded-xl px-3 text-sm outline-none transition focus:border-zinc-900 " +
                          (activeProjectIssueFields.has("principalInvestigator")
                            ? "border border-red-400 bg-red-50"
                            : "border border-zinc-300")
                        }
                        placeholder="請填計畫主持人"
                      />
                    </label>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <label className="text-xs font-medium text-zinc-700">
                      C. 研究聯絡人
                      <input
                        value={activeProject.researchContact}
                        onChange={(event) =>
                          updateActiveProject((project) => ({
                            ...project,
                            researchContact: event.target.value,
                          }))
                        }
                        className={
                          "mt-1 h-11 w-full rounded-xl px-3 text-sm outline-none transition focus:border-zinc-900 " +
                          (activeProjectIssueFields.has("researchContact")
                            ? "border border-red-400 bg-red-50"
                            : "border border-zinc-300")
                        }
                        placeholder="請填研究聯絡人"
                      />
                    </label>

                    <label className="text-xs font-medium text-zinc-700">
                      D. 參與方式與時間
                      <textarea
                        value={activeProject.participationDetails}
                        onChange={(event) =>
                          updateActiveProject((project) => ({
                            ...project,
                            participationDetails: event.target.value,
                          }))
                        }
                        className={
                          "mt-1 h-24 w-full rounded-xl p-3 text-sm outline-none transition focus:border-zinc-900 " +
                          (activeProjectIssueFields.has("participationDetails")
                            ? "border border-red-400 bg-red-50"
                            : "border border-zinc-300")
                        }
                        placeholder="例如：閱讀研究說明後線上填答，約 10–15 分鐘。"
                      />
                    </label>
                  </div>

                  <label className="mt-4 block text-xs font-medium text-zinc-700">
                    E. 研究對象與目的
                    <textarea
                      value={activeProject.researchAudiencePurpose}
                      onChange={(event) =>
                        updateActiveProject((project) => ({
                          ...project,
                          researchAudiencePurpose: event.target.value,
                        }))
                      }
                      className={
                        "mt-1 h-24 w-full rounded-xl p-3 text-sm outline-none transition focus:border-zinc-900 " +
                        (activeProjectIssueFields.has("researchAudiencePurpose")
                          ? "border border-red-400 bg-red-50"
                          : "border border-zinc-300")
                      }
                      placeholder="以年滿 18 歲成人為對象，探討日常情緒感受、調節方式與心理狀態之間的關聯。"
                    />
                  </label>
                </article>

                <article className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm">
                  <h4 className="text-base font-semibold text-zinc-900">3. 參與與聯繫設定</h4>
                  {activeProject.status !== "preparing" ? (
                    <div className="mt-4 rounded-2xl border border-violet-200 bg-violet-50 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-violet-700">
                        研究計劃書 / 同意書來源
                      </p>
                      <label className="mt-3 block text-xs font-medium text-zinc-700">
                        同意書來源
                        <select
                          value={activeProject.consentSourceProjectId || ""}
                          onChange={(event) =>
                            updateActiveProject((project) => ({
                              ...project,
                              consentSourceProjectId: event.target.value,
                            }))
                          }
                          className={
                            "mt-1 h-11 w-full rounded-xl px-3 text-sm outline-none transition focus:border-zinc-900 " +
                            (activeProjectIssueFields.has("consentSourceProjectId")
                              ? "border border-red-400 bg-red-50"
                              : "border border-zinc-300")
                          }
                        >
                          <option value="">請從 consent 模組選擇</option>
                          {getVisibleConsentOptions(consents).map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </label>

                      <div className="mt-3 rounded-xl border border-violet-200 bg-white p-3">
                        {getVisibleConsentOptions(consents)
                          .filter(
                            (option) =>
                              option.value === (activeProject.consentSourceProjectId || ""),
                          )
                          .map((option) => (
                            <div key={option.value}>
                              <p className="text-sm font-medium text-zinc-900">
                                目前使用：{option.label}
                              </p>
                              <p className="mt-1 text-xs text-zinc-600">
                                {option.description}
                              </p>
                            </div>
                          ))}
                      </div>

                      <p className="mt-3 text-xs leading-6 text-violet-700">
                        PDF 也跟著這份 consent 資料走，請到 consent 模組上傳或指定 PDF，
                        collaborative 不再單獨要求 PDF 連結。
                      </p>

                      <a
                        href="/admin/dashboard/content?tab=consent"
                        className="mt-4 inline-flex text-sm font-medium text-violet-700 underline underline-offset-4"
                      >
                        直接前往研究同意書編輯器
                      </a>
                    </div>
                  ) : null}

                  <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                      Email Visibility
                    </p>
                    <p className="mt-2 text-sm font-semibold text-zinc-900">
                      {PROJECT_CONTACT_VISIBILITIES.includes(activeProject.contactVisibility)
                        ? activeProject.contactVisibility
                        : defaultContactVisibility(activeProject.status)}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-zinc-600">
                      {getContactRuleCopy(activeProject.status)}
                    </p>
                  </div>
                </article>
              </div>

              <div className="space-y-5">
                {activeProject.status === "quantitative" ? (
                  <article className="rounded-[28px] border border-sky-200 bg-sky-50 p-6 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-base font-semibold text-sky-950">
                          Quantitative 量表設定
                        </h4>
                        <p className="mt-2 text-sm leading-6 text-sky-800">
                          這裡只在 Quantitative 狀態出現，而且量表必須直接指定你在 psychometrics
                          模組裡建立好的既有量表。
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 rounded-2xl border border-sky-200 bg-white p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-sky-700">
                        受試者測驗網址
                      </p>
                      <input
                        value={getResearchProjectTestUrl(activeProject.id)}
                        readOnly
                        className="mt-2 h-11 w-full rounded-xl border border-sky-200 bg-sky-50 px-3 text-sm text-sky-900 outline-none"
                      />
                      <p className="mt-2 text-xs text-sky-700">
                        測驗網址由 project ID 自動生成，避免手動填錯。
                      </p>
                    </div>

                    <div className="mt-4 rounded-2xl border border-sky-200 bg-white p-4">
                      <label className="text-xs font-medium text-zinc-700">
                        量表來源
                        <select
                          value={activeProject.assessmentSourceProjectId || ""}
                          onChange={(event) =>
                            updateActiveProject((project) => ({
                              ...project,
                              assessmentSourceProjectId: event.target.value,
                              testUrl: getResearchProjectTestUrl(project.id),
                            }))
                          }
                          className={
                            "mt-1 h-11 w-full rounded-xl px-3 text-sm outline-none transition focus:border-zinc-900 " +
                            (activeProjectIssueFields.has("assessmentSourceProjectId")
                              ? "border border-red-400 bg-red-50"
                              : "border border-zinc-300")
                          }
                        >
                          <option value="">請從 psychometrics 模組選擇</option>
                          {getVisibleScaleOptions(scales).map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </label>

                      <div className="mt-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3">
                        {getVisibleScaleOptions(scales)
                          .filter(
                            (option) =>
                              option.value === (activeProject.assessmentSourceProjectId || ""),
                          )
                          .map((option) => (
                            <div key={option.value}>
                              <p className="text-sm font-medium text-zinc-900">
                                目前使用：{option.label}
                              </p>
                              <p className="mt-1 text-xs text-zinc-600">
                                {option.description}
                              </p>
                            </div>
                          ))}
                      </div>

                      <a
                        href="/admin/dashboard/content?tab=psychometrics"
                        className="mt-4 inline-flex text-sm font-medium text-sky-700 underline underline-offset-4"
                      >
                        直接前往心理量表編輯器
                      </a>
                    </div>
                  </article>
                ) : (
                  <article className="rounded-[28px] border border-dashed border-zinc-300 bg-zinc-50 p-6">
                    <h4 className="text-base font-semibold text-zinc-900">量表設定</h4>
                    <p className="mt-2 text-sm leading-6 text-zinc-600">
                      只有當狀態是 <span className="font-semibold">Quantitative</span>
                      時，才會顯示量表網址與量表來源選擇。這樣可以避免 Preparing /
                      Qualitative 狀態下出現不必要的測驗設定。
                    </p>
                  </article>
                )}

                <article className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm">
                  <h4 className="text-base font-semibold text-zinc-900">目前送出資料預覽</h4>
                  <div className="mt-4 space-y-3 text-sm text-zinc-600">
                    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                        Status
                      </p>
                      <p className="mt-2 font-medium text-zinc-900">
                        {STATUS_LABELS[activeProject.status]}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                        PDF
                      </p>
                      <p className="mt-2 break-all text-zinc-900">
                        {consents.find(
                          (consent) => consent.projectId === (activeProject.consentSourceProjectId || ""),
                        )?.pdfUrl || "跟隨 consent 模組 / 尚未設定"}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                        Assessment source
                      </p>
                      <p className="mt-2 break-all text-zinc-900">
                        {activeProject.status === "quantitative"
                          ? activeProject.assessmentSourceProjectId || "未指定"
                          : "不啟用"}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                        Consent source
                      </p>
                      <p className="mt-2 break-all text-zinc-900">
                        {activeProject.status !== "preparing"
                          ? activeProject.consentSourceProjectId || "未指定"
                          : "不啟用"}
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </section>
        ) : null}
      </div>

      <input type="hidden" name="payload" value={JSON.stringify(payload)} />
    </div>
  );
}
