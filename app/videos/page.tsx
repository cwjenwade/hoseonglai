'use client';

import { useState } from 'react';

// Mock data for initial development
const VIDEOS = [
  {
    id: 'v1',
    title: '【情緒管理】五分鐘理解情緒勒索與界線',
    intro: '透過心理學研究解析情緒勒索背後的機制，並學習如何建立健康的人際界線。',
    category: '情緒',
    source: 'Journal of Family Psychology (2022)',
    date: '2023-10-15',
    views: 12500,
    youtubeId: 'dQw4w9WgXcQ' // Placeholder
  },
  {
    id: 'v2',
    title: '【依附理論】你在戀愛中是哪一型？',
    intro: '從安全型、焦慮型到逃避型，了解你的依附風格如何影響親密關係。',
    category: '依附',
    source: 'Attachment & Human Development (2021)',
    date: '2023-11-02',
    views: 8400,
    youtubeId: 'dQw4w9WgXcQ'
  },
  {
    id: 'v3',
    title: '【創傷修復】如何面對過去的陰影？',
    intro: '探討創傷後成長（PTG）的科學基礎，我們不只要復原，更要蛻變。',
    category: '創傷',
    source: 'Psychological Trauma (2023)',
    date: '2023-12-10',
    views: 15600,
    youtubeId: 'dQw4w9WgXcQ'
  }
];

const CATEGORIES = ['全部', '情緒', '依附', '創傷', '團體治療'];

export default function Videos() {
  const [activeCategory, setActiveCategory] = useState('全部');

  const filteredVideos = activeCategory === '全部'
    ? VIDEOS
    : VIDEOS.filter(v => v.category === activeCategory);

  const handleShare = (id: string) => {
    // In a real app, this would use Web Share API or copy to clipboard
    alert(`分享影片連結: https://www.youtube.com/watch?v=${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto py-16 px-6 w-full">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">5 Minutes Psychological Research</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">大眾教育 × 研究轉譯</p>
      </div>

      {/* Categories Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredVideos.map(video => (
          <article key={video.id} className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {/* Embedded Video Placeholder */}
            <div className="aspect-video bg-gray-200 dark:bg-zinc-800 relative w-full">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-semibold rounded-full">
                  {video.category}
                </span>
                <button
                  onClick={() => handleShare(video.youtubeId)}
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                  aria-label="分享"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-5.368m0 5.368l5.662 3.397m-5.662-3.397l5.662-3.397m-5.662 3.397l-5.662 3.397" />
                  </svg>
                </button>
              </div>

              <h2 className="text-xl font-bold mb-3">{video.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                {video.intro}
              </p>

              <div className="bg-gray-50 dark:bg-black/50 p-3 rounded-lg mb-4 text-xs">
                <span className="font-semibold text-gray-700 dark:text-gray-300">研究來源：</span>
                <span className="text-gray-500 dark:text-gray-500 italic">{video.source}</span>
              </div>

              <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4 border-t border-gray-100 dark:border-zinc-800">
                <span>發布日期：{video.date}</span>
                <span>{video.views.toLocaleString()} 次觀看</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          目前該分類還沒有影片，敬請期待！
        </div>
      )}
    </div>
  );
}
