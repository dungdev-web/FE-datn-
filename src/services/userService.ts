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
