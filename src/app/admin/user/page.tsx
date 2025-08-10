"use client";
import "../css/auth_admin.css";
import { useEffect, useState, useCallback } from "react";
import "../css/css.css";
import "../css/dashboard.css";
import Link from "next/link";
import { getAllUsers, updateUser } from "@/services/authService";
import { InterfaceUser } from "@/types/user";
import Swal from "sweetalert2";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { debounce } from "lodash";

type SortField =
  | "user_id"
  | "name"
  | "email"
  | "phone"
  | "role"
  | "status"
  | "created_at";
type SortDirection = "asc" | "desc";

interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

interface ApiResponse {
  data: {
    users: InterfaceUser[];
    total: number;
    currentPage: number;
    totalPages: number;
    limit: number;
  };
}

export default function ListUser() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalUserName, setModalUserName] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState<InterfaceUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<number>(1);
  const [selectedRole, setSelectedRole] = useState<string>("user");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Sort states
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: "created_at",
    direction: "desc",
  });

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

  const fetchUsers = async (page = currentPage, resetPage = false) => {
    setLoading(true);
    try {
      const params = {
        page: resetPage ? 1 : page,
        limit: itemsPerPage,
        sortField: sortConfig.field,
        sortDirection: sortConfig.direction,
        ...(filters.role && { role: filters.role }),
        ...(filters.status && { status: filters.status === "active" ? 1 : 0 }),
        ...(filters.name && { name: filters.name }),
        ...(filters.email && { email: filters.email }),
        ...(filters.phone && { phone: filters.phone }),
        ...(filters.id && { user_id: parseInt(filters.id) }),
        ...(searchText && { name: searchText }), // Use search text as name filter
      };

      const res: ApiResponse = await getAllUsers(params);

      setUsers(res.data.users);
      setTotalUsers(res.data.total);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
      setError("");
    } catch (err) {
      console.error("Lỗi khi fetch users:", err);
      setError("Không thể tải danh sách người dùng");
      setUsers([]);
      setTotalUsers(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(() => {
      fetchUsers(1, true);
    }, 500),
    [sortConfig, filters]
  );

  // Handle sort
  const handleSort = (field: SortField) => {
    const newDirection: SortDirection =
      sortConfig.field === field && sortConfig.direction === "asc"
        ? "desc"
        : "asc";

    setSortConfig({ field, direction: newDirection });
  };

  // Get sort icon
  const getSortIcon = (field: SortField) => {
    if (sortConfig.field !== field) {
      return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    }

    if (sortConfig.direction === "asc") {
      return <ArrowUp className="w-4 h-4 text-blue-500" />;
    } else {
      return <ArrowDown className="w-4 h-4 text-blue-500" />;
    }
  };

  // Handle filter change
  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle search text change
  const handleSearchChange = (value: string) => {
    setSearchText(value);
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
    setSortConfig({ field: "created_at", direction: "desc" });
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    clearFilters();
    fetchUsers(1, true);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchUsers(newPage);
  };

  const handleExport = async () => {
    try {
      setLoading(true);
      // Fetch all users for export (without pagination)
      const res: ApiResponse = await getAllUsers({
        limit: totalUsers, // Get all users
        sortField: sortConfig.field,
        sortDirection: sortConfig.direction,
        ...(filters.role && { role: filters.role }),
        ...(filters.status && { status: filters.status === "active" ? 1 : 0 }),
        ...(filters.name && { name: filters.name }),
        ...(filters.email && { email: filters.email }),
        ...(filters.phone && { phone: filters.phone }),
        ...(filters.id && { user_id: parseInt(filters.id) }),
        ...(searchText && { name: searchText }),
      });

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
        ...res.data.users.map((user) =>
          [
            user.user_id,
            `"${(user.name || "").replace(/"/g, '""')}"`, // Handle commas in names
            `"${(user.email || "").replace(/"/g, '""')}"`,
            user.phone || "",
            user.role === "admin" ? "Admin" : "Người dùng",
            user.status === 1 ? "Hoạt động" : "Bị khóa",
          ].join(",")
        ),
      ].join("\n");

      const blob = new Blob(["\uFEFF" + csvContent], {
        type: "text/csv;charset=utf-8;",
      });
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
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Lỗi khi xuất file:", error);
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Không thể xuất file!",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveUpdate = async () => {
    if (!selectedUserId) return;

    try {
      await updateUser(selectedUserId, {
        role: selectedRole,
        status: selectedStatus,
      });

      // Refresh current page data
      fetchUsers();
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
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // First page
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          className="page-btn"
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="ellipsis1">...</span>);
      }
    }

    // Visible pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`page-btn ${i === currentPage ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="ellipsis2">...</span>);
      }
      pages.push(
        <button
          key={totalPages}
          className="page-btn"
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return (
      <div className="pagination">
        <button
          className="page-btn"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <i className="fa-solid fa-angle-left"></i>
        </button>
        {pages}
        <button
          className="page-btn"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <i className="fa-solid fa-angle-right"></i>
        </button>
        <span className="pagination-info">
          Trang {currentPage} / {totalPages} - Hiển thị {users.length} /{" "}
          {totalUsers} người dùng
        </span>
      </div>
    );
  };

  // Effects
  useEffect(() => {
    fetchUsers(1, true);
  }, []); // Initial load

  useEffect(() => {
    fetchUsers(1, true);
  }, [sortConfig]); // Reload when sort changes

  useEffect(() => {
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [filters, searchText, debouncedSearch]); // Debounced search on filter/search changes

  if (loading && users.length === 0) {
    return <div className="loading">Đang tải...</div>;
  }

  if (error && users.length === 0) {
    return <div className="error">{error}</div>;
  }

  return (
    <>
      <div className="user-list">
        <h2>Danh sách người dùng ({totalUsers})</h2>

        <div className="actions">
          <div className={`search-toggle ${isSearching ? "active" : ""}`}>
            {isSearching ? (
              <input
                type="text"
                className="search-input"
                autoFocus
                placeholder="Nhập từ khóa tìm kiếm..."
                value={searchText}
                onChange={(e) => handleSearchChange(e.target.value)}
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

          <button
            className="btn btn-export"
            onClick={handleExport}
            disabled={loading}
          >
            <i className="fa-solid fa-file-export"></i> Xuất Excel
          </button>
        </div>

        <table className="order-table">
          <thead>
            <tr>
              <th className="col-short">
                <div
                  className="flex items-center gap-1 cursor-pointer select-none hover:bg-gray-100 p-1 rounded"
                  onClick={() => handleSort("user_id")}
                >
                  Mã
                  {getSortIcon("user_id")}
                </div>
              </th>
              <th>
                <div
                  className="flex items-center gap-1 cursor-pointer select-none hover:bg-gray-100 p-1 rounded"
                  onClick={() => handleSort("name")}
                >
                  Tên người dùng
                  {getSortIcon("name")}
                </div>
              </th>
              <th>
                <div
                  className="flex items-center gap-1 cursor-pointer select-none hover:bg-gray-100 p-1 rounded"
                  onClick={() => handleSort("email")}
                >
                  Email
                  {getSortIcon("email")}
                </div>
              </th>
              <th>
                <div
                  className="flex items-center gap-1 cursor-pointer select-none hover:bg-gray-100 p-1 rounded"
                  onClick={() => handleSort("phone")}
                >
                  Điện thoại
                  {getSortIcon("phone")}
                </div>
              </th>
              <th>
                <div
                  className="flex items-center gap-1 cursor-pointer select-none hover:bg-gray-100 p-1 rounded"
                  onClick={() => handleSort("role")}
                >
                  Vai trò
                  {getSortIcon("role")}
                </div>
              </th>
              <th>
                <div
                  className="flex items-center gap-1 cursor-pointer select-none hover:bg-gray-100 p-1 rounded"
                  onClick={() => handleSort("status")}
                >
                  Trạng thái
                  {getSortIcon("status")}
                </div>
              </th>
              <th>Thao tác</th>
            </tr>
            <tr className="filter-row">
              <th>
                <input
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
            {loading && users.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  style={{ textAlign: "center", padding: "2rem" }}
                >
                  Đang tải...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  style={{ textAlign: "center", padding: "2rem" }}
                >
                  Không tìm thấy người dùng nào
                </td>
              </tr>
            ) : (
              users.map((user) => (
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

        {renderPagination()}
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
                  disabled={selectedRole === "admin"}
                  style={
                    selectedRole === "admin" ? { cursor: "not-allowed" } : {}
                  }
                >
                  <option value=  {1}>Hoạt động</option>
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
