import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";

const rawSecret = process.env.JWT_SECRET || "my_test_secret_key_123";
const JWT_SECRET = new TextEncoder().encode(rawSecret);

interface DecodedToken {
  id?: number;
  email?: string;
  role?: string;
  iat?: number;
  exp?: number;
}

async function verifyAppToken(token: string): Promise<DecodedToken | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, { algorithms: ["HS256"] });
    console.log("🔑 [AppToken Verified] Payload:", payload);
    return payload as DecodedToken;
  } catch (err) {
    console.error("❌ [AppToken Verify Failed]:", (err as Error).message);
    console.error(err);
    return null;
  }
}

async function createAppToken(user: { id?: number; email: string; role: string }) {
  const token = await new SignJWT({ id: user.id, email: user.email, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(JWT_SECRET);

  console.log("✅ [AppToken Created]:", { email: user.email, role: user.role });
  return token;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  let token = req.cookies.get("token")?.value;

  console.log("📥 [Incoming Request]:", pathname);
  console.log("🍪 [Token From Cookie]:", token);

  if (!token) {
    console.warn("⚠️ [No Token] Redirecting to /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  let decoded = await verifyAppToken(token);
  let role = decoded?.role?.toLowerCase();

  // fallback cho Google token
  if (!decoded) {
    try {
      console.log("🔄 [Fallback] Trying to decode Google token...");

      const base64Payload = token.split(".")[1];
      const googlePayload = JSON.parse(Buffer.from(base64Payload, "base64").toString("utf-8"));

      console.log("🔑 [Google Token Payload]:", googlePayload);

      if (!googlePayload.email) throw new Error("Invalid Google token");

      // tạo JWT app token với role = 'user'
      const appToken = await createAppToken({ email: googlePayload.email, role: "user" });

      // set cookie mới
      const res = NextResponse.next();
      res.cookies.set("token", appToken, { httpOnly: true, path: "/", maxAge: 3600 });

      // cập nhật decoded & role
      decoded = await verifyAppToken(appToken);
      role = decoded?.role?.toLowerCase();

      console.log("✅ [Google → AppToken Migration]:", decoded);
      return res;
    } catch (err) {
      console.error("❌ [Google Token Invalid]:", (err as Error).message);
      console.error(err);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // /admin chỉ admin
  if (pathname.startsWith("/admin") && role !== "admin") {
    console.warn("⛔ [Unauthorized Admin Access]:", decoded?.email, "role:", role);
    return NextResponse.redirect(new URL("/403", req.url));
  }

  // /account tất cả user
if (pathname === "/account") {
    console.log("✅ [User Authenticated] /account:", decoded?.email, "role:", role);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/account"],
};