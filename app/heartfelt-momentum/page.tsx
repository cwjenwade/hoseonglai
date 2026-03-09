import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "有心好勢",
};

export default function HeartfeltMomentumPage() {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-bold text-zinc-900">有心好勢</h2>
      <p className="mt-4 leading-8 text-zinc-700">
        凡事先有心，才有勢。我們重視每一份細節，從產品、流程到服務，
        都以真誠與負責任的態度面對，讓善意化為穩定向上的品牌動能。
      </p>
      <ul className="mt-6 list-disc space-y-2 pl-5 text-zinc-700">
        <li>有心：看見需求，主動回應。</li>
        <li>好勢：凝聚信任，持續成長。</li>
        <li>長久：一步一腳印，走得穩、走得遠。</li>
      </ul>
    </section>
  );
}
