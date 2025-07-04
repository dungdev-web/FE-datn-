"use client";
import { useState } from "react";
import { registerUser } from "@/services/authService";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

import "../css/login.css";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = {
        name: name,
        email,
        password,
        phone: "",
      };
      const res = await registerUser(formData);
      setMessage(res.message);
      toast.success(res.message);
    } catch (err: any) {
      setMessage(err.message);
      toast.error(err.message);
    }
  };
  return (
    <>

      <main>
        <div className="auth-container">
          <img
            src="/images/blog/section_instagram_img4.webp"
            alt="Image Description"
          />

          <div className="form-container">
            <h2>Đăng Ký email</h2>
            <div className="register-link">
              <p>
                Hãy đăng ký để được hưởng nhiều đặc quyền riêng dành cho bạn
              </p>
            </div>
            <form action="" id="formRegister" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Tài Khoản"
                id="fullName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Mật Khẩu"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="register-link">
                <p className="p">
                  Thông tin của bạn sẽ được bảo mật theo chính sách riêng tư của
                  chúng tôi
                </p>
              </div>
              <button type="submit">Đăng kí ngay</button>
            </form>
            <Toaster position="bottom-right" />

            <h3>Hoặc</h3>

            <div className="google-login">
              <i className="fab fa-google"></i> Đăng nhập bằng Google
            </div>

            <div className="register-link">
              <p>
                Bạn chưa có tài khoản? <a href="/login.html">Đăng nhập ngay</a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
