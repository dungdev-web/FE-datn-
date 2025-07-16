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
  id: number;
  full_name: string;
  phone: string;
  address_line: string;
  ward: string;
  district: string;
  city: string;
  country?: string;
  is_default: boolean;
}
