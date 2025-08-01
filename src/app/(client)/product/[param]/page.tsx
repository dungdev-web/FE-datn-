"use client";
import "../../css/detail.css";
import { IProduct, IReview, IReviewPayload } from "@/types/product";
import { ICartItem } from "@/types/cart";
import { ICoupon } from "@/types/coupon";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  getProductDetail,
  getBestSellingMockProducts,
  getReviewProduct,
  addReviewProduct,
} from "@/services/productService";
import RelatedProductList from "../../component/RelatedProductList";
import Swal from "sweetalert2";
import { checkToken } from "@/services/authService";
import { addToMockCart } from "@/services/cartService";
import { useRouter } from "next/navigation";
import { addToCart } from "@/services/cartService";
import { getCouponList } from "@/services/couponService";
import { API_BASE_URL } from "@/config/env";
export default function Detail() {
  const router = useRouter();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const [activeTab, setActiveTab] = useState("tab-1");
  const [bestsellproducts, setBestSellProducts] = useState<IProduct[]>([]);
  const [selectedImage, setSelectedImage] = useState("/images/placeholder.png");
  const [quantity, setQuantity] = useState(1);
  const [variantId, setVariantId] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedColorId, setSelectedColorId] = useState<number | null>(null);
  const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null);
  const [countdown, setCountdown] = useState("");
  const [views, setReviews] = useState<IReview[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [content, setContent] = useState<string>("");
  const [coupon, setCoupon] = useState<ICoupon[]>([]);
  const handleAddToCart = async () => {
    if (!selectedColorId) {
      Swal.fire({
        icon: "warning",
        title: "Vui lòng chọn màu sắc",
        text: "Bạn cần chọn màu trước khi thêm vào giỏ hàng.",
      });
      return;
    }

    if (!selectedSizeId) {
      Swal.fire({
        icon: "warning",
        title: "Vui lòng chọn kích thước",
        text: "Bạn cần chọn size trước khi thêm vào giỏ hàng.",
      });
      return;
    }

    if (!variantId) {
      Swal.fire({
        icon: "warning",
        title: "Vui lòng chọn biến thể",
        text: "Bạn cần chọn đúng biến thể trước khi thêm vào giỏ hàng.",
      });
      return;
    }

    setLoading(true);

    try {
      const tokenData = await checkToken();
      if (!tokenData?.user?.id) {
        Swal.fire({
          icon: "warning",
          title: "Bạn chưa đăng nhập",
          text: "Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.",
          confirmButtonText: "Đăng nhập",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/login");
          }
        });
        return;
      }

      const response = await addToCart({
        user_id: tokenData.user.id,
        variant_id: variantId,
        quantity,
        price,
      });

      console.log("Đã thêm vào giỏ hàng:", response);

      Swal.fire({
        icon: "success",
        title: "Đã thêm vào giỏ hàng!",
        text: response.message,
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.href = "/cart"; // reload cứng nếu không dùng router.refresh
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: (error as Error).message || "Thêm sản phẩm thất bại",
      });
    } finally {
      setLoading(false);
    }
  };

  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  useEffect(() => {
    const param = params.param;
    if (!param) return;
    const paramStr = Array.isArray(param) ? param[0] : param;
    if (typeof paramStr !== "string") return;

    const fetchData = async () => {
      setLoading(true);

      let found = null;

      if (!isNaN(Number(paramStr))) {
        found = await getProductDetail({ id: Number(paramStr) });
      } else {
        found = await getProductDetail({ slug: paramStr });
      }

      setProduct(found || null);
      setLoading(false);
    };

    fetchData();
  }, [params]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCouponList();
      setCoupon(data);
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getBestSellingMockProducts(9);
      setBestSellProducts(data);
      console.log("Product images:", data);
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      if (!product?.products_id) return;

      try {
        const data = await getReviewProduct(product.products_id);
        setReviews(data);
      } catch (error) {
        console.error("Lỗi khi lấy đánh giá sản phẩm:", error);
      }
    };

    fetchData();
  }, [product?.products_id]);

  useEffect(() => {
    if (
      product &&
      Array.isArray(product.images) &&
      product.images?.length > 0
    ) {
      setSelectedImage(
        product.images?.[0]?.url
          ? `${API_BASE_URL}/uploads/${product.images[0].url}`
          : "/images/placeholder.png"
      );
    } else {
      setSelectedImage("/images/placeholder.png");
    }
  }, [product]);
  useEffect(() => {
    if (product) {
      setPrice(product.sale_price > 0 ? product.sale_price : product.price);
    }
  }, [product]);

  useEffect(() => {
    if (selectedColorId && selectedSizeId && product) {
      const match = product.product_variants.find(
        (v) =>
          v?.color?.id === selectedColorId && v?.size?.id === selectedSizeId
      );

      if (match) {
        setVariantId(match.product_variants_id);
        // setPrice(match.sale_price || match.);
      }
    }
  }, [selectedColorId, selectedSizeId, product]);
  useEffect(() => {
    if (!product || product.sale_price <= 0) return;

    const endTime = new Date(Date.now() + 1.5 * 60 * 60 * 1000); // 1.5 giờ

    const interval = setInterval(() => {
      const now = new Date();
      const distance = endTime.getTime() - now.getTime();

      if (distance <= 0) {
        setCountdown("EXPIRED");
        clearInterval(interval);
      } else {
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((distance / (1000 * 60)) % 60);
        const seconds = Math.floor((distance / 1000) % 60);
        setCountdown(`${hours} giờ ${minutes} phút ${seconds} giây`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [product]);
  useEffect(() => {
    if (!selectedColorId && product?.product_variants?.length) {
      const colorIds = [
        ...new Set(
          product.product_variants
            .filter((v) => v?.color?.id)
            .map((v) => v.color.id)
        ),
      ];
      if (colorIds.length === 1) {
        setSelectedColorId(colorIds[0]);
      }
    }
  }, [product]);
  useEffect(() => {
    const defaultImage =
      product?.product_variants?.[0]?.color?.images ||
      product?.images?.find((img) => img.type === "side")?.url;

    if (defaultImage) {
      setSelectedImage(`${API_BASE_URL}/uploads/${defaultImage}`);
    }
  }, [product]);

  const handleMinus = () => {
    setQuantity((prev) => Math.max(1, prev - 1)); // không nhỏ hơn 1
  };

  const handlePlus = () => {
    setQuantity((prev) => Math.min(999, prev + 1)); // giới hạn 3 chữ số
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= 1 && num <= 999) {
      setQuantity(num);
    } else if (value === "") {
      setQuantity(1);
    }
  };
  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      Swal.fire({
        icon: "success",
        title: "Đã sao chép!",
        text: `Mã "${code}" đã được sao chép.`,
        timer: 1500,
        showConfirmButton: false,
      });
    });
  };
  const handleSubmitReview = async () => {
    const tokenData = await checkToken();
    if (!tokenData?.user?.id) {
      Swal.fire({
        icon: "warning",
        title: "Bạn chưa đăng nhập",
        text: "Vui lòng đăng nhập để gửi đánh giá.",
        confirmButtonText: "Đăng nhập",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
      return;
    }

    try {
      const userId = tokenData.user.id;
      if (!product || !product.products_id) return;

      const data = await addReviewProduct(product.products_id, {
        user_id: userId,
        rating,
        content,
      });

      Swal.fire("Thành công!", "Bạn đã đánh giá sản phẩm.", "success");
      setReviews((prev) => [...prev, data]); // nếu muốn cập nhật ngay
    } catch (error: any) {
      Swal.fire("Lỗi", error.message, "error");
      console.error("Lỗi khi gửi đánh giá:", error);
    }
  };

  const totalReviews = Array.isArray(product?.product_reviews)
    ? product.product_reviews.length
    : 0;

  const averageRating =
    totalReviews > 0
      ? product!.product_reviews!.reduce(
          (sum, r) => sum + parseFloat(r.rating),
          0
        ) / totalReviews
      : 0;

  const roundedRating = Math.round(averageRating);

  if (loading) {
    return <div className="text-center py-10">Đang tải sản phẩm...</div>;
  }

  if (!product) {
    return (
      <div className="text-center py-10 text-red-500">
        Không tìm thấy sản phẩm.
      </div>
    );
  }

  return (
    <>
      <section
        className="bread-crumb background-cover relative"
        style={{
          backgroundImage: "url(/images/banner/banner_dieuhuong1.png)",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {/* Lớp phủ làm mờ nền */}
        <div className="absolute inset-0 bg-gray-500/50 backdrop-blur-none z-0"></div>

        <div className="breadcrumb-container">
          <div className="title-page">
            <h2>{product.name}</h2>
          </div>
          <ul className="breadcrumb">
            <li className="home">
              <a href="/" title="Trang chủ">
                <span>Trang chủ</span>
              </a>
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </li>

            <li>
              <a href="/san-pham-moi-nhat" title="Sản phẩm mới nhất">
                <span>Sản phẩm mới nhất</span>
              </a>
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </li>

            <li>
              <strong>
                <span>{product.name}</span>
              </strong>
            </li>
            <li></li>
          </ul>
        </div>
      </section>

      <main>
        <section className="product">
          <div className="container1">
            <div className="row row-flex-detail">
              <div className="col-lg-9">
                <div className="row">
                  <div className="col-lg-5">
                    <div className="relative product-image-block">
                      <div
                        className="large-image"
                        onClick={() => setIsZoomed(true)}
                        style={{ cursor: "zoom-in" }}
                      >
                        <div
                          data-href="https://bizweb.dktcdn.net/100/505/077/products/layer12137b41646ee49b99d29fc01.jpg?v=1702350249013"
                          className="large_image_url"
                        >
                          <div
                            style={{ height: "445px", width: "381px" }}
                            className="zoomWrapper"
                          >
                            <div
                              style={{ height: "442px", width: "378px" }}
                              className="zoomWrapper"
                            >
                              <img
                                id="zoom_01"
                                className="img-responsive center-block !w-full !h-full"
                                src={selectedImage}
                                alt={product.name}
                                style={{ position: "absolute" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {isZoomed && (
                        <div
                          className="zoom-overlay"
                          onClick={() => setIsZoomed(false)}
                        >
                          <img src={selectedImage} alt={product?.name} />
                        </div>
                      )}
                      <div className="tns-outer">
                        <div className="tns-ovh">
                          <div id="id_tiny_0-iw" className="tns-inner">
                            {[
                              ...new Map(
                                product.product_variants
                                  .filter((v) => v?.color?.code_color)
                                  .map((v) => [v.color.code_color, v])
                              ).values(),
                            ].map((variant, index) => {
                              const colorImage = variant.color?.images;
                              const fallbackImage = product.images?.find(
                                (img) => img.type === "side"
                              )?.url;

                              const imageUrl =
                                colorImage || fallbackImage || "logo/1.png";
                              const fullImageUrl = `${API_BASE_URL}/uploads/${imageUrl}`;

                              return (
                                <div
                                  key={index}
                                  className={`space-item-tsn tns-item tns-slide-active ${
                                    selectedImage === fullImageUrl
                                      ? "active"
                                      : ""
                                  }`}
                                  onClick={() => setSelectedImage(fullImageUrl)}
                                  style={{ cursor: "pointer" }}
                                >
                                  <div className="item">
                                    <img
                                      src={fullImageUrl}
                                      className="img-responsive"
                                      alt={`${product.name} - ${
                                        variant.color?.name_color || ""
                                      }`}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-7 details-pro">
                    <div className="product-detail-flash-sale">
                      <h3 className="flex items-center gap-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-fire"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z"></path>
                        </svg>
                        Flash sale
                      </h3>
                      <div
                        className="wrapcountdown"
                        data-date="2024-12-31 23:59:59"
                        id="countdown"
                      >
                        {product.sale_price > 0 ? countdown : "EXPIRED"}
                      </div>
                    </div>

                    <h1 className="title-head">{product.name}</h1>
                    <div>
                      <link href="http://schema.org/InStock" />

                      <div className="information">
                        <p>
                          <span>Thương hiệu:</span> {product.brand?.name}
                        </p>
                        <p className="inventory_quantity">
                          <span className="a-stock">Tình trạng:</span>{" "}
                          {product.product_variants.reduce(
                            (sum, v) => sum + v.stock_quantity,
                            0
                          ) > 0
                            ? "Còn hàng"
                            : "Hết hàng"}
                        </p>
                      </div>
                      <div className="price-box clearfix gap-[10px] !m-0">
                        <span className="special-price">
                          <span className="price product-price !m-0">
                            {price?.toLocaleString("vi")}₫
                          </span>
                        </span>

                        {product.sale_price > 0 && price < product.price && (
                          <span className="old-price">
                            <del className="price product-price-old !ml-[10px]">
                              {product.price?.toLocaleString("vi")}₫
                            </del>
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="form-product">
                      <div className="swatch-color swatch clearfix">
                        <div className="header position-fixed">Màu sắc</div>
                        <div className="color-options">
                          {[
                            ...new Map(
                              product.product_variants
                                .filter((v) => v?.color?.code_color)
                                .map((v) => [v.color.code_color, v.color])
                            ).values(),
                          ].map((color) => {
                            return (
                              <div
                                key={color.id}
                                className="color-circle"
                                onClick={() => {
                                  setSelectedColorId(color.id);
                                  setSelectedSizeId(null);

                                  // Tìm variant theo màu đã chọn
                                  const matchedVariant =
                                    product.product_variants.find(
                                      (v) => v.color?.id === color.id
                                    );

                                  // Ưu tiên ảnh theo màu, nếu không có thì fallback ảnh phụ
                                  const imageUrl =
                                    matchedVariant?.color?.images ||
                                    product.images?.find(
                                      (img) => img.type === "side"
                                    )?.url ||
                                    "logo/1.png";

                                  setSelectedImage(
                                    `${API_BASE_URL}/uploads/${imageUrl}`
                                  );
                                }}
                                style={{
                                  backgroundColor: color.code_color,
                                  width: 24,
                                  height: 24,
                                  borderRadius: "50%",
                                  border:
                                    selectedColorId === color.id
                                      ? "2px solid #facc15"
                                      : "1px solid #ccc",
                                  cursor: "pointer",
                                }}
                                title={color.name_color}
                              ></div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="swatch-size swatch clearfix">
                        <div className="header" style={{ background: "#fff" }}>
                          Kích thước
                        </div>
                        <div className="size-options">
                          {[
                            ...new Map(
                              (selectedColorId
                                ? product.product_variants.filter(
                                    (v) => v?.color?.id === selectedColorId
                                  )
                                : product.product_variants
                              ).map((v) => [v.size.id, v])
                            ).values(),
                          ]
                            .sort(
                              (a, b) =>
                                Number(a.size.number_size) -
                                Number(b.size.number_size)
                            )
                            .map((variant) => (
                              <button
                                key={variant.size.id}
                                className="size-button"
                                style={{
                                  padding: "8px 12px",
                                  marginRight: "5px",
                                  border: "1px solid #ccc",
                                  borderRadius: "4px",
                                  background: "#fff",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  setSelectedSizeId(variant.size.id);
                                }}
                              >
                                {variant.size.number_size}
                              </button>
                            ))}
                        </div>
                      </div>

                      <div className="form-group form-groupx">
                        <div className="custom custom-btn-number form-control">
                          <span className="quantity-span hidden">
                            Số lượng:
                          </span>
                          <span className="qtyminus" onClick={handleMinus}>
                            -
                          </span>
                          <input
                            type="text"
                            className="input-text qty"
                            maxLength={3}
                            value={quantity}
                            onChange={handleChange}
                            id="qty"
                            name="quantity"
                          />
                          <span className="qtyplus" onClick={handlePlus}>
                            +
                          </span>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-lg btn-gray btn-cart btn_buy add_to_cart"
                          title="Mua ngay"
                          onClick={handleAddToCart}
                        >
                          <span className="txt-main">Mua ngay</span>
                        </button>
                      </div>

                      {/* CHÍNH SÁCH */}
                      <ul className="chinhsach-pro">
                        <li>
                          <img
                            src="//bizweb.dktcdn.net/100/505/077/themes/934930/assets/product_detail_chinh_sach1.jpg?1730865096645"
                            alt="Đổi trả cực dễ chỉ cần số điện thoại"
                          />
                          <span>Đổi trả cực dễ chỉ cần số điện thoại</span>
                        </li>
                        <li>
                          <img
                            src="//bizweb.dktcdn.net/100/505/077/themes/934930/assets/product_detail_chinh_sach2.jpg?1730865096645"
                            alt="Miễn phí vận chuyển cho đơn hàng trên 200K"
                          />
                          <span>
                            Miễn phí vận chuyển cho đơn hàng trên 200K
                          </span>
                        </li>
                        <li>
                          <img
                            src="//bizweb.dktcdn.net/100/505/077/themes/934930/assets/product_detail_chinh_sach3.jpg?1730865096645"
                            alt="60 ngày đổi trả vì bất kỳ lý do gì"
                          />
                          <span>60 ngày đổi trả vì bất kỳ lý do gì</span>
                        </li>
                        <li>
                          <img
                            src="//bizweb.dktcdn.net/100/505/077/themes/934930/assets/product_detail_chinh_sach4.jpg?1730865096645"
                            alt="Hotline 19006750 hỗ trợ từ 8h30 - 22h"
                          />
                          <span>Hotline 19006750 hỗ trợ từ 8h30 - 22h</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12 col-lg-12 col-md-12 margin-top-40 margin-bottom-10">
                    <div className="product-tab e-tabs space-30">
                      <ul className="tabs tabs-title clearfix">
                        <li
                          className={`tab-link ${
                            activeTab === "tab-1" ? "current" : ""
                          }`}
                          onClick={() => setActiveTab("tab-1")}
                        >
                          <h3>
                            <span>Thông tin sản phẩm</span>
                          </h3>
                        </li>
                        <li
                          className={`tab-link ${
                            activeTab === "tab-2" ? "current" : ""
                          }`}
                          onClick={() => setActiveTab("tab-2")}
                        >
                          <h3>
                            <span>Chính sách đổi trả</span>
                          </h3>
                        </li>
                        <li
                          className={`tab-link ${
                            activeTab === "tab-3" ? "current" : ""
                          }`}
                          onClick={() => setActiveTab("tab-3")}
                        >
                          <h3>
                            <span>Đánh giá sản phẩm</span>
                          </h3>
                        </li>
                      </ul>

                      <div
                        id="tab-1"
                        className={`tab-content ${
                          activeTab === "tab-1" ? "current" : ""
                        }`}
                      >
                        <div className="rte">
                          <p>{product.description}</p>
                        </div>
                      </div>

                      <div
                        id="tab-2"
                        className={`tab-content ${
                          activeTab === "tab-2" ? "current" : ""
                        }`}
                      >
                        + Sản phẩm lỗi, hỏng do quá trình sản xuất hoặc vận
                        chuyện
                        <br />
                        + Nằm trong chính sách đổi trả sản phẩm của Bean
                        <br />
                        + Sản phẩm còn nguyên tem mác không bị rớt vỡ, vô nước
                        <br />
                        + Thời gian đổi trả nhỏ hơn 15 ngày kể từ ngày nhận hàng
                        <br />
                        + Chi phí bảo hành về sản phẩm, vận chuyển khách hàng
                        chịu chi phí
                        <br />
                        <b>Điều kiện đổi trả hàng</b>
                        <br />
                        Điều kiện về thời gian đổi trả: trong vòng 07 ngày kể từ
                        khi nhận được hàng và phải liên hệ gọi ngay cho chúng
                        tôi theo số điện thoại trên để được xác nhận đổi trả
                        hàng.
                        <br />
                        <b>Điều kiện đổi trả hàng:</b>
                        <br />
                        - Sản phẩm gửi lại phải còn nguyên đai nguyên kiện
                        <br />
                        - Phiếu bảo hành (nếu có) và tem của công ty trên sản
                        phẩm còn nguyên vẹn.
                        <br />
                        - Sản phẩm đổi/ trả phải còn đầy đủ hộp, giấy hướng dẫn
                        sử dụng và không bị trầy xước, bể.
                        <br />- Quý khách chịu chi phí vận chuyển, đóng gói, thu
                        hộ tiền, chi phí liên lạc tối đa tương đương 10% giá trị
                        đơn hàng.
                      </div>
                      <div
                        id="tab-3"
                        className={`tab-content ${
                          activeTab === "tab-3" ? "current" : ""
                        }`}
                      >
                        {/* <div className="rte">
                          <p>
                            Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá
                            sản phẩm này!
                          </p>
                        </div> */}
                        <div className="rte">
                          <h4 className="text-lg font-semibold !mb-2">
                            Đánh giá trung bình
                          </h4>
                          <div className="flex items-center gap-2 !mb-4">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                fill={i < roundedRating ? "#facc15" : "#d1d5db"}
                                viewBox="0 0 16 16"
                              >
                                <path d="M3.612 15.443c-.396.198-.824-.149-.746-.592l.83-4.73-3.523-3.356c-.329-.314-.158-.888.283-.95l4.898-.696 2.184-4.327c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.35.79-.746.592L8 13.187l-4.389 2.256z" />
                              </svg>
                            ))}
                            <span className="text-sm text-gray-500">
                              ({averageRating.toFixed(1)} / 5)
                            </span>
                          </div>

                          <div className="space-y-4">
                            {views.map((review, index) => {
                              const rating = review.rating;

                              return (
                                <div
                                  key={review.product_reviews_id || index}
                                  className="!p-3 border rounded shadow-sm bg-white !mb-[15px]"
                                >
                                  <div className="flex items-center gap-2 !mb-1">
                                    <img
                                      className="!w-[35px] rounded-[50%]"
                                      src={
                                        review.user?.picture
                                          ? review.user?.picture
                                          : review.user.avatar?.startsWith(
                                              "http"
                                            )
                                          ? review.user.avatar
                                          : review.user.avatar
                                          ? `${API_BASE_URL}/uploads/${review.user.avatar}`
                                          : "/images/default.png"
                                      }
                                      alt=""
                                    />
                                    <strong className="text-sm">
                                      {review.user?.name}
                                    </strong>
                                    <div className="flex gap-0.5">
                                      {[...Array(5)].map((_, i) => (
                                        <svg
                                          key={i}
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="14"
                                          height="14"
                                          fill={
                                            i < rating ? "#facc15" : "#d1d5db"
                                          }
                                          viewBox="0 0 16 16"
                                        >
                                          <path d="M3.612 15.443c-.396.198-.824-.149-.746-.592l.83-4.73-3.523-3.356c-.329-.314-.158-.888.283-.95l4.898-.696 2.184-4.327c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.35.79-.746.592L8 13.187l-4.389 2.256z" />
                                        </svg>
                                      ))}
                                    </div>
                                  </div>
                                  <p className="text-sm text-gray-700">
                                    {review.content}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                          <div className="!mt-6 !p-4 border rounded-lg bg-white shadow-sm space-y-3">
                            <h4 className="text-lg font-semibold mb-2">
                              Viết đánh giá của bạn
                            </h4>

                            <div>
                              <label className="block text-sm font-medium !mb-1">
                                Số sao
                              </label>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    type="button"
                                    className={`text-xl hover:scale-110 transition-transform ${
                                      star <= rating
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                    onClick={() => setRating(star)}
                                  >
                                    ★
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-1">
                                Nội dung đánh giá
                              </label>
                              <textarea
                                placeholder="Nhận xét của bạn..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={4}
                                className="!w-full border border-gray-300 rounded !px-3 !py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 !mb-[15px]"
                              ></textarea>
                            </div>

                            <button
                              onClick={handleSubmitReview}
                              className="!px-4 !py-2 bg-[#03177e] cursor-pointer text-white rounded hover:bg-blue-700 transition"
                            >
                              Gửi đánh giá
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="related-product">
                  <div className="title-page text-center">
                    <h2>
                      <a href="#" title="SẢN PHẨM CÙNG LOẠI">
                        SẢN PHẨM CÙNG LOẠI
                      </a>
                    </h2>
                  </div>
                </div>

                <RelatedProductList categoryId={product.products_id} />
              </div>
              <div className="sidebar sidebar-des left left-content col-lg-3 col-md-3 ">
                <div className="khuyen-mai">
                  <div className="title">
                    <img
                      width="64"
                      height="64"
                      src="//bizweb.dktcdn.net/100/505/077/themes/934930/assets/khuyen_mai_title.png?1730865096645"
                      alt="vouver"
                    />
                    <span>Khuyến mãi đặc biệt !!!</span>
                  </div>
                  <div className="content">
                    <ul>
                      <li className="!flex gap-[10px]">
                        <img
                          className="!h-[20px]"
                          width="20"
                          height="20"
                          src="//bizweb.dktcdn.net/100/505/077/themes/934930/assets/product_khuyen_mai1.png?1730865096645"
                          alt="Áp dụng Phiếu quà tặng/ Mã giảm giá theo ngành hàng."
                        />
                        <p className="text-left">
                          Áp dụng Phiếu quà tặng/ Mã giảm giá theo ngành hàng.
                        </p>
                      </li>
                      <li className="!flex gap-[10px]">
                        <img
                          className="!h-[20px]"
                          width="20"
                          height="20"
                          src="//bizweb.dktcdn.net/100/505/077/themes/934930/assets/product_khuyen_mai2.png?1730865096645"
                          alt="Giảm giá 10% khi mua từ 5 sản phẩm trở lên."
                        />
                        <p className="text-left">
                          Giảm giá 10% khi mua từ 5 sản phẩm trở lên.
                        </p>
                      </li>
                      <li className="!flex gap-[10px]">
                        <img
                          className="!h-[20px]"
                          width="20"
                          height="20"
                          src="//bizweb.dktcdn.net/100/505/077/themes/934930/assets/product_khuyen_mai3.png?1730865096645"
                          alt="Tặng 100.000₫ mua hàng tại website thành viên Halu Cosmetics, áp dụng khi mua Online tại Hà Nội và 1 số khu vực khác."
                        />
                        <p className="text-left">
                          Tặng 100.000₫ mua hàng tại website thành viên Halu
                          Cosmetics, áp dụng khi mua Online tại Hà Nội và 1 số
                          khu vực khác.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="wrap-coupon_item">
                  {coupon.map((item, index) => (
                    <div key={index} className="coupon_item no-icon">
                      <div className="coupon_body">
                        <div className="coupon_head">
                          <h3 className="coupon_title">NHẬP MÃ: {item.code}</h3>
                          <div className="coupon_desc">
                            Mã giảm{" "}
                            {item.discount_type === "percentage"
                              ? `${item.discount_value}% `
                              : `${Number(item.discount_value).toLocaleString(
                                  "vi"
                                )}₫ `}
                            cho đơn hàng tối thiểu 500K
                          </div>
                        </div>
                        <div className="d-flex items-center flex-wrap justify-between">
                          <button
                            className="btn btn-main btn-sm coupon_copy"
                            onClick={() => handleCopy(item.code)}
                          >
                            <span>Sao chép mã</span>
                          </button>
                          <span className="coupon_info_toggle">
                            Điều kiện
                            <span className="tooltip-text">
                              Mã giảm{" "}
                              {item.discount_type === "percentage"
                                ? `${item.discount_value}% `
                                : `${Number(item.discount_value).toLocaleString(
                                    "vi"
                                  )}₫ `}
                              cho đơn hàng tối thiểu 500K cho đơn tối thiểu
                              500k. Mỗi khách hàng được sử dụng tối đa{" "}
                              {item.usage_limit} lần. Áp dụng từ{" "}
                              {new Date(item.start_date).toLocaleDateString(
                                "vi-VN"
                              )}{" "}
                              đến{" "}
                              {new Date(item.end_date).toLocaleDateString(
                                "vi-VN"
                              )}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="aside-item sticky-aside">
                  <div className="aside-title">
                    <h2 className="title-head margin-top-0">
                      <a href="san-pham-noi-bat" title="Có thể bạn sẽ thích">
                        <span>Có thể bạn sẽ thích</span>
                      </a>
                    </h2>
                  </div>

                  <div className="list-product-slidebar">
                    {bestsellproducts.map((product) => (
                      <div className="list-item" key={product.products_id}>
                        <div className="thumb-imagtes">
                          <div className="sale-flash">
                            <span>
                              -
                              {Math.round(
                                100 - (product.sale_price / product.price) * 100
                              )}
                              %
                            </span>
                          </div>
                          <a
                            href={`/product/${product.slug}`}
                            title={product.name}
                          >
                            <img
                              src={
                                product.images?.[0]?.url
                                  ? `${API_BASE_URL}/uploads/${product.images[0].url}`
                                  : "/default.jpg"
                              }
                              alt={
                                product.images?.[0]?.alt_text || product.name
                              }
                            />
                          </a>
                        </div>
                        <div className="product-info-text">
                          <h3 className="product-name">
                            <a
                              href={`/product/${product.slug}`}
                              title={product.name}
                            >
                              {product.name}
                            </a>
                          </h3>
                          <div className="price-box clearfix flex items-center !m-0 ">
                            <div className="special-price f-left">
                              <span className="price product-price !m-0">
                                {product.sale_price.toLocaleString()}₫
                              </span>
                            </div>

                            <div className="old-price">
                              <span className="price product-price-old">
                                {product.price.toLocaleString()}₫
                              </span>
                            </div>
                          </div>
                          <div
                            className="bizweb-product-reviews-badge"
                            data-id={product.products_id}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Nút mở sidebar (hiện trên mobile) */}
              <button
                onClick={toggleSidebar}
                className="open-filters block md:hidden fixed top-4 right-4 z-50 bg-white p-2 border rounded shadow"
              >
                <i className="fa fa-filter"></i>
              </button>

              {/* Sidebar – Trượt trên mobile, cố định desktop */}
              <div
                className={`bg-white  shadow-lg h-full z-40 overflow-y-auto transition-transform duration-300 ease-in-out 
          fixed top-0 w-[320px]
          md:relative md:translate-x-0 md:hidden
          ${
            showSidebar
              ? "translate-x-0 right-0"
              : "translate-x-full right-0 md:translate-x-0"
          }`}
              >
                {/* Nút đóng (chỉ mobile) */}
                <div className="text-right p-4 block md:hidden">
                  <button
                    onClick={toggleSidebar}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <i className="fa fa-times text-xl"></i>
                  </button>
                </div>

                {/* Nội dung sidebar */}
                <div className="sidebar-content">
                  <div className="sidebar left left-content ">
                    <div className="khuyen-mai">
                      <div className="title">
                        <img
                          width="64"
                          height="64"
                          src="//bizweb.dktcdn.net/100/505/077/themes/934930/assets/khuyen_mai_title.png?1730865096645"
                          alt="vouver"
                        />
                        <span>Khuyến mãi đặc biệt !!!</span>
                      </div>
                      <div className="content">
                        <ul>
                          <li className="!flex gap-[10px]">
                            <img
                              className="!h-[20px]"
                              width="20"
                              height="20"
                              src="//bizweb.dktcdn.net/100/505/077/themes/934930/assets/product_khuyen_mai1.png?1730865096645"
                              alt="Áp dụng Phiếu quà tặng/ Mã giảm giá theo ngành hàng."
                            />
                            <p className="text-left">
                              Áp dụng Phiếu quà tặng/ Mã giảm giá theo ngành
                              hàng.
                            </p>
                          </li>
                          <li className="!flex gap-[10px]">
                            <img
                              className="!h-[20px]"
                              width="20"
                              height="20"
                              src="//bizweb.dktcdn.net/100/505/077/themes/934930/assets/product_khuyen_mai2.png?1730865096645"
                              alt="Giảm giá 10% khi mua từ 5 sản phẩm trở lên."
                            />
                            <p className="text-left">
                              Giảm giá 10% khi mua từ 5 sản phẩm trở lên.
                            </p>
                          </li>
                          <li className="!flex gap-[10px]">
                            <img
                              className="!h-[20px]"
                              width="20"
                              height="20"
                              src="//bizweb.dktcdn.net/100/505/077/themes/934930/assets/product_khuyen_mai3.png?1730865096645"
                              alt="Tặng 100.000₫ mua hàng tại website thành viên Halu Cosmetics, áp dụng khi mua Online tại Hà Nội và 1 số khu vực khác."
                            />
                            <p className="text-left">
                              Tặng 100.000₫ mua hàng tại website thành viên Halu
                              Cosmetics, áp dụng khi mua Online tại Hà Nội và 1
                              số khu vực khác.
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="wrap-coupon_item">
                      {coupon.map((item, index) => (
                        <div key={index} className="coupon_item no-icon">
                          <div className="coupon_body">
                            <div className="coupon_head">
                              <h3 className="coupon_title">
                                NHẬP MÃ: {item.code}
                              </h3>
                              <div className="coupon_desc">
                                Mã giảm{" "}
                                {item.discount_type === "percentage"
                                  ? `${item.discount_value}% `
                                  : `${Number(
                                      item.discount_value
                                    ).toLocaleString("vi")}₫ `}
                                cho đơn hàng tối thiểu 500K
                              </div>
                            </div>
                            <div className="d-flex items-center flex-wrap justify-between">
                              <button
                                className="btn btn-main btn-sm coupon_copy"
                                onClick={() => handleCopy(item.code)}
                              >
                                <span>Sao chép mã</span>
                              </button>
                              <span className="coupon_info_toggle">
                                Điều kiện
                                <span className="tooltip-text">
                                  Mã giảm{" "}
                                  {item.discount_type === "percentage"
                                    ? `${item.discount_value}% `
                                    : `${Number(
                                        item.discount_value
                                      ).toLocaleString("vi")}₫ `}
                                  cho đơn hàng tối thiểu 500K cho đơn tối thiểu
                                  500k. Mỗi khách hàng được sử dụng tối đa{" "}
                                  {item.usage_limit} lần. Áp dụng từ{" "}
                                  {new Date(item.start_date).toLocaleDateString(
                                    "vi-VN"
                                  )}{" "}
                                  đến{" "}
                                  {new Date(item.end_date).toLocaleDateString(
                                    "vi-VN"
                                  )}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="aside-item sticky-aside">
                      <div className="aside-title">
                        <h2 className="title-head margin-top-0">
                          <a
                            href="san-pham-noi-bat"
                            title="Có thể bạn sẽ thích"
                          >
                            <span>Có thể bạn sẽ thích</span>
                          </a>
                        </h2>
                      </div>

                      <div className="list-product-slidebar">
                        {bestsellproducts.map((product) => (
                          <div className="list-item" key={product.products_id}>
                            <div className="thumb-imagtes">
                              <div className="sale-flash">
                                <span>
                                  -
                                  {Math.round(
                                    100 -
                                      (product.sale_price / product.price) * 100
                                  )}
                                  %
                                </span>
                              </div>
                              <a
                                href={`/product/${product.slug}`}
                                title={product.name}
                              >
                                <img
                                  src={
                                    product.images?.[0]?.url
                                      ? `${API_BASE_URL}/uploads/${product.images[0].url}`
                                      : "/default.jpg"
                                  }
                                  alt={
                                    product.images?.[0]?.alt_text ||
                                    product.name
                                  }
                                />
                              </a>
                            </div>
                            <div className="product-info-text">
                              <h3 className="product-name">
                                <a
                                  href={`/product${product.slug}`}
                                  title={product.name}
                                >
                                  {product.name}
                                </a>
                              </h3>
                              <div className="price-box clearfix flex items-center !m-0 ">
                                <div className="special-price f-left">
                                  <span className="price product-price !m-0">
                                    {product.sale_price.toLocaleString()}₫
                                  </span>
                                </div>

                                <div className="old-price">
                                  <span className="price product-price-old">
                                    {product.price.toLocaleString()}₫
                                  </span>
                                </div>
                              </div>
                              <div
                                className="bizweb-product-reviews-badge"
                                data-id={product.products_id}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* KHÔNG THAY ĐỔI phần nội dung gốc của bạn – giữ nguyên tất cả khuyến mãi, mã giảm giá và sản phẩm */}
                {/* Copy phần "div.sidebar left-content" của bạn vào đây như cũ */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
