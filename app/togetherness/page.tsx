import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GROUPS, isGroupVisible } from "./group-data";
import { getSiteContentSection } from "@/lib/site-content-server";

export const metadata: Metadata = {
  title: "團團圓圓 | Group Therapy",
};

type TogethernessPageProps = {
  searchParams: Promise<{ tag?: string }>;
};

export default async function TogethernessPage({ searchParams }: TogethernessPageProps) {
  const groups = (await getSiteContentSection("togetherness_groups", GROUPS)).filter(isGroupVisible);
  const resolvedSearchParams = await searchParams;

  return (
    <main className="min-h-screen bg-[#f2f7f6] text-[#171717]">
      <div className="mx-auto max-w-[1520px] px-8 py-16 md:px-12 md:py-20">
        <header className="mb-16 md:mb-20">
          <p className="text-[0.64rem] uppercase tracking-[0.34em] text-neutral-400">
            Group Therapy Programme
          </p>

          <h1
            className="mt-8 text-center text-[2.6rem] leading-none uppercase tracking-[0.16em] text-neutral-900 sm:text-[4rem] xl:text-[5.2rem]"
            style={{ fontFamily: "var(--font-playfair), var(--font-noto-serif)" }}
          >
            GROUP
          </h1>

          <div className="mx-auto mt-10 grid max-w-[980px] gap-10 md:grid-cols-2">
            <div className="space-y-3 text-right text-[1rem] leading-[1.85] text-neutral-700" style={{ fontFamily: "var(--font-playfair), var(--font-noto-serif)" }}>
              <p>
                我們
                <br />
                不是為了把話說完
                <br />
                是把那些說不出的，先
                <br />
                放在這裡
                <br />
                一張椅子，挨著，一張椅子
                <br />
                夜裡的心燈
                <br />
                還亮著幾盞
              </p>

              <p>
                有人站在遙遠的地方
                <br />
                有人噤聲緘默
                <br />
                後來才知道，療癒
                <br />
                有時只是
                <br />
                有人在心裡和你一宿親密
              </p>
            </div>

            <div className="space-y-3 text-[0.96rem] leading-[1.85] text-neutral-600" style={{ fontFamily: "var(--font-playfair), var(--font-noto-serif)" }}>
              <p>
                We are not here
                <br />
                to finish speaking.
              </p>

              <p>
                We place what cannot be said
                <br />
                between us.
              </p>

              <p>
                Chairs touching chairs,
                <br />
                like windows lit in the night.
              </p>

              <p>
                Someone speaks.
                <br />
                Someone breathes.
              </p>

              <p>
                Later we understand:
                <br />
                healing can be this—
                <br />
                someone staying with you
                <br />
                until dawn.
              </p>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-10 xl:gap-y-20">
          {groups.map((group) => (
            <article key={group.slug} className="group relative z-0">
              <Link
                href={`/togetherness/${group.slug}`}
                className="relative block p-0 text-left transition-[padding,transform,box-shadow] duration-300 ease-out hover:z-20 hover:-translate-y-2 hover:p-5 hover:shadow-[0_22px_44px_-28px_rgba(0,0,0,0.55)] focus-visible:z-20 focus-visible:-translate-y-2 focus-visible:p-5 focus-visible:shadow-[0_22px_44px_-28px_rgba(0,0,0,0.55)] focus-visible:outline-none"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-200">
                  <Image
                    src={group.image}
                    alt={group.title}
                    fill
                    sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                </div>

                <div className="mt-5">
                  <h2
                    className="mt-1 text-[24px] leading-[1.25] font-medium text-neutral-900"
                    style={{ fontFamily: "var(--font-noto-serif)" }}
                  >
                    {group.title}
                  </h2>

                  <p
                    className="mt-1 text-[13px] leading-[1.5] text-neutral-500"
                    style={{ fontFamily: "var(--font-geist-sans)" }}
                  >
                    {group.subtitle}
                  </p>

                  <p
                    className="mt-4 max-w-[32ch] text-[15px] leading-[1.75] text-neutral-700 line-clamp-2"
                    style={{ fontFamily: "var(--font-noto-serif)" }}
                  >
                    {group.description}
                  </p>

                  <span
                    className="mt-5 inline-block border-b border-neutral-700 pb-[2px] text-[13px] text-neutral-700 transition-opacity duration-200 group-hover:opacity-60"
                    style={{ fontFamily: "var(--font-geist-sans)" }}
                  >
                    View detail / Register
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
