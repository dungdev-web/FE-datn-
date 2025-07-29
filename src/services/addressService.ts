import { API_BASE_URL } from "@/config/env";
import { AddressResponse } from "@/types/address";

export interface AddressPayload {
  street?: string;
  city?: string;
  district?: string;
  ward?: string;
  [key: string]: any;
}

export async function getAddressByUserId(
  userId: number
): Promise<AddressResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/addresses/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("[FE Service] Lỗi getAddressByUserId:", errorData);
      throw new Error(errorData?.message || "Lấy địa chỉ thất bại");
    }
    const data = await res.json();

    return data;
  } catch (error: any) {
    console.error("[FE Service] Lỗi getAddressByUserId:", error);
    throw new Error(error?.message || "Lỗi không xác định");
  }
}
export const getAddressByIdService = async (
  addressId: number
): Promise<AddressResponse | null> => {
  try {
    const res = await fetch(`${API_BASE_URL}/addressesbyid/${addressId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Lỗi: ${res.status} - ${errorText}`);
    }

    const data = await res.json();
    console.log("API response:", data);
    
    if (Array.isArray(data)) {
      if (data.length > 0) {
        console.log("Địa chỉ lấy thành công:", data[0]);
        return data[0];
      } else {
        console.log("Không tìm thấy địa chỉ với ID:", addressId);
        return null;
      }
    }
    
    // Trường hợp trả về object
    console.log("Địa chỉ lấy thành công:", data);
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy địa chỉ theo ID:", error);
    return null;
  }
};
export async function updateAddress(
  addressId: number,
  payload: {
    full_name: string;
    phone: string;
    address_line: string;
    is_default?: boolean;
  }
): Promise<any> {
  try {
    const res = await fetch(`${API_BASE_URL}/addresses/${addressId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok) {
      console.error("[FE Service] ❌ Lỗi updateAddress:", result);
      throw new Error(result?.error || result?.message || "Cập nhật thất bại");
    }

    return result;
  } catch (error: any) {
    console.error("[FE Service] ❌ Exception updateAddress:", error);
    throw new Error(error?.message || "Lỗi không xác định");
  }
}

export async function addAddressService(data: {
  user_id?: number;
  full_name: string;
  phone: string;
  address_line: string;
  is_default?: boolean;
}) {
  console.log("🔍 Sending address payload:", data);

  const response = await fetch(`${API_BASE_URL}/add-address`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    console.error("❌ Response error:", result);
    throw new Error(result.error || "Lỗi khi thêm địa chỉ");
  }

  return result;
}
export async function deleteAddress(addressId: number): Promise<any> {
  try {
    const res = await fetch(`${API_BASE_URL}/addresses/${addressId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("[FE Service] Lỗi deleteAddress:", errorData);
      throw new Error(errorData?.message || "Xoá địa chỉ thất bại");
    }

    const data = await res.json();
    console.log("[FE Service] Xoá địa chỉ thành công:", data);
    return data;
  } catch (error: any) {
    console.error("[FE Service] Lỗi deleteAddress:", error);
    throw new Error(error?.message || "Lỗi không xác định khi xoá địa chỉ");
  }
}
