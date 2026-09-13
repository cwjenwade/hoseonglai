import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { message: "研究題目已改由專屬 Google Form 處理。" },
    { status: 410 },
  );
}
