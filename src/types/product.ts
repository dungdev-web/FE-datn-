export interface IProduct {
  brand_id: any;
  gender_id: any;
  categories_id: any;
  products_id: number;
  name: string;
  slug: string;
  description: string;
  short_desc: string;
  price: number;
  sale_price: number;
  status: number;
  created_at: string;
  updated_at: string;
  view: number;
  category: {
    categories_id: number;
    name: string;
    slug: string;
    parent_id: number;
    image: string;
    status: number;
    created_at: string;
    updated_at: string;
  };

  brand: {
    brand_id: number;
    name: string;
    slug: string;
    logo_url: string;
    status: number;
    created_at: string;
    updated_at: string;
  };

  gender: {
    id: number;
    name: string;
  };

  images: {
    images_id: number;
    url: string;
    alt_text: string;
    type: string;
  }[];
  product_reviews: {
    product_reviews_id: number;
    rating: string;
    content: string;
    user: {
      name: string;
      avatar: string;
    };
  }[];
  product_variants: {
    image_url: string;
    product_variants_id: number;
    sku: string;
    stock_quantity: number;
    color: {
      id: number;
      code_color: string;
      name_color: string;
      images: string;
    };
    size: {
      map(arg0: (s: any) => any): any;
      id: number;
      number_size: string;
    };
  }[];
}
export interface IReview {
  product_reviews_id: number;
  user_id: number;
  product_id: number;
  rating: number;
  content: string;
  created_at: string;
  updated_at: string;
  user: {
    user_id: number;
    name: string;
    avatar: string;
    picture?: string;
  };
}
export interface IReviewPayload {
  user_id: number;
  rating: number;
  content: string;
}
export interface ICompareProduct{
  product_compare_id:number;
  user_id:number;
  created_at:Date;
  product:IProduct;
  
}

export interface GetProductsDashboardParams {
  page?: number;
  limit?: number;
  sortField?: string;
  sortOrder?: "asc" | "desc";
  productCode?: string;
  productName?: string;
  brandId?: number;
  categoryId?: number;
  minImportPrice?: number;
  maxImportPrice?: number;
  minSalePrice?: number;
  maxSalePrice?: number;
  minQuantity?: number;
  maxQuantity?: number;
}

export interface GetProductsDashboardResponse {
  data: IProduct[];
  total: number;
  currentPage: number;
  totalPages: number;
}

// src/types/size.ts
export interface ISize {
  label: any;
  name: any;
  value: any;
  size_id: any;
  id: number;
  number_size: string;
}

export interface GetSizesResponse {
  data: ISize[];
}
 export interface IGender {
  id: number;
  name: string;
  label?: string;
  value?: string;
}

export interface GetGendersResponse {
  data: IGender[];
}
export interface IProductVariantPayload {
  product_variants_id?: number; // <-- thêm dòng này
  code_color: string;
  name_color: string;
  size_id: number;
  stock_quantity: number;
}
export interface VariantUI {
  color: string; // "#FF0003|Xanh lá"
  colorHex: string;
  sizes: { size_id: number; product_variants_id: number; stock_quantity: number }[];
  image: File | null;
  imagePreview?: string;
}

export interface AddProductPayload {
  name: string;
  description: string;
  short_desc: string;
  price: number;
  sale_price: number;
  categories_id: number;
  brand_id: number;
  gender_id: number;
  status: number;
  product_variants: IProductVariantPayload[];
  images: File[]; // ảnh chính
  variantImages: Record<string, File>; // key = code_color
}

export interface AddProductResponse {
  message: string;
  product: IProduct;
}
export interface GetProductByIdResponse {
  data: IProduct;
}
export interface UpdateProductResponse {
  name: any;
  product: IProduct;
}
interface Variant {
  color: string;        // "#FF0003|Xanh lá"
  colorHex: string;     // "#FF0003"
  sizes: string[];      // ["1","2"]
  quantity: number;
  image?: File | null;
  imagePreview?: string;
  oldVariantIds?: number[]; // lưu id cũ khi fetch product
}

interface ProductVariantsPayload {
  code_color: string;
  name_color: string;
  size_id: number;
  stock_quantity: number;
  product_variants_id?: number;
}