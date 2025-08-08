export interface IUser {
  id: number;
  name?: string;
  email?: string;
  password_hash: string;
  avatar: string | null;
  picture: string | null;
  phone: string | null;
  address: string | null;
  role: string | "customer" | "admin";
  created_at: Date;
  updated_at: Date;
  reset_otp?: string;
  otp_created_at?: string | Date | null;
}
export interface StoredUser {
  token: string | null;
}

export interface UserData {
  token: string;
  user: IUser;
}

export interface InterfaceUser {
  ship_address_id: string;
  user_id: number;
  name: string;
  email: string;
  password?: string;
  phone: string | null;
  role: 'admin' | 'user' | string;
  status: number;
  avatar: string | null;
  verify_otp: string | null;
  created_at: string;
  updated_at: string;
}
