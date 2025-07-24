"use client";
import "../css/style.css";
import "../css/contact.css";
import "../css/product.css";
import Link from "next/link";
import { useState } from "react";
import { sendContactToAdmin, sendConfirmationToUser } from "@/services/contactService";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");
  setSuccess(false);

  try {
    await sendContactToAdmin(form);
    await sendConfirmationToUser({ name: form.name, email: form.email });
    setSuccess(true);
    toast.success("Gửi liên hệ thành công!");
    setForm({ name: "", email: "", phone: "", message: "" });
  } catch (err: any) {
    const message = err.message || "Lỗi khi gửi liên hệ.";
    setError(message);
    Swal.fire({
      icon: "error",
      title: "Gửi thất bại",
      text: message,
    });
  } finally {
    setLoading(false);
  }
};


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
            <p>Điện thoại: <span>0338538203</span></p>
            <p>Email: <span>terashose@gmail.com</span></p>
          </div>

          <div className="contact-right">
            <h3>Gửi tin nhắn cho chúng tôi</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <input type="text" name="name" placeholder="Họ tên*" value={form.name} onChange={handleChange} />
                <input type="email" name="email" placeholder="Email*" value={form.email} onChange={handleChange} />
              </div>
              <input type="text" name="phone" placeholder="Điện thoại*" value={form.phone} onChange={handleChange} />
              <textarea name="message" placeholder="Nhập nội dung*" value={form.message} onChange={handleChange}></textarea>
              <button type="submit" disabled={loading}>
                {loading ? "Đang gửi..." : "Gửi liên hệ"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
