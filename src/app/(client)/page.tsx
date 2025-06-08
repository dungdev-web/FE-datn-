// pages/index.tsx hoặc Home.tsx
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Show1sanpham from "./component/product_home";
import BlogHome from "./component/blog_home";
import CouponApp from "./component/coupon";
import FlashSale from "./component/flash_sale";
import Show2sanpham from "./component/product-two-box";
export default function Home() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  const videoURL = "https://www.youtube.com/embed/b7WP23NK12Q?autoplay=1";
  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleClose = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.src = ""; // Dừng video
    }
  };
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpenIndex(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const togglePopup = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenIndex((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    if (!marqueeRef.current) return;

    const marquee = marqueeRef.current;

    const content = marquee.querySelector(
      ".marquee-content"
    ) as HTMLElement | null;
    if (!content) return;

    const clone = content.cloneNode(true);
    marquee.appendChild(clone);

    let x = 0;
    const speed = 1;
    const contentWidth = content.offsetWidth;

    function step() {
      x -= speed;
      if (Math.abs(x) >= contentWidth) {
        x = 0;
      }
      marquee.style.transform = `translateX(${x}px)`;
      requestAnimationFrame(step);
    }

    step();

    return () => {
      marquee.style.transform = "";
    };
  }, []);

  return (
    <div>
      <div className="banner relative">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
          loop={true}
          spaceBetween={0}
          slidesPerView={1}
        >
          <SwiperSlide>
            <div className="relative w-full h-[650px]">
              <Image
                src="/images/banner/slider_1.png"
                alt="Banner 1"
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-[650px]">
              <Image
                src="/images/banner/slider_2.jpg"
                alt="Banner 2"
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <main>
        <div className="category-main">
          <h4>Toàn bộ sản phẩm đều là hàng chính hãng</h4>
          <h1>DANH MỤC SẢN PHẨM</h1>
          <div className="category-main1">
            <div className="category-main1-item">
              <img src="/images/category/chaybo.webp" alt="" />
              <h4>CHẠY BỘ</h4>
            </div>
            <div className="category-main1-item">
              <img src="/images/category/leonui.webp" alt="" />
              <h4>LEO NÚI</h4>
            </div>
            <div className="category-main1-item">
              <img src="/images/category/quanvot.webp" alt="" />
              <h4>QUẦN VỢT</h4>
            </div>
            <div className="category-main1-item">
              <img src="/images/category/bongro.webp" alt="" />
              <h4>GIÀY BÓNG RỔ</h4>
            </div>
          </div>
        </div>
        <div className="marquee-wrapper">
          <div className="marquee" ref={marqueeRef}>
            <div className="marquee-content">
              <span>⚡ GIẢM 15% CHO ĐH ĐẦU TIÊN TỪ 699K 599K</span>
              <span>⚡ MIỄN PHÍ VẬN CHUYỂN TỪ ĐH</span>
              <span>⚡ GIẢM 20% CHO ĐH TỪ 1.500K</span>
              <span>⚡ MIỄN PHÍ VẬN CHUYỂN TỪ ĐH 599K</span>
              <span>⚡ GIẢM 15% CHO ĐH ĐẦU TIÊN TỪ 699K</span>
              <span>⚡ MIỄN PHÍ VẬN CHUYỂN TỪ ĐH 599K ⚡</span>
            </div>
          </div>
        </div>

        <CouponApp></CouponApp>
        <div className="product-dealbox-main">
          <h1>DEAL CỰC HẤP DẪN</h1>
          <div className="product-listdeal-main">
            <div className="product-textsale-main">
              <h3>Chương trình giảm giá</h3>
              <h1>NHANH TAY KẺO LỠ</h1>
            </div>
            <div className="slider-wrapper">
              <div className="product-slider-track">
                <Show1sanpham></Show1sanpham>
              </div>
            </div>
          </div>

          <div className="container max-w-7xl mx-auto !mt-6">
            <FlashSale></FlashSale>
          </div>
        </div>

        <div className="look-book-main">
          <div className="look-book-text">
            <h3>LOOKBOOK</h3>
            <h2>GIÀY CHẠY BỘ BÁN NHIỀU NHẤT</h2>
            <p>
              Bước vào thế giới của sự thoải mái và phong cách vô song với những
              đôi giày đặc biệt này, chúng chắc chắn sẽ để lại ấn tượng lâu dài
              ở bất cứ nơi đâu bạn đến.
            </p>
            <div className="buttons">
              <button className="btn-lookbook">GIÀY NAM</button>
              <button className="btn-lookbook">GIÀY NỮ</button>
            </div>
          </div>
          <div className="lookbook-images" ref={containerRef}>
            {/* Image 1 */}
            <div className="image-container">
              <img
                src="/images/blog/section_home_banner1.webp"
                alt="Hình ảnh giày nam"
              />

              <div
                className="product-hotspot"
                style={{ top: "71%", left: "71%", position: "absolute" }}
              >
                <button
                  className="hotspot-btn"
                  onClick={(e) => togglePopup("1-1", e)}
                >
                  +
                </button>
                {openIndex === "1-1" && (
                  <div className="product-popup">
                    <a href="/index.html">
                      <img
                        src="/images/products/chaybo/AirJordanDMP1Retro(xanhlam).webp"
                        alt="Jordan 14"
                      />
                    </a>
                    <div className="product-info">
                      <h4>Giày Nam Air Jordan 14 Retro</h4>
                      <p>2.200.000₫</p>
                    </div>
                    <span
                      className="close-popup"
                      onClick={() => setOpenIndex(null)}
                    >
                      &times;
                    </span>
                  </div>
                )}
              </div>

              <div
                className="product-hotspot"
                style={{ top: "86%", left: "30%", position: "absolute" }}
              >
                <button
                  className="hotspot-btn"
                  onClick={(e) => togglePopup("1-2", e)}
                >
                  +
                </button>
                {openIndex === "1-2" && (
                  <div className="product-popup">
                    <a href="/index.html">
                      <img
                        src="/images/products/chaybo/GiàyNamAirJordan14Retro(do).webp"
                        alt="Air Max 97"
                      />
                    </a>
                    <div className="product-info">
                      <h4>Giày Nam Air Max 97</h4>
                      <p>3.500.000₫</p>
                    </div>
                    <span
                      className="close-popup"
                      onClick={() => setOpenIndex(null)}
                    >
                      &times;
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Image 2 */}
            <div className="image-container">
              <img
                src="/images/blog/section_home_banner2.webp"
                alt="Hình ảnh giày nữ"
              />

              <div
                className="product-hotspot"
                style={{ top: "90%", left: "85%", position: "absolute" }}
              >
                <button
                  className="hotspot-btn"
                  onClick={(e) => togglePopup("2-1", e)}
                >
                  +
                </button>
                {openIndex === "2-1" && (
                  <div className="product-popup">
                    <a href="/index.html">
                      <img
                        src="/images/products/chaybo/NeumelGRAYBROWNSnow(vang).webp"
                        alt="Ultra Boost"
                      />
                    </a>
                    <div className="product-info">
                      <h4>Giày Nữ Ultra Boost</h4>
                      <p>2.000.000₫</p>
                    </div>
                    <span
                      className="close-popup"
                      onClick={() => setOpenIndex(null)}
                    >
                      &times;
                    </span>
                  </div>
                )}
              </div>

              <div
                className="product-hotspot"
                style={{ top: "70%", left: "46%", position: "absolute" }}
              >
                <button
                  className="hotspot-btn"
                  onClick={(e) => togglePopup("2-2", e)}
                >
                  +
                </button>
                {openIndex === "2-2" && (
                  <div className="product-popup">
                    <a href="/index.html">
                      <img
                        src="/images/products/chaybo/GiàyNamJordanMaxAura.webp"
                        alt="Nike Pegasus Trail"
                      />
                    </a>
                    <div className="product-info">
                      <h4>Giày Nữ Nike Pegasus Trail 4</h4>
                      <p>2.800.000₫</p>
                    </div>
                    <span
                      className="close-popup"
                      onClick={() => setOpenIndex(null)}
                    >
                      &times;
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="shipping-main">
          <div className="shipping1">
            <img src="/images/logo/section_home_shipping1.webp" alt="" />
            <h3>Giao hàng miễn phí</h3>
            <p>Đăng ký để cập nhật và nhận giao hàng miễn phí</p>
          </div>
          <div className="shipping2">
            <img src="/images/logo/section_home_shipping2.webp" alt="" />
            <h3>Giao hàng trong 30 phút</h3>
            <p>Mọi thứ bạn đặt hàng sẽ nhanh chóng được giao đến tận nơi.</p>
          </div>
          <div className="shipping3">
            <img src="/images/logo/section_home_shipping3.webp" alt="" />
            <h3>Đảm bảo chất lượng tốt nhất</h3>
            <p>HaluShoes là một chuỗi cửa hàng gia đình quốc gia.</p>
          </div>
        </div>
        <div className="hot-products">
          <div className="hot-products-header">
            <h1 className="hot-products-title">SẢN PHẨM MỚI NHẤT</h1>
            <h4>
              <a href="">–– Xem tất cả</a>
            </h4>
          </div>

          <div className="hot-products-list">
            <div className="hot-product-card">
              <div className="hot-product-image">
                <img
                  src="/images/products/chaybo/ConverseRunStarMotion.webp"
                  alt=""
                />
                <div className="hot-product-icons">
                  <i className="fa-solid fa-heart icon-favorite"></i>
                  <div className="icon-hover-group">
                    <i className="fa-solid fa-eye"></i>
                    <i className="fa-solid fa-list"></i>
                    <i className="fa fa-exchange"></i>
                  </div>
                </div>
                <span className="tag-discount">-20%</span>
              </div>
              <div className="hot-product-content">
                <div className="hot-product-colors">
                  <span
                    className="color-item blue"
                    data-color="Xanh dương"
                  ></span>
                  <span
                    className="color-item green"
                    data-color="Xanh lá"
                  ></span>
                  <span className="color-item pink" data-color="Hồng"></span>
                </div>
                <h4 className="hot-product-title">
                  Giày Converse Run Star Motion
                </h4>
                <div className="hot-product-price">
                  <span className="price-old">
                    <del>1.500.000đ</del>
                  </span>
                  <span className="price-new">1.200.000đ</span>
                </div>
                <div className="hot-product-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "87%" }}>
                      <span className="sold-info">Đã bán 87 sản phẩm</span>
                    </div>
                  </div>
                </div>
                <div className="hot-product-rating">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                </div>
              </div>
            </div>
            <div className="hot-product-card">
              <div className="hot-product-image">
                <img
                  src="/images/products/chaybo/ConverseRunStarMotion.webp"
                  alt=""
                />
                <div className="hot-product-icons">
                  <i className="fa-solid fa-heart icon-favorite"></i>
                  <div className="icon-hover-group">
                    <i className="fa-solid fa-eye"></i>
                    <i className="fa-solid fa-list"></i>
                    <i className="fa fa-exchange"></i>
                  </div>
                </div>
                <span className="tag-discount">-20%</span>
              </div>
              <div className="hot-product-content">
                <div className="hot-product-colors">
                  <span
                    className="color-item blue"
                    data-color="Xanh dương"
                  ></span>
                  <span
                    className="color-item green"
                    data-color="Xanh lá"
                  ></span>
                  <span className="color-item pink" data-color="Hồng"></span>
                </div>
                <h4 className="hot-product-title">
                  Giày Converse Run Star Motion
                </h4>
                <div className="hot-product-price">
                  <span className="price-old">
                    <del>1.500.000đ</del>
                  </span>
                  <span className="price-new">1.200.000đ</span>
                </div>
                <div className="hot-product-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "87%" }}>
                      <span className="sold-info">Đã bán 87 sản phẩm</span>
                    </div>
                  </div>
                </div>
                <div className="hot-product-rating">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                </div>
              </div>
            </div>
            <div className="hot-product-card">
              <div className="hot-product-image">
                <img
                  src="/images/products/chaybo/ConverseRunStarMotion.webp"
                  alt=""
                />
                <div className="hot-product-icons">
                  <i className="fa-solid fa-heart icon-favorite"></i>
                  <div className="icon-hover-group">
                    <i className="fa-solid fa-eye"></i>
                    <i className="fa-solid fa-list"></i>
                    <i className="fa fa-exchange"></i>
                  </div>
                </div>
                <span className="tag-discount">-20%</span>
              </div>
              <div className="hot-product-content">
                <div className="hot-product-colors">
                  <span
                    className="color-item blue"
                    data-color="Xanh dương"
                  ></span>
                  <span
                    className="color-item green"
                    data-color="Xanh lá"
                  ></span>
                  <span className="color-item pink" data-color="Hồng"></span>
                </div>
                <h4 className="hot-product-title">
                  Giày Converse Run Star Motion
                </h4>
                <div className="hot-product-price">
                  <span className="price-old">
                    <del>1.500.000đ</del>
                  </span>
                  <span className="price-new">1.200.000đ</span>
                </div>
                <div className="hot-product-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "87%" }}>
                      <span className="sold-info">Đã bán 87 sản phẩm</span>
                    </div>
                  </div>
                </div>
                <div className="hot-product-rating">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                </div>
              </div>
            </div>
            <div className="hot-product-card">
              <div className="hot-product-image">
                <img
                  src="/images/products/chaybo/ConverseRunStarMotion.webp"
                  alt=""
                />
                <div className="hot-product-icons">
                  <i className="fa-solid fa-heart icon-favorite"></i>
                  <div className="icon-hover-group">
                    <i className="fa-solid fa-eye"></i>
                    <i className="fa-solid fa-list"></i>
                    <i className="fa fa-exchange"></i>
                  </div>
                </div>
                <span className="tag-discount">-20%</span>
              </div>
              <div className="hot-product-content">
                <div className="hot-product-colors">
                  <span
                    className="color-item blue"
                    data-color="Xanh dương"
                  ></span>
                  <span
                    className="color-item green"
                    data-color="Xanh lá"
                  ></span>
                  <span className="color-item pink" data-color="Hồng"></span>
                </div>
                <h4 className="hot-product-title">
                  Giày Converse Run Star Motion
                </h4>
                <div className="hot-product-price">
                  <span className="price-old">
                    <del>1.500.000đ</del>
                  </span>
                  <span className="price-new">1.200.000đ</span>
                </div>
                <div className="hot-product-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "87%" }}>
                      <span className="sold-info">Đã bán 87 sản phẩm</span>
                    </div>
                  </div>
                </div>
                <div className="hot-product-rating">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                </div>
              </div>
            </div>
            <div className="hot-product-card">
              <div className="hot-product-image">
                <img
                  src="/images/products/chaybo/ConverseRunStarMotion.webp"
                  alt=""
                />
                <div className="hot-product-icons">
                  <i className="fa-solid fa-heart icon-favorite"></i>
                  <div className="icon-hover-group">
                    <i className="fa-solid fa-eye"></i>
                    <i className="fa-solid fa-list"></i>
                    <i className="fa fa-exchange"></i>
                  </div>
                </div>
                <span className="tag-discount">-20%</span>
              </div>
              <div className="hot-product-content">
                <div className="hot-product-colors">
                  <span
                    className="color-item blue"
                    data-color="Xanh dương"
                  ></span>
                  <span
                    className="color-item green"
                    data-color="Xanh lá"
                  ></span>
                  <span className="color-item pink" data-color="Hồng"></span>
                </div>
                <h4 className="hot-product-title">
                  Giày Converse Run Star Motion
                </h4>
                <div className="hot-product-price">
                  <span className="price-old">
                    <del>1.500.000đ</del>
                  </span>
                  <span className="price-new">1.200.000đ</span>
                </div>
                <div className="hot-product-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "87%" }}>
                      <span className="sold-info">Đã bán 87 sản phẩm</span>
                    </div>
                  </div>
                </div>
                <div className="hot-product-rating">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hot-products">
          <div className="hot-products-header">
            <h1 className="hot-products-title">SẢN PHẨM NỔI BẬT</h1>
            <h4>
              <a href="">–– Xem tất cả</a>
            </h4>
          </div>

          <div className="hot-products-list">
            <div className="hot-product-card">
              <div className="hot-product-image">
                <img
                  src="/images/products/chaybo/ConverseRunStarMotion.webp"
                  alt=""
                />
                <div className="hot-product-icons">
                  <i className="fa-solid fa-heart icon-favorite"></i>
                  <div className="icon-hover-group">
                    <i className="fa-solid fa-eye"></i>
                    <i className="fa-solid fa-list"></i>
                    <i className="fa fa-exchange"></i>
                  </div>
                </div>
                <span className="tag-discount">-20%</span>
              </div>
              <div className="hot-product-content">
                <div className="hot-product-colors">
                  <span
                    className="color-item blue"
                    data-color="Xanh dương"
                  ></span>
                  <span
                    className="color-item green"
                    data-color="Xanh lá"
                  ></span>
                  <span className="color-item pink" data-color="Hồng"></span>
                </div>
                <h4 className="hot-product-title">
                  Giày Converse Run Star Motion
                </h4>
                <div className="hot-product-price">
                  <span className="price-old">
                    <del>1.500.000đ</del>
                  </span>
                  <span className="price-new">1.200.000đ</span>
                </div>
                <div className="hot-product-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "87%" }}>
                      <span className="sold-info">Đã bán 87 sản phẩm</span>
                    </div>
                  </div>
                </div>
                <div className="hot-product-rating">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                </div>
              </div>
            </div>
            <div className="hot-product-card">
              <div className="hot-product-image">
                <img
                  src="/images/products/chaybo/ConverseRunStarMotion.webp"
                  alt=""
                />
                <div className="hot-product-icons">
                  <i className="fa-solid fa-heart icon-favorite"></i>
                  <div className="icon-hover-group">
                    <i className="fa-solid fa-eye"></i>
                    <i className="fa-solid fa-list"></i>
                    <i className="fa fa-exchange"></i>
                  </div>
                </div>
                <span className="tag-discount">-20%</span>
              </div>
              <div className="hot-product-content">
                <div className="hot-product-colors">
                  <span
                    className="color-item blue"
                    data-color="Xanh dương"
                  ></span>
                  <span
                    className="color-item green"
                    data-color="Xanh lá"
                  ></span>
                  <span className="color-item pink" data-color="Hồng"></span>
                </div>
                <h4 className="hot-product-title">
                  Giày Converse Run Star Motion
                </h4>
                <div className="hot-product-price">
                  <span className="price-old">
                    <del>1.500.000đ</del>
                  </span>
                  <span className="price-new">1.200.000đ</span>
                </div>
                <div className="hot-product-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "87%" }}>
                      <span className="sold-info">Đã bán 87 sản phẩm</span>
                    </div>
                  </div>
                </div>
                <div className="hot-product-rating">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                </div>
              </div>
            </div>
            <div className="hot-product-card">
              <div className="hot-product-image">
                <img
                  src="/images/products/chaybo/ConverseRunStarMotion.webp"
                  alt=""
                />
                <div className="hot-product-icons">
                  <i className="fa-solid fa-heart icon-favorite"></i>
                  <div className="icon-hover-group">
                    <i className="fa-solid fa-eye"></i>
                    <i className="fa-solid fa-list"></i>
                    <i className="fa fa-exchange"></i>
                  </div>
                </div>
                <span className="tag-discount">-20%</span>
              </div>
              <div className="hot-product-content">
                <div className="hot-product-colors">
                  <span
                    className="color-item blue"
                    data-color="Xanh dương"
                  ></span>
                  <span
                    className="color-item green"
                    data-color="Xanh lá"
                  ></span>
                  <span className="color-item pink" data-color="Hồng"></span>
                </div>
                <h4 className="hot-product-title">
                  Giày Converse Run Star Motion
                </h4>
                <div className="hot-product-price">
                  <span className="price-old">
                    <del>1.500.000đ</del>
                  </span>
                  <span className="price-new">1.200.000đ</span>
                </div>
                <div className="hot-product-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "87%" }}>
                      <span className="sold-info">Đã bán 87 sản phẩm</span>
                    </div>
                  </div>
                </div>
                <div className="hot-product-rating">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                </div>
              </div>
            </div>
            <div className="hot-product-card">
              <div className="hot-product-image">
                <img
                  src="/images/products/chaybo/ConverseRunStarMotion.webp"
                  alt=""
                />
                <div className="hot-product-icons">
                  <i className="fa-solid fa-heart icon-favorite"></i>
                  <div className="icon-hover-group">
                    <i className="fa-solid fa-eye"></i>
                    <i className="fa-solid fa-list"></i>
                    <i className="fa fa-exchange"></i>
                  </div>
                </div>
                <span className="tag-discount">-20%</span>
              </div>
              <div className="hot-product-content">
                <div className="hot-product-colors">
                  <span
                    className="color-item blue"
                    data-color="Xanh dương"
                  ></span>
                  <span
                    className="color-item green"
                    data-color="Xanh lá"
                  ></span>
                  <span className="color-item pink" data-color="Hồng"></span>
                </div>
                <h4 className="hot-product-title">
                  Giày Converse Run Star Motion
                </h4>
                <div className="hot-product-price">
                  <span className="price-old">
                    <del>1.500.000đ</del>
                  </span>
                  <span className="price-new">1.200.000đ</span>
                </div>
                <div className="hot-product-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "87%" }}>
                      <span className="sold-info">Đã bán 87 sản phẩm</span>
                    </div>
                  </div>
                </div>
                <div className="hot-product-rating">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                </div>
              </div>
            </div>
            <div className="hot-product-card">
              <div className="hot-product-image">
                <img
                  src="/images/products/chaybo/ConverseRunStarMotion.webp"
                  alt=""
                />
                <div className="hot-product-icons">
                  <i className="fa-solid fa-heart icon-favorite"></i>
                  <div className="icon-hover-group">
                    <i className="fa-solid fa-eye"></i>
                    <i className="fa-solid fa-list"></i>
                    <i className="fa fa-exchange"></i>
                  </div>
                </div>
                <span className="tag-discount">-20%</span>
              </div>
              <div className="hot-product-content">
                <div className="hot-product-colors">
                  <span
                    className="color-item blue"
                    data-color="Xanh dương"
                  ></span>
                  <span
                    className="color-item green"
                    data-color="Xanh lá"
                  ></span>
                  <span className="color-item pink" data-color="Hồng"></span>
                </div>
                <h4 className="hot-product-title">
                  Giày Converse Run Star Motion
                </h4>
                <div className="hot-product-price">
                  <span className="price-old">
                    <del>1.500.000đ</del>
                  </span>
                  <span className="price-new">1.200.000đ</span>
                </div>
                <div className="hot-product-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "87%" }}>
                      <span className="sold-info">Đã bán 87 sản phẩm</span>
                    </div>
                  </div>
                </div>
                <div className="hot-product-rating">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="product-two-box-container flex gap-[75px] flex-wrap">
          <div className="w-[47%] float-left box-container">
            <div className="content">
              <h3>Hàng order</h3>
              <p>
                Xem tất cả <i className="fa-solid fa-angles-right"></i>
              </p>
            </div>
            <div className="flex  w-[100%]  ">
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
                  loop={true}
                  navigation
                  pagination={{ clickable: true, dynamicBullets: true }}
                  breakpoints={{
                    0: {
                      slidesPerView: 3,
                    },
                    576: {
                      slidesPerView: 3,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                    1024: {
                      slidesPerView: 2,
                    },
                  }}
                  className="product-two-box"
                >
                  <SwiperSlide>
                    <div className="product-itemlist-main">
                      <div className="product-card">
                        <div className="product-image">
                          <img
                            src="/images/products/chaybo/ConverseRunStarMotion.webp"
                            alt=""
                            className="!h-[150px]"
                          />
                          <div className="product-icons">
                            <i className="fa-solid fa-heart always-show"></i>
                            <div className="hover-icons">
                              <i className="fa-solid fa-eye"></i>
                              <i className="fa-solid fa-list"></i>
                              <i className="fa fa-exchange"></i>
                            </div>
                          </div>

                          <span className="discount-tag">-20%</span>
                          <span className="new-tag">
                            <img
                              src="/images/logo/title_image_1_tag.webp"
                              alt=""
                            />
                            Mới
                          </span>
                          <div className="product-colors">
                            <span
                              className="color blue"
                              data-color="Xanh dương"
                            ></span>
                            <span
                              className="color green"
                              data-color="Xanh lá"
                            ></span>
                            <span
                              className="color pink"
                              data-color="Hồng"
                            ></span>
                          </div>

                          <h4 className="product-title">
                            Giày Converse Run Star Motion
                          </h4>
                          <div className="product-price">
                            <span className="old-price">
                              <del>1.500.000đ</del>
                            </span>
                            <span className="new-price"> 1.200.000đ</span>
                          </div>
                          <div className="product-progress">
                            <div className="progress-bar">
                              <div
                                className="progress-fill"
                                style={{ width: "87%" }}
                              >
                                <span className="sold">Đã bán 87 sản phẩm</span>
                              </div>
                            </div>
                          </div>
                          <div className="product-rating">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="product-itemlist-main">
                      <div className="product-card">
                        <div className="product-image">
                          <img
                            src="/images/products/chaybo/ConverseRunStarMotion.webp"
                            alt=""
                            className="!h-[150px]"
                          />
                          <div className="product-icons">
                            <i className="fa-solid fa-heart always-show"></i>
                            <div className="hover-icons">
                              <i className="fa-solid fa-eye"></i>
                              <i className="fa-solid fa-list"></i>
                              <i className="fa fa-exchange"></i>
                            </div>
                          </div>

                          <span className="discount-tag">-20%</span>
                          <span className="new-tag">
                            <img
                              src="/images/logo/title_image_1_tag.webp"
                              alt=""
                            />
                            Mới
                          </span>
                          <div className="product-colors">
                            <span
                              className="color blue"
                              data-color="Xanh dương"
                            ></span>
                            <span
                              className="color green"
                              data-color="Xanh lá"
                            ></span>
                            <span
                              className="color pink"
                              data-color="Hồng"
                            ></span>
                          </div>

                          <h4 className="product-title">
                            Giày Converse Run Star Motion
                          </h4>
                          <div className="product-price">
                            <span className="old-price">
                              <del>1.500.000đ</del>
                            </span>
                            <span className="new-price"> 1.200.000đ</span>
                          </div>
                          <div className="product-progress">
                            <div className="progress-bar">
                              <div
                                className="progress-fill"
                                style={{ width: "87%" }}
                              >
                                <span className="sold">Đã bán 87 sản phẩm</span>
                              </div>
                            </div>
                          </div>
                          <div className="product-rating">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="product-itemlist-main">
                      <div className="product-card">
                        <div className="product-image">
                          <img
                            src="/images/products/chaybo/ConverseRunStarMotion.webp"
                            alt=""
                            className="!h-[150px]"
                          />
                          <div className="product-icons">
                            <i className="fa-solid fa-heart always-show"></i>
                            <div className="hover-icons">
                              <i className="fa-solid fa-eye"></i>
                              <i className="fa-solid fa-list"></i>
                              <i className="fa fa-exchange"></i>
                            </div>
                          </div>

                          <span className="discount-tag">-20%</span>
                          <span className="new-tag">
                            <img
                              src="/images/logo/title_image_1_tag.webp"
                              alt=""
                            />
                            Mới
                          </span>
                          <div className="product-colors">
                            <span
                              className="color blue"
                              data-color="Xanh dương"
                            ></span>
                            <span
                              className="color green"
                              data-color="Xanh lá"
                            ></span>
                            <span
                              className="color pink"
                              data-color="Hồng"
                            ></span>
                          </div>

                          <h4 className="product-title">
                            Giày Converse Run Star Motion
                          </h4>
                          <div className="product-price">
                            <span className="old-price">
                              <del>1.500.000đ</del>
                            </span>
                            <span className="new-price"> 1.200.000đ</span>
                          </div>
                          <div className="product-progress">
                            <div className="progress-bar">
                              <div
                                className="progress-fill"
                                style={{ width: "87%" }}
                              >
                                <span className="sold">Đã bán 87 sản phẩm</span>
                              </div>
                            </div>
                          </div>
                          <div className="product-rating">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="product-itemlist-main">
                      <div className="product-card">
                        <div className="product-image">
                          <img
                            src="/images/products/chaybo/ConverseRunStarMotion.webp"
                            alt=""
                            className="!h-[150px]"
                          />
                          <div className="product-icons">
                            <i className="fa-solid fa-heart always-show"></i>
                            <div className="hover-icons">
                              <i className="fa-solid fa-eye"></i>
                              <i className="fa-solid fa-list"></i>
                              <i className="fa fa-exchange"></i>
                            </div>
                          </div>

                          <span className="discount-tag">-20%</span>
                          <span className="new-tag">
                            <img
                              src="/images/logo/title_image_1_tag.webp"
                              alt=""
                            />
                            Mới
                          </span>
                          <div className="product-colors">
                            <span
                              className="color blue"
                              data-color="Xanh dương"
                            ></span>
                            <span
                              className="color green"
                              data-color="Xanh lá"
                            ></span>
                            <span
                              className="color pink"
                              data-color="Hồng"
                            ></span>
                          </div>

                          <h4 className="product-title">
                            Giày Converse Run Star Motion
                          </h4>
                          <div className="product-price">
                            <span className="old-price">
                              <del>1.500.000đ</del>
                            </span>
                            <span className="new-price"> 1.200.000đ</span>
                          </div>
                          <div className="product-progress">
                            <div className="progress-bar">
                              <div
                                className="progress-fill"
                                style={{ width: "87%" }}
                              >
                                <span className="sold">Đã bán 87 sản phẩm</span>
                              </div>
                            </div>
                          </div>
                          <div className="product-rating">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>{" "}
          <div className="w-[47%] float-left box-container">
            <div className="content">
              <h3>Hàng order</h3>
              <p>
                Xem tất cả <i className="fa-solid fa-angles-right"></i>
              </p>
            </div>
            <div className="flex  w-[100%]  ">
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
                  loop={true}
                  navigation
                  pagination={{ clickable: true, dynamicBullets: true }}
                  breakpoints={{
                    0: {
                      slidesPerView: 3,
                    },
                    576: {
                      slidesPerView: 3,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                    1024: {
                      slidesPerView: 2,
                    },
                  }}
                  className="product-two-box"
                >
                  <SwiperSlide>
                    <div className="product-itemlist-main">
                      <div className="product-card">
                        <div className="product-image">
                          <img
                            src="/images/products/chaybo/ConverseRunStarMotion.webp"
                            alt=""
                            className="!h-[150px]"
                          />
                          <div className="product-icons">
                            <i className="fa-solid fa-heart always-show"></i>
                            <div className="hover-icons">
                              <i className="fa-solid fa-eye"></i>
                              <i className="fa-solid fa-list"></i>
                              <i className="fa fa-exchange"></i>
                            </div>
                          </div>

                          <span className="discount-tag">-20%</span>
                          <span className="new-tag">
                            <img
                              src="/images/logo/title_image_1_tag.webp"
                              alt=""
                            />
                            Mới
                          </span>
                          <div className="product-colors">
                            <span
                              className="color blue"
                              data-color="Xanh dương"
                            ></span>
                            <span
                              className="color green"
                              data-color="Xanh lá"
                            ></span>
                            <span
                              className="color pink"
                              data-color="Hồng"
                            ></span>
                          </div>

                          <h4 className="product-title">
                            Giày Converse Run Star Motion
                          </h4>
                          <div className="product-price">
                            <span className="old-price">
                              <del>1.500.000đ</del>
                            </span>
                            <span className="new-price"> 1.200.000đ</span>
                          </div>
                          <div className="product-progress">
                            <div className="progress-bar">
                              <div
                                className="progress-fill"
                                style={{ width: "87%" }}
                              >
                                <span className="sold">Đã bán 87 sản phẩm</span>
                              </div>
                            </div>
                          </div>
                          <div className="product-rating">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="product-itemlist-main">
                      <div className="product-card">
                        <div className="product-image">
                          <img
                            src="/images/products/chaybo/ConverseRunStarMotion.webp"
                            alt=""
                            className="!h-[150px]"
                          />
                          <div className="product-icons">
                            <i className="fa-solid fa-heart always-show"></i>
                            <div className="hover-icons">
                              <i className="fa-solid fa-eye"></i>
                              <i className="fa-solid fa-list"></i>
                              <i className="fa fa-exchange"></i>
                            </div>
                          </div>

                          <span className="discount-tag">-20%</span>
                          <span className="new-tag">
                            <img
                              src="/images/logo/title_image_1_tag.webp"
                              alt=""
                            />
                            Mới
                          </span>
                          <div className="product-colors">
                            <span
                              className="color blue"
                              data-color="Xanh dương"
                            ></span>
                            <span
                              className="color green"
                              data-color="Xanh lá"
                            ></span>
                            <span
                              className="color pink"
                              data-color="Hồng"
                            ></span>
                          </div>

                          <h4 className="product-title">
                            Giày Converse Run Star Motion
                          </h4>
                          <div className="product-price">
                            <span className="old-price">
                              <del>1.500.000đ</del>
                            </span>
                            <span className="new-price"> 1.200.000đ</span>
                          </div>
                          <div className="product-progress">
                            <div className="progress-bar">
                              <div
                                className="progress-fill"
                                style={{ width: "87%" }}
                              >
                                <span className="sold">Đã bán 87 sản phẩm</span>
                              </div>
                            </div>
                          </div>
                          <div className="product-rating">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="product-itemlist-main">
                      <div className="product-card">
                        <div className="product-image">
                          <img
                            src="/images/products/chaybo/ConverseRunStarMotion.webp"
                            alt=""
                            className="!h-[150px]"
                          />
                          <div className="product-icons">
                            <i className="fa-solid fa-heart always-show"></i>
                            <div className="hover-icons">
                              <i className="fa-solid fa-eye"></i>
                              <i className="fa-solid fa-list"></i>
                              <i className="fa fa-exchange"></i>
                            </div>
                          </div>

                          <span className="discount-tag">-20%</span>
                          <span className="new-tag">
                            <img
                              src="/images/logo/title_image_1_tag.webp"
                              alt=""
                            />
                            Mới
                          </span>
                          <div className="product-colors">
                            <span
                              className="color blue"
                              data-color="Xanh dương"
                            ></span>
                            <span
                              className="color green"
                              data-color="Xanh lá"
                            ></span>
                            <span
                              className="color pink"
                              data-color="Hồng"
                            ></span>
                          </div>

                          <h4 className="product-title">
                            Giày Converse Run Star Motion
                          </h4>
                          <div className="product-price">
                            <span className="old-price">
                              <del>1.500.000đ</del>
                            </span>
                            <span className="new-price"> 1.200.000đ</span>
                          </div>
                          <div className="product-progress">
                            <div className="progress-bar">
                              <div
                                className="progress-fill"
                                style={{ width: "87%" }}
                              >
                                <span className="sold">Đã bán 87 sản phẩm</span>
                              </div>
                            </div>
                          </div>
                          <div className="product-rating">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="product-itemlist-main">
                      <div className="product-card">
                        <div className="product-image">
                          <img
                            src="/images/products/chaybo/ConverseRunStarMotion.webp"
                            alt=""
                            className="!h-[150px]"
                          />
                          <div className="product-icons">
                            <i className="fa-solid fa-heart always-show"></i>
                            <div className="hover-icons">
                              <i className="fa-solid fa-eye"></i>
                              <i className="fa-solid fa-list"></i>
                              <i className="fa fa-exchange"></i>
                            </div>
                          </div>

                          <span className="discount-tag">-20%</span>
                          <span className="new-tag">
                            <img
                              src="/images/logo/title_image_1_tag.webp"
                              alt=""
                            />
                            Mới
                          </span>
                          <div className="product-colors">
                            <span
                              className="color blue"
                              data-color="Xanh dương"
                            ></span>
                            <span
                              className="color green"
                              data-color="Xanh lá"
                            ></span>
                            <span
                              className="color pink"
                              data-color="Hồng"
                            ></span>
                          </div>

                          <h4 className="product-title">
                            Giày Converse Run Star Motion
                          </h4>
                          <div className="product-price">
                            <span className="old-price">
                              <del>1.500.000đ</del>
                            </span>
                            <span className="new-price"> 1.200.000đ</span>
                          </div>
                          <div className="product-progress">
                            <div className="progress-bar">
                              <div
                                className="progress-fill"
                                style={{ width: "87%" }}
                              >
                                <span className="sold">Đã bán 87 sản phẩm</span>
                              </div>
                            </div>
                          </div>
                          <div className="product-rating">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>{" "}
          <img src="/images/banner/session_cate.jpg" alt="" />
          <div className="w-[47%] float-left box-container">
            <div className="content">
              <h3>Hàng order</h3>
              <p>
                Xem tất cả <i className="fa-solid fa-angles-right"></i>
              </p>
            </div>
            <div className="flex  w-[100%]  ">
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
                  loop={true}
                  navigation
                  pagination={{ clickable: true, dynamicBullets: true }}
                  breakpoints={{
                    0: {
                      slidesPerView: 3,
                    },
                    576: {
                      slidesPerView: 3,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                    1024: {
                      slidesPerView: 2,
                    },
                  }}
                  className="product-two-box"
                >
                  <SwiperSlide>
                    <div className="product-itemlist-main">
                      <div className="product-card">
                        <div className="product-image">
                          <img
                            src="/images/products/chaybo/ConverseRunStarMotion.webp"
                            alt=""
                            className="!h-[150px]"
                          />
                          <div className="product-icons">
                            <i className="fa-solid fa-heart always-show"></i>
                            <div className="hover-icons">
                              <i className="fa-solid fa-eye"></i>
                              <i className="fa-solid fa-list"></i>
                              <i className="fa fa-exchange"></i>
                            </div>
                          </div>

                          <span className="discount-tag">-20%</span>
                          <span className="new-tag">
                            <img
                              src="/images/logo/title_image_1_tag.webp"
                              alt=""
                            />
                            Mới
                          </span>
                          <div className="product-colors">
                            <span
                              className="color blue"
                              data-color="Xanh dương"
                            ></span>
                            <span
                              className="color green"
                              data-color="Xanh lá"
                            ></span>
                            <span
                              className="color pink"
                              data-color="Hồng"
                            ></span>
                          </div>

                          <h4 className="product-title">
                            Giày Converse Run Star Motion
                          </h4>
                          <div className="product-price">
                            <span className="old-price">
                              <del>1.500.000đ</del>
                            </span>
                            <span className="new-price"> 1.200.000đ</span>
                          </div>
                          <div className="product-progress">
                            <div className="progress-bar">
                              <div
                                className="progress-fill"
                                style={{ width: "87%" }}
                              >
                                <span className="sold">Đã bán 87 sản phẩm</span>
                              </div>
                            </div>
                          </div>
                          <div className="product-rating">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="product-itemlist-main">
                      <div className="product-card">
                        <div className="product-image">
                          <img
                            src="/images/products/chaybo/ConverseRunStarMotion.webp"
                            alt=""
                            className="!h-[150px]"
                          />
                          <div className="product-icons">
                            <i className="fa-solid fa-heart always-show"></i>
                            <div className="hover-icons">
                              <i className="fa-solid fa-eye"></i>
                              <i className="fa-solid fa-list"></i>
                              <i className="fa fa-exchange"></i>
                            </div>
                          </div>

                          <span className="discount-tag">-20%</span>
                          <span className="new-tag">
                            <img
                              src="/images/logo/title_image_1_tag.webp"
                              alt=""
                            />
                            Mới
                          </span>
                          <div className="product-colors">
                            <span
                              className="color blue"
                              data-color="Xanh dương"
                            ></span>
                            <span
                              className="color green"
                              data-color="Xanh lá"
                            ></span>
                            <span
                              className="color pink"
                              data-color="Hồng"
                            ></span>
                          </div>

                          <h4 className="product-title">
                            Giày Converse Run Star Motion
                          </h4>
                          <div className="product-price">
                            <span className="old-price">
                              <del>1.500.000đ</del>
                            </span>
                            <span className="new-price"> 1.200.000đ</span>
                          </div>
                          <div className="product-progress">
                            <div className="progress-bar">
                              <div
                                className="progress-fill"
                                style={{ width: "87%" }}
                              >
                                <span className="sold">Đã bán 87 sản phẩm</span>
                              </div>
                            </div>
                          </div>
                          <div className="product-rating">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="product-itemlist-main">
                      <div className="product-card">
                        <div className="product-image">
                          <img
                            src="/images/products/chaybo/ConverseRunStarMotion.webp"
                            alt=""
                            className="!h-[150px]"
                          />
                          <div className="product-icons">
                            <i className="fa-solid fa-heart always-show"></i>
                            <div className="hover-icons">
                              <i className="fa-solid fa-eye"></i>
                              <i className="fa-solid fa-list"></i>
                              <i className="fa fa-exchange"></i>
                            </div>
                          </div>

                          <span className="discount-tag">-20%</span>
                          <span className="new-tag">
                            <img
                              src="/images/logo/title_image_1_tag.webp"
                              alt=""
                            />
                            Mới
                          </span>
                          <div className="product-colors">
                            <span
                              className="color blue"
                              data-color="Xanh dương"
                            ></span>
                            <span
                              className="color green"
                              data-color="Xanh lá"
                            ></span>
                            <span
                              className="color pink"
                              data-color="Hồng"
                            ></span>
                          </div>

                          <h4 className="product-title">
                            Giày Converse Run Star Motion
                          </h4>
                          <div className="product-price">
                            <span className="old-price">
                              <del>1.500.000đ</del>
                            </span>
                            <span className="new-price"> 1.200.000đ</span>
                          </div>
                          <div className="product-progress">
                            <div className="progress-bar">
                              <div
                                className="progress-fill"
                                style={{ width: "87%" }}
                              >
                                <span className="sold">Đã bán 87 sản phẩm</span>
                              </div>
                            </div>
                          </div>
                          <div className="product-rating">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="product-itemlist-main">
                      <div className="product-card">
                        <div className="product-image">
                          <img
                            src="/images/products/chaybo/ConverseRunStarMotion.webp"
                            alt=""
                            className="!h-[150px]"
                          />
                          <div className="product-icons">
                            <i className="fa-solid fa-heart always-show"></i>
                            <div className="hover-icons">
                              <i className="fa-solid fa-eye"></i>
                              <i className="fa-solid fa-list"></i>
                              <i className="fa fa-exchange"></i>
                            </div>
                          </div>

                          <span className="discount-tag">-20%</span>
                          <span className="new-tag">
                            <img
                              src="/images/logo/title_image_1_tag.webp"
                              alt=""
                            />
                            Mới
                          </span>
                          <div className="product-colors">
                            <span
                              className="color blue"
                              data-color="Xanh dương"
                            ></span>
                            <span
                              className="color green"
                              data-color="Xanh lá"
                            ></span>
                            <span
                              className="color pink"
                              data-color="Hồng"
                            ></span>
                          </div>

                          <h4 className="product-title">
                            Giày Converse Run Star Motion
                          </h4>
                          <div className="product-price">
                            <span className="old-price">
                              <del>1.500.000đ</del>
                            </span>
                            <span className="new-price"> 1.200.000đ</span>
                          </div>
                          <div className="product-progress">
                            <div className="progress-bar">
                              <div
                                className="progress-fill"
                                style={{ width: "87%" }}
                              >
                                <span className="sold">Đã bán 87 sản phẩm</span>
                              </div>
                            </div>
                          </div>
                          <div className="product-rating">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>{" "}
        </div>

        <div className="video-main">
          <img
            className="video-bg"
            src="/images/banner/section_video_bg.webp"
            alt="video background"
          />
          <div className="video-content">
            <h3>Sản phẩm được mua nhiều nhất tháng này</h3>
            <h1>GIÀY CHẠY BỘ</h1>

            {!isPlaying && (
              <div className="play-button" onClick={handlePlay}>
                <i className="fa-solid fa-play"></i>
              </div>
            )}

            {isPlaying && (
              <div className="video-embed">
                <button onClick={handleClose} className="close-button">
                  &times;
                </button>
                <iframe
                  ref={videoRef}
                  src={videoURL}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        </div>
        <div className="blog-main">
          <div className="blog-header">
            <h1 className="blog-title-left">TIN TỨC</h1>
            <h3 className="blog-subtitle-right">–– những bài viết mới nhất</h3>
          </div>

          <div className="blog-slider-wrapper">
            <div className="blog-slider">
              <BlogHome />
            </div>
          </div>
        </div>
        <hr className="hr-line" />
        <div className="brand-main">
          <a href="/index.html" title="Thương hiệu 1">
            <img src="/images/logo/brand_image1.webp" alt="" />
          </a>
          <a href="/index.html" title="Thương hiệu 2">
            <img src="/images/logo/brand_image2.webp" alt="" />
          </a>
          <a href="/index.html" title="Thương hiệu 3">
            <img src="/images/logo/brand_image3.webp" alt="" />
          </a>
          <a href="/index.html" title="Thương hiệu 4">
            <img src="/images/logo/brand_image4.webp" alt="" />
          </a>
          <a href="/index.html" title="Thương hiệu 5">
            <img src="/images/logo/brand_image5.webp" alt="" />
          </a>
          <a href="/index.html" title="Thương hiệu 6">
            <img src="/images/logo/brand_image6.webp" alt="" />
          </a>
          <a href="/index.html" title="Thương hiệu 7">
            <img src="/images/logo/brand_image1.webp" alt="" />
          </a>
          <a href="/index.html" title="Thương hiệu 8">
            <img src="/images/logo/brand_image2.webp" alt="" />
          </a>
          <a href="/index.html" title="Thương hiệu 9">
            <img src="/images/logo/brand_image3.webp" alt="" />
          </a>
          <a href="/index.html" title="Thương hiệu 10">
            <img src="/images/logo/brand_image4.webp" alt="" />
          </a>
          <a href="/index.html" title="Thương hiệu 1">
            <img src="/images/logo/brand_image1.webp" alt="" />
          </a>
        </div>
        <div className="comment-main">
          <h1>KHÁCH HÀNG NÓI GÌ</h1>
          <div className="comment-list">
            <div className="comment-item">
              <p>
                Tôi rất yên tâm bởi đây là công nghệ đã được các tổ chức uy tín
                trên thế giới như FDA (Hoa Kỳ), CE (Châu Âu) chứng nhận về hiệu
                quả và độ an toàn. Bây giờ mặt tôi không còn vết nám nào cả. Cảm
                ơn spa rất nhiều! Chúc Beryl Beauty & Spa làm ăn phát đạt!
              </p>
              <div className="comment-rating">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <div className="comment-author">
                <div className="author-info">
                  <strong>NGUYỄN THỊ MINH</strong> - Giám đốc
                </div>
                <div className="author-image">
                  <img src="/images/logo/anh14.jpg" alt="avatar" />
                </div>
              </div>
            </div>

            <div className="comment-item">
              <p>
                Mình thấy rất hài lòng về dịch vụ ở đây. Sự nhiệt tình của các
                bạn kỹ thuật viên và sự tư vấn tận tình của các chuyên gia đã
                làm mình yên tâm trong quá trình điều trị...
              </p>
              <div className="comment-rating">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <div className="comment-author">
                <div className="author-info">
                  <strong>LÊ THỊ THÚY</strong> - Trưởng phòng nhân sự
                </div>
                <div className="author-image">
                  <img src="/images/logo/anhdep.jpg" alt="avatar" />
                </div>
              </div>
            </div>

            <div className="comment-item">
              <p>
                Da mình rất nhạy cảm, cộng thêm thời tiết nóng bức và ô nhiễm ở
                Sài Gòn làm da của mình bị nổi mụn. Một lần tình cờ lướt
                Facebook thấy spa có chương trình giảm giá trị mụn, mình thử và
                đã thành công!
              </p>
              <div className="comment-rating">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <div className="comment-author">
                <div className="author-info">
                  <strong>NGUYỄN VĂN ANH</strong> - Kỹ sư
                </div>
                <div className="author-image">
                  <img src="/images/logo/anhdep15.jpg" alt="avatar" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="instagram-main">
          <div
            className="bg-insta-title"
            style={{
              backgroundImage:
                "url(https://bizweb.dktcdn.net/100/430/436/files/bg-insta.jpg?v=1701307661793)",
            }}
          >
            <h2>Theo dõi Instagram của chúng tôi</h2>
          </div>
          <div className="instagram-list">
            <img
              src="/images/blog/section_instagram_img1.webp"
              alt="Instagram 1"
            />

            <div className="instagram-center-text">
              <h2>Theo dõi Instagram của chúng tôi</h2>
            </div>

            <img
              src="/images/blog/section_instagram_img2.webp"
              alt="Instagram 2"
            />

            <img
              src="/images/blog/section_instagram_img3.webp"
              alt="Instagram 3"
            />
            <img
              src="/images/blog/section_instagram_img4.webp"
              alt="Instagram 4"
            />
            <img
              src="/images/blog/section_instagram_img5.webp"
              alt="Instagram 5"
            />
            <img
              src="/images/blog/section_instagram_img6.webp"
              alt="Instagram 6"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
