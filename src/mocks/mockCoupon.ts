// mocks/mockCart.ts
import { ICoupon } from "@/types/coupon";
const defaultCoupon: ICoupon[] = [
 {
    coupons_id: 1,
    code: "SALE2024",
    discount_type: "percentage",
    discount_value: "0.1",
    start_date: "2026-01-15T00:00:00.000Z",
    end_date: "2027-12-09T00:00:00.000Z",
    usage_limit: 1000,
    used_count: 100,
    created_at: "2025-05-31T08:31:52.000Z",
    updated_at: "2025-07-11T11:07:05.000Z",
  },
  {
    coupons_id: 2,
    code: "SALE2025",
    discount_type: "percentage",
    discount_value: "0.1",
    start_date: "2026-01-15T00:00:00.000Z",
    end_date: "2027-12-09T00:00:00.000Z",
    usage_limit: 1000,
    used_count: 100,
    created_at: "2025-05-31T08:31:52.000Z",
    updated_at: "2025-07-11T11:07:05.000Z",
  },
  {
    coupons_id: 3,
    code: "SALE2027",
    discount_type: "percentage",
    discount_value: "0.1",
    start_date: "2026-01-15T00:00:00.000Z",
    end_date: "2027-12-09T00:00:00.000Z",
    usage_limit: 1000,
    used_count: 100,
    created_at: "2025-05-31T08:31:52.000Z",
    updated_at: "2025-07-11T11:07:05.000Z",
  }
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
