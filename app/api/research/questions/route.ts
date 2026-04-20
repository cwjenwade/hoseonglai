import { NextRequest, NextResponse } from "next/server";
import { getSiteContentSection } from "@/lib/site-content-server";
import {
  DEFAULT_PSYCHOMETRIC_SCALES,
  type PsychometricScale,
} from "@/app/collaborative-prosperity/assessment-data";
import {
  RESEARCH_PROJECTS,
  getResearchProjectAssessmentSourceId,
  normalizeResearchProjects,
} from "@/app/collaborative-prosperity/projects";

// Deprecated: retained for historical assessment clients.
// Current frontend participation entry is the project Google Form CTA.
export async function GET(req: NextRequest) {
  try {
    const projectId = (req.nextUrl.searchParams.get("projectId") || "").trim();
    if (!projectId) {
      return NextResponse.json({ message: "缺少 projectId" }, { status: 400 });
    }

    const scales = await getSiteContentSection(
      "collaborative_prosperity_assessments",
      DEFAULT_PSYCHOMETRIC_SCALES,
    );
    const rawProjects = await getSiteContentSection(
      "collaborative_prosperity_projects",
      RESEARCH_PROJECTS,
    );
    const projects = normalizeResearchProjects(rawProjects, RESEARCH_PROJECTS);
    const project = projects.find((item) => item.id === projectId);

    if (!project || project.status !== "quantitative") {
      return NextResponse.json(
        { message: "這個研究目前未開放心理量表流程" },
        { status: 400 },
      );
    }

    const scaleSourceId = getResearchProjectAssessmentSourceId(project);
    const matched = (scales as PsychometricScale[]).find(
      (scale) => scale.projectId === scaleSourceId,
    );
    if (!matched) {
      return NextResponse.json({
        ok: true,
        projectId: scaleSourceId || projectId,
        projectTitleZh: project.title,
        projectTitleEn: project.subtitle,
        scalePrompt: "請依照實際情況作答。",
        options: ["非常不同意", "不同意", "普通", "同意", "非常同意"],
        questions: [],
      });
    }

    return NextResponse.json({
      ok: true,
      projectId: matched.projectId,
      projectTitleZh: matched.projectTitleZh,
      projectTitleEn: matched.projectTitleEn,
      scalePrompt: matched.scalePrompt,
      options: matched.options,
      questions: matched.questions,
    });
  } catch (error) {
    console.error("RESEARCH_QUESTIONS_ERROR", error);
    return NextResponse.json({ message: "系統錯誤" }, { status: 500 });
  }
}
