import { Suspense } from "react";
import CheckoutContent from "@/app/(client)/component/Checkout/CheckoutContent";
import CheckoutLoading from "@/app/(client)/component/Checkout/CheckoutLoading";
export default function Checkout() {
  return (
    <Suspense fallback={<CheckoutLoading />}>
      <CheckoutContent />
    </Suspense>
  );
}