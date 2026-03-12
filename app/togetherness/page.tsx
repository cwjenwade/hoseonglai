import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "團團圓圓 | Group Therapy",
};

const groups = [
  {
    slug: "group-counseling",
    title: "團體諮商",
    subtitle: "Group Counseling",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop",
    description:
      "在安全且保密的團體中探索情緒與關係。透過傾聽與回饋逐漸理解自己。",
  },
  {
    slug: "group-psychotherapy",
    title: "團體心理治療",
    subtitle: "Group Psychotherapy",
    image:
      "https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=1600&auto=format&fit=crop",
    description:
      "深入探索依附、情緒與關係模式。在互動中建立新的心理經驗。",
  },
  {
    slug: "interpersonal-group",
    title: "人際歷程團體",
    subtitle: "Interpersonal Process Group",
    image:
      "https://images.unsplash.com/photo-1529336953121-a0ce2d6a5c6d?q=80&w=1600&auto=format&fit=crop",
    description:
      "透過即時互動理解人際模式。練習新的表達與關係方式。",
  },
];

export default function TogethernessPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#171717]">
      <div className="mx-auto max-w-[1520px] px-8 py-16 md:px-12 md:py-20">
        <header className="mb-16 md:mb-20">
          <p className="text-[11px] uppercase tracking-[0.08em] text-neutral-400">
            What&apos;s On
          </p>

          <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <h1 className="text-[44px] leading-[1.12] font-medium text-neutral-900 md:text-[52px]">
                團團圓圓
              </h1>

              <p className="mt-3 text-[14px] text-neutral-500">
                Group Therapy Programme
              </p>
            </div>

            <div className="md:col-span-4 md:col-start-9">
              <p className="max-w-[360px] text-[15px] leading-[1.75] text-neutral-600">
                以展品的方式呈現不同團體。進入各團體頁面可查看完整說明與報名諮詢。
              </p>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-10 xl:gap-y-20">
          {groups.map((group) => (
            <article key={group.slug} className="group">
              <Link href={`/groups/${group.slug}`} className="block">
                <div className="aspect-[4/5] overflow-hidden bg-neutral-200">
                  <img
                    src={group.image}
                    alt={group.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                </div>

                <div className="mt-5">
                  <p className="inline-block border border-neutral-300 px-2 py-1 text-[10px] uppercase tracking-[0.08em] text-neutral-500">
                    Exhibition
                  </p>

                  <h2 className="mt-4 text-[24px] leading-[1.25] font-medium text-neutral-900">
                    {group.title}
                  </h2>

                  <p className="mt-1 text-[13px] leading-[1.5] text-neutral-500">
                    {group.subtitle}
                  </p>

                  <p className="mt-4 max-w-[32ch] text-[15px] leading-[1.75] text-neutral-700 line-clamp-2">
                    {group.description}
                  </p>

                  <span className="mt-5 inline-block border-b border-neutral-700 pb-[2px] text-[13px] text-neutral-700 transition-opacity duration-200 group-hover:opacity-60">
                    View details
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}