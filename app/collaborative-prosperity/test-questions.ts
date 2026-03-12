export type TestQuestions = {
  projectId: string;
  questions: string[];
};

export const TEST_QUESTIONS_DB: TestQuestions[] = [
  {
    projectId: "emotion-patterns",
    questions: [
      "過去兩週，我經常感到情緒波動。",
      "我能夠清晰辨識自己當下的情緒狀態。",
      "面對挫折時，我通常採取積極的回應方式。",
      "我認為情緒表達對於心理健康是重要的。",
      "整體而言，我對自己的情緒控制能力感到滿意。",
      "我經常與他人談論我的情緒感受。",
      "負面情緒通常會影響我的日常表現。",
      "我擁有有效的情緒調節策略。",
      "我能夠從他人的情緒中學習。",
      "情緒穩定性對我的生活質量有顯著影響。",
    ],
  },
  {
    projectId: "stress-adaptation",
    questions: [
      "過去一個月，我感受到的壓力程度很高。",
      "我能夠辨識主要的壓力來源。",
      "面對壓力時，我有清楚的應對計畫。",
      "我通常能在壓力中保持冷靜。",
      "身體症狀（如疲勞、失眠）經常因壓力而出現。",
      "我擁有足夠的社會支持資源。",
      "工作或學業壓力是我主要的困擾。",
      "我定期進行放鬆或紓壓活動。",
      "我相信自己能夠應對日常生活中的挑戰。",
      "時間管理是我應對壓力的重要方法。",
    ],
  },
  {
    projectId: "relationship-style",
    questions: [
      "在親密關係中，我傾向於信任對方。",
      "我經常感到被理解和被接納。",
      "與他人保持親密距離時，我感到舒適。",
      "我在衝突中傾向於開放溝通。",
      "我擔心被伴侶或朋友拋棄。",
      "我通常願意向他人尋求幫助。",
      "在人際互動中，我感到自信。",
      "我認為長期的承諾和依附是健康的。",
      "我傾向於獨立，而非依賴他人。",
      "我擁有穩定而滿足的人際關係。",
    ],
  },
];

export function getTestQuestions(projectId: string): string[] {
  const project = TEST_QUESTIONS_DB.find((p) => p.projectId === projectId);
  return project?.questions || [];
}
