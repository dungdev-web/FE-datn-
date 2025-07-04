"use client";
import "../css/product.css";
import "../css/account.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getInfoUser, checkToken } from "@/services/authService";
import { IUser } from "@/types/user";
import LogoutLink from "../component/log_out";
import CheckTokenGuard from "@/store/CheckTokenGuard";
import AccountSidebar from "../component/accountsidebar";
export default function Account() {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

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

                    {/* Avatar Header Card */}
                    <div
                      className="user-profile-header"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "20px",
                        backgroundColor: "#f8f9fa",
                        borderRadius: "8px",
                        marginBottom: "20px",
                        border: "1px solid #e9ecef",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={
                            user.picture 
                              ? user.picture
                              : user.avatar 
                              ? user.avatar
                              : "/images/default.png" 
                          }
                          alt="Avatar"
                          style={{
                            width: "80px",
                            height: "80px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            marginRight: "20px",
                            border: "3px solid #007bff",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          }}
                        />
                        <div>
                          <h3 style={{ margin: "0 0 5px 0", color: "#333" }}>
                            {user.name}
                          </h3>
                          <p
                            style={{
                              margin: "0",
                              color: "#666",
                              fontSize: "14px",
                            }}
                          >
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <button
                        style={{
                          padding: "8px 16px",
                          backgroundColor: "#021688",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          fontSize: "14px",
                          fontWeight: "500",
                          transition: "background-color 0.2s",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                        onMouseOver={(e) =>
                          ((
                            e.target as HTMLButtonElement
                          ).style.backgroundColor = "#0056b3")
                        }
                        onMouseOut={(e) =>
                          ((
                            e.target as HTMLButtonElement
                          ).style.backgroundColor = "#007bff")
                        }
                        onClick={() => {
                          // Xử lý upload avatar
                          const input = document.createElement("input");
                          input.type = "file";
                          input.accept = "image/*";
                          input.onchange = (e) => {
                            // Xử lý file được chọn
                            const target = e.target as HTMLInputElement;
                            if (target.files && target.files[0]) {
                              console.log("File selected:", target.files[0]);
                            }
                          };
                          input.click();
                        }}
                      >
                        <i className="fa-solid fa-camera"></i> Đổi ảnh
                      </button>
                    </div>

                    {/* Thông tin chi tiết */}
                    <div
                      className="form-signup name-account m992"
                      style={{
                        backgroundColor: "white",
                        padding: "20px",
                        borderRadius: "8px",
                        border: "1px solid #e9ecef",
                        fontSize: "14px",
                      }}
                    >
                      <h4
                        style={{
                          marginBottom: "15px",
                          color: "#333",
                          fontSize: "16px",
                        }}
                      >
                        Thông tin chi tiết
                      </h4>

                      <div style={{ marginBottom: "15px" }}>
                        <strong style={{ color: "#555" }}>Họ tên:</strong>
                        <span style={{ marginLeft: "10px" }}>{user.name}</span>
                      </div>

                      <div style={{ marginBottom: "15px" }}>
                        <strong style={{ color: "#555" }}>Email:</strong>
                        <span style={{ marginLeft: "10px" }}>{user.email}</span>
                      </div>

                      <div style={{ marginBottom: "15px" }}>
                        <strong style={{ color: "#555" }}>Điện thoại:</strong>
                        <span style={{ marginLeft: "10px" }}>
                          +84{user.phone}
                        </span>
                      </div>

                      <div style={{ marginBottom: "0" }}>
                        <strong style={{ color: "#555" }}>Địa chỉ:</strong>
                        <span style={{ marginLeft: "10px" }}>
                          {user.address}
                        </span>
                      </div>
                    </div>
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
