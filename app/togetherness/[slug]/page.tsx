import Link from "next/link";
import { notFound } from "next/navigation";
import GroupRegistrationForm from "@/app/togetherness/GroupRegistrationForm";
import { GROUPS } from "@/app/togetherness/group-data";

type GroupDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function GroupDetailPage({ params }: GroupDetailPageProps) {
  const { slug } = await params;
  const group = GROUPS.find((item) => item.slug === slug);

  if (!group) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f2f7f6] text-[#171717]">
      <div className="mx-auto max-w-[1080px] px-8 py-14 md:px-12 md:py-20">
        <Link
          href="/togetherness"
          className="text-xs uppercase tracking-[0.22em] text-neutral-500"
        >
          ← Back to gatherings
        </Link>

        <section className="mt-10 grid gap-10 border-t border-neutral-300/60 pt-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-[0.64rem] uppercase tracking-[0.34em] text-neutral-400">
              Group Registration
            </p>
            <h1 className="mt-5 text-[2.15rem] leading-[1.2] text-neutral-900 md:text-[2.5rem]">
              {group.title}
            </h1>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-neutral-500">
              {group.subtitle}
            </p>

            <p className="mt-7 text-[1rem] leading-[1.9] text-neutral-700">
              {group.description}
            </p>

            <p className="mt-8 text-[0.95rem] leading-[1.9] text-neutral-600">
              請先填寫基本資料，並勾選你方便訪談的時段（1 小時為單位）。
              <br />
              我們會依照你提供的時間，評估並安排團體前訪談。
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-300/70 bg-white/75 p-6 md:p-7">
            <GroupRegistrationForm groupSlug={group.slug} groupTitle={group.title} />
          </div>
        </section>
      </div>
    </main>
  );
}
