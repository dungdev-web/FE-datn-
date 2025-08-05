
// Kiểu dữ liệu gửi lên
export interface CheckoutRequest {
  user_id: number;
  shipping_address_id: number;
  payment_method: {
    id: number;
    code: string;
  };
  coupon_code?: string;
  shipping_fee: number;
  comment?: string;
}

// Kiểu dữ liệu trả về
export interface CheckoutResponse {
  message: string;
  order: {
    orders_id: number;
    user_id: number;
    status: string;
    total_amount: number;
    payment_method_id: number;
    shipping_address_id: number;
    coupons_id?: number;
    comment?: string;
    created_at: string;
    updated_at: string;
    order_items: Array<{
      order_items_id: number;
      variant_id: number;
      order_id: number;
      quantity: number;
      unit_price: number;
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
          price: number;
          sale_price?: number;
          categories_id: number;
          brand_id: number;
          gender_id: number;
          status: number;
          description: string;
          short_desc: string;
          created_at: string;
          updated_at: string;
        };
      };
    }>;
  };
  payment?: {
    return_code: number;
    return_message: string;
    zp_trans_token: string;
    cashier_order_url: string;
    order_url: string;
    qr_code: string;
    [key: string]: any; // Đề phòng các trường khác phát sinh
  };
}
