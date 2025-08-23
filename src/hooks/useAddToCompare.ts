"use client";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import { checkToken } from "@/services/authService";
import { addCompareProduct } from "@/services/productService";
import { useCompare } from "@/app/(client)/component/ProductCompare/CompareContext";
import { useGlobalStore } from "@/store/useGlobalStore";
import { deleteCompareProduct } from "@/services/productService";
export const useAddToCompare = (productId: number) => {
  const router = useRouter();
  const { refresh } = useCompare();
  const { incrementCompare } = useGlobalStore();
  const [isCompared, setIsCompared] = useState(false);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleAddCompare = async () => {
    try {
      const tokenData = await checkToken();
      if (!tokenData?.user?.id) {
        const currentUrl =
          pathname +
          (searchParams.toString() ? `?${searchParams.toString()}` : "");

        Swal.fire({
          icon: "warning",
          title: "Bạn chưa đăng nhập",
          text: "Vui lòng đăng nhập để thêm sản phẩm vào so sánh.",
          confirmButtonText: "Đăng nhập",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push(`/login?redirect=${encodeURIComponent(currentUrl)}`);
          }
        });
        return;
      }

      setLoading(true);

      const user_id = tokenData.user.id;
      const response = await addCompareProduct(user_id, productId);

      Swal.fire({
        icon: "success",
        title: "Đã thêm sản phẩm vào so sánh!",
        text: response.message,
        showConfirmButton: false,
        timer: 1500,
      });

      setIsCompared(true);
      await refresh();
      incrementCompare();
    } catch (err: any) {
  console.error("Lỗi thêm sản phẩm so sánh:", err);

  const status = err?.status; 
  let message = "Thêm sản phẩm thất bại";
  let icon: "error" | "warning" | "info" | "question" = "error";

  switch (status) {
    case 409:
      message = "Sản phẩm này đã có trong danh sách so sánh!";
      icon = "info";
      break;
    case 403:
      message = "Bạn chỉ có thể thêm 3 sản phẩm vào so sánh.";
      icon = "warning";
      break;
    case 401:
      message = "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.";
      icon = "warning";
      break;
    case 500:
      message = "Lỗi hệ thống. Vui lòng thử lại sau.";
      icon = "error";
      break;
    default:
      message = err?.message || message;
  }

  Swal.fire({
    icon,
    title: "Thông báo",
    text: message,
  });
}
 finally {
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
