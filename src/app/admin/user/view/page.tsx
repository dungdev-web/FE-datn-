"use client";
import Link from "next/link";
import "../../css/auth_admin.css";
import "../../css/css.css";
import "../../css/dashboard.css";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getInfoUser } from "@/services/authService";
import { getOrdersByUserService } from "@/services/orderService";
import { InterfaceUser } from "@/types/user";
import { IOrder } from "@/types/Order";

interface GetOrdersParams {
  userId: number;
  page?: number;
  limit?: number;
}

export default function ViewUser() {
  const params = useParams();
  const userId = params?.id as string;

  // User states
  const [user, setUser] = useState<InterfaceUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Orders states
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<IOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);

  // Filter states
  const [filters, setFilters] = useState({
    orderId: "",
    status: "",
    products: "",
  });

  // Status mapping
  const statusMap = {
    pending: { label: "Chờ xác nhận", class: "status-pending" },
    confirmed: { label: "Đã xác nhận", class: "status-confirmed" },
    shipping: { label: "Đang giao hàng", class: "status-shipping" },
    delivered: { label: "Đã giao", class: "status-delivered" },
    cancelled: { label: "Đã hủy", class: "status-cancelled" },
  };

  // Fetch user data
  const fetchUser = async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const userData = await getInfoUser(parseInt(userId));
      setUser(userData);
      setError("");
    } catch (err: any) {
      console.error("Lỗi khi fetch user:", err);
      setError(err.message || "Không thể tải thông tin người dùng");
    } finally {
      setLoading(false);
    }
  };

  // Fetch user orders
  const fetchOrders = async (page: number = 1) => {
    if (!userId) return;

    setOrdersLoading(true);
    try {
      const ordersData = await getOrdersByUserService({
        userId: parseInt(userId),
        page: page,
        limit: itemsPerPage,
      });
      const ordersList =
        ordersData?.orders || ordersData?.data || ordersData || [];
      const total =
        ordersData?.total || ordersData?.totalCount || ordersList.length;

      setOrders(ordersList);
      setFilteredOrders(ordersList);
      setTotalOrders(total);
      setTotalPages(Math.ceil(total / itemsPerPage));
    } catch (err: any) {
      console.error("Lỗi khi fetch orders:", err);
      setOrders([]);
      setFilteredOrders([]);
      setTotalOrders(0);
      setTotalPages(1);
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchOrders(1);
  }, [userId]);

  // Handle search and filter (local filtering)
  useEffect(() => {
    let filtered = orders;

    // Search by text
    if (searchText.trim()) {
      filtered = filtered.filter(
        (order) =>
          order.orders_id.toLowerCase().includes(searchText.toLowerCase()) ||
          order.user.name.toLowerCase().includes(searchText.toLowerCase()) ||
          order.user.phone.includes(searchText) ||
          order.order_items.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Apply filters
    if (filters.orderId) {
      filtered = filtered.filter((order) =>
        order.orders_id.toLowerCase().includes(filters.orderId.toLowerCase())
      );
    }
    if (filters.status) {
      filtered = filtered.filter((order) => order.status === filters.status);
    }
    if (filters.products) {
      filtered = filtered.filter((order) =>
        order.order_items.toLowerCase().includes(filters.products.toLowerCase())
      );
    }

    setFilteredOrders(filtered);

    // For local filtering, recalculate pagination
    const localPages = Math.ceil(filtered.length / itemsPerPage);
    setTotalPages(localPages);
    if (currentPage > localPages && localPages > 0) {
      setCurrentPage(1);
    }
  }, [searchText, filters, orders, itemsPerPage, currentPage]);

  // Get current page data (for local pagination)
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredOrders.slice(startIndex, endIndex);
  };

  // Handle filter change
  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      orderId: "",
      status: "",
      products: "",
    });
    setSearchText("");
    setIsSearching(false);
  };

  // Handle refresh
  const handleRefresh = () => {
    clearFilters();
    setCurrentPage(1);
    fetchOrders(1);
  };

  // Handle export
  const handleExport = () => {
    const headers = [
      "Mã đơn hàng",
      "Người nhận",
      "Điện thoại",
      "Trạng thái",
      "Sản phẩm",
      "Ngày đặt",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredOrders.map((order) =>
        [
          order.orders_id,
          `"${order.user.name}"`,
          order.user.phone,
          `"${
            statusMap[order.status as keyof typeof statusMap]?.label ||
            order.status
          }"`,
          `"${order.order_items}"`,
          order.created_at,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `orders_user_${userId}_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Format date
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("vi-VN");
    } catch {
      return dateString;
    }
  };

  // Handle pagination change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // If you want server-side pagination, uncomment the next line
    // fetchOrders(page);
  };

  // Pagination component
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
          onClick={() => handlePageChange(i)}
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
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        >
          <i className="fa-solid fa-angle-left"></i>
        </button>
        {pages}
        <button
          className="page-btn"
          disabled={currentPage === totalPages}
          onClick={() =>
            handlePageChange(Math.min(totalPages, currentPage + 1))
          }
        >
          <i className="fa-solid fa-angle-right"></i>
        </button>
        <span className="pagination-info">
          Trang {currentPage} / {totalPages} - Hiển thị{" "}
          {getCurrentPageData().length} / {filteredOrders.length} đơn hàng
        </span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Đang tải thông tin người dùng...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error">{error}</div>
        <Link href="/admin/user" className="btn btn-back">
          <i className="fa-solid fa-arrow-left"></i> Quay lại danh sách
        </Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="error-container">
        <div className="error">Không tìm thấy người dùng</div>
        <Link href="/admin/user" className="btn btn-back">
          <i className="fa-solid fa-arrow-left"></i> Quay lại danh sách
        </Link>
      </div>
    );
  }

  return (
    <>
      <section className="user-detail-card">
        <div className="user-header">
          <img
            src={user.avatar || "/images/logo/anhdep.jpg"}
            alt="Ảnh đại diện"
            className="user-avatar"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/logo/anhdep.jpg";
            }}
          />
          <div className="user-basic-info">
            <h1 className="user-name">{user.name || "Chưa có tên"}</h1>
            <p className="user-role">
              {user.role === "admin" ? "Quản trị viên hệ thống" : "Người dùng"}
            </p>
            <span
              className={`status-label ${
                user.status === 1 ? "status-active" : "status-inactive"
              }`}
            >
              {user.status === 1 ? "Hoạt động" : "Bị khóa"}
            </span>
          </div>
          <div className="action-buttons">
            <Link href="/admin/user" className="btn-back">
              <i className="fa-solid fa-arrow-left"></i> Quay lại
            </Link>
          </div>
        </div>

        <div className="user-section">
          <h2>Thông tin liên hệ</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Email</span>
              <span className="value">{user.email || "Chưa xác định"}</span>
            </div>
            <div className="info-item">
              <span className="label">Điện thoại</span>
              <span className="value">{user.phone || "Chưa xác định"}</span>
            </div>
            <div className="info-item">
              <span className="label">Địa chỉ</span>
              <span className="value">
                {user.ship_address_id || "Chưa xác định"}
              </span>
            </div>
          </div>
        </div>

        <div className="user-section">
          <h2>Thông tin hệ thống</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">ID người dùng</span>
              <span className="value">#{user.user_id}</span>
            </div>
            <div className="info-item">
              <span className="label">Vai trò</span>
              <span
                className={`role-label ${
                  user.role === "admin" ? "role-admin" : "role-user"
                }`}
              >
                {user.role === "admin" ? "Admin" : "Người dùng"}
              </span>
            </div>
            <div className="info-item">
              <span className="label">Trạng thái</span>
              <span
                className={`status-label ${
                  user.status === 1 ? "status-active" : "status-inactive"
                }`}
              >
                {user.status === 1 ? "Hoạt động" : "Bị khóa"}
              </span>
            </div>
            <div className="info-item">
              <span className="label">Ngày tạo</span>
              <span className="value">
                {user.created_at
                  ? formatDate(user.created_at)
                  : "Không xác định"}
              </span>
            </div>
            <div className="info-item">
              <span className="label">Lần cập nhật cuối</span>
              <span className="value">
                {user.updated_at
                  ? formatDate(user.updated_at)
                  : "Chưa cập nhật"}
              </span>
            </div>
            <div className="info-item">
              <span className="label">Tổng đơn hàng</span>
              <span className="value highlight">{totalOrders} đơn hàng</span>
            </div>
          </div>
        </div>
      </section>

      <div className="order-list">
        <h2>
          Danh sách đơn hàng của {user.name || "người dùng"} (
          {filteredOrders.length})
        </h2>

        <div className="actions">
          <div className={`search-toggle ${isSearching ? "active" : ""}`}>
            {isSearching ? (
              <input
                type="text"
                className="search-input"
                autoFocus
                placeholder="Tìm kiếm đơn hàng..."
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

          <button className="btn btn-clear" onClick={clearFilters}>
            <i className="fa-solid fa-filter-circle-xmark"></i> Xóa bộ lọc
          </button>

          <button className="btn btn-export" onClick={handleExport}>
            <i className="fa-solid fa-file-export"></i> Xuất dữ liệu
          </button>
        </div>

        {ordersLoading ? (
          <div className="loading">Đang tải danh sách đơn hàng...</div>
        ) : (
          <>
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
                    <input
                      type="text"
                      placeholder="Lọc mã đơn..."
                      value={filters.orderId}
                      onChange={(e) =>
                        handleFilterChange("orderId", e.target.value)
                      }
                    />
                  </th>
                  <th></th>
                  <th></th>
                  <th>
                    <select
                      value={filters.status}
                      onChange={(e) =>
                        handleFilterChange("status", e.target.value)
                      }
                    >
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
                    <input
                      type="text"
                      placeholder="Lọc sản phẩm..."
                      value={filters.products}
                      onChange={(e) =>
                        handleFilterChange("products", e.target.value)
                      }
                    />
                  </th>
                  <th></th>
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
                      {filteredOrders.length === 0 && orders.length > 0
                        ? "Không tìm thấy đơn hàng phù hợp với bộ lọc"
                        : "Người dùng chưa có đơn hàng nào"}
                    </td>
                  </tr>
                ) : (
                  getCurrentPageData().map((order) => {
                    const statusInfo = statusMap[
                      order.status as keyof typeof statusMap
                    ] || { label: order.status, class: "status-default" };

                    return (
                      <tr key={order.orders_id}>
                        <td>
                          <strong>{order.orders_id}</strong>
                        </td>
                        <td>{order.user?.name}</td>
                        <td>{order.user?.phone}</td>

                        <td>
                          <span className={`status-label ${statusInfo.class}`}>
                            {statusInfo.label}
                          </span>
                        </td>
                        <td>
                          <span className="category-tag">
                            {order.order_items
                              .map((item) => item.variant)
                              .join(", ")}
                          </span>
                        </td>

                        <td>{formatDate(order.created_at)}</td>
                        <td>
                          <div className="action-buttons">
                            <Link
                              href={`/admin/order/view/${order.orders_id}`}
                              className="action-btn view-btn"
                              title="Xem chi tiết đơn hàng"
                            >
                              <i className="fa-solid fa-eye"></i>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>

            {filteredOrders.length > itemsPerPage && renderPagination()}
          </>
        )}
      </div>
    </>
  );
}
