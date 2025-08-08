"use client";
import "../css/auth_admin.css";
import { useEffect, useState } from "react";
import "../css/css.css";
import "../css/dashboard.css";
import Link from "next/link";
import { getAllUsers } from "@/services/authService";
import { IUser } from "@/types/user";
export default function ListUser() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalUserName, setModalUserName] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const openModal = (userName: string) => {
    setModalUserName(userName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalUserName("");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
setUsers(res.data.users); // Đúng, res.data.users là mảng

      } catch (err) {
        console.error("Lỗi khi fetch users:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div className="user-list">
        <h2>Danh sách người dùng</h2>

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
            {Array.isArray(users) && users.length === 0 ? (
              <tr>
                <td>Không có người dùng.</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name || "Chưa có tên"}</td>
                  <td>{user.email || "–"}</td>
                  <td>{user.phone || "–"}</td>
                  <td>{user.role === "admin" ? "Admin" : "Người dùng"}</td>
                  <td>
                    <span
                      className={`status-label ${
                        user.role === "admin"
                          ? "status-active"
                          : "status-inactive"
                      }`}
                    >
                      {user.role === "admin" ? "Hoạt động" : "Tạm khóa"}
                    </span>
                  </td>
                  <td>
                    <Link href={`/admin/user/view/${user.id}`}>
                      <i className="fa-solid fa-eye view-icon" title="Xem"></i>
                    </Link>
                    <i
                      className="fa-solid fa-user-pen view-status-icon"
                      title="Chỉnh sửa"
                      onClick={() => openModal(user.name || "Không tên")}
                    ></i>
                  </td>
                </tr>
              ))
            )}
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

      {isModalOpen && (
        <div className="modal-overlay" id="statusModal">
          <div className="modal-box">
            <div className="modal-header">
              <h3>
                <i className="fa-solid fa-user-pen"></i> Cập nhật tài khoản
                người dùng
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
