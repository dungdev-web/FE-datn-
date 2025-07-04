// mocks/mockCart.ts
import { ICoupon } from "@/types/coupon";
const defaultCoupon: ICoupon[] = [
  {
    coupons_id: 1,
    code: "SALE50",
    discount_type: "percent", // hoặc "fixed"
    start_date: new Date("2025-07-01"),
    end_date: new Date("2025-07-31"),
    usage_limit: 100,
    used_count: 25,
  },
  {
    coupons_id: 2,
    code: "FREESHIP",
    discount_type: "fixed",
    start_date: new Date("2025-07-01"),
    end_date: new Date("2025-12-31"),
    usage_limit: 500,
    used_count: 300,
  },
  {
    coupons_id: 3,
    code: "NEWUSER100",
    discount_type: "fixed",
    start_date: new Date("2025-01-01"),
    end_date: new Date("2025-12-31"),
    usage_limit: 1000,
    used_count: 850,
  },
];

export const getMockCoupon = (): ICoupon[] => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("mockCoupons");
    return stored ? JSON.parse(stored) : defaultCoupon;
  }
  return defaultCoupon;
};

export const saveMockCoupon = (coupons: ICoupon[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("mockCoupons", JSON.stringify(coupons));
  }
};
