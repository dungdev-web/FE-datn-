import { IS_MOCK, API_BASE_URL } from "@/config/env";
async function fetchDashboardData(endpoint: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint} data`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}
const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
export const getStatusText = (status: string)=> {
  switch (status) {
    case "pending": return "Chờ xử lý";
    case "processing": return "Đang xử lý";
    case "shipping": return "Đang giao hàng";
    case "delivered": return "Đã giao";
    case "completed": return "Hoàn thành";
    case "cancelled": return "Đã hủy";
    case "returned": return "Hoàn trả";
    default: return "Không xác định";
  }
}

// Format ngày (ISO -> dd-mm-yyyy)
export const formatDate = (dateString: string)=> {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN");
}

export const getRevernueWeekly = () => fetchDashboardData(`revenue/weekly?date=${getToday()}`);
// export const getRevernueMonthly = () => fetchDashboardData(`revenue/monthly?date=${getToday()}`);
export const getRevernueYearly = () => fetchDashboardData(`revenue/yearly?date=${getToday()}`);
export const getTotalRevenueByDay = () => fetchDashboardData(`revenue/totalbyday?date=${getToday()}`);
export const getTotalRevenueByWeek = () => fetchDashboardData(`revenue/totalbyweek?week=${getToday()}`);
export const getTotalRevenueByMonth = () => fetchDashboardData(`revenue/totalbymonth?month=${getToday()}`);
export const getTotalRevenueByYear = () => fetchDashboardData(`revenue/totalbyyear?year=${getToday()}`);
export const getStockinProduct = () => fetchDashboardData("stock");
export const getBestSSellingProducts = () => fetchDashboardData("best-selling-products");
export const getPendingOrders = () => fetchDashboardData("pending-orders");
export const getCountProduct = () => fetchDashboardData("products");
export const getCountBrand = () => fetchDashboardData("brands");
export const getCountCategories = () => fetchDashboardData("categories");
export const getCountUsers = () => fetchDashboardData("users");
export const getCountReviews = () => fetchDashboardData("reviews");
export const getCountPosts = () => fetchDashboardData("posts");
export const getCountPostCategories = () => fetchDashboardData("post-categories");
export const getCountOrders = () => fetchDashboardData("orders");
export const getRecentOrders = (query = "") => fetchDashboardData("recent-orders?" + query);
export const getAllCategoryProduct = ()=> fetchDashboardData("category_product");
export const getPaymentStatusText = (status: string)=> {
  switch (status) {
    case "PROCESSING": return "Chưa thanh toán";
    case "PAID": return "Đã thanh toán";
    default: return "Không xác định";
  }
}