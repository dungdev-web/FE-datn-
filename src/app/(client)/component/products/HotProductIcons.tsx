"use client";

import { useAddToWishlist } from "@/hooks/useAddToWishlist";
import { useAddToCart } from "@/hooks/useAddToCart";
import { useAddToCompare } from "@/hooks/useAddToCompare";

interface HotProductIconsProps {
  productId: number;
}

export default function HotProductIcons({ productId }: HotProductIconsProps) {
  const { isWished, handleAddToWishlist } = useAddToWishlist(productId);
  const { handleAddToCart } = useAddToCart();
  const { isCompared, handleAddToCompare, loading } = useAddToCompare(productId);

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
        <button
          className={`compare-btn ${isCompared ? "active" : ""}`}
          onClick={handleAddToCompare}
          title={isCompared ? "Đã thêm vào so sánh" : "Thêm vào so sánh"}
          disabled={loading}
        >
          <i className="fa fa-exchange" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}
