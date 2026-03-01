import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full flex-col font-sans">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 bg-gray-50 dark:bg-zinc-900">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-gray-900 dark:text-gray-100">
          好勢（hó-sè）<br className="md:hidden" />旺來（Ong-lâi）
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium mb-6">
          Integrating Psychology Into Everyday Life
        </p>
        <p className="max-w-2xl text-lg text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          這是一個致力於將心理學研究轉化為實際行動的平台，我們希望透過科學與溫度的結合，
          為現代社會的心理失衡尋找解方，建立一個具備專業、信任且能永續發展的社群。
        </p>
      </section>

      {/* Main Call to Action (3 Pillars) */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12">探索與行動</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <Link href="/videos" className="group flex flex-col items-center text-center p-8 rounded-2xl bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 shadow-sm hover:shadow-md transition-all">
            <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-6 text-2xl">
              ▶️
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">看研究影片</h3>
            <p className="text-gray-600 dark:text-gray-400">
              5 分鐘心理學研究轉譯，了解情緒、依附與創傷的科學知識。
            </p>
          </Link>

          <Link href="/projects" className="group flex flex-col items-center text-center p-8 rounded-2xl bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 shadow-sm hover:shadow-md transition-all">
            <div className="h-16 w-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6 text-2xl">
              💡
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-green-600 transition-colors">了解正在進行的企劃</h3>
            <p className="text-gray-600 dark:text-gray-400">
              關注社會問題，透過實際的心理學行動方案創造改變。
            </p>
          </Link>

          <Link href="/apply" className="group flex flex-col items-center text-center p-8 rounded-2xl bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 shadow-sm hover:shadow-md transition-all">
            <div className="h-16 w-16 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mb-6 text-2xl">
              🤝
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-purple-600 transition-colors">參與研究</h3>
            <p className="text-gray-600 dark:text-gray-400">
              加入我們的研究計畫，成為推動心理學知識進步的一份子。
            </p>
          </Link>

        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 px-6 bg-blue-50 dark:bg-zinc-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-blue-600 dark:text-blue-400 font-semibold tracking-wider uppercase text-sm">Latest Highlight</span>
          <h2 className="text-3xl font-bold mt-2 mb-6">最新研究成果與活動</h2>
          <div className="bg-white dark:bg-black rounded-2xl p-8 shadow-sm text-left">
            <h3 className="text-2xl font-bold mb-4">【本月特企】現代社會的依附焦慮與修復</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              透過最新的 5 分鐘短影音，我們深入探討了都會生活中的依附關係焦慮，並提供了 3 個具體可行的日常修復練習。目前此企劃的延伸研究也正在招募受試者。
            </p>
            <div className="flex gap-4">
              <Link href="/videos" className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black font-medium hover:opacity-80 transition-opacity">
                觀看影片
              </Link>
              <Link href="/apply" className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-gray-200 dark:border-gray-800 font-medium hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
                參與研究
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
