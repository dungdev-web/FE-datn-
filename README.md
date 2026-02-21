<div align="center">

# 👟 ShoesShop — Giao diện người dùng

**Nền tảng thương mại điện tử giày hiện đại tích hợp ZaloPay & Chatbot AI**

![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white)
![ZaloPay](https://img.shields.io/badge/ZaloPay-0068FF?style=flat-square&logo=zalo&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI_GPT--3.5-412991?style=flat-square&logo=openai&logoColor=white)


</div>

---

## Tính năng

| Tính năng | Mô tả |
|---|---|
| **Danh mục sản phẩm** | Duyệt & lọc giày theo danh mục, size, giá |
| **Giỏ hàng** | Thêm vào giỏ, cập nhật số lượng, thanh toán |
| **Thanh toán ZaloPay** | Tích hợp cổng thanh toán ZaloPay |
| **Chatbot AI** | Trợ lý mua sắm dùng GPT-3.5 Turbo *(đang phát triển)* |
| **Xác thực** | Đăng nhập / Đăng ký cho khách hàng |
| **Trang quản trị** | Quản lý sản phẩm, đơn hàng & người dùng |
| **Quản lý đơn hàng** | Theo dõi & xử lý đơn hàng |

---

## 🛠️ Công nghệ sử dụng

### Giao diện
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white)

### Tích hợp
![ZaloPay](https://img.shields.io/badge/ZaloPay-0068FF?style=flat-square&logo=zalo&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI_GPT--3.5_Turbo-412991?style=flat-square&logo=openai&logoColor=white)

### Thư viện & Tiện ích
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)

---

## 📁 Cấu trúc thư mục

```
FE-DATN-/
├── 📂 src/
│   ├── 📂 app/
│   │   ├── 📂 (client)/     # Trang dành cho khách hàng
│   │   └── 📂 admin/        # Trang quản trị
│   ├── 📂 config/           # Cấu hình ứng dụng
│   ├── 📂 hooks/            # Custom React hooks
│   ├── 📂 mocks/            # Dữ liệu giả cho phát triển
│   ├── 📂 routers/          # Định nghĩa routes
│   ├── 📂 services/         # Lớp gọi API
│   ├── 📂 shared/           # Components & layout dùng chung
│   ├── 📂 store/            # Redux store & slices
│   ├── 📂 types/            # Định nghĩa TypeScript types
│   └── 📂 utils/            # Các hàm tiện ích
├── middleware.ts             # Next.js middleware (bảo vệ route)
├── next.config.ts
├── tsconfig.json
└── .env.example
```

---

## Hướng dẫn cài đặt

### Yêu cầu

- Node.js `>= 18`
- npm hoặc yarn
- Backend đang chạy (xem [BE-DATN-](https://github.com/dungdev-web/BE-datn-))

### Cài đặt

```bash
# Clone repository
git clone https://github.com/dungdev-web/FE-datn-.git
cd FE-datn-

# Cài đặt dependencies
npm install

# Cấu hình biến môi trường
cp .env.example .env
```

### Biến môi trường

```env
BASE_URL=http://localhost:3000
JWT_SECRET=
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_USE_MOCK=false
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=http://localhost:3001
NEXT_DOMAIN=http://localhost:3001
```

### Chạy môi trường phát triển

```bash
npm run dev
```

Mở [http://localhost:3001](http://localhost:3001) trên trình duyệt.

---

## Chatbot AI

Dự án tích hợp **OpenAI GPT-3.5 Turbo** làm trợ lý mua sắm thông minh.

> **Lưu ý:** Chatbot hiện đang dùng model GPT-3.5 Turbo cơ bản và **chưa được huấn luyện** trên dữ liệu sản phẩm giày. Câu trả lời có thể chưa chính xác với sản phẩm. Việc fine-tune sẽ được thực hiện trong phiên bản tiếp theo.

**Kế hoạch cải thiện:**
- Fine-tune model trên dữ liệu danh mục sản phẩm
- Huấn luyện xử lý FAQ & hỗ trợ đơn hàng
- Thêm gợi ý sản phẩm theo ngữ cảnh

---

## Tích hợp ZaloPay

Luồng thanh toán sử dụng môi trường sandbox của ZaloPay:

```
Khách thanh toán → Tạo đơn hàng → Gửi yêu cầu ZaloPay → Callback → Xác nhận đơn hàng
```

> Cần cấu hình thông tin sandbox ZaloPay trong file `.env` trước khi kiểm thử.

---

