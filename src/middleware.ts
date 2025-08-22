import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";

const rawSecret = process.env.JWT_SECRET || "my_test_secret_key_123";
const JWT_SECRET = new TextEncoder().encode(rawSecret);

interface DecodedToken {
  id?: number;
  email: string;
  role?: string;
  iat?: number;
  exp?: number;
}

async function verifyAppToken(token: string): Promise<DecodedToken | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, { algorithms: ["HS256"] });
    return payload as DecodedToken;
  } catch {
    return null;
  }
}

async function createAppToken(user: { id?: number; email: string; role: string }) {
  return await new SignJWT({ id: user.id, email: user.email, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(JWT_SECRET);
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  let token = req.cookies.get("token")?.value;

  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  let decoded = await verifyAppToken(token);
  let role = decoded?.role?.toLowerCase();

  // fallback cho Google token
  if (!decoded) {
    try {
      const base64Payload = token.split(".")[1];
      const googlePayload = JSON.parse(Buffer.from(base64Payload, "base64").toString("utf-8"));

      if (!googlePayload.email) throw new Error("Invalid Google token");

      // tạo JWT app token với role = 'user'
      const appToken = await createAppToken({ email: googlePayload.email, role: "user" });

      // set cookie mới
      const res = NextResponse.next();
      res.cookies.set("token", appToken, { httpOnly: true, path: "/", maxAge: 3600 });

      // cập nhật decoded & role
      decoded = await verifyAppToken(appToken);
      role = decoded?.role?.toLowerCase();

      console.log("✅ Created JWT app from Google token:", decoded.email, "role:", role);
      return res;
    } catch (err) {
      console.error("❌ Invalid token:", err);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // /admin chỉ admin
  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/403", req.url));
  }

  // /account tất cả user
  if (pathname === "/account") {
    console.log("✅ User authenticated for /account:", decoded.email, "role:", role);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/account"],
};
