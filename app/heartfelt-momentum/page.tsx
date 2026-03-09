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
    <main className="min-h-screen w-full bg-[#fcfbf8] text-[#141414] selection:bg-[#a63d24] selection:text-white">
      <section
        id="featured"
        className="w-full border-b border-black/8 px-6 py-10 md:px-10 md:py-14 xl:px-14 xl:py-16"
      >
        <div className="grid gap-10 xl:grid-cols-[1.45fr_0.55fr] xl:gap-12">
          <div className="overflow-hidden rounded-[2.25rem] border border-black/8 bg-[#121212] shadow-[0_24px_80px_rgba(0,0,0,0.08)]">
            <div className="aspect-[16/10] bg-[linear-gradient(135deg,#171717_0%,#101010_45%,#4b1914_100%)] p-6 md:p-7 xl:p-8">
              <div className="flex h-full flex-col justify-between rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-6 md:p-7 xl:p-8">
                <div className="flex items-start justify-between text-white/62">
                  <span className="text-[10px] uppercase tracking-[0.3em]">Featured</span>
                  <span className="text-sm tracking-[0.02em]">{featuredVideo.duration}</span>
                </div>

                <div className="max-w-5xl">
                  <button className="mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-white/14 bg-white/10 text-white transition duration-300 hover:scale-[1.03] hover:bg-white/15 md:h-20 md:w-20">
                    <span className="ml-1 text-2xl md:text-3xl">▶</span>
                  </button>

                  <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-white/42">
                    {featuredVideo.titleEn}
                  </p>
                  <h1 className="max-w-5xl text-[2.8rem] font-medium leading-[0.92] tracking-[-0.055em] text-white md:text-[4.6rem] xl:text-[6.2rem]">
                    {featuredVideo.title}
                  </h1>
                  <p className="mt-5 max-w-2xl text-[0.98rem] leading-8 text-white/78 md:text-[1.05rem]">
                    {featuredVideo.subtitle}
                  </p>
                </div>

                <div className="grid gap-2 md:grid-cols-3">
                  <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.045] px-4 py-4 md:px-5">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">Question</p>
                    <p className="mt-2 text-sm leading-6 text-white/88">{featuredVideo.question}</p>
                  </div>
                  <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.045] px-4 py-4 md:px-5">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">Key finding</p>
                    <p className="mt-2 text-sm leading-6 text-white/88">{featuredVideo.keyFinding}</p>
                  </div>
                  <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.045] px-4 py-4 md:px-5">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">Year</p>
                    <p className="mt-2 text-sm leading-6 text-white/88">{featuredVideo.year}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-8 xl:pl-2">
            <div className="border-b border-black/8 pb-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-black/36">Psychology in 5 Minutes</p>
              <p className="mt-5 text-[2.3rem] font-medium leading-[1.02] tracking-[-0.05em] text-black/95 md:text-[3.2rem] xl:text-[3.7rem]">
                五分鐘心理學研究影片
              </p>
            </div>

            <div className="grid gap-4 text-[0.98rem] text-black/78">
              <a
                href="#current"
                className="flex items-center justify-between border-b border-black/8 pb-4 transition duration-300 hover:opacity-55"
              >
                <span>影片</span>
                <span className="text-[0.72rem] uppercase tracking-[0.22em] text-black/34">Videos</span>
              </a>
              <a
                href="#topics"
                className="flex items-center justify-between border-b border-black/8 pb-4 transition duration-300 hover:opacity-55"
              >
                <span>主題</span>
                <span className="text-[0.72rem] uppercase tracking-[0.22em] text-black/34">Topics</span>
              </a>
              <a
                href="#archive"
                className="flex items-center justify-between border-b border-black/8 pb-4 transition duration-300 hover:opacity-55"
              >
                <span>策展</span>
                <span className="text-[0.72rem] uppercase tracking-[0.22em] text-black/34">Archive</span>
              </a>
            </div>

            <div className="rounded-[2rem] border border-black/8 bg-[#f7f5f1] p-7">
              <p className="text-[10px] uppercase tracking-[0.28em] text-black/35">Focus</p>
              <p className="mt-5 text-[1.3rem] font-medium leading-[1.45] tracking-[-0.03em] text-black/94">
                研究不是摘要，而是可以被觀看、被理解、被帶進日常的知識形式。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="current"
        className="w-full px-6 py-12 md:px-10 md:py-16 xl:px-14 xl:py-20"
      >
        <div className="mb-10 flex items-end justify-between gap-6 border-b border-black/8 pb-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-black/35">Videos</p>
            <h2 className="mt-3 text-[2.2rem] font-medium tracking-[-0.05em] text-black/95 md:text-[3.1rem]">
              十支影片
            </h2>
          </div>
          <p className="hidden text-[0.82rem] uppercase tracking-[0.22em] text-black/34 md:block">
            10 curated videos
          </p>
        </div>

        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
          {currentVideos.map((item, index) => (
            <article key={item.title} className="group">
              <div
                className={`aspect-[4/3] overflow-hidden rounded-[1.85rem] border border-black/8 transition duration-300 hover:-translate-y-[2px] ${
                  index === 0
                    ? "bg-[#131313] text-white shadow-[0_18px_50px_rgba(0,0,0,0.06)]"
                    : index === 3
                    ? "bg-[#a63d24] text-white shadow-[0_18px_50px_rgba(166,61,36,0.12)]"
                    : "bg-[#f7f5f1] text-[#171717] hover:bg-[#f4f2ed]"
                }`}
              >
                <div className="flex h-full flex-col justify-between p-6">
                  <div className="flex items-start justify-between text-[10px] uppercase tracking-[0.24em]">
                    <span className={index === 0 || index === 3 ? "text-white/42" : "text-black/32"}>
                      {item.tag}
                    </span>
                    <span className={index === 0 || index === 3 ? "text-white/42" : "text-black/32"}>
                      {item.time}
                    </span>
                  </div>
                  <div>
                    <p
                      className={`text-[10px] uppercase tracking-[0.24em] ${
                        index === 0 || index === 3 ? "text-white/42" : "text-black/32"
                      }`}
                    >
                      {item.titleEn}
                    </p>
                    <h3 className="mt-4 text-[1.7rem] font-medium leading-[1.08] tracking-[-0.045em]">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="topics"
        className="w-full border-t border-black/8 px-6 py-12 md:px-10 md:py-16 xl:px-14 xl:py-20"
      >
        <div className="grid gap-10 xl:grid-cols-[0.72fr_1.28fr] xl:gap-14">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-black/35">Topics</p>
            <h2 className="mt-3 text-[2.2rem] font-medium tracking-[-0.05em] text-black/95 md:text-[3.1rem]">
              研究主題
            </h2>
          </div>

          <div className="border-t border-black/8">
            {topicRows.map((item, index) => (
              <article
                key={item.title}
                className="grid gap-3 border-b border-black/8 py-6 md:grid-cols-[90px_1fr_1fr] md:items-center"
              >
                <span className="text-[10px] uppercase tracking-[0.24em] text-black/30">0{index + 1}</span>
                <h3 className="text-[1.45rem] font-medium tracking-[-0.035em] text-black/94">
                  {item.title}
                </h3>
                <p className="text-[0.95rem] text-black/42">{item.titleEn}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="archive"
        className="w-full border-t border-black/8 px-6 py-12 md:px-10 md:py-16 xl:px-14 xl:py-20"
      >
        <div className="mb-10 flex items-end justify-between gap-6 border-b border-black/8 pb-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-black/35">Archive</p>
            <h2 className="mt-3 text-[2.2rem] font-medium tracking-[-0.05em] text-black/95 md:text-[3.1rem]">
              策展方式
            </h2>
          </div>
          <p className="hidden text-[0.82rem] uppercase tracking-[0.22em] text-black/34 md:block">
            Minimal curation
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[2rem] border border-black/8 bg-[#f7f5f1] p-7">
            <p className="text-[10px] uppercase tracking-[0.24em] text-black/32">01</p>
            <p className="mt-5 text-[1.35rem] font-medium leading-[1.42] tracking-[-0.03em] text-black/94">
              首頁只做入口，不做說明書。
            </p>
          </div>
          <div className="rounded-[2rem] border border-black/8 bg-[#131313] p-7 text-white shadow-[0_18px_50px_rgba(0,0,0,0.05)]">
            <p className="text-[10px] uppercase tracking-[0.24em] text-white/38">02</p>
            <p className="mt-5 text-[1.35rem] font-medium leading-[1.42] tracking-[-0.03em] text-white/96">
              中文為主，英文只作輔助標示。
            </p>
          </div>
          <div className="rounded-[2rem] border border-black/8 bg-[#f7f5f1] p-7">
            <p className="text-[10px] uppercase tracking-[0.24em] text-black/32">03</p>
            <p className="mt-5 text-[1.35rem] font-medium leading-[1.42] tracking-[-0.03em] text-black/94">
              留白、節奏、比例，比文字更重要。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
