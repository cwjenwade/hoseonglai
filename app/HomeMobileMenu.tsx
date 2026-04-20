"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/", zh: "首頁", en: "Home" },
  { href: "/brand-philosophy", zh: "品牌理念", en: "Identity" },
  { href: "/heartfelt-momentum", zh: "有心好勢", en: "Research" },
  { href: "/fortune-arrives", zh: "有運旺來", en: "Programs" },
  { href: "/togetherness", zh: "團團圓圓", en: "Gatherings" },
  { href: "/collaborative-prosperity", zh: "協力招來", en: "Collaborations" },
];

type HomeMobileMenuProps = {
  variant?: "dark" | "light";
  showOnDesktop?: boolean;
};

export default function HomeMobileMenu({
  variant = "dark",
  showOnDesktop = false,
}: HomeMobileMenuProps) {
  const [open, setOpen] = useState(false);
  const isLight = variant === "light";
  const visibilityClass = showOnDesktop ? "inline-flex" : "inline-flex sm:hidden";
  const overlayVisibilityClass = showOnDesktop ? "" : "sm:hidden";

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={[
          visibilityClass,
          "h-11 w-11 items-center justify-center rounded-full transition",
          isLight
            ? "border border-zinc-300/80 bg-white/88 text-zinc-900 hover:bg-white"
            : "border border-white/24 bg-black/18 text-white backdrop-blur-md hover:bg-black/28",
        ].join(" ")}
      >
        <span className="relative h-5 w-5" aria-hidden="true">
          <span className="absolute right-0 top-0 h-5 w-3 rounded-[2px] border border-current border-l-0 opacity-70" />
          <span className="absolute left-0 top-[5px] block h-[1.5px] w-4 rounded-full bg-current" />
          <span className="absolute left-0 top-[13px] block h-[1.5px] w-4 rounded-full bg-current" />
        </span>
      </button>

      {open ? (
        <div
          className={[
            "fixed inset-0 z-50 bg-[#f7f7f2]/96 px-6 py-6 backdrop-blur-xl",
            overlayVisibilityClass,
          ].join(" ")}
        >
          <div className="flex items-center justify-between">
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-zinc-500"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Menu
            </p>

            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-300/80 text-zinc-800 transition hover:bg-black/5"
            >
              <span className="text-xl leading-none">×</span>
            </button>
          </div>

          <nav className="mt-14 space-y-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block border-b border-zinc-300/70 pb-4"
              >
                <div
                  className="text-[1.3rem] tracking-[0.02em] text-zinc-950"
                  style={{ fontFamily: "var(--font-noto-serif)" }}
                >
                  {link.zh}
                </div>
                <div
                  className="mt-1 text-[0.68rem] uppercase tracking-[0.24em] text-zinc-400"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  {link.en}
                </div>
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </>
  );
}
