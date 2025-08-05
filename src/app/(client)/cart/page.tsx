"use client";
import "../css/style.css";
import "../css/cart.css";
import "../css/product.css";
import Link from "next/link";
import { ICartItem } from "@/types/cart";
import { useCart } from "@/hooks/useCart";
import { API_BASE_URL } from "@/config/env";
import { useEffect, useState } from "react";
import { useCoupon } from "@/hooks/useCoupon";
export default function Cart() {
  const {
    cart,
    subtotal,
    shipprice,
    progressPercent,
    remainingAmount,
    isFreeShipping,
    handleMinus,
    handlePlus,
    handleChangeQuantity,
    handleRemoveItem,
  } = useCart(); // 👉 Gọi trước để lấy subtotal

  const { appliedCoupon, applyCoupon, error, getDiscountAmount, resetCoupon } =
    useCoupon(subtotal, cart?.carts_id || "default");

  const [couponInput, setCouponInput] = useState("");
  const discountAmount = getDiscountAmount();
  useEffect(() => {
    console.log("🛒 Cart items:", cart?.cart_items);
  }, [cart]);
  useEffect(() => {
    if (appliedCoupon && appliedCoupon.length > 0) {
      setCouponInput(appliedCoupon[0].code); // Hiện lại trong input
    }
  }, [appliedCoupon]);

  if (!cart) {
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
          <div className="breadcrumb-container relative z-10">
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
            </ul>
          </div>
        </section>

        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mb-6"
            viewBox="0 0 64 64"
            fill="none"
            width="100"
            height="100"
          >
            <path
              d="M20 22V18C20 13.5817 23.5817 10 28 10H36C40.4183 10 44 13.5817 44 18V22"
              stroke="#00C853"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M12 22H52L58 54C58 56.2091 56.2091 58 54 58H10C7.79086 58 6 56.2091 6 54L12 22Z"
              stroke="#00C853"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <circle cx="24" cy="30" r="2" fill="#00C853" />
            <circle cx="40" cy="30" r="2" fill="#00C853" />
          </svg>

          <p className="text-gray-700 text-lg font-medium">
            Không có sản phẩm nào trong giỏ hàng của bạn
          </p>

          <Link
            href="/"
            className="mt-6 inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </>
    );
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
          </ul>
        </div>
      </section>

      <main className="main-cart">
        <div className="cart-container">
          <div className="cart-items">
            <div className="cart-header">
              <div className="header-product">
                <p className="!ml-[200px]">Sản phẩm</p>
              </div>
              <div className="header-price">
                <p>Đơn Giá</p>
              </div>
              <div className="header-quantity">
                <p className="!ml-[20px]">Số lượng</p>
              </div>
              <div className="header-total">
                <p>Thành tiền</p>
              </div>
            </div>

            {cart.cart_items.map((item: ICartItem) => {
              const price =
                item.variant?.product?.sale_price ??
                item.variant?.product?.price ??
                0;

              return (
                <div className="cart-item" key={item.cart_items_id}>
                  <div className="product-info">
                    <img
                      alt={item.variant?.product.name}
                      src={
                        item.variant?.color.images
                          ? `${API_BASE_URL}/uploads/${item.variant.color.images}`
                          : "/images/placeholder.png"
                      }
                      width="80"
                    />
                    <div className="product-name">
                      {item.variant?.product.name}
                    </div>
                    <div className="product-details">
                      <div className="product-desc">
                        Màu sắc: {item.variant?.color.name_color} | Kích thước:{" "}
                        {item.variant?.size.number_size}
                      </div>
                    </div>
                  </div>

                  <div className="cart-item-price">
                    {Number(price).toLocaleString("vi")}₫
                  </div>

                  <div className="quantity-control">
                    <button onClick={() => handleMinus(item.cart_items_id)}>
                      -
                    </button>
                    <input
                      type="text"
                      value={item.quantity}
                      onChange={(e) =>
                        handleChangeQuantity(item.cart_items_id, e)
                      }
                    />
                    <button onClick={() => handlePlus(item.cart_items_id)}>
                      +
                    </button>
                  </div>

                  <div className="cart-item-total">
                    {(price * item.quantity).toLocaleString("vi")}₫
                    <span
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item.cart_items_id)}
                    >
                      <i className="fa-solid fa-trash text-red-600"></i>
                    </span>
                  </div>
                </div>
              );
            })}

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
                <div
                  className="progress"
                  style={{ width: `${progressPercent}%` }}
                >
                  {progressPercent}%
                </div>
              </div>
              <div className="progress-text">
                {remainingAmount > 0 ? (
                  <>
                    <p>
                      Chi thêm{" "}
                      <span className="highlight">
                        {remainingAmount.toLocaleString("vi")}₫
                      </span>{" "}
                      để được <strong>MIỄN PHÍ VẬN CHUYỂN!</strong>
                    </p>
                    <p>
                      để thêm nhiều sản phẩm hơn vào giỏ hàng của bạn và nhận
                      giao hàng miễn phí
                      <br />
                      <span className="target-price">3.000.000₫</span>.
                    </p>
                  </>
                ) : (
                  <p className="free-shipping">
                    Chúc mừng! Bạn được giao hàng miễn phí với đơn hàng lớn hơn
                    <b> 3,000,000₫</b>.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="cart-summary">
            <div className="discount-section">
              <h3>Áp Dụng Khuyến Mãi</h3>
              <div className="discount">
                <input
                  type="text"
                  placeholder="Nhập mã giảm giá..."
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                />
                <button onClick={() => applyCoupon(couponInput)}>
                  Áp Dụng
                </button>
              </div>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              {appliedCoupon && (
                <p className="text-green-600 mt-1">
                  Đã áp dụng mã <strong>{appliedCoupon.code}</strong>{" "}
                  <button
                    className="ml-2 text-blue-600 underline"
                    onClick={resetCoupon}
                  >
                    Hủy
                  </button>
                </p>
              )}
            </div>

            <div className="cart-total-box">
              <h3>Cộng Giỏ Hàng</h3>
              <div className="summary-row">
                <span>Tạm tính:</span>
                <span className="total">{subtotal.toLocaleString("vi")}₫</span>
              </div>
              {isFreeShipping ? (
                <div className="summary-row">
                  <span>Miễn phí vận chuyển</span>
                </div>
              ) : (
                <>
                  <div className="summary-row">
                    <span>Giao hàng: </span>
                    <span className="total !text-sm">
                      có phí vận chuyển tùy theo vùng
                    </span>
                  </div>
                  <p className="total text-center !text-sm">
                    Phí vận chuyển từ 30.000đ đến 50.000đ
                  </p>
                </>
              )}

              <div className="summary-row">
                <span>Giảm giá:</span>
                <span className="total text-red-500">
                  - {discountAmount.toLocaleString("vi")}₫
                </span>
              </div>
              <hr />
              <div className="summary-row">
                <span>Tổng:</span>
                <span className="total">
                  {(subtotal + shipprice - discountAmount).toLocaleString("vi")}
                  ₫
                </span>
              </div>
            </div>

            <button className="checkout-btn">
              <a href="/checkout" className="!text-white">
                Tiến Hành Thanh Toán
              </a>
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
