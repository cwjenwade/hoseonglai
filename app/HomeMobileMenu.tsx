"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/brand-philosophy", zh: "品牌理念", en: "Identity" },
  { href: "/heartfelt-momentum", zh: "有心好勢", en: "Research" },
  { href: "/fortune-arrives", zh: "有運旺來", en: "Programs" },
  { href: "/togetherness", zh: "團團圓圓", en: "Gatherings" },
  { href: "/collaborative-prosperity", zh: "協力招來", en: "Collaborations" },
];

export default function HomeMobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/24 bg-black/18 text-white backdrop-blur-md transition hover:bg-black/28 sm:hidden"
      >
        <span className="flex flex-col gap-[4px]">
          <span className="block h-[1.5px] w-4 rounded-full bg-current" />
          <span className="block h-[1.5px] w-4 rounded-full bg-current" />
        </span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 bg-[#f4efe7]/96 px-6 py-6 backdrop-blur-xl sm:hidden">
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
