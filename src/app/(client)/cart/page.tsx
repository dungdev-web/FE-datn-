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
const handleMinus = (itemId: number) => {
  setCart((prevCart) => {
    if (!prevCart) return prevCart;
    const newItems = prevCart.items.map((item) =>
      item.cart_items_id === itemId
        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
        : item
    );
    return { ...prevCart, items: newItems };
  });
};

const handlePlus = (itemId: number) => {
  setCart((prevCart) => {
    if (!prevCart) return prevCart;
    const newItems = prevCart.items.map((item) =>
      item.cart_items_id === itemId
        ? { ...item, quantity: Math.min(999, item.quantity + 1) }
        : item
    );
    return { ...prevCart, items: newItems };
  });
};

const handleChange = (
  itemId: number,
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const value = e.target.value;
  const num = parseInt(value, 10);
  setCart((prevCart) => {
    if (!prevCart) return prevCart;
    const newItems = prevCart.items.map((item) =>
      item.cart_items_id === itemId
        ? {
            ...item,
            quantity:
              value === ""
                ? 1
                : !isNaN(num) && num >= 1 && num <= 999
                ? num
                : item.quantity,
          }
        : item
    );
    return { ...prevCart, items: newItems };
  });
};


  useEffect(() => {
    const fetchCart = async () => {
      try {
        const tokenData = await checkToken();
        if (!tokenData?.user?.id) throw new Error("Token không hợp lệ");

        const userId = tokenData.user.id;
        const cartData = await getMockCartByUser(userId);
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

    {/* Layout trống giỏ hàng căn giữa toàn màn hình */}
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

            {cart.items.map((item: ICartItem) => (
              <div className="cart-item" key={item.cart_items_id}>
                <div className="product-info">
                  <img
                    src={item.variant.color.image}
                    alt={`Sản phẩm ${item.variant.name}`}
                  />
                  <div className="product-details">
                    <div className="product-name">
                       {item.variant.name}
                    </div>
                    <div className="product-desc">
                      Màu sắc: {item.variant.color.name_color} - Kích thước: {item.variant.size.number_size}
                    </div>
                  </div>
                </div>
                <div className="cart-item-price">
                  {item.price?.toLocaleString("vi")}₫
                </div>
                <div className="quantity-control">
                  <button  onClick={() => handleMinus(item.cart_items_id)}>-</button>
                  <input type="text" value={item.quantity } onChange={(e) => handleChange(item.cart_items_id, e)}  />
                  <button onClick={() => handlePlus(item.cart_items_id)}>+</button>
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
