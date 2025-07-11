"use client";

import { useEffect, useState } from "react";
import { IProduct } from "@/types/product";
import { getRelatedProducts } from "@/services/productService"; // Đã tạo trước đó
import Product4box from "./product";
interface Props {
  categoryId: number;
}

export default function RelatedProductList({ categoryId }: Props) {
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const data = await getRelatedProducts(categoryId);
        setRelatedProducts(data);
              console.log("👉 Dữ liệu trả về từ API (related products):", data);

      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm cùng loại:", error);
      }
    };

    fetchRelated();
  }, [categoryId]);

  return (
    <div className="product-grid slider-wrapper">
    {Array.isArray(relatedProducts) && relatedProducts.length > 0 ? (
      relatedProducts.map((product) => (
        <Product4box key={product.products_id} sp={product} />
      ))
    ) : (
      <p>Không có sản phẩm liên quan.</p>
    )}
  </div>
  );
}
