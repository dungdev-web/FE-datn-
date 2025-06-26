import "../css/style.css";
import "../css/contact.css";
import "../css/product.css";
import Link from "next/link";
export default function Contact() {
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
            <h2>Liên Hệ CHúng tôi</h2>
          </div>
          <ul className="breadcrumb">
            <li className="home">
              <Link href="/" title="Trang chủ">
                <span>Trang chủ</span>
              </Link>
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </li>
            <li>
              <strong>
                <span>Liên Hệ</span>
              </strong>
            </li>
            <li></li>
          </ul>
        </div>
      </section>
      <main>
        <div className="contact-us">
          <div className="contact-left">
            <h3>Liên hệ</h3>
            <p>Địa chỉ: 1371 Phan Văn Trị, Phường 10, Gò Vấp, Hồ Chí Minh</p>
            <p>
              Điện thoại: <span>0338538203</span>
            </p>
            <p>
              Email: <span>terashose@gmail.com</span>
            </p>
          </div>

          <div className="contact-right">
            <h3>Gửi tin nhắn cho chúng tôi</h3>
            <form action="">
              <div className="form-row">
                <input type="text" placeholder="Họ tên*" required />
                <input type="email" placeholder="Email*" required />
              </div>
              <input type="text" placeholder="Điện thoại*" required />
              <textarea placeholder="Nhập nội dung*" required></textarea>
              <button type="submit">Gửi liên hệ</button>
            </form>
          </div>
        </div>
  
      </main>
    </>
  );
}
