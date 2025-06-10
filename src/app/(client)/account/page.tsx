"use client";
import "../css/product.css";
import "../css/account.css";
import Link from "next/link";

export default function Account() {
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
            <h2>Thôn tin tài khoản</h2>
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
                <span>Thôn tin tài khoản</span>
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
                    <Link className="title-info active " href="/account">
                      Thông tin tài khoản
                    </Link>
                  </li>
                  <li>
                    <Link className="title-info " href="/account/order">
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
              <h1 className="title-head margin-top-0 ">Thông tin tài khoản</h1>

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
                    src="/images/default.png"
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
                    <h3 style={{ margin: "0 0 5px 0", color: "#333" }}>Lê Chí Bảo</h3>
                    <p style={{ margin: "0", color: "#666", fontSize: "14px" }}>
                      dungldps41484@gmail.com
                    </p>
                  </div>
                </div>

                <button
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#007bff",
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
                    ((e.target as HTMLButtonElement).style.backgroundColor =
                      "#0056b3")
                  }
                  onMouseOut={(e) =>
                    ((e.target as HTMLButtonElement).style.backgroundColor =
                      "#007bff")
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
                  📷 Đổi ảnh
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
                  <span style={{ marginLeft: "10px" }}>Lê Chí Bảo</span>
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <strong style={{ color: "#555" }}>Email:</strong>
                  <span style={{ marginLeft: "10px" }}>
                    dungldps41484@gmail.com
                  </span>
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <strong style={{ color: "#555" }}>Điện thoại:</strong>
                  <span style={{ marginLeft: "10px" }}>+84775895973</span>
                </div>

                <div style={{ marginBottom: "0" }}>
                  <strong style={{ color: "#555" }}>Địa chỉ:</strong>
                  <span style={{ marginLeft: "10px" }}>
                    76 Đường 6 KP4 Bình Trưng Tây, TP. Thủ Đức, Hồ Chí Minh,
                    Quận 3, TP Hồ Chí Minh, Vietnam
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
