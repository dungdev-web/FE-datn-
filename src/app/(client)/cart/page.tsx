"use client";
import "../css/style.css";
import "../css/cart.css";
import "../css/product.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useCoupon } from "@/hooks/useCoupon";
import { API_BASE_URL } from "@/config/env";
import { ICoupon } from "@/types/coupon";
import { checkToken } from "@/services/authService";
import {
  getSavedUserCoupons,
  getCouponList,
  saveUserCoupon,
} from "@/services/couponService";
import { ICartItem } from "@/types/cart";
import { toast } from "react-toastify";

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
  } = useCart();

  const { appliedCoupon, applyCoupon, error, getDiscountAmount, resetCoupon } =
    useCoupon(subtotal, cart?.carts_id || "default");

  const discountAmount = getDiscountAmount();

  const [savedCoupons, setSavedCoupons] = useState<ICoupon[]>([]);
  const [allCoupons, setAllCoupons] = useState<ICoupon[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [couponInput, setCouponInput] = useState("");

  // Click outside để đóng dropdown
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!event.target.closest(".coupon-dropdown")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Load coupon khi mount
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        // Lấy userId
        const tokenData = await checkToken();
        if (tokenData?.user?.id) {
          const uid = tokenData.user.id;
          setUserId(uid);

          // Lấy coupon đã lưu
          const saved = await getSavedUserCoupons(uid);
          setSavedCoupons(saved);

          // Lấy tất cả coupon gợi ý
          const all = await getCouponList();
          setAllCoupons(all);
        }
      } catch (err) {
        console.error("Không thể lấy mã giảm giá:", err);
      }
    };
    fetchCoupons();
  }, []);

  // Hiển thị coupon đã áp dụng
  useEffect(() => {
    if (appliedCoupon) {
      setCouponInput(appliedCoupon.code);
    }
  }, [appliedCoupon]);

  const handleSaveCoupon = async (couponCode: string) => {
    if (!userId) return;
    try {
      await saveUserCoupon(userId, couponCode);
      const updatedSaved = await getSavedUserCoupons(userId);
      setSavedCoupons(updatedSaved);
    } catch (err) {
      console.error("Lỗi lưu coupon:", err);
    }
  };
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
                  <Link href={`/product/${item.variant?.product?.products_id}`}>
                    <div className="product-info">
                      <img
                        alt={item.variant?.product?.name || "Sản phẩm"}
                        src={
                          item.variant?.color?.images
                            ? `${API_BASE_URL}/uploads/${item.variant.color.images}`
                            : "/images/placeholder.png"
                        }
                        width={80}
                      />

                      <div className="product-name">
                        {item.variant?.product.name}
                      </div>

                      <div className="product-details">
                        <div className="product-desc">
                          Màu sắc: {item.variant?.color.name_color} | Kích
                          thước: {item.variant?.size.number_size}
                        </div>
                      </div>
                    </div>
                  </Link>
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
              <h3 className="text-lg font-semibold mb-2">Áp Dụng Khuyến Mãi</h3>

              <div
                className={`relative w-full mb-4 coupon-dropdown ${
                  isOpen ? "open" : ""
                }`}
              >
                <button
                  className="select-coupon w-full p-2 border border-gray-300 rounded-lg text-left"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {couponInput
                    ? `Đã chọn: ${couponInput}`
                    : "-- Chọn mã giảm giá --"}
                </button>

                {isOpen && (
                  <div className="absolute z-50 w-full bg-white border border-gray-300 rounded-lg mt-2 shadow-lg max-h-80 overflow-auto">
                    <div className="coupon-section1">
                      {/* --- Mã đã lưu --- */}
                      {savedCoupons.length > 0 &&
                        savedCoupons.map((coupon) => (
                          <div
                            key={coupon.code}
                            onClick={() => {
                              setCouponInput(coupon.code);
                              applyCoupon(coupon.code);
                              setIsOpen(false);
                            }}
                            className={`coupon1 cursor-pointer flex gap-2 p-2 hover:bg-gray-100 transition ${
                              couponInput === coupon.code ? "bg-green-100" : ""
                            }`}
                          >
                            <div className="right-part font-bold text-xs text-gray-500">
                              PHIẾU GIẢM GIÁ
                            </div>
                            <div className="left-part flex-1">
                              <p className="code font-semibold">
                                Mã: {coupon.code}
                              </p>
                              <div className="discount-box flex items-center gap-2 mt-1">
                                <span className="title text-xs text-gray-500">
                                  MÃ GIẢM
                                </span>
                                <div className="percent font-bold text-green-600">
                                  {coupon.discount_type === "percentage"
                                    ? `Giảm ${coupon.discount_value}%`
                                    : `Giảm ${parseInt(
                                        coupon.discount_value
                                      ).toLocaleString("vi")}đ`}
                                </div>
                              </div>
                              <p className="desc text-xs text-gray-400 mt-1">
                                Áp dụng từ{" "}
                                {new Date(coupon.start_date).toLocaleDateString(
                                  "vi-VN"
                                )}{" "}
                                đến{" "}
                                {new Date(coupon.end_date).toLocaleDateString(
                                  "vi-VN"
                                )}
                              </p>
                            </div>
                          </div>
                        ))}

                      {/* --- Ngăn cách --- */}
                      {savedCoupons.length > 0 &&
                        allCoupons.some(
                          (c) => !savedCoupons.find((s) => s.code === c.code)
                        ) && (
                          <div className="my-2 border-t border-gray-300 text-center text-gray-500 text-xs uppercase">
                            Mã gợi ý từ hệ thống
                          </div>
                        )}

                      {/* --- Mã gợi ý --- */}
                      {allCoupons
                        .filter(
                          (coupon) =>
                            !savedCoupons.find((c) => c.code === coupon.code)
                        )
                        .map((coupon) => (
                          <div
                            key={coupon.code}
                            className="coupon1 flex gap-2 p-2 bg-gray-100 text-gray-400 cursor-not-allowed"
                          >
                            <div className="right-part font-bold text-xs text-gray-500">
                              PHIẾU GỢI Ý
                            </div>
                            <div className="left-part flex-1">
                              <p className="code font-semibold">
                                Mã: {coupon.code}
                              </p>
                              <div className="discount-box flex items-center gap-2 mt-1">
                                <span className="title text-xs text-gray-500">
                                  MÃ GIẢM
                                </span>
                                <div className="percent font-bold text-gray-400">
                                  {coupon.discount_type === "percentage"
                                    ? `Giảm ${coupon.discount_value}%`
                                    : `Giảm ${parseInt(
                                        coupon.discount_value
                                      ).toLocaleString("vi")}đ`}
                                </div>
                              </div>
                              <p className="desc text-xs text-gray-400 mt-1">
                                Áp dụng từ{" "}
                                {new Date(coupon.start_date).toLocaleDateString(
                                  "vi-VN"
                                )}{" "}
                                đến{" "}
                                {new Date(coupon.end_date).toLocaleDateString(
                                  "vi-VN"
                                )}
                              </p>
                              <button
                                className="mt-1 text-sm text-blue-600 underline"
                                onClick={async () => {
                                  if (!userId) {
                                    toast.error(
                                      "Bạn cần đăng nhập để lưu mã này!"
                                    );
                                    return;
                                  }
                                  try {
                                    await saveUserCoupon(userId, coupon.code);
                                    const updated = await getSavedUserCoupons(
                                      userId
                                    );
                                    setSavedCoupons(updated);
                                    toast.success(
                                      `Đã lưu mã ${coupon.code} vào ví voucher của bạn`
                                    );
                                  } catch (error) {
                                    console.error(error);
                                    toast.error(
                                      "Có lỗi xảy ra khi lưu mã. Vui lòng thử lại!"
                                    );
                                  }
                                }}
                              >
                                Lưu mã này
                              </button>
                            </div>
                          </div>
                        ))}

                      {/* --- Khi không có mã nào cả --- */}
                      {savedCoupons.length === 0 && allCoupons.length === 0 && (
                        <p className="text-gray-500 text-sm p-2">
                          Bạn chưa có mã giảm giá nào trong giỏ hàng.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              {appliedCoupon && (
                <p className="text-green-600 mt-2 text-sm">
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
