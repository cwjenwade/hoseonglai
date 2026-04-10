export type GroupItem = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  leaderProfileId?: string;
  leaderNameZh?: string;
  leaderNameEn?: string;
  leaderTitleZh?: string;
  leaderPhoto?: string;
  approach?: string;
  suitableFor?: string;
  consultationNote?: string;
  followUpNote?: string;
};

export const DEFAULT_GROUP_APPROACH = "我們不急著修好你，而是一起理解你如何在關係裡受傷與靠近。";
export const DEFAULT_GROUP_SUITABLE_FOR = "適合正在親密關係、人際界線、身份認同中感到拉扯的人。";
export const DEFAULT_GROUP_CONSULTATION_NOTE = "初談約 30 分鐘，會在安靜且不受打擾的空間進行。";
export const DEFAULT_GROUP_FOLLOW_UP_NOTE = "我們確認約談時間後會寄信通知，並再以電話與你確認一次。";
export const DEFAULT_GROUP_LEADER_NAME_ZH = "任祈蔚";
export const DEFAULT_GROUP_LEADER_NAME_EN = "Jen Chi-Wei";
export const DEFAULT_GROUP_LEADER_TITLE_ZH = "諮商心理師";

export const GROUPS: GroupItem[] = [
  {
    slug: "group-counseling",
    title: "團體諮商",
    subtitle: "Group Counseling",
    description:
      "在安全且保密的團體中探索情緒與關係。透過傾聽與回饋逐漸理解自己。",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop",
    leaderProfileId: "director",
    leaderNameZh: DEFAULT_GROUP_LEADER_NAME_ZH,
    leaderNameEn: DEFAULT_GROUP_LEADER_NAME_EN,
    leaderTitleZh: DEFAULT_GROUP_LEADER_TITLE_ZH,
    leaderPhoto: "",
    approach: DEFAULT_GROUP_APPROACH,
    suitableFor: DEFAULT_GROUP_SUITABLE_FOR,
    consultationNote: DEFAULT_GROUP_CONSULTATION_NOTE,
    followUpNote: DEFAULT_GROUP_FOLLOW_UP_NOTE,
  },
  {
    slug: "group-psychotherapy",
    title: "團體心理治療",
    subtitle: "Group Psychotherapy",
    description:
      "深入探索依附、情緒與關係模式。在互動中建立新的心理經驗。",
    image:
      "https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=1600&auto=format&fit=crop",
    leaderProfileId: "director",
    leaderNameZh: DEFAULT_GROUP_LEADER_NAME_ZH,
    leaderNameEn: DEFAULT_GROUP_LEADER_NAME_EN,
    leaderTitleZh: DEFAULT_GROUP_LEADER_TITLE_ZH,
    leaderPhoto: "",
    approach: DEFAULT_GROUP_APPROACH,
    suitableFor: DEFAULT_GROUP_SUITABLE_FOR,
    consultationNote: DEFAULT_GROUP_CONSULTATION_NOTE,
    followUpNote: DEFAULT_GROUP_FOLLOW_UP_NOTE,
  },
  {
    slug: "interpersonal-group",
    title: "人際歷程團體",
    subtitle: "Interpersonal Process Group",
    description:
      "透過即時互動理解人際模式。練習新的表達與關係方式。",
    image:
      "https://images.unsplash.com/photo-1529336953121-a0ce2d6a5c6d?q=80&w=1600&auto=format&fit=crop",
    leaderProfileId: "director",
    leaderNameZh: DEFAULT_GROUP_LEADER_NAME_ZH,
    leaderNameEn: DEFAULT_GROUP_LEADER_NAME_EN,
    leaderTitleZh: DEFAULT_GROUP_LEADER_TITLE_ZH,
    leaderPhoto: "",
    approach: DEFAULT_GROUP_APPROACH,
    suitableFor: DEFAULT_GROUP_SUITABLE_FOR,
    consultationNote: DEFAULT_GROUP_CONSULTATION_NOTE,
    followUpNote: DEFAULT_GROUP_FOLLOW_UP_NOTE,
  },
];
