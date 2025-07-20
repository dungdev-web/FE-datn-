"use client";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { checkToken } from "@/services/authService";
import { addCompareProduct, getCompareProduct } from "@/services/productService";

export const useAddToCompare = (productId: number) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [isCompared, setIsCompared] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserAndCheckCompared = async () => {
      try {
        const user = await checkToken();
        if (!user?.user?.id) return;

        setUserId(user.user.id);

        const compareList = await getCompareProduct(user.user.id);
        const isExist = compareList.some(
          (item: any) => item.product?.products_id === productId
        );
        setIsCompared(isExist);
      } catch (err) {
        console.error("Lỗi khi xác thực hoặc kiểm tra compare:", err);
      }
    };

    fetchUserAndCheckCompared();
  }, [productId]);

  const handleAddToCompare = async () => {
    if (loading || isCompared || !userId) return;

    setLoading(true);
    try {
      await addCompareProduct(userId, productId);
      setIsCompared(true);
      Swal.fire({
        icon: "success",
        title: "Đã thêm vào so sánh!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.error("Thêm vào so sánh thất bại:", err);
      Swal.fire({
        icon: "error",
        title: "Thêm vào so sánh thất bại!",
        text: "Vui lòng thử lại.",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    isCompared,
    handleAddToCompare,
    loading,
  };
};
