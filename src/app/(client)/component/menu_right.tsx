"use client";
import Link from "next/link";
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
            <Link href="/">TRANG CHỦ</Link>
          </li>
          <li>
            <Link href="/about">GIỚI THIỆU</Link>
          </li>

          {/* SẢN PHẨM */}
          <li>
            <Link
              href="/product"
              onClick={(e) => {
                e.preventDefault();
                toggleSubmenu(1);
              }}
            >
              SẢN PHẨM <span className="arrow">▼</span>
            </Link>
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
            <Link
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                toggleSubmenu(2);
              }}
            >
              TIN TỨC <span className="arrow">▼</span>
            </Link>
            <div
              className={`submenu transition-max-height duration-300 ease-in-out overflow-hidden ${
                isSubmenuActive[2] ? "max-h-40" : "max-h-0"
              }`}
            >
              <Link href="/blog">Bài viết</Link>
              <Link href="#">Khuyến mãi</Link>
            </div>
          </li>

          <li>
            <Link href="/contact">LIÊN HỆ</Link>
          </li>
          <li>
            <Link href="/">HỆ THỐNG CỬA HÀNG</Link>
          </li>
          <li>
            <Link href="/login">TÀI KHOẢN</Link>
          </li>
          <li>
            <Link href="/register">ĐĂNG KÍ</Link>
          </li>
          <li>
            <Link href="/login">ĐĂNG NHẬP</Link>
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
