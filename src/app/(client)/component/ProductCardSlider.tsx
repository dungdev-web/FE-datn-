import { IProduct } from "@/types/product";
import Link from "next/link";
import { addToWishlist } from "@/services/wishlistService";
import { useAuthUser } from "@/hooks/useAuthUser";
import { checkToken } from "@/services/authService";
import { useState, useEffect } from "react";

export default function ProductCardSlider({ product }: { product: IProduct }) {
  const reviews = product.reviews || [];
  const variants = product.variants || [];
  const images = product.images || [];
  const [isWished, setIsWished] = useState(false);

  const discount =
    product.sale_price && product.price
      ? Math.round(((product.price - product.sale_price) / product.price) * 100)
      : 0;
  const averageRating = reviews.length
    ? Math.round(
        reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) /
          reviews.length
      )
    : 0;

  const sold = variants.reduce((sum, v) => sum + (v.stock_quantity || 0), 0);

  const uniqueColors = [
    ...new Map(
      variants.filter((v) => v.color?.id).map((v) => [v.color.id, v.color])
    ).values(),
  ];

  return (
    <div className="product-itemlist-main">
      <div className="product-card">
        <div className="product-image">
          <Link href={`/product/${product.slug}`}>
            <img
              src={images[0]?.url || "/images/placeholder.png"}
              alt={product.name}
            />
          </Link>

          <div className="product-icons">
            <i
              className={`fa-solid fa-heart icon-favorite ${
                isWished ? "active" : ""
              }`}
              onClick={async () => {
                try {
                  const tokenData = await checkToken();
                  if (!tokenData?.user?.id) {
                    alert("Vui lòng đăng nhập để thêm vào yêu thích");
                    return;
                  }

                  const userId = tokenData.user.id;
                  const result = await addToWishlist({
                    user_id: userId,
                    product_id: product.id,
                  });

                  // ✅ Cập nhật trạng thái đã yêu thích
                  setIsWished(true);
                  alert(result.message);
                } catch (error) {
                  console.error("Lỗi thêm vào wishlist:", error);
                  alert("Thêm vào yêu thích thất bại!");
                }
              }}
            ></i>

            <div className="hover-icons">
              <i className="fa-solid fa-eye"></i>
              <i className="fa-solid fa-list"></i>
              <i className="fa fa-exchange"></i>
            </div>
          </div>

          {discount > 0 && <span className="discount-tag">-{discount}%</span>}

          <div className="product-colors">
            {uniqueColors.map((color) => (
              <span
                key={color.id}
                className="color"
                data-color={color.name_color}
                style={{ backgroundColor: color.code_color }}
              ></span>
            ))}
          </div>

          <h4 className="product-title">{product.name}</h4>

          <div className="product-price">
            {product.sale_price > 0 && (
              <span className="old-price">
                <del>{Number(product.price).toLocaleString("vi")}đ</del>
              </span>
            )}
            <span className="new-price">
              {Number(
                product.sale_price > 0 ? product.sale_price : product.price
              ).toLocaleString("vi")}
              đ
            </span>
          </div>

          <div className="product-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "87%" }}>
                <span className="sold">Đã bán {sold} sản phẩm</span>
              </div>
            </div>
          </div>

          <div className="product-rating">
            {Array.from({ length: 5 }, (_, i) =>
              i < averageRating ? (
                <i key={i} className="fa-solid fa-star"></i>
              ) : (
                <i key={i} className="fa-regular fa-star"></i>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
