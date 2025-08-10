import { IS_MOCK, API_BASE_URL } from "@/config/env";
import { IBlog,Category,IBlogCreate } from "@/types/blog";
import { getMockBlog } from "@/mocks/mockBlog";
import { promises } from "dns";
import { ICategory } from "@/types/ICategory";
// Lấy bài viết
export async function getPost(
  page: number,
  title?: string,
  status?: string,
  sortBy: string = "created_at", // mặc định sort theo created_at
  sortOrder: "asc" | "desc" = "desc" // mặc định mới nhất trước
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
      sortBy,
      sortOrder,
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


export async function getCategory(
  params?: {
    page?: number;
    name: string;
    id?: number;
    slug?: string;
    sortBy?: "name" | "created_at" | "updated_at";
    sortOrder?: "asc" | "desc";
  }
): Promise<Category[]> {
 

  try {
    const query = new URLSearchParams({
      page: String(params?.page ?? 1),
      limit: "10",
      name: params?.name ?? "",
      id: params?.id ? String(params.id) : "",
      slug: params?.slug ?? "",
      sortBy: params?.sortBy ?? "created_at",
      sortOrder: params?.sortOrder ?? "desc",
    });
    

    const res = await fetch(`${API_BASE_URL}/post/category?${query}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error("Không thể lấy danh mục bài viết từ API.");
    }

    const json  = await res.json();
     return {
      data: Array.isArray(json.data) ? json.data : [],
      total: json.total ?? 0,
      currentPage: json.currentPage ?? 1,
      totalPages: json.totalPages ?? 1,
    };
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
export async function deletePost(postId: number): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/post/delete/${postId}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Không thể xóa bài viết.");

    return true;
  } catch (error) {
    console.error("Lỗi khi xóa bài viết:", error);
    return false;
  }
}

//category
export async function addCategoryPost(data: {
  name: string;
  slug: string;
  parent_id?: number | null;
}): Promise<Category> {
  try {
    const response = await fetch(`${API_BASE_URL}/post/create-category`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Lỗi khi tạo danh mục");
    }

    const result = await response.json();
    // Giả sử API trả về dạng { message: string, data: Category }
    return result.data;
  } catch (error) {
    console.error("addCategoryPost error:", error);
    throw error;
  }
}
