import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import Link from 'next/link';

export const metadata: Metadata = {
  title: "好勢（hó-sè）旺來（Ong-lâi）",
  description: "Integrating Psychology Into Everyday Life",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-brand-yellow-bg text-gray-900`}
      >
        <header className="w-full border-b-4 border-brand-yellow-gold bg-brand-white py-4 px-6 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <Link href="/" className="text-2xl font-black tracking-tight text-brand-red-shadow">
              好勢旺來
            </Link>
            <nav className="flex flex-wrap justify-center gap-6 text-base font-bold text-gray-700">
              <Link href="/philosophy" className="hover:text-brand-orange-peel transition-colors">理念</Link>
              <Link href="/videos" className="hover:text-brand-pink-rose transition-colors">影片專區</Link>
              <Link href="/projects" className="hover:text-brand-mint transition-colors">研究與企劃</Link>
              <Link href="/apply" className="hover:text-brand-orange-flesh transition-colors">參與研究</Link>
              <Link href="/team" className="hover:text-brand-coral transition-colors">團隊介紹</Link>
              <Link href="/contact" className="hover:text-brand-teal transition-colors">聯絡我們</Link>
            </nav>
          </div>
        </header>

        <main className="flex-grow flex flex-col">
          {children}
        </main>

        <footer className="w-full border-t-4 border-brand-yellow-gold bg-brand-white py-8 px-6 mt-auto text-center font-medium text-gray-600">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} 好勢（hó-sè）旺來（Ong-lâi）. All rights reserved.</p>
            <nav className="flex gap-4">
              <Link href="/privacy" className="hover:text-brand-red-cherry transition-colors font-bold">隱私權與研究倫理</Link>
              <Link href="/contact" className="hover:text-brand-red-cherry transition-colors font-bold">聯絡我們</Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
