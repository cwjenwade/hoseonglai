import type { Metadata } from "next";
import TeamCard from "./TeamCard";
import { TEAM_MEMBERS } from "./team-data";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ho-Se 好勢 Ong-Lai 旺來｜品牌形象",
  description:
    "Ho-Se 好勢 Ong-Lai 旺來，結合研究、文化創作、團體工作與心理學實踐的品牌平台。",
};

const stats = [
  { label: "品牌核心", value: "研究 × 文化 × 團體" },
  { label: "品牌口號", value: "以心聚勢　以運旺來" },
  { label: "品牌角色", value: "內容平台 × 團隊協作" },
];

const principles = [
  {
    title: "以心聚勢",
    body: "以人的連結作為品牌起點，讓研究、內容與合作在同一個語境中累積能量。",
  },
  {
    title: "以運旺來",
    body: "把祝福、流動與文化象徵轉為可感的品牌經驗，讓每一次接觸都有延續性。",
  },
  {
    title: "品牌即平台",
    body: "品牌不只承載商品，也承載研究分享、受試招募、知識傳播與團體工作。",
  },
];

export default function BrandPhilosophyPage() {
  return (
    <div className="min-h-screen bg-[#f8f4ea] text-[#1f1f1b]">
      <header className="sticky top-0 z-50 border-b border-[#d8c9a8] bg-[#f8f4ea]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10 lg:px-16">
          <div className="flex items-center gap-4">
            <div className="text-xl font-black tracking-tight text-[#b86116] md:text-2xl">
              Ho-Se 好勢
              <span className="mx-2 text-[#8a8452]">/</span>
              Ong-Lai 旺來
            </div>
          </div>

          <nav className="hidden items-center gap-2 md:flex">
            {[
              "首頁",
              "品牌理念",
              "有心好勢",
              "有運旺來",
              "團圓圓圓",
              "協力招來",
            ].map((item) => (
              <button
                key={item}
                className="rounded-full border border-[#d7b667] bg-transparent px-4 py-2 text-sm font-semibold text-[#9f5a18] transition hover:bg-[#fff4d6]"
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[-8rem] top-[6rem] h-[20rem] w-[20rem] rounded-full bg-[#dd821d]/10 blur-3xl" />
            <div className="absolute right-[-6rem] top-[10rem] h-[18rem] w-[18rem] rounded-full bg-[#88854e]/10 blur-3xl" />
            <div className="absolute bottom-[4rem] left-[20%] h-[14rem] w-[14rem] rounded-full bg-[#d4b810]/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24 lg:px-16 lg:pt-28">
            <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <p className="mb-6 text-sm font-semibold uppercase tracking-[0.28em] text-[#8a8452]">
                  Brand Identity
                </p>

                <div className="space-y-3 leading-[0.92] tracking-[-0.06em]">
                  <div className="flex flex-col gap-1 md:flex-row md:items-end md:gap-6">
                    <span className="text-5xl font-serif italic text-[#dd821d] md:text-7xl lg:text-8xl">
                      Ho-Se
                    </span>
                    <span className="text-6xl font-black md:text-8xl lg:text-[7rem]">
                      好勢
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 md:flex-row md:items-end md:gap-6">
                    <span className="text-5xl font-serif italic text-[#88854e] md:text-7xl lg:text-8xl">
                      Ong-Lai
                    </span>
                    <span className="text-6xl font-black md:text-8xl lg:text-[7rem]">
                      旺來
                    </span>
                  </div>
                </div>

                <div className="mt-10 border-l-4 border-[#dd821d] pl-5">
                  <p className="text-2xl font-black tracking-[0.12em] md:text-3xl">
                    以心聚勢
                  </p>
                  <p className="mt-2 text-2xl font-black tracking-[0.12em] md:text-3xl">
                    以運旺來
                  </p>
                </div>

                <p className="mt-8 max-w-2xl text-lg leading-9 text-[#4e4c45] md:text-xl">
                  結合研究、文化創作、團體工作與心理學實踐，讓品牌成為可以被感受、被參與，也能被記住的平台。
                </p>

                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    href="#director"
                    className="inline-flex items-center rounded-full bg-[#1f1f1b] px-6 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:opacity-90"
                  >
                    認識品牌總監
                  </Link>
                  <Link
                    href="#team"
                    className="inline-flex items-center rounded-full border border-[#caa85f] bg-[#fff8e8] px-6 py-3 text-sm font-semibold text-[#9f5a18] transition hover:translate-y-[-1px]"
                  >
                    查看團隊成員
                  </Link>
                </div>
              </div>

              <div className="lg:pl-10">
                <div className="rounded-[2rem] border border-[#eadfca] bg-white/70 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur">
                  <div className="rounded-[1.5rem] border border-[#f1eadb] bg-[#fcfaf4] p-6">
                    <div className="mb-6 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#8a8452]">
                        Brand Snapshot
                      </span>
                      <span className="rounded-full bg-[#fff0cf] px-3 py-1 text-xs font-semibold text-[#9f5a18]">
                        Ho-Se / Ong-Lai
                      </span>
                    </div>

                    <div className="space-y-5">
                      {stats.map((item) => (
                        <div
                          key={item.label}
                          className="rounded-2xl border border-[#efe5d3] bg-white px-4 py-4"
                        >
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a8452]">
                            {item.label}
                          </p>
                          <p className="mt-2 text-base font-bold text-[#1f1f1b]">
                            {item.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 grid gap-4 border-t border-[#dfd2b8] pt-8 md:grid-cols-3">
              {[
                "研究與知識內容",
                "文化創作與品牌敘事",
                "團體心理與協作實踐",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[#eadfca] bg-white/60 px-5 py-4 text-sm font-semibold text-[#4e4c45]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#dfd2b8] bg-[#fcfaf4]">
          <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-16">
            <div className="mb-12 max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#8a8452]">
                Philosophy
              </p>
              <h2 className="text-4xl font-black tracking-[-0.05em] md:text-6xl">
                品牌理念
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {principles.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[2rem] border border-[#eadfca] bg-white p-7 shadow-[0_12px_36px_rgba(0,0,0,0.04)]"
                >
                  <p className="text-2xl font-black tracking-tight text-[#1f1f1b]">
                    {item.title}
                  </p>
                  <p className="mt-4 text-base leading-8 text-[#4e4c45]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="director" className="border-t border-[#dfd2b8]">
          <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:px-16">
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-[#eadfca] bg-[#e9e1cf] shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.55),transparent_40%)]" />
                  <div className="flex h-full w-full items-center justify-center p-8 text-center text-sm font-semibold tracking-[0.18em] text-[#726c60]">
                    [Brand Director Photo]
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#8a8452]">
                  Brand Director
                </p>

                <h2 className="text-5xl font-black tracking-[-0.06em] md:text-7xl">
                  任祈蔚
                </h2>
                <p className="mt-3 text-2xl font-serif italic text-[#dd821d] md:text-3xl">
                  Jen Chi-Wei
                </p>

                <div className="mt-7 inline-flex rounded-full border border-[#dd821d]/30 bg-[#fff2dc] px-5 py-2 text-sm font-bold uppercase tracking-[0.22em] text-[#9f5a18]">
                  Brand Director
                </div>

                <div className="mt-8 border-l-2 border-[#88854e]/35 pl-5 text-lg leading-8 text-[#5a564c]">
                  <p>Ph.D. Program in Clinical Psychology</p>
                  <p>National Taiwan University</p>
                </div>

                <div className="mt-8 max-w-2xl space-y-5 text-lg leading-9 text-[#4e4c45]">
                  <p>
                    負責整體品牌概念、內容方向、視覺敘事與對外語言，將心理學專業、研究工作與文化表達整合為一致的品牌形象。
                  </p>
                  <p>
                    在 Ho-Se 好勢 Ong-Lai 旺來之中，品牌不是附加裝飾，而是研究、實踐、合作與社會連結的共同界面。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="team" className="border-t border-[#dfd2b8] bg-[#fcfaf4]">
          <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:px-16">
            <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#8a8452]">
                  Team Members
                </p>
                <h2 className="text-4xl font-black tracking-[-0.05em] md:text-6xl">
                  團隊成員
                </h2>
              </div>

              <p className="max-w-xl text-lg leading-8 text-[#5a564c] md:text-right">
                共同推動 Ho-Se 好勢 Ong-Lai 旺來的研究、設計、內容與文化計畫。
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {TEAM_MEMBERS.map((member) => (
                <div
                  key={member.id}
                  className="group rounded-[2rem] border border-[#eadfca] bg-white/80 p-2 shadow-[0_14px_40px_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.07)]"
                >
                  <div className="overflow-hidden rounded-[1.5rem]">
                    <TeamCard member={member} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#dfd2b8]">
          <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-16">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-3xl font-black tracking-[0.12em] md:text-5xl">
                  以心聚勢
                </p>
                <p className="mt-3 text-3xl font-black tracking-[0.12em] md:text-5xl">
                  以運旺來
                </p>
              </div>

              <p className="max-w-md text-base leading-8 text-[#5a564c] md:text-right md:text-lg">
                讓研究有溫度，讓文化可感，讓品牌成為人與人之間可以停留的地方。
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}