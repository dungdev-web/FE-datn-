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
}
export interface StoredUser {
  token: string | null;
}

export interface UserData {
  token: string;
  user: IUser;
}

