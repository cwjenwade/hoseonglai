import type { ReactNode } from "react";

type EditorSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
  aside?: ReactNode;
};

export function EditorSection({
  title,
  description,
  children,
  aside,
}: EditorSectionProps) {
  return (
    <section className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">{title}</h2>
          {description ? (
            <p className="mt-2 max-w-2xl text-sm leading-7 text-zinc-600">{description}</p>
          ) : null}
        </div>
        {aside}
      </div>

      <div className="mt-5">{children}</div>
    </section>
  );
}
