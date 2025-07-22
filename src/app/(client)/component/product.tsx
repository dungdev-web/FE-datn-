"use client";

import { IProduct } from "@/types/product";
import ProductIcons from "./products/ProductIcons";

export default function Product4box(props: any) {
  const sp = props.sp as IProduct;
  if (!sp) return null;

  const productId = sp.products_id ?? sp.products_id;

  const averageRating =
    sp?.product_reviews?.length > 0
      ? Math.round(
          sp.product_reviews.reduce((sum, r) => sum + Number(r.rating), 0) /
            sp.product_reviews.length
        )
      : 0;

  const discountPercent =
    sp.price && sp.sale_price
      ? Math.round(((sp.price - sp.sale_price) / sp.price) * 100)
      : 0;

  return (
    <>
      <div className="hot-product-card" style={{ width: "230px" }}>
        <div className="hot-product-image">
          <img
            src={
              Array.isArray(sp.images) && sp.images.length > 0
                ? `/images/products/chaybo/${sp.images[0].url}`
                : "/images/placeholder.png"
            }
            alt={
              Array.isArray(sp.images) && sp.images.length > 0
                ? sp.images[0].alt_text
                : sp.name
            }
          />

          <div className="hot-product-icons">
            <ProductIcons
              productId={productId}
              variant_id={sp.product_variants?.[0]?.product_variants_id}
              price={sp.sale_price}
            />
          </div>

          {discountPercent > 0 && (
            <span className="tag-discount">-{discountPercent}%</span>
          )}
        </div>

        <div className="hot-product-content">
          <div className="hot-product-colors">
            {[
              ...new Map(
                (sp.product_variants ?? []).map((v) => [v.color.id, v.color])
              ).values(),
            ].map((color) => (
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
              <del>{Number(sp.sale_price).toLocaleString("vi")}đ</del>
            </span>
            <span className="price-new">
              {Number(sp.price).toLocaleString("vi")}đ
            </span>
          </div>

          <div className="hot-product-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "87%" }}>
                <span className="sold-info">
                  Đã bán{" "}
                  {(sp.product_variants ?? []).reduce(
                    (sum, v) => sum + (v.stock_quantity || 0),
                    0
                  )}{" "}
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
