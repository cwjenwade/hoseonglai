import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { ok: false, message: "disabled" },
    { status: 404 },
  );
}
