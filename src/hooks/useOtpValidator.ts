import { useState } from "react";

export function useOtpValidator(length: number = 6) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const [valid, setValid] = useState<boolean[]>(Array(length).fill(true));
  const [error, setError] = useState<string | null>(null);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    const newValid = [...valid];
    newValid[index] = value !== "";
    setValid(newValid);
  };

  const validate = (otpToValidate: string[] = otp, showError = true) => {
    const newValid = otpToValidate.map((digit) => digit !== "");
    const isValid = newValid.every((v) => v);
    setValid(newValid);

    if (!isValid && showError) {
      setError("Mã OTP gồm 6 chữ số.");
    } else {
      setError(null);
    }

    return isValid;
  };

  return {
    otp,
    setOtp,
    valid,
    error,
    handleChange,
    validate,
  };
}
