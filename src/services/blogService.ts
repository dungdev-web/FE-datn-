import { IS_MOCK, API_BASE_URL } from "@/config/env";
import { IBlog } from "@/types/blog";
import { getMockBlog } from "@/mocks/mockBlog";
// Lấy bài viết
export async function getPost(
  page: number
): Promise<{ posts: IBlog[]; totalPages: number }> {
  if (IS_MOCK) {
    const allPosts = getMockBlog();
    const pageSize = 5;
    const totalPages = Math.ceil(allPosts.length / pageSize);
    const posts = allPosts.slice((page - 1) * pageSize, page * pageSize);
    return { posts, totalPages };
  }

  try {
    const res = await fetch(`${API_BASE_URL}/post?page=${page}&limit=5`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Không thể lấy danh sách bài viết từ API.");
    }

    const data = await res.json();

    return {
      posts: data.posts || [],
      totalPages: data.totalPages || 1,
    };
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu bài viết:", error);
    return { posts: [], totalPages: 1 };
  }
}
