import Link from "next/link";

type ModuleHeaderAction = {
  href: string;
  label: string;
  tone?: "primary" | "secondary";
};

type ModuleHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
  actions?: ModuleHeaderAction[];
};

export function ModuleHeader({
  eyebrow,
  title,
  description,
  backHref,
  backLabel = "返回",
  actions = [],
}: ModuleHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="space-y-2">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            {eyebrow}
          </p>
        ) : null}
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">{title}</h1>
          {description ? (
            <p className="mt-2 max-w-3xl text-sm leading-7 text-zinc-600">{description}</p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {backHref ? (
          <Link
            href={backHref}
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100"
          >
            {backLabel}
          </Link>
        ) : null}

        {actions.map((action) => (
          <Link
            key={`${action.href}-${action.label}`}
            href={action.href}
            className={
              "rounded-full px-4 py-2 text-sm transition " +
              (action.tone === "secondary"
                ? "border border-zinc-300 text-zinc-700 hover:bg-zinc-100"
                : "bg-zinc-900 text-white hover:bg-zinc-800")
            }
          >
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
