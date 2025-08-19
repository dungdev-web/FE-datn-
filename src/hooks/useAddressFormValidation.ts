import { useState } from "react";

type Errors = {
  [key: string]: string;
};

export const useAddressFormValidation = (initialData: any) => {
  const [errors, setErrors] = useState<Errors>({});

  const validateField = (name: string, value: any) => {
    let error = "";

    switch (name) {
      case "full_name":
        if (!value.trim()) error = "Vui lòng nhập họ tên";
        break;
      case "phone":
        if (!value.trim()) error = "Vui lòng nhập số điện thoại";
        else if (!/^\d{9,11}$/.test(value)) error = "Số điện thoại không hợp lệ";
        break;
      case "address_line_part":
        if (!value.trim()) error = "Vui lòng nhập địa chỉ cụ thể";
        break;
      case "province":
        if (!value) error = "Vui lòng chọn tỉnh/thành";
        break;
      case "district":
        if (!value) error = "Vui lòng chọn quận/huyện";
        break;
      case "ward":
        if (!value) error = "Vui lòng chọn phường/xã";
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const validateAll = (formData: any) => {
    const newErrors: Errors = {};
    Object.entries(formData).forEach(([name, value]) => {
      const err = validateField(name, value);
      if (err) newErrors[name] = err;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validateField, validateAll };
};
