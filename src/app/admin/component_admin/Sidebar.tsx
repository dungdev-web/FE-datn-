"use client";
import React, { useState } from "react";
import "../css/dashboard.css";
import "../css/css.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, UserCircle, Tag, Grid, Package, Store, Percent, Receipt, FileText, Star, FileSearch, ChevronDown } from "lucide-react";
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

  const pathname = usePathname();

  return (
    <nav className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
  <ul className="menu">
    <li>
      <div className="logo">
        <img src="/images/logo/logo-xanh.png" alt="" />
      </div>
    </li>

    <li>
      <Link
        href={"/admin"}
        className={`flex items-center ${pathname === "/admin" ? "tick" : ""}`}
      >
        <LayoutDashboard size={20} />
        {!isCollapsed && <span>Dashboard</span>}
      </Link>
    </li>

    <li>
      <Link
        href={"/admin/user"}
        className={`flex items-center ${pathname === "/admin/user" ? "tick" : ""}`}
        onClick={() => toggleMenu("taikhoan")}
      >
        <UserCircle size={20} />
        {!isCollapsed && <span>Quản lý tài khoản</span>}
      </Link>
    </li>

    <li className={`has-submenu ${openMenuKey === "nhanhieu" ? "open" : ""}`}>
      <Link
        href={"/admin/brands"}
        className={`flex items-center ${pathname === "/admin/brands" ? "tick" : ""}`}
        onClick={() => toggleMenu("nhanhieu")}
      >
        <Tag size={20} />
        {!isCollapsed && (
          <>
            <span>Quản lý nhãn hiệu</span>
            <ChevronDown size={16} className="submenu-icon" />
          </>
        )}
      </Link>
      {!isCollapsed && (
        <ul className="submenu">
          <li><Link href={"/admin/brands"}>Danh sách nhãn hiệu</Link></li>
          <li><Link href={"/admin/brands/add"}>Thêm mới nhãn hiệu</Link></li>
        </ul>
      )}
    </li>

    <li className={`has-submenu ${openMenuKey === "danhmucbaiviet" ? "open" : ""}`}>
      <Link
        href={"/admin/categories_post"}
        className={`flex items-center ${pathname === "/admin/categories_post" ? "tick" : ""}`}
        onClick={() => toggleMenu("danhmucbaiviet")}
      >
        <Grid size={20} />
        {!isCollapsed && (
          <>
            <span>Quản lý danh mục bài viết</span>
            <ChevronDown size={16} className="submenu-icon" />
          </>
        )}
      </Link>
      {!isCollapsed && (
        <ul className="submenu">
          <li><Link href={"/admin/categories"}>Danh sách danh mục bài viết</Link></li>
          <li><Link href={"/admin/categories/add"}>Thêm mới danh mục bài viết</Link></li>
        </ul>
      )}
    </li>

    <li className={`has-submenu ${openMenuKey === "danhmuc" ? "open" : ""}`}>
      <Link
        href={"/admin/categories"}
        className={`flex items-center ${pathname === "/admin/categories" ? "tick" : ""}`}
        onClick={() => toggleMenu("danhmuc")}
      >
        <Package size={20} />
        {!isCollapsed && (
          <>
            <span>Quản lý danh mục</span>
            <ChevronDown size={16} className="submenu-icon" />
          </>
        )}
      </Link>
      {!isCollapsed && (
        <ul className="submenu">
          <li><Link href={"/admin/categories"}>Danh sách danh mục</Link></li>
          <li><Link href={"/admin/categories/add"}>Thêm mới danh mục</Link></li>
        </ul>
      )}
    </li>

    <li className={`has-submenu ${openMenuKey === "sanpham" ? "open" : ""}`}>
      <Link
        href={"/admin/products"}
        className={`flex items-center ${pathname === "/admin/products" ? "tick" : ""}`}
        onClick={() => toggleMenu("sanpham")}
      >
        <Store size={20} />
        {!isCollapsed && (
          <>
            <span>Quản lý sản phẩm</span>
            <ChevronDown size={16} className="submenu-icon" />
          </>
        )}
      </Link>
      {!isCollapsed && (
        <ul className="submenu">
          <li><Link href={"/admin/products"}>Danh sách sản phẩm</Link></li>
          <li><Link href={"/admin/products/add"}>Thêm mới sản phẩm</Link></li>
        </ul>
      )}
    </li>

    <li className={`has-submenu ${openMenuKey === "khuyenmai" ? "open" : ""}`}>
      <Link
        href={"/admin/voucher"}
        className={`flex items-center ${pathname === "/admin/voucher" ? "tick" : ""}`}
        onClick={() => toggleMenu("khuyenmai")}
      >
        <Percent size={20} />
        {!isCollapsed && (
          <>
            <span>Quản lý khuyến mại</span>
            <ChevronDown size={16} className="submenu-icon" />
          </>
        )}
      </Link>
      {!isCollapsed && (
        <ul className="submenu">
          <li><Link href={"/admin/voucher"}>Danh sách khuyến mại</Link></li>
          <li><Link href={"/admin/voucher/add"}>Thêm mới khuyến mại</Link></li>
        </ul>
      )}
    </li>

    <li className={`has-submenu ${openMenuKey === "donhang" ? "open" : ""}`}>
      <Link
        href={"/admin/order"}
        className={`flex items-center ${pathname === "/admin/order" ? "tick" : ""}`}
        onClick={() => toggleMenu("donhang")}
      >
        <Receipt size={20} />
        {!isCollapsed && (
          <>
            <span>Quản lý đơn hàng</span>
            <ChevronDown size={16} className="submenu-icon" />
          </>
        )}
      </Link>
      {!isCollapsed && (
        <ul className="submenu">
          <li><Link href={"/admin/order"}>Danh sách đơn hàng</Link></li>
        </ul>
      )}
    </li>

    <li className={`has-submenu ${openMenuKey === "baiviet" ? "open" : ""}`}>
      <Link
        href={"/admin/blog"}
        className={`flex items-center ${pathname === "/admin/blog" ? "tick" : ""}`}
        onClick={() => toggleMenu("baiviet")}
      >
        <FileText size={20} />
        {!isCollapsed && (
          <>
            <span>Quản lý bài viết</span>
            <ChevronDown size={16} className="submenu-icon" />
          </>
        )}
      </Link>
      {!isCollapsed && (
        <ul className="submenu">
          <li><a href="#">Danh sách bài viết</a></li>
          <li><a href="#">Thêm mới bài viết</a></li>
        </ul>
      )}
    </li>

    <li className={`has-submenu ${openMenuKey === "danhgia" ? "open" : ""}`}>
      <Link
        href={"/admin/comment"}
        className={`flex items-center ${pathname === "/admin/comment" ? "tick" : ""}`}
        onClick={() => toggleMenu("danhgia")}
      >
        <Star size={20} />
        {!isCollapsed && (
          <>
            <span>Quản lý đánh giá sản phẩm</span>
            <ChevronDown size={16} className="submenu-icon" />
          </>
        )}
      </Link>
      {!isCollapsed && (
        <ul className="submenu">
          <li><a href="#">Danh sách đánh giá sản phẩm</a></li>
          <li><a href="#">Đánh giá sản phẩm ...</a></li>
        </ul>
      )}
    </li>

    <li className="w-full custom-after-border relative !mt-[10px]"></li>
    <li className="!mt-[20px]">
      <Link href="/">
        <FileSearch size={20} />
        {!isCollapsed && <span>Quay về trang chủ</span>}
      </Link>
    </li>
  </ul>
</nav>
  );
}