"use client";
import "../../css/product.css";
import "../../css/account.css";
import Link from "next/link";
import AccountSidebar from "../../component/Account/AccountSidebar";
import { IUser } from "@/types/user";
import { useState, useEffect } from "react";
import { checkToken } from "@/services/authService";
export default function Order_Account() {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // const token = localStorage.getItem("token");
        // if (!token) {
        //   console.error("Token không tồn tại");
        //   return;
        // }
        const tokenData = await checkToken();

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
            <h2>Đơn hàng của bạn</h2>
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
                <span>Đơn hàng của bạn</span>
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
              <h1 className="title-head margin-top-0">Đơn hàng của bạn</h1>
              <div className="col-xs-12 col-sm-12 col-lg-12 no-padding">
                <div className="my-account">
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
                            76 Đường 6 KP4 Bình Trưng Tây, TP. Thủ Đức, Hồ Chí
                            Minh, Quận 3, TP Hồ Chí Minh, Vietnam
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
          </div>
        </div>
      </main>
    </>
  );
}
