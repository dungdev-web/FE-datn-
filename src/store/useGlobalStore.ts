import { IUser } from "@/types/user";
import { create } from "zustand";

interface GlobalStore {
  user: IUser | null;
  setUser: (user: IUser) => void;
  logoutUser: () => void;

  wishlistCount: number;
  compareCount: number;
  cartCount: number;

  setWishlistCount: (count: number) => void;
  setCompareCount: (count: number) => void;
  setCartCount: (count: number) => void;

  incrementWishlist: () => void;
  decrementWishlist: () => void;
  incrementCompare: () => void;
  decrementCompare: () => void;
  incrementCart: () => void;
}


export const useGlobalStore = create<GlobalStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logoutUser: () =>
    set({
      user: null,
      wishlistCount: 0,
      compareCount: 0,
      cartCount: 0,
    }),

  wishlistCount: 0,
  compareCount: 0,
  cartCount: 0,

  setWishlistCount: (count) => set({ wishlistCount: count }),
  setCompareCount: (count) => set({ compareCount: count }),
  setCartCount: (count) => set({ cartCount: count }),

  incrementWishlist: () =>
    set((state) => ({ wishlistCount: state.wishlistCount + 1 })),
  decrementWishlist: () =>
    set((state) => ({ wishlistCount: Math.max(state.wishlistCount - 1, 0) })),
  incrementCompare: () =>
    set((state) => ({ compareCount: state.compareCount + 1 })),
  decrementCompare: () =>
    set((state) => ({ compareCount: Math.max(state.compareCount - 1, 0) })),
  incrementCart: () => set((state) => ({ cartCount: state.cartCount + 1 })),
}));


