export interface IProduct {
  products_id: number;
  name: string;
  slug: string;
  description: string;
  short_desc: string;
  price: number;
  sale_price: number;
  status: string;

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
  };
}
