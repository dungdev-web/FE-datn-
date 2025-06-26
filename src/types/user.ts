export interface IUser {
  id: number;
  name?: string;
  email?: string;
  password_hash: string;
  avatar: string | null;
  phone: string | null;
  address: string | null;
  role: string | "customer" | "admin";
  created_at: Date;
  updated_at: Date;
}
