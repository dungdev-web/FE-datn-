"use client";
import Link from "next/link";
import "../../css/blog.css";
import { useState } from "react";

export default function Detail_blog() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
            <h2>Chi tiết bài viết</h2>
          </div>
          <ul className="breadcrumb">
            <li className="home">
              <Link href={'/'} title="Trang chủ">
                <span>Trang chủ</span>
              </Link>
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </li>
             <li className="home">
              <Link href={'/'} title="Tài khoản">
                <span>Tin tức</span>
              </Link>
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </li>
            <li>
              <strong>
                <span>Chi tiết tin tức</span>
              </strong>
            </li>
            <li></li>
          </ul>
        </div>
      </section>
      <main style={{display: "flex"}}>
		 <button
        className="toggle-sidebar-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰ Danh mục & Liên quan
      </button>
        <aside className={`mobile-sidebar ${sidebarOpen ? "open" : ""}`}>
          <button
            className="close-sidebar-btn"
            onClick={() => setSidebarOpen(false)}
          >
            ×
          </button>
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
        <aside className="desktop">
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
        <article className="article-main">
          <div className="row">
            <div className="col-lg-12">
              <h1 className="title-head">
                TOP CÁC MẪU NIKE DUNK ĐƯỢC TÌM KIẾM NHIỀU NHẤT 2023
              </h1>
              <div className="postby">
                <span>
                  Đăng bởi <b>Nguyễn Hữu Mạnh</b> vào lúc 18/12/2023
                </span>
              </div>
              <div className="article-details">
                <div className="article-image hidden">
                  <a href="/top-cac-mau-nike-dunk-duoc-tim-kiem-nhieu-nhat-2023">
                    <img
                      className="img-fluid"
                      src="https://bizweb.dktcdn.net/100/505/077/articles/layer-2.jpg?v=1706065248850"
                      alt="TOP CÁC MẪU NIKE DUNK ĐƯỢC TÌM KIẾM NHIỀU NHẤT 2023"
                    />
                  </a>
                </div>
                <div className="article-content">
                  <div className="wrap-title-toc">
                    <h2>Nội dung bài viết</h2>
                    <div id="toc">
                      <ol className="toc-list ">
                        <li className="toc-list-item">
                          <a
                            href="#Giay-NIKE-SB-TRAVIS-SCOTT"
                            className="toc-link node-name--H2 "
                          >
                            Giày&nbsp;NIKE SB TRAVIS SCOTT
                          </a>
                        </li>
                        <li className="toc-list-item">
                          <a
                            href="#BO-SUU-TAP-NIKE-DUNK-X-OTOMO-KATSUHIRO"
                            className="toc-link node-name--H2 "
                          >
                            BỘ SƯU TẬP NIKE DUNK X OTOMO KATSUHIRO
                          </a>
                        </li>
                        <li className="toc-list-item">
                          <a
                            href="#PHIEN-BAN-NIKE-DUNK-TRANG-DEN"
                            className="toc-link node-name--H2 "
                          >
                            PHIÊN BẢN NIKE DUNK TRẮNG ĐEN
                          </a>
                          <ol className="toc-list ">
                            <li className="toc-list-item">
                              <a
                                href="#Nike-Dunk-Panda"
                                className="toc-link node-name--H3 "
                              >
                                Nike Dunk Panda
                              </a>
                            </li>
                            <li className="toc-list-item is-active-li">
                              <a
                                href="#Nike-Dunk-Reverse-Panda"
                                className="toc-link node-name--H3  is-active-link"
                              >
                                Nike Dunk Reverse Panda
                              </a>
                            </li>
                          </ol>
                        </li>
                      </ol>
                    </div>
                  </div>
                  <div className="rte" id="article-content">
                    <p>&nbsp;</p>
                    <p>
                      <a
                        href="https://giaygiare.vn/nike-sb-dunk"
                        target="_blank"
                        title="Nike Dunk Low"
                      >
                        <strong>Nike Dunk Low</strong>
                      </a>
                      &nbsp;- một trong những dòng giày nổi tiếng và lâu đời của
                      thương hiệu giày Nike, gây ấn tượng bởi phong cách thiết
                      kế đơn giản, cổ điển đặc trưng nhưng vẫn mang một màu sắc
                      đường phố hiện đại.
                      <br />
                      <strong>Giày Nike Dunk</strong>&nbsp;vẫn luôn được săn đón
                      khắp nơi bởi các tín đồ yêu thích&nbsp;
                      <a
                        href="https://giaygiare.vn/"
                        target="_blank"
                        title="giày sneakers"
                      >
                        giày sneakers
                      </a>
                      &nbsp;và các tín đồ thời trang khắp thế giới. Tính đến
                      nay,&nbsp;<strong>Nike</strong>&nbsp;đã cho ra mắt rất
                      nhiều phiên bản cũng như các bộ sưu tập đánh dấu sự hợp
                      tác với nhiều thương hiệu đến từ nhiều lĩnh vực khác nhau
                      (âm nhạc, phim ảnh,...)
                    </p>
                    <h2 id="Giay-NIKE-SB-TRAVIS-SCOTT">
                      Giày&nbsp;
                      <a
                        href="https://giaygiare.vn/sb-dunk-travis-scott.htm"
                        target="_blank"
                        title="NIKE SB TRAVIS SCOTT"
                      >
                        NIKE SB TRAVIS SCOTT
                      </a>
                    </h2>
                    <p>
                      Sự kết hợp đặc biệt và đầy ấn tượng ở thời điểm văn hóa
                      đại chúng và&nbsp;
                      <strong>sneakers</strong>&nbsp;đang trở nên phổ biến trên
                      khắp thị trường, Nike đã mang đến bộ sưu tập hợp tác cùng
                      rapper, ca sĩ nổi tiếng Travis Scott và cho ra mắt&nbsp;
                      <strong>bộ sưu tập Nike x Travis Scott&nbsp;</strong>với
                      những phiên bản thiết kế ấn tượng ở 5 dòng sản phẩm:&nbsp;
                      <a
                        href="https://giaygiare.vn/jordan-4"
                        target="_blank"
                        title="Jordan Air 4"
                      >
                        Jordan Air 4
                      </a>
                      , Air Force 1, Jordan 1 High,&nbsp;
                      <a
                        href="https://giaygiare.vn/jordan-1-low"
                        target="_blank"
                        title="Jordan Low"
                      >
                        Jordan Low
                      </a>
                      &nbsp;và&nbsp;
                      <strong>Nike Dunk</strong>. Là một sneakerhead chính hiệu,
                      Travis đã mang những phong cách đặc trưng của mình, pha
                      trộn giữa cổ điển và hiện đại vào từng thiết kế.
                      <br />Ở phiên bản&nbsp;
                      <strong>Nike Dunk Low “Cactus Jack”</strong>&nbsp;được đặt
                      tên theo hãng thu âm riêng của Travis Scott, đây là phiên
                      bản giới hạn được săn đón khắp thế giới nhờ vào thiết kế
                      đặc biệt mang phong cách đặc trưng của nam rapper. Form
                      giày truyền thống của Nike Dunk kết hợp cùng họa tiết độc
                      đáo phản ánh trọn vẹn phong cách nghệ thuật của Travis
                      Scott.
                      <br />
                      Với tone màu chủ đạo là nâu đất và đen điểm thêm các màu
                      sắc mang tính biểu tượng của mình, nam rapper đã khéo léo
                      kết hợp các hoạ tiết mang gam màu cổ điển cùng với các chi
                      tiết, logo của hãng Cactus Jack Records trên từng phần của
                      đôi giày.
                      <br />
                      <strong>SB Travis Scott</strong>&nbsp;sử dụng chất liệu
                      vải và da cao cấp phủ toàn bộ đôi giày, các chi tiết như
                      logo, lưỡi gà,.. đều được đệm một lớp đệm dày, tăng độ êm
                      ái, thoải mái khi sử dụng. Phần logo Swoosh cũng được nam
                      nghệ sĩ sử dụng hai gam màu đen và hồng nhạt ở hai mặt của
                      giày, càng tăng thêm sự độc đáo cho tổng thể đôi giày. Dù
                      là phong cách sang trọng, cổ điển hay đến những phong cách
                      hiện đại, đường phố thì&nbsp;
                      <strong>Nike Dunk Cactus Jack</strong>&nbsp;vẫn luôn là
                      một sự lựa chọn không thể phù hợp hơn.
                    </p>
                    <figure>
                      <img
                        alt="Nike SB Dunk Travis Scott hiện có chất lượng rep 1:1 &amp; Siêu Cấp tại Tulo Shop"
                        height="1679"
                        src="https://giaygiare.vn/upload/images/nike-sb-dunk-low-otomo-katsuhiro-green-blue-red-1.jpg"
                        width="1260"
                      />
                      <figcaption>
                        Nike SB Dunk Travis Scott hiện có chất lượng rep 1:1
                        &amp; Siêu Cấp tại Tulo Shop
                      </figcaption>
                    </figure>

                    <h2 id="BO-SUU-TAP-NIKE-DUNK-X-OTOMO-KATSUHIRO">
                      BỘ SƯU TẬP NIKE DUNK X OTOMO KATSUHIRO
                    </h2>

                    <ul>
                      <li>
                        Bộ sưu tập&nbsp;
                        <strong>Nike Dunk Low x Otomo Katsuhiro</strong>&nbsp;là
                        phiên bản giày đặc biệt được thương hiệu Nike cho ra mắt
                        để tôn vinh&nbsp;<strong>Otomo Katsuhiro</strong>&nbsp;-
                        một nhà biên kịch, đạo diễn và họa sĩ manga nổi tiếng
                        của Nhật Bản với nhiều tác phẩm đặc biệt được nhiều
                        người biết đến.
                      </li>
                      <li>
                        Thiết kế của các mẫu giày thuộc bộ sưu tập được lấy cảm
                        hứng từ phong cách của bộ manga nổi tiếng “Akira”, bộ
                        truyện manga cyberpunk của Nhật Bản được viết và minh
                        họa bởi Katsuhiro Otomo, ra mắt tại Nhật Bản vào năm
                        1984. Vào năm 1988, bộ phim hoạt hình điện ảnh cùng tên
                        ra đời, và được đạo diễn bởi chính cha đẻ của nó. Akira
                        (cả manga và anime) nhanh chóng trở thành một gã khổng
                        lồ đúng nghĩa trong ngành công nghiệp manga/anime và
                        được xem như là biểu tượng trong văn hóa đại chúng.
                      </li>
                      <li>
                        <a
                          href="https://giaygiare.vn/nike-sb-otomo.htm"
                          target="_blank"
                          title="Nike SB Otomo"
                        >
                          Nike SB Otomo
                        </a>
                        &nbsp;được phát hành vào năm 2021, là một phần của bộ
                        sưu tập đặc biệt với nhiều phiên bản màu sắc khác nhau.
                        Có thể nói đây được xem là một biểu tượng mới trong thế
                        giới giày sneaker và thời trang đường phố. Sản phẩm này
                        đã thu hút được sự chú ý của đông đảo người hâm mộ của
                        Otomo Katsuhiro, cũng như những tín đồ yêu thích thương
                        hiệu Nike.
                      </li>
                      <li>
                        Thiết kế hộp giày lấy phong cảnh từ manga với hình ảnh
                        của nhân vật Kaneda, người là nhân vật chính trong bộ
                        truyện tranh Akira. Phần lớn các phiên bản thuộc bộ sưu
                        tập Nike Dunk Low Otomo Katsuhiro đều sử dụng chất liệu
                        da lộn mang lại sự cao cấp và sang trọng, các bản phối
                        màu lấy cảm hứng từ tone màu chủ đạo trong bộ manga
                        Akira, đem đến sự ấn tượng khi phối hợp cùng các outfits
                        khác nhau, cũng chính vì lẽ này, bộ sưu tập nhận được sự
                        săn đón từ các tín đồ thời trang ở khắp nơi.
                      </li>
                    </ul>

                    <figure>
                      <img
                        alt="Nike Dunk Otomo có rất nhiều phiên bản màu sắc khác nhau"
                        height="1680"
                        src="https://giaygiare.vn/upload/images/nike-sb-dunk-low-otomo-katsuhiro-green-blue-red-1.jpg"
                        width="1260"
                      />
                      <figcaption>
                        Nike Dunk Otomo có rất nhiều phiên bản màu sắc khác nhau
                      </figcaption>
                    </figure>

                    <p>
                      Với thiết kế đặc trưng của Nike Dunk kết hợp cùng phong
                      cách manga Nhật Bản, đây được xem là một đôi giày phù hợp
                      với mọi phong cách, mọi lứa tuổi và mọi giới tính. Có thể
                      nói, đây chính là một trong những bộ sưu tập đặc biệt nhất
                      mà nhà Nike đã cho mắt tính đến thời điểm hiện tại, nhờ
                      vào phong cách hiện đại mang màu sắc của một thành phố
                      cyberpunk tương lai và chất liệu cao cấp, Nike Dunk x
                      Otomo Katsuhiro đã trở thành một “item” đắt giá mà các
                      sneakerhead lẫn các fan manga mong muốn sở hữu trong tủ
                      giày của mình.
                    </p>

                    <h2 id="PHIEN-BAN-NIKE-DUNK-TRANG-DEN">
                      PHIÊN BẢN NIKE DUNK TRẮNG ĐEN
                    </h2>

                    <h3 id="Nike-Dunk-Panda">Nike Dunk Panda</h3>

                    <p>
                      Phiên bản màu sắc cơ bản, tối giản của&nbsp;
                      <strong>Nike Dunk</strong>&nbsp;nhưng không hề lỗi thời và
                      luôn được săn đón bởi các tín đồ yêu thích sneakers trên
                      khắp thế giới. Tính đến nay, Nike đã cho ra mắt nhiều
                      phiên bản&nbsp;
                      <strong>Nike SB đen trắng</strong>, thu hút sự chú ý và
                      săn đón của các sneakerheads đến từ khắp nơi.
                      <br />
                      Với thiết kế và form giày đặc trưng, nhà Nike đã khéo léo
                      phối giữa hai tone màu đen và trắng theo nhiều phong cách
                      khác nhau, mang đến sự đa dạng, độc đáo nhưng không bị
                      trùng lặp giữa từng phiên bản. Mỗi phiên bản đều mang cho
                      mình một nét đặc trưng riêng, không hề nhàm chán và gây
                      nhầm lẫn với các phiên bản khác.
                    </p>

                    <figure>
                      <img
                        alt="Nike Dunk Panda chuẩn chất lượng tại Tulo Shop"
                        height="944"
                        src="https://giaygiare.vn/upload/images/nike-sb-dunk-low-retro-white-black-panda.jpg"
                        width="1260"
                      />
                      <figcaption>
                        <strong>
                          Nike Dunk Panda chuẩn chất lượng tại Tulo Shop
                        </strong>
                      </figcaption>
                    </figure>

                    <h3 id="Nike-Dunk-Reverse-Panda">
                      Nike Dunk Reverse Panda
                    </h3>

                    <p>
                      Điển hình với mẫu&nbsp;
                      <a
                        href="https://giaygiare.vn/nike-sb-dunk-low-retro-white-black-panda.html"
                        target="_blank"
                        title="Dunk Panda"
                      >
                        Dunk Panda
                      </a>
                      , nhà Nike đã khéo léo phối hai màu trắng, đen xen kẽ ở
                      từng chi tiết giày, mang lại điểm nhấn cho tổng thể đôi
                      giày. Ngược lại với White Black Panda, Nike còn cho ra mắt
                      phiên bản&nbsp;
                      <a
                        href="https://giaygiare.vn/nike-sb-dunk-low-reverse-panda.html"
                        target="_blank"
                        title="Nike Dunk Reverse Panda"
                      >
                        Nike Dunk Reverse Panda
                      </a>
                      , đây được xem là phiên bản “đảo ngược”. Ở phiên bản này
                      cũng sử dụng hai tone màu chính là trắng, đen nhưng hai
                      màu sắc này sẽ được bố trí ở những vị trí đảo ngược lại so
                      với phiên bản Panda, mang đến sự độc đáo nhưng không hề
                      “đụng hàng” với phiên bản Panda trước.
                    </p>

                    <figure>
                      <img
                        alt="Nike Dunk low reserve Panda"
                        height="1680"
                        src="https://giaygiare.vn/upload/images/nike-sb-dunk-low-reverse-panda-1.jpg"
                        width="1260"
                      />
                      <figcaption>Nike Dunk low reserve Panda</figcaption>
                    </figure>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div
                className="social-media"
                data-permalink="https://halushoe.mysapo.net/top-cac-mau-nike-dunk-duoc-tim-kiem-nhieu-nhat-2023"
              >
                <label>Chia sẻ: </label>
                <a
                  target="_blank"
                  href="//www.facebook.com/sharer.php?u=https://halushoe.mysapo.net/top-cac-mau-nike-dunk-duoc-tim-kiem-nhieu-nhat-2023"
                  className="share-facebook"
                  title="Chia sẻ lên Facebook"
                >
                  <i className="fa-brands fa-facebook"></i>
                </a>
                <a
                  target="_blank"
                  href="//twitter.com/share?url=https://halushoe.mysapo.net/top-cac-mau-nike-dunk-duoc-tim-kiem-nhieu-nhat-2023"
                  className="share-twitter"
                  title="Chia sẻ lên Twitter"
                >
                  <i className="fa-brands fa-twitter"></i>
                </a>
                <a
                  target="_blank"
                  href="//pinterest.com/pin/create/button/?url=https://halushoe.mysapo.net/top-cac-mau-nike-dunk-duoc-tim-kiem-nhieu-nhat-2023&amp;media=http://bizweb.dktcdn.net/thumb/1024x1024/100/505/077/articles/layer-2.jpg?v=1706065248850"
                  className="share-pinterest"
                  title="Chia sẻ lên pinterest"
                >
                  <i className="fa-brands fa-pinterest"></i>
                </a>
                <a
                  target="_blank"
                  href="//plus.google.com/share?url=https://halushoe.mysapo.net/top-cac-mau-nike-dunk-duoc-tim-kiem-nhieu-nhat-2023"
                  className="share-google"
                  title="+1"
                >
                  <i className="fa-brands fa-google-plus-g"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-12 space-30">
              <div className="title-text related-blog-title">
                <h2> Tin liên quan</h2>
              </div>

              <div className="list-blogs related-blogs">
                <div className="blog-item1 blog-item-list hidden">
                  <h3 className="blog-item-name">
                    <i className="fa fa-caret-right"></i>{" "}
                    <a
                      href="/top-cac-mau-nike-dunk-duoc-tim-kiem-nhieu-nhat-2023"
                      title="TOP CÁC MẪU NIKE DUNK ĐƯỢC TÌM KIẾM NHIỀU NHẤT 2023"
                    >
                      TOP CÁC MẪU NIKE DUNK ĐƯỢC TÌM KIẾM NHIỀU NHẤT 2023
                    </a>
                  </h3>
                </div>

                <div className="blog-item1 blog-item-list ">
                  <h3 className="blog-item-name">
                    <i className="fa fa-caret-right"></i>{" "}
                    <a
                      href="/adidas-cho-trinh-lang-mau-giay-supernova-dang-cap-moi"
                      title="ADIDAS CHO TRÌNH LÀNG MẪU GIÀY SUPERNOVA ĐẲNG CẤP MỚI"
                    >
                      ADIDAS CHO TRÌNH LÀNG MẪU GIÀY SUPERNOVA ĐẲNG CẤP MỚI
                    </a>
                  </h3>
                </div>

                <div className="blog-item1 blog-item-list ">
                  <h3 className="blog-item-name">
                    <i className="fa fa-caret-right"></i>{" "}
                    <a
                      href="/bao-quan-giay-air-jordan-hieu-qua-khi-su-dung-moi-ngay"
                      title="BẢO QUẢN GIÀY AIR JORDAN HIỆU QUẢ KHI SỬ DỤNG MỖI NGÀY"
                    >
                      BẢO QUẢN GIÀY AIR JORDAN HIỆU QUẢ KHI SỬ DỤNG MỖI NGÀY
                    </a>
                  </h3>
                </div>

                <div className="blog-item1 blog-item-list ">
                  <h3 className="blog-item-name">
                    <i className="fa fa-caret-right"></i>{" "}
                    <a
                      href="/bi-quyet-bao-quan-giay-ultra-boost-duoc-ben-lau-dai-nhat"
                      title="BÍ QUYẾT BẢO QUẢN GIÀY ULTRA BOOST ĐƯỢC BỀN &amp; LÂU DÀI NHẤT"
                    >
                      BÍ QUYẾT BẢO QUẢN GIÀY ULTRA BOOST ĐƯỢC BỀN &amp; LÂU DÀI
                      NHẤT
                    </a>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </article>
		 {/* Nút mở sidebar (chỉ hiển thị trên mobile) */}
     
      </main>
	  
    </>
  );
}
