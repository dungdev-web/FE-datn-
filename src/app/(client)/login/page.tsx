"use client";
import "../css/login.css";
import { useAuthCookie } from "@/hooks/useAuthCookie";
import { loginUser, loginWithGoogle } from "@/services/authService";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "../component/loader";
import { Eye, EyeOff } from "lucide-react";
import { validateField } from "@/hooks/validate_login_register";
import Link from "next/link";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useAuthUser } from "@/hooks/useAuthUser";

export default function Login() {
  const [usernameOrEmail, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);
  const { getUserFromCookies, saveUserToCookies } = useAuthCookie();
  const { user } = useAuthUser();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    const emailError = validateField({
      name: "email",
      value: usernameOrEmail,
      formType: "login",
    });

    const passwordError = validateField({
      name: "password",
      value: password,
      formType: "login",
    });

    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setShowLoader(true);
      const res = await loginUser({ usernameOrEmail, password });
      
      // Lưu user vào cookies và state
      saveUserToCookies(res);
      setLoginSuccess(true);
      
      // Hiển thị thông báo thành công
      await Swal.fire({
        title: "Đăng nhập thành công!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      if (res?.user?.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/account";
      }
      
    } catch (err: any) {
      setShowLoader(false);
      Swal.fire({
        title: "Đăng nhập thất bại",
        text: err.message || "Có lỗi xảy ra",
        icon: "error",
        confirmButtonText: "OK",
      });
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

    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
    window.location.href = url;
  };

  return (
    <>
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
              <div>
                <input
                  value={usernameOrEmail}
                  className={`input ${
                    errors.email
                      ? "error"
                      : usernameOrEmail.trim() !== ""
                      ? "success"
                      : ""
                  }`}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  onBlur={(e) =>
                    setErrors((prev) => ({
                      ...prev,
                      email: validateField({
                        name: "email",
                        value: e.target.value,
                        formType: "login",
                      }),
                    }))
                  }
                  type="text"
                  placeholder="Tài Khoản"
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              <div className="password-field-container">
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`input ${
                      errors.password
                        ? "error"
                        : password.trim() !== ""
                        ? "success"
                        : ""
                    }`}
                    placeholder="Mật Khẩu"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors((prev) => ({ ...prev, password: "" }));
                    }}
                    onBlur={(e) =>
                      setErrors((prev) => ({
                        ...prev,
                        password: validateField({
                          name: "password",
                          value: e.target.value,
                          formType: "login",
                        }),
                      }))
                    }
                    style={{ paddingRight: "40px" }}
                  />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      zIndex: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "24px",
                      height: "24px",
                    }}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                )}
              </div>
              <p className="foget-pw">
                <Link href="/forgot-password">Quên mật khẩu?</Link>
              </p>
              <button type="submit" disabled={showLoader}>
                {showLoader ? "Đang đăng nhập..." : "Đăng nhập ngay"}
              </button>
            </form>

            {showLoader && (
              <div className="loader-overlay">
                <Loader />
              </div>
            )}

            <h3>Hoặc</h3>
            <button className="google-login" onClick={googleLogin}>
              <i className="fab fa-google"></i> Đăng nhập bằng Google
            </button>

            <div className="register-link">
              <p>
                Bạn chưa có tài khoản Tera Shoes?{" "}
                <Link href="/register">Đăng ký ngay</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}