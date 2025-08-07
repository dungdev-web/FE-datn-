import { IS_MOCK, API_BASE_URL } from "@/config/env";
import { IBlog,Category,IBlogCreate } from "@/types/blog";
import { getMockBlog } from "@/mocks/mockBlog";
// Lấy bài viết
export async function getPost(
  page: number,
  title?: string,
  status?: string
): Promise<{ posts: IBlog[]; totalPages: number }> {
  if (IS_MOCK) {
    const allPosts = getMockBlog();
    const pageSize = 5;
    const totalPages = Math.ceil(allPosts.length / pageSize);
    const posts = allPosts.slice((page - 1) * pageSize, page * pageSize);
    return { posts, totalPages };
  }

  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: "5",
    });

    if (title) queryParams.append("title", title);
    if (status !== undefined && status !== "") {
  queryParams.append("status", status.toString());
}


    const res = await fetch(`${API_BASE_URL}/post?${queryParams.toString()}`, {
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


// 
// Lấy bài viết theo ID
export async function getPostById(id: number): Promise<IBlog | null> {
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
//thêm bài viết
// services/blogService.ts

export async function addPost(formData: FormData): Promise<IBlog | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/post`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Không thể thêm bài viết mới.");

    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error("Lỗi khi thêm bài viết:", error);
    return null;
  }
}

export async function updatePost(postId: number | undefined, formData: FormData): Promise<IBlog | null> {
  if (!postId) return null;

  try {
    const res = await fetch(`${API_BASE_URL}/post/update/${postId}`, {
      method: "PUT", // 🔁 dùng PUT vì bạn đã khai báo trong router
      body: formData,
    });

    if (!res.ok) throw new Error("Không thể cập nhật bài viết.");

    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error("Lỗi khi cập nhật bài viết:", error);
    return null;
  }
}

