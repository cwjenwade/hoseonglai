import type { Metadata } from "next";
import Link from "next/link";
import { GROUPS } from "../groups/group-data";

export const metadata: Metadata = {
  title: "團團圓圓 | Group Therapy",
};

export default function TogethernessPage() {
  return (
    <main className="min-h-screen bg-[#f2f7f6] text-[#171717]">
      <div className="mx-auto max-w-[1520px] px-8 py-16 md:px-12 md:py-20">
        <header className="mb-16 md:mb-20">
          <p className="text-[0.64rem] uppercase tracking-[0.34em] text-neutral-400">
            Group Therapy Programme
          </p>

          <h1 className="mt-8 text-center text-[2.6rem] leading-none uppercase tracking-[0.16em] text-neutral-900 sm:text-[4rem] xl:text-[5.2rem]">
            TOGETHERNESS
          </h1>

          <div className="mx-auto mt-10 grid max-w-[980px] gap-10 md:grid-cols-2">
            <div className="space-y-3 text-[1rem] leading-[1.85] text-neutral-700">
              <p>
                我們不是為了把話說完，
                <br />
                只是把那些說不出的，先放在這裡。
                <br />
                一張椅子挨著一張椅子，
                <br />
                像夜裡還亮著的幾扇窗。
              </p>

              <p>
                有人開口，聲音很輕。
                <br />
                有人不說，呼吸也是回應。
                <br />
                後來才知道，療癒
                <br />
                有時只是終於有人，
                <br />
                在心裡陪你坐到天亮。
              </p>
            </div>

            <div className="space-y-3 text-[0.96rem] leading-[1.85] text-neutral-600">
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
                until morning.
              </p>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-10 xl:gap-y-20">
          {GROUPS.map((group) => (
            <article key={group.slug} className="group">
              <Link href={`/groups/${group.slug}`} className="block">
                <div className="aspect-[4/5] overflow-hidden bg-neutral-200">
                  <img
                    src={group.image}
                    alt={group.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                </div>

                <div className="mt-5">
                  <h2 className="mt-1 text-[24px] leading-[1.25] font-medium text-neutral-900">
                    {group.title}
                  </h2>

                  <p className="mt-1 text-[13px] leading-[1.5] text-neutral-500">
                    {group.subtitle}
                  </p>

                  <p className="mt-4 max-w-[32ch] text-[15px] leading-[1.75] text-neutral-700 line-clamp-2">
                    {group.description}
                  </p>

                  <span className="mt-5 inline-block border-b border-neutral-700 pb-[2px] text-[13px] text-neutral-700 transition-opacity duration-200 group-hover:opacity-60">
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