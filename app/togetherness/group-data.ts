export type GroupItem = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  isVisible?: boolean;
  leaderProfileId?: string;
  leaderNameZh?: string;
  leaderNameEn?: string;
  leaderTitleZh?: string;
  leaderPhoto?: string;
  introHeading?: string;
  introDescription?: string;
  consultationNote?: string;
  registrationHeading?: string;
  registrationDescription?: string;
};

export const DEFAULT_GROUP_INTRO_HEADING = "先理解這個團體，再進入預約流程";
export const DEFAULT_GROUP_INTRO_DESCRIPTION = "你可以先看團體帶領者與初談說明，再往下填寫初談與參與時段。";
export const DEFAULT_GROUP_CONSULTATION_NOTE = "初談約 30 分鐘，會在安靜且不受打擾的空間進行。";
export const DEFAULT_GROUP_REGISTRATION_HEADING = "請先留下初談與聯絡資料";
export const DEFAULT_GROUP_REGISTRATION_DESCRIPTION =
  "初談將由心理與諮商學系研究生或學士班學生進行，並在督導之下，接受過評估與訪談的方法訓練。初談約 30 分鐘，會在安靜且不受打擾的空間進行。";
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
    isVisible: true,
    leaderProfileId: "director",
    leaderNameZh: DEFAULT_GROUP_LEADER_NAME_ZH,
    leaderNameEn: DEFAULT_GROUP_LEADER_NAME_EN,
    leaderTitleZh: DEFAULT_GROUP_LEADER_TITLE_ZH,
    leaderPhoto: "",
    introHeading: DEFAULT_GROUP_INTRO_HEADING,
    introDescription: DEFAULT_GROUP_INTRO_DESCRIPTION,
    consultationNote: DEFAULT_GROUP_CONSULTATION_NOTE,
    registrationHeading: DEFAULT_GROUP_REGISTRATION_HEADING,
    registrationDescription: DEFAULT_GROUP_REGISTRATION_DESCRIPTION,
  },
  {
    slug: "group-psychotherapy",
    title: "團體心理治療",
    subtitle: "Group Psychotherapy",
    description:
      "深入探索依附、情緒與關係模式。在互動中建立新的心理經驗。",
    image:
      "https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=1600&auto=format&fit=crop",
    isVisible: true,
    leaderProfileId: "director",
    leaderNameZh: DEFAULT_GROUP_LEADER_NAME_ZH,
    leaderNameEn: DEFAULT_GROUP_LEADER_NAME_EN,
    leaderTitleZh: DEFAULT_GROUP_LEADER_TITLE_ZH,
    leaderPhoto: "",
    introHeading: DEFAULT_GROUP_INTRO_HEADING,
    introDescription: DEFAULT_GROUP_INTRO_DESCRIPTION,
    consultationNote: DEFAULT_GROUP_CONSULTATION_NOTE,
    registrationHeading: DEFAULT_GROUP_REGISTRATION_HEADING,
    registrationDescription: DEFAULT_GROUP_REGISTRATION_DESCRIPTION,
  },
  {
    slug: "interpersonal-group",
    title: "人際歷程團體",
    subtitle: "Interpersonal Process Group",
    description:
      "透過即時互動理解人際模式。練習新的表達與關係方式。",
    image:
      "https://images.unsplash.com/photo-1529336953121-a0ce2d6a5c6d?q=80&w=1600&auto=format&fit=crop",
    isVisible: true,
    leaderProfileId: "director",
    leaderNameZh: DEFAULT_GROUP_LEADER_NAME_ZH,
    leaderNameEn: DEFAULT_GROUP_LEADER_NAME_EN,
    leaderTitleZh: DEFAULT_GROUP_LEADER_TITLE_ZH,
    leaderPhoto: "",
    introHeading: DEFAULT_GROUP_INTRO_HEADING,
    introDescription: DEFAULT_GROUP_INTRO_DESCRIPTION,
    consultationNote: DEFAULT_GROUP_CONSULTATION_NOTE,
    registrationHeading: DEFAULT_GROUP_REGISTRATION_HEADING,
    registrationDescription: DEFAULT_GROUP_REGISTRATION_DESCRIPTION,
  },
];

export function isGroupVisible(group: GroupItem): boolean {
  return group.isVisible !== false;
}
