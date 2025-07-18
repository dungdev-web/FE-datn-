export interface AddToWishlistPayload {
  user_id: number;
  product_id: number;
}

export interface IWishlistItem {
  wishlist_items_id: number;
  user_id: number;
  product_id: number;
  created_at: string; // hoặc Date nếu muốn
  updated_at: string;
}

export interface IAddToWishlistResponse {
  message: string;
  data: IWishlistItem;
}
