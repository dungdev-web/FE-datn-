"use client";
import "../css/product.css";
import "../css/home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { IProduct } from "@/types/product";
import { getDealProducts } from "@/services/productService";
import ProductCardSlider from "./ProductCardSlider"; // component con hiển thị 1 sản phẩm

export default function Show1sanpham() {
  const [dealProducts, setDealProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const data = await getDealProducts();
        setDealProducts(data);
      } catch (error) {
        console.error("Không thể tải sản phẩm đang deal:", error);
      }
    };
    fetchDeals();
  }, []);

  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={10}
      slidesPerView={4}
      loop={true}
      navigation
      breakpoints={{
        0: { slidesPerView: 2 },
        576: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        992: { slidesPerView: 4 },
      }}
      className="product-slider-track"
    >
      {dealProducts.map((product) => (
        <SwiperSlide key={product.products_id}>
          <ProductCardSlider product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
