import type { ContentGovernanceFields } from "@/lib/content-governance";

export type HeartfeltVideoItem = ContentGovernanceFields & {
  title: string;
  titleEn: string;
  tag: string;
  description: string;
  category: string;
  duration: string;
  image: string;
  youtubeUrl?: string;
};

export const HEARTFELT_VIDEOS: HeartfeltVideoItem[] = [
  {
    title: "當情緒失去形狀",
    titleEn: "When Emotions Lose Their Shape",
    tag: "alexithymia",
    description: "五分鐘看懂 alexithymia、情緒分化與情緒結構。",
    category: "研究影片",
    duration: "5 分鐘",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "相近情緒為何混在一起",
    titleEn: "Why Similar Feelings Blur Together",
    tag: "emotion differentiation",
    description: "從情緒分化理解 sad、regretful、lonely 為何難以拆開。",
    category: "研究影片",
    duration: "5 分鐘",
    image:
      "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "情緒如何在團體中擴散",
    titleEn: "How Group Emotions Spread",
    tag: "group process",
    description: "團體裡的情緒如何彼此感染、累積與轉變。",
    category: "研究影片",
    duration: "5 分鐘",
    image:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "同理是怎麼發生的",
    titleEn: "What Makes Empathy Possible",
    tag: "empathy",
    description: "同理如何從辨識、理解到回應逐步形成。",
    category: "研究影片",
    duration: "5 分鐘",
    image:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "為何有些感受說不出口",
    titleEn: "Why Some Feelings Resist Words",
    tag: "emotion language",
    description: "情緒概念與語言能力如何改變內在經驗。",
    category: "研究影片",
    duration: "5 分鐘",
    image:
      "https://images.unsplash.com/photo-1578301979108-0a2f6f91a4c0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "心理測量如何理解情緒",
    titleEn: "How Research Measures Emotion",
    tag: "psychometrics",
    description: "心理測量如何捕捉看不見的情緒結構。",
    category: "研究影片",
    duration: "5 分鐘",
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "關係如何改變情緒經驗",
    titleEn: "When Relationships Shape Feeling",
    tag: "interpersonal dynamics",
    description: "人際脈絡如何改變情緒經驗與表達方式。",
    category: "研究影片",
    duration: "5 分鐘",
    image:
      "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "情緒強度真的比較高嗎",
    titleEn: "How Intense Is Emotion",
    tag: "emotion intensity",
    description: "情緒強度與情緒結構之間不一定是同一件事。",
    category: "研究影片",
    duration: "5 分鐘",
    image:
      "https://images.unsplash.com/photo-1577083165633-14ebcdb0f658?auto=format&fit=crop&w=1200&q=80",
  },
];
