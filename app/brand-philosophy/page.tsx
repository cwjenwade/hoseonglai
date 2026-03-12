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
    <div id="top" className="w-full bg-[#f3f3f2] text-neutral-900 antialiased">
      {/* HERO */}
      <section className="relative min-h-screen w-full border-b border-neutral-300/60">
        <div className="flex min-h-screen flex-col px-6 pt-6 pb-12 lg:px-12">

          {/* NAV */}
          <header className="w-full border-b border-neutral-300/60 pb-4">
            <div className="flex justify-between items-center">
              <Link
                href="/"
                className="text-[0.68rem] uppercase tracking-[0.32em] text-neutral-700"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Ho-Se 好勢 / Ong-Lai 旺來
              </Link>

              <nav className="hidden lg:flex gap-8">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-[0.68rem] uppercase tracking-[0.32em] text-neutral-500 hover:text-neutral-900"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>

          {/* HERO CONTENT */}
          <div className="flex flex-1 items-end">
            <div className="grid w-full gap-14 pt-16 xl:grid-cols-[1.6fr_0.4fr]">

              <div>
                <p
                  className="mb-6 text-[0.68rem] uppercase tracking-[0.34em] text-neutral-400"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Brand Identity
                </p>

                <div className="space-y-2 leading-none">
                  <div className="flex flex-col xl:flex-row xl:items-end gap-6">
                    <span
                      className="text-[clamp(4rem,8vw,8.5rem)] tracking-[-0.04em]"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      Ho-Se
                    </span>

                    <span
                      className="text-[clamp(4.4rem,9vw,9rem)] tracking-[0.02em]"
                      style={{ fontFamily: "var(--font-noto-serif)" }}
                    >
                      好勢
                    </span>
                  </div>

                  <div className="flex flex-col xl:flex-row xl:items-end gap-6">
                    <span
                      className="text-[clamp(4rem,8vw,8.5rem)] tracking-[-0.04em]"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      Ong-Lai
                    </span>

                    <span
                      className="text-[clamp(4.4rem,9vw,9rem)] tracking-[0.02em]"
                      style={{ fontFamily: "var(--font-noto-serif)" }}
                    >
                      旺來
                    </span>
                  </div>
                </div>

                <div className="mt-10 max-w-[70ch]">
                  <p
                    className="text-[1.35rem]"
                    style={{ fontFamily: "var(--font-noto-serif)" }}
                  >
                    以心聚勢，以運旺來
                  </p>

                  <p
                    className="mt-4 text-neutral-600 leading-[1.8]"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    結合研究、文化創作、團體工作與心理學實踐，
                    讓品牌成為可以被感受、被參與，也能被記住的平台。
                  </p>
                </div>
              </div>

              {/* SIDE INFO */}
              <aside className="flex items-end">
                <div>
                  <p
                    className="text-[0.68rem] uppercase tracking-[0.32em] text-neutral-400"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    Brand Scope
                  </p>

                  <div className="mt-6 border-l border-neutral-300/60 pl-4 space-y-6">
                    {brandTracks.map((item) => (
                      <p
                        key={item}
                        className="text-neutral-700"
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

      {/* PHILOSOPHY */}
      <section id="philosophy" className="border-b border-neutral-300/60">
        <div className="px-6 py-20 lg:px-12">
          <div className="grid gap-12 xl:grid-cols-[0.45fr_1.55fr]">

            <p
              className="text-[0.68rem] uppercase tracking-[0.34em] text-neutral-400"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Philosophy
            </p>

            <div>
              <h2
                className="text-[3rem] leading-[0.95] tracking-[-0.04em] sm:text-[4.5rem] xl:text-[6rem]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                A platform shaped by
                <br />
                research, culture,
                <br />
                and shared presence.
              </h2>

              <div className="mt-12 grid gap-10 xl:grid-cols-2">
                <p
                  className="max-w-[68ch] leading-[1.9] text-neutral-700"
                  style={{ fontFamily: "var(--font-noto-serif)" }}
                >
                  Ho-Se 好勢 Ong-Lai 旺來以台灣語言文化作為品牌根基，
                  將「好勢」與「旺來」轉化為一種可被感受與參與的品牌語言。
                </p>

                <p
                  className="max-w-[68ch] leading-[1.9] text-neutral-700"
                  style={{ fontFamily: "var(--font-noto-serif)" }}
                >
                  「以心聚勢，以運旺來」不是一句陪襯性的口號，
                  而是品牌運作的中心句。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="border-b border-neutral-300/60">
        <div className="px-6 py-20 lg:px-12">

          <div className="mb-12">
            <p
              className="text-[0.68rem] uppercase tracking-[0.34em] text-neutral-400"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Team Members
            </p>

            <h2
              className="mt-3 text-[3rem] tracking-[-0.04em]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The people
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <div key={member.id} className="border border-neutral-300/60">
                <TeamCard member={member} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* END */}
      <section>
        <div className="px-6 py-16 lg:px-12">
          <p
            className="text-[3rem] leading-[1.1]"
            style={{ fontFamily: "var(--font-noto-serif)" }}
          >
            以心聚勢
            <br />
            以運旺來
          </p>
        </div>
      </section>
    </div>
  );
}