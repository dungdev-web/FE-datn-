import { create } from "zustand";

interface GlobalStore {
  wishlistCount: number;
  compareCount: number;
  cartCount: number;
  setWishlistCount: (count: number) => void;
  setCompareCount: (count: number) => void;
  setCartCount: (count: number) => void;
  incrementWishlist: () => void;
  incrementCompare: () => void;
  incrementCart: () => void;
  decrementCompare: () => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  wishlistCount: 0,
  compareCount: 0,
  cartCount: 0,

  setWishlistCount: (count) => set({ wishlistCount: count }),
  setCompareCount: (count) => set({ compareCount: count }),
  setCartCount: (count) => set({ cartCount: count }),

  incrementWishlist: () =>
    set((state) => ({ wishlistCount: state.wishlistCount + 1 })),
  incrementCompare: () =>
    set((state) => ({ compareCount: state.compareCount + 1 })),
  incrementCart: () => set((state) => ({ cartCount: state.cartCount + 1 })),
   decrementCompare: () =>
    set((state) => ({
      compareCount: Math.max(state.compareCount - 1, 0),
    })),
}));