import { useAddToWishlist } from "@/hooks/useAddToWishlist";
import { useAddToCart } from "@/hooks/useAddToCart";
import { useAddToCompare } from "@/hooks/useAddToCompare";

interface ProductIconsProps {
  productId: number;
  variant: {
    id: number;
    stock_quantity: number;
    name?: string;
  };
  price: number;
  onWishlistChange?: () => void;
}

export default function ProductIcons({
  productId,
  variant,
  price,
  onWishlistChange,
}: ProductIconsProps) {
  const { handleAddToWishlist, isWished } = useAddToWishlist(
    productId,
    onWishlistChange
  );
  const { handleAddToCart } = useAddToCart();
  const { isCompared, handleAddCompare, loading } = useAddToCompare(productId);

  return (
    <div className="product-icons">
      <i
        className={`fa-solid fa-heart icon-favorite ${
          isWished ? "active" : ""
        }`}
        onClick={handleAddToWishlist}
      ></i>

      <div className="hover-icons">
        <i className="fa-solid fa-eye"></i>
        <i
          className="fa fa-shopping-bag position-relative"
          onClick={() =>
            handleAddToCart({
              variant,
              quantity: 1,
            })
          }
        />

        <button
          className={`compare-btn ${isCompared ? "active" : ""}`}
          onClick={handleAddCompare}
          title={isCompared ? "Đã thêm vào so sánh" : "Thêm vào so sánh"}
          disabled={loading}
        >
          <i className="fa fa-exchange" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}
