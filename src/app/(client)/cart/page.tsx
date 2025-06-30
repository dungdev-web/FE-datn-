"use client";
import "../css/style.css";
import "../css/cart.css";
import "../css/product.css";
import Link from "next/link";
import { getMockCartByUser } from "@/services/cartService";
import { useEffect, useState } from "react";
import { ICart, ICartItem } from "@/types/cart";
import { checkToken } from "@/services/authService";
export default function Cart() {
  const [cart, setCart] = useState<ICart | null>(null);
  const FREE_SHIPPING_THRESHOLD = 9000000;
  const subtotal =
    cart?.items.reduce(
      (sum, item) => sum + (item.price || 0) * item.quantity,
      0
    ) || 0;
  const remainingAmount = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(
    100,
    Math.floor((subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );
const shipprice = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);


  useEffect(() => {
    const fetchCart = async () => {
      try {
        const tokenData = await checkToken();
        if (!tokenData?.user?.id) throw new Error("Token không hợp lệ");

        const userId = tokenData.user.id;
        const cartData = getMockCartByUser(userId);
        setCart(cartData);
      } catch (error) {
        console.error("Lỗi khi lấy giỏ hàng:", error);
      }
    };

    fetchCart();
  }, []);

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
        <div>Không có sản phẩm trong giỏ hàng</div>
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
                      Màu sắc: {item.variant_id}
                    </div>
                  </div>
                </div>
                <div className="cart-item-price">
                  {item.price?.toLocaleString("vi")}₫
                </div>
                <div className="quantity-control">
                  <button>-</button>
                  <input type="text" value={item.quantity} readOnly />
                  <button>+</button>
                </div>
                <div className="cart-item-total">
                  {(item.price! * item.quantity).toLocaleString("vi")}₫
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
                      giao hàng miễn phí cho đơn hàng
                      <br />
                      <span className="target-price">9.000.000₫</span>.
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
                  {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                    <b>Free Shipping</b>
                  ) : (
                    <span>
                      {shipprice.toLocaleString('vi')}₫
                    </span>
                  )}
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
                <span className="total">{(subtotal+shipprice).toLocaleString("vi")}₫</span>
              </div>
            </div>

            <button className="checkout-btn">Tiến Hành Thanh Toán</button>
          </div>
        </div>
      </main>
    </>
  );
}
