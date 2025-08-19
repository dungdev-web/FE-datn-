import Link from "next/link";
import { InterfaceUser } from "@/types/user";
import { API_BASE_URL } from "@/config/env";

interface UserInfoCardProps {
  user: InterfaceUser;
  totalOrders: number;
}

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

export default function UserInfoCard({ user, totalOrders }: UserInfoCardProps) {
  return (
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
  );
}