import { IBrand } from "@/types/IBrand";
import { IS_MOCK, API_BASE_URL } from "@/config/env";
import { getMockBrands } from "@/mocks/mockBrands";
import { IProduct } from "@/types/product";

export async function getBrands(): Promise<IBrand[]> {
  try {
    if (IS_MOCK) return getMockBrands();

    const res = await fetch(`${API_BASE_URL}/brand`, {
      cache: "no-store",
    });

    const json = await res.json();
    console.log("API Brands Response:", json); // 

    return Array.isArray(json) ? json : [];
  } catch (err) {
    console.error("Lỗi khi gọi API brand:", err);
    return [];
  }
}

// Gọi danh sách sản phẩm theo brand ID
export async function getProductsByBrandId(brandId: number): Promise<IProduct[]> {
  if (!brandId) return [];

  const res = await fetch(`${API_BASE_URL}/product/brand/${brandId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Lỗi khi gọi API:", res.statusText);
    return [];
  }

  const json = await res.json();

  return json.products || [];
}
