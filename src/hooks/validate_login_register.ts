export type ValidateFieldProps = {
  name: string;
  value: string;
  formType: "login" | "register" | "forgotPassword" | "otp";
};

export const validateField = ({
  name,
  value,
  formType,
}: ValidateFieldProps): string => {
  switch (name) {
    case "email":
      if (!value.trim())
        return formType === "register"
          ? "Email không được để trống"
          : "Vui lòng nhập email";

      const allowedEmailRegex =
        /^[a-zA-Z0-9._%+-]+@(gmail\.com|fpt\.edu\.vn|yahoo\.com|outlook\.com)$/;

      if (!allowedEmailRegex.test(value))
        return "Chỉ cho phép email có đuôi như: gmail.com, fpt.edu.vn, yahoo.com, outlook.com";

      if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value) && formType === "register")
        return "Chỉ chấp nhận email Gmail hợp lệ (kết thúc bằng @gmail.com)";

      return "";

    case "password":
      if (!value.trim())
        return formType === "register"
          ? "Mật khẩu không được để trống"
          : "Vui lòng nhập mật khẩu";
      if (value.length < 6) return "Mật khẩu phải có ít nhất 6 ký tự";
      return "";

    case "username":
      if (formType === "register") {
        if (!value.trim()) return "Tên tài khoản không được để trống";
        if (/\s/.test(value))
          return "Tên tài khoản không được chứa khoảng trắng";
        if (value.length < 6) return "Tên tài khoản phải có ít nhất 6 ký tự";
      }
      return "";

    case "fullName":
      if (formType === "register") {
        if (!value.trim()) return "Họ và tên không được để trống";
        if (value.length < 8) return "Họ và tên phải có ít nhất 8 ký tự";
      }
      return "";

    case "phoneNumber":
      if (formType === "register") {
        if (!value.trim()) return "Số điện thoại không được để trống";
        if (!/^0\d{9}$/.test(value))
          return "Số điện thoại phải bắt đầu bằng 0 và đủ 10 số";
      }
      return "";

    case "otp":
      if (formType === "otp") {
        if (!value.trim()) return "OTP không được để trống";
        if (!/^\d{6}$/.test(value)) return "OTP phải gồm 6 chữ số";
      }
      return "";

    default:
      return "";
  }
};
