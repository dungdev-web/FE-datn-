"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { addAddressService, updateAddress } from "@/services/addressService";
import { toast } from "react-toastify";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useAddressFormValidation } from "@/hooks/useAddressFormValidation";

type AddressFormData = {
  id?: number;
  full_name: string;
  phone: string;
  address_line_part: string;
  country: string;
  province: string;
  district: string;
  ward: string;
  is_default: boolean;
  address_line?: string;
  user_id?: number;
};

type Province = { name: string; code: number };
type District = { name: string; code: number };
type Ward = { name: string; code: number };

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
  const {user} = useAuthUser();
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
    fetch("https://provinces.open-api.vn/api/p/")
      .then((res) => res.json())
      .then((data) => setProvinces(data));
  }, []);

  useEffect(() => {
    if (formData.province && provinces.length) {
      const selectedProvince = provinces.find(
        (p) => p.name === formData.province
      );
      if (selectedProvince) {
        fetch(
          `https://provinces.open-api.vn/api/p/${selectedProvince.code}?depth=2`
        )
          .then((res) => res.json())
          .then((data) => setDistricts(data.districts || []));
      }
    }
  }, [formData.province, provinces]);

  useEffect(() => {
    if (formData.district && districts.length) {
      const selectedDistrict = districts.find(
        (d) => d.name === formData.district
      );
      if (selectedDistrict) {
        fetch(
          `https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`
        )
          .then((res) => res.json())
          .then((data) => setWards(data.wards || []));
      }
    }
  }, [formData.district, districts]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, value, type } = target;
    validateField(name, value);
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (target as HTMLInputElement).checked : value,
      ...(name === "province" ? { district: "", ward: "" } : {}),
      ...(name === "district" ? { ward: "" } : {}),
    }));
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
            <label className="block text-sm font-medium mb-1">
              Tỉnh / Thành
            </label>
            <select
              name="province"
              className="w-full border border-gray-300 rounded !px-3 !py-2 outline-none"
              value={formData.province}
              onChange={handleChange}
            >
              <option value="">-- Chọn tỉnh --</option>
              {provinces.map((p) => (
                <option key={p.code} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
            {errors.province && (
              <p className="text-sm text-red-500 mt-1">{errors.province}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Quận / Huyện
            </label>
            <select
              name="district"
              className="w-full border border-gray-300 rounded !px-3 !py-2"
              value={formData.district}
              onChange={handleChange}
              disabled={!formData.province}
            >
              <option value="">-- Chọn quận --</option>
              {districts.map((d) => (
                <option key={d.code} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
            {errors.district && (
              <p className="text-sm text-red-500 mt-1">{errors.district}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Phường / Xã
            </label>
            <select
              name="ward"
              className="w-full border border-gray-300 rounded !px-3 !py-2"
              value={formData.ward}
              onChange={handleChange}
              disabled={!formData.district}
            >
              <option value="">-- Chọn phường --</option>
              {wards.map((w) => (
                <option key={w.code} value={w.name}>
                  {w.name}
                </option>
              ))}
            </select>
            {errors.ward && (
              <p className="text-sm text-red-500 mt-1">{errors.ward}</p>
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
