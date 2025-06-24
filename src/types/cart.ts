export interface ICart {
  carts_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  items: ICartItem[];
}

export interface ICartItem {
  cart_items_id: number;
  cart_id: number;
  variant_id: number;
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
}
