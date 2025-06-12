"use client";
import "../css/product.css";
import { useState } from "react";
export default function Product() {
  const [isActive, setIsActive] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };
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
            <h2>Tất cả sản phẩm</h2>
          </div>
          <ul className="breadcrumb">
            <li className="home">
              <a href="/" title="Trang chủ">
                <span>Trang chủ</span>
              </a>
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </li>
            <li>
              <strong>
                <span>Tất cả sản phẩm</span>
              </strong>
            </li>
            <li></li>
          </ul>
        </div>
      </section>
      <main>
        <div className="container1">
          <div className="row">
            <div className="wrapper">
              <div className="col-lg-3 col-test">
                <aside className="aside-item collection-category">
                  <div className="aside-title">
                    <h2 className="title-head margin-top-0">
                      <span>Danh mục</span>
                    </h2>
                  </div>
                  <div className="categories-box">
                    <ul className="lv1">
                      <li className="nav-item nav-items">
                        <a href="/" title="Trang chủ">
                          {" "}
                          Trang chủ
                        </a>
                      </li>
                      <li className="nav-item nav-items">
                        <a href="/gioi-thieu" title="Giới thiệu">
                          {" "}
                          Giới thiệu
                        </a>
                      </li>
                      <li className="nav-item nav-items active">
                        <a
                          href="/collections/all"
                          className="nav-link"
                          title="Sản phẩm"
                        >
                          Sản phẩm
                        </a>
                      </li>
                      <li className="nav-item nav-items">
                        <a href="/tin-tuc" className="nav-link" title="Tin tức">
                          Tin tức
                        </a>
                      </li>
                      <li className="nav-item nav-items">
                        <a href="/lien-he" title="Liên hệ">
                          {" "}
                          Liên hệ
                        </a>
                      </li>
                      <li className="nav-item nav-items">
                        <a href="/he-thong-cua-hang" title="Hệ thống cửa hàng">
                          Hệ thống cửa hàng
                        </a>
                      </li>
                    </ul>
                  </div>
                </aside>
                <div className="aside-filter">
                  <div className="aside-title">
                    <h2 className="title-head margin-top-0">
                      <span>Bộ lọc</span>
                    </h2>
                  </div>
                  <div className="filter-container">
                    <aside className="aside-item filter-price">
                      <div className="module-title">
                        <h2 className="title-head margin-top-0">
                          <span>Giá sản phẩm</span>
                        </h2>
                      </div>
                      <div className="aside-content filter-group">
                        <ul>
                          <li className="filter-item filter-item--check-box filter-item--green">
                            <span>
                              <label>
                                <input
                                  type="checkbox"
                                  id="filter-duoi-100-000d"
                                  data-group="Khoảng giá"
                                  data-field="price_min"
                                  data-text="Dưới 100.000đ"
                                  value="(<100000)"
                                  data-operator="OR"
                                />
                                <i className="fa"></i>
                                Giá dưới 100.000đ
                              </label>
                            </span>
                          </li>
                          <li className="filter-item filter-item--check-box filter-item--green">
                            <span>
                              <label>
                                <input
                                  type="checkbox"
                                  id="filter-100-000d-200-000d"
                                  data-group="Khoảng giá"
                                  data-field="price_min"
                                  data-text="100.000đ - 200.000đ"
                                  value="(>=100000 AND <200000)"
                                  data-operator="OR"
                                />
                                <i className="fa"></i>
                                100.000đ - 200.000đ
                              </label>
                            </span>
                          </li>
                          <li className="filter-item filter-item--check-box filter-item--green">
                            <span>
                              <label>
                                <input
                                  type="checkbox"
                                  id="filter-200-000d-300-000d"
                                  data-group="Khoảng giá"
                                  data-field="price_min"
                                  data-text="200.000đ - 300.000đ"
                                  value="(>=200000 AND <300000)"
                                  data-operator="OR"
                                />
                                <i className="fa"></i>
                                200.000đ - 300.000đ
                              </label>
                            </span>
                          </li>
                          <li className="filter-item filter-item--check-box filter-item--green">
                            <span>
                              <label>
                                <input
                                  type="checkbox"
                                  id="filter-300-000d-500-000d"
                                  data-group="Khoảng giá"
                                  data-field="price_min"
                                  data-text="300.000đ - 500.000đ"
                                  value="(>=300000 AND <500000)"
                                  data-operator="OR"
                                />
                                <i className="fa"></i>
                                300.000đ - 500.000đ
                              </label>
                            </span>
                          </li>
                          <li className="filter-item filter-item--check-box filter-item--green">
                            <span>
                              <label>
                                <input
                                  type="checkbox"
                                  id="filter-500-000d-1-000-000d"
                                  data-group="Khoảng giá"
                                  data-field="price_min"
                                  data-text="500.000đ - 1.000.000đ"
                                  value="(>500000 AND <1000000)"
                                  data-operator="OR"
                                />
                                <i className="fa"></i>
                                500.000đ - 1.000.000đ
                              </label>
                            </span>
                          </li>
                          <li className="filter-item filter-item--check-box filter-item--green">
                            <span>
                              <label>
                                <input
                                  type="checkbox"
                                  id="filter-tren1-000-000d"
                                  data-group="Khoảng giá"
                                  data-field="price_min"
                                  data-text="Trên 1.000.000đ"
                                  value="(>1000000)"
                                  data-operator="OR"
                                />
                                <i className="fa"></i>
                                Giá trên 1.000.000đ
                              </label>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </aside>
                    <aside className="aside-item filter-type">
                      <div className="module-title">
                        <h2 className="title-head margin-top-0">
                          <span>Loại</span>
                        </h2>
                      </div>
                      <div className="aside-content filter-group">
                        <ul>
                          <li className="filter-item filter-item--check-box filter-item--green">
                            <span>
                              <label>
                                <input
                                  type="checkbox"
                                  id="filter-giay-nam"
                                  data-group="Loại"
                                  data-field="product_type"
                                  data-text="Giày Nam"
                                  value="(Giày Nam)"
                                  data-operator="OR"
                                />
                                <i className="fa"></i>
                                Giày Nam
                              </label>
                            </span>
                          </li>
                          <li className="filter-item filter-item--check-box filter-item--green">
                            <span>
                              <label>
                                <input
                                  type="checkbox"
                                  id="filter-giay-nu"
                                  data-group="Loại"
                                  data-field="product_type"
                                  data-text="Giày Nữ"
                                  value="(Giày Nữ)"
                                  data-operator="OR"
                                />
                                <i className="fa"></i>
                                Giày Nữ
                              </label>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </aside>
                    <aside className="aside-item filter-vendor">
                      <div className="module-title">
                        <h2 className="title-head margin-top-0">
                          <span>Thương hiệu</span>
                        </h2>
                      </div>
                      <div className="aside-content filter-group aside_vendor">
                        <ul>
                          <li className="filter-item filter-item--check-box filter-item--green">
                            <span>
                              <label className="label_relative">
                                <input type="checkbox" id="filter-nike-air" />
                                <i className="fa"></i>
                                <span className="filter_tt">Nike Air</span>
                              </label>
                            </span>
                          </li>
                          <li className="filter-item filter-item--check-box filter-item--green">
                            <span>
                              <label className="label_relative">
                                <input
                                  type="checkbox"
                                  id="filter-nike-air-max"
                                />
                                <i className="fa"></i>
                                <span className="filter_tt">Nike Air Max</span>
                              </label>
                            </span>
                          </li>
                          <li className="filter-item filter-item--check-box filter-item--green">
                            <span>
                              <label className="label_relative">
                                <input
                                  type="checkbox"
                                  id="filter-nike-jordan"
                                />
                                <i className="fa"></i>
                                <span className="filter_tt">Nike Jordan</span>
                              </label>
                            </span>
                          </li>
                          <li className="filter-item filter-item--check-box filter-item--green">
                            <span>
                              <label className="label_relative">
                                <input type="checkbox" id="filter-puma" />
                                <i className="fa"></i>
                                <span className="filter_tt">Puma</span>
                              </label>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </aside>
                  </div>
                </div>
                <aside className="aside-item hidden-767">
                  <div className="aside-content">
                    <a href="#" title="Thời trang nam">
                      <img
                        className="img-responsive center-block"
                        src="//bizweb.dktcdn.net/100/505/077/themes/934930/assets/aside_banner.png?1730865096645"
                        data-lazyload="//bizweb.dktcdn.net/100/505/077/themes/934930/assets/aside_banner.png?1730865096645"
                        alt="Thời trang nam"
                      />
                    </a>
                  </div>
                </aside>
              </div>
              <div className="main_container collection col-lg-9 col-md-9 col-md-push-3 col-lg-push-3">
                <div className="category-products products">
                  <div className="sortPagiBar">
                    <div className="row">
                      <div className="col-xs-5 col-md-6 col-sm-6">
                        <div className="hidden-xs">
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setViewMode("grid");
                            }}
                          >
                            <span
                              className={`btn button-view-mode view-mode-grid ${
                                viewMode === "grid" ? "active" : ""
                              }`}
                            >
                              <i className="fa fa-th" aria-hidden="true"></i>
                            </span>
                          </a>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setViewMode("list");
                            }}
                          >
                            <span
                              className={`btn button-view-mode view-mode-list ${
                                viewMode === "list" ? "active" : ""
                              }`}
                            >
                              <i
                                className="fa fa-th-list"
                                aria-hidden="true"
                              ></i>
                            </span>
                          </a>

                          <div className="tt hidden">
                            <div id="ttfix" className="hidden-sm hidden-xs">
                              Hiển thị <span>1</span> - <span>12</span> trong
                              tổng số <span></span> sản phẩm
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xs-12 col-md-6 col-sm-6 text-xs-left text-sm-right">
                        <div id="sort-by">
                          <label className="left">Sắp xếp: </label>
                          <ul>
                            <li>
                              <span className="val">Mặc định</span>
                              <ul className="ul_2">
                                <li>
                                  <a href="#">Mặc định</a>
                                </li>
                                <li>
                                  <a href="#">A → Z</a>
                                </li>
                                <li>
                                  <a href="#">Z → A</a>
                                </li>
                                <li>
                                  <a href="#">Giá tăng dần</a>
                                </li>
                                <li>
                                  <a href="#">Giá giảm dần</a>
                                </li>
                                <li>
                                  <a href="#">Hàng mới nhất</a>
                                </li>
                                <li>
                                  <a href="#">Hàng cũ nhất</a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {viewMode === "grid" && (
                  <div className="product-grid">
                    <div className="product-itemlist-main !block">
                      <div className="product-card" style={{ width: "238px" }}>
                        <div className="product-image">
                          <img
                            src="/images/products/chaybo/ConverseRunStarMotion.webp"
                            alt=""
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
                              <del>1.500.000đ </del>
                            </span>
                            <span className="new-price"> 1.200.000đ</span>
                          </div>
                           <div className="hot-product-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "87%" }}>
                      <span className="sold-info">Đã bán 87 sản phẩm</span>
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
                    <div className="product-itemlist-main !block">
                      <div className="product-card" style={{ width: "238px" }}>
                        <div className="product-image">
                          <img
                            src="/images/products/chaybo/ConverseRunStarMotion.webp"
                            alt=""
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
                            <span className="new-price">1.200.000đ</span>
                          </div>
                           <div className="hot-product-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "87%" }}>
                      <span className="sold-info">Đã bán 87 sản phẩm</span>
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
                    <div className="product-itemlist-main !block">
                      <div className="product-card" style={{ width: "238px" }}>
                        <div className="product-image">
                          <img
                            src="/images/products/chaybo/ConverseRunStarMotion.webp"
                            alt=""
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
                            <span className="new-price">1.200.000đ</span>
                          </div>
                              <div className="hot-product-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "87%" }}>
                      <span className="sold-info">Đã bán 87 sản phẩm</span>
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
                    <div className="product-itemlist-main !block">
                      <div className="product-card" style={{ width: "238px" }}>
                        <div className="product-image">
                          <img
                            src="/images/products/chaybo/ConverseRunStarMotion.webp"
                            alt=""
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
                            <span className="new-price">1.200.000đ</span>
                          </div>
                              <div className="hot-product-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "87%" }}>
                      <span className="sold-info">Đã bán 87 sản phẩm</span>
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
                  </div>
                )}
                {viewMode === "list" && (
                  <div className="product-grid-column">
                    <div className="product-itemlist-main">
                      <div
                        className="product-card"
                        style={{
                          width: "100%",
                          display: "flex",
                          background: "none",
                        }}
                      >
                        <div className="product-image">
                          <img
                            src="/images/products/chaybo/ConverseRunStarMotion.webp"
                            alt=""
                          />
                          <div className="product-icons">
                            <i className="fa-solid fa-heart always-show"></i>
                            <div className="hover-icons">
                              <i className="fa-solid fa-eye"></i>
                              <i className="fa-solid fa-list"></i>
                              <i className="fa fa-exchange"></i>
                            </div>
                          </div>
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
                        </div>
                        <div className="flex flex-col">
                          <span className="discount-tag">-20%</span>

                          <h4
                            className="product-title-column"
                            style={{ fontSize: "larger" }}
                          >
                            Giày Converse Run Star Motion
                          </h4>
                          <div className="product-price">
                            <span className="old-price">
                              <del>1.500.000đ</del>
                            </span>
                            <span className="new-price">1.200.000đ</span>
                          </div>
                          <p
                            style={{
                              margin: "10px 0 6px 10px",
                              fontSize: "14px",
                            }}
                          >
                            Giới thiệu đôi giày Nike Air Jordan 14 Retro - sự
                            kết hợp hoàn hảo giữa tốc độ vượt trội...
                          </p>
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
                  </div>
                )}
              </div>
            </div>
          </div>
       </div>
      </main>
      <div
        id="open-filters"
        className={isActive ? "move-left" : ""}
        onClick={toggleSidebar}
      >
        <i
          id="filter-icon"
          className={`fa ${isActive ? "fa-times" : "fa-filter"}`}
        ></i>
      </div>

      {/* <!-- Sidebar bộ lọc --> */}
      <div id="filter-sidebar" className={isActive ? "active" : ""}>
        <aside className="aside-item collection-category">
          <div className="aside-title">
            <h2 className="title-head margin-top-0">
              <span>Danh mục</span>
            </h2>
          </div>
          <div className="categories-box">
            <ul className="lv1">
              <li className="nav-item nav-items">
                <a href="/" title="Trang chủ">
                  {" "}
                  Trang chủ
                </a>
              </li>
              <li className="nav-item nav-items">
                <a href="/gioi-thieu" title="Giới thiệu">
                  {" "}
                  Giới thiệu
                </a>
              </li>
              <li className="nav-item nav-items active">
                <a
                  href="/collections/all"
                  className="nav-link"
                  title="Sản phẩm"
                >
                  Sản phẩm
                </a>
              </li>
              <li className="nav-item nav-items">
                <a href="/tin-tuc" className="nav-link" title="Tin tức">
                  Tin tức
                </a>
              </li>
              <li className="nav-item nav-items">
                <a href="/lien-he" title="Liên hệ">
                  {" "}
                  Liên hệ
                </a>
              </li>
              <li className="nav-item nav-items">
                <a href="/he-thong-cua-hang" title="Hệ thống cửa hàng">
                  Hệ thống cửa hàng
                </a>
              </li>
            </ul>
          </div>
        </aside>
        <div className="aside-filter">
          <div className="aside-title">
            <h2 className="title-head margin-top-0">
              <span>Bộ lọc</span>
            </h2>
          </div>
          <div className="filter-container">
            <aside className="aside-item filter-price">
              <div className="module-title">
                <h2 className="title-head margin-top-0">
                  <span>Giá sản phẩm</span>
                </h2>
              </div>
              <div className="aside-content filter-group">
                <ul>
                  <li className="filter-item filter-item--check-box filter-item--green">
                    <span>
                      <label>
                        <input
                          type="checkbox"
                          id="filter-duoi-100-000d"
                          data-group="Khoảng giá"
                          data-field="price_min"
                          data-text="Dưới 100.000đ"
                          value="(<100000)"
                          data-operator="OR"
                        />
                        <i className="fa"></i>
                        Giá dưới 100.000đ
                      </label>
                    </span>
                  </li>
                  <li className="filter-item filter-item--check-box filter-item--green">
                    <span>
                      <label>
                        <input
                          type="checkbox"
                          id="filter-100-000d-200-000d"
                          data-group="Khoảng giá"
                          data-field="price_min"
                          data-text="100.000đ - 200.000đ"
                          value="(>=100000 AND <200000)"
                          data-operator="OR"
                        />
                        <i className="fa"></i>
                        100.000đ - 200.000đ
                      </label>
                    </span>
                  </li>
                  <li className="filter-item filter-item--check-box filter-item--green">
                    <span>
                      <label>
                        <input
                          type="checkbox"
                          id="filter-200-000d-300-000d"
                          data-group="Khoảng giá"
                          data-field="price_min"
                          data-text="200.000đ - 300.000đ"
                          value="(>=200000 AND <300000)"
                          data-operator="OR"
                        />
                        <i className="fa"></i>
                        200.000đ - 300.000đ
                      </label>
                    </span>
                  </li>
                  <li className="filter-item filter-item--check-box filter-item--green">
                    <span>
                      <label>
                        <input
                          type="checkbox"
                          id="filter-300-000d-500-000d"
                          data-group="Khoảng giá"
                          data-field="price_min"
                          data-text="300.000đ - 500.000đ"
                          value="(>=300000 AND <500000)"
                          data-operator="OR"
                        />
                        <i className="fa"></i>
                        300.000đ - 500.000đ
                      </label>
                    </span>
                  </li>
                  <li className="filter-item filter-item--check-box filter-item--green">
                    <span>
                      <label>
                        <input
                          type="checkbox"
                          id="filter-500-000d-1-000-000d"
                          data-group="Khoảng giá"
                          data-field="price_min"
                          data-text="500.000đ - 1.000.000đ"
                          value="(>500000 AND <1000000)"
                          data-operator="OR"
                        />
                        <i className="fa"></i>
                        500.000đ - 1.000.000đ
                      </label>
                    </span>
                  </li>
                  <li className="filter-item filter-item--check-box filter-item--green">
                    <span>
                      <label>
                        <input
                          type="checkbox"
                          id="filter-tren1-000-000d"
                          data-group="Khoảng giá"
                          data-field="price_min"
                          data-text="Trên 1.000.000đ"
                          value="(>1000000)"
                          data-operator="OR"
                        />
                        <i className="fa"></i>
                        Giá trên 1.000.000đ
                      </label>
                    </span>
                  </li>
                </ul>
              </div>
            </aside>
            <aside className="aside-item filter-type">
              <div className="module-title">
                <h2 className="title-head margin-top-0">
                  <span>Loại</span>
                </h2>
              </div>
              <div className="aside-content filter-group">
                <ul>
                  <li className="filter-item filter-item--check-box filter-item--green">
                    <span>
                      <label>
                        <input
                          type="checkbox"
                          id="filter-giay-nam"
                          data-group="Loại"
                          data-field="product_type"
                          data-text="Giày Nam"
                          value="(Giày Nam)"
                          data-operator="OR"
                        />
                        <i className="fa"></i>
                        Giày Nam
                      </label>
                    </span>
                  </li>
                  <li className="filter-item filter-item--check-box filter-item--green">
                    <span>
                      <label>
                        <input
                          type="checkbox"
                          id="filter-giay-nu"
                          data-group="Loại"
                          data-field="product_type"
                          data-text="Giày Nữ"
                          value="(Giày Nữ)"
                          data-operator="OR"
                        />
                        <i className="fa"></i>
                        Giày Nữ
                      </label>
                    </span>
                  </li>
                </ul>
              </div>
            </aside>
            <aside className="aside-item filter-vendor">
              <div className="module-title">
                <h2 className="title-head margin-top-0">
                  <span>Thương hiệu</span>
                </h2>
              </div>
              <div className="aside-content filter-group aside_vendor">
                <ul>
                  <li className="filter-item filter-item--check-box filter-item--green">
                    <span>
                      <label className="label_relative">
                        <input type="checkbox" id="filter-nike-air" />
                        <i className="fa"></i>
                        <span className="filter_tt">Nike Air</span>
                      </label>
                    </span>
                  </li>
                  <li className="filter-item filter-item--check-box filter-item--green">
                    <span>
                      <label className="label_relative">
                        <input type="checkbox" id="filter-nike-air-max" />
                        <i className="fa"></i>
                        <span className="filter_tt">Nike Air Max</span>
                      </label>
                    </span>
                  </li>
                  <li className="filter-item filter-item--check-box filter-item--green">
                    <span>
                      <label className="label_relative">
                        <input type="checkbox" id="filter-nike-jordan" />
                        <i className="fa"></i>
                        <span className="filter_tt">Nike Jordan</span>
                      </label>
                    </span>
                  </li>
                  <li className="filter-item filter-item--check-box filter-item--green">
                    <span>
                      <label className="label_relative">
                        <input type="checkbox" id="filter-puma" />
                        <i className="fa"></i>
                        <span className="filter_tt">Puma</span>
                      </label>
                    </span>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
        <aside className="aside-item hidden-767">
          <div className="aside-content">
            <a href="#" title="Thời trang nam">
              <img
                className="img-responsive center-block"
                src="/images/banner/aside_banner.webp"
                data-lazyload="/images/banner/aside_banner.webp"
                alt="Thời trang nam"
              />
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
