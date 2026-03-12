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
          <div className="grid gap-16 lg:grid-cols-[0.32fr_1.68fr]">
            <p
              className="text-[0.65rem] uppercase tracking-[0.38em] text-neutral-400"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Research Participation
            </p>

            <div>
              <h2
                className="max-w-5xl text-[3rem] leading-[0.95] tracking-[-0.025em] sm:text-[4.4rem] xl:text-[5.6rem]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Psychological research
                <br />
                projects you can join.
              </h2>

              <div className="mt-12 grid gap-10 lg:grid-cols-2">
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