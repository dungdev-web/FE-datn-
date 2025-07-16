export interface IOrder {
  orders_id: number;
  user_id: number;
  status: number; // bạn có thể mở rộng enum này
  total_amount: number;
  payment_method_id: number;
  shipping_address_id: number;
  coupons_id: number | null;
  comment: string | null;
  created_at: string; // hoặc Date nếu bạn parse
  updated_at: string; // hoặc Date nếu bạn parse
}
