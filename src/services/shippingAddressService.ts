
import { IS_MOCK, API_BASE_URL } from "@/config/env";
import {
  getMockShippingAddresses,
  saveMockShippingAddresses,
} from "@/mocks/mockShippingAddress";
import { ShippingAddress } from "@/types/ShippingAddress";

// Lấy danh sách địa chỉ của user
export async function getShippingAddressesByUser(userId: number): Promise<ShippingAddress[]> {
  if (IS_MOCK) {
    const addresses = getMockShippingAddresses();
    return addresses.filter(addr => addr.user_id === userId);
  }

  const res = await fetch(`${API_BASE_URL}/shipping/user/${userId}`);
  const json = await res.json();
  return json.addresses || [];
}

// Thêm địa chỉ mới
export async function addShippingAddress(address: Omit<ShippingAddress, "ship_address_id">): Promise<ShippingAddress> {
  if (IS_MOCK) {
    const addresses = getMockShippingAddresses();
    const newAddress: ShippingAddress = {
      ...address,
      ship_address_id: Date.now(),
    };

    // Nếu is_default = true, gỡ mặc định ở các địa chỉ cũ
    if (newAddress.is_default) {
      addresses.forEach(addr => {
        if (addr.user_id === address.user_id) addr.is_default = false;
      });
    }

    addresses.push(newAddress);
    saveMockShippingAddresses(addresses);
    return newAddress;
  }

  const res = await fetch(`${API_BASE_URL}/shipping/create`, {
    method: "POST",
    body: JSON.stringify(address),
    headers: { "Content-Type": "application/json" },
  });

  const json = await res.json();
  return json.address;
}

// Cập nhật địa chỉ
export async function updateShippingAddress(updated: ShippingAddress): Promise<ShippingAddress> {
  if (IS_MOCK) {
    let addresses = getMockShippingAddresses();

    // Nếu is_default = true, hủy mặc định ở các địa chỉ khác
    if (updated.is_default) {
      addresses = addresses.map(addr =>
        addr.user_id === updated.user_id
          ? { ...addr, is_default: false }
          : addr
      );
    }

    const index = addresses.findIndex(addr => addr.ship_address_id === updated.ship_address_id);
    if (index !== -1) {
      addresses[index] = updated;
      saveMockShippingAddresses(addresses);
    }

    return updated;
  }

  const res = await fetch(`${API_BASE_URL}/shipping/update`, {
    method: "PUT",
    body: JSON.stringify(updated),
    headers: { "Content-Type": "application/json" },
  });

  const json = await res.json();
  return json.address;
}

// Xóa địa chỉ
export async function deleteShippingAddress(id: number): Promise<void> {
  if (IS_MOCK) {
    const addresses = getMockShippingAddresses();
    const filtered = addresses.filter(addr => addr.ship_address_id !== id);
    saveMockShippingAddresses(filtered);
    return;
  }

  await fetch(`${API_BASE_URL}/shipping/delete/${id}`, {
    method: "DELETE",
  });
}
