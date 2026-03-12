import { NextRequest, NextResponse } from "next/server";
import { verifyResearchToken } from "@/lib/research-token";

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token") || "";
    const payload = verifyResearchToken(token);

    if (!payload) {
      return NextResponse.json({ message: "無效連結" }, { status: 400 });
    }

    return NextResponse.json({
      ok: true,
      payload: {
        participantCode: payload.participantCode,
        name: payload.name,
        projectId: payload.projectId,
        projectTitle: payload.projectTitle,
      },
    });
  } catch (error) {
    console.error("RESEARCH_SESSION_ERROR", error);
    return NextResponse.json(
      { message: "系統錯誤" },
      { status: 500 },
    );
  }
}
