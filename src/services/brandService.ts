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
export async function getAllBrands() {
  try {
    if (IS_MOCK) {
      return getMockBrands();
    }

    const url = `${API_BASE_URL}/brand/all`;

    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      console.error("Lỗi API brand:", response.statusText);
      return [];
    }

    const result = await response.json();
    return result as IBrand[]; // API trả về mảng brand không phân trang
  } catch (error) {
    console.error("Lỗi khi gọi API brand:", error);
    return [];
  }
}
// Thêm brand (có upload ảnh)
export async function addBrand(brand: {
  name: string;
  status?: number;
  logo_url?: File; // ảnh dạng file
}) {
  try {
    const formData = new FormData();
    formData.append("name", brand.name);
    formData.append("status", String(brand.status ?? 1));

    if (brand.logo_url) {
      formData.append("logo_url", brand.logo_url); // file ảnh
    }

    const response = await fetch(`${API_BASE_URL}/brand`, {
      method: "POST",
      body: formData, // gửi trực tiếp FormData
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Thêm brand thất bại");

    return result;
  } catch (error) {
    console.error("Lỗi khi thêm brand:", error);
    throw error;
  }
}

// Lấy chi tiết 1 brand theo ID
export async function getBrandById(id: number): Promise<IBrand | null> {
  if (!id) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/brand/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Lỗi khi gọi API lấy brand theo ID:", response.statusText);
      return null;
    }

    const data = await response.json();
    return data || null;
  } catch (error) {
    console.error("Lỗi khi gọi API lấy brand theo ID:", error);
    return null;
  }
}

// Sửa brand (có thể upload ảnh mới hoặc giữ ảnh cũ)
export async function updateBrand(
  id: number,
  brand: {
    name?: string;
    status?: number;
    logo_url?: File; // chỉ gửi file mới nếu có
  }
) {
  try {
    const formData = new FormData();

    if (brand.name !== undefined) {
      formData.append("name", brand.name);
    }

    if (brand.status !== undefined) {
      formData.append("status", String(brand.status));
    }

    // Chỉ gửi nếu có file mới
    if (brand.logo_url instanceof File) {
      formData.append("logo_url", brand.logo_url);
    }

    const response = await fetch(`${API_BASE_URL}/brand/update/${id}`, {
      method: "PUT",
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Cập nhật brand thất bại");
    }

    return result;
  } catch (error) {
    console.error("Lỗi khi cập nhật brand:", error);
    throw error;
  }
}

// Cập nhật trạng thái brand (PATCH /brands/:id/status)
export async function updateBrandStatus(id: number, status: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/brand/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Cập nhật trạng thái thất bại");
    }

    return result;
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái brand:", error);
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

    if (!response.ok) {
      // Nếu API trả lỗi, ném ra message cụ thể
      throw new Error(result.error || result.message || "Xóa brand thất bại");
    }

    return result; // { message, result }
  } catch (error) {
    console.error("Lỗi khi xóa brand:", error);
    throw error;
  }
}
