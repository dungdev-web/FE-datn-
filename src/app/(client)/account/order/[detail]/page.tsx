"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  getOrderDetailService,
  updateOrderStatus,
} from "@/services/orderService";
import { getAddressByIdService } from "@/services/addressService";
import { checkToken } from "@/services/authService";
import "../../../css/account.css";
import { API_BASE_URL } from "@/config/env";
import { AddressResponse } from "@/types/address";
import { IUser } from "@/types/user";
import { IOrder } from "@/types/Order";
import AccountSidebar from "@/app/(client)/component/Account/AccountSidebar";
import Swal from "sweetalert2";

export default function OrderDetail() {
  const params = useParams();
  const router = useRouter();
  const orderId = Number(params.detail);

  const [order, setOrder] = useState<IOrder | null>(null);
  const [address, setAddress] = useState<AddressResponse | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [actionLoading, setActionLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  const getColorName = (item: any): string => {
    const colorData =
      item.variant?.color || item.variant_id?.color || item.color;
    if (!colorData) return "Không có";
    if (typeof colorData === "string") return colorData;
    if (typeof colorData === "object") {
      return (
        colorData.name_color ||
        colorData.name ||
        colorData.color_name ||
        "Không có"
      );
    }
    return "Không có";
  };

  const getSizeName = (item: any): string => {
    const sizeData = item.variant?.size || item.variant_id?.size || item.size;
    if (!sizeData) return "Không có";
    if (typeof sizeData === "string") return sizeData;
    if (typeof sizeData === "object") {
      return (
        sizeData.number_size ||
        sizeData.name ||
        sizeData.size_name ||
        sizeData.size ||
        "Không có"
      );
    }
    return "Không có";
  };

  const getProductName = (item: any): string => {
    const name =
      item.variant?.product?.name ||
      item.variant_id?.product?.name ||
      item.product?.name ||
      item.product_name ||
      "Tên sản phẩm không có";

    return name.replace(/\n/g, " ").trim();
  };

  const getProductImage = (item: any): string => {
    const imagePath =
      item.variant?.color?.images ||
      item.variant?.product?.image_url ||
      item.variant_id?.product?.image_url ||
      item.product?.image_url ||
      item.image_url;

    return imagePath
      ? `${API_BASE_URL}/uploads/${imagePath}`
      : "/images/default.png";
  };

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        setLoading(true);
        setError("");

        const tokenData = await checkToken();
        if (tokenData?.user) {
          setUser(tokenData.user);
        }

        const orderData = await getOrderDetailService(orderId);
        console.log("Order data:", orderData);
        console.log("Order items:", orderData?.order_items);

        if (!orderData) {
          throw new Error("Không tìm thấy đơn hàng");
        }

        setOrder(orderData);

        if (orderData?.shipping_address_id) {
          try {
            const addressData = await getAddressByIdService(
              orderData.shipping_address_id
            );
            console.log("Address data:", addressData);
            console.log(
              "Address type:",
              typeof addressData,
              Array.isArray(addressData)
            );

            if (
              addressData &&
              addressData !== null &&
              addressData !== undefined
            ) {
              const addressObj = Array.isArray(addressData)
                ? addressData[0]
                : addressData;
              console.log("Final address object:", addressObj);
              setAddress(addressObj);
            } else {
              console.log(
                "No address data returned, API response:",
                addressData
              );
              if (user) {
                const fallbackAddress: AddressResponse = {
                  ship_address_id: orderData.shipping_address_id,
                  user: user || null,
                  length: 0,
                  id: orderData.shipping_address_id,
                  full_name: user.name || "Khách hàng",
                  phone: user.phone || "Chưa cập nhật",
                  address_line: "Địa chỉ không khả dụng",
                  address: "Địa chỉ không khả dụng",
                  ward: "",
                  district: "",
                  province: "",
                  city: "",
                  is_default: false,
                };

                setAddress(fallbackAddress);
              }
            }
          } catch (addressError) {
            const fallbackAddress: AddressResponse = {
              ship_address_id: orderData.shipping_address_id,
              user: user || null,
              id: orderData.shipping_address_id || 0,
              length: 0,
              full_name: user?.name || "Khách hàng",
              phone: user?.phone || "Chưa cập nhật",
              address_line: "Lỗi tải địa chỉ",
              address: "Lỗi tải địa chỉ",
              ward: "",
              district: "",
              province: "",
              city: "",
              is_default: false,
            };

            setAddress(fallbackAddress);
          }
        }
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
        setError(error instanceof Error ? error.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    if (orderId && !isNaN(orderId)) {
      fetchOrderData();
    } else {
      setError("Mã đơn hàng không hợp lệ");
      setLoading(false);
    }
  }, [orderId]);

  const getShippingStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ xử lý";
      case "processing":
        return "Đang xử lý";
      case "shipping":
        return "Đang giao";
      case "delivered":
        return "Đã giao";
      case "completed":
        return "Hoàn thành";
      case "cancelled":
        return "Đã hủy";
      case "returned":
        return "Hoàn đơn";
      default:
        return "Không xác định";
    }
  };

  const getPaymentMethodLabel = (paymentMethodId: number) => {
    switch (paymentMethodId) {
      case 1:
        return "Thu hộ (COD)";
      case 2:
        return "Chuyển khoản ngân hàng";
      case 3:
        return "Ví điện tử";
      case 4:
        return "Thẻ tín dụng";
      default:
        return "Thu hộ (COD)";
    }
  };

  // Hàm xử lý hủy đơn hàng
  const handleCancelOrder = async () => {
    if (!cancelReason.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Thiếu lý do",
        text: "Vui lòng nhập lý do hủy đơn hàng",
      });
      return;
    }

    const result = await Swal.fire({
      icon: "question",
      title: "Bạn có chắc muốn hủy đơn hàng?",
      text: "Hành động này không thể hoàn tác.",
      showCancelButton: true,
      confirmButtonText: "Hủy đơn",
      cancelButtonText: "Quay lại",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (!result.isConfirmed) return;

    try {
      setActionLoading(true);

      await updateOrderStatus(orderId, "cancelled");

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (order) {
        setOrder({ ...order, status: "cancelled" });
      }

      setShowCancelModal(false);
      setCancelReason("");

      Swal.fire({
        icon: "success",
        title: "Đã hủy đơn hàng",
        text: "Hủy đơn hàng thành công!",
      });
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng:", error);
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Có lỗi xảy ra khi hủy đơn hàng. Vui lòng thử lại!",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleConfirmReceived = async () => {
    try {
      setActionLoading(true);

      await updateOrderStatus(orderId, "delivered");

      if (order) {
        setOrder({ ...order, status: "delivered" });
      }

      Swal.fire({
        icon: "success",
        title: "Đã nhận hàng",
        text: "Xác nhận đã nhận hàng thành công!",
      });
    } catch (error) {
      console.error("Lỗi khi xác nhận nhận hàng:", error);
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi xác nhận nhận hàng. Vui lòng thử lại!",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleTrackOrder = () => {
    router.push(`/account/order/track/${orderId}`);
  };

  const handleReviewProducts = () => {
    router.push(`/account/order/review/${orderId}`);
  };

  const handleBuyAgain = () => {
    // Logic để thêm lại tất cả sản phẩm vào giỏ hàng
    router.push("/cart");
  };

  const handleViewProducts = () => {
    // Logic để xem lại các sản phẩm trong đơn hàng đã hủy
    // Có thể navigate đến trang danh sách sản phẩm hoặc hiển thị modal
    console.log("Xem lại sản phẩm trong đơn hàng đã hủy");
  };

  // Cập nhật logic hiển thị các nút action
  const canCancelOrder =
    order?.status === "pending" || order?.status === "processing";
  const canConfirmReceived = order?.status === "shipping";
  const canReviewAndBuyAgain = order?.status === "delivered";
  const canViewProducts = order?.status === "cancelled";
  const canTrackOrder = [
    "shipping",
    "delivered",
    "cancelled",
    "returned",
  ].includes(order?.status || "");

  const isPaid = order?.status === "completed" || order?.status === "delivered";

  if (loading) {
    return (
      <div className="!p-4 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2">Đang tải chi tiết đơn hàng...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="!p-4 text-center text-red-600">
        <p>Lỗi: {error}</p>
        <Link
          href="/account/order"
          className="text-blue-600 hover:underline mt-2 inline-block"
        >
          ← Quay lại danh sách đơn hàng
        </Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="!p-4 text-center text-gray-600">
        <p>Không tìm thấy đơn hàng</p>
        <Link
          href="/account/order"
          className="text-blue-600 hover:underline mt-2 inline-block"
        >
          ← Quay lại danh sách đơn hàng
        </Link>
      </div>
    );
  }

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
            <AccountSidebar user={user} />
          </div>

          <div className="col-xs-12 col-sm-12 col-lg-9 col-right-ac">
            <div className="flex justify-between items-center !mb-4">
              <h1>Chi tiết đơn hàng #{order.orders_id}</h1>
              <Link
                href="/account/order"
                className="text-blue-600 hover:underline"
              >
                ← Quay lại
              </Link>
            </div>

            <p className="order_date !mb-6">
              Ngày tạo:{" "}
              {new Date(order.created_at).toLocaleDateString("vi-VN", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

            <div className="flex flex-wrap gap-3 !mb-6">
              {canCancelOrder && (
                <button
                  onClick={() => setShowCancelModal(true)}
                  disabled={actionLoading}
                  className="bg-red-600 hover:bg-red-700 text-white !px-6 !py-2 rounded-4xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {actionLoading ? "Đang xử lý..." : "Hủy đơn hàng"}
                </button>
              )}

              {canConfirmReceived && (
                <button
                  onClick={handleConfirmReceived}
                  disabled={actionLoading}
                  className="bg-green-600 hover:bg-green-700 text-white !px-6 !py-2 rounded-4xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {actionLoading ? "Đang xử lý..." : "Đã nhận được hàng"}
                </button>
              )}

              {canReviewAndBuyAgain && (
                <>
                  <button
                    onClick={handleReviewProducts}
                    className="bg-green-600 hover:bg-green-700 text-white !px-6 !py-2 rounded-4xl font-medium transition-colors"
                  >
                    Đánh giá sản phẩm
                  </button>
                  <button
                    onClick={handleBuyAgain}
                    className="bg-blue-600 hover:bg-blue-700 text-white !px-6 !py-2 rounded-4xl font-medium transition-colors"
                  >
                    Mua lại
                  </button>
                </>
              )}

              {canViewProducts && (
                <button
                  onClick={handleViewProducts}
                  className="bg-gray-600 hover:bg-gray-700 text-white !px-6 !py-2 rounded-4xl font-medium transition-colors"
                >
                  Xem lại sản phẩm
                </button>
              )}

              {canTrackOrder && (
                <button
                  onClick={handleTrackOrder}
                  className="bg-blue-600 hover:bg-blue-700 text-white !px-6 !py-2 rounded-4xl font-medium transition-colors"
                >
                  Theo dõi đơn hàng
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 !mb-6">
              <div className="box bg-white !p-4 rounded shadow">
                <h2 className="text-lg font-semibold !mb-2">
                  Trạng thái thanh toán
                </h2>
                <p
                  className={
                    isPaid
                      ? "text-green-600 font-semibold"
                      : "text-red-600 font-semibold"
                  }
                >
                  {isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                </p>
              </div>
              <div className="box bg-white !p-4 rounded shadow">
                <h2 className="text-lg font-semibold !mb-2">
                  Trạng thái vận chuyển
                </h2>
                <p className="text-gray-700 font-semibold">
                  {getShippingStatusLabel(order.status)}
                </p>
              </div>
              <div className="box bg-white !p-4 rounded shadow">
                <h2 className="text-lg font-semibold !mb-2">Mã vận đơn</h2>
                <p className="text-blue-600 uppercase font-bold">
                  {order.orders_id
                    ? `VD${order.orders_id.toString().padStart(6, "0")}`
                    : "---"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 !mb-6">
              <div className="box-address bg-gray-50 !p-4 rounded shadow col-span-2">
                <h2 className="text-lg font-semibold !mb-3">
                  Địa chỉ giao hàng
                </h2>
                {address ? (
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-800">
                      {address.full_name || user?.name || "Khách hàng"}
                    </p>
                    <p className="text-gray-700">
                      {address.address_line ||
                        address.address ||
                        "Địa chỉ không khả dụng"}
                      {(address.ward || address.district || address.province) &&
                        (address.address_line || address.address) !==
                          "Địa chỉ không khả dụng" &&
                        (address.address_line || address.address) !==
                          "Lỗi tải địa chỉ" &&
                        ", "}
                      {address.ward && `${address.ward}, `}
                      {address.district && `${address.district}, `}
                      {address.province || address.city}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Số điện thoại:</span>{" "}
                      {address.phone || user?.phone || "Chưa cập nhật"}
                    </p>
                    {(address.address_line === "Địa chỉ không khả dụng" ||
                      address.address_line === "Lỗi tải địa chỉ") && (
                      <p className="text-sm text-amber-600 bg-amber-50 !p-2 rounded">
                        Thông tin địa chỉ từ API không khả dụng (ID:{" "}
                        {order.shipping_address_id})
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="text-gray-500">
                    <p className="text-red-600">
                      Không thể tải thông tin địa chỉ
                    </p>
                    <p className="text-sm">
                      ID địa chỉ: {order.shipping_address_id}
                    </p>
                    <p className="text-sm text-gray-400">
                      API không trả về dữ liệu hoặc có lỗi
                    </p>
                    {user && (
                      <div className="mt-2 p-2 bg-blue-50 rounded">
                        <p className="text-sm text-blue-800">
                          <strong>Thông tin người dùng:</strong>
                          <br />
                          {user.name}
                          <br />
                          {user.email}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="box-address bg-gray-50 !p-4 rounded shadow">
                <h2 className="text-lg font-semibold !mb-3">Thanh toán</h2>
                <p className="text-gray-700 font-medium">
                  {getPaymentMethodLabel(order.payment_method_id)}
                </p>
                {order.comment && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 font-medium">
                      Ghi chú:
                    </p>
                    <p className="text-sm text-gray-700 italic">
                      {order.comment}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="box bg-white rounded shadow overflow-hidden">
              <table className="table-auto w-full border-t border-gray-200">
                <thead className="bg-gray-100">
                  <tr className="text-left">
                    <th className="!p-4 font-semibold">Sản phẩm</th>
                    <th className="!p-4 font-semibold">Đơn giá</th>
                    <th className="!p-4 font-semibold">Số lượng</th>
                    <th className="!p-4 font-semibold">Tổng</th>
                  </tr>
                </thead>
                <tbody>
                  {order.order_items && order.order_items.length > 0 ? (
                    order.order_items.map((item) => (
                      <tr
                        key={item.order_items_id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="!p-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={getProductImage(item)}
                              alt={getProductName(item)}
                              className="w-16 h-16 object-cover rounded-lg border"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "/images/default.png";
                              }}
                            />
                            <div className="flex-1">
                              <div className="font-medium text-gray-800">
                                {getProductName(item)}
                              </div>
                              <div className="text-sm text-gray-500 mt-1">
                                <span className="inline-block !mr-3">
                                  Màu:{" "}
                                  <span className="font-medium">
                                    {getColorName(item)}
                                  </span>
                                </span>
                                <span className="inline-block">
                                  Size:{" "}
                                  <span className="font-medium">
                                    {getSizeName(item)}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="!p-4 font-medium text-gray-800">
                          {item.unit_price
                            ? item.unit_price.toLocaleString("vi-VN")
                            : "0"}
                          ₫
                        </td>
                        <td className="!p-4 text-center font-medium">
                          {item.quantity || 0}
                        </td>
                        <td className="!p-4 font-semibold text-red-600">
                          {item.unit_price && item.quantity
                            ? (item.unit_price * item.quantity).toLocaleString(
                                "vi-VN"
                              )
                            : "0"}
                          ₫
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="!p-8 text-center text-gray-500"
                      >
                        Không có sản phẩm trong đơn hàng
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="bg-gray-50 !px-6 !py-4">
                <div className="flex justify-end">
                  <div className="w-full max-w-sm space-y-2">
                    <div className="flex justify-between text-gray-700">
                      <span>Tạm tính:</span>
                      <span className="font-medium">
                        {order.total_amount
                          ? order.total_amount.toLocaleString("vi-VN")
                          : "0"}
                        ₫
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Khuyến mại:</span>
                      <span className="font-medium">
                        {order.coupons_id ? "-" : "0"}₫
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Phí vận chuyển:</span>
                      <span className="font-medium">
                        {order.shipping_address_id
                          ? order.shipping_address_id.toLocaleString("vi-VN")
                          : ""}
                        ₫
                      </span>
                    </div>
                    <div className="border-t !pt-2">
                      <div className="flex justify-between text-lg font-bold text-red-600">
                        <span>Tổng tiền:</span>
                        <span>
                          {order.total_amount
                            ? order.total_amount.toLocaleString("vi-VN")
                            : ""}
                          ₫
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showCancelModal && (
        <div className="fixed inset-0 !bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg !p-6 w-full max-w-md !mx-4">
            <h3 className="text-lg font-semibold !mb-4">Hủy đơn hàng</h3>
            <p className="text-gray-600 !mb-4">
              Vui lòng cho biết lý do bạn muốn hủy đơn hàng này:
            </p>
            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full border border-gray-300 rounded-lg !p-3 !mb-4 resize-none"
              rows={4}
              placeholder="Nhập lý do hủy đơn hàng..."
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setCancelReason("");
                }}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 !py-2 !px-6 rounded-lg font-medium transition-colors"
                disabled={actionLoading}
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleCancelOrder}
                disabled={actionLoading || !cancelReason.trim()}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white !py-2 !px-6 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionLoading ? "Đang xử lý..." : "Xác nhận hủy"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
