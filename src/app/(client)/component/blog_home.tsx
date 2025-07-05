import "../css/home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
export default function BlogHome() {
  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={20}
      slidesPerView={4}
      loop={true}
      navigation
      breakpoints={{
        0: {
          slidesPerView: 2,
        },
        576: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 4,
        }
      }}
    >
      <SwiperSlide className="box-blog">
        <div className="blog-item">
          <img src="/images/blog/layer-2.webp" alt="" />
          <div className="blog-info">
            <p className="blog-date">18/2/2025</p>
            <p className="blog-author">Lê Chí Bảo</p>
          </div>
          <h3 className="blog-title">
            TOP CÁC MẪU NIKE DUNK ĐƯỢC TÌM KIẾM NHIỀU NHẤT 2023
          </h3>
          <p className="blog-desc">
            Nike Dunk Low - một trong những dòng giày nổi tiếng và lâu đời của
            thương hiệu giày N...
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide className="box-blog">
        <div className="blog-item">
          <img src="/images/blog/layer-2.webp" alt="" />
          <div className="blog-info">
            <p className="blog-date">18/2/2025</p>
            <p className="blog-author">Lê Chí Bảo</p>
          </div>
          <h3 className="blog-title">
            TOP CÁC MẪU NIKE DUNK ĐƯỢC TÌM KIẾM NHIỀU NHẤT 2023
          </h3>
          <p className="blog-desc">
            Nike Dunk Low - một trong những dòng giày nổi tiếng và lâu đời của
            thương hiệu giày N...
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide className="box-blog">
        <div className="blog-item">
          <img src="/images/blog/layer-2.webp" alt="" />
          <div className="blog-info">
            <p className="blog-date">18/2/2025</p>
            <p className="blog-author">Lê Chí Bảo</p>
          </div>
          <h3 className="blog-title">
            TOP CÁC MẪU NIKE DUNK ĐƯỢC TÌM KIẾM NHIỀU NHẤT 2023
          </h3>
          <p className="blog-desc">
            Nike Dunk Low - một trong những dòng giày nổi tiếng và lâu đời của
            thương hiệu giày N...
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide className="box-blog">
        <div className="blog-item">
          <img src="/images/blog/layer-2.webp" alt="" />
          <div className="blog-info">
            <p className="blog-date">18/2/2025</p>
            <p className="blog-author">Lê Chí Bảo</p>
          </div>
          <h3 className="blog-title">
            TOP CÁC MẪU NIKE DUNK ĐƯỢC TÌM KIẾM NHIỀU NHẤT 2023
          </h3>
          <p className="blog-desc">
            Nike Dunk Low - một trong những dòng giày nổi tiếng và lâu đời của
            thương hiệu giày N...
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide className="box-blog">
        <div className="blog-item">
          <img src="/images/blog/layer-2.webp" alt="" />
          <div className="blog-info">
            <p className="blog-date">18/2/2025</p>
            <p className="blog-author">Lê Chí Bảo</p>
          </div>
          <h3 className="blog-title">
            TOP CÁC MẪU NIKE DUNK ĐƯỢC TÌM KIẾM NHIỀU NHẤT 2023
          </h3>
          <p className="blog-desc">
            Nike Dunk Low - một trong những dòng giày nổi tiếng và lâu đời của
            thương hiệu giày N...
          </p>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
