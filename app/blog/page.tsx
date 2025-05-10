import "../css/blog.css";
export default function Blog() {
  return (
    <>
      <div className="intro-banner">
        <div className="intro-content">
          <h1>Tin tức</h1>
          <p>
            <a href="/index.html">Trang chủ</a> • Liên hệ
          </p>
        </div>
      </div>
      <main>
        <aside>
          <div className="category-blog">
            <h2>DANH MỤC BÀI VIẾT</h2>
            <ul>
              <li>Trang chủ</li>
              <li>Giới thiệu</li>
              <li>Sản phẩm</li>
              <li>Tin tức</li>
              <li>Liên hệ</li>
              <li>Hệ thống cửa hàng</li>
            </ul>
          </div>

          <div className="relate-blog">
            <h2>BÀI VIẾT LIÊN QUAN</h2>

            <div className="box-relate-blog">
              <img src="/images/blog/layer-1.webp" alt="" />
              <p>TOP CÁC MẪU NIKE DUNK ĐƯỢC TÌM KIẾM NHIỀU NHẤT 2023</p>
            </div>

            <div className="box-relate-blog">
              <img src="/images/blog/layer-2.webp" alt="" />
              <p>ADIDAS CHO TRÌNH LÀNG MẪU GIÀY SUPERNOVA ĐẲNG CẤP MỚI</p>
            </div>

            <div className="box-relate-blog">
              <img src="/images/blog/layer-3.webp" alt="" />
              <p>BẢO QUẢN GIÀY AIR JORDAN HIỆU QUẢ KHI SỬ DỤNG MỖI NGÀY</p>
            </div>

            <div className="box-relate-blog">
              <img src="/images/blog/layer-4.webp" alt="" />
              <p>BÍ QUYẾT BẢO QUẢN GIÀY ULTRA BOOST ĐƯỢC BỀN & LÂU DÀI NHẤT</p>
            </div>
          </div>

          <div className="banner-relate-blog">
            <img src="/images/banner/aside_banner.webp" alt="" />
          </div>
        </aside>
        <article>
          <div className="list-blog">
            <div className="box-blog">
              <img src="/images/blog/layer-1.webp" alt="" />
              <div>
                <h2>TOP CÁC MẪU NIKE DUNK ĐƯỢC TÌM KIẾM NHIỀU NHẤT 2023</h2>
                <p>
                  <span>Nguyễn Hữu Mạnh -</span> 18/12/2023 - <span>0</span>{" "}
                  bình luận
                </p>
                <p>
                  {" "}
                  Nike Dunk Low - một trong những dòng giày nổi tiếng và lâu đời
                  của thương hiệu giày Nike, gây ấn tượng bởi phong cách thiết
                  kế đơn giản, cổ điển đặc trưng nhưng vẫn mang một màu sắc
                  đường phố hiện đại. Giày Nike Dunk vẫn luôn được săn đón khắp
                  nơi bởi các tín đồ yêu thích giày sneakers và các tín đồ thời
                  trang khắp thế giới. Tín...
                </p>
              </div>
            </div>

            <div className="box-blog">
              <img src="/images/blog/layer-2.webp" alt="" />
              <div>
                <h2>ADIDAS CHO TRÌNH LÀNG MẪU GIÀY SUPERNOVA ĐẲNG CẤP MỚI</h2>
                <p>
                  <span>Nguyễn Hữu Mạnh -</span> 18/12/2023 - <span>0</span>{" "}
                  bình luận
                </p>
                <p>
                  SSau dịch bệnh covid -19 khiến mọi người bị cấm cửa và không
                  được ra ngoài thời gian dài thì nhu cầu tập thể dục được khá
                  nhiều người quan tâm. Bởi nắm bắt được xu thế hiện nay nên
                  adidas đã cho ra mắt phiên bản Supernova. Mẫu giày này ra đời
                  nhằm khuyến khích mọi người hoạt động nhiều hơn cũng như để
                  chào đón một cuộc sống bình thường mới Quá trình h...
                </p>
              </div>
            </div>

            <div className="box-blog">
              <img src="/images/blog/layer-3.webp" alt="" />
              <div>
                <h2>BẢO QUẢN GIÀY AIR JORDAN HIỆU QUẢ KHI SỬ DỤNG MỖI NGÀY</h2>
                <p>
                  <span>Nguyễn Hữu Mạnh -</span> 18/12/2023 - <span>0</span>{" "}
                  bình luận
                </p>
                <p>
                  Giày là một món đồ không thể thiếu đối với tất cả mọi người
                  (đặc biệt là giới trẻ hiện nay). Mọi người thường đi giày cho
                  những ngày phải vận động nhiều và để dễ di chuyển hơn. Hay đơn
                  giản là để thể hiện cá tính của bản thân.Vậy nên vệ sinh giày
                  cho sạch cũng là vấn đề được khá nhiều người đi cũng như yêu
                  giày quan tâm. Bài viết này sẽ chia sẻ một số&nbs...
                </p>
              </div>
            </div>
            <div className="box-blog">
              <img src="/images/blog/layer-4.webp" alt="" />
              <div>
                <h2>BẢO QUẢN GIÀY AIR JORDAN HIỆU QUẢ KHI SỬ DỤNG MỖI NGÀY</h2>
                <p>
                  <span>Nguyễn Hữu Mạnh -</span> 18/12/2023 - <span>0</span>{" "}
                  bình luận
                </p>
                <p>
                  Thời tiết không ổn định có thể khiến đôi giày Adidas
                  UltraBoost của bạn gặp phải tình trạng bám bẩn, ố vàng và hơn
                  thế nữa, rất khó vệ sinh và bảo dưỡng. Tất nhiên, không ai
                  trong chúng ta muốn tình huống này xảy ra với mình khi ra
                  đường. Vì vậy, hãy nhanh chóng khôi phục vẻ đẹp cho đôi giày
                  của bạn bằng cách tham khảo nội dung dưới đây. Nên bi...
                </p>
              </div>
            </div>
            <div className="box-blog">
              <img src="/images/blog/layer-1.webp" alt="" />
              <div>
                <h2>BẢO QUẢN GIÀY AIR JORDAN HIỆU QUẢ KHI SỬ DỤNG MỖI NGÀY</h2>
                <p>
                  <span>Nguyễn Hữu Mạnh -</span> 18/12/2023 - <span>0</span>{" "}
                  bình luận
                </p>
                <p>
                  Thời tiết không ổn định có thể khiến đôi giày Adidas
                  UltraBoost của bạn gặp phải tình trạng bám bẩn, ố vàng và hơn
                  thế nữa, rất khó vệ sinh và bảo dưỡng. Tất nhiên, không ai
                  trong chúng ta muốn tình huống này xảy ra với mình khi ra
                  đường. Vì vậy, hãy nhanh chóng khôi phục vẻ đẹp cho đôi giày
                  của bạn bằng cách tham khảo nội dung dưới đây. Nên bi...
                </p>
              </div>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
