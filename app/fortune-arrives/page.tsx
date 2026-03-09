import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "有運旺來",
};

export default function FortuneArrivesPage() {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-bold text-zinc-900">有運旺來</h2>
      <p className="mt-4 leading-8 text-zinc-700">
        好運不是等待，而是準備。以穩健實踐與正向心念，創造機會、把握契機，
        讓每一次努力都成為迎向興旺的起點。
      </p>
      <p className="mt-4 leading-8 text-zinc-700">
        當團隊與夥伴共同前行，運勢就不再是偶然，而是可被持續累積的結果。
      </p>
    </section>
  );
}
