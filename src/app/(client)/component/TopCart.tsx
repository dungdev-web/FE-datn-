"use client";
import React, { forwardRef } from "react";
import { useCart } from "@/hooks/useCart";
import { API_BASE_URL } from "@/config/env";

const TopCart = forwardRef<HTMLDivElement>((_props, ref) => {
  const { cart, subtotal, handlePlus, handleMinus, handleRemoveItem } =
    useCart();

  return (
    <div className="top-cart-content hidden-sm hidden-xs" ref={ref}>
      <ul id="cart-sidebar" className="mini-products-list count_li">
        <ul className="list-item-cart">
          {(cart?.cart_items ?? []).map((item) => {
            const price =
              item.variant?.product?.sale_price ??
              item.variant?.product?.price ??
              0;

            return (
              <li className="item" key={item.cart_items_id}>
                <div className="wrap_item">
                  <a
                    className="product-image"
                    href={`/product/${item.variant?.product.products_id}`}
                    title={item.variant?.product.name}
                  >
                    <img
                      alt={item.variant?.product.name}
                      src={
                        item.variant?.color.images
                          ? `${API_BASE_URL}/uploads/${item.variant.color.images}`
                          : "/images/placeholder.png"
                      }
                      width="80"
                    />
                  </a>
                  <div className="detail-item">
                    <div className="product-details">
                      <button
                        title="Xoá"
                        className="remove-item-cart"
                        onClick={() => handleRemoveItem(item.cart_items_id)}
                      >
                        <i className="fa-solid fa-trash text-red-600"></i>
                      </button>
                      <h3 className="product-name">
                        <a
                          href={`/product/${item.variant?.product.products_id}`}
                        >
                          {item.variant?.product.name} -{" "}
                          {item.variant?.color.name_color} -{" "}
                          {item.variant?.size.number_size}
                        </a>
                      </h3>
                    </div>
                    <div className="product-details-bottom">
                      <span className="price">
                        {price.toLocaleString("vi")}₫
                      </span>
                      <div className="quantity-select qty_drop_cart">
                        <button
                          className="btn_reduced items-count btn-minus"
                          type="button"
                          onClick={() => handleMinus(item.cart_items_id)}
                        >
                          <i className="fa fa-minus"></i>
                        </button>
                        <input
                          type="text"
                          readOnly
                          className="input-text number-sidebar"
                          value={item.quantity}
                        />
                        <button
                          className="btn_increase items-count btn-plus"
                          type="button"
                          onClick={() => handlePlus(item.cart_items_id)}
                        >
                          <i className="fa fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="wrap_total">
          <div className="top-subtotal hidden">
            Phí vận chuyển: <span className="pricex">Tính khi thanh toán</span>
          </div>
          <div className="top-subtotal">
            Tổng tiền tạm tính:{" "}
            <span className="price">{subtotal.toLocaleString("vi-VN")}₫</span>
          </div>
        </div>

        <div className="wrap_button">
          <div className="actions">
            <a href="/cart" className="btn btn-gray btn-cart-page pink hidden">
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
