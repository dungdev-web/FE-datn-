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
        const token = localStorage.getItem("token");
         if (!token) {
          console.error("Token không tồn tại");
          return;
        }
        const data = await checkToken(token);
        if (!data) {
          await Swal.fire({
            icon: "error",
            title: "Token không hợp lệ",
            text: "Bạn sẽ được chuyển hướng sau giây lát...",
            timer: 2000,
            showConfirmButton: false,
            timerProgressBar: true,
          });
          setTimeout(() => {
            router.replace("/login");
          }, 2000);
        }
      } catch (err) {
        console.error("Token lỗi:", err);
        await Swal.fire({
          icon: "error",
          title: "Lỗi kiểm tra token",
          text: "Bạn sẽ được chuyển hướng sau giây lát...",
          timer: 2000,
          showConfirmButton: false,
          timerProgressBar: true,
        });
        setTimeout(() => {
          router.replace("/login");
        }, 2000);
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
