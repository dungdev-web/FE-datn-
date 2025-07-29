"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getOrderDetailService } from "@/services/orderService";
import "../../../css/account.css";
import { API_BASE_URL } from "@/config/env";

export interface IOrderItem {
  order_items_id: number;
  variant_id: {
    variant_id: number;
    product_id: number;
    color: string;
    size: string;
    product: {
      name: string;
      image_url: string;
    };
  };
  order_id: number;
  quantity: number;
  unit_price: number;
}

export interface IOrder {
  orders_id: number;
  user_id: number;
  status: number;
  total_amount: number;
  payment_method_id: number;
  shipping_address_id: number;
  coupons_id: number | null;
  comment: string | null;
  created_at: string;
  updated_at: string;
  order_items: IOrderItem[];
}

export default function OrderDetail() {
  const params = useParams();
  const orderId = Number(params.detail);

  const [order, setOrder] = useState<IOrder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderDetailService(orderId);
        setOrder(data);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);
  if (loading || !order)
    return <div className="p-4">Đang tải chi tiết đơn hàng...</div>;

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
        <div className="absolute inset-0 bg-gray-500/50 z-0"></div>
        <div className="breadcrumb-container">
          <div className="title-page">
            <h2>Chi tiết đơn hàng</h2>
          </div>
          <ul className="breadcrumb">
            <li className="home">
              <Link href="/">Trang chủ</Link>
              <i className="fa fa-angle-right" />
            </li>
            <li className="home">
              <Link href="/account">Tài khoản</Link>
              <i className="fa fa-angle-right" />
            </li>
            <li className="home">
              <Link href="/account/order">Đơn hàng</Link>
              <i className="fa fa-angle-right" />
            </li>
            <li>
              <strong>Chi tiết đơn hàng</strong>
            </li>
          </ul>
        </div>
      </section>

      <main className="container1">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-lg-3 col-left-ac">
            <div className="block-account">
              <h5 className="title-account">Tài khoản</h5>
              <p>
                Xin chào, <span>Lê Chí Bảo</span>!
              </p>
              <ul>
                <li>
                  <Link href="/account" className="title-info">
                    Thông tin tài khoản
                  </Link>
                </li>
                <li>
                  <Link href="/account/order" className="title-info active">
                    Đơn hàng
                  </Link>
                </li>
                <li>
                  <Link href="/account/change_pass" className="title-info">
                    Đổi mật khẩu
                  </Link>
                </li>
                <li>
                  <Link href="/account/address" className="title-info">
                    Sổ địa chỉ
                  </Link>
                </li>
                <li>
                  <a href="/account/logout" className="title-info">
                    Đăng xuất
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-xs-12 col-sm-12 col-lg-9 col-right-ac">
            <h1>Chi tiết đơn hàng #{order.orders_id}</h1>
            <p className="order_date">
              Ngày tạo: {new Date(order.created_at).toLocaleDateString("vi-VN")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="box bg-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold mb-2">
                  Trạng thái thanh toán
                </h2>
                <p className="text-red-600 font-medium">Chưa thanh toán</p>
              </div>
              <div className="box bg-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold mb-2">
                  Trạng thái vận chuyển
                </h2>
                <p className="text-gray-700">Chưa chuyển</p>
              </div>
              <div className="box bg-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold mb-2">Mã vận đơn</h2>
                <p className="text-blue-600 uppercase font-bold">---</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="box-address bg-gray-50 p-4 rounded shadow col-span-2">
                <h2 className="text-lg font-semibold mb-2">
                  Địa chỉ giao hàng
                </h2>
                <p>
                  <strong>Lê Chí Bảo</strong>
                </p>
                <p>76 Đường 6 KP4 Bình Trưng Tây, TP. Thủ Đức, Hồ Chí Minh</p>
                <p>Số điện thoại: +84775895973</p>
              </div>
              <div className="box-address bg-gray-50 p-4 rounded shadow">
                <h2 className="text-lg font-semibold mb-2">Thanh toán</h2>
                <p>Thu hộ (COD)</p>
              </div>
            </div>

            <div className="box bg-white rounded shadow overflow-hidden">
              <table className="table-auto w-full border-t border-gray-200">
                <thead className="bg-gray-100">
                  <tr className="text-left">
                    <th className="p-3">Sản phẩm</th>
                    <th className="p-3">Đơn giá</th>
                    <th className="p-3">Số lượng</th>
                    <th className="p-3">Tổng</th>
                  </tr>
                </thead>
                <tbody>
                  {order.order_items.map((item) => (
                    <tr key={item.order_items_id} className="border-b">
                      <td className="p-3 flex items-center gap-3">
                        <img
                          src={
                            item.variant_id?.product?.image_url
                              ? `${API_BASE_URL}/uploads/${item.variant_id.product.image_url}`
                              : "/images/default.png"
                          }
                          alt={item.variant_id?.product?.name || "Không có tên"}
                          className="w-14 h-14 object-cover rounded"
                        />
                        <div>
                          <span>{item.variant_id?.product?.name}</span>
                          <span>Màu: {item.variant_id?.color}</span>
                          <span>Kích thước: {item.variant_id?.size}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        {item.unit_price.toLocaleString("vi-VN")}₫
                      </td>
                      <td className="p-3">{item.quantity}</td>
                      <td className="p-3">
                        {(item.unit_price * item.quantity).toLocaleString(
                          "vi-VN"
                        )}
                        ₫
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="bg-gray-50 px-6 py-4 text-right space-y-2">
                <p>
                  Khuyến mại: <strong>0₫</strong>
                </p>
                <p>
                  Phí vận chuyển: <strong>40.000₫</strong>
                </p>
                <p className="text-lg font-bold text-red-600">
                  Tổng tiền:{" "}
                  {(order.total_amount + 40000).toLocaleString("vi-VN")}₫
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
