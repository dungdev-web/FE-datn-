interface PaymentMethod {
  id: number;
}

export interface CheckoutRequest {
  user_id: number;
  shipping_address_id: number;
  payment_method: PaymentMethod;
  coupon_code?: string;
  shipping_fee: number;
  note?: string;
}

export interface OrderItem {
  order_items_id: number;
  variant_id: number;
  order_id: number;
  quantity: number;
  unit_price: number;
  variant: any;
}

export interface CheckoutResponse {
  message: string;
  data: {
    orders_id: number;
    user_id: number;
    status: string;
    total_amount: number;
    payment_method_id: number;
    shipping_address_id: number;
    coupons_id?: number;
    comment: string | null;
    created_at: string;
    updated_at: string;
    order_items: OrderItem[];
  };
}
