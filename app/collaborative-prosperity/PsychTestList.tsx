import Link from "next/link";
import { getSiteContentSection } from "@/lib/site-content-server";
import {
  RESEARCH_PROJECTS,
  getProjectStatusLabel,
  normalizeResearchProjects,
} from "./projects";

export default async function PsychTestList() {
  const rawProjects = await getSiteContentSection(
    "collaborative_prosperity_projects",
    RESEARCH_PROJECTS,
  );
  const projects = normalizeResearchProjects(rawProjects, RESEARCH_PROJECTS);

  return (
    <div className="grid gap-x-7 gap-y-14 xl:grid-cols-3 xl:gap-y-16">
      {projects.map((project) => (
        <article
          key={project.id}
          className="border border-neutral-300/60 bg-transparent"
        >
          <div className="p-8">
            <h3
              className="text-[2rem] leading-[1.02] tracking-[-0.02em] text-neutral-900"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {project.title}
            </h3>

            <p
              className="mt-2 text-[0.8rem] uppercase tracking-[0.18em] text-neutral-500"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {project.subtitle}
            </p>

            <p
              className="mt-4 text-[0.68rem] uppercase tracking-[0.28em] text-neutral-400"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {getProjectStatusLabel(project.status)}
            </p>

            <p
              className="mt-8 text-[1rem] leading-[1.9] text-neutral-700"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {project.description}
            </p>

            <div className="mt-10 grid gap-6 border-t border-neutral-300/60 pt-6">
              <div>
                <p
                  className="text-[0.62rem] uppercase tracking-[0.32em] text-neutral-400"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  計畫主持人
                </p>
                <p
                  className="mt-2 text-neutral-700"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {project.principalInvestigator}
                </p>
              </div>

              <div>
                <p
                  className="text-[0.62rem] uppercase tracking-[0.32em] text-neutral-400"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  參與方式與時間
                </p>
                <p
                  className="mt-2 text-neutral-700"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {project.participationDetails}
                </p>
              </div>
            </div>

            <div className="mt-10">
              <Link
                href={`/collaborative-prosperity/${encodeURIComponent(project.id)}`}
                className="inline-flex min-h-11 items-center justify-center border border-neutral-900 px-6 text-[0.72rem] uppercase tracking-[0.22em] text-neutral-900 transition hover:bg-neutral-900 hover:text-[#f3f3f2]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                查看研究內容
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
