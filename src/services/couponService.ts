import { IS_MOCK, API_BASE_URL } from "@/config/env";
import { getMockCoupon, saveMockCoupon } from "@/mocks/mockCoupon";
import { CreateCouponPayload, ICoupon } from "@/types/coupon";
interface CouponListResponse {
  data: ICoupon[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
}
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
export async function saveUserCoupon(
  userId: number,
  couponCode: string
): Promise<any> {
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
export async function getSavedUserCoupons(userId: number): Promise<ICoupon[]> {
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
export async function getVoucherList(params?: {
  page?: number;
  limit?: number;
  keyword?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  id?: string;
  code?: string;
  discount_type?: string;
  start_date?: string;
  end_date?: string;
  usage_limit?: number;
  used_count?: number;
  min_order?: number;
}): Promise<CouponListResponse | null> {
  try {
    const query = new URLSearchParams();

    if (params?.page) query.append("page", params.page.toString());
    if (params?.limit) query.append("limit", params.limit.toString());
    if (params?.keyword) query.append("keyword", params.keyword);
    if (params?.sortBy) query.append("sortBy", params.sortBy);
    if (params?.sortOrder) query.append("sortOrder", params.sortOrder);

    if (params?.id) query.append("id", params.id);
    if (params?.code) query.append("code", params.code);
    if (params?.discount_type)
      query.append("discount_type", params.discount_type);
    if (params?.start_date) query.append("start_date", params.start_date);
    if (params?.end_date) query.append("end_date", params.end_date);
    if (params?.usage_limit !== undefined)
      query.append("usage_limit", params.usage_limit.toString());
    if (params?.used_count !== undefined)
      query.append("used_count", params.used_count.toString());
    if (params?.min_order !== undefined)
      query.append("min_order", params.min_order.toString());

    const url = `${API_BASE_URL}/voucher${
      query.toString() ? "?" + query.toString() : ""
    }`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Không thể lấy danh sách voucher từ API.");
    }

    const data: CouponListResponse = await res.json();

    return data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu voucher:", error);
    return null;
  }
}
export async function createCoupon(payload: CreateCouponPayload): Promise<ICoupon | null> {
  if (IS_MOCK) {
    // TODO: Xử lý mock nếu có
    return null;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/voucher`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        discount_value: String(payload.discount_value), // đảm bảo gửi dạng string
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Lỗi khi tạo mã giảm giá.");
    }

    const data: ICoupon = await res.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi tạo mã giảm giá:", error);
    return null;
  }
}
export async function getCouponById(id: number): Promise<ICoupon | null> {
  if (IS_MOCK) {
    // TODO: xử lý mock nếu cần
    return null;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/voucher/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Lỗi khi lấy mã giảm giá.");
    }

    const data: ICoupon = await res.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy mã giảm giá:", error);
    return null;
  }
}

export async function updateCoupon(
  id: number,
  payload: CreateCouponPayload
): Promise<ICoupon | null> {
  if (IS_MOCK) {
    // TODO: xử lý mock nếu cần
    return null;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/voucher/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        discount_value: String(payload.discount_value), // đảm bảo dạng string nếu backend cần
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Lỗi khi cập nhật mã giảm giá.");
    }

    const data: ICoupon = await res.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi cập nhật mã giảm giá:", error);
    return null;
  }
}
