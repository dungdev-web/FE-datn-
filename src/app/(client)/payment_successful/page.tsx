import { Suspense } from "react";
import CheckoutSuccess from "../component/PaymentSuccess ";
export default function Page() {
  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <CheckoutSuccess />
    </Suspense>
  );
}
