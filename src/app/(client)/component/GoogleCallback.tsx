"use client";
import { API_BASE_URL } from "@/config/env";
import { useGlobalStore } from "@/store/useGlobalStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GoogleCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const setUser = useGlobalStore((state) => state.setUser);
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
          if (data.user) {
            setUser(data.user);
          }
          if (redirect) {
            // ưu tiên redirect param
            window.location.href = redirect;
          } else {
            // fallback sang trang compare_product
            router.push("/compare_product");
          }
        })
        .catch((err) => console.error("Login error", err));
    }
  }, [searchParams, router]);

  return <p>Đang xử lý đăng nhập Google...</p>;
}
