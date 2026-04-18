import type { Metadata } from "next";
import Image from "next/image";
import TeamCard from "./TeamCard";
import { getSiteContentSection } from "@/lib/site-content-server";
import { DEFAULT_BRAND_PAGE_CONTENT, normalizeBrandPageContent } from "./brand-content";

export const metadata: Metadata = {
  title: "品牌理念",
  description:
    "Ho-Se 好勢・Ong-Lai 旺來的品牌理念，結合研究、文化創作、團體工作與心理學實踐。",
};

export default async function BrandPhilosophyPage() {
  const brandContent = normalizeBrandPageContent(
    await getSiteContentSection(
      "brand_philosophy_page",
      DEFAULT_BRAND_PAGE_CONTENT,
    ),
  );
  const director = brandContent.director;
  const mobileDirectorBio = [
    "新北市家扶中心 合作心理師",
    "光合心理諮商所 諮商心理師",
    "清華大學 諮商心理 碩士",
    "台灣大學 臨床心理 博士研究生",
    "研究主題：述情障礙、團體諮商與治療、研究法、性少數男性",
  ].join(" ");
  const teamMembers = brandContent.teamMembers;
  const teamSections = brandContent.teamSections
    .map((section) => ({
      ...section,
      members: teamMembers.filter((member) => member.sectionId === section.id),
    }))
    .filter((section) => section.members.length > 0);

  return (
    <main className="w-full bg-[#FDFDFD] text-neutral-900">
      <div className="mx-auto w-full max-w-[1520px] px-6 py-12 md:px-10 md:py-16 xl:px-14 xl:py-20">

      {/* HERO */}
      <section className="mb-14 border-b border-neutral-300/60 pb-8 md:mb-16 md:pb-10">
          <h1
            className="mt-8 text-center text-[2.5rem] leading-none uppercase tracking-[0.2em] text-neutral-900 md:text-[4rem] xl:text-[4.9rem]"
            style={{ fontFamily: "var(--font-geist)" }}
          >
            BRAND
          </h1>

          <div className="mx-auto mt-10 grid max-w-6xl gap-8 md:gap-10 lg:grid-cols-2">
            <div
              className="max-w-[62ch] space-y-6 text-[1.25rem] leading-[1.85] text-neutral-700"
              style={{ fontFamily: "var(--font-noto-serif)" }}
            >
              <p>
                「好勢（hó-sè）」是舒適、安適，是心內的平靜，是人佇生活內底揣著屬於家己的所在。
                「旺來（Ong-lâi）」是好事到來，是希望再發，是經過風雨了後，看著新的光。
                好勢旺來是咱陪伴彼个需要支持的人，行向穩定，行向希望。
              </p>
              <p>予心安定，予希望發芽。</p>
            </div>

            <div
              className="max-w-[62ch] space-y-6 text-center text-[20px] leading-[1.95] text-neutral-700 md:text-left"
              style={{ fontFamily: "var(--font-geist)" }}
            >
              <p>
                “Ho-Sè” (好勢) is ease and quiet.
                <br />
                A settled heart.
                <br />
                The feeling of finding one’s place in life.
              </p>
              <p>
                “Ong-Lâi” (旺來) is the arrival of good things.
                <br />
                Hope returning.
                <br />
                Light after the storm.
              </p>
              <p>
                Ho-Sè Ong-Lâi is the act of walking with those who seek support,
                <br />
                toward steadiness and hope.
              </p>
              <p>
                Let the heart be at rest.
                <br />
                Let hope take root.
              </p>
            </div>
          </div>
      </section>

      {/* BRAND DIRECTOR */}
      <section id="director" className="mb-14 border-b border-neutral-300/60 bg-[#f3f3f3] pb-10 md:mb-16 md:pb-12">

          <div className="md:hidden">
            <div className="mx-auto w-full max-w-[360px] border border-neutral-300/60">
              <TeamCard
                member={{
                  id: "director-mobile",
                  nameZh: director.nameZh || "-",
                  nameEn: director.nameEn || "-",
                  role:
                    director.affiliationLines.find((line) => /[\u4e00-\u9fff]/.test(line)) ||
                    "Branding Director",
                  bio: mobileDirectorBio,
                  photo: director.photo,
                }}
              />
            </div>
          </div>

          <div className="hidden md:grid gap-10 md:gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">

            <div>

              <div className="relative aspect-[4/5] w-full md:w-[500px] max-w-full bg-neutral-200 flex items-center justify-center overflow-hidden">
                {director.photo ? (
                  <Image
                    src={director.photo}
                    alt={director.nameZh || "Branding Director"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span
                    className="text-[0.7rem] uppercase tracking-[0.3em] text-neutral-500"
                    style={{ fontFamily: "var(--font-geist)" }}
                  >
                    Branding Director Photo
                  </span>
                )}
              </div>

            </div>

            <div className="pt-8 md:pt-12">

              <p
                className="text-[0.72rem] uppercase tracking-[0.34em] text-neutral-400"
                style={{ fontFamily: "var(--font-geist)" }}
              >
                Branding Director
              </p>

              <h2
                className="mt-2 text-[3.1rem] leading-[1.08] tracking-[-0.02em] lg:text-[3.4rem]"
                style={{ fontFamily: "var(--font-noto-serif)" }}
              >
                {director.nameZh || "-"}
              </h2>

              <p
                className="mt-1 text-[2rem] uppercase leading-[1.15] tracking-[0.08em] text-neutral-600"
                style={{ fontFamily: "var(--font-geist)" }}
              >
                {director.nameEn || "-"}
              </p>

              <div className="mt-6 grid gap-8 md:gap-9">

                <div>

                  <p
                    className="text-[0.68rem] uppercase tracking-[0.34em] text-neutral-400"
                    style={{ fontFamily: "var(--font-geist)" }}
                  >
                    Affiliation
                  </p>

                    <div
                    className="mt-3 space-y-1 text-[1.08rem] leading-8 text-neutral-700"
                    style={{ fontFamily: "var(--font-geist)" }}
                  >
                    {director.affiliationLines.map((line, index) => {
                      const isZh = /[\u4e00-\u9fff]/.test(line);
                      const isFirstZh = director.affiliationLines
                        .slice(0, index)
                        .every((prev) => !/[\u4e00-\u9fff]/.test(prev));

                      return (
                        <p
                          key={`${line}-${index}`}
                          className={isZh && isFirstZh ? "mt-2" : ""}
                          style={isZh ? { fontFamily: "var(--font-noto-serif)" } : undefined}
                        >
                          {line}
                        </p>
                      );
                    })}
                  </div>

                </div>

                <div className="space-y-6 pt-1">

                  {director.introParagraphs.map((paragraph, index) => (
                    <p
                      key={`${paragraph}-${index}`}
                      className="text-[1.08rem] leading-[1.95] text-neutral-700"
                      style={{ fontFamily: "var(--font-noto-serif)" }}
                    >
                      {paragraph}
                    </p>
                  ))}

                </div>

              </div>

            </div>

            </div>
      </section>

      {/* TEAM */}
      <section id="team">
          <div className="mb-12 md:mb-14">

          </div>

          <div className="space-y-14 md:space-y-16">
            {teamSections.map((section) => (
              <section key={section.id} className="border-t border-neutral-300/60 pt-8 md:pt-10">
                <div className="mb-8 md:mb-10">
                  <p
                    className="text-[0.68rem] uppercase tracking-[0.28em] text-neutral-400"
                    style={{ fontFamily: "var(--font-geist)" }}
                  >
                    Team Row
                  </p>

                  <h3
                    className="mt-3 text-[1.7rem] uppercase tracking-[0.12em] text-neutral-900 md:text-[2rem]"
                    style={{ fontFamily: "var(--font-geist)" }}
                  >
                    {section.title}
                  </h3>
                </div>

                <div
                  className={[
                    "grid gap-x-8 gap-y-12 md:grid-cols-2",
                    section.members.length >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2",
                  ].join(" ")}
                >
                  {section.members.map((member) => (
                    <div key={member.id} className="mx-auto w-full max-w-[360px] border border-neutral-300/60">
                      <TeamCard member={member} />
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

      </section>

    </div>
    </main>
  );
}
