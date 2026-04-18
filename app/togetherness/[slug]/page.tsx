import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import GroupRegistrationForm from "@/app/togetherness/GroupRegistrationForm";
import {
  DEFAULT_BRAND_PAGE_CONTENT,
  normalizeBrandPageContent,
} from "@/app/brand-philosophy/brand-content";
import {
  GROUPS,
  isGroupVisible,
  DEFAULT_GROUP_CONSULTATION_NOTE,
  DEFAULT_GROUP_INTRO_DESCRIPTION,
  DEFAULT_GROUP_INTRO_HEADING,
  DEFAULT_GROUP_LEADER_NAME_EN,
  DEFAULT_GROUP_LEADER_NAME_ZH,
  DEFAULT_GROUP_LEADER_TITLE_ZH,
  DEFAULT_GROUP_REGISTRATION_DESCRIPTION,
  DEFAULT_GROUP_REGISTRATION_HEADING,
} from "@/app/togetherness/group-data";
import { getSiteContentSection } from "@/lib/site-content-server";

type GroupDetailPageProps = {
  params: Promise<{ slug: string }>;
};

function splitGroupTitle(title: string): string[] {
  const trimmed = title.trim();
  const quoteEnd = trimmed.indexOf("」");
  if (quoteEnd > -1 && quoteEnd < trimmed.length - 1) {
    const first = trimmed.slice(0, quoteEnd + 1).trim();
    const second = trimmed.slice(quoteEnd + 1).trim();
    return [first, second].filter(Boolean);
  }
  return [trimmed];
}

export async function generateMetadata({ params }: GroupDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const groups = (await getSiteContentSection("togetherness_groups", GROUPS)).filter(isGroupVisible);
  const group = groups.find((item) => item.slug === slug);

  if (!group) {
    return {
      title: "團體諮商",
      description: "Ho-Se 好勢・Ong-Lai 旺來的團體諮商與團體心理治療資訊。",
    };
  }

  return {
    title: `${group.title}｜團體諮商`,
    description: `${group.title}｜${group.subtitle}。${group.description} Ho-Se 好勢・Ong-Lai 旺來的團體諮商與團體心理治療資訊。`,
  };
}

export default async function GroupDetailPage({ params }: GroupDetailPageProps) {
  const { slug } = await params;
  const groups = (await getSiteContentSection("togetherness_groups", GROUPS)).filter(isGroupVisible);
  const brandContent = normalizeBrandPageContent(
    await getSiteContentSection("brand_philosophy_page", DEFAULT_BRAND_PAGE_CONTENT),
  );
  const group = groups.find((item) => item.slug === slug);

  if (!group) {
    notFound();
  }

  const introHeading = group.introHeading || DEFAULT_GROUP_INTRO_HEADING;
  const introDescription = group.introDescription || DEFAULT_GROUP_INTRO_DESCRIPTION;
  const consultationNote = group.consultationNote || DEFAULT_GROUP_CONSULTATION_NOTE;
  const registrationHeading = group.registrationHeading || DEFAULT_GROUP_REGISTRATION_HEADING;
  const registrationDescription =
    group.registrationDescription || DEFAULT_GROUP_REGISTRATION_DESCRIPTION;
  const leaderNameZh = group.leaderNameZh || DEFAULT_GROUP_LEADER_NAME_ZH;
  const leaderNameEn = group.leaderNameEn || DEFAULT_GROUP_LEADER_NAME_EN;
  const leaderTitleZh = group.leaderTitleZh || DEFAULT_GROUP_LEADER_TITLE_ZH;
  const leaderPhoto = group.leaderPhoto || brandContent.director.photo;
  const titleLines = splitGroupTitle(group.title);

  return (
    <main className="min-h-screen bg-[#f7f6f3] text-[#171717]" style={{ fontFamily: "var(--font-noto-serif), serif" }}>
      <div className="w-full px-6 py-10 md:px-10 md:py-12 lg:px-14">
        <section className="grid gap-10 border-t border-neutral-300/70 pt-10 xl:grid-cols-[0.88fr_1.12fr] xl:gap-14">
          <aside className="space-y-7 xl:sticky xl:top-10 xl:self-start">
            <div className="space-y-5">
              <div className="w-full border border-neutral-300/70 bg-white/70 px-5 py-4">
                <p className="text-[0.64rem] uppercase tracking-[0.34em] text-neutral-500" style={{ fontFamily: "var(--font-playfair), serif" }}>
                  Group Registration
                </p>
              </div>

              <div className="mx-auto w-full max-w-[420px] rounded-[2.2rem] border border-neutral-300/70 bg-white/85 px-6 py-8 text-center shadow-[0_12px_40px_-28px_rgba(0,0,0,0.45)]">
                <div className="relative mx-auto h-[250px] w-[250px] max-w-full overflow-hidden rounded-full border border-neutral-300 bg-neutral-100">
                    {leaderPhoto ? (
                      <Image
                        src={leaderPhoto}
                        alt={leaderNameZh}
                        fill
                        sizes="250px"
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                <div className="mt-6 border-y border-neutral-200 py-5">
                  <p className="text-[20px] leading-[1.2] tracking-[0.01em] text-neutral-900" style={{ fontFamily: "var(--font-noto-serif), serif" }}>
                    {leaderTitleZh}
                  </p>
                  <p className="mt-1 text-[30px] leading-[1.15] tracking-[-0.005em] text-neutral-700" style={{ fontFamily: "var(--font-noto-serif), serif" }}>
                    {leaderNameZh}
                  </p>
                  <p className="mt-2 text-[28px] leading-[1.2] tracking-[0.015em] text-neutral-600" style={{ fontFamily: "var(--font-playfair), serif" }}>
                    {leaderNameEn}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {titleLines.map((line, idx) => (
                  <h1
                    key={`${line}-${idx}`}
                    className="text-[28px] leading-[1.08] tracking-[-0.02em] text-neutral-900"
                    style={{ fontFamily: "var(--font-noto-serif), serif" }}
                  >
                    {line}
                  </h1>
                ))}
              </div>
              <p className="text-[1.08rem] leading-[1.45] tracking-[0.02em] text-neutral-600 md:text-[1.22rem]" style={{ fontFamily: "var(--font-noto-serif), serif" }}>
                {group.subtitle}
              </p>

              <p className="mt-4 text-[16px] leading-[1.6] text-neutral-700" style={{ fontFamily: "var(--font-noto-serif), serif" }}>
                {group.description}
              </p>
            </div>
          </aside>

          <section className="space-y-8">
            <div className="grid gap-5 rounded-[2rem] border border-neutral-300/70 bg-white/85 p-6 md:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div className="space-y-3">
                <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400" style={{ fontFamily: "var(--font-playfair), serif" }}>
                  Step 1 / 團體詳情
                </p>
                <h2 className="text-[1.42rem] font-medium leading-[1.45] text-neutral-900 md:text-[1.62rem]" style={{ fontFamily: "var(--font-noto-serif), serif" }}>
                  {introHeading}
                </h2>
                <p className="max-w-[52ch] text-[1.08rem] leading-[1.95] text-neutral-700 md:text-[1.14rem]" style={{ fontFamily: "var(--font-noto-serif), serif" }}>
                  {introDescription}
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-neutral-200 bg-[#f8f8f6] p-5 text-[1.04rem] leading-[1.95] text-neutral-700 md:text-[1.08rem]" style={{ fontFamily: "var(--font-noto-serif), serif" }}>
                <p>
                  {consultationNote}
                </p>
              </div>
            </div>

            <div id="booking" className="rounded-[2rem] border border-neutral-300/70 bg-white/85 p-6 md:p-8">
              <GroupRegistrationForm
                groupSlug={group.slug}
                groupTitle={group.title}
                registrationHeading={registrationHeading}
                registrationDescription={registrationDescription}
              />
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
