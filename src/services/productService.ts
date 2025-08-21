import { IS_MOCK, API_BASE_URL } from "@/config/env";
import {
  IProduct,
  IReview,
  IReviewPayload,
  GetProductsDashboardParams,
  GetProductsDashboardResponse,
  GetAllProductReviewParams,
  GetSizesResponse,
  ISize,
  GetGendersResponse,
  IGender,
  AddProductPayload,
  AddProductResponse,
  GetProductByIdResponse,
  UpdateProductResponse,
} from "@/types/product";
import { getMockProducts, saveMockProducts } from "@/mocks/mockProduct";
import { FilterParams, ProductFilterResponse } from "@/types/productFilter";
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
      return products.find((p) => p.products_id === identifier.id);
    }
    if ("slug" in identifier) {
      return products.find((p) => p.slug === identifier.slug);
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
export async function getFilterPrice(
  min?: number,
  max?: number
): Promise<IProduct[]> {
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
export async function getBestSellingMockProducts(top = 6): Promise<IProduct[]> {
  if (IS_MOCK) {
    const products = getMockProducts();

    // Giả lập sold_count
    const productsWithSold = products.map((p) => ({
      ...p,
      sold_count:
        (p.product_reviews?.length || 0) * 10 + Math.floor(Math.random() * 20),
    }));

    return productsWithSold
      .sort((a, b) => (b.sold_count || 0) - (a.sold_count || 0))
      .slice(0, top);
  }

  // Nếu dùng API thật
  try {
    const res = await fetch(`${API_BASE_URL}/product/best-selling?top=${top}`);

    if (!res.ok) {
      throw new Error("Không thể lấy sản phẩm bán chạy.");
    }

    const data: IProduct[] = await res.json();
    return data.slice(0, top); // Lấy top sản phẩm
  } catch (error) {
    console.error("Lỗi khi fetch sản phẩm:", error);
    return [];
  }
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

  const res = await fetch(`${API_BASE_URL}/product/newest?page=1&limit=20`);
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

  const res = await fetch(`${API_BASE_URL}/product/featured?page=1&limit=20`);
  if (!res.ok) {
    throw new Error("Không thể lấy danh sách sản phẩm nổi bật.");
  }

  const products: IProduct[] = await res.json();

  return products;
}

//Lấy sản phẩm theo giới tính
export async function getGenderShoes(
  name: string,
  limit: number,
  page: number
): Promise<{ products: IProduct[]; total: number }> {
  if (IS_MOCK) {
    const all = getMockProducts();
    const lowerName = name.toLowerCase();

    const filtered = all.filter((product) => {
      const gender = product.gender?.name?.toLowerCase();
      const categoryName = product.category?.name?.toLowerCase();

      return (
        gender === lowerName ||
        (lowerName === "nam" && categoryName?.includes("nam"))
      );
    });

    return {
      products: filtered,
      total: filtered.length,
    };
  }

  const params = new URLSearchParams({
    gender: name,
    page: page.toString(),
    limit: limit.toString(),
  });

  const res = await fetch(
    `${API_BASE_URL}/product/gender?${params.toString()}`
  );
  if (!res.ok) {
    throw new Error("Không thể lấy danh sách giày theo giới tính.");
  }

  const data = await res.json();

  return {
    products: data.products,
    total: data.total,
  };
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

  const res = await fetch(`${API_BASE_URL}/product/deals?page=1&limit=20`);
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

  const res = await fetch(
    `${API_BASE_URL}/product/related/${categoryId}?page=1&limit=8`
  );
  if (!res.ok) {
    throw new Error("Không thể lấy sản phẩm cùng loại.");
  }

  const data = await res.json();
  const related = data.relatedProducts;

  return Array.isArray(related) ? related : [];
}
// lấy tất cả review theo product
export async function getReviewProduct(productId: number): Promise<IReview[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/product/reviews/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Không thể lấy review sản phẩm.");
    }

    const data: IReview[] = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Lỗi khi lấy đánh giá sản phẩm:", error);
    return [];
  }
}

export async function addProduct(
  payload: AddProductPayload
): Promise<AddProductResponse> {
  const url = `${API_BASE_URL}/product/add-product`;

  const formData = new FormData();

  formData.append("name", payload.name);
  formData.append("description", payload.description);
  formData.append("short_desc", payload.short_desc);
  formData.append("price", payload.price.toString());
  formData.append("sale_price", payload.sale_price.toString());
  formData.append("categories_id", payload.categories_id.toString());
  formData.append("brand_id", payload.brand_id.toString());
  formData.append("gender_id", payload.gender_id.toString());
  formData.append("status", payload.status.toString());

  // stringify variants
  formData.append("product_variants", JSON.stringify(payload.product_variants));

  // ảnh chính
  payload.images.forEach((file) => {
    formData.append("images", file);
  });

  // ảnh cho từng mã màu
  Object.entries(payload.variantImages).forEach(([codeColor, file]) => {
    formData.append(`variant_image_${codeColor}`, file);
  });

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Không thể tạo sản phẩm mới.");
  }

  return res.json() as Promise<AddProductResponse>;
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

export const getProductsByGender = async (
  gender: string
): Promise<IProduct[]> => {
  try {
    const res = await fetch(`${API_BASE_URL}/product?gender=${gender}`);
    if (!res.ok)
      throw new Error("Lỗi khi lấy danh sách sản phẩm theo giới tính");

    const data = await res.json();
    return data.products as IProduct[];
  } catch (error) {
    console.error("Lỗi getProductsByGender:", error);
    return [];
  }
};
export const getFilteredProducts = async (
  params: FilterParams
): Promise<ProductFilterResponse> => {
  try {
    const query = new URLSearchParams();

    if (params.keyword) query.append("keyword", params.keyword);
    if (params.gender) query.append("gender", params.gender);

    // Brand có thể là chuỗi hoặc mảng chuỗi
    if (params.brand) {
      if (Array.isArray(params.brand)) {
        params.brand.forEach((b) => query.append("brand", b));
      } else {
        query.append("brand", params.brand);
      }
    }

    if (params.minPrice !== undefined) {
      query.append("minPrice", String(params.minPrice));
    }

    if (params.maxPrice !== undefined) {
      query.append("maxPrice", String(params.maxPrice));
    }

    if (params.status !== undefined) {
      query.append("status", String(params.status));
    }

    if (params.limit !== undefined) {
      query.append("limit", String(params.limit));
    }

    if (params.page !== undefined) {
      query.append("page", String(params.page));
    }

    if (params.sortBy) {
      query.append("sortBy", params.sortBy);
    }

    if (params.sortOrder) {
      query.append("sortOrder", params.sortOrder);
    }

    const response = await fetch(
      `${API_BASE_URL}/product/filter?${query.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Lỗi khi gọi API lọc sản phẩm");
    }

    const json = await response.json();

    const {
      data: {
        data: products = [],
        total = 0,
        totalPages = 1,
        page: currentPage = 1,
      } = {},
    } = json;

    return {
      products,
      total,
      totalPages,
      currentPage,
    };
  } catch (error) {
    console.error("Lỗi getFilteredProducts:", error);
    throw error;
  }
};

//search
export async function searchProducts(keyword: string, page = 1, limit = 12) {
  const res = await fetch(
    `${API_BASE_URL}/product/search?q=${encodeURIComponent(
      keyword
    )}&page=${page}&limit=${limit}`
  );
  if (!res.ok) throw new Error("Lỗi khi tìm kiếm sản phẩm");
  return await res.json();
}
//review
export async function reviewProduct(productId: number) {
  const res = await fetch(`${API_BASE_URL}/product/reviews/${productId}`);
  if (!res.ok) throw new Error("Lỗi lấy review ");
  return await res.json();
}
// add reviews
export async function addReviewProduct(
  productId: number,
  payload: IReviewPayload
) {
  const res = await fetch(`${API_BASE_URL}/product/reviews/${productId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (res.status === 409) {
    throw new Error("Bạn đã đánh giá sản phẩm này rồi.");
  }

  if (!res.ok) {
    throw new Error("Lỗi khi gửi đánh giá.");
  }

  return await res.json();
}
// compare product
export async function getCompareProduct(userId: number) {
  const res = await fetch(`${API_BASE_URL}/product/compare?user_id=${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Không thể lấy danh sách sản phẩm so sánh");
  }

  return await res.json();
}
// add compare
export async function addCompareProduct(userId: number, productID: number) {
  const res = await fetch(`${API_BASE_URL}/product/compare/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: userId, product_id: productID }),
  });
  const data = await res.json();

  if (!res.ok) {
    throw {
      status: res.status,
      message: data.message || data.error || "Lỗi không xác định",
    };
  }

  return data;
}

// delete compare
export async function deleteCompareProduct(userId: number, productID: number) {
  const res = await fetch(`${API_BASE_URL}/product/compare/remove`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: userId, product_id: productID }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("API response text:", text);
    throw new Error("Không thể xóa danh sách sản phẩm so sánh");
  }

  return await res.json();
}
//get all reviews admin
export async function getAllProductReview({
  page,
  limit,
  product_reviews_id,
  user_name,
  product_name,
  rating,
  search,
  sortBy,
  sortOrder,
}: GetAllProductReviewParams = {}) {
  try {
    const query = new URLSearchParams({
      page: String(page || 1), // mặc định 1
      limit: String(limit || 10), // mặc định 10
      sortBy: sortBy || "created_at",
      sortOrder: sortOrder || "desc",
    });

    if (product_reviews_id)
      query.append("product_reviews_id", product_reviews_id?.toString() ?? "");

    if (user_name) query.append("user_name", user_name);

    if (product_name) query.append("product_name", product_name);

    if (rating) query.append("rating", rating?.toString() ?? "");

    if (search) query.append("search", search);

    const res = await fetch(
      `${API_BASE_URL}/product/all/reviews?${query.toString()}`
    );

    if (!res.ok) {
      throw new Error(`Lỗi API: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Lỗi khi gọi API getAllProductReview:", error);
    throw error;
  }
}
export async function getByIdReview(product_reviews_id: number) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/product/all/reviews/${product_reviews_id}`
    );
    if (!res.ok) {
      throw new Error(`Lỗi API: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Lỗi khi gọi API getByIdReview:", error);
    throw error;
  }
}
export async function setStatusReview(
  product_reviews_id: number,
  status: string
) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/product/reviews/status/${product_reviews_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.error || "Lỗi khi cập nhật trạng thái đánh giá"
      );
    }

    return await res.json();
  } catch (err) {
    console.error("[Frontend] Lỗi setStatusReview:", err);
    throw err;
  }
}
export async function getProductsDashboard(
  params: GetProductsDashboardParams = {}
): Promise<GetProductsDashboardResponse> {
  if (IS_MOCK) {
    // Xử lý mock nếu có
    return {
      data: [],
      total: 0,
      currentPage: 1,
      totalPages: 0,
    };
  }

  const {
    page = 1,
    limit = 5,
    sortField = "created_at",
    sortOrder = "desc",
    productCode,
    productName,
    brandId,
    categoryId,
    minImportPrice,
    maxImportPrice,
    minSalePrice,
    maxSalePrice,
    minQuantity,
    maxQuantity,
  } = params;

  const queryParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sortField,
    sortOrder,
  });

  if (productCode) queryParams.append("productCode", productCode);
  if (productName) queryParams.append("productName", productName);
  if (brandId !== undefined) queryParams.append("brandId", String(brandId));
  if (categoryId !== undefined)
    queryParams.append("categoryId", String(categoryId));
  if (minImportPrice !== undefined)
    queryParams.append("minImportPrice", String(minImportPrice));
  if (maxImportPrice !== undefined)
    queryParams.append("maxImportPrice", String(maxImportPrice));
  if (minSalePrice !== undefined)
    queryParams.append("minSalePrice", String(minSalePrice));
  if (maxSalePrice !== undefined)
    queryParams.append("maxSalePrice", String(maxSalePrice));
  if (minQuantity !== undefined)
    queryParams.append("minQuantity", String(minQuantity));
  if (maxQuantity !== undefined)
    queryParams.append("maxQuantity", String(maxQuantity));

  const url = `${API_BASE_URL}/product/prodashboard?${queryParams.toString()}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Không thể lấy danh sách sản phẩm từ server.");
  }

  const json = await res.json();

  return {
    data: json.products as IProduct[],
    total: json.total,
    currentPage: json.currentPage,
    totalPages: json.totalPages,
  };
}

export async function getSizes(): Promise<GetSizesResponse> {
  if (IS_MOCK) {
    // Mock dữ liệu khi chạy ở chế độ mock
    return {
      data: [
        {
          id: 1,
          number_size: "35",
          label: undefined,
          name: undefined,
          value: undefined,
          size_id: undefined,
        },
        {
          id: 2,
          number_size: "36",
          label: undefined,
          name: undefined,
          value: undefined,
          size_id: undefined,
        },
        {
          id: 3,
          number_size: "37",
          label: undefined,
          name: undefined,
          value: undefined,
          size_id: undefined,
        },
      ],
    };
  }

  const url = `${API_BASE_URL}/product/size`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Không thể lấy danh sách size từ server.");
  }

  const json = await res.json();

  return {
    data: json as ISize[],
  };
}

export async function getGenders(): Promise<GetGendersResponse> {
  if (IS_MOCK) {
    // Mock dữ liệu khi chạy ở chế độ mock
    return {
      data: [
        { id: 1, name: "Nam", label: undefined, value: undefined },
        { id: 2, name: "Nữ", label: undefined, value: undefined },
        { id: 3, name: "Khác", label: undefined, value: undefined },
      ],
    };
  }

  const url = `${API_BASE_URL}/product/genderadmin`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Không thể lấy danh sách gender từ server.");
  }

  const json = await res.json();

  return {
    data: json as IGender[],
  };
}
export async function getProductAdminById(
  id: number
): Promise<GetProductByIdResponse> {
  if (IS_MOCK) {
  }

  const url = `${API_BASE_URL}/product/proadmin/${id}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Không thể lấy sản phẩm với id ${id} từ server.`);
  }

  const json = await res.json();
  return {
    data: json as IProduct,
  };
}

export async function deleteAdminProduct(productId: number): Promise<IProduct> {
  const res = await fetch(`${API_BASE_URL}/product/delete/${productId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Xóa sản phẩm thất bại");
  }

  const json = await res.json();
  return json as IProduct;
}
