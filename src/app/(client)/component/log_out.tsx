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

      useGlobalStore.getState().logoutUser();

      Swal.fire({
        title: result.message || "Đăng xuất thành công!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      router.push("/login");
    } catch (error: any) {
      Swal.fire({
        title: "Đăng xuất thất bại",
        text: error.message || "Có lỗi xảy ra",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <a className="title-info" href="#" onClick={handleLogout} title="Đăng xuất">
      Đăng xuất
    </a>
  );
}
