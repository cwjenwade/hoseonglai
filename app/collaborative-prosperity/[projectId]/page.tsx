import Link from "next/link";
import { notFound } from "next/navigation";
import { getSiteContentSection } from "@/lib/site-content-server";
import {
  DEFAULT_RESEARCH_CONSENTS,
  type ResearchConsent,
} from "../consent-data";
import {
  RESEARCH_PROJECTS,
  getResearchProjectConsentSourceId,
  getResearchProjectGoogleFormUrl,
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
  const consents = await getSiteContentSection<ResearchConsent[]>(
    "collaborative_prosperity_consents",
    DEFAULT_RESEARCH_CONSENTS,
  );
  const projects = normalizeResearchProjects(rawProjects, RESEARCH_PROJECTS);
  const project = projects.find((item) => item.id === projectId);

  if (!project) {
    notFound();
  }

  const consentSourceId = getResearchProjectConsentSourceId(project);
  const consent =
    consents.find((item) => item.projectId === consentSourceId) ||
    DEFAULT_RESEARCH_CONSENTS.find((item) => item.projectId === consentSourceId);
  const projectPdfUrl = consent?.pdfUrl || "";
  const principalInvestigator =
    project.principalInvestigator || consent?.principalInvestigator || "待補充";
  const researchContact = project.researchContact || consent?.researchUnit || "待補充";
  const googleFormUrl = getResearchProjectGoogleFormUrl(project);

  const showPdfReader =
    (project.status === "quantitative" || project.status === "qualitative") &&
    Boolean(projectPdfUrl);

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
                    B. 計畫主持人
                  </p>
                  <p
                    className="mt-3 text-[1rem] leading-[1.8] text-neutral-800"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {principalInvestigator}
                  </p>
                </div>

                <div className="rounded-2xl border border-neutral-300/60 bg-white/60 p-5">
                  <p
                    className="text-[0.64rem] uppercase tracking-[0.28em] text-neutral-400"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    C. 研究聯絡人
                  </p>
                  <p
                    className="mt-3 text-[1rem] leading-[1.8] text-neutral-800"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {researchContact}
                  </p>
                </div>

                <div className="rounded-2xl border border-neutral-300/60 bg-white/60 p-5">
                  <p
                    className="text-[0.64rem] uppercase tracking-[0.28em] text-neutral-400"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    D. 參與方式與時間
                  </p>
                  <p
                    className="mt-3 text-[1rem] leading-[1.8] text-neutral-800"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {project.participationDetails}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-neutral-300/60 bg-white/60 p-5">
                <p
                  className="text-[0.64rem] uppercase tracking-[0.28em] text-neutral-400"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  E. 研究對象與目的
                </p>
                <p
                  className="mt-3 text-[1rem] leading-[1.9] text-neutral-800"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {project.researchAudiencePurpose}
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
                      src={projectPdfUrl}
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
                  ? "透過 Google Form 加入 waiting list"
                  : project.status === "quantitative"
                    ? "閱讀文件後，前往 Google Form"
                    : "閱讀文件後，完成 Google Form"}
              </h2>

              <p
                className="mt-4 text-[1rem] leading-[1.8] text-neutral-700"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {project.status === "preparing"
                  ? "這個研究目前處於準備階段。請透過研究專屬 Google Form 留下參與意願。"
                  : project.status === "quantitative"
                    ? "量化研究的參與資料將統一由研究專屬 Google Form 收集。"
                    : "質性研究的報名與後續聯繫資料將統一由研究專屬 Google Form 收集。"}
              </p>

              <div className="mt-6 rounded-2xl border border-neutral-300/60 bg-[#f7f5ef] p-4">
                <p
                  className="text-[0.64rem] uppercase tracking-[0.28em] text-neutral-400"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Participation form
                </p>
                <p
                  className="mt-2 text-[0.98rem] leading-[1.8] text-neutral-700"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {googleFormUrl ? "Google Form is ready." : "Google Form 尚未設定，請先到後台補上連結。"}
                </p>
              </div>

              <div className="mt-8">
                {googleFormUrl ? (
                  <a
                    href={googleFormUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center justify-center border border-neutral-900 px-6 text-[0.72rem] uppercase tracking-[0.22em] text-neutral-900 transition hover:bg-neutral-900 hover:text-[#f3f3f2]"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    Open Google Form
                  </a>
                ) : (
                  <span
                    className="inline-flex min-h-11 cursor-not-allowed items-center justify-center border border-neutral-900 px-6 text-[0.72rem] uppercase tracking-[0.22em] text-neutral-900 opacity-50"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    Google Form not set
                  </span>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
