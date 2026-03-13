import Link from "next/link";
import { verifyResearchToken } from "@/lib/research-token";
import { getSiteContentSection } from "@/lib/site-content-server";
import {
  DEFAULT_RESEARCH_CONSENTS,
  type ResearchConsent,
} from "@/app/collaborative-prosperity/consent-data";

type PageProps = {
  searchParams: Promise<{
    token?: string;
  }>;
};

export default async function ResearchStartPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const consents = await getSiteContentSection<ResearchConsent[]>(
    "collaborative_prosperity_consents",
    DEFAULT_RESEARCH_CONSENTS,
  );
  const token = resolvedSearchParams.token || "";
  const payload = verifyResearchToken(token);

  if (!payload) {
    return (
      <div className="w-full bg-[#faf9f6] px-6 py-24 text-neutral-900 lg:px-20">
        <p
          className="text-[0.68rem] uppercase tracking-[0.34em] text-neutral-400"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Invalid link
        </p>

        <h1
          className="mt-6 text-[2.8rem] tracking-[-0.03em]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          連結已失效或無法驗證
        </h1>

        <p
          className="mt-6 max-w-[62ch] text-[1.05rem] leading-[1.9] text-neutral-700"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          此連結可能已過期，或格式不正確。請重新回到研究專案頁面填寫資料，再次取得新的 email 驗證連結。
        </p>

        <Link
          href="/collaborative-prosperity"
          className="mt-10 inline-flex border border-neutral-900 px-6 py-3 text-[0.72rem] uppercase tracking-[0.22em] hover:bg-neutral-900 hover:text-[#f3f3f2]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Back to projects
        </Link>
      </div>
    );
  }

  const mappedConsent =
    consents.find((consentItem) => consentItem.projectId === payload.projectId) ||
    DEFAULT_RESEARCH_CONSENTS.find((consentItem) => consentItem.projectId === payload.projectId);

  const consent = mappedConsent || {
    projectTitleZh: payload.projectTitle,
    projectTitleEn: payload.projectTitle,
    principalInvestigator: "待填寫",
    researchUnit: "Ho-Se 好勢旺來研究團隊",
    researchDescription: "本研究旨在了解受試者之心理狀態與經驗，填答資料僅供研究使用。",
  };

  const testHref = `${payload.projectTestUrl}?token=${encodeURIComponent(token)}`;

  return (
    <div className="w-full bg-[#f3f3f2] text-neutral-900">
      <section className="border-b border-neutral-300/60">
        <div className="px-6 py-24 lg:px-20">
          <p
            className="text-[0.65rem] uppercase tracking-[0.38em] text-neutral-400"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Research Consent
          </p>

          <h1
            className="mt-6 max-w-4xl text-[3rem] leading-[0.95] tracking-[-0.025em] sm:text-[4.4rem]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            研究同意書
          </h1>

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <p
              className="max-w-[62ch] text-[1.05rem] leading-[1.9] text-neutral-700"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              受試者：{payload.name}。你已完成 email 驗證，請先閱讀以下研究同意內容，確認後再開始填寫心理量表。
            </p>

            <p
              className="max-w-[62ch] text-[1.05rem] leading-[1.9] text-neutral-700"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              你的 email 將以受限制方式保存，僅管理員可查看，研究者僅可使用受試者代碼進行資料分析。
            </p>
          </div>

          <div className="mt-10 rounded-2xl border border-neutral-300/60 bg-white/70 p-6">
            <p className="text-xs uppercase tracking-[0.22em] text-neutral-500" style={{ fontFamily: "var(--font-sans)" }}>
              研究標題
            </p>
            <h2 className="mt-2 text-2xl text-neutral-900" style={{ fontFamily: "var(--font-serif)" }}>
              {consent.projectTitleZh}
            </h2>
            <p className="mt-1 text-sm text-neutral-600" style={{ fontFamily: "var(--font-sans)" }}>
              {consent.projectTitleEn}
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-500" style={{ fontFamily: "var(--font-sans)" }}>
                  計劃主持人（PI）
                </p>
                <p className="mt-2 text-[1.02rem] text-neutral-800" style={{ fontFamily: "var(--font-serif)" }}>
                  {consent.principalInvestigator}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-500" style={{ fontFamily: "var(--font-sans)" }}>
                  研究單位
                </p>
                <p className="mt-2 text-[1.02rem] text-neutral-800" style={{ fontFamily: "var(--font-serif)" }}>
                  {consent.researchUnit}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.22em] text-neutral-500" style={{ fontFamily: "var(--font-sans)" }}>
                研究事項說明
              </p>
              <p className="mt-2 whitespace-pre-wrap text-[1.02rem] leading-[1.9] text-neutral-700" style={{ fontFamily: "var(--font-serif)" }}>
                {consent.researchDescription}
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Link
              href={testHref}
              className="inline-flex min-h-11 items-center justify-center border border-neutral-900 px-6 text-[0.72rem] uppercase tracking-[0.22em] transition hover:bg-neutral-900 hover:text-[#f3f3f2]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              我已閱讀同意書，開始填寫量表
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
