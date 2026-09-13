import { NextResponse } from "next/server";

// Research assessments are no longer collected by this application.
export async function POST() {
  return NextResponse.json(
    { message: "研究測驗已改由專屬 Google Form 處理。" },
    { status: 410 },
  );
}
