import "../css/style.css";
import "../css/contact.css";
export default function Contact() {
  return (
    <main>
      <div className="intro-banner">
        <div className="intro-content">
          <h1>Liên hệ</h1>
          <p>
            <a href="/index.html">Trang chủ</a> • Liên hệ
          </p>
        </div>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4729.4347453037235!2d106.61900967576885!3d10.869555057467553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b0d50ab7919%3A0xb2050cb861c0ada0!2sC%C3%B4ng%20ty%20Thi%C3%AAn%20Kim%20Corp!5e1!3m2!1svi!2s!4v1744968552576!5m2!1svi!2s"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      <div className="contact-us">
        <div className="contact-left">
          <h3>Liên hệ</h3>
          <p>
            Địa chỉ: 1371 Phan Văn Trị, Phường 10, Gò Vấp, Hồ Chí Minh
          </p>
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
  );
}
