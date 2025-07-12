// mocks/mockCart.ts
import { ICartItem, ICart } from "@/types/cart";
const defaultCart: ICart[] = [
  {
    carts_id: 1,
    user_id: 4,
    created_at: "2025-06-22T10:00:00.000Z",
    updated_at: "2025-06-22T10:00:00.000Z",
    items: [
      {
        cart_items_id: 1,
        cart_id: 1,
        variant: 
          {
            variant_id:2,
            name: "Converse Run Star Motion",
            color: {
              id: 301,
              code_color: "#000000",
              name_color: "Đen",
              image: "/images/products/chaybo/ConverseRunStarMotion.webp",
            },
            size: {
              id: 401,
              number_size: "41",
            },
          },
        
        quantity: 5,
        price: 1500000,
        created_at: "2025-06-22T10:00:00.000Z",
        updated_at: "2025-06-22T10:00:00.000Z",
      },
      {
        cart_items_id: 2,
        cart_id: 1,
        variant: 
          {
            variant_id:2,
            name: "Converse Run Star Motion",
            color: {
              id: 301,
              code_color: "#000000",
              name_color: "Đen",
              image: "/images/products/chaybo/ConverseRunStarMotion.webp",
            },
            size: {
              id: 401,
              number_size: "41",
            },
          },
        
        quantity: 1,
        price: 2000000,
        created_at: "2025-06-22T10:00:00.000Z",
        updated_at: "2025-06-22T10:00:00.000Z",
      },
        {
        cart_items_id: 3,
        cart_id: 2,
        variant: 
          {
            variant_id:2,
            name: "Converse Run Star Motion",
            color: {
              id: 301,
              code_color: "#000000",
              name_color: "Đen",
              image: "/images/products/chaybo/ConverseRunStarMotion.webp",
            },
            size: {
              id: 401,
              number_size: "31",
            },
          },
        
        quantity: 3,
        price: 1200000,
        created_at: "2025-06-22T11:00:00.000Z",
        updated_at: "2025-06-22T11:00:00.000Z",
      },
    ],
  },
   {
    carts_id: 2,
    user_id: 4,
    created_at: "2025-06-22T11:00:00.000Z",
    updated_at: "2025-06-22T11:00:00.000Z",
    items: [
      {
        cart_items_id: 3,
        cart_id: 2,
        variant: 
          {
            variant_id:2,
            name: "Converse Run Star Motion",
            color: {
              id: 301,
              code_color: "#000000",
              name_color: "Đen",
              image: "/images/products/chaybo/ConverseRunStarMotion.webp",
            },
            size: {
              id: 401,
              number_size: "31",
            },
          },
        
        quantity: 3,
        price: 1200000,
        created_at: "2025-06-22T11:00:00.000Z",
        updated_at: "2025-06-22T11:00:00.000Z",
      },
    ],
  },
 
];
export const getMockCart = (): ICart[] => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("mockCarts");
    return stored ? JSON.parse(stored) : defaultCart;
  }
  return defaultCart;
};

export const saveMockCart = (carts: ICart[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("mockCarts", JSON.stringify(carts));
  }
};
