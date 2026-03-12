import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "團團圓圓 | Group Therapy",
};

const groups = [
  {
    title: "團體諮商",
    subtitle: "Group Counseling",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop",
    description:
      "在安全且保密的團體中，透過傾聽與回饋，探索情緒、人際與自我。",
    detail: `
在團體中，你會發現自己並不孤單。
透過他人的經驗與回饋，我們逐漸理解自己的情緒與關係模式。

團體提供一個安全空間，讓成員練習表達與被理解，
並學習新的互動方式。

形式：
8 週一期  
每週一次  
每次 90 分鐘  
6–10 人小團體
`,
  },
  {
    title: "團體心理治療",
    subtitle: "Group Psychotherapy",
    image:
      "https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=1600&auto=format&fit=crop",
    description:
      "深入探索情緒、依附與關係模式，建立新的心理經驗。",
    detail: `
此團體由心理師帶領，
適合希望更深入理解自己的人。

在團體互動中，
成員會逐漸看見自己的情緒模式、
依附關係與長期形成的防衛方式。

透過新的互動經驗，
心理逐漸建立安全與信任，
並形成更穩定的內在。

專業配置：
雙帶領心理師  
團體前評估  
完整保密倫理
`,
  },
];

export default function TogethernessPage() {
  return (
    <main className="bg-[#f6f3ee] min-h-screen text-neutral-900">

      <div className="mx-auto max-w-[1500px] px-10 py-28">

        {/* TITLE */}

        <header className="mb-40 max-w-2xl">

          <p className="text-[11px] tracking-[0.28em] uppercase text-neutral-500">
            Group Therapy
          </p>

          <h1 className="mt-6 text-6xl leading-[1.05] font-serif">
            團團圓圓
          </h1>

          <p className="mt-10 text-[18px] leading-[1.9] text-neutral-700">
            團體是一個讓人被看見與被理解的空間。
            在彼此的經驗與回應之中，
            我們逐漸理解自己與世界的關係。
          </p>

        </header>

        {/* GROUP POSTERS */}

        <div className="space-y-44">

          {groups.map((group, index) => (
            <section
              key={index}
              className="grid lg:grid-cols-[1.25fr_0.75fr] gap-28 items-start"
            >

              {/* IMAGE */}

              <div className="group aspect-[4/5] overflow-hidden bg-neutral-200">

                <img
                  src={group.image}
                  className="h-full w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-[1.03]"
                />

              </div>

              {/* TEXT */}

              <div className="max-w-md">

                <p className="text-[11px] tracking-[0.28em] uppercase text-neutral-500">
                  Join Group
                </p>

                <h2 className="mt-5 text-4xl leading-[1.15] font-serif">
                  {group.title}
                </h2>

                <p className="mt-2 text-neutral-500 italic text-[15px]">
                  {group.subtitle}
                </p>

                <p className="mt-8 text-[17px] leading-[1.9] text-neutral-700">
                  {group.description}
                </p>

                {/* EXPAND */}

                <details className="mt-10 border-t border-neutral-300 pt-6">

                  <summary className="cursor-pointer text-[12px] tracking-[0.18em] uppercase text-neutral-600">
                    團體簡介
                  </summary>

                  <div className="mt-6 whitespace-pre-line text-[16px] leading-[1.9] text-neutral-700">
                    {group.detail}
                  </div>

                </details>

                {/* CTA */}

                <a
                  href="https://forms.gle/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 mt-12 text-[12px] tracking-[0.25em] uppercase"
                >
                  JOIN GROUP

                  <span className="transition group-hover:translate-x-1">
                    →
                  </span>

                </a>

              </div>

            </section>
          ))}

        </div>

      </div>

    </main>
  );
}