"use client";
import "../../css/product.css";
import "../../css/account.css";
import Link from "next/link";
import AccountSidebar from "../../component/Account/AccountSidebar";
import { useState, useEffect } from "react";
import { checkToken } from "@/services/authService";
import { IUser } from "@/types/user";
import { IOrder } from "@/types/Order"; // Đảm bảo bạn có file định nghĩa
import { getOrdersByUserService } from "@/services/orderService";

export default function Order_Account() {
  const [user, setUser] = useState<IUser | null>(null);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const tokenData = await checkToken();
        if (!tokenData?.user?.id) throw new Error("Token không hợp lệ");

        setUser(tokenData.user);

        const orderList = await getOrdersByUserService(tokenData.user.id);
        setOrders(orderList);
      } catch (error) {
        console.error("Lỗi lấy đơn hàng:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getPaymentStatus = (status: number) => {
    switch (status) {
      case 1:
        return <span className="span_success">Đã thanh toán</span>;
      case 0:
      default:
        return <span className="span_pending">Chưa thanh toán</span>;
    }
  };

  return (
    <>
      <section
        className="bread-crumb background-cover relative"
        style={{
          backgroundImage: "url(/images/banner/banner_dieuhuong1.png)",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-gray-500/50 backdrop-blur-none z-0"></div>
        <div className="breadcrumb-container">
          <div className="title-page">
            <h2>Đơn hàng của bạn</h2>
          </div>
          <ul className="breadcrumb">
            <li className="home">
              <Link href="/" title="Trang chủ">
                <span>Trang chủ</span>
              </Link>
              <i className="fa fa-angle-right" />
            </li>
            <li className="home">
              <Link href="/account" title="Tài khoản">
                <span>Tài khoản</span>
              </Link>
              <i className="fa fa-angle-right" />
            </li>
            <li>
              <strong>
                <span>Đơn hàng của bạn</span>
              </strong>
            </li>
          </ul>
        </div>
      </section>

      <main>
        <div className="container1">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-lg-3 col-left-ac">
              <AccountSidebar user={user} />
            </div>
            <div className="col-xs-12 col-sm-12 col-lg-9 col-right-ac">
              <h1 className="title-head margin-top-0">Đơn hàng của bạn</h1>
              <div className="col-xs-12 col-sm-12 col-lg-12 no-padding">
                <div className="">
                  <div
                    className="table-responsive-block tab-all"
                    style={{ overflowX: "auto" }}
                  >
                    {loading ? (
                      <div className="text-center py-8 text-gray-500">
                        Đang tải đơn hàng...
                      </div>
                    ) : orders.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        Bạn chưa có đơn hàng nào.
                      </div>
                    ) : (
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
                        {orders.map((order) => (
                          <div
                            key={order.orders_id}
                            className="border border-gray-200 rounded-2xl !px-6 !py-2 shadow hover:shadow-lg transition"
                          >
                            <div className="flex justify-between items-center !mb-2">
                              <h2 className="text-lg font-semibold text-blue-600">
                                Đơn hàng #{order.orders_id}
                              </h2>
                              <span
                                className={`text-sm !px-6 !py-2 rounded-full ${
                                  order.status === 1
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {order.status === 1
                                  ? "Đã thanh toán"
                                  : "Chưa thanh toán"}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">
                              Ngày đặt:{" "}
                              {new Date(order.created_at).toLocaleDateString(
                                "vi-VN"
                              )}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              Giao đến:{" "}
                              <span className="font-medium">
                                #{order.shipping_address_id}
                              </span>
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              Tổng cộng:{" "}
                              <span className="font-bold text-red-600">
                                {order.total_amount.toLocaleString("vi-VN")}₫
                              </span>
                            </p>
                            <div className="mt-3 text-right">
                              <Link
                                href={`/account/order/${order.orders_id}`}
                                className="text-blue-500 hover:underline text-sm font-medium"
                              >
                                Xem chi tiết →
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
