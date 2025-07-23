// mocks/mockCart.ts
import { ICartItem, ICart } from "@/types/cart";
const defaultCart: ICart[] = [
  {
    carts_id: 1,
    user_id: 4,
    created_at: "2025-06-22T10:00:00.000Z",
    updated_at: "2025-06-22T10:00:00.000Z",
    cart_items: [
      {
        cart_items_id: 1,
        cart_id: 1,
        variant_id: 2,
        quantity: 5,
        price: 1500000,
        created_at: "2025-06-22T10:00:00.000Z",
        updated_at: "2025-06-22T10:00:00.000Z",
        variant: {
          product_variants_id: 2,
          product_id: 1,
          color_id: 301,
          size_id: 401,
          stock_quantity: 100,
          sku: "SKU-ABC123",
          product: {
            products_id: 1,
            name: "Converse Run Star Motion",
            slug: "converse-run-star-motion",
            description: "Mô tả dài",
            short_desc: "Mô tả ngắn",
            price: "2000000",
            sale_price: "1500000",
            categories_id: 1,
            brand_id: 1,
            gender_id: 1,
            status: 1,
            created_at: "2025-01-01T00:00:00.000Z",
            updated_at: "2025-01-01T00:00:00.000Z",
            images: [
              {
                images_id: 1,
                url: "/images/products/chaybo/ConverseRunStarMotion.webp",
                alt_text: "Ảnh sản phẩm",
                type: "main",
                product_id: 1,
              },
            ],
          },
          color: {
            id: 301,
            code_color: "#000000",
            name_color: "Đen",
            images: null,
          },
          size: {
            id: 401,
            number_size: "41",
          },
        },
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
