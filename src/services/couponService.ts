import { IS_MOCK, API_BASE_URL } from "@/config/env";
import { getMockCoupon,saveMockCoupon} from "@/mocks/mockCoupon";
import { ICoupon } from "@/types/coupon";
// Thêm voucher

// Lấy giỏ hàng của user
export async function getMockCoupons(): Promise<ICoupon[]> {
  return defaultCoupons;
}

