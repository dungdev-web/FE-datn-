"use client";
import "../../css/product.css";
import "../../css/account.css";
import Link from "next/link";
import AccountSidebar from "../../component/Account/AccountSidebar";
import { useState, useEffect } from "react";
import { checkToken } from "@/services/authService";
import { IUser } from "@/types/user";
import { IOrder } from "@/types/Order"; // Đảm bảo bạn có file định nghĩa
import { getOrdersByUserService  } from "@/services/orderService";

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
                <div className="my-account">
                  <div className="table-responsive-block tab-all" style={{ overflowX: "auto" }}>
                    {loading ? (
                      <p>Đang tải đơn hàng...</p>
                    ) : orders.length === 0 ? (
                      <p>Bạn chưa có đơn hàng nào.</p>
                    ) : (
                      <table className="table table-cart table-order" id="my-orders-table">
                        <thead className="thead-default">
                          <tr>
                            <th>Đơn hàng</th>
                            <th>Ngày</th>
                            <th>Địa chỉ</th>
                            <th>Giá trị đơn hàng</th>
                            <th>Thanh toán</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order) => (
                            <tr key={order.orders_id}>
                              <td>
                                <Link href={`/account/orders/${order.orders_id}`}>
                                  #{order.orders_id}
                                </Link>
                              </td>
                              <td>
                                {new Date(order.created_at).toLocaleDateString("vi-VN")}
                              </td>
                              <td>
                                {/* Do API chưa trả address cụ thể → để placeholder */}
                                Địa chỉ giao hàng #{order.shipping_address_id}
                              </td>
                              <td>
                                <span className="price">
                                  {order.total_amount.toLocaleString("vi-VN")}₫
                                </span>
                              </td>
                              <td>{getPaymentStatus(order.status)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
