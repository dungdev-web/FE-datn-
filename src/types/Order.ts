import { AddressResponse } from "./address";
import { ICoupon } from "./coupon";
import { IOrderItem } from "./OrderItem";

export interface IOrder {
  orders_id: number;
  user_id: number;
  status: string;
  total_amount: number;
  payment_method: {
    payment_method_id: number;
    name_method: string;
    description: string;
  };
  payment_method_id: number;
  shipping_address_id: number;
  shipping_address: {
    shipping_address_id: number;
    address_line: string;
    phone:string;
  };
  shipping_fee: number;
  user: {
    user_id: number;
    name: string;
    email: string;
    phone: string;
  }
  payment_status: string;
  coupons_id: number | null;
  coupon?: ICoupon | null;
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
