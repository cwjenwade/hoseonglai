"use client";

import { useMemo, useState } from "react";
import type { BrandPageContent } from "@/app/brand-philosophy/brand-content";
import type { TeamMember } from "@/app/brand-philosophy/team-data";

type BrandEditorProps = {
  initialContent: BrandPageContent;
  uploadedUrl?: string;
};

function createEmptyMember(): TeamMember {
  const seed = Date.now().toString(36);
  return {
    id: `member-${seed}`,
    nameZh: "",
    nameEn: "",
    profession: "",
    role: "",
    bio: "",
    photo: "",
    color: "from-zinc-500 to-zinc-600",
  };
}

export default function BrandEditor({ initialContent, uploadedUrl }: BrandEditorProps) {
  const [directorPhoto, setDirectorPhoto] = useState(initialContent.director.photo || "");
  const [directorNameZh, setDirectorNameZh] = useState(initialContent.director.nameZh || "");
  const [directorNameEn, setDirectorNameEn] = useState(initialContent.director.nameEn || "");
  const [affiliationLinesText, setAffiliationLinesText] = useState(
    (initialContent.director.affiliationLines || []).join("\n"),
  );
  const [introParagraphsText, setIntroParagraphsText] = useState(
    (initialContent.director.introParagraphs || []).join("\n\n"),
  );
  const [members, setMembers] = useState<TeamMember[]>(initialContent.teamMembers || []);

  const payload = useMemo<BrandPageContent>(() => {
    const affiliationLines = affiliationLinesText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const introParagraphs = introParagraphsText
      .split(/\n\s*\n/g)
      .map((line) => line.trim())
      .filter(Boolean);

    return {
      director: {
        photo: directorPhoto.trim(),
        nameZh: directorNameZh.trim(),
        nameEn: directorNameEn.trim(),
        affiliationLines,
        introParagraphs,
      },
      teamMembers: members,
    };
  }, [directorPhoto, directorNameZh, directorNameEn, affiliationLinesText, introParagraphsText, members]);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-zinc-900">Brand Director</h2>
        <p className="mt-1 text-sm text-zinc-600">照片、姓名、學歷與介紹段落。</p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="text-sm text-zinc-700">
            照片路徑
            <input
              value={directorPhoto}
              onChange={(e) => setDirectorPhoto(e.target.value)}
              className="mt-2 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
              placeholder="/uploads/content/brand_philosophy_page/xxx.png"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm text-zinc-700">
              中文姓名
              <input
                value={directorNameZh}
                onChange={(e) => setDirectorNameZh(e.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
              />
            </label>
            <label className="text-sm text-zinc-700">
              英文姓名
              <input
                value={directorNameEn}
                onChange={(e) => setDirectorNameEn(e.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
              />
            </label>
          </div>
        </div>

        {uploadedUrl ? (
          <div className="mt-3 flex flex-wrap items-center gap-3 rounded-xl border border-sky-200 bg-sky-50 p-3 text-xs text-sky-700">
            <span>最新上傳：{uploadedUrl}</span>
            <button
              type="button"
              onClick={() => setDirectorPhoto(uploadedUrl)}
              className="rounded-full border border-sky-300 px-3 py-1 transition hover:bg-sky-100"
            >
              套用到 Director 照片
            </button>
          </div>
        ) : null}

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="text-sm text-zinc-700">
            學歷 / 經歷（每行一筆）
            <textarea
              value={affiliationLinesText}
              onChange={(e) => setAffiliationLinesText(e.target.value)}
              className="mt-2 h-44 w-full rounded-xl border border-zinc-300 p-3 text-sm outline-none focus:border-amber-400"
            />
          </label>

          <label className="text-sm text-zinc-700">
            介紹（段落間空一行）
            <textarea
              value={introParagraphsText}
              onChange={(e) => setIntroParagraphsText(e.target.value)}
              className="mt-2 h-44 w-full rounded-xl border border-zinc-300 p-3 text-sm outline-none focus:border-amber-400"
            />
          </label>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">Team Members</h2>
            <p className="mt-1 text-sm text-zinc-600">可新增、刪除、修改每位成員欄位。</p>
          </div>
          <button
            type="button"
            onClick={() => setMembers((prev) => [...prev, createEmptyMember()])}
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100"
          >
            新增成員
          </button>
        </div>

        <div className="mt-5 space-y-4">
          {members.map((member, index) => (
            <article key={member.id || index} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <div className="grid gap-3 md:grid-cols-3">
                <label className="text-xs text-zinc-700">
                  ID
                  <input
                    value={member.id}
                    onChange={(e) =>
                      setMembers((prev) =>
                        prev.map((m, i) => (i === index ? { ...m, id: e.target.value } : m)),
                      )
                    }
                    className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                  />
                </label>
                <label className="text-xs text-zinc-700">
                  中文姓名
                  <input
                    value={member.nameZh}
                    onChange={(e) =>
                      setMembers((prev) =>
                        prev.map((m, i) => (i === index ? { ...m, nameZh: e.target.value } : m)),
                      )
                    }
                    className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                  />
                </label>
                <label className="text-xs text-zinc-700">
                  英文姓名
                  <input
                    value={member.nameEn}
                    onChange={(e) =>
                      setMembers((prev) =>
                        prev.map((m, i) => (i === index ? { ...m, nameEn: e.target.value } : m)),
                      )
                    }
                    className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                  />
                </label>
              </div>

              <div className="mt-3 grid gap-3 md:grid-cols-3">
                <label className="text-xs text-zinc-700">
                  專業
                  <input
                    value={member.profession}
                    onChange={(e) =>
                      setMembers((prev) =>
                        prev.map((m, i) => (i === index ? { ...m, profession: e.target.value } : m)),
                      )
                    }
                    className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                  />
                </label>
                <label className="text-xs text-zinc-700">
                  角色
                  <input
                    value={member.role}
                    onChange={(e) =>
                      setMembers((prev) => prev.map((m, i) => (i === index ? { ...m, role: e.target.value } : m)))
                    }
                    className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                  />
                </label>
                <label className="text-xs text-zinc-700">
                  顏色 Class
                  <input
                    value={member.color}
                    onChange={(e) =>
                      setMembers((prev) => prev.map((m, i) => (i === index ? { ...m, color: e.target.value } : m)))
                    }
                    className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                  />
                </label>
              </div>

              <div className="mt-3 grid gap-3 md:grid-cols-[1fr_auto]">
                <label className="text-xs text-zinc-700">
                  照片路徑
                  <input
                    value={member.photo}
                    onChange={(e) =>
                      setMembers((prev) => prev.map((m, i) => (i === index ? { ...m, photo: e.target.value } : m)))
                    }
                    className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                  />
                </label>
                {uploadedUrl ? (
                  <button
                    type="button"
                    onClick={() =>
                      setMembers((prev) => prev.map((m, i) => (i === index ? { ...m, photo: uploadedUrl } : m)))
                    }
                    className="mt-5 rounded-full border border-sky-300 px-3 py-2 text-xs text-sky-700 transition hover:bg-sky-100"
                  >
                    套用最新上傳
                  </button>
                ) : null}
              </div>

              <label className="mt-3 block text-xs text-zinc-700">
                介紹
                <textarea
                  value={member.bio}
                  onChange={(e) =>
                    setMembers((prev) => prev.map((m, i) => (i === index ? { ...m, bio: e.target.value } : m)))
                  }
                  className="mt-1 h-24 w-full rounded-lg border border-zinc-300 p-3 text-sm outline-none focus:border-amber-400"
                />
              </label>

              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => setMembers((prev) => prev.filter((_, i) => i !== index))}
                  className="rounded-full border border-red-200 px-3 py-1 text-xs text-red-600 transition hover:bg-red-50"
                >
                  刪除成員
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <input type="hidden" name="payload" value={JSON.stringify(payload)} />
    </div>
  );
}
