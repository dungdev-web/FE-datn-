// mocks/mockUsers.ts

import { IUser } from "@/types/user";
const defaultUsers: IUser[] = [
  {
    id: 1,
    name: "Lê Chí Bảo",
    email: "baolcps41487@gmail.com",
    password_hash: "123456",
    avatar: null,
    picture: null,
    phone: "0338538203",
    address: "1371 Phan Văn Trị, Gò Vấp, TP.HCM",
    role: "customer",
    created_at: new Date("2025-04-26T14:13:55.892Z"),
    updated_at: new Date("2025-05-08T08:46:11.330Z"),
  },
  {
    id: 2,
    name: "Thanh Nhã",
    email: "bao@gmail.com",
    password_hash: "123456",
    avatar: null,
    picture: null,
    phone: "0987654321",
    address: "",
    role: "admin",
    created_at: new Date("2025-05-10T10:28:29.341Z"),
    updated_at: new Date("2025-05-10T10:28:29.341Z"),
  },
];

function normalizeUser(u: any): IUser {
  return {
    id: u.userId ?? u.id, 
    name: u.name,
    email: u.email,
    password_hash: u.password_hash,
    avatar: u.avatar,
    picture: u.picture,
    phone: u.phone,
    address: u.address,
    role: u.role,
    created_at: new Date(u.created_at),
    updated_at: new Date(u.updated_at),
    reset_otp: u.reset_otp ?? undefined,
    otp_created_at: u.otp_created_at ?? null,
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
