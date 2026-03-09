import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "團團圓圓",
};

export default function TogethernessPage() {
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-100 via-orange-50 to-white p-10 shadow-sm">
        <p className="text-sm font-semibold tracking-[0.2em] text-amber-700">TOGETHERNESS</p>
        <h2 className="mt-3 text-4xl font-extrabold leading-tight text-zinc-900 md:text-5xl">團團圓圓</h2>
        <p className="mt-4 max-w-3xl text-lg leading-9 text-zinc-700">
          這裡以「海報式」呈現團體服務資訊，主軸聚焦在團體諮商與團體心理治療，
          讓來訪者一眼就能看懂：這是什麼、適合誰、可以帶走什麼改變。
        </p>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white p-10 shadow-sm">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="text-sm font-semibold tracking-wider text-sky-700">POSTER A</p>
            <h3 className="mt-2 text-3xl font-bold text-zinc-900">團體諮商 Group Counseling</h3>
            <p className="mt-4 text-base leading-8 text-zinc-700">
              在安全且保密的團體中，透過彼此傾聽、支持與回饋，探索壓力、人際、情緒與自我認同議題。
              成員會發現自己並不孤單，也能從他人經驗中看見新的調整方向。
            </p>
          </div>

          <div className="rounded-2xl border border-sky-200 bg-sky-50 p-6">
            <p className="text-sm font-semibold text-sky-800">適合對象</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-700">
              <li>長期感到焦慮、低落或壓力過載</li>
              <li>人際關係反覆卡住，想練習更健康互動</li>
              <li>想提升自我理解與情緒調節能力</li>
            </ul>
            <p className="mt-5 text-sm font-semibold text-sky-800">團體形式</p>
            <p className="mt-2 text-sm leading-7 text-zinc-700">每期 8 週，每週 1 次，每次 90 分鐘，6-10 人小團體。</p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white p-10 shadow-sm">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="text-sm font-semibold tracking-wider text-emerald-700">POSTER B</p>
            <h3 className="mt-2 text-3xl font-bold text-zinc-900">團體心理治療 Group Psychotherapy</h3>
            <p className="mt-4 text-base leading-8 text-zinc-700">
              由專業心理師帶領，針對較深層的情緒創傷、依附模式與關係重複困境進行修復。
              在治療性團體歷程中，協助成員辨識內在模式、建立新經驗，逐步恢復心理韌性。
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
            <p className="text-sm font-semibold text-emerald-800">治療重點</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-700">
              <li>情緒覺察與創傷經驗的安全整理</li>
              <li>改善關係中的防衛與反覆衝突模式</li>
              <li>重建自我價值感與信任連結能力</li>
            </ul>
            <p className="mt-5 text-sm font-semibold text-emerald-800">專業配置</p>
            <p className="mt-2 text-sm leading-7 text-zinc-700">雙帶領心理師／嚴謹評估與篩選／全程保密與倫理守則。</p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-amber-200 bg-amber-50 p-8 shadow-sm">
        <h4 className="text-2xl font-bold text-zinc-900">報名與諮詢</h4>
        <p className="mt-3 leading-8 text-zinc-700">
          若你想了解哪一種團體更適合自己，建議先進行 1 對 1 前測晤談，再安排進入合適團體。
          我們會依據你的目標、困擾類型與目前狀態，提供最適切的團體建議。
        </p>
        <a
          href="https://forms.gle/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex rounded-full bg-amber-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-amber-700"
        >
          立即填寫諮詢表單
        </a>
      </section>
    </div>
  );
}
