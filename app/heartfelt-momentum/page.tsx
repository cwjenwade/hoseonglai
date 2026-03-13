import { Geist, Noto_Serif_TC, Playfair_Display } from "next/font/google";
import { getSiteContentSection } from "@/lib/site-content-server";
import { HEARTFELT_VIDEOS } from "./videos-data";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const notoSerif = Noto_Serif_TC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-serif",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-playfair",
});

export default async function PsychologyArtworkPage() {
  const videos = await getSiteContentSection(
    "heartfelt_momentum_videos",
    HEARTFELT_VIDEOS,
  );

  return (
    <main
      className={`${geist.variable} ${notoSerif.variable} ${playfair.variable} min-h-screen bg-[#fcfbf8] text-[#171717] antialiased`}
    >
      <section className="mx-auto w-full max-w-[1520px] px-6 py-12 md:px-10 md:py-16 xl:px-14 xl:py-20">
        <header className="mb-12 border-b border-black/8 pb-6 md:mb-16 md:pb-8">
          <p
            className="text-[0.64rem] uppercase tracking-[0.34em] text-black/34"
            style={{ fontFamily: "var(--font-geist)" }}
          >
            Psychology in 5 Minutes
          </p>
          <h1
            className="mt-5 text-center text-[2.5rem] leading-none tracking-[0.16em] text-black/92 md:text-[4rem] xl:text-[4.9rem]"
            style={{ fontFamily: "var(--font-geist)" }}
          >
            VIDEOS
          </h1>
        </header>

        <div className="grid gap-x-7 gap-y-14 md:grid-cols-2 xl:grid-cols-4 xl:gap-y-16">
          {videos.map((video) => (
            <article key={video.title} className="group">
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#f1eee8]">
                <img
                  src={video.image}
                  alt={video.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.015]"
                />
              </div>

              <div className="mt-4">
                <h2
                  className="mt-4 text-[2.02rem] leading-[1.04] tracking-[-0.045em] text-black/92"
                  style={{ fontFamily: "var(--font-noto-serif)" }}
                >
                  {video.title}
                </h2>

                <p
                  className="mt-2 text-[0.7rem] uppercase tracking-[0.24em] text-black/32"
                  style={{ fontFamily: "var(--font-geist)" }}
                >
                  {video.titleEn}
                </p>

                <p
                  className="mt-4 max-w-[25ch] text-[1.02rem] leading-[1.7] text-black/62"
                  style={{ fontFamily: "var(--font-noto-serif)" }}
                >
                  {video.description}
                </p>

                <div className="mt-6 space-y-2">
                  <p
                    className="text-[0.72rem] uppercase tracking-[0.2em] text-black/36"
                    style={{ fontFamily: "var(--font-geist)" }}
                  >
                    {video.tag}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
