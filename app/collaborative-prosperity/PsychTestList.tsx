"use client";

import { useState } from "react";
import { getSupabaseClient } from "@/lib/supabase";

type Test = {
  id: string;
  title: string;
  description: string;
  questions: { q: string; options: string[] }[];
};

const tests: Test[] = [
  {
    id: "stress-level",
    title: "壓力指數檢測",
    description: "評估你目前的壓力狀態與身心警訊程度",
    questions: [
      { q: "最近一週，你是否經常感到疲倦或精神不濟？", options: ["從不", "偶爾", "經常", "總是"] },
      { q: "你是否難以放鬆或持續感到緊繃？", options: ["從不", "偶爾", "經常", "總是"] },
      { q: "睡眠品質如何？", options: ["很好", "普通", "不太好", "很差"] },
      { q: "是否容易感到煩躁或情緒起伏大？", options: ["從不", "偶爾", "經常", "總是"] },
      { q: "面對日常工作或學習時，是否感到負擔沉重？", options: ["從不", "偶爾", "經常", "總是"] },
    ],
  },
  {
    id: "emotion-awareness",
    title: "情緒覺察量表",
    description: "了解你對自己情緒的辨識與調節能力",
    questions: [
      { q: "當情緒來臨時，你能清楚說出自己的感受嗎？", options: ["完全不行", "有點困難", "大致可以", "非常清楚"] },
      { q: "你是否會主動觀察自己的情緒變化？", options: ["從不", "偶爾", "經常", "總是"] },
      { q: "遇到負面情緒時，你通常如何處理？", options: ["壓抑不管", "轉移注意力", "找人傾訴", "自我調節"] },
      { q: "你能接納自己的各種情緒（包括負面情緒）嗎？", options: ["完全不行", "有點困難", "大致可以", "非常能夠"] },
      { q: "是否能在情緒激動時保持理性思考？", options: ["從不", "偶爾", "經常", "總是"] },
    ],
  },
  {
    id: "interpersonal-style",
    title: "人際互動風格測驗",
    description: "探索你在關係中的溝通模式與互動偏好",
    questions: [
      { q: "在團體中，你通常扮演什麼角色？", options: ["領導者", "協調者", "執行者", "觀察者"] },
      { q: "面對衝突時，你傾向？", options: ["直接面對", "尋求妥協", "暫時迴避", "請他人協調"] },
      { q: "你喜歡多大的社交圈？", options: ["一兩位知己", "小團體", "中型圈子", "廣泛交友"] },
      { q: "表達意見時，你通常？", options: ["保留不說", "委婉暗示", "清楚表達", "強烈主張"] },
      { q: "在關係中，你更重視？", options: ["獨立自主", "情感連結", "共同目標", "彈性平衡"] },
    ],
  },
];

export default function PsychTestList() {
  const [activeTest, setActiveTest] = useState<Test | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleStartTest = (test: Test) => {
    setActiveTest(test);
    setAnswers(new Array(test.questions.length).fill(-1));
    setSubmitted(false);
    setUserName("");
    setUserEmail("");
  };

  const handleAnswerChange = (qIndex: number, optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (!activeTest || !userName.trim() || !userEmail.trim()) {
      alert("請填寫姓名與 Email，並完成所有題目");
      return;
    }

    if (answers.includes(-1)) {
      alert("請完成所有題目");
      return;
    }

    try {
      const supabase = getSupabaseClient();

      const { error } = await supabase.from("psych_test_results").insert({
        test_id: activeTest.id,
        test_title: activeTest.title,
        user_name: userName,
        user_email: userEmail,
        answers: answers,
        total_score: answers.reduce((sum, val) => sum + val, 0),
      });

      if (error) throw error;

      setSubmitted(true);
    } catch (error) {
      console.error("儲存失敗：", error);
      alert("儲存失敗，請稍後再試");
    }
  };

  if (submitted && activeTest) {
    const totalScore = answers.reduce((sum, val) => sum + val, 0);
    const maxScore = activeTest.questions.length * 3;
    const percentage = Math.round((totalScore / maxScore) * 100);

    return (
      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h3 className="text-2xl font-bold text-emerald-700">測驗完成！</h3>
        <p className="mt-2 text-zinc-700">感謝你完成「{activeTest.title}」</p>
        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
          <p className="text-sm font-semibold text-emerald-800">你的得分</p>
          <p className="mt-2 text-3xl font-bold text-emerald-700">
            {totalScore} / {maxScore} ({percentage}%)
          </p>
        </div>
        <p className="mt-4 text-sm text-zinc-600">測驗結果已儲存，我們會將分析報告寄送到你的信箱。</p>
        <button
          onClick={() => setActiveTest(null)}
          className="mt-5 rounded-full bg-zinc-800 px-4 py-2 text-sm text-white transition hover:bg-zinc-700"
        >
          返回測驗列表
        </button>
      </section>
    );
  }

  if (activeTest) {
    return (
      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h3 className="text-2xl font-bold text-zinc-900">{activeTest.title}</h3>
        <p className="mt-2 text-zinc-600">{activeTest.description}</p>

        <div className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="你的姓名"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="h-11 w-full rounded-xl border border-zinc-300 px-4 text-sm outline-none transition focus:border-amber-400"
          />
          <input
            type="email"
            placeholder="你的 Email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="h-11 w-full rounded-xl border border-zinc-300 px-4 text-sm outline-none transition focus:border-amber-400"
          />
        </div>

        <div className="mt-6 space-y-6">
          {activeTest.questions.map((question, qIndex) => (
            <div key={qIndex} className="rounded-xl border border-zinc-200 p-4">
              <p className="font-medium text-zinc-900">
                {qIndex + 1}. {question.q}
              </p>
              <div className="mt-3 space-y-2">
                {question.options.map((option, oIndex) => (
                  <label key={oIndex} className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name={`q-${qIndex}`}
                      checked={answers[qIndex] === oIndex}
                      onChange={() => handleAnswerChange(qIndex, oIndex)}
                      className="h-4 w-4 accent-amber-600"
                    />
                    <span className="text-sm text-zinc-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleSubmit}
            className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            提交測驗
          </button>
          <button
            onClick={() => setActiveTest(null)}
            className="rounded-full border border-zinc-300 px-5 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100"
          >
            取消
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tests.map((test) => (
        <article key={test.id} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-zinc-900">{test.title}</h3>
          <p className="mt-2 text-sm leading-7 text-zinc-600">{test.description}</p>
          <button
            onClick={() => handleStartTest(test)}
            className="mt-4 rounded-full bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
          >
            開始測驗
          </button>
        </article>
      ))}
    </section>
  );
}
