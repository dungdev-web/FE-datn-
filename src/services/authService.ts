import { IS_MOCK, API_BASE_URL } from "@/config/env";
import { getMockUsers, saveMockUsers } from "@/mocks/mockUser";
import { IUser } from "@/types/user";
import { LoginCredentials } from "@/types/auth";
import { RegisterCredentials } from "@/types/auth";

// --------- LOGIN ---------
export async function loginUser(
  credentialss: LoginCredentials
): Promise<{ token: string; user: IUser }> {
  if (IS_MOCK) {
    const users = getMockUsers();

    const user = users.find(
      (u) =>
        u.email === credentialss.usernameOrEmail ||
        u.name === credentialss.usernameOrEmail
    );

    if (!user) {
      throw new Error("Tài khoản không tồn tại trong hệ thống");
    }
    console.log("usernameOrEmail nhận được:", credentialss.usernameOrEmail);

    if (user.password_hash !== credentialss.password) {
      throw new Error("Mật khẩu không đúng");
    }

    return { token: "mock-token-123", user };
  }
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentialss),
    credentials: 'include' 
  });
  const data = await res.json();

  if (!res.ok) {
    const errorMessage = data.error || data.message || "Đăng nhập thất bại";
    throw new Error(errorMessage);
  }

  return data;
}
export async function checkToken(): Promise<{ user: IUser } | null> {
  const res = await fetch(`${API_BASE_URL}/check-token`, {
    method: 'GET',
    credentials: 'include'
  });

  if (!res.ok) {
    console.error("Token không hợp lệ hoặc lỗi");
    return null;
  }

  const data = await res.json();
  return data;
}


// --------- REGISTER ---------
export async function registerUser(
  formData: RegisterCredentials
): Promise<{ message: string; user: IUser }> {
  if (IS_MOCK) {
    const users = getMockUsers();
    const existingUser = users.find(
      (u) => u.email === formData.email || u.name === formData.name
    );
    if (existingUser) throw new Error("Email hoặc tên người dùng đã tồn tại");

    const newUser: IUser = {
      id: users.length + 1,
      name: formData.name,
      email: formData.email,
      password_hash: formData.password,
      phone: formData.phone,
      avatar: null,
      address: "",
      role: "user",
      created_at: new Date(),
      updated_at: new Date(),
    };

    saveMockUsers([...users, newUser]);
    return { message: "Đăng ký thành công", user: newUser };
  }

  const res = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Đăng ký thất bại");

  return data;
}

// --------- GET USER INFO ---------
export async function getInfoUser(id: number | string): Promise<IUser> {
  if (IS_MOCK) {
    const users = getMockUsers();
    const user = users.find((u) => u.id === Number(id));
    if (!user) throw new Error("Không tìm thấy người dùng");
    return user;
  }

  const res = await fetch(`${API_BASE_URL}/user/${id}`);
  if (!res.ok) throw new Error("Lỗi khi lấy thông tin người dùng");
  const data = await res.json();
  return data.user;
}

// --------- UPDATE USER INFO ---------
export async function updateInfoUser(
  id: number,
  updateData: any
): Promise<IUser> {
  if (IS_MOCK) {
    const users = getMockUsers();
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) throw new Error("Không tìm thấy người dùng");

    const updatedUser = {
      ...users[index],
      ...updateData,
      updated_at: new Date().toISOString(),
    };

    users[index] = updatedUser;
    saveMockUsers(users);
    return updatedUser;
  }

  const formData = new FormData();
  formData.append("fullName", updateData.fullName);
  formData.append("phone_number", updateData.phone_number);
  formData.append("address", updateData.address);

  if (updateData.avatar) {
    formData.append("avatar_file", updateData.avatar);
  } else {
    formData.append("avatar_url", updateData.avatar_url);
  }

  const res = await fetch(`${API_BASE_URL}/user/update-user-infor/${id}`, {
    method: "PATCH",
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Cập nhật thất bại");
  }

  const data = await res.json();
  return data.user;
}

// --------- SEND RESET PASSWORD ---------
export async function sendResetPassword(
  email: string
): Promise<{ message: string; otp?: string }> {
  if (IS_MOCK) {
    const users = getMockUsers();
    const user = users.find((u) => u.email === email);
    if (!user) throw new Error("Không tìm thấy người dùng với email này");

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.reset_otp = otp;
    user.otp_created_at = new Date().toISOString();
    alert("Mã OTP: " + otp);
    saveMockUsers(users);
    return { message: "Đã gửi mã OTP đến email", otp };
  }

  const res = await fetch(`${API_BASE_URL}/user/send-reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();

  if (!res.ok) throw new Error(data.error || "Gửi OTP thất bại");
  return data;
}

// --------- RESET PASSWORD ---------
export async function resetPassword(
  email: string,
  otp: string,
  newPassword: string
): Promise<{ message: string }> {
  if (IS_MOCK) {
    const users = getMockUsers();
    const index = users.findIndex((u) => u.email === email);
    if (index === -1) throw new Error("Không tìm thấy người dùng");

    const user = users[index];
    if (!user.reset_otp || user.reset_otp !== otp) {
      throw new Error("Mã OTP không chính xác hoặc đã hết hạn");
    }

    user.password_hash = newPassword;
    user.updated_at = new Date().toISOString();
    delete user.reset_otp;
    delete user.otp_created_at;

    users[index] = user;
    saveMockUsers(users);

    return { message: "Đổi mật khẩu thành công" };
  }

  const res = await fetch(`${API_BASE_URL}/user/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp, newPassword }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Đổi mật khẩu thất bại");

  return data;
}
