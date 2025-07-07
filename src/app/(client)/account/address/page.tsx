"use client";
import "../../css/product.css";
import "../../css/account.css";
import "@/app/(client)/css/form-address.css";
import Link from "next/link";
import AccountSidebar from "../../component/accountsidebar";
import { IUser } from "@/types/user";
import { useState, useEffect } from "react";
import { checkToken } from "@/services/authService";
import VNAddressSelector from "../../component/VNAddressSelector";

export default function Address() {
  const [user, setUser] = useState<IUser | null>(null);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);

  const handleOpenPopup = () => setShowAddPopup(true);
  const handleClosePopup = () => setShowAddPopup(false);

  const handleOpenEditPopup = () => setShowEditPopup(true);
  const handleCloseEditPopup = () => setShowEditPopup(false);

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
            <h2>Địa chỉ của bạn</h2>
          </div>
          <ul className="breadcrumb">
            <li className="home">
              <Link href="/">
                <span>Trang chủ</span>
              </Link>
              <i className="fa fa-angle-right"></i>
            </li>
            <li className="home">
              <Link href="/account">
                <span>Tài khoản</span>
              </Link>
              <i className="fa fa-angle-right"></i>
            </li>
            <li>
              <strong>
                <span>Địa chỉ của bạn</span>
              </strong>
            </li>
          </ul>
        </div>
      </section>
      <main>
        <div className="container1">
          <div className="row">
            <div className="col-lg-3 col-left-ac">
              <AccountSidebar user={user} />
            </div>
            <div className="col-lg-9 col-right-ac">
              <h1 className="title-head margin-top-0">Địa chỉ của bạn</h1>
              <p className="btn-row">
                <button className="btn-edit-addr btn btn-primary btn-more" type="button" onClick={handleOpenPopup}>
                  Thêm địa chỉ
                </button>
              </p>
              <div className="row total_address">
                <div className="customer_address col-lg-12">
                  <div className="address_info" style={{ borderTop: "1px #ebebeb solid", paddingTop: "16px", marginTop: "20px" }}>
                    <div className="address-group">
                      <div className="address form-signup">
                        <p>
                          <strong>Họ tên: </strong> {user?.name}
                          <span className="address-default">
                            <i className="far fa-check-circle"></i> Địa chỉ mặc định
                          </span>
                        </p>
                        <p>
                          <strong>Địa chỉ: </strong> {user?.address}
                        </p>
                        <p>
                          <strong>Số điện thoại:</strong> +84{user?.phone}
                        </p>
                      </div>
                    </div>
                    <div className="btn-address">
                      <p className="btn-row">
                        <button className="btn-edit-addr btn btn-primary btn-edit" type="button" onClick={handleOpenEditPopup}>
                          Chỉnh sửa địa chỉ
                        </button>
                        <button className="btn btn-dark-address btn-delete">
                          <span className="text-red-500">Xóa</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Popup Thêm địa chỉ */}
      {showAddPopup && (
        <div className="popup-overlay">
          <div className="popup-container">
            <button onClick={handleClosePopup} className="popup-close-btn">&times;</button>
            <h3 className="popup-title">Thêm địa chỉ mới</h3>
            <form className="popup-form">
              <div className="popup-grid">
                <div>
                  <label className="form-label">Họ tên</label>
                  <input type="text" placeholder="Nhập họ tên" className="form-input" />
                </div>
                <div>
                  <label className="form-label">Số điện thoại</label>
                  <input type="text" placeholder="Nhập số điện thoại" className="form-input" />
                </div>
              </div>
              <div>
                <label className="form-label">Địa chỉ chi tiết</label>
                <input type="text" placeholder="Ví dụ: 123 đường ABC, phường XYZ..." className="form-input" />
              </div>
              <VNAddressSelector />
              <label className="toggle-container">
                <span className="toggle-label">Đặt làm địa chỉ mặc định</span>
                <input type="checkbox" className="toggle-checkbox" />
                <span className="toggle-slider"></span>
              </label>
              <div className="popup-actions">
                <button type="button" onClick={handleClosePopup} className="btn-cancel">Hủy</button>
                <button type="submit" className="btn-save">Lưu địa chỉ</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Popup Chỉnh sửa địa chỉ */}
      {showEditPopup && (
        <div className="popup-overlay">
          <div className="popup-container">
            <button onClick={handleCloseEditPopup} className="popup-close-btn">&times;</button>
            <h3 className="popup-title">Chỉnh sửa địa chỉ</h3>
            <form className="popup-form">
              <div className="popup-grid">
                <div>
                  <label className="form-label">Họ tên</label>
                  <input type="text" defaultValue={user?.name || ""} className="form-input" />
                </div>
                <div>
                  <label className="form-label">Số điện thoại</label>
                  <input type="text" defaultValue={user?.phone || ""} className="form-input" />
                </div>
              </div>
              <div>
                <label className="form-label">Địa chỉ chi tiết</label>
                <input type="text" defaultValue={user?.address || ""} className="form-input" />
              </div>
              <VNAddressSelector />
              <label className="toggle-container">
                <span className="toggle-label">Đặt làm địa chỉ mặc định</span>
                <input type="checkbox" className="toggle-checkbox" />
                <span className="toggle-slider"></span>
              </label>
              <div className="popup-actions">
                <button type="button" onClick={handleCloseEditPopup} className="btn-cancel">Hủy</button>
                <button type="submit" className="btn-save">Cập nhật địa chỉ</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
