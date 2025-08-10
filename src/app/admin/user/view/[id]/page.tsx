"use client";
import Link from "next/link";
import "../../../css/auth_admin.css";
import "../../../css/css.css";
import "../../../css/dashboard.css";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAllUsersV2 } from "@/services/authService";
import { InterfaceUser } from "@/types/user";
import UserInfoCard from "@/app/admin/component_admin/UserManager/UserInfoCard";
import UserOrdersList from "@/app/admin/component_admin/UserManager/UserOrdersList";

export default function ViewUser() {
  const params = useParams();
  const userId = params?.id as string;

  const [user, setUser] = useState<InterfaceUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalOrders, setTotalOrders] = useState(0);

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

  const handleTotalOrdersChange = (total: number) => {
    setTotalOrders(total);
  };

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

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
      <UserInfoCard user={user} totalOrders={totalOrders} />
      <UserOrdersList 
        user={user} 
        userId={userId} 
        onTotalOrdersChange={handleTotalOrdersChange}
      />
    </>
  );
}