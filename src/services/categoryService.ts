import { IS_MOCK, API_BASE_URL } from "@/config/env";
import { getMockCategories } from "@/mocks/mocksCategory";
import { ICategory } from "@/types/ICategory";
import { IProduct } from "@/types/product";

export async function getCategories(): Promise<ICategory[]> {
  if (IS_MOCK) {
    return getMockCategories();
  }

  const res = await fetch(`${API_BASE_URL}/category`, {
    cache: "no-store",
  });

  // FIX: API trả trực tiếp mảng, không có json.categories
  const json: ICategory[] = await res.json();
  return json;
}

export async function getProductsByCategorySlug(slug: string): Promise<IProduct[]> {
  if (IS_MOCK) {
    return [];
  }

  try {
    const url = `${API_BASE_URL}/product/category?category=${slug}`;
    console.log("[Server] Fetching products from:", url);

    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("[Server] API lỗi:", res.status, res.statusText);
      throw new Error("Failed to fetch");
    }

    const json = await res.json();
    console.log("[Server] Products response:", json); // sẽ hiện ở terminal (không phải browser console)

    return json.products || [];
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm theo category:", error);
    return [];
  }
}
