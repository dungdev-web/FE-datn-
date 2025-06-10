"use client";
import "@/src/app/admin/css/order_admin.css";
import { useState } from "react";

export default function Order() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");

  return (
    <>
      <main className="main-content">
        <div className="order-list">
          <h2>Danh sách đơn hàng</h2>

          <div className="actions">
            <div className={`search-toggle ${isSearching ? "active" : ""}`}>
              {isSearching ? (
                <input
                  type="text"
                  className="search-input"
                  autoFocus
                  placeholder="Nhập từ khóa..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onBlur={() => {
                    if (searchText === "") setIsSearching(false);
                  }}
                />
              ) : (
                <button
                  className="btn btn-search"
                  onClick={() => setIsSearching(true)}
                >
                  <i className="fa-solid fa-magnifying-glass"></i> Tìm kiếm
                </button>
              )}
            </div>
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
                <th>Thao tác</th>
              </tr>
              <tr className="filter-row">
                <th>
                  <input type="text" placeholder="Lọc mã đơn..." />
                </th>
                <th>
                  <input type="text" placeholder="Lọc tên khách hàng..." />
                </th>
                <th>
                  <input type="text" placeholder="Lọc số điện thoại..." />
                </th>
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
                  <select>
                    <option value="">Tất cả</option>
                    <option value="Nike">Nike</option>
                    <option value="Adidas">Adidas</option>
                    <option value="Puma">Puma</option>
                  </select>
                </th>
                <th></th>
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
                <td>
                  <i className="fa-solid fa-eye view-icon" title="Xem"></i>
                  <i
                    className="fa-solid fa-rotate view-status-icon"
                    title="Cập nhật trạng thái"
                  ></i>
                </td>
              </tr>
              <tr>
                <td>ORD10002</td>
                <td>Trần Thị B</td>
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
                <td>
                  <i className="fa-solid fa-eye view-icon" title="Xem"></i>
                  <i
                    className="fa-solid fa-rotate view-status-icon"
                    title="Cập nhật trạng thái"
                  ></i>
                </td>
              </tr>
              <tr>
                <td>ORD10003</td>
                <td>Lê Văn C</td>
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
                <td>
                  <i className="fa-solid fa-eye view-icon" title="Xem"></i>
                  <i
                    className="fa-solid fa-rotate view-status-icon"
                    title="Cập nhật trạng thái"
                  ></i>
                </td>
              </tr>
              <tr>
                <td>ORD10004</td>
                <td>Phạm Thị D</td>
                <td>0934567890</td>
                <td>
                  <span className="status-label status-delivered">Đã giao</span>
                </td>
                <td>
                  <span className="category-tag">Túi xách</span>
                </td>
                <td>08-05-2025</td>
                <td>
                  <i className="fa-solid fa-eye view-icon" title="Xem"></i>
                  <i
                    className="fa-solid fa-rotate view-status-icon"
                    title="Cập nhật trạng thái"
                  ></i>
                </td>
              </tr>
              <tr>
                <td>ORD10005</td>
                <td>Đỗ Văn E</td>
                <td>0945678901</td>
                <td>
                  <span className="status-label status-cancelled">Đã hủy</span>
                </td>
                <td>
                  <span className="category-tag">Mũ lưỡi trai</span>
                </td>
                <td>08-05-2025</td>
                <td>
                  <i className="fa-solid fa-eye view-icon" title="Xem"></i>
                  <i
                    className="fa-solid fa-rotate view-status-icon"
                    title="Cập nhật trạng thái"
                  ></i>
                </td>
              </tr>
              <tr>
                <td>ORD10006</td>
                <td>Vũ Thị F</td>
                <td>0956789012</td>
                <td>
                  <span className="status-label status-returned">Hoàn trả</span>
                </td>
                <td>
                  <span className="category-tag">Áo thun</span>
                </td>
                <td>08-05-2025</td>
                <td>
                  <i className="fa-solid fa-eye view-icon" title="Xem"></i>
                  <i
                    className="fa-solid fa-rotate view-status-icon"
                    title="Cập nhật trạng thái"
                  ></i>
                </td>
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
      </main>
    </>
  );
}
