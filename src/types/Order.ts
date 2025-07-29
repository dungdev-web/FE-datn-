import { AddressResponse } from "./address";
import { IOrderItem } from "./OrderItem";

export interface IOrder {
  orders_id: number;
  user_id: number;
  status: string; // bạn có thể mở rộng enum này
  total_amount: number;
  payment_method_id: number;
  shipping_address_id: number;
  coupons_id: number | null;
  comment: string | null;
  created_at: string; // hoặc Date nếu bạn parse
  updated_at: string; // hoặc Date nếu bạn parse
}
export interface IOrderWithAddress extends IOrder {
  shipping_address: AddressResponse;
}
export interface IOrderDetail {
  order: IOrderWithAddress;
  items: IOrderItem[];
}
