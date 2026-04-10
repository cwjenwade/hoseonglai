export type LectureCategory =
  | "All"
  | "Upcoming"
  | "Past"
  | "Research"
  | "Public Talk";

export type LectureItem = {
  id: string;
  slug: string;
  type: "LECTURE" | "WORKSHOP" | "PUBLIC TALK";
  category: Exclude<LectureCategory, "All">[];
  dateMode?: "exact" | "month";
  date: string;
  dateLabel: string;
  time: string;
  approxYear?: string;
  approxMonth?: string;
  titleZh: string;
  titleEn?: string;
  subtitleEn: string;
  speaker: string;
  speakerEn?: string;
  summary: string;
  href: string;
  locationZh: string;
  addressZh?: string;
};

export const LECTURES: LectureItem[] = [
  {
    id: "1",
    slug: "avoidant-attachment",
    type: "LECTURE",
    category: ["Upcoming", "Public Talk"],
    date: "2026-04-10",
    dateLabel: "10 Apr 2026",
    time: "19:00–21:00",
    titleZh: "「愛你卻不能夠給你我全部」 談迴避型人格及其伴侶自處",
    titleEn: "Loving You, But Not With My Whole Self: Avoidant Attachment and Couple Dynamics",
    subtitleEn: "Hsinchu",
    speaker: "王涵羽 心理師",
    speakerEn: "Hanyu Wang, Psychologist",
    summary: "地點：新竹 光合",
    href: "/fortune-arrives/avoidant-attachment",
    locationZh: "新竹 光合",
    addressZh: "新竹市東區民生路193號11樓",
  },
  {
    id: "2",
    slug: "self-blame-in-love",
    type: "LECTURE",
    category: ["Upcoming", "Public Talk"],
    date: "2026-04-17",
    dateLabel: "17 Apr 2026",
    time: "19:00–21:00",
    titleZh: "「一定是我不夠好 所以你才想要逃」談那些在愛情中責怪自己的人及伴侶",
    titleEn: "It Must Be Me: Self-Blame in Love and the Couple Patterns Around It",
    subtitleEn: "Chiayi",
    speaker: "陳宥語 心理師",
    speakerEn: "You-Yu Chen, Psychologist",
    summary: "地點：嘉義",
    href: "/fortune-arrives/self-blame-in-love",
    locationZh: "嘉義",
    addressZh: "嘉義場（詳細地址將於報名後提供）",
  },
  {
    id: "3",
    slug: "tsundere-dynamics",
    type: "LECTURE",
    category: ["Upcoming", "Public Talk"],
    date: "2026-04-24",
    dateLabel: "24 Apr 2026",
    time: "19:00–21:00",
    titleZh: "「他要我我就不能走，得堅守不放手」傲嬌仔及其伴侶的攻防守備",
    titleEn: "Hold On, Don’t Let Go: Defensive and Pursuing Moves in Tsundere Dynamics",
    subtitleEn: "Hsinchu",
    speaker: "任祈蔚 心理師",
    speakerEn: "Chi-Wei Jen, Psychologist",
    summary: "地點：新竹 光合",
    href: "/fortune-arrives/tsundere-dynamics",
    locationZh: "新竹 光合",
    addressZh: "新竹市東區民生路193號11樓",
  },
  {
    id: "4",
    slug: "anxious-attachment",
    type: "LECTURE",
    category: ["Upcoming", "Public Talk"],
    date: "2026-05-01",
    dateLabel: "01 May 2026",
    time: "19:00–21:00",
    titleZh: "「一個人撐傘、一個人擦淚、一個人好累」焦慮型人格的追趕跑跳碰",
    titleEn: "Running in Circles: The Push–Pull Dynamics of Anxious Attachment",
    subtitleEn: "Hsinchu",
    speaker: "任祈蔚 心理師",
    speakerEn: "Chi-Wei Jen, Psychologist",
    summary: "地點：新竹 光合",
    href: "/fortune-arrives/anxious-attachment",
    locationZh: "新竹 光合",
    addressZh: "新竹市東區民生路193號11樓",
  },
  {
    id: "5",
    slug: "romance-in-ordinary",
    type: "LECTURE",
    category: ["Upcoming", "Public Talk"],
    date: "2026-05-08",
    dateLabel: "08 May 2026",
    time: "19:00–21:00",
    titleZh: "「平凡之中製造一些些浪漫」這樣談感情更幸福",
    titleEn: "Everyday Romance: Small Ways to Build a Happier Relationship",
    subtitleEn: "",
    speaker: "",
    speakerEn: "",
    summary: "",
    href: "/fortune-arrives/romance-in-ordinary",
    locationZh: "",
    addressZh: "地點待公布",
  },
  {
    id: "6",
    slug: "asperger-partner-support",
    type: "LECTURE",
    category: ["Upcoming", "Public Talk"],
    date: "2026-05-15",
    dateLabel: "15 May 2026",
    time: "19:00–21:00",
    titleZh: "「你以為愛 就是被愛 你揮霍了我的崇拜」亞斯伴侶的支持",
    titleEn: "Love Beyond Idealization: Supporting Partners in Asperger Relationships",
    subtitleEn: "Online",
    speaker: "甘雅婷 心理師",
    speakerEn: "Ya-Ting Kan, Psychologist",
    summary: "地點：線上",
    href: "/fortune-arrives/asperger-partner-support",
    locationZh: "線上",
    addressZh: "線上（活動連結將於行前寄送）",
  },
  {
    id: "7",
    slug: "counseling-ethics",
    type: "LECTURE",
    category: ["Upcoming", "Public Talk"],
    date: "2026-05-22",
    dateLabel: "22 May 2026",
    time: "19:00–21:00",
    titleZh: "諮商倫理（宥語、雅婷、祈蔚）",
    titleEn: "Counseling Ethics (Yu-Yu, Ya-Ting, and Chi-Wei)",
    subtitleEn: "Online",
    speaker: "陳宥語、甘雅婷、任祈蔚 心理師",
    speakerEn: "You-Yu Chen, Ya-Ting Kan, Chi-Wei Jen (Psychologists)",
    summary: "地點：線上",
    href: "/fortune-arrives/counseling-ethics",
    locationZh: "線上",
    addressZh: "線上（活動連結將於行前寄送）",
  },
  {
    id: "8",
    slug: "online-dating",
    type: "LECTURE",
    category: ["Upcoming", "Public Talk"],
    date: "2026-05-29",
    dateLabel: "29 May 2026",
    time: "19:00–21:00",
    titleZh: "「網路愛情，撲朔迷離，似幻似真，猶夢未醒」網路愛情的白皮書",
    titleEn: "Blurred Yet Real: A Field Guide to Online Dating and Digital Intimacy",
    subtitleEn: "Hsinchu",
    speaker: "王涵羽 心理師",
    speakerEn: "Hanyu Wang, Psychologist",
    summary: "地點：新竹 光合",
    href: "/fortune-arrives/online-dating",
    locationZh: "新竹 光合",
    addressZh: "新竹市東區民生路193號11樓",
  },
  {
    id: "9",
    slug: "music-therapy-love",
    type: "LECTURE",
    category: ["Upcoming", "Public Talk"],
    date: "2026-06-05",
    dateLabel: "05 Jun 2026",
    time: "19:00–21:00",
    titleZh: "「兩顆心都迷惑，怎麼說，怎麼說都沒有救」從音樂中再一次經驗愛",
    titleEn: "When Words Fail: Re-Experiencing Love Through Music Therapy",
    subtitleEn: "Hsinchu",
    speaker: "李昀儒 音樂治療師",
    speakerEn: "Yun-Ju Lee, Music Therapist",
    summary: "地點：新竹 光合",
    href: "/fortune-arrives/music-therapy-love",
    locationZh: "新竹 光合",
    addressZh: "新竹市東區民生路193號11樓",
  },
];

export const LECTURE_FILTERS: LectureCategory[] = [
  "All",
  "Upcoming",
  "Past",
  "Research",
  "Public Talk",
];
