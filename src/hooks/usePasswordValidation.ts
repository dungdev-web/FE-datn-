import { useState } from "react";

export interface PasswordForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface PasswordFormErrors {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export const useChangePasswordForm = () => {
  const [form, setForm] = useState<PasswordForm>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<PasswordFormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name as keyof PasswordForm, value),
    }));
  };

  const validateField = (name: keyof PasswordForm, value: string) => {
    switch (name) {
      case "oldPassword":
        return !value ? "Vui lòng nhập mật khẩu cũ." : undefined;
      case "newPassword":
        if (!value) return "Vui lòng nhập mật khẩu mới.";
        if (value.length < 8) return "Mật khẩu mới phải ít nhất 8 ký tự.";
        return undefined;
      case "confirmPassword":
        if (!value) return "Vui lòng xác nhận mật khẩu.";
        if (value !== form.newPassword) return "Xác nhận không khớp.";
        return undefined;
      default:
        return undefined;
    }
  };

  const validateAll = (): boolean => {
    const newErrors: PasswordFormErrors = {
      oldPassword: validateField("oldPassword", form.oldPassword),
      newPassword: validateField("newPassword", form.newPassword),
      confirmPassword: validateField("confirmPassword", form.confirmPassword),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const resetForm = () => {
    setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    setErrors({});
  };

  return {
    form,
    errors,
    handleChange,
    validateAll,
    resetForm,
  };
};
