"use client";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { checkToken } from "@/services/authService";
import { addCompareProduct } from "@/services/productService";
import { useCompare } from "@/app/(client)/component/product_compare/compare_context";
import { useGlobalStore } from "@/store/useGlobalStore";
export const useAddToCompare = () => {
  const router = useRouter();
  const { refresh } = useCompare();
  const { incrementCompare } = useGlobalStore();

  const handleAddCompare = async ({ productId }: { productId: number }) => {
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
      const user_id = tokenData.user.id;
      const response = await addCompareProduct(user_id, productId);

      Swal.fire({
        icon: "success",
        title: "Đã thêm vào sản phẩm so sánh!",
        text: response.message,
        showConfirmButton: false,
        timer: 1500,
      });

      await refresh();
      incrementCompare();
    } catch (error) {
      console.error("Lỗi thêm sản phẩm so sánh:", error);
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: (error as Error).message || "Thêm sản phẩm thất bại",
      });
    }
  };

  return { handleAddCompare };
};
