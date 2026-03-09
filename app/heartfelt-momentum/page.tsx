"use client";

export default function PsychologyArtworkPage() {
  const featuredVideo = {
    title: "When Emotions Lose Their Shape",
    subtitle:
      "Alexithymia is not simply having less emotion. It may reflect a reorganization of emotional structure.",
    category: "5-Minute Psychology Research",
    duration: "05 min",
    year: "2026",
    hook:
      "為什麼有些人不是沒有情緒，而是難以分辨情緒？這支五分鐘影片用心理計量分析解釋 alexithymia 如何改變情緒空間。",
    question: "What happens when emotions are felt, but no longer clearly distinguished?",
    keyFinding:
      "The findings suggest a collapse of emotional structure rather than simple emotional blunting.",
    concepts: [
      {
        term: "Alexithymia",
        note: "難以辨識與描述感受，並傾向外向式思考。",
      },
      {
        term: "Emotional differentiation",
        note: "能否把相近情緒區分成不同經驗。",
      },
      {
        term: "Emotional intensity",
        note: "不同情緒被感受到的強弱程度。",
      },
      {
        term: "Emotional structure",
        note: "情緒如何在心理空間中被排列與組織。",
      },
    ],
    stats: [
      { label: "Participants", value: "315" },
      { label: "Emotions", value: "19" },
      { label: "Iterations", value: "1,000" },
      { label: "Method", value: "PCA" },
    ],
    chapters: [
      {
        time: "00:35",
        label: "The question",
        note: "Alexithymia 常被理解成情緒遲鈍，但研究真正想問的是，情緒系統本身是否改變了組織方式。",
      },
      {
        time: "01:20",
        label: "How the study worked",
        note: "研究使用 TAS-20 與 mDES，分析 19 種情緒在兩組受試者中的排列方式，而不只比較平均數。",
      },
      {
        time: "02:40",
        label: "What changed",
        note: "alexithymia 組呈現較低正向情緒、較高負向情緒，並在多維情緒空間中出現位移。",
      },
      {
        time: "03:35",
        label: "Why it matters",
        note: "重點不只是強度變化，而是情緒之間的邊界變得模糊，高階分化維度受到壓縮。",
      },
      {
        time: "04:35",
        label: "Takeaway",
        note: "這篇研究把 alexithymia 從『情緒比較少』改寫為『情緒結構發生重整』。",
      },
    ],
    designFlow: [
      { title: "TAS-20", body: "測量 alexithymia" },
      { title: "mDES", body: "測量 19 種情緒強度" },
      { title: "Monte Carlo", body: "平衡不等組樣本" },
      { title: "PCA", body: "分析情緒結構" },
    ],
    findings: [
      {
        title: "Positive affect decreased",
        body: "pride、gladness、hope、love 的平均強度較低。",
      },
      {
        title: "Negative affect increased",
        body: "fear、sadness、scorn、repentance、stress 的強度較高。",
      },
      {
        title: "Emotional space expanded",
        body: "情緒空間更大，但不代表更細緻，也可能表示系統不穩。",
      },
      {
        title: "Differentiation weakened",
        body: "valence 主軸仍在，但高階分化維度受到壓縮。",
      },
    ],
  };

  const videoLibrary = [
    {
      title: "Why Emotions Blur Together",
      tag: "Alexithymia",
      blurb: "情緒分化如何下降，情緒邊界如何變模糊。",
      time: "05 min",
    },
    {
      title: "How Group Emotions Spread",
      tag: "Group Process",
      blurb: "團體中的情緒如何被彼此帶動與放大。",
      time: "05 min",
    },
    {
      title: "What Makes Empathy Possible",
      tag: "Empathy",
      blurb: "同理如何從辨識、理解到回應逐步形成。",
      time: "05 min",
    },
    {
      title: "Why Some Feelings Resist Words",
      tag: "Emotion Language",
      blurb: "情緒概念與語言能力如何影響內在經驗。",
      time: "05 min",
    },
    {
      title: "How Research Measures Emotion",
      tag: "Psychometrics",
      blurb: "心理測量如何捕捉看不見的情緒結構。",
      time: "05 min",
    },
    {
      title: "When Relationships Shape Feeling",
      tag: "Interpersonal Dynamics",
      blurb: "人際脈絡如何改變情緒經驗與表達方式。",
      time: "05 min",
    },
  ];

  const notes = [
    "這不是單一作品頁面。",
    "這是一個研究者以短影音轉譯心理學的平台首頁。",
    "每支影片都是一個研究問題、一段五分鐘解說與一個可理解的心理學概念。",
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f1ea] text-[#161616] selection:bg-[