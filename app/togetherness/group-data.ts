import type { ContentGovernanceFields } from "@/lib/content-governance";

export type GroupItem = ContentGovernanceFields & {
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
    slug: "1",
    title: "跨性別支持團體「我成為我，不需要被允許」",
    subtitle: "A Support Group for Trans and Gender Diverse People",
    description:
      "為跨性別與多元性別者提供安全且可安心交流的支持空間，陪伴成員整理性別認同、自我關係、身體經驗與社會處境，逐步建立更穩定的自我感與生活位置。",
    image:
      "https://a4g4ds4vkqtoundz.public.blob.vercel-storage.com/site-content/images/togetherness_groups/1775844960330-e5e67bed-058a-48a8-8cb3-a75fd177b50b.png",
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
    slug: "2",
    title: "性少數男性支持團體「擁有親密的人際關係」",
    subtitle: "A Support Group for Sexual Minority Men",
    description:
      "為性少數男性提供一個能安心說話、探索自我、整理情感與關係經驗的支持空間，在不需迎合期待的狀態下，慢慢靠近更真實的自己。",
    image:
      "https://a4g4ds4vkqtoundz.public.blob.vercel-storage.com/site-content/images/togetherness_groups/1775842004090-1d1e3460-be3f-453b-961c-1c785524c304.png",
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
    slug: "group-mnt7oxhc",
    title: "原住民性少數男性人際團體「有些話，不用解釋太多也會被懂」",
    subtitle: "An Interpersonal Group for Indigenous Sexual Minority Men",
    description:
      "以原住民性少數男性為主體，陪伴成員在人際關係中練習信任、表達、靠近與界線，整理文化處境、性別經驗與關係互動中的壓力，發展更自在且不必過度防備的連結方式。",
    image:
      "https://a4g4ds4vkqtoundz.public.blob.vercel-storage.com/site-content/images/togetherness_groups/1775843986589-aee277a4-5f05-44c6-ad05-e163d6de47db.png",
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
    slug: "group-mnt7r4p6",
    title: "男同志依附與親密關係團體「不是沒人愛，只是很難安心去愛」",
    subtitle: "A Relationship Group for Gay Men Focused on Attachment and Intimacy",
    description:
      "聚焦男同志在親密關係中的焦慮、逃避、患得患失與自我保護，協助成員理解依附經驗如何影響關係，建立更有安全感的連結。",
    image:
      "https://a4g4ds4vkqtoundz.public.blob.vercel-storage.com/site-content/images/togetherness_groups/1775844792204-40957fe2-28fe-447d-912d-6ce7401906f6.png",
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
