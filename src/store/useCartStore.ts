// src/store/useCartStore.ts
import { create } from "zustand";
import { ICart, ICartItem } from "@/types/cart";

interface CartStore {
  cart: (ICart & { items: ICartItem[] }) | null;
  setCart: (cart: ICart & { items: ICartItem[] }) => void;
  updateItemQuantity: (id: number, quantity: number) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cart: null,
  setCart: (cart) => set({ cart }),
  updateItemQuantity: (id, quantity) =>
    set((state) => {
      if (!state.cart) return state;
      const updatedItems = state.cart.items.map((item) =>
        item.cart_items_id === id ? { ...item, quantity } : item
      );
      return {
        cart: {
          ...state.cart,
          items: updatedItems,
        },
      };
    }),
}));
