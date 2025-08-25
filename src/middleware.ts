import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { API_BASE_URL } from "./config/env";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const res = await fetch(`${API_BASE_URL}/user/check-token`, {
      method: "GET",
      headers: {
        cookie: `token=${token}`, // tự attach cookie
      },
    });

    if (!res.ok) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const data = await res.json();

    if (req.nextUrl.pathname.startsWith("/admin") && data.user.role !== "admin") {
      return NextResponse.redirect(new URL("/403", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("Middleware error:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
