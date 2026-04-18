import { NextRequest, NextResponse } from "next/server";
import { verifyResearchToken } from "@/lib/research-token";
import {
  getResearchRegistrationById,
  parseResearchRegistrationMeta,
} from "@/lib/research-registration";
import { enforceRateLimit, getRequestIp } from "@/lib/rate-limit";

export async function GET(req: NextRequest) {
  try {
    const ip = getRequestIp(req);
    const rateLimit = await enforceRateLimit({
      scope: "research_session",
      identifier: ip,
      maxRequests: 60,
      windowMs: 15 * 60 * 1000,
    });

    if (!rateLimit.ok) {
      return NextResponse.json(
        { message: "請稍後再試，驗證過於頻繁。" },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfterSeconds),
          },
        },
      );
    }

    const token = req.nextUrl.searchParams.get("token") || "";
    const payload = verifyResearchToken(token);

    if (!payload) {
      return NextResponse.json({ message: "無效連結" }, { status: 400 });
    }

    const registration = await getResearchRegistrationById(payload.registrationId);
    const meta = parseResearchRegistrationMeta(registration?.interest_note);

    if (!registration || meta?.projectId !== payload.projectId) {
      return NextResponse.json({ message: "找不到研究資料" }, { status: 404 });
    }

    return NextResponse.json({
      ok: true,
      payload: {
        participantCode: payload.participantCode,
        name: registration.user_name,
        projectId: payload.projectId,
        projectTitle: registration.video_title,
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
