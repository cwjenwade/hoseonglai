import type { Metadata } from "next";
import Link from "next/link";
import TeamCard from "./TeamCard";
import { TEAM_MEMBERS } from "./team-data";

export const metadata: Metadata = {
  title: "品牌理念",
  description:
    "Ho-Se 好勢 Ong-Lai 旺來，結合研究、文化創作、團體工作與心理學實踐的品牌平台。",
};

const navItems = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "Director", href: "#director" },
  { label: "Team", href: "#team" },
];

const brandTracks = [
  "Research and knowledge",
  "Cultural narrative",
  "Group practice",
];

export default function BrandPhilosophyPage() {
  return (
    <div id="top" className="w-full bg-[#f6f3ee] text-neutral-900 antialiased">
      <section className="relative min-h-screen w-full overflow-hidden border-b border-[#e7e1d7]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-10rem] top-[8rem] h-[28rem] w-[28rem] rounded-full bg-[#c46b1b]/[0.05] blur-3xl" />
          <div className="absolute right-[-8rem] top-[18rem] h-[24rem] w-[24rem] rounded-full bg-[#7f7a49]/[0.05] blur-3xl" />
          <div className="absolute bottom-[8rem] left-[42%] h-[18rem] w-[18rem] rounded-full bg-[#d5b551]/[0.04] blur-3xl" />
        </div>

        <div className="relative flex min-h-screen flex-col px-6 pb-16 pt-6 lg:px-10 lg:pb-20 lg:pt-8">
          <header className="w-full">
            <div className="flex w-full items-start justify-between gap-8 border-b border-[#e7e1d7] pb-5">
              <Link
                href="/"
                className="text-[0.68rem] uppercase tracking-[0.32em] text-neutral-700 transition-colors duration-300 hover:text-neutral-950"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Ho-Se 好勢 / Ong-Lai 旺來
              </Link>

              <nav className="hidden items-center gap-8 lg:flex">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-[0.68rem] uppercase tracking-[0.32em] text-neutral-500 transition-colors duration-300 hover:text-neutral-950"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>

          <div className="flex flex-1 items-end">
            <div className="grid w-full gap-16 pt-20 xl:grid-cols-[1.5fr_0.5fr] xl:gap-24 xl:pt-24">
              <div className="min-w-0">
                <p
                  className="mb-10 text-[0.68rem] uppercase tracking-[0.34em] text-neutral-400"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Brand Identity
                </p>

                <div className="space-y-4 leading-none">
                  <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:gap-8">
                    <span
                      className="text-[clamp(4rem,8vw,9rem)] leading-[0.88] tracking-[-0.04em] text-neutral-950"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      Ho-Se
                    </span>
                    <span
                      className="text-[clamp(4.4rem,9vw,10rem)] font-medium leading-[0.9] tracking-[0.02em] text-neutral-950"
                      style={{ fontFamily: "var(--font-noto-serif)" }}
                    >
                      好勢
                    </span>
                  </div>

                  <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:gap-8">
                    <span
                      className="text-[clamp(4rem,8vw,9rem)] leading-[0.88] tracking-[-0.04em] text-neutral-950"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      Ong-Lai
                    </span>
                    <span
                      className="text-[clamp(4.4rem,9vw,10rem)] font-medium leading-[0.9] tracking-[0.02em] text-neutral-950"
                      style={{ fontFamily: "var(--font-noto-serif)" }}
                    >
                      旺來
                    </span>
                  </div>
                </div>

                <div className="mt-16 max-w-5xl">
                  <p
                    className="text-[1.2rem] tracking-[0.08em] text-neutral-900 sm:text-[1.4rem] xl:text-[1.72rem]"
                    style={{ fontFamily: "var(--font-noto-serif)" }}
                  >
                    以心聚勢，以運旺來
                  </p>

                  <p
                    className="mt-8 max-w-[68ch] text-[1rem] leading-[1.9] text-neutral-600 sm:text-[1.05rem] xl:text-[1.1rem]"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    結合研究、文化創作、團體工作與心理學實踐，讓品牌成為可以被感受、被參與，也能被記住的平台。
                  </p>

                  <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#e7e1d7] pt-6">
                    <Link
                      href="#director"
                      className="text-[0.68rem] uppercase tracking-[0.32em] text-neutral-900 transition-opacity duration-300 hover:opacity-50"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      Brand Director
                    </Link>
                    <Link
                      href="#team"
                      className="text-[0.68rem] uppercase tracking-[0.32em] text-neutral-900 transition-opacity duration-300 hover:opacity-50"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      Team Members
                    </Link>
                  </div>
                </div>
              </div>

              <aside className="flex items-end xl:justify-end">
                <div className="w-full max-w-[18rem] xl:max-w-[20rem]">
                  <p
                    className="text-[0.68rem] uppercase tracking-[0.32em] text-neutral-400"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    Brand Scope
                  </p>

                  <div className="mt-8 space-y-8 border-l border-[#ddd6ca] pl-6">
                    {brandTracks.map((item) => (
                      <p
                        key={item}
                        className="text-[1rem] leading-8 text-neutral-700"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section id="philosophy" className="border-b border-[#e7e1d7]">
        <div className="w-full px-6 py-32 lg:px-10 xl:py-40">
          <div className="grid gap-14 xl:grid-cols-[0.42fr_1.58fr]">
            <div>
              <p
                className="text-[0.68rem] uppercase tracking-[0.34em] text-neutral-400"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Philosophy
              </p>
            </div>

            <div className="min-w-0">
              <h2
                className="max-w-6xl text-[3rem] leading-[0.9] tracking-[-0.04em] text-neutral-950 sm:text-[4.5rem] xl:text-[6.8rem]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                A platform shaped by
                <br />
                research, culture,
                <br />
                and shared presence.
              </h2>

              <div className="mt-16 grid gap-12 xl:grid-cols-[1fr_1fr] xl:gap-20">
                <div className="space-y-8">
                  <p
                    className="max-w-[68ch] text-[1.05rem] leading-[1.9] text-neutral-700 xl:text-[1.12rem]"
                    style={{ fontFamily: "var(--font-noto-serif)" }}
                  >
                    Ho-Se 好勢 Ong-Lai 旺來以台灣語言文化作為品牌根基，將「好勢」與「旺來」轉化為一種可被感受與參與的品牌語言。這不是單一商品的命名，而是一套關於人與人如何聚合能量、交換關係與延伸祝福的表述方式。
                  </p>

                  <p
                    className="max-w-[68ch] text-[1.05rem] leading-[1.9] text-neutral-700 xl:text-[1.12rem]"
                    style={{ fontFamily: "var(--font-noto-serif)" }}
                  >
                    品牌以心理學、團體經驗、研究工作與文化內容作為核心，延伸至知識傳播、內容創作、受試招募與合作實踐。每一次呈現都不是附加裝飾，而是品牌語言本身的實作。
                  </p>
                </div>

                <div className="space-y-8">
                  <p
                    className="max-w-[68ch] text-[1.05rem] leading-[1.9] text-neutral-700 xl:text-[1.12rem]"
                    style={{ fontFamily: "var(--font-noto-serif)" }}
                  >
                    「以心聚勢，以運旺來」不是一句陪襯性的口號，而是品牌運作的中心句。心是連結，勢是匯聚，運是流動，旺來是抵達。
                  </p>

                  <div className="pt-6">
                    <p
                      className="text-[0.68rem] uppercase tracking-[0.32em] text-neutral-400"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      Key phrase
                    </p>
                    <p
                      className="mt-4 text-[1.6rem] tracking-[0.06em] text-neutral-950 xl:text-[2rem]"
                      style={{ fontFamily: "var(--font-noto-serif)" }}
                    >
                      以心聚勢，以運旺來
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="director" className="border-b border-[#e7e1d7]">
        <div className="w-full px-6 py-32 lg:px-10 xl:py-40">
          <div className="grid gap-16 xl:grid-cols-[0.8fr_1.2fr] xl:items-start xl:gap-20">
            <div className="min-w-0">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#ebe5da]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.52),transparent_42%)]" />
                <div
                  className="flex h-full w-full items-center justify-center px-8 text-center text-[0.68rem] uppercase tracking-[0.32em] text-neutral-500"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Brand Director Photo
                </div>
              </div>
            </div>

            <div className="min-w-0">
              <p
                className="text-[0.68rem] uppercase tracking-[0.34em] text-neutral-400"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Brand Director
              </p>

              <h2
                className="mt-6 text-[3.6rem] leading-[0.9] tracking-[-0.04em] text-neutral-950 sm:text-[5.3rem] xl:text-[7.4rem]"
                style={{ fontFamily: "var(--font-noto-serif)" }}
              >
                任祈蔚
              </h2>

              <p
                className="mt-5 text-[1.3rem] tracking-[0.02em] text-neutral-700 xl:text-[1.72rem]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Jen Chi-Wei
              </p>

              <div className="mt-12 grid gap-10 xl:grid-cols-[0.72fr_1.28fr] xl:gap-16">
                <div>
                  <p
                    className="text-[0.68rem] uppercase tracking-[0.32em] text-neutral-400"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    Affiliation
                  </p>

                  <div
                    className="mt-4 space-y-2 text-[0.98rem] leading-8 text-neutral-700"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    <p>Ph.D. Program in Clinical Psychology</p>
                    <p>National Taiwan University</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <p
                    className="max-w-[68ch] text-[1.05rem] leading-[1.9] text-neutral-700 xl:text-[1.12rem]"
                    style={{ fontFamily: "var(--font-noto-serif)" }}
                  >
                    負責整體品牌概念、內容方向、視覺語言與對外表述，將心理學專業、研究工作與文化內容整理為一致的品牌形象。
                  </p>

                  <p
                    className="max-w-[68ch] text-[1.05rem] leading-[1.9] text-neutral-700 xl:text-[1.12rem]"
                    style={{ fontFamily: "var(--font-noto-serif)" }}
                  >
                    在 Ho-Se 好勢 Ong-Lai 旺來之中，品牌不是附加層，而是研究、實踐、合作與社會連結之間的共同界面。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="border-b border-[#e7e1d7]">
        <div className="w-full px-6 py-32 lg:px-10 xl:py-40">
          <div className="mb-16 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p
                className="text-[0.68rem] uppercase tracking-[0.34em] text-neutral-400"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Team Members
              </p>

              <h2
                className="mt-4 text-[3rem] leading-[0.9] tracking-[-0.04em] text-neutral-950 sm:text-[4.3rem] xl:text-[6rem]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                The people
              </h2>
            </div>

            <p
              className="max-w-[40ch] text-[1rem] leading-[1.9] text-neutral-600 xl:text-right"
              style={{ fontFamily: "var(--font-noto-serif)" }}
            >
              共同推動 Ho-Se 好勢 Ong-Lai 旺來的研究、設計、內容與文化計畫。
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 2xl:grid-cols-3 xl:gap-10">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="border border-[#e7e1d7] bg-[#fbf9f5] transition-colors duration-300 hover:bg-white"
              >
                <TeamCard member={member} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="ending">
        <div className="w-full px-6 py-24 lg:px-10 xl:py-28">
          <div className="grid gap-12 xl:grid-cols-[1.2fr_0.8fr] xl:items-end">
            <div>
              <p
                className="text-[2.8rem] leading-[0.92] tracking-[0.02em] text-neutral-950 sm:text-[4rem] xl:text-[5.6rem]"
                style={{ fontFamily: "var(--font-noto-serif)" }}
              >
                以心聚勢
              </p>
              <p
                className="mt-3 text-[2.8rem] leading-[0.92] tracking-[0.02em] text-neutral-950 sm:text-[4rem] xl:text-[5.6rem]"
                style={{ fontFamily: "var(--font-noto-serif)" }}
              >
                以運旺來
              </p>
            </div>

            <p
              className="max-w-[42ch] text-[1rem] leading-[1.9] text-neutral-600 xl:ml-auto xl:text-right"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              讓研究有溫度，讓文化可感，讓品牌成為人與人之間可以停留的地方。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}