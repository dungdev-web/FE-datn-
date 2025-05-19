"use client";
import React, { useState } from "react";
import "../css/dashboard.css";
import "../css/css.css";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LabelIcon from "@mui/icons-material/Label";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ArticleIcon from "@mui/icons-material/Article";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { DocumentScannerTwoTone } from "@mui/icons-material";
import { Help } from "@mui/icons-material";
import { Settings } from "@mui/icons-material";
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
            <SpaceDashboardIcon />
            Dashboard
          </a>
        </li>

        <li
          className={`has-submenu ${openMenuKey === "danhmuc" ? "open" : ""}`}
        >
          <a href="#" onClick={() => toggleMenu("danhmuc")}>
            <Inventory2Icon /> Quản lý danh mục{" "}
            <i className="fa-solid fa-chevron-down submenu-icon"></i>
          </a>
          <ul className="submenu">
            <li>
              <a href="#">Danh sách danh mục</a>
            </li>
            <li>
              <a href="#">Thêm mới danh mục</a>
            </li>
          </ul>
        </li>

        <li
          className={`has-submenu ${openMenuKey === "nhanhieu" ? "open" : ""}`}
        >
          <a href="#" onClick={() => toggleMenu("nhanhieu")}>
            <LabelIcon /> Quản lý nhãn hiệu{" "}
            <i className="fa-solid fa-chevron-down submenu-icon"></i>
          </a>
          <ul className="submenu">
            <li>
              <a href="#">Danh sách nhãn hiệu</a>
            </li>
            <li>
              <a href="#">Thêm mới nhãn hiệu</a>
            </li>
          </ul>
        </li>

        <li
          className={`has-submenu ${openMenuKey === "sanpham" ? "open" : ""}`}
        >
          <a href="#" onClick={() => toggleMenu("sanpham")}>
            <StorefrontIcon /> Quản lý sản phẩm{" "}
            <i className="fa-solid fa-chevron-down submenu-icon"></i>
          </a>
          <ul className="submenu">
            <li>
              <a href="#">Danh sách sản phẩm</a>
            </li>
            <li>
              <a href="#">Thêm mới sản phẩm</a>
            </li>
          </ul>
        </li>

        <li
          className={`has-submenu ${openMenuKey === "baiviet" ? "open" : ""}`}
        >
          <a href="#" onClick={() => toggleMenu("baiviet")}>
            <ArticleIcon /> Quản lý bài viết{" "}
            <i className="fa-solid fa-chevron-down submenu-icon"></i>
          </a>
          <ul className="submenu">
            <li>
              <a href="#">Danh sách bài viết</a>
            </li>
            <li>
              <a href="#">Thêm mới bài viết</a>
            </li>
          </ul>
        </li>

        <li
          className={`has-submenu ${openMenuKey === "khuyenmai" ? "open" : ""}`}
        >
          <a href="#" onClick={() => toggleMenu("khuyenmai")}>
            <LocalOfferIcon /> Quản lý khuyến mại{" "}
            <i className="fa-solid fa-chevron-down submenu-icon"></i>
          </a>
          <ul className="submenu">
            <li>
              <a href="#">Danh sách khuyến mại</a>
            </li>
            <li>
              <a href="#">Thêm mới khuyến mại</a>
            </li>
          </ul>
        </li>

        <li
          className={`has-submenu ${openMenuKey === "donhang" ? "open" : ""}`}
        >
          <a href="#" onClick={() => toggleMenu("donhang")}>
            <ReceiptLongIcon /> Quản lý đơn hàng{" "}
            <i className="fa-solid fa-chevron-down submenu-icon"></i>
          </a>
          <ul className="submenu">
            <li>
              <a href="#">Danh sách đơn hàng</a>
            </li>
            <li>
              <a href="#">Thêm mới đơn hàng</a>
            </li>
          </ul>
        </li>

        <li
          className={`has-submenu ${openMenuKey === "taikhoan" ? "open" : ""}`}
        >
          <a href="#" onClick={() => toggleMenu("taikhoan")}>
            <AccountCircleIcon /> Quản lý tài khoản{" "}
            <i className="fa-solid fa-chevron-down submenu-icon"></i>
          </a>
          <ul className="submenu">
            <li>
              <a href="#">Danh sách tài khoản</a>
            </li>
            <li>
              <a href="#">Thêm mới tài khoản</a>
            </li>
          </ul>
        </li>
        <li className="w-full custom-after-border relative !mt-[10px]"></li>
        <li className="!mt-[20px]">
        <a href="#">
            <DocumentScannerTwoTone /> Tài liệu{" "}
          </a>
        </li>
        <li>
        <a href="#">
            <Help /> Help{" "}
          </a>
        </li>
        <li>
        <a href="#">
            <Settings /> Cài đặt{" "}
          </a>
        </li>
      </ul>
    </nav>
  );
}
