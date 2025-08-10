"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { addAddressService, updateAddress } from "@/services/addressService";
import { toast } from "react-toastify";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useAddressFormValidation } from "@/hooks/useAddressFormValidation";
import { getDistricts, getProvinces, getWards } from "@/services/locationService";

type AddressFormData = {
  id?: number;
  full_name: string;
  phone: string;
  address_line_part: string;
  country: string;
  province_code: string;
  province_name: string; 
  district_code: string;
  district_name: string;
  ward_code: string;
  ward_name: string;
  is_default: boolean;
  address_line?: string;
  user_id?: number;
};

type Province = { name: string; code: string };
type District = { name: string; code: string };
type Ward = { name: string; code: string };

type Props = {
  initialData: AddressFormData;
  onClose: () => void;
  onSubmit: (data: AddressFormData) => void;
  mode: "add" | "edit";
};

export default function EditAddressForm({
  initialData,
  onClose,
  onSubmit,
  mode,
}: Props) {
  const { user } = useAuthUser();
  const [formData, setFormData] = useState<AddressFormData>(initialData);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [loading, setLoading] = useState(false);
  const { errors, validateField, validateAll } =
    useAddressFormValidation(initialData);
  useEffect(() => {
    console.log("🛠 initialData vào EditForm:", initialData);
    if (initialData?.id !== undefined) {
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
  // Lấy danh sách tỉnh/thành lúc component mount
  getProvinces()
    .then(setProvinces)
    .catch((err) => console.error("Lỗi lấy tỉnh:", err));
}, []);

useEffect(() => {
  // Khi province_code thay đổi, lấy danh sách huyện
  if (formData.province_code) {
    getDistricts(formData.province_code)
      .then((districts) => {
        setDistricts(districts);
        setWards([]); // reset xã/phường khi tỉnh thay đổi
      })
      .catch((err) => console.error("Lỗi lấy huyện:", err));
  } else {
    setDistricts([]);
    setWards([]);
  }
}, [formData.province_code]);

useEffect(() => {
  // Khi district_code thay đổi, lấy danh sách xã
  if (formData.district_code) {
    getWards(formData.district_code)
      .then(setWards)
      .catch((err) => console.error("Lỗi lấy xã:", err));
  } else {
    setWards([]);
  }
}, [formData.district_code]);


  const handleChange = (
  e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;

  if (name === "province_code") {
    const selected = provinces.find(p => p.code.toString() === value);
    setFormData(prev => ({
      ...prev,
      province_code: value,
      province_name: selected?.name || "",
      district_code: "",
      district_name: "",
      ward_code: "",
      ward_name: "",
    }));
    validateField("province_code", value);
  } else if (name === "district_code") {
    const selected = districts.find(d => d.code.toString() === value);
    setFormData(prev => ({
      ...prev,
      district_code: value,
      district_name: selected?.name || "",
      ward_code: "",
      ward_name: "",
    }));
    validateField("district_code", value);
  } else if (name === "ward_code") {
    const selected = wards.find(w => w.code.toString() === value);
    setFormData(prev => ({
      ...prev,
      ward_code: value,
      ward_name: selected?.name || "",
    }));
    validateField("ward_code", value);
  } else {
    validateField(name, value);
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }
};


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if(!user){
      toast.error("Bạn cần đăng nhập để thực hiện thao tác này.");
      return;
    }
    if (!user) {
      toast.error("Không tìm thấy thông tin người dùng!");
      return;
    }
    const isValid = validateAll(formData);
    if (!isValid) {
      toast.error("Vui lòng kiểm tra lại các trường bắt buộc.");
      return;
    }
    if (mode === "edit" && !formData.id) {
      toast.error("Không tìm thấy ID địa chỉ để cập nhật!");
      return;
    }
    console.log("🧾 Submit formData:", formData);

    onSubmit({
      ...formData,
      user_id: user.id,
    });

    onClose();
  };

  return (
    <div className="relative bg-white rounded-lg shadow-lg !p-6 w-full">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        aria-label="Đóng"
      >
        <i className="fa fa-times text-lg"></i>
      </button>

      <h2 className="text-xl font-semibold !mb-6 text-center">
        {mode === "add" ? "Thêm địa chỉ mới" : "Chỉnh sửa địa chỉ"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Họ tên</label>
          <input
            type="text"
            name="full_name"
            className="w-full border border-gray-300 rounded !px-3 !py-2 outline-none"
            value={formData.full_name}
            onChange={handleChange}
          />
          {errors.full_name && (
            <p className="text-sm text-red-500 mt-1">{errors.full_name}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Số điện thoại
          </label>
          <input
            type="text"
            name="phone"
            className="w-full border border-gray-300 rounded !px-3 !py-2 outline-none"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Địa chỉ cụ thể (số nhà, đường)
          </label>
          <input
            type="text"
            name="address_line_part"
            className="w-full border border-gray-300 rounded !px-3 !py-2 outline-none"
            value={formData.address_line_part}
            onChange={handleChange}
          />
          {errors.address_line_part && (
            <p className="text-sm text-red-500 mt-1">
              {errors.address_line_part}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Quốc gia</label>
          <select
            name="country"
            className="w-full border border-gray-300 rounded !px-3 !py-2 outline-none"
            value={formData.country}
            onChange={handleChange}
          >
            <option value="Vietnam">Vietnam</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div>
    <label className="block text-sm font-medium mb-1">Tỉnh / Thành</label>
    <select
      name="province_code"
      className="w-full border border-gray-300 rounded !px-3 !py-2 outline-none"
      value={formData.province_code || ""}
      onChange={handleChange}
    >
      <option value="">-- Chọn tỉnh --</option>
      {provinces.map((p) => (
        <option key={p.code} value={p.code}>
          {p.name}
        </option>
      ))}
    </select>
    {errors.province_code && (
      <p className="text-sm text-red-500 mt-1">{errors.province_code}</p>
    )}
  </div>

  <div>
    <label className="block text-sm font-medium mb-1">Quận / Huyện</label>
    <select
      name="district_code"
      className="w-full border border-gray-300 rounded !px-3 !py-2"
      value={formData.district_code || ""}
      onChange={handleChange}
      disabled={!formData.province_code}
    >
      <option value="">-- Chọn quận --</option>
      {districts.map((d) => (
        <option key={d.code} value={d.code}>
          {d.name}
        </option>
      ))}
    </select>
    {errors.district_code && (
      <p className="text-sm text-red-500 mt-1">{errors.district_code}</p>
    )}
  </div>

  <div>
    <label className="block text-sm font-medium mb-1">Phường / Xã</label>
    <select
      name="ward_code"
      className="w-full border border-gray-300 rounded !px-3 !py-2"
      value={formData.ward_code || ""}
      onChange={handleChange}
      disabled={!formData.district_code}
    >
      <option value="">-- Chọn phường --</option>
      {wards.map((w) => (
        <option key={w.code} value={w.code}>
          {w.name}
        </option>
      ))}
    </select>
    {errors.ward_code && (
      <p className="text-sm text-red-500 mt-1">{errors.ward_code}</p>
    )}
  </div>
</div>


        <div className="flex items-center !space-x-2">
          <input
            type="checkbox"
            name="is_default"
            checked={formData.is_default}
            onChange={handleChange}
            className="w-4 h-4"
            id="is_default"
          />
          <label htmlFor="is_default" className="text-sm ">
            Đặt làm địa chỉ mặc định
          </label>
        </div>

        <div className="flex justify-end space-x-4 !pt-4 gap-2">
          <button
            type="button"
            onClick={onClose}
            className="!px-4 !py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={loading}
            className="!px-4 !py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {loading
              ? "Đang xử lý..."
              : mode === "add"
              ? "Thêm địa chỉ"
              : "Cập nhật địa chỉ"}
          </button>
        </div>
      </form>
    </div>
  );
}
