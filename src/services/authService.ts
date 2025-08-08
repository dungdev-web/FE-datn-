import { IS_MOCK, API_BASE_URL } from "@/config/env";
import { getMockUsers, saveMockUsers } from "@/mocks/mockUser";
import { IUser } from "@/types/user";
import { LoginCredentials } from "@/types/auth";
import { RegisterCredentials } from "@/types/auth";

// --------- LOGIN ---------
export async function loginUser(
  credentials: LoginCredentials
): Promise<{ token: string; user: IUser }> {
  if (IS_MOCK) {
    const users = getMockUsers();

    const user = users.find(
      (u) =>
        u.email === credentials.usernameOrEmail ||
        u.name === credentials.usernameOrEmail
    );

    if (!user) {
      throw new Error("Tài khoản không tồn tại trong hệ thống");
    }
    console.log("usernameOrEmail nhận được:", credentials.usernameOrEmail);

    if (user.password_hash !== credentials.password) {
      throw new Error("Mật khẩu không đúng");
    }

    return { token: "mock-token-123", user };
  }
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials), 
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    const errorMessage = data.error || data.message || "Đăng nhập thất bại";
    throw new Error(errorMessage);
  }

  // Lưu token nếu dùng JWT
  // localStorage.setItem("token", data.token);

  return data;
}
// --------- LOGIN GOOGLE -------
export async function loginWithGoogle(): Promise<{
  message: string;
  user: IUser;
}> {
  const users = getMockUsers();

  // Giả lập thông tin Google trả về
  const googleEmail = "user.google@gmail.com";
  const googleName = "Google User";

  let user = users.find((u) => u.email === googleEmail);

  if (!user) {
    // Nếu chưa có, tạo mới user
    user = {
      id: users.length + 1,
      name: googleName,
      email: googleEmail,
      password_hash: "", // không có password
      phone: "",
      avatar: null,
      picture: null,
      address: "",
      role: "user",
      created_at: new Date(),
      updated_at: new Date(),
    };

    saveMockUsers([...users, user]);
  }

  return { message: "Đăng nhập Google thành công", user };
}
// --------- CHECKTOKEN ---------
export async function checkToken(): Promise<{ user: IUser } | null> {
  const res = await fetch(`${API_BASE_URL}/check-token`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    console.error("Token không hợp lệ hoặc lỗi");
    return null;
  }

  const data = await res.json();
  return data;
}

export async function logoutUser(): Promise<{ message: string }> {
  if (IS_MOCK) {
    // Giả lập logout thành công
    return { message: "Đăng xuất mock thành công" };
  }

  const res = await fetch(`${API_BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    const data = await res.json();
    const errorMessage = data.error || data.message || "Đăng xuất thất bại";
    throw new Error(errorMessage);
  }
  localStorage.removeItem("token");
  const data = await res.json();
  return data;
}

// --------- REGISTER ---------
export async function registerUser(
  formData: RegisterCredentials
): Promise<{ message: string; user: IUser; otp: string }> {
  if (IS_MOCK) {
    const users = getMockUsers();
    const existingUser = users.find(
      (u) => u.email === formData.email || u.name === formData.name
    );
    if (existingUser) throw new Error("Email hoặc tên người dùng đã tồn tại");

    // Tạo OTP ngẫu nhiên 6 chữ số
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser: IUser = {
      id: users.length + 1,
      name: formData.name,
      email: formData.email,
      password_hash: formData.password,
      phone: formData.phone,
      avatar: null,
      picture: null,
      address: "",
      role: "user",
      created_at: new Date(),
      updated_at: new Date(),
    };

    saveMockUsers([...users, newUser]);

    // Trả về OTP để frontend hiển thị hoặc kiểm tra
    return { message: "OTP đã gửi. Vui lòng xác thực.", user: newUser, otp };
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
export async function confirmEmailService(email: string, token: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/confirm-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, token }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Xác nhận email thất bại.");
    }

    return data;
  } catch (error) {
    console.error("[Service] Lỗi xác nhận email:", error);
    throw error;
  }
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

  const res = await fetch(`${API_BASE_URL}/forget`, {
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
    user.updated_at = new Date();
    delete user.reset_otp;
    delete user.otp_created_at;

    users[index] = user;
    saveMockUsers(users);

    return { message: "Đổi mật khẩu thành công" };
  }

  const res = await fetch(`${API_BASE_URL}/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp, newPassword }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Đổi mật khẩu thất bại");

  return data;
}


// Admin 
export async function getAllUsers(page = 1, limit = 20) {
  try {
    const res = await fetch(`${API_BASE_URL}/all-user?page=${page}&limit=${limit}`);

    if (!res.ok) {
      throw new Error(`Lỗi server: ${res.status}`);
    }

    const data = await res.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error('Lỗi khi fetch danh sách người dùng:', error);
    throw error;
  }
}
export const updateUser = async (
  userId: number | string,
  updateData: { role: string; status: number }
) => {
  try {
    const res = await fetch(`${API_BASE_URL}/update-user/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!res.ok) {
      throw new Error(`Lỗi server: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('[Service] Lỗi updateUser:', error);
    throw error;
  }
};