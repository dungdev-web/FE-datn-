// mocks/mockUsers.ts

import { IUser } from "@/types/user";
const defaultUsers: IUser[] = [
  {
    id: 1,
    username: "bao",
    email: "baolcps41487@gmail.com",
    password_hash: "123456",
    fullName: "Lê Chí Bảo",
    avatar_url: null,
    phoneNumber: "0338538203",
    address:
      "1371 Phan Văn Trị, Số Nhà 51, Đường 38, tổ 4 thôn 4, Sùng Nhơn, Đức Linh, Bình Thuận.",
    city: null,
    country: null,
    last_login_at: "2025-04-26T14:14:05.130Z",
    login_count: 1,
    email_verified: false,
    email_verified_at: null,
    created_at: "2025-04-26T14:13:55.892Z",
    updated_at: "2025-05-08T08:46:11.330Z",
    reset_otp: undefined,
    otp_created_at: undefined,
  },
  {
    id: 2,
    username: "thanhnha",
    email: "bao@gmail.com",
    password_hash: "123456",
    fullName: "Thanh Nhã",
    avatar_url: null,
    phoneNumber: "0987654321",
    address: "",
    city: null,
    country: null,
    last_login_at: "2025-04-26T14:14:05.130Z",
    login_count: 0,
    email_verified: false,
    email_verified_at: null,
    created_at: "2025-05-10T10:28:29.341Z",
    updated_at: "2025-05-10T10:28:29.341Z",
    reset_otp: undefined,
    otp_created_at: undefined,
  },
  {
    id: 6,
    username: "baole",
    email: "baolc@gmail.com",
    password_hash: "",
    fullName: "Bao Le",
    avatar_url: null,
    phoneNumber: null,
    address: null,
    city: null,
    country: null,
    last_login_at: new Date().toISOString(),
    login_count: 0,
    email_verified: false,
    email_verified_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    reset_otp: undefined,
    otp_created_at: undefined,
  },
];

function normalizeUser(u: any): IUser {
  const userId = u.userId ?? u.id;
  return {
    ...u,
    userId,
    reset_otp: u.reset_otp,
    otp_created_at: u.otp_created_at,
  };
}

export const getMockUsers = (): IUser[] => {
  let users: any[];
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("mockUsers");
    users = stored ? JSON.parse(stored) : defaultUsers;
  } else {
    users = defaultUsers;
  }
  return users.map(normalizeUser);
};

export const saveMockUsers = (users: IUser[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("mockUsers", JSON.stringify(users));
  }
};

export const findUserByEmailAndPassword = (email: string, password: string) => {
  return getMockUsers().find(
    (user) => user.email === email && user.password_hash === password
  );
};
