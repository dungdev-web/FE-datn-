import { IBrand } from "@/types/IBrand";
import { IS_MOCK, API_BASE_URL } from "@/config/env";
import { getMockBrands } from "@/mocks/mockBrands";
import { IProduct } from "@/types/product";

// Lấy danh sách thương hiệu

export async function getBrands(): Promise<IBrand[]> {
  try {
    if (IS_MOCK) return getMockBrands();

    const res = await fetch(`${API_BASE_URL}/brand`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Lỗi khi gọi API brand:", res.statusText);
      return [];
    }

    const json = await res.json();
    return Array.isArray(json) ? json : [];
  } catch (err) {
    console.error("Lỗi khi gọi API brand:", err);
    return [];
  }
}

// Thêm thương hiệu

export async function addBrand(data: IBrand) {
  try {
    const response = await fetch(`${API_BASE_URL}/brand`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw error;
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Lỗi khi thêm thương hiệu:", err);
    throw err;
  }
}

// Cập nhật thương hiệu

export async function updateBrand(id: number, data: IBrand) {
  try {
    const response = await fetch(`${API_BASE_URL}/brand/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Lỗi khi cập nhật thương hiệu:", error);
    throw error;
  }
}

// Xóa thương hiệu
export async function deleteBrand(id: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/brand/ ${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Lỗi khi xóa thương hiệu:", error);
    throw error;
  }
}

// Lấy danh sách sản phẩm theo brand ID
export async function getProductsByBrandId(
  brandId: number
): Promise<IProduct[]> {
  if (!brandId) return [];

  try {
    const res = await fetch(`${API_BASE_URL}/product/brand/${brandId}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Lỗi khi gọi API:", res.statusText);
      return [];
    }

    const json = await res.json();
    return json.products || [];
  } catch (error) {
    console.error("Lỗi khi gọi API sản phẩm theo brand:", error);
    return [];
  }
}

//
