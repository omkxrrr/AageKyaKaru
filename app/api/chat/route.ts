import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error: "AI Guidance Chat is coming soon."
    },
    { status: 503 }
  );
}
