"use client";

import { useAddToWishlist } from "@/hooks/useAddToWishlist";
import { useAddToCart } from "@/hooks/useAddToCart";
import { useAddToCompare } from "@/hooks/useAddToCompare";

interface HotProductIconsProps {
  productId: number;
  variant: {
    id: number;
    stock_quantity: number;
    name?: string;
  };
  price: number;
  onWishlistChange?: () => void;
}

export default function HotProductIcons({
  productId,
  variant,
  price,
  onWishlistChange,
}: HotProductIconsProps) {
  const { isWished, handleAddToWishlist } = useAddToWishlist(productId);
  const { handleAddToCart } = useAddToCart();
  const { isCompared, handleAddCompare, loading } = useAddToCompare(productId);

  return (
    <div className="hot-product-icons">
      <i
        className={`fa-solid fa-heart icon-favorite ${
          isWished ? "active" : ""
        }`}
        onClick={handleAddToWishlist}
      ></i>

      <div className="icon-hover-group">
        <i className="fa-solid fa-eye icon-eye"></i>
        <i
          className="fa fa-shopping-bag position-relative"
          onClick={() =>
            handleAddToCart({
              variant,
              quantity: 1,
            })
          }
        ></i>
        <button
          className={`compare-btn ${isCompared ? "active" : ""}`}
          onClick={handleAddCompare}
          title={isCompared ? "Đã thêm vào so sánh" : "Thêm vào so sánh"}
          disabled={loading}
        >
          <i className="fa fa-exchange" aria-hidden="true"></i>
        </button>{" "}
      </div>
    </div>
  );
}
