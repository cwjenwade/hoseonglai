export type GroupItem = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
};

export const GROUPS: GroupItem[] = [
  {
    slug: "group-counseling",
    title: "團體諮商",
    subtitle: "Group Counseling",
    description:
      "在安全且保密的團體中探索情緒與關係。透過傾聽與回饋逐漸理解自己。",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "group-psychotherapy",
    title: "團體心理治療",
    subtitle: "Group Psychotherapy",
    description:
      "深入探索依附、情緒與關係模式。在互動中建立新的心理經驗。",
    image:
      "https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "interpersonal-group",
    title: "人際歷程團體",
    subtitle: "Interpersonal Process Group",
    description:
      "透過即時互動理解人際模式。練習新的表達與關係方式。",
    image:
      "https://images.unsplash.com/photo-1529336953121-a0ce2d6a5c6d?q=80&w=1600&auto=format&fit=crop",
  },
];
