"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/services/authService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateField } from "@/hooks/validate_login_register";
import "../css/login.css";
export default function OTP() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(600);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [otpValid, setOtpValid] = useState(false);
  const router = useRouter();
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    const emailQuery = new URLSearchParams(window.location.search).get("email");
    if (emailQuery) {
      setEmail(emailQuery);
    }
  }, []);
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const arr = [...otp];
    arr[index] = value;
    setOtp(arr);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    const fullOtp = arr.join("");
    setOtpValid(fullOtp.length === 6);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handleChange = (name: string, value: string) => {
    if (name === "email") setEmail(value);
    if (name === "newPassword") setNewPassword(value);
    if (name === "otp") setOtp(value.split(""));

    const error = validateField({ name, value, formType: "register" });

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const validateForm = () => {
    const fullOtp = otp.join("");
    let isValid = true;

    const emailError = validateField({
      name: "email",
      value: email,
      formType: "register",
    });
    const passwordError = validateField({
      name: "password",
      value: newPassword,
      formType: "register",
    });
    const otpError = fullOtp.length !== 6 ? "OTP phải gồm 6 chữ số" : "";

    setErrors({
      email: emailError,
      password: passwordError,
      otp: otpError,
    });

    if (emailError || passwordError || otpError) {
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const fullOtp = otp.join("");
      await resetPassword(email, fullOtp, newPassword);
      toast.success("Đổi mật khẩu thành công! Đang chuyển hướng...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: any) {
      toast.error(err.message || "Có lỗi xảy ra khi đổi mật khẩu");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="otp-wrapper">
      <div className="otp-box">
        <img
          src="/images/logo/logo-den.png"
          alt="MMS Logo"
          className="otp-logo"
        />
        <h1 className="otp-title">Xác thực tài khoản</h1>
        <p className="otp-desc">
          Nhập OTP gửi tới email <strong>{email}</strong> của bạn và đặt mật
          khẩu mới.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="otp-code-group">
            {otp.map((digit, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                inputMode="numeric"
                value={digit}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
                className={`otp-code ${otpValid ? "otp-valid" : "otp-invalid"}`}
              />
            ))}
          </div>
          {errors.otp && <p className="otp-error">{errors.otp}</p>}

          <input
            type="email"
            value={email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Email đăng nhập"
            className="otp-input"
            disabled
          />
          {errors.email && <p className="otp-error">{errors.email}</p>}

          <input
            type="password"
            value={newPassword}
            onChange={(e) => handleChange("newPassword", e.target.value)}
            placeholder="Nhập mật khẩu mới"
            className="otp-input"
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">{errors.password}</p>
          )}

          <button type="submit" disabled={loading} className="otp-button">
            {loading ? "Đang xử lý..." : "Xác nhận OTP và đổi mật khẩu"}
          </button>

          <p className="otp-info">
            Bạn sẽ nhận được mã OTP mới sau{" "}
            <span className="highlight">
              {Math.floor(countdown / 60)}:
              {String(countdown % 60).padStart(2, "0")}
            </span>
            . Nếu không nhận được, vui lòng kiểm tra lại email hoặc thử lại sau.
          </p>
        </form>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}
