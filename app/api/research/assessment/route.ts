import { NextRequest, NextResponse } from "next/server";
import { verifyResearchToken } from "@/lib/research-token";
import { sendResearchCompletionEmail } from "@/lib/email";
import { getSiteContentSection } from "@/lib/site-content-server";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";
import { enforceRateLimit, getRequestIp } from "@/lib/rate-limit";
import {
  getResearchRegistrationById,
  parseResearchRegistrationMeta,
} from "@/lib/research-registration";
import {
  DEFAULT_RESEARCH_CONSENTS,
  type ResearchConsent,
} from "@/app/collaborative-prosperity/consent-data";
import {
  getResearchProjectConsentSourceId,
  RESEARCH_PROJECTS,
  normalizeResearchProjects,
} from "@/app/collaborative-prosperity/projects";

type SubmitPayload = {
  token: string;
  projectId: string;
  answers: number[];
};

export async function POST(req: NextRequest) {
  try {
    const ip = getRequestIp(req);
    const rateLimit = await enforceRateLimit({
      scope: "research_assessment",
      identifier: ip,
      maxRequests: 30,
      windowMs: 15 * 60 * 1000,
    });

    if (!rateLimit.ok) {
      return NextResponse.json(
        { message: "請稍後再試，送出過於頻繁。" },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfterSeconds),
          },
        },
      );
    }

    const body = (await req.json()) as SubmitPayload;
    const { token, projectId, answers } = body;

    if (!token || !projectId || !Array.isArray(answers) || answers.length === 0) {
      return NextResponse.json({ message: "缺少必要欄位" }, { status: 400 });
    }

    const payload = verifyResearchToken(token);
    if (!payload || payload.projectId !== projectId) {
      return NextResponse.json({ message: "驗證失敗" }, { status: 401 });
    }

    const registration = await getResearchRegistrationById(payload.registrationId);
    const meta = parseResearchRegistrationMeta(registration?.interest_note);

    if (!registration || meta?.projectId !== projectId) {
      return NextResponse.json({ message: "找不到研究資料" }, { status: 404 });
    }

    const supabase = getSupabaseAdminClient();

    const answerColumns = Object.fromEntries(
      answers.map((value, index) => [String(index + 1).padStart(3, "0"), value])
    );

    const { error } = await supabase.from("psych_test_results").insert({
      test_id: payload.projectId,
      test_title: `${registration.video_title} | ${payload.participantCode}`,
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
      const rawProjects = await getSiteContentSection(
        "collaborative_prosperity_projects",
        RESEARCH_PROJECTS,
      );
      const projects = normalizeResearchProjects(rawProjects, RESEARCH_PROJECTS);
      const project = projects.find((item) => item.id === payload.projectId);
      const consentSourceId = project
        ? getResearchProjectConsentSourceId(project)
        : payload.projectId;
      const mappedConsent =
        consents.find((consent) => consent.projectId === consentSourceId) ||
        DEFAULT_RESEARCH_CONSENTS.find((consent) => consent.projectId === consentSourceId);

      await sendResearchCompletionEmail({
        to: registration.user_email,
        name: registration.user_name,
        participantCode: payload.participantCode,
        projectTitleZh: mappedConsent?.projectTitleZh || registration.video_title,
        projectTitleEn: mappedConsent?.projectTitleEn || registration.video_title,
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
