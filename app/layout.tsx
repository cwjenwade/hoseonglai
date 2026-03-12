import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Noto_Serif_TC,
  Playfair_Display,
} from "next/font/google";
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

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoSerif = Noto_Serif_TC({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
}: {
  children: React.ReactNode;
}) {
  const links = [
    { href: "/", zh: "首頁", en: "Home" },
    { href: "/brand-philosophy", zh: "品牌理念", en: "Identity" },
    { href: "/heartfelt-momentum", zh: "有心好勢", en: "Research" },
    { href: "/fortune-arrives", zh: "有運旺來", en: "Programs" },
    { href: "/togetherness", zh: "團團圓圓", en: "Gatherings" },
    { href: "/collaborative-prosperity", zh: "協力招來", en: "Collaborations" },
  ];

  return (
    <html lang="zh-Hant">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${notoSerif.variable} bg-[#f3f3f2] text-zinc-900 antialiased`}
      >
        <div className="min-h-screen flex flex-col">

          {/* HEADER */}
          <header className="border-b border-zinc-200/80">
            <div className="w-full px-6 py-8 lg:px-12 lg:py-10">
              <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">

                <div className="min-w-0">
                  <Link href="/" className="block">
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <p
                          className="text-[0.72rem] uppercase tracking-[0.28em] text-zinc-500"
                          style={{ fontFamily: "var(--font-geist-sans)" }}
                        >
                          Brand Platform
                        </p>

                        <div className="space-y-0.5">
                          <h1
                            className="text-[2.5rem] leading-none tracking-[-0.04em] text-zinc-950 sm:text-[3.4rem] lg:text-[4.25rem]"
                            style={{ fontFamily: "var(--font-playfair)" }}
                          >
                            Ho-Se 好勢
                          </h1>

                          <h2
                            className="text-[2.5rem] leading-none tracking-[-0.04em] text-zinc-950 sm:text-[3.4rem] lg:text-[4.25rem]"
                            style={{ fontFamily: "var(--font-playfair)" }}
                          >
                            Ong-Lai 旺來
                          </h2>
                        </div>
                      </div>

                      <div className="max-w-2xl space-y-2 pt-2">
                        <p
                          className="text-[0.98rem] tracking-[0.08em] text-zinc-700 sm:text-[1.05rem]"
                          style={{ fontFamily: "var(--font-noto-serif)" }}
                        >
                          以心聚勢，以運旺來，團圓共好
                        </p>

                        <p
                          className="max-w-xl text-[0.76rem] uppercase tracking-[0.22em] text-zinc-400"
                          style={{ fontFamily: "var(--font-geist-sans)" }}
                        >
                          Research, creative content, community, and collaborative practice
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="flex flex-col justify-between gap-8 lg:items-end">

                  <div className="flex w-full justify-end">
                    <Link
                      href="/admin"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 text-[0.68rem] uppercase tracking-[0.18em] text-zinc-700 hover:border-zinc-900 hover:text-zinc-950"
                      title="管理後台"
                    >
                      A
                    </Link>
                  </div>

                  <nav className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-1">
                    {links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="group border-b border-transparent pb-2 hover:border-zinc-300"
                      >
                        <div
                          className="text-[1rem] tracking-[0.04em] text-zinc-900 group-hover:opacity-70"
                          style={{ fontFamily: "var(--font-noto-serif)" }}
                        >
                          {link.zh}
                        </div>

                        <div
                          className="mt-1 text-[0.68rem] uppercase tracking-[0.24em] text-zinc-400 group-hover:text-zinc-700"
                          style={{ fontFamily: "var(--font-geist-sans)" }}
                        >
                          {link.en}
                        </div>
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </header>

          {/* MAIN */}
          <main className="flex-1 w-full">
            {children}
          </main>

          {/* FOOTER */}
          <footer className="border-t border-zinc-200/80">
            <div className="w-full px-6 py-10 lg:px-12 lg:py-14">
              <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">

                <div>
                  <NewsletterSubscription />
                </div>

                <div className="flex flex-col justify-end gap-4 border-t border-zinc-200 pt-6 lg:border-none lg:pt-0">

                  <div className="space-y-2">
                    <p
                      className="text-[1.1rem] tracking-[0.01em] text-zinc-900"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      Ho-Se 好勢 ｜ Ong-Lai 旺來
                    </p>

                    <p
                      className="text-[0.92rem] tracking-[0.06em] text-zinc-600"
                      style={{ fontFamily: "var(--font-noto-serif)" }}
                    >
                      以心聚勢，以運旺來，團圓共好
                    </p>
                  </div>

                  <p
                    className="text-[0.66rem] uppercase tracking-[0.2em] text-zinc-400"
                    style={{ fontFamily: "var(--font-geist-sans)" }}
                  >
                    Research, creative content, community, and collaborative practice
                  </p>

                </div>
              </div>
            </div>
          </footer>

        </div>
      </body>
    </html>
  );
}