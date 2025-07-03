import { IProduct } from "@/types/product";
import Link from "next/link";
export default function ProductCardSlider({ product }: { product: IProduct }) {
  const averageRating = product.reviews?.length
    ? Math.round(
        product.reviews.reduce((sum, r) => sum + Number(r.rating), 0) /
          product.reviews.length
      )
    : 0;

  const sold = product.variants?.reduce((sum, v) => sum + v.stock_quantity, 0);
  const discount = Math.round(
    ((product.price - product.sale_price) / product.price) * 100
  );

  const uniqueColors = [
    ...new Map(product.variants.map((v) => [v.color.id, v.color])).values(),
  ];

  return (
    <div className="product-itemlist-main">
      <div className="product-card">
        <div className="product-image">
          <Link href={`/product/${product.slug}`}>
            <img
              src={product.images[0].url || "/images/placeholder.png"}
              alt={product.name}
            />
          </Link>
          <div className="product-icons">
            <i className="fa-solid fa-heart always-show"></i>
            <div className="hover-icons">
              <i className="fa-solid fa-eye"></i>
              <i className="fa-solid fa-list"></i>
              <i className="fa fa-exchange"></i>
            </div>
          </div>

          <span className="discount-tag">-{discount}%</span>

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
                <del>{product.price.toLocaleString("vi")}đ</del>
              </span>
            )}

            <span className="new-price">
              {(product.sale_price > 0
                ? product.sale_price
                : product.price
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
