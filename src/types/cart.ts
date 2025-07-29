export interface Addtocart {
  user_id: number;
  variant_id: number;
  quantity: number;
  price: number;
}

export interface RemoveFromCartRequest {
  user_id: number;
  variant_id: number;
}

export interface RemoveFromCartResponse {
  message: string;
  data: {
    count: number;
  };
}

export interface ICart {
  carts_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  cart_items: ICartItem[];
}

export interface ICartItem {
  sale_price: any;
  priceSale: any;
  cart_items_id: number;
  cart_id: number;
  variant_id: number;
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
  variant: {
    product_variants_id: number;
    product_id: number;
    color_id: number;
    size_id: number;
    stock_quantity: number;
    sku: string;
    product: {
      products_id: number;
      name: string;
      slug: string;
      description: string;
      short_desc: string;
      price: string;
      sale_price: string;
      categories_id: number;
      brand_id: number;
      gender_id: number;
      status: number;
      created_at: string;
      updated_at: string;
      images: {
        images_id: number;
        url: string;
        alt_text: string;
        type: string;
        product_id: number;
      }[];
    };
    color: {
      id: number;
      code_color: string;
      name_color: string;
      images: string | null;
    };
    size: {
      id: number;
      number_size: string;
    };
  };
}
