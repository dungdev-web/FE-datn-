"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { checkToken } from "@/services/authService";
import { addCompareProduct } from "@/services/productService";
import { useCompare } from "@/app/(client)/component/product_compare/compare_context";
import { useGlobalStore } from "@/store/useGlobalStore";
import { deleteCompareProduct } from "@/services/productService";
export const useAddToCompare = (productId: number) => {
  const router = useRouter();
  const { refresh } = useCompare();
  const { incrementCompare } = useGlobalStore();
  const [isCompared, setIsCompared] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddCompare = async () => {
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
      setLoading(true);

      const user_id = tokenData.user.id;
      const response = await addCompareProduct(user_id, productId);

      Swal.fire({
        icon: "success",
        title: "Đã thêm vào sản phẩm so sánh!",
        text: response.message,
        showConfirmButton: false,
        timer: 1500,
      });
      setIsCompared(true);

      await refresh();
      incrementCompare();
    } catch (error) {
      console.error("Lỗi thêm sản phẩm so sánh:", error);
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: (error as Error).message || "Thêm sản phẩm thất bại",
      });
    } finally {
      setLoading(false);
    }
  };

  return { handleAddCompare, isCompared, loading };
};
export const useRemoveCompare = () => {
  const { refresh } = useCompare();
  const { decrementCompare } = useGlobalStore();

  const handleRemoveCompare = async (productId: number) => {
    try {
      const tokenData = await checkToken();
      const user_id = Number(tokenData?.user?.id);
      await deleteCompareProduct(user_id, productId);

      refresh();
      decrementCompare();

      Swal.fire({
        icon: "success",
        title: "Đã xoá sản phẩm khỏi so sánh",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Lỗi khi xoá sản phẩm so sánh:", error);
      Swal.fire({
        icon: "error",
        title: "Không thể xoá sản phẩm",
        text: "Đã xảy ra lỗi. Vui lòng thử lại.",
      });
    }
  };

  return { handleRemoveCompare };
};
