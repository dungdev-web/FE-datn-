import { IUser } from "@/types/user";
import { create } from "zustand";

interface GlobalStore {
  user: IUser | null;
  setUser: (user: IUser) => void;
  logoutUser: () => void;

  wishlistCount: number;
  compareCount: number;
  cartCount: number;
  addressCount: number;
  orderCount: number;
  voucherCount: number; // ✅ Thêm voucherCount

  setOrderCount: (count: number) => void;
  setAddressCount: (count: number) => void;
  setWishlistCount: (count: number) => void;
  setCompareCount: (count: number) => void;
  setCartCount: (count: number) => void;
  setVoucherCount: (count: number) => void; // ✅ Thêm setVoucherCount

  incrementAddressCount: () => void;
  decrementAddressCount: () => void;
  incrementWishlist: () => void;
  decrementWishlist: () => void;
  incrementCompare: () => void;
  decrementCompare: () => void;
  incrementCart: () => void;
  decrementCart: () => void;
  incrementVoucherCount: () => void; // ✅ Thêm incrementVoucherCount
  decrementVoucherCount: () => void; // ✅ Thêm decrementVoucherCount
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
      voucherCount: 0, // ✅ reset khi logout
    }),

  wishlistCount: 0,
  compareCount: 0,
  cartCount: 0,
  addressCount: 0,
  orderCount: 0,
  voucherCount: 0, // ✅ Khởi tạo mặc định

  setOrderCount: (count) => set({ orderCount: count }),
  setAddressCount: (count) => set({ addressCount: count }),
  setWishlistCount: (count) => set({ wishlistCount: count }),
  setCompareCount: (count) => set({ compareCount: count }),
  setCartCount: (count) => set({ cartCount: count }),
  setVoucherCount: (count) => set({ voucherCount: count }), // ✅

  incrementAddressCount: () =>
    set((state) => ({ addressCount: state.addressCount + 1 })),
  decrementAddressCount: () =>
    set((state) => ({ addressCount: Math.max(state.addressCount - 1, 0) })),

  incrementWishlist: () =>
    set((state) => ({ wishlistCount: state.wishlistCount + 1 })),
  decrementWishlist: () =>
    set((state) => ({ wishlistCount: Math.max(state.wishlistCount - 1, 0) })),

  incrementCompare: () =>
    set((state) => ({ compareCount: state.compareCount + 1 })),
  decrementCompare: () =>
    set((state) => ({ compareCount: Math.max(state.compareCount - 1, 0) })),

  incrementCart: () =>
    set((state) => ({ cartCount: state.cartCount + 1 })),
  decrementCart: () =>
    set((state) => ({ cartCount: Math.max(state.cartCount - 1, 0) })),

  incrementVoucherCount: () =>
    set((state) => ({ voucherCount: state.voucherCount + 1 })), // ✅
  decrementVoucherCount: () =>
    set((state) => ({ voucherCount: Math.max(state.voucherCount - 1, 0) })), // ✅
}));
