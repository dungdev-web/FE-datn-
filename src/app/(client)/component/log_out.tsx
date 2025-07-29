"use client";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { logoutUser as apiLogoutUser } from "@/services/authService";
import { useGlobalStore } from "@/store/useGlobalStore";

export default function LogoutLink() {
  const router = useRouter();

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const confirm = await Swal.fire({
      title: "Bạn chắc chắn muốn đăng xuất?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đăng xuất",
      cancelButtonText: "Hủy",
    });

    if (!confirm.isConfirmed) return;

    try {
      const result = await apiLogoutUser();

      // ✅ Cập nhật Zustand store để header tự động re-render
      useGlobalStore.getState().logoutUser();

      toast.success(result.message || "Đăng xuất thành công!");
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
