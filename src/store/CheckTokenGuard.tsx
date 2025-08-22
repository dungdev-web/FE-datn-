"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkToken } from "@/services/authService";
import Swal from "sweetalert2";

interface Props {
  children: React.ReactNode;
}

export default function CheckTokenGuard({ children }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const data = await checkToken();
        if (!data) {
          await Swal.fire({
            icon: "warning",
            title: "Phiên đăng nhập đã hết hạn",
            text: "Vui lòng đăng nhập lại để tiếp tục.",
            timer: 2500,
            showConfirmButton: false,
            timerProgressBar: true,
          });
          setTimeout(() => {
            router.replace("/login");
          }, 2500);
        }
      } catch (err) {
        console.error("Token lỗi:", err);
        await Swal.fire({
          icon: "warning",
          title: "Không thể xác thực phiên làm việc",
          text: "Vui lòng đăng nhập lại để tiếp tục.",
          timer: 2500,
          showConfirmButton: false,
          timerProgressBar: true,
        });
        setTimeout(() => {
          router.replace("/login");
        }, 2500);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [router]);

  if (loading) {
  }

  return <>{children}</>;
}
