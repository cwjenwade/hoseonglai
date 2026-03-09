import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "品牌理念",
};

export default function BrandPhilosophyPage() {
  return (
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
  );
}
