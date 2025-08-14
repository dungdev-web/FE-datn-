"use client";
import Link from "next/link";
import "../../../css/auth_admin.css";
import "../../../css/css.css";
import "../../../css/dashboard.css";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { getAllUsersV2 } from "@/services/authService";
import { getOrdersByUserService } from "@/services/orderService";
import { InterfaceUser } from "@/types/user";
import { IOrder } from "@/types/Order";
import { debounce } from "lodash";
import { API_BASE_URL } from "@/config/env";

interface GetOrdersParams {
  userId: number;
  page?: number;
  limit?: number;
  status?: string;
  searchQuery?: string;
  sortField?: string;
  sortDirection?: string;
}

interface OrdersApiResponse {
  orders?: IOrder[];
  data?: IOrder[];
  total?: number;
  totalCount?: number;
  currentPage?: number;
  totalPages?: number;
  limit?: number;
}

export default function ViewUser() {
  const params = useParams();
  const userId = params?.id as string;

  const [user, setUser] = useState<InterfaceUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [orders, setOrders] = useState<IOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  console.log("Tớ nè " + JSON.stringify(orders, null, 2));

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);

  const [filters, setFilters] = useState({
    orderId: "",
    status: "",
    products: "",
  });

  const statusMap = {
    pending: { label: "Chờ xác nhận", class: "status-pending" },
    confirmed: { label: "Đã xác nhận", class: "status-confirmed" },
    shipping: { label: "Đang giao hàng", class: "status-shipping" },
    delivered: { label: "Đã giao", class: "status-delivered" },
    cancelled: { label: "Đã hủy", class: "status-cancelled" },
    returned: { label: "Hoàn trả", class: "status-returned" },
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  const fetchUser = async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const users = await getAllUsersV2({ user_id: parseInt(userId) });
      setUser(users[0] || null);
      setError("");
    } catch (err: any) {
      console.error("Lỗi khi fetch user:", err);
      setError(err.message || "Không thể tải thông tin người dùng");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async (page: number = 1, resetPage: boolean = false) => {
    if (!userId) return;

    setOrdersLoading(true);
    try {
      const params: GetOrdersParams = {
        userId: parseInt(userId),
        page: resetPage ? 1 : page,
        limit: itemsPerPage,
        sortField: "created_at",
        sortDirection: "desc",
      };

      if (filters.status) {
        params.status = filters.status;
      }

      const searchQuery = [searchText, filters.orderId, filters.products]
        .filter(Boolean)
        .join(" ");

      if (searchQuery) {
        params.searchQuery = searchQuery;
      }

      const ordersData: OrdersApiResponse = await getOrdersByUserService(
        params
      );

      const ordersList = ordersData?.orders || ordersData?.data || [];
      const total =
        ordersData?.total || ordersData?.totalCount || ordersList.length;
      const pages = ordersData?.totalPages || Math.ceil(total / itemsPerPage);
      const currentPageNum = ordersData?.currentPage || (resetPage ? 1 : page);

      setOrders(ordersList);
      setTotalOrders(total);
      setTotalPages(pages);
      setCurrentPage(currentPageNum);
    } catch (err: any) {
      console.error("Lỗi khi fetch orders:", err);
      setOrders([]);
      setTotalOrders(0);
      setTotalPages(1);
      setCurrentPage(1);
    } finally {
      setOrdersLoading(false);
    }
  };

  const debouncedSearch = useCallback(
    debounce(() => {
      fetchOrders(1, true);
    }, 500),
    [filters, searchText, userId]
  );

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearchChange = (value: string) => {
    setSearchText(value);
  };

  const clearFilters = () => {
    setFilters({
      orderId: "",
      status: "",
      products: "",
    });
    setSearchText("");
    setIsSearching(false);
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    clearFilters();
    fetchUser();
    fetchOrders(1, true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchOrders(page);
  };

  const handleExport = async () => {
    if (!userId) return;

    try {
      setOrdersLoading(true);

      const params: GetOrdersParams = {
        userId: parseInt(userId),
        limit: totalOrders || 1000,
        sortField: "created_at",
        sortDirection: "desc",
      };

      if (filters.status) params.status = filters.status;

      const searchQuery = [searchText, filters.orderId, filters.products]
        .filter(Boolean)
        .join(" ");

      if (searchQuery) params.searchQuery = searchQuery;

      const ordersData: OrdersApiResponse = await getOrdersByUserService(
        params
      );
      const allOrders = ordersData?.orders || ordersData?.data || [];

      if (allOrders.length === 0) {
        alert("Không có đơn hàng nào để xuất");
        return;
      }

      const headers = [
        "Mã đơn hàng",
        "Người nhận",
        "Điện thoại",
        "Trạng thái",
        "Sản phẩm",
        "Tổng tiền",
        "Ngày đặt",
      ];

      const csvContent = [
        headers.join(","),
        ...allOrders.map((order) => {
          const statusInfo = statusMap[order.status as keyof typeof statusMap];
          const products = Array.isArray(order.order_items)
            ? order.order_items
                .map((item: any) => item.variant || item.name)
                .join("; ")
            : order.order_items || "";

          return [
            `"${order.orders_id}"`,
            `"${(order.user?.name || "").replace(/"/g, '""')}"`,
            `"${order.user?.phone || ""}"`,
            `"${statusInfo?.label || order.status}"`,
            `"${products.replace(/"/g, '""')}"`,
            order.total_amount || "",
            `"${formatDate(order.created_at)}"`,
          ].join(",");
        }),
      ].join("\n");

      const blob = new Blob(["\uFEFF" + csvContent], {
        type: "text/csv;charset=utf-8;",
      });
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
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Lỗi khi xuất file:", error);
      alert("Lỗi khi xuất file!");
    } finally {
      setOrdersLoading(false);
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
        pages.push(
          <span key="ellipsis1" className="pagination-ellipsis">
            ...
          </span>
        );
      }
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

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis2" className="pagination-ellipsis">
            ...
          </span>
        );
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
          Trang {currentPage} / {totalPages} - Hiển thị {orders.length} /{" "}
          {totalOrders} đơn hàng
        </span>
      </div>
    );
  };

  // Effects
  useEffect(() => {
    if (userId) {
      fetchUser();
      fetchOrders(1, true);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      debouncedSearch();
    }
    return () => {
      debouncedSearch.cancel();
    };
  }, [filters, searchText, debouncedSearch, userId]);

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
  console.log(user);
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
            src={
              user?.avatar
                ? `${API_BASE_URL}/uploads/${user.avatar}`
                : "/images/logo/anhdep.jpg"
            }
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
          Danh sách đơn hàng của {user.name || "người dùng"} ({totalOrders})
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
            disabled={ordersLoading || totalOrders === 0}
          >
            <i className="fa-solid fa-file-export"></i> Xuất dữ liệu
          </button>
        </div>

        {ordersLoading && orders.length === 0 ? (
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
                  <th>Tổng tiền</th>
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
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      style={{ textAlign: "center", padding: "2rem" }}
                    >
                      {totalOrders === 0
                        ? "Người dùng chưa có đơn hàng nào"
                        : "Không tìm thấy đơn hàng phù hợp với bộ lọc"}
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => {
                    const statusInfo = statusMap[
                      order.status as keyof typeof statusMap
                    ] || {
                      label: order.status,
                      class: "status-default",
                    };

                    const displayProducts = Array.isArray(order.order_items)
                      ? order.order_items
                          .map((item: any) => {
                            if (typeof item === "object") {
                              const productName =
                                item.variant?.product?.name || "Không tên";
                              const color =
                                item.variant?.color?.name_color || "Không màu";
                              const size =
                                item.variant?.size?.number_size || "Không size";
                              const quantity = item.quantity || 1;

                              return `${productName} (Màu: ${color}, Size: ${size}, SL: ${quantity})`;
                            }
                            return String(item);
                          })
                          .join(", ")
                      : order.order_items || "Không có thông tin";

                    return (
                      <tr key={order.orders_id}>
                        <td>
                          <strong>{order.orders_id}</strong>
                        </td>
                        <td>{order.user?.name || "N/A"}</td>
                        <td>{order.user?.phone || "N/A"}</td>
                        <td>
                          <span className={`status-label ${statusInfo.class}`}>
                            {statusInfo.label}
                          </span>
                        </td>
                        <td>
                          <span
                            className="category-tag"
                            title={displayProducts}
                          >
                            {displayProducts.length > 50
                              ? displayProducts.substring(0, 50) + "..."
                              : displayProducts}
                          </span>
                        </td>
                        <td>
                          {typeof order.total_amount === "number" &&
                          !isNaN(order.total_amount)
                            ? new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(order.total_amount)
                            : "N/A"}
                        </td>
                        <td>
                          {order.created_at
                            ? formatDate(order.created_at)
                            : "N/A"}
                        </td>
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

            {renderPagination()}
          </>
        )}

        {ordersLoading && orders.length > 0 && (
          <div className="loading-overlay">
            <div className="loading">Đang tải...</div>
          </div>
        )}
      </div>
    </>
  );
}
