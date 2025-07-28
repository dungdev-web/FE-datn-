import { IS_MOCK, API_BASE_URL } from "@/config/env";
import { IBlog,Category } from "@/types/blog";
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
// Lấy bài viết theo ID
export async function getPostById(id: string): Promise<IBlog | null> {
  if (IS_MOCK) {
    const allPosts = getMockBlog();
    return allPosts.find((post) => post.post_id === Number(id)) || null;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/post/byId/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Không thể lấy bài viết từ API.");
    }

    const data = await res.json();
    return data.data || null; // <-- sửa ở đây
  } catch (error) {
    console.error("Lỗi khi lấy bài viết:", error);
    return null;
  }
}
//lấy danh mục bài viết


export async function getCategory(): Promise<Category[]> {
  if (IS_MOCK) {
    return [
      {
        category_post_id: 1,
        name: "Tin tức",
        slug: "tin-tuc",
        parent_id: null,
      },
      {
        category_post_id: 2,
        name: "Khuyến mãi",
        slug: "khuyen-mai",
        parent_id: null,
      },
    ];
  }

  try {
    const res = await fetch(`${API_BASE_URL}/post/category`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Không thể lấy danh mục bài viết từ API.");
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Lỗi khi lấy danh mục bài viết:", error);
    return [];
  }
}

//lấy bài viết theo danh mục
export async function getPostsByCategory(
  categoryId: number | string
): Promise<{ posts: IBlog[] }> {
  if (IS_MOCK) {
    const allPosts = getMockBlog().filter(
      (post) => post.category_post_id === Number(categoryId)
    );
    return { posts: allPosts };
  }

  try {
    const res = await fetch(`${API_BASE_URL}/post/category/${categoryId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Không thể lấy bài viết theo danh mục từ API.");
    }

    const data = await res.json();
    return {
      posts: data.data || [],
    };
  } catch (error) {
    console.error("Lỗi khi lấy bài viết theo danh mục:", error);
    return { posts: [] };
  }
}
