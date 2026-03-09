import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "品牌理念",
};

export default function BrandPhilosophyPage() {
  const teamMembers = [
    {
      name: "Ava Lin",
      role: "Brand Director",
      bio: "負責品牌願景與長期策略，確保每次溝通都能傳達一致且溫暖的品牌精神。",
      avatarClass: "bg-rose-100 text-rose-700",
      initials: "AL",
    },
    {
      name: "Noah Chen",
      role: "Creative Lead",
      bio: "整合視覺與內容創意，將抽象理念轉化為可感知、可記憶的品牌體驗。",
      avatarClass: "bg-amber-100 text-amber-700",
      initials: "NC",
    },
    {
      name: "Mia Hsu",
      role: "Customer Experience",
      bio: "聚焦顧客旅程設計，透過細節優化提升互動品質與服務滿意度。",
      avatarClass: "bg-emerald-100 text-emerald-700",
      initials: "MH",
    },
    {
      name: "Ethan Wu",
      role: "Partnership Manager",
      bio: "建立跨域合作與資源串聯，擴大品牌影響力並創造共贏機會。",
      avatarClass: "bg-sky-100 text-sky-700",
      initials: "EW",
    },
    {
      name: "Luna Kao",
      role: "Community Builder",
      bio: "經營品牌社群與活動連結，讓使用者在參與中感受到團圓與歸屬。",
      avatarClass: "bg-violet-100 text-violet-700",
      initials: "LK",
    },
    {
      name: "Ryan Tsai",
      role: "Operations Lead",
      bio: "以系統化流程支持團隊執行，讓每項品牌承諾都能穩定落地。",
      avatarClass: "bg-orange-100 text-orange-700",
      initials: "RT",
    },
    {
      name: "Ivy Huang",
      role: "Data Analyst",
      bio: "透過數據洞察驗證策略成效，協助品牌在變化中持續優化與成長。",
      avatarClass: "bg-teal-100 text-teal-700",
      initials: "IH",
    },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-zinc-900">品牌理念</h2>
        <p className="mt-4 leading-8 text-zinc-700">
          我們相信品牌不只是商品，更是一種與人同行的價值。以誠意為本、品質為核、共好為願，
          在每一次互動中建立信任，讓品牌成為日常中的溫暖力量。
        </p>
        <p className="mt-4 leading-8 text-zinc-700">
          透過持續創新與文化傳承，將「有心好勢、有運旺來」落實在服務與體驗，創造長遠且可持續的影響。
        </p>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h3 className="text-2xl font-bold text-zinc-900">Team Members</h3>
        <p className="mt-2 text-zinc-600">核心成員共 7 位，分別負責策略、創意、體驗與營運。</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {teamMembers.map((member) => (
            <article key={member.name} className="rounded-2xl border border-zinc-200 p-4">
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-bold ${member.avatarClass}`}
                  aria-hidden
                >
                  {member.initials}
                </div>
                <div>
                  <h4 className="text-base font-semibold text-zinc-900">{member.name}</h4>
                  <p className="text-sm text-amber-700">{member.role}</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-7 text-zinc-600">{member.bio}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
