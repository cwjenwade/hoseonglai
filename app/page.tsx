import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full flex-col font-sans">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 bg-brand-yellow-bg">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4 text-brand-red-shadow">
          好勢（hó-sè）<br className="md:hidden" />旺來（Ong-lâi）
        </h1>
        <p className="text-xl md:text-2xl text-brand-red-cherry font-bold mb-6">
          Integrating Psychology Into Everyday Life
        </p>
        <div className="max-w-2xl bg-brand-white/80 p-6 rounded-3xl shadow-sm border-2 border-brand-yellow-gold/50 backdrop-blur-sm">
          <p className="text-lg text-gray-800 font-medium leading-relaxed">
            這是一個致力於將心理學研究轉化為實際行動的平台，我們希望透過科學與溫度的結合，
            為現代社會的心理失衡尋找解方，建立一個具備專業、信任且能永續發展的社群。
          </p>
        </div>
      </section>

      {/* Main Call to Action (3 Pillars) */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-black text-center mb-12 text-brand-red-shadow">探索與行動</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <Link href="/videos" className="group flex flex-col items-center text-center p-8 rounded-3xl bg-brand-white border-4 border-brand-pink-soft shadow-[8px_8px_0px_0px_rgba(246,165,192,1)] hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(246,165,192,1)] transition-all">
            <div className="h-20 w-20 bg-brand-pink-rose text-brand-white rounded-full flex items-center justify-center mb-6 text-3xl shadow-inner">
              ▶️
            </div>
            <h3 className="text-2xl font-bold mb-3 text-brand-red-cherry group-hover:text-brand-pink-rose transition-colors">看研究影片</h3>
            <p className="text-gray-700 font-medium">
              5 分鐘心理學研究轉譯，了解情緒、依附與創傷的科學知識。
            </p>
          </Link>

          <Link href="/projects" className="group flex flex-col items-center text-center p-8 rounded-3xl bg-brand-white border-4 border-brand-mint shadow-[8px_8px_0px_0px_rgba(126,214,193,1)] hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(126,214,193,1)] transition-all">
            <div className="h-20 w-20 bg-brand-teal text-brand-white rounded-full flex items-center justify-center mb-6 text-3xl shadow-inner">
              💡
            </div>
            <h3 className="text-2xl font-bold mb-3 text-brand-teal group-hover:text-brand-mint transition-colors">了解正在進行的企劃</h3>
            <p className="text-gray-700 font-medium">
              關注社會問題，透過實際的心理學行動方案創造改變。
            </p>
          </Link>

          <Link href="/apply" className="group flex flex-col items-center text-center p-8 rounded-3xl bg-brand-white border-4 border-brand-orange-flesh shadow-[8px_8px_0px_0px_rgba(255,211,107,1)] hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(255,211,107,1)] transition-all">
            <div className="h-20 w-20 bg-brand-orange-peel text-brand-white rounded-full flex items-center justify-center mb-6 text-3xl shadow-inner">
              🤝
            </div>
            <h3 className="text-2xl font-bold mb-3 text-brand-orange-peel group-hover:text-brand-orange-flesh transition-colors">參與研究</h3>
            <p className="text-gray-700 font-medium">
              加入我們的研究計畫，成為推動心理學知識進步的一份子。
            </p>
          </Link>

        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 px-6 bg-brand-green-leaf/10 border-t-4 border-b-4 border-brand-green-leaf">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-brand-green-leaf text-brand-white font-bold tracking-wider uppercase text-sm px-4 py-1 rounded-full mb-4">Latest Highlight</span>
          <h2 className="text-4xl font-black mt-2 mb-8 text-brand-green-leaf">最新研究成果與活動</h2>

          <div className="bg-brand-white rounded-3xl p-10 shadow-[8px_8px_0px_0px_rgba(95,175,60,1)] border-4 border-brand-green-leaf text-left relative overflow-hidden">
            {/* Decorative element */}
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-brand-yellow-gold rounded-full opacity-20"></div>

            <h3 className="text-3xl font-bold mb-4 text-brand-red-cherry relative z-10">【本月特企】現代社會的依附焦慮與修復</h3>
            <p className="text-gray-700 text-lg mb-8 leading-relaxed font-medium relative z-10">
              透過最新的 5 分鐘短影音，我們深入探討了都會生活中的依附關係焦慮，並提供了 3 個具體可行的日常修復練習。目前此企劃的延伸研究也正在招募受試者。
            </p>

            <div className="flex flex-wrap gap-4 relative z-10">
              <Link href="/videos" className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-brand-red-cherry text-brand-white font-bold text-lg hover:bg-brand-red-shadow transition-colors shadow-md">
                觀看影片
              </Link>
              <Link href="/apply" className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-brand-white border-4 border-brand-orange-peel text-brand-orange-peel font-bold text-lg hover:bg-brand-orange-flesh hover:text-gray-900 transition-colors shadow-sm">
                參與研究
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
