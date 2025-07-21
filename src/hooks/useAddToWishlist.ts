"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  addToWishlist,
  getWishlistByUserId,
  removeFromWishlist,
} from "@/services/wishlistService";
import { checkToken } from "@/services/authService";
import { useGlobalStore } from "@/store/useGlobalStore";

export const useAddToWishlist = (productId: number, onRemoveSuccess?: () => void) => {
  const [isWished, setIsWished] = useState(false);
  const router = useRouter();

  // 👉 Lấy các action từ store Zustand
  const incrementWishlist = useGlobalStore((state) => state.incrementWishlist);
  const decrementWishlist = useGlobalStore((state) => state.decrementWishlist);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const tokenData = await checkToken();
        if (tokenData?.user?.id) {
          const wishlist = await getWishlistByUserId(tokenData.user.id);
          const wished = wishlist.some(
            (item) => Number(item.product_id) === Number(productId)
          );
          setIsWished(wished);
        }
      } catch (error) {
        console.error("Lỗi khi lấy wishlist:", error);
      }
    };

    fetchWishlist();
  }, [productId]);

  const handleAddToWishlist = async () => {
    const tokenData = await checkToken();
    if (!tokenData?.user?.id) {
      Swal.fire({
        icon: "warning",
        title: "Bạn chưa đăng nhập",
        text: "Vui lòng đăng nhập để thao tác với danh sách yêu thích.",
        confirmButtonText: "Đăng nhập",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
      return;
    }

    try {
      const userId = tokenData.user.id;

      //  Nếu đã yêu thích → XÓA
      if (isWished) {
        await removeFromWishlist({ userId, productId });
        setIsWished(false);
        decrementWishlist(); //  Trừ count
       if (onRemoveSuccess) onRemoveSuccess();
        Swal.fire({
          icon: "success",
          title: "Đã xóa",
          text: "Đã xóa sản phẩm khỏi danh sách yêu thích.",
          timer: 1500,
          showConfirmButton: false,
        });
        return;
      }

      //  Nếu chưa yêu thích → THÊM
      const response = await addToWishlist({
        user_id: userId,
        product_id: Number(productId),
      });

      if (
        response.message === "Đã thêm vào danh sách yêu thích." ||
        response.message === "Sản phẩm đã có trong danh sách yêu thích."
      ) {
        setIsWished(true);
        incrementWishlist(); //  Cộng count
      }

      Swal.fire({
        icon: "success",
        title: "Thành công",
        text: response.message,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Lỗi khi thao tác wishlist:", error);
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Đã có lỗi xảy ra khi thao tác với wishlist.",
      });
    }
  };

  return { isWished, handleAddToWishlist };
};
