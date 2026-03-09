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
    <div id="top" className="w-full bg-[#f6f3ee] text-zinc-950">
      <section className="relative min-h-screen w-full overflow-hidden border-b border-zinc-200/80">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-10rem] top-[8rem] h-[28rem] w-[28rem] rounded-full bg-[#c46b1b]/8 blur-3xl" />
          <div className="absolute right-[-8rem] top-[18rem] h-[24rem] w-[24rem] rounded-full bg-[#7f7a49]/8 blur-3xl" />
          <div className="absolute bottom-[8rem] left-[42%] h-[18rem] w-[18rem] rounded-full bg-[#d5b551]/8 blur-3xl" />
        </div>

        <div className="relative flex min-h-screen flex-col px-6 pb-14 pt-6 lg:px-10 lg:pb-20 lg:pt-8">
          <header className="w-full">
            <div className="flex w-full items-start justify-between gap-8">
              <Link
                href="/"
                className="text-[0.82rem] uppercase tracking-[0.22em] text-zinc-700 transition hover:text-zinc-950"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Ho-Se 好勢 / Ong-Lai 旺來
              </Link>

              <nav className="hidden items-center gap-8 lg:flex">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-[0.72rem] uppercase tracking-[0.24em] text-zinc-500 transition hover:text-zinc-950"
                    style={{ fontFamily: "var(--font-geist-sans)" }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>

          <div className="flex flex-1 items-end">
            <div className="grid w-full gap-14 pt-20 xl:grid-cols-[1.45fr_0.55fr] xl:gap-20">
              <div className="min-w-0">
                <p
                  className="mb-8 text-[0.72rem] uppercase tracking-[0.28em] text-zinc-400"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  Brand Identity
                </p>

                <div className="space-y-2 leading-[0.88]">
                  <div className="flex flex-col gap-2 xl:flex-row xl:items-end xl:gap-8">
                    <span
                      className="text-[3.8rem] tracking-[-0.055em] text-zinc-950 sm:text-[5.4rem] xl:text-[8.2rem]"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      Ho-Se
                    </span>
                    <span
                      className="text-[4.4rem] font-semibold tracking-[-0.07em] text-zinc-950 sm:text-[6.2rem] xl:text-[9.4rem]"
                      style={{ fontFamily: "var(--font-noto-serif)" }}
                    >
                      好勢
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 xl:flex-row xl:items-end xl:gap-8">
                    <span
                      className="text-[3.8rem] tracking-[-0.055em] text-zinc-950 sm:text-[5.4rem] xl:text-[8.2rem]"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      Ong-Lai
                    </span>
                    <span
                      className="text-[4.4rem] font-semibold tracking-[-0.07em] text-zinc-950 sm:text-[6.2rem] xl:text-[9.4rem]"
                      style={{ fontFamily: "var(--font-noto-serif)" }}
                    >
                      旺來
                    </span>
                  </div>
                </div>

                <div className="mt-14 max-w-4xl">
                  <p
                    className="text-[1.18rem] tracking-[0.08em] text-zinc-900 sm:text-[1.35rem] xl:text-[1.7rem]"
                    style={{ fontFamily: "var(--font-noto-serif)" }}
                  >
                    以心聚勢，以運旺來
                  </p>

                  <p
                    className="mt-8 max-w-3xl text-[1rem] leading-9 text-zinc-600 sm:text-[1.08rem] xl:text-[1.16rem] xl:leading-10"
                    style={{ fontFamily: "var(--font-geist-sans)" }}
                  >
                    結合研究、文化創作、團體工作與心理學實踐，讓品牌成為可以被感受、被參與，也能被記住的平台。
                  </p>

                  <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
                    <Link
                      href="#director"
                      className="text-[0.72rem] uppercase tracking-[0.24em] text-zinc-900 transition hover:opacity-55"
                      style={{ fontFamily: "var(--font-geist-sans)" }}
                    >
                      Brand Director
                    </Link>
                    <Link
                      href="#team"
                      className="text-[0.72rem] uppercase tracking-[0.24em] text-zinc-900 transition hover:opacity-55"
                      style={{ fontFamily: "var(--font-geist-sans)" }}
                    >
                      Team Members
                    </Link>
                  </div>
                </div>
              </div>

              <aside className="flex items-end xl:justify-end">
                <div className="w-full max-w-[18rem] xl:max-w-[20rem]">
                  <p
                    className="text-[0.68rem] uppercase tracking-[0.24em] text-zinc-400"
                    style={{ fontFamily: "var(--font-geist-sans)" }}
                  >
                    Brand Scope
                  </p>

                  <div className="mt-8 space-y-8 border-l border-zinc-200 pl-5">
                    {brandTracks.map((item) => (
                      <p
                        key={item}
                        className="text-[0.98rem] leading-8 text-zinc-700"
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

      <section id="philosophy" className="border-b border-zinc-200/80">
        <div className="w-full px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid gap-14 xl:grid-cols-[0.44fr_1.56fr]">
            <div>
              <p
                className="text-[0.72rem] uppercase tracking-[0.28em] text-zinc-400"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Philosophy
              </p>
            </div>

            <div className="min-w-0">
              <h2
                className="max-w-6xl text-[2.9rem] leading-[0.94] tracking-[-0.055em] text-zinc-950 sm:text-[4.4rem] xl:text-[6.5rem]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                A platform shaped by
                <br />
                research, culture,
                <br />
                and shared presence.
              </h2>

              <div className="mt-16 grid gap-12 xl:grid-cols-[1fr_1fr] xl:gap-16">
                <div className="space-y-8">
                  <p
                    className="text-[1.08rem] leading-10 text-zinc-700 xl:text-[1.18rem]"
                    style={{ fontFamily: "var(--font-noto-serif)" }}
                  >
                    Ho-Se 好勢 Ong-Lai 旺來以台灣語言文化作為品牌根基，將「好勢」與「旺來」轉化為一種可被感受與參與的品牌語言。這不是單一商品的命名，而是一套關於人與人如何聚合能量、交換關係與延伸祝福的表述方式。
                  </p>

                  <p
                    className="text-[1.08rem] leading-10 text-zinc-700 xl:text-[1.18rem]"
                    style={{ fontFamily: "var(--font-noto-serif)" }}
                  >
                    品牌以心理學、團體經驗、研究工作與文化內容作為核心，延伸至知識傳播、內容創作、受試招募與合作實踐。每一次呈現都不是附加裝飾，而是品牌語言本身的實作。
                  </p>
                </div>

                <div className="space-y-8">
                  <p
                    className="text-[1.08rem] leading-10 text-zinc-700 xl:text-[1.18rem]"
                    style={{ fontFamily: "var(--font-noto-serif)" }}
                  >
                    「以心聚勢，以運旺來」不是一句陪襯性的口號，而是品牌運作的中心句。心是連結，勢是匯聚，運是流動，旺來是抵達。
                  </p>

                  <div className="pt-4">
                    <p
                      className="text-[0.68rem] uppercase tracking-[0.24em] text-zinc-400"
                      style={{ fontFamily: "var(--font-geist-sans)" }}
                    >
                      Key phrase
                    </p>
                    <p
                      className="mt-4 text-[1.5rem] tracking-[0.06em] text-zinc-950 xl:text-[1.9rem]"
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

      <section id="director" className="border-b border-zinc-200/80">
        <div className="w-full px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid gap-16 xl:grid-cols-[0.82fr_1.18fr] xl:items-start">
            <div className="min-w-0">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#ebe5da]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.52),transparent_42%)]" />
                <div
                  className="flex h-full w-full items-center justify-center px-8 text-center text-[0.68rem] uppercase tracking-[0.26em] text-zinc-500"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  Brand Director Photo
                </div>
              </div>
            </div>

            <div className="min-w-0">
              <p
                className="text-[0.72rem] uppercase tracking-[0.28em] text-zinc-400"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Brand Director
              </p>

              <h2
                className="mt-6 text-[3.5rem] leading-[0.94] tracking-[-0.06em] text-zinc-950 sm:text-[5.2rem] xl:text-[7.2rem]"
                style={{ fontFamily: "var(--font-noto-serif)" }}
              >
                任祈蔚
              </h2>

              <p
                className="mt-5 text-[1.28rem] tracking-[-0.02em] text-zinc-700 xl:text-[1.7rem]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Jen Chi-Wei
              </p>

              <div className="mt-12 grid gap-10 xl:grid-cols-[0.72fr_1.28fr] xl:gap-14">
                <div>
                  <p
                    className="text-[0.68rem] uppercase tracking-[0.24em] text-zinc-400"
                    style={{ fontFamily: "var(--font-geist-sans)" }}
                  >
                    Affiliation
                  </p>

                  <div
                    className="mt-4 space-y-2 text-[0.98rem] leading-8 text-zinc-700"
                    style={{ fontFamily: "var(--font-geist-sans)" }}
                  >
                    <p>Ph.D. Program in Clinical Psychology</p>
                    <p>National Taiwan University</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <p
                    className="text-[1.08rem] leading-10 text-zinc-700 xl:text-[1.18rem]"
                    style={{ fontFamily: "var(--font-noto-serif)" }}
                  >
                    負責整體品牌概念、內容方向、視覺語言與對外表述，將心理學專業、研究工作與文化內容整理為一致的品牌形象。
                  </p>

                  <p
                    className="text-[1.08rem] leading-10 text-zinc-700 xl:text-[1.18rem]"
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

      <section id="team" className="border-b border-zinc-200/80">
        <div className="w-full px-6 py-24 lg:px-10 lg:py-32">
          <div className="mb-14 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p
                className="text-[0.72rem] uppercase tracking-[0.28em] text-zinc-400"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Team Members
              </p>

              <h2
                className="mt-4 text-[2.9rem] leading-[0.95] tracking-[-0.055em] text-zinc-950 sm:text-[4.2rem] xl:text-[5.8rem]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                The people
              </h2>
            </div>

            <p
              className="max-w-2xl text-[1rem] leading-8 text-zinc-600 xl:text-right"
              style={{ fontFamily: "var(--font-noto-serif)" }}
            >
              共同推動 Ho-Se 好勢 Ong-Lai 旺來的研究、設計、內容與文化計畫。
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 2xl:grid-cols-3 xl:gap-10">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="border border-zinc-200/80 bg-white/20 transition duration-300 hover:bg-white/40"
              >
                <TeamCard member={member} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="ending">
        <div className="w-full px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr] xl:items-end">
            <div>
              <p
                className="text-[2.5rem] leading-[0.96] tracking-[-0.05em] text-zinc-950 sm:text-[3.7rem] xl:text-[5.3rem]"
                style={{ fontFamily: "var(--font-noto-serif)" }}
              >
                以心聚勢
              </p>
              <p
                className="mt-3 text-[2.5rem] leading-[0.96] tracking-[-0.05em] text-zinc-950 sm:text-[3.7rem] xl:text-[5.3rem]"
                style={{ fontFamily: "var(--font-noto-serif)" }}
              >
                以運旺來
              </p>
            </div>

            <p
              className="max-w-xl text-[1rem] leading-8 text-zinc-600 xl:ml-auto xl:text-right"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              讓研究有溫度，讓文化可感，讓品牌成為人與人之間可以停留的地方。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}