export interface ICart {
  carts_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  items: ICartItem[];
}
export interface Addtocart{
  user_id: number;
  variant_id:number;
  quantity:number;
  price:number;
}
export interface ICartItem {
  cart_items_id: number;
  cart_id: number;
  variant: {
  variant_id:number;
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
