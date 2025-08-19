"use client";

import { IProduct } from "@/types/product";
import Link from "next/link";

import { API_BASE_URL } from "@/config/env";
import ProductIcons from "./Products/ProductIcons";

export default function ProductCardSlider({ product }: { product: IProduct }) {
  const reviews = product.product_reviews || [];
  const variants = product.product_variants || [];
  const images = product.images || [];

  const productId = product.products_id ?? product.products_id;

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
              src={
                `${API_BASE_URL}/uploads/${images[0]?.url}` ||
                "/images/placeholder.png"
              }
              alt={product.name}
            />
          </Link>

          <ProductIcons
            productId={product.products_id}
            variant={{
              id: product.product_variants?.[0]?.product_variants_id, // 👈 lấy product_variants_id từ DB
              stock_quantity: product.product_variants?.[0]?.stock_quantity ?? 0,
              name: product.product_variants?.[0]?.name,
            }} price={0}          />

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
