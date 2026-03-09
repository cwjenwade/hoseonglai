import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import NewsletterSubscription from "./NewsletterSubscription";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ho-Se 好勢｜Ong-Lai 旺來",
    template: "%s｜Ho-Se 好勢｜Ong-Lai 旺來",
  },
  description:
    "Ho-Se 好勢・Ong-Lai 旺來。以心聚勢，以運旺來，團圓共好。結合研究、內容、社群與合作的品牌平台。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const links = [
    { href: "/", zh: "首頁", en: "Home" },
    { href: "/brand-philosophy", zh: "品牌理念", en: "Identity" },
    { href: "/heartfelt-momentum", zh: "有心好勢", en: "Researches" },
    { href: "/fortune-arrives", zh: "有運旺來", en: "Courses" },
    { href: "/togetherness", zh: "團團圓圓", en: "Group" },
    { href: "/collaborative-prosperity", zh: "協力招來", en: "Collaborations" },
  ];

  return (
    <html lang="zh-Hant">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-stone-50 text-zinc-900 antialiased`}
      >
        <div className="min-h-screen">
          <header className="border-b border-zinc-200 bg-stone-50/90 backdrop-blur">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-6 lg:px-10">
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="flex min-w-0 flex-1 items-start justify-between gap-4">
                  <Link href="/" className="group block max-w-2xl">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
                        <span className="text-[1.7rem] font-semibold tracking-[-0.04em] text-zinc-950 sm:text-[2rem]">
                          Ho-Se 好勢
                        </span>
                        <span className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
                          Brand Platform
                        </span>
                      </div>

                      <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
                        <span className="text-[1.7rem] font-semibold tracking-[-0.04em] text-zinc-950 sm:text-[2rem]">
                          Ong-Lai 旺來
                        </span>
                      </div>

                      <div className="grid gap-1 pt-1">
                        <p className="text-sm tracking-[0.08em] text-zinc-600 sm:text-[0.95rem]">
                          以心聚勢，以運旺來，團圓共好
                        </p>
                        <p className="text-xs uppercase tracking-[0.2em] text-zinc-400 sm:text-[0.78rem]">
                          Research, Creative Content, Community, and Collaborative Practice
                        </p>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/admin"
                    className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-zinc-300 text-xs font-semibold text-zinc-700 transition hover:border-zinc-900 hover:bg-zinc-900 hover:text-white"
                    title="管理後台"
                  >
                    A
                  </Link>
                </div>
              </div>

              <nav className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-zinc-200 pt-4 md:grid-cols-3 xl:grid-cols-6">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group rounded-xl px-1 py-2 transition hover:bg-white"
                  >
                    <div className="text-[0.98rem] font-medium tracking-[0.02em] text-zinc-900">
                      {link.zh}
                    </div>
                    <div className="mt-1 text-[0.68rem] uppercase tracking-[0.18em] text-zinc-400 transition group-hover:text-zinc-700">
                      {link.en}
                    </div>
                  </Link>
                ))}
              </nav>
            </div>
          </header>

          <main className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
            {children}
          </main>

          <footer className="border-t border-zinc-200 px-6 py-10 lg:px-10">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
              <NewsletterSubscription />

              <div className="flex flex-col gap-4 border-t border-zinc-200 pt-6 md:flex-row md:items-end md:justify-between">
                <div className="space-y-2">
                  <p className="text-base font-medium tracking-[0.01em] text-zinc-900">
                    Ho-Se 好勢 ｜ Ong-Lai 旺來
                  </p>
                  <p className="text-sm text-zinc-600">
                    以心聚勢，以運旺來，團圓共好
                  </p>
                </div>

                <p className="text-[0.68rem] uppercase tracking-[0.18em] text-zinc-400">
                  Research, Creative Content, Community, and Collaborative Practice
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}