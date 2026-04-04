import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "任祈蔚｜諮商心理師｜心理健康與團體諮商",
  description:
    "任祈蔚，諮商心理師，專長諮商心理治療、心理健康支持與團體諮商。認識服務內容、研究內容與團體方案。",
};

export default function Home() {
  const platformFeatures = [
    {
      href: "/research-in-5-minutes",
      title: "5分鐘研究",
      description: "學術研究成果之精簡轉譯與知識傳播路徑。",
    },
    {
      href: "/participant-recruitment",
      title: "受試者招募",
      description: "研究樣本庫建置與實證資料蒐集機制。",
    },
    {
      href: "/cultural-products",
      title: "文創商品",
      description: "文化概念物質化之載體開發與流通介面。",
    },
    {
      href: "/group-therapy",
      title: "團體心理治療",
      description: "心理治療專業知識與臨床資源之整合節點。",
    },
  ];

  const recentUpdates = [
    { id: 1, tag: "研究發布", title: "人際依附傾向與團體動力之交互作用測量" },
    { id: 2, tag: "受試招募", title: "伴侶關係衝突因應機制之縱貫性研究" },
    { id: 3, tag: "知識分享", title: "團體心理治療中凝聚力發展之階段性特徵" },
  ];

  return (
    <div className="min-h-screen bg-[#F8F8F8] px-6 py-16 font-sans text-zinc-900">
      <div className="mx-auto max-w-6xl space-y-24">
        
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center space-y-10 pt-16">
          <div className="inline-flex items-center rounded-full border border-[#D4B810] bg-white/60 px-5 py-2 backdrop-blur-sm">
            <span className="text-sm font-bold tracking-widest text-[#88854E]">
              好勢（Hó-sè）旺來（Ōng-lâi）
            </span>
          </div>
          <h1 className="max-w-5xl text-5xl font-extrabold tracking-tight text-[#DD821D] md:text-7xl leading-[1.15]">
            以心聚勢，以運旺來，團圓共好
          </h1>
          <p className="max-w-3xl text-xl leading-relaxed text-[#88854E]">
            本平台建構心理學研究與公眾社群之交會節點，整合五分鐘學術報告、受試者招募機制、文創載體及團體心理治療知識庫。藉由知識轉譯與公眾參與，建立具備人文向度之學術實踐場域。
          </p>
          <div className="flex flex-wrap justify-center gap-5 pt-6">
            <Link href="/join-research" className="rounded-[1.25rem] bg-[#DD821D] px-8 py-4 text-base font-semibold text-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
              加入研究
            </Link>
            <Link href="/group-therapy-info" className="rounded-[1.25rem] border border-[#E9BC60] bg-[#F2DB8D] px-8 py-4 text-base font-semibold text-[#DD821D] shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
              了解團體諮商
            </Link>
            <Link href="/watch-5mins" className="rounded-[1.25rem] border border-[#D4B810] bg-white px-8 py-4 text-base font-semibold text-[#88854E] shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
              觀看研究5mins
            </Link>
          </div>
        </section>

        {/* 平台功能區 */}
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {platformFeatures.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="group flex flex-col justify-between rounded-[2.5rem] border border-[#E9BC60] bg-[#F2DB8D] p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div>
                <h3 className="text-2xl font-bold text-[#DD821D]">{feature.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-[#88854E]">{feature.description}</p>
              </div>
              <div className="mt-10 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#D4B810] shadow-sm transition-transform group-hover:scale-110">
                →
              </div>
            </Link>
          ))}
        </section>

        {/* 最新研究 / 最新內容 */}
        <section className="rounded-[3rem] border border-[#D4B810] bg-white p-10 md:p-16 shadow-sm">
          <h2 className="text-3xl font-bold text-[#DD821D] mb-10">最新研究與內容</h2>
          <div className="divide-y divide-[#F0F0EF]">
            {recentUpdates.map((update) => (
              <div key={update.id} className="py-8 flex items-center justify-between group cursor-pointer">
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                  <span className="inline-flex w-max rounded-full bg-[#F2DB8D] px-4 py-1.5 text-sm font-bold text-[#88854E]">
                    {update.tag}
                  </span>
                  <p className="text-xl font-medium text-zinc-800 transition-colors group-hover:text-[#DD821D]">
                    {update.title}
                  </p>
                </div>
                <span className="hidden md:block text-[#D4B810] opacity-0 transition-opacity group-hover:opacity-100 font-semibold">
                  閱讀全文
                </span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}