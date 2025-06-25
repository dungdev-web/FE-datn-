// src/app/api/google-auth/route.ts
import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/config/env";

export async function POST(req: NextRequest) {
  const { code } = await req.json();

  const backendRes = await fetch(`${API_BASE_URL}/google/callback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });

  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}
