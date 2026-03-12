import Link from "next/link";
import { verifyResearchToken } from "@/lib/research-token";

type PageProps = {
  searchParams: Promise<{
    token?: string;
  }>;
};

export default async function ResearchStartPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const token = resolvedSearchParams.token || "";
  const payload = verifyResearchToken(token);

  if (!payload) {
    return (
      <div className="w-full bg-[#faf9f6] px-6 py-24 text-neutral-900 lg:px-20">
        <p
          className="text-[0.68rem] uppercase tracking-[0.34em] text-neutral-400"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Invalid link
        </p>

        <h1
          className="mt-6 text-[2.8rem] tracking-[-0.03em]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          連結已失效或無法驗證
        </h1>

        <p
          className="mt-6 max-w-[62ch] text-[1.05rem] leading-[1.9] text-neutral-700"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          此連結可能已過期，或格式不正確。請重新回到研究專案頁面填寫資料，再次取得新的 email 驗證連結。
        </p>

        <Link
          href="/collaborative-prosperity"
          className="mt-10 inline-flex border border-neutral-900 px-6 py-3 text-[0.72rem] uppercase tracking-[0.22em] hover:bg-neutral-900 hover:text-[#f3f3f2]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Back to projects
        </Link>
      </div>
    );
  }

  const testHref = `${payload.projectTestUrl}?token=${encodeURIComponent(token)}`;

  return (
    <div className="w-full bg-[#f3f3f2] text-neutral-900">
      <section className="border-b border-neutral-300/60">
        <div className="px-6 py-24 lg:px-20">
          <p
            className="text-[0.65rem] uppercase tracking-[0.38em] text-neutral-400"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Research Access
          </p>

          <h1
            className="mt-6 max-w-4xl text-[3rem] leading-[0.95] tracking-[-0.025em] sm:text-[4.4rem]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Welcome back,
            <br />
            {payload.name}
          </h1>

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <p
              className="max-w-[62ch] text-[1.05rem] leading-[1.9] text-neutral-700"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              你已成功驗證 email，並確認研究同意。現在可以進入「{payload.projectTitle}」的心理測驗頁面。
            </p>

            <p
              className="max-w-[62ch] text-[1.05rem] leading-[1.9] text-neutral-700"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              點擊下方按鈕後，系統會帶你前往對應測驗。你也可以稍後再回來，只要此連結尚未過期即可使用。
            </p>
          </div>

          <div className="mt-12">
            <Link
              href={testHref}
              className="inline-flex min-h-11 items-center justify-center border border-neutral-900 px-6 text-[0.72rem] uppercase tracking-[0.22em] transition hover:bg-neutral-900 hover:text-[#f3f3f2]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Confirm and start assessment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
