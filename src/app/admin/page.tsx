"use client";
import "./css/dashboard.css";
import "./css/css.css";
import RevenueAndVisitsChart from "./component_admin/Chart";
export default function Home_admin() {
  return (
    <div>
      <main className="main-content">
        <div className="revenue-cards">
          <div className="revenue-card">
            <div className="icon">
              <i className="fa-solid fa-calendar-day"></i>
            </div>
            <div className="info">
              <p className="title">Doanh thu ngày</p>
              <p className="number">12.000.000₫</p>
            </div>
          </div>
          <div className="revenue-card">
            <div className="icon">
              <i className="fa-solid fa-calendar-week"></i>
            </div>
            <div className="info">
              <p className="title">Doanh thu tuần</p>
              <p className="number">56.000.000₫</p>
            </div>
          </div>
          <div className="revenue-card">
            <div className="icon">
              <i className="fa-solid fa-calendar-alt"></i>
            </div>
            <div className="info">
              <p className="title">Doanh thu tháng</p>
              <p className="number">230.000.000₫</p>
            </div>
          </div>
          <div className="revenue-card">
            <div className="icon">
              <i className="fa-solid fa-calendar"></i>
            </div>
            <div className="info">
              <p className="title">Doanh thu năm</p>
              <p className="number">2.800.000.000₫</p>
            </div>
          </div>
        </div>
        <div className="dashboard-cards">
          <div className="card">
            <div className="icon">
              <i className="fa-solid fa-boxes-stacked"></i>
            </div>
            <div className="info">
              <p className="title">Số lượng sản phẩm</p>
              <p className="number">5</p>
              <a href="#" className="details-link">
                (Xem chi tiết)
              </a>
            </div>
          </div>
          <div className="card">
            <div className="icon">
              <i className="fa-solid fa-tags"></i>
            </div>
            <div className="info">
              <p className="title">Tổng số nhãn hiệu</p>
              <p className="number">4</p>
              <a href="#" className="details-link">
                (Xem chi tiết)
              </a>
            </div>
          </div>
          <div className="card">
            <div className="icon">
              <i className="fa-solid fa-layer-group"></i>
            </div>
            <div className="info">
              <p className="title">Tổng số danh mục</p>
              <p className="number">4</p>
              <a href="#" className="details-link">
                (Xem chi tiết)
              </a>
            </div>
          </div>
          <div className="card">
            <div className="icon">
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
            <div className="info">
              <p className="title">Tổng số đơn hàng</p>
              <p className="number">7</p>
              <a href="#" className="details-link">
                (Xem chi tiết)
              </a>
            </div>
          </div>

          <div className="card">
            <div className="icon">
              <i className="fa-solid fa-users"></i>
            </div>
            <div className="info">
              <p className="title">Tổng số user</p>
              <p className="number">6</p>
              <a href="#" className="details-link">
                (Xem chi tiết)
              </a>
            </div>
          </div>
          <div className="card">
            <div className="icon">
              <i className="fa-solid fa-star-half-stroke"></i>
            </div>
            <div className="info">
              <p className="title">Tổng số đánh giá</p>
              <p className="number">6</p>
              <a href="#" className="details-link">
                (Xem chi tiết)
              </a>
            </div>
          </div>
          <div className="card">
            <div className="icon">
              <i className="fa-solid fa-folder-open"></i>
            </div>
            <div className="info">
              <p className="title">Tổng số danh mục bài viết</p>
              <p className="number">6</p>
              <a href="#" className="details-link">
                (Xem chi tiết)
              </a>
            </div>
          </div>
          <div className="card">
            <div className="icon">
              <i className="fa-solid fa-newspaper"></i>
            </div>
            <div className="info">
              <p className="title">Tổng số bài viết</p>
              <p className="number">2</p>
              <a href="#" className="details-link">
                (Xem chi tiết)
              </a>
            </div>
          </div>
        </div>
        <RevenueAndVisitsChart />

        <div className="order-list">
          <h2>Danh sách đơn hàng gần đây</h2>
          <table className="order-table">
            <thead>
              <tr>
                <th>Mã đơn hàng</th>
                <th>Người nhận</th>
                <th>Điện thoại</th>
                <th>Trạng thái</th>
                <th>Sản phẩm</th>
                <th>Thành tiền</th>
                <th>Ngày đặt</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ORD10001</td>
                <td>Nguyễn Văn A</td>
                <td>0901234567</td>
                <td>
                  <span className="status-label status-pending">
                    Chờ xác nhận
                  </span>
                </td>
                <td>
                  <span className="category-tag">Giày thể thao</span>
                </td>
                <td>300.000 đ</td>
                <td>08-05-2025</td>
              </tr>
              <tr>
                <td>ORD10002</td>
                <td>Nguyễn Văn A</td>
                <td>0912345678</td>
                <td>
                  <span className="status-label status-confirmed">
                    Đã xác nhận
                  </span>
                </td>
                <td>
                  <span className="category-tag">Áo hoodie</span>
                </td>
                <td>300.000 đ</td>
                <td>08-05-2025</td>
              </tr>
              <tr>
                <td>ORD10003</td>
                <td>Nguyễn Văn A</td>
                <td>0923456789</td>
                <td>
                  <span className="status-label status-shipping">
                    Đang giao hàng
                  </span>
                </td>
                <td>
                  <span className="category-tag">Ba lô</span>
                </td>
                <td>300.000 đ</td>
                <td>08-05-2025</td>
              </tr>
              <tr>
                <td>ORD10004</td>
                <td>Nguyễn Văn A</td>
                <td>0934567890</td>
                <td>
                  <span className="status-label status-delivered">Đã giao</span>
                </td>
                <td>
                  <span className="category-tag">Túi xách</span>
                </td>
                <td>300.000 đ</td>
                <td>08-05-2025</td>
              </tr>
              <tr>
                <td>ORD10005</td>
                <td>Nguyễn Văn A</td>
                <td>0945678901</td>
                <td>
                  <span className="status-label status-cancelled">Đã hủy</span>
                </td>
                <td>
                  <span className="category-tag">Mũ lưỡi trai</span>
                </td>
                <td>300.000 đ</td>
                <td>08-05-2025</td>
              </tr>
              <tr>
                <td>ORD10006</td>
                <td>Nguyễn Văn A</td>
                <td>0956789012</td>
                <td>
                  <span className="status-label status-returned">Hoàn trả</span>
                </td>
                <td>
                  <span className="category-tag">Áo thun</span>
                </td>
                <td>300.000 đ</td>
                <td>08-05-2025</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="dashboard-section">
          <div className="top-products">
            <h3>
              <i className="fas fa-fire text-red"></i> Top sản phẩm bán chạy
            </h3>
            <div className="product-list">
              <div className="product-card">
                <img
                  src="/images/products/chaybo/ConverseRunStarMotion.webp"
                  alt="Sản phẩm"
                />
                <div className="product-info">
                  <p className="name">Giày Nike Air Max</p>
                  <p className="sold">
                    Đã bán: <strong>120</strong> đôi
                  </p>
                  <p className="revenue">
                    Doanh thu: <strong>24,000,000 ₫</strong>
                  </p>
                </div>
              </div>
            </div>
            <div className="product-list">
              <div className="product-card">
                <img
                  src="/images/products/chaybo/ConverseRunStarMotion.webp"
                  alt="Sản phẩm"
                />
                <div className="product-info">
                  <p className="name">Giày Nike Air Max</p>
                  <p className="sold">
                    Đã bán: <strong>120</strong> đôi
                  </p>
                  <p className="revenue">
                    Doanh thu: <strong>24,000,000 ₫</strong>
                  </p>
                </div>
              </div>
            </div>
            <div className="product-list">
              <div className="product-card">
                <img
                  src="/images/products/chaybo/ConverseRunStarMotion.webp"
                  alt="Sản phẩm"
                />
                <div className="product-info">
                  <p className="name">Giày Nike Air Max</p>
                  <p className="sold">
                    Đã bán: <strong>120</strong> đôi
                  </p>
                  <p className="revenue">
                    Doanh thu: <strong>24,000,000 ₫</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="low-stock">
            <h3>
              <i className="fas fa-triangle-exclamation text-warning"></i> Cảnh
              báo tồn kho thấp
            </h3>
            <div className="stock-list">
              <div className="stock-item">
                <img
                  src="/images/products/chaybo/GiàyNamJordanMaxAura.webp"
                  alt="Sản phẩm"
                />
                <div className="stock-info">
                  <p className="name">Áo Hoodie Local Brand</p>
                  <p className="stock">
                    Tồn kho: <span className="low">3</span> cái
                  </p>
                </div>
              </div>
            </div>
            <div className="stock-list">
              <div className="stock-item">
                <img
                  src="/images/products/chaybo/GiàyNamJordanMaxAura.webp"
                  alt="Sản phẩm"
                />
                <div className="stock-info">
                  <p className="name">Áo Hoodie Local Brand</p>
                  <p className="stock">
                    Tồn kho: <span className="low">3</span> cái
                  </p>
                </div>
              </div>
            </div>
            <div className="stock-list">
              <div className="stock-item">
                <img
                  src="/images/products/chaybo/GiàyNamJordanMaxAura.webp"
                  alt="Sản phẩm"
                />
                <div className="stock-info">
                  <p className="name">Áo Hoodie Local Brand</p>
                  <p className="stock">
                    Tồn kho: <span className="low">3</span> cái
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="notification-box">
            <h3>
              <i className="fas fa-bell text-info"></i> Đơn hàng đang chờ xác
              nhận
            </h3>
            <ul className="notification-list">
              <li>
                <strong>Đơn #1023</strong> – Khách: <em>Nguyễn Văn A</em>
                <br />
                Ngày đặt: 12/05/2025 – Tổng tiền: <strong>1,200,000₫</strong>
              </li>
              <li>
                <strong>Đơn #1024</strong> – Khách: <em>Trần Thị B</em>
                <br />
                Ngày đặt: 12/05/2025 – Tổng tiền: <strong>850,000₫</strong>
              </li>
              <li>
                <strong>Đơn #1025</strong> – Khách: <em>Lê Văn C</em>
                <br />
                Ngày đặt: 13/05/2025 – Tổng tiền: <strong>2,450,000₫</strong>
              </li>
              <li>
                <strong>Đơn #1025</strong> – Khách: <em>Lê Văn C</em>
                <br />
                Ngày đặt: 13/05/2025 – Tổng tiền: <strong>2,450,000₫</strong>
              </li>
            </ul>
          </div>
        </div>

        <div className="dashboard-section">
          <div className="internal-news">
            <h3>
              <i className="fas fa-bullhorn"></i> Tin nội bộ
            </h3>
            <ul className="news-list">
              <li>
                <i className="fas fa-server text-blue"></i> Hệ thống đã được
                backup lúc 03:00 sáng
              </li>
              <li>
                <i className="fas fa-exclamation-triangle text-warning"></i> Lỗi
                kết nối API lúc 10:30 – đã khắc phục
              </li>
              <li>
                <i className="fas fa-bolt text-purple"></i> Chiến dịch khuyến
                mãi “Hè rực rỡ” sẽ bắt đầu 20/05
              </li>
              <li>
                <i className="fas fa-check text-green"></i> 3 bài viết marketing
                mới đã được duyệt
              </li>
            </ul>
          </div>

          <div className="quick-actions">
            <h3>
              <i className="fas fa-bolt"></i> Hành động nhanh
            </h3>
            <div className="action-buttons">
              <button>
                <i className="fas fa-plus-circle"></i> Tạo sản phẩm mới
              </button>
              <button>
                <i className="fas fa-receipt"></i> Tạo đơn hàng thủ công
              </button>
              <button>
                <i className="fas fa-envelope"></i> Gửi email khuyến mãi
              </button>
              <button>
                <i className="fas fa-tags"></i> Quản lý giảm giá
              </button>
              <button>
                <i className="fas fa-newspaper"></i> Duyệt bài viết
              </button>
            </div>
          </div>

          <div className="alerts-system">
            <h3>
              <i className="fas fa-exclamation-circle"></i> Cảnh báo hệ thống
            </h3>
            <ul className="alert-list">
              <li>
                <i className="fas fa-clock text-danger"></i> 5 đơn hàng chưa xử
                lý 24h
              </li>
              <li>
                <i className="fas fa-star-half-alt text-orange"></i> 2 đánh giá
                mới cần kiểm duyệt
              </li>
              <li>
                <i className="fas fa-box-open text-red"></i> 4 sản phẩm thiếu
                ảnh hoặc giá = 0
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
