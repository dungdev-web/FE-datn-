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
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4729.4347453037235!2d106.61900967576885!3d10.869555057467553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b0d50ab7919%3A0xb2050cb861c0ada0!2sC%C3%B4ng%20ty%20Thi%C3%AAn%20Kim%20Corp!5e1!3m2!1svi!2s!4v1744968552576!5m2!1svi!2s"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </main>
    </>
  );
}
