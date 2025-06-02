import "../../css/product.css";
import "../../css/account.css";
import Link from "next/link";
export default function Change_pass() {
  return (
    <>
      <main style={{ marginTop: "182px", marginBottom: "20px" }}>
        <div className="container1">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-lg-3 col-left-ac">
              <div className="block-account">
                <h5 className="title-account">Trang tài khoản</h5>
                <p>
                  Xin chào, <span>cccc</span>&nbsp;!
                </p>
                <ul>
                  <li>
                    <a
                      className="title-info"
                      href="/account/logout"
                      title="Đăng xuất"
                    >
                      Đăng xuất
                    </a>
                  </li>
                  <li>
                    <Link className="title-info  " href="/account">
                      Thông tin tài khoản
                    </Link>
                  </li>

                  <li>
                    <Link className="title-info " href="/account/order">
                      Đơn hàng của bạn
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="title-info active "
                      href="/account/change_pass"
                    >
                      Đổi mật khẩu
                    </Link>
                  </li>
                  <li>
                    <Link className="title-info" href="/account/address">
                      Sổ địa chỉ (1)
                    </Link>
                  </li>
                </ul>
              </div>
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
