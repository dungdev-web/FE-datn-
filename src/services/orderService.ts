import { API_BASE_URL } from "@/config/env";
interface GetOrdersParams {
  userId: number;
  page?: number;
  limit?: number;
}
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

export const getOrdersByUserService = async ({ userId, page = 1, limit = 10 }: GetOrdersParams) => {
  try {
    console.log("Fetching orders for user ID:", userId);
    const url = new URL(`${API_BASE_URL}/product/order/${userId}`);
    url.searchParams.set("page", page.toString());
    url.searchParams.set("limit", limit.toString());
    
    const res = await fetch(url.toString());
    
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || "Không thể lấy danh sách đơn hàng");
    }
    
    const data = await res.json();
    console.log("Orders data:", data);
    
    return data.data;
  } catch (error: any) {
    console.error("Service error:", error);
    throw new Error(error.message || "Lỗi kết nối đến server");
  }
};
export async function updateOrderStatus(orderId: number, status: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/update-order-status/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Cập nhật trạng thái thất bại');
    }
const data = await response.json();
    console.log("Order status updated:", data);
    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Đã xảy ra lỗi khi cập nhật trạng thái');
  }
}
