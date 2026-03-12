export type ResearchProject = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  target: string;
  testUrl: string;
};

export const RESEARCH_PROJECTS: ResearchProject[] = [
  {
    id: "emotion-patterns",
    title: "情緒模式研究",
    subtitle: "Emotion Patterns Study",
    description:
      "探索個體在日常生活中的情緒感受、調節方式與反應傾向，理解情緒經驗與心理狀態之間的關係。",
    duration: "約 12–15 分鐘",
    target: "一般成人",
    testUrl: "/tests/emotion-patterns",
  },
  {
    id: "stress-adaptation",
    title: "壓力調適研究",
    subtitle: "Stress Adaptation Study",
    description:
      "聚焦壓力來源、身心反應與調適資源，理解人們如何在高壓環境中維持生活與心理平衡。",
    duration: "約 10–12 分鐘",
    target: "學生與上班族",
    testUrl: "/tests/stress-adaptation",
  },
  {
    id: "relationship-style",
    title: "人際關係風格研究",
    subtitle: "Relationship Style Study",
    description:
      "了解在親密關係、友誼與社交互動中的依附、安全感與互動風格，作為心理與社會連結的研究基礎。",
    duration: "約 15–18 分鐘",
    target: "一般成人",
    testUrl: "/tests/relationship-style",
  },
];