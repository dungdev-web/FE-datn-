"use client";
import React, { forwardRef, useEffect, useState } from "react";
import { ICart, ICartItem } from "@/types/cart";
import { checkToken } from "@/services/authService";
import { getMockCartByUser } from "@/services/cartService";

const TopCart = forwardRef<HTMLDivElement>((_props, ref) => {
  const [cart, setCart] = useState<ICart | null>(null);

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

  return (
    <div className="top-cart-content hidden-sm hidden-xs" ref={ref}>
      <ul id="cart-sidebar" className="mini-products-list count_li">
        <ul className="list-item-cart">
          {cart?.items.map((item: ICartItem) => (
            <li
              className="item productid-105205720"
              key={item.cart_items_id}
            >
              <div className="wrap_item">
                <a
                  className="product-image"
                  href="/giay-nam-nike-air-max"
                  title={item.variant?.name}
                >
                  <img
                    alt={item.variant?.name}
                    src={item.variant?.color.image}
                    width="80"
                  />
                </a>
                <div className="detail-item">
                  <div className="product-details">
                    <a
                      href="javascript:;"
                      data-id="105205720"
                      title="Xóa"
                      className="remove-item-cart fa fa-close"
                    >
                      &nbsp;
                    </a>
                    <h3 className="product-name">
                      <a
                        href="/giay-nam-nike-air-max"
                        title={item.variant?.name}
                      >
                        {item.variant?.name} - {item.variant?.color.name_color} - {item.variant?.size.number_size}
                      </a>
                    </h3>
                  </div>
                  <div className="product-details-bottom">
                    <span className="price">
                      {item.price.toLocaleString("vi-VN")}₫
                    </span>
                    <span className="hidden quaty item_quanty_count">
                      x {item.quantity}
                    </span>
                    <div className="quantity-select qty_drop_cart">
                      <input
                        className="variantID"
                        type="hidden"
                        name="variantId"
                      />
                      <button className="btn_reduced reduced items-count btn-minus" type="button">
                        <i className="fa fa-minus"></i>
                      </button>
                      <input
                        type="text"
                        maxLength={12}
                        className="input-text number-sidebar"
                        name="Lines"
                        size={4}
                        value={item.quantity}
                        readOnly
                      />
                      <button className="btn_increase increase items-count btn-plus" type="button">
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="wrap_total">
          <div className="top-subtotal hidden">
            Phí vận chuyển:
            <span className="pricex">Tính khi thanh toán</span>
          </div>
          <div className="top-subtotal">
            Tổng tiền tạm tính:{" "}
            <span className="price">
              {cart
                ? cart.items
                    .reduce((total, item) => total + item.price * item.quantity, 0)
                    .toLocaleString("vi-VN")
                : "0"}
              ₫
            </span>
          </div>
        </div>

        <div className="wrap_button">
          <div className="actions">
            <a
              href="/cart"
              className="btn btn-gray btn-cart-page pink hidden"
            >
              <span>Đến giỏ hàng</span>
            </a>
            <a
              href="/checkout"
              className="btn btn-gray btn-checkout pink"
              title="Thanh toán"
            >
              <span>Tiến hành thanh toán</span>
            </a>
          </div>
        </div>
      </ul>
    </div>
  );
});

export default TopCart;
