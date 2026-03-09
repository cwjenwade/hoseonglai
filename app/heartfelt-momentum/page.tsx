"use client";

export default function PsychologyArtworkPage() {
  const featuredVideo = {
    title: "When Emotions Lose Their Shape",
    subtitle:
      "Alexithymia is not simply having less emotion. It may reflect a reorganization of emotional structure.",
    category: "5-Minute Psychology Research",
    duration: "05 min",
    year: "2026",
    hook:
      "為什麼有些人不是沒有情緒，而是難以分辨情緒？這支五分鐘影片用心理計量分析解釋 alexithymia 如何改變情緒空間。",
    question: "What happens when emotions are felt, but no longer clearly distinguished?",
    keyFinding:
      "The findings suggest a collapse of emotional structure rather than simple emotional blunting.",
    concepts: [
      {
        term: "Alexithymia",
        note: "難以辨識與描述感受，並傾向外向式思考。",
      },
      {
        term: "Emotional differentiation",
        note: "能否把相近情緒區分成不同經驗。",
      },
      {
        term: "Emotional intensity",
        note: "不同情緒被感受到的強弱程度。",
      },
      {
        term: "Emotional structure",
        note: "情緒如何在心理空間中被排列與組織。",
      },
    ],
    stats: [
      { label: "Participants", value: "315" },
      { label: "Emotions", value: "19" },
      { label: "Iterations", value: "1,000" },
      { label: "Method", value: "PCA" },
    ],
    chapters: [
      {
        time: "00:35",
        label: "The question",
        note: "Alexithymia 常被理解成情緒遲鈍，但研究真正想問的是，情緒系統本身是否改變了組織方式。",
      },
      {
        time: "01:20",
        label: "How the study worked",
        note: "研究使用 TAS-20 與 mDES，分析 19 種情緒在兩組受試者中的排列方式，而不只比較平均數。",
      },
      {
        time: "02:40",
        label: "What changed",
        note: "alexithymia 組呈現較低正向情緒、較高負向情緒，並在多維情緒空間中出現位移。",
      },
      {
        time: "03:35",
        label: "Why it matters",
        note: "重點不只是強度變化，而是情緒之間的邊界變得模糊，高階分化維度受到壓縮。",
      },
      {
        time: "04:35",
        label: "Takeaway",
        note: "這篇研究把 alexithymia 從『情緒比較少』改寫為『情緒結構發生重整』。",
      },
    ],
    designFlow: [
      { title: "TAS-20", body: "測量 alexithymia" },
      { title: "mDES", body: "測量 19 種情緒強度" },
      { title: "Monte Carlo", body: "平衡不等組樣本" },
      { title: "PCA", body: "分析情緒結構" },
    ],
    findings: [
      {
        title: "Positive affect decreased",
        body: "pride、gladness、hope、love 的平均強度較低。",
      },
      {
        title: "Negative affect increased",
        body: "fear、sadness、scorn、repentance、stress 的強度較高。",
      },
      {
        title: "Emotional space expanded",
        body: "情緒空間更大，但不代表更細緻，也可能表示系統不穩。",
      },
      {
        title: "Differentiation weakened",
        body: "valence 主軸仍在，但高階分化維度受到壓縮。",
      },
    ],
  };

  const videoLibrary = [
    {
      title: "Why Emotions Blur Together",
      tag: "Alexithymia",
      blurb: "情緒分化如何下降，情緒邊界如何變模糊。",
      time: "05 min",
    },
    {
      title: "How Group Emotions Spread",
      tag: "Group Process",
      blurb: "團體中的情緒如何被彼此帶動與放大。",
      time: "05 min",
    },
    {
      title: "What Makes Empathy Possible",
      tag: "Empathy",
      blurb: "同理如何從辨識、理解到回應逐步形成。",
      time: "05 min",
    },
    {
      title: "Why Some Feelings Resist Words",
      tag: "Emotion Language",
      blurb: "情緒概念與語言能力如何影響內在經驗。",
      time: "05 min",
    },
    {
      title: "How Research Measures Emotion",
      tag: "Psychometrics",
      blurb: "心理測量如何捕捉看不見的情緒結構。",
      time: "05 min",
    },
    {
      title: "When Relationships Shape Feeling",
      tag: "Interpersonal Dynamics",
      blurb: "人際脈絡如何改變情緒經驗與表達方式。",
      time: "05 min",
    },
  ];

  const notes = [
    "這不是單一作品頁面。",
    "這是一個研究者以短影音轉譯心理學的平台首頁。",
    "每支影片都是一個研究問題、一段五分鐘解說與一個可理解的心理學概念。",
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f1ea] text-[#161616] selection:bg-[#d94f2b] selection:text-white">
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
          <div className="absolute left-[-8rem] top-[-6rem] h-[28rem] w-[28rem] rounded-full bg-[#c84d2f] blur-3xl" />
          <div className="absolute right-[-10rem] top-[10rem] h-[30rem] w-[30rem] rounded-full bg-[#7f221f] blur-3xl" />
          <div className="absolute bottom-[-8rem] left-[20%] h-[26rem] w-[26rem] rounded-full bg-[#e7b59a] blur-3xl" />
        </div>

        <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-between px-6 pb-8 pt-6 md:px-10 lg:px-14">
          <header className="flex items-center justify-between border-b border-black/10 pb-5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.32em] text-black/45">Ho-Se Ong-Lai</p>
              <h1 className="mt-2 text-lg font-medium tracking-tight md:text-xl">Psychology in 5 Minutes</h1>
            </div>
            <nav className="hidden items-center gap-8 text-sm text-black/55 md:flex">
              <a href="#featured" className="transition hover:text-black">Featured</a>
              <a href="#concepts" className="transition hover:text-black">Concepts</a>
              <a href="#findings" className="transition hover:text-black">Findings</a>
              <a href="#archive" className="transition hover:text-black">Library</a>
            </nav>
          </header>

          <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-16">
            <div className="max-w-3xl">
              <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-black/45">
                {featuredVideo.category} / {featuredVideo.year}
              </p>

              <h2 className="max-w-5xl text-5xl font-semibold leading-[0.92] tracking-[-0.05em] md:text-7xl lg:text-[7rem]">
                {featuredVideo.title}
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-8 text-black/68 md:text-lg">
                {featuredVideo.subtitle}
              </p>

              <p className="mt-8 max-w-xl text-sm leading-7 text-black/58 md:text-base">
                {featuredVideo.hook}
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <button className="group rounded-full bg-[#181818] px-6 py-3 text-sm text-white transition hover:scale-[1.02] hover:bg-[#000]">
                  <span className="inline-flex items-center gap-2">
                    Watch 5-minute video
                    <span className="transition group-hover:translate-x-0.5">↗</span>
                  </span>
                </button>
                <button className="rounded-full border border-black/15 bg-white/60 px-6 py-3 text-sm text-black backdrop-blur transition hover:border-black/30 hover:bg-white">
                  Explore research library
                </button>
              </div>

              <div className="mt-14 grid gap-4 sm:grid-cols-3">
                <div className="border-t border-black/15 pt-4">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-black/45">Format</p>
                  <p className="mt-2 text-sm text-black/80">Short research explainer</p>
                </div>
                <div className="border-t border-black/15 pt-4">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-black/45">Duration</p>
                  <p className="mt-2 text-sm text-black/80">{featuredVideo.duration}</p>
                </div>
                <div className="border-t border-black/15 pt-4">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-black/45">Focus</p>
                  <p className="mt-2 text-sm text-black/80">Research for the public</p>
                </div>
              </div>
            </div>

            <div id="featured" className="relative">
              <div className="absolute -inset-6 rounded-[2rem] bg-white/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-[#111] shadow-[0_30px_100px_rgba(0,0,0,0.18)]">
                <div className="aspect-[4/5] w-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_30%),linear-gradient(135deg,#1a1a1a_0%,#0a0a0a_45%,#451a17_100%)] p-5 sm:p-6">
                  <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                    <div className="flex items-start justify-between text-white/70">
                      <span className="text-xs uppercase tracking-[0.28em]">Featured research</span>
                      <span className="text-xs">{featuredVideo.duration}</span>
                    </div>

                    <div>
                      <div className="mb-6 flex items-center justify-center">
                        <button className="group flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:scale-105 hover:bg-white/15">
                          <span className="ml-1 text-3xl">▶</span>
                        </button>
                      </div>

                      <h3 className="max-w-sm text-3xl font-medium leading-tight tracking-[-0.04em] text-white md:text-4xl">
                        {featuredVideo.question}
                      </h3>

                      <p className="mt-4 max-w-md text-sm leading-7 text-white/68">
                        {featuredVideo.keyFinding}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {featuredVideo.stats.map((item) => (
                        <div
                          key={item.label}
                          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                        >
                          <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">{item.label}</p>
                          <p className="mt-2 text-sm text-white/88">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 border-t border-black/10 pt-5 text-sm text-black/55 md:grid-cols-3">
            {notes.map((item) => (
              <p key={item} className="max-w-sm leading-7">
                {item}
              </p>
            ))}
          </div>
        </section>
      </div>

      <section id="concepts" className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:px-14">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-black/45">Core concepts</p>
            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
              Research concepts, translated for public understanding.
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {featuredVideo.concepts.map((concept, index) => (
              <article
                key={concept.term}
                className={`group rounded-[2rem] border border-black/10 p-6 backdrop-blur transition hover:-translate-y-1 ${
                  index === 1
                    ? "bg-[#1c1c1c] text-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
                    : index === 2
                    ? "bg-[#d94f2b] text-white hover:shadow-[0_20px_60px_rgba(217,79,43,0.28)]"
                    : "bg-white/70 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
                }`}
              >
                <p className={`text-[11px] uppercase tracking-[0.28em] ${index === 0 || index === 3 ? "text-black/40" : "text-white/55"}`}>
                  0{index + 1}
                </p>
                <h4 className="mt-4 text-2xl font-medium tracking-[-0.03em]">{concept.term}</h4>
                <p className={`mt-4 text-sm leading-7 ${index === 0 || index === 3 ? "text-black/65" : "text-white/82"}`}>
                  {concept.note}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 md:px-10 lg:px-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="rounded-[2rem] border border-black/10 bg-white/60 p-6 backdrop-blur md:p-8">
            <p className="text-[11px] uppercase tracking-[0.32em] text-black/45">Study design</p>
            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
              How the research worked.
            </h3>
            <p className="mt-5 max-w-lg text-sm leading-7 text-black/65">
              這裡不直接丟出方法段落，而是把研究流程拆成可閱讀的節點，讓大眾知道研究結論如何形成。
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {featuredVideo.designFlow.map((item) => (
              <article
                key={item.title}
                className="rounded-[2rem] border border-black/10 bg-white/75 p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_50px_rgba(0,0,0,0.07)]"
              >
                <p className="text-[11px] uppercase tracking-[0.28em] text-black/40">Method</p>
                <h4 className="mt-4 text-2xl font-medium tracking-[-0.03em]">{item.title}</h4>
                <p className="mt-4 text-sm leading-7 text-black/65">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="findings" className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:px-14">
        <div className="mb-10 flex items-end justify-between gap-6 border-b border-black/10 pb-5">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-black/45">Key findings</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">What the study found</h3>
          </div>
          <p className="hidden max-w-md text-sm leading-7 text-black/55 md:block">
            不是只比較高低，而是把情緒在多維空間中的位置與結構一起看進來。
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {featuredVideo.findings.map((item, index) => (
            <article
              key={item.title}
              className={`group overflow-hidden rounded-[2rem] border border-black/10 p-6 transition hover:-translate-y-1 ${
                index === 0
                  ? "bg-white/70 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
                  : index === 1
                  ? "bg-[#1c1c1c] text-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
                  : index === 2
                  ? "bg-[#d94f2b] text-white hover:shadow-[0_20px_60px_rgba(217,79,43,0.28)]"
                  : "bg-white/70 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
              }`}
            >
              <p className={`text-[11px] uppercase tracking-[0.28em] ${index === 1 || index === 2 ? "text-white/50" : "text-black/40"}`}>
                Finding 0{index + 1}
              </p>
              <h4 className="mt-4 text-2xl font-medium tracking-[-0.03em]">{item.title}</h4>
              <p className={`mt-4 text-sm leading-7 ${index === 1 || index === 2 ? "text-white/82" : "text-black/65"}`}>
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="chapters" className="mx-auto max-w-7xl px-6 py-8 md:px-10 lg:px-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="rounded-[2rem] border border-black/10 bg-white/60 p-6 backdrop-blur md:p-8">
            <p className="text-[11px] uppercase tracking-[0.32em] text-black/45">Video structure</p>
            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
              Structured for a five-minute story.
            </h3>
            <p className="mt-5 max-w-lg text-sm leading-7 text-black/65">
              每支影片不是把研究段落照搬，而是改成一條清楚的觀看路徑，從問題、方法、發現到結論依序展開。
            </p>
          </div>

          <div className="space-y-4">
            {featuredVideo.chapters.map((chapter, index) => (
              <article
                key={chapter.time}
                className="group grid gap-4 rounded-[2rem] border border-black/10 bg-white/75 p-5 transition hover:border-black/20 hover:bg-white hover:shadow-[0_18px_50px_rgba(0,0,0,0.07)] md:grid-cols-[110px_1fr] md:p-6"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-black/40">Scene {index + 1}</p>
                  <p className="mt-3 text-2xl font-medium tracking-[-0.04em]">{chapter.time}</p>
                </div>
                <div>
                  <h4 className="text-xl font-medium tracking-[-0.03em]">{chapter.label}</h4>
                  <p className="mt-3 text-sm leading-7 text-black/65">{chapter.note}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:px-14">
        <div className="overflow-hidden rounded-[2.5rem] border border-black/10 bg-[#111] text-white shadow-[0_30px_120px_rgba(0,0,0,0.18)]">
          <div className="grid gap-8 p-8 md:p-10 lg:grid-cols-[1fr_0.9fr] lg:p-14">
            <div>
              <p className="text-[11px] uppercase tracking-[0.32em] text-white/40">Interactive moment</p>
              <h3 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
                Can you tell similar emotions apart?
              </h3>
              <p className="mt-5 max-w-lg text-sm leading-7 text-white/68">
                試著想一下，sad、disappointed、regretful、lonely 對你來說是不是容易分開。這就是 emotional differentiation 想處理的問題。
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
                  className="rounded-2xl border border-white/12 bg-white/5 px-5 py-4 text-left text-sm text-white/82 backdrop-blur transition hover:translate-x-1 hover:bg-white/10"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="archive" className="mx-auto max-w-7xl px-6 pb-24 md:px-10 lg:px-14">
        <div className="mb-8 flex items-end justify-between gap-6 border-b border-black/10 pb-5">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-black/45">Research library</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">More five-minute videos</h3>
          </div>
          <a href="#" className="hidden text-sm text-black/55 transition hover:text-black md:block">
            Browse all topics
          </a>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {videoLibrary.map((work, index) => (
            <article
              key={work.title}
              className="group relative overflow-hidden rounded-[2rem] border border-black/10 bg-white/70 p-6 backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
            >
              <div className="absolute right-4 top-4 text-[11px] uppercase tracking-[0.28em] text-black/25">
                0{index + 1}
              </div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-black/40">{work.tag}</p>
              <h4 className="mt-12 max-w-xs text-2xl font-medium tracking-[-0.03em]">{work.title}</h4>
              <p className="mt-4 max-w-sm text-sm leading-7 text-black/65">{work.blurb}</p>
              <div className="mt-8 flex items-center justify-between text-sm text-black/70">
                <span>{work.time}</span>
                <span className="inline-flex items-center gap-2 transition group-hover:gap-3 group-hover:text-black">
                  Open video <span>↗</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
