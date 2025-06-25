// pages/api/google-auth.ts
import { API_BASE_URL } from "@/config/env";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {  if (req.method !== "POST") return res.status(405).end();

  const { code } = req.body;

  const backendRes = await fetch(`${API_BASE_URL}/google/callback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
    credentials: "include",
  });

  const data = await backendRes.json();
  res.status(backendRes.status).json(data);
}
