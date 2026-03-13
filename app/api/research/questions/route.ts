import { NextRequest, NextResponse } from "next/server";
import { getSiteContentSection } from "@/lib/site-content-server";
import {
  DEFAULT_PSYCHOMETRIC_SCALES,
  type PsychometricScale,
} from "@/app/collaborative-prosperity/assessment-data";

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

    const matched = (scales as PsychometricScale[]).find((scale) => scale.projectId === projectId);
    if (!matched) {
      return NextResponse.json({
        ok: true,
        projectId,
        projectTitleZh: projectId,
        projectTitleEn: projectId,
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
