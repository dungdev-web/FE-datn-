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

export async function getProductsByCategorySlug(
  slug: string
): Promise<IProduct[]> {
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
// Show
export async function getAllProductCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/category`); // thay URL nếu khác

    if (!response.ok) {
      throw new Error("Không thể lấy danh mục sản phẩm");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("[Service] Lỗi khi fetch danh mục sản phẩm:", error);
    return []; // hoặc: throw error nếu muốn xử lý ở component
  }
}

// add cate
export async function addProductCategory(
  name: string,
  slug: string,
  parent_id = null
) {
  try {
    const response = await fetch(`${API_BASE_URL}/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': `Bearer ${token}` nếu có xác thực
      },
      body: JSON.stringify({ name, slug, parent_id }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Thêm danh mục thất bại");
    }

    const data = await response.json();
    return data; // { message: 'Thêm danh mục thành công.', data: {...} }
  } catch (error) {
    console.error("[Service] Lỗi khi thêm danh mục sản phẩm:", error);
    throw error;
  }
}
// update cate
export async function updateProductCategory(
  id: string,
  name: string,
  slug: string,
  parent_id = null
) {
  try {
    const response = await fetch(`${API_BASE_URL}/category/${id}`, {
      method: "PUT", // hoặc PATCH nếu backend dùng PATCH
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': `Bearer ${token}` nếu có xác thực
      },
      body: JSON.stringify({ name, slug, parent_id }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Cập nhật danh mục thất bại");
    }

    const data = await response.json();
    return data; // { message: 'Cập nhật danh mục thành công.', data: {...} }
  } catch (error) {
    console.error("[Service] Lỗi khi cập nhật danh mục:", error);
    throw error;
  }
}

// delete cate
export async function deleteProductCategory(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/category/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': `Bearer ${token}` nếu cần xác thực
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Xóa danh mục thất bại");
    }

    const data = await response.json();
    return data; // { message: 'Xóa danh mục thành công.', result: ... }
  } catch (error) {
    console.error("[Service] Lỗi khi xóa danh mục:", error);
    throw error;
  }
}
