import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <Link href={'/'}>
          <img src="/images/logo/NBDT__1_-removebg-preview.png" alt="" />
          </Link>
          <h2 className="text-center text-xl font-bold text-white mt-2">
            “Đẹp từng bước, chất từng centimet”
          </h2>
        </div>
        <div className="footer-column">
          <h3>Hệ thống cửa hàng toàn quốc</h3>
          <div className="store">
            <p>
              <i className="fas fa-map-marker-alt"></i> Tera Shose Đội Cấn
            </p>
            <p>Địa chỉ: 1371 Phan Văn Trị, Phường 10, Gò Vấp, Hồ Chí Minh</p>
            <p>Hotline: 0338538203</p>
          </div>
          <div className="store">
            <p>
              <i className="fas fa-map-marker-alt"></i> Tera Shose Lữ Gia
            </p>
            <p>Địa chỉ: 145 Lê Đức Thọ, Phường 1, Gò Vấp, TP.Hồ Chí Minh</p>
            <p>Hotline: 0363545849</p>
          </div>
        </div>
        <div className="footer-column">
          <h3>Liên kết nhanh</h3>
          <ul>
            <li>
              <Link href="/">Trang chủ</Link>
            </li>
            <li>
              <Link href="/about">Giới thiệu</Link>
            </li>
            <li>
              <Link href="/product">Sản phẩm</Link>
            </li>
            <li>
              <Link href="/blog">Tin tức</Link>
            </li>
            <li>
              <Link href="/contact">Liên hệ</Link>
            </li>
            <li>
              <a href="#">Hệ thống cửa hàng</a>
            </li>{" "}
            {/* Giữ nguyên nếu là liên kết ngoài hoặc chưa có route */}
          </ul>
        </div>

        <div className="footer-column">
          <h3>Đăng ký nhận tin</h3>
          <p>
            Đăng ký nhận bản tin của chúng tôi để nhận các sản phẩm mới, mã
            khuyến mại nhanh nhất
          </p>
          <div className="subscribe-box">
            <input
              type="email"
              placeholder="Email của bạn"
              className="text-black bg-white"
            />
            <button>
              <i
                style={{ color: "black" }}
                className="fa-solid fa-envelope"
              ></i>
            </button>
          </div>

          <div className="social-icons" style={{ width: "322px" }}>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-pinterest-p"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-border-top"></div>

      <div className="bottom-container">
        <div className="footer-bottom copyright">
          <div className="d-flex justify-between">
            <ul className="list-menu has-toggle payment">
              <li>
                <img
                  src="//bizweb.dktcdn.net/100/505/077/themes/934930/assets/img_payment_1.png"
                  alt="Halushoe"
                  width="50"
                  height="30"
                />
              </li>
              <li>
                <img
                  src="//bizweb.dktcdn.net/100/505/077/themes/934930/assets/img_payment_2.png"
                  alt="Halushoe"
                  width="50"
                  height="30"
                />
              </li>
              <li>
                <img
                  src="//bizweb.dktcdn.net/100/505/077/themes/934930/assets/img_payment_3.png"
                  alt="Halushoe"
                  width="50"
                  height="30"
                />
              </li>
              <li>
                <img
                  src="//bizweb.dktcdn.net/100/505/077/themes/934930/assets/img_payment_4.png"
                  alt="Halushoe"
                  width="50"
                  height="30"
                />
              </li>
              <li>
                <img
                  src="//bizweb.dktcdn.net/100/505/077/themes/934930/assets/img_payment_5.png"
                  alt="Halushoe"
                  width="50"
                  height="30"
                />
              </li>
              <li>
                <img
                  src="//bizweb.dktcdn.net/100/505/077/themes/934930/assets/img_payment_6.png"
                  alt="Halushoe"
                  width="50"
                  height="30"
                />
              </li>
            </ul>
            <p className="text-center">
              © Bản quyền thuộc về <strong>Tera Shose</strong>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
