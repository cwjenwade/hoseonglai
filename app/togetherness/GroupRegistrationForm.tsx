"use client";

import { useMemo, useState } from "react";

type GroupRegistrationFormProps = {
  groupSlug: string;
  groupTitle: string;
  consultationNote: string;
  followUpNote: string;
};

function buildInterviewSlots(): string[] {
  const weekdayDays = ["週一", "週二", "週三", "週四", "週五"];
  const weekendDays = ["週六", "週日"];

  const weekdaySlots = ["19:00–20:30", "20:30–22:00"];
  const weekendSlots = ["10:30–12:00", "14:30–16:00", "19:00–20:30"];

  const slots: string[] = [];

  for (const day of weekdayDays) {
    for (const slot of weekdaySlots) {
      slots.push(`${day} ${slot}`);
    }
  }

  for (const day of weekendDays) {
    for (const slot of weekendSlots) {
      slots.push(`${day} ${slot}`);
    }
  }

  return slots;
}

function buildConsultationSlots(): string[] {
  const days = ["週一", "週二", "週三", "週四", "週五"];
  const ranges: Array<[number, number]> = [
    [10, 12],
    [13, 17],
    [18, 21],
  ];

  const slots: string[] = [];

  for (const day of days) {
    for (const [start, end] of ranges) {
      for (let hour = start; hour < end; hour += 1) {
        const from = `${String(hour).padStart(2, "0")}:00`;
        const to = `${String(hour).padStart(2, "0")}:30`;
        slots.push(`${day} ${from}–${to}`);
      }
    }
  }

  return slots;
}

export default function GroupRegistrationForm({
  groupSlug,
  groupTitle,
  consultationNote,
  followUpNote,
}: GroupRegistrationFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [consultationSlotsSelected, setConsultationSlotsSelected] = useState<string[]>([]);
  const [groupSlotsSelected, setGroupSlotsSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const consultationSlots = useMemo(() => buildConsultationSlots(), []);
  const groupSlots = useMemo(() => buildInterviewSlots(), []);

  const consultationDayColumns = useMemo(() => {
    const days = ["週一", "週二", "週三", "週四", "週五"];
    return days.map((day) => ({
      day,
      slots: consultationSlots.filter((slot) => slot.startsWith(`${day} `)),
    }));
  }, [consultationSlots]);

  const groupDayColumns = useMemo(() => {
    const days = ["週一", "週二", "週三", "週四", "週五", "週六", "週日"];
    return days.map((day) => ({
      day,
      slots: groupSlots.filter((slot) => slot.startsWith(`${day} `)),
    }));
  }, [groupSlots]);

  const toggleSlot = (
    slot: string,
    setValue: React.Dispatch<React.SetStateAction<string[]>>,
    limit: number,
  ) => {
    setValue((prev) => {
      const exists = prev.includes(slot);
      if (exists) {
        return prev.filter((item) => item !== slot);
      }
      if (prev.length >= limit) {
        alert(`最多可勾選 ${limit} 個時段`);
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

    if (consultationSlotsSelected.length < 2 || consultationSlotsSelected.length > 4) {
      alert("請至少勾選 2 個、最多 4 個初談時段");
      return;
    }

    if (groupSlotsSelected.length < 3 || groupSlotsSelected.length > 5) {
      alert("請至少勾選 3 個、最多 5 個團體參與時段");
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
          consultationSlots: consultationSlotsSelected,
          availabilitySlots: groupSlotsSelected,
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
      alert(error instanceof Error ? error.message : "送出失敗，請稍後再試");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
        <h3 className="text-xl font-semibold text-emerald-800">已收到你的報名</h3>
        <p className="mt-2 text-sm leading-7 text-emerald-700">
          感謝你提供可訪談時段。{followUpNote}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2 border-b border-neutral-200 pb-4">
          <p className="text-xs uppercase tracking-[0.26em] text-neutral-400">Step 2 / 預約初談</p>
          <h3 className="text-[1.15rem] font-medium text-neutral-900">請先留下初談與聯絡資料</h3>
          <p className="max-w-[60ch] text-sm leading-7 text-neutral-600">
            初談將由心理與諮商學系研究生或學士班學生進行，並在督導之下，接受過評估與訪談的方法訓練。
            {consultationNote}
          </p>
        </div>

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
      </div>

      <div>
        <p className="text-[18.4px] font-medium text-zinc-900">
          初談可約時段（30 分鐘，至少 2 個，最多 4 個）
        </p>
        <div className="mt-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {consultationDayColumns.map((column) => (
              <div
                key={column.day}
                className="rounded-xl border border-zinc-200 bg-white p-2.5"
              >
                <p className="mb-2 px-1 text-[14px] font-semibold tracking-[0.06em] text-zinc-500">
                  {column.day}
                </p>

                <div className="space-y-2">
                  {column.slots.map((slot) => {
                    const checked = consultationSlotsSelected.includes(slot);
                    const timeLabel = slot.replace(`${column.day} `, "");

                    return (
                      <label
                        key={slot}
                        className={`grid grid-cols-[16px_minmax(0,1fr)] cursor-pointer items-center gap-2 rounded-lg border px-2.5 py-2 text-[13px] transition ${
                          checked
                            ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                            : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                            onChange={() => toggleSlot(slot, setConsultationSlotsSelected, 4)}
                          className="h-4 w-4 accent-emerald-600"
                        />
                        <span className="min-w-0 leading-[1.2]">{timeLabel}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-2 text-xs text-zinc-500">目前已選 {consultationSlotsSelected.length} / 4</p>
      </div>

      <div id="schedule">
        <p className="text-sm font-medium text-zinc-900">
          團體可參與時段（90 分鐘為單位，至少 3 個，最多 5 個）
        </p>
        <div className="mt-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {groupDayColumns.map((column) => (
              <div
                key={column.day}
                className="rounded-xl border border-zinc-200 bg-white p-2.5"
              >
                <p className="mb-2 px-1 text-[14px] font-semibold tracking-[0.06em] text-zinc-500">
                  {column.day}
                </p>

                <div className="space-y-2">
                  {column.slots.map((slot) => {
                    const checked = groupSlotsSelected.includes(slot);
                    const timeLabel = slot.replace(`${column.day} `, "");

                    return (
                      <label
                        key={slot}
                        className={`grid grid-cols-[16px_minmax(0,1fr)] cursor-pointer items-center gap-2 rounded-lg border px-2.5 py-2 text-[13px] transition ${
                          checked
                            ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                            : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleSlot(slot, setGroupSlotsSelected, 5)}
                          className="h-4 w-4 accent-emerald-600"
                        />
                        <span className="min-w-0 leading-[1.2]">{timeLabel}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-2 text-xs text-zinc-500">目前已選 {groupSlotsSelected.length} / 5</p>
      </div>

      <textarea
        placeholder="偏好的週幾、時段，或其他補充資訊（選填）"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={4}
        className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
      />

      <p className="text-[16px] leading-7 text-zinc-600">我們確認約談時間後會寄信通知，並再以電話與你確認一次。</p>

      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:opacity-60"
      >
        {loading ? "送出中..." : "送出資料"}
      </button>
    </form>
  );
}
