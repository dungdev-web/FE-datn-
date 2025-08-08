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
import { useEffect, useState, useRef, use } from "react";
import Show1sanpham from "./component/product_home";
import BlogHome from "./component/Home/BlogHome";
import CouponApp from "./component/coupon";
import FlashSale from "./component/flash_sale";
import { IProduct } from "@/types/product";
import { API_BASE_URL } from "@/config/env";
import {
  getNewestProducts,
  getFeaturedProducts,
  getProductsByCategory,
} from "@/services/productService";
import Link from "next/link";
import Show2sanpham from "src/app/(client)/component/product-two-box";
import Banner3D from "src/app/(client)/component/Home/Banner3D";
import { useAddToCart } from "@/hooks/useAddToCart";
import ProductIcons from "src/app/(client)/component/Products/ProductIcons";
import HotProductIcons from "src/app/(client)/component/Products/HotProductIcons";
import HotspotLookbook from "src/app/(client)/component/Home/HotspotProduct";
export default function Home() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const [newproducts, setNewProducts] = useState<IProduct[]>([]);
  const [cateproducts, serCateProducts] = useState<IProduct[]>([]);
  const [cateproducts1, serCateProducts1] = useState<IProduct[]>([]);
  const [cateproducts2, serCateProducts2] = useState<IProduct[]>([]);
  const [cateproducts3, serCateProducts3] = useState<IProduct[]>([]);
  const [featureproducts, serFretureProducts] = useState<IProduct[]>([]);

  const videoURL = "https://www.youtube.com/embed/b7WP23NK12Q?autoplay=1";

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleClose = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.src = "";
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNewestProducts();
        setNewProducts(data.slice(0, 10));
      } catch (err) {
        console.error("Lỗi khi lấy sản phẩm mới nhất:", err);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFeaturedProducts();
        serFretureProducts(data.slice(0, 10));
      } catch (err) {
        console.error("Lỗi khi lấy sản phẩm nổi bậtt:", err);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductsByCategory("giày chạy bộ");
        const data1 = await getProductsByCategory("giày bóng rổ");
        const data2 = await getProductsByCategory("sneaker");
        const data3 = await getProductsByCategory("giày tập gym");
        if (Array.isArray(data)) {
          serCateProducts(data.slice(0, 10));
        } else {
          console.error("data.products không đúng định dạng:", data);
        }

        if (Array.isArray(data1)) {
          serCateProducts1(data1.slice(0, 10));
        } else {
          console.error("data1.products không đúng định dạng:", data1);
        }

        if (Array.isArray(data2)) {
          serCateProducts2(data2.slice(0, 10));
        } else {
          console.error("data2.products không đúng định dạng:", data2);
        }
        if (Array.isArray(data3)) {
          serCateProducts3(data3.slice(0, 10));
        } else {
          console.error("data3.products không đúng định dạng:", data3);
        }
      } catch (err) {
        console.error("Lỗi khi lấy sản phẩm theo danh mục:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* <div className="banner-home relative">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
          loop={true}
          spaceBetween={0}
          slidesPerView={1}
        >
          <SwiperSlide>
            <div className="banner-slider relative w-full h-[650px]">
              <Image
                src="/images/banner/slider_1.png"
                alt="Banner 1"
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
              <div className="button-banner-left absolute bottom-32 left-32">
                <button className="border border-white text-white text-xl font-bold px-12 py-2 rounded-3xl hover:bg-[#0a0] hover:text-black transition">
                  Mua ngay
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="banner-slider relative w-full h-[650px]">
              <Image
                src="/images/banner/slider_2.png"
                alt="Banner 2"
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
              <div className="button-banner-right absolute bottom-44 right-44">
                <button className="border border-white text-white text-xl font-bold px-12 py-2 rounded-3xl hover:bg-[#0a0] hover:text-black transition">
                  Mua ngay
                </button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div> */}
      <Banner3D />
      <main className="!mt-16 sm:!mt-0">
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
              <button>
                <Link className="btn-lookbook" href={`/product?gender=nam`}>
                  GIÀY NAM
                </Link>
              </button>
              <button>
                <Link className="btn-lookbook" href={`/product?gender=nữ`}>
                  GIÀY NỮ
                </Link>
              </button>
            </div>
          </div>

          <HotspotLookbook
            openIndex={openIndex}
            setOpenIndex={setOpenIndex}
            togglePopup={togglePopup}
            containerRef={containerRef}
          />
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
              <Link href="/product">Xem tất cả <i className="fa-solid fa-angles-right"></i></Link>
            </h4>
          </div>

          <div className="hot-products-list">
            {newproducts.map((product) => {
              const productId = product.products_id ?? product.products_id;
              const averageRating = product.product_reviews?.length
                ? Math.round(
                    product.product_reviews.reduce(
                      (sum, r) => sum + Number(r.rating),
                      0
                    ) / product.product_reviews.length
                  )
                : 0;

              const sold =
                product.product_variants?.reduce(
                  (sum, v) => sum + v.stock_quantity,
                  0
                ) ?? 0;

              const discount =
                product.price > product.sale_price
                  ? Math.round(
                      ((product.price - product.sale_price) / product.price) *
                        100
                    )
                  : 0;

              const uniqueColors = [
                ...new Map(
                  (product.product_variants || [])
                    .filter((v) => v.color && v.color.id)
                    .map((v) => [v.color.id, v.color])
                ).values(),
              ];

              return (
                <div className="hot-product-card" key={product.products_id}>
                  <div className="hot-product-image">
                    <Link href={`product/${product.slug}`}>
                      <img
                        src={
                          `${API_BASE_URL}/uploads/${product.images?.[0]?.url}` ||
                          "/images/placeholder.png"
                        }
                        alt={product.name}
                      />
                    </Link>

                    <HotProductIcons
                      productId={productId}
                      variant_id={
                        product.product_variants[0]?.product_variants_id
                      }
                      price={product.sale_price}
                    />

                    <span className="tag-discount">-{discount}%</span>
                  </div>
                  <div className="hot-product-content">
                    <div className="hot-product-colors">
                      {uniqueColors.map((color) => (
                        <span
                          key={color.id}
                          className="color"
                          data-color={color.name_color}
                          style={{ backgroundColor: color.code_color }}
                        ></span>
                      ))}
                    </div>
                    <h4 className="hot-product-title">{product.name}</h4>
                    <div className="hot-product-price">
                      {product.sale_price > 0 && (
                        <span className="price-old">
                          <del>{product.price.toLocaleString("vi")}đ</del>
                        </span>
                      )}
                      <span className="price-new">
                        {(product.sale_price > 0
                          ? product.sale_price
                          : product.price
                        ).toLocaleString("vi")}
                        đ
                      </span>
                    </div>

                    <div className="hot-product-progress">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: "87%" }}>
                          <span className="sold-info">
                            Đã bán {sold} sản phẩm
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="hot-product-rating">
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
              );
            })}
          </div>
        </div>
        {featureproducts.length > 0 && (
        <div className="hot-products">
          <div className="hot-products-header">
            <h1 className="hot-products-title">SẢN PHẨM NỔI BẬT</h1>
            <h4>
              <Link href="/product">Xem tất cả <i className="fa-solid fa-angles-right"></i></Link>
            </h4>
          </div>

          <div className="hot-products-list">
            {featureproducts.map((product) => {
              const productId = product.products_id ?? product.products_id;

              const averageRating = product.product_reviews?.length
                ? Math.round(
                    product.product_reviews.reduce(
                      (sum, r) => sum + Number(r.rating),
                      0
                    ) / product.product_reviews.length
                  )
                : 0;

              const sold =
                product.product_variants?.reduce(
                  (sum, v) => sum + v.stock_quantity,
                  0
                ) ?? 0;

              const discount =
                product.price > product.sale_price
                  ? Math.round(
                      ((product.price - product.sale_price) / product.price) *
                        100
                    )
                  : 0;

              const uniqueColors = [
                ...new Map(
                  (product.product_variants || []).map((v) => [
                    v.color.id,
                    v.color,
                  ])
                ).values(),
              ];

              return (
                <div className="hot-product-card" key={product.products_id}>
                  <div className="hot-product-image">
                    <Link href={`product/${product.slug}`}>
                      <img
                        src={
                          `${API_BASE_URL}/uploads/${product.images?.[0]?.url}` ||
                          "/images/placeholder.png"
                        }
                        alt={product.name}
                      />
                    </Link>

                    <HotProductIcons
                      productId={productId}
                      variant_id={
                        product.product_variants[0]?.product_variants_id
                      }
                      price={product.sale_price}
                    />

                    {discount > 0 && (
                      <span className="tag-discount">-{discount}%</span>
                    )}
                  </div>

                  <div className="hot-product-content">
                    <div className="hot-product-colors">
                      {uniqueColors.map((color) => (
                        <span
                          key={color.id}
                          className="color"
                          data-color={color.name_color}
                          style={{ backgroundColor: color.code_color }}
                        ></span>
                      ))}
                    </div>

                    <h4 className="hot-product-title">{product.name}</h4>

                    <div className="hot-product-price">
                      {product.sale_price > 0 && (
                        <span className="price-old">
                          <del>{product.price.toLocaleString("vi")}đ</del>
                        </span>
                      )}
                      <span className="price-new">
                        {(product.sale_price > 0
                          ? product.sale_price
                          : product.price
                        ).toLocaleString("vi")}
                        đ
                      </span>
                    </div>

                    <div className="hot-product-progress">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: "87%" }}>
                          <span className="sold-info">
                            Đã bán {sold} sản phẩm
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="hot-product-rating">
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
              );
            })}
          </div>
        </div>
        )}

        <div className="product-two-box-main">
          <h1 className="h1">SẢN PHẨM THEO DANH MỤC</h1>
          <div className="product-two-box-container flex gap-[75px] flex-wrap">
            <Show2sanpham products={cateproducts} />
            <Show2sanpham products={cateproducts1} />

            <img src="/images/banner/session_cate.jpg" alt="" />
            <Show2sanpham products={cateproducts2} />
            <Show2sanpham products={cateproducts3} />
          </div>
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
