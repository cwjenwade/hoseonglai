"use client";

type FeaturedVideo = {
  title: string;
  subtitle: string;
  category: string;
  duration: string;
  year: string;
  hook: string;
  question: string;
  keyFinding: string;
  concepts: { term: string; note: string }[];
  stats: { label: string; value: string }[];
};

type LibraryItem = {
  title: string;
  tag: string;
  blurb: string;
  time: string;
};

type TopicItem = {
  title: string;
  description: string;
};

export default function PsychologyArtworkPage() {
  const featuredVideo: FeaturedVideo = {
    title: "When Emotions Lose Their Shape",
    subtitle:
      "A five minute psychology research video on alexithymia, emotional differentiation, and the structure of feeling.",
    category: "Featured research video",
    duration: "05 min",
    year: "2026",
    hook:
      "不是每一種情緒困難都代表情緒變少。有時候，問題出在情緒之間的邊界開始模糊。",
    question:
      "What happens when people still feel emotion, but can no longer clearly tell emotions apart?",
    keyFinding:
      "Alexithymia may reflect a reorganization of emotional structure rather than simple emotional blunting.",
    concepts: [
      {
        term: "Alexithymia",
        note: "難以辨識與描述感受，並傾向外向式思考。",
      },
      {
        term: "Emotional differentiation",
        note: "能否把相近情緒拆成不同經驗。",
      },
      {
        term: "Emotional intensity",
        note: "不同情緒被感受到的強弱程度。",
      },
      {
        term: "Emotional structure",
        note: "情緒在心理空間中的排列方式。",
      },
    ],
    stats: [
      { label: "Participants", value: "315" },
      { label: "Emotion items", value: "19" },
      { label: "Iterations", value: "1,000" },
      { label: "Analysis", value: "PCA" },
    ],
  };

  const currentVideos: LibraryItem[] = [
    {
      title: "When Emotions Lose Their Shape",
      tag: "Alexithymia",
      blurb: "情緒結構如何改變，而不只是情緒高低改變。",
      time: "05 min",
    },
    {
      title: "Why Similar Feelings Blur Together",
      tag: "Emotion Differentiation",
      blurb: "sad、disappointed、regretful、lonely 為什麼有時會混成一團。",
      time: "05 min",
    },
    {
      title: "How Group Emotions Spread",
      tag: "Group Process",
      blurb: "團體中的情緒如何彼此感染、擴散與累積。",
      time: "05 min",
    },
    {
      title: "What Makes Empathy Possible",
      tag: "Empathy",
      blurb: "同理如何從辨識、理解到回應逐步形成。",
      time: "05 min",
    },
  ];

  const topicRows: TopicItem[] = [
    {
      title: "Emotion",
      description: "alexithymia、情緒分化、情緒強度、emotion regulation",
    },
    {
      title: "Interpersonal Dynamics",
      description: "人際困擾、互動歷程、關係中的情緒位置",
    },
    {
      title: "Group Process",
      description: "團體心理治療中的情緒流動、連結與轉變",
    },
    {
      title: "Psychometrics",
      description: "如何用統計與測量方法理解心理結構",
    },
  ];

  const readingItems: LibraryItem[] = [
    {
      title: "How Research Measures Emotion",
      tag: "Psychometrics",
      blurb: "心理測量如何捕捉看不見的情緒結構。",
      time: "Read",
    },
    {
      title: "Why Some Feelings Resist Words",
      tag: "Emotion Language",
      blurb: "情緒概念與語言能力如何影響內在經驗。",
      time: "Read",
    },
    {
      title: "When Relationships Shape Feeling",
      tag: "Interpersonal Dynamics",
      blurb: "人際脈絡如何改變情緒經驗與表達方式。",
      time: "Read",
    },
  ];

  const notes = [
    "這是一個把心理學研究轉譯成五分鐘影片的平台。",
    "首頁不是單一作品，而是多個研究入口所形成的策展式版面。",
    "每個區塊都是一條新的入口，讓民眾從影片、主題、概念與延伸閱讀接近研究。",
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#f3efe8] text-[#121212] selection:bg-[#d94f2b] selection:text-white">
      <div className="relative border-b border-black/10 bg-[#f3efe8]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
          <div className="absolute left-[-8rem] top-[-6rem] h-[24rem] w-[24rem] rounded-full bg-[#d65a33] blur-3xl" />
          <div className="absolute right-[-8rem] top-[5rem] h-[26rem] w-[26rem] rounded-full bg-[#7f221f] blur-3xl" />
        </div>

        <header className="relative mx-auto max-w-7xl px-6 py-5 md:px-10 lg:px-14">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.34em] text-black/45">Ho-Se Ong-Lai</p>
              <h1 className="mt-2 text-[28px] font-medium tracking-[-0.04em] md:text-[34px]">
                Psychology in 5 Minutes
              </h1>
            </div>

            <div className="grid gap-4 text-sm text-black/60 md:grid-cols-2 lg:w-[42rem] lg:grid-cols-4">
              <a href="#featured" className="transition hover:text-black">Featured video</a>
              <a href="#current" className="transition hover:text-black">Current videos</a>
              <a href="#topics" className="transition hover:text-black">Topics</a>
              <a href="#reading" className="transition hover:text-black">Read more</a>
            </div>
          </div>
        </header>
      </div>

      <section id="featured" className="mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-14 lg:px-14 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          <div>
            <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-[#111] shadow-[0_30px_100px_rgba(0,0,0,0.14)]">
              <div className="aspect-[16/10] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_30%),linear-gradient(135deg,#181818_0%,#0f0f0f_40%,#4c1a14_100%)] p-5 sm:p-6">
                <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <div className="flex items-start justify-between text-white/68">
                    <span className="text-xs uppercase tracking-[0.28em]">{featuredVideo.category}</span>
                    <span className="text-xs">{featuredVideo.duration}</span>
                  </div>

                  <div className="max-w-2xl">
                    <button className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-white/18 bg-white/10 text-white transition hover:scale-105 hover:bg-white/15">
                      <span className="ml-1 text-3xl">▶</span>
                    </button>
                    <h2 className="text-4xl font-medium leading-[0.95] tracking-[-0.05em] text-white md:text-6xl lg:text-[4.5rem]">
                      {featuredVideo.title}
                    </h2>
                    <p className="mt-5 max-w-xl text-sm leading-7 text-white/72 md:text-base">
                      {featuredVideo.subtitle}
                    </p>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-4">
                    {featuredVideo.stats.map((item) => (
                      <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                        <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">{item.label}</p>
                        <p className="mt-2 text-sm text-white/88">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.34em] text-black/45">Featured question</p>
              <h3 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.04em] md:text-4xl lg:text-[2.75rem]">
                {featuredVideo.question}
              </h3>
              <p className="mt-6 max-w-lg text-sm leading-7 text-black/65 md:text-base">
                {featuredVideo.hook}
              </p>
            </div>

            <div className="rounded-[2rem] border border-black/10 bg-white/70 p-6 backdrop-blur">
              <p className="text-[11px] uppercase tracking-[0.3em] text-black/45">Key idea</p>
              <p className="mt-4 text-xl font-medium leading-snug tracking-[-0.03em]">
                {featuredVideo.keyFinding}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {featuredVideo.concepts.map((concept) => (
                  <span
                    key={concept.term}
                    className="rounded-full border border-black/10 bg-[#f7f3ed] px-3 py-1.5 text-xs uppercase tracking-[0.16em] text-black/70"
                  >
                    {concept.term}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="current" className="border-y border-black/10 bg-white/30">
        <div className="mx-auto max-w-7xl px-6 py-10 md:px-10 lg:px-14 lg:py-14">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.34em] text-black/45">Current videos</p>
              <h3 className="mt-3 text-3xl font-medium tracking-[-0.04em] md:text-4xl">Research videos now on view</h3>
            </div>
            <a href="#archive" className="hidden text-sm text-black/60 transition hover:text-black md:block">
              Browse all videos
            </a>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {currentVideos.map((item, index) => (
              <article
                key={item.title}
                className={`group overflow-hidden rounded-[2rem] border border-black/10 p-5 transition hover:-translate-y-1 ${
                  index === 1
                    ? "bg-[#1b1b1b] text-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
                    : index === 2
                    ? "bg-[#d94f2b] text-white hover:shadow-[0_20px_60px_rgba(217,79,43,0.28)]"
                    : "bg-white/70 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
                }`}
              >
                <div className="aspect-[4/3] rounded-[1.5rem] border border-current/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.01))]" />
                <p className={`mt-5 text-[11px] uppercase tracking-[0.28em] ${index === 1 || index === 2 ? "text-white/52" : "text-black/40"}`}>
                  {item.tag}
                </p>
                <h4 className="mt-3 text-2xl font-medium tracking-[-0.03em]">{item.title}</h4>
                <p className={`mt-4 text-sm leading-7 ${index === 1 || index === 2 ? "text-white/82" : "text-black/65"}`}>
                  {item.blurb}
                </p>
                <div className={`mt-8 flex items-center justify-between text-sm ${index === 1 || index === 2 ? "text-white/72" : "text-black/70"}`}>
                  <span>{item.time}</span>
                  <span className="inline-flex items-center gap-2 transition group-hover:gap-3">
                    Open <span>↗</span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="topics" className="mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-14 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <p className="text-[11px] uppercase tracking-[0.34em] text-black/45">Topics</p>
            <h3 className="mt-3 text-3xl font-medium tracking-[-0.04em] md:text-4xl">
              Explore research interests as a collection.
            </h3>
            <p className="mt-5 max-w-md text-sm leading-7 text-black/65">
              不同研究主題不是分散頁面，而是像館藏分類一樣形成可探索的入口。民眾可以從情緒、人際、團體與測量四條線進入。
            </p>
          </div>

          <div className="border-t border-black/10">
            {topicRows.map((item, index) => (
              <article
                key={item.title}
                className="grid gap-3 border-b border-black/10 py-5 md:grid-cols-[220px_1fr] md:gap-6"
              >
                <div className="flex items-center gap-4">
                  <span className="text-[11px] uppercase tracking-[0.28em] text-black/35">0{index + 1}</span>
                  <h4 className="text-xl font-medium tracking-[-0.03em]">{item.title}</h4>
                </div>
                <p className="text-sm leading-7 text-black/65">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-[#111] text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-14 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:gap-14">
            <div>
              <p className="text-[11px] uppercase tracking-[0.34em] text-white/42">Concept spotlight</p>
              <h3 className="mt-3 max-w-2xl text-3xl font-medium tracking-[-0.04em] md:text-5xl">
                Can you tell similar emotions apart?
              </h3>
              <p className="mt-5 max-w-lg text-sm leading-7 text-white/68">
                sad、disappointed、regretful、lonely 看起來接近，但不完全相同。當這些情緒難以分開時，情緒分化能力可能下降。
              </p>
            </div>

            <div className="grid gap-3 self-end">
              {[
                "Sad",
                "Disappointed",
                "Regretful",
                "Lonely",
              ].map((option) => (
                <button
                  key={option}
                  className="rounded-2xl border border-white/12 bg-white/5 px-5 py-4 text-left text-sm text-white/82 backdrop-blur transition hover:bg-white/10"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="reading" className="mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-14 lg:py-16">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.34em] text-black/45">Read more</p>
            <h3 className="mt-3 text-3xl font-medium tracking-[-0.04em] md:text-4xl">New ideas and perspectives</h3>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {readingItems.map((item) => (
            <article
              key={item.title}
              className="group rounded-[2rem] border border-black/10 bg-white/70 p-6 backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
            >
              <p className="text-[11px] uppercase tracking-[0.28em] text-black/40">{item.tag}</p>
              <h4 className="mt-4 text-2xl font-medium tracking-[-0.03em]">{item.title}</h4>
              <p className="mt-4 text-sm leading-7 text-black/65">{item.blurb}</p>
              <div className="mt-8 flex items-center justify-between text-sm text-black/70">
                <span>{item.time}</span>
                <span className="inline-flex items-center gap-2 transition group-hover:gap-3 group-hover:text-black">
                  Open <span>↗</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="archive" className="border-t border-black/10 bg-white/20">
        <div className="mx-auto max-w-7xl px-6 py-10 md:px-10 lg:px-14 lg:py-14">
          <div className="grid gap-4 border-b border-black/10 pb-6 text-sm text-black/55 md:grid-cols-3">
            {notes.map((item) => (
              <p key={item} className="max-w-sm leading-7">
                {item}
              </p>
            ))}
          </div>

          <footer className="flex flex-col gap-5 pt-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.34em] text-black/45">Psychology in 5 Minutes</p>
              <p className="mt-3 max-w-xl text-sm leading-7 text-black/60">
                Research videos, concepts, and readings for public understanding.
              </p>
            </div>
            <div className="grid gap-3 text-sm text-black/60 md:grid-cols-3 md:gap-8">
              <a href="#featured" className="transition hover:text-black">Featured</a>
              <a href="#current" className="transition hover:text-black">Videos</a>
              <a href="#topics" className="transition hover:text-black">Topics</a>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}
