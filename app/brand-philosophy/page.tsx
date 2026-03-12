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
    <div className="w-full bg-[#faf9f6] text-neutral-900">

      {/* PHILOSOPHY */}
      <section id="philosophy" className="border-b border-neutral-300/60">
        <div className="px-6 py-24 lg:px-20">

          <div className="grid gap-16 lg:grid-cols-[0.32fr_1.68fr]">

            <p
              className="text-[0.65rem] uppercase tracking-[0.38em] text-neutral-400"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Philosophy
            </p>

            <div>

              <h2
                className="max-w-5xl text-[3rem] leading-[0.95] tracking-[-0.025em] sm:text-[4.4rem] xl:text-[5.6rem]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                A platform shaped by
                <br />
                research, culture,
                <br />
                and shared presence.
              </h2>

              <div className="mt-16 grid gap-12 lg:grid-cols-2">

                <p
                  className="max-w-[62ch] text-[1.05rem] leading-[1.9] text-neutral-700"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Ho-Se 好勢 Ong-Lai 旺來以台灣語言文化作為品牌根基，
                  將「好勢」與「旺來」轉化為一種可被感受與參與的品牌語言。
                  這不是單一商品的命名，而是一套關於人與人如何聚合能量、
                  交換關係與延伸祝福的表述方式。
                </p>

                <p
                  className="max-w-[62ch] text-[1.05rem] leading-[1.9] text-neutral-700"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  「以心聚勢，以運旺來」不是一句陪襯性的口號，
                  而是品牌運作的中心句。
                  心是連結，勢是匯聚，運是流動，
                  旺來是抵達。
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
                  className="text-[0.65rem] uppercase tracking-[0.32em] text-neutral-500"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Brand Director Photo
                </span>
              </div>

            </div>

            <div>

              <p
                className="text-[0.65rem] uppercase tracking-[0.38em] text-neutral-400"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Brand Director
              </p>

              <h2
                className="mt-6 text-[2.8rem] tracking-[-0.02em] sm:text-[3.6rem]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                任祈蔚
              </h2>

              <p
                className="mt-3 text-[1.3rem] text-neutral-700"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Jen Chi-Wei
              </p>

              <div className="mt-12 grid gap-10 lg:grid-cols-[0.55fr_1.45fr]">

                <div>

                  <p
                    className="text-[0.6rem] uppercase tracking-[0.34em] text-neutral-400"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    Affiliation
                  </p>

                  <div
                    className="mt-3 text-[0.92rem] leading-7 text-neutral-700"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    <p>Ph.D. Program in Clinical Psychology</p>
                    <p>National Taiwan University</p>
                  </div>

                </div>

                <div className="space-y-6">

                  <p
                    className="text-[1.05rem] leading-[1.9] text-neutral-700"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    負責整體品牌概念、內容方向、視覺語言與對外表述，
                    將心理學研究、團體實踐與文化內容整理為一致的品牌敘事。
                  </p>

                  <p
                    className="text-[1.05rem] leading-[1.9] text-neutral-700"
                    style={{ fontFamily: "var(--font-serif)" }}
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
              className="text-[0.65rem] uppercase tracking-[0.38em] text-neutral-400"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Team
            </p>

            <h2
              className="mt-4 text-[2.8rem] tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-display)" }}
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