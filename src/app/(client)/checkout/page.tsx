import { Suspense } from "react";
import CheckoutContent from "../component/Checkout/CheckoutContent";
import CheckoutLoading from "../component/Checkout/CheckoutLoading";
export default function Checkout() {
  return (
    <Suspense fallback={<CheckoutLoading />}>
      <CheckoutContent />
    </Suspense>
  );
}