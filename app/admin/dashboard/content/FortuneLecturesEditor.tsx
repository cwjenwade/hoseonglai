"use client";

import { useMemo, useState } from "react";
import type { LectureItem } from "@/app/fortune-arrives/lectures-data";

type FortuneLecturesEditorProps = {
  initialLectures: LectureItem[];
};

const CATEGORY_OPTIONS: Exclude<LectureItem["category"][number], "All">[] = [
  "Upcoming",
  "Past",
  "Research",
  "Public Talk",
];

function formatDateLabel(date: string): string {
  const match = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return "";
  const [, year, month, day] = match;
  const monthIndex = Number(month) - 1;
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const labelMonth = monthNames[monthIndex];
  if (!labelMonth) return "";

  return `${Number(day)} ${labelMonth} ${year}`;
}

function formatMonthDateLabel(year: string, month: string): string {
  const normalizedYear = year.trim();
  const normalizedMonth = month.trim();
  if (!/^\d{4}$/.test(normalizedYear)) return "";

  const monthIndex = Number(normalizedMonth) - 1;
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const labelMonth = monthNames[monthIndex];
  if (!labelMonth) return "";

  return `${labelMonth} ${normalizedYear}`;
}

function splitTimeRange(value: string): { start: string; end: string } {
  const normalized = value.replace(/\s/g, "");
  const [start = "", end = ""] = normalized.split(/[–-]/);
  return { start, end };
}

function createEmptyLecture(): LectureItem {
  const slug = `new-lecture-${Date.now().toString(36)}`;
  return {
    id: `${Date.now()}`,
    slug,
    type: "LECTURE",
    category: ["Upcoming", "Public Talk"],
    dateMode: "exact",
    date: "",
    dateLabel: "",
    time: "",
    approxYear: "",
    approxMonth: "",
    titleZh: "",
    titleEn: "",
    subtitleEn: "",
    speaker: "",
    speakerEn: "",
    summary: "",
    href: `/fortune-arrives/${slug}`,
    locationZh: "",
    addressZh: "",
  };
}

export default function FortuneLecturesEditor({ initialLectures }: FortuneLecturesEditorProps) {
  const [lectures, setLectures] = useState<LectureItem[]>(initialLectures || []);

  const payload = useMemo(
    () =>
      lectures.map((lecture) => ({
        ...lecture,
        dateMode: lecture.dateMode === "month" ? "month" : "exact",
        dateLabel:
          lecture.dateMode === "month"
            ? formatMonthDateLabel(lecture.approxYear || "", lecture.approxMonth || "")
            : formatDateLabel(lecture.date),
      })),
    [lectures],
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900">Fortune Arrives 編輯器</h2>
          <p className="mt-1 text-sm text-zinc-600">管理講座卡片與明細內容（標題、講者、日期、地點、描述）。</p>
        </div>

        <button
          type="button"
          onClick={() => setLectures((prev) => [...prev, createEmptyLecture()])}
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100"
        >
          新增講座
        </button>
      </div>

      <div className="space-y-4">
        {lectures.map((lecture, index) => (
          <article key={`${lecture.id}-${index}`} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
            <div className="grid gap-3 md:grid-cols-2">
              <label className="text-xs text-zinc-700">
                ID
                <input
                  value={lecture.id}
                  onChange={(e) =>
                    setLectures((prev) => prev.map((item, i) => (i === index ? { ...item, id: e.target.value } : item)))
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                />
              </label>

              <label className="text-xs text-zinc-700">
                Slug
                <input
                  value={lecture.slug}
                  onChange={(e) =>
                    setLectures((prev) => prev.map((item, i) => (i === index ? { ...item, slug: e.target.value } : item)))
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                  placeholder="avoidant-attachment"
                />
              </label>
            </div>

            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <label className="text-xs text-zinc-700">
                中文標題
                <input
                  value={lecture.titleZh}
                  onChange={(e) =>
                    setLectures((prev) => prev.map((item, i) => (i === index ? { ...item, titleZh: e.target.value } : item)))
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                />
              </label>

              <label className="text-xs text-zinc-700">
                英文標題
                <input
                  value={lecture.titleEn || ""}
                  onChange={(e) =>
                    setLectures((prev) => prev.map((item, i) => (i === index ? { ...item, titleEn: e.target.value } : item)))
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                />
              </label>
            </div>

            <div className="mt-3 grid gap-3 md:grid-cols-3">
              <label className="text-xs text-zinc-700">
                日期模式
                <select
                  value={lecture.dateMode === "month" ? "month" : "exact"}
                  onChange={(e) =>
                    setLectures((prev) =>
                      prev.map((item, i) => {
                        if (i !== index) return item;
                        const nextMode = e.target.value === "month" ? "month" : "exact";
                        return {
                          ...item,
                          dateMode: nextMode,
                          date: nextMode === "month" ? "" : item.date,
                          approxYear: nextMode === "month" ? item.approxYear || "" : "",
                          approxMonth: nextMode === "month" ? item.approxMonth || "" : "",
                        };
                      }),
                    )
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                >
                  <option value="exact">指定日期</option>
                  <option value="month">僅年月（顯示敬請期待）</option>
                </select>
              </label>
              {lecture.dateMode === "month" ? (
                <>
                  <label className="text-xs text-zinc-700">
                    年份
                    <input
                      type="number"
                      min={2000}
                      max={2200}
                      value={lecture.approxYear || ""}
                      onChange={(e) =>
                        setLectures((prev) =>
                          prev.map((item, i) => (i === index ? { ...item, approxYear: e.target.value } : item)),
                        )
                      }
                      className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                      placeholder="2026"
                    />
                  </label>
                  <label className="text-xs text-zinc-700">
                    月份
                    <select
                      value={lecture.approxMonth || ""}
                      onChange={(e) =>
                        setLectures((prev) =>
                          prev.map((item, i) => (i === index ? { ...item, approxMonth: e.target.value } : item)),
                        )
                      }
                      className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                    >
                      <option value="">請選擇</option>
                      <option value="1">1 月</option>
                      <option value="2">2 月</option>
                      <option value="3">3 月</option>
                      <option value="4">4 月</option>
                      <option value="5">5 月</option>
                      <option value="6">6 月</option>
                      <option value="7">7 月</option>
                      <option value="8">8 月</option>
                      <option value="9">9 月</option>
                      <option value="10">10 月</option>
                      <option value="11">11 月</option>
                      <option value="12">12 月</option>
                    </select>
                  </label>
                </>
              ) : (
                <>
                  <label className="text-xs text-zinc-700">
                    日期（YYYY-MM-DD）
                    <input
                      type="date"
                      value={lecture.date}
                      onChange={(e) =>
                        setLectures((prev) => prev.map((item, i) => (i === index ? { ...item, date: e.target.value } : item)))
                      }
                      className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                    />
                  </label>
                  <label className="text-xs text-zinc-700">
                    時間
                    <div className="mt-1 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                      <input
                        type="time"
                        value={splitTimeRange(lecture.time).start}
                        onChange={(e) =>
                          setLectures((prev) =>
                            prev.map((item, i) => {
                              if (i !== index) return item;
                              const current = splitTimeRange(item.time);
                              return {
                                ...item,
                                time: `${e.target.value}${current.end ? `–${current.end}` : ""}`,
                              };
                            }),
                          )
                        }
                        className="h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                      />
                      <span className="text-xs text-zinc-500">至</span>
                      <input
                        type="time"
                        value={splitTimeRange(lecture.time).end}
                        onChange={(e) =>
                          setLectures((prev) =>
                            prev.map((item, i) => {
                              if (i !== index) return item;
                              const current = splitTimeRange(item.time);
                              return {
                                ...item,
                                time: `${current.start}${e.target.value ? `–${e.target.value}` : ""}`,
                              };
                            }),
                          )
                        }
                        className="h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                      />
                    </div>
                  </label>
                </>
              )}
              <label className="text-xs text-zinc-700">
                日期顯示文字
                <input
                  value={
                    lecture.dateMode === "month"
                      ? formatMonthDateLabel(lecture.approxYear || "", lecture.approxMonth || "")
                      : formatDateLabel(lecture.date)
                  }
                  readOnly
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-200 bg-zinc-100 px-3 text-sm text-zinc-600 outline-none"
                  placeholder="10 Apr 2026"
                />
              </label>
            </div>

            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <label className="text-xs text-zinc-700">
                講者（中文）
                <input
                  value={lecture.speaker}
                  onChange={(e) =>
                    setLectures((prev) => prev.map((item, i) => (i === index ? { ...item, speaker: e.target.value } : item)))
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                />
              </label>
              <label className="text-xs text-zinc-700">
                講者（英文）
                <input
                  value={lecture.speakerEn || ""}
                  onChange={(e) =>
                    setLectures((prev) => prev.map((item, i) => (i === index ? { ...item, speakerEn: e.target.value } : item)))
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                />
              </label>
            </div>

            <div className="mt-3">
              <label className="text-xs text-zinc-700">
                地址
                <input
                  value={lecture.addressZh || ""}
                  onChange={(e) =>
                    setLectures((prev) => prev.map((item, i) => (i === index ? { ...item, addressZh: e.target.value } : item)))
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                />
              </label>
            </div>

            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <label className="text-xs text-zinc-700">
                類型
                <select
                  value={lecture.type}
                  onChange={(e) =>
                    setLectures((prev) =>
                      prev.map((item, i) =>
                        i === index
                          ? { ...item, type: e.target.value as LectureItem["type"] }
                          : item,
                      ),
                    )
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                >
                  <option value="LECTURE">LECTURE</option>
                  <option value="WORKSHOP">WORKSHOP</option>
                  <option value="PUBLIC TALK">PUBLIC TALK</option>
                </select>
              </label>

              <label className="text-xs text-zinc-700">
                分類
                <div className="mt-2 grid grid-cols-2 gap-2 rounded-lg border border-zinc-200 bg-white p-2">
                  {CATEGORY_OPTIONS.map((category) => {
                    const checked = lecture.category.includes(category);
                    return (
                      <label key={category} className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-xs text-zinc-700">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) =>
                            setLectures((prev) =>
                              prev.map((item, i) => {
                                if (i !== index) return item;
                                const next = e.target.checked
                                  ? [...new Set([...item.category, category])]
                                  : item.category.filter((c) => c !== category);

                                return {
                                  ...item,
                                  category: next as LectureItem["category"],
                                };
                              }),
                            )
                          }
                        />
                        <span>{category}</span>
                      </label>
                    );
                  })}
                </div>
              </label>
            </div>

            <div className="mt-3 grid gap-3 md:grid-cols-1">
              <label className="text-xs text-zinc-700">
                詳細頁連結
                <input
                  value={lecture.href}
                  onChange={(e) =>
                    setLectures((prev) => prev.map((item, i) => (i === index ? { ...item, href: e.target.value } : item)))
                  }
                  className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                  placeholder="/fortune-arrives/avoidant-attachment"
                />
              </label>
            </div>

            <label className="mt-3 block text-xs text-zinc-700">
              摘要／描述
              <textarea
                value={lecture.summary}
                onChange={(e) =>
                  setLectures((prev) => prev.map((item, i) => (i === index ? { ...item, summary: e.target.value } : item)))
                }
                className="mt-1 h-24 w-full rounded-lg border border-zinc-300 p-3 text-sm outline-none focus:border-amber-400"
              />
            </label>

            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setLectures((prev) => prev.filter((_, i) => i !== index))}
                className="rounded-full border border-red-200 px-3 py-1 text-xs text-red-600 transition hover:bg-red-50"
              >
                刪除講座
              </button>
            </div>
          </article>
        ))}
      </div>

      <input type="hidden" name="payload" value={JSON.stringify(payload)} />
    </div>
  );
}
