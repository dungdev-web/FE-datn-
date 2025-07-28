import { IS_MOCK, API_BASE_URL } from "@/config/env";

export async function getRevernue() {
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard/revenue`);
    if (!response.ok) {
      throw new Error('Failed to fetch revenue data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching revenue:', error);
    throw error;
  }
}