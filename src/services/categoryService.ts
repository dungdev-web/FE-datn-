import { IS_MOCK, API_BASE_URL } from "@/config/env";
import { getMockCategories } from "@/mocks/mocksCategory";
import { CategoryFilters, CategoryResponse, ICategory } from "@/types/ICategory";
import { IProduct } from "@/types/product";


export async function getCategories(filters: CategoryFilters = {}): Promise<CategoryResponse> {
  try {
    if (IS_MOCK) {
      return {
        data: getMockCategories(),
        total: 0,
        totalPages: 0,
        page: 1,
      };
    }

    const query = new URLSearchParams();

    if (filters.id) query.append("id", String(filters.id));
    if (filters.name) query.append("name", filters.name);
    if (filters.keyword) query.append("keyword", filters.keyword);
    if (filters.status !== undefined) query.append("status", String(filters.status));
    if (filters.page) query.append("page", String(filters.page));
    if (filters.limit) query.append("limit", String(filters.limit));
    if (filters.sortBy) query.append("sortBy", filters.sortBy);
    if (filters.sortOrder) query.append("sortOrder", filters.sortOrder);

    const url = `${API_BASE_URL}/category${query.toString() ? `?${query.toString()}` : ""}`;

    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      console.error("Lỗi API category:", response.statusText);
      return { data: [], total: 0, totalPages: 0, page: 1 };
    }

    const result = await response.json();

    return {
      data: result.data || [],
      total: result.total || 0,
      totalPages: result.totalPages || 0,
      page: result.page || 1,
    };
  } catch (error) {
    console.error("Lỗi khi gọi API category:", error);
    return { data: [], total: 0, totalPages: 0, page: 1 };
  }
}
export async function getProductsByCategorySlug(slug: string): Promise<IProduct[]> {
  if (IS_MOCK) {
    return [];
  }

  try {
    const url = `${API_BASE_URL}/product/category?category=${slug}`;
    

    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
    
      throw new Error("Failed to fetch");
    }

    const json = await res.json();
  
    return json.products || [];
  } catch (error) {
  
    return [];
  }
}
export async function addCategory(data: {
  name: string;
  parent_id?: number | null;
  status?: number; // 0 hoặc 1
  imageFile?: File | null;
}): Promise<{ message: string; data: ICategory }> {
  const formData = new FormData();
  formData.append("name", data.name);

  if (data.parent_id !== undefined && data.parent_id !== null) {
    formData.append("parent_id", String(data.parent_id));
  }

  if (data.status !== undefined) {
    formData.append("status", String(data.status)); // ✅ thêm status
  }

  if (data.imageFile) {
    formData.append("image", data.imageFile);
  }

  try {
    const res = await fetch(`${API_BASE_URL}/category/`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => null);
      throw new Error(errJson?.message || "Lỗi khi thêm danh mục");
    }

    const json = await res.json();
    return json;
  } catch (error: any) {
    console.error("Lỗi khi gọi API addCategory:", error);
    throw error;
  }
}

export async function updateCategory(
  id: number,
  data: {
    name: string;
    parent_id?: number | null;
    status?: number; // 0 hoặc 1
    imageFile?: File | null; // có thể null => giữ ảnh cũ
  }
): Promise<{ message: string; data: ICategory }> {
  const formData = new FormData();
  formData.append("name", data.name);

  if (data.parent_id !== undefined && data.parent_id !== null) {
    formData.append("parent_id", String(data.parent_id));
  }

  if (data.status !== undefined) {
    formData.append("status", String(data.status));
  }

  if (data.imageFile) {
    formData.append("image", data.imageFile); // nếu không gửi => backend lấy ảnh cũ
  }

  try {
    const res = await fetch(`${API_BASE_URL}/category/update/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => null);
      throw new Error(errJson?.message || "Lỗi khi cập nhật danh mục");
    }

    const json = await res.json();
    return json;
  } catch (error: any) {
    console.error("Lỗi khi gọi API updateCategory:", error);
    throw error;
  }
}
//
export async function getCategoryById(id: number): Promise<ICategory | null> {
  if (!id) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/category/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        "Lỗi khi gọi API lấy category theo ID:",
        response.statusText
      );
      return null;
    }

    const data = await response.json();
    return data || null;
  } catch (error) {
    console.error("Lỗi khi gọi API lấy category theo ID:", error);
    return null;
  }
}

