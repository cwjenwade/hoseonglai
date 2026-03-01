'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Apply() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="max-w-3xl mx-auto py-32 px-6 w-full text-center">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h1 className="text-4xl font-bold mb-4">報名成功！</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          感謝您參與好勢（hó-sè）旺來（Ong-lâi）的研究計畫。
          <br />系統已自動寄發確認信至您的信箱，請留意查收。
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors"
        >
          返回首頁
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-16 px-6 w-full">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">參與研究 Apply / Join</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">成為推動心理學知識進步的一份子</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-8 md:p-12 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Project Selection */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
              選擇欲參與的研究企劃 <span className="text-red-500">*</span>
            </label>
            <select
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            >
              <option value="">請選擇...</option>
              <option value="project-1">【都會青年依附焦慮與修復方案】</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-900 dark:text-gray-100">
                姓名 Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400"
                placeholder="王小明"
              />
            </div>

            {/* Age */}
            <div className="space-y-2">
              <label htmlFor="age" className="block text-sm font-semibold text-gray-900 dark:text-gray-100">
                年齡 Age <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="age"
                name="age"
                min="18"
                max="100"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400"
                placeholder="25"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-900 dark:text-gray-100">
              電子郵件 Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400"
              placeholder="example@email.com"
            />
          </div>

          {/* Basic Screening Conditions */}
          <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-zinc-800">
            <h3 className="text-lg font-semibold mb-4">基本篩選條件</h3>

            <label className="flex items-start gap-4 p-4 border border-gray-200 dark:border-zinc-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
              <div className="flex items-center h-5 mt-0.5">
                <input
                  type="checkbox"
                  required
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="text-sm">
                <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">我已年滿 18 歲，且目前居住於台灣地區。</p>
              </div>
            </label>

            <label className="flex items-start gap-4 p-4 border border-gray-200 dark:border-zinc-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
              <div className="flex items-center h-5 mt-0.5">
                <input
                  type="checkbox"
                  required
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="text-sm">
                <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">我目前並未接受身心科治療，或已取得主治醫師同意參與本研究。</p>
              </div>
            </label>
          </div>

          {/* Consent & Ethics */}
          <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-zinc-800">
            <h3 className="text-lg font-semibold mb-4 text-red-600 dark:text-red-400">資料使用與研究倫理同意書</h3>

            <div className="bg-gray-50 dark:bg-zinc-800/50 p-6 rounded-xl text-sm text-gray-600 dark:text-gray-400 h-48 overflow-y-auto border border-gray-200 dark:border-zinc-700 mb-6 font-mono leading-relaxed">
              <p className="mb-4 font-bold text-gray-900 dark:text-gray-100">參與者知情同意事項：</p>
              <ol className="list-decimal list-inside space-y-2">
                <li>本研究收集之個人基本資料及問卷回覆，僅供「好勢旺來」內部研究團隊進行學術分析使用。</li>
                <li>所有資料將經過匿名化處理，確保您的身分不會被識別。</li>
                <li>您可以隨時無條件退出研究，且不需承擔任何責任或後果。您的資料將於退出後立即銷毀。</li>
                <li>本研究已通過相關研究倫理審查（IRB），確保您的權益受充分保障。</li>
                <li>若您在填寫問卷或參與活動過程中感到任何心理不適，團隊將提供必要的轉介資源與協助。</li>
              </ol>
            </div>

            <label className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/50 rounded-xl cursor-pointer">
              <div className="flex items-center h-5 mt-1">
                <input
                  type="checkbox"
                  required
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="text-sm">
                <p className="font-bold text-blue-900 dark:text-blue-100 mb-1">我已詳細閱讀並同意上述「資料使用與研究倫理同意書」條款。</p>
                <p className="text-blue-700 dark:text-blue-300">我了解我的權益，並自願參與本研究計畫。</p>
              </div>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg transition-all shadow-md
                ${isSubmitting
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
                }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  處理中...
                </span>
              ) : '送出報名表單'}
            </button>
            <p className="text-center text-sm text-gray-500 mt-4">
              提交表單前，請確認您已詳閱 <Link href="/privacy" className="underline hover:text-blue-600">隱私權與研究倫理政策</Link>
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}
