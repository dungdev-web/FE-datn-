"use client";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../css/checkout.css";
import { District, Province, Ward } from "@/types/Country";

export default function Checkout() {
  const [phone, setPhone] = useState("");
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/?depth=1")
      .then((res) => res.json())
      .then((data) => setProvinces(data));
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      fetch(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
        .then((res) => res.json())
        .then((data) => setDistricts(data.districts));
    } else {
      setDistricts([]);
      setWards([]);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
        .then((res) => res.json())
        .then((data) => setWards(data.wards));
    } else {
      setWards([]);
    }
  }, [selectedDistrict]);

  return (
    <div className="checkout-container px-4 flex flex-col lg:flex-row gap-6">
      {/* LEFT: Thông tin nhận hàng */}
      <div className="checkout-left w-full lg:w-1/2">
        <a href="" className="text-blue-600 font-bold text-xl">TERA Shoes</a>
        <h3 className="text-lg font-semibold mt-4 mb-3">Thông tin nhận hàng</h3>
        <form id="checkout-form" className="space-y-3">
          <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500" />
          <input type="text" placeholder="Họ và tên" className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500" />
          <PhoneInput
            country={"vn"}
            value={phone}
            onChange={setPhone}
            inputClass="!w-full !border !px-4 !py-3 !rounded !border-gray-300 focus:!border-blue-500 focus:!outline-none"
            containerClass="!mb-3"
            placeholder="Số điện thoại"
          />
          <input type="text" placeholder="Địa chỉ (tùy chọn)" className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500" />

          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="w-full px-4 py-3 rounded border border-gray-300"
          >
            <option value="">Chọn tỉnh/thành phố</option>
            {provinces.map((p) => (
              <option key={p.code} value={p.code}>
                {p.name}
              </option>
            ))}
          </select>

          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full px-4 py-3 rounded border border-gray-300"
          >
            <option value="">Chọn quận/huyện</option>
            {districts.map((d) => (
              <option key={d.code} value={d.code}>
                {d.name}
              </option>
            ))}
          </select>

          <select className="w-full px-4 py-3 rounded border border-gray-300">
            <option value="">Chọn phường/xã</option>
            {wards.map((w) => (
              <option key={w.code} value={w.code}>
                {w.name}
              </option>
            ))}
          </select>

          <textarea placeholder="Ghi chú (tùy chọn)" className="w-full px-4 py-3 rounded border border-gray-300"></textarea>
        </form>
      </div>

      {/* EXTRA: Thanh toán */}
      <div className="checkout-extra w-full lg:w-1/4">
        <h3 className="text-lg font-semibold mb-3">Vận chuyển</h3>
        <p className="vanchuyen text-sm mb-4">Vui lòng nhập thông tin giao hàng</p>
        <h3 className="text-lg font-semibold mb-3">Thanh toán</h3>

        <div className="boc1 flex items-center mb-2 gap-2">
          <input type="radio" name="payment" id="payment" />
          <label htmlFor="payment">Chuyển khoản</label>
          <i className="fa-solid fa-money-bill text-blue-600"></i>
        </div>

        <div className="boc1 flex items-center gap-2">
          <input type="radio" name="payment" id="cod" checked readOnly />
          <label htmlFor="cod">Thu hộ (COD)</label>
          <i className="fa-solid fa-money-bill text-blue-600"></i>
        </div>
      </div>

      {/* RIGHT: Đơn hàng */}
      <div className="checkout-right w-full lg:w-1/4">
        <h3 className="text-lg font-semibold mb-3">Đơn hàng (1 sản phẩm)</h3>
        <div className="items max-h-[300px] overflow-y-auto pr-2 space-y-3">
          {[1, 2, 3, 4].map((_, i) => (
            <div className="order-item flex gap-3 items-center" key={i}>
              <img
                src="https://bizweb.dktcdn.net/100/493/370/products/126196-002-650x650-115fc0e823304481a9e282f4c63c4e42-jpeg.jpg?v=1699864029033g"
                alt="Chuck Taylor"
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="text-sm font-medium">Chuck Taylor All Star Classic R</p>
                <span className="text-red-600 text-sm">1.359.000đ</span>
              </div>
            </div>
          ))}
        </div>

        <div className="discound mt-4 flex gap-2">
          <input type="text" placeholder="Nhập mã giảm giá" className="flex-1 px-3 py-2 rounded border border-gray-300" />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Áp dụng</button>
        </div>

        <div className="tinhtien mt-4 space-y-2">
          <div className="tamtinh flex justify-between">
            <p>Tạm tính:</p>
            <span>1.359.000đ</span>
          </div>
          <div className="tamtinh flex justify-between border-b pb-2">
            <p>Phí vận chuyển:</p>
            <span>-</span>
          </div>
        </div>

        <h3 className="py-4 text-lg font-semibold">
          Tổng cộng: <span className="text-red-600">1.359.000đ</span>
        </h3>

        <button id="order-button" className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700">
          ĐẶT HÀNG
        </button>
        <p id="order-status" className="text-green-600 mt-2 hidden">Đặt hàng thành công!</p>
      </div>
    </div>
  );
}
