import "../../css/product.css";
import "../../css/account.css";
import Link from "next/link";
export default function Order_Account() {
  return (
    <>
      <main style={{marginTop:"182px",marginBottom:"20px"}}>
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
                    <Link className="title-info " href="/account">
                      Thông tin tài khoản
                    </Link>
                  </li>

                  <li>
                    <Link className="title-info active" href="/account/order">
                      Đơn hàng của bạn
                    </Link>
                  </li>
                  <li>
                    <Link className="title-info" href="/account/change_pass">
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
              <h1 className="title-head margin-top-0">Đơn hàng của bạn</h1>
              <div
                className="table-responsive-block tab-all"
                style={{ overflowX: "auto" }}
              >
                <table
                  className="table table-cart table-order"
                  id="my-orders-table"
                >
                  <thead className="thead-default">
                    <tr>
                      <th>Đơn hàng</th>
                      <th>Ngày</th>
                      <th>Địa chỉ</th>
                      <th>Giá trị đơn hàng</th>
                      <th>TT thanh toán</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="first odd">
                      <td>
                        <a href="/account/orders/24179491" title="">
                          #1019
                        </a>
                      </td>
                      <td>10/05/2025</td>
                      <td>
                        76 Đường 6 KP4 Bình Trưng Tây, TP. Thủ Đức, Hồ Chí Minh,
                        Quận 3, TP Hồ Chí Minh, Vietnam
                      </td>
                      <td>
                        <span className="price">2.840.000₫</span>
                      </td>
                      <td>
                        <span className="span_pending">Chưa thu tiền</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
