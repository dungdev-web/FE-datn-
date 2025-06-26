"use client";
import "../css/style.css";
import "../css/cart.css";
import "../css/product.css";
import Link from "next/link";
import { getMockCartByUser } from "@/services/cartService";
import { useEffect, useState } from "react";
import { ICart, ICartItem } from "@/types/cart";

export default function Cart() {
  const [cart, setCart] = useState<ICart | null>(null);

  useEffect(() => {
    // Giả định userId lấy từ localStorage (hoặc từ context nếu bạn có)
    const userIdStr = localStorage.getItem("userId");
    if (userIdStr) {
      const userId = parseInt(userIdStr);
      const cartData = getMockCartByUser(userId);
      setCart(cartData);
    }
  }, []);

  if (!cart) {
    return <div>Không có sản phẩm trong giỏ hàng</div>;
  }
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
            <h2>Giỏ hàng của bạn</h2>
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
                <span>Giỏ hàng</span>
              </strong>
            </li>
            <li></li>
          </ul>
        </div>
      </section>
      <main>
        <div className="cart-container">
          <div className="cart-items">
            <div className="cart-header">
              <div className="header-product">Sản phẩm</div>
              <div className="header-price">Đơn Giá</div>
              <div className="header-quantity">Số lượng</div>
              <div className="header-total">Thành tiền</div>
            </div>

            {cart.items.map((item: ICartItem) => (
              <div className="cart-item" key={item.cart_items_id}>
                <div className="product-info">
                  <img
                    src="/images/products/chaybo/AirJordanDMP1Retro(xanhlam).webp"
                    alt={`Sản phẩm ${item.variant_id}`}
                  />
                  <div className="product-details">
                    <div className="product-name">
                      Tên sản phẩm {item.variant_id}
                    </div>
                    <div className="product-desc">
                      Mã biến thể: {item.variant_id}
                    </div>
                  </div>
                </div>
                <div className="cart-item-price">
                  {item.price?.toLocaleString()}₫
                </div>
                <div className="quantity-control">
                  <button>-</button>
                  <input type="text" value={item.quantity} readOnly />
                  <button>+</button>
                </div>
                <div className="cart-item-total">
                  {(item.price! * item.quantity).toLocaleString()}₫
                  <span className="remove-btn">
                    <i className="fa-solid fa-trash"></i>
                  </span>
                </div>
              </div>
            ))}

            <div className="cart-actions">
              <a href="#" className="continue-shopping">
                Tiếp Tục Mua Hàng
              </a>
              <a href="#" className="update-cart">
                Cập Nhật Giỏ Hàng
              </a>
            </div>
            <div className="free-shipping-progress">
              <div className="progress-bar">
                <div className="progress" style={{ width: "40%" }}>
                  40%
                </div>
              </div>

              <div className="progress-text">
                <p>
                  Chi thêm <span className="highlight">1,780,000₫</span> để được
                  <strong>MIỄN PHÍ VẬN CHUYỂN!</strong>
                </p>
                <p>
                  để thêm nhiều sản phẩm hơn vào giỏ hàng của bạn và nhận giao
                  hàng miễn phí cho đơn hàng
                  <br />
                  <span className="target-price">3,000,000₫</span>.
                </p>
              </div>
            </div>

            <p className="free-shipping">
              Chúc mừng! Bạn được giao hàng miễn phí với đơn hàng lớn hơn
              <b>3,000,000₫</b>.
            </p>
          </div>

          <div className="cart-summary">
            <div className="discount-section">
              <h3>Áp Dụng Khuyến Mãi</h3>
              <div className="discount">
                <input type="text" placeholder="Nhập mã giảm giá..." />
                <button>Áp Dụng</button>
              </div>
            </div>

            <div className="cart-total-box">
              <h3>Cộng Giỏ Hàng</h3>
              <div className="summary-row">
                <span>Tạm tính:</span>
                <span className="total">7,070,000₫</span>
              </div>
              <div className="summary-row">
                <span>Giao hàng:</span>
                <span>
                  <b>Free Shipping</b>
                </span>
              </div>
              <p className="shipping-note">
                Tùy chọn giao hàng sẽ được cập nhật trong quá trình thanh toán.
              </p>
              <a href="#" className="shipping-fee">
                Tính phí giao hàng <i className="fa-solid fa-truck-fast"></i>
              </a>

              <hr />

              <div className="summary-row">
                <span>Tổng:</span>
                <span className="total">7,070,000₫</span>
              </div>
            </div>

            <button className="checkout-btn">Tiến Hành Thanh Toán</button>
          </div>
        </div>
      </main>
    </>
  );
}
