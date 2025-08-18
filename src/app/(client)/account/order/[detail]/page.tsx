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
import { useAddToCart } from "@/hooks/useAddToCart";

export default function OrderDetail() {
  const params = useParams();
  const router = useRouter();
  const orderId = Number(params.detail);
  const { handleAddToCart } = useAddToCart();
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
                  shipping_address_id: orderData.shipping_address_id,
                  ship_address_id: orderData.ship_address_id,
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
              shipping_address_id: orderData.shipping_address_id,
              ship_address_id: orderData.ship_address_id,
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

  const getShippingStatusInfo = (status: string) => {
    switch (status) {
      case "pending":
        return {
          label: "Chờ xác nhận",
          icon: "⏳",
          color: "text-yellow-600",
          bgColor: "bg-yellow-100",
          description: "Đơn hàng của bạn đang được xử lý",
        };
      case "confirmed":
      case "processing":
        return {
          label: "Đã xác nhận, đang chuẩn bị hàng",
          icon: "📦",
          color: "text-blue-600",
          bgColor: "bg-blue-100",
          description: "Cửa hàng đang chuẩn bị hàng cho bạn",
        };
      case "shipping":
        return {
          label: "Đang giao hàng",
          icon: "🚚",
          color: "text-purple-600",
          bgColor: "bg-purple-100",
          description: "Đơn hàng đang trên đường giao đến bạn",
        };
      case "completed":
        return {
          label: "Hoàn thành",
          icon: "🎉",
          color: "text-green-600",
          bgColor: "bg-green-100",
          description: "Giao hàng thành công",
        };
      case "cancelled":
        return {
          label: "Đã hủy",
          icon: "❌",
          color: "text-red-600",
          bgColor: "bg-red-100",
          description: "Đơn hàng đã được hủy",
        };
      case "returned":
        return {
          label: "Hoàn đơn",
          icon: "🔄",
          color: "text-orange-600",
          bgColor: "bg-orange-100",
          description: "Đơn hàng đã được hoàn trả",
        };
      default:
        return {
          label: "Không xác định",
          icon: "❓",
          color: "text-gray-600",
          bgColor: "bg-gray-100",
          description: "",
        };
    }
  };

  const getPaymentMethodLabel = (paymentMethodId: number) => {
    switch (paymentMethodId) {
      case 1:
        return "Thanh toán khi nhận hàng (COD)";
      case 2:
        return "Chuyển khoản ngân hàng";
      default:
        return "Thanh toán khi nhận hàng (COD)";
    }
  };

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

      await updateOrderStatus(orderId, "completed");

      if (order) {
        setOrder({ ...order, status: "completed" });
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

  const handleBuyAgain = async () => {
    if (!order?.order_items || order.order_items.length === 0) {
      Swal.fire({
        icon: "info",
        title: "Không có sản phẩm",
        text: "Đơn hàng này không có sản phẩm nào để mua lại.",
      });
      return;
    }

    try {
      for (const item of order.order_items) {
        const variantId = item.variant_id || item.variant?.id;
        const stock = item.variant?.stock_quantity ?? 0;
        const requestedQty = item.quantity;
        const productName = getProductName(item);

        if (stock <= 0) {
          // Hết hàng
          await Swal.fire({
            icon: "warning",
            title: "Hết hàng",
            text: `${productName} hiện đã hết hàng.`,
          });
          continue;
        }

        if (stock < requestedQty) {
          // Còn ít hơn số lượng muốn mua
          const result = await Swal.fire({
            icon: "warning",
            title: "Số lượng không đủ",
            text: `${productName} chỉ còn ${stock} sản phẩm. Bạn có muốn thêm vào giỏ hàng không?`,
            showCancelButton: true,
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Hủy",
          });

          if (!result.isConfirmed) {
            continue; // bỏ qua sản phẩm này
          }

          // Nếu đồng ý → thêm số lượng còn lại
          await handleAddToCart({
            variant_id: variantId,
            quantity: stock,
            price: item.price,
          });
        } else {
          // Số lượng đủ → thêm như bình thường
          await handleAddToCart({
            variant_id: variantId,
            quantity: requestedQty,
            price: item.price,
          });
        }
      }

      Swal.fire({
        icon: "success",
        title: "Đã thêm sản phẩm vào giỏ hàng!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        router.push("/cart");
      });
    } catch (error) {
      console.error("Lỗi khi mua lại:", error);
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại!",
      });
    }
  };

  const handleContactStore = () => {
    // Logic liên hệ cửa hàng
    Swal.fire({
      icon: "info",
      title: "Liên hệ cửa hàng",
      html: `
        <p>Bạn có thể liên hệ cửa hàng qua:</p>
        <p><strong>Hotline:</strong> 0559947252</p>
        <p><strong>Email:</strong> terashoesshop@gmail.com</p>
      `,
    });
  };

  const handleContactShipping = () => {
    // Logic liên hệ đơn vị vận chuyển
    Swal.fire({
      icon: "info",
      title: "Liên hệ vận chuyển",
      html: `
  <p>Mã đơn hàng: <strong>${
    order?.created_at && order?.orders_id
      ? `TERA${(() => {
          const date = new Date(order?.created_at);
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0");
          return `${day}${month}${order?.orders_id}`;
        })()}`
      : "---"
  }</strong></p>
  <p>Bạn có thể liên hệ đơn vị vận chuyển để biết thêm chi tiết.</p>
`,
    });
  };

  const getActionButtons = () => {
    const status = order?.status;
    const buttons = [];

    switch (status) {
      case "pending":
        buttons.push(
          <button
            key="cancel"
            onClick={() => setShowCancelModal(true)}
            disabled={actionLoading}
            className="bg-red-600 hover:bg-red-700 text-white !px-6 !py-2 rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {actionLoading ? "Đang xử lý..." : "Hủy đơn hàng"}
          </button>
        );
        break;

      case "confirmed":
      case "processing":
        buttons.push(
          <button
            key="track"
            onClick={handleTrackOrder}
            className="bg-blue-600 hover:bg-blue-700 text-white !px-6 !py-2 rounded-full font-medium transition-colors"
          >
            Theo dõi đơn hàng
          </button>,
          <button
            key="contact"
            onClick={handleContactStore}
            className="bg-gray-600 hover:bg-gray-700 text-white !px-6 !py-2 rounded-full font-medium transition-colors"
          >
            Liên hệ cửa hàng
          </button>
        );
        break;

      case "shipping":
        buttons.push(
          <button
            key="confirm"
            onClick={handleConfirmReceived}
            disabled={actionLoading}
            className="bg-green-600 hover:bg-green-700 text-white !px-6 !py-2 rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {actionLoading ? "Đang xử lý..." : "Đã nhận được hàng"}
          </button>,
          <button
            key="track"
            onClick={handleTrackOrder}
            className="bg-blue-600 hover:bg-blue-700 text-white !px-6 !py-2 rounded-full font-medium transition-colors"
          >
            Theo dõi đơn hàng
          </button>,
          <button
            key="contact-shipping"
            onClick={handleContactShipping}
            className="bg-purple-600 hover:bg-purple-700 text-white !px-6 !py-2 rounded-full font-medium transition-colors"
          >
            Liên hệ vận chuyển
          </button>
        );
        break;
      case "completed":
        buttons.push(
          <button
            key="review"
            onClick={handleReviewProducts}
            className="bg-green-600 hover:bg-green-700 text-white !px-6 !py-2 rounded-full font-medium transition-colors"
          >
            Đánh giá sản phẩm
          </button>,
          <button
            key="buy-again"
            onClick={handleBuyAgain}
            className="bg-blue-600 hover:bg-blue-700 text-white !px-6 !py-2 rounded-full font-medium transition-colors"
          >
            Mua lại
          </button>
        );
        break;

      case "cancelled":
        buttons.push(
          <button
            key="buy-again"
            onClick={handleBuyAgain}
            className="bg-blue-600 hover:bg-blue-700 text-white !px-6 !py-2 rounded-full font-medium transition-colors"
          >
            Mua lại sản phẩm
          </button>
        );
        break;
    }

    return buttons;
  };

  const getEstimatedDeliveryDate = () => {
    if (!order || order.status !== "shipping") return null;

    const orderDate = new Date(order.created_at);
    const estimatedDate = new Date(
      orderDate.getTime() + 3 * 24 * 60 * 60 * 1000
    ); // +3 ngày

    return estimatedDate.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  function renderPaymentStatus(status: string | undefined) {
    switch (status) {
      case "PAID":
        return <p className="text-green-600 font-semibold">Đã thanh toán</p>;
      case "PROCESSING":
        return <p className="text-yellow-600 font-semibold">Đang xử lý</p>;
      case "FAILED":
        return (
          <p className="text-red-600 font-semibold">Thanh toán thất bại</p>
        );
      default:
        return <p className="text-gray-500">Không xác định</p>;
    }
  }
  const statusInfo = order ? getShippingStatusInfo(order.status) : null;

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

            {/* Cải thiện hiển thị trạng thái đơn hàng */}
            {statusInfo && (
              <div
                className={`${
                  statusInfo.bgColor
                } !p-4 rounded-lg !mb-6 border-l-4 border-${
                  statusInfo.color.split("-")[1]
                }-500`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{statusInfo.icon}</span>
                  <div>
                    <h3 className={`font-semibold ${statusInfo.color}`}>
                      {statusInfo.label}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {statusInfo.description}
                    </p>
                    {order.status === "shipping" &&
                      getEstimatedDeliveryDate() && (
                        <p className="text-sm font-medium text-purple-700 mt-1">
                          Dự kiến giao: {getEstimatedDeliveryDate()}
                        </p>
                      )}
                    {order.status === "cancelled" && order.comment && (
                      <p className="text-sm text-red-700 mt-1">
                        Lý do hủy: {order.comment}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Các nút action theo trạng thái */}
            <div className="flex flex-wrap gap-3 !mb-6">
              {getActionButtons()}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 !mb-6">
              <div className="box bg-white !p-4 rounded shadow">
                <h2 className="text-lg font-semibold !mb-2">
                  Trạng thái thanh toán
                </h2>
                <p>{renderPaymentStatus(order?.payment_status)}</p>
              </div>
              <div className="box bg-white !p-4 rounded shadow">
                <h2 className="text-lg font-semibold !mb-2">
                  Trạng thái vận chuyển
                </h2>
                <p
                  className={`font-semibold ${
                    statusInfo?.color || "text-gray-700"
                  }`}
                >
                  {statusInfo?.label || "Không xác định"}
                </p>
              </div>
              <div className="box bg-white !p-4 rounded shadow">
                <h2 className="text-lg font-semibold !mb-2">Mã đơn hàng</h2>
                <p className="text-blue-600 uppercase font-bold">
                  {order.created_at && order.orders_id
                    ? `TERA${(() => {
                        const date = new Date(order.created_at);
                        const day = String(date.getDate()).padStart(2, "0");
                        const month = String(date.getMonth() + 1).padStart(
                          2,
                          "0"
                        );
                        return `${day}${month}${order.orders_id}`;
                      })()}`
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
                    <th className="!p-4 font-semibold">Tổng</th>
                    <th className="!p-4 font-semibold">Đơn giá</th>
                    <th className="!p-4 font-semibold">Số lượng</th>
                    <th className="!p-4 font-semibold">Tổng cộng</th>
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
                        {order.shipping_fee
                          ? order.shipping_fee.toLocaleString("vi-VN")
                          : 0}
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

            {/* Gợi ý sản phẩm tương tự cho trạng thái completed */}
            {order.status === "completed" && (
              <div className="mt-6 bg-white rounded shadow !p-6">
                <h3 className="text-lg font-semibold !mb-4 text-gray-800">
                  💡 Sản phẩm bạn có thể quan tâm
                </h3>
                <div className="bg-blue-50 !p-4 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    Khám phá thêm những sản phẩm tương tự với đơn hàng của bạn
                  </p>
                  <button
                    onClick={() => router.push("/product")}
                    className="!mt-2 text-blue-600 hover:text-blue-800 font-medium text-sm underline"
                  >
                    Xem ngay →
                  </button>
                </div>
              </div>
            )}

            {/* Hiển thị thông tin chi tiết cho đơn hàng đã hủy */}
            {order.status === "cancelled" && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-lg !p-6">
                <h3 className="text-lg font-semibold text-red-800 !mb-3">
                  ❌ Thông tin đơn hàng đã hủy
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="text-red-700">
                    <strong>Thời gian hủy:</strong>{" "}
                    {new Date(
                      order.updated_at || order.created_at
                    ).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  {order.comment && (
                    <p className="text-red-700">
                      <strong>Lý do hủy:</strong> {order.comment}
                    </p>
                  )}
                  <p className="text-red-600 bg-red-100 !p-3 rounded mt-3">
                    💰 Nếu bạn đã thanh toán, số tiền sẽ được hoàn lại trong 3-5
                    ngày làm việc.
                  </p>
                </div>
              </div>
            )}

            {/* Thông tin bổ sung cho trạng thái shipping */}
            {order.status === "shipping" && (
              <div className="!mt-3 bg-purple-50 border border-purple-200 rounded-lg !p-6">
                <h3 className="text-lg font-semibold text-purple-800 !mb-3">
                  🚚 Thông tin vận chuyển
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-purple-700">
                      <strong>Mã đơn hàng: </strong>
                      {order.created_at && order.orders_id
                        ? `TERA${(() => {
                            const date = new Date(order.created_at);
                            const day = String(date.getDate()).padStart(2, "0");
                            const month = String(date.getMonth() + 1).padStart(
                              2,
                              "0"
                            );
                            return `${day}${month}${order.orders_id}`;
                          })()}`
                        : "---"}
                    </p>
                    <p className="text-purple-700">
                      <strong>Đơn vị vận chuyển:</strong> Giao hàng nhanh
                    </p>
                  </div>
                  <div>
                    <p className="text-purple-700">
                      <strong>Dự kiến giao:</strong>{" "}
                      {getEstimatedDeliveryDate()}
                    </p>
                    <p className="text-purple-700">
                      <strong>Thời gian giao:</strong> 8:00 - 18:00
                    </p>
                  </div>
                </div>
                <div className="mt-4 !p-3 bg-purple-100 rounded">
                  <p className="text-purple-800 text-sm">
                    📱 <strong>Lưu ý:</strong> Bạn sẽ nhận được SMS/cuộc gọi từ
                    shipper trước khi giao hàng 30 phút.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {showCancelModal && (
        <div className="fixed inset-0 !bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg !p-6 w-full max-w-md !mx-4 shadow-2xl">
            <div className="flex items-center gap-3 !mb-4">
              <span className="text-2xl">⚠️</span>
              <h3 className="text-lg font-semibold text-gray-800">
                Hủy đơn hàng
              </h3>
            </div>
            <p className="text-gray-600 !mb-4">
              Vui lòng cho biết lý do bạn muốn hủy đơn hàng này. Điều này giúp
              chúng tôi cải thiện dịch vụ tốt hơn.
            </p>

            <div className="!mb-4">
              <p className="text-sm font-medium text-gray-700 !mb-2">
                Lý do thường gặp:
              </p>
              <div className="space-y-2">
                {[
                  "Thay đổi ý định",
                  "Tìm được giá tốt hơn",
                  "Sản phẩm không cần thiết",
                  "Khác",
                ].map((reason) => (
                  <button
                    key={reason}
                    onClick={() => setCancelReason(reason)}
                    className={`block w-full text-left !px-3 !py-2 rounded text-sm border transition-colors ${
                      cancelReason === reason
                        ? "bg-red-100 border-red-300 text-red-700"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {reason}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full border border-gray-300 rounded-lg !p-3 !mb-4 resize-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              rows={3}
              placeholder="Hoặc nhập lý do khác..."
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
                Quay lại
              </button>
              <button
                onClick={handleCancelOrder}
                disabled={actionLoading || !cancelReason.trim()}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white !py-2 !px-6 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionLoading ? "Đang hủy..." : "Xác nhận hủy"}
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-3 text-center">
              Sau khi hủy, đơn hàng không thể khôi phục lại được.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
