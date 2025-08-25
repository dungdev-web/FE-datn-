import {
  AddToWishlistPayload,
  IAddToWishlistResponse,
  IWishlistItemWithProduct,
} from "@/types/wishlist";
import { API_BASE_URL } from "@/config/env";

// Lấy danh sách yêu thích của người dùng
export const getWishlistByUserId = async (
  userId: number
): Promise<IWishlistItemWithProduct[]> => {
  const response = await fetch(`${API_BASE_URL}/user/wishlist/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Không thể lấy danh sách yêu thích.");
  }
  const data = await response.json();
  if (!Array.isArray(data)) {
    console.warn("Danh sách yêu thích không phải array:", data);
    return [];
  }

  return data;
};

// Thêm sản phẩm vào wishlist
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

// Xóa sản phẩm khỏi wishlist
export const removeFromWishlist = async (
  payload: { userId: number; productId: number }
): Promise<{ message: string }> => {
  const response = await fetch(`${API_BASE_URL}/product/wishlist`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Không thể xóa sản phẩm khỏi danh sách yêu thích.");
  }

  const data = await response.json();
  return data;
};
