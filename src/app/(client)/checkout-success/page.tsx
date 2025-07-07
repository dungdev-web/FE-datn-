"use client";

import Link from "next/link";
import { CheckCircle, Printer, ArrowRight } from "lucide-react";
import "@/app/(client)/css/checkout-success.css";

export default function CheckoutSuccess() {
  return (
    <div className="success-container">
      <div className="success-box">
        <h2 className="success-brand">TERA SHOES</h2>
        <div className="success-grid">
          {/* Left section */}
          <div className="left-col">
            <div className="success-icon">
              <CheckCircle size={64} color="#22c55e" />
            </div>

            <h1 className="success-title">Cảm ơn bạn đã đặt hàng</h1>
            <p className="success-message">
              Email xác nhận đã được gửi tới <strong>baolcps41487@gmail.com</strong>.<br />
              Vui lòng kiểm tra email của bạn.
            </p>

            <div className="order-summary">
              <div className="order-row">
                <span>Tạm tính</span>
                <span>6.400.000đ</span>
              </div>
              <div className="order-row">
                <span>Phí vận chuyển</span>
                <span>40.000đ</span>
              </div>
              <div className="order-total order-row">
                <span>Tổng cộng</span>
                <span>6.400.000đ</span>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="right-col">
            <div className="order-section">
              <h4>Thông tin mua hàng</h4>
              <p>Lê Chí Bảo<br />baolcps41487@gmail.com<br />0338538203</p>
            </div>

            <div className="order-section">
              <h4>Địa chỉ giao hàng</h4>
              <p>
                Lê Chí Bảo<br />
                1371 Phan Văn Trị<br />
                Phường 10, Quận Gò Vấp, Tp Hồ Chí Minh<br />
                0338538203
              </p>
            </div>

            <div className="order-section">
              <h4>Phương thức thanh toán</h4>
              <p>Chuyển khoản</p>
            </div>

            <div className="order-section">
              <h4>Phương thức vận chuyển</h4>
              <p>Giao hàng tận nơi</p>
            </div>
          </div>
        </div>

        {/* Actions at bottom */}
        <div className="actions-footer">
          <button className="print-button" onClick={() => window.print()}>
            <Printer size={18} className="print-icon" />
            In hóa đơn
          </button>
          <Link href="/" className="continue-link">
            Tiếp tục mua hàng <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}