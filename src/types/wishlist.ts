import { IProduct } from "./product";

export interface AddToWishlistPayload {
  user_id: number;
  product_id: number;
}
export interface IWishlistItem {
  wishlist_items_id: number;
  user_id: number;
  product_id: number;
  created_at: string;
  updated_at: string;
}

export interface IWishlistItemWithProduct extends IWishlistItem {
  product: IProduct;
}

export interface IAddToWishlistResponse {
  message: string;
  data: IWishlistItem;
}

