import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "協力招來",
};

export default function CollaborativeProsperityPage() {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-bold text-zinc-900">協力招來</h2>
      <p className="mt-4 leading-8 text-zinc-700">
        協力，是讓好事發生的關鍵。我們相信跨域合作、互補共創，
        能把單一的努力擴大成群體的影響，招來更多正向循環與成長機會。
      </p>
      <p className="mt-4 leading-8 text-zinc-700">
        透過透明溝通、共享目標與彼此成就，打造共贏且可持續的合作關係。
      </p>
    </section>
  );
}
