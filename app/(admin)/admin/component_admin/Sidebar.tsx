"use client";
import React, { useState } from "react";
import "../css/dashboard.css";
import "../css/css.css";

export default function SideBar() {
  const [openMenuKey, setOpenMenuKey] = useState<string | null>(null);

  const toggleMenu = (menuKey: string) => {
    setOpenMenuKey((prevKey) => (prevKey === menuKey ? null : menuKey));
  };

  return (
    <nav className="sidebar">
      <ul className="menu">
        <li>
          <a href="#">
            <i className="fa-solid fa-house"></i> Trang chủ
          </a>
        </li>

        <li className={`has-submenu ${openMenuKey === "danhmuc" ? "open" : ""}`}>
          <a href="#" onClick={() => toggleMenu("danhmuc")}>
            <i className="fa-solid fa-list"></i> Quản lý danh mục{" "}
            <i className="fa-solid fa-chevron-down submenu-icon"></i>
          </a>
          <ul className="submenu">
            <li><a href="#">Danh sách danh mục</a></li>
            <li><a href="#">Thêm mới danh mục</a></li>
          </ul>
        </li>

        <li className={`has-submenu ${openMenuKey === "nhanhieu" ? "open" : ""}`}>
          <a href="#" onClick={() => toggleMenu("nhanhieu")}>
            <i className="fa-solid fa-tags"></i> Quản lý nhãn hiệu{" "}
            <i className="fa-solid fa-chevron-down submenu-icon"></i>
          </a>
          <ul className="submenu">
            <li><a href="#">Danh sách nhãn hiệu</a></li>
            <li><a href="#">Thêm mới nhãn hiệu</a></li>
          </ul>
        </li>

        <li className={`has-submenu ${openMenuKey === "sanpham" ? "open" : ""}`}>
          <a href="#" onClick={() => toggleMenu("sanpham")}>
            <i className="fa-solid fa-box"></i> Quản lý sản phẩm{" "}
            <i className="fa-solid fa-chevron-down submenu-icon"></i>
          </a>
          <ul className="submenu">
            <li><a href="#">Danh sách sản phẩm</a></li>
            <li><a href="#">Thêm mới sản phẩm</a></li>
          </ul>
        </li>

        <li className={`has-submenu ${openMenuKey === "baiviet" ? "open" : ""}`}>
          <a href="#" onClick={() => toggleMenu("baiviet")}>
            <i className="fa-solid fa-newspaper"></i> Quản lý bài viết{" "}
            <i className="fa-solid fa-chevron-down submenu-icon"></i>
          </a>
          <ul className="submenu">
            <li><a href="#">Danh sách bài viết</a></li>
            <li><a href="#">Thêm mới bài viết</a></li>
          </ul>
        </li>

        <li className={`has-submenu ${openMenuKey === "khuyenmai" ? "open" : ""}`}>
          <a href="#" onClick={() => toggleMenu("khuyenmai")}>
            <i className="fa-solid fa-gift"></i> Quản lý khuyến mại{" "}
            <i className="fa-solid fa-chevron-down submenu-icon"></i>
          </a>
          <ul className="submenu">
            <li><a href="#">Danh sách khuyến mại</a></li>
            <li><a href="#">Thêm mới khuyến mại</a></li>
          </ul>
        </li>

        <li className={`has-submenu ${openMenuKey === "donhang" ? "open" : ""}`}>
          <a href="#" onClick={() => toggleMenu("donhang")}>
            <i className="fa-solid fa-shopping-cart"></i> Quản lý đơn hàng{" "}
            <i className="fa-solid fa-chevron-down submenu-icon"></i>
          </a>
          <ul className="submenu">
            <li><a href="#">Danh sách đơn hàng</a></li>
            <li><a href="#">Thêm mới đơn hàng</a></li>
          </ul>
        </li>

        <li className={`has-submenu ${openMenuKey === "taikhoan" ? "open" : ""}`}>
          <a href="#" onClick={() => toggleMenu("taikhoan")}>
            <i className="fa-solid fa-user"></i> Quản lý tài khoản{" "}
            <i className="fa-solid fa-chevron-down submenu-icon"></i>
          </a>
          <ul className="submenu">
            <li><a href="#">Danh sách tài khoản</a></li>
            <li><a href="#">Thêm mới tài khoản</a></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
