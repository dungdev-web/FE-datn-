import { useEffect, useState } from "react";
import { getCouponList } from "@/services/couponService";
import { ICoupon } from "@/types/coupon";
import { toast } from "react-toastify";

export function useCoupon(subtotal: number, cartId: number | string) {
  const [appliedCoupons, setAppliedCoupons] = useState<ICoupon[]>([]);
  const [error, setError] = useState<string>("");

  const storageKey = `appliedCoupons_${cartId}`;

  // Khôi phục mã từ localStorage
  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const parsed: ICoupon[] = JSON.parse(stored);
        setAppliedCoupons(parsed);
      } catch {
        localStorage.removeItem(storageKey);
      }
    }
  }, [cartId]);

  const applyCoupon = async (code: string) => {
    const coupons = await getCouponList();
    const coupon = coupons.find(
      (c) => c.code.toLowerCase() === code.toLowerCase()
    );

    if (!coupon) return setError("Mã không tồn tại.");

    const now = new Date();
    const start = new Date(coupon.start_date);
    const end = new Date(coupon.end_date);

    if (start > now || end < now) {
      return setError("Mã đã hết hạn hoặc chưa bắt đầu.");
    }

    if (coupon.usage_limit <= coupon.used_count) {
      return setError("Mã đã được sử dụng hết lượt.");
    }

    if (subtotal < 500_000) {
      return setError("Đơn hàng phải từ 500.000₫ mới được áp dụng mã giảm giá.");
    }

    if (appliedCoupons.find((c) => c.code === coupon.code)) {
      return setError("Bạn đã áp dụng mã này.");
    }

    if (subtotal < 1_000_000 && appliedCoupons.length > 0) {
      return setError("Đơn hàng dưới 1 triệu chỉ được áp dụng 1 mã.");
    }

    const sameType = appliedCoupons.find(
      (c) => c.discount_type === coupon.discount_type
    );
    if (sameType) {
      return setError(
        `Chỉ được áp dụng 1 mã giảm ${
          coupon.discount_type === "percentage" ? "phần trăm" : "cố định"
        }.`
      );
    }

    if (appliedCoupons.length >= 2) {
      return setError("Chỉ được áp dụng tối đa 2 mã.");
    }

    const newCoupons = [...appliedCoupons, coupon];
    setAppliedCoupons(newCoupons);
    localStorage.setItem(storageKey, JSON.stringify(newCoupons));
    toast.success(`Áp dụng mã ${coupon.code} thành công!`);
    setError("");
  };

  const getDiscountAmount = (): number => {
    return appliedCoupons.reduce((total, coupon) => {
      if (coupon.discount_type === "percentage") {
        return total + Math.floor((subtotal * coupon.discount_value) / 100);
      } else {
        return total + coupon.discount_value;
      }
    }, 0);
  };

  const resetCoupon = (code: string) => {
    const updated = appliedCoupons.filter((c) => c.code !== code);
    setAppliedCoupons(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    toast.warn(`Đã hủy mã ${code}`);
    setError("");
  };

  // Theo dõi subtotal, tự gỡ mã nếu không còn hợp lệ
  useEffect(() => {
    const updated = appliedCoupons.filter((coupon, index) => {
      if (subtotal < 500000) return false;
      if (subtotal < 1_000_000 && appliedCoupons.length > 1) {
        return index === 0;
      }
      return true;
    });

    if (updated.length !== appliedCoupons.length) {
      setAppliedCoupons(updated);
      localStorage.setItem(storageKey, JSON.stringify(updated));
      toast.warn("Một số mã đã bị gỡ do đơn hàng không đủ điều kiện.");
    }
  }, [subtotal, appliedCoupons, storageKey]);

  return {
    appliedCoupons,
    applyCoupon,
    error,
    getDiscountAmount,
    resetCoupon,
  };
}
