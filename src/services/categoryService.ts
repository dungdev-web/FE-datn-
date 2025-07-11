import { IS_MOCK, API_BASE_URL } from "@/config/env";
import { getMockCategories } from "@/mocks/mocksCategory";
import { ICategory } from "@/types/ICategory";

export async function getCategories(): Promise<ICategory[]> {
  if (IS_MOCK) {
    return getMockCategories();
  }

  const res = await fetch(`${API_BASE_URL}/category`, {
    cache: "no-store",
  });

  // ✅ FIX: API trả trực tiếp mảng, không có json.categories
  const json: ICategory[] = await res.json();
  return json;
}

// Lấy danh mục theo ID
export async function getCategoryById(id: number): Promise<ICategory | null> {
  if (IS_MOCK) {
    const categories = getMockCategories();
    const findInTree = (list: ICategory[]): ICategory | null => {
      for (const cat of list) {
        if (cat.categories_id === id) return cat;
        if (cat.children) {
          const found = findInTree(cat.children);
          if (found) return found;
        }
      }
      return null;
    };
    return findInTree(categories);
  }

  const res = await fetch(`${API_BASE_URL}/categories/${id}`);
  const json = await res.json();
  return json.category || null;
}
