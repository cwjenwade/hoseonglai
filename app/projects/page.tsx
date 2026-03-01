import Link from 'next/link';

// Mock data for initial development
const PROJECTS = [
  {
    id: 'p1',
    title: '【都會青年依附焦慮與修復方案】',
    status: '招募中',
    statusColor: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    progress: '研究執行階段 (30%)',
    phenomenon: '交友軟體普及化後，速食愛情文化反而加劇了年輕世代在親密關係中的不安全感。',
    problem: '我們觀察到許多人在面臨關係衝突時，往往採取「過度抗拒」或「過度迎合」兩極化反應，導致高比例的情緒耗竭。',
    purpose: '探討「五分鐘每日覺察練習」介入對於改善依附焦慮的成效。',
    workContent: '為期四週的線上打卡計畫、每週一次的專業心理師團體諮詢回饋。',
    researchDesign: '採量化問卷前後測（使用成人依附量表 AAS），搭配質性焦點團體訪談。',
    impact: '建立一套具實證基礎且適合台灣都會青年的低門檻關係修復指南。'
  },
  {
    id: 'p2',
    title: '【後疫情時代職場心理韌性調查】',
    status: '已結案',
    statusColor: 'bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-gray-300',
    progress: '資料分析完成，準備發表',
    phenomenon: '遠距工作與混合辦公模式成為常態，模糊了工作與生活的界線。',
    problem: '員工普遍反映「隱形加班」壓力增加，導致職業倦怠（Burnout）提早發生。',
    purpose: '描繪不同產業在混合辦公模式下的心理韌性輪廓，並找出關鍵保護因子。',
    workContent: '發放千份線上問卷，並針對科技業、服務業進行深度訪談。',
    researchDesign: '橫斷面研究設計，以心理韌性量表（CD-RISC）為核心測量工具。',
    impact: '提供企業人資部門具體可行的員工協助方案（EAP）建議。'
  }
];

export default function Projects() {
  return (
    <div className="max-w-5xl mx-auto py-16 px-6 w-full">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4">研究與企劃 Projects</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">社會問題 × 行動方案</p>
      </div>

      <div className="space-y-12">
        {PROJECTS.map((project) => (
          <article key={project.id} className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">

            {/* Header Section */}
            <div className="bg-gray-50 dark:bg-zinc-800/50 p-8 border-b border-gray-200 dark:border-zinc-800">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <h2 className="text-2xl font-bold">{project.title}</h2>
                <div className="flex gap-3">
                  <span className="px-4 py-1.5 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 text-sm font-semibold rounded-full border border-blue-200 dark:border-blue-800">
                    {project.progress}
                  </span>
                  <span className={`px-4 py-1.5 text-sm font-bold rounded-full border ${project.statusColor.replace('bg-', 'border-').replace('text-', 'border-')}`}>
                    {project.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">

                {/* Left Column */}
                <div className="space-y-8">
                  <section>
                    <h3 className="flex items-center text-lg font-bold text-blue-600 dark:text-blue-400 mb-3">
                      <span className="mr-2">🌍</span> 社會現象說明
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-zinc-800/50 p-4 rounded-xl">
                      {project.phenomenon}
                    </p>
                  </section>

                  <section>
                    <h3 className="flex items-center text-lg font-bold text-red-500 dark:text-red-400 mb-3">
                      <span className="mr-2">⚠️</span> 我們觀察到的問題
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {project.problem}
                    </p>
                  </section>

                  <section>
                    <h3 className="flex items-center text-lg font-bold text-green-600 dark:text-green-400 mb-3">
                      <span className="mr-2">🎯</span> 企劃目的
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                      {project.purpose}
                    </p>
                  </section>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  <section>
                    <h3 className="flex items-center text-lg font-bold text-purple-600 dark:text-purple-400 mb-3">
                      <span className="mr-2">📝</span> 實務工作內容
                    </h3>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed marker:text-purple-500">
                      <li>{project.workContent}</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="flex items-center text-lg font-bold text-orange-500 dark:text-orange-400 mb-3">
                      <span className="mr-2">🔬</span> 研究設計簡述
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed bg-orange-50 dark:bg-orange-900/10 p-4 rounded-xl border border-orange-100 dark:border-orange-900/30">
                      {project.researchDesign}
                    </p>
                  </section>

                  <section>
                    <h3 className="flex items-center text-lg font-bold text-teal-600 dark:text-teal-400 mb-3">
                      <span className="mr-2">✨</span> 預期影響
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {project.impact}
                    </p>
                  </section>
                </div>
              </div>

              {/* Call to Action Footer */}
              {project.status === '招募中' && (
                <div className="mt-12 pt-8 border-t border-gray-100 dark:border-zinc-800 text-center">
                  <p className="text-gray-600 dark:text-gray-400 mb-6 font-medium">
                    此研究計畫目前正在招募受試者，誠摯邀請您的參與，共同創造改變。
                  </p>
                  <Link
                    href="/apply"
                    className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                  >
                    立即參與研究
                  </Link>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
