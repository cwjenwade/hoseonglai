import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Noto_Serif_TC,
  Playfair_Display,
} from "next/font/google";
import { DEFAULT_HOME_PAGE_CONTENT, normalizeHomePageContent } from "@/app/home-content";
import { getSiteContentSection } from "@/lib/site-content-server";
import NewsletterSubscription from "./NewsletterSubscription";
import SiteHeader from "./SiteHeader";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const personSameAs = (process.env.NEXT_PUBLIC_PERSON_SAME_AS || "")
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean);

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
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ho-Se 好勢｜Ong-Lai 旺來",
    template: "%s｜Ho-Se 好勢｜Ong-Lai 旺來",
  },
  alternates: {
    canonical: "/",
  },
  description:
    "Ho-Se 好勢・Ong-Lai 旺來，串連研究、內容、社群與協作實踐的平台。",
  keywords: [
    "Ho-Se 好勢",
    "Ong-Lai 旺來",
    "諮商心理師",
    "心理健康",
    "團體諮商",
    "諮商心理治療",
  ],
  openGraph: {
    title: "Ho-Se 好勢｜Ong-Lai 旺來",
    description:
      "Ho-Se 好勢・Ong-Lai 旺來，串連研究、內容、社群與協作實踐的平台。",
    url: "/",
    siteName: "Ho-Se 好勢｜Ong-Lai 旺來",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Ho-Se 好勢｜Ong-Lai 旺來",
    description:
      "Ho-Se 好勢・Ong-Lai 旺來，串連研究、內容、社群與協作實踐的平台。",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const homeContent = normalizeHomePageContent(
    await getSiteContentSection("home_page_content", DEFAULT_HOME_PAGE_CONTENT),
  );

  return (
    <html lang="zh-Hant">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${notoSerif.variable} text-zinc-900 antialiased`}
        style={{ backgroundColor: "#f3f3f2" }}
      >
        <div className="min-h-screen flex flex-col">
          <SiteHeader />

          {/* JSON-LD: Person (structured data for SEO) */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                name: "任祈蔚",
                jobTitle: "諮商心理師",
                description:
                  "註冊諮商心理師，提供個別諮商與團體諮商、諮商心理治療，專注心理健康促進。",
                ...(personSameAs.length > 0 ? { sameAs: personSameAs } : {}),
              }),
            }}
          />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                name: "任祈蔚 諮商心理服務",
                serviceType: ["諮商心理","團體諮商","諮商心理治療"],
                provider: {
                  "@type": "Person",
                  name: "任祈蔚",
                  jobTitle: "諮商心理師",
                  ...(personSameAs.length > 0 ? { sameAs: personSameAs } : {}),
                },
                description:
                  "提供個別諮商與團體諮商服務，專注心理健康與團體治療。",
                url: "https://你的網站/therapist/ren",
              }),
            }}
          />

          {/* MAIN CONTENT */}
          <main className="flex-1 w-full">
            {children}
          </main>

          {/* FOOTER */}
          <footer className="border-t border-[#e6e2da]">
            <div className="w-full px-6 py-10 lg:px-12 lg:py-14">
              <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">

                <div>
                  <NewsletterSubscription content={homeContent.newsletter} />
                </div>

                <div className="flex flex-col justify-end gap-4 border-t border-[#e6e2da] pt-6 lg:border-none lg:pt-0">

                  <div className="space-y-2">
                    <p
                      className="text-[1.1rem] tracking-[0.01em] text-zinc-900"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {homeContent.footer.brandName}
                    </p>

                    <p
                      className="text-[0.92rem] tracking-[0.06em] text-zinc-600"
                      style={{ fontFamily: "var(--font-noto-serif)" }}
                    >
                      {homeContent.footer.tagline}
                    </p>
                  </div>

                  <p
                    className="text-[0.66rem] uppercase tracking-[0.2em] text-zinc-400"
                    style={{ fontFamily: "var(--font-geist-sans)" }}
                  >
                    {homeContent.footer.description}
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
