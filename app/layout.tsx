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
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <header className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black py-4 px-6 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <Link href="/" className="text-xl font-bold tracking-tight">
              好勢旺來
            </Link>
            <nav className="flex flex-wrap justify-center gap-4 text-sm font-medium">
              <Link href="/philosophy" className="hover:text-blue-600 transition-colors">理念</Link>
              <Link href="/videos" className="hover:text-blue-600 transition-colors">影片專區</Link>
              <Link href="/projects" className="hover:text-blue-600 transition-colors">研究與企劃</Link>
              <Link href="/apply" className="hover:text-blue-600 transition-colors">參與研究</Link>
              <Link href="/team" className="hover:text-blue-600 transition-colors">團隊介紹</Link>
              <Link href="/contact" className="hover:text-blue-600 transition-colors">聯絡我們</Link>
            </nav>
          </div>
        </header>

        <main className="flex-grow flex flex-col">
          {children}
        </main>

        <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black py-8 px-6 mt-auto text-center text-sm text-gray-500">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} 好勢（hó-sè）旺來（Ong-lâi）. All rights reserved.</p>
            <nav className="flex gap-4">
              <Link href="/privacy" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">隱私權與研究倫理</Link>
              <Link href="/contact" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">聯絡我們</Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
