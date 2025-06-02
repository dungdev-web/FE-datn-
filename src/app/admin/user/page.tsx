"use client";
import { useState } from "react";
import "../css/css.css";
import "../css/dashboard.css";

export default function ListUser() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalUserName, setModalUserName] = useState("");

  const openModal = (userName) => {
    setModalUserName(userName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalUserName("");
  };

  return (
    <>
      <main className="main-content">
        <div className="user-list">
          <h2>Danh sách người dùng</h2>

          <div className="actions">
            <button className="btn btn-search">
              <i className="fa-solid fa-magnifying-glass"></i> Tìm kiếm
            </button>
            <button className="btn btn-refresh">
              <i className="fa-solid fa-rotate-right"></i> Làm mới
            </button>
            <button className="btn btn-export">
              <i className="fa-solid fa-file-export"></i> Xuất dữ liệu
            </button>
          </div>

          <table className="order-table">
            <thead>
              <tr>
                <th className="col-short">Mã</th>
                <th>Tên người dùng</th>
                <th>Email</th>
                <th>Điện thoại</th>
                <th>Vai trò</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
              <tr className="filter-row">
                <th>
                  <input type="text" placeholder="mã..." />
                </th>
                <th>
                  <input type="text" placeholder="Lọc tên..." />
                </th>
                <th>
                  <input type="text" placeholder="Lọc email..." />
                </th>
                <th>
                  <input type="text" placeholder="Lọc SĐT..." />
                </th>
                <th>
                  <select>
                    <option value="">Tất cả</option>
                    <option value="admin">Admin</option>
                    <option value="user">Người dùng</option>
                  </select>
                </th>
                <th>
                  <select>
                    <option value="">Tất cả</option>
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Tạm khóa</option>
                  </select>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>U01</td>
                <td>Nguyễn Văn A</td>
                <td>a.nguyen@example.com</td>
                <td>0901234567</td>
                <td>Admin</td>
                <td>
                  <span className="status-label status-active">Hoạt động</span>
                </td>
                <td>
                  <i className="fa-solid fa-eye view-icon" title="Xem"></i>
                  <i
                    className="fa-solid fa-user-pen view-status-icon"
                    title="Chỉnh sửa"
                    onClick={() => openModal("Nguyễn Văn A")}
                  ></i>
                </td>
              </tr>
              <tr>
                <td>U02</td>
                <td>Trần Thị B</td>
                <td>b.tran@example.com</td>
                <td>0912345678</td>
                <td>Người dùng</td>
                <td>
                  <span className="status-label status-inactive">Tạm khóa</span>
                </td>
                <td>
                  <i className="fa-solid fa-eye view-icon" title="Xem"></i>
                  <i
                    className="fa-solid fa-user-pen view-status-icon"
                    title="Chỉnh sửa"
                    onClick={() => openModal("Trần Thị B")}
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
            <button className="page-btn">
              <i className="fa-solid fa-angle-right"></i>
            </button>
          </div>
        </div>
      </main>

      {/* MODAL chỉ hiển thị khi isModalOpen === true */}
      {isModalOpen && (
        <div className="modal-overlay" id="statusModal">
          <div className="modal-box">
            <div className="modal-header">
              <h3>
                <i className="fa-solid fa-user-pen"></i> Cập nhật tài khoản người dùng
              </h3>
              <span className="modal-close" onClick={closeModal}>
                &times;
              </span>
            </div>

            <div className="modal-body">
              <p>
                Người dùng: <strong>{modalUserName}</strong>
              </p>

              <label>Trạng thái:</label>
              <select id="userStatus">
                <option value="active">Hoạt động</option>
                <option value="inactive">Tạm khóa</option>
              </select>
            </div>

            <div className="modal-body">
              <label>Phân quyền:</label>
              <select id="userRole">
                <option value="admin">Quản lý</option>
                <option value="sales">Bán hàng</option>
                <option value="user">Người dùng</option>
              </select>
            </div>

            <div className="modal-footer">
              <button className="btn btn-save">
                <i className="fa-solid fa-floppy-disk"></i> Lưu
              </button>
              <button className="btn btn-cancel" onClick={closeModal}>
                <i className="fa-solid fa-xmark"></i> Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
