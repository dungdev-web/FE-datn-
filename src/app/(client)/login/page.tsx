"use client";
import "../css/login.css";
import { loginUser } from "@/services/authService";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleLogin = async () => {
    try {
      const res = await loginUser({ identifier, password });
      alert("Đăng nhập thành công: " + res.user.username);
      localStorage.setItem("userId", res.user.userId.toString());
      router.push('/account');
    } catch (err: any) {
      alert(err.message);
    }
  };
  return (
    <>
      <div className="intro-banner"></div>
      <main>
        <div className="auth-container">
          <img
            src="images/blog/section_instagram_img6.webp"
            alt="Image Description"
          />

          <div className="form-container">
            <h2>Đăng nhập</h2>
            <div className="register-link">
              <p>Hãy đăng nhập để được hưởng đặc quyền riêng dành cho bạn</p>
            </div>
            <form action="" id="formLogin">
              <input
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                type="text"
                placeholder="Tài Khoản"
                id="email"
                required
              />

              <input
                type="password"
                placeholder="Mật Khẩu"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="remember-me">
                <input type="checkbox" />
                Lưu tài khoản
              </div>
              <button onClick={handleLogin} type="submit">
                Đăng nhập ngay
              </button>
            </form>
            <br />
            <h5>Quên mật khẩu?</h5>

            <div className="google-login">
              <i className="fab fa-google"></i> Đăng nhập bằng Google
            </div>

            <div className="register-link">
              <p>
                Bạn chưa có tài khoản the light?
                <Link href="/register.html">Đăng ký ngay</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
