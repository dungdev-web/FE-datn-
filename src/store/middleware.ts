import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Chỉ áp dụng cho đường dẫn bắt đầu bằng /admin
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      // Nếu cần kiểm tra quyền:
      if (decoded.role !== "admin") {
        return NextResponse.redirect(new URL("/403", req.url));
      }

    } catch (err) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/admin/:path*"],
};
