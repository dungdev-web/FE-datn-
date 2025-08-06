export interface ICoupon {
  length: number;
  coupons_id: number;
  code: string;
  discount_type: "percentage" | "fixed"; 
  discount_value: string; 
  start_date: string;
  end_date: string;
  usage_limit: number;
  used_count: number;
  created_at: string;
  updated_at: string;
}
