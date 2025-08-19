"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { registerUser } from "@/services/authService";
import "../css/login.css";
import { validateField } from "@/hooks/useValidateLoginRegister";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
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

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    const nameError = validateField({
      name: "fullName",
      value: name,
      formType: "register",
    });
    const emailError = validateField({
      name: "email",
      value: email,
      formType: "register",
    });
    const passwordError = validateField({
      name: "password",
      value: password,
      formType: "register",
    });

    if (nameError) newErrors.fullName = nameError;
    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const formData = {
        name: name,
        email,
        password,
        phone: "",
      };
      const res = await registerUser(formData);
      Swal.fire({
        title: res.message || "Đăng ký thành công!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      window.location.href = `/verify-email?email=${encodeURIComponent(email)}`;
    } catch (err: any) {
      Swal.fire({
        title: "Đăng ký thất bại",
        text: err.message || "Có lỗi xảy ra",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <main>
      <div className="auth-container">
        <img
          src="/images/blog/section_instagram_img4.webp"
          alt="Image Description"
        />

        <div className="form-container">
          <h2>Đăng ký tài khoản Tera Shoes</h2>

          <div className="register-link">
            <p>Hãy đăng ký để được hưởng nhiều đặc quyền riêng dành cho bạn</p>
          </div>

          <form id="formRegister" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="Họ và Tên"
                id="fullName"
                value={name}
                className={`input ${
                  errors.fullName
                    ? "error"
                    : name.trim() !== ""
                    ? "success"
                    : ""
                }`}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors((prev) => ({ ...prev, fullName: "" }));
                }}
                onBlur={(e) =>
                  setErrors((prev) => ({
                    ...prev,
                    fullName: validateField({
                      name: "fullName",
                      value: e.target.value,
                      formType: "register",
                    }),
                  }))
                }
              />

              {errors.fullName && (
                <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                id="email"
                value={email}
                className={`input ${
                  errors.email ? "error" : email.trim() !== "" ? "success" : ""
                }`}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: "" }));
                }}
                onBlur={(e) =>
                  setErrors((prev) => ({
                    ...prev,
                    email: validateField({
                      name: "email",
                      value: e.target.value,
                      formType: "register",
                    }),
                  }))
                }
              />

              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div>
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
                  id="password"
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
                        formType: "register",
                      }),
                    }))
                  }
                  style={{ paddingRight: "40px" }} // Thêm padding để tránh icon bị che
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    zIndex: 10, // Đảm bảo icon luôn ở trên
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

            <div className="register-link">
              <p>
                Bạn chưa có tài khoản? <a href="/login">Đăng nhập ngay</a>
              </p>
            </div>

            <button type="submit">Đăng kí ngay</button>
          </form>

          <h3>Hoặc</h3>

          <button className="google-login" onClick={googleLogin}>
            <i className="fab fa-google"></i> Đăng nhập bằng Google
          </button>
        </div>
      </div>
    </main>
  );
}
