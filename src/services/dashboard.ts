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
export const getRevernueWeekly = () => fetchDashboardData(`revenue/weekly?date=${getToday()}`);
// export const getRevernueMonthly = () => fetchDashboardData(`revenue/monthly?date=${getToday()}`);
export const getRevernueYearly = () => fetchDashboardData(`revenue/yearly?date=${getToday()}`);
export const getTotalRevenueByDay = () => fetchDashboardData(`revenue/totalbyday?date=${getToday()}`);
export const getTotalRevenueByWeek = () => fetchDashboardData(`revenue/totalbyweek?week=${getToday()}`);
export const getTotalRevenueByMonth = () => fetchDashboardData(`revenue/totalbymonth?month=${getToday()}`);
export const getTotalRevenueByYear = () => fetchDashboardData(`revenue/totalbyyear?year=${getToday()}`);
export const getStockinProduct = () => fetchDashboardData("stock");
export const getBestSSellingProducts = () => fetchDashboardData("best-selling-products");
export const getCountProduct = () => fetchDashboardData("products");
export const getCountBrand = () => fetchDashboardData("brands");
export const getCountCategories = () => fetchDashboardData("categories");
export const getCountUsers = () => fetchDashboardData("users");
export const getCountReviews = () => fetchDashboardData("reviews");
export const getCountPosts = () => fetchDashboardData("posts");
export const getCountPostCategories = () => fetchDashboardData("post-categories");
export const getCountOrders = () => fetchDashboardData("orders");