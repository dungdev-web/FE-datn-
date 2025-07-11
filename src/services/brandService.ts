import { IBrand } from "@/types/IBrand";
import { IS_MOCK, API_BASE_URL } from "@/config/env";
import { getMockBrands } from "@/mocks/mockBrands";

export async function getBrands(): Promise<IBrand[]> {
  if (IS_MOCK) {
    return getMockBrands();
  }

  const res = await fetch(`${API_BASE_URL}/brand`, {
    cache: "no-store",
  });

  const json = await res.json();
  return json.brands || [];
}
