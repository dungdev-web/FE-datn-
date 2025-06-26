"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

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
            <Link href="/product">
              SẢN PHẨM{" "}
              <span
                className="arrow"
                onClick={(e) => {
                  e.preventDefault();
                  toggleSubmenu(1);
                }}
              >
                <FaChevronDown
                  className={`ml-1 transition-transform duration-300 ${
                    isSubmenuActive[1] ? "rotate-180" : ""
                  }`}
                />
              </span>
            </Link>
            <div
              className={`submenu transition-max-height duration-300 ease-in-out overflow-hidden ${
                isSubmenuActive[1] ? "max-h-40" : "max-h-0"
              }`}
            >
              <Link href="/product">Giày Nam</Link>
              <Link href="/product">Giày Nữ</Link>
            </div>
          </li>

          {/* TIN TỨC */}
          <li>
            <Link href="/blog">
              TIN TỨC{" "}
              <span
                className="arrow"
                onClick={(e) => {
                  e.preventDefault();
                  toggleSubmenu(2);
                }}
              >
                <FaChevronDown
                  className={`ml-1 transition-transform duration-300 ${
                    isSubmenuActive[1] ? "rotate-180" : ""
                  }`}
                />
              </span>
            </Link>
            <div
              className={`submenu transition-max-height duration-300 ease-in-out overflow-hidden ${
                isSubmenuActive[2] ? "max-h-40" : "max-h-0"
              }`}
            >
              <Link href="/blog">Bài viết</Link>
              <Link href="/blog">Khuyến mãi</Link>
            </div>
          </li>

          <li>
            <Link href="/contact">LIÊN HỆ</Link>
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
