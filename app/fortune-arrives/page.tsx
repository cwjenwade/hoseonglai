import LectureIndexClient from "./LectureIndexClient";
import { LECTURES } from "./lectures-data";
import { getSiteContentSection } from "@/lib/site-content-server";

export default async function LectureIndexPage() {
  const lectures = await getSiteContentSection("fortune_arrives_lectures", LECTURES);
  return <LectureIndexClient lectures={lectures} />;
}