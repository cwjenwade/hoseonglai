import Link from "next/link";

export default function Home() {
  const metadata = [
    { label: "DATE", value: "2026.04.10" },
    { label: "TIME", value: "19:30–21:00" },
    { label: "SPEAKER", value: "講者姓名待定" },
  ];

  const topics = [
    "Avoidant personality",
    "Relationship withdrawal",
    "Emotional distance",
    "Intimacy and self-protection",
  ];

  const relatedEvents = [
    {
      label: "TALK",
      title: "親密關係中的退縮與沉默",
      href: "/lectures/withdrawal-and-silence",
    },
    {
      label: "LECTURE",
      title: "依附焦慮、情感需求與伴侶互動",
      href: "/lectures/attachment-and-couple-dynamics",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f6f3ee] text-[#1a1a1a]">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        {/* 1. Hero */}
        <section className="border-b border-[rgba(0,0,0,0.08)] py-[120px] md:py-[140px] lg:py-[160px]">
          <div className="max-w-[980px]">
            <p
              className="mb-6 text-[11px] uppercase tracking-[0.28em] text-[#9c9c9c]"
              style={{
                fontFamily:
                  'var(--font-geist-sans), var(--font-noto-sans-tc), sans-serif',
              }}
            >
              Lecture
            </p>

            <h1
              className="max-w-[900px] text-[56px] leading-none tracking-[-0.03em] md:text-[64px] lg:text-[72px]"
              style={{
                fontFamily:
                  'var(--font-playfair), var(--font-noto-serif-tc), serif',
                fontWeight: 600,
              }}
            >
              愛你卻不能夠給你我全部
              <br />
              談迴避型人格及其伴侶自處
            </h1>

            <p
              className="mt-8 max-w-[760px] text-[20px] leading-[1.5] tracking-[0.02em] text-[#4a4a4a] md:text-[22px]"
              style={{
                fontFamily:
                  'var(--font-playfair), var(--font-noto-serif-tc), serif',
                fontWeight: 500,
              }}
            >
              從親密關係中的退縮、抽離與降低回應出發，整理迴避型人格於關係中的互動樣態，並討論伴侶如何理解距離、失落與界線。
            </p>
          </div>
        </section>

        {/* 2. Metadata */}
        <section className="border-b border-[rgba(0,0,0,0.08)] py-[80px] md:py-[96px]">
          <div className="grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-x-16 lg:gap-x-20">
            {metadata.map((item) => (
              <div key={item.label} className="space-y-3">
                <p
                  className="text-[11px] uppercase leading-[1.2] tracking-[0.24em] text-[#9c9c9c]"
                  style={{
                    fontFamily:
                      'var(--font-geist-sans), var(--font-noto-sans-tc), sans-serif',
                    fontWeight: 500,
                  }}
                >
                  {item.label}
                </p>
                <p
                  className="text-[18px] leading-[1.3] text-[#1a1a1a]"
                  style={{
                    fontFamily:
                      'var(--font-geist-sans), var(--font-noto-sans-tc), sans-serif',
                    fontWeight: 450,
                  }}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Lecture Introduction */}
        <section className="border-b border-[rgba(0,0,0,0.08)] py-[120px]">
          <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-[minmax(0,680px)_1fr] lg:gap-x-20">
            <div className="max-w-[680px]">
              <p
                className="mb-8 text-[11px] uppercase tracking-[0.22em] text-[#9c9c9c]"
                style={{
                  fontFamily:
                    'var(--font-geist-sans), var(--font-noto-sans-tc), sans-serif',
                }}
              >
                Overview
              </p>

              <div
                className="space-y-6 text-[17px] leading-[1.6] text-[#1a1a1a] md:text-[18px]"
                style={{
                  fontFamily:
                    'var(--font-geist-sans), var(--font-noto-sans-tc), sans-serif',
                  fontWeight: 400,
                  letterSpacing: "0.01em",
                }}
              >
                <p>
                  本講座將以親密關係中的退縮與距離經驗為核心，整理迴避型人格在關係中的感受調節方式、回應模式與互動節奏，並處理伴侶常見的誤解、等待與耗竭經驗。
                </p>
                <p>
                  內容將從關係現場出發，聚焦沉默、抽離、降低表達、避免衝突與維持心理距離等現象，說明這些行為如何形成穩定而重複的關係配置。
                </p>
                <p>
                  講座也將討論伴侶如何在不過度逼近與不完全撤退之間，保留自我位置，同時維持對關係的理解能力。
                </p>
              </div>
            </div>

            <div className="max-w-[420px] lg:pt-12">
              <p
                className="mb-6 text-[11px] uppercase tracking-[0.22em] text-[#9c9c9c]"
                style={{
                  fontFamily:
                    'var(--font-geist-sans), var(--font-noto-sans-tc), sans-serif',
                }}
              >
                Topics
              </p>

              <ul
                className="space-y-4 text-[16px] leading-[1.5] text-[#1a1a1a]"
                style={{
                  fontFamily:
                    'var(--font-geist-sans), var(--font-noto-sans-tc), sans-serif',
                  letterSpacing: "0.01em",
                }}
              >
                {topics.map((topic) => (
                  <li
                    key={topic}
                    className="border-b border-[rgba(0,0,0,0.08)] pb-4"
                  >
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 4. Speaker */}
        <section className="border-b border-[rgba(0,0,0,0.08)] py-[120px]">
          <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-[minmax(260px,320px)_minmax(0,1fr)] lg:gap-x-20">
            <div>
              <div className="aspect-[4/5] w-full overflow-hidden border border-[rgba(0,0,0,0.08)] bg-[#f2efe9]">
                <img
                  src="https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80"
                  alt="Speaker portrait"
                  className="h-full w-full object-cover"
                />
              </div>
              <p
                className="mt-4 text-[12px] leading-[1.4] tracking-[0.04em] text-[#6b6b6b]"
                style={{
                  fontFamily:
                    'var(--font-geist-sans), var(--font-noto-sans-tc), sans-serif',
                }}
              >
                Lecture portrait / placeholder artwork
              </p>
            </div>

            <div className="max-w-[680px]">
              <p
                className="mb-6 text-[11px] uppercase tracking-[0.22em] text-[#9c9c9c]"
                style={{
                  fontFamily:
                    'var(--font-geist-sans), var(--font-noto-sans-tc), sans-serif',
                }}
              >
                Speaker
              </p>

              <h2
                className="text-[28px] leading-[1.2] tracking-[-0.01em] text-[#1a1a1a] md:text-[32px]"
                style={{
                  fontFamily:
                    'var(--font-playfair), var(--font-noto-serif-tc), serif',
                  fontWeight: 600,
                }}
              >
                講者姓名
              </h2>

              <p
                className="mt-4 text-[14px] uppercase tracking-[0.18em] text-[#6b6b6b]"
                style={{
                  fontFamily:
                    'var(--font-geist-sans), var(--font-noto-sans-tc), sans-serif',
                  fontWeight: 500,
                }}
              >
                Clinical Psychologist / Lecturer
              </p>

              <div
                className="mt-8 max-w-[640px] space-y-6 text-[16px] leading-[1.5] text-[#1a1a1a]"
                style={{
                  fontFamily:
                    'var(--font-geist-sans), var(--font-noto-sans-tc), sans-serif',
                  letterSpacing: "0.01em",
                }}
              >
                <p>
                  研究與實務工作聚焦於人格組織、親密關係互動、情緒經驗與治療歷程分析。長期關注退縮、疏離、依附需求與關係調節之間的互動問題。
                </p>
                <p>
                  本場講座將以臨床觀察、關係經驗與心理治療脈絡交互整理，協助參與者理解迴避型人格在親密關係中的位置，以及伴侶如何建立較可承受的互動方式。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Registration + Related Events */}
        <section className="py-[120px]">
          <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-x-20">
            <div>
              <p
                className="mb-6 text-[11px] uppercase tracking-[0.22em] text-[#9c9c9c]"
                style={{
                  fontFamily:
                    'var(--font-geist-sans), var(--font-noto-sans-tc), sans-serif',
                }}
              >
                Registration
              </p>

              <h3
                className="max-w-[360px] text-[28px] leading-[1.2] tracking-[-0.01em]"
                style={{
                  fontFamily:
                    'var(--font-playfair), var(--font-noto-serif-tc), serif',
                  fontWeight: 600,
                }}
              >
                報名本場講座
              </h3>

              <p
                className="mt-6 max-w-[360px] text-[16px] leading-[1.5] text-[#6b6b6b]"
                style={{
                  fontFamily:
                    'var(--font-geist-sans), var(--font-noto-sans-tc), sans-serif',
                  letterSpacing: "0.01em",
                }}
              >
                名額有限。完成報名後，系統將寄送活動資訊與入場通知。
              </p>

              <div className="mt-10">
                <Link
                  href="/lecture-registration"
                  className="inline-flex items-center border border-[#1a1a1a] bg-[#f6f3ee] px-6 py-[14px] text-[14px] uppercase tracking-[0.12em] text-[#1a1a1a] transition-colors duration-200 hover:bg-[#1a1a1a] hover:text-[#f6f3ee]"
                  style={{
                    fontFamily:
                      'var(--font-geist-sans), var(--font-noto-sans-tc), sans-serif',
                    fontWeight: 500,
                  }}
                >
                  Register
                </Link>
              </div>
            </div>

            <div>
              <p
                className="mb-6 text-[11px] uppercase tracking-[0.22em] text-[#9c9c9c]"
                style={{
                  fontFamily:
                    'var(--font-geist-sans), var(--font-noto-sans-tc), sans-serif',
                }}
              >
                Related Events
              </p>

              <div className="grid grid-cols-1 gap-y-10">
                {relatedEvents.map((event) => (
                  <Link
                    key={event.href}
                    href={event.href}
                    className="block border-t border-[rgba(0,0,0,0.08)] pt-6"
                  >
                    <p
                      className="mb-3 text-[11px] uppercase tracking-[0.22em] text-[#9c9c9c]"
                      style={{
                        fontFamily:
                          'var(--font-geist-sans), var(--font-noto-sans-tc), sans-serif',
                      }}
                    >
                      {event.label}
                    </p>
                    <h4
                      className="text-[24px] leading-[1.2] tracking-[-0.01em] text-[#1a1a1a]"
                      style={{
                        fontFamily:
                          'var(--font-playfair), var(--font-noto-serif-tc), serif',
                        fontWeight: 600,
                      }}
                    >
                      {event.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}