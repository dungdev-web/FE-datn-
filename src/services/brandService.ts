import { IBrand } from "@/types/IBrand";
import { IProduct } from "@/types/product";
import { IS_MOCK, API_BASE_URL } from "@/config/env";
import { getMockBrands } from "@/mocks/mockBrands";

export async function getBrands(): Promise<IBrand[]> {
  try {
    if (IS_MOCK) return getMockBrands();

    const response = await fetch(`${API_BASE_URL}/brand`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Lỗi khi gọi API lấy danh sách thương hiệu:", response.statusText);
      return [];
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Lỗi khi gọi API brand:", error);
    return [];
  }
}

// ✅ Lấy danh sách sản phẩm theo brand ID
export async function getProductsByBrandId(brandId: number): Promise<IProduct[]> {
  if (!brandId) return [];

  try {
    const response = await fetch(`${API_BASE_URL}/product/brand/${brandId}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Lỗi khi gọi API sản phẩm theo brand:", response.statusText);
      return [];
    }

    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error("Lỗi khi gọi API sản phẩm theo brand:", error);
    return [];
  }
}
