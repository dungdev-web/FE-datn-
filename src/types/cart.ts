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
  variant: {
    name:string;
    color: {
      id: number;
      code_color: string;
      name_color: string;
      image: string;
    };
    size: {
      id: number;
      number_size: string;
    };
  };
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
}
