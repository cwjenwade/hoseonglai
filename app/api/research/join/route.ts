import { NextRequest, NextResponse } from "next/server";
import { sendResearchJoinEmail } from "@/lib/email";
import { signResearchToken } from "@/lib/research-token";

type JoinPayload = {
  projectId: string;
  projectTitle: string;
  projectTestUrl: string;
  name: string;
  email: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as JoinPayload;

    const { projectId, projectTitle, projectTestUrl, name, email } = body;

    if (!projectId || !projectTitle || !projectTestUrl || !name || !email) {
      return NextResponse.json(
        { message: "缺少必要欄位" },
        { status: 400 }
      );
    }

    const token = signResearchToken({
      projectId,
      projectTitle,
      projectTestUrl,
      name,
      email,
    });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const startUrl = `${siteUrl}/research/start?token=${encodeURIComponent(
      token
    )}`;

    await sendResearchJoinEmail({
      to: email,
      name,
      projectTitle,
      startUrl,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("JOIN_RESEARCH_ERROR", error);

    return NextResponse.json(
      { message: "目前無法寄送信件，請稍後再試。" },
      { status: 500 }
    );
  }
}