import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "團團圓圓",
};

export default function TogethernessPage() {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-bold text-zinc-900">團團圓圓</h2>
      <p className="mt-4 leading-8 text-zinc-700">
        我們珍惜每一次相聚，將「團圓」視為品牌最重要的情感核心。
        不論是家人、朋友、夥伴，彼此靠近與互相支持，都是最珍貴的圓滿。
      </p>
      <p className="mt-4 leading-8 text-zinc-700">
        從節慶到日常，讓溫暖關係被看見、被延續，成為生活中持續發光的力量。
      </p>
    </section>
  );
}
