"use client";
import { IProduct } from "@/types/product";
export default function Product4box(props: any) {
  let sp = props.sp as IProduct;
  if (!sp) return null;

  const averageRating =
    sp?.reviews?.length > 0
      ? Math.round(
          sp.reviews.reduce((sum, r) => sum + Number(r.rating), 0) /
            sp.reviews.length
        )
      : 0;
  const discountPercent = Math.round(
    ((sp.price - sp.sale_price) / sp.price) * 100
  );
  return (
    <>
      <div className="hot-product-card" style={{ width: "230px" }}>
        <div className="hot-product-image">
          <img
            src={sp.images?.[0]?.url || "/images/placeholder.png"}
            alt={sp.images?.[0]?.alt_text || sp.name}
          />

          <div className="hot-product-icons">
            <i className="fa-solid fa-heart icon-favorite"></i>
            <div className="icon-hover-group">
              <i className="fa-solid fa-eye"></i>
              <i className="fa-solid fa-list"></i>
              <i className="fa fa-exchange"></i>
            </div>
          </div>
          <span className="tag-discount">-{discountPercent}%</span>
        </div>
        <div className="hot-product-content">
          <div className="hot-product-colors">
            {[
              ...new Map(
                sp.variants.map((v) => [v.color.id, v.color])
              ).values(),
            ].map((color, index) => (
              <span
                key={color.id}
                className="color-item"
                data-color={color.name_color}
                style={{ backgroundColor: color.code_color }}
                title={color.name_color}
              ></span>
            ))}
          </div>

          <h4 className="hot-product-title">{sp.name}</h4>
          <div className="hot-product-price">
            <span className="price-old">
              <del>{sp.sale_price}đ</del>
            </span>
            <span className="price-new">{sp.price.toLocaleString("vi")}đ</span>
          </div>
          <div className="hot-product-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "87%" }}>
                <span className="sold-info">
                  Đã bán{" "}
                  {sp.variants.reduce((sum, v) => sum + v.stock_quantity, 0)}{" "}
                  sản phẩm
                </span>
              </div>
            </div>
          </div>
          <div className="hot-product-rating">
            {Array.from({ length: 5 }, (_, index) =>
              index < averageRating ? (
                <i key={index} className="fa-solid fa-star"></i>
              ) : (
                <i key={index} className="fa-regular fa-star"></i>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
