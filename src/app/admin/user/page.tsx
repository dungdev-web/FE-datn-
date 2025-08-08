"use client";
import "../css/auth_admin.css";
import { useEffect, useState } from "react";
import "../css/css.css";
import "../css/dashboard.css";
import Link from "next/link";
import { getAllUsers, updateUser } from "@/services/authService";
import { InterfaceUser } from "@/types/user";
import Swal from "sweetalert2";

export default function ListUser() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalUserName, setModalUserName] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState<InterfaceUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<InterfaceUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<number>(1);
  const [selectedRole, setSelectedRole] = useState<string>("user");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Filter states
  const [filters, setFilters] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    role: "",
    status: "",
  });

  const openModal = (user: InterfaceUser) => {
    setSelectedUserId(user.user_id);
    setModalUserName(user.name || "Không tên");
    setSelectedStatus(user.status);
    setSelectedRole(user.role);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalUserName("");
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getAllUsers();
      setUsers(res.data.users);
      setFilteredUsers(res.data.users);
      setError("");
    } catch (err) {
      console.error("Lỗi khi fetch users:", err);
      setError("Không thể tải danh sách người dùng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users;

    if (searchText.trim()) {
      filtered = filtered.filter(
        (user) =>
          user.name?.toLowerCase().includes(searchText.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchText.toLowerCase()) ||
          user.phone?.includes(searchText) ||
          user.user_id.toString().includes(searchText)
      );
    }

    if (filters.id) {
      filtered = filtered.filter((user) =>
        user.user_id.toString().includes(filters.id)
      );
    }
    if (filters.name) {
      filtered = filtered.filter((user) =>
        user.name?.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    if (filters.email) {
      filtered = filtered.filter((user) =>
        user.email?.toLowerCase().includes(filters.email.toLowerCase())
      );
    }
    if (filters.phone) {
      filtered = filtered.filter((user) => user.phone?.includes(filters.phone));
    }
    if (filters.role) {
      filtered = filtered.filter((user) => user.role === filters.role);
    }
    if (filters.status) {
      const statusValue = filters.status === "active" ? 1 : 0;
      filtered = filtered.filter((user) => user.status === statusValue);
    }

    setFilteredUsers(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1);
  }, [searchText, filters, users, itemsPerPage]);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredUsers.slice(startIndex, endIndex);
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      id: "",
      name: "",
      email: "",
      phone: "",
      role: "",
      status: "",
    });
    setSearchText("");
    setIsSearching(false);
  };

  const handleRefresh = () => {
    clearFilters();
    fetchUsers();
  };

  const handleExport = () => {
    const headers = [
      "ID",
      "Tên",
      "Email",
      "Điện thoại",
      "Vai trò",
      "Trạng thái",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredUsers.map((user) =>
        [
          user.user_id,
          user.name || "",
          user.email || "",
          user.phone || "",
          user.role === "admin" ? "Admin" : "Người dùng",
          user.status === 1 ? "Hoạt động" : "Bị khóa",
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `users_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveUpdate = async () => {
    if (!selectedUserId) return;

    try {
      const res = await updateUser(selectedUserId, {
        role: selectedRole,
        status: selectedStatus,
      });
      const updatedUserList = users.map((user) =>
        user.user_id === selectedUserId
          ? { ...user, role: selectedRole, status: selectedStatus }
          : user
      );

      setUsers(updatedUserList);
      closeModal();
      Swal.fire({
        icon: "success",
        title: "Thành công",
        text: "Cập nhật người dùng thành công!",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      Swal.fire({
        icon: "error",
        title: "Thất bại",
        text: "Cập nhật người dùng thất bại!",
      });
    }
  };
  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`page-btn ${i === currentPage ? "active" : ""}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="pagination">
        <button
          className="page-btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
        >
          <i className="fa-solid fa-angle-left"></i>
        </button>
        {pages}
        <button
          className="page-btn"
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => Math.min(totalPages, prev + 1))
          }
        >
          <i className="fa-solid fa-angle-right"></i>
        </button>
        <span className="pagination-info">
          Trang {currentPage} / {totalPages} - Hiển thị{" "}
          {getCurrentPageData().length} / {filteredUsers.length} người dùng
        </span>
      </div>
    );
  };

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <>
      <div className="user-list">
        <h2>Danh sách người dùng ({filteredUsers.length})</h2>

        <div className="actions">
          <div className={`search-toggle ${isSearching ? "active" : ""}`}>
            {isSearching ? (
              <input
                type="text"
                className="search-input"
                autoFocus
                placeholder="Nhập từ khóa tìm kiếm..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onBlur={() => {
                  if (searchText === "") setIsSearching(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setSearchText("");
                    setIsSearching(false);
                  }
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

          <button className="btn btn-refresh" onClick={handleRefresh}>
            <i className="fa-solid fa-rotate-right"></i> Làm mới
          </button>

          <button className="btn btn-clear bg-blue-700" onClick={clearFilters}>
            <i className="fa-solid fa-filter-circle-xmark"></i> Xóa bộ lọc
          </button>

          <button className="btn btn-export" onClick={handleExport}>
            <i className="fa-solid fa-file-export"></i> Xuất Excel
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
                <input
                  className="text-gray-200"
                  type="text"
                  placeholder="Lọc mã..."
                  value={filters.id}
                  onChange={(e) => handleFilterChange("id", e.target.value)}
                />
              </th>
              <th>
                <input
                  type="text"
                  placeholder="Lọc tên..."
                  value={filters.name}
                  onChange={(e) => handleFilterChange("name", e.target.value)}
                />
              </th>
              <th>
                <input
                  type="text"
                  placeholder="Lọc email..."
                  value={filters.email}
                  onChange={(e) => handleFilterChange("email", e.target.value)}
                />
              </th>
              <th>
                <input
                  type="text"
                  placeholder="Lọc SĐT..."
                  value={filters.phone}
                  onChange={(e) => handleFilterChange("phone", e.target.value)}
                />
              </th>
              <th>
                <select
                  value={filters.role}
                  onChange={(e) => handleFilterChange("role", e.target.value)}
                >
                  <option value="">Tất cả</option>
                  <option value="admin">Admin</option>
                  <option value="user">Người dùng</option>
                </select>
              </th>
              <th>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                >
                  <option value="">Tất cả</option>
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Tạm khóa</option>
                </select>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {getCurrentPageData().length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  style={{ textAlign: "center", padding: "2rem" }}
                >
                  {filteredUsers.length === 0 && users.length > 0
                    ? "Không tìm thấy người dùng phù hợp với bộ lọc"
                    : "Không có người dùng nào"}
                </td>
              </tr>
            ) : (
              getCurrentPageData().map((user) => (
                <tr key={user.user_id}>
                  <td>{user.user_id}</td>
                  <td>{user.name || "Chưa có tên"}</td>
                  <td>{user.email || "Chưa xác định"}</td>
                  <td>{user.phone || "Chưa xác định"}</td>
                  <td>
                    <span
                      className={`role-label ${
                        user.role === "admin" ? "role-admin" : "role-user"
                      }`}
                    >
                      {user.role === "admin" ? "Admin" : "Người dùng"}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`status-label ${
                        user.status === 1 ? "status-active" : "status-inactive"
                      }`}
                    >
                      {user.status === 1 ? "Hoạt động" : "Bị khóa"}
                    </span>
                  </td>
                  <td>
                    <Link href={`/admin/user/view/${user.user_id}`}>
                      <i
                        className="fa-solid fa-eye view-icon"
                        title="Xem chi tiết"
                      ></i>
                    </Link>
                    <i
                      className="fa-solid fa-user-pen view-status-icon"
                      title="Chỉnh sửa"
                      onClick={() => openModal(user)}
                    ></i>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
{filteredUsers.length > itemsPerPage && renderPagination()} 

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
              <div className="form-group">
                <p>
                  Người dùng: <strong>{modalUserName}</strong>
                </p>
              </div>

              <div className="form-group">
                <label>Trạng thái:</label>
                <select
                  id="userStatus"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(Number(e.target.value))}
                >
                  <option value={1}>Hoạt động</option>
                  <option value={0}>Tạm khóa</option>
                </select>
              </div>

              <div className="form-group">
                <label>Phân quyền:</label>
                <select
                  id="userRole"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value="admin">Quản lý</option>
                  <option value="user">Người dùng</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-save" onClick={handleSaveUpdate}>
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
