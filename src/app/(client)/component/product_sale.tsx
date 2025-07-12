"use client";
import "../css/product.css";
import "../css/home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { IProduct } from "@/types/product";
import "swiper/css";
import "swiper/css/navigation";
import { getDealProducts } from "@/services/productService";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProductSale() {
  const [dealProducts, setDealProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const data = await getDealProducts();
        if (Array.isArray(data)) {
          setDealProducts(data);
        } else {
          console.error("❌ Dữ liệu không hợp lệ:", data);
        }
      } catch (error) {
        console.error("Không thể tải sản phẩm đang deal:", error);
      }
    };
    fetchDeals();
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={2}
        loop={true}
        navigation
        breakpoints={{
          0: { slidesPerView: 2 },
          576: { slidesPerView: 2 },
          768: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
        }}
        className="product-slider-track"
      >
        {dealProducts.map((product) => {
          const variants = product.product_variants || [];
          const reviews = product.reviews || [];
          const images = product.images || [];

          const averageRating = reviews.length
            ? Math.round(
                reviews.reduce((sum, r) => sum + Number(r.rating), 0) / reviews.length
              )
            : 0;

          const sold = variants.reduce((sum, v) => sum + v.stock_quantity, 0);

          const discount =
            product.price > 0
              ? Math.round(((product.price - product.sale_price) / product.price) * 100)
              : 0;

          const uniqueColors = [
            ...new Map(
              variants
                .filter((v) => v.color?.id)
                .map((v) => [v.color.id, v.color])
            ).values(),
          ];

          return (
            <SwiperSlide key={product.products_id}>
              <div className="product-itemlist-main !block">
                <div className="product-card11">
                  <div className="product-image">
                    <Link href={`/product/${product.slug}`}>
                      <img
                        src={images?.[0]?.url || "/images/placeholder.png"}
                        alt={product.name}
                        className="!h-[100%]"
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
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
