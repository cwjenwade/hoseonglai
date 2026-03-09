import type { Metadata } from "next";
import TeamCard from "./TeamCard";
import { TEAM_MEMBERS } from "./team-data";

export const metadata: Metadata = {
  title: "品牌理念與團隊",
};

export default function BrandPhilosophyPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fafafa] p-6 font-sans md:p-16 lg:p-24">
      {/* 模糊散佈背景圓點 */}
      <div className="pointer-events-none absolute -left-10 top-20 h-40 w-40 rounded-full bg-[#d8e2dc] opacity-60 mix-blend-multiply blur-xl" />
      <div className="pointer-events-none absolute right-10 top-40 h-64 w-64 rounded-full bg-[#ffe5d9] opacity-50 mix-blend-multiply blur-2xl" />
      <div className="pointer-events-none absolute left-1/3 top-1/2 h-32 w-32 rounded-full bg-[#ffcad4] opacity-70 mix-blend-multiply blur-lg" />
      <div className="pointer-events-none absolute -right-20 bottom-40 h-80 w-80 rounded-full bg-[#f4acb7] opacity-40 mix-blend-multiply blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-10 h-24 w-24 rounded-full bg-[#9d8189] opacity-30 mix-blend-multiply blur-md" />

      {/* 實體裝飾小圓點 */}
      <div className="pointer-events-none absolute left-20 top-32 h-4 w-4 rounded-full bg-[#9d8189]" />
      <div className="pointer-events-none absolute right-1/4 top-1/4 h-6 w-6 rounded-full bg-[#f4acb7]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-3 w-3 rounded-full bg-[#d8e2dc]" />
      <div className="pointer-events-none absolute bottom-1/3 right-20 h-5 w-5 rounded-full bg-[#ffe5d9]" />
      <div className="pointer-events-none absolute bottom-1/4 left-1/4 h-8 w-8 rounded-full bg-[#ffcad4]" />

      <div className="relative z-10 mx-auto max-w-7xl space-y-32">
        {/* 品牌理念介紹：非對稱區塊排版 */}
        <section className="relative">
          <h2 className="text-5xl font-extrabold tracking-tighter text-[#9d8189] md:text-7xl">
            Philosophy.
          </h2>
          <div className="ml-auto mt-8 max-w-2xl rounded-3xl border border-white bg-white/60 p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md">
            <p className="font-medium leading-relaxed text-zinc-700 md:text-xl">
              品牌不只是商品，更是一種與人同行的價值。以誠意為本、品質為核、共好為願，在每一次互動中建立信任，讓品牌成為日常中的溫暖力量。
            </p>
            <p className="mt-6 leading-relaxed text-zinc-600 md:text-lg">
              透過持續創新與文化傳承，將「有心好勢、有運旺來」落實在服務與體驗，創造長遠且可持續的影響。
            </p>
          </div>
        </section>

        {/* 總監獨立區塊：圖文錯位佈局 */}
        <section className="relative mt-32">
          {/* 幾何裝飾線條 */}
          <div className="absolute -left-12 -top-12 h-48 w-48 rounded-full border-4 border-[#ffe5d9] bg-transparent" />
          
          <div className="flex flex-col items-center gap-12 md:flex-row lg:gap-20">
            {/* 圓形大像容器 */}
            <div className="relative h-[300px] w-[300px] shrink-0 md:h-[400px] md:w-[400px]">
              <div className="absolute inset-0 overflow-hidden rounded-full border-8 border-white bg-[#d8e2dc] shadow-2xl">
                {/* 實際開發時，請將此區塊替換為 next/image 元件 */}
                <div className="flex h-full w-full items-center justify-center p-8 text-center text-sm font-medium text-[#9d8189]">
                  [Director 照片放置區]
                </div>
              </div>
              <div className="absolute bottom-4 right-4 rotate-12 rounded-full bg-[#9d8189] px-6 py-2 text-sm font-bold tracking-widest text-white shadow-lg">
                DIRECTOR
              </div>
            </div>

            {/* 文字資訊 */}
            <div className="relative z-10 flex-1 space-y-6">
              <div className="space-y-2">
                <h3 className="text-5xl font-black text-zinc-900 md:text-6xl">
                  任祈蔚
                </h3>
                <p className="text-3xl font-light text-[#9d8189]">
                  Jen Chi-Wei
                </p>
              </div>
              <div className="inline-block rounded-2xl bg-[#ffcad4] px-6 py-3 shadow-sm">
                <p className="text-2xl font-bold tracking-wide text-[#9d8189]">
                  諮商心理師！
                </p>
              </div>
              <div className=" space-y-1 border-l-2 border-[#f4acb7] pl-4 text-lg text-zinc-500">
                <p>Ph.D. Program in Clinical Psychology</p>
                <p>National Taiwan University</p>
              </div>
            </div>
          </div>
        </section>

        {/* 核心團隊：交錯網格 */}
        <section className="relative">
          <div className="mb-16 flex items-end justify-between">
            <h2 className="text-4xl font-extrabold tracking-tighter text-[#9d8189] md:text-6xl">
              The Core.
            </h2>
            <p className="hidden max-w-sm text-right text-lg text-zinc-500 md:block">
              各自專司不同領域，共同推動品牌使命
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {TEAM_MEMBERS.slice(0, 6).map((member, index) => (
              <div
                key={member.id}
                className={`transition-transform duration-500 hover:-translate-y-4 ${
                  index % 3 === 1
                    ? "lg:translate-y-12"
                    : index % 3 === 2
                    ? "lg:translate-y-24"
                    : ""
                }`}
              >
                <TeamCard member={member} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}