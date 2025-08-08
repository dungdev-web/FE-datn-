"use client";
import { getRecentOrders, getStatusText } from "@/services/dashboard";
import { useState, useEffect } from "react";
import "../css/order_admin.css";
import exportStyledExcel from "../component_admin/excel";
import { IOrder } from "@/types/Order";
import Swal from "sweetalert2";
import { updateOrderStatus } from "@/services/orderService";
export default function OrderPage() {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState("Chờ xác nhận");
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const statusOrderFlow = [
    "pending", // Chờ xử lý
    "processing", // Đang xử lý
    "shipping", // Đang giao hàng
    "delivered", // Đã giao
    "completed", // Hoàn thành
    "cancelled", // Đã hủy (cho phép chọn mọi lúc nếu muốn)
  ];

  const excelData = orders.map((order: any) => ({
    maDonHang: order.orders_id,
    nguoiNhan: order.user?.name,
    dienThoai: order.user?.phone,
    trangThai: order.status,
    sanPham: order.order_items
      ?.map((i: any) => i.variant?.product?.name)
      .join(", "),
    ngayDat: new Date(order.created_at).toLocaleDateString("vi-VN"),
  }));

  const handleCloseModal = (modal: "view" | "update") => {
    if (modal === "view") setIsViewModalOpen(false);
    if (modal === "update") setIsUpdateModalOpen(false);
  };

  const handleOpenModal = (type: "view" | "update", order: any) => {
    setSelectedOrder(order);
    if (type === "view") setIsViewModalOpen(true);
    else if (type === "update") setIsUpdateModalOpen(true);
  };
  const handleUpdateClick = async () => {
    if (!selectedOrder?.orders_id) {
      console.error("orders_id is undefined");
      return;
    }

    const currentIndex = statusOrderFlow.indexOf(selectedOrder.status);
    const newIndex = statusOrderFlow.indexOf(orderStatus);

    // Kiểm tra nếu thứ tự mới nhỏ hơn hiện tại (quay ngược trạng thái) và không phải huỷ
    if (orderStatus !== "cancelled" && newIndex < currentIndex) {
      await Swal.fire({
        icon: "warning",
        title: "Không thể quay lại trạng thái trước",
        text: `Không thể thay đổi từ "${getStatusText(
          selectedOrder.status
        )}" về "${getStatusText(orderStatus)}"`,
        didOpen: () => {
          const swalContainer = document.querySelector(
            ".swal2-container"
          ) as HTMLElement;
          if (swalContainer) {
            swalContainer.style.zIndex = "9999";
          }
        },
      });
      return;
    }

    try {
      const data = await updateOrderStatus(
        selectedOrder.orders_id,
        orderStatus
      );
      if (data.success) {
        await Swal.fire({
          title: "Cập nhật thành công!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          didOpen: () => {
            const swalContainer = document.querySelector(
              ".swal2-container"
            ) as HTMLElement;
            if (swalContainer) {
              swalContainer.style.zIndex = "9999";
            }
          },
        });

        // Đóng modal và làm mới trang
        setIsUpdateModalOpen(false);
        location.reload();
      }
    } catch (err) {
      const error = err as Error;
      console.error("Lỗi cập nhật:", error);

      Swal.fire({
        icon: "error",
        title: "Đã xảy ra lỗi khi cập nhật",
        text: error.message || "Vui lòng thử lại sau.",
      });
    }
  };

  const fetchOrders = async () => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        search,
        status: statusFilter,
        categoryId: categoryFilter,
      });

      const data = await getRecentOrders(params.toString());

      if (data.success) {
        setOrders(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (err) {
      console.error("Lỗi gọi API:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, limit, search, statusFilter, categoryFilter]);

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
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSearchText(e.target.value);
                }}
                onBlur={() => {
                  if (searchText === "") setIsSearching(false);
                }}
              />
            ) : (
              <button
                className="btn btn-search"
                onClick={() => {
                  setIsSearching(true);
                }}
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
            onClick={() => exportStyledExcel(excelData, "don-hang")}
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
                <input
                  type="text"
                  placeholder="Lọc tên khách hàng..."
                  onChange={(e) => setSearch(e.target.value)}
                />
              </th>
              <th>
                <input
                  type="text"
                  placeholder="Lọc số điện thoại..."
                  onChange={(e) => setSearch(e.target.value)}
                />
              </th>
              <th>
                <select onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="">Tất cả trạng thái</option>
                  <option value="pending">Chờ xử lý</option>
                  <option value="processing">Đang xử lý</option>
                  <option value="shipping">Đang giao hàng</option>
                  <option value="delivered">Đã giao</option>
                  <option value="completed">Hoàn thành</option>
                  <option value="cancelled">Đã hủy</option>
                  <option value="returned">Hoàn trả</option>
                </select>
              </th>
              <th>
                <select onChange={(e) => setCategoryFilter(e.target.value)}>
                  <option value="">Tất cả</option>
                  <option value="1">Nike</option>
                  <option value="2">Adidas</option>
                  <option value="3">Puma</option>
                </select>
              </th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any) => (
              <tr key={order.orders_id}>
                <td>{order.orders_id}</td>
                <td>{order.user?.name}</td>
                <td>
                  {order.user?.phone
                    ? order.user?.phone
                    : "Không có số điện thoại"}
                </td>
                <td>
                  <span className={`status-label status-${order.status}`}>
                    {getStatusText(order.status)}
                  </span>
                </td>
                <td>
                  {order.order_items.map((item: any, idx: number) => (
                    <span key={idx} className="category-tag">
                      {item.variant?.product?.category?.name}
                    </span>
                  ))}
                </td>
                <td>
                  {new Date(order.created_at).toLocaleDateString("vi-VN")}
                </td>
                <td>
                  <i
                    className="fa-solid fa-eye view-icon"
                    title="Xem"
                    onClick={() => handleOpenModal("view", order)}
                  ></i>
                  <i
                    className="fa-solid fa-rotate view-status-icon"
                    title="Cập nhật trạng thái"
                    onClick={() => handleOpenModal("update", order)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="page-btn"
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`page-btn ${page === i + 1 ? "active" : ""}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="page-btn"
          >
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
                  <strong>Mã đơn hàng:</strong>{" "}
                  <span>{selectedOrder?.orders_id}</span>
                </li>
                <li>
                  <strong>Người nhận:</strong>{" "}
                  <span>{selectedOrder?.user.name}</span>
                </li>
                <li>
                  <strong>Điện thoại:</strong>{" "}
                  <span>{selectedOrder?.user.phone}</span>
                </li>
                {selectedOrder?.order_items?.map((item: any, index: number) => {
                  return (
                    <li
                      key={index}
                      className="!p-4 border rounded-lg shadow-sm bg-white !block"
                    >
                      <div className="!mb-2 text-base font-semibold text-gray-800">
                        <span>Sản phẩm: </span>
                        <span className="font-bold">
                          {item.variant?.product?.name}
                        </span>{" "}
                        <span className="text-sm text-gray-600">
                          (Size{" "}
                          {item.variant?.size?.number_size ??
                            item.size?.number_size ??
                            "Không rõ"}
                          )
                        </span>{" "}
                        -{" "}
                        <span className="text-sm text-gray-600">
                          {item.variant.color?.name_color}
                        </span>
                      </div>

                      <div className="text-sm text-gray-700 ">
                        <strong>Số lượng - Giá: </strong>
                        <span>{item.quantity}</span> -{" "}
                        <span className="text-red-600 font-medium">
                          {item.unit_price.toLocaleString("vi")} VNĐ
                        </span>
                      </div>
                    </li>
                  );
                })}

                {/* <li>
                  <strong>Màu:</strong> <span>Đen</span>
                </li> */}
                {/* <li>
                  <strong>Số Lượng - Giá:</strong> <span>2</span>{" "}
                  <span>700.000 VNĐ</span>
                </li> */}

                {selectedOrder && (
                  <>
                    <li>
                      <strong>Ngày đặt:</strong>{" "}
                      <span>
                        {new Date(selectedOrder.created_at).toLocaleDateString(
                          "vi-VN"
                        )}
                      </span>
                    </li>
                    <li>
                      <strong className="w-full">Địa chỉ giao hàng:</strong>{" "}
                      <span className="text-right">
                        {selectedOrder.shipping_address?.address_line}
                      </span>
                    </li>
                    <li>
                      <strong>Ghi chú:</strong>{" "}
                      <span>{selectedOrder.comment}</span>
                    </li>
                    <li>
                      <strong>Thanh toán:</strong>{" "}
                      <span>{selectedOrder.payment_method?.name_method}</span>
                    </li>
                    <li>
                      <strong>Tổng tiền:</strong>{" "}
                      <span className="text-red-600 font-medium">
                        {selectedOrder.total_amount.toLocaleString("vi")} VNĐ
                      </span>
                    </li>
                    <li>
                      <strong>Trạng thái:</strong>{" "}
                      <span className={`badge status-${selectedOrder.status}`}>
                        {getStatusText(selectedOrder.status)}
                      </span>
                    </li>
                  </>
                )}
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
                {statusOrderFlow
                  .filter((status) => {
                    const currentIndex = statusOrderFlow.indexOf(orderStatus);
                    const nextIndex = statusOrderFlow.indexOf(status);
                    return (
                      status === "cancelled" || // luôn cho phép hủy
                      nextIndex >= currentIndex // không cho quay lại
                    );
                  })
                  .map((status) => (
                    <option key={status} value={status}>
                      {getStatusText(status)}
                    </option>
                  ))}
              </select>
            </div>
            <div className="modal-footer">
              <button className="btn btn-close" onClick={handleUpdateClick}>
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
