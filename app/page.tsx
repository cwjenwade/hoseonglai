import Link from "next/link";

export default function Home() {
  const pages = [
    {
      href: "/brand-philosophy",
      title: "品牌理念",
      description: "以文化、情感與行動，打造可長可久的品牌價值。",
    },
    {
      href: "/heartfelt-momentum",
      title: "有心好勢",
      description: "用真誠與用心累積信任，形成向上的好勢能。",
    },
    {
      href: "/fortune-arrives",
      title: "有運旺來",
      description: "把握機會、持續精進，讓好運成為日常節奏。",
    },
    {
      href: "/togetherness",
      title: "團團圓圓",
      description: "重視連結與陪伴，讓每次相聚都更有溫度。",
    },
    {
      href: "/collaborative-prosperity",
      title: "協力招來",
      description: "以共創精神整合夥伴力量，帶來更大影響力。",
    },
  ];

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-amber-200 bg-white px-6 py-10 shadow-sm">
        <p className="text-sm font-semibold text-amber-700">品牌主張</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900">有心好勢，有運旺來</h2>
        <p className="mt-4 max-w-2xl leading-8 text-zinc-600">
          這裡展示品牌核心精神與五大價值頁面。以正向信念、團圓文化與協作精神，傳遞長久而溫暖的品牌能量。
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {pages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="rounded-2xl border border-zinc-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-md"
          >
            <h3 className="text-lg font-semibold text-zinc-900">{page.title}</h3>
            <p className="mt-2 text-sm leading-7 text-zinc-600">{page.description}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
