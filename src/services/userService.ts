import { API_BASE_URL } from "@/config/env";


export async function changePasswordService(data: {
  userId: number;
  oldPassword: string;
  newPassword: string;
}) {
  const response = await fetch(`${API_BASE_URL}/change-pass`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Đổi mật khẩu thất bại');
  }

  return result;
}
export async function updateUserService(data: {
  userId: number;
  fullName?: string;
  email?: string;
  phone?: string;
}) {
  const formData = new FormData();

  formData.append("userId", data.userId.toString());
  if (data.fullName) formData.append("fullName", data.fullName);
  if (data.email) formData.append("email", data.email);
  if (data.phone) formData.append("phone", data.phone);

  const response = await fetch(`${API_BASE_URL}/update`, {
    method: "PUT",
    credentials: "include",
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Cập nhật thông tin người dùng thất bại");
  }

  return result;
}
export async function uploadAvatarService(userId: number, avatar: File) {
  const formData = new FormData();
  formData.append("userId", userId.toString());
  formData.append("avatar", avatar);

  const response = await fetch(`${API_BASE_URL}/update`, {
    method: "PUT",
    credentials: "include",
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Upload ảnh đại diện thất bại");
  }

  return result.user;
}
export async function getUserProfileService(userId: number) {
  const response = await fetch(`${API_BASE_URL}/profile/${userId}`, {
    method: "GET",
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Không thể lấy thông tin người dùng");
  }

  return result;
}
