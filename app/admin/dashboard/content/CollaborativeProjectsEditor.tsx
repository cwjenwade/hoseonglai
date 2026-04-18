"use client";

import { useMemo, useState } from "react";
import {
  PROJECT_CONTACT_VISIBILITIES,
  RESEARCH_PROJECT_STATUSES,
  type ProjectContactVisibility,
  type ResearchProject,
  type ResearchProjectStatus,
} from "@/app/collaborative-prosperity/projects";

type CollaborativeProjectsEditorProps = {
  initialProjects: ResearchProject[];
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
    testUrl: `/collaborative-prosperity/tests/${id}`,
    contactVisibility: "admin_only",
  };
}

export default function CollaborativeProjectsEditor({ initialProjects }: CollaborativeProjectsEditorProps) {
  const [projects, setProjects] = useState<ResearchProject[]>(initialProjects || []);

  const payload = useMemo(() => projects, [projects]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900">Collaborative Prosperity 編輯器</h2>
          <p className="mt-1 text-sm text-zinc-600">管理研究狀態、共同資訊 A-E、PDF、waiting list 與量表入口。</p>
        </div>

        <button
          type="button"
          onClick={() => setProjects((prev) => [...prev, createEmptyProject()])}
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100"
        >
          新增專案
        </button>
      </div>

      <div className="space-y-4">
        {projects.map((project, index) => (
          <article key={project.id || index} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
            <div className="grid gap-3 md:grid-cols-2">
              <label className="text-xs text-zinc-700">
                專案 ID
                <input
                  value={project.id}
                  onChange={(e) =>
                    setProjects((prev) =>
                      prev.map((item, i) => (i === index ? { ...item, id: e.target.value } : item)),
                    )
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                  placeholder="emotion-patterns"
                />
              </label>

              <label className="text-xs text-zinc-700">
                狀態
                <select
                  value={project.status}
                  onChange={(e) =>
                    setProjects((prev) =>
                      prev.map((item, i) =>
                        i === index
                          ? {
                              ...item,
                              status: e.target.value as ResearchProjectStatus,
                              contactVisibility: defaultContactVisibility(
                                e.target.value as ResearchProjectStatus,
                              ),
                            }
                          : item,
                      ),
                    )
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                >
                  {RESEARCH_PROJECT_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <label className="text-xs text-zinc-700">
                中文標題
                <input
                  value={project.title}
                  onChange={(e) =>
                    setProjects((prev) =>
                      prev.map((item, i) => (i === index ? { ...item, title: e.target.value } : item)),
                    )
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                />
              </label>

              <label className="text-xs text-zinc-700">
                英文副標
                <input
                  value={project.subtitle}
                  onChange={(e) =>
                    setProjects((prev) =>
                      prev.map((item, i) => (i === index ? { ...item, subtitle: e.target.value } : item)),
                    )
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                />
              </label>
            </div>

            <label className="mt-3 block text-xs text-zinc-700">
              卡片描述
              <textarea
                value={project.description}
                onChange={(e) =>
                  setProjects((prev) =>
                    prev.map((item, i) => (i === index ? { ...item, description: e.target.value } : item)),
                  )
                }
                className="mt-1 h-24 w-full rounded-lg border border-zinc-300 p-3 text-sm outline-none focus:border-amber-400"
              />
            </label>

            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <label className="text-xs text-zinc-700">
                A. 研究主題
                <input
                  value={project.topic}
                  onChange={(e) =>
                    setProjects((prev) =>
                      prev.map((item, i) => (i === index ? { ...item, topic: e.target.value } : item)),
                    )
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                />
              </label>

              <label className="text-xs text-zinc-700">
                C. 需要時間
                <input
                  value={project.duration}
                  onChange={(e) =>
                    setProjects((prev) =>
                      prev.map((item, i) => (i === index ? { ...item, duration: e.target.value } : item)),
                    )
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                  placeholder="約 10–12 分鐘"
                />
              </label>
            </div>

            <label className="mt-3 block text-xs text-zinc-700">
              B. 研究目的
              <textarea
                value={project.purpose}
                onChange={(e) =>
                  setProjects((prev) =>
                    prev.map((item, i) => (i === index ? { ...item, purpose: e.target.value } : item)),
                  )
                }
                className="mt-1 h-24 w-full rounded-lg border border-zinc-300 p-3 text-sm outline-none focus:border-amber-400"
              />
            </label>

            <label className="mt-3 block text-xs text-zinc-700">
              D. 參與方式
              <textarea
                value={project.participationMethod}
                onChange={(e) =>
                  setProjects((prev) =>
                    prev.map((item, i) =>
                      i === index ? { ...item, participationMethod: e.target.value } : item,
                    ),
                  )
                }
                className="mt-1 h-24 w-full rounded-lg border border-zinc-300 p-3 text-sm outline-none focus:border-amber-400"
              />
            </label>

            <label className="mt-3 block text-xs text-zinc-700">
              E. 簡要說明
              <textarea
                value={project.summary}
                onChange={(e) =>
                  setProjects((prev) =>
                    prev.map((item, i) => (i === index ? { ...item, summary: e.target.value } : item)),
                  )
                }
                className="mt-1 h-24 w-full rounded-lg border border-zinc-300 p-3 text-sm outline-none focus:border-amber-400"
              />
            </label>

            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <label className="text-xs text-zinc-700">
                PDF 連結
                <input
                  value={project.pdfUrl}
                  onChange={(e) =>
                    setProjects((prev) =>
                      prev.map((item, i) => (i === index ? { ...item, pdfUrl: e.target.value } : item)),
                    )
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                  placeholder="https://..."
                />
              </label>

              <label className="text-xs text-zinc-700">
                Email 可見性
                <select
                  value={project.contactVisibility}
                  onChange={(e) =>
                    setProjects((prev) =>
                      prev.map((item, i) =>
                        i === index
                          ? {
                              ...item,
                              contactVisibility: e.target.value as ProjectContactVisibility,
                            }
                          : item,
                      ),
                    )
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                >
                  {PROJECT_CONTACT_VISIBILITIES.map((visibility) => (
                    <option key={visibility} value={visibility}>
                      {visibility}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <label className="text-xs text-zinc-700">
                測驗網址（Quantitative 用）
                <input
                  value={project.testUrl}
                  onChange={(e) =>
                    setProjects((prev) =>
                      prev.map((item, i) => (i === index ? { ...item, testUrl: e.target.value } : item)),
                    )
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                  placeholder="/collaborative-prosperity/tests/emotion-patterns"
                />
              </label>
              <label className="text-xs text-zinc-700">
                參與對象（選填）
                <input
                  value={project.target}
                  onChange={(e) =>
                    setProjects((prev) =>
                      prev.map((item, i) => (i === index ? { ...item, target: e.target.value } : item)),
                    )
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                  placeholder="一般成人"
                />
              </label>
            </div>

            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setProjects((prev) => prev.filter((_, i) => i !== index))}
                className="rounded-full border border-red-200 px-3 py-1 text-xs text-red-600 transition hover:bg-red-50"
              >
                刪除專案
              </button>
            </div>
          </article>
        ))}
      </div>

      <input type="hidden" name="payload" value={JSON.stringify(payload)} />
    </div>
  );
}
