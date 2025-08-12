'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Package, 
  CreditCard,
  Eye,
  Edit,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  RotateCcw
} from 'lucide-react';
import { IOrder } from '@/types/Order';
import { getOrderDetailService } from '@/services/orderService';

interface OrderDetailProps {
  params: Promise<{
    id: string;
    orderId: string;
  }>;
}

export default function OrderDetailPage({ params }: OrderDetailProps) {
  const [order, setOrder] = useState<IOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resolvedParams, setResolvedParams] = useState<{ id: string; orderId: string } | null>(null);

  useEffect(() => {
    const resolveParams = async () => {
      try {
        const resolved = await params;
        setResolvedParams(resolved);
      } catch (error) {
        console.error('Error resolving params:', error);
        setError('Không thể tải thông tin trang');
        setLoading(false);
      }
    };

    resolveParams();
  }, [params]);

  useEffect(() => {
    if (resolvedParams) {
      fetchOrderDetails();
    }
  }, [resolvedParams]);

  const fetchOrderDetails = async () => {
    if (!resolvedParams) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await getOrderDetailService(parseInt(resolvedParams.orderId));
      if (data && data.order) {
        setOrder(data.order);
      } else if (data) {
        setOrder(data);
      } else {
        throw new Error("Dữ liệu đơn hàng không hợp lệ");
      }
    } catch (error: any) {
      console.error('Error fetching order details:', error);
      setError(error.message || "Không thể tải thông tin đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus: string) => {
    if (!order) return;
    
    try {
      setUpdating(true);
      setError(null);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setOrder({ 
        ...order, 
        status: newStatus, 
        updated_at: new Date().toISOString() 
      });
    } catch (error: any) {
      console.error('Error updating order status:', error);
      setError(error.message || "Không thể cập nhật trạng thái đơn hàng");
    } finally {
      setUpdating(false);
    }
  };

  const getStatusInfo = (status: string) => {
    const statusMap = {
      pending: { 
        label: 'Chờ xác nhận', 
        color: 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border border-yellow-200',
        icon: Clock,
        dotColor: 'bg-yellow-500'
      },
      confirmed: { 
        label: 'Đã xác nhận', 
        color: 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200',
        icon: CheckCircle,
        dotColor: 'bg-blue-500'
      },
      shipping: { 
        label: 'Đang giao hàng', 
        color: 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200',
        icon: Truck,
        dotColor: 'bg-purple-500'
      },
      delivered: { 
        label: 'Đã giao', 
        color: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200',
        icon: Package,
        dotColor: 'bg-green-500'
      },
      cancelled: { 
        label: 'Đã hủy', 
        color: 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200',
        icon: XCircle,
        dotColor: 'bg-red-500'
      },
      returned: { 
        label: 'Hoàn trả', 
        color: 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200',
        icon: RotateCcw,
        dotColor: 'bg-gray-500'
      }
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.pending;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading || !resolvedParams) {
    return (
      <div className="min-h-screen bg-gray-50 !p-6">
        <div className="max-w-7xl !mx-auto">
          <div className="flex items-center justify-center !py-20">
            <div className="flex flex-col items-center !gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="text-gray-500 font-medium">Đang tải thông tin đơn hàng...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl !mx-auto">
          <Link 
            href={`/admin/user/view/${resolvedParams.id}`}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium !mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại danh sách đơn hàng
          </Link>
          <div className="flex items-center justify-center !py-20">
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center !mb-4 !mx-auto">
                <XCircle className="w-10 h-10 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Có lỗi xảy ra</h3>
              <p className="text-gray-500 !mb-4">{error}</p>
              <button
                onClick={fetchOrderDetails}
                className="!px-4 !py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Thử lại
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <Link 
            href={`/admin/user/view/${resolvedParams.id}`}
            className="inline-flex items-center !gap-2 text-blue-600 hover:text-blue-700 font-medium !mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại danh sách đơn hàng
          </Link>
          <div className="flex items-center justify-center !py-20">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center !mb-4 !mx-auto">
                <Package className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Không tìm thấy đơn hàng</h3>
              <p className="text-gray-500">Đơn hàng #{resolvedParams.orderId} không tồn tại hoặc đã bị xóa</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(order.status);
  const StatusIcon = statusInfo.icon;

  const subtotal = order.order_items.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);
  const discountAmount = order.coupons_id ? subtotal * 0.1 : 0; 
  const shippingFee = order.shipping_fee || 0;

  return (
    <div className="min-h-screen bg-gray-50 !p-6">
      <div className="max-w-7xl !mx-auto">
        <div className="!mb-8">
          <Link 
            href={`/admin/user/view/${resolvedParams.id}`}
            className="inline-flex items-center !gap-2 text-blue-600 hover:text-blue-700 font-medium !mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại danh sách đơn hàng
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 !mb-2">
                Chi tiết đơn hàng #{order.orders_id}
              </h1>
              <div className="flex items-center !gap-4 text-sm text-gray-600">
                <span>Tạo lúc: {formatDate(order.created_at)}</span>
                <span>•</span>
                <span>Cập nhật: {formatDate(order.updated_at)}</span>
              </div>
            </div>
            
            <div className="flex items-center !gap-3">
              <span className={`inline-flex items-center !px-4 !py-2 rounded-full text-sm font-semibold ${statusInfo.color}`}>
                <div className={`w-2 h-2 rounded-full !mr-2 ${statusInfo.dotColor}`}></div>
                <StatusIcon className="w-4 h-4 mr-1" />
                {statusInfo.label}
              </span>
            </div>
          </div>
        </div>

        {error && (
          <div className="!mb-6 bg-red-50 border border-red-200 rounded-lg !p-4">
            <div className="flex items-center !gap-2 text-red-800">
              <XCircle className="w-5 h-5" />
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 !gap-3">
          <div className="lg:col-span-2 !space-y-3">
            <div className="bg-white rounded-xl shadow-lg !p-6 border border-gray-100">
              <div className="flex items-center !gap-3 !mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Sản phẩm đặt hàng</h2>
                  <p className="text-sm text-gray-500">{order.order_items.length} sản phẩm</p>
                </div>
              </div>
              
              <div className="!space-y-3">
                {order.order_items.map((item, index) => (
                  <div key={item.order_items_id} className="flex items-center !gap-4 !p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors duration-200">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                      <Package className="w-8 h-8 text-gray-500" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 !mb-1">
                        Sản phẩm #{item.order_items_id}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Màu: <span className="font-medium">{item.variant?.color?.name_color || 'N/A'}</span></span>
                        <span>Size: <span className="font-medium">{item.variant?.size?.number_size || 'N/A'}</span></span>
                        <span>SL: <span className="font-medium">{item.quantity}</span></span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold text-lg text-gray-900">{formatCurrency(item.unit_price)}</div>
                      <div className="text-sm text-gray-500">x{item.quantity}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg !p-6 border border-gray-100">
              <div className="flex items-center !gap-3 !mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Trạng thái đơn hàng</h2>
                  <p className="text-sm text-gray-500">Theo dõi tiến trình xử lý</p>
                </div>
              </div>

              <div className="!space-y-3">
                {!updating ? (
                  <div className="flex items-center !gap-3">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusUpdate(e.target.value)}
                      className="!px-4 !py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm bg-white"
                    >
                      <option value="pending">Chờ xác nhận</option>
                      <option value="confirmed">Đã xác nhận</option>
                      <option value="shipping">Đang giao hàng</option>
                      <option value="delivered">Đã giao</option>
                      <option value="cancelled">Đã hủy</option>
                      <option value="returned">Hoàn trả</option>
                    </select>
                  </div>
                ) : (
                  <div className="flex items-center !gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <span className="text-gray-600">Đang cập nhật trạng thái...</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="!space-y-3">
            <div className="bg-white rounded-xl shadow-lg !p-6 border border-gray-100">
              <div className="flex items-center !gap-3 !mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Thông tin khách hàng</h2>
                </div>
              </div>
              
              <div className="!space-y-3">
                <div className="flex items-center !gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="font-semibold text-gray-900">{order.user.name}</div>
                    <div className="text-sm text-gray-500">Tên khách hàng</div>
                  </div>
                </div>
                
                <div className="flex items-center !gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="font-semibold text-gray-900">{order.user.phone}</div>
                    <div className="text-sm text-gray-500">Số điện thoại</div>
                  </div>
                </div>
                
                <div className="flex items-center !gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="font-semibold text-gray-900">{order.user.email}</div>
                    <div className="text-sm text-gray-500">Email</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg !p-6 border border-gray-100">
              <div className="flex items-center !gap-3 !mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Thông tin giao hàng</h2>
                </div>
              </div>
              
              <div className="!space-y-3">
                <div>
                  <div className="font-semibold text-gray-900 mb-2">Địa chỉ giao hàng:</div>
                  <div className="text-gray-700 leading-relaxed">
                    {typeof order.shipping_address === 'string' 
                      ? order.shipping_address 
                      : order.shipping_address?.address_line || 'Chưa có thông tin địa chỉ'
                    }
                  </div>
                </div>
                
                {order.comment && (
                  <div>
                    <div className="font-semibold text-gray-900 !mb-2">Ghi chú:</div>
                    <div className="text-gray-700 leading-relaxed bg-gray-50 !p-3 rounded-lg">
                      {order.comment}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg !p-6 border border-gray-100">
              <div className="flex items-center !gap-3 !mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Tổng kết thanh toán</h2>
                </div>
              </div>
              
              <div className="!space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Phí vận chuyển:</span>
                  <span className="font-medium">{formatCurrency(shippingFee)}</span>
                </div>
                
                {discountAmount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Giảm giá:</span>
                    <span className="font-medium text-red-600">-{formatCurrency(discountAmount)}</span>
                  </div>
                )}
                
                <div className="border-t border-gray-200 !pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Tổng cộng:</span>
                    <span className="text-2xl font-bold text-green-600">
                      {formatCurrency(order.total_amount)}
                    </span>
                  </div>
                </div>
                
                <div className="!mt-4 !pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Phương thức thanh toán:</span>
                    <span className="font-medium">
                      {typeof order.payment_method === 'string' 
                        ? (order.payment_method === 'cod' ? 'Thanh toán khi nhận hàng' : 
                           order.payment_method === 'bank' ? 'Chuyển khoản ngân hàng' : 
                           order.payment_method)
                        : order.payment_method?.name_method || 'Chưa xác định'
                      }
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center !mt-2">
                    <span className="text-gray-600">Trạng thái thanh toán:</span>
                    <span className={`font-medium ${
                      order.payment_status === 'paid' ? 'text-green-600' : 
                      order.payment_status === 'pending' ? 'text-yellow-600' : 
                      'text-red-600'
                    }`}>
                      {order.payment_status === 'paid' ? 'Đã thanh toán' :
                       order.payment_status === 'pending' ? 'Chờ thanh toán' :
                       'Chưa thanh toán'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}