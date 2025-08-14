export interface ICoupon {
  length: number;
  userId?: number; // Thêm trường userId nếu cần lưu mã cho người dùng
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
  min_order: number;
}
interface CouponListResponse {
  data: ICoupon[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
}
// Nếu bạn có thể sửa type CreateCouponPayload thì sửa như này:
export interface CreateCouponPayload {
  code: string;
  discount_type: "percentage" | "fixed";
  discount_value: number | string;
  start_date: string;
  end_date: string;
  usage_limit: number | string;
  used_count: number | string;
  min_order: number | string;
}
