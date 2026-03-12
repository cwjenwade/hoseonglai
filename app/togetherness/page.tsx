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

8 週一期
每週一次
每次 90 分鐘
6–10 人
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

團體互動會逐漸呈現
情緒模式與關係模式。

透過新的心理經驗
逐步建立更穩定的內在。

雙心理師帶領
團體前評估
保密倫理
`,
  },
];

export default function TogethernessPage() {
  return (
    <main className="bg-[#f6f3ee] text-[#1a1a1a] min-h-screen">

      <div className="mx-auto max-w-[1600px] px-12 py-32">

        {/* TITLE */}

        <header className="mb-48 grid grid-cols-12">

          <div className="col-span-8">

            <p className="text-[11px] tracking-[0.35em] uppercase text-neutral-500">
              Group Therapy Programme
            </p>

            <h1 className="mt-8 text-[72px] leading-[1.05] font-light tracking-[-0.02em]">
              團團圓圓
            </h1>

          </div>

          <div className="col-span-4">

            <p className="text-[18px] leading-[1.9] text-neutral-600">
              團體是一種心理空間。
              在他人的故事之中，
              我們逐漸看見自己的情緒、
              關係與內在模式。
            </p>

          </div>

        </header>

        {/* PROGRAMMES */}

        <div className="space-y-52">

          {groups.map((group, index) => (
            <section
              key={index}
              className="grid grid-cols-12 gap-16 items-start"
            >

              {/* IMAGE */}

              <div className="col-span-7">

                <div className="aspect-[4/5] overflow-hidden bg-neutral-200">

                  <img
                    src={group.image}
                    className="w-full h-full object-cover"
                  />

                </div>

              </div>

              {/* TEXT */}

              <div className="col-span-5">

                <p className="text-[11px] tracking-[0.35em] uppercase text-neutral-500">
                  Programme
                </p>

                <h2 className="mt-6 text-[36px] leading-[1.2] font-medium">
                  {group.title}
                </h2>

                <p className="text-neutral-500 text-[15px] mt-2">
                  {group.subtitle}
                </p>

                <p className="mt-10 text-[18px] leading-[2] text-neutral-700 max-w-[480px]">
                  {group.description}
                </p>

                {/* EXPAND */}

                <details className="mt-12 border-t border-neutral-300 pt-6">

                  <summary className="cursor-pointer text-[13px] tracking-[0.2em] uppercase">
                    Introduction
                  </summary>

                  <div className="mt-6 whitespace-pre-line text-[17px] leading-[2] text-neutral-700 max-w-[520px]">
                    {group.detail}
                  </div>

                </details>

                {/* LINK */}

                <a
                  href="https://forms.gle/"
                  target="_blank"
                  className="inline-block mt-14 text-[13px] tracking-[0.3em] uppercase border-b border-neutral-800 pb-1 hover:opacity-60"
                >
                  Join Group
                </a>

              </div>

            </section>
          ))}

        </div>

      </div>

    </main>
  );
}