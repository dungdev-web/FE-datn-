import { Suspense } from "react";
import ConfirmEmailOtpWrapper from "@/app/(client)/component/Register/ConfirmEmailOtpWrapper";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmEmailOtpWrapper />
    </Suspense>
  );
}
