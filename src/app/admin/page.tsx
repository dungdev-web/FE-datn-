"use client";
import "./css/dashboard.css";
import "./css/css.css";
import "./css/order_admin.css";
import { useState, useEffect } from "react";
import SideBar from "./component_admin/Sidebar";
import RevenueAndVisitsChart from "./component_admin/Chart";
import { API_BASE_URL } from "@/config/env";
import {
  getCountProduct,
  getCountBrand,
  getCountCategories,
  getCountUsers,
  getCountReviews,
  getCountPosts,
  getCountPostCategories,
  getCountOrders,
  getTotalRevenueByDay,
  getTotalRevenueByWeek,
  getTotalRevenueByMonth,
  getTotalRevenueByYear,
  getStockinProduct,
  getBestSSellingProducts,
  getPendingOrders,
  getRecentOrders,
  getStatusText,
  formatDate,
} from "@/services/dashboard";

export default function Home_admin() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          products,
          brands,
          categories,
          users,
          reviews,
          posts,
          postCategories,
          orders,
          totalDay,
          totalWeek,
          totalMonth,
          totalYear,
          stockinProduct,
          bestSellingProducts,
          pendingOrders,
          recentOreders,
        ] = await Promise.all([
          getCountProduct(),
          getCountBrand(),
          getCountCategories(),
          getCountUsers(),
          getCountReviews(),
          getCountPosts(),
          getCountPostCategories(),
          getCountOrders(),
          getTotalRevenueByDay(),
          getTotalRevenueByWeek(),
          getTotalRevenueByMonth(),
          getTotalRevenueByYear(),
          getStockinProduct(),
          getBestSSellingProducts(),
          getPendingOrders(),
          getRecentOrders(),
        ]);
        console.log("📦 tổng theo năm:", recentOreders);

        setData({
          products,
          brands,
          categories,
          users,
          reviews,
          posts,
          postCategories,
          orders,
          totalDay,
          totalWeek,
          totalMonth,
          totalYear,
          stockinProduct,
          bestSellingProducts,
          pendingOrders,
          recentOreders,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      {/* <SideBar isCollapsed1={isCollapsed} setIsCollapsed1={setIsCollapsed} /> */}
      <div className="revenue-cards">
        <div className="revenue-card">
          <div className="icon">
            <i className="fa-solid fa-calendar-day"></i>
          </div>
          <div className="info">
            <p className="title">Doanh thu ngày</p>
            <p className="number">
              {" "}
              {data.totalDay != null
                ? data.totalDay.toLocaleString("vi") + "₫"
                : "0₫"}
            </p>
          </div>
        </div>
        <div className="revenue-card">
          <div className="icon">
            <i className="fa-solid fa-calendar-week"></i>
          </div>
          <div className="info">
            <p className="title">Doanh thu tuần</p>
            <p className="number">
              {" "}
              {data.totalWeek != null
                ? data.totalWeek.toLocaleString("vi") + "₫"
                : "0₫"}
            </p>
          </div>
        </div>
        <div className="revenue-card">
          <div className="icon">
            <i className="fa-solid fa-calendar-alt"></i>
          </div>
          <div className="info">
            <p className="title">Doanh thu tháng</p>
            <p className="number">
              {" "}
              {data.totalWeek != null
                ? data.totalWeek.toLocaleString("vi") + "₫"
                : "0₫"}
            </p>
          </div>
        </div>
        <div className="revenue-card">
          <div className="icon">
            <i className="fa-solid fa-calendar"></i>
          </div>
          <div className="info">
            <p className="title">Doanh thu năm</p>
            <p className="number">
              {" "}
              {data.totalYear != null
                ? data.totalYear.toLocaleString("vi") + "₫"
                : "0₫"}
            </p>
          </div>
        </div>
      </div>
      <div className="dashboard-cards">
        <div className="card">
          <div className="icon">
            <i className="fa-solid fa-boxes-stacked"></i>
          </div>
          <div className="info">
            <p className="title">Sản phẩm</p>
            <p className="number">{data.products?.totalProducts}</p>
            <a href="#" className="details-link">
              (Xem chi tiết)
            </a>
          </div>
        </div>
        <div className="card">
          <div className="icon">
            <i className="fa-solid fa-tags"></i>
          </div>
          <div className="info">
            <p className="title">Nhãn hiệu</p>
            <p className="number">{data.brands?.totalBrands}</p>
            <a href="#" className="details-link">
              (Xem chi tiết)
            </a>
          </div>
        </div>
        <div className="card">
          <div className="icon">
            <i className="fa-solid fa-layer-group"></i>
          </div>
          <div className="info">
            <p className="title">Danh mục</p>
            <p className="number">{data.categories?.totalCategories}</p>
            <a href="#" className="details-link">
              (Xem chi tiết)
            </a>
          </div>
        </div>
        <div className="card">
          <div className="icon">
            <i className="fa fa-shopping-bag position-relative"></i>{" "}
          </div>
          <div className="info">
            <p className="title">Đơn hàng</p>
            <p className="number">{data.orders?.totalOrders}</p>
            <a href="#" className="details-link">
              (Xem chi tiết)
            </a>
          </div>
        </div>

        <div className="card">
          <div className="icon">
            <i className="fa-solid fa-users"></i>
          </div>
          <div className="info">
            <p className="title">Người dùng</p>
            <p className="number">{data.users?.totalUsers}</p>
            <a href="#" className="details-link">
              (Xem chi tiết)
            </a>
          </div>
        </div>
        <div className="card">
          <div className="icon">
            <i className="fa-solid fa-star-half-stroke"></i>
          </div>
          <div className="info">
            <p className="title">Đánh giá</p>
            <p className="number">{data.reviews?.totalReviews}</p>
            <a href="#" className="details-link">
              (Xem chi tiết)
            </a>
          </div>
        </div>
        <div className="card">
          <div className="icon">
            <i className="fa-solid fa-folder-open"></i>
          </div>
          <div className="info">
            <p className="title">Danh mục bài viết</p>
            <p className="number">{data.postCategories?.totalPostCategories}</p>
            <a href="#" className="details-link">
              (Xem chi tiết)
            </a>
          </div>
        </div>
        <div className="card">
          <div className="icon">
            <i className="fa-solid fa-newspaper"></i>
          </div>
          <div className="info">
            <p className="title">Bài viết</p>
            <p className="number">{data.posts?.totalPosts}</p>
            <a href="#" className="details-link">
              (Xem chi tiết)
            </a>
          </div>
        </div>
      </div>
      <RevenueAndVisitsChart />

      <div className="order-list">
        <h2>Danh sách đơn hàng gần đây</h2>
        <table className="order-table">
          <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Người nhận</th>
              <th>Điện thoại</th>
              <th>Trạng thái</th>
              <th>Sản phẩm</th>
              <th>Thành tiền</th>
              <th>Ngày đặt</th>
            </tr>
          </thead>
          <tbody>
            {data.recentOreders?.data?.length > 0 ? (
              data.recentOreders.data.map((order: any, index: number) => (
                <tr key={index}>
                  <td>{order.orders_id}</td>
                  <td>{order.user.name}</td>
                  <td>{order.user.phone || "Không có số điện thoại"}</td>
                  <td>
                    <span className={`status-label status-${order.status}`}>
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td>
                    {order.order_items.map((item: any, idx: number) => (
                      <div key={idx}>
                        {item.variant.product.name} ({item.quantity} cái)
                      </div>
                    ))}
                  </td>
                  <td>{order.total_amount.toLocaleString("vi-VN")} ₫</td>
                  <td>{formatDate(order.created_at)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>Không có đơn hàng nào gần đây</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="dashboard-section">
        <div className="top-products">
          <h3>
            <i className="fas fa-fire text-red"></i> Top sản phẩm bán chạy
          </h3>
          <div className="product-list">
            {data.bestSellingProducts?.length > 0 ? (
              data.bestSellingProducts.map((item: any, index: number) => (
                <div className="product-card" key={index}>
                  <img
                    src={`${API_BASE_URL}/uploads/${
                      item.image || "images/default.jpg"
                    }`}
                    alt={item.name}
                  />
                  <div className="product-info">
                    <p className="name">{item.name}</p>
                    <p className="sold">
                      Đã bán: <strong>{item.sold_count}</strong> cái
                    </p>
                    <p className="revenue">
                      Doanh thu:{" "}
                      <strong>{item.revenue.toLocaleString("vi-VN")} ₫</strong>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-products">Không có sản phẩm bán chạy nào</p>
            )}
          </div>
        </div>

        <div className="low-stock">
          <h3>
            <i className="fas fa-triangle-exclamation text-warning"></i> Cảnh
            báo tồn kho thấp
          </h3>

          {data.stockinProduct?.data?.length > 0 ? (
            data.stockinProduct.data.map((item: any, index: number) => (
              <div className="stock-list" key={index}>
                <div className="stock-item">
                  <img
                    src={`${API_BASE_URL}/uploads/${
                      item.color?.images || "images/default.jpg"
                    }`}
                    alt="Sản phẩm"
                  />
                  <div className="stock-info">
                    <p className="name">
                      {item.product?.name || "Không rõ tên"}
                    </p>
                    <p className="stock">
                      Tồn kho:{" "}
                      <span className="low">{item.stock_quantity}</span> cái
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-stock">Không có sản phẩm nào tồn kho thấp</p>
          )}
        </div>

        <div className="notification-box">
          <h3>
            <i className="fas fa-bell text-info"></i> Đơn hàng đang chờ xác nhận
          </h3>
          <ul className="notification-list">
            {data.pendingOrders?.data.length > 0 ? (
              data.pendingOrders.data.map((order: any, index: number) => (
                <li key={index}>
                  <strong>Đơn #{order.orders_id}</strong> – Khách:{" "}
                  <em>{order.user.name}</em>
                  <br />
                  Ngày đặt:{" "}
                  {new Date(order.created_at).toLocaleDateString("vi-VN")} –
                  Tổng tiền:{" "}
                  <strong>
                    {order?.total_amount.toLocaleString("vi-VN")}₫
                  </strong>
                </li>
              ))
            ) : (
              <li>Không có đơn hàng nào đang chờ xác nhận</li>
            )}
          </ul>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="internal-news">
          <h3>
            <i className="fas fa-bullhorn"></i> Tin nội bộ
          </h3>
          <ul className="news-list">
            <li>
              <i className="fas fa-server text-blue"></i> Hệ thống đã được
              backup lúc 03:00 sáng
            </li>
            <li>
              <i className="fas fa-exclamation-triangle text-warning"></i> Lỗi
              kết nối API lúc 10:30 – đã khắc phục
            </li>
            <li>
              <i className="fas fa-bolt text-purple"></i> Chiến dịch khuyến mãi
              “Hè rực rỡ” sẽ bắt đầu 20/05
            </li>
            <li>
              <i className="fas fa-check text-green"></i> 3 bài viết marketing
              mới đã được duyệt
            </li>
          </ul>
        </div>

        <div className="quick-actions">
          <h3>
            <i className="fas fa-bolt"></i> Hành động nhanh
          </h3>
          <div className="action-buttons">
            <button>
              <i className="fas fa-plus-circle"></i> Tạo sản phẩm mới
            </button>
            <button>
              <i className="fas fa-receipt"></i> Tạo đơn hàng thủ công
            </button>
            <button>
              <i className="fas fa-envelope"></i> Gửi email khuyến mãi
            </button>
            <button>
              <i className="fas fa-tags"></i> Quản lý giảm giá
            </button>
            <button>
              <i className="fas fa-newspaper"></i> Duyệt bài viết
            </button>
          </div>
        </div>

        <div className="alerts-system">
          <h3>
            <i className="fas fa-exclamation-circle"></i> Cảnh báo hệ thống
          </h3>
          <ul className="alert-list">
            <li>
              <i className="fas fa-clock text-danger"></i> 5 đơn hàng chưa xử lý
              24h
            </li>
            <li>
              <i className="fas fa-star-half-alt text-orange"></i> 2 đánh giá
              mới cần kiểm duyệt
            </li>
            <li>
              <i className="fas fa-box-open text-red"></i> 4 sản phẩm thiếu ảnh
              hoặc giá = 0
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
