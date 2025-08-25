// mocks/mockUsers.ts

import { API_BASE_URL } from "@/config/env";
import { IProduct } from "@/types/product";
const defaultProducts: IProduct[] = [
  

];

function normalizeProduct(p: any): IProduct {
  return {
    ...p,
    id: p.id ?? p.productId ?? Math.random(),
    name: p.name,
    price: p.price,
    sale_price: p.sale_price,
    description: p.description,
    product_variants: p.variants || [],
    product_reviews: p.reviews || [],
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
