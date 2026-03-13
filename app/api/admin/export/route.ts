import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase-server";

const ALLOWED_TABLES = new Map<string, string>([
  ["lecture_registrations", "lecture_registrations"],
  ["group_registrations", "group_registrations"],
  ["research_registrations", "research_registrations"],
  ["psych_test_results", "psych_test_results"],
  ["newsletter_subscribers", "newsletter_subscribers"],
]);

const PAGE_SIZE = 1000;

type RowData = Record<string, unknown>;

function safeString(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return String(value);
}

function normalizeAnswerMap(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return Object.entries(value as Record<string, unknown>).reduce<Record<string, unknown>>(
    (acc, [key, entryValue]) => {
      acc[String(key)] = entryValue;
      return acc;
    },
    {},
  );
}

function answerMapFromArray(answers: unknown): Record<string, unknown> {
  if (!Array.isArray(answers)) return {};

  return Object.fromEntries(
    answers.map((value, index) => [String(index + 1).padStart(3, "0"), value]),
  );
}

function parseResearchMeta(value: unknown): { projectId?: string } | null {
  if (typeof value !== "string" || !value.trim()) return null;

  try {
    const parsed = JSON.parse(value) as { projectId?: unknown };
    return {
      projectId: typeof parsed.projectId === "string" ? parsed.projectId : undefined,
    };
  } catch {
    return null;
  }
}

async function fetchAllRows(
  supabase: Awaited<ReturnType<typeof getSupabaseServerClient>>,
  table: string,
) {
  const rows: RowData[] = [];
  let from = 0;

  while (true) {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order("created_at", { ascending: false })
      .range(from, from + PAGE_SIZE - 1);

    if (error) {
      return { rows: [] as RowData[], error: error.message };
    }

    const chunk = (data || []) as RowData[];
    rows.push(...chunk);

    if (chunk.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }

  return { rows, error: null as string | null };
}

function sanitizeFilenamePart(value: string): string {
  return value.replace(/[^a-zA-Z0-9_-]+/g, "_").slice(0, 64);
}

function csvEscape(value: unknown): string {
  if (value === null || value === undefined) return "";
  const str = typeof value === "string" ? value : JSON.stringify(value);
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET(req: NextRequest) {
  const tableParam = req.nextUrl.searchParams.get("table") || "";
  const table = ALLOWED_TABLES.get(tableParam);
  const scope = req.nextUrl.searchParams.get("scope") || "all";
  const project = (req.nextUrl.searchParams.get("project") || "").trim();

  if (!table) {
    return NextResponse.json({ message: "Invalid table" }, { status: 400 });
  }

  if (scope !== "all" && scope !== "project") {
    return NextResponse.json({ message: "Invalid scope" }, { status: 400 });
  }

  if (scope === "project" && !project) {
    return NextResponse.json({ message: "Missing project" }, { status: 400 });
  }

  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { data: adminRow } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!adminRow) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { rows: allRows, error } = await fetchAllRows(supabase, table);

  if (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }

  let rows = allRows;

  if (scope === "project") {
    if (table === "lecture_registrations") {
      rows = allRows.filter((row) => safeString(row.lecture_id) === project);
    } else if (table === "group_registrations") {
      rows = allRows.filter((row) => safeString(row.group_slug) === project);
    } else if (table === "research_registrations") {
      rows = allRows.filter((row) => {
        const meta = parseResearchMeta(row.interest_note);
        const projectId = meta?.projectId || "";
        const fallback = safeString(row.video_url);
        return projectId === project || fallback === project;
      });
    } else if (table === "psych_test_results") {
      rows = allRows.filter((row) => safeString(row.test_id) === project);
    }
  }

  if (table === "psych_test_results") {
    const { rows: answerRows, error: answerRowsError } = await fetchAllRows(
      supabase,
      "psych_test_answer_columns",
    );

    if (answerRowsError) {
      return NextResponse.json({ message: answerRowsError }, { status: 500 });
    }

    const answerLookup = new Map<string, Record<string, unknown>>();

    answerRows.forEach((item) => {
      const testId = safeString(item.test_id);
      if (scope === "project" && testId !== project) return;

      const participantCode = safeString(item.participant_code);
      const key = `${testId}::${participantCode}`;
      answerLookup.set(key, normalizeAnswerMap(item.answer_map));
    });

    const questionKeysSet = new Set<string>();
    const psychExportRows: RowData[] = rows.map((row) => {
      const testId = safeString(row.test_id);
      const participantCode = safeString(row.user_name);
      const answerKey = `${testId}::${participantCode}`;
      const answerMap = answerLookup.get(answerKey) || answerMapFromArray(row.answers);

      const answerColumns = Object.fromEntries(
        Object.entries(answerMap).map(([key, value]) => {
          const normalizedKey = `question_${String(key).padStart(3, "0")}`;
          questionKeysSet.add(normalizedKey);
          return [normalizedKey, value];
        }),
      );

      return {
        ...row,
        participant_code: participantCode,
        ...answerColumns,
      };
    });

    const questionColumns = Array.from(questionKeysSet).sort((a, b) => a.localeCompare(b));
    const baseColumns = [
      "id",
      "test_id",
      "test_title",
      "participant_code",
      "total_score",
      "created_at",
    ];
    const columns = [...baseColumns, ...questionColumns];
    const header = columns.join(",");
    const lines = psychExportRows.map((row) =>
      columns.map((col) => csvEscape((row as RowData)[col])).join(","),
    );
    const csv = [header, ...lines].join("\n");

    const filename =
      scope === "project"
        ? `${table}-${sanitizeFilenamePart(project)}-${new Date().toISOString().slice(0, 10)}.csv`
        : `${table}-${new Date().toISOString().slice(0, 10)}.csv`;

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "content-disposition": `attachment; filename=\"${filename}\"`,
        "cache-control": "no-store",
      },
    });
  }

  const columns = Array.from(
    rows.reduce((set, row) => {
      Object.keys(row).forEach((key) => set.add(key));
      return set;
    }, new Set<string>()),
  );

  const header = columns.join(",");
  const lines = rows.map((row) => columns.map((col) => csvEscape(row[col])).join(","));
  const csv = [header, ...lines].join("\n");

  const filename =
    scope === "project"
      ? `${table}-${sanitizeFilenamePart(project)}-${new Date().toISOString().slice(0, 10)}.csv`
      : `${table}-${new Date().toISOString().slice(0, 10)}.csv`;

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename=\"${filename}\"`,
      "cache-control": "no-store",
    },
  });
}
