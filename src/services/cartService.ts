import { IS_MOCK, API_BASE_URL } from "@/config/env";
import { getMockCart, saveMockCart } from "@/mocks/mockCart";
import { ICart,ICartItem } from "@/types/cart";

// Thêm sản phẩm vào giỏ mock
export const addToMockCart = (userId: number, variantId: number, quantity: number, price: number): ICart => {
  let carts = getMockCart();
  let cart = carts.find(c => c.user_id === userId);

  if (!cart) {
    cart = {
      carts_id: Date.now(), 
      user_id: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      items: []
    };
    carts.push(cart);
  }

  let item = cart.items.find(i => i.variant_id === variantId);
  if (item) {
    item.quantity += quantity;
    item.updated_at = new Date().toISOString();
  } else {
    const newItem: ICartItem = {
      cart_items_id: Date.now(),
      cart_id: cart.carts_id,
      variant_id: variantId,
      quantity,
      price,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    cart.items.push(newItem);
  }

  cart.updated_at = new Date().toISOString();

  saveMockCart(carts);
  return cart;
};

// Lấy giỏ hàng của user
export const getMockCartByUser = (userId: number): ICart | null => {
  const carts = getMockCart();
  return carts.find(c => c.user_id === userId) || null;
};

// Xóa giỏ hàng
export const clearMockCart = (userId: number): void => {
  let carts = getMockCart().filter(c => c.user_id !== userId);
  saveMockCart(carts);
};