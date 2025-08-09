import { IBrand } from "@/types/IBrand";
import { IProduct } from "@/types/product";
import { IS_MOCK, API_BASE_URL } from "@/config/env";
import { getMockBrands } from "@/mocks/mockBrands";

interface BrandFilters {
  id?: number;
  name?: string;
  keyword?: string;
  status?: number;
  page?: number;
  limit?: number;
  sortBy?: string; // thêm
  sortOrder?: "asc" | "desc"; // thêm
}

interface BrandResponse {
  data: IBrand[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export async function getBrands(filters: BrandFilters = {}) {
  try {
    if (IS_MOCK) {
      return {
        data: getMockBrands(),
        total: 0,
        totalPages: 0,
        currentPage: 1,
      };
    }

    const query = new URLSearchParams();

    if (filters.id) query.append("id", String(filters.id));
    if (filters.name) query.append("name", filters.name);
    if (filters.keyword) query.append("keyword", filters.keyword);
    if (filters.status !== undefined)
      query.append("status", String(filters.status));
    if (filters.page) query.append("page", String(filters.page));
    if (filters.limit) query.append("limit", String(filters.limit));

    // Thêm sort
    if (filters.sortBy) query.append("sortBy", filters.sortBy);
    if (filters.sortOrder) query.append("sortOrder", filters.sortOrder);

    const url = `${API_BASE_URL}/brand${
      query.toString() ? `?${query.toString()}` : ""
    }`;

    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      console.error("Lỗi API brand:", response.statusText);
      return { data: [], total: 0, totalPages: 0, currentPage: 1 };
    }

    const result = await response.json();
    return {
      data: result.data || [],
      total: result.total || 0,
      totalPages: result.totalPages || 0,
      currentPage: result.page || 1,
    };
  } catch (error) {
    console.error("Lỗi khi gọi API brand:", error);
    return { data: [], total: 0, totalPages: 0, currentPage: 1 };
  }
}
export async function getProductsByBrandId(
  brandId: number
): Promise<IProduct[]> {
  if (!brandId) return [];

  try {
    const response = await fetch(`${API_BASE_URL}/product/brand/${brandId}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        "Lỗi khi gọi API sản phẩm theo brand:",
        response.statusText
      );
      return [];
    }

    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error("Lỗi khi gọi API sản phẩm theo brand:", error);
    return [];
  }
}

// Thêm brand
export async function addBrand(brand: {
  name: string;
  slug: string;
  logo_url?: string;
  status?: number;
}) {
  try {
    const response = await fetch(`${API_BASE_URL}/brand`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(brand),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Thêm brand thất bại");

    return result;
  } catch (error) {
    console.error("Lỗi khi thêm brand:", error);
    throw error;
  }
}

// Sửa brand
export async function updateBrand(id: number, brand: Partial<IBrand>) {
  try {
    const response = await fetch(`${API_BASE_URL}/brand/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(brand),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Cập nhật brand thất bại");

    return result;
  } catch (error) {
    console.error("Lỗi khi cập nhật brand:", error);
    throw error;
  }
}

// Xóa brand
export async function deleteBrand(id: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/brand/delete/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Xóa brand thất bại");

    return result;
  } catch (error) {
    console.error("Lỗi khi xóa brand:", error);
    throw error;
  }
}