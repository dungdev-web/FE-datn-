import "../../../css/product.css";
import "../../../css/account.css";
import Link from "next/link";
export default function Order_Account() {
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
            <h2>Chi tiết đơn hàng</h2>
          </div>
          <ul className="breadcrumb">
            <li className="home">
              <Link href={'/'} title="Trang chủ">
                <span>Trang chủ</span>
              </Link>
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </li>
             <li className="home">
              <Link href={'/'} title="Tài khoản">
                <span>Tài khoản</span>
              </Link>
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </li>
              <li className="home">
              <Link href={'/'} title="Tài khoản">
                <span>Đơn hàng</span>
              </Link>
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </li>
            <li>
              <strong>
                <span>Chi tiết đơn hàng</span>
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
              <div className="block-account">
                <h5 className="title-account">Trang tài khoản</h5>
                <p>
                  Xin chào, <span>Lê Chí Bảo</span>&nbsp;!
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
            <div className="col-xs-12 col-sm-12 col-lg-9">
              <div className="head-title clearfix">
                <h1>Chi tiết đơn hàng #1019</h1>
                <span className="note order_date">Ngày tạo: 10/ 05/ 2025</span>
              </div>
              <div className="payment_status">
                <span className="note">Trạng thái thanh toán:</span>

                <i className="status_pending">
                  <em>
                    <span className="span_pending" style={{ color: "red" }}>
                      <strong>
                        <em>Chưa thanh toán</em>
                      </strong>
                    </span>
                  </em>
                </i>
              </div>
              <div className="shipping_status">
                <span className="note">Trạng thái vận chuyển:</span>

                <b style={{ color: "#212B25" }} className="span_">
                  Chưa chuyển
                </b>
              </div>
              <div className="code_order">
                <span className="note">Mã vận đơn:</span>
                <a
                  style={{
                    color: "#2196f3",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                  href=""
                ></a>
              </div>

              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-6 body_order">
                  <div className="box-address">
                    <h2 className="title-head">Địa chỉ giao hàng</h2>

                    <div className="address box-des">
                      <p>
                        {" "}
                        <strong>Lê Chí Bảo</strong>
                      </p>
                      <p>
                        Địa chỉ: 76 Đường 6 KP4 Bình Trưng Tây, TP. Thủ Đức, Hồ
                        Chí Minh, Quận 3, TP Hồ Chí Minh
                      </p>

                      <p>Số điện thoại: +84775895973</p>
                    </div>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-3 body_order">
                  <div className="box-address">
                    <h2 className="title-head">Thanh toán</h2>
                    <div className="box-des">
                      <p>Thu hộ (COD)</p>
                    </div>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-3 body_order">
                  <div className="box-address">
                    <h2 className="title-head">Ghi chú</h2>
                    <div className="box-des">
                      <p>Không có ghi chú</p>
                    </div>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12">
                  <div className="table-order">
                    <div className="table-responsive-block table_mobile">
                      <table id="order_details" className="table table-cart">
                        <thead className="thead-default theborder">
                          <tr>
                            <th>Sản phẩm</th>
                            <th>Đơn giá</th>
                            <th>Số lượng</th>
                            <th>Tổng</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="link" data-title="Tên">
                              <div className="image_order">
                                <a
                                  title="Nike Air Max 97 SE"
                                  href="/nike-air-max-97-se"
                                >
                                  <img
                                    src="//bizweb.dktcdn.net/thumb/small/100/505/077/products/layer112344afd2dbe4842b4562af5.jpg?v=1702350247140"
                                    alt=""
                                  />
                                </a>
                              </div>
                              <div className="content_right">
                                <a
                                  className="title_order"
                                  href="/nike-air-max-97-se"
                                  title="Nike Air Max 97 SE"
                                >
                                  Nike Air Max 97 SE
                                </a>

                                <p
                                  style={{ color: "#828282", fontSize: "12px" }}
                                >
                                  Xanh dương
                                </p>

                                <div className="bottom_mb">
                                  <div className="quantity_mb">x1</div>
                                  <div className="sum_mb">2.800.000₫</div>
                                </div>
                              </div>
                            </td>
                            <td data-title="Giá" className="numeric">
                              2.800.000₫
                            </td>
                            <td data-title="Số lượng" className="numeric">
                              1
                            </td>
                            <td data-title="Tổng" className="numeric">
                              2.800.000₫
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <table className="table totalorders">
                      <tfoot>
                        <tr className="order_summary discount">
                          <td>Khuyến mại </td>

                          <td className="total money right">0₫</td>
                        </tr>

                        <tr className="order_summary ">
                          <td>Phí vận chuyển</td>
                          <td className="total money right">
                            40.000₫ (Giao hàng tận nơi)
                          </td>
                        </tr>

                        <tr className="order_summary order_total">
                          <td>Tổng tiền</td>
                          <td className="right">
                            <strong
                              style={{ color: "#CA170E", fontSize: "19px" }}
                            >
                              2.840.000₫
                            </strong>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
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
