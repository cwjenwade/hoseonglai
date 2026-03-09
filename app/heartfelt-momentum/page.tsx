"use client";

type FeaturedVideo = {
  title: string;
  titleEn: string;
  subtitle: string;
  duration: string;
  year: string;
  question: string;
  keyFinding: string;
};

type LibraryItem = {
  title: string;
  titleEn: string;
  tag: string;
  time: string;
};

type TopicItem = {
  title: string;
  titleEn: string;
};

export default function PsychologyArtworkPage() {
  const featuredVideo: FeaturedVideo = {
    title: "當情緒失去形狀",
    titleEn: "When Emotions Lose Their Shape",
    subtitle: "五分鐘看懂 alexithymia、情緒分化與情緒結構。",
    duration: "5 分鐘",
    year: "2026",
    question: "不是沒情緒，而是情緒之間開始分不開？",
    keyFinding: "alexithymia 反映的可能不是情緒變少，而是情緒結構重整。",
  };

  const currentVideos: LibraryItem[] = [
    {
      title: "當情緒失去形狀",
      titleEn: "When Emotions Lose Their Shape",
      tag: "Alexithymia",
      time: "5 分鐘",
    },
    {
      title: "相近情緒為何混在一起",
      titleEn: "Why Similar Feelings Blur Together",
      tag: "Emotion Differentiation",
      time: "5 分鐘",
    },
    {
      title: "情緒如何在團體中擴散",
      titleEn: "How Group Emotions Spread",
      tag: "Group Process",
      time: "5 分鐘",
    },
    {
      title: "同理是怎麼發生的",
      titleEn: "What Makes Empathy Possible",
      tag: "Empathy",
      time: "5 分鐘",
    },
    {
      title: "為何有些感受說不出口",
      titleEn: "Why Some Feelings Resist Words",
      tag: "Emotion Language",
      time: "5 分鐘",
    },
    {
      title: "心理測量如何理解情緒",
      titleEn: "How Research Measures Emotion",
      tag: "Psychometrics",
      time: "5 分鐘",
    },
    {
      title: "關係如何改變情緒經驗",
      titleEn: "When Relationships Shape Feeling",
      tag: "Interpersonal Dynamics",
      time: "5 分鐘",
    },
    {
      title: "情緒強度真的比較高嗎",
      titleEn: "How Intense Is Emotion",
      tag: "Emotion Intensity",
      time: "5 分鐘",
    },
    {
      title: "如何看懂情緒結構",
      titleEn: "Reading Emotional Structure",
      tag: "Affective Structure",
      time: "5 分鐘",
    },
    {
      title: "情緒分化與心理健康",
      titleEn: "Emotion Differentiation and Health",
      tag: "Mental Health",
      time: "5 分鐘",
    },
  ];

  const topicRows: TopicItem[] = [
    { title: "情緒", titleEn: "Emotion" },
    { title: "人際", titleEn: "Interpersonal" },
    { title: "團體", titleEn: "Group Process" },
    { title: "測量", titleEn: "Psychometrics" },
  ];

  return (
    <main className="min-h-screen w-full bg-[#f3efe8] text-[#121212] selection:bg-[#d94f2b] selection:text-white">
      <section id="featured" className="w-full border-b border-black/10 px-5 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
        <div className="grid gap-8 xl:grid-cols-[1.35fr_0.65fr] xl:gap-10">
          <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-[#111] shadow-[0_18px_60px_rgba(0,0,0,0.12)]">
            <div className="aspect-[16/10] bg-[linear-gradient(135deg,#171717_0%,#0f0f0f_42%,#5a1d16_100%)] p-5 md:p-6">
              <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-white/10 bg-white/5 p-5 md:p-6">
                <div className="flex items-start justify-between text-white/68">
                  <span className="text-[10px] uppercase tracking-[0.28em]">Featured</span>
                  <span className="text-sm">{featuredVideo.duration}</span>
                </div>

                <div className="max-w-4xl">
                  <button className="mb-7 flex h-16 w-16 items-center justify-center rounded-full border border-white/16 bg-white/10 text-white transition hover:scale-105 hover:bg-white/15 md:h-20 md:w-20">
                    <span className="ml-1 text-2xl md:text-3xl">▶</span>
                  </button>

                  <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-white/45">
                    {featuredVideo.titleEn}
                  </p>
                  <h1 className="max-w-5xl text-4xl font-medium leading-[0.95] tracking-[-0.05em] text-white md:text-6xl xl:text-[5.5rem]">
                    {featuredVideo.title}
                  </h1>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-white/76 md:text-base">
                    {featuredVideo.subtitle}
                  </p>
                </div>

                <div className="grid gap-2 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-white/42">Question</p>
                    <p className="mt-2 text-sm leading-6 text-white/88">{featuredVideo.question}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-white/42">Key finding</p>
                    <p className="mt-2 text-sm leading-6 text-white/88">{featuredVideo.keyFinding}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-white/42">Year</p>
                    <p className="mt-2 text-sm leading-6 text-white/88">{featuredVideo.year}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6">
            <div className="border-b border-black/10 pb-6">
              <p className="text-[10px] uppercase tracking-[0.28em] text-black/40">Psychology in 5 Minutes</p>
              <p className="mt-4 text-3xl font-medium leading-tight tracking-[-0.04em] md:text-4xl">
                五分鐘心理學研究影片
              </p>
            </div>

            <div className="grid gap-3 text-sm text-black/70">
              <a href="#current" className="flex items-center justify-between border-b border-black/10 pb-3 transition hover:text-black">
                <span>影片</span>
                <span className="text-black/35">Videos</span>
              </a>
              <a href="#topics" className="flex items-center justify-between border-b border-black/10 pb-3 transition hover:text-black">
                <span>主題</span>
                <span className="text-black/35">Topics</span>
              </a>
              <a href="#archive" className="flex items-center justify-between border-b border-black/10 pb-3 transition hover:text-black">
                <span>策展</span>
                <span className="text-black/35">Archive</span>
              </a>
            </div>

            <div className="rounded-[2rem] border border-black/10 bg-black/[0.02] p-6">
              <p className="text-[10px] uppercase tracking-[0.28em] text-black/40">Focus</p>
              <p className="mt-4 text-xl font-medium leading-snug tracking-[-0.03em]">
                研究不是摘要，而是可以被觀看、被理解、被帶進日常的知識形式。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="current" className="w-full px-5 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
        <div className="mb-8 flex items-end justify-between gap-6 border-b border-black/10 pb-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-black/40">Videos</p>
            <h2 className="mt-2 text-3xl font-medium tracking-[-0.04em] md:text-4xl">十支影片</h2>
          </div>
          <p className="hidden text-sm text-black/45 md:block">10 curated videos</p>
        </div>

        <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
          {currentVideos.map((item, index) => (
            <article key={item.title} className="group">
              <div
                className={`aspect-[4/3] overflow-hidden rounded-[1.6rem] border border-black/10 transition ${
                  index === 0
                    ? "bg-[#111] text-white"
                    : index === 3
                    ? "bg-[#d94f2b] text-white"
                    : "bg-white/55"
                }`}
              >
                <div className="flex h-full flex-col justify-between p-5">
                  <div className="flex items-start justify-between text-[10px] uppercase tracking-[0.24em]">
                    <span className={index === 0 || index === 3 ? "text-white/45" : "text-black/35"}>{item.tag}</span>
                    <span className={index === 0 || index === 3 ? "text-white/45" : "text-black/35"}>{item.time}</span>
                  </div>
                  <div>
                    <p className={`text-[10px] uppercase tracking-[0.24em] ${index === 0 || index === 3 ? "text-white/45" : "text-black/35"}`}>
                      {item.titleEn}
                    </p>
                    <h3 className="mt-3 text-2xl font-medium leading-tight tracking-[-0.04em]">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="topics" className="w-full border-t border-black/10 px-5 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
        <div className="grid gap-8 xl:grid-cols-[0.75fr_1.25fr] xl:gap-12">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-black/40">Topics</p>
            <h2 className="mt-2 text-3xl font-medium tracking-[-0.04em] md:text-4xl">研究主題</h2>
          </div>

          <div className="border-t border-black/10">
            {topicRows.map((item, index) => (
              <article key={item.title} className="grid gap-3 border-b border-black/10 py-5 md:grid-cols-[90px_1fr_1fr] md:items-center">
                <span className="text-[10px] uppercase tracking-[0.24em] text-black/35">0{index + 1}</span>
                <h3 className="text-xl font-medium tracking-[-0.03em]">{item.title}</h3>
                <p className="text-sm text-black/45">{item.titleEn}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="archive" className="w-full border-t border-black/10 px-5 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
        <div className="mb-8 flex items-end justify-between gap-6 border-b border-black/10 pb-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-black/40">Archive</p>
            <h2 className="mt-2 text-3xl font-medium tracking-[-0.04em] md:text-4xl">策展方式</h2>
          </div>
          <p className="hidden text-sm text-black/45 md:block">Minimal curation</p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-[1.8rem] border border-black/10 bg-white/50 p-6">
            <p className="text-[10px] uppercase tracking-[0.24em] text-black/35">01</p>
            <p className="mt-4 text-xl font-medium leading-snug tracking-[-0.03em]">首頁只做入口，不做說明書。</p>
          </div>
          <div className="rounded-[1.8rem] border border-black/10 bg-[#111] p-6 text-white">
            <p className="text-[10px] uppercase tracking-[0.24em] text-white/42">02</p>
            <p className="mt-4 text-xl font-medium leading-snug tracking-[-0.03em]">中文為主，英文作為輔助標示。</p>
          </div>
          <div className="rounded-[1.8rem] border border-black/10 bg-white/50 p-6">
            <p className="text-[10px] uppercase tracking-[0.24em] text-black/35">03</p>
            <p className="mt-4 text-xl font-medium leading-snug tracking-[-0.03em]">留白、節奏、比例，比文字更重要。</p>
          </div>
        </div>
      </section>
    </main>
  );
}
