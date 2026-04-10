import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import GroupRegistrationForm from "@/app/togetherness/GroupRegistrationForm";
import {
  DEFAULT_BRAND_PAGE_CONTENT,
  normalizeBrandPageContent,
} from "@/app/brand-philosophy/brand-content";
import {
  GROUPS,
  DEFAULT_GROUP_CONSULTATION_NOTE,
  DEFAULT_GROUP_FOLLOW_UP_NOTE,
  DEFAULT_GROUP_LEADER_NAME_EN,
  DEFAULT_GROUP_LEADER_NAME_ZH,
  DEFAULT_GROUP_LEADER_TITLE_ZH,
} from "@/app/togetherness/group-data";
import { getSiteContentSection } from "@/lib/site-content-server";

type GroupDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: GroupDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const groups = await getSiteContentSection("togetherness_groups", GROUPS);
  const group = groups.find((item) => item.slug === slug);

  if (!group) {
    return {
      title: "團體諮商",
      description: "任祈蔚的團體諮商與團體心理治療資訊。",
    };
  }

  return {
    title: `${group.title}｜團體諮商`,
    description: `${group.title}｜${group.subtitle}。${group.description} 任祈蔚團體諮商與團體心理治療資訊。`,
  };
}

export default async function GroupDetailPage({ params }: GroupDetailPageProps) {
  const { slug } = await params;
  const groups = await getSiteContentSection("togetherness_groups", GROUPS);
  const brandContent = normalizeBrandPageContent(
    await getSiteContentSection("brand_philosophy_page", DEFAULT_BRAND_PAGE_CONTENT),
  );
  const group = groups.find((item) => item.slug === slug);

  if (!group) {
    notFound();
  }

  const consultationNote = group.consultationNote || DEFAULT_GROUP_CONSULTATION_NOTE;
  const followUpNote = group.followUpNote || DEFAULT_GROUP_FOLLOW_UP_NOTE;
  const leaderNameZh = group.leaderNameZh || DEFAULT_GROUP_LEADER_NAME_ZH;
  const leaderNameEn = group.leaderNameEn || DEFAULT_GROUP_LEADER_NAME_EN;
  const leaderTitleZh = group.leaderTitleZh || DEFAULT_GROUP_LEADER_TITLE_ZH;
  const leaderPhoto = group.leaderPhoto || brandContent.director.photo;

  return (
    <main className="min-h-screen bg-[#f2f7f6] text-[#171717]" style={{ fontFamily: "var(--font-serif)" }}>
      <div className="w-full px-6 py-8 md:px-10 md:py-10 lg:px-14">
        <Link
          href="/togetherness"
          className="text-xs uppercase tracking-[0.24em] text-neutral-500 transition hover:text-neutral-900"
        >
          ← Back to gatherings
        </Link>

        <section className="mt-8 grid gap-8 border-t border-neutral-300/60 pt-8 xl:grid-cols-[0.88fr_1.12fr] xl:gap-10">
          <aside className="space-y-8 xl:sticky xl:top-10 xl:self-start">
            <div className="space-y-3">
              <p className="text-[0.64rem] uppercase tracking-[0.34em] text-neutral-400">
                Group Registration
              </p>

              <div className="flex items-center gap-4 rounded-2xl border border-neutral-300/70 bg-white/75 px-4 py-3">
                <div className="relative h-16 w-16 overflow-hidden rounded-full border border-neutral-300 bg-neutral-100">
                  {leaderPhoto ? (
                    <Image
                      src={leaderPhoto}
                      alt={leaderNameZh}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">團體帶領者</p>
                  <p className="text-[1.05rem] font-medium text-neutral-900">{leaderNameZh} {leaderTitleZh}</p>
                  <p className="text-[0.9rem] text-neutral-600">{leaderNameEn}</p>
                </div>
              </div>

              <h1 className="max-w-[7ch] text-[3.5rem] leading-[0.95] tracking-[-0.04em] text-neutral-900">
                {group.title}
              </h1>
              <p className="text-[0.95rem] uppercase tracking-[0.2em] text-neutral-500 md:text-[1rem]">
                {group.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#booking"
                className="rounded-full bg-neutral-900 px-5 py-3 text-sm text-white transition hover:bg-neutral-700"
              >
                下一頁：預約初談時間
              </a>
              <a
                href="#schedule"
                className="rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm text-neutral-700 transition hover:border-neutral-500"
              >
                直接看可參與時段
              </a>
            </div>
          </aside>

          <section className="space-y-8">
            <div className="grid gap-4 rounded-[2rem] border border-neutral-300/70 bg-white/80 p-6 md:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.26em] text-neutral-400">
                  Step 1 / 團體詳情
                </p>
                <h2 className="text-[1.25rem] font-medium text-neutral-900 md:text-[1.45rem]">
                  先理解這個團體，再進入預約流程
                </h2>
                <p className="max-w-[52ch] text-[0.98rem] leading-[1.9] text-neutral-600 md:text-[1.02rem]">
                  你可以先看團體帶領者與初談說明，再往下填寫初談與參與時段。
                </p>
              </div>

              <div className="rounded-[1.5rem] bg-[#f6f7f7] p-5 text-[0.92rem] leading-[1.9] text-neutral-700">
                <p>
                  {consultationNote}
                </p>
              </div>
            </div>

            <div id="booking" className="rounded-[2rem] border border-neutral-300/70 bg-white/80 p-6 md:p-8">
              <GroupRegistrationForm
                groupSlug={group.slug}
                groupTitle={group.title}
                consultationNote={consultationNote}
                followUpNote={followUpNote}
              />
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
