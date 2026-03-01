'use client';

import { useState } from 'react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset form (in a real app you'd clear state variables or form ref)
      (e.target as HTMLFormElement).reset();

      // Hide success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto py-16 px-6 w-full">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4">聯絡我們 Contact</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">合作邀請 × 媒體洽詢</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

        {/* Contact Info Sidebar */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-blue-50 dark:bg-zinc-900/80 p-8 rounded-3xl border border-blue-100 dark:border-zinc-800">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">聯繫方式</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">一般客服與研究洽詢</h3>
                <a href="mailto:hello@onglai.tw" className="flex items-center text-lg font-medium text-blue-600 dark:text-blue-400 hover:underline">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  hello@onglai.tw
                </a>
              </div>

              <div className="pt-4 border-t border-blue-200 dark:border-zinc-700">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">媒體合作專線</h3>
                <a href="mailto:pr@onglai.tw" className="flex items-center text-lg font-medium text-purple-600 dark:text-purple-400 hover:underline">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                  </svg>
                  pr@onglai.tw
                </a>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-blue-200 dark:border-zinc-700">
              <h3 className="text-sm font-semibold text-gray-500 mb-4">追蹤我們</h3>
              <div className="flex gap-4">
                {/* Social Placeholders */}
                <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-black text-gray-400 hover:text-blue-500 flex items-center justify-center shadow-sm transition-colors">
                  <span className="sr-only">Facebook</span>
                  FB
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-black text-gray-400 hover:text-pink-500 flex items-center justify-center shadow-sm transition-colors">
                  <span className="sr-only">Instagram</span>
                  IG
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-black text-gray-400 hover:text-red-500 flex items-center justify-center shadow-sm transition-colors">
                  <span className="sr-only">YouTube</span>
                  YT
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-zinc-900 p-8 md:p-10 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">合作邀請表單</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              我們歡迎學術單位、醫療機構、企業或媒體洽談各項合作計畫。請填寫下列表單，我們將由專人與您聯繫。
            </p>

            {isSuccess && (
              <div className="mb-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-green-800 dark:text-green-300 flex items-center">
                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                您的訊息已成功送出！我們會盡快回覆您。
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    聯絡人姓名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="organization" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    單位名稱 / 公司
                  </label>
                  <input
                    type="text"
                    id="organization"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    聯絡信箱 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="type" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    合作類型 <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="type"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  >
                    <option value="">請選擇...</option>
                    <option value="media">媒體採訪 / 專欄邀稿</option>
                    <option value="research">學術研究合作</option>
                    <option value="corporate">企業培訓 / EAP</option>
                    <option value="other">其他</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  合作內容描述 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                  placeholder="請簡述您的需求或合作構想..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full md:w-auto px-8 py-3 rounded-xl text-white font-bold transition-all
                  ${isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-black dark:bg-white dark:text-black hover:opacity-80'
                  }`}
              >
                {isSubmitting ? '傳送中...' : '送出訊息'}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
