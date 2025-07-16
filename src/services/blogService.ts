import { IS_MOCK, API_BASE_URL } from "@/config/env";
import { IBlog } from "@/types/blog";
import { getMockBlog } from "@/mocks/mockBlog";
// Lấy giỏ hàng của user
export async function getPost(): Promise<IBlog[]> {
  if (IS_MOCK) {
    return getMockBlog();
  }

  try {
    const res = await fetch(`${API_BASE_URL}/post`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Không thể lấy danh sách coupon từ API.");
    }

    const data = await res.json();
    return data.posts || data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu coupon:", error);
    return [];
  }
}
