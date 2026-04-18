import LectureIndexClient from "./LectureIndexClient";
import { LECTURES, type LectureItem } from "./lectures-data";
import { getSiteContentSection } from "@/lib/site-content-server";
import type { Metadata } from "next";

function getLectureSortTimestamp(lecture: LectureItem): number {
  if (lecture.dateMode === "month") {
    const year = Number(lecture.approxYear || "");
    const month = Number(lecture.approxMonth || "");

    if (Number.isInteger(year) && Number.isInteger(month) && month >= 1 && month <= 12) {
      return new Date(year, month - 1, 1).getTime();
    }
  }

  const dateTimestamp = new Date(lecture.date).getTime();
  if (Number.isNaN(dateTimestamp)) {
    return Number.POSITIVE_INFINITY;
  }

  const startTime = lecture.time.split("–")[0]?.trim() || "00:00";
  const [hours, minutes] = startTime.split(":").map((value) => Number(value));

  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) {
    return dateTimestamp;
  }

  return dateTimestamp + hours * 60 * 60 * 1000 + minutes * 60 * 1000;
}

function sortLecturesByTime(lectures: LectureItem[]): LectureItem[] {
  return [...lectures].sort((left, right) => {
    const leftTime = getLectureSortTimestamp(left);
    const rightTime = getLectureSortTimestamp(right);

    if (leftTime !== rightTime) {
      return leftTime - rightTime;
    }

    return left.titleZh.localeCompare(right.titleZh, "zh-Hant");
  });
}

export const metadata: Metadata = {
  title: "有運旺來｜講座與課程",
  description:
    "Ho-Se 好勢・Ong-Lai 旺來的講座與課程資訊，整理最新活動與報名方式。",
};

export default async function LectureIndexPage() {
  const lectures = sortLecturesByTime(
    await getSiteContentSection("fortune_arrives_lectures", LECTURES),
  );
  return <LectureIndexClient lectures={lectures} />;
}
