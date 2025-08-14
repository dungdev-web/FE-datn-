export interface IProduct {
  products_id: number;
  name: string;
  slug: string;
  description: string;
  short_desc: string;
  price: number;
  sale_price: number;
  status: string;
  created_at: string;
  updated_at: string;
  category: {
    categories_id: number;
    name: string;
    slug: string;
  };

  brand: {
    brand_id: number;
    name: string;
    slug: string;
    logo_url: string;
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
export interface ICompareProduct {
  product_compare_id: number;
  user_id: number;
  created_at: Date;
  product: IProduct;
}
export interface GetAllProductReviewParams {
  page?: number;
  limit?: number;
  product_reviews_id?: number;
  user_name?: string;
  product_name?: string;
  rating?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
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
