import "../css/product.css";
import "../css/home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
export default function ProductSale() {
  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={10}
      slidesPerView={2}
      loop={true}
      navigation
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
        }
      }}
      className="product-slider-track"
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
              <span className="new-tag">
                <img src="/images/logo/title_image_1_tag.webp" alt="" />
                Mới
              </span>
              <div className="product-colors">
                <span className="color blue" data-color="Xanh dương"></span>
                <span className="color green" data-color="Xanh lá"></span>
                <span className="color pink" data-color="Hồng"></span>
              </div>

              <h4 className="product-title">Giày Converse Run Star Motion</h4>
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
              <span className="new-tag">
                <img src="/images/logo/title_image_1_tag.webp" alt="" />
                Mới
              </span>
              <div className="product-colors">
                <span className="color blue" data-color="Xanh dương"></span>
                <span className="color green" data-color="Xanh lá"></span>
                <span className="color pink" data-color="Hồng"></span>
              </div>

              <h4 className="product-title">Giày Converse Run Star Motion</h4>
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
        </SwiperSlide> <SwiperSlide>
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
              <span className="new-tag">
                <img src="/images/logo/title_image_1_tag.webp" alt="" />
                Mới
              </span>
              <div className="product-colors">
                <span className="color blue" data-color="Xanh dương"></span>
                <span className="color green" data-color="Xanh lá"></span>
                <span className="color pink" data-color="Hồng"></span>
              </div>

              <h4 className="product-title">Giày Converse Run Star Motion</h4>
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
        </SwiperSlide> <SwiperSlide>
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
              <span className="new-tag">
                <img src="/images/logo/title_image_1_tag.webp" alt="" />
                Mới
              </span>
              <div className="product-colors">
                <span className="color blue" data-color="Xanh dương"></span>
                <span className="color green" data-color="Xanh lá"></span>
                <span className="color pink" data-color="Hồng"></span>
              </div>

              <h4 className="product-title">Giày Converse Run Star Motion</h4>
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
              <span className="new-tag">
                <img src="/images/logo/title_image_1_tag.webp" alt="" />
                Mới
              </span>
              <div className="product-colors">
                <span className="color blue" data-color="Xanh dương"></span>
                <span className="color green" data-color="Xanh lá"></span>
                <span className="color pink" data-color="Hồng"></span>
              </div>

              <h4 className="product-title">Giày Converse Run Star Motion</h4>
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
    
  );
}
