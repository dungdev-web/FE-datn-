import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { updateUserService } from "@/services/userService";
import { IUser } from "@/types/user";
import Swal from "sweetalert2";
import { AddressResponse } from "@/types/address";
import { getDefaultAddressService } from "@/services/addressService";

export default function InfoUpdateUser({
  user,
  setUser,
}: {
  user: IUser;
  setUser: (u: IUser) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [defaultAddress, setDefaultAddress] = useState<AddressResponse | null>(
    null
  );
  useEffect(() => {
    const fetchDefaultAddress = async () => {
      if (!user?.id) return;

      const address = await getDefaultAddressService(user.id);
      setDefaultAddress(address);
    };

    fetchDefaultAddress();
  }, [user]);
  console.log("🛠 user trong InfoUpdateUser:", user);
  console.log("🛠 defaultAddress trong InfoUpdateUser:", defaultAddress);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const updated = await updateUserService({
        userId: user.id,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
      });

      const newUser = {
        ...user,
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
      };

      setUser(newUser);
      await Swal.fire("Thành công", "Cập nhật thành công", "success");
      setEditing(false);
    } catch (err: any) {
      await Swal.fire("Lỗi", err.message || "Cập nhật thất bại", "error");
    }
  };
  return (
    <div className="form-signup name-account m992 bg-white !p-5 rounded-lg border border-[#e9ecef] text-[14px]">
      <h4 className="!mb-[15px] text-[#333] text-[16px] font-semibold">
        Thông tin chi tiết
      </h4>

      <div className="!mb-[15px]">
        <strong className="text-[#555]">Họ tên:</strong>
        {editing ? (
          <div className="relative w-full max-w-md">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="peer w-full !border !border-gray-300 !rounded !px-4 !pt-5 !pb-2 !text-sm !text-gray-800 focus:!outline-none focus:!ring-1 focus:!ring-blue-500 focus:!border-blue-500"
              placeholder=" "
            />
          </div>
        ) : (
          <span className="!ml-[10px]">{user.name}</span>
        )}
      </div>

      <div className="!mb-[15px]">
        <strong className="text-[#555]">Email:</strong>
        {editing ? (
          <div className="relative w-full max-w-md mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="peer w-full !border !border-gray-300 !rounded !px-4 !pt-5 !pb-2 !text-sm !text-gray-800 focus:!outline-none focus:!ring-1 focus:!ring-blue-500 focus:!border-blue-500"
              placeholder=" "
            />
          </div>
        ) : (
          <span className="!ml-[10px]">{user.email}</span>
        )}
      </div>

      <div className="!mb-[15px]">
        <strong className="text-[#555]">Điện thoại:</strong>
        {editing ? (
          <div className="relative w-full max-w-md mb-4">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="peer w-full !border !border-gray-300 !rounded !px-4 !pt-5 !pb-2 !text-sm !text-gray-800 focus:!outline-none focus:!ring-1 focus:!ring-blue-500 focus:!border-blue-500"
              placeholder=" "
            />
          </div>
        ) : (
          <span className="!ml-[10px]">+84{user.phone}</span>
        )}
      </div>

      <div className="!mb-0">
        <strong className="text-[#555]">Địa chỉ:</strong>
        <span className="!ml-[10px]">
          {defaultAddress
            ? `${defaultAddress.address_line}`
            : "Chưa có địa chỉ mặc định"}
        </span>
      </div>

      <div className="!mt-4">
        {editing ? (
          <>
            <div className="flex !gap-2">
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white !px-6 !py-2 rounded"
              >
                Lưu
              </button>
              <button
                onClick={() => setEditing(false)}
                className="bg-gray-500 text-white !px-6 !py-2 rounded"
              >
                Hủy
              </button>
            </div>
          </>
        ) : (
          <button
            onClick={() => {
              setFormData({
                fullName: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
              });
              setEditing(true);
            }}
            className="bg-blue-600 text-white !px-6 !py-2 rounded"
          >
            Chỉnh sửa
          </button>
        )}
      </div>
    </div>
  );
}
