"use client";
import "../css/auth_admin.css";
import { useEffect, useState, useCallback } from "react";
import "../css/css.css";
import "../css/dashboard.css";
import Link from "next/link";
import { getAllUsers, getAllUsersV2, updateUser } from "@/services/authService";
import { InterfaceUser } from "@/types/user";
import Swal from "sweetalert2";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  RefreshCw,
  FilterX,
  Download,
} from "lucide-react";
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
        ...(searchText && { search: searchText }), // Use search text as name filter
      };

      const res: ApiResponse = await getAllUsersV2(params);

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
    [sortConfig, filters, searchText]
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
        ...(searchText && { search: searchText }),
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

        <div className="flex items-center justify-end !gap-3 !mb-6">
          <div
            className={`relative transition-all duration-300 ${
              isSearching ? "w-64" : "w-auto"
            }`}
          >
            {isSearching ? (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  className="w-full !pl-10 !pr-4 !py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm placeholder-gray-400 shadow-sm"
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
              </div>
            ) : (
              <button
                className="bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 text-gray-700 hover:text-blue-600 font-medium !px-4 !py-2.5 rounded-lg transition-all duration-200 flex items-center !gap-2 shadow-sm hover:shadow-md"
                onClick={() => setIsSearching(true)}
              >
                <Search className="w-4 h-4" />
                Tìm kiếm
              </button>
            )}
          </div>

          <button
            className="bg-white hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 text-gray-700 hover:text-emerald-600 font-medium !px-4 !py-2.5 rounded-lg transition-all duration-200 flex items-center !gap-2 shadow-sm hover:shadow-md"
            onClick={handleRefresh}
          >
            <RefreshCw className="w-4 h-4" />
            Làm mới
          </button>

          <button
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium !px-4 !py-2.5 rounded-lg transition-all duration-200 flex items-center !gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            onClick={clearFilters}
          >
            <FilterX className="w-4 h-4" />
            Xóa bộ lọc
          </button>

          <button
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium !px-4 !py-2.5 rounded-lg transition-all duration-200 flex items-center !gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg"
            onClick={handleExport}
            disabled={loading}
          >
            <Download className="w-4 h-4" />
            {loading ? "Đang xuất..." : "Xuất Excel"}
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <th className="!px-6 !py-4 text-left whitespace-nowrap">
                  <div
                    className="flex items-center gap-2 cursor-pointer select-none hover:bg-white hover:bg-opacity-50 !px-3 !py-2 rounded-lg transition-all duration-200 group"
                    onClick={() => handleSort("user_id")}
                  >
                    <span className="font-semibold text-gray-700 group-hover:text-blue-600">
                      Mã
                    </span>
                    {getSortIcon("user_id")}
                  </div>
                </th>
                <th className="!px-6 !py-4 text-left whitespace-nowrap">
                  <div
                    className="flex items-center gap-2 cursor-pointer select-none hover:bg-white hover:bg-opacity-50 !px-3 !py-2 rounded-lg transition-all duration-200 group"
                    onClick={() => handleSort("name")}
                  >
                    <span className="font-semibold text-gray-700 group-hover:text-blue-600">
                      Tên người dùng
                    </span>
                    {getSortIcon("name")}
                  </div>
                </th>
                <th className="!px-6 !py-4 text-left whitespace-nowrap">
                  <div
                    className="flex items-center gap-2 cursor-pointer select-none hover:bg-white hover:bg-opacity-50 !px-3 !py-2 rounded-lg transition-all duration-200 group"
                    onClick={() => handleSort("email")}
                  >
                    <span className="font-semibold text-gray-700 group-hover:text-blue-600">
                      Email
                    </span>
                    {getSortIcon("email")}
                  </div>
                </th>
                <th className="!px-6 !py-4 text-left whitespace-nowrap">
                  <div
                    className="flex items-center gap-2 cursor-pointer select-none hover:bg-white hover:bg-opacity-50 !px-3 !py-2 rounded-lg transition-all duration-200 group"
                    onClick={() => handleSort("phone")}
                  >
                    <span className="font-semibold text-gray-700 group-hover:text-blue-600">
                      Điện thoại
                    </span>
                    {getSortIcon("phone")}
                  </div>
                </th>
                <th className="!px-6 !py-4 text-left whitespace-nowrap">
                  <div
                    className="flex items-center gap-2 cursor-pointer select-none hover:bg-white hover:bg-opacity-50 !px-3 !py-2 rounded-lg transition-all duration-200 group"
                    onClick={() => handleSort("role")}
                  >
                    <span className="font-semibold text-gray-700 group-hover:text-blue-600">
                      Vai trò
                    </span>
                    {getSortIcon("role")}
                  </div>
                </th>
                <th className="!px-6 !py-4 text-left whitespace-nowrap">
                  <div
                    className="flex items-center gap-2 cursor-pointer select-none hover:bg-white hover:bg-opacity-50 !px-3 !py-2 rounded-lg transition-all duration-200 group"
                    onClick={() => handleSort("status")}
                  >
                    <span className="font-semibold text-gray-700 group-hover:text-blue-600">
                      Trạng thái
                    </span>
                    {getSortIcon("status")}
                  </div>
                </th>
                <th className="!px-6 !py-4 text-left whitespace-nowrap">
                  <span className="font-semibold text-gray-700">Thao tác</span>
                </th>
              </tr>
              <tr className="bg-white border-b-2 border-gray-100">
                <th className="!px-6 !py-3">
                  <input
                    type="text"
                    placeholder="Lọc ID người dùng..."
                    value={filters.id}
                    onChange={(e) => handleFilterChange("id", e.target.value)}
                    className="w-full !px-4 !py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm placeholder-gray-400"
                  />
                </th>
                <th className="!px-6 !py-3">
                  <input
                    type="text"
                    placeholder="Lọc tên..."
                    value={filters.name}
                    onChange={(e) => handleFilterChange("name", e.target.value)}
                    className="w-full !px-4 !py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm placeholder-gray-400"
                  />
                </th>
                <th className="!px-6 !py-3">
                  <input
                    type="text"
                    placeholder="Lọc email..."
                    value={filters.email}
                    onChange={(e) =>
                      handleFilterChange("email", e.target.value)
                    }
                    className="w-full !px-4 !py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm placeholder-gray-400"
                  />
                </th>
                <th className="!px-6 !py-3">
                  <input
                    type="text"
                    placeholder="Lọc SĐT..."
                    value={filters.phone}
                    onChange={(e) =>
                      handleFilterChange("phone", e.target.value)
                    }
                    className="w-full !px-4 !py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm placeholder-gray-400"
                  />
                </th>
                <th className="!px-6 !py-3">
                  <select
                    value={filters.role}
                    onChange={(e) => handleFilterChange("role", e.target.value)}
                    className="w-full !px-4 !py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm bg-white"
                  >
                    <option value="">Tất cả</option>
                    <option value="admin">Admin</option>
                    <option value="user">Người dùng</option>
                  </select>
                </th>
                <th className="!px-6 !py-3">
                  <select
                    value={filters.status}
                    onChange={(e) =>
                      handleFilterChange("status", e.target.value)
                    }
                    className="w-full !px-4 !py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm bg-white"
                  >
                    <option value="">Tất cả</option>
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Tạm khóa</option>
                  </select>
                </th>
                <th className="!px-6 !py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="!px-6 !py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <span className="text-gray-500 font-medium">
                        Đang tải...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="!px-6 !py-12 text-center">
                    <div className="flex flex-col items-center !gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-gray-400 text-2xl">🔍</span>
                      </div>
                      <span className="text-gray-500 font-medium">
                        Không tìm thấy người dùng nào
                      </span>
                      <span className="text-gray-400 text-sm">
                        Hãy thử điều chỉnh bộ lọc của bạn
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.user_id}
                    className="hover:bg-blue-50 transition-all duration-200 group"
                  >
                    <td className="!px-4 !py-4 flex items-center justify-center whitespace-nowrap">
                      <div className="font-bold">#{user.user_id}</div>
                    </td>
                    <td className="!px-6 !py-4 whitespace-nowrap">
                      <div className="flex items-center !gap-3">
                        <div className="font-semibold text-gray-900">
                          {user.name || "Chưa có tên"}
                        </div>
                      </div>
                    </td>
                    <td className="!px-6 !py-4 whitespace-nowrap">
                      <span className="text-gray-900 font-medium">
                        {user.email || "Chưa xác định"}
                      </span>
                    </td>
                    <td className="!px-6 !py-4 whitespace-nowrap">
                      <span className="text-gray-900 font-medium">
                        {user.phone || "Chưa xác định"}
                      </span>
                    </td>
                    <td className="!px-6 !py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center !px-3 !py-1 rounded-full text-sm font-medium ${
                          user.role === "admin"
                            ? "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200"
                            : "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200"
                        }`}
                      >
                        {user.role === "admin" ? "Admin" : "Người dùng"}
                      </span>
                    </td>
                    <td className="!px-6 !py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center !px-3 !py-1 rounded-full text-sm font-medium ${
                          user.status === 1
                            ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200"
                            : "bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full !mr-2 ${
                            user.status === 1 ? "bg-green-500" : "bg-red-500"
                          }`}
                        ></div>
                        {user.status === 1 ? "Hoạt động" : "Bị khóa"}
                      </span>
                    </td>
                    <td className="!px-6 !py-4 whitespace-nowrap">
                      <div className="flex items-center !gap-2">
                        <Link href={`/admin/user/view/${user.user_id}`}>
                          <button className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-all duration-200 group/btn">
                            <i
                              className="fa-solid fa-eye group-hover/btn:scale-110 transition-transform duration-200"
                              title="Xem chi tiết"
                            ></i>
                          </button>
                        </Link>
                        <button
                          onClick={() => openModal(user)}
                          className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 hover:text-emerald-700 transition-all duration-200 group/btn"
                        >
                          <i
                            className="fa-solid fa-user-pen group-hover/btn:scale-110 transition-transform duration-200"
                            title="Chỉnh sửa"
                          ></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {renderPagination()}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm"
          id="statusModal"
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 transform transition-all duration-300 scale-100">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 !px-6 !py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold text-lg flex items-center !gap-2">
                  <i className="fa-solid fa-user-pen text-blue-100"></i>
                  Cập nhật tài khoản người dùng
                </h3>
                <button
                  className="text-white hover:text-gray-200 transition-colors duration-200 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-20"
                  onClick={closeModal}
                >
                  <span className="text-xl font-light">&times;</span>
                </button>
              </div>
            </div>

            <div className="!p-6 space-y-5">
              <div className="bg-blue-50 border border-blue-200 rounded-lg !p-4">
                <p className="text-gray-700 font-medium">
                  Người dùng:{" "}
                  <span className="text-blue-600 font-semibold">
                    {modalUserName}
                  </span>
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 !mb-2">
                  Trạng thái:
                </label>
                <select
                  id="userStatus"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(Number(e.target.value))}
                  disabled={selectedRole === "admin"}
                  className={`w-full !px-4 !py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm ${
                    selectedRole === "admin"
                      ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                      : "bg-white hover:border-gray-300"
                  }`}
                >
                  <option value={1}>🟢 Hoạt động</option>
                  <option value={0}>🔴 Tạm khóa</option>
                </select>
                {selectedRole === "admin" && (
                  <p className="text-xs text-amber-600 !mt-1 flex items-center !gap-1">
                    <i className="fa-solid fa-exclamation-triangle"></i>
                    Không thể thay đổi trạng thái tài khoản Admin
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 !mb-2">
                  Phân quyền:
                </label>
                <select
                  id="userRole"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full !px-4 !py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm bg-white hover:border-gray-300"
                >
                  <option value="admin">Quản lý</option>
                  <option value="user">Người dùng</option>
                </select>
              </div>
            </div>

            <div className="bg-gray-50 !px-6 !py-4 rounded-b-2xl border-t border-gray-100">
              <div className="flex items-center justify-end !gap-3">
                <button
                  className="bg-blue-800 hover:bg-blue-700 text-white font-semibold !px-6 !py-2.5 rounded-lg transition-all duration-200 flex items-center !gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                  onClick={handleSaveUpdate}
                >
                  <i className="fa-solid fa-floppy-disk"></i>
                  Lưu
                </button>

                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold !px-6 !py-2.5 rounded-lg transition-all duration-200 flex items-center !gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                  onClick={closeModal}
                >
                  <i className="fa-solid fa-xmark"></i>
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
