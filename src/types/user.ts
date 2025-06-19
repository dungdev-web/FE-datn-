export interface IUser {
  userId: number;
  username?: string;
  email?: string;
  password_hash: string;
  fullName: string;
  avatar_url: string | null;
  phoneNumber: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  last_login_at: string;
  login_count: number;
  email_verified: boolean;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  reset_otp?: string;
  otp_created_at?: string;
}
