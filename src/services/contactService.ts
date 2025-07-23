import { API_BASE_URL } from "@/config/env";

// services/contactService.ts
export async function sendContactToAdmin(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  const res = await fetch(`${API_BASE_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Gửi cho admin thất bại");
  return await res.json();
}

export async function sendConfirmationToUser(data: {
  name: string;
  email: string;
}) {
  const res = await fetch(`${API_BASE_URL}/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: data.email,
      subject: "Xác nhận liên hệ từ Terashose",
      html: `
        <p>Xin chào ${data.name},</p>
        <p>Chúng tôi đã nhận được tin nhắn của bạn và sẽ liên hệ lại sớm nhất.</p>
        <p>Cảm ơn bạn đã liên hệ với <strong>Terashose</strong>.</p>
      `,
    }),
  });

  if (!res.ok) throw new Error("Gửi xác nhận cho người dùng thất bại");
  return await res.json();
}

