"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { logoutUser } from "@/services/authService";

export default function LogoutLink() {
  const router = useRouter();

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    try {
      const result = await logoutUser();
      toast.success(result.message || "Đăng xuất thành công!");
      // Chuyển hướng về trang đăng nhập
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message || "Đăng xuất thất bại");
    }
  };

  return (
    <a className="title-info" href="#" onClick={handleLogout} title="Đăng xuất">
      Đăng xuất
    </a>
  );
}
