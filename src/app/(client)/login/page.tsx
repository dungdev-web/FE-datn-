// app/(client)/login/page.tsx
"use client";
import { Suspense } from "react";
import Login from "@/app/(client)/component/Login";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Login />
    </Suspense>
  );
}
