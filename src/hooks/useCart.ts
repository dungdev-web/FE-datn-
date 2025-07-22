"use client";
import { useEffect, useState } from "react";
import {
  getCartByUserId,
  removeFromCart,
  updateCartItem,
} from "@/services/cartService";
import { checkToken } from "@/services/authService";
import { ICart, ICartItem } from "@/types/cart";
import { useGlobalStore } from "@/store/useGlobalStore";
import Swal from "sweetalert2";

export const useCart = () => {
  const [cart, setCart] = useState<ICart | null>(null);
  const incrementCart = useGlobalStore((state) => state.incrementCart);
  const decrementCart = useGlobalStore((state) => state.decrementCart);
  const cartCount = useGlobalStore((state) => state.cartCount);
  const SHIPPING_COST = 30000;
  const FREE_SHIPPING_THRESHOLD = 7000000;

  const subtotal =
    cart?.cart_items.reduce(
      (sum, item) => sum + Number(item.price || 0) * item.quantity,
      0
    ) || 0;

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipprice = isFreeShipping ? 0 : SHIPPING_COST;
  const remainingAmount = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(
    100,
    Math.floor((subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  const fetchCart = async () => {
    try {
      const tokenData = await checkToken();
      const userId = tokenData?.user?.id;
      if (!userId) throw new Error("Token không hợp lệ");

      const cartData = await getCartByUserId(userId);
      setCart(cartData);
    } catch (error) {
      console.error("Lỗi khi lấy giỏ hàng:", error);
    }
  };

  const handleUpdateQuantity = async (
    cartItemId: number,
    newQuantity: number
  ) => {
    const item = cart?.cart_items.find((i) => i.cart_items_id === cartItemId);
    const userId = cart?.user_id;
    if (!item || !userId) return;

    const oldQuantity = item.quantity;
    const delta = newQuantity - oldQuantity;

    try {
      await updateCartItem({
        user_id: userId,
        variant_id: item.variant_id,
        quantity: newQuantity,
      });

      delta > 0
        ? Array(delta)
            .fill(0)
            .forEach(() => incrementCart())
        : Array(Math.abs(delta))
            .fill(0)
            .forEach(() => decrementCart());

      setCart((prev) => {
        if (!prev) return prev;
        const newItems = prev.cart_items.map((i) =>
          i.cart_items_id === cartItemId ? { ...i, quantity: newQuantity } : i
        );
        return { ...prev, cart_items: newItems };
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật số lượng:", error);
    }
  };

  const handleRemoveItem = async (cartItemId: number) => {
    const item = cart?.cart_items.find((i) => i.cart_items_id === cartItemId);
    const userId = cart?.user_id;
    if (!item || !userId) return;

    const confirmResult = await Swal.fire({
      title: "Bạn có chắc muốn xoá?",
      text: "Sản phẩm sẽ bị xoá khỏi giỏ hàng.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xoá",
      cancelButtonText: "Huỷ",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const res = await removeFromCart({
        user_id: userId,
        variant_id: item.variant_id,
      });

      if (res.data.count > 0) {
        for (let i = 0; i < item.quantity; i++) decrementCart();
        await Swal.fire(
          "Đã xoá!",
          "Sản phẩm đã được xoá khỏi giỏ hàng.",
          "success"
        );
        await fetchCart();
      } else {
        Swal.fire("Không tìm thấy!", "Sản phẩm đã bị xoá trước đó.", "info");
      }
    } catch (error) {
      console.error("Lỗi khi xoá sản phẩm:", error);
      Swal.fire("Lỗi!", "Không thể xoá sản phẩm. Vui lòng thử lại.", "error");
    }
  };

  const handleChangeQuantity = (
    itemId: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const num = parseInt(e.target.value, 10);
    if (!isNaN(num) && num >= 1 && num <= 999) {
      handleUpdateQuantity(itemId, num);
    }
  };

  const handlePlus = (itemId: number) => {
    const item = cart?.cart_items.find((i) => i.cart_items_id === itemId);
    if (!item) return;
    handleUpdateQuantity(itemId, Math.min(999, item.quantity + 1));
  };

  const handleMinus = (itemId: number) => {
    const item = cart?.cart_items.find((i) => i.cart_items_id === itemId);
    if (!item) return;
    handleUpdateQuantity(itemId, Math.max(1, item.quantity - 1));
  };

  useEffect(() => {
    fetchCart();
  }, [cartCount]);

  return {
    cart,
    subtotal,
    shipprice,
    isFreeShipping,
    progressPercent,
    remainingAmount,
    handlePlus,
    handleMinus,
    handleChangeQuantity,
    handleRemoveItem,
    fetchCart,
  };
};
