import type { ContentGovernanceFields } from "@/lib/content-governance";

type GovernanceFieldsProps = {
  value: ContentGovernanceFields;
  visibilityLabel?: string;
  onChange: (updates: Partial<ContentGovernanceFields>) => void;
};

export function GovernanceFields({
  value,
  visibilityLabel = "前台發布",
  onChange,
}: GovernanceFieldsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <label className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
        <input
          type="checkbox"
          checked={value.isPublished !== false}
          onChange={(event) => onChange({ isPublished: event.target.checked })}
          className="h-4 w-4 accent-zinc-900"
        />
        <span>{visibilityLabel}</span>
      </label>

      <label className="text-xs font-medium text-zinc-700">
        顯示排序
        <input
          type="number"
          value={Number.isFinite(Number(value.displayOrder)) ? Number(value.displayOrder) : 0}
          onChange={(event) => onChange({ displayOrder: Number(event.target.value) })}
          className="mt-1 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none transition focus:border-zinc-900"
        />
      </label>

      <label className="text-xs font-medium text-zinc-700">
        最後更新時間
        <input
          value={String(value.updatedAt || "").trim()}
          readOnly
          className="mt-1 h-11 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-500 outline-none"
        />
      </label>

      <label className="text-xs font-medium text-zinc-700">
        內部備註
        <textarea
          value={String(value.internalNote || "")}
          onChange={(event) => onChange({ internalNote: event.target.value })}
          className="mt-1 h-24 w-full rounded-xl border border-zinc-300 p-3 text-sm outline-none transition focus:border-zinc-900"
          placeholder="這裡只供後台管理使用，不會出現在前台。"
        />
      </label>
    </div>
  );
}
