"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getOrderDetailService } from "@/services/orderService";
import { getAddressByIdService } from "@/services/addressService";
import { checkToken } from "@/services/authService";
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

export interface IAddress {
  id: number;
  full_name: string;
  phone: string;
  address_line_part: string;
  ward: string;
  district: string;
  province: string;
}

export interface IOrder {
  orders_id: number;
  user_id: number;
  status: string;
  total_amount: number;
  payment_method_id: number;
  shipping_address_id: number;
  coupons_id: number | null;
  comment: string | null;
  created_at: string;
  updated_at: string;
  order_items: IOrderItem[];
}

export interface IUser {
  id: number;
  full_name: string;
  email: string;
  phone?: string;
}

export default function OrderDetail() {
  const params = useParams();
  const orderId = Number(params.detail);

  const [order, setOrder] = useState<IOrder | null>(null);
  const [address, setAddress] = useState<IAddress | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  // Helper functions để xử lý dữ liệu
  const getColorName = (item: any): string => {
    const colorData = item.variant?.color || item.variant_id?.color || item.color;
    if (!colorData) return "Không có";
    if (typeof colorData === 'string') return colorData;
    if (typeof colorData === 'object') {
      return colorData.name_color || colorData.name || colorData.color_name || "Không có";
    }
    return "Không có";
  };

  const getSizeName = (item: any): string => {
    const sizeData = item.variant?.size || item.variant_id?.size || item.size;
    if (!sizeData) return "Không có";
    if (typeof sizeData === 'string') return sizeData;
    if (typeof sizeData === 'object') {
      return sizeData.number_size || sizeData.name || sizeData.size_name || sizeData.size || "Không có";
    }
    return "Không có";
  };

  const getProductName = (item: any): string => {
    const name = item.variant?.product?.name || 
                 item.variant_id?.product?.name || 
                 item.product?.name || 
                 item.product_name || 
                 "Tên sản phẩm không có";
    
    // Xử lý \n trong tên sản phẩm, thay thế bằng dấu cách
    return name.replace(/\n/g, ' ').trim();
  };

  const getProductImage = (item: any): string => {
    const imagePath = item.variant?.color?.images || 
                     item.variant?.product?.image_url ||
                     item.variant_id?.product?.image_url || 
                     item.product?.image_url || 
                     item.image_url;
    
    return imagePath ? `${API_BASE_URL}/uploads/${imagePath}` : "/images/default.png";
  };

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        setLoading(true);
        setError("");

        // Lấy thông tin user từ token
        const tokenData = await checkToken();
        if (tokenData?.user) {
          setUser(tokenData.user);
        }

        // Lấy chi tiết đơn hàng
        const orderData = await getOrderDetailService(orderId);
        console.log("Order data:", orderData); // Debug log
        console.log("Order items:", orderData?.order_items); // Debug order items
        
        if (!orderData) {
          throw new Error("Không tìm thấy đơn hàng");
        }
        
        setOrder(orderData);

        // Lấy địa chỉ giao hàng
        if (orderData?.shipping_address_id) {
          try {
            const addressData = await getAddressByIdService(orderData.shipping_address_id);
            console.log("Address data:", addressData); // Debug log
            console.log("Address type:", typeof addressData, Array.isArray(addressData)); // Debug type
            
            if (addressData && addressData !== null && addressData !== undefined) {
              // Xử lý nếu addressData là array, lấy phần tử đầu tiên
              const addressObj = Array.isArray(addressData) ? addressData[0] : addressData;
              console.log("Final address object:", addressObj);
              setAddress(addressObj);
            } else {
              console.log("No address data returned, API response:", addressData);
              // Tạo địa chỉ mặc định từ user info (nếu có)
              if (user) {
                const fallbackAddress = {
                  id: orderData.shipping_address_id,
                  full_name: user.full_name || "Khách hàng",
                  phone: user.phone || "Chưa cập nhật",
                  address_line_part: "Địa chỉ không khả dụng",
                  ward: "",
                  district: "",
                  province: ""
                };
                setAddress(fallbackAddress);
              }
            }
          } catch (addressError) {
            console.error("Lỗi khi lấy địa chỉ:", addressError);
            // Tạo địa chỉ fallback nếu có lỗi
            if (user) {
              const fallbackAddress = {
                id: orderData.shipping_address_id,
                full_name: user.full_name || "Khách hàng", 
                phone: user.phone || "Chưa cập nhật",
                address_line_part: "Lỗi tải địa chỉ",
                ward: "",
                district: "",
                province: ""
              };
              setAddress(fallbackAddress);
            }
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

  const isPaid = order?.status === "completed" || order?.status === "delivered";

  if (loading) {
    return (
      <div className="p-4 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2">Đang tải chi tiết đơn hàng...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-600">
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
      <div className="p-4 text-center text-gray-600">
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
            <div className="block-account">
              <h5 className="title-account">Tài khoản</h5>
              <p>
                Xin chào, <span>{user?.full_name || "Khách hàng"}</span>!
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
            <div className="flex justify-between items-center mb-4">
              <h1>Chi tiết đơn hàng #{order.orders_id}</h1>
              <Link 
                href="/account/order"
                className="text-blue-600 hover:underline"
              >
                ← Quay lại
              </Link>
            </div>
            
            <p className="order_date mb-6">
              Ngày tạo: {new Date(order.created_at).toLocaleDateString("vi-VN", {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>

            {/* Thông tin trạng thái */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="box bg-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold mb-2">
                  Trạng thái thanh toán
                </h2>
                <p className={isPaid ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                  {isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                </p>
              </div>
              <div className="box bg-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold mb-2">
                  Trạng thái vận chuyển
                </h2>
                <p className="text-gray-700 font-semibold">
                  {getShippingStatusLabel(order.status)}
                </p>
              </div>
              <div className="box bg-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold mb-2">Mã vận đơn</h2>
                <p className="text-blue-600 uppercase font-bold">
                  {order.orders_id ? `VD${order.orders_id.toString().padStart(6, '0')}` : "---"}
                </p>
              </div>
            </div>

            {/* Thông tin địa chỉ và thanh toán */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="box-address bg-gray-50 p-4 rounded shadow col-span-2">
                <h2 className="text-lg font-semibold mb-3">
                  Địa chỉ giao hàng
                </h2>
                {address ? (
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-800">
                      {address.full_name || address.name || user?.full_name || "Khách hàng"}
                    </p>
                    <p className="text-gray-700">
                      {/* Xử lý nhiều cấu trúc địa chỉ khác nhau */}
                      {address.address_line_part || address.address_line || address.address || "Địa chỉ không khả dụng"}
                      {(address.ward || address.district || address.province) && 
                       (address.address_line_part || address.address_line || address.address) !== "Địa chỉ không khả dụng" && 
                       (address.address_line_part || address.address_line || address.address) !== "Lỗi tải địa chỉ" && ", "}
                      {address.ward && `${address.ward}, `}
                      {address.district && `${address.district}, `}
                      {address.province || address.city}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Số điện thoại:</span> {address.phone || user?.phone || "Chưa cập nhật"}
                    </p>
                    {(address.address_line_part === "Địa chỉ không khả dụng" || address.address_line_part === "Lỗi tải địa chỉ") && (
                      <p className="text-sm text-amber-600 bg-amber-50 p-2 rounded">
                        ⚠️ Thông tin địa chỉ từ API không khả dụng (ID: {order.shipping_address_id})
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="text-gray-500">
                    <p className="text-red-600">Không thể tải thông tin địa chỉ</p>
                    <p className="text-sm">ID địa chỉ: {order.shipping_address_id}</p>
                    <p className="text-sm text-gray-400">
                      API không trả về dữ liệu hoặc có lỗi
                    </p>
                    {/* Hiển thị thông tin user như fallback */}
                    {user && (
                      <div className="mt-2 p-2 bg-blue-50 rounded">
                        <p className="text-sm text-blue-800">
                          <strong>Thông tin người dùng:</strong><br/>
                          {user.full_name}<br/>
                          {user.email}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="box-address bg-gray-50 p-4 rounded shadow">
                <h2 className="text-lg font-semibold mb-3">Thanh toán</h2>
                <p className="text-gray-700 font-medium">
                  {getPaymentMethodLabel(order.payment_method_id)}
                </p>
                {order.comment && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 font-medium">Ghi chú:</p>
                    <p className="text-sm text-gray-700 italic">{order.comment}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Bảng sản phẩm */}
            <div className="box bg-white rounded shadow overflow-hidden">
              <table className="table-auto w-full border-t border-gray-200">
                <thead className="bg-gray-100">
                  <tr className="text-left">
                    <th className="p-4 font-semibold">Sản phẩm</th>
                    <th className="p-4 font-semibold">Đơn giá</th>
                    <th className="p-4 font-semibold">Số lượng</th>
                    <th className="p-4 font-semibold">Tổng</th>
                  </tr>
                </thead>
                <tbody>
                  {order.order_items && order.order_items.length > 0 ? (
                    order.order_items.map((item) => (
                      <tr key={item.order_items_id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
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
                                <span className="inline-block mr-3">
                                  Màu: <span className="font-medium">
                                    {getColorName(item)}
                                  </span>
                                </span>
                                <span className="inline-block">
                                  Size: <span className="font-medium">
                                    {getSizeName(item)}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 font-medium text-gray-800">
                          {item.unit_price ? item.unit_price.toLocaleString("vi-VN") : "0"}₫
                        </td>
                        <td className="p-4 text-center font-medium">
                          {item.quantity || 0}
                        </td>
                        <td className="p-4 font-semibold text-red-600">
                          {item.unit_price && item.quantity 
                            ? (item.unit_price * item.quantity).toLocaleString("vi-VN")
                            : "0"
                          }₫
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-gray-500">
                        Không có sản phẩm trong đơn hàng
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Tổng kết */}
              <div className="bg-gray-50 px-6 py-4">
                <div className="flex justify-end">
                  <div className="w-full max-w-sm space-y-2">
                    <div className="flex justify-between text-gray-700">
                      <span>Tạm tính:</span>
                      <span className="font-medium">
                        {order.total_amount ? order.total_amount.toLocaleString("vi-VN") : "0"}₫
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
                      <span className="font-medium">40.000₫</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between text-lg font-bold text-red-600">
                        <span>Tổng tiền:</span>
                        <span>
                          {order.total_amount 
                            ? (order.total_amount + 40000).toLocaleString("vi-VN")
                            : "40.000"
                          }₫
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Debug info - chỉ hiển thị trong development */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
                <h3 className="font-semibold text-yellow-800 mb-2">Debug Info:</h3>
                <pre className="text-xs text-yellow-700 overflow-auto">
                  {JSON.stringify({ 
                    orderId, 
                    orderStatus: order.status,
                    orderItemsCount: order.order_items?.length || 0,
                    addressId: order.shipping_address_id,
                    hasAddress: !!address,
                    userName: user?.full_name,
                    userEmail: user?.email,
                    firstProduct: order.order_items?.[0]?.variant_id?.product?.name,
                    firstProductVariant: order.order_items?.[0]?.variant_id,
                    colorData: order.order_items?.[0]?.variant_id?.color,
                    sizeData: order.order_items?.[0]?.variant_id?.size,
                    rawOrderItem: order.order_items?.[0],
                    addressName: address?.full_name,
                    addressPhone: address?.phone,
                    addressFull: address,
                    paymentMethod: order.payment_method_id
                  }, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}