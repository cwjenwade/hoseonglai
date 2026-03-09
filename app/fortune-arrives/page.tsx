import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "有運旺來",
};

type Lecture = {
  id: string;
  title: string;
  speaker: string;
  time: string;
  intro: string;
  highlights: string[];
  registerUrl: string;
};

const lectures: Lecture[] = [
  {
    id: "lecture-1",
    title: "把好運變成可複製的習慣",
    speaker: "講者：陳思穎",
    time: "2026/04/20 19:30 - 21:00",
    intro:
      "從日常節奏、決策框架到人際連結，拆解看似偶然的好運如何被設計與累積，適合想突破現況的工作者與創作者。",
    highlights: ["運勢心法 3 步驟", "建立高機會日常", "可執行的每週練習"],
    registerUrl: "https://forms.gle/",
  },
  {
    id: "lecture-2",
    title: "機會來臨前，你要先準備什麼？",
    speaker: "講者：林皓宇",
    time: "2026/04/27 19:30 - 21:00",
    intro:
      "分享職涯與創業中的真實案例，說明如何在機會出現前就完成準備，降低焦慮、提高把握機率。",
    highlights: ["機會辨識模型", "資源盤點清單", "提案與自我介紹模板"],
    registerUrl: "https://forms.gle/",
  },
  {
    id: "lecture-3",
    title: "團隊旺來：共好協作的實戰做法",
    speaker: "講者：黃語彤",
    time: "2026/05/04 19:30 - 21:00",
    intro:
      "以團隊協作為核心，帶你建立能互相拉抬的合作文化，從溝通機制到復盤流程一次整理。",
    highlights: ["高效會議設計", "衝突轉化技巧", "合作成果追蹤方法"],
    registerUrl: "https://forms.gle/",
  },
  {
    id: "lecture-4",
    title: "品牌能量場：讓人記住你的價值",
    speaker: "講者：王靖雯",
    time: "2026/05/11 19:30 - 21:00",
    intro:
      "從品牌敘事與受眾心理出發，建立一致且有溫度的品牌語言，讓你的好內容被看見、被記得。",
    highlights: ["品牌故事骨架", "內容節奏規劃", "社群互動關鍵句型"],
    registerUrl: "https://forms.gle/",
  },
];

export default function FortuneArrivesPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-zinc-900">有運旺來｜講座卡片</h2>
        <p className="mt-4 leading-8 text-zinc-700">
          以下為講座卡片，點開卡片會彈出視窗查看講座簡介與重點，並可直接報名。
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {lectures.map((lecture) => (
          <div key={lecture.id}>
            <input id={lecture.id} type="checkbox" className="peer sr-only" />

            <label
              htmlFor={lecture.id}
              className="block cursor-pointer rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-md"
            >
              <p className="text-xs font-semibold tracking-wide text-amber-700">LECTURE CARD</p>
              <h3 className="mt-2 text-xl font-semibold text-zinc-900">{lecture.title}</h3>
              <p className="mt-1 text-sm text-zinc-500">{lecture.speaker}</p>
              <p className="mt-1 text-sm text-zinc-500">{lecture.time}</p>
              <p className="mt-3 text-sm text-zinc-600">點擊查看講座簡介與報名資訊</p>
            </label>

            <div className="fixed inset-0 z-50 hidden items-center justify-center bg-black/50 p-4 peer-checked:flex">
              <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-amber-700">講座簡介</p>
                    <h4 className="mt-1 text-2xl font-bold text-zinc-900">{lecture.title}</h4>
                    <p className="mt-1 text-sm text-zinc-500">{lecture.speaker}</p>
                    <p className="text-sm text-zinc-500">{lecture.time}</p>
                  </div>
                  <label
                    htmlFor={lecture.id}
                    className="cursor-pointer rounded-full border border-zinc-300 px-3 py-1 text-sm text-zinc-600 hover:bg-zinc-100"
                  >
                    關閉
                  </label>
                </div>

                <p className="mt-4 leading-7 text-zinc-700">{lecture.intro}</p>

                <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-zinc-700">
                  {lecture.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center gap-3">
                  <a
                    href={lecture.registerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
                  >
                    立即報名
                  </a>
                  <label
                    htmlFor={lecture.id}
                    className="cursor-pointer rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
                  >
                    稍後再看
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
