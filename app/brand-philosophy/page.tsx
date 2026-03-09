import type { Metadata } from "next";
import TeamCard from "./TeamCard";
import { TEAM_MEMBERS } from "./team-data";

export const metadata: Metadata = {
  title: "品牌理念",
};

export default function BrandPhilosophyPage() {
  return (
    <div className="space-y-8">
      {/* 品牌理念介紹 */}
      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-zinc-900">品牌理念</h2>
        <p className="mt-4 leading-8 text-zinc-700">
          我們相信品牌不只是商品，更是一種與人同行的價值。以誠意為本、品質為核、共好為願，
          在每一次互動中建立信任，讓品牌成為日常中的溫暖力量。
        </p>
        <p className="mt-4 leading-8 text-zinc-700">
          透過持續創新與文化傳承，將「有心好勢、有運旺來」落實在服務與體驗，創造長遠且可持續的影響。
        </p>
      </section>

      {/* 核心團隊 */}
      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-zinc-900">核心團隊</h2>
          <p className="mt-2 text-lg text-zinc-600">
            7 位核心成員，各自專司不同領域，共同推動品牌使命
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
