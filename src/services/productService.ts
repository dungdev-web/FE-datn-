import { IS_MOCK, API_BASE_URL } from "@/config/env";
import { IProduct } from "@/types/product";
import { getMockProducts, saveMockProducts } from "@/mocks/mockProduct";
type ProductIdentifier = { id: number } | { slug: string };

// Lấy tất cả sản phẩm
export async function getAllProducts(
  page = 1,
  limit = 20
): Promise<{ data: IProduct[]; total: number }> {
  if (IS_MOCK) {
    const all = getMockProducts();
    const start = (page - 1) * limit;
    const pagedData = all.slice(start, start + limit);

    return {
      data: pagedData,
      total: all.length,
    };
  }

  const res = await fetch(
    `${API_BASE_URL}/product/products?page=${page}&limit=${limit}`
  );
  if (!res.ok) {
    throw new Error("Không thể lấy danh sách sản phẩm từ server.");
  }

  const json = await res.json();
  return {
    data: json.products,
    total: json.total,
  };
}
//lấy chi tiết sản phẩm = id hoặc slug
export const getProductDetail = async (
  identifier: ProductIdentifier
): Promise<IProduct | undefined> => {
  if (IS_MOCK) {
    const products = getMockProducts();

    if ("id" in identifier && "slug" in identifier) {
      return products.find(
        (p) => p.products_id === identifier.id && p.slug === identifier.slug
      );
    }

    return undefined;
  }

  try {
    if (!("id" in identifier) || !("slug" in identifier)) {
      throw new Error("Thiếu thông tin identifier");
    }

    // 👉 Gọi API đúng với backend route hiện tại
    const url = `${API_BASE_URL}/product/products/${identifier.id}-${identifier.slug}`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Không thể lấy chi tiết sản phẩm.");
    }

    const data: IProduct = await res.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
    return undefined;
  }
};

// Lấy sản phẩm bán chạy dựa trên số lượng review hoặc random sold_count
export function getBestSellingMockProducts(top = 3): IProduct[] {
  const products = getMockProducts();

  // Giả lập sold_count từ số lượng review hoặc random nếu không có review
  const productsWithSold = products.map((p) => ({
    ...p,
    sold_count: (p.reviews?.length || 0) * 10 + Math.floor(Math.random() * 20),
  }));

  // Sắp xếp giảm dần theo sold_count
  return productsWithSold
    .sort((a, b) => b.sold_count - a.sold_count)
    .slice(0, top);
}

// Lấy sản phẩm theo slug
export async function getProductBySlug(
  slug: string
): Promise<IProduct | undefined> {
  if (IS_MOCK) {
    const all = getMockProducts();
    return all.find((p) => p.slug === slug);
  }

  // Nếu sau này dùng API thật, có thể sửa endpoint như sau:
  const res = await fetch(`${API_BASE_URL}/products/slug/${slug}`);
  if (!res.ok) {
    throw new Error("Không thể lấy sản phẩm theo slug.");
  }

  return await res.json();
}
// Lấy sản phẩm mới nhất
export async function getNewestProducts(): Promise<IProduct[]> {
  if (IS_MOCK) {
    const all = getMockProducts();
    return all.sort((a, b) => b.products_id - a.products_id);
  }

  const res = await fetch(
    `${API_BASE_URL}/product/products/newest?page=1&limit=20`
  );
  if (!res.ok) {
    throw new Error("Không thể lấy danh sách sản phẩm mới nhất.");
  }

  const json = await res.json();
  const products: IProduct[] = json.data || json.products || [];

  return products.sort((a, b) => b.products_id - a.products_id);
}

// Lấy sản phẩm nổi bật
export async function getFeaturedProducts(): Promise<IProduct[]> {
  if (IS_MOCK) {
    const all = getMockProducts();

    return all.filter((product) => {
      const reviews = product.reviews || [];
      if (reviews.length < 1) return false;

      const avgRating =
        reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) /
        reviews.length;

      return avgRating >= 4;
    });
  }

  const res = await fetch(
    `${API_BASE_URL}/product/products/featured?page=1&limit=20`
  );
  if (!res.ok) {
    throw new Error("Không thể lấy danh sách sản phẩm nổi bật.");
  }

  const json = await res.json();
  const products: IProduct[] = json.products || json.data || [];

  if (!Array.isArray(products)) {
    throw new Error("Dữ liệu sản phẩm trả về không đúng định dạng.");
  }

  return products;
}

//Lấy sản phẩm theo giới tính nam
export async function getMenShoes(): Promise<IProduct[]> {
  if (IS_MOCK) {
    const all = getMockProducts();

    return all.filter((product) => {
      const gender = product.gender.name?.toLowerCase();
      const categoryName = product.category?.name?.toLowerCase();

      return (
        gender === "male" ||
        gender === "unisex" ||
        categoryName?.includes("nam")
      );
    });
  }

  // Nếu dùng API thật
  const res = await fetch(`${API_BASE_URL}/products?gender=male_or_unisex`);
  if (!res.ok) {
    throw new Error("Không thể lấy danh sách giày nam.");
  }

  const data: IProduct[] = await res.json();
  return data;
}
//lấy sản phẩm theo giới tính nữ
export async function getFemaleProducts(): Promise<IProduct[]> {
  if (IS_MOCK) {
    const all = getMockProducts();
    return all.filter(
      (product) =>
        product.category?.name?.toLowerCase().includes("nữ") ||
        product.category?.slug?.toLowerCase().includes("nu")
    );
  }

  // API thực tế (nếu dùng sau)
  const res = await fetch(`${API_BASE_URL}/products`);
  if (!res.ok) {
    throw new Error("Không thể lấy danh sách sản phẩm.");
  }
  const data: IProduct[] = await res.json();
  return data.filter(
    (product) =>
      product.category?.name?.toLowerCase().includes("nữ") ||
      product.category?.slug?.toLowerCase().includes("nu")
  );
}

//Lấy sản phẩm theo catename
export async function getProductsByCategory(
  categoryName: string
): Promise<IProduct[]> {
  if (!categoryName) {
    throw new Error("Category name is required");
  }

  const categoryNameLc = categoryName.toLowerCase();

  if (IS_MOCK) {
    const all = getMockProducts();
    return all.filter(
      (product) =>
        product.category?.name?.toLowerCase() === categoryNameLc ||
        product.category?.slug?.toLowerCase() === categoryNameLc
    );
  }

  const res = await fetch(
    `${API_BASE_URL}/product/products/category?category=${encodeURIComponent(
      categoryName
    )}&page=1&limit=20`
  );
  if (!res.ok) {
    throw new Error("Không thể lấy danh sách sản phẩm cùng cate.");
  }

  const data = await res.json();

  // Nếu API đã trả về đúng category thì không cần filter
  // Nếu trả tất cả products thì filter như dưới:
  if (Array.isArray(data.products)) {
    return data.products;
  } else if (Array.isArray(data)) {
    return data.filter(
      (product) =>
        product.category?.name?.toLowerCase() === categoryNameLc ||
        product.category?.slug?.toLowerCase() === categoryNameLc
    );
  }

  return [];
}

// Lấy sản phẩm có deal
export async function getDealProducts(): Promise<IProduct[]> {
  if (IS_MOCK) {
    const all = getMockProducts();
    return all.filter((p) => p.sale_price && p.sale_price < p.price);
  }

  const res = await fetch(
    `${API_BASE_URL}/product/products/deals?page=1&limit=20`
  );
  if (!res.ok) {
    throw new Error("Không thể lấy danh sách sản phẩm khuyến mãi.");
  }

  const json = await res.json();
  const products: IProduct[] = json.products || [];

  if (!Array.isArray(products)) {
    throw new Error("Dữ liệu sản phẩm không hợp lệ.");
  }

  return products;
}

// Lấy tất cả sản phẩm thuộc cùng category
export async function getRelatedProducts(
  categoryId: number
): Promise<IProduct[]> {
  if (IS_MOCK) {
    const all = getMockProducts();
    return all.filter((p) => p.category.categories_id === categoryId);
  }

  const res = await fetch(`${API_BASE_URL}/products?category=${categoryId}`);
  if (!res.ok) {
    throw new Error("Không thể lấy sản phẩm cùng loại.");
  }

  const data: IProduct[] = await res.json();
  return data;
}

// Thêm sản phẩm mới
export async function addProduct(newProduct: IProduct): Promise<IProduct> {
  if (IS_MOCK) {
    const current = getMockProducts();
    const updated = [...current, newProduct];
    saveMockProducts(updated);
    return newProduct;
  }

  const res = await fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct),
  });

  if (!res.ok) {
    throw new Error("Không thể thêm sản phẩm.");
  }

  return await res.json();
}

// Lấy 1 sản phẩm theo ID
export async function getProductById(
  id: number
): Promise<IProduct | undefined> {
  if (IS_MOCK) {
    const all = getMockProducts();
    return all.find((p) => p.products_id === id);
  }

  const res = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!res.ok) {
    throw new Error("Không thể lấy sản phẩm.");
  }

  return await res.json();
}

// Cập nhật sản phẩm
export async function updateProduct(
  id: number,
  updated: Partial<IProduct>
): Promise<IProduct> {
  if (IS_MOCK) {
    const current = getMockProducts();
    const index = current.findIndex((p) => p.products_id === id);
    if (index === -1) throw new Error("Sản phẩm không tồn tại.");
    current[index] = { ...current[index], ...updated };
    saveMockProducts(current);
    return current[index];
  }

  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updated),
  });

  if (!res.ok) {
    throw new Error("Không thể cập nhật sản phẩm.");
  }

  return await res.json();
}

// Xoá sản phẩm
export async function deleteProduct(id: number): Promise<void> {
  if (IS_MOCK) {
    const current = getMockProducts().filter((p) => p.products_id !== id);
    saveMockProducts(current);
    return;
  }

  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Không thể xoá sản phẩm.");
  }
}
