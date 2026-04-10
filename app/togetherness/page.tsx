import type { Metadata } from "next";
import { GROUPS } from "./group-data";
import { getSiteContentSection } from "@/lib/site-content-server";
import TogethernessCatalogClient from "./TogethernessCatalogClient";

export const metadata: Metadata = {
  title: "團團圓圓 | Group Therapy",
};

type TogethernessPageProps = {
  searchParams: Promise<{ tag?: string }>;
};

export default async function TogethernessPage({ searchParams }: TogethernessPageProps) {
  const groups = await getSiteContentSection("togetherness_groups", GROUPS);
  const resolvedSearchParams = await searchParams;

  return (
    <main className="min-h-screen bg-[#f2f7f6] text-[#171717]">
      <div className="mx-auto max-w-[1520px] px-8 py-16 md:px-12 md:py-20">
        <header className="mb-16 md:mb-20">
          <p
            className="text-[0.64rem] uppercase tracking-[0.34em] text-neutral-400"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            Group Therapy Programme
          </p>

          <h1
            className="mt-8 text-center text-[2.6rem] leading-none uppercase tracking-[0.16em] text-neutral-900 sm:text-[4rem] xl:text-[5.2rem]"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            GROUP
          </h1>

          <div className="mx-auto mt-10 grid max-w-[980px] gap-10 md:grid-cols-2">
            <div
              className="space-y-3 text-right text-[1rem] leading-[1.85] text-neutral-700"
              style={{ fontFamily: "var(--font-noto-serif)" }}
            >
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

            <div
              className="space-y-3 text-[0.96rem] leading-[1.85] text-neutral-600"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
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

        <TogethernessCatalogClient groups={groups} initialTag={resolvedSearchParams.tag} />
      </div>
    </main>
  );
}
