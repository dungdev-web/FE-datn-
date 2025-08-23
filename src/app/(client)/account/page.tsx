"use client";
import "../css/product.css";
import "../css/account.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getInfoUser, checkToken } from "@/services/authService";
import { IUser } from "@/types/user";
import LogoutLink from "@/app/(client)/component/LogOut";
import CheckTokenGuard from "@/store/CheckTokenGuard";
import AccountSidebar from "../component/Account/AccountSidebar";
import { updateUserService, uploadAvatarService } from "@/services/userService";
import { toast } from "react-toastify";
import { API_BASE_URL } from "@/config/env";
import UploadImageProfile from "@/app/(client)/component/Account/UploadImage";
import InfoUpdateUser from "@/app/(client)/component/Account/InfoUpdateUser";
import { useGlobalStore } from "@/store/useGlobalStore";
import { getOrdersByUserService } from "@/services/orderService";
import { getAddressByUserId } from "@/services/addressService";
interface Props {
  user: IUser;
  setUser: (user: IUser) => void;
}
export default function Account() {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const setOrderCount = useGlobalStore((state) => state.setOrderCount);
  const setAddressCount = useGlobalStore((state) => state.setAddressCount);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const tokenData = await checkToken();
        if (!tokenData?.user?.id) return;

        const [orders, addresses] = await Promise.all([
          getOrdersByUserService({
            userId: tokenData.user.id,
            page: 1,
            limit: 1,
          }),
          getAddressByUserId(tokenData.user.id),
        ]);

        if (orders?.pagination?.total !== undefined) {
          setOrderCount(orders.pagination.total);
        } else {
          setOrderCount(orders?.orders?.length || 0);
        }
        if (Array.isArray(addresses)) {
          setAddressCount(addresses.length);
        } else {
          setAddressCount(0);
        }
      } catch (err) {
        console.error("Lỗi lấy số lượng đơn hàng/địa chỉ:", err);
      }
    };

    fetchCounts();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // const token = localStorage.getItem("token");
        // if (!token) {
        //   console.error("Token không tồn tại");
        //   return;
        // }
        const token = document.cookie;
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
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <CheckTokenGuard>
        {loading ? (
          <p>Đang tải thông tin...</p>
        ) : user ? (
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
                  <h2>Thông tin tài khoản</h2>
                </div>
                <ul className="breadcrumb">
                  <li className="home">
                    <Link href="/" title="Trang chủ">
                      <span>Trang chủ</span>
                    </Link>
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                  </li>
                  <li>
                    <strong>
                      <span>Thông tin tài khoản</span>
                    </strong>
                  </li>
                  <li></li>
                </ul>
              </div>
            </section>
            <main style={{ marginBottom: "20px" }}>
              <div className="container1">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-lg-3 col-left-ac">
                    <AccountSidebar user={user} />
                  </div>
                  <div className="col-xs-12 col-sm-12 col-lg-9 col-right-ac">
                    <h1 className="title-head margin-top-0 ">
                      Thông tin tài khoản
                    </h1>

                    <UploadImageProfile
                      user={user}
                      setUser={setUser}
                      uploadAvatarService={uploadAvatarService}
                      API_BASE_URL={API_BASE_URL}
                    />
                    <InfoUpdateUser user={user} setUser={setUser} />
                  </div>
                </div>
              </div>
            </main>
          </>
        ) : (
          <p>404: không tìm thấy người dùng</p>
        )}
      </CheckTokenGuard>
    </>
  );
}
