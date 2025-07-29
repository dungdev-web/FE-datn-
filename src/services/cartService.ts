import { IS_MOCK, API_BASE_URL } from "@/config/env";
import { getMockCart, saveMockCart } from "@/mocks/mockCart";
import {
  ICart,
  ICartItem,
  Addtocart,
  RemoveFromCartRequest,
  RemoveFromCartResponse,
} from "@/types/cart";
interface AddToCartResponse {
  length: any;
  message: string;
  cart: ICartItem[]; // danh sách cart_items sau khi thêm
}

// Gọi API để thêm sản phẩm vào giỏ hàng
export const addToCart = async ({
  user_id,
  variant_id,
  quantity,
}: Addtocart): Promise<AddToCartResponse> => {
  try {
    const res = await fetch(`${API_BASE_URL}/product/addToCart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        variant_id,
        quantity,
      }),
    });

    if (!res.ok) {
      throw new Error("Không thể thêm sản phẩm vào giỏ hàng.");
    }

    const data = await res.json();

    return {
      length: Array.isArray(data.cart) ? data.cart.length : 0,
      message: data.message,
      cart: data.cart, // kiểu này khớp với ICartItem[]
    };
  } catch (error) {
    console.error("Lỗi khi thêm giỏ hàng:", error);
    throw error;
  }
};
// Thêm sản phẩm vào giỏ mock
export async function addToMockCart(
  user_id: number,
  variant_id: number,
  quantity: number,
  price: number
): Promise<Addtocart | { data: any; total: number }> {
  if (IS_MOCK) {
    let carts = getMockCart();
    let cart = carts.find((c) => c.user_id === user_id);

    if (!cart) {
      cart = {
        carts_id: Date.now(),
        user_id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        cart_items: [],
      };
      carts.push(cart);
    }

    const existingItem = cart.cart_items.find(
      (item) => item.variant?.product_variants_id === variant_id
    );

    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.updated_at = new Date().toISOString();
    } else {
      const newItem = {
        cart_items_id: Date.now(),
        cart_id: cart.carts_id,
        variant_id: variant_id,
        variant: cart.cart_items[0]?.variant,
        quantity,
        price,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      cart.cart_items.push(newItem);
    }

    cart.updated_at = new Date().toISOString();
    saveMockCart(carts);

    return { user_id, variant_id, quantity, price };
  } else {
    const res = await fetch(`${API_BASE_URL}/cart/addpro`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        variant_id,
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
    return carts.find((c) => c.user_id === userId) || null;
  }
  try {
    const res = await fetch(`${API_BASE_URL}/get-cart/${userId}`, {
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
    return json || null;
  } catch (error) {
    console.error("Lỗi khi gọi API giỏ hàng:", error);
    return null;
  }
}

// Xóa giỏ hàng
export async function clearMockCart(userId: number): Promise<ICart | null> {
  if (IS_MOCK) {
    const allCarts = getMockCart();
    const updatedCarts = allCarts.filter((c) => c.user_id !== userId);
    saveMockCart(updatedCarts);
    return null;
  }
  const res = await fetch(`${API_BASE_URL}/cart/delete`, {
    method: "POST",
    body: JSON.stringify({ userId }),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Không thể xóa giỏ hàng.");
  return null;
}
export const getCartByUserId = async (
  userId: number
): Promise<(ICart & { items: ICartItem[] }) | null> => {
  try {
    const res = await fetch(`${API_BASE_URL}/get-cart/${userId}`, {
      method: "GET",
      credentials: "include", // nếu backend dùng cookie-auth
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Fetch failed: ${res.status} - ${errorText}`);
    }

    const data: ICart = await res.json();

    const cartWithItems = {
      ...data,
      items: data.cart_items.map((item) => ({
        ...item,
        price: Number(item.price),
      })),
    };

    return cartWithItems;
  } catch (error) {
    console.error("Lỗi lấy giỏ hàng:", error);
    return null;
  }
};

export const updateCartItem = async ({
  user_id,
  variant_id,
  quantity,
}: {
  user_id: number;
  variant_id: number;
  quantity: number;
}): Promise<ICartItem> => {
  try {
    const res = await fetch(`${API_BASE_URL}/product/cart/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        variant_id,
        quantity,
      }),
    });

    if (!res.ok) {
      throw new Error("Không thể cập nhật sản phẩm trong giỏ hàng.");
    }

    const data: ICartItem = await res.json();

    // Nếu cần ép kiểu `price` từ string -> number (nếu backend trả string)
    data.price = Number(data.price);

    return data;
  } catch (error) {
    console.error("Lỗi khi cập nhật giỏ hàng:", error);
    throw error;
  }
};
export const removeFromCart = async ({
  user_id,
  variant_id,
}: RemoveFromCartRequest): Promise<RemoveFromCartResponse> => {
  try {
    const res = await fetch(`${API_BASE_URL}/product/cart/remove`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, variant_id }),
    });

    if (!res.ok) {
      throw new Error("Không thể xóa sản phẩm khỏi giỏ hàng.");
    }

    const data: RemoveFromCartResponse = await res.json();

    return data;
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error);
    throw error;
  }
};
