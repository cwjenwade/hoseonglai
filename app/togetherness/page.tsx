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

團體提供一個安全空間，讓成員練習表達、被理解，
也學習新的互動方式。

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
此團體由心理師帶領，適合希望更深入理解自己的人。

在團體互動中，
成員會逐漸看見自己的情緒模式、
依附關係以及長期形成的防衛方式。

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
    <main className="bg-[#f6f3ee] min-h-screen">
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-12">

        {/* page title */}

        <header className="mb-24 max-w-3xl">
          <p className="text-xs tracking-[0.25em] text-neutral-500 uppercase">
            Group Therapy
          </p>

          <h1 className="mt-4 text-5xl md:text-6xl font-serif text-neutral-900 leading-tight">
            團團圓圓
          </h1>

          <p className="mt-6 text-lg leading-8 text-neutral-700">
            團體是一個讓人被看見、被理解的空間。
            在這裡，我們透過彼此的經驗與回應，
            逐漸理解自己與世界的關係。
          </p>
        </header>

        {/* group posters */}

        <div className="space-y-32">

          {groups.map((group, index) => (
            <section
              key={index}
              className="grid gap-12 lg:grid-cols-[1.3fr_1fr] items-start"
            >
              {/* poster */}

              <div className="overflow-hidden">
                <img
                  src={group.image}
                  className="w-full object-cover"
                />
              </div>

              {/* text */}

              <div className="max-w-xl">

                <p className="text-xs tracking-[0.25em] text-neutral-500 uppercase">
                  JOIN GROUP
                </p>

                <h2 className="mt-3 text-4xl font-serif text-neutral-900">
                  {group.title}
                </h2>

                <p className="text-neutral-500 mt-1 italic">
                  {group.subtitle}
                </p>

                <p className="mt-6 text-lg leading-8 text-neutral-700">
                  {group.description}
                </p>

                {/* expandable intro */}

                <details className="mt-8 border-t border-neutral-300 pt-6">
                  <summary className="cursor-pointer text-sm tracking-wider text-neutral-700">
                    閱讀團體簡介
                  </summary>

                  <div className="mt-5 whitespace-pre-line text-neutral-700 leading-8">
                    {group.detail}
                  </div>
                </details>

                {/* CTA */}

                <a
                  href="https://forms.gle/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-10 border border-neutral-900 px-6 py-3 text-sm tracking-widest hover:bg-neutral-900 hover:text-white transition"
                >
                  JOIN GROUP
                </a>

              </div>
            </section>
          ))}

        </div>
      </div>
    </main>
  );
}