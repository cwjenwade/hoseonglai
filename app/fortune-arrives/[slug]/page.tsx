import Link from "next/link";
import LectureRegistrationForm from "@/app/fortune-arrives/LectureRegistrationForm";
import { LECTURES } from "@/app/fortune-arrives/lectures-data";
import { getSiteContentSection } from "@/lib/site-content-server";

type LectureDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function LectureDetailPage({ params }: LectureDetailPageProps) {
  const { slug } = await params;
  const lectures = await getSiteContentSection("fortune_arrives_lectures", LECTURES);
  const lecture = lectures.find((item) => item.slug === slug);

  if (!lecture) {
    return (
      <main className="min-h-screen bg-[#f6f3ee] px-6 py-20 text-[#1a1a1a] sm:px-8 lg:px-12">
        <p className="text-sm uppercase tracking-[0.22em] text-[#9c9c9c]">Lecture</p>
        <h1 className="mt-6 text-[2rem] tracking-[-0.02em]">找不到此講座</h1>
        <Link
          href="/fortune-arrives"
          className="mt-8 inline-flex border border-black/20 px-5 py-3 text-sm"
        >
          Back to lectures
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f3ee] text-[#1a1a1a]">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-14 sm:px-8 lg:px-12 lg:py-20">
        <Link
          href="/fortune-arrives"
          className="text-[12px] uppercase tracking-[0.24em] text-[#8d8d8d]"
        >
          ← Back to lectures
        </Link>

        <section className="mt-10 grid gap-10 border-t border-black/10 pt-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[12px] uppercase tracking-[0.24em] text-[#8d8d8d]">Lecture Detail</p>
            <h1
              className="mt-5 text-[2.2rem] leading-[1.16] tracking-[-0.02em] sm:text-[2.6rem]"
              style={{
                fontFamily:
                  "var(--font-noto-serif), var(--font-playfair), serif",
              }}
            >
              {lecture.titleZh}
            </h1>

            <div className="mt-8 space-y-2 text-[16px] text-[#4a4a4a]">
              <p>講者：{lecture.speaker || "待公布"}</p>
              <p>日期：{lecture.dateLabel}</p>
              <p>時間：{lecture.time}</p>
              <p>地點：{lecture.locationZh || "待公布"}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white/60 p-6">
            <LectureRegistrationForm
              lectureId={lecture.id}
              lectureTitle={lecture.titleZh}
              dateLabel={lecture.dateLabel}
              time={lecture.time}
              location={lecture.locationZh}
              backHref="/fortune-arrives"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
