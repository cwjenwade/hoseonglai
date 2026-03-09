import type { Metadata } from "next";
import TeamCard from "./TeamCard";
import { TEAM_MEMBERS } from "./team-data";

export const metadata: Metadata = {
  title: "Ho-Se 好勢 Ong-Lai 旺來｜品牌理念與團隊",
};

export default function BrandPhilosophyPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f1e3] text-zinc-900">
      {/* background accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-8rem] top-[8rem] h-[22rem] w-[22rem] rounded-full bg-[#dd821d]/10 blur-3xl" />
        <div className="absolute right-[-6rem] top-[12rem] h-[20rem] w-[20rem] rounded-full bg-[#88854e]/10 blur-3xl" />
        <div className="absolute bottom-[8rem] left-[20%] h-[16rem] w-[16rem] rounded-full bg-[#d4b810]/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:px-12 lg:px-20">
        {/* Hero */}
        <section className="flex min-h-[88vh] flex-col justify-center border-b border-[#dd821d]/20 pb-20">
          <div className="max-w-5xl">
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.32em] text-[#9a6a16]">
              Brand Identity
            </p>

            <div className="space-y-3 leading-none tracking-[-0.06em]">
              <div className="flex flex-col gap-1 md:flex-row md:items-end md:gap-6">
                <span className="text-5xl font-serif italic text-[#dd821d] md:text-7xl lg:text-8xl">
                  Ho-Se
                </span>
                <span className="text-6xl font-black md:text-8xl lg:text-[8rem]">
                  好勢
                </span>
              </div>

              <div className="flex flex-col gap-1 md:flex-row md:items-end md:gap-6">
                <span className="text-5xl font-serif italic text-[#88854e] md:text-7xl lg:text-8xl">
                  Ong-Lai
                </span>
                <span className="text-6xl font-black md:text-8xl lg:text-[8rem]">
                  旺來
                </span>
              </div>
            </div>

            <div className="mt-12 max-w-2xl border-l-4 border-[#dd821d] pl-6">
              <p className="text-2xl font-bold tracking-[0.14em] md:text-3xl">
                以心聚勢
              </p>
              <p className="mt-3 text-2xl font-bold tracking-[0.14em] md:text-3xl">
                以運旺來
              </p>
            </div>

            <p className="mt-10 max-w-2xl text-lg leading-9 text-zinc-700">
              以研究、文化創作、團體工作與心理學實踐為核心，
              讓品牌成為可以被感受、被參與，也能被記住的存在。
            </p>
          </div>
        </section>

        {/* Philosophy */}
        <section className="grid gap-10 border-b border-[#dd821d]/20 py-24 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#9a6a16]">
              Philosophy
            </p>
            <h2 className="text-4xl font-black tracking-[-0.05em] md:text-6xl">
              品牌理念
            </h2>
          </div>

          <div className="md:col-span-8">
            <div className="max-w-3xl space-y-6 text-lg leading-9 text-zinc-700">
              <p>
                Ho-Se 好勢 Ong-Lai 旺來以台灣語言文化為基底，
                將「好勢」與「旺來」轉化為品牌語言，
                連結祝福、能量、關係與日常實踐。
              </p>
              <p>
                品牌不只承載商品，也承載研究、內容、生產、合作與人的相遇。
                每一次呈現，都希望兼具溫度、辨識度與延續性。
              </p>
              <p>
                「以心聚勢，以運旺來」不是附屬文案，
                而是整體品牌行動的核心句。
              </p>
            </div>
          </div>
        </section>

        {/* Brand Director */}
        <section className="grid gap-12 border-b border-[#dd821d]/20 py-24 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#e8dfcf] shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              <div className="flex h-full w-full items-center justify-center text-sm tracking-[0.16em] text-zinc-500">
                [Brand Director 照片放置區]
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#9a6a16]">
              Brand Director
            </p>

            <h2 className="text-5xl font-black tracking-[-0.06em] md:text-7xl">
              任祈蔚
            </h2>
            <p className="mt-3 text-2xl font-serif italic text-[#dd821d] md:text-3xl">
              Jen Chi-Wei
            </p>

            <div className="mt-8 inline-flex rounded-full border border-[#dd821d]/30 bg-[#dd821d]/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#9a6a16]">
              Brand Director
            </div>

            <div className="mt-8 border-l-2 border-[#88854e]/40 pl-5 text-lg leading-8 text-zinc-600">
              <p>Ph.D. Program in Clinical Psychology</p>
              <p>National Taiwan University</p>
            </div>

            <div className="mt-8 max-w-2xl space-y-5 text-lg leading-9 text-zinc-700">
              <p>
                負責整體品牌概念、敘事方向、視覺語言與內容定位，
                將心理學專業、研究工作與文化表達整合為一致的品牌形象。
              </p>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-24">
          <div className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#9a6a16]">
                Team Members
              </p>
              <h2 className="text-4xl font-black tracking-[-0.05em] md:text-6xl">
                團隊成員
              </h2>
            </div>

            <p className="max-w-xl text-lg leading-8 text-zinc-600 md:text-right">
              共同推動 Ho-Se 好勢 Ong-Lai 旺來的研究、內容、設計與文化計畫。
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="group rounded-[2rem] bg-white/70 p-2 shadow-[0_10px_35px_rgba(0,0,0,0.05)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(0,0,0,0.08)]"
              >
                <div className="overflow-hidden rounded-[1.5rem]">
                  <TeamCard member={member} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}