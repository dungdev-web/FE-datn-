import { API_BASE_URL } from "@/config/env";
import { AddressResponse } from "@/types/address";

export interface AddressPayload {
  street?: string;
  city?: string;
  district?: string;
  ward?: string;
  [key: string]: any;
}


export async function getAddressByUserId(userId: number): Promise<AddressResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/addresses/${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('[FE Service] Lỗi getAddressByUserId:', errorData);
      throw new Error(errorData?.message || 'Lấy địa chỉ thất bại'); 
    }

    return await res.json();
  } catch (error: any) {
    console.error('[FE Service] Lỗi getAddressByUserId:', error);
    throw new Error(error?.message || 'Lỗi không xác định');
  }
}

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
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok) {
      console.error('[FE Service] ❌ Lỗi updateAddress:', result);
      throw new Error(result?.error || result?.message || 'Cập nhật thất bại');
    }

    return result;
  } catch (error: any) {
    console.error('[FE Service] ❌ Exception updateAddress:', error);
    throw new Error(error?.message || 'Lỗi không xác định');
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

