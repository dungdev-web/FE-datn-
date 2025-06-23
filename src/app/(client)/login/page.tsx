"use client";
import "../css/login.css";
import { loginUser } from "@/services/authService";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../component/loader";

export default function Login() {
  const [usernameOrEmail, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await loginUser({ usernameOrEmail, password });
      localStorage.setItem("userId", res.user.id.toString());

      // Hiện loader
      setShowLoader(true);
      setLoginSuccess(true);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (showLoader && loginSuccess) {
      const timer = setTimeout(() => {
        setShowLoader(false);
        toast.success("Đăng nhập thành công!");
        router.push("/account");
      }, 7000);

      return () => clearTimeout(timer);
    }
  }, [showLoader, loginSuccess]);

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

            <form onSubmit={handleLogin}>
              <input
                value={usernameOrEmail}
                onChange={(e) => setIdentifier(e.target.value)}
                type="text"
                placeholder="Tài Khoản"
                required
              />

              <input
                type="password"
                placeholder="Mật Khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="remember-me">
                <input type="checkbox" />
                Lưu tài khoản
              </div>
              <button type="submit">Đăng nhập ngay</button>
            </form>

            <Toaster position="bottom-right" />

            {showLoader && (
              <div className="loader-overlay">
                <Loader />
                {/* <p style={{ color: "white", marginTop: "10px" }}>
                  Đang xử lý đăng nhập...
                </p> */}
              </div>
            )}

            <br />
            <h5>Quên mật khẩu?</h5>

            <div className="google-login">
              <i className="fab fa-google"></i> Đăng nhập bằng Google
            </div>

            <div className="register-link">
              <p>
                Bạn chưa có tài khoản the light?{" "}
                <a href="/register.html">Đăng ký ngay</a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
