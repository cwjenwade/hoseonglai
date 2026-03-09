import type { Metadata } from "next";
import TeamCard from "./TeamCard";
import { TEAM_MEMBERS } from "./team-data";

export const metadata: Metadata = {
  title: "品牌理念與團隊",
};

export default function BrandPhilosophyPage() {
  return (
    <div className="space-y-12 bg-zinc-50/50 p-6 md:p-12">
      {/* 品牌理念介紹 */}
      <section className="rounded-3xl border border-[#d8e2dc] bg-white p-10 shadow-sm transition-shadow hover:shadow-md">
        <h2 className="text-3xl font-bold tracking-wider text-[#9d8189]">品牌理念</h2>
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-zinc-700">
          <p>
            我們相信品牌不只是商品，更是一種與人同行的價值。以誠意為本、品質為核、共好為願，
            在每一次互動中建立信任，讓品牌成為日常中的溫暖力量。
          </p>
          <p>
            透過持續創新與文化傳承，將「有心好勢、有運旺來」落實在服務與體驗，創造長遠且可持續的影響。
          </p>
        </div>
      </section>

      {/* 總監獨立區塊 (Director Profile) */}
      <section className="overflow-hidden rounded-3xl border border-[#ffcad4] bg-white shadow-sm">
        <div className="flex flex-col md:flex-row">
          {/* 照片區域 - 預留充足的人臉空間 */}
          <div className="relative h-96 w-full shrink-0 bg-[#d8e2dc] md:h-auto md:w-2/5">
            {/* 實際開發時，請將此區塊替換為 next/image 元件 */}
            <div className="absolute inset-0 flex items-center justify-center text-[#9d8189]">
              [Director 照片放置區：建議採用直式或方形的高畫質人像]
            </div>
          </div>

          {/* 專業資訊區域 */}
          <div className="flex w-full flex-col justify-center p-8 md:p-12 lg:p-16">
            <div className="mb-4 inline-block w-max rounded-full bg-[#ffe5d9] px-4 py-1.5 text-sm font-semibold tracking-widest text-[#9d8189]">
              DIRECTOR
            </div>
            <h3 className="text-4xl font-bold tracking-tight text-zinc-900">
              任祈蔚
              <span className="ml-4 text-2xl font-normal text-[#9d8189]">Jen Chi-Wei</span>
            </h3>

            <div className="mt-8 space-y-3 border-l-4 border-[#f4acb7] pl-5">
              <p className="text-xl font-medium tracking-wide text-zinc-800">
                諮商心理師
              </p>
              <div className="space-y-1 text-zinc-600">
                <p>Ph.D. Program in Clinical Psychology</p>
                <p>National Taiwan University</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 核心團隊 */}
      <section className="rounded-3xl border border-[#d8e2dc] bg-white p-10 shadow-sm">
        <div className="mb-10 border-b border-[#ffe5d9] pb-6">
          <h2 className="text-3xl font-bold tracking-wider text-[#9d8189]">核心團隊</h2>
          <p className="mt-3 text-lg text-zinc-600">
            核心成員專司不同領域，共同推動品牌使命
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {TEAM_MEMBERS.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </section>
    </div>
  );
}