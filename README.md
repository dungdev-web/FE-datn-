<div align="center">

# 👟 ShoesShop — Frontend

**A modern e-commerce platform for shoes with ZaloPay integration & AI Chatbot**

![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white)
![ZaloPay](https://img.shields.io/badge/ZaloPay-0068FF?style=flat-square&logo=zalo&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI_GPT--3.5-412991?style=flat-square&logo=openai&logoColor=white)
</div>

---

## Features

| Feature | Description |
|---|---|
| **Product Catalog** | Browse & filter shoes by category, size, price |
| **Shopping Cart** | Add to cart, update quantity, checkout |
| **ZaloPay Payment** | Integrated ZaloPay payment gateway |
| **AI Chatbot** | GPT-3.5 Turbo powered assistant *(in development)* |
| **Authentication** | Login / Register for customers |
| **Admin Dashboard** | Manage products, orders & users |
| **Order Management** | Track & manage orders |

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white)

### Integrations
![ZaloPay](https://img.shields.io/badge/ZaloPay-0068FF?style=flat-square&logo=zalo&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI_GPT--3.5_Turbo-412991?style=flat-square&logo=openai&logoColor=white)

### State & Utilities
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)

---

## 📁 Project Structure

```
FE-DATN-/
├── 📂 src/
│   ├── 📂 app/
│   │   ├── 📂 (client)/     # Customer-facing pages
│   │   └── 📂 admin/        # Admin dashboard pages
│   ├── 📂 config/           # App configuration
│   ├── 📂 hooks/            # Custom React hooks
│   ├── 📂 mocks/            # Mock data for development
│   ├── 📂 routers/          # Route definitions
│   ├── 📂 services/         # API service layer
│   ├── 📂 shared/           # Shared components & layouts
│   ├── 📂 store/            # Redux store & slices
│   ├── 📂 types/            # TypeScript type definitions
│   └── 📂 utils/            # Helper functions
├── middleware.ts             # Next.js middleware (auth guard)
├── next.config.ts
├── tsconfig.json
└── .env.example
```

---

## Getting Started

### Prerequisites

- Node.js `>= 18`
- npm or yarn
- Backend server running (see [BE-DATN-](https://github.com/dungdev-web/BE-datn-))

### Installation

```bash
# Clone the repository
git clone https://github.com/dungdev-web/FE-datn-.git
cd FE-datn-

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
```

### Environment Variables

```env
BASE_URL=http://localhost:3000
JWT_SECRET=
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_USE_MOCK=false
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=http://localhost:3001
NEXT_DOMAIN=http://localhost:3001
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

---

## AI Chatbot

This project integrates **OpenAI GPT-3.5 Turbo** as a shopping assistant chatbot.

> **Note:** The chatbot is currently using the base GPT-3.5 Turbo model and has **not yet been fine-tuned** on shoe product data. Responses may not always be product-specific. Training/fine-tuning is planned for a future update.

**Planned improvements:**
- Fine-tune model on product catalog data
- Train on FAQ & order support scenarios
- Add context-aware product recommendations

---

## ZaloPay Integration

Payment flow using ZaloPay sandbox environment:

```
User Checkout → Create Order → ZaloPay Payment Request → Callback → Order Confirmed
```

> Make sure to configure ZaloPay sandbox credentials in `.env` before testing.

---

