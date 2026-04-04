import LectureIndexClient from "./LectureIndexClient";
import { LECTURES } from "./lectures-data";
import { getSiteContentSection } from "@/lib/site-content-server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "任祈蔚｜講座與課程",
  description:
    "任祈蔚相關講座與課程資訊，包含心理健康、團體諮商與諮商心理治療主題。了解最新活動與報名方式。",
};

export default async function LectureIndexPage() {
  const lectures = await getSiteContentSection("fortune_arrives_lectures", LECTURES);
  return <LectureIndexClient lectures={lectures} />;
}