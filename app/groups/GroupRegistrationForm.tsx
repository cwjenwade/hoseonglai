"use client";

import { useMemo, useState } from "react";

type GroupRegistrationFormProps = {
  groupSlug: string;
  groupTitle: string;
};

function buildInterviewSlots(): string[] {
  return [
    "週一 10:00–11:00",
    "週一 14:00–15:00",
    "週一 19:00–20:00",
    "週二 10:00–11:00",
    "週二 14:00–15:00",
    "週二 19:00–20:00",
    "週三 10:00–11:00",
    "週三 14:00–15:00",
    "週三 19:00–20:00",
    "週四 10:00–11:00",
    "週四 14:00–15:00",
    "週四 19:00–20:00",
    "週五 10:00–11:00",
    "週五 14:00–15:00",
    "週五 19:00–20:00",
  ];
}

export default function GroupRegistrationForm({
  groupSlug,
  groupTitle,
}: GroupRegistrationFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const slots = useMemo(() => buildInterviewSlots(), []);

  const toggleSlot = (slot: string) => {
    setSelectedSlots((prev) => {
      const exists = prev.includes(slot);
      if (exists) {
        return prev.filter((item) => item !== slot);
      }
      if (prev.length >= 5) {
        alert("最多可勾選 5 個時段");
        return prev;
      }
      return [...prev, slot];
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !phone.trim()) {
      alert("請填寫所有必填欄位");
      return;
    }

    if (selectedSlots.length < 3 || selectedSlots.length > 5) {
      alert("請至少勾選 3 個、最多 5 個可訪談時段");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/groups/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupSlug,
          groupTitle,
          name,
          email,
          phone,
          note,
          availabilitySlots: selectedSlots,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "報名失敗");
      }

      setSubmitted(true);
    } catch (error) {
      console.error("GROUP_REGISTRATION_ERROR", error);
      alert("送出失敗，請稍後再試");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
        <h3 className="text-xl font-semibold text-emerald-800">已收到你的報名</h3>
        <p className="mt-2 text-sm leading-7 text-emerald-700">
          感謝你提供可訪談時段，我們會評估後與你聯繫，安排合適的訪談時間。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="姓名"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-11 w-full rounded-xl border border-zinc-300 px-4 text-sm outline-none transition focus:border-emerald-500"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-11 w-full rounded-xl border border-zinc-300 px-4 text-sm outline-none transition focus:border-emerald-500"
          required
        />
      </div>

      <input
        type="tel"
        placeholder="手機號碼"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="h-11 w-full rounded-xl border border-zinc-300 px-4 text-sm outline-none transition focus:border-emerald-500"
        required
      />

      <div>
        <p className="text-sm font-medium text-zinc-900">
          可訪談時段（1 小時為單位，至少 3 個，最多 5 個）
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {slots.map((slot) => {
            const checked = selectedSlots.includes(slot);
            return (
              <label
                key={slot}
                className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition ${
                  checked
                    ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                    : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleSlot(slot)}
                  className="h-4 w-4 accent-emerald-600"
                />
                <span>{slot}</span>
              </label>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-zinc-500">目前已選 {selectedSlots.length} / 5</p>
      </div>

      <textarea
        placeholder="想補充的狀態（選填）"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={4}
        className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:opacity-60"
      >
        {loading ? "送出中..." : "送出報名"}
      </button>
    </form>
  );
}
