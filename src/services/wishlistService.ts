import { AddToWishlistPayload, IAddToWishlistResponse, IWishlistItem } from "@/types/wishlist";
import { API_BASE_URL } from "@/config/env";

export const addToWishlist = async (
  payload: AddToWishlistPayload
): Promise<IAddToWishlistResponse> => {
  const response = await fetch(`${API_BASE_URL}/product/wishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Không thể thêm vào danh sách yêu thích.");
  }

  const data: IAddToWishlistResponse = await response.json();
  return data;
};
