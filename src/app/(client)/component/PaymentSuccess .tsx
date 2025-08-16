"use client";

import Link from "next/link";
import { CheckCircle, Printer, ArrowRight } from "lucide-react";
import "@/app/(client)/css/checkout-success.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getOrderDetailService } from "@/services/orderService";
import { API_BASE_URL } from "@/config/env";

export default function CheckoutSuccess() {
  const searchParams = useSearchParams();
  const orderId = Number(searchParams.get("orderId"));
  const feeFromUrl = Number(searchParams.get("shippingFee") || 0);

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      getOrderDetailService(orderId)
        .then((data) => {
          setOrder(data);
        })
        .catch((err) => {
          console.error("Lỗi lấy đơn hàng:", err);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [orderId]);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Đang tải đơn hàng...</p>;
  }

  if (!order) {
    return (
      <p style={{ textAlign: "center", color: "red" }}>
        Không tìm thấy đơn hàng. Vui lòng thử lại.
      </p>
    );
  }

  const shippingFee = order.shipping_fee || 0;
  const subtotal = order.order_items.reduce(
    (sum: number, item: any) => sum + item.unit_price * item.quantity,
    0
  );
  const discount =
    order?.coupon?.discount_type === "percentage"
      ? Math.floor((subtotal * order.coupon.discount_value) / 100)
      : order?.coupon?.discount_value || 0;

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
              Email xác nhận đã được gửi tới{" "}
              <strong>{order?.user?.email || ""}</strong>.<br />
              Vui lòng kiểm tra email của bạn.
            </p>

            <div className="order-summary">
              <div className="order-row">
                <span>Tạm tính</span>
                <span>{subtotal.toLocaleString()}đ</span>
              </div>
              <div className="order-row">
                <span>Giảm giá</span>
                <span>-{discount.toLocaleString()}đ</span>
              </div>
              <div className="order-row">
                <span>Phí vận chuyển</span>
                <span>{shippingFee.toLocaleString()}đ</span>
              </div>

              <div className="order-total order-row">
                <span>Tổng cộng</span>
                <span>{order.total_amount.toLocaleString()}đ</span>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="right-col">
            <div className="order-section">
              <h4>Thông tin mua hàng</h4>
              <p>
                {order?.user?.name} <br />
                {order?.user?.email} <br />
                {order?.shipping_address?.phone}
              </p>
            </div>

            <div className="order-section">
              <h4>Địa chỉ giao hàng</h4>
              <p>
                {order?.shipping_address?.full_name} <br />
                {order?.shipping_address?.address_line} <br />
                {order?.shipping_address?.phone}
              </p>
            </div>

            <div className="order-section">
              <h4>Phương thức thanh toán</h4>
              <p>{order?.payment_method?.name_method}</p>
            </div>

            {order?.comment && (
              <div className="order-section">
                <h4>Ghi chú đơn hàng</h4>
                <p>{order.comment}</p>
              </div>
            )}
          </div>
        </div>

        {/* Actions at bottom */}
        <div className="actions-footer">
          <Link href="/" className="continue-link">
            Tiếp tục mua hàng <ArrowRight size={16} />
          </Link>
          <Link href="/account/order" className="continue-link">
            Xem đơn hàng
          </Link>
        </div>
      </div>
    </div>
  );
}
