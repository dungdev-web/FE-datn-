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

export const getRevernueWeekly = () => fetchDashboardData("revenue/weekly");
// export const getRevernueMonthly = () => fetchDashboardData("revenue/monthly");
// export const getRevernueYearly = () => fetchDashboardData("revenue/yearly");

export const getCountProduct = () => fetchDashboardData("products");
export const getCountBrand = () => fetchDashboardData("brands");
export const getCountCategories = () => fetchDashboardData("categories");
export const getCountUsers = () => fetchDashboardData("users");
export const getCountReviews = () => fetchDashboardData("reviews");
export const getCountPosts = () => fetchDashboardData("posts");
export const getCountPostCategories = () => fetchDashboardData("post-categories");
export const getCountOrders = () => fetchDashboardData("orders");
