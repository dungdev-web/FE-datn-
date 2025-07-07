export interface ShippingAddress {
  ship_address_id?: number; // Có thể optional nếu tạo mới
  user_id: number;
  full_name: string;
  phone: string;
  address_line: string;
  is_default: boolean; // true nếu là địa chỉ mặc định
}
