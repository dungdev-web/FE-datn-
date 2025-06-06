"use client";
import "../css/product.css";
import "../css/home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation,Pagination  } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";

export default function Show2sanpham() {
  return (
    <>
      <div className="w-[47%] float-left box-container">
        <div className="content">
          <h3>Hàng order</h3>
          <p>Xem tất cả <i className="fa-solid fa-angles-right"></i></p>
        </div>
        <div className="flex  w-[100%]  ">
          <div className="images">
            <img
              src="https://file.hstatic.net/200000581855/file/1_5d0aee5d42d245f395b3bfbc9d46e9f3.png"
              alt=""
            />
          </div>
          <Swiper
            modules={[Navigation,Pagination]}
            spaceBetween={3}
            slidesPerView={2}
            loop={true}
            navigation
            pagination={{ clickable: true,dynamicBullets: true  }}
            breakpoints={{
              0: {
                slidesPerView: 2,
              },
              576: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 2,
              },
              992: {
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
                      <span className="new-price"> 1.200.000đ</span>
                    </div>
                    <div className="product-progress">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: "87%" }}>
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
                      <span className="new-price"> 1.200.000đ</span>
                    </div>
                    <div className="product-progress">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: "87%" }}>
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
            </SwiperSlide>{" "}
            <SwiperSlide>
              <div className="product-itemlist-main">
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
                      <span className="new-price"> 1.200.000đ</span>
                    </div>
                    <div className="product-progress">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: "87%" }}>
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
            </SwiperSlide>{" "}
            <SwiperSlide>
              <div className="product-itemlist-main">
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
                      <span className="new-price"> 1.200.000đ</span>
                    </div>
                    <div className="product-progress">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: "87%" }}>
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
                      <span className="new-price"> 1.200.000đ</span>
                    </div>
                    <div className="product-progress">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: "87%" }}>
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
      <div className="w-[47%] float-left box-container">
        <div className="content">
          <h3>Hàng order</h3>
          <p>Xem tất cả <i className="fa-solid fa-angles-right"></i></p>
        </div>
        <div className="flex  w-[100%]  ">
          <div className="images">
            <img
              src="https://file.hstatic.net/200000581855/file/1_5d0aee5d42d245f395b3bfbc9d46e9f3.png"
              alt=""
            />
          </div>
          <Swiper
            modules={[Navigation,Pagination]}
            spaceBetween={3}
            slidesPerView={2}
            loop={true}
            navigation
            pagination={{ clickable: true,dynamicBullets: true  }}
            breakpoints={{
              0: {
                slidesPerView: 2,
              },
              576: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 2,
              },
              992: {
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
                      <span className="new-price"> 1.200.000đ</span>
                    </div>
                    <div className="product-progress">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: "87%" }}>
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
                      <span className="new-price"> 1.200.000đ</span>
                    </div>
                    <div className="product-progress">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: "87%" }}>
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
            </SwiperSlide>{" "}
            <SwiperSlide>
              <div className="product-itemlist-main">
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
                      <span className="new-price"> 1.200.000đ</span>
                    </div>
                    <div className="product-progress">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: "87%" }}>
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
            </SwiperSlide>{" "}
            <SwiperSlide>
              <div className="product-itemlist-main">
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
                      <span className="new-price"> 1.200.000đ</span>
                    </div>
                    <div className="product-progress">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: "87%" }}>
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
                      <span className="new-price"> 1.200.000đ</span>
                    </div>
                    <div className="product-progress">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: "87%" }}>
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
    </>
  );
}
