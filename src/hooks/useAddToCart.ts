"use client";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { addToCart } from "@/services/cartService";
import { checkToken } from "@/services/authService";

export const useAddToCart = () => {
  const router = useRouter();

  const handleAddToCart = async ({
    variant_id,
    quantity = 1, // ✅ mặc định là 1
    price,
  }: {
    variant_id: number;
    quantity?: number; // ✅ quantity không bắt buộc truyền
    price: number;
  }) => {
    try {
      const tokenData = await checkToken();
      if (!tokenData?.user?.id) {
        Swal.fire({
          icon: "warning",
          title: "Bạn chưa đăng nhập",
          text: "Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.",
          confirmButtonText: "Đăng nhập",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/login");
          }
        });
        return;
      }

      const response = await addToCart({
        user_id: tokenData.user.id,
        variant_id,
        quantity,
        price,
      });

      Swal.fire({
        icon: "success",
        title: "Đã thêm vào giỏ hàng!",
        text: response.message,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Lỗi thêm giỏ hàng:", error);
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: (error as Error).message || "Thêm sản phẩm thất bại",
      });
    }
  };

  return { handleAddToCart };
};
