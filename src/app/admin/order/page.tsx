"use client";

import { useState, useEffect } from "react";
import "../css/order_admin.css";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
export default function OrderPage() {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState("Chờ xác nhận");
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const exportStyledExcel = async (data: any[], fileName: string) => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Danh sách đơn hàng");

    // Header
   sheet.columns = [
  { header: "Mã đơn hàng", key: "maDonHang", width: 20 },
  { header: "Người nhận", key: "nguoiNhan", width: 25 },
  { header: "Điện thoại", key: "dienThoai", width: 15 },
  { header: "Trạng thái", key: "trangThai", width: 20 },
  { header: "Sản phẩm", key: "sanPham", width: 30 },
  { header: "Ngày đặt", key: "ngayDat", width: 15 },
];


    // Style header
    sheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFCCE5FF" },
      };
      cell.border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
      };
    });

    // Thêm dữ liệu
    data.forEach((item) => {
      sheet.addRow(item);
    });

    // Tạo file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `${fileName}.xlsx`);
  };
  const dummyData = [
    {
      maDonHang: "ORD10001",
      nguoiNhan: "Nguyễn Văn A",
      dienThoai: "0901234567",
      trangThai: "Chờ xác nhận",
      sanPham: "Giày thể thao",
      ngayDat: "08-05-2025",
    },
    {
      maDonHang: "ORD10002",
      nguoiNhan: "Trần Thị B",
      dienThoai: "0907654321",
      trangThai: "Đã xác nhận",
      sanPham: "Áo thể thao",
      ngayDat: "07-05-2025",
    },
  ];

  const handleCloseModal = (modal: "view" | "update") => {
    if (modal === "view") setIsViewModalOpen(false);
    if (modal === "update") setIsUpdateModalOpen(false);
  };

  const handleOpenModal = (modal: "view" | "update") => {
    if (modal === "view") setIsViewModalOpen(true);
    if (modal === "update") setIsUpdateModalOpen(true);
  };

  const updateOrderStatus = () => {
    alert("Trạng thái đơn hàng đã cập nhật thành: " + orderStatus);
    handleCloseModal("update");
  };

  return (
    <div>
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
          <button
  className="btn btn-export"
  onClick={() => exportStyledExcel(dummyData, "don-hang")}
>
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
                <i
                  className="fa-solid fa-eye view-icon"
                  title="Xem"
                  onClick={() => handleOpenModal("view")}
                ></i>
                <i
                  className="fa-solid fa-rotate view-status-icon"
                  title="Cập nhật trạng thái"
                  onClick={() => handleOpenModal("update")}
                ></i>
              </td>
            </tr>
            <tr>
              <td>ORD10001</td>
              <td>Nguyễn Văn A</td>
              <td>0901234567</td>
              <td>
                <span className="status-label status-confirmed">
                  Đã xác nhận
                </span>
              </td>
              <td>
                <span className="category-tag">Giày thể thao</span>
              </td>
              <td>08-05-2025</td>
              <td>
                <i
                  className="fa-solid fa-eye view-icon"
                  title="Xem"
                  onClick={() => handleOpenModal("view")}
                ></i>
                <i
                  className="fa-solid fa-rotate view-status-icon"
                  title="Cập nhật trạng thái"
                  onClick={() => handleOpenModal("update")}
                ></i>
              </td>
            </tr>
            <tr>
              <td>ORD10001</td>
              <td>Nguyễn Văn A</td>
              <td>0901234567</td>
              <td>
                <span className="status-label status-delivered">
                  Đã hoàn thành
                </span>
              </td>
              <td>
                <span className="category-tag">Giày thể thao</span>
              </td>
              <td>08-05-2025</td>
              <td>
                <i
                  className="fa-solid fa-eye view-icon"
                  title="Xem"
                  onClick={() => handleOpenModal("view")}
                ></i>
                <i
                  className="fa-solid fa-rotate view-status-icon"
                  title="Cập nhật trạng thái"
                  onClick={() => handleOpenModal("update")}
                ></i>
              </td>
            </tr>
            <tr>
              <td>ORD10001</td>
              <td>Nguyễn Văn A</td>
              <td>0901234567</td>
              <td>
                <span className="status-label status-shipping">
                  Đang giao hàng
                </span>
              </td>
              <td>
                <span className="category-tag">Giày thể thao</span>
              </td>
              <td>08-05-2025</td>
              <td>
                <i
                  className="fa-solid fa-eye view-icon"
                  title="Xem"
                  onClick={() => handleOpenModal("view")}
                ></i>
                <i
                  className="fa-solid fa-rotate view-status-icon"
                  title="Cập nhật trạng thái"
                  onClick={() => handleOpenModal("update")}
                ></i>
              </td>
            </tr>
            <tr>
              <td>ORD10001</td>
              <td>Nguyễn Văn A</td>
              <td>0901234567</td>
              <td>
                <span className="status-label status-cancelled">Đã Hủy</span>
              </td>
              <td>
                <span className="category-tag">Giày thể thao</span>
              </td>
              <td>08-05-2025</td>
              <td>
                <i
                  className="fa-solid fa-eye view-icon"
                  title="Xem"
                  onClick={() => handleOpenModal("view")}
                ></i>
                <i
                  className="fa-solid fa-rotate view-status-icon"
                  title="Cập nhật trạng thái"
                  onClick={() => handleOpenModal("update")}
                ></i>
              </td>
            </tr>
            <tr>
              <td>ORD10001</td>
              <td>Nguyễn Văn A</td>
              <td>0901234567</td>
              <td>
                <span className="status-label status-returned">Hoàn trả</span>
              </td>
              <td>
                <span className="category-tag">Giày thể thao</span>
              </td>
              <td>08-05-2025</td>
              <td>
                <i
                  className="fa-solid fa-eye view-icon"
                  title="Xem"
                  onClick={() => handleOpenModal("view")}
                ></i>
                <i
                  className="fa-solid fa-rotate view-status-icon"
                  title="Cập nhật trạng thái"
                  onClick={() => handleOpenModal("update")}
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

      {isViewModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box slide-in">
            <div className="modal-header">
              <h3>Chi tiết đơn hàng</h3>
              <span
                className="close-icon"
                onClick={() => handleCloseModal("view")}
              >
                &times;
              </span>
            </div>
            <div className="modal-body">
              <ul className="order-detail-list">
                <li>
                  <strong>Mã đơn hàng:</strong> <span>ORD10001</span>
                </li>
                <li>
                  <strong>Người nhận:</strong> <span>Nguyễn Văn A</span>
                </li>
                <li>
                  <strong>Điện thoại:</strong> <span>0901234567</span>
                </li>
                <li>
                  <strong>Sản phẩm:</strong> <span>Giày thể thao </span>{" "}
                  <span>(Size 42)</span>
                </li>
                <li>
                  <strong>Màu:</strong> <span>Đen</span>
                </li>
                <li>
                  <strong>Số Lượng - Giá:</strong> <span>2</span>{" "}
                  <span>700.000 VNĐ</span>
                </li>
                <li>
                  <strong>Ngày đặt:</strong> <span>08-05-2025</span>
                </li>
                <li>
                  <strong>Địa chỉ giao hàng:</strong>{" "}
                  <span>123 Lý Thường Kiệt, Q.10, TP.HCM</span>
                </li>
                <li>
                  <strong>Ghi chú:</strong>{" "}
                  <span>Giao hàng trong giờ hành chính</span>
                </li>
                <li>
                  <strong>Thanh toán:</strong>{" "}
                  <span>COD (Thanh toán khi nhận hàng)</span>
                </li>
                <li>
                  <strong>Trạng thái:</strong>{" "}
                  <span className="badge badge-warning">Chờ xác nhận</span>
                </li>
              </ul>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-close"
                onClick={() => handleCloseModal("view")}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {isUpdateModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box slide-in">
            <div className="modal-header">
              <h3>Cập nhật trạng thái</h3>
              <span
                className="close-icon"
                onClick={() => handleCloseModal("update")}
              >
                &times;
              </span>
            </div>
            <div className="modal-body">
              <label htmlFor="orderStatus">
                <strong>Trạng thái đơn hàng:</strong>
              </label>
              <select
                id="orderStatus"
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
              >
                <option value="Chờ xác nhận">Chờ xác nhận</option>
                <option value="Đã xác nhận">Đã xác nhận</option>
                <option value="Đang giao hàng">Đang giao hàng</option>
                <option value="Đã giao">Đã giao</option>
                <option value="Đã hủy">Đã hủy</option>
                <option value="Hoàn trả">Hoàn trả</option>
              </select>
            </div>
            <div className="modal-footer">
              <button className="btn btn-close" onClick={updateOrderStatus}>
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
