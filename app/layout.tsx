import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
    default: "旺來品牌",
    template: "%s｜旺來品牌",
  },
  description: "品牌理念與核心價值展示網站",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const links = [
    { href: "/", label: "首頁" },
    { href: "/brand-philosophy", label: "品牌理念" },
    { href: "/heartfelt-momentum", label: "有心好勢" },
    { href: "/fortune-arrives", label: "有運旺來" },
    { href: "/togetherness", label: "團團圓圓" },
    { href: "/collaborative-prosperity", label: "協力招來" },
  ];

  return (
    <html lang="zh-Hant">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white text-zinc-800">
          <header className="border-b border-amber-100 bg-white/80 backdrop-blur">
            <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-4">
              <h1 className="text-xl font-bold tracking-wide text-amber-700">旺來品牌</h1>
              <nav className="flex flex-wrap items-center gap-2 text-sm font-medium">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-full border border-amber-200 px-3 py-1.5 text-amber-800 transition hover:bg-amber-100"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>

          <main className="mx-auto w-full max-w-5xl px-6 py-10">{children}</main>

          <footer className="border-t border-amber-100 px-6 py-6 text-center text-sm text-zinc-500">
            以心聚勢，以運旺來，團圓共好。
          </footer>
        </div>
      </body>
    </html>
  );
}
