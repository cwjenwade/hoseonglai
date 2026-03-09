"use client";

type VideoItem = {
  title: string;
  artist: string;
  url: string;
  thumbnail: string;
  category: "K-POP" | "Mandopop" | "Pop";
  researchNote: string;
  hashtags: string[];
};

const videos: VideoItem[] = [
  {
    title: "Dynamite",
    artist: "BTS",
    url: "https://www.youtube.com/watch?v=gdZLi9oWNZg",
    thumbnail: "https://img.youtube.com/vi/gdZLi9oWNZg/maxresdefault.jpg",
    category: "K-POP",
    researchNote:
      "色彩飽和、鏡頭節奏快，主打正向與活力氛圍。適合參考在品牌短影音中使用高飽和色塊與群體舞動畫面，快速拉高情緒。",
    hashtags: ["#MV", "#KPOP", "#FeelGood", "#Colorful"],
  },
  {
    title: "告白氣球",
    artist: "周杰倫",
    url: "https://www.youtube.com/watch?v=bu7nU9Mhpyo",
    thumbnail: "https://img.youtube.com/vi/bu7nU9Mhpyo/maxresdefault.jpg",
    category: "Mandopop",
    researchNote:
      "敘事溫柔、畫面乾淨，運用場景與人物互動建立浪漫記憶點。可借鏡於品牌形象片中，強化日常情境與情感連結。",
    hashtags: ["#MV", "#Mandopop", "#Storytelling", "#WarmTone"],
  },
  {
    title: "Shape of You",
    artist: "Ed Sheeran",
    url: "https://www.youtube.com/watch?v=JGwWNGJdvx8",
    thumbnail: "https://img.youtube.com/vi/JGwWNGJdvx8/maxresdefault.jpg",
    category: "Pop",
    researchNote:
      "單一主線敘事搭配高辨識節奏，重複元素強化記憶。可應用在品牌內容節奏設計，讓重點訊息在 15 秒內被記住。",
    hashtags: ["#MV", "#Pop", "#Rhythm", "#Memorable"],
  },
  {
    title: "How You Like That",
    artist: "BLACKPINK",
    url: "https://www.youtube.com/watch?v=ioNng23DkIM",
    thumbnail: "https://img.youtube.com/vi/ioNng23DkIM/maxresdefault.jpg",
    category: "K-POP",
    researchNote:
      "視覺衝擊強、切景密度高，善用造型與場景反差創造話題。可參考其高對比視覺語言，提升活動主視覺吸睛度。",
    hashtags: ["#MV", "#KPOP", "#HighImpact", "#Visual"],
  },
];

export default function HeartfeltMomentumPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-zinc-900">有心好勢｜影片研究</h2>
        <p className="mt-4 leading-8 text-zinc-700">
          這頁精選了 4 支具代表性的 MV，透過影片鑑賞與分析，
          幫助團隊汲取視覺、節奏與敘事靈感，應用於品牌內容創意。
        </p>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h3 className="text-2xl font-bold text-zinc-900">MV 影片庫</h3>
        <p className="mt-2 text-zinc-600">點擊影片卡片直接前往 YouTube 觀看</p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {videos.map((video) => (
            <a
              key={video.url}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:border-amber-200 hover:shadow-lg"
            >
              <div className="relative h-48 w-full overflow-hidden bg-zinc-100">
                <img
                  src={video.thumbnail}
                  alt={`${video.title} by ${video.artist}`}
                  className="h-full w-full object-cover transition group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/30">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 opacity-0 transition group-hover:opacity-100">
                    <svg className="h-7 w-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-3 p-5">
                <div>
                  <h4 className="text-lg font-semibold text-zinc-900">{video.title}</h4>
                  <p className="text-sm text-zinc-600">
                    {video.artist} · <span className="font-medium text-amber-700">{video.category}</span>
                  </p>
                </div>

                <p className="text-sm leading-7 text-zinc-700">{video.researchNote}</p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {video.hashtags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-zinc-300 bg-zinc-50 px-2.5 py-1 text-xs text-zinc-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="inline-flex gap-2 pt-2">
                  <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
                    前往 YouTube
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
