"use client";
import React, { useState } from "react";
import "../css/dashboard.css";
import "../css/css.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LabelIcon from "@mui/icons-material/Label";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ArticleIcon from "@mui/icons-material/Article";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CommentIcon from "@mui/icons-material/Comment";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { DocumentScannerTwoTone } from "@mui/icons-material";
import { Help } from "@mui/icons-material";
import { Settings } from "@mui/icons-material";
import Link from "next/link";
export default function SideBar() {
  const [openMenuKey, setOpenMenuKey] = useState<string | null>(null);

  const toggleMenu = (menuKey: string) => {
    setOpenMenuKey((prevKey) => (prevKey === menuKey ? null : menuKey));
  };

  return (
    <nav className="sidebar">
      <ul className="menu">
        <li>
          <Link href={'/admin'} className="flex items-center">
            <SpaceDashboardIcon />
            Dashboard
          </Link>
        </li>
        <li
          className={`has-submenu ${openMenuKey === "taikhoan" ? "open" : ""}`}
        >
          <Link href={'/admin/user'} onClick={() => toggleMenu("taikhoan")}>
            <AccountCircleIcon /> Quản lý tài khoản{" "}
            <i className="fa-solid fa-chevron-down submenu-icon"></i>
          </Link>
          <ul className="submenu">
            <li>
              <a href="#">Danh sách tài khoản</a>
            </li>
            <li>
              <a href="#">Thêm mới tài khoản</a>
            </li>
          </ul>
        </li>
        <li
          className={`has-submenu ${openMenuKey === "nhanhieu" ? "open" : ""}`}
        >
          <Link href={'/admin/brands'} onClick={() => toggleMenu("nhanhieu")}>
            <LabelIcon /> Quản lý nhãn hiệu{" "}
            <i className="fa-solid fa-chevron-down submenu-icon"></i>
          </Link>
          <ul className="submenu">
            <li>
              <Link href={'/admin/brands'} >Danh sách nhãn hiệu</Link>
            </li>
            <li>
             <Link href={'/admin/brands/add'} >Thêm mới nhãn hiệu</Link>
            </li>
          </ul>
        </li>
        <li
          className={`has-submenu ${openMenuKey === "danhmuc" ? "open" : ""}`}
        >
          <Link href={'/admin/categories'} onClick={() => toggleMenu("danhmuc")}>
            <Inventory2Icon /> Quản lý danh mục{" "}
            <i className="fa-solid fa-chevron-down submenu-icon"></i>
          </Link>
          <ul className="submenu">
            <li>
              <Link href={'/admin/categories'}>Danh sách danh mục</Link>
            </li>
            <li>
              <Link href={'/admin/categories/add'}>Thêm mới danh mục</Link>
            </li>
          </ul>
        </li>
        <li
          className={`has-submenu ${openMenuKey === "sanpham" ? "open" : ""}`}
        >
          <Link href={'/admin/products'} onClick={() => toggleMenu("sanpham")}>
            <StorefrontIcon /> Quản lý sản phẩm{" "}
            <i className="fa-solid fa-chevron-down submenu-icon"></i>
          </Link>
          <ul className="submenu">
            <li>
              <Link href={'/admin/products/' }>Danh sách sản phẩm</Link>
            </li>
            <li>
              <Link href={'/admin/products/add'}>Thêm mới sản phẩm</Link>
            </li>
          </ul>
        </li>
        <li
          className={`has-submenu ${openMenuKey === "khuyenmai" ? "open" : ""}`}
        >
          <Link href={'/admin/voucher'} onClick={() => toggleMenu("khuyenmai")}>
            <LocalOfferIcon /> Quản lý khuyến mại{" "}
            <i className="fa-solid fa-chevron-down submenu-icon"></i>
          </Link>
          <ul className="submenu">
            <li>
              <Link href={'/admin/voucher'}>Danh sách khuyến mại</Link>
            </li>
            <li>
              <Link href={'/admin/voucher/add'}>Thêm mới khuyến mại</Link>
            </li>
          </ul>
        </li>

        <li
          className={`has-submenu ${openMenuKey === "donhang" ? "open" : ""}`}
        >
          <Link href={'/admin/order'} onClick={() => toggleMenu("donhang")}>
            <ReceiptLongIcon /> Quản lý đơn hàng{" "}
            <i className="fa-solid fa-chevron-down submenu-icon"></i>
          </Link>
          <ul className="submenu">
            <li>
              <Link href={"/admin/order"}>Danh sách đơn hàng</Link>
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
          className={`has-submenu ${openMenuKey === "binhluan" ? "open" : ""}`}
        >
          <Link href={'/admin/comment'} onClick={() => toggleMenu("binhluan")}>
            <CommentIcon /> Quản lý bình luận{" "}
            <i className="fa-solid fa-chevron-down submenu-icon"></i>
          </Link>
          <ul className="submenu">
            <li>
              <Link href={'admin/comment'}>Danh sách bình luận</Link>
            </li>
            <li>
              <a href="#">Bình luận ...</a>
            </li>
          </ul>
        </li>

        <li
          className={`has-submenu ${openMenuKey === "danhgia" ? "open" : ""}`}
        >
          <a href="#" onClick={() => toggleMenu("danhgia")}>
            <RateReviewIcon /> Quản lý đánh giá sản phẩm{" "}
            <i className="fa-solid fa-chevron-down submenu-icon"></i>
          </a>
          <ul className="submenu">
            <li>
              <a href="#">Danh sách đánh giá sản phẩm</a>
            </li>
            <li>
              <a href="#">Đánh giá sản phẩm ...</a>
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
