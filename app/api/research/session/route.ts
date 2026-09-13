import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { message: "研究登入連結已停止使用，請前往專屬 Google Form。" },
    { status: 410 },
  );
}
