"use client";
import "../css/product.css";
import "../css/home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IProduct } from "@/types/product";
export default function Show2sanpham({ products }: { products: IProduct[] }) {
  if (!products?.length) return null;

  return (
    <div className="w-[47%] float-left box-container">
      <div className="content">
        <h3>{products[0]?.category?.name}</h3>
        <p>
          Xem tất cả <i className="fa-solid fa-angles-right"></i>
        </p>
      </div>
      <div className="flex w-full">
        <div className="images">
          <img
            src="https://file.hstatic.net/200000581855/file/1_5d0aee5d42d245f395b3bfbc9d46e9f3.png"
            alt=""
          />
        </div>
        <div className="slider-wrapper w-full">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={3}
            slidesPerView={2}
            loop
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            className="product-two-box"
          >
            {products.map((sp) => {
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
              const sold = sp.variants?.reduce(
                (sum, v) => sum + v.stock_quantity,
                0
              );

              const uniqueColors = [
                ...new Map(sp.variants.map((v) => [v.color.id, v.color])).values(),
              ];

              return (
                <SwiperSlide key={sp.products_id}>
                  <div className="product-itemlist-main">
                    <div className="product-card">
                      <div className="product-image">
                        <Link href={`product/${sp.slug}`}>
                        <img
                          src={sp.images?.[0]?.url || "/images/placeholder.png"}
                          alt={sp.name}
                          className="!h-[150px] !w-[100%]"
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
                        <span className="discount-tag">-{discountPercent}%</span>
                        <span className="new-tag">
                          <img src="/images/logo/title_image_1_tag.webp" alt="" />
                          Mới
                        </span>
                        <div className="product-colors">
                          {uniqueColors.map((color) => (
                            <span
                              key={color.id}
                              className="color-item"
                              data-color={color.name_color}
                              style={{ backgroundColor: color.code_color }}
                              title={color.name_color}
                            ></span>
                          ))}
                        </div>
                        <h4 className="product-title">{sp.name}</h4>
                        <div className="product-price">
                          <span className="old-price">
                            <del>{sp.sale_price.toLocaleString("vi")}đ</del>
                          </span>
                          <span className="new-price">
                            {sp.price.toLocaleString("vi")}đ
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
      </div>
    </div>
  );
}

