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
// Gọi danh sách sản phẩm theo slug danh mục
export async function getProductsByCategorySlug(slug: string): Promise<IProduct[]> {
  if (!slug) return [];

  const res = await fetch(`${API_BASE_URL}/product/category?category=${slug}`, {
    cache: "no-store",
  });

  const json = await res.json();

  // Đảm bảo dữ liệu đúng định dạng (nếu cần map lại)
  return json.products || [];
}