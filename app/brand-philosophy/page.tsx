import type { Metadata } from "next";
import Link from "next/link";
import TeamCard from "./TeamCard";
import { TEAM_MEMBERS } from "./team-data";

export const metadata: Metadata = {
  title: "Ho-Se 好勢 Ong-Lai 旺來｜品牌形象",
  description:
    "Ho-Se 好勢 Ong-Lai 旺來，結合研究、文化創作、團體工作與心理學實踐的品牌平台。",
};

const principles = [
  {
    title: "以心聚勢",
    body: "以人的連結作為品牌起點，讓研究、內容與合作在同一語境中累積能量。",
  },
  {
    title: "以運旺來",
    body: "把祝福、流動與文化象徵轉成可感的品牌經驗，讓每一次接觸都留下延續。",
  },
  {
    title: "品牌即平台",
    body: "品牌不只承載商品，也承載研究分享、受試招募、知識傳播與團體工作。",
  },
];

const brandTracks = [
  "研究與知識內容",
  "文化創作與品牌敘事",
  "團體心理與協作實踐",
];

const navItems = [
  { label: "首頁", href: "#top" },
  { label: "品牌理念", href: "#philosophy" },
  { label: "有心好勢", href: "#hero" },
  { label: "有運旺來", href: "#ending" },
  { label: "團圓圓圓", href: "#team" },
  { label: "協力招來", href: "#director" },
];

export default function BrandPhilosophyPage() {
  return (
    <div
      id="top"
      className="min-h-screen w-full bg-[#f8f4ea] text-[#1f1f1b]"
    >
      <header className="sticky top-0 z-50 w-full border-b border-[#d8c9a8] bg-[#f8f4ea]/95 backdrop-blur-md">
        <div className="flex w-full items-center justify-between gap-8 px-8 py-6 md:px-12 xl:px-20">
          <Link
            href="#hero"
            className="shrink-0 text-[2rem] font-black tracking-[-0.04em] text-[#b86116] xl:text-[2.4rem]"
          >
            Ho-Se 好勢
            <span className="mx-3 text-[#8a8452]">/</span>
            Ong-Lai 旺來
          </Link>

          <nav className="hidden flex-wrap items-center justify-end gap-3 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-full border border-[#d7b667] px-6 py-3 text-base font-bold text-[#9f5a18] transition hover:bg-[#fff1cf]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="w-full">
        <section
          id="hero"
          className="relative w-full overflow-hidden border-b border-[#dfd2b8]"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[-10rem] top-[4rem] h-[28rem] w-[28rem] rounded-full bg-[#dd821d]/10 blur-3xl" />
            <div className="absolute right-[-8rem] top-[8rem] h-[24rem] w-[24rem] rounded-full bg-[#88854e]/10 blur-3xl" />
            <div className="absolute bottom-[2rem] left-[36%] h-[18rem] w-[18rem] rounded-full bg-[#d4b810]/10 blur-3xl" />
          </div>

          <div className="relative w-full px-8 pb-24 pt-16 md:px-12 md:pb-32 md:pt-20 xl:px-20 xl:pb-36 xl:pt-24">
            <div className="grid min-h-[calc(100vh-120px)] w-full gap-16 xl:grid-cols-[1.25fr_0.75fr] xl:items-end">
              <div className="w-full">
                <p className="mb-6 text-sm font-bold uppercase tracking-[0.32em] text-[#8a8452]">
                  Ho-Se Brand Identity
                </p>

                <div className="space-y-4 leading-[0.9] tracking-[-0.07em]">
                  <div className="flex flex-col gap-2 xl:flex-row xl:items-end xl:gap-8">
                    <span className="text-6xl font-serif italic text-[#dd821d] md:text-8xl xl:text-[7rem]">
                      Ho-Se
                    </span>
                    <span className="text-7xl font-black md:text-[6.5rem] xl:text-[9rem]">
                      好勢
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 xl:flex-row xl:items-end xl:gap-8">
                    <span className="text-6xl font-serif italic text-[#88854e] md:text-8xl xl:text-[7rem]">
                      Ong-Lai
                    </span>
                    <span className="text-7xl font-black md:text-[6.5rem] xl:text-[9rem]">
                      旺來
                    </span>
                  </div>
                </div>

                <div className="mt-14 border-l-4 border-[#dd821d] pl-6">
                  <p className="text-3xl font-black tracking-[0.12em] md:text-4xl xl:text-5xl">
                    以心聚勢
                  </p>
                  <p className="mt-3 text-3xl font-black tracking-[0.12em] md:text-4xl xl:text-5xl">
                    以運旺來
                  </p>
                </div>

                <p className="mt-10 max-w-[58rem] text-xl leading-10 text-[#4e4c45] xl:text-2xl xl:leading-[3rem]">
                  結合研究、文化創作、團體工作與心理學實踐，讓品牌成為可以被感受、被參與，也能被記住的平台。
                </p>

                <div className="mt-12 flex flex-wrap gap-4">
                  <Link
                    href="#director"
                    className="inline-flex items-center rounded-full bg-[#1f1f1b] px-7 py-4 text-base font-bold text-white transition hover:-translate-y-[1px] hover:opacity-90"
                  >
                    認識品牌總監
                  </Link>
                  <Link
                    href="#team"
                    className="inline-flex items-center rounded-full border border-[#caa85f] bg-[#fff4dd] px-7 py-4 text-base font-bold text-[#9f5a18] transition hover:-translate-y-[1px]"
                  >
                    查看團隊成員
                  </Link>
                </div>
              </div>

              <div className="w-full xl:pl-8">
                <div className="rounded-[2rem] border border-[#eadfca] bg-white/70 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
                  <div className="mb-8 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-[0.28em] text-[#8a8452]">
                      Brand Snapshot
                    </span>
                    <span className="rounded-full bg-[#fff0cf] px-4 py-2 text-xs font-bold text-[#9f5a18]">
                      Ho-Se / Ong-Lai
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl border border-[#efe5d3] bg-white px-5 py-5">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8a8452]">
                        品牌核心
                      </p>
                      <p className="mt-2 text-lg font-black text-[#1f1f1b]">
                        研究 × 文化 × 團體
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[#efe5d3] bg-white px-5 py-5">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8a8452]">
                        品牌口號
                      </p>
                      <p className="mt-2 text-lg font-black text-[#1f1f1b]">
                        以心聚勢　以運旺來
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[#efe5d3] bg-white px-5 py-5">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8a8452]">
                        品牌角色
                      </p>
                      <p className="mt-2 text-lg font-black text-[#1f1f1b]">
                        內容平台 × 團隊協作
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 grid w-full gap-4 border-t border-[#dfd2b8] pt-8 md:grid-cols-3">
              {brandTracks.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[#eadfca] bg-white/60 px-6 py-5 text-base font-bold text-[#4e4c45]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="philosophy"
          className="w-full border-b border-[#dfd2b8]"
        >
          <div className="w-full px-8 py-24 md:px-12 xl:px-20 xl:py-28">
            <div className="mb-14 w-full">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.32em] text-[#8a8452]">
                Philosophy
              </p>
              <h2 className="text-5xl font-black tracking-[-0.05em] xl:text-7xl">
                品牌理念
              </h2>
            </div>

            <div className="grid w-full gap-6 xl:grid-cols-3">
              {principles.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[2rem] border border-[#eadfca] bg-white p-8 shadow-[0_12px_36px_rgba(0,0,0,0.04)]"
                >
                  <p className="text-3xl font-black tracking-[-0.03em] text-[#1f1f1b]">
                    {item.title}
                  </p>
                  <p className="mt-5 text-lg leading-9 text-[#4e4c45]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="director"
          className="w-full border-b border-[#dfd2b8]"
        >
          <div className="w-full px-8 py-24 md:px-12 xl:px-20 xl:py-28">
            <div className="grid w-full gap-14 xl:grid-cols-[0.8fr_1.2fr] xl:items-center">
              <div className="w-full">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] border border-[#eadfca] bg-[#e9e1cf] shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.55),transparent_40%)]" />
                  <div className="flex h-full w-full items-center justify-center p-8 text-center text-sm font-bold tracking-[0.18em] text-[#726c60]">
                    [Brand Director Photo]
                  </div>
                </div>
              </div>

              <div className="w-full">
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.32em] text-[#8a8452]">
                  Brand Director
                </p>

                <h2 className="text-6xl font-black tracking-[-0.06em] xl:text-[6.5rem]">
                  任祈蔚
                </h2>
                <p className="mt-4 text-3xl font-serif italic text-[#dd821d] xl:text-4xl">
                  Jen Chi-Wei
                </p>

                <div className="mt-8 inline-flex rounded-full border border-[#dd821d]/30 bg-[#fff2dc] px-6 py-3 text-sm font-bold uppercase tracking-[0.22em] text-[#9f5a18]">
                  Brand Director
                </div>

                <div className="mt-10 border-l-2 border-[#88854e]/35 pl-6 text-xl leading-9 text-[#5a564c]">
                  <p>Ph.D. Program in Clinical Psychology</p>
                  <p>National Taiwan University</p>
                </div>

                <div className="mt-10 max-w-[60rem] space-y-5 text-xl leading-10 text-[#4e4c45]">
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

        <section id="team" className="w-full border-b border-[#dfd2b8]">
          <div className="w-full px-8 py-24 md:px-12 xl:px-20 xl:py-28">
            <div className="mb-14 flex w-full flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.32em] text-[#8a8452]">
                  Team Members
                </p>
                <h2 className="text-5xl font-black tracking-[-0.05em] xl:text-7xl">
                  團隊成員
                </h2>
              </div>

              <p className="max-w-[40rem] text-xl leading-9 text-[#5a564c] xl:text-right">
                共同推動 Ho-Se 好勢 Ong-Lai 旺來的研究、設計、內容與文化計畫。
              </p>
            </div>

            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
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

        <section id="ending" className="w-full">
          <div className="w-full px-8 py-20 md:px-12 xl:px-20 xl:py-24">
            <div className="flex w-full flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <p className="text-4xl font-black tracking-[0.12em] xl:text-6xl">
                  以心聚勢
                </p>
                <p className="mt-4 text-4xl font-black tracking-[0.12em] xl:text-6xl">
                  以運旺來
                </p>
              </div>

              <p className="max-w-[36rem] text-lg leading-9 text-[#5a564c] xl:text-right xl:text-xl">
                讓研究有溫度，讓文化可感，讓品牌成為人與人之間可以停留的地方。
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}