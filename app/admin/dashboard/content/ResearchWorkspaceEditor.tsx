"use client";

import { useEffect, useMemo, useState } from "react";
import type { PsychometricScale } from "@/app/collaborative-prosperity/assessment-data";
import type { ResearchConsent } from "@/app/collaborative-prosperity/consent-data";
import type { ResearchScheduling } from "@/app/collaborative-prosperity/scheduling-data";
import {
  getResearchProjectTestUrl,
  getResearchPublishStatusLabel,
  type ResearchProject,
  type ResearchProjectType,
  type ResearchPublishStatus,
} from "@/app/collaborative-prosperity/projects";
import { EditorSection } from "./ui/EditorSection";
import { GovernanceFields } from "./ui/GovernanceFields";
import { StatusBadge } from "./ui/StatusBadge";

type ResearchWorkspaceEditorProps = {
  initialProject: ResearchProject;
  initialConsent: ResearchConsent;
  initialAssessment: PsychometricScale | null;
  initialScheduling: ResearchScheduling | null;
  activeTab: "project" | "consent" | "flow";
  uploadedPdfUrl?: string;
  draftKey: string;
  shouldClearDraft?: boolean;
};

const DRAFT_STORAGE_KEY = "research-workspace-draft-v1";

type ResearchWorkspaceDraft = {
  draftKey: string;
  project: ResearchProject;
  consent: ResearchConsent;
  assessment: PsychometricScale | null;
  scheduling: ResearchScheduling | null;
};

function readWorkspaceDraft(draftKey: string): ResearchWorkspaceDraft | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<ResearchWorkspaceDraft>;
    if (!parsed || parsed.draftKey !== draftKey) return null;
    if (!parsed.project || !parsed.consent) return null;

    return {
      draftKey,
      project: parsed.project as ResearchProject,
      consent: parsed.consent as ResearchConsent,
      assessment: (parsed.assessment as PsychometricScale | null) || null,
      scheduling: (parsed.scheduling as ResearchScheduling | null) || null,
    };
  } catch {
    return null;
  }
}

function syncTitles(project: ResearchProject, consent: ResearchConsent, assessment: PsychometricScale | null, scheduling: ResearchScheduling | null) {
  const nextConsent: ResearchConsent = {
    ...consent,
    projectId: project.id,
    projectTitleZh: project.title,
    projectTitleEn: project.subtitle,
  };

  const nextAssessment = assessment
    ? {
        ...assessment,
        projectId: project.id,
        projectTitleZh: project.title,
        projectTitleEn: project.subtitle,
      }
    : null;

  const nextScheduling = scheduling
    ? {
        ...scheduling,
        projectId: project.id,
        projectTitleZh: project.title,
        projectTitleEn: project.subtitle,
      }
    : null;

  return {
    consent: nextConsent,
    assessment: nextAssessment,
    scheduling: nextScheduling,
  };
}

export default function ResearchWorkspaceEditor({
  initialProject,
  initialConsent,
  initialAssessment,
  initialScheduling,
  activeTab,
  uploadedPdfUrl,
  draftKey,
  shouldClearDraft = false,
}: ResearchWorkspaceEditorProps) {
  const draft = readWorkspaceDraft(draftKey);
  const [project, setProject] = useState<ResearchProject>(draft?.project || initialProject);
  const [consent, setConsent] = useState<ResearchConsent>(() => ({
    ...(draft?.consent || initialConsent),
    pdfUrl: uploadedPdfUrl || draft?.consent?.pdfUrl || initialConsent.pdfUrl,
  }));
  const [assessment, setAssessment] = useState<PsychometricScale | null>(
    draft?.assessment || initialAssessment,
  );
  const [scheduling, setScheduling] = useState<ResearchScheduling | null>(
    draft?.scheduling || initialScheduling,
  );

  const researchType = (project.researchType || project.status || "quantitative") as ResearchProjectType;
  const publishStatus = (project.publishStatus || "preparing") as ResearchPublishStatus;

  const syncedPayloads = useMemo(() => {
    const normalizedProject: ResearchProject = {
      ...project,
      status: researchType,
      researchType,
      publishStatus,
      isPublished: publishStatus === "published",
      testUrl: researchType === "quantitative" ? getResearchProjectTestUrl(project.id) : "",
      contactVisibility: researchType === "qualitative" ? "share_with_pi" : "admin_only",
      assessmentSourceProjectId: researchType === "quantitative" ? "" : "",
      consentSourceProjectId: publishStatus === "published" ? "" : "",
    };

    const synced = syncTitles(normalizedProject, consent, assessment, scheduling);

    return {
      project: normalizedProject,
      consent: synced.consent,
      assessment:
        researchType === "quantitative"
          ? synced.assessment || {
              projectId: normalizedProject.id,
              projectTitleZh: normalizedProject.title,
              projectTitleEn: normalizedProject.subtitle,
              scalePrompt: "請依照實際情況作答。",
              options: ["非常不同意", "不同意", "普通", "同意", "非常同意"],
              questions: [""],
              isPublished: normalizedProject.isPublished,
              displayOrder: normalizedProject.displayOrder,
              updatedAt: "",
              internalNote: "",
            }
          : null,
      scheduling:
        researchType === "qualitative"
          ? synced.scheduling || {
              projectId: normalizedProject.id,
              projectTitleZh: normalizedProject.title,
              projectTitleEn: normalizedProject.subtitle,
              schedulingPrompt: "請勾選你方便參與訪談或研究安排的時段。",
              selectionNote: "研究團隊將依你選擇的時段與你聯繫後續安排。",
              allowMultiple: true,
              availabilitySlots: [],
              isPublished: normalizedProject.isPublished,
              displayOrder: normalizedProject.displayOrder,
              updatedAt: "",
              internalNote: "",
            }
          : null,
    };
  }, [assessment, consent, project, publishStatus, researchType, scheduling]);

  function updateProject(updates: Partial<ResearchProject>) {
    setProject((prev) => ({ ...prev, ...updates }));
  }

  function updateResearchType(nextType: ResearchProjectType) {
    setProject((prev) => ({
      ...prev,
      researchType: nextType,
      status: nextType,
      contactVisibility: nextType === "qualitative" ? "share_with_pi" : "admin_only",
    }));
  }

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (shouldClearDraft) {
      window.localStorage.removeItem(DRAFT_STORAGE_KEY);
      return;
    }

    const payload: ResearchWorkspaceDraft = {
      draftKey,
      project,
      consent,
      assessment,
      scheduling,
    };
    window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(payload));
  }, [assessment, consent, draftKey, project, scheduling, shouldClearDraft]);

  return (
    <div className="space-y-5">
      {activeTab === "project" ? (
        <>
          <EditorSection title="Project Settings" description="這一區只處理研究本身，不再混入 consent 與 assessment 的獨立模組概念。">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-xs font-medium text-zinc-700">
                projectId
                <input
                  value={project.id}
                  onChange={(event) => updateProject({ id: event.target.value })}
                  className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900"
                />
              </label>
              <label className="text-xs font-medium text-zinc-700">
                發布狀態
                <select
                  value={publishStatus}
                  onChange={(event) =>
                    updateProject({ publishStatus: event.target.value as ResearchPublishStatus })
                  }
                  className="mt-1 h-11 w-full rounded-xl border border-zinc-300 bg-white px-3 text-sm outline-none focus:border-zinc-900"
                >
                  <option value="preparing">Preparing</option>
                  <option value="published">Published</option>
                </select>
              </label>
              <label className="text-xs font-medium text-zinc-700">
                研究類型
                <select
                  value={researchType}
                  onChange={(event) => updateResearchType(event.target.value as ResearchProjectType)}
                  className="mt-1 h-11 w-full rounded-xl border border-zinc-300 bg-white px-3 text-sm outline-none focus:border-zinc-900"
                >
                  <option value="quantitative">Quantitative</option>
                  <option value="qualitative">Qualitative</option>
                </select>
              </label>
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">前台可見性</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <StatusBadge
                    tone={publishStatus === "published" ? "visible" : "hidden"}
                    label={publishStatus === "published" ? "Visible" : "Hidden"}
                  />
                  <StatusBadge tone="linked" label={getResearchPublishStatusLabel(publishStatus)} />
                  <StatusBadge tone="linked" label={researchType} />
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="text-xs font-medium text-zinc-700">
                中文標題
                <input value={project.title} onChange={(event) => updateProject({ title: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
              </label>
              <label className="text-xs font-medium text-zinc-700">
                英文副標
                <input value={project.subtitle} onChange={(event) => updateProject({ subtitle: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
              </label>
            </div>

            <label className="mt-4 block text-xs font-medium text-zinc-700">
              卡片描述
              <textarea value={project.description} onChange={(event) => updateProject({ description: event.target.value })} className="mt-1 h-28 w-full rounded-xl border border-zinc-300 p-3 text-sm outline-none focus:border-zinc-900" />
            </label>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="text-xs font-medium text-zinc-700">
                A. 研究主題
                <input value={project.topic} onChange={(event) => updateProject({ topic: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
              </label>
              <label className="text-xs font-medium text-zinc-700">
                B. 計畫主持人
                <input value={project.principalInvestigator} onChange={(event) => updateProject({ principalInvestigator: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
              </label>
              <label className="text-xs font-medium text-zinc-700">
                C. 研究聯絡人
                <input value={project.researchContact} onChange={(event) => updateProject({ researchContact: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
              </label>
              <label className="text-xs font-medium text-zinc-700">
                D. 參與方式與時間
                <textarea value={project.participationDetails} onChange={(event) => updateProject({ participationDetails: event.target.value })} className="mt-1 h-24 w-full rounded-xl border border-zinc-300 p-3 text-sm outline-none focus:border-zinc-900" />
              </label>
            </div>

            <label className="mt-4 block text-xs font-medium text-zinc-700">
              E. 研究對象與目的
              <textarea value={project.researchAudiencePurpose} onChange={(event) => updateProject({ researchAudiencePurpose: event.target.value })} className="mt-1 h-28 w-full rounded-xl border border-zinc-300 p-3 text-sm outline-none focus:border-zinc-900" />
            </label>
          </EditorSection>

          <EditorSection title="管理設定">
            <GovernanceFields
              value={project}
              visibilityLabel="後台治理欄位"
              onChange={(updates) => updateProject(updates)}
            />
          </EditorSection>
        </>
      ) : null}

      {activeTab === "consent" ? (
        <>
          <EditorSection title="Consent" description="Consent 是所有 published research 的必要子區塊。">
            <div className="grid gap-4 md:grid-cols-3">
              <label className="text-xs font-medium text-zinc-700">
                projectId
                <input
                  value={project.id}
                  readOnly
                  className="mt-1 h-11 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-600 outline-none"
                />
              </label>
              <label className="text-xs font-medium text-zinc-700">
                中文標題
                <input value={project.title} readOnly className="mt-1 h-11 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-600 outline-none" />
              </label>
              <label className="text-xs font-medium text-zinc-700">
                英文標題
                <input value={project.subtitle} readOnly className="mt-1 h-11 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-600 outline-none" />
              </label>
              <label className="text-xs font-medium text-zinc-700">
                計畫主持人
                <input value={consent.principalInvestigator} onChange={(event) => setConsent((prev) => ({ ...prev, principalInvestigator: event.target.value }))} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
              </label>
              <label className="text-xs font-medium text-zinc-700">
                研究單位
                <input value={consent.researchUnit} onChange={(event) => setConsent((prev) => ({ ...prev, researchUnit: event.target.value }))} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
              </label>
            </div>

            <label className="mt-4 block text-xs font-medium text-zinc-700">
              PDF 連結
              <input value={consent.pdfUrl || ""} onChange={(event) => setConsent((prev) => ({ ...prev, pdfUrl: event.target.value }))} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
            </label>
            {uploadedPdfUrl ? (
              <div className="mt-3 flex flex-wrap items-center gap-3 rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-700">
                <span>最新上傳：{uploadedPdfUrl}</span>
                <button type="button" onClick={() => setConsent((prev) => ({ ...prev, pdfUrl: uploadedPdfUrl }))} className="rounded-full border border-sky-300 px-3 py-1.5 text-xs transition hover:bg-sky-100">
                  套用 PDF
                </button>
              </div>
            ) : null}

            <label className="mt-4 block text-xs font-medium text-zinc-700">
              研究說明
              <textarea value={consent.researchDescription} onChange={(event) => setConsent((prev) => ({ ...prev, researchDescription: event.target.value }))} className="mt-1 h-36 w-full rounded-xl border border-zinc-300 p-3 text-sm outline-none focus:border-zinc-900" />
            </label>
          </EditorSection>

          <EditorSection title="管理設定">
            <GovernanceFields
              value={consent}
              visibilityLabel="Consent 治理欄位"
              onChange={(updates) => setConsent((prev) => ({ ...prev, ...updates }))}
            />
          </EditorSection>
        </>
      ) : null}

      {activeTab === "flow" ? (
        researchType === "quantitative" ? (
          <>
            <EditorSection title="Assessment" description="Quantitative 研究才顯示 assessment；前台 `tests/[projectId]` 仍會吃同一組資料。">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">測驗網址</p>
                <p className="mt-2 break-all text-sm text-zinc-900">{getResearchProjectTestUrl(project.id)}</p>
              </div>

              <label className="mt-4 block text-xs font-medium text-zinc-700">
                量尺說明
                <input value={syncedPayloads.assessment?.scalePrompt || ""} onChange={(event) => setAssessment((prev) => ({ ...(prev || syncedPayloads.assessment!), scalePrompt: event.target.value }))} className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900" />
              </label>

              <label className="mt-4 block text-xs font-medium text-zinc-700">
                量尺選項
                <textarea value={(syncedPayloads.assessment?.options || []).join("\n")} onChange={(event) => setAssessment((prev) => ({ ...(prev || syncedPayloads.assessment!), options: event.target.value.split("\n").map((value) => value.trim()).filter(Boolean) }))} className="mt-1 h-36 w-full rounded-xl border border-zinc-300 p-3 text-sm outline-none focus:border-zinc-900" />
              </label>

              <label className="mt-4 block text-xs font-medium text-zinc-700">
                題項列表
                <textarea value={(syncedPayloads.assessment?.questions || []).join("\n")} onChange={(event) => setAssessment((prev) => ({ ...(prev || syncedPayloads.assessment!), questions: event.target.value.split("\n").map((value) => value.trim()).filter(Boolean) }))} className="mt-1 h-64 w-full rounded-xl border border-zinc-300 p-3 text-sm outline-none focus:border-zinc-900" />
              </label>
            </EditorSection>

            <EditorSection title="管理設定">
              <GovernanceFields
                value={syncedPayloads.assessment || {}}
                visibilityLabel="Assessment 治理欄位"
                onChange={(updates) =>
                  setAssessment((prev) => ({ ...(prev || syncedPayloads.assessment!), ...updates }))
                }
              />
            </EditorSection>
          </>
        ) : (
          <>
            <EditorSection title="Scheduling / Time Selection" description="Qualitative 研究不顯示量表，改用研究專屬時段勾選。">
              <label className="block text-xs font-medium text-zinc-700">
                時段說明
                <textarea value={syncedPayloads.scheduling?.schedulingPrompt || ""} onChange={(event) => setScheduling((prev) => ({ ...(prev || syncedPayloads.scheduling!), schedulingPrompt: event.target.value }))} className="mt-1 h-28 w-full rounded-xl border border-zinc-300 p-3 text-sm outline-none focus:border-zinc-900" />
              </label>
              <label className="mt-4 block text-xs font-medium text-zinc-700">
                勾選後提示
                <textarea value={syncedPayloads.scheduling?.selectionNote || ""} onChange={(event) => setScheduling((prev) => ({ ...(prev || syncedPayloads.scheduling!), selectionNote: event.target.value }))} className="mt-1 h-24 w-full rounded-xl border border-zinc-300 p-3 text-sm outline-none focus:border-zinc-900" />
              </label>
              <label className="mt-4 flex items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
                <input type="checkbox" checked={syncedPayloads.scheduling?.allowMultiple !== false} onChange={(event) => setScheduling((prev) => ({ ...(prev || syncedPayloads.scheduling!), allowMultiple: event.target.checked }))} className="h-4 w-4 accent-zinc-900" />
                <span>允許多選時段</span>
              </label>
              <label className="mt-4 block text-xs font-medium text-zinc-700">
                可選時段
                <textarea value={(syncedPayloads.scheduling?.availabilitySlots || []).join("\n")} onChange={(event) => setScheduling((prev) => ({ ...(prev || syncedPayloads.scheduling!), availabilitySlots: event.target.value.split("\n").map((value) => value.trim()).filter(Boolean) }))} className="mt-1 h-64 w-full rounded-xl border border-zinc-300 p-3 text-sm outline-none focus:border-zinc-900" />
              </label>
            </EditorSection>

            <EditorSection title="管理設定">
              <GovernanceFields
                value={syncedPayloads.scheduling || {}}
                visibilityLabel="Scheduling 治理欄位"
                onChange={(updates) =>
                  setScheduling((prev) => ({ ...(prev || syncedPayloads.scheduling!), ...updates }))
                }
              />
            </EditorSection>
          </>
        )
      ) : null}

      <input type="hidden" name="projectPayload" value={JSON.stringify(syncedPayloads.project)} />
      <input type="hidden" name="consentPayload" value={JSON.stringify(syncedPayloads.consent)} />
      <input type="hidden" name="assessmentPayload" value={JSON.stringify(syncedPayloads.assessment)} />
      <input type="hidden" name="schedulingPayload" value={JSON.stringify(syncedPayloads.scheduling)} />
    </div>
  );
}
