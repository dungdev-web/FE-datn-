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
