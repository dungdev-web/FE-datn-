import { API_BASE_URL } from "@/config/env";

export interface GetOrdersParams {
  userId: number;
  page?: number;
  limit?: number;
  status?: string;
  payment_method_id?: number;
  date_from?: string; // ISO format YYYY-MM-DD
  date_to?: string;   // ISO format YYYY-MM-DD
  sortField?: string;
  sortDirection?: "asc" | "desc";
  search?: string;
}

export const getOrderDetailService = async (orderId: number) => {
  try {
    console.log("Fetching order detail for ID:", orderId);
    const res = await fetch(`${API_BASE_URL}/user/orders/${orderId}`);

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

export const getOrdersByUserService = async ({
  userId,
  page = 1,
  limit = 10,
  status,
  payment_method_id,
  date_from,
  date_to,
  sortField = "created_at",
  sortDirection = "desc",
  search = ""
}: GetOrdersParams) => {
  try {
    console.log("Fetching orders for user ID:", userId);

    const url = new URL(`${API_BASE_URL}/product/order/${userId}`);

    // Pagination
    url.searchParams.set("page", page.toString());
    url.searchParams.set("limit", limit.toString());

    // Filters
    if (status) url.searchParams.set("status", status);
    if (payment_method_id) url.searchParams.set("payment_method_id", payment_method_id.toString());
    if (date_from) url.searchParams.set("date_from", date_from);
    if (date_to) url.searchParams.set("date_to", date_to);

    // Sorting
    if (sortField) url.searchParams.set("sortField", sortField);
    if (sortDirection) url.searchParams.set("sortDirection", sortDirection);

    // Search
    if (search) url.searchParams.set("search", search);

    const res = await fetch(url.toString());

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || "Không thể lấy danh sách đơn hàng");
    }

    const data = await res.json();
    console.log("Orders data:", data);
    return data.data; // BE trả { data: orders }
  } catch (error: any) {
    console.error("Service error:", error);
    throw new Error(error.message || "Lỗi kết nối đến server");
  }
};

export async function updateOrderStatus(orderId: number, status: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/user/update-order-status/${orderId}`, {
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
