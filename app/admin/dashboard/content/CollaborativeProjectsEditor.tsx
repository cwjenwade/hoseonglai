"use client";

import { useMemo, useState } from "react";
import type { ResearchProject } from "@/app/collaborative-prosperity/projects";

type CollaborativeProjectsEditorProps = {
  initialProjects: ResearchProject[];
};

function createEmptyProject(): ResearchProject {
  const id = `project-${Date.now().toString(36)}`;
  return {
    id,
    title: "",
    subtitle: "",
    description: "",
    duration: "",
    target: "",
    testUrl: `/collaborative-prosperity/tests/${id}`,
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
          <p className="mt-1 text-sm text-zinc-600">管理研究專案卡片（標題、描述、時長、對象與測驗連結）。</p>
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
                測驗網址
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
              專案描述
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
                參與時長
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

              <label className="text-xs text-zinc-700">
                參與對象
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
