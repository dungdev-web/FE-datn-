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
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      algorithms: ["HS256"],
    });
    return payload as unknown as DecodedToken;
  } catch {
    return null;
  }
}

async function createAppToken(user: {
  id?: number;
  email: string;
  role: string;
}) {
  return await new SignJWT({ id: user.id, email: user.email, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(JWT_SECRET);
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  let token = req.cookies.get("token")?.value;

  if (!token) {
    console.log("❌ No token found, redirect to /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  let decoded = await verifyAppToken(token);
  let role = decoded?.role?.toLowerCase();

  // log khi đã verify thành công
  if (decoded) {
    console.log("🔑 Decoded token:", decoded);
    console.log("👤 Email:", decoded.email, "| Role:", role);
  }

  // fallback cho Google token
  if (!decoded) {
    try {
      const base64Payload = token.split(".")[1];
      const googlePayload = JSON.parse(
        Buffer.from(base64Payload, "base64").toString("utf-8")
      );

      console.log("🌐 Google token payload:", googlePayload);

      if (!googlePayload.email) throw new Error("Invalid Google token");

      // lấy role từ googlePayload nếu có, mặc định là "user"
      const roleFromGoogle = googlePayload.role
        ? googlePayload.role.toLowerCase()
        : "user";

      // tạo JWT app token với role dynamic
      const appToken = await createAppToken({
        email: googlePayload.email,
        role: roleFromGoogle,
        id: googlePayload.userId,
      });

      const res = NextResponse.next();
      res.cookies.set("token", appToken, {
        httpOnly: true,
        path: "/",
        maxAge: 3600,
      });

      decoded = await verifyAppToken(appToken);
      role = decoded?.role?.toLowerCase();

      console.log(
        "✅ Created JWT app from Google token:",
        decoded?.email,
        "role:",
        role
      );
      return res;
    } catch (err) {
      console.error("❌ Invalid token:", err);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // /admin chỉ admin
  if (pathname.startsWith("/admin") && role !== "admin") {
    console.warn(
      "🚫 Forbidden access:",
      decoded?.email,
      "role:",
      role,
      "path:",
      pathname
    );
    return NextResponse.redirect(new URL("/403", req.url));
  }

  // /account tất cả user
  if (pathname === "/account") {
    console.log(
      "✅ User authenticated for /account:",
      decoded?.email,
      "role:",
      role
    );
  }
  

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/account",],
};
