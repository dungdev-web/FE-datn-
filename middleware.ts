// middleware.ts
"use client";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

interface DecodedToken {
  id: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    try {
      const token = req.cookies.get("token")?.value;

      if (!token) {
        console.warn("Không có token");
        throw new Error("Không có token");
      }

      const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

      if (decoded.role !== "admin") {
        console.warn("⚠️ Người dùng không có quyền admin");
        return NextResponse.redirect(new URL("/403", req.url));
      }

      console.log("✅ Middleware Authenticated:", decoded.email, decoded.role);

    } catch (err) {
      console.error("❌ Middleware error:", err);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const runtime = "nodejs";
export const matcher = ["/admin/:path*"];
