"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import { confirmEmailService } from "@/services/authService";
import "../css/login.css";
export default function ConfirmEmailOtp() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [otpValid, setOtpValid] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(180); // 3 phút

  const inputRefs = useRef<HTMLInputElement[]>([]);

  // Countdown timer
  useEffect(() => {
    if (countdown === 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = otp.join("");

    if (token.length !== 6) {
      setErrors({ otp: "Mã OTP gồm 6 chữ số." });
      setOtpValid(false);
      return;
    }

    setLoading(true);
    try {
      const res = await confirmEmailService(email, token);
      Swal.fire("Thành công", res.message || "Xác minh email thành công!", "success");
      window.location.href = "/login";
    } catch (err: any) {
      Swal.fire("Lỗi", err.message || "Xác minh thất bại", "error");
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
          Nhập mã OTP đã gửi tới email <strong>{email}</strong> để hoàn tất đăng ký.
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
                  inputRefs.current[i] = el!;
                }}
                className={`otp-code ${otpValid ? "otp-valid" : "otp-invalid"}`}
              />
            ))}
          </div>
          {errors.otp && <p className="otp-error">{errors.otp}</p>}

          <input
            type="email"
            value={email}
            disabled
            className="otp-input"
            placeholder="Email đăng ký"
          />

          <button type="submit" disabled={loading} className="otp-button">
            {loading ? "Đang xác minh..." : "Xác nhận OTP"}
          </button>

          <p className="otp-info">
            Bạn sẽ nhận được mã OTP mới sau{" "}
            <span className="highlight">
              {Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, "0")}
            </span>
            . Nếu không nhận được, vui lòng kiểm tra lại email hoặc thử lại sau.
          </p>
        </form>
      </div>
    </div>
  );
}
