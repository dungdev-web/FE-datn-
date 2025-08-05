export const getShippingStatusInfo = (status: string) => {
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
    case "delivered":
      return {
        label: "Đã giao hàng",
        icon: "✅",
        color: "text-green-600",
        bgColor: "bg-green-100",
        description: "Đơn hàng đã được giao thành công",
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

export const getPaymentMethodLabel = (paymentMethodId: number) => {
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

export const getEstimatedDeliveryDate = (createdAt: string) => {
  const orderDate = new Date(createdAt);
  const estimatedDate = new Date(orderDate.getTime() + 3 * 24 * 60 * 60 * 1000); // +3 ngày
  return estimatedDate.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
