import JoinProjectForm from "./JoinProjectForm";
import { RESEARCH_PROJECTS } from "./projects";

export default function PsychTestList() {
  return (
    <div className="grid gap-x-7 gap-y-14 xl:grid-cols-3 xl:gap-y-16">
      {RESEARCH_PROJECTS.map((project) => (
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
                  Duration
                </p>
                <p
                  className="mt-2 text-neutral-700"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {project.duration}
                </p>
              </div>

              <div>
                <p
                  className="text-[0.62rem] uppercase tracking-[0.32em] text-neutral-400"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Participants
                </p>
                <p
                  className="mt-2 text-neutral-700"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {project.target}
                </p>
              </div>
            </div>

            <div className="mt-10">
              <JoinProjectForm project={project} />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
