"use client";

import "../../css/product.css";
import "../../css/account.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import EditAddressForm from "../../component/Account/EditAddressForm";
import AccountSidebar from "../../component/Account/AccountSidebar";
import {
  addAddressService,
  updateAddress,
  getAddressByUserId,
  deleteAddress,
} from "@/services/addressService";
import { useAuthUser } from "@/hooks/useAuthUser";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useGlobalStore } from "@/store/useGlobalStore";

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
  const [addressData, setAddressData] =
    useState<AddressFormData>(initialAddress);
  const [addressList, setAddressList] = useState<AddressFormData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const setAddressCount = useGlobalStore((state) => state.setAddressCount);
  const fetchAddresses = async () => {
    if (!user?.id) return;
    try {
      setIsLoading(true);
      const res = await getAddressByUserId(user.id);
      const addresses: AddressFormData[] = Array.isArray(res)
        ? res
            .filter((item: any) => item.ship_address_id)
            .map((item: any) => {
              const parsed = parseAddressLine(item.address_line || "");
              return {
                id: item.ship_address_id,
                full_name: item.full_name,
                phone: item.phone,
                ...parsed,
                country: "Vietnam",
                is_default: item.is_default ?? false,
                address_line: item.address_line ?? "",
              };
            })
        : [];
      setAddressList(addresses);
      setAddressCount(addresses.length);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách địa chỉ:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [user?.id]);

  function parseAddressLine(address_line: string) {
    const [part, ward, district, province] = address_line
      .split(",")
      .map((s) => s.trim());
    return {
      address_line_part: part || "",
      ward: ward || "",
      district: district || "",
      province: province || "",
    };
  }

  const handleAddOrUpdate = async (data: AddressFormData) => {
    try {
      if (!user?.id) {
        await Swal.fire("Lỗi", "Không xác định được người dùng!", "error");
        return;
      }

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

      if (data.is_default) {
        await unsetOtherDefaultAddresses(data.id);
      }

      if (formMode === "add") {
        await addAddressService(payload);
        await Swal.fire("Thành công", "Thêm địa chỉ thành công!", "success");
      } else {
        if (!data.id) {
          await Swal.fire(
            "Cảnh báo",
            "Không tìm thấy ID địa chỉ để cập nhật!",
            "warning"
          );
          return;
        }

        await updateAddress(data.id, payload);
        await Swal.fire(
          "Thành công",
          "Cập nhật địa chỉ thành công!",
          "success"
        );
      }

      setShowEditForm(false);
      await fetchAddresses();
    } catch (error: any) {
      await Swal.fire("Lỗi", "Lỗi khi lưu địa chỉ: " + error.message, "error");
    }
  };

  const unsetOtherDefaultAddresses = async (currentId?: number) => {
    const updates = addressList
      .filter((addr) => addr.is_default && addr.id !== currentId)
      .map((addr) =>
        updateAddress(addr.id!, {
          full_name: addr.full_name,
          phone: addr.phone,
          address_line: addr.address_line ?? "",
          is_default: false,
        })
      );

    await Promise.all(updates);
  };

  const handleDelete = async (addressId?: number) => {
    if (!addressId) return;

    const targetAddress = addressList.find((addr) => addr.id === addressId);

    if (targetAddress?.is_default) {
      await Swal.fire({
        icon: "error",
        title: "Không thể xoá",
        text: "Không thể xoá địa chỉ mặc định. Vui lòng đổi mặc định trước!",
        confirmButtonText: "OK",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Bạn có chắc chắn?",
      text: "Địa chỉ này sẽ bị xoá và không thể khôi phục!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xoá",
      cancelButtonText: "Huỷ",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteAddress(addressId);
      await fetchAddresses();
      Swal.fire("Đã xoá!", "Địa chỉ đã được xoá thành công.", "success");
    } catch (error: any) {
      Swal.fire("Lỗi!", "Xoá địa chỉ thất bại: " + error.message, "error");
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
                {isLoading ? (
                  <p className="text-center text-base text-gray-400 mt-4">
                    Đang tải danh sách địa chỉ...
                  </p>
                ) : addressList.length === 0 ? (
                  <p className="text-center text-lg text-gray-500 mt-4">
                    Bạn chưa có địa chỉ nào.
                  </p>
                ) : (
                  addressList.map((address, index) => (
                    <div
                      key={address.id}
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
                                  <i className="far fa-check-circle"></i> Địa
                                  chỉ mặc định
                                </span>
                              )}
                            </p>
                            <p>
                              <strong>Địa chỉ: </strong>
                              {address.address_line || "Chưa có địa chỉ"}
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

                                setTimeout(() => {
                                  setShowEditForm(true);
                                }, 0);
                              }}
                            >
                              Chỉnh sửa địa chỉ
                            </button>
                            <button
                              className="btn-edit-addr btn btn-danger btn-delete ml-2"
                              type="button"
                              onClick={() => handleDelete(address.id)}
                            >
                              Xoá địa chỉ
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
