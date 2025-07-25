"use client";

import "../../css/product.css";
import "../../css/account.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import EditAddressForm from "../../component/Account/EditAddressForm";
import AccountSidebar from "../../component/accountsidebar";
import {
  addAddressService,
  updateAddress,
  getAddressByUserId,
} from "@/services/addressService";
import { useAuthUser } from "@/hooks/useAuthUser";

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

type AddressFormData = typeof initialAddress & {
  id?: number;
  address_line?: string;
};

type FormMode = "add" | "edit";

export default function Address() {
  const { user } = useAuthUser();
  const [showEditForm, setShowEditForm] = useState(false);
  const [formMode, setFormMode] = useState<FormMode>("add");
  const [addressData, setAddressData] = useState<AddressFormData>(initialAddress);
  const [addressList, setAddressList] = useState<AddressFormData[]>([]);

  useEffect(() => {
  if (!user?.id) return;

  const fetchAddresses = async () => {
    try {
      const res = await getAddressByUserId(user.id);
      const addresses: AddressFormData[] = Array.isArray(res)
        ? res
            .filter((item: any) => item.id || item._id)
            .map((item: any) => ({
              id: item.id ?? item._id,
              full_name: item.full_name,
              phone: item.phone,
              address_line_part: item.address_line_part ?? "",
              country: item.country ?? "Vietnam",
              province: item.province ?? "",
              district: item.district ?? "",
              ward: item.ward ?? "",
              is_default: item.is_default ?? false,
              address_line: item.address_line ?? "",
            }))
        : [];

      setAddressList(addresses);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách địa chỉ:", error);
    }
  };

  fetchAddresses();
}, [user?.id]); // chạy lại khi user.id có giá trị


  const handleAddOrUpdate = async (data: AddressFormData) => {
    try {
       if (!user?.id) return alert("Không xác định được người dùng!");
       const address_line = [
      data.address_line_part,
      data.ward,
      data.district,
      data.province,
    ]
      .filter(Boolean)
      .join(", ");

      const payload = {
      user_id: user.id,
      full_name: data.full_name,
      phone: data.phone,
      address_line,
      is_default: data.is_default ?? false,
    };

      if (formMode === "add") {
        const result = await addAddressService(payload);
        setAddressList((prev) => [
          ...prev,
          {
            ...data,
            address_line,
            id: result.id,
          },
        ]);
      } else {
        const addressId = data.id;
        if (!addressId) {
          alert("Không tìm thấy ID địa chỉ để cập nhật!");
          return;
        }

        await updateAddress(addressId, payload);
        setAddressList((prev) =>
          prev.map((addr) =>
            addr.id === addressId
              ? {
                  ...data,
                  address_line,
                  id: addressId,
                }
              : addr
          )
        );
      }

      setShowEditForm(false);
    } catch (error: any) {
      alert("Lỗi khi lưu địa chỉ: " + error.message);
    }
  };

  const handleAddClick = () => {
    setFormMode("add");
    setAddressData(initialAddress);
    setShowEditForm(true);
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
                  onClick={handleAddClick}
                >
                  Thêm địa chỉ
                </button>
              </p>

              <div className="row total_address">
  {addressList.length === 0 ? (
    <p className="text-gray-600 text-base ml-3">Bạn chưa có địa chỉ nào.</p>
  ) : (
    addressList.map((address, index) => (
      <div
        key={index}
        className="customer_address col-xs-12 col-lg-12 col-md-12 col-xl-12"
      >
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
                <strong>Họ tên: </strong> {address.full_name}
                {address.is_default && (
                  <span className="address-default">
                    <i className="far fa-check-circle"></i> Địa chỉ mặc định
                  </span>
                )}
              </p>
              <p>
                <strong>Địa chỉ: </strong>
                {[address.address_line_part, address.ward, address.district, address.province]
                  .filter(Boolean)
                  .join(", ")}
              </p>
              <p>
                <strong>Số điện thoại:</strong> {address.phone}
              </p>
            </div>
          </div>
          <div className="btn-address">
            <p className="btn-row">
              <button
                className="btn-edit-addr btn btn-primary btn-edit"
                type="button"
                onClick={() => {
                  setFormMode("edit");
                  setAddressData({ ...address });
                  setShowEditForm(true);
                }}
              >
                Chỉnh sửa địa chỉ
              </button>
            </p>
          </div>
        </div>
      </div>
    ))
  )}

  {/* Form thêm/sửa */}
  {showEditForm && (
    <div className="fixed inset-0 flex items-center justify-center z-[9999]">
      <div
        className="absolute inset-0 bg-black opacity-50 z-0"
        onClick={() => setShowEditForm(false)}
      ></div>
      <div className="relative z-10 bg-white text-black rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg">
        <EditAddressForm
          mode={formMode}
          initialData={addressData}
          onClose={() => setShowEditForm(false)}
          onSubmit={handleAddOrUpdate}
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
