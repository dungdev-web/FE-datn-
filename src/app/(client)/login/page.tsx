"use client";
import "../css/login.css";
import { loginUser, loginWithGoogle } from "@/services/authService";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../component/loader";
import { API_BASE_URL } from "@/config/env";
import { Eye, EyeOff } from "lucide-react"; // Bạn có thể dùng FontAwesome hoặc bất kỳ icon lib

export default function Login() {
  const [usernameOrEmail, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

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
  const handleGoogleLogin = async () => {
    try {
      const res = await loginWithGoogle();
      localStorage.setItem("userIdG", res.user.id.toString());
      toast.success(res.message);
      router.push("/account");
    } catch (err: any) {
      toast.error(err.message || "Đăng nhập Google thất bại");
    }
  };
  const googleLogin = () => {
    const clientId =
      "235575927586-1ldvr8n16m7ose9db21aa0nvqhnb9m0a.apps.googleusercontent.com";
    const redirectUri = encodeURIComponent(
      `http://localhost:3001/google/callback`
    );
    const scope = encodeURIComponent("profile email");
    const responseType = "code";
    console.log(clientId);

    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
    window.location.href = url;
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
     
      <main className="">
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
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mật Khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>
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

            <button className="google-login" onClick={googleLogin}>
              <i className="fab fa-google"></i> Đăng nhập bằng Google
            </button>

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
