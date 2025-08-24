"use client";
import "../../css/product.css";
import "../../css/account.css";
import Link from "next/link";
import AccountSidebar from "@/app/(client)/component/Account/AccountSidebar";
import { useState, useEffect } from "react";
import { checkToken } from "@/services/authService";
import { IUser } from "@/types/user";
import { IOrder } from "@/types/Order";
import { getOrdersByUserService } from "@/services/orderService";
import { useGlobalStore } from "@/store/useGlobalStore";
import { getAddressByIdService } from "@/services/addressService";

interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  currentPage: number;
  totalPages: number;
  hasNext?: boolean;
  hasPrev?: boolean;
}

interface OrdersResponse {
  orders: IOrder[];
  pagination: PaginationInfo;
}

export default function Order_Account() {
  const [user, setUser] = useState<IUser | null>(null);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    limit: 6,
    currentPage: 1,
    totalPages: 0,
  });
  const [shippingAddresses, setShippingAddresses] = useState<
    Record<number, string>
  >({});

  const setOrderCount = useGlobalStore((state) => state.setOrderCount);

  const fetchOrders = async (page: number = 1, limit: number = 6) => {
    try {
      setLoading(true);
      const tokenData = await checkToken();
      if (!tokenData?.user?.id) throw new Error("Token không hợp lệ");

      setUser(tokenData.user);

      const response: OrdersResponse = await getOrdersByUserService({
        userId: tokenData.user.id,
        page,
        limit,
      });

      setOrders(response.orders);
      setPagination(response.pagination);
      setOrderCount(response.pagination.total);
      const addressMap: Record<number, string> = {};
      for (const order of response.orders) {
        if (order.shipping_address_id) {
          try {
            const address = await getAddressByIdService(
              order.shipping_address_id
            );
            if (address) {
              addressMap[order.shipping_address_id] = `${address.address_line}`;
            }
          } catch (error) {
            console.error("Lỗi lấy địa chỉ:", error);
            addressMap[
              order.shipping_address_id
            ] = `Địa chỉ #${order.shipping_address_id}`;
          }
        }
      }
      setShippingAddresses(addressMap);
    } catch (error) {
      console.error("Lỗi lấy đơn hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(1, 6);
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchOrders(newPage, pagination.limit);
    }
  };

  const renderPagination = () => {
    if (pagination.totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(
      1,
      pagination.currentPage - Math.floor(maxVisiblePages / 2)
    );
    let endPage = Math.min(
      pagination.totalPages,
      startPage + maxVisiblePages - 1
    );

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return (
      <div className="flex justify-center items-center !mt-8 gap-2">
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={!pagination.hasPrev || pagination.currentPage === 1}
          className="!px-3 !py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <i className="fa fa-angle-left"></i>
        </button>

        {startPage > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className="!px-3 !py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition"
            >
              1
            </button>
            {startPage > 2 && <span className="!px-2 text-gray-400">...</span>}
          </>
        )}

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
          const pageNum = startPage + i;
          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`!px-3 !py-2 rounded-lg border transition ${
                pageNum === pagination.currentPage
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        {endPage < pagination.totalPages && (
          <>
            {endPage < pagination.totalPages - 1 && (
              <span className="px-2 text-gray-400">...</span>
            )}
            <button
              onClick={() => handlePageChange(pagination.totalPages)}
              className="!px-3 !py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition"
            >
              {pagination.totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={
            !pagination.hasNext ||
            pagination.currentPage === pagination.totalPages
          }
          className="!px-3 !py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <i className="fa fa-angle-right"></i>
        </button>
      </div>
    );
  };

  const renderOrderStatus = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="bg-gray-200 text-gray-800 text-sm !px-6 !py-2 rounded-4xl">
            Chờ xử lý
          </span>
        );
      case "processing":
        return (
          <span className="bg-yellow-100 text-yellow-800 text-sm !px-6 !py-2 rounded-4xl">
            Đang xử lý
          </span>
        );
      case "shipping":
        return (
          <span className="bg-blue-100 text-blue-800 text-sm !px-6 !py-2 rounded-4xl">
            Đang giao
          </span>
        );
      case "completed":
        return (
          <span className="bg-green-100 text-green-700 text-sm !px-6 !py-2 rounded-4xl">
            Hoàn thành
          </span>
        );
      case "cancelled":
        return (
          <span className="bg-red-100 text-red-700 text-sm !px-6 !py-2 rounded-4xl">
            Đã hủy
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-700 text-sm !px-6 !py-2 rounded-4xl">
            Không rõ
          </span>
        );
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
              <div className="flex justify-between items-center !mb-4">
                <h1 className="title-head margin-top-0">Đơn hàng của bạn</h1>
                {pagination.total > 0 && (
                  <div className="text-sm text-gray-600">
                    Hiển thị{" "}
                    {(pagination.currentPage - 1) * pagination.limit + 1}-
                    {Math.min(
                      pagination.currentPage * pagination.limit,
                      pagination.total
                    )}
                    trong tổng số {pagination.total} đơn hàng
                  </div>
                )}
              </div>

              <div className="col-xs-12 col-sm-12 col-lg-12 no-padding">
                <div className="">
                  <div
                    className="table-responsive-block tab-all"
                    style={{ overflowX: "auto" }}
                  >
                    {loading ? (
                      <div className="text-center py-8 text-gray-500">
                        <div className="flex justify-center items-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
                          Đang tải đơn hàng...
                        </div>
                      </div>
                    ) : orders.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <div className="mb-4">
                          <i className="fa fa-shopping-cart text-4xl text-gray-300"></i>
                        </div>
                        <p className="text-lg mb-2">
                          Bạn chưa có đơn hàng nào.
                        </p>
                        <Link
                          href="/products"
                          className="text-blue-600 hover:underline"
                        >
                          Bắt đầu mua sắm ngay →
                        </Link>
                      </div>
                    ) : (
                      <>
                        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                          {orders.map((order) => (
                            <div
                              key={order.orders_id}
                              className="border border-gray-200 rounded-2xl !px-6 !py-4 shadow hover:shadow-lg transition"
                            >
                              <div className="flex justify-between items-center !mb-3">
                                <h2 className="text-lg font-semibold text-blue-600">
                                  Đơn hàng #{order.orders_id}
                                </h2>
                                {renderOrderStatus(order.status)}
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
                                  {shippingAddresses[
                                    order.shipping_address_id
                                  ] ?? `#${order.shipping_address_id}`}
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

                        {/* Pagination */}
                        {renderPagination()}
                      </>
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
