"use client";
import "../css/product.css";
import "../css/wishlist.css";
export default function Wishlist() {
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
            <h2>Sản phẩm yêu thích</h2>
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
                <span>Sản phẩm yêu thích</span>
              </strong>
            </li>
            <li></li>
          </ul>
        </div>
      </section>
      <main>
        <div className="container1">
          <div className="row">
            <div className="product-grid-wishlist">
              <div className="product-itemlist-main !block ">
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
                <i className="fa fa-shopping-bag position-relative"></i>
                        <i className="fa fa-exchange"></i>
                      </div>
                    </div>

                    <span className="discount-tag">-20%</span>

                    <div className="product-colors">
                      <span
                        className="color blue"
                        data-color="Xanh dương"
                      ></span>
                      <span className="color green" data-color="Xanh lá"></span>
                      <span className="color pink" data-color="Hồng"></span>
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
              <div className="product-itemlist-main !block ">
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
                <i className="fa fa-shopping-bag position-relative"></i>
                        <i className="fa fa-exchange"></i>
                      </div>
                    </div>

                    <span className="discount-tag">-20%</span>

                    <div className="product-colors">
                      <span
                        className="color blue"
                        data-color="Xanh dương"
                      ></span>
                      <span className="color green" data-color="Xanh lá"></span>
                      <span className="color pink" data-color="Hồng"></span>
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
              <div className="product-itemlist-main !block ">
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
                <i className="fa fa-shopping-bag position-relative"></i>
                        <i className="fa fa-exchange"></i>
                      </div>
                    </div>

                    <span className="discount-tag">-20%</span>

                    <div className="product-colors">
                      <span
                        className="color blue"
                        data-color="Xanh dương"
                      ></span>
                      <span className="color green" data-color="Xanh lá"></span>
                      <span className="color pink" data-color="Hồng"></span>
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
              <div className="product-itemlist-main !block ">
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
                <i className="fa fa-shopping-bag position-relative"></i>
                       <i className="fa fa-exchange"></i>
                      </div>
                    </div>

                    <span className="discount-tag">-20%</span>

                    <div className="product-colors">
                      <span
                        className="color blue"
                        data-color="Xanh dương"
                      ></span>
                      <span className="color green" data-color="Xanh lá"></span>
                      <span className="color pink" data-color="Hồng"></span>
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
            <div className="product-grid-wishlist-list">
              <div className="product-itemlist-main !flex ">
                <div className="product-card">
                  <div className="product-image">
                    <img
                      src="/images/products/chaybo/ConverseRunStarMotion.webp"
                      alt=""
                    />
                    <div className="product-icons">
                      <i className="fa-solid fa-heart always-show"></i>
                      <div className="hover-icons">
                        <i className="fa-solid fa-eye"></i>
                <i className="fa fa-shopping-bag position-relative"></i>
                        <i className="fa fa-shopping-bag position-relative"></i>
                      </div>
                    </div>

                    <span className="discount-tag">-20%</span>
                  </div>
                </div>
                <div className="product-content w-full">
                  <h4 className="product-title">
                    Giày Converse Run Star Motion
                  </h4>
                  <div className="product-price">
                    <span className="old-price">
                      <del>1.500.000đ</del>
                    </span>
                    <span className="new-price">1.200.000đ</span>
                  </div>
                  <div className="product-colors">
                    <span className="color blue" data-color="Xanh dương"></span>
                    <span className="color green" data-color="Xanh lá"></span>
                    <span className="color pink" data-color="Hồng"></span>
                  </div>

                  <div className="product-rating">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                  </div>
                  <div className="buton !pl-[10px]">
                    <button
                      style={{
                        backgroundColor: "#ff4d4f",
                        color: "#fff",
                        padding: "5px 10px",
                        fontSize: "13px",
                        border: "none",
                        borderRadius: "6px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = "#e03e3f")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "#ff4d4f")
                      }
                      type="submit"
                    >
                      Mua ngay
                    </button>
                  </div>
                </div>
              </div>
              <div className="product-itemlist-main !flex ">
                <div className="product-card">
                  <div className="product-image">
                    <img
                      src="/images/products/chaybo/ConverseRunStarMotion.webp"
                      alt=""
                    />
                    <div className="product-icons">
                      <i className="fa-solid fa-heart always-show"></i>
                      <div className="hover-icons">
                        <i className="fa-solid fa-eye"></i>
                <i className="fa fa-shopping-bag position-relative"></i>
                        <i className="fa fa-exchange"></i>
                      </div>
                    </div>

                    <span className="discount-tag">-20%</span>
                  </div>
                </div>
                <div className="product-content w-full">
                  <div className="product-colors">
                    <span className="color blue" data-color="Xanh dương"></span>
                    <span className="color green" data-color="Xanh lá"></span>
                    <span className="color pink" data-color="Hồng"></span>
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

                  <div className="product-rating">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                  </div>
                </div>
              </div>
              <div className="product-itemlist-main !flex ">
                <div className="product-card">
                  <div className="product-image">
                    <img
                      src="/images/products/chaybo/ConverseRunStarMotion.webp"
                      alt=""
                    />
                    <div className="product-icons">
                      <i className="fa-solid fa-heart always-show"></i>
                      <div className="hover-icons">
                        <i className="fa-solid fa-eye"></i>
                <i className="fa fa-shopping-bag position-relative"></i>
                        <i className="fa fa-exchange"></i>
                      </div>
                    </div>

                    <span className="discount-tag">-20%</span>
                  </div>
                </div>
                <div className="product-content w-full">
                  <div className="product-colors">
                    <span className="color blue" data-color="Xanh dương"></span>
                    <span className="color green" data-color="Xanh lá"></span>
                    <span className="color pink" data-color="Hồng"></span>
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
        </div>
      </main>
    </>
  );
}
