import { NextResponse } from "next/server";

// Research participation is collected only by each project's Google Form.
export async function POST() {
  return NextResponse.json(
    { message: "研究登記已改由專屬 Google Form 處理。" },
    { status: 410 },
  );
}
