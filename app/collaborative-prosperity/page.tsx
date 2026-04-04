import type { Metadata } from "next";
import PsychTestList from "./PsychTestList";

export const metadata: Metadata = {
  title: "任祈蔚｜協力招來｜研究專案",
  description:
    "任祈蔚的心理研究專案與招募資訊，完成基本資料填寫後即可收到專屬連結開始測驗。",
};

export default function CollaborativeProsperityPage() {
  return (
    <div className="w-full bg-[#FFFFFF] text-neutral-900">
      <section>
        <div className="mx-auto w-full max-w-[1520px] px-6 py-12 md:px-10 md:py-16 xl:px-14 xl:py-20">
          <p
            className="text-[0.64rem] uppercase tracking-[0.34em] text-neutral-400"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Research Participation
          </p>

          <h1
            className="mt-8 text-center text-[2.6rem] leading-none uppercase tracking-[0.16em] text-neutral-900 sm:text-[4rem] xl:text-[5.2rem]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            JOIN
          </h1>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-[1520px] px-6 pb-12 md:px-10 md:pb-16 xl:px-14 xl:pb-20">
          <div className="mb-12 md:mb-16">
            <h2
              className="text-[2.2rem] leading-[1.08] tracking-[0.012em] text-neutral-900 md:text-[2.5rem]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Current research studies
            </h2>
          </div>

          <PsychTestList />
        </div>
      </section>
    </div>
  );
}