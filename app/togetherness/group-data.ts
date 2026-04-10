export type GroupItem = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags?: string[];
};

export const GROUP_TAG_PRESETS = [
  "男同志",
  "原住民",
  "跨性別",
  "性少數",
  "存在主題",
  "親密關係",
];

export function normalizeGroupTags(tags?: string[]): string[] {
  return Array.from(
    new Set(
      (tags || [])
        .map((tag) => tag.trim())
        .filter(Boolean),
    ),
  );
}

export function suggestGroupTags(group: Pick<GroupItem, "slug" | "title" | "subtitle" | "description">): string[] {
  const text = `${group.slug} ${group.title} ${group.subtitle} ${group.description}`;
  const suggestions: string[] = [];

  const push = (tag: string) => {
    if (!suggestions.includes(tag)) {
      suggestions.push(tag);
    }
  };

  if (/同志|gay|lgbt|性少數|酷兒|queer/i.test(text)) {
    push("性少數");
  }

  if (/男同志|男性同志|gay|男/.test(text)) {
    push("男同志");
  }

  if (/跨性別|trans|跨性/.test(text)) {
    push("跨性別");
  }

  if (/原住民|部落|族群/.test(text)) {
    push("原住民");
  }

  if (/關係|伴侶|親密|依附|互動|歷程/.test(text)) {
    push("親密關係");
  }

  if (/存在|生命|自我|情緒|身份|認同|焦慮|孤單|孤獨/.test(text)) {
    push("存在主題");
  }

  if (suggestions.length === 0) {
    push("存在主題");
    push("親密關係");
  }

  return suggestions.slice(0, 3);
}

export const GROUPS: GroupItem[] = [
  {
    slug: "group-counseling",
    title: "團體諮商",
    subtitle: "Group Counseling",
    description:
      "在安全且保密的團體中探索情緒與關係。透過傾聽與回饋逐漸理解自己。",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop",
    tags: ["親密關係", "性少數", "存在主題"],
  },
  {
    slug: "group-psychotherapy",
    title: "團體心理治療",
    subtitle: "Group Psychotherapy",
    description:
      "深入探索依附、情緒與關係模式。在互動中建立新的心理經驗。",
    image:
      "https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=1600&auto=format&fit=crop",
    tags: ["男同志", "跨性別", "性少數"],
  },
  {
    slug: "interpersonal-group",
    title: "人際歷程團體",
    subtitle: "Interpersonal Process Group",
    description:
      "透過即時互動理解人際模式。練習新的表達與關係方式。",
    image:
      "https://images.unsplash.com/photo-1529336953121-a0ce2d6a5c6d?q=80&w=1600&auto=format&fit=crop",
    tags: ["存在主題", "親密關係", "性少數"],
  },
];
