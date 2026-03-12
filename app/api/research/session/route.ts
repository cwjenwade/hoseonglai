import { NextRequest, NextResponse } from "next/server";
import { verifyResearchToken } from "@/lib/research-token";

export async function GET(req: NextRequest) {
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
}
