import Image from "next/image";

type Member = {
  id: string | number;
  nameZh: string;
  nameEn?: string;
  profession?: string;
  role?: string;
  bio?: string;
  photo?: string;
  color?: string;
};

export default function TeamCard({ member }: { member: Member }) {
  return (
    <article className="group h-full w-full bg-transparent">
      <div className="flex h-full flex-col">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#ece7dd]">
          {member.photo ? (
            <Image
              src={member.photo}
              alt={member.nameZh}
              fill
              className="object-cover grayscale-[8%] transition duration-700 group-hover:scale-[1.015]"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center px-6 text-center text-[0.68rem] uppercase tracking-[0.24em] text-zinc-400"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Team Member Portrait
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.08),rgba(0,0,0,0))]" />
        </div>

        <div className="border-t border-zinc-200/80 px-4 pb-5 pt-4 sm:px-5">
          {member.role ? (
            <p
              className="text-[0.64rem] uppercase tracking-[0.24em] text-zinc-400"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              {member.role}
            </p>
          ) : null}

          <div className="mt-3 space-y-1">
            <h3
              className="text-[1.55rem] leading-none tracking-[-0.045em] text-zinc-950"
              style={{ fontFamily: "var(--font-noto-serif)" }}
            >
              {member.nameZh}
            </h3>

            {member.nameEn ? (
              <p
                className="text-[0.9rem] uppercase tracking-[0.2em] text-zinc-500"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                {member.nameEn}
              </p>
            ) : null}
          </div>

          {member.bio ? (
            <p
              className="mt-5 text-[0.98rem] leading-[1.85] text-zinc-600"
              style={{ fontFamily: "var(--font-noto-serif)" }}
            >
              {member.bio}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}