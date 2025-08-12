import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import {
  getOrdersByUserService,
  updateOrderStatus,
} from "@/services/orderService";
import { InterfaceUser } from "@/types/user";
import { IOrder } from "@/types/Order";
import { debounce } from "lodash";
import {
  Search,
  RefreshCw,
  FilterX,
  Download,
  Eye,
  Filter,
  Calendar,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

interface GetOrdersParams {
  userId: number;
  page?: number;
  limit?: number;
  status?: string;
  payment_method_id?: number;
  date_from?: string;
  date_to?: string;
  sortField?: string;
  sortDirection?: "asc" | "desc";
  search?: string;
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

interface UserOrdersListProps {
  user: InterfaceUser;
  userId: string;
  onTotalOrdersChange: (total: number) => void;
}

interface SortConfig {
  field: string;
  direction: "asc" | "desc";
}

export default function UserOrdersList({
  user,
  userId,
  onTotalOrdersChange,
}: UserOrdersListProps) {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: "created_at",
    direction: "desc",
  });

  const [filters, setFilters] = useState({
    orderId: "",
    status: "",
    products: "",
    payment_method_id: "",
    date_from: "",
    date_to: "",
  });

  const statusMap = {
    pending: { label: "Chờ xác nhận", class: "status-pending" },
    confirmed: { label: "Đã xác nhận", class: "status-confirmed" },
    shipping: { label: "Đang giao hàng", class: "status-shipping" },
    delivered: { label: "Đã giao", class: "status-delivered" },
    cancelled: { label: "Đã hủy", class: "status-cancelled" },
    returned: { label: "Hoàn trả", class: "status-returned" },
  };

  // Sortable columns configuration
  const sortableColumns = [
    { key: "orders_id", label: "Mã đơn hàng", field: "orders_id" },
    { key: "user_name", label: "Người nhận", field: "user.name" },
    { key: "user_phone", label: "Điện thoại", field: "user.phone" },
    { key: "status", label: "Trạng thái", field: "status" },
    { key: "total_amount", label: "Tổng tiền", field: "total_amount" },
    { key: "created_at", label: "Ngày đặt", field: "created_at" },
  ];

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

  const handleSort = (field: string) => {
    const newDirection =
      sortConfig.field === field && sortConfig.direction === "asc"
        ? "desc"
        : "asc";

    setSortConfig({ field, direction: newDirection });
    setCurrentPage(1); // Reset to first page when sorting
  };

  const getSortIcon = (field: string) => {
    if (sortConfig.field !== field) {
      return <ArrowUpDown className="w-4 h-4 text-gray-400 opacity-50" />;
    }

    return sortConfig.direction === "asc" ? (
      <ArrowUp className="w-4 h-4 text-blue-600" />
    ) : (
      <ArrowDown className="w-4 h-4 text-blue-600" />
    );
  };

  const fetchOrders = async (page: number = 1, resetPage: boolean = false) => {
    if (!userId) return;

    setOrdersLoading(true);
    try {
      const params: GetOrdersParams = {
        userId: parseInt(userId),
        page: resetPage ? 1 : page,
        limit: itemsPerPage,
        sortField: sortConfig.field,
        sortDirection: sortConfig.direction,
      };

      // Add filters to params
      if (filters.status) {
        params.status = filters.status;
      }

      if (filters.payment_method_id) {
        params.payment_method_id = parseInt(filters.payment_method_id);
      }

      if (filters.date_from) {
        params.date_from = filters.date_from;
      }

      if (filters.date_to) {
        params.date_to = filters.date_to;
      }

      // Combine search queries
      const searchQuery = [searchText, filters.orderId, filters.products]
        .filter(Boolean)
        .join(" ");

      if (searchQuery) {
        params.search = searchQuery;
      }

      const ordersData: OrdersApiResponse = await getOrdersByUserService(
        params
      );

      // Handle different response structures
      const ordersList = ordersData?.orders || ordersData?.data || [];
      const total =
        ordersData?.total || ordersData?.totalCount || ordersList.length;
      const pages = ordersData?.totalPages || Math.ceil(total / itemsPerPage);
      const currentPageNum = ordersData?.currentPage || (resetPage ? 1 : page);

      setOrders(ordersList);
      setTotalOrders(total);
      setTotalPages(pages);
      setCurrentPage(currentPageNum);
      onTotalOrdersChange(total);
    } catch (err: any) {
      console.error("Lỗi khi fetch orders:", err);
      setOrders([]);
      setTotalOrders(0);
      setTotalPages(1);
      setCurrentPage(1);
      onTotalOrdersChange(0);
    } finally {
      setOrdersLoading(false);
    }
  };

  const debouncedSearch = useCallback(
    debounce(() => {
      fetchOrders(1, true);
    }, 500),
    [filters, searchText, userId, sortConfig]
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
      payment_method_id: "",
      date_from: "",
      date_to: "",
    });
    setSearchText("");
    setIsSearching(false);
    setCurrentPage(1);
    setSortConfig({ field: "created_at", direction: "desc" });
  };

  const handleRefresh = () => {
    clearFilters();
    fetchOrders(1, true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchOrders(page);
  };

  const handleStatusUpdate = async (orderId: number, newStatus: string) => {
    try {
      setOrdersLoading(true);
      await updateOrderStatus(orderId, newStatus);
      // Refresh the orders list after status update
      await fetchOrders(currentPage);
      alert("Cập nhật trạng thái thành công!");
    } catch (error: any) {
      console.error("Error updating status:", error);
      alert(error.message || "Lỗi khi cập nhật trạng thái");
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleExport = async () => {
    if (!userId) return;

    try {
      setOrdersLoading(true);

      const params: GetOrdersParams = {
        userId: parseInt(userId),
        limit: totalOrders || 1000,
        sortField: sortConfig.field,
        sortDirection: sortConfig.direction,
      };

      // Add all current filters for export
      if (filters.status) params.status = filters.status;
      if (filters.payment_method_id)
        params.payment_method_id = parseInt(filters.payment_method_id);
      if (filters.date_from) params.date_from = filters.date_from;
      if (filters.date_to) params.date_to = filters.date_to;

      const searchQuery = [searchText, filters.orderId, filters.products]
        .filter(Boolean)
        .join(" ");

      if (searchQuery) params.search = searchQuery;

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
        "Phương thức thanh toán",
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
            `"${order.payment_method || "N/A"}"`,
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

  const renderSortableHeader = (column: any) => {
    return (
      <th className="!px-6 !py-4 text-left">
        <button
          className="flex items-center !gap-2 font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:text-blue-600"
          onClick={() => handleSort(column.field)}
        >
          <span>{column.label}</span>
          {getSortIcon(column.field)}
        </button>
      </th>
    );
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
          {sortConfig.field !== "created_at" && (
            <span className="ml-2 text-blue-600 text-sm">
              (Sắp xếp theo{" "}
              {
                sortableColumns.find((col) => col.field === sortConfig.field)
                  ?.label
              }{" "}
              {sortConfig.direction === "asc" ? "tăng dần" : "giảm dần"})
            </span>
          )}
        </span>
      </div>
    );
  };

  // Effects
  useEffect(() => {
    if (userId) {
      fetchOrders(1, true);
    }
  }, [userId, sortConfig]);

  useEffect(() => {
    if (userId) {
      debouncedSearch();
    }
    return () => {
      debouncedSearch.cancel();
    };
  }, [filters, searchText, debouncedSearch, userId]);

  return (
    <div className="order-list">
      <h2 className="whitespace-nowrap">
        Danh sách đơn hàng của {user.name || "người dùng"} ({totalOrders})
      </h2>

      <div className="flex items-center justify-end !gap-3 !mb-6 flex-wrap">
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
              className="bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 text-gray-700 hover:text-blue-600 font-medium !px-4 !py-2.5 rounded-lg transition-all duration-200 flex items-center !gap-2 shadow-sm hover:shadow-md whitespace-nowrap"
              onClick={() => setIsSearching(true)}
            >
              <Search className="w-4 h-4" />
              Tìm kiếm
            </button>
          )}
        </div>

        <button
          className="bg-white hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 text-gray-700 hover:text-emerald-600 font-medium !px-4 !py-2.5 rounded-lg transition-all duration-200 flex items-center !gap-2 shadow-sm hover:shadow-md whitespace-nowrap"
          onClick={handleRefresh}
        >
          <RefreshCw className="w-4 h-4" />
          Làm mới
        </button>

        <button
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium !px-4 !py-2.5 rounded-lg transition-all duration-200 flex items-center !gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap"
          onClick={clearFilters}
        >
          <FilterX className="w-4 h-4" />
          Xóa bộ lọc
        </button>

        <button
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium !px-4 !py-2.5 rounded-lg transition-all duration-200 flex items-center !gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg whitespace-nowrap"
          onClick={handleExport}
          disabled={ordersLoading}
        >
          <Download className="w-4 h-4" />
          {ordersLoading ? "Đang xuất..." : "Xuất Excel"}
        </button>
      </div>

      {ordersLoading && orders.length === 0 ? (
        <div className="loading">Đang tải danh sách đơn hàng...</div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 overflow-x-auto">
            <table className="w-full min-w-max">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  {sortableColumns.map((column) =>
                    renderSortableHeader(column)
                  )}
                  <th className="!px-6 !py-4 text-left whitespace-nowrap">
                    <span className="font-semibold text-gray-700">
                      Sản phẩm
                    </span>
                  </th>
                  <th className="!px-6 !py-4 text-left whitespace-nowrap">
                    <span className="font-semibold text-gray-700">
                      Thao tác
                    </span>
                  </th>
                </tr>
                <tr className="bg-white border-b-2 border-gray-100">
                  <th className="!px-6 !py-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Lọc mã đơn..."
                        value={filters.orderId}
                        onChange={(e) =>
                          handleFilterChange("orderId", e.target.value)
                        }
                        className="w-full !pl-10 !pr-4 !py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm placeholder-gray-400"
                      />
                    </div>
                  </th>
                  <th className="!px-6 !py-3"></th>
                  <th className="!px-6 !py-3">
                    <div className="relative">
                      <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Phương thức..."
                        value={filters.payment_method_id}
                        onChange={(e) =>
                          handleFilterChange(
                            "payment_method_id",
                            e.target.value
                          )
                        }
                        className="w-full !pl-10 !pr-4 !py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm placeholder-gray-400"
                      />
                    </div>
                  </th>
                  <th className="!px-6 !py-3">
                    <div className="relative">
                      <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select
                        value={filters.status}
                        onChange={(e) =>
                          handleFilterChange("status", e.target.value)
                        }
                        className="w-full !pl-10 !pr-4 !py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm bg-white appearance-none"
                      >
                        <option value="">Tất cả trạng thái</option>
                        <option value="pending">Chờ xác nhận</option>
                        <option value="confirmed">Đã xác nhận</option>
                        <option value="shipping">Đang giao hàng</option>
                        <option value="delivered">Đã giao</option>
                        <option value="cancelled">Đã hủy</option>
                        <option value="returned">Hoàn trả</option>
                      </select>
                    </div>
                  </th>
                  <th className="!px-6 !py-3"></th>
                  <th className="!px-6 !py-3">
                    <div className="flex !gap-2">
                      <div className="relative flex-1">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="date"
                          placeholder="Từ ngày..."
                          value={filters.date_from}
                          onChange={(e) =>
                            handleFilterChange("date_from", e.target.value)
                          }
                          className="w-full !pl-10 !pr-4 !py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                        />
                      </div>
                      <div className="relative flex-1">
                        <input
                          type="date"
                          placeholder="Đến ngày..."
                          value={filters.date_to}
                          onChange={(e) =>
                            handleFilterChange("date_to", e.target.value)
                          }
                          className="w-full !pr-4 !py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                        />
                      </div>
                    </div>
                  </th>
                  <th className="!px-6 !py-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Lọc sản phẩm..."
                        value={filters.products}
                        onChange={(e) =>
                          handleFilterChange("products", e.target.value)
                        }
                        className="w-full !pl-10 !pr-4 !py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm placeholder-gray-400"
                      />
                    </div>
                  </th>
                  <th className="!px-6 !py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="!px-6 !py-12 text-center">
                      <div className="flex flex-col items-center !gap-3">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-gray-400 text-2xl">📋</span>
                        </div>
                        <span className="text-gray-500 font-medium whitespace-nowrap">
                          {totalOrders === 0
                            ? "Người dùng chưa có đơn hàng nào"
                            : "Không tìm thấy đơn hàng phù hợp với bộ lọc"}
                        </span>
                        <span className="text-gray-400 text-sm whitespace-nowrap">
                          Hãy thử điều chỉnh bộ lọc của bạn
                        </span>
                      </div>
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

                    const getStatusStyle = (status: string) => {
                      switch (status) {
                        case "pending":
                          return "bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border border-yellow-200";
                        case "confirmed":
                          return "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200";
                        case "shipping":
                          return "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200";
                        case "delivered":
                          return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200";
                        case "cancelled":
                          return "bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200";
                        case "returned":
                          return "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200";
                        default:
                          return "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200";
                      }
                    };

                    return (
                      <tr
                        key={order.orders_id}
                        className="hover:bg-blue-50 transition-all duration-200 group"
                      >
                        <td className="!px-6 !py-4">
                          <div className="flex items-center justify-center !gap-2">
                            <span className="font-semibold text-gray-900 whitespace-nowrap">
                              #{order.orders_id}
                            </span>
                          </div>
                        </td>
                        <td className="!px-6 !py-4">
                          <div className="flex items-center !gap-3">
                            <div className="min-w-0">
                              <div className="font-semibold text-gray-900 truncate">
                                {order.user?.name || "N/A"}
                              </div>
                              <div className="text-sm text-gray-500 whitespace-nowrap">
                                Khách hàng
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="!px-6 !py-4">
                          <span className="text-gray-900 font-medium whitespace-nowrap">
                            {order.user?.phone || "N/A"}
                          </span>
                        </td>
                        <td className="!px-6 !py-4">
                          <div className="flex items-center !gap-2 flex-nowrap">
                            <span
                              className={`inline-flex items-center !px-3 !py-1 rounded-full text-sm font-medium whitespace-nowrap ${getStatusStyle(
                                order.status
                              )}`}
                            >
                              <div
                                className={`w-2 h-2 rounded-full !mr-2 flex-shrink-0 ${
                                  order.status === "delivered"
                                    ? "bg-green-500"
                                    : order.status === "cancelled"
                                    ? "bg-red-500"
                                    : order.status === "shipping"
                                    ? "bg-purple-500"
                                    : order.status === "confirmed"
                                    ? "bg-blue-500"
                                    : "bg-yellow-500"
                                }`}
                              ></div>
                              {statusInfo.label}
                            </span>
                            <select
                              value={order.status}
                              onChange={(e) =>
                                handleStatusUpdate(
                                  order.orders_id,
                                  e.target.value
                                )
                              }
                              className="ml-2 text-xs border border-gray-300 rounded px-2 py-1 bg-white flex-shrink-0"
                              disabled={ordersLoading}
                            >
                              <option value="pending">Chờ xác nhận</option>
                              <option value="confirmed">Đã xác nhận</option>
                              <option value="shipping">Đang giao hàng</option>
                              <option value="delivered">Đã giao</option>
                              <option value="cancelled">Đã hủy</option>
                              <option value="returned">Hoàn trả</option>
                            </select>
                          </div>
                        </td>
                        <td className="!px-6 !py-4">
                          <span className="font-bold text-green-600 text-lg whitespace-nowrap">
                            {typeof order.total_amount === "number" &&
                            !isNaN(order.total_amount)
                              ? new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(order.total_amount)
                              : "N/A"}
                          </span>
                        </td>
                        <td className="!px-6 !py-4">
                          <div className="text-gray-900 font-medium whitespace-nowrap">
                            {order.created_at
                              ? formatDate(order.created_at)
                              : "N/A"}
                          </div>
                        </td>
                        <td className="!px-6 !py-4">
                          <div
                            className="bg-gray-50 !px-3 !py-2 rounded-lg border border-gray-200 text-sm text-gray-700 max-w-xs overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer"
                            title={displayProducts}
                          >
                            {displayProducts}
                          </div>
                        </td>
                        <td className="!px-6 !py-4">
                          <div className="flex items-center !gap-2">
                            <Link
                              href={`/admin/user/view/${order.user_id}/order/${order.orders_id}`}
                              className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-all duration-200 group/btn flex-shrink-0"
                              title="Xem chi tiết đơn hàng"
                            >
                              <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {renderPagination()}
        </>
      )}

      {ordersLoading && orders.length > 0 && (
        <div className="loading-overlay">
          <div className="loading">Đang tải...</div>
        </div>
      )}
    </div>
  );
}
