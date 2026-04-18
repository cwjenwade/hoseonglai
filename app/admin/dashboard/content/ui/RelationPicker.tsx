type RelationOption = {
  value: string;
  label: string;
  description?: string;
};

type RelationPickerProps = {
  label: string;
  value: string;
  options: RelationOption[];
  emptyLabel: string;
  helper?: string;
  onChange: (value: string) => void;
  error?: string;
};

export function RelationPicker({
  label,
  value,
  options,
  emptyLabel,
  helper,
  onChange,
  error,
}: RelationPickerProps) {
  const selected = options.find((option) => option.value === value);

  return (
    <div className="space-y-3">
      <label className="block text-xs font-medium text-zinc-700">
        {label}
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={
            "mt-1 h-11 w-full rounded-xl bg-white px-3 text-sm outline-none transition focus:border-zinc-900 " +
            (error ? "border border-red-400 bg-red-50" : "border border-zinc-300")
          }
        >
          <option value="">{emptyLabel}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      {helper ? <p className="text-xs leading-6 text-zinc-500">{helper}</p> : null}

      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
        {selected ? (
          <>
            <p className="text-sm font-medium text-zinc-900">{selected.label}</p>
            {selected.description ? (
              <p className="mt-1 text-xs leading-6 text-zinc-600">{selected.description}</p>
            ) : null}
          </>
        ) : (
          <p className="text-sm text-zinc-500">尚未指定關聯資料。</p>
        )}
      </div>

      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
