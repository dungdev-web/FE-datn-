import { API_BASE_URL } from "@/config/env";

// services/contactService.ts
export async function sendContactToAdmin(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  const res = await fetch(`${API_BASE_URL}/user/contact`, {
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
  const res = await fetch(`${API_BASE_URL}/user/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: data.email,
      subject: "Xác nhận liên hệ từ Terashose",
      html: `
      <div style="max-width:600px;margin:0 auto;padding:20px;border:1px solid #e0e0e0;border-radius:8px;font-family:sans-serif;background-color:#ffffff;">
        <div style="text-align:center;padding-bottom:20px;">
          <img src="https://terashoes.store/logo.png" alt="Terashoes Logo" style="max-width:150px;height:auto;" />
        </div>
        <h2 style="color:#005b96;text-align:center;">Cảm ơn bạn đã liên hệ!</h2>
        <p style="font-size:16px;color:#333;">Xin chào <strong>${data.name}</strong>,</p>
        <p style="font-size:16px;color:#333;">
          Chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi sớm nhất có thể.
        </p>
        <p style="font-size:16px;color:#333;">
          Cảm ơn bạn đã quan tâm và liên hệ với <strong>Terashoes</strong> – nơi bạn tìm thấy những đôi giày chất lượng và phong cách.
        </p>
        <hr style="margin:30px 0;border:none;border-top:1px solid #eee;" />
        <p style="font-size:14px;color:#999;text-align:center;">
          Mọi thắc mắc vui lòng liên hệ: 
          <a href="mailto:terashoesshop@gmail.com" style="color:#005b96;">terashoesshop@gmail.com</a>
        </p>
        <p style="font-size:14px;color:#999;text-align:center;">© 2025 Terashoes. All rights reserved.</p>
      </div>
    `,
  }),
});

  if (!res.ok) throw new Error("Gửi xác nhận cho người dùng thất bại");
  return await res.json();
}

