import { useAddToWishlist } from "@/hooks/useAddToWishlist";
import { useAddToCart } from "@/hooks/useAddToCart";

interface ProductIconsProps {
  productId: number;
}

export default function ProductIcons({ productId }: ProductIconsProps) {
  const { isWished, handleAddToWishlist } = useAddToWishlist(productId);
  const { handleAddToCart } = useAddToCart();

  return (
    <div className="product-icons">
      <i
        className={`fa-solid fa-heart icon-favorite ${isWished ? "active" : ""}`}
        onClick={handleAddToWishlist}
      ></i>

      <div className="hover-icons">
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
