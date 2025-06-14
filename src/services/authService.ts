import { IS_MOCK, API_BASE_URL } from "@/config/env";
import { getMockUsers, saveMockUsers } from "@/mock/mockUser";
import { IUser } from "@/types/user";
import { LoginCredentials } from "@/types/LoginCredentials";
import { RegisterCredentials } from "@/types/RegisterCredentials";


// --------- LOGIN ---------
export async function loginUser(credentials: LoginCredentials): Promise<{ token: string; user: IUser }> {
  if (IS_MOCK) {
    const users = getMockUsers();
    
    const user = users.find((u) => u.email === credentials.email);
    if (!user) {
      throw new Error("Email không tồn tại trong hệ thống");
    }

    if (user.password_hash !== credentials.password) {
      throw new Error("Mật khẩu không đúng");
    }

    return { token: "mock-token-123", user };
  }
  const res = await fetch(`${API_BASE_URL}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  const data = await res.json();

  if (!res.ok) {
    const errorMessage = data.error || data.message || "Đăng nhập thất bại";
    throw new Error(errorMessage);
  }

  return data;
}
// --------- REGISTER ---------
export async function registerUser(formData: RegisterCredentials): Promise<{ message: string; user: IUser }> {
  if (IS_MOCK) {
    const users = getMockUsers();
    const existingUser = users.find(
      (u) => u.email === formData.email || u.username === formData.username
    );
    if (existingUser) throw new Error("Email hoặc tên người dùng đã tồn tại");

    const newUser: IUser = {
      userId: users.length + 1,
      username: formData.username,
      email: formData.email,
      password_hash: formData.password,
      phoneNumber: formData.phoneNumber,
      fullName: formData.fullName,  
      avatar_url: null,
      address: "",
      city: null,
      country: null,
      last_login_at: null,
      login_count: 0,
      email_verified: false,
      email_verified_at: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    saveMockUsers([...users, newUser]);
    return { message: "Đăng ký thành công", user: newUser };
  }

  const res = await fetch(`${API_BASE_URL}/user/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Đăng ký thất bại");

  return data;
}

// --------- GET USER INFO ---------
export async function getInfoUser(userId: number | string): Promise<IUser> {
  if (IS_MOCK) {
    const users = getMockUsers();
    const user = users.find((u) => u.userId === Number(userId));
    if (!user) throw new Error("Không tìm thấy người dùng");
    return user;
  }

  const res = await fetch(`${API_BASE_URL}/user/${userId}`);
  if (!res.ok) throw new Error("Lỗi khi lấy thông tin người dùng");
  const data = await res.json();
  return data.user;
}

// --------- UPDATE USER INFO ---------
export async function updateInfoUser(userId: number, updateData: any): Promise<IUser> {
  if (IS_MOCK) {
    const users = getMockUsers();
    const index = users.findIndex((u) => u.userId === userId);
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

  const res = await fetch(`${API_BASE_URL}/user/update-user-infor/${userId}`, {
    method: "PATCH",
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error|| "Cập nhật thất bại");
  }

  const data = await res.json();
  return data.user;
}


// --------- SEND RESET PASSWORD ---------
export async function sendResetPassword(email: string): Promise<{ message: string; otp?: string }> {
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
export async function resetPassword(email: string, otp: string, newPassword: string): Promise<{ message: string }> {
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
