type StatusBadgeProps = {
  tone?: "published" | "draft" | "visible" | "hidden" | "linked";
  label: string;
};

const TONE_CLASS: Record<NonNullable<StatusBadgeProps["tone"]>, string> = {
  published: "border-emerald-200 bg-emerald-50 text-emerald-700",
  draft: "border-amber-200 bg-amber-50 text-amber-700",
  visible: "border-sky-200 bg-sky-50 text-sky-700",
  hidden: "border-zinc-200 bg-zinc-100 text-zinc-600",
  linked: "border-violet-200 bg-violet-50 text-violet-700",
};

export function StatusBadge({ tone = "published", label }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] ${TONE_CLASS[tone]}`}
    >
      {label}
    </span>
  );
}
