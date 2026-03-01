import Link from 'next/link';

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6 w-full prose prose-blue dark:prose-invert">
      <div className="text-center mb-16 not-prose">
        <h1 className="text-4xl font-bold mb-4">隱私權與研究倫理政策</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">風險控管 × 權益保障</p>
        <p className="text-sm text-gray-500 mt-4">最後更新日期：{new Date().toISOString().split('T')[0]}</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-zinc-800">
        <p className="lead text-lg mb-8 font-medium">
          「好勢（hó-sè）旺來（Ong-lâi）」深知您的隱私與心理數據極為敏感且重要。我們致力於遵守最高標準的研究倫理與資料保護法規，確保您在參與我們平台活動或研究計畫時的安全與權益。
        </p>

        <hr className="my-8 border-gray-200 dark:border-zinc-700" />

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6 flex items-center">
            <span className="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">1</span>
            個人資料蒐集與使用方式
          </h2>
          <p>我們蒐集的資料可能包含：</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>基本識別資料：</strong>姓名、年齡、聯絡信箱（僅用於身分確認、發送重要通知或研究相關聯繫）。</li>
            <li><strong>研究數據：</strong>您填寫的心理問卷結果、參與活動的回饋與訪談記錄。</li>
          </ul>
          <p className="mt-4">
            我們承諾，所有收集到的數據僅供<strong>內部學術分析</strong>及<strong>優化服務內容</strong>之用。我們<strong>絕對不會</strong>將您的個人資料出售或提供給第三方用於商業行銷用途。
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6 flex items-center">
            <span className="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">2</span>
            匿名化處理與資料保存
          </h2>
          <p>
            為了保障您的隱私：
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>嚴格匿名化：</strong>在進行數據分析及結果發表（如學術論文、平台報告）前，所有可識別您個人身分的資訊（如姓名、Email）皆會被移除或轉換為隨機編碼。</li>
            <li><strong>保存期限：</strong>電子資料將加密儲存於安全的伺服器中。研究資料之保存期限依據各研究計畫的 IRB 規定辦理（通常為結案後 3 至 5 年），期限屆滿後將進行不可逆之銷毀。</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6 flex items-center">
            <span className="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">3</span>
            研究倫理審查 (IRB) 狀態
          </h2>
          <div className="bg-blue-50 dark:bg-zinc-800/50 p-6 rounded-2xl border border-blue-100 dark:border-zinc-700">
            <p className="m-0 text-gray-800 dark:text-gray-200">
              本平台發起之各項正式研究計畫，皆會依法規送交<strong>獨立的機構研究倫理審查委員會（IRB）</strong>進行審查並取得核准。各項計畫的具體 IRB 核准字號與相關說明，將於各別的招募頁面及同意書中清楚標示。我們嚴格遵守《人體研究法》及赫爾辛基宣言之精神。
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-6 flex items-center">
            <span className="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">4</span>
            參與者的權利與退出機制
          </h2>
          <p className="font-semibold text-gray-900 dark:text-gray-100">
            您的參與完全出於自願。
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>退出權利：</strong>在參與研究的任何階段，您皆有權利隨時撤回同意並終止參與，不需提供任何理由。</li>
            <li><strong>無不利後果：</strong>您的退出絕對不會影響您未來使用本平台資源的權利，也不會產生任何形式的懲罰或不利後果。</li>
            <li><strong>資料刪除：</strong>若您決定退出，您可以要求我們刪除與您相關的所有尚未匿名化的資料。</li>
          </ul>
          <p className="mt-4 text-sm text-gray-500">
            * 註：若資料已完成匿名化處理且無法重新識別，則可能無法進行單獨刪除。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6 flex items-center">
            <span className="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">5</span>
            心理風險控管機制
          </h2>
          <p>
            雖然我們的研究多屬低風險之心理學調查，但若您在填寫問卷或參與過程中引發了心理不適或情緒困擾，我們強烈建議您立即停止參與。
          </p>
          <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-4 mt-4 text-sm rounded-r-lg">
            <strong>緊急求助資源：</strong>
            <br />
            若您需要立即的心理支持，請撥打：
            <br />
            - 衛福部安心專線：1925（依舊愛我）
            <br />
            - 生命線專線：1995
            <br />
            - 張老師專線：1980
          </div>
        </section>

        <hr className="my-12 border-gray-200 dark:border-zinc-700" />

        <div className="text-center not-prose">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            如果您對本政策有任何疑問，或欲行使您的資料權利，請隨時與我們聯繫。
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-2 border border-gray-300 dark:border-zinc-600 rounded-full hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors font-medium text-sm"
          >
            聯絡研究團隊
          </Link>
        </div>
      </div>
    </div>
  );
}
