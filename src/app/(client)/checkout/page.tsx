import "../css/checkout.css";
import "../css/style.css";
export default function Checkout() {
  return (
    <>
      <div className="checkout-container !mt-[170px]">
        <div className="checkout-left">
          <a href="">TERA Shoes</a>
          <h3>Thông tin nhận hàng</h3>
          <form id="checkout-form">
            <input type="email" placeholder="Email" required />
            <input type="text" placeholder="Họ và tên" required />
            <input type="tel" placeholder="Số điện thoại (tùy chọn)" />
            <input type="text" placeholder="Địa chỉ (tùy chọn)" />
            <select id="province" required></select>
            <select id="district" required></select>
            <select id="ward" required></select>
            <textarea placeholder="Ghi chú (tùy chọn)"></textarea>
          </form>
        </div>

        <div className="checkout-extra">
          <h3>Vận chuyển</h3>
          <p className="vanchuyen">Vui lòng nhập thông tin giao hàng</p>
          <h3>Thanh toán</h3>
          <div className="boc1">
            <input type="radio" name="payment" className="input-radio" />
            <label> Chuyển khoản </label>
            <i
              style={{ color: "#337ab7" }}
              className="fa-solid fa-money-bill"
            ></i>
          </div>
          <div className="boc1">
            <input
              type="radio"
              name="payment"
              className="input-radio"
              readOnly
              checked
            />
            <label>Thu hộ (COD)</label>
            <i
              style={{ color: "#337ab7" }}
              className="fa-solid fa-money-bill"
            ></i>
          </div>
        </div>

        <div className="checkout-right">
          <h3>Đơn hàng (1 sản phẩm)</h3>
          <div className="items">
            <div className="order-item">
              <img
                src="https://bizweb.dktcdn.net/100/493/370/products/126196-002-650x650-115fc0e823304481a9e282f4c63c4e42-jpeg.jpg?v=1699864029033g"
                alt="Chuck Taylor"
              />
              <span>Chuck Taylor All Star Classic R</span>
              <span>1.359.000đ</span>
            </div>
            <div className="order-item">
              <img
                src="https://bizweb.dktcdn.net/100/493/370/products/126196-002-650x650-115fc0e823304481a9e282f4c63c4e42-jpeg.jpg?v=1699864029033g"
                alt="Chuck Taylor"
              />
              <span>Chuck Taylor All Star Classic R</span>
              <span>1.359.000đ</span>
            </div>
            <div className="order-item">
              <img
                src="https://bizweb.dktcdn.net/100/493/370/products/126196-002-650x650-115fc0e823304481a9e282f4c63c4e42-jpeg.jpg?v=1699864029033g"
                alt="Chuck Taylor"
              />
              <span>Chuck Taylor All Star Classic R</span>
              <span>1.359.000đ</span>
            </div>
            <div className="order-item">
              <img
                src="https://bizweb.dktcdn.net/100/493/370/products/126196-002-650x650-115fc0e823304481a9e282f4c63c4e42-jpeg.jpg?v=1699864029033g"
                alt="Chuck Taylor"
              />
              <span>Chuck Taylor All Star Classic R</span>
              <span>1.359.000đ</span>
            </div>
            <div className="order-item">
              <img
                src="https://bizweb.dktcdn.net/100/493/370/products/126196-002-650x650-115fc0e823304481a9e282f4c63c4e42-jpeg.jpg?v=1699864029033g"
                alt="Chuck Taylor"
              />
              <span>Chuck Taylor All Star Classic R</span>
              <span>1.359.000đ</span>
            </div>
          </div>

          <div className="discound">
            <input type="text" placeholder="Nhập mã giảm giá" />
            <button>Áp dụng</button>
          </div>
          <div className="tinhtien">
            <div className="tamtinh">
              <p>Tạm tính: </p>
              <span>1.359.000đ</span>
            </div>
            <div className="tamtinh" style={{ borderBottom: "1px solid #ddd" }}>
              <p>Phí vận chuyển: </p>
              <span>-</span>
            </div>
          </div>
          <h3 style={{ padding: "10px 0" }}>
            Tổng cộng: <span>1.359.000đ</span>
          </h3>
          <button id="order-button">ĐẶT HÀNG</button>
          <p id="order-status" style={{ color: "green", display: "none" }}>
            Đặt hàng thành công!
          </p>
        </div>
      </div>
    </>
  );
}
