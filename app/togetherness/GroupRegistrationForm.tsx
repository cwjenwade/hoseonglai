"use client";

import { useMemo, useState } from "react";

type GroupRegistrationFormProps = {
  groupSlug: string;
  groupTitle: string;
};

function buildInterviewSlots(): string[] {
  const days = ["週一", "週二", "週三", "週四", "週五"];
  const ranges: Array<[number, number]> = [
    [10, 12],
    [13, 17],
    [19, 21],
  ];

  const slots: string[] = [];

  for (const day of days) {
    for (const [start, end] of ranges) {
      for (let hour = start; hour < end; hour += 1) {
        const from = `${String(hour).padStart(2, "0")}:00`;
        const to = `${String(hour + 1).padStart(2, "0")}:00`;
        slots.push(`${day} ${from}–${to}`);
      }
    }
  }

  return slots;
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
  const dayColumns = useMemo(() => {
    const days = ["週一", "週二", "週三", "週四", "週五"];
    return days.map((day) => ({
      day,
      slots: slots.filter((slot) => slot.startsWith(`${day} `)),
    }));
  }, [slots]);

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

      if (data?.emailSent === false) {
        alert(
          "報名成功，但確認信寄送失敗，請稍後查看。\n" + (data?.message || ""),
        );
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
        <div className="mt-3 overflow-x-auto pb-1">
          <div className="grid min-w-[760px] grid-cols-5 gap-3">
            {dayColumns.map((column) => (
              <div
                key={column.day}
                className="rounded-xl border border-zinc-200 bg-white p-2.5"
              >
                <p className="mb-2 px-1 text-xs font-semibold tracking-[0.06em] text-zinc-500">
                  {column.day}
                </p>

                <div className="space-y-2">
                  {column.slots.map((slot) => {
                    const checked = selectedSlots.includes(slot);
                    const timeLabel = slot.replace(`${column.day} `, "");

                    return (
                      <label
                        key={slot}
                        className={`flex cursor-pointer items-center gap-2 rounded-lg border px-2.5 py-2 text-sm transition ${
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
                        <span className="whitespace-nowrap">{timeLabel}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
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
