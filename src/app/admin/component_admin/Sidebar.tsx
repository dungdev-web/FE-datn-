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
import CommentIcon from "@mui/icons-material/Comment";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { DocumentScannerTwoTone } from "@mui/icons-material";
import { Help } from "@mui/icons-material";
import { Settings } from "@mui/icons-material";
import Link from "next/link";

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}
export default function SideBar({ isCollapsed, toggleSidebar }: SidebarProps) {
  const [openMenuKey, setOpenMenuKey] = useState<string | null>(null);
  // const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleMenu = (menuKey: string) => {
    if (isCollapsed) return; 
    setOpenMenuKey((prevKey) => (prevKey === menuKey ? null : menuKey));
  };


  return (
    <nav className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <ul className="menu">
        <li>
          <div className="logo bg-[#000]">
            <img src="/images/logo/1.png" alt="" />
             
          </div>
        </li>
       
        <li>
          <Link href={'/admin'} className="flex items-center tick">
            <SpaceDashboardIcon />
            {!isCollapsed && <span>Dashboard</span>}
          </Link>
        </li>
        <li
          className={`has-submenu ${openMenuKey === "taikhoan" ? "open" : ""}`}
        >
          <Link href={'/admin/user'} onClick={() => toggleMenu("taikhoan")}>
            <AccountCircleIcon /> 
            {!isCollapsed && (
              <>
                <span>Quản lý tài khoản</span>
                <i className="fa-solid fa-chevron-down submenu-icon"></i>
              </>
            )}
          </Link>
          {!isCollapsed && (
            <ul className="submenu">
              <li>
                <a href="#">Danh sách tài khoản</a>
              </li>
              <li>
                <a href="#">Thêm mới tài khoản</a>
              </li>
            </ul>
          )}
        </li>
        <li
          className={`has-submenu ${openMenuKey === "nhanhieu" ? "open" : ""}`}
        >
          <Link href={'/admin/brands'} onClick={() => toggleMenu("nhanhieu")}>
            <LabelIcon /> 
            {!isCollapsed && (
              <>
                <span>Quản lý nhãn hiệu</span>
                <i className="fa-solid fa-chevron-down submenu-icon"></i>
              </>
            )}
          </Link>
          {!isCollapsed && (
            <ul className="submenu">
              <li>
                <Link href={'/admin/brands'}>Danh sách nhãn hiệu</Link>
              </li>
              <li>
                <Link href={'/admin/brands/add'}>Thêm mới nhãn hiệu</Link>
              </li>
            </ul>
          )}
        </li>
        <li
          className={`has-submenu ${openMenuKey === "danhmuc" ? "open" : ""}`}
        >
          <Link href={'/admin/categories'} onClick={() => toggleMenu("danhmuc")}>
            <Inventory2Icon /> 
            {!isCollapsed && (
              <>
                <span>Quản lý danh mục</span>
                <i className="fa-solid fa-chevron-down submenu-icon"></i>
              </>
            )}
          </Link>
          {!isCollapsed && (
            <ul className="submenu">
              <li>
                <Link href={'/admin/categories'}>Danh sách danh mục</Link>
              </li>
              <li>
                <Link href={'/admin/categories/add'}>Thêm mới danh mục</Link>
              </li>
            </ul>
          )}
        </li>
        <li
          className={`has-submenu ${openMenuKey === "sanpham" ? "open" : ""}`}
        >
          <Link href={'/admin/products'} onClick={() => toggleMenu("sanpham")}>
            <StorefrontIcon /> 
            {!isCollapsed && (
              <>
                <span>Quản lý sản phẩm</span>
                <i className="fa-solid fa-chevron-down submenu-icon"></i>
              </>
            )}
          </Link>
          {!isCollapsed && (
            <ul className="submenu">
              <li>
                <Link href={'/admin/products/'}>Danh sách sản phẩm</Link>
              </li>
              <li>
                <Link href={'/admin/products/add'}>Thêm mới sản phẩm</Link>
              </li>
            </ul>
          )}
        </li>
        <li
          className={`has-submenu ${openMenuKey === "khuyenmai" ? "open" : ""}`}
        >
          <Link href={'/admin/voucher'} onClick={() => toggleMenu("khuyenmai")}>
            <LocalOfferIcon /> 
            {!isCollapsed && (
              <>
                <span>Quản lý khuyến mại</span>
                <i className="fa-solid fa-chevron-down submenu-icon"></i>
              </>
            )}
          </Link>
          {!isCollapsed && (
            <ul className="submenu">
              <li>
                <Link href={'/admin/voucher'}>Danh sách khuyến mại</Link>
              </li>
              <li>
                <Link href={'/admin/voucher/add'}>Thêm mới khuyến mại</Link>
              </li>
            </ul>
          )}
        </li>

        <li
          className={`has-submenu ${openMenuKey === "donhang" ? "open" : ""}`}
        >
          <Link href={'/admin/order'} onClick={() => toggleMenu("donhang")}>
            <ReceiptLongIcon /> 
            {!isCollapsed && (
              <>
                <span>Quản lý đơn hàng</span>
                <i className="fa-solid fa-chevron-down submenu-icon"></i>
              </>
            )}
          </Link>
          {!isCollapsed && (
            <ul className="submenu">
              <li>
                <Link href={"/admin/order"}>Danh sách đơn hàng</Link>
              </li>
            </ul>
          )}
        </li>
        <li
          className={`has-submenu ${openMenuKey === "baiviet" ? "open" : ""}`}
        >
          <a href="#" onClick={() => toggleMenu("baiviet")}>
            <ArticleIcon /> 
            {!isCollapsed && (
              <>
                <span>Quản lý bài viết</span>
                <i className="fa-solid fa-chevron-down submenu-icon"></i>
              </>
            )}
          </a>
          {!isCollapsed && (
            <ul className="submenu">
              <li>
                <a href="#">Danh sách bài viết</a>
              </li>
              <li>
                <a href="#">Thêm mới bài viết</a>
              </li>
            </ul>
          )}
        </li>
        <li
          className={`has-submenu ${openMenuKey === "binhluan" ? "open" : ""}`}
        >
          <Link href={'/admin/comment'} onClick={() => toggleMenu("binhluan")}>
            <CommentIcon /> 
            {!isCollapsed && (
              <>
                <span>Quản lý bình luận</span>
                <i className="fa-solid fa-chevron-down submenu-icon"></i>
              </>
            )}
          </Link>
          {!isCollapsed && (
            <ul className="submenu">
              <li>
                <Link href={'admin/comment'}>Danh sách bình luận</Link>
              </li>
              <li>
                <a href="#">Bình luận ...</a>
              </li>
            </ul>
          )}
        </li>

        <li
          className={`has-submenu ${openMenuKey === "danhgia" ? "open" : ""}`}
        >
          <a href="#" onClick={() => toggleMenu("danhgia")}>
            <RateReviewIcon /> 
            {!isCollapsed && (
              <>
                <span>Quản lý đánh giá sản phẩm</span>
                <i className="fa-solid fa-chevron-down submenu-icon"></i>
              </>
            )}
          </a>
          {!isCollapsed && (
            <ul className="submenu">
              <li>
                <a href="#">Danh sách đánh giá sản phẩm</a>
              </li>
              <li>
                <a href="#">Đánh giá sản phẩm ...</a>
              </li>
            </ul>
          )}
        </li>

        <li className="w-full custom-after-border relative !mt-[10px]"></li>
        <li className="!mt-[20px]">
          <a href="#">
            <DocumentScannerTwoTone /> 
            {!isCollapsed && <span>Tài liệu</span>}
          </a>
        </li>
        <li>
          <a href="#">
            <Help /> 
            {!isCollapsed && <span>Help</span>}
          </a>
        </li>
        <li>
          <a href="#"  className="settings-toggle">
            <Settings /> 
            {!isCollapsed && <span>Cài đặt</span>}
          </a>
        </li>
      </ul>
    </nav>
  );
}