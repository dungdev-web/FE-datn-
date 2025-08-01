import { API_BASE_URL } from "@/config/env";

export const getOrderDetailService = async (orderId: number) => {
  try {
    console.log("Fetching order detail for ID:", orderId);
    const res = await fetch(`${API_BASE_URL}/orders/${orderId}`);

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || "Không thể lấy chi tiết đơn hàng");
    }

    const data = await res.json();
    console.log("Order detail data:", data);
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Lỗi kết nối đến server");
  }
};
export const getOrdersByUserService = async (userId: number) => {
  try {
    console.log("Fetching orders for user ID:", userId);

    const res = await fetch(`${API_BASE_URL}/product/order/${userId}`);

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || "Không thể lấy danh sách đơn hàng");
    }

    const data = await res.json();
    console.log("Orders data:", data);
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Lỗi kết nối đến server");
  }
};