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
    <main className="bg-[#f6f3ee] text-[#1a1a1a] min-h-screen">

      <div className="mx-auto max-w-[1500px] px-12 py-28">

        {/* PAGE TITLE */}

        <header className="mb-24">

          <h1 className="text-[52px] font-medium">
            團團圓圓
          </h1>

          <p className="text-neutral-500 mt-3 text-[15px]">
            Group Therapy Programme
          </p>

        </header>

        {/* EXHIBITION GRID */}

        <div className="grid grid-cols-3 gap-x-16 gap-y-24">

          {groups.map((group) => (

            <Link
              key={group.slug}
              href={`/groups/${group.slug}`}
              className="group block"
            >

              {/* IMAGE */}

              <div className="aspect-[4/5] overflow-hidden bg-neutral-200">

                <img
                  src={group.image}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />

              </div>

              {/* LABEL */}

              <p className="mt-6 text-[11px] tracking-wide text-neutral-400 uppercase">
                Exhibition
              </p>

              {/* TITLE */}

              <h2 className="mt-2 text-[22px] font-medium">
                {group.title}
              </h2>

              {/* SUBTITLE */}

              <p className="text-[14px] text-neutral-500">
                {group.subtitle}
              </p>

              {/* DESCRIPTION (2 lines only) */}

              <p className="mt-4 text-[15px] leading-[1.7] text-neutral-700 line-clamp-2">
                {group.description}
              </p>

            </Link>

          ))}

        </div>

      </div>

    </main>
  );
}