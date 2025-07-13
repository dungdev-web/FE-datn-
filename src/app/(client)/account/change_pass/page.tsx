"use client";
import "../../css/product.css";
import "../../css/account.css";
import Link from "next/link";
import AccountSidebar from "../../component/accountsidebar";
import { IUser } from "@/types/user";
import { useState, useEffect } from "react";
import { checkToken } from "@/services/authService";
import { changePasswordService } from "@/services/userService";
import { toast, ToastContainer } from "react-toastify";

export default function Change_pass() {
  const [user, setUser] = useState<IUser | null>(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const tokenData = await checkToken();
        if (!tokenData?.user?.id) throw new Error("Token không hợp lệ");
        setUser(tokenData.user);
      } catch (error) {
        console.error("Lỗi lấy thông tin người dùng:", error);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu mới và xác nhận không khớp.");
      return;
    }

    try {
      await changePasswordService({
        userId: user?.id || "",
        oldPassword,
        newPassword,
      });

      toast.success("Đổi mật khẩu thành công!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast.error(err.message || "Lỗi đổi mật khẩu.");
    }
  };

  return (
    <>
      <section
        className="bread-crumb background-cover relative"
        style={{
          backgroundImage: "url(/images/banner/banner_dieuhuong1.png)",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-gray-500/50 backdrop-blur-none z-0"></div>
        <div className="breadcrumb-container">
          <div className="title-page">
            <h2>Đổi mật khẩu</h2>
          </div>
          <ul className="breadcrumb">
            <li className="home">
              <Link href={"/"}><span>Trang chủ</span></Link>
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </li>
            <li className="home">
              <Link href={"/account"}><span>Tài khoản</span></Link>
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </li>
            <li><strong><span>Đổi mật khẩu</span></strong></li>
          </ul>
        </div>
      </section>

      <main>
        <div className="container1">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-lg-3 col-left-ac">
              <AccountSidebar user={user} />
            </div>
            <div className="col-xs-12 col-sm-12 col-lg-9 col-right-ac">
              <h1 className="title-head margin-top-0">Đổi mật khẩu</h1>
              <div className="row">
                <div className="col-md-6 col-12">
                  <div className="page-login">
                    <form id="change_customer_password" onSubmit={handleSubmit}>
                      <p>
                        Để đảm bảo tính bảo mật vui lòng đặt mật khẩu với ít
                        nhất 8 kí tự
                      </p>
                      <div className="form-signup clearfix">
                        <fieldset className="form-group">
                          <label>Mật khẩu cũ <span className="error">*</span></label>
                          <input
                            type="password"
                            className="form-control form-control-lg"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                          />
                        </fieldset>

                        <fieldset className="form-group">
                          <label>Mật khẩu mới <span className="error">*</span></label>
                          <input
                            type="password"
                            className="form-control form-control-lg"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </fieldset>

                        <fieldset className="form-group">
                          <label>Xác nhận lại mật khẩu <span className="error">*</span></label>
                          <input
                            type="password"
                            className="form-control form-control-lg"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </fieldset>

                        <button type="submit" className="button btn-edit-addr btn btn-primary btn-more">
                          <i className="hoverButton"></i>Đặt lại mật khẩu
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </main>
    </>
  );
}
