"use client";
import "../../css/product.css";
import "../../css/account.css";
import Link from "next/link";
import AccountSidebar from "../../component/accountsidebar";
import { IUser } from "@/types/user";
import { useState, useEffect } from "react";
import { checkToken } from "@/services/authService";
export default function Change_pass() {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token không tồn tại");
          return;
        }
        const tokenData = await checkToken(token);

        if (!tokenData?.user?.id) throw new Error("Token không hợp lệ");

        setUser(tokenData.user);

        // Nếu bạn muốn load thêm info từ DB (KHÔNG CẦN nếu tokenData.user đã đủ):
        // const userInfo = await getInfoUser(tokenData.user.id);
        // console.log(tokenData.user.id);

        // setUser(userInfo);
      } catch (error) {
        console.error("Lỗi lấy thông tin người dùng:", error);
        // Ví dụ: có thể redirect về trang login nếu cần
        // router.push("/login");
      }
    };

    fetchUser();
  }, []);
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
        {/* Lớp phủ làm mờ nền */}
        <div className="absolute inset-0 bg-gray-500/50 backdrop-blur-none z-0"></div>

        <div className="breadcrumb-container">
          <div className="title-page">
            <h2>Đổi mật khẩu</h2>
          </div>
          <ul className="breadcrumb">
            <li className="home">
              <Link href={"/"} title="Trang chủ">
                <span>Trang chủ</span>
              </Link>
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </li>
            <li className="home">
              <Link href={"/account"} title="Tài khoản">
                <span>Tài khoản</span>
              </Link>
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </li>
            <li>
              <strong>
                <span>Đổi mật khẩu</span>
              </strong>
            </li>
            <li></li>
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
                    <form
                      method="post"
                      action="/account/changepassword"
                      id="change_customer_password"
                      acceptCharset="UTF-8"
                    >
                      <input
                        name="FormType"
                        type="hidden"
                        value="change_customer_password"
                      />
                      <input name="utf8" type="hidden" value="true" />

                      <p>
                        Để đảm bảo tính bảo mật vui lòng đặt mật khẩu với ít
                        nhất 8 kí tự
                      </p>
                      <div className="form-signup clearfix">
                        <fieldset className="form-group">
                          <label>
                            Mật khẩu cũ <span className="error">*</span>
                          </label>
                          <input
                            type="password"
                            name="OldPassword"
                            id="OldPass"
                            className="form-control form-control-lg"
                          />
                        </fieldset>
                        <fieldset className="form-group">
                          <label>
                            Mật khẩu mới <span className="error">*</span>
                          </label>
                          <input
                            type="password"
                            name="Password"
                            id="changePass"
                            className="form-control form-control-lg"
                          />
                        </fieldset>
                        <fieldset className="form-group">
                          <label>
                            Xác nhận lại mật khẩu{" "}
                            <span className="error">*</span>
                          </label>
                          <input
                            type="password"
                            name="ConfirmPassword"
                            id="confirmPass"
                            className="form-control form-control-lg"
                          />
                        </fieldset>
                        <button className="button btn-edit-addr btn btn-primary btn-more">
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
      </main>
    </>
  );
}
