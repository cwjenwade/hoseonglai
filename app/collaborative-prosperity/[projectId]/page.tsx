import Link from "next/link";
import { notFound } from "next/navigation";
import { getSiteContentSection } from "@/lib/site-content-server";
import PreparingWaitingListForm from "../PreparingWaitingListForm";
import ResearchEnrollForm from "../ResearchEnrollForm";
import {
  RESEARCH_PROJECTS,
  getProjectContactVisibilityLabel,
  getProjectStatusLabel,
  normalizeResearchProjects,
} from "../projects";

type PageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function CollaborativeProjectDetailPage({
  params,
}: PageProps) {
  const { projectId } = await params;
  const rawProjects = await getSiteContentSection(
    "collaborative_prosperity_projects",
    RESEARCH_PROJECTS,
  );
  const projects = normalizeResearchProjects(rawProjects, RESEARCH_PROJECTS);
  const project = projects.find((item) => item.id === projectId);

  if (!project) {
    notFound();
  }

  const showPdfReader =
    (project.status === "quantitative" || project.status === "qualitative") &&
    Boolean(project.pdfUrl);

  return (
    <div className="w-full bg-[#f3f3f2] text-neutral-900">
      <section className="border-b border-neutral-300/60">
        <div className="mx-auto w-full max-w-[1520px] px-6 py-14 md:px-10 md:py-16 xl:px-14 xl:py-20">
          <Link
            href="/collaborative-prosperity"
            className="text-[0.68rem] uppercase tracking-[0.34em] text-neutral-400 transition hover:text-neutral-700"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Back to projects
          </Link>

          <div className="mt-10 grid gap-12 xl:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)]">
            <div>
              <p
                className="text-[0.64rem] uppercase tracking-[0.34em] text-neutral-400"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {getProjectStatusLabel(project.status)}
              </p>

              <h1
                className="mt-6 text-[2.8rem] leading-[0.96] tracking-[-0.03em] text-neutral-900 sm:text-[4.2rem]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {project.title}
              </h1>

              <p
                className="mt-4 text-[0.82rem] uppercase tracking-[0.18em] text-neutral-500"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {project.subtitle}
              </p>

              <p
                className="mt-8 max-w-[62ch] text-[1.05rem] leading-[1.9] text-neutral-700"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {project.description}
              </p>

              <div className="mt-10 grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-neutral-300/60 bg-white/60 p-5">
                  <p
                    className="text-[0.64rem] uppercase tracking-[0.28em] text-neutral-400"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    A. 研究主題
                  </p>
                  <p
                    className="mt-3 text-[1rem] leading-[1.8] text-neutral-800"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {project.topic}
                  </p>
                </div>

                <div className="rounded-2xl border border-neutral-300/60 bg-white/60 p-5">
                  <p
                    className="text-[0.64rem] uppercase tracking-[0.28em] text-neutral-400"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    B. 研究目的
                  </p>
                  <p
                    className="mt-3 text-[1rem] leading-[1.8] text-neutral-800"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {project.purpose}
                  </p>
                </div>

                <div className="rounded-2xl border border-neutral-300/60 bg-white/60 p-5">
                  <p
                    className="text-[0.64rem] uppercase tracking-[0.28em] text-neutral-400"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    C. 需要時間
                  </p>
                  <p
                    className="mt-3 text-[1rem] leading-[1.8] text-neutral-800"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {project.duration}
                  </p>
                </div>

                <div className="rounded-2xl border border-neutral-300/60 bg-white/60 p-5">
                  <p
                    className="text-[0.64rem] uppercase tracking-[0.28em] text-neutral-400"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    D. 參與方式
                  </p>
                  <p
                    className="mt-3 text-[1rem] leading-[1.8] text-neutral-800"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {project.participationMethod}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-neutral-300/60 bg-white/60 p-5">
                <p
                  className="text-[0.64rem] uppercase tracking-[0.28em] text-neutral-400"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  E. 簡要說明
                </p>
                <p
                  className="mt-3 text-[1rem] leading-[1.9] text-neutral-800"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {project.summary}
                </p>
              </div>

              {showPdfReader ? (
                <div className="mt-10 space-y-4">
                  <div>
                    <p
                      className="text-[0.64rem] uppercase tracking-[0.28em] text-neutral-400"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      Research PDF
                    </p>
                    <h2
                      className="mt-3 text-[1.6rem] text-neutral-900"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      研究計畫書 / 知情同意文件
                    </h2>
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-neutral-300/60 bg-white">
                    <iframe
                      src={project.pdfUrl}
                      title={`${project.title} PDF`}
                      className="h-[640px] w-full"
                    />
                  </div>
                </div>
              ) : project.status !== "preparing" ? (
                <div className="mt-10 rounded-2xl border border-dashed border-neutral-300 bg-white/50 p-5">
                  <p
                    className="text-[0.95rem] leading-[1.8] text-neutral-700"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    這個研究目前尚未設定 PDF 檔案，請先到後台補上研究計畫書連結。
                  </p>
                </div>
              ) : null}
            </div>

            <aside className="h-fit border border-neutral-300/60 bg-white/70 p-8">
              <p
                className="text-[0.68rem] uppercase tracking-[0.34em] text-neutral-400"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {project.status === "preparing" ? "Waiting list" : "Enrollment"}
              </p>

              <h2
                className="mt-4 text-[2rem] leading-[1.02] tracking-[-0.02em] text-neutral-900"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {project.status === "preparing"
                  ? "留下 email 先加入 waiting list"
                  : project.status === "quantitative"
                    ? "閱讀文件後，繼續研究流程"
                    : "閱讀文件後，完成質性研究報名"}
              </h2>

              <p
                className="mt-4 text-[1rem] leading-[1.8] text-neutral-700"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {project.status === "preparing"
                  ? "這個研究目前處於準備階段。我們會先蒐集有意願參與的 email，待研究正式開放後再通知你。"
                  : project.status === "quantitative"
                    ? "量化研究會沿用目前心理量表流程。你送出後會直接進入研究同意與量表頁，參與者 email 僅 admin 可見。"
                    : "質性研究送出後，研究主持人可依你提供的 email 與你聯繫，安排後續訪談或研究步驟。"}
              </p>

              <div className="mt-6 rounded-2xl border border-neutral-300/60 bg-[#f7f5ef] p-4">
                <p
                  className="text-[0.64rem] uppercase tracking-[0.28em] text-neutral-400"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Email visibility
                </p>
                <p
                  className="mt-2 text-[0.98rem] leading-[1.8] text-neutral-700"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {getProjectContactVisibilityLabel(project.contactVisibility)}
                </p>
              </div>

              <div className="mt-8">
                {project.status === "preparing" ? (
                  <PreparingWaitingListForm project={project} />
                ) : (
                  <ResearchEnrollForm project={project} />
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
