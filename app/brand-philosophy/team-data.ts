// 團隊成員數據
export type TeamMember = {
  id: string;
  nameZh: string;
  nameEn: string;
  profession: string;
  role: string;
  bio: string;
  photo: string; // 圖片 URL
  color: string; // 背景顏色
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "ava",
    nameZh: "林雅雯",
    nameEn: "Ava Lin",
    profession: "品牌策略",
    role: "品牌總監",
    bio: "負責品牌願景與長期策略，確保每次溝通都能傳達一致且溫暖的品牌精神。透過深度思考與文化洞察，引領團隊朝共同願景邁進。",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    color: "from-rose-500 to-rose-600",
  },
  {
    id: "noah",
    nameZh: "陳泓宇",
    nameEn: "Noah Chen",
    profession: "創意設計",
    role: "創意總監",
    bio: "整合視覺與內容創意，將抽象理念轉化為可感知、可記憶的品牌體驗。擅長用設計語言說故事，讓品牌在視覺上栩栩如生。",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    color: "from-amber-500 to-amber-600",
  },
  {
    id: "mia",
    nameZh: "許咪亞",
    nameEn: "Mia Hsu",
    profession: "用戶體驗",
    role: "體驗設計師",
    bio: "聚焦顧客旅程設計，透過細節優化提升互動品質與服務滿意度。以使用者為中心，打造每一個溫暖的觸點。",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    id: "ethan",
    nameZh: "吳昱辰",
    nameEn: "Ethan Wu",
    profession: "商務合作",
    role: "合作經理",
    bio: "建立跨域合作與資源串聯，擴大品牌影響力並創造共贏機會。推動戰略夥伴關係，開創品牌新的可能性。",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    color: "from-sky-500 to-sky-600",
  },
  {
    id: "luna",
    nameZh: "高郁楨",
    nameEn: "Luna Kao",
    profession: "社群管理",
    role: "社群主任",
    bio: "經營品牌社群與活動連結，讓使用者在參與中感受到團圓與歸屬。用心聆聽社群聲音，串聯每份熱情與支持。",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    color: "from-violet-500 to-violet-600",
  },
  {
    id: "ryan",
    nameZh: "蔡宥恩",
    nameEn: "Ryan Tsai",
    profession: "營運管理",
    role: "營運總監",
    bio: "以系統化流程支持團隊執行，讓每項品牌承諾都能穩定落地。透過流程優化與團隊協調，確保品牌承諾的實現。",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    color: "from-orange-500 to-orange-600",
  },
  {
    id: "ivy",
    nameZh: "黃思穎",
    nameEn: "Ivy Huang",
    profession: "數據分析",
    role: "數據分析師",
    bio: "透過數據洞察驗證策略成效，協助品牌在變化中持續優化與成長。用數據說話，為決策提供有力支持。",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    color: "from-teal-500 to-teal-600",
  },
];
