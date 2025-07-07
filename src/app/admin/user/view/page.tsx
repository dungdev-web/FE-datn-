import Link from "next/link";
import "../../css/auth_admin.css";
import "../../css/css.css";
import "../../css/dashboard.css";
export default function ViewUser() {
  return (
    <>
        <section className="user-detail-card">
          <div className="user-header">
            <img
              src="/images/logo/anhdep.jpg"
              alt="Ảnh đại diện"
              className="user-avatar"
            />
            <div className="user-basic-info">
              <h1 className="user-name">Nguyễn Văn A</h1>
              <p className="user-role">Quản trị viên hệ thống</p>
            </div>
            <div className="action-buttons">
              <Link href={'/admin/user'} className="btn-back">
                <i className="fa-solid fa-arrow-left"></i> Quay lại
              </Link>
            </div>
          </div>

          <div className="user-section">
            <h2>Thông tin liên hệ</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">Email</span>
                <span className="value">a.nguyen@example.com</span>
              </div>
              <div className="info-item">
                <span className="label">Điện thoại</span>
                <span className="value">0901234567</span>
              </div>
              <div className="info-item">
                <span className="label">Địa chỉ</span>
                <span className="value">123 Đường ABC, Quận 1, TP.HCM</span>
              </div>
            </div>
          </div>

          <div className="user-section">
            <h2>Thông tin hệ thống</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">Vai trò</span>
                <span className="value">Admin</span>
              </div>
              <div className="info-item">
                <span className="label">Trạng thái</span>
                <span className="status-label active">Hoạt động</span>
              </div>
              <div className="info-item">
                <span className="label">Ngày tạo</span>
                <span className="value">10/05/2023</span>
              </div>
            </div>
          </div>
        </section>
        <div className="order-list">
          <h2>Danh sách đơn hàng của nguyễn văn A</h2>

          <div className="actions">
            <button className="btn btn-search">
              <i className="fa-solid fa-magnifying-glass"></i> Tìm kiếm
            </button>
            <button className="btn btn-refresh">
              <i className="fa-solid fa-rotate-right"></i> Refresh
            </button>
            <button className="btn btn-export">
              <i className="fa-solid fa-file-export"></i> Xuất dữ liệu
            </button>
          </div>

          <table className="order-table">
            <thead>
              <tr>
                <th>Mã đơn hàng</th>
                <th>Người nhận</th>
                <th>Điện thoại</th>
                <th>Trạng thái</th>
                <th>Sản phẩm</th>
                <th>Ngày đặt</th>
              </tr>
              <tr className="filter-row">
                <th>
                  <input type="text" placeholder="Lọc mã đơn..." />
                </th>
                <th></th>
                <th></th>
                <th>
                  <select>
                    <option value="">Tất cả trạng thái</option>
                    <option value="pending">Chờ xác nhận</option>
                    <option value="confirmed">Đã xác nhận</option>
                    <option value="shipping">Đang giao hàng</option>
                    <option value="delivered">Đã giao</option>
                    <option value="cancelled">Đã hủy</option>
                    <option value="returned">Hoàn trả</option>
                  </select>
                </th>

                <th>
                  <input type="text" placeholder="Lọc sản phẩm..." />
                </th>
                <th></th>
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
                <td>08-05-2025</td>
              </tr>
            </tbody>
          </table>
          <div className="pagination">
            <button className="page-btn" disabled>
              <i className="fa-solid fa-angle-left"></i>
            </button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <button className="page-btn">4</button>
            <button className="page-btn">...</button>
            <button className="page-btn">10</button>
            <button className="page-btn">
              <i className="fa-solid fa-angle-right"></i>
            </button>
          </div>
        </div>
    </>
  );
}
