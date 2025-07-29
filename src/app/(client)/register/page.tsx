"use client";
import { useState } from "react";
import { registerUser } from "@/services/authService";
import "../css/login.css";
import { validateField } from "@/hooks/validate_login_register";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
      window.location.href = "/login";
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
          <h2>Đăng Ký email</h2>

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
              <input
                type="password"
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
              />
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

          <div className="google-login">
            <i className="fab fa-google"></i> Đăng nhập bằng Google
          </div>
        </div>
      </div>
    </main>
  );
}
