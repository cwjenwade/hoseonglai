export default function PsychologyArtworkPage() {
  const featuredVideo = {
    title: "Why Images Stay in the Mind",
    subtitle: "心理學研究，不必長得像論文資料庫。它也可以像一件作品。",
    category: "Psychology Film Essay",
    duration: "08 min",
    year: "2026",
    description:
      "這個頁面將心理學研究解說轉成近似展覽現場的閱讀經驗。主視覺不模仿 YouTube，也不模仿一般教育平台，而是讓影像、文字、節奏與留白共同構成一種觀看狀態。",
    concepts: ["attention", "emotion", "memory", "perception"],
    chapters: [
      { time: "00:45", label: "Visual hook", note: "畫面先抓住注意力，知識才有機會被接住。" },
      { time: "02:10", label: "Emotional cue", note: "情緒不是裝飾。情緒決定資訊是否被留下。" },
      { time: "04:35", label: "Cognitive shift", note: "一個概念被理解，不是因為被定義，而是因為被看見。" },
      { time: "06:50", label: "Takeaway", note: "科普不是簡化知識，而是重新設計知識的抵達方式。" },
    ],
  };

  const relatedWorks = [
    {
      title: "Why Repetition Feels Good",
      tag: "Affect",
      blurb: "重複如何降低不確定感，並提高偏好。",
    },
    {
      title: "The Color of Arousal",
      tag: "Perception",
      blurb: "色彩、對比與心理喚起之間的關係。",
    },
    {
      title: "When a Face Becomes Meaning",
      tag: "Social Cognition",
      blurb: "表情辨識如何迅速轉成社會判斷。",
    },
  ];

  const notes = [
    "這不是線上課程頁面。",
    "這不是資料庫首頁。",
    "這是一個把心理學研究轉成可觀看形式的藝術化介面。",
  ];

  return (
    <main className="min-h-screen bg-[#f5f1ea] text-[#161616] selection:bg-[#d94f2b] selection:text-white overflow-hidden">
      <div className="relative">
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
          <div className="absolute left-[-8rem] top-[-6rem] h-[28rem] w-[28rem] rounded-full bg-[#c84d2f] blur-3xl" />
          <div className="absolute right-[-10rem] top-[10rem] h-[30rem] w-[30rem] rounded-full bg-[#7f221f] blur-3xl" />
          <div className="absolute bottom-[-8rem] left-[20%] h-[26rem] w-[26rem] rounded-full bg-[#e7b59a] blur-3xl" />
        </div>

        <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-between px-6 pb-8 pt-6 md:px-10 lg:px-14">
          <header className="flex items-center justify-between border-b border-black/10 pb-5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.32em] text-black/45">Ho-Se Ong-Lai</p>
              <h1 className="mt-2 text-lg font-medium tracking-tight md:text-xl">Psychology as Artwork</h1>
            </div>
            <nav className="hidden items-center gap-8 text-sm text-black/55 md:flex">
              <a href="#film" className="transition hover:text-black">Film</a>
              <a href="#concepts" className="transition hover:text-black">Concepts</a>
              <a href="#chapters" className="transition hover:text-black">Chapters</a>
              <a href="#archive" className="transition hover:text-black">Archive</a>
            </nav>
          </header>

          <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-16">
            <div className="max-w-3xl">
              <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-black/45">
                {featuredVideo.category} / {featuredVideo.year}
              </p>

              <h2 className="max-w-4xl text-5xl font-semibold leading-[0.92] tracking-[-0.05em] md:text-7xl lg:text-[7.5rem]">
                {featuredVideo.title}
              </h2>

              <p className="mt-6 max-w-xl text-base leading-8 text-black/68 md:text-lg">
                {featuredVideo.subtitle}
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <button className="group rounded-full bg-[#181818] px-6 py-3 text-sm text-white transition hover:scale-[1.02] hover:bg-[#000]">
                  <span className="inline-flex items-center gap-2">
                    Watch the essay
                    <span className="transition group-hover:translate-x-0.5">↗</span>
                  </span>
                </button>
                <button className="rounded-full border border-black/15 bg-white/60 px-6 py-3 text-sm text-black backdrop-blur transition hover:border-black/30 hover:bg-white">
                  Read research notes
                </button>
              </div>

              <div className="mt-14 grid gap-4 sm:grid-cols-3">
                <div className="border-t border-black/15 pt-4">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-black/45">Format</p>
                  <p className="mt-2 text-sm text-black/80">Film essay page</p>
                </div>
                <div className="border-t border-black/15 pt-4">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-black/45">Reading time</p>
                  <p className="mt-2 text-sm text-black/80">{featuredVideo.duration}</p>
                </div>
                <div className="border-t border-black/15 pt-4">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-black/45">Mood</p>
                  <p className="mt-2 text-sm text-black/80">Quiet, sharp, cinematic</p>
                </div>
              </div>
            </div>

            <div id="film" className="relative">
              <div className="absolute -inset-6 rounded-[2rem] bg-white/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-[#111] shadow-[0_30px_100px_rgba(0,0,0,0.18)]">
                <div className="aspect-[4/5] w-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_30%),linear-gradient(135deg,#1a1a1a_0%,#0a0a0a_45%,#451a17_100%)] p-5 sm:p-6">
                  <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                    <div className="flex items-start justify-between text-white/70">
                      <span className="text-xs uppercase tracking-[0.28em]">Featured film</span>
                      <span className="text-xs">{featuredVideo.duration}</span>
                    </div>

                    <div>
                      <div className="mb-6 flex items-center justify-center">
                        <button className="group flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:scale-105 hover:bg-white/15">
                          <span className="ml-1 text-3xl">▶</span>
                        </button>
                      </div>

                      <h3 className="max-w-sm text-3xl font-medium leading-tight tracking-[-0.04em] text-white md:text-4xl">
                        A cinematic page for psychology communication.
                      </h3>

                      <p className="mt-4 max-w-md text-sm leading-7 text-white/68">
                        影像不只是載體。影像本身就是理解的一部分。這個介面把知識頁面改造成像展覽作品一樣的觀看經驗。
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {featuredVideo.concepts.map((concept) => (
                        <span
                          key={concept}
                          className="rounded-full border border-white/15 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-white/75"
                        >
                          {concept}
                        </span>
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
            <p className="text-[11px] uppercase tracking-[0.32em] text-black/45">Concept frame</p>
            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
              Less interface. More atmosphere.
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <article className="group rounded-[2rem] border border-black/10 bg-white/70 p-6 backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              <p className="text-[11px] uppercase tracking-[0.28em] text-black/40">01</p>
              <h4 className="mt-4 text-2xl font-medium tracking-[-0.03em]">Editorial rhythm</h4>
              <p className="mt-4 text-sm leading-7 text-black/65">
                不是把資訊塞滿，而是讓文字與影像像雜誌編排一樣有節奏。頁面先讓人停下來，再讓人閱讀。
              </p>
            </article>

            <article className="group rounded-[2rem] border border-black/10 bg-[#1c1c1c] p-6 text-white transition hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/40">02</p>
              <h4 className="mt-4 text-2xl font-medium tracking-[-0.03em]">Cinematic contrast</h4>
              <p className="mt-4 text-sm leading-7 text-white/68">
                淺色底與深色影像區形成反差。內容不是平鋪，而是像舞台與幕布之間的切換。
              </p>
            </article>

            <article className="group rounded-[2rem] border border-black/10 bg-[#d94f2b] p-6 text-white transition hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(217,79,43,0.28)] sm:col-span-2">
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/55">03</p>
              <h4 className="mt-4 text-2xl font-medium tracking-[-0.03em] md:text-3xl">Psychology content can feel like an art piece.</h4>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80">
                真正有記憶點的知識型網站，不是因為加了很多功能，而是因為它有自己的氣味、節奏與畫面語言。這個版本就是把心理學科普做成一種作品式體驗。
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="chapters" className="mx-auto max-w-7xl px-6 py-8 md:px-10 lg:px-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="rounded-[2rem] border border-black/10 bg-white/60 p-6 backdrop-blur md:p-8">
            <p className="text-[11px] uppercase tracking-[0.32em] text-black/45">Chapter notes</p>
            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
              Structured like a film.
            </h3>
            <p className="mt-5 max-w-lg text-sm leading-7 text-black/65">
              不是傳統課程章節，也不是部落格段落。每一段都像鏡頭切換，讓研究重點依序出現。
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
                Which part of the image reached you first?
              </h3>
              <p className="mt-5 max-w-lg text-sm leading-7 text-white/68">
                互動不一定要像測驗。它也可以只是讓觀看者停下來，感覺自己到底先被什麼吸住。
              </p>
            </div>

            <div className="grid gap-3 self-end">
              {[
                "Color and contrast",
                "Human faces",
                "Movement and rhythm",
                "Narrative atmosphere",
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
            <p className="text-[11px] uppercase tracking-[0.32em] text-black/45">Archive</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">More works</h3>
          </div>
          <a href="#" className="hidden text-sm text-black/55 transition hover:text-black md:block">
            View all essays
          </a>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {relatedWorks.map((work, index) => (
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
              <div className="mt-8 inline-flex items-center gap-2 text-sm text-black/70 transition group-hover:gap-3 group-hover:text-black">
                Open piece <span>↗</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
