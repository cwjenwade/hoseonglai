export default function Philosophy() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold mb-12 text-center">好勢（hó-sè）旺來（Ong-lâi）理念</h1>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">為什麼是「好勢旺來」？</h2>
        <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
          <p>
            「好勢」（hó-sè）在台語中意指事情順利、妥當、準備就緒的狀態。
            「旺來」（Ong-lâi）則是鳳梨的諧音，象徵好運與繁榮。
          </p>
          <p>
            在現代社會快節奏、高壓力的環境下，我們觀察到許多人面臨著「社會心理失衡」的現象。
            從人際疏離、依附焦慮到情緒耗竭，這些問題逐漸侵蝕我們的日常生活。
            我們相信，透過將心理學知識整合入日常，幫助每個人找回內心的「好勢」，
            外在的生活自然也能迎來「旺來」的順遂與豐盛。
          </p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8 text-center text-blue-600 dark:text-blue-400">五種心的整合架構</h2>
        <div className="flex flex-col items-center">
          <p className="text-center text-gray-700 dark:text-gray-300 mb-8 max-w-2xl">
            我們提出「五種心」的整合架構，作為恢復心理平衡的基石。這五個面向環環相扣，缺一不可。
          </p>

          {/* Visual Pentagram Placeholder */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 my-8">
            <svg viewBox="0 0 100 100" className="w-full h-full text-blue-500 drop-shadow-md">
              <polygon
                points="50,5 95,40 78,95 22,95 5,40"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="opacity-50"
              />
              <polygon
                points="50,5 78,95 5,40 95,40 22,95"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="opacity-30"
              />

              <circle cx="50" cy="5" r="4" fill="currentColor" />
              <text x="50" y="-2" fontSize="6" textAnchor="middle" fill="currentColor" className="font-bold">覺察心</text>

              <circle cx="95" cy="40" r="4" fill="currentColor" />
              <text x="105" y="42" fontSize="6" textAnchor="start" fill="currentColor" className="font-bold">同理心</text>

              <circle cx="78" cy="95" r="4" fill="currentColor" />
              <text x="80" y="103" fontSize="6" textAnchor="start" fill="currentColor" className="font-bold">復原心</text>

              <circle cx="22" cy="95" r="4" fill="currentColor" />
              <text x="20" y="103" fontSize="6" textAnchor="end" fill="currentColor" className="font-bold">連結心</text>

              <circle cx="5" cy="40" r="4" fill="currentColor" />
              <text x="-5" y="42" fontSize="6" textAnchor="end" fill="currentColor" className="font-bold">行動心</text>
            </svg>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">理論基礎</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-50 dark:bg-zinc-900 rounded-xl">
            <h3 className="font-bold text-lg mb-2">心理學依據</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              奠基於認知行為治療(CBT)、依附理論與正向心理學，提供有科學實證支持的觀點與策略。
            </p>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-zinc-900 rounded-xl">
            <h3 className="font-bold text-lg mb-2">諮商實務經驗</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              結合多年臨床與諮商實務觀察，將生硬的理論轉化為符合台灣在地文化脈絡的實用建議。
            </p>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-zinc-900 rounded-xl">
            <h3 className="font-bold text-lg mb-2">研究背景</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              持續進行本土心理健康研究，確保我們的內容與企劃與時俱進，真實回應社會需求。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
