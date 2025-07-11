// pages/auth/google/callback.tsx
"use client";
import { API_BASE_URL } from "@/config/env";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GoogleCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");

    if (code) {
      fetch(`${API_BASE_URL}/google/callback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          // localStorage.setItem("token", data.token);
          router.push("/account");
        })
        .catch((err) => console.error("Login error", err));
    }
  }, [searchParams, router]);

  return <p>Đang xử lý đăng nhập Google...</p>;
}
