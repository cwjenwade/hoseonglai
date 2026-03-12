import type { Metadata } from "next";
import PsychTestList from "./PsychTestList";

export const metadata: Metadata = {
  title: "協力招來｜研究專案",
  description:
    "加入 Ho-Se 好勢 Ong-Lai 旺來的心理研究專案，完成基本資料填寫後，系統將寄送專屬連結至你的信箱，以開始測驗。",
};

export default function CollaborativeProsperityPage() {
  return (
    <div className="w-full bg-[#FFFFFF] text-neutral-900">
      <section className="border-b border-neutral-300/60">
        <div className="px-6 py-24 lg:px-20">
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
            COLLABORATIVE
          </h1>

          <div className="mx-auto mt-14 grid max-w-6xl gap-10 lg:grid-cols-2">
            <p
              className="max-w-[62ch] text-[1.05rem] leading-[1.9] text-neutral-700"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              在這裡，你可以選擇參與不同的心理研究專案。每一個專案都對應一組心理測驗或研究問卷，
              用以理解人們在情緒、壓力、關係與生活經驗中的心理狀態。
            </p>

            <p
              className="max-w-[62ch] text-[1.05rem] leading-[1.9] text-neutral-700"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              當你選擇加入某個專案並填寫基本資料後，系統會寄送一封電子郵件至你的信箱。
              點擊信件中的專屬連結，即可回到網站並進入該專案的心理測驗頁面。
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="px-6 py-24 lg:px-20">
          <div className="mb-16">
            <p
              className="text-[0.65rem] uppercase tracking-[0.38em] text-neutral-400"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Projects
            </p>

            <h2
              className="mt-4 text-[2.8rem] tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-display)" }}
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