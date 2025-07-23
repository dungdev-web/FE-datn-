"use client";
import "../../css/product.css";
import "../../css/account.css";
import Link from "next/link";
import { useState } from "react";
import EditAddressForm from "../../component/Account/EditAddressForm";
import AccountSidebar from "../../component/accountsidebar";

const initialAddress = {
  full_name: "",
  phone: "",
  address_line_part: "",
  country: "Vietnam",
  province: "",
  district: "",
  ward: "",
  is_default: false,
};

export default function Address() {
  const [showEditForm, setShowEditForm] = useState(false);
  const [addressData, setAddressData] = useState(initialAddress);

  const handleUpdate = (data: typeof initialAddress) => {
    setAddressData(data);
    setShowEditForm(false);
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
            <h2>Địa chỉ của bạn</h2>
          </div>
          <ul className="breadcrumb">
            <li className="home">
              <Link href="/">Trang chủ</Link>
              <i className="fa fa-angle-right" />
            </li>
            <li className="home">
              <Link href="/account">Tài khoản</Link>
              <i className="fa fa-angle-right" />
            </li>
            <li>
              <strong>Địa chỉ của bạn</strong>
            </li>
          </ul>
        </div>
      </section>

      <main>
        <div className="container1">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-lg-3 col-left-ac">
              <AccountSidebar user={null} />
            </div>
            <div className="col-xs-12 col-sm-12 col-lg-9 col-right-ac">
              <h1 className="title-head margin-top-0">Địa chỉ của bạn</h1>
              <p className="btn-row">
                <button
                  className="btn-edit-addr btn btn-primary btn-more"
                  type="button"
                  onClick={() => setShowEditForm(true)}
                >
                  Thêm địa chỉ
                </button>
              </p>
              <div className="row total_address">
                <div className="customer_address col-xs-12 col-lg-12 col-md-12 col-xl-12">
                  <div
                    className="address_info"
                    style={{
                      borderTop: "1px #ebebeb solid",
                      paddingTop: "16px",
                      marginTop: "20px",
                    }}
                  >
                    <div className="address-group">
                      <div className="address form-signup">
                        <p>
                          <strong>Họ tên: </strong> {addressData.full_name}
                          <span className="address-default">
                            <i className="far fa-check-circle"></i> Địa chỉ mặc định
                          </span>
                        </p>
                        <p>
                          <strong>Địa chỉ: </strong>
                          {`${addressData.address_line_part}, ${addressData.ward}, ${addressData.district}, ${addressData.province}`}
                        </p>
                        <p>
                          <strong>Số điện thoại:</strong> {addressData.phone}
                        </p>
                      </div>
                    </div>
                    <div className="btn-address">
                      <p className="btn-row">
                        <button
                          className="btn-edit-addr btn btn-primary btn-edit"
                          type="button"
                          onClick={() => setShowEditForm(true)}
                        >
                          Chỉnh sửa địa chỉ
                        </button>
                      </p>
                    </div>
                  </div>
                </div>

                {showEditForm && (
                  <div className="fixed inset-0 flex items-center justify-center z-[9999]">
                    <div
                      className="absolute inset-0 bg-black opacity-50 z-0"
                      onClick={() => setShowEditForm(false)}
                    ></div>
                    <div className="relative z-10 bg-white text-black rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg">
                      <EditAddressForm
                        initialData={addressData}
                        onClose={() => setShowEditForm(false)}
                        onSubmit={handleUpdate}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
