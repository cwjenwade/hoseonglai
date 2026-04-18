import Link from "next/link";

import type { ReactNode } from "react";

type ContentListTableColumn = {
  key: string;
  label: string;
  className?: string;
};

type ContentListTableRow = {
  id: string;
  values: Record<string, ReactNode>;
  href: string;
};

type ContentListTableProps = {
  columns: ContentListTableColumn[];
  rows: ContentListTableRow[];
  emptyLabel: string;
};

export function ContentListTable({
  columns,
  rows,
  emptyLabel,
}: ContentListTableProps) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-200">
          <thead className="bg-zinc-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 ${column.className || ""}`}
                >
                  {column.label}
                </th>
              ))}
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                動作
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 bg-white">
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-8 text-center text-sm text-zinc-500"
                >
                  {emptyLabel}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="align-top">
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-4 text-sm text-zinc-700">
                      {row.values[column.key]}
                    </td>
                  ))}
                  <td className="px-4 py-4 text-right">
                    <Link
                      href={row.href}
                      className="inline-flex rounded-full border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100"
                    >
                      編輯
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
