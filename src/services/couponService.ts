import { IS_MOCK, API_BASE_URL } from "@/config/env";
import { getMockCoupon,saveMockCoupon} from "@/mocks/mockCoupon";
import { ICoupon } from "@/types/coupon";

// Lấy giỏ hàng của user
export async function getCouponList(): Promise<ICoupon[]> {
  if (IS_MOCK) {
    return getMockCoupon();
  }

  try {
    const res = await fetch(`${API_BASE_URL}/product/coupons`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Không thể lấy danh sách coupon từ API.");
    }

    const data = await res.json();
    return data.products || data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu coupon:", error);
    return [];
  }
}
