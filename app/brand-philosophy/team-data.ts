// 團隊成員數據
export const TEAM_SECTION_IDS = [
  "founding_partner",
  "strategic_creative_team",
  "project_coordinator",
] as const;

export type TeamSectionId = (typeof TEAM_SECTION_IDS)[number];

export type TeamSection = {
  id: TeamSectionId;
  title: string;
};

export type TeamMember = {
  id: string;
  nameZh: string;
  nameEn: string;
  profession: string;
  role: string;
  bio: string;
  photo: string; // 圖片 URL
  color: string; // 背景顏色
  sectionId: TeamSectionId;
};

export const DEFAULT_TEAM_SECTIONS: TeamSection[] = [
  {
    id: "founding_partner",
    title: "Founding Partner",
  },
  {
    id: "strategic_creative_team",
    title: "Strategic & Creative Team",
  },
  {
    id: "project_coordinator",
    title: "Project Coordinator",
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "ava",
    nameZh: "林雅雯",
    nameEn: "Ava Lin",
    profession: "品牌策略",
    role: "品牌總監",
    bio: "負責品牌願景與長期策略，確保每次溝通都能傳達一致且溫暖的品牌精神。透過深度思考與文化洞察，引領團隊朝共同願景邁進。",
    photo: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    color: "from-rose-500 to-rose-600",
    sectionId: "founding_partner",
  },
  {
    id: "noah",
    nameZh: "陳泓宇",
    nameEn: "Noah Chen",
    profession: "創意設計",
    role: "創意總監",
    bio: "整合視覺與內容創意，將抽象理念轉化為可感知、可記憶的品牌體驗。擅長用設計語言說故事，讓品牌在視覺上栩栩如生。",
    photo: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
    color: "from-amber-500 to-amber-600",
    sectionId: "founding_partner",
  },
  {
    id: "mia",
    nameZh: "許咪亞",
    nameEn: "Mia Hsu",
    profession: "用戶體驗",
    role: "體驗設計師",
    bio: "聚焦顧客旅程設計，透過細節優化提升互動品質與服務滿意度。以使用者為中心，打造每一個溫暖的觸點。",
    photo: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
    color: "from-emerald-500 to-emerald-600",
    sectionId: "strategic_creative_team",
  },
  {
    id: "ethan",
    nameZh: "吳昱辰",
    nameEn: "Ethan Wu",
    profession: "商務合作",
    role: "合作經理",
    bio: "建立跨域合作與資源串聯，擴大品牌影響力並創造共贏機會。推動戰略夥伴關係，開創品牌新的可能性。",
    photo: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    color: "from-sky-500 to-sky-600",
    sectionId: "strategic_creative_team",
  },
  {
    id: "luna",
    nameZh: "高郁楨",
    nameEn: "Luna Kao",
    profession: "社群管理",
    role: "社群主任",
    bio: "經營品牌社群與活動連結，讓使用者在參與中感受到團圓與歸屬。用心聆聽社群聲音，串聯每份熱情與支持。",
    photo: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png",
    color: "from-violet-500 to-violet-600",
    sectionId: "strategic_creative_team",
  },
  {
    id: "ryan",
    nameZh: "蔡宥恩",
    nameEn: "Ryan Tsai",
    profession: "營運管理",
    role: "營運總監",
    bio: "以系統化流程支持團隊執行，讓每項品牌承諾都能穩定落地。透過流程優化與團隊協調，確保品牌承諾的實現。",
    photo: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png",
    color: "from-orange-500 to-orange-600",
    sectionId: "project_coordinator",
  },
  {
    id: "ivy",
    nameZh: "黃思穎",
    nameEn: "Ivy Huang",
    profession: "數據分析",
    role: "數據分析師",
    bio: "透過數據洞察驗證策略成效，協助品牌在變化中持續優化與成長。用數據說話，為決策提供有力支持。",
    photo: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png",
    color: "from-teal-500 to-teal-600",
    sectionId: "project_coordinator",
  },
];
