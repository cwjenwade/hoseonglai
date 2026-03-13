import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifyResearchToken } from "@/lib/research-token";
import { sendResearchCompletionEmail } from "@/lib/email";
import { getSiteContentSection } from "@/lib/site-content-server";
import {
  DEFAULT_RESEARCH_CONSENTS,
  type ResearchConsent,
} from "@/app/collaborative-prosperity/consent-data";

type SubmitPayload = {
  token: string;
  projectId: string;
  answers: number[];
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SubmitPayload;
    const { token, projectId, answers } = body;

    if (!token || !projectId || !Array.isArray(answers) || answers.length === 0) {
      return NextResponse.json({ message: "缺少必要欄位" }, { status: 400 });
    }

    const payload = verifyResearchToken(token);
    if (!payload || payload.projectId !== projectId) {
      return NextResponse.json({ message: "驗證失敗" }, { status: 401 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { message: "Supabase 環境變數未設定" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const answerColumns = Object.fromEntries(
      answers.map((value, index) => [String(index + 1).padStart(3, "0"), value])
    );

    const { error } = await supabase.from("psych_test_results").insert({
      test_id: payload.projectId,
      test_title: `${payload.projectTitle} | ${payload.participantCode}`,
      user_name: payload.participantCode,
      user_email: "ADMIN_ONLY",
      answers,
      total_score: answers.reduce((sum, value) => sum + Number(value || 0), 0),
    });

    if (error) {
      console.error("ASSESSMENT_INSERT_ERROR", error);
      return NextResponse.json(
        { message: "無法儲存測驗結果" },
        { status: 500 }
      );
    }

    const { error: answerMapError } = await supabase
      .from("psych_test_answer_columns")
      .insert({
        test_id: payload.projectId,
        participant_code: payload.participantCode,
        answer_map: answerColumns,
      });

    if (answerMapError) {
      console.error("ASSESSMENT_ANSWER_MAP_INSERT_ERROR", answerMapError);
    }

    try {
      const consents = await getSiteContentSection<ResearchConsent[]>(
        "collaborative_prosperity_consents",
        DEFAULT_RESEARCH_CONSENTS,
      );
      const mappedConsent =
        consents.find((consent) => consent.projectId === payload.projectId) ||
        DEFAULT_RESEARCH_CONSENTS.find((consent) => consent.projectId === payload.projectId);

      await sendResearchCompletionEmail({
        to: payload.email,
        name: payload.name,
        participantCode: payload.participantCode,
        projectTitleZh: mappedConsent?.projectTitleZh || payload.projectTitle,
        projectTitleEn: mappedConsent?.projectTitleEn || payload.projectTitle,
        principalInvestigator: mappedConsent?.principalInvestigator || "待填寫",
        researchUnit: mappedConsent?.researchUnit || "Ho-Se 好勢旺來研究團隊",
        researchDescription:
          mappedConsent?.researchDescription || "本研究旨在了解受試者之心理狀態與經驗，填答資料僅供研究使用。",
      });
    } catch (emailError) {
      console.error("ASSESSMENT_COMPLETION_EMAIL_ERROR", emailError);
    }

    return NextResponse.json({
      ok: true,
      participantCode: payload.participantCode,
      answerColumns,
    });
  } catch (error) {
    console.error("ASSESSMENT_SUBMIT_ERROR", error);
    return NextResponse.json({ message: "系統錯誤" }, { status: 500 });
  }
}
