import type { MetadataRoute } from "next";
import { getSiteContentSection } from "@/lib/site-content-server";
import { LECTURES, type LectureItem } from "./fortune-arrives/lectures-data";
import { GROUPS, isGroupVisible, type GroupItem } from "./togetherness/group-data";
import {
  RESEARCH_PROJECTS,
  normalizeResearchProjects,
  type ResearchProject,
} from "./collaborative-prosperity/projects";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

function sitemapEntry(
  route: string,
  priority: number,
): MetadataRoute.Sitemap[number] {
  return {
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [rawLectures, rawGroups, rawProjects] = await Promise.all([
    getSiteContentSection<LectureItem[]>("fortune_arrives_lectures", LECTURES),
    getSiteContentSection<GroupItem[]>("togetherness_groups", GROUPS),
    getSiteContentSection<ResearchProject[]>(
      "collaborative_prosperity_projects",
      RESEARCH_PROJECTS,
    ),
  ]);
  const lectures = Array.isArray(rawLectures) ? rawLectures : LECTURES;
  const groups = (Array.isArray(rawGroups) ? rawGroups : GROUPS).filter(isGroupVisible);
  const projects = normalizeResearchProjects(rawProjects, RESEARCH_PROJECTS);
  const topLevelRoutes = [
    "/",
    "/brand-philosophy",
    "/heartfelt-momentum",
    "/fortune-arrives",
    "/togetherness",
    "/collaborative-prosperity",
  ];

  return [
    ...topLevelRoutes.map((route) => sitemapEntry(route, route === "/" ? 1 : 0.7)),
    ...lectures.map((lecture) =>
      sitemapEntry(`/fortune-arrives/${lecture.slug}`, 0.5),
    ),
    ...groups.map((group) => sitemapEntry(`/togetherness/${group.slug}`, 0.5)),
    ...projects.map((project) =>
      sitemapEntry(`/collaborative-prosperity/${project.id}`, 0.5),
    ),
  ];
}
