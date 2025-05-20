
// components/LoginMenu.tsx
"use client";
import React, { useState } from "react";

export default function LoginMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeForm, setActiveForm] = useState("1");

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-content active">
        <div className="login-container">
          <div className="side-menu">
            <img src="/images/logo/NBDT__1_-removebg-preview.png" alt="Logo" style={{ backgroundColor: "black" }} />
            <a className={activeForm === "1" ? "side-link active" : "side-link"} onClick={() => setActiveForm("1")}>Đăng nhập</a>
            <a className={activeForm === "2" ? "side-link active" : "side-link"} onClick={() => setActiveForm("2")}>Quên mật khẩu</a>
            <a className={activeForm === "3" ? "side-link active" : "side-link"} onClick={() => setActiveForm("3")}>Đăng ký</a>
          </div>

          <div className={`login-form ${activeForm === "1" ? "active" : ""}`} data-hien="1">
            <h2>ĐĂNG NHẬP</h2>
            <form>
              <div className="form-group">
                <label >Email*</label>
                <input
                  type="email"
                  id="email1"
                  placeholder="Nhập email của bạn"
                />
              </div>
              <div className="form-group">
                <label>Mật khẩu*</label>
                <input
                  type="password"
                  id="password1"
                  placeholder="Nhập mật khẩu"
                />
              </div>
              <div className="form-group">
                <button type="submit" id="btn-dangnhap">ĐĂNG NHẬP</button>
              </div>
            </form>
            <div className="social-login">
              <div className="facebook-test">
                <i className="fab fa-facebook-f"></i>
                <a href="#" className="facebook-btn">
                  <span>Facebook</span>
                </a>
              </div>
              <div className="google-test">
                <i className="fab fa-google">+</i>
                <a href="#" className="google-btn">
                  <span>Google</span>
                </a>
              </div>
            </div>          </div>

          <div className={`login-form ${activeForm === "2" ? "active" : ""}`} data-hien="2">
            <h2>Quên mật khẩu</h2>
            <form>
              <div className="form-group">
                <label>Email*</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Nhập email của bạn"
                />
              </div>
              <div className="form-group">
                <button type="submit">GỬI</button>
              </div>
            </form>          </div>

          <div className={`login-form ${activeForm === "3" ? "active" : ""}`} data-hien="3">
            <h2>ĐĂNG KÝ</h2>
            <form>
              <div className="form-group">
                <label >Họ của bạn*</label>
                <input type="text" id="ho" placeholder="Nhập họ của bạn" />
              </div>
              <div className="form-group">
                <label >Tên của bạn*</label>
                <input type="text" id="ten" placeholder="Nhập tên của bạn" />
              </div>
              <div className="form-group">
                <label >Số điện thoại*</label>
                <input
                  type="number"
                  id="phone"
                  placeholder="Nhập số điện thoại"
                />
              </div>
              <div className="form-group">
                <label >Email*</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Nhập email của bạn"
                />
              </div>
              <div className="form-group">
                <label>Mật khẩu*</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Nhập mật khẩu"
                />
              </div>
              <div className="form-group">
                <button type="submit">ĐĂNG KÝ</button>
              </div>
            </form>          </div>
        </div>
      </div>
      <div className="overlay2 active" onClick={onClose}></div>
    </>
  );
}
