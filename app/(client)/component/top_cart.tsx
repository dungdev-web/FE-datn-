import React, { forwardRef } from "react";

const TopCart = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
      <div className="top-cart-content hidden-sm hidden-xs" ref={ref}>
        <ul id="cart-sidebar" className="mini-products-list count_li">
          <ul className="list-item-cart">
            <li className="item productid-105205720">
              <div className="wrap_item">
                <a
                  className="product-image"
                  href="/giay-nam-nike-air-max"
                  title="Giày Nam Nike Air Max - Xanh dương"
                >
                  <img
                    alt="Giày Nam Nike Air Max - Xanh dương"
                    src="https://bizweb.dktcdn.net/100/505/077/products/layer1d87b62817a694e059205f86f.jpg?v=1702350240540"
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
                        title="Giày Nam Nike Air Max - Xanh dương"
                      >
                        Giày Nam Nike Air Max - Xanh dương
                      </a>
                    </h3>
                  </div>
                  <div className="product-details-bottom">
                    <span className="price">3.200.000₫</span>
                    <span className="hidden quaty item_quanty_count"> x 1</span>
                    <div className="quantity-select qty_drop_cart">
                      <input
                        className="variantID"
                        type="hidden"
                        name="variantId"
                      />
                      <button
                        className="btn_reduced reduced items-count btn-minus"
                        type="button"
                      >
                        <i className="fa fa-minus"></i>
                      </button>
                      <input
                        type="text"
                        maxLength={12}
                        className="input-text number-sidebar qty105205720"
                        id="qty105205720"
                        name="Lines"
                        size={4}
                        defaultValue="1"
                      />
                      <button
                        className="btn_increase increase items-count btn-plus"
                        type="button"
                      >
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div className="wrap_total">
            <div className="top-subtotal hidden">
              Phí vận chuyển:
              <span className="pricex">Tính khi thanh toán</span>
            </div>
            <div className="top-subtotal">
              Tổng tiền tạm tính: <span className="price">3.200.000₫</span>
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
