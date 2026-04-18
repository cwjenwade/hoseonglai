"use client";

import { useMemo, useState } from "react";
import type { PsychometricScale } from "@/app/collaborative-prosperity/assessment-data";
import type { ResearchConsent } from "@/app/collaborative-prosperity/consent-data";
import {
  getResearchProjectAssessmentSourceId,
  getResearchProjectConsentSourceId,
  getResearchProjectTestUrl,
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
    purpose: "",
    duration: "",
    participationMethod: "",
    summary: "",
    target: "",
    pdfUrl: "",
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
  project: ResearchProject,
  scales: PsychometricScale[],
) {
  const selfOption = {
    value: project.id,
    label: "使用此專案自己的量表",
    description: "系統會直接對應到這個 project 的心理量表。",
  };

  const externalOptions = scales
    .filter((scale) => scale.projectId !== project.id)
    .map((scale) => ({
      value: scale.projectId,
      label: `${scale.projectTitleZh || scale.projectId} / ${scale.projectTitleEn || scale.projectId}`,
      description: scale.projectId,
    }));

  return [selfOption, ...externalOptions];
}

function getVisibleConsentOptions(
  project: ResearchProject,
  consents: ResearchConsent[],
) {
  const selfOption = {
    value: project.id,
    label: "使用此專案自己的研究計劃書 / 同意書",
    description: "系統會直接對應到這個 project 的研究計劃書內容。",
  };

  const externalOptions = consents
    .filter((consent) => consent.projectId !== project.id)
    .map((consent) => ({
      value: consent.projectId,
      label: `${consent.projectTitleZh || consent.projectId} / ${consent.projectTitleEn || consent.projectId}`,
      description: consent.projectId,
    }));

  return [selfOption, ...externalOptions];
}

export default function CollaborativeProjectsEditor({
  initialProjects,
  scales,
  consents,
}: CollaborativeProjectsEditorProps) {
  const [projects, setProjects] = useState<ResearchProject[]>(
    initialProjects.length > 0 ? initialProjects : [createEmptyProject()],
  );
  const [activeProjectId, setActiveProjectId] = useState<string>(
    initialProjects[0]?.id || "",
  );

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

  const stats = useMemo(() => {
    const preparing = projects.filter((project) => project.status === "preparing").length;
    const quantitative = projects.filter((project) => project.status === "quantitative").length;
    const qualitative = projects.filter((project) => project.status === "qualitative").length;
    return { preparing, quantitative, qualitative };
  }, [projects]);

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
  }

  function handleStatusChange(nextStatus: ResearchProjectStatus) {
    updateActiveProject((project) => ({
      ...project,
      status: nextStatus,
      contactVisibility: defaultContactVisibility(nextStatus),
      testUrl:
        nextStatus === "quantitative" ? getResearchProjectTestUrl(project.id) : "",
      assessmentSourceProjectId: nextStatus === "quantitative" ? "" : "",
      consentSourceProjectId: nextStatus === "preparing" ? "" : project.consentSourceProjectId,
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
    <div className="space-y-6">
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
                        className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none transition focus:border-zinc-900"
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
                        className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none transition focus:border-zinc-900"
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
                        className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none transition focus:border-zinc-900"
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
                      className="mt-1 h-24 w-full rounded-xl border border-zinc-300 p-3 text-sm outline-none transition focus:border-zinc-900"
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
                        className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none transition focus:border-zinc-900"
                      />
                    </label>

                    <label className="text-xs font-medium text-zinc-700">
                      C. 需要時間
                      <input
                        value={activeProject.duration}
                        onChange={(event) =>
                          updateActiveProject((project) => ({
                            ...project,
                            duration: event.target.value,
                          }))
                        }
                        className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none transition focus:border-zinc-900"
                        placeholder="約 10–12 分鐘"
                      />
                    </label>
                  </div>

                  <label className="mt-4 block text-xs font-medium text-zinc-700">
                    B. 研究目的
                    <textarea
                      value={activeProject.purpose}
                      onChange={(event) =>
                        updateActiveProject((project) => ({
                          ...project,
                          purpose: event.target.value,
                        }))
                      }
                      className="mt-1 h-24 w-full rounded-xl border border-zinc-300 p-3 text-sm outline-none transition focus:border-zinc-900"
                    />
                  </label>

                  <label className="mt-4 block text-xs font-medium text-zinc-700">
                    D. 參與方式
                    <textarea
                      value={activeProject.participationMethod}
                      onChange={(event) =>
                        updateActiveProject((project) => ({
                          ...project,
                          participationMethod: event.target.value,
                        }))
                      }
                      className="mt-1 h-24 w-full rounded-xl border border-zinc-300 p-3 text-sm outline-none transition focus:border-zinc-900"
                    />
                  </label>

                  <label className="mt-4 block text-xs font-medium text-zinc-700">
                    E. 簡要說明
                    <textarea
                      value={activeProject.summary}
                      onChange={(event) =>
                        updateActiveProject((project) => ({
                          ...project,
                          summary: event.target.value,
                        }))
                      }
                      className="mt-1 h-24 w-full rounded-xl border border-zinc-300 p-3 text-sm outline-none transition focus:border-zinc-900"
                    />
                  </label>
                </article>

                <article className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm">
                  <h4 className="text-base font-semibold text-zinc-900">3. 參與與聯繫設定</h4>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <label className="text-xs font-medium text-zinc-700">
                      參與對象（選填）
                      <input
                        value={activeProject.target}
                        onChange={(event) =>
                          updateActiveProject((project) => ({
                            ...project,
                            target: event.target.value,
                          }))
                        }
                        className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none transition focus:border-zinc-900"
                        placeholder="一般成人、學生、上班族"
                      />
                    </label>

                    {(activeProject.status === "quantitative" ||
                      activeProject.status === "qualitative") ? (
                      <label className="text-xs font-medium text-zinc-700">
                        PDF 連結
                        <input
                          value={activeProject.pdfUrl}
                          onChange={(event) =>
                            updateActiveProject((project) => ({
                              ...project,
                              pdfUrl: event.target.value,
                            }))
                          }
                          className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none transition focus:border-zinc-900"
                          placeholder="https://..."
                        />
                      </label>
                    ) : (
                      <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4 text-sm text-zinc-500">
                        Preparing 狀態不需要 PDF。這裡會只保留 waiting list email 蒐集。
                      </div>
                    )}
                  </div>

                  {activeProject.status !== "preparing" ? (
                    <div className="mt-4 rounded-2xl border border-violet-200 bg-violet-50 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-violet-700">
                        研究計劃書 / 同意書來源
                      </p>
                      <label className="mt-3 block text-xs font-medium text-zinc-700">
                        同意書來源
                        <select
                          value={getResearchProjectConsentSourceId(activeProject)}
                          onChange={(event) =>
                            updateActiveProject((project) => ({
                              ...project,
                              consentSourceProjectId:
                                event.target.value === project.id ? "" : event.target.value,
                            }))
                          }
                          className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none transition focus:border-zinc-900"
                        >
                          {getVisibleConsentOptions(activeProject, consents).map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </label>

                      <div className="mt-3 rounded-xl border border-violet-200 bg-white p-3">
                        {getVisibleConsentOptions(activeProject, consents)
                          .filter(
                            (option) =>
                              option.value === getResearchProjectConsentSourceId(activeProject),
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
                          這裡只在 Quantitative 狀態出現。你可以直接使用此專案自己的量表，
                          或改用既有的心理量表資料。
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
                          value={getResearchProjectAssessmentSourceId(activeProject)}
                          onChange={(event) =>
                            updateActiveProject((project) => ({
                              ...project,
                              assessmentSourceProjectId:
                                event.target.value === project.id ? "" : event.target.value,
                              testUrl: getResearchProjectTestUrl(project.id),
                            }))
                          }
                          className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none transition focus:border-zinc-900"
                        >
                          {getVisibleScaleOptions(activeProject, scales).map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </label>

                      <div className="mt-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3">
                        {getVisibleScaleOptions(activeProject, scales)
                          .filter(
                            (option) =>
                              option.value ===
                              getResearchProjectAssessmentSourceId(activeProject),
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
                        {activeProject.pdfUrl || "未設定"}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                        Assessment source
                      </p>
                      <p className="mt-2 break-all text-zinc-900">
                        {activeProject.status === "quantitative"
                          ? getResearchProjectAssessmentSourceId(activeProject)
                          : "不啟用"}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                        Consent source
                      </p>
                      <p className="mt-2 break-all text-zinc-900">
                        {activeProject.status !== "preparing"
                          ? getResearchProjectConsentSourceId(activeProject)
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
