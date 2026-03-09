"use client";

import { TeamMember } from "./team-data";
import Image from "next/image";

type TeamCardProps = {
  member: TeamMember;
};

export default function TeamCard({ member }: TeamCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-lg hover:border-amber-200">
      {/* 大頭照區域 */}
      <div className="relative h-96 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <Image
          src={member.photo}
          alt={`${member.nameZh} ${member.nameEn}`}
          width={400}
          height={400}
          className="h-full w-full object-cover transition group-hover:scale-105"
          priority={false}
        />
        {/* 背景漸層疊加 */}
        <div className={`absolute inset-0 bg-gradient-to-t ${member.color} opacity-0 transition group-hover:opacity-10`} />
      </div>

      {/* 信息區域 */}
      <div className="space-y-4 p-6">
        {/* 名字 */}
        <div>
          <h3 className="text-2xl font-bold text-zinc-900">{member.nameZh}</h3>
          <p className="text-sm text-zinc-600">{member.nameEn}</p>
        </div>

        {/* 專業 & 職位 */}
        <div className="flex gap-2">
          <span className={`inline-block rounded-full bg-gradient-to-r ${member.color} px-3 py-1 text-xs font-semibold text-white`}>
            {member.profession}
          </span>
          <span className="inline-block rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
            {member.role}
          </span>
        </div>

        {/* 自我介紹 */}
        <p className="leading-7 text-zinc-600">
          {member.bio}
        </p>
      </div>
    </article>
  );
}
