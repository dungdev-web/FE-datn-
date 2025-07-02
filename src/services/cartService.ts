import { IS_MOCK, API_BASE_URL } from "@/config/env";
import { getMockCart, saveMockCart } from "@/mocks/mockCart";
import { ICart,ICartItem } from "@/types/cart";

// Thêm sản phẩm vào giỏ mock
export async function addToMockCart(
  userId: number,
  variant: ICartItem["variant"],
  quantity: number,
  price: number
): Promise<ICart | { data: any; total: number }> {
  if (IS_MOCK) {
    let carts = getMockCart();
    let cart = carts.find(c => c.user_id === userId);

    if (!cart) {
      cart = {
        carts_id: Date.now(),
        user_id: userId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        items: [],
      };
      carts.push(cart);
    }

    const existingItem = cart.items.find(
      item =>
        item.variant.color.id === variant.color.id &&
        item.variant.size.id === variant.size.id &&
        item.variant.name === variant.name
    );

    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.updated_at = new Date().toISOString();
    } else {
      const newItem: ICartItem = {
        cart_items_id: Date.now(),
        cart_id: cart.carts_id,
        variant,
        quantity,
        price,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      cart.items.push(newItem);
    }

    cart.updated_at = new Date().toISOString();
    saveMockCart(carts);

    return cart;
  } else {
    const res = await fetch(`${API_BASE_URL}/cart/addpro`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        variant,
        quantity,
        price,
      }),
    });

    if (!res.ok) {
      throw new Error("Không thể thêm sản phẩm vào giỏ hàng.");
    }

    const json = await res.json();
    return {
      data: json.products,
      total: json.total,
    };
  }
}


// Lấy giỏ hàng của user
export async function getMockCartByUser(userId: number): Promise<ICart | null> {
  if (IS_MOCK) {
    const carts = getMockCart();
    return carts.find(c => c.user_id === userId) || null;
  }
  try {
    const res = await fetch(`${API_BASE_URL}/cart/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.error("Không thể lấy giỏ hàng từ server.");
      return null;
    }

    const json = await res.json();
    return json.cart || null;
  } catch (error) {
    console.error("Lỗi khi gọi API giỏ hàng:", error);
    return null;
  }
}

// Xóa giỏ hàng
export async function clearMockCart(userId: number): Promise<ICart | null> {
  if (IS_MOCK) {
    const allCarts = getMockCart();
    const updatedCarts = allCarts.filter(c => c.user_id !== userId);
    saveMockCart(updatedCarts);
    return null;
  }

  // Nếu dùng API thật
  const res = await fetch(`${API_BASE_URL}/cart/delete`, {
    method: "POST",
    body: JSON.stringify({ userId }),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Không thể xóa giỏ hàng.");
  return null;
}