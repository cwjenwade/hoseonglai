import type { Metadata } from "next";
import TeamCard from "./TeamCard";
import { TEAM_MEMBERS } from "./team-data";

export const metadata: Metadata = {
  title: "品牌理念",
  description:
    "Ho-Se 好勢 Ong-Lai 旺來，結合研究、文化創作、團體工作與心理學實踐的品牌平台。",
};

export default function BrandPhilosophyPage() {
  return (
    <div className="w-full bg-[#FDFDFD] text-neutral-900">

      {/* HERO */}
      <section className="border-b border-neutral-300/60">
        <div className="px-6 py-20 lg:px-20 lg:py-24">
          <p
            className="text-[0.7rem] uppercase tracking-[0.32em] text-neutral-400"
            style={{ fontFamily: "var(--font-geist)" }}
          >
            Brand Platform
          </p>

          <h1
            className="mt-8 text-center text-[3.2rem] leading-none uppercase tracking-[0.2em] text-neutral-900 sm:text-[4.6rem] xl:text-[5.8rem]"
            style={{ fontFamily: "var(--font-geist)" }}
          >
            BRAND
          </h1>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section id="philosophy" className="border-b border-neutral-300/60">
        <div className="px-6 py-24 lg:px-20">

          <div className="grid gap-16 lg:grid-cols-[0.32fr_1.68fr]">

            <p
              className="text-[0.7rem] uppercase tracking-[0.32em] text-neutral-400"
              style={{ fontFamily: "var(--font-geist)" }}
            >
              Philosophy
            </p>

            <div>
              <div className="mt-16 grid gap-12 lg:grid-cols-2">

                <p
                  className="max-w-[62ch] text-[1.1rem] leading-[1.95] text-neutral-700"
                  style={{ fontFamily: "var(--font-noto-serif)" }}
                >
                  「好勢（hó-sè）」是舒適、安適，是心內的平靜，是人佇生活內底揣著屬於家己的所在。
                  「旺來（Ong-lâi）」是好事到來，是希望再發，是經過風雨了後，看著新的光。
                  好勢旺來是咱陪伴彼个需要支持的人，行向穩定，行向希望。
                </p>

                <p
                  className="max-w-[62ch] text-[1.1rem] leading-[1.95] text-neutral-700"
                  style={{ fontFamily: "var(--font-noto-serif)" }}
                >
                  予心安定，予希望發芽。
                </p>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* BRAND DIRECTOR */}
      <section id="director" className="border-b border-neutral-300/60">
        <div className="px-6 py-24 lg:px-20">

          <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr]">

            <div>

              <div className="aspect-[4/5] w-full bg-neutral-200 flex items-center justify-center">
                <span
                  className="text-[0.7rem] uppercase tracking-[0.3em] text-neutral-500"
                  style={{ fontFamily: "var(--font-geist)" }}
                >
                  Brand Director Photo
                </span>
              </div>

            </div>

            <div>

              <p
                className="text-[0.7rem] uppercase tracking-[0.32em] text-neutral-400"
                style={{ fontFamily: "var(--font-geist)" }}
              >
                Brand Director
              </p>

              <h2
                className="mt-6 text-[2.5rem] tracking-[-0.02em] sm:text-[3.1rem]"
                style={{ fontFamily: "var(--font-noto-serif)" }}
              >
                任祈蔚
              </h2>

              <p
                className="mt-3 text-[1.05rem] uppercase tracking-[0.2em] text-neutral-600"
                style={{ fontFamily: "var(--font-geist)" }}
              >
                Jen Chi-Wei
              </p>

              <div className="mt-12 grid gap-10 lg:grid-cols-[0.55fr_1.45fr]">

                <div>

                  <p
                    className="text-[0.6rem] uppercase tracking-[0.3em] text-neutral-400"
                    style={{ fontFamily: "var(--font-geist)" }}
                  >
                    Affiliation
                  </p>

                  <div
                    className="mt-3 text-[0.95rem] leading-7 text-neutral-700"
                    style={{ fontFamily: "var(--font-geist)" }}
                  >
                    <p>Ph.D. Program in Clinical Psychology</p>
                    <p>National Taiwan University</p>
                  </div>

                </div>

                <div className="space-y-6">

                  <p
                    className="text-[1.08rem] leading-[1.95] text-neutral-700"
                    style={{ fontFamily: "var(--font-noto-serif)" }}
                  >
                    負責整體品牌概念、內容方向、視覺語言與對外表述，
                    將心理學研究、團體實踐與文化內容整理為一致的品牌敘事。
                  </p>

                  <p
                    className="text-[1.08rem] leading-[1.95] text-neutral-700"
                    style={{ fontFamily: "var(--font-noto-serif)" }}
                  >
                    在 Ho-Se 好勢 Ong-Lai 旺來之中，
                    品牌不是附加層，而是研究、文化與人際連結
                    之間的一個共同界面。
                  </p>

                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team">
        <div className="px-6 py-24 lg:px-20">

          <div className="mb-16">

            <p
              className="text-[0.7rem] uppercase tracking-[0.32em] text-neutral-400"
              style={{ fontFamily: "var(--font-geist)" }}
            >
              Team
            </p>

            <h2
              className="mt-4 text-[2.4rem] uppercase tracking-[0.12em] text-neutral-900 sm:text-[2.9rem]"
              style={{ fontFamily: "var(--font-geist)" }}
            >
              The people
            </h2>

          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

            {TEAM_MEMBERS.map((member) => (
              <div key={member.id} className="border border-neutral-300/60">
                <TeamCard member={member} />
              </div>
            ))}

          </div>

        </div>
      </section>

    </div>
  );
}