"use client";

import { useMemo, useState } from "react";
import {
  normalizeBrandPageContent,
  type BrandPageContent,
} from "@/app/brand-philosophy/brand-content";
import type { TeamMember, TeamSection, TeamSectionId } from "@/app/brand-philosophy/team-data";
import { EditorSection } from "./ui/EditorSection";
import { GovernanceFields } from "./ui/GovernanceFields";

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
    sectionId: "strategic_creative_team",
  };
}

export default function BrandEditor({ initialContent, uploadedUrl }: BrandEditorProps) {
  const normalizedContent = normalizeBrandPageContent(initialContent);
  const [directorPhoto, setDirectorPhoto] = useState(normalizedContent.director.photo || "");
  const [directorNameZh, setDirectorNameZh] = useState(normalizedContent.director.nameZh || "");
  const [directorNameEn, setDirectorNameEn] = useState(normalizedContent.director.nameEn || "");
  const [affiliationLinesText, setAffiliationLinesText] = useState(
    (normalizedContent.director.affiliationLines || []).join("\n"),
  );
  const [introParagraphsText, setIntroParagraphsText] = useState(
    (normalizedContent.director.introParagraphs || []).join("\n\n"),
  );
  const [teamSections, setTeamSections] = useState<TeamSection[]>(normalizedContent.teamSections || []);
  const [members, setMembers] = useState<TeamMember[]>(normalizedContent.teamMembers || []);
  const [governance, setGovernance] = useState({
    isPublished: normalizedContent.isPublished !== false,
    displayOrder: normalizedContent.displayOrder || 0,
    updatedAt: normalizedContent.updatedAt || "",
    internalNote: normalizedContent.internalNote || "",
  });

  function updateMember(index: number, updates: Partial<TeamMember>) {
    setMembers((prev) => prev.map((member, i) => (i === index ? { ...member, ...updates } : member)));
  }

  function moveMemberWithinSection(index: number, direction: -1 | 1) {
    setMembers((prev) => {
      const currentMember = prev[index];
      if (!currentMember) return prev;

      const sectionIndexes = prev.reduce<number[]>((acc, member, memberIndex) => {
        if (member.sectionId === currentMember.sectionId) {
          acc.push(memberIndex);
        }
        return acc;
      }, []);

      const currentPosition = sectionIndexes.indexOf(index);
      const targetIndex = sectionIndexes[currentPosition + direction];
      if (targetIndex == null) return prev;

      const next = [...prev];
      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
      return next;
    });
  }

  function moveMemberToSection(index: number, sectionId: TeamSectionId) {
    setMembers((prev) => {
      const currentMember = prev[index];
      if (!currentMember) return prev;
      if (currentMember.sectionId === sectionId) return prev;

      const next = [...prev];
      const [movedMember] = next.splice(index, 1);
      next.push({ ...movedMember, sectionId });
      return next;
    });
  }

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
      ...governance,
      director: {
        photo: directorPhoto.trim(),
        nameZh: directorNameZh.trim(),
        nameEn: directorNameEn.trim(),
        affiliationLines,
        introParagraphs,
      },
      teamSections: teamSections.map((section) => ({
        id: section.id,
        title: section.title.trim(),
      })),
      teamMembers: members.map((member) => ({
        ...member,
        nameZh: member.nameZh.trim(),
        nameEn: member.nameEn.trim(),
        profession: member.profession.trim(),
        role: member.role.trim(),
        bio: member.bio.trim(),
        photo: member.photo.trim(),
      })),
    };
  }, [
    directorPhoto,
    directorNameZh,
    directorNameEn,
    affiliationLinesText,
    introParagraphsText,
    teamSections,
    members,
    governance,
  ]);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-zinc-900">Branding Director</h2>
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
            <p className="mt-1 text-sm text-zinc-600">可調整分類標題、人員職稱、照片與 row 內排序。</p>
          </div>
          <button
            type="button"
            onClick={() => setMembers((prev) => [...prev, createEmptyMember()])}
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100"
          >
            新增成員
          </button>
        </div>

        <div className="mt-5 space-y-6">
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
            <h3 className="text-sm font-semibold text-zinc-900">Team Row 標題</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {teamSections.map((section, index) => (
                <label key={section.id} className="text-xs text-zinc-700">
                  Row {index + 2} 標題
                  <input
                    value={section.title}
                    onChange={(e) =>
                      setTeamSections((prev) =>
                        prev.map((item) =>
                          item.id === section.id ? { ...item, title: e.target.value } : item,
                        ),
                      )
                    }
                    className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                  />
                </label>
              ))}
            </div>
          </div>

          {teamSections.map((section) => {
            const sectionMembers = members
              .map((member, index) => ({ member, index }))
              .filter(({ member }) => member.sectionId === section.id);

            return (
              <section key={section.id} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900">{section.title || "未命名分類"}</h3>
                    <p className="mt-1 text-xs text-zinc-600">在這個 row 內可直接調整成員順序與職稱。</p>
                  </div>
                  <span className="rounded-full border border-zinc-300 px-3 py-1 text-xs text-zinc-600">
                    {sectionMembers.length} 位成員
                  </span>
                </div>

                <div className="mt-4 space-y-4">
                  {sectionMembers.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-zinc-300 bg-white px-4 py-6 text-sm text-zinc-500">
                      目前這個分類還沒有成員，可從其他分類切換過來或新增成員。
                    </div>
                  ) : null}

                  {sectionMembers.map(({ member, index }, position) => (
                    <article key={member.id || index} className="rounded-2xl border border-zinc-200 bg-white p-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Position {position + 1}</p>
                          <p className="mt-1 text-sm font-medium text-zinc-900">
                            {member.nameZh || member.nameEn || "未命名成員"}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => moveMemberWithinSection(index, -1)}
                            disabled={position === 0}
                            className="rounded-full border border-zinc-300 px-3 py-1 text-xs text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            上移
                          </button>
                          <button
                            type="button"
                            onClick={() => moveMemberWithinSection(index, 1)}
                            disabled={position === sectionMembers.length - 1}
                            className="rounded-full border border-zinc-300 px-3 py-1 text-xs text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            下移
                          </button>
                          <button
                            type="button"
                            onClick={() => setMembers((prev) => prev.filter((_, i) => i !== index))}
                            className="rounded-full border border-red-200 px-3 py-1 text-xs text-red-600 transition hover:bg-red-50"
                          >
                            刪除
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 grid gap-3 md:grid-cols-2">
                        <label className="text-xs text-zinc-700">
                          中文姓名
                          <input
                            value={member.nameZh}
                            onChange={(e) => updateMember(index, { nameZh: e.target.value })}
                            className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                          />
                        </label>
                        <label className="text-xs text-zinc-700">
                          英文姓名
                          <input
                            value={member.nameEn}
                            onChange={(e) => updateMember(index, { nameEn: e.target.value })}
                            className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                          />
                        </label>
                      </div>

                      <div className="mt-3 grid gap-3 md:grid-cols-3">
                        <label className="text-xs text-zinc-700">
                          類別 / Row
                          <select
                            value={member.sectionId}
                            onChange={(e) => moveMemberToSection(index, e.target.value as TeamSectionId)}
                            className="mt-1 h-10 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm outline-none focus:border-amber-400"
                          >
                            {teamSections.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.title}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className="text-xs text-zinc-700">
                          職稱 / Position
                          <input
                            value={member.role}
                            onChange={(e) => updateMember(index, { role: e.target.value })}
                            className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                            placeholder="Founding Partner / Strategist / Coordinator"
                          />
                        </label>

                        <label className="text-xs text-zinc-700">
                          專業
                          <input
                            value={member.profession}
                            onChange={(e) => updateMember(index, { profession: e.target.value })}
                            className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                          />
                        </label>
                      </div>

                      <div className="mt-3 grid gap-3 md:grid-cols-[1fr_auto]">
                        <label className="text-xs text-zinc-700">
                          照片路徑
                          <input
                            value={member.photo}
                            onChange={(e) => updateMember(index, { photo: e.target.value })}
                            className="mt-1 h-10 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-amber-400"
                          />
                        </label>
                        {uploadedUrl ? (
                          <button
                            type="button"
                            onClick={() => updateMember(index, { photo: uploadedUrl })}
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
                          onChange={(e) => updateMember(index, { bio: e.target.value })}
                          className="mt-1 h-24 w-full rounded-lg border border-zinc-300 p-3 text-sm outline-none focus:border-amber-400"
                        />
                      </label>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <EditorSection title="管理設定">
        <GovernanceFields
          value={governance}
          onChange={(updates) => setGovernance((prev) => ({ ...prev, ...updates }))}
        />
      </EditorSection>

      <input type="hidden" name="payload" value={JSON.stringify(payload)} />
    </div>
  );
}
