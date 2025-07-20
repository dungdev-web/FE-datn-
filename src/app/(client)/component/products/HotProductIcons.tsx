"use client";

import { useAddToWishlist } from "@/hooks/useAddToWishlist";
import { useAddToCart } from "@/hooks/useAddToCart";

interface HotProductIconsProps {
  productId: number;
}

export default function HotProductIcons({ productId }: HotProductIconsProps) {
  const { isWished, handleAddToWishlist } = useAddToWishlist(productId);
  const { handleAddToCart } = useAddToCart();

  return (
    <div className="hot-product-icons">
      <i
        className={`fa-solid fa-heart icon-favorite ${isWished ? "active" : ""}`}
        onClick={handleAddToWishlist}
      ></i>

      <div className="icon-hover-group">
        <i className="fa-solid fa-eye"></i>
        <i
          className="fa fa-shopping-bag position-relative"
          onClick={handleAddToCart}
        ></i>
        <i className="fa fa-exchange"></i>
      </div>
    </div>
  );
}
