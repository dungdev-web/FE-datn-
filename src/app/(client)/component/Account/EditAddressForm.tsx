"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { addAddressService, updateAddress } from "@/services/addressService";
import { toast } from "react-toastify";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useAddressFormValidation } from "@/hooks/useAddressFormValidation";
import {
  getDistricts,
  getProvinces,
  getWards,
} from "@/services/locationService";

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
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [loading, setLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(mode === "edit");
  const { errors, validateField, validateAll } =
    useAddressFormValidation(initialData);

  // Helper function để tìm kiếm tên gần giống nhất
  const findBestMatch = (
    searchName: string,
    items: { name: string; code: string }[]
  ) => {
    if (!searchName || !items.length) return null;

    console.log("🔍 Searching for:", searchName, "in", items.length, "items");

    // Chuẩn hóa tên để so sánh
    const normalize = (str: string) =>
      str
        .toLowerCase()
        .replace(/tỉnh|thành phố|tp\.|tp /gi, "")
        .replace(/quận|huyện|thị xã|tx\./gi, "")
        .replace(/phường|xã|thị trấn|tt\./gi, "")
        .replace(/\s+/g, " ")
        .trim();

    const normalizedSearch = normalize(searchName);
    console.log("🔍 Normalized search:", normalizedSearch);

    // Tìm exact match trước
    let match = items.find((item) => {
      const normalizedItem = normalize(item.name);
      console.log("🔍 Comparing with:", normalizedItem);
      return normalizedItem === normalizedSearch;
    });

    if (match) {
      console.log("✅ Found exact match:", match);
      return match;
    }

    // Tìm contains match
    match = items.find((item) => {
      const normalizedItem = normalize(item.name);
      return (
        normalizedItem.includes(normalizedSearch) ||
        normalizedSearch.includes(normalizedItem)
      );
    });

    if (match) {
      console.log("✅ Found partial match:", match);
    } else {
      console.warn("❌ No match found for:", searchName);
    }

    return match;
  };

  useEffect(() => {
    console.log("🛠 initialData vào EditForm:", initialData);
    console.log("🛠 Mode:", mode);
    console.log("🛠 ID exists:", initialData?.id);

    // Đảm bảo formData được cập nhật đúng cách
    setFormData({
      ...initialData,
      // Đảm bảo ID được giữ lại trong edit mode
      ...(mode === "edit" && initialData?.id && { id: initialData.id }),
    });

    // Reset trạng thái initialization cho edit mode
    if (mode === "edit") {
      setIsInitializing(true);
    }
  }, [initialData, mode]);

  useEffect(() => {
    // Lấy danh sách tỉnh/thành lúc component mount
    console.log("🏢 Loading provinces...");
    getProvinces()
      .then((provinceList) => {
        console.log("🏢 Loaded provinces:", provinceList.length);
        setProvinces(provinceList);

        // Nếu đang edit và có tên tỉnh, tìm code tương ứng
        if (
          mode === "edit" &&
          initialData.province_name &&
          !initialData.province_code
        ) {
          const matchedProvince = findBestMatch(
            initialData.province_name,
            provinceList
          );

          if (matchedProvince) {
            console.log(
              "🔍 Found matching province:",
              matchedProvince.name,
              "->",
              matchedProvince.code
            );
            setFormData((prev) => ({
              ...prev,
              province_code: matchedProvince.code,
              province_name: matchedProvince.name,
            }));
          } else {
            console.warn(
              "❌ Could not find province:",
              initialData.province_name
            );
          }
        }
      })
      .catch((err) => console.error("Lỗi lấy tỉnh:", err));
  }, [mode, initialData.province_name]);

  useEffect(() => {
    // Khi province_code thay đổi, lấy danh sách huyện
    if (formData.province_code) {
      console.log("🏛️ Loading districts for province:", formData.province_code);
      getDistricts(formData.province_code)
        .then((districtList) => {
          console.log("🏛️ Loaded districts:", districtList.length);
          setDistricts(districtList);

          // Luôn thử match district nếu có initialData.district_name (không phụ thuộc vào isInitializing)
          if (
            mode === "edit" &&
            initialData.district_name &&
            !formData.district_code
          ) {
            console.log(
              "🏛️ Trying to match district:",
              initialData.district_name
            );
            const matchedDistrict = findBestMatch(
              initialData.district_name,
              districtList
            );

            if (matchedDistrict) {
              console.log(
                "🔍 Found matching district:",
                matchedDistrict.name,
                "->",
                matchedDistrict.code
              );
              setFormData((prev) => ({
                ...prev,
                district_code: matchedDistrict.code,
                district_name: matchedDistrict.name,
              }));
            } else {
              console.warn(
                "❌ Could not find district:",
                initialData.district_name
              );
            }
          } else if (!isInitializing && mode !== "edit") {
            // Reset ward khi user thay đổi tỉnh manually (chỉ cho add mode)
            setWards([]);
            setFormData((prev) => ({
              ...prev,
              district_code: "",
              district_name: "",
              ward_code: "",
              ward_name: "",
            }));
          }
        })
        .catch((err) => {
          console.error("Lỗi lấy huyện:", err);
        });
    } else {
      setDistricts([]);
      setWards([]);
    }
  }, [formData.province_code, mode, initialData.district_name]);

  useEffect(() => {
    // Khi district_code thay đổi, lấy danh sách xã
    if (formData.district_code) {
      console.log("🏘️ Loading wards for district:", formData.district_code);
      getWards(formData.district_code)
        .then((wardList) => {
          console.log("🏘️ Loaded wards:", wardList.length);
          setWards(wardList);

          // Luôn thử match ward nếu có initialData.ward_name và chưa có formData.ward_code
          if (mode === "edit" && initialData.ward_name && !formData.ward_code) {
            console.log("🏘️ Trying to match ward:", initialData.ward_name);
            const matchedWard = findBestMatch(initialData.ward_name, wardList);

            if (matchedWard) {
              console.log(
                "🔍 Found matching ward:",
                matchedWard.name,
                "->",
                matchedWard.code
              );
              setFormData((prev) => ({
                ...prev,
                ward_code: matchedWard.code,
                ward_name: matchedWard.name,
              }));
            } else {
              console.warn("❌ Could not find ward:", initialData.ward_name);
            }

            // Kết thúc quá trình khởi tạo sau khi thử match ward
            console.log("✅ Initialization completed");
            setIsInitializing(false);
          } else if (mode !== "edit") {
            // Reset ward khi user thay đổi huyện manually (chỉ cho add mode)
            setFormData((prev) => ({
              ...prev,
              ward_code: "",
              ward_name: "",
            }));
          }
        })
        .catch((err) => {
          console.error("Lỗi lấy xã:", err);
          setIsInitializing(false);
        });
    } else {
      setWards([]);
      // Chỉ kết thúc initialization nếu không có district_code và đang trong quá trình init
      if (isInitializing && mode === "edit") {
        console.log("✅ Initialization completed (no district)");
        setIsInitializing(false);
      }
    }
  }, [formData.district_code, mode, initialData.ward_name]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    // Handle checkbox specifically to convert to boolean
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked, // This will be a boolean: true or false
      }));
      validateField(name, checked);
      return;
    }

    if (name === "province_code") {
      const selected = provinces.find((p) => p.code.toString() === value);
      setFormData((prev) => ({
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
      const selected = districts.find((d) => d.code.toString() === value);
      setFormData((prev) => ({
        ...prev,
        district_code: value,
        district_name: selected?.name || "",
        ward_code: "",
        ward_name: "",
      }));
      validateField("district_code", value);
    } else if (name === "ward_code") {
      const selected = wards.find((w) => w.code.toString() === value);
      setFormData((prev) => ({
        ...prev,
        ward_code: value,
        ward_name: selected?.name || "",
      }));
      validateField("ward_code", value);
    } else {
      validateField(name, value);
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Bạn cần đăng nhập để thực hiện thao tác này.");
      return;
    }

    const isValid = validateAll(formData);
    if (!isValid) {
      toast.error("Vui lòng kiểm tra lại các trường bắt buộc.");
      return;
    }

    if (mode === "edit" && !formData.id) {
      console.error("❌ Missing ID in edit mode:", formData);
      toast.error("Không tìm thấy ID địa chỉ để cập nhật!");
      return;
    }

    console.log("🧾 Submit formData:", formData);
    console.log("🧾 Submit mode:", mode);
    console.log("🧾 Submit ID:", formData.id);

    setLoading(true);

    try {
      onSubmit({
        ...formData,
        user_id: user.id,
      });
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
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
        {mode === "edit" && (
          <small className="block text-sm text-gray-500 mt-1">
            ID: {formData.id || "Không có ID"} | Initializing:{" "}
            {isInitializing ? "Yes" : "No"}
          </small>
        )}
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
              <p className="text-sm text-red-500 mt-1">
                {errors.province_code}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Quận / Huyện
            </label>
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
              <p className="text-sm text-red-500 mt-1">
                {errors.district_code}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Phường / Xã
            </label>
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
            className="!px-4 !py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
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
