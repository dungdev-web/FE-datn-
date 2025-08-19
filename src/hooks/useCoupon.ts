import { useEffect, useState } from "react";
import { getCouponList } from "@/services/couponService";
import { ICoupon } from "@/types/coupon";
import { toast } from "react-toastify";

export function useCoupon(
  subtotal: number,
  cartId: number | string,
  isCheckingOut: boolean = false // cờ để biết đang checkout hay không
) {
  const [appliedCoupon, setAppliedCoupon] = useState<ICoupon | null>(null);
  const [error, setError] = useState<string>("");

  const storageKey = `appliedCoupon_${cartId}`;

  // Khôi phục coupon từ localStorage
  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const parsed: ICoupon = JSON.parse(stored);
        setAppliedCoupon(parsed);
      } catch {
        localStorage.removeItem(storageKey);
      }
    }
  }, [cartId]);

  // Gỡ mã nếu subtotal < min_order và không đang checkout
  useEffect(() => {
    if (appliedCoupon && subtotal < appliedCoupon.min_order && !isCheckingOut) {
      setAppliedCoupon(null);
      localStorage.removeItem(storageKey);
      toast.warn("Mã giảm giá đã bị gỡ do đơn hàng không đủ điều kiện.");
    }
  }, [subtotal, appliedCoupon, storageKey, isCheckingOut]);

  const applyCoupon = async (code: string) => {
    const coupons = await getCouponList();
    const coupon = coupons.find(
      (c) => c.code.toLowerCase() === code.toLowerCase()
    );

    if (!coupon) return setError("Mã không tồn tại.");

    const now = new Date();
    const start = new Date(coupon.start_date);
    const end = new Date(coupon.end_date);

    if (start > now || end < now)
      return setError("Mã đã hết hạn hoặc chưa bắt đầu.");
    if (coupon.usage_limit <= coupon.used_count)
      return setError("Mã đã được sử dụng hết lượt.");
    if (subtotal < coupon.min_order)
      return setError(
        `Đơn hàng cần tối thiểu ${coupon.min_order.toLocaleString(
          "vi"
        )}₫ để áp dụng mã này.`
      );

    if (appliedCoupon && appliedCoupon.code === coupon.code)
      return setError("Bạn đã áp dụng mã này.");
    if (appliedCoupon)
      return setError("Chỉ được áp dụng một mã giảm giá mỗi đơn hàng.");

    setAppliedCoupon(coupon);
    localStorage.setItem(storageKey, JSON.stringify(coupon));
    toast.success(`Áp dụng mã ${coupon.code} thành công!`);
    setError("");
  };

  const getDiscountAmount = (): number => {
    if (!appliedCoupon) return 0;

    const discountValue = Number(appliedCoupon.discount_value);
    if (appliedCoupon.discount_type === "percentage") {
      return Math.floor((subtotal * discountValue) / 100);
    } else {
      return discountValue;
    }
  };

  // Trong useCoupon
  const resetCoupon = (showToast = true) => {
    if (appliedCoupon && showToast) {
      toast.warn(`Đã hủy mã ${appliedCoupon.code}`);
    }
    setAppliedCoupon(null);
    localStorage.removeItem(storageKey);
    setError("");
  };

  return {
    appliedCoupon,
    applyCoupon,
    error,
    getDiscountAmount,
    resetCoupon,
  };
}
