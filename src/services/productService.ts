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
    `${API_BASE_URL}/product?page=${page}&limit=${limit}`
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

    if ("id" in identifier) {
      return products.find(p => p.products_id === identifier.id);
    }
    if ("slug" in identifier) {
      return products.find(p => p.slug === identifier.slug);
    }

    return undefined;
  }

  try {
    let url = "";
    
    if ("id" in identifier && identifier.id) {
      url = `${API_BASE_URL}/product/detail/${identifier.id}`;
    } else if ("slug" in identifier && identifier.slug) {
      url = `${API_BASE_URL}/product/detail/slug?slug=${identifier.slug}`;
    } else {
      throw new Error("Thiếu id hoặc slug");
    }

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

// lấy filter theo giá 
export async function getFilterPrice(min?: number, max?: number): Promise<IProduct[]> {
  if (IS_MOCK) {
    const products = getMockProducts();

    const filtered = products.filter((product) => {
      const price = product.sale_price > 0 ? product.sale_price : product.price;

      if (min !== undefined && max !== undefined) {
        return price >= min && price < max;
      }

      if (min !== undefined) {
        return price >= min;
      }

      if (max !== undefined) {
        return price < max;
      }

      return true; // Không lọc nếu không có min/max
    });

    return filtered;
  }

  // Gọi API khi không mock
  const queryParams: string[] = [];
  if (min !== undefined) queryParams.push(`min=${min}`);
  if (max !== undefined) queryParams.push(`max=${max}`);
  const queryStr = queryParams.length ? `?${queryParams.join("&")}` : "";

  const res = await fetch(`${API_BASE_URL}/product/products/filter${queryStr}`);

  if (!res.ok) {
    throw new Error("Không thể lấy sản phẩm theo khoảng giá.");
  }

  const data: IProduct[] = await res.json();
  return data;
}
// Lấy sản phẩm bán chạy dựa trên số lượng review hoặc random sold_count
export async function getBestSellingMockProducts(top = 5): Promise<IProduct[]> {
  if (IS_MOCK) {
    const products = getMockProducts();

    // Giả lập sold_count từ số lượng review hoặc random
    const productsWithSold = products.map((p) => ({
      ...p,
      sold_count: (p.product_reviews?.length || 0) * 10 + Math.floor(Math.random() * 20),
    }));

    // Sắp xếp và lấy top sản phẩm bán chạy nhất
    return productsWithSold
      .sort((a, b) => (b.sold_count || 0) - (a.sold_count || 0))
      .slice(0, top);
  }

  // Nếu không mock → gọi API thực
  const res = await fetch(`${API_BASE_URL}/product/best-selling?page=1&limit=${top}`);

  if (!res.ok) {
    throw new Error("Không thể lấy sản phẩm bán chạy.");
  }

  const data: IProduct[] = await res.json();
  return data;
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
  const res = await fetch(`${API_BASE_URL}/product/slug/${slug}`);
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
    `${API_BASE_URL}/product/newest?page=1&limit=20`
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
      const reviews = product.product_reviews || [];
      if (reviews.length < 1) return false;

      const avgRating =
        reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) /
        reviews.length;

      return avgRating >= 4;
    });
  }

  const res = await fetch(
    `${API_BASE_URL}/product/featured?page=1&limit=20`
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
    `${API_BASE_URL}/product/category?category=${encodeURIComponent(
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
    `${API_BASE_URL}/product/deals?page=1&limit=20`
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

  const res = await fetch(`${API_BASE_URL}/product/related/${categoryId}?page=1&limit=8`);
  if (!res.ok) {
    throw new Error("Không thể lấy sản phẩm cùng loại.");
  }

  const data = await res.json();
  const related = data.relatedProducts;

  return Array.isArray(related) ? related : [];
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

export const getProductsByGender = async (gender: string): Promise<IProduct[]> => {
  try {
    const res = await fetch(`${API_BASE_URL}/product?gender=${gender}`);
    if (!res.ok) throw new Error("Lỗi khi lấy danh sách sản phẩm theo giới tính");
    
    const data = await res.json();
    return data.products as IProduct[];
  } catch (error) {
    console.error("Lỗi getProductsByGender:", error);
    return [];
  }
};