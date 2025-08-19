// types/address.ts
export interface IAddressFormData {
  full_name: string;
  phone: string;
  address_line_part: string;
  country: string;
  province: string;
  district: string;
  ward: string;
  is_default: boolean;
}
export interface AddressResponse {
  shipping_address_id: any;
  ship_address_id: any;
  user: any;
  length: number;
  address: string;
  id: number;
  full_name: string;
  phone: string;
  address_line: string;
  ward: string;
  district: string;
  province: string;
  city: string;
  country?: string;
  is_default: boolean;
}

export interface Address {
  email(email: any): unknown;
  ship_address_id: number;
  user:any;
  user_id: number;
  full_name: string;
  phone: string;
  address_line: string;
  is_default: boolean;
}
