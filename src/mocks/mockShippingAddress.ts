import { ShippingAddress } from "@/types/ShippingAddress";

let mockShippingAddresses: ShippingAddress[] = [
  {
    ship_address_id: 1,
    user_id: 4,
    full_name: "Nguyễn Văn A",
    phone: "0912345678",
    address_line: "123 Lê Lợi, Phường Bến Nghé, Quận 1, TP.HCM",
    is_default: true,
  },
  {
    ship_address_id: 2,
    user_id: 4,
    full_name: "Trần Thị B",
    phone: "0987654321",
    address_line: "456 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM",
    is_default: false,
  },
];

export function getMockShippingAddresses(): ShippingAddress[] {
  return mockShippingAddresses;
}

export function saveMockShippingAddresses(data: ShippingAddress[]) {
  mockShippingAddresses = data;
}
