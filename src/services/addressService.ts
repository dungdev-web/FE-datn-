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
    const res = await fetch(`${API_BASE_URL}/addresses/user/${userId}`, {
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
  payload: AddressPayload
): Promise<AddressResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/addresses/${addressId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      credentials: 'include',
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('[FE Service] Lỗi updateAddress:', errorData); // 👈 log chi tiết
      throw new Error(errorData?.message || 'Cập nhật thất bại');   // 👈 luôn throw Error object
    }

    return await res.json();
  } catch (error: any) {
    console.error('[FE Service] Lỗi updateAddress:', error);
    throw new Error(error?.message || 'Lỗi không xác định');
  }
}
