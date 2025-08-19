"use client";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { addToCart } from "@/services/cartService";
import { checkToken } from "@/services/authService";
import { useGlobalStore } from "@/store/useGlobalStore";

interface Variant {
  id: number;
  stock_quantity: number;
  name?: string;
}

interface AddToCartParams {
  variant: Variant;
  quantity?: number;
}

export const useAddToCart = () => {
  const router = useRouter();
  const { incrementCart } = useGlobalStore();

  const handleAddToCart = async ({
    variant,
    quantity = 1,
  }: AddToCartParams) => {
    try {
      if (!variant?.id) {
        Swal.fire({
          icon: "info",
          title: "Thông báo",
          text: "Sản phẩm không hợp lệ.",
        });
        return;
      }
      if (!variant || !variant.id) {
        Swal.fire({
          icon: "info",
          title: "Thông báo",
          text: "Sản phẩm không có phiên bản hợp lệ để thêm vào giỏ.",
        });
        return;
      }

      if (variant.stock_quantity <= 0) {
        Swal.fire({
          icon: "warning",
          title: "Hết hàng!",
          text: "Sản phẩm này đã hết hàng, không thể thêm vào giỏ.",
        });
        return;
      }

      const tokenData = await checkToken();
      if (!tokenData?.user?.id) {
        Swal.fire({
          icon: "info",
          title: "Thông báo",
          text: "Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.",
          confirmButtonText: "Đăng nhập",
        }).then((result) => {
          if (result.isConfirmed) router.push("/login");
        });
        return;
      }

      const response = await addToCart({
        userId: tokenData.user.id,
        productVariantId: variant.id,
        quantity,
      });

      if (response?.success === false) {
        if (
          response.type === "OUT_OF_STOCK" ||
          response.type === "NOT_ENOUGH_STOCK"
        ) {
          let remaining = 0;

          if (response.type === "OUT_OF_STOCK") {
            remaining = Array.isArray(response.details)
              ? response.details[0]?.stock ?? 0
              : 0;
          } else if (response.type === "NOT_ENOUGH_STOCK") {
            remaining = response.details?.remaining ?? 0;
          }

          if (remaining <= 0) {
            Swal.fire({
              icon: "warning",
              title: "Hết hàng!",
              text: `${variant.name || "Sản phẩm"} đã hết hàng.`,
            });
          } else {
            Swal.fire({
              icon: "info",
              title: "Thông báo",
              text: `Chỉ còn ${remaining} sản phẩm trong kho.`,
            });
          }
          return;
        }

        Swal.fire({
          icon: "info",
          title: "Thông báo",
          text: response.message || "Không thể thêm sản phẩm vào giỏ.",
        });
        return;
      }

      // Thêm thành công
      incrementCart();
      Swal.fire({
        icon: "success",
        title: "Đã thêm vào giỏ hàng!",
        text: response.message,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error: any) {
      console.error("Lỗi thêm giỏ hàng:", error);

      Swal.fire({
        icon: "info",
        title: "Thông báo",
        text: error?.message || "Thêm sản phẩm thất bại",
      });
    }
  };

  return { handleAddToCart };
};
