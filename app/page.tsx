import type { Metadata } from "next";
import Link from "next/link";
import { getSiteContentSection } from "@/lib/site-content-server";
import {
  DEFAULT_HOME_PAGE_CONTENT,
  normalizeHomePageContent,
} from "@/app/home-content";

export const metadata: Metadata = {
  title: "Ho-Se 好勢｜Ong-Lai 旺來",
  description:
    "Ho-Se 好勢・Ong-Lai 旺來首頁，整合研究、內容、團體與協作實踐。",
};

export default async function Home() {
  const homeContent = normalizeHomePageContent(
    await getSiteContentSection("home_page_content", DEFAULT_HOME_PAGE_CONTENT),
  );
  const platformFeatures = homeContent.platformFeatures;
  const recentUpdates = homeContent.recentUpdates;
  const ctas = homeContent.primaryCallToActions;
  const primaryCta = ctas.find((item) => item.variant === "primary") || ctas[0];
  const secondaryCta = ctas.find((item) => item.variant === "secondary") || ctas[1];
  const tertiaryCta = ctas.find((item) => item.variant === "tertiary") || ctas[2];

  return (
    <div className="min-h-screen bg-[#F8F8F8] px-6 py-16 font-sans text-zinc-900">
      <div className="mx-auto max-w-6xl space-y-24">
        
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center space-y-10 pt-16">
          <div className="inline-flex items-center rounded-full border border-[#D4B810] bg-white/60 px-5 py-2 backdrop-blur-sm">
            <span className="text-sm font-bold tracking-widest text-[#88854E]">
              好勢（Hó-sè）旺來（Ōng-lâi）
            </span>
          </div>
          <h1 className="max-w-5xl text-5xl font-extrabold tracking-tight text-[#DD821D] md:text-7xl leading-[1.15]">
            以心聚勢，以運旺來，團圓共好
          </h1>
          <p className="max-w-3xl text-xl leading-relaxed text-[#88854E]">
            本平台建構心理學研究與公眾社群之交會節點，整合五分鐘學術報告、受試者招募機制、文創載體及團體心理治療知識庫。藉由知識轉譯與公眾參與，建立具備人文向度之學術實踐場域。
          </p>
          <div className="flex flex-wrap justify-center gap-5 pt-6">
            {primaryCta ? (
              <Link href={primaryCta.href} className="rounded-[1.25rem] bg-[#DD821D] px-8 py-4 text-base font-semibold text-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
                {primaryCta.label}
              </Link>
            ) : null}
            {secondaryCta ? (
              <Link href={secondaryCta.href} className="rounded-[1.25rem] border border-[#E9BC60] bg-[#F2DB8D] px-8 py-4 text-base font-semibold text-[#DD821D] shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
                {secondaryCta.label}
              </Link>
            ) : null}
            {tertiaryCta ? (
              <Link href={tertiaryCta.href} className="rounded-[1.25rem] border border-[#D4B810] bg-white px-8 py-4 text-base font-semibold text-[#88854E] shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
                {tertiaryCta.label}
              </Link>
            ) : null}
          </div>
        </section>

        {/* 平台功能區 */}
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {platformFeatures.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="group flex flex-col justify-between rounded-[2.5rem] border border-[#E9BC60] bg-[#F2DB8D] p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div>
                <h3 className="text-2xl font-bold text-[#DD821D]">{feature.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-[#88854E]">{feature.description}</p>
              </div>
              <div className="mt-10 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#D4B810] shadow-sm transition-transform group-hover:scale-110">
                →
              </div>
            </Link>
          ))}
        </section>

        {/* 最新研究 / 最新內容 */}
        <section className="rounded-[3rem] border border-[#D4B810] bg-white p-10 md:p-16 shadow-sm">
          <h2 className="text-3xl font-bold text-[#DD821D] mb-10">最新研究與內容</h2>
          <div className="divide-y divide-[#F0F0EF]">
            {recentUpdates.map((update) => (
              <div key={update.id} className="py-8 flex items-center justify-between group cursor-pointer">
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                  <span className="inline-flex w-max rounded-full bg-[#F2DB8D] px-4 py-1.5 text-sm font-bold text-[#88854E]">
                    {update.tag}
                  </span>
                  <p className="text-xl font-medium text-zinc-800 transition-colors group-hover:text-[#DD821D]">
                    {update.title}
                  </p>
                </div>
                <span className="hidden md:block text-[#D4B810] opacity-0 transition-opacity group-hover:opacity-100 font-semibold">
                  閱讀全文
                </span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
