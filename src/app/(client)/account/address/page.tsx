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
  province_code: "",
  province_name: "",
  district_code: "",
  district_name: "",
  ward_code: "",
  ward_name: "",
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
      console.log("🔍 Raw API response:", res);

      const addresses: AddressFormData[] = Array.isArray(res)
        ? res
            .filter((item: any) => {
              console.log("🔍 Checking item:", item);
              // Kiểm tra có ship_address_id hoặc không có field này (nghĩa là địa chỉ thường)
              return item.ship_address_id !== undefined || item.id;
            })
            .map((item: any) => {
              const parsed = parseAddressLine(item.address_line || "");
              const mappedAddress = {
                id: item.id || item.ship_address_id, // Thử cả 2 trường
                full_name: item.full_name,
                phone: item.phone,
                address_line_part:
                  parsed.address_line_part || item.address_line_part,
                country: item.country || "Vietnam",
                province_code: "",
                province_name: parsed.province || item.province || "",
                district_code: "",
                district_name: parsed.district || item.district || "",
                ward_code: "",
                ward_name: parsed.ward || item.ward || "",
                address_line: item.address_line,
                is_default: item.is_default,
              };
              console.log("🔍 Mapped address:", mappedAddress);
              return mappedAddress;
            })
        : [];

      console.log("📍 Final processed addresses:", addresses);
      setAddressList(addresses);
      setAddressCount(addresses.length);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách địa chỉ:", error);
      toast.error("Không thể tải danh sách địa chỉ");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [user?.id]);

  function parseAddressLine(address_line: string) {
    if (!address_line)
      return {
        address_line_part: "",
        ward: "",
        district: "",
        province: "",
      };

    const parts = address_line.split(",").map((s) => s.trim());
    return {
      address_line_part: parts[0] || "",
      ward: parts[1] || "",
      district: parts[2] || "",
      province: parts[3] || "",
    };
  }

  const handleAddOrUpdate = async (data: AddressFormData) => {
    try {
      if (!user?.id) {
        await Swal.fire("Lỗi", "Không xác định được người dùng!", "error");
        return;
      }

      console.log("📝 Processing data:", data);
      console.log("📝 Mode:", formMode);
      console.log("📝 ID:", data.id);

      const address_line = [
        data.address_line_part,
        data.ward_name,
        data.district_name,
        data.province_name,
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

      console.log("📝 Final payload:", payload);

      // Nếu đặt làm mặc định, bỏ mặc định của các địa chỉ khác trước
      if (data.is_default) {
        console.log("📝 Unsetting other default addresses...");
        await unsetOtherDefaultAddresses(data.id);
      }

      let result;
      if (formMode === "add") {
        console.log("📝 Adding new address...");
        result = await addAddressService(payload);
        console.log("📝 Add result:", result);
        await Swal.fire("Thành công", "Thêm địa chỉ thành công!", "success");
      } else {
        if (!data.id) {
          console.error("❌ No ID for update:", data);
          await Swal.fire(
            "Cảnh báo",
            "Không tìm thấy ID địa chỉ để cập nhật!",
            "warning"
          );
          return;
        }

        console.log("🔄 Updating address with ID:", data.id);
        result = await updateAddress(data.id, payload);
        console.log("🔄 Update result:", result);
        await Swal.fire(
          "Thành công",
          "Cập nhật địa chỉ thành công!",
          "success"
        );
      }

      // Đóng form và refresh danh sách
      setShowEditForm(false);

      // Delay nhỏ để đảm bảo database được cập nhật
      setTimeout(async () => {
        console.log("🔄 Refreshing address list...");
        await fetchAddresses();
      }, 500);
    } catch (error: any) {
      console.error("❌ Error in handleAddOrUpdate:", error);
      await Swal.fire("Lỗi", "Lỗi khi lưu địa chỉ: " + error.message, "error");
    }
  };

  const unsetOtherDefaultAddresses = async (currentId?: number) => {
    const updates = addressList
      .filter((addr) => addr.is_default && addr.id !== currentId)
      .map((addr) => {
        if (!addr.id) return Promise.resolve();
        return updateAddress(addr.id, {
          full_name: addr.full_name,
          phone: addr.phone,
          address_line: addr.address_line ?? "",
          is_default: false,
        });
      })
      .filter(Boolean);

    await Promise.all(updates);
  };

  const handleDelete = async (addressId?: number) => {
    if (!addressId) {
      await Swal.fire("Lỗi", "Không tìm thấy ID địa chỉ để xóa!", "error");
      return;
    }

    const targetAddress = addressList.find((addr) => addr.id === addressId);

    if (targetAddress?.is_default && addressList.length > 1) {
      const result = await Swal.fire({
        title: "Địa chỉ mặc định",
        text: "Đây là địa chỉ mặc định. Bạn có muốn đặt địa chỉ khác làm mặc định trước khi xóa?",
        icon: "question",
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonText: "Chọn địa chỉ mặc định khác",
        denyButtonText: "Xóa luôn",
        cancelButtonText: "Hủy",
        confirmButtonColor: "#3085d6",
        denyButtonColor: "#d33",
        cancelButtonColor: "#6c757d",
      });

      if (result.isConfirmed) {
        // Hiển thị danh sách địa chỉ khác để chọn làm mặc định
        const otherAddresses = addressList.filter(
          (addr) => addr.id !== addressId
        );
        const addressOptions = otherAddresses.reduce((acc, addr, index) => {
          acc[index.toString()] = `${addr.full_name} - ${addr.address_line}`;
          return acc;
        }, {} as Record<string, string>);

        const { value: selectedIndex } = await Swal.fire({
          title: "Chọn địa chỉ mặc định mới",
          input: "select",
          inputOptions: addressOptions,
          inputPlaceholder: "Chọn địa chỉ...",
          showCancelButton: true,
          inputValidator: (value) => {
            if (!value) {
              return "Bạn cần chọn một địa chỉ!";
            }
          },
        });

        if (selectedIndex !== undefined) {
          const newDefaultAddress = otherAddresses[parseInt(selectedIndex)];
          if (newDefaultAddress?.id) {
            try {
              // Đặt địa chỉ mới làm mặc định
              await updateAddress(newDefaultAddress.id, {
                full_name: newDefaultAddress.full_name,
                phone: newDefaultAddress.phone,
                address_line: newDefaultAddress.address_line ?? "",
                is_default: true,
              });

              // Sau đó xóa địa chỉ cũ
              await deleteAddress(addressId);
              await fetchAddresses();
              Swal.fire(
                "Thành công!",
                "Đã cập nhật địa chỉ mặc định và xóa địa chỉ cũ.",
                "success"
              );
            } catch (error: any) {
              Swal.fire("Lỗi!", "Có lỗi xảy ra: " + error.message, "error");
            }
          }
        }
        return;
      } else if (result.isDenied) {
        // Tiếp tục xóa mà không đặt mặc định khác
      } else {
        // Hủy
        return;
      }
    }

    // Xác nhận xóa cuối cùng
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
    setAddressData({ ...initialAddress });
    setShowEditForm(true);
  };

  const handleEditClick = (address: AddressFormData) => {
    console.log("📝 Edit clicked for address:", address);
    console.log("📝 Address ID:", address.id);

    setFormMode("edit");
    // Đảm bảo tất cả dữ liệu được copy đầy đủ
    setAddressData({
      ...address,
      // Đảm bảo ID được giữ lại
      id: address.id,
    });

    setTimeout(() => {
      setShowEditForm(true);
    }, 50); // Delay nhỏ để đảm bảo state được cập nhật
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
              <Link href="/">
                <span>Địa chỉ của bạn</span>
              </Link>
              <i className="fa fa-angle-right" />
            </li>
            <li className="home">
              <Link href="/account">
                <span>Tài khoản</span>
              </Link>
              <i className="fa fa-angle-right" />
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
                      key={address.id || index}
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
                            <p className="text-xs text-gray-500">
                              ID: {address.id}
                            </p>
                          </div>
                        </div>
                        <div className="btn-address">
                          <p className="btn-row">
                            <button
                              className="btn-edit-addr btn btn-primary btn-edit"
                              type="button"
                              onClick={() => handleEditClick(address)}
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
