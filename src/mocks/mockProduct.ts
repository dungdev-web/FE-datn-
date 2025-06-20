// mocks/mockUsers.ts

import { IProduct } from "@/types/product";
const defaultProducts: IProduct[] = [
  {
    products_id: 1,
    name: "Converse Run Star Motion",
    slug: "converse-run-star-motion",
    description:
      "Đôi giày chạy bộ phong cách đường phố với đế chunky đậm chất Converse.",
    short_desc: "Sneaker chạy bộ đế dày, phối màu trắng‑đen.",
    price: 1500000,
    sale_price: 1200000,
    status: "active",

    category: {
      categories_id: 10,
      name: "Giày chạy bộ",
      slug: "giay-chay-bo",
    },

    brand: {
      brand_id: 5,
      name: "Converse",
      slug: "converse",
      logo_url: "/images/brands/converse.png",
    },

    gender: {
      id: 1,
      name: "Unisex",
    },

    images: [
      {
        images_id: 101,
        url: "/images/products/chaybo/ConverseRunStarMotion.webp",
        alt_text: "Converse Run Star Motion góc nghiêng",
        type: "thumbnail",
      },
      {
        images_id: 102,
        url: "/images/products/chaybo/ConverseRunStarMotion_side.webp",
        alt_text: "Converse Run Star Motion bên hông",
        type: "gallery",
      },
    ],

    reviews: [
      {
        product_reviews_id: 1001,
        rating: "5",
        content: "Giày đẹp, đi êm chân lắm!",
      },
      {
        product_reviews_id: 1002,
        rating: "4",
        content: "Form hơi to, nên giảm nửa size.",
      },
    ],

    variants: [
      {
        product_variants_id: 201,
        sku: "CV-RSM-BLK-40",
        image: "/images/products/chaybo/ConverseRunStarMotion.webp",
        stock_quantity: 20,
        sale_price: 1200000,
        color: {
          id: 301,
          code_color: "#000000",
          name_color: "Đen",
        },
        size: {
          id: 401,
          number_size: "40",
        },
      },
      {
        product_variants_id: 202,
        sku: "CV-RSM-WHT-41",
        image: "/images/products/chaybo/ConverseRunStarMotion_white.webp",
        stock_quantity: 15,
        sale_price: 1200000,
        color: {
          id: 302,
          code_color: "#FFFFFF",
          name_color: "Trắng",
        },
        size: {
          id: 402,
          number_size: "41",
        },
      },
    ],
  },
  {
    products_id: 2,
    name: "Nike Air Zoom Pegasus 39",
    slug: "nike-pegasus-39",
    description: "Giày chạy bộ chuyên dụng, nhẹ và êm.",
    short_desc: "Phù hợp cả chạy đường dài và tập gym.",
    price: 2200000,
    sale_price: 1800000,
    status: "active",
    category: { categories_id: 10, name: "Giày thể thao", slug: "giay-chay-bo" },
    brand: {
      brand_id: 2,
      name: "Nike",
      slug: "nike",
      logo_url: "/images/brands/nike.png",
    },
    gender: { id: 1, name: "Unisex" },
    images: [
      {
        images_id: 201,
        url: "/images/products/chaybo/ConverseRunStarMotion.webp",
        alt_text: "Giày Nike Pegasus 39",
        type: "thumbnail",
      },
    ],
    reviews: [
      { product_reviews_id: 2001, rating: "5", content: "Chạy rất đã." },
      {
        product_reviews_id: 2002,
        rating: "5",
        content: "Giày nhẹ, thoải mái.",
      },
      { product_reviews_id: 2003, rating: "4", content: "Đế hơi cứng." },
    ],
    variants: [
      {
        product_variants_id: 203,
        sku: "NK-PEG-GRN-42",
        image: "/images/products/chaybo/NikePegasus39.webp",
        stock_quantity: 10,
        sale_price: 1800000,
        color: { id: 303, code_color: "#00FF00", name_color: "Xanh lá" },
        size: { id: 403, number_size: "42" },
      },
    ],
  },

  {
    products_id: 3,
    name: "Adidas Ultraboost 22",
    slug: "adidas-ultraboost-22",
    description:
      "Giày sneaker cao cấp, hiệu suất tốt cho mọi hoạt động thể thao.",
    short_desc: "Công nghệ Boost tối ưu hoá chuyển động.",
    price: 3000000,
    sale_price: 2550000,
    status: "active",
    category: { categories_id: 10, name: "Giày chạy bộ", slug: "giay-chay-bo" },
    brand: {
      brand_id: 3,
      name: "Adidas",
      slug: "adidas",
      logo_url: "/images/brands/adidas.png",
    },
    gender: { id: 1, name: "Unisex" },
    images: [
      {
        images_id: 301,
        url: "/images/products/chaybo/ConverseRunStarMotion.webp",
        alt_text: "Adidas Ultraboost",
        type: "thumbnail",
      },
    ],
    reviews: [
      {
        product_reviews_id: 3001,
        rating: "5",
        content: "Cực kỳ êm và thoải mái.",
      },
      {
        product_reviews_id: 3002,
        rating: "4",
        content: "Đắt nhưng đáng tiền.",
      },
    ],
    variants: [
      {
        product_variants_id: 204,
        sku: "AD-UB22-BLU-43",
        image: "/images/products/chaybo/Ultraboost22.webp",
        stock_quantity: 5,
        sale_price: 2550000,
        color: { id: 304, code_color: "#0000FF", name_color: "Xanh dương" },
        size: { id: 404, number_size: "43" },
      },
    ],
  },

  {
    products_id: 4,
    name: "Puma Velocity Nitro 2",
    slug: "puma-velocity-nitro-2",
    description:
      "Dòng giày nhẹ nhàng nhưng chắc chắn của Puma, dành cho vận động viên và người tập thể thao thường xuyên.",
    short_desc: "Công nghệ Nitro tạo độ bật và giảm lực tối ưu.",
    price: 1900000,
    sale_price: 1600000,
    status: "active",
    category: { categories_id: 10, name: "Giày chạy bộ", slug: "giay-chay-bo" },
    brand: {
      brand_id: 4,
      name: "Puma",
      slug: "puma",
      logo_url: "/images/brands/puma.png",
    },
    gender: { id: 1, name: "Unisex" },
    images: [
      {
        images_id: 401,
        url: "/images/products/chaybo/ConverseRunStarMotion.webp",
        alt_text: "Puma Nitro 2",
        type: "thumbnail",
      },
    ],
    reviews: [
      { product_reviews_id: 4001, rating: "4", content: "Nhẹ và thoải mái." },
      { product_reviews_id: 4002, rating: "3", content: "Đế hơi cứng." },
    ],
    variants: [
      {
        product_variants_id: 205,
        sku: "PM-NITRO2-RED-40",
        image: "/images/products/chaybo/PumaVelocityNitro2.webp",
        stock_quantity: 12,
        sale_price: 1600000,
        color: { id: 305, code_color: "#FF0000", name_color: "Đỏ" },
        size: { id: 405, number_size: "40" },
      },
    ],
  },
  {
    products_id: 5,
    name: "Puma Velocity Nitro 2",
    slug: "puma-velocity-nitro-2",
    description:
      "Dòng giày nhẹ nhàng nhưng chắc chắn của Puma, dành cho vận động viên và người tập thể thao thường xuyên.",
    short_desc: "Công nghệ Nitro tạo độ bật và giảm lực tối ưu.",
    price: 1900000,
    sale_price: 0,
    status: "active",
    category: { categories_id: 10, name: "Giày chạy bộ", slug: "giay-chay-bo" },
    brand: {
      brand_id: 4,
      name: "Puma",
      slug: "puma",
      logo_url: "/images/brands/puma.png",
    },
    gender: { id: 1, name: "Unisex" },
    images: [
      {
        images_id: 401,
        url: "/images/products/chaybo/ConverseRunStarMotion.webp",
        alt_text: "Puma Nitro 2",
        type: "thumbnail",
      },
    ],
    reviews: [
      { product_reviews_id: 4001, rating: "4", content: "Nhẹ và thoải mái." },
      { product_reviews_id: 4002, rating: "3", content: "Đế hơi cứng." },
    ],
    variants: [
      {
        product_variants_id: 205,
        sku: "PM-NITRO2-RED-40",
        image: "/images/products/chaybo/PumaVelocityNitro2.webp",
        stock_quantity: 12,
        sale_price: 1600000,
        color: { id: 305, code_color: "#FF0000", name_color: "Đỏ" },
        size: { id: 405, number_size: "40" },
      },
    ],
  },
];

function normalizeProduct(p: any): IProduct {
  return {
    ...p,
    id: p.id ?? p.productId ?? Math.random(),
    name: p.name,
    price: p.price,
    sale_price: p.sale_price,
    description: p.description,
    variants: p.variants || [],
    reviews: p.reviews || [],
  };
}

export const getMockProducts = (): IProduct[] => {
  if (typeof window === "undefined") return defaultProducts;

  const stored = localStorage.getItem("mockProducts");
  const products = stored ? JSON.parse(stored) : defaultProducts;
  return products.map(normalizeProduct);
};

export const saveMockProducts = (products: IProduct[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("mockProducts", JSON.stringify(products));
  }
};
