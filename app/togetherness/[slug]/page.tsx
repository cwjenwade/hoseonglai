import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import GroupRegistrationForm from "@/app/togetherness/GroupRegistrationForm";
import { GROUPS } from "@/app/togetherness/group-data";
import {
  DEFAULT_TOGETHERNESS_REGISTRATION_COPY,
  normalizeTogethernessRegistrationCopy,
} from "@/app/togetherness/registration-copy";
import { getSiteContentSection } from "@/lib/site-content-server";

const GROUP_THERAPIST_COPY: Record<
  string,
  {
    therapist: string;
  }
> = {
  "group-counseling": {
    therapist: "任祈蔚心理師帶領，並由督導系統持續支持與討論。",
  },
  "group-psychotherapy": {
    therapist: "任祈蔚心理師帶領，並由督導系統持續支持與討論。",
  },
  "interpersonal-group": {
    therapist: "任祈蔚心理師帶領，並由督導系統持續支持與討論。",
  },
};

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
  const registrationCopy = normalizeTogethernessRegistrationCopy(
    await getSiteContentSection(
      "togetherness_registration_copy",
      DEFAULT_TOGETHERNESS_REGISTRATION_COPY,
    ),
  );
  const group = groups.find((item) => item.slug === slug);

  if (!group) {
    notFound();
  }

  const detailCopy = GROUP_THERAPIST_COPY[group.slug] || GROUP_THERAPIST_COPY["group-counseling"];

  return (
    <main className="min-h-screen bg-[#f2f7f6] text-[#171717]">
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
              <h1 className="max-w-[7ch] text-[clamp(3rem,7vw,6.25rem)] leading-[0.95] tracking-[-0.04em] text-neutral-900">
                {group.title}
              </h1>
              <p className="text-[0.95rem] uppercase tracking-[0.2em] text-neutral-500 md:text-[1rem]">
                {group.subtitle}
              </p>
            </div>

            <div className="space-y-5 text-[1rem] leading-[1.95] text-neutral-700 md:text-[1.04rem]">
              <p>{group.description}</p>
              <p>{registrationCopy.approach}</p>
              <div className="space-y-2 rounded-[1.5rem] border border-neutral-300/70 bg-white/70 p-5 text-[0.95rem] leading-[1.9] text-neutral-700">
                <p><span className="font-medium text-neutral-900">適合族群：</span>{registrationCopy.suitableFor}</p>
                <p><span className="font-medium text-neutral-900">帶領心理師：</span>{detailCopy.therapist}</p>
              </div>
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
                  這一頁先讓你看清楚團體的帶領方式、適合參與的族群，以及帶領心理師的背景。
                  看完後再往下預約初談時間，整個流程會更清楚。
                </p>
              </div>

              <div className="rounded-[1.5rem] bg-[#f6f7f7] p-5 text-[0.92rem] leading-[1.9] text-neutral-700">
                <p className="font-medium text-neutral-900">初談說明</p>
                <p>
                  初談將由心理與諮商學系研究生或學士班學生進行，並在督導之下，接受過評估與訪談的方法訓練。
                </p>
                <p>
                  {registrationCopy.consultationNote}
                </p>
              </div>
            </div>

            <div id="booking" className="rounded-[2rem] border border-neutral-300/70 bg-white/80 p-6 md:p-8">
              <GroupRegistrationForm
                groupSlug={group.slug}
                groupTitle={group.title}
                consultationNote={registrationCopy.consultationNote}
                followUpNote={registrationCopy.followUpNote}
              />
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
