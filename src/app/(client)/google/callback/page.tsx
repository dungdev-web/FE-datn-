// "use client";
import { Suspense } from "react";
import GoogleCallback from "../../component/GoogleCallback";

export default function Page() {
  return (
    <Suspense fallback={<p>Đang xử lý đăng nhập Google...</p>}>
      <GoogleCallback />
    </Suspense>
  );
}
