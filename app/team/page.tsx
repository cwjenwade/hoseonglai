export default function Team() {
  return (
    <div className="max-w-6xl mx-auto py-16 px-6 w-full">
      <div className="mb-20 text-center">
        <h1 className="text-4xl font-bold mb-4">團隊介紹 Team</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">專業背景 × 實務經驗</p>
      </div>

      {/* Host PI Section */}
      <section className="mb-24">
        <h2 className="text-3xl font-bold mb-12 text-center border-b-2 border-blue-600 dark:border-blue-400 inline-block pb-2 px-8">計畫主持人 (Host PI)</h2>

        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-zinc-800 flex flex-col md:flex-row gap-12 items-start">
          {/* Avatar Placeholder */}
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl bg-gray-200 dark:bg-zinc-800 flex-shrink-0 flex items-center justify-center overflow-hidden border-4 border-white dark:border-zinc-900 shadow-lg mx-auto md:mx-0">
            <svg className="w-24 h-24 text-gray-400 dark:text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>

          <div className="flex-1 space-y-6">
            <div>
              <h3 className="text-3xl font-bold mb-2">Dr. 團隊代表</h3>
              <p className="text-blue-600 dark:text-blue-400 font-semibold text-lg">臨床心理師 / 助理教授</p>
            </div>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              專注於人際依附、情緒調節與創傷後成長（PTG）研究。致力於將嚴謹的學術研究轉譯為大眾可吸收、可實踐的生活指南。深信「看見」即是療癒的開端，而「行動」則是改變的關鍵。
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-gray-100 dark:border-zinc-800">
              <div>
                <h4 className="font-bold flex items-center mb-3 text-gray-900 dark:text-gray-100">
                  <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-2 text-sm">🎓</span>
                  學歷與資格
                </h4>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                  <li>國內外頂尖大學心理學博士</li>
                  <li>國家高考及格臨床心理師</li>
                  <li>資深心理諮商督導</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold flex items-center mb-3 text-gray-900 dark:text-gray-100">
                  <span className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mr-2 text-sm">🔬</span>
                  研究領域
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-md text-sm">成人依附理論</span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-md text-sm">情緒取向治療(EFT)</span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-md text-sm">正念認知療法</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Team Section */}
      <section className="mb-24">
        <h2 className="text-3xl font-bold mb-12 text-center border-b-2 border-green-600 dark:border-green-400 inline-block pb-2 px-8">核心團隊 (Core Team)</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Member 1 */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-zinc-800 flex items-center justify-center overflow-hidden mb-6 mx-auto">
              <svg className="w-12 h-12 text-gray-400 dark:text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-center mb-1">研究員 A</h3>
            <p className="text-green-600 dark:text-green-400 text-center text-sm font-semibold mb-4">專案經理 / 數據分析</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 text-center leading-relaxed">
              負責研究專案的設計與推動，擅長量化數據分析與量表發展，確保研究的科學嚴謹性。
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="px-2 py-1 bg-gray-50 dark:bg-black text-gray-600 dark:text-gray-400 rounded text-xs border border-gray-200 dark:border-zinc-700">SPSS/R分析</span>
              <span className="px-2 py-1 bg-gray-50 dark:bg-black text-gray-600 dark:text-gray-400 rounded text-xs border border-gray-200 dark:border-zinc-700">問卷設計</span>
            </div>
          </div>

          {/* Member 2 */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-zinc-800 flex items-center justify-center overflow-hidden mb-6 mx-auto">
              <svg className="w-12 h-12 text-gray-400 dark:text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-center mb-1">企劃員 B</h3>
            <p className="text-purple-600 dark:text-purple-400 text-center text-sm font-semibold mb-4">內容轉譯 / 社群經營</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 text-center leading-relaxed">
              將複雜的心理學文獻轉化為易懂的 5 分鐘短影音與圖文，負責平台內容策略與社群互動。
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="px-2 py-1 bg-gray-50 dark:bg-black text-gray-600 dark:text-gray-400 rounded text-xs border border-gray-200 dark:border-zinc-700">科學傳播</span>
              <span className="px-2 py-1 bg-gray-50 dark:bg-black text-gray-600 dark:text-gray-400 rounded text-xs border border-gray-200 dark:border-zinc-700">影音企劃</span>
            </div>
          </div>

          {/* Member 3 */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-zinc-800 flex items-center justify-center overflow-hidden mb-6 mx-auto">
              <svg className="w-12 h-12 text-gray-400 dark:text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-center mb-1">心理師 C</h3>
            <p className="text-orange-600 dark:text-orange-400 text-center text-sm font-semibold mb-4">實務介入 / 團體帶領</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 text-center leading-relaxed">
              負責設計並執行研究中的實務介入方案，提供參與者專業的回饋與支持系統。
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="px-2 py-1 bg-gray-50 dark:bg-black text-gray-600 dark:text-gray-400 rounded text-xs border border-gray-200 dark:border-zinc-700">團體動力</span>
              <span className="px-2 py-1 bg-gray-50 dark:bg-black text-gray-600 dark:text-gray-400 rounded text-xs border border-gray-200 dark:border-zinc-700">危機處理</span>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="bg-gray-50 dark:bg-zinc-900/50 rounded-3xl p-12 text-center border border-gray-200 dark:border-zinc-800">
        <h2 className="text-2xl font-bold mb-8">合作與贊助單位</h2>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 hover:opacity-100 transition-opacity">
          {/* Partner Logos Placeholders */}
          <div className="font-bold text-xl tracking-wider text-gray-500 flex items-center gap-2">
            <span className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-lg"></span> 某某大學心理系
          </div>
          <div className="font-bold text-xl tracking-wider text-gray-500 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full border-4 border-gray-300 dark:border-gray-700"></span> 某某心理治療所
          </div>
          <div className="font-bold text-xl tracking-wider text-gray-500 flex items-center gap-2">
            <span className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rotate-45"></span> 某某研究基金會
          </div>
        </div>
      </section>

    </div>
  );
}
