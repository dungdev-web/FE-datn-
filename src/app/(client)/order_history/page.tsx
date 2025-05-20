"use client";
import { useState } from "react";
import "../css/order-history.css";
export default function Order_history() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const orders = [
    {
      id: 12345,
      date: "23/04/2025 14:35",
      total: "1.200.000đ",
      statusText: "Chờ xác nhận",
      statusIcon: "🕒",
      statusColor: "bg-yellow-500",
      address:"76 Đường 6 KP4 Bình Trưng Tây, TP. Thủ Đức, Hồ Chí Minh, Quận 3, TP Hồ Chí Minh, Vietnam",
      canCancel: true,
    },
    {
      id: 12346,
      date: "22/04/2025 09:20",
      total: "850.000đ",
      statusText: "Đang giao",
      statusIcon: "🚚",
      statusColor: "bg-blue-600",
      address:"76 Đường 6 KP4 Bình Trưng Tây, TP. Thủ Đức, Hồ Chí Minh, Quận 3, TP Hồ Chí Minh, Vietnam",
      canCancel: false,
    },
    {
      id: 12347,
      date: "20/04/2025 17:50",
      total: "500.000đ",
      statusText: "Hoàn thành",
      statusIcon: "✅",
      statusColor: "bg-green-600",
      address:"76 Đường 6 KP4 Bình Trưng Tây, TP. Thủ Đức, Hồ Chí Minh, Quận 3, TP Hồ Chí Minh, Vietnam",
      canCancel: false,
    },
    {
      id: 12348,
      date: "19/04/2025 12:15",
      total: "2.000.000đ",
      statusText: "Đã huỷ",
      statusIcon: "❌",
      statusColor: "bg-red-600",
      address:"76 Đường 6 KP4 Bình Trưng Tây, TP. Thủ Đức, Hồ Chí Minh, Quận 3, TP Hồ Chí Minh, Vietnam",
      canCancel: false,
    },
  ];

  // Hàm mở modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Hàm đóng modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="intro-banner">
        <div className="intro-content">
          <h1>Tin tức</h1>
          <p>
            <a href="/index.html">Trang chủ</a> • Liên hệ
          </p>
        </div>
      </div>
      <main style={{paddingTop:"150px"}}>
        <h2>Đơn hàng của bạn</h2>
        <div className="max-md:hidden md:block ">
          <div className="order-list  ">
            <div className="order-header">
              <span>Mã Đơn Hàng</span>
              <span>Ngày Đặt Hàng</span>
              <span>Tổng Tiền</span>
              <span>Trạng Thái</span>
              <span>Chi Tiết</span>
              <span>Thao tác</span>
            </div>

            <div className="order-item">
              <span>#12345</span>
              <span>23/04/2025 14:35</span>
              <span>1.200.000đ</span>
              <span>
                <span className="status pending">🕒 Chờ xác nhận</span>
              </span>
              <a href="#" className="btn1 btn-view" onClick={openModal}>
                Xem
              </a>
              <a href="#" className="btn1 btn-cancel">
                Hủy
              </a>
            </div>

            <div className="order-item">
              <span>#12346</span>
              <span>22/04/2025 09:20</span>
              <span>850.000đ</span>
              <span>
                <span className="status shipping">🚚 Đang giao</span>
              </span>
              <a href="#" className="btn1 btn-view" onClick={openModal}>
                Xem
              </a>
              <span></span>
            </div>

            <div className="order-item">
              <span>#12347</span>
              <span>20/04/2025 17:50</span>
              <span>500.000đ</span>
              <span>
                <span className="status completed">✅ Hoàn thành</span>
              </span>
              <a href="#" className="btn1 btn-view" onClick={openModal}>
                Xem
              </a>
              <span></span>
            </div>

            <div className="order-item">
              <span>#12348</span>
              <span>19/04/2025 12:15</span>
              <span>2.000.000đ</span>
              <span>
                <span className="status cancelled">❌ Đã hủy</span>
              </span>
              <a href="#" className="btn1 btn-view" onClick={openModal}>
                Xem
              </a>
              <span></span>
            </div>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="block md:hidden space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border rounded shadow !p-[4px] text-sm">
              <div className="flex !justify-between">
              <div className="mb-2">
                <strong>Mã đơn:</strong> #{order.id}
              </div>
              <div className="mb-2">
                <strong>Ngày đặt:</strong> {order.date}
              </div>
              </div> 
              <div className="mb-2">
                <strong>Địa chỉ:</strong> {order.address}
              </div>
              <div className="mb-2">
                <strong>Tổng tiền:</strong> {order.total}
              </div>
              <div className="mb-2">
                <strong>Trạng thái:</strong>{" "}
                <span
                  className={` !p-[5px] rounded text-white ${order.statusColor}`}
                >
                  {order.statusIcon} {order.statusText}
                </span>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={openModal}
                  className="bg-emerald-500 text-white !p-[3px] rounded"
                >
                  Xem
                </button>
                {order.canCancel && (
                  <button className="bg-red-500 text-white !p-[3px] rounded">
                    Huỷ
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* <!-- Modal Chi Tiết Đơn Hàng --> */}
        {isModalOpen && (
          <div id="orderModal" className="modal">
            <div className="modal-content1">
              <span className="close-btn" onClick={closeModal}>
                &times;
              </span>
              <h2>Chi Tiết Đơn Hàng</h2>

              <div className="order-details">
                <p>
                  <strong>Người đặt:</strong> Nguyễn Văn A
                </p>
                <p>
                  <strong>Email:</strong> nguyenvana@example.com
                </p>
                <p>
                  <strong>Trạng thái đơn hàng:</strong>{" "}
                  <span className="status pending">🕒 Chờ xác nhận</span>
                </p>
                <p>
                  <strong>Địa chỉ:</strong> 123 Đường ABC, Quận 1, TP.HCM
                </p>

                <div className="order-details-header">
                  <span>Tên SP</span>
                  <span>Hình ảnh</span>
                  <span>Số lượng</span>
                  <span>Giá</span>
                  <span>Tổng</span>
                </div>

                <div className="order-details-item">
                  <span>Áo thun Nam</span>
                  <span>
                    <img
                      src="/images/products/chaybo/AirJordanDMP1Retro(xanhlam).webp"
                      alt="Áo thun"
                    />
                  </span>
                  <span>2</span>
                  <span>200.000đ</span>
                  <span>400.000đ</span>
                </div>

                <div className="order-details-item">
                  <span>Quần Jeans</span>
                  <span>
                    <img
                      src="/images/products/chaybo/GiàyNamJordanMaxAura.webp"
                      alt="Quần Jeans"
                    />
                  </span>
                  <span>1</span>
                  <span>800.000đ</span>
                  <span>800.000đ</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      {/* Mobile layout */}
    </>
  );
}
