import { useAddToWishlist } from "@/hooks/useAddToWishlist";
import { useAddToCart } from "@/hooks/useAddToCart";
import { useAddToCompare } from "@/hooks/useAddToCompare";
import CompareButton from "../product_compare/button_compare";
interface ProductIconsProps {
  productId: number;
}

export default function ProductIcons({ productId }: ProductIconsProps) {
  const { isWished, handleAddToWishlist } = useAddToWishlist(productId);
  const { handleAddToCart } = useAddToCart();
  const { handleAddCompare } = useAddToCompare();

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
          onClick={handleAddToCart}
        ></i>
        <i
          className="fa fa-exchange"
          onClick={() => handleAddCompare({ productId })}
        />
      </div>
    </div>
  );
}
