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
      image: string;
    };
    size: {
      id: number;
      number_size: string;
    };
  }[];
}
