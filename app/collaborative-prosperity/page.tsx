import type { Metadata } from "next";
import PsychTestList from "./PsychTestList";

export const metadata: Metadata = {
  title: "協力招來",
};

export default function CollaborativeProsperityPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-zinc-900">協力招來｜心理測驗</h2>
        <p className="mt-4 leading-8 text-zinc-700">
          這裡提供多種心理測驗，協助你了解自己的性格、壓力狀態與情緒模式。
          完成測驗後會自動儲存結果，你可以隨時回顧。
        </p>
      </section>

      <PsychTestList />
    </div>
  );
}
