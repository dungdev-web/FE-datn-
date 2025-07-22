"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";

type AddressFormData = {
  full_name: string;
  phone: string;
  address_line_part: string;
  country: string;
  province: string;
  district: string;
  ward: string;
  is_default: boolean;
  address_line?: string;
};

type Province = { name: string; code: number };
type District = { name: string; code: number };
type Ward = { name: string; code: number };

type Props = {
  initialData: AddressFormData;
  onClose: () => void;
  onSubmit: (data: AddressFormData) => void;
};

export default function EditAddressForm({
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const [formData, setFormData] = useState<AddressFormData>(initialData);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/p/")
      .then((res) => res.json())
      .then((data) => setProvinces(data));
  }, []);

  useEffect(() => {
    const province = provinces.find((p) => p.name === formData.province);
    if (province) {
      fetch(`https://provinces.open-api.vn/api/p/${province.code}?depth=2`)
        .then((res) => res.json())
        .then((data) => {
          setDistricts(data.districts || []);
          setWards([]);
        });
    }
  }, [formData.province]);

  useEffect(() => {
    const district = districts.find((d) => d.name === formData.district);
    if (district) {
      fetch(`https://provinces.open-api.vn/api/d/${district.code}?depth=2`)
        .then((res) => res.json())
        .then((data) => setWards(data.wards || []));
    }
  }, [formData.district]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    const checked = type === "checkbox" ? target.checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "province" ? { district: "", ward: "" } : {}),
      ...(name === "district" ? { ward: "" } : {}),
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const fullAddress = `${formData.address_line_part}, ${formData.ward}, ${formData.district}, ${formData.province}, ${formData.country}`;
    onSubmit({
      ...formData,
      address_line: fullAddress,
    });
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
        Chỉnh sửa địa chỉ
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Họ tên</label>
          <input
            type="text"
            name="full_name"
            className="w-full border border-gray-300 rounded !px-3 !py-2"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Số điện thoại
          </label>
          <input
            type="text"
            name="phone"
            className="w-full border border-gray-300 rounded !px-3 !py-2"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Địa chỉ cụ thể (số nhà, đường)
          </label>
          <input
            type="text"
            name="address_line_part"
            className="w-full border border-gray-300 rounded !px-3 !py-2"
            value={formData.address_line_part}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Quốc gia</label>
          <select
            name="country"
            className="w-full border border-gray-300 rounded !px-3 !py-2"
            value={formData.country}
            onChange={handleChange}
          >
            <option value="Vietnam">Vietnam</option>
            <option value="United States">United States</option>
            <option value="Japan">Japan</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Tỉnh / Thành
            </label>
            <select
              name="province"
              className="w-full border border-gray-300 rounded !px-3 !py-2"
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
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="is_default"
            checked={formData.is_default}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label className="text-sm">Đặt làm địa chỉ mặc định</label>
        </div>

        <div className="flex justify-end space-x-4 !pt-4">
          <button
            type="button"
            onClick={onClose}
            className="!px-4 !py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="!px-4 !py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Cập nhật địa chỉ
          </button>
        </div>
      </form>
    </div>
  );
}
