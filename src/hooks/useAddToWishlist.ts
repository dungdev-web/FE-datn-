"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { addToWishlist, getWishlistByUserId } from "@/services/wishlistService";
import { checkToken } from "@/services/authService";
import { useGlobalStore } from "@/store/useGlobalStore";


export const useAddToWishlist = (productId: number) => {
  const [isWished, setIsWished] = useState(false);
  const router = useRouter();
  const { incrementWishlist } = useGlobalStore();
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
    if (isWished) {
      Swal.fire({
        icon: "info",
        title: "Đã yêu thích",
        text: "Sản phẩm đã nằm trong danh sách yêu thích.",
      });
      return;
    }

    try {
      const tokenData = await checkToken();
      if (!tokenData?.user?.id) {
        Swal.fire({
          icon: "warning",
          title: "Bạn chưa đăng nhập",
          text: "Vui lòng đăng nhập để thêm sản phẩm vào danh sách yêu thích.",
          confirmButtonText: "Đăng nhập",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/login");
          }
        });
        return;
      }

      const response = await addToWishlist({
        user_id: tokenData.user.id,
        product_id: Number(productId),
      });

      if (
        response.message === "Đã thêm vào danh sách yêu thích." ||
        response.message === "Sản phẩm đã có trong danh sách yêu thích."
      ) {
        setIsWished(true);
        incrementWishlist();

      }

      Swal.fire({
        icon: "success",
        title: "Thành công",
        text: response.message,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Lỗi thêm vào wishlist:", error);
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Thêm vào yêu thích thất bại!",
      });
    }
  };

  return { isWished, handleAddToWishlist };
};
