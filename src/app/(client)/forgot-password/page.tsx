"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { sendResetPassword } from "@/services/authService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateField } from "@/hooks/validate_login_register";
import "../css/login.css";
export default function ForgotPassWord() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);

    const emailError = validateField({
      name: "email",
      value: value,
      formType: "forgotPassword",
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      email: emailError,
    }));
  };

  const handleSubmit = async () => {
    if (errors.email) {
      toast.error("Vui lòng nhập email hợp lệ.");
      return;
    }

    setLoading(true);

    try {
      await sendResetPassword(email);
      toast.success("OTP đã được gửi thành công!");
      router.push(`/otp?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      toast.error(err.message || "Có lỗi xảy ra.");
    }

    setLoading(false);
  };

return (
 <div className="forgot-wrapper">
  <div className="forgot-box">
    <img
      src="/images/logo/logo-den.png"
      alt="MMS"
      className="forgot-logo"
    />

    <h1 className="forgot-title">Quên mật khẩu</h1>

    <p className="forgot-desc">
      Vui lòng nhập địa chỉ email bạn dùng để đăng ký tài khoản Tera Shoes.
      Và bạn sẽ nhận được OTP xác thực để đổi mật khẩu mới.
    </p>

    <form className="forgot-form" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="email" className="forgot-label">Email đăng nhập</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={handleChange}
        placeholder="Nhập email đã đăng ký"
        className="forgot-input"
        required
      />
      {errors.email && (
        <p className="forgot-error">{errors.email}</p>
      )}

      <button
        type="button"
        onClick={handleSubmit}
      disabled={loading || !email.trim() || Boolean(errors.email)}
        className="forgot-btn"
      >
        {loading ? "Đang gửi..." : "Gửi OTP"}
      </button>
    </form>

    <a href="/login" className="forgot-login-link">Đăng Nhập</a>
  </div>
</div>

);

}
