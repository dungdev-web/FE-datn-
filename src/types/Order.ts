import { AddressResponse } from "./address";
import { IOrderItem } from "./OrderItem";

export interface IOrder {
  orders_id: number;
  user_id: number;
  status: string;
  total_amount: number;
  payment_method_id: number;
  shipping_address_id: number;
  coupons_id: number | null;
  comment: string | null;
  created_at: string;
  updated_at: string;
  order_items: IOrderItem[];
}

export interface IOrderWithAddress extends IOrder {
  shipping_address: AddressResponse;
}
export interface IOrderDetail {
  order: IOrderWithAddress;
  items: IOrderItem[];
}
