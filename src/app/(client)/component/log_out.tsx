"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function LogoutLink() {
  const router = useRouter();

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Xóa thông tin đăng nhập
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    toast.success("Đăng xuất thành công!");

    // Chuyển hướng về trang chủ hoặc trang đăng nhập
    router.push("/login");
  };

  return (
    <a className="title-info" href="#" onClick={handleLogout} title="Đăng xuất">
      Đăng xuất
    </a>
  );
}
