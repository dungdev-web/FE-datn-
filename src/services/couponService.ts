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
export async function saveUserCoupon(userId: number, couponCode: string): Promise<any> {
  if (IS_MOCK) {
  const now = new Date().toISOString();
  const coupon: ICoupon = {
    length: 1,
    userId: userId,
    coupons_id: Date.now(), // hoặc dùng uuid/random
    code: couponCode,
    discount_type: "percentage", // hoặc "fixed"
    discount_value: "10", // string như interface yêu cầu
    start_date: now,
    end_date: "2025-12-31T23:59:59.000Z", // tùy bạn mock
    usage_limit: 1,
    used_count: 0,
    created_at: now,
    updated_at: now,
    min_order: 100000, // tùy bạn
  };

  return saveMockCoupon([coupon]);
}


  try {
    const res = await fetch(`${API_BASE_URL}/user-vouchers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        coupon_code: couponCode,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Không thể lưu mã giảm giá.");
    }

    return await res.json();
  } catch (error) {
    console.error("Lỗi khi lưu mã giảm giá cho người dùng:", error);
    return { error: "Không thể lưu mã giảm giá. Vui lòng thử lại sau." };
  }
}

// Lấy danh sách coupon mà người dùng đã lưu
export async function getSavedUserCoupons(
  userId: number
): Promise<ICoupon[]> {
  if (IS_MOCK) {
    // Tùy vào logic mock của bạn nếu cần
    return [];
  }

  try {
    const res = await fetch(`${API_BASE_URL}/product/user_vouchers/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Không thể lấy danh sách mã đã lưu.");
    }

    const data = await res.json();

    // Trả về danh sách coupon đã lưu (gốc là data.data[i].coupon)
    const userCoupons = data.data?.map((item: any) => item.coupon) || [];
    return userCoupons;
  } catch (error) {
    console.error("Lỗi khi lấy coupon đã lưu:", error);
    return [];
  }
}