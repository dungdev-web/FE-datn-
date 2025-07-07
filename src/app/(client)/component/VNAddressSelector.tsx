"use client";
import React, { useState, useEffect } from "react";
import "@/app/(client)/css/form-address.css";
type Province = { code: number; name: string };
type District = { code: number; name: string };
type Ward = { code: number; name: string };

export default function VNAddressSelector() {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [selectedWard, setSelectedWard] = useState<Ward | null>(null);

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/p/")
      .then(res => res.json())
      .then(data => setProvinces(data));
  }, []);

  const handleProvinceSelect = (province: Province) => {
    setSelectedProvince(province);
    setSelectedDistrict(null);
    setSelectedWard(null);
    fetch(`https://provinces.open-api.vn/api/p/${province.code}?depth=2`)
      .then(res => res.json())
      .then(data => setDistricts(data.districts));
  };

  const handleDistrictSelect = (district: District) => {
    setSelectedDistrict(district);
    setSelectedWard(null);
    fetch(`https://provinces.open-api.vn/api/d/${district.code}?depth=2`)
      .then(res => res.json())
      .then(data => setWards(data.wards));
  };

  const handleWardSelect = (ward: Ward) => {
    setSelectedWard(ward);
  };

  return (
    <div className="address-selector">
  <div className="selector-grid">
    {/* Tỉnh/Thành phố */}
    <div>
      <p className="label">Tỉnh/Thành phố</p>
      <div className="list-box">
        {provinces.map((prov) => (
          <div
            key={prov.code}
            onClick={() => handleProvinceSelect(prov)}
            className={`list-item ${
              selectedProvince?.code === prov.code ? "selected" : ""
            }`}
          >
            {prov.name}
          </div>
        ))}
      </div>
    </div>

    {/* Quận/Huyện */}
    <div>
      <p className="label">Quận/Huyện</p>
      <div className="list-box">
        {districts.map((dist) => (
          <div
            key={dist.code}
            onClick={() => handleDistrictSelect(dist)}
            className={`list-item ${
              selectedDistrict?.code === dist.code ? "selected" : ""
            }`}
          >
            {dist.name}
          </div>
        ))}
      </div>
    </div>

    {/* Phường/Xã */}
    <div>
      <p className="label">Phường/Xã</p>
      <div className="list-box">
        {wards.map((ward) => (
          <div
            key={ward.code}
            onClick={() => handleWardSelect(ward)}
            className={`list-item ${
              selectedWard?.code === ward.code ? "selected" : ""
            }`}
          >
            {ward.name}
          </div>
        ))}
      </div>
    </div>
  </div>

  <div className="selected-address">
    <strong>Địa chỉ đã chọn: </strong>
    {selectedProvince?.name} / {selectedDistrict?.name} / {selectedWard?.name}
  </div>
</div>

  );
}
