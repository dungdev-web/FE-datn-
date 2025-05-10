"use client";
import React, { useState } from "react";

interface MenuRightProps {
  isMenuOpen: boolean;
  closeMenu: () => void;
}

export default function MenuRight({ isMenuOpen, closeMenu }: MenuRightProps) {
  const [isSubmenuActive, setIsSubmenuActive] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleSubmenu = (index: number) => {
    setIsSubmenuActive((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <>
      <div
        className={`menu ${isMenuOpen ? "open" : ""}`}
        style={{ display: isMenuOpen ? "block" : "none" }}
      >
        <div className="menu-header">
          <div>
            <img src="/images/logo/NBDT__1_-removebg-preview.png" alt="Logo" />
          </div>
          <div className="close" onClick={closeMenu}>
            ×
          </div>
        </div>
        <ul>
          <li>
            <a href="#">TRANG CHỦ</a>
          </li>
          <li>
            <a href="#">GIỚI THIỆU</a>
          </li>

          {/* SẢN PHẨM */}
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                toggleSubmenu(1);
              }}
            >
              SẢN PHẨM <span className="arrow">▼</span>
            </a>
            <div
              className={`submenu transition-max-height duration-300 ease-in-out overflow-hidden ${
                isSubmenuActive[1] ? "max-h-40" : "max-h-0"
              }`}
            >
              <a href="#">Giày Nam</a>
              <a href="#">Giày Nữ</a>
            </div>
          </li>

          {/* TIN TỨC */}
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                toggleSubmenu(2);
              }}
            >
              TIN TỨC <span className="arrow">▼</span>
            </a>
            <div
              className={`submenu transition-max-height duration-300 ease-in-out overflow-hidden ${
                isSubmenuActive[2] ? "max-h-40" : "max-h-0"
              }`}
            >
              <a href="#">Bài viết</a>
              <a href="#">Khuyến mãi</a>
            </div>
          </li>

          <li>
            <a href="#">LIÊN HỆ</a>
          </li>
          <li>
            <a href="#">HỆ THỐNG CỬA HÀNG</a>
          </li>
          <li>
            <a href="#">TÀI KHOẢN</a>
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div className="overlay" id="overlay" onClick={closeMenu}></div>
      )}
    </>
  );
}
