"use client";
import "../../css/detail.css";
import "../../css/style.css";
import { IProduct } from "@/types/product";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getProductDetail } from "@/services/productService";
import RelatedProductList from "../../component/RelatedProductList";
export default function Detail() {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const [activeTab, setActiveTab] = useState("tab-1");

  useEffect(() => {
    const param = params.param;

    if (!param) return;

    // param có thể là string hoặc string[]
    const paramStr = Array.isArray(param) ? param[0] : param;

    if (typeof paramStr !== "string") return;

    const [idStr, ...slugParts] = paramStr.split("-");
    const id = Number(idStr);
    const slug = slugParts.join("-");

    if (isNaN(id) || !slug) {
      console.warn("URL không hợp lệ:", paramStr);
      setProduct(null);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      const found = await getProductDetail({ id, slug });
      setProduct(found || null);
      setLoading(false);
    };

    fetchData();
  }, [params]);

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
                      <div className="large-image">
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
                                src={
                                  product.images?.[0]?.url ||
                                  "/images/placeholder.png"
                                }
                                alt={product.name}
                                style={{ position: "absolute" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tns-outer">
                        <div className="tns-ovh">
                          <div id="id_tiny_0-iw" className="tns-inner">
                            {product.images?.map((img, index) => (
                              <div
                                key={index}
                                className="space-item-tsn tns-item tns-slide-active"
                              >
                                <div className="item">
                                  <img
                                    src={img.url}
                                    className="img-responsive"
                                    alt={img.alt_text || product.name}
                                  />
                                </div>
                              </div>
                            ))}
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
                        EXPIRED
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
                          {product.status === "active"
                            ? "Còn hàng"
                            : "Hết hàng"}
                        </p>
                      </div>
                      <div className="price-box clearfix">
                        <span className="special-price">
                          <span className="price product-price">
                            {product.sale_price?.toLocaleString()}₫
                          </span>
                        </span>
                        <span className="old-price">
                          <del className="price product-price-old">
                            {product.price?.toLocaleString()}₫
                          </del>
                        </span>
                      </div>
                    </div>
                    <div className="form-product">
                      <div className="swatch-color swatch clearfix">
                        <div className="header posintion-fixed">Màu sắc</div>
                        <div className="color-options">
                          {[
                            ...new Map(
                              product.variants.map((v) => [v.color.id, v.color])
                            ).values(),
                          ].map((color) => (
                            <div
                              key={color.id}
                              className="color-circle"
                              style={{
                                backgroundColor: color.code_color,
                                width: 24,
                                height: 24,
                                borderRadius: "50%",
                                border: "1px solid #ccc",
                              }}
                            ></div>
                          ))}
                        </div>
                      </div>

                      <div className="form-group form-groupx">
                        <div className="custom custom-btn-number form-control">
                          <span className="quantity-span hidden">
                            Số lượng:
                          </span>
                          <span className="qtyminus" data-field="quantity">
                            -
                          </span>
                          <input
                            type="text"
                            className="input-text qty"
                            maxLength={3}
                            data-field="quantity"
                            defaultValue="1"
                            id="qty"
                            name="quantity"
                          />
                          <span className="qtyplus" data-field="quantity">
                            +
                          </span>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-lg btn-gray btn-cart btn_buy add_to_cart"
                          title="Mua ngay"
                        >
                          <span className="txt-main">Mua ngay</span>
                        </button>
                      </div>

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
                          <p>
                            Giới thiệu đôi giày Nike Air Jordan 14 Retro - sự
                            kết hợp hoàn hảo giữa tốc độ vượt trội và phong cách
                            đẳng cấp. Đôi giày sneaker này sở hữu gam màu Light
                            Ginger, Trắng và Đen tạo nên vẻ ngoài táo bạo và độc
                            đáo, thu hút sự chú ý bất kỳ nơi nào bạn đến.
                          </p>
                          <p>
                            Được chế tạo với tinh tế và sự chú ý đến từng chi
                            tiết, đôi giày này có phần trên màu da lộn màu vàng
                            với điểm nhấn màu đen, tạo thêm độ sâu và sự tinh tế
                            cho thiết kế. Đế trắng không chỉ phù hợp với gam màu
                            mà còn mang lại độ bám và độ bền vượt trội.
                          </p>
                          <p>
                            Thiết kế cho sự thoải mái tối đa, Nike Air Jordan 14
                            Retro tích hợp công nghệ đệm khí Air của Nike, mang
                            đến sự đàn hồi và êm ái mỗi bước đi. Gối đệm cổ chân
                            và lưỡi gà đệm cung cấp sự hỗ trợ bổ sung cho mắt cá
                            chân và giữ chân vững chắc, an toàn.
                          </p>
                          <p>
                            Cho dù bạn đang đi dạo trên phố hay thi đấu trên sân
                            bóng rổ, đôi giày này được thiết kế để biểu diễn.
                            Vật liệu nhẹ và thoáng khí giúp giữ cho đôi chân mát
                            mẻ và khô ráo, trong khi chất liệu chắc chắn có thể
                            chịu đựng những hoạt động gay gắt.
                          </p>
                          <p>
                            Nổi bật khác biệt và thể hiện phong cách độc đáo của
                            bạn với đôi giày Nike Air Jordan 14 Retro. Sở hữu
                            ngay đôi giày này và trải nghiệm sự kết hợp hoàn hảo
                            giữa thời trang và tính năng.
                          </p>
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
                                fill={i < 4 ? "#facc15" : "#d1d5db"}
                                viewBox="0 0 16 16"
                              >
                                <path d="M3.612 15.443c-.396.198-.824-.149-.746-.592l.83-4.73-3.523-3.356c-.329-.314-.158-.888.283-.95l4.898-.696 2.184-4.327c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.35.79-.746.592L8 13.187l-4.389 2.256z" />
                              </svg>
                            ))}
                            <span className="text-sm text-gray-500">
                              (4.0 / 5)
                            </span>
                          </div>

                          <div className="space-y-4">
                            <div className="!p-3 border rounded shadow-sm bg-white !mb-[15px]">
                              <div className="flex items-center gap-2 !mb-1">
                                <strong className="text-sm">
                                  Nguyễn Văn A
                                </strong>
                                <div className="flex gap-0.5">
                                  {[...Array(5)].map((_, i) => (
                                    <svg
                                      key={i}
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="14"
                                      height="14"
                                      fill="#facc15"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M3.612 15.443c-.396.198-.824-.149-.746-.592l.83-4.73-3.523-3.356c-.329-.314-.158-.888.283-.95l4.898-.696 2.184-4.327c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.35.79-.746.592L8 13.187l-4.389 2.256z" />
                                    </svg>
                                  ))}
                                </div>
                              </div>
                              <p className="text-sm text-gray-700">
                                Giày đẹp, mang êm, đóng gói chắc chắn. Sẽ ủng hộ
                                tiếp!
                              </p>
                            </div>

                            <div className="!p-3 border rounded shadow-sm bg-white !mb-[15px]">
                              <div className="flex items-center gap-2 !mb-1">
                                <strong className="text-sm">Trần Thị B</strong>
                                <div className="flex gap-0.5">
                                  {[...Array(4)].map((_, i) => (
                                    <svg
                                      key={i}
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="14"
                                      height="14"
                                      fill="#facc15"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M3.612 15.443c-.396.198-.824-.149-.746-.592l.83-4.73-3.523-3.356c-.329-.314-.158-.888.283-.95l4.898-.696 2.184-4.327c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.35.79-.746.592L8 13.187l-4.389 2.256z" />
                                    </svg>
                                  ))}
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    fill="#d1d5db"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.396.198-.824-.149-.746-.592l.83-4.73-3.523-3.356c-.329-.314-.158-.888.283-.95l4.898-.696 2.184-4.327c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.35.79-.746.592L8 13.187l-4.389 2.256z" />
                                  </svg>
                                </div>
                              </div>
                              <p className="text-sm text-gray-700">
                                Hàng đẹp nhưng giao hơi chậm. Chất lượng ổn áp.
                              </p>
                            </div>
                          </div>
                          <div className="!mt-6 !p-4 border rounded-lg bg-white shadow-sm space-y-3">
                            <h4 className="text-lg font-semibold mb-2">
                              Viết đánh giá của bạn
                            </h4>

                            <div>
                              <label className="block text-sm font-medium !mb-1">
                                Tên của bạn
                              </label>
                              <input
                                type="text"
                                placeholder="Nhập tên..."
                                className="!w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium !mb-1">
                                Số sao
                              </label>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    type="button"
                                    className="text-yellow-400 text-xl hover:scale-110 transition-transform"
                                    onClick={() =>
                                      console.log(`Chọn sao: ${star}`)
                                    }
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
                                rows={4}
                                className="!w-full border border-gray-300 rounded !px-3 !py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 !mb-[15px]"
                              ></textarea>
                            </div>

                            <button className="!px-4 !py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
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

                <RelatedProductList categoryId={10} />
              </div>
              <div className="sidebar left left-content col-lg-3 col-md-3">
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
                      <li>
                        <img
                          width="20"
                          height="20"
                          src="//bizweb.dktcdn.net/100/505/077/themes/934930/assets/product_khuyen_mai1.png?1730865096645"
                          alt="Áp dụng Phiếu quà tặng/ Mã giảm giá theo ngành hàng."
                        />
                        <p>
                          Áp dụng Phiếu quà tặng/ Mã giảm giá theo ngành hàng.
                        </p>
                      </li>
                      <li>
                        <img
                          width="20"
                          height="20"
                          src="//bizweb.dktcdn.net/100/505/077/themes/934930/assets/product_khuyen_mai2.png?1730865096645"
                          alt="Giảm giá 10% khi mua từ 5 sản phẩm trở lên."
                        />
                        Giảm giá 10% khi mua từ 5 sản phẩm trở lên.
                      </li>
                      <li>
                        <img
                          width="20"
                          height="20"
                          src="//bizweb.dktcdn.net/100/505/077/themes/934930/assets/product_khuyen_mai3.png?1730865096645"
                          alt="Tặng 100.000₫ mua hàng tại website thành viên Halu Cosmetics, áp dụng khi mua Online tại Hà Nội và 1 số khu vực khác."
                        />
                        Tặng 100.000₫ mua hàng tại website thành viên Halu
                        Cosmetics, áp dụng khi mua Online tại Hà Nội và 1 số khu
                        vực khác.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="wrap-coupon_item">
                  <div className="coupon_item no-icon">
                    <div className="coupon_body">
                      <div className="coupon_head">
                        <h3 className="coupon_title">NHẬP MÃ: HLU10</h3>
                        <div className="coupon_desc">
                          Mã giảm 10% cho đơn hàng tối thiểu 500k.
                        </div>
                      </div>
                      <div className="d-flex items-center flex-wrap justify-between">
                        <button
                          className="btn btn-main btn-sm coupon_copy"
                          data-ega-coupon="HLU10"
                        >
                          <span>Sao chép mã</span>
                        </button>

                        <span
                          className="coupon_info_toggle"
                          data-toggle="tooltip"
                          title=""
                          data-original-title="Mã giảm 10% cho đơn tối thiểu 500k. Mỗi khách hàng được sử dụng tối đa 1 lần."
                        >
                          Điều kiện
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="coupon_item no-icon">
                    <div className="coupon_body">
                      <div className="coupon_head">
                        <h3 className="coupon_title">NHẬP MÃ: HLU15</h3>
                        <div className="coupon_desc">
                          Mã giảm 15% cho đơn hàng tối thiểu 700k.
                        </div>
                      </div>
                      <div className="d-flex items-center flex-wrap justify-between">
                        <button
                          className="btn btn-main btn-sm coupon_copy"
                          data-ega-coupon="HLU15"
                        >
                          <span>Sao chép mã</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="coupon_item no-icon">
                    <div className="coupon_body">
                      <div className="coupon_head">
                        <h3 className="coupon_title">NHẬP MÃ: HLU99K</h3>
                        <div className="coupon_desc">
                          Mã giảm 99k cho đơn hàng tối thiểu 600k.
                        </div>
                      </div>
                      <div className="d-flex items-center flex-wrap justify-between">
                        <button
                          className="btn btn-main btn-sm coupon_copy"
                          data-ega-coupon="HLU99K"
                        >
                          <span>Sao chép mã</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="coupon_item no-icon">
                    <div className="coupon_body">
                      <div className="coupon_head">
                        <h3 className="coupon_title">NHẬP MÃ: FREESHIP</h3>
                        <div className="coupon_desc">
                          Miễn phí vận chuyển cho đơn tối thiểu 500k.
                        </div>
                      </div>
                      <div className="d-flex items-center flex-wrap justify-between">
                        <button
                          className="btn btn-main btn-sm coupon_copy"
                          data-ega-coupon="HLUF03"
                        >
                          <span>Sao chép mã</span>
                        </button>
                      </div>
                    </div>
                  </div>
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
                    <div className="list-item">
                      <div className="thumb-imagtes">
                        <div className="sale-flash">
                          <span> 29% </span>
                        </div>
                        <a
                          href="/giay-nam-jordan-max-aura"
                          title="Giày Nam Jordan Max Aura"
                        >
                          <img
                            src="//bizweb.dktcdn.net/thumb/large/100/505/077/products/layer18cde9e508ba14790a6210491.jpg?v=1702350243257"
                            alt="Giày Nam Jordan Max Aura"
                          />
                        </a>
                      </div>
                      <div className="product-info-text">
                        <h3 className="product-name">
                          <a
                            href="/giay-nam-jordan-max-aura"
                            title="Giày Nam Jordan Max Aura"
                          >
                            Giày Nam Jordan Max Aura
                          </a>
                        </h3>
                        <div className="price-box clearfix">
                          <div className="special-price f-left">
                            <span className="price product-price">
                              3.200.000₫
                            </span>
                          </div>

                          <div className="old-price">
                            <span className="price product-price-old">
                              4.500.000₫
                            </span>
                          </div>
                        </div>
                        <div
                          className="bizweb-product-reviews-badge"
                          data-id="33845406"
                        ></div>
                      </div>
                    </div>
                    <div className="list-item">
                      <div className="thumb-imagtes">
                        <div className="sale-flash">
                          <span> 29% </span>
                        </div>
                        <a
                          href="/giay-nam-nike-air-max"
                          title="Giày Nam Nike Air Max"
                        >
                          <img
                            src="//bizweb.dktcdn.net/thumb/large/100/505/077/products/layer1d87b62817a694e059205f86f.jpg?v=1702350240540"
                            alt="Giày Nam Nike Air Max"
                          />
                        </a>
                      </div>
                      <div className="product-info-text">
                        <h3 className="product-name">
                          <a
                            href="/giay-nam-nike-air-max"
                            title="Giày Nam Nike Air Max"
                          >
                            Giày Nam Nike Air Max
                          </a>
                        </h3>

                        <div className="price-box clearfix">
                          <div className="special-price f-left">
                            <span className="price product-price">
                              3.200.000₫
                            </span>
                          </div>

                          <div className="old-price">
                            <span className="price product-price-old">
                              4.500.000₫
                            </span>
                          </div>
                        </div>
                        <div
                          className="bizweb-product-reviews-badge"
                          data-id="33845403"
                        ></div>
                      </div>
                    </div>
                    <div className="list-item">
                      <div className="thumb-imagtes">
                        <div className="sale-flash">
                          <span> 33% </span>
                        </div>
                        <a
                          href="/nike-air-max-97-se"
                          title="Nike Air Max 97 SE"
                        >
                          <img
                            src="//bizweb.dktcdn.net/thumb/large/100/505/077/products/layer112344afd2dbe4842b4562af5.jpg?v=1702350247140"
                            alt="Nike Air Max 97 SE"
                          />
                        </a>
                      </div>
                      <div className="product-info-text">
                        <h3 className="product-name">
                          <a
                            href="/nike-air-max-97-se"
                            title="Nike Air Max 97 SE"
                          >
                            Nike Air Max 97 SE
                          </a>
                        </h3>

                        <div className="price-box clearfix">
                          <div className="special-price f-left">
                            <span className="price product-price">
                              2.800.000₫
                            </span>
                          </div>

                          <div className="old-price">
                            <span className="price product-price-old">
                              4.200.000₫
                            </span>
                          </div>
                        </div>
                        <div
                          className="bizweb-product-reviews-badge"
                          data-id="33845409"
                        ></div>
                      </div>
                    </div>
                    <div className="list-item">
                      <div className="thumb-imagtes">
                        <div className="sale-flash">
                          <span> 49% </span>
                        </div>

                        <a
                          href="/neumel-graybrown-snow"
                          title="Neumel GRAYBROWN Snow"
                        >
                          <img
                            src="//bizweb.dktcdn.net/thumb/large/100/505/077/products/layer16fd25363242141afa734215a.jpg?v=1702350246057"
                            alt="Neumel GRAYBROWN Snow"
                          />
                        </a>
                      </div>
                      <div className="product-info-text">
                        <h3 className="product-name">
                          <a
                            href="/neumel-graybrown-snow"
                            title="Neumel GRAYBROWN Snow"
                          >
                            Neumel GRAYBROWN Snow
                          </a>
                        </h3>

                        <div className="price-box clearfix">
                          <div className="special-price f-left">
                            <span className="price product-price">
                              1.800.000₫
                            </span>
                          </div>

                          <div className="old-price">
                            <span className="price product-price-old">
                              3.500.000₫
                            </span>
                          </div>
                        </div>

                        <div
                          className="bizweb-product-reviews-badge"
                          data-id="33845408"
                        ></div>
                      </div>
                    </div>
                    <div className="list-item">
                      <div className="thumb-imagtes">
                        <div className="sale-flash">
                          <span> 31% </span>
                        </div>
                        <a
                          href="/luka-doncic-x-air-jordan"
                          title="Luka Doncic X Air Jordan"
                        >
                          <img
                            src="//bizweb.dktcdn.net/thumb/large/100/505/077/products/layer151495a72fe124744a7784900.jpg?v=1702350244227"
                            alt="Luka Doncic X Air Jordan"
                          />
                        </a>
                      </div>
                      <div className="product-info-text">
                        <h3 className="product-name">
                          <a
                            href="/luka-doncic-x-air-jordan"
                            title="Luka Doncic X Air Jordan"
                          >
                            Luka Doncic X Air Jordan
                          </a>
                        </h3>

                        <div className="price-box clearfix">
                          <div className="special-price f-left">
                            <span className="price product-price">
                              3.800.000₫
                            </span>
                          </div>

                          <div className="old-price">
                            <span className="price product-price-old">
                              5.500.000₫
                            </span>
                          </div>
                        </div>

                        <div
                          className="bizweb-product-reviews-badge"
                          data-id="33845407"
                        ></div>
                      </div>
                    </div>
                    <div className="list-item">
                      <div className="thumb-imagtes">
                        <div className="sale-flash">
                          <span> 24% </span>
                        </div>

                        <a
                          href="/converse-run-star-motion"
                          title="Converse Run Star Motion"
                        >
                          <img
                            src="//bizweb.dktcdn.net/thumb/large/100/505/077/products/layer14b0efb7df8bd4723b20e7237.jpg?v=1702350242283"
                            alt="Converse Run Star Motion"
                          />
                        </a>
                      </div>
                      <div className="product-info-text">
                        <h3 className="product-name">
                          <a
                            href="/converse-run-star-motion"
                            title="Converse Run Star Motion"
                          >
                            Converse Run Star Motion
                          </a>
                        </h3>

                        <div className="price-box clearfix">
                          <div className="special-price f-left">
                            <span className="price product-price">
                              4.200.000₫
                            </span>
                          </div>

                          <div className="old-price">
                            <span className="price product-price-old">
                              5.500.000₫
                            </span>
                          </div>
                        </div>

                        <div
                          className="bizweb-product-reviews-badge"
                          data-id="33845404"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
