"use client";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../css/checkout.css";
import { District, Province, Ward } from "@/types/Country";
import { useAuthUser } from "@/hooks/useAuthUser";
import {
  getAddressByUserId,
  getDefaultAddressService,
  updateAddress,
} from "@/services/addressService";
import { Address } from "@/types/address";
import Swal from "sweetalert2";
import { useCart } from "@/hooks/useCart";
import { API_BASE_URL } from "@/config/env";
import { useCoupon } from "@/hooks/useCoupon";
import { useRouter } from "next/navigation";
import { checkoutOrder } from "@/services/cartService";
import { useGlobalStore } from "@/store/useGlobalStore";

export default function Checkout() {
  const [phone, setPhone] = useState("");
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const { user } = useAuthUser();
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [fullName, setFullName] = useState("");
  const [defaultAddress, setDefaultAddress] = useState("");
  const [email, setEmail] = useState("");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );
  const [hasNoAddress, setHasNoAddress] = useState(false);
  const [shippingFee, setShippingFee] = useState(0);
  const [comment, setComment] = useState("");
  const { cart, subtotal } = useCart();
  const router = useRouter();
  const [paymentMethodId, setPaymentMethodId] = useState(1);
  const provinceShippingFees: Record<string, number> = {
    "Hồ Chí Minh": 30000,
    "Hà Nội": 35000,
    "Đà Nẵng": 40000,
    "Bình Dương": 35000,
    "Đồng Nai": 35000,
    "Cần Thơ": 40000,
    "An Giang": 40000,
    "Tiền Giang": 40000,
    "Bến Tre": 40000,
    "Long An": 35000,
    "Vĩnh Long": 40000,
    "Trà Vinh": 40000,
    "Hậu Giang": 40000,
    "Sóc Trăng": 40000,
    "Cà Mau": 45000,
    "Bạc Liêu": 45000,
    "Tây Ninh": 35000,
    "Bình Phước": 40000,
    "Thừa Thiên Huế": 40000,
    "Quảng Nam": 40000,
    "Quảng Ngãi": 40000,
    "Bình Định": 40000,
    "Phú Yên": 40000,
    "Khánh Hòa": 40000,
    "Ninh Thuận": 40000,
    "Bình Thuận": 40000,
    "Lâm Đồng": 40000,
    "Đắk Lắk": 45000,
    "Đắk Nông": 45000,
    "Gia Lai": 45000,
    "Kon Tum": 45000,
    "Hải Phòng": 35000,
    "Bắc Ninh": 35000,
    "Bắc Giang": 35000,
    "Thái Nguyên": 35000,
    "Hưng Yên": 35000,
    "Hải Dương": 35000,
    "Nam Định": 35000,
    "Ninh Bình": 35000,
    "Thanh Hóa": 40000,
    "Nghệ An": 40000,
    "Hà Tĩnh": 40000,
    "Quảng Bình": 40000,
    "Quảng Trị": 40000,
    "Lào Cai": 45000,
    "Yên Bái": 45000,
    "Điện Biên": 45000,
    "Sơn La": 45000,
    "Lai Châu": 45000,
    "Hòa Bình": 40000,
    "Tuyên Quang": 40000,
    "Cao Bằng": 45000,
    "Bắc Kạn": 45000,
    "Hà Giang": 45000,
    "Lạng Sơn": 45000,
  };

  const DEFAULT_SHIPPING_FEE = 50000;
  const FREE_SHIPPING_THRESHOLD = 3000000;

  const normalizeProvinceName = (province: string): string => {
    return province.replace("Thành phố ", "").replace("Tỉnh ", "").trim();
  };

  const getProvinceFromAddress = (address: string): string => {
    const parts = address.split(",");
    const rawProvince = parts[parts.length - 1]?.trim() || "";
    return normalizeProvinceName(rawProvince);
  };
  const { appliedCoupons, applyCoupon, error, getDiscountAmount, resetCoupon } =
    useCoupon(subtotal, cart?.carts_id || "default");

  const [couponInput, setCouponInput] = useState("");
  const discountAmount = getDiscountAmount();
  const {
  setCartCount,
  setWishlistCount,
  setCompareCount,
  setOrderCount,
} = useGlobalStore();

  useEffect(() => {
    if (defaultAddress) {
      const province = getProvinceFromAddress(defaultAddress);
      const baseFee = provinceShippingFees[province] ?? DEFAULT_SHIPPING_FEE;
      const finalShippingFee =
        subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : baseFee;
      setShippingFee(finalShippingFee);
    }
  }, [defaultAddress, subtotal]);

  useEffect(() => {
    if (!user?.id) return;

    const fetchData = async () => {
      try {
        const [addressData, allAddressesRaw] = await Promise.all([
          getDefaultAddressService(user.id),
          getAddressByUserId(user.id),
        ]);

        // Ensure allAddresses is an array of Address
        const allAddresses: Address[] = Array.isArray(allAddressesRaw)
          ? allAddressesRaw
          : [];

        setAddresses(allAddresses);

        if (allAddresses.length === 0) {
          setHasNoAddress(true);
        } else {
          setHasNoAddress(false);

          if (addressData) {
            setFullName(addressData.full_name);
            setPhone(addressData.phone);
            setDefaultAddress(addressData.address_line);
            setEmail(addressData.user?.email || ""); // ✅ Sửa ở đây
            setSelectedAddressId(addressData.ship_address_id);
          } else {
            const first = allAddresses[0];
            setFullName(first.full_name);
            setPhone(first.phone);
            setDefaultAddress(first.address_line);
            setEmail(first.user?.email || "");
            setSelectedAddressId(first.ship_address_id);

            await updateAddress(first.ship_address_id, {
              full_name: first.full_name,
              phone: first.phone,
              address_line: first.address_line,
              is_default: true,
            });

            Swal.fire({
              icon: "success",
              title: "Đã chọn địa chỉ mặc định",
              showConfirmButton: false,
              timer: 1500,
            });

            const updated = await getAddressByUserId(user.id);
            setAddresses(Array.isArray(updated) ? updated : []);
            window.location.href = "/checkout";
          }
        }
      } catch (error) {
        console.error("Không thể lấy địa chỉ:", error);
      }
    };

    fetchData();
  }, [user?.id]);

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

  const handleCheckout = async () => {
    if (!user || !selectedAddressId) {
      Swal.fire({
        icon: "warning",
        title: "Vui lòng đăng nhập và chọn địa chỉ giao hàng",
      });
      return;
    }

    try {
      const payload = {
        user_id: user.id,
        shipping_address_id: selectedAddressId,
        payment_method: { id: paymentMethodId },
        coupon_code: appliedCoupons[0]?.code,
        shipping_fee: shippingFee,
        comment: comment || undefined,
      };
      const response = await checkoutOrder(payload);

      Swal.fire({
        icon: "success",
        title: "Đặt hàng thành công!",
        text: response.message,
      }).then(() => {
         setCartCount(0);
        localStorage.setItem(
          "checkout_shipping_fee",
          JSON.stringify(shippingFee)
        );
        router.push(`/payment_successful?orderId=${response.data.orders_id}`);
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Lỗi khi thanh toán",
        text: error.message || "Vui lòng thử lại.",
      });
    }
  };

  return (
    <div className="checkout-container px-4 flex flex-col lg:flex-row gap-6">
      {/* LEFT: Thông tin nhận hàng */}
      <div className="checkout-left w-full lg:w-1/2">
        <a href="" className="text-blue-600 font-bold text-xl">
          TERA Shoes
        </a>
        <h3 className="text-lg font-semibold mt-4 mb-3">Thông tin nhận hàng</h3>
        {hasNoAddress ? (
          <div className="bg-yellow-100 border text-center border-yellow-400 text-yellow-800 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold ">
              Bạn chưa có địa chỉ giao hàng!
            </strong>
            <p className="mt-1">
              Vui lòng thêm địa chỉ trước khi tiếp tục thanh toán.
            </p>
          </div>
        ) : (
          <form id="checkout-form" className="space-y-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="Họ và tên"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />

            <PhoneInput
              country={"vn"}
              value={phone}
              onChange={setPhone}
              inputClass="!w-full !border !px-4 !py-3 !rounded !border-gray-300 focus:!border-blue-500 focus:!outline-none"
              containerClass="!mb-3"
              placeholder="Số điện thoại"
            />
            <input
              type="text"
              placeholder="Địa chỉ (tùy chọn)"
              value={defaultAddress}
              onChange={(e) => setDefaultAddress(e.target.value)}
              className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            {addresses.length > 0 && (
              <div className="mb-3">
                <label className="block font-medium mb-1">
                  Chọn địa chỉ giao hàng:
                </label>
                <select
                  className="w-full px-4 py-3 rounded border border-gray-300"
                  value={selectedAddressId || ""}
                  onChange={async (e) => {
                    const newId = parseInt(e.target.value);
                    const selected = addresses.find(
                      (addr) => addr.ship_address_id === newId
                    );

                    if (selected) {
                      setSelectedAddressId(newId);
                      setFullName(selected.full_name);
                      setPhone(selected.phone);
                      setDefaultAddress(selected.address_line);

                      if (!selected.is_default) {
                        try {
                          const currentDefault = addresses.find(
                            (addr) => addr.is_default
                          );
                          if (
                            currentDefault &&
                            currentDefault.ship_address_id !== newId
                          ) {
                            await updateAddress(
                              currentDefault.ship_address_id,
                              {
                                full_name: currentDefault.full_name,
                                phone: currentDefault.phone,
                                address_line: currentDefault.address_line,
                                is_default: false,
                              }
                            );
                          }

                          await updateAddress(newId, {
                            full_name: selected.full_name,
                            phone: selected.phone,
                            address_line: selected.address_line,
                            is_default: true,
                          });

                          Swal.fire({
                            icon: "success",
                            title: "Cập nhật địa chỉ mặc định thành công",
                            showConfirmButton: false,
                            timer: 1500,
                          });

                          const updated = await getAddressByUserId(
                            user?.id || 0
                          );
                          setAddresses(Array.isArray(updated) ? updated : []);
                        } catch (error) {
                          Swal.fire({
                            icon: "error",
                            title: "Cập nhật địa chỉ thất bại",
                            text:
                              error instanceof Error
                                ? error.message
                                : "Vui lòng thử lại.",
                          });

                          console.error(error);
                        }
                      }
                    }
                  }}
                >
                  {addresses.map((addr) => (
                    <option
                      key={addr.ship_address_id}
                      value={addr.ship_address_id}
                    >
                      {addr.address_line} {addr.is_default ? "(Mặc định)" : ""}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <textarea
              placeholder="Ghi chú (tùy chọn)"
              className="w-full px-4 py-3 rounded border border-gray-300"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </form>
        )}
        {hasNoAddress && (
          <div className="mt-2 text-center">
            <a
              href="/account/address"
              className="inline-block px-4 py-2 !text-xl !underline  bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Thêm địa chỉ giao hàng
            </a>
          </div>
        )}
      </div>

      {/* EXTRA: Thanh toán */}
      <div className="checkout-extra w-full lg:w-1/4">
        <h3 className="text-lg font-semibold mb-3">Thanh toán</h3>

        <div className="boc1 flex items-center mb-2 gap-2">
          <input
            type="radio"
            name="payment"
            id="bank_transfer"
            value="2"
            checked={paymentMethodId === 2}
            onChange={() => setPaymentMethodId(2)}
          />
          <label htmlFor="bank_transfer">Chuyển khoản</label>
          <i className="fa-solid fa-money-bill text-[#021688]"></i>
        </div>

        <div className="boc1 flex items-center gap-2">
          <input
            type="radio"
            name="payment"
            id="cod"
            value="1"
            checked={paymentMethodId === 1}
            onChange={() => setPaymentMethodId(1)}
          />
          <label htmlFor="cod">Thanh toán khi nhận hàng</label>
          <i className="fa-solid fa-money-bill text-[#021688]"></i>
        </div>
      </div>

      {/* RIGHT: Đơn hàng */}
      <div className="checkout-right w-full lg:w-1/4">
        <h3 className="text-lg font-semibold mb-3">
          Đơn hàng ({cart?.cart_items?.length || 0} sản phẩm)
        </h3>

        <div className="items max-h-[300px] overflow-y-auto pr-2 space-y-3">
          {cart?.cart_items?.map((item) => {
            const price =
              item.variant?.product?.sale_price ??
              item.variant?.product?.price ??
              0;

            return (
              <div
                className="order-item flex gap-3 items-center"
                key={item.cart_items_id}
              >
                <img
                  src={`${API_BASE_URL}/uploads/${item.variant.product.images?.[0]?.url}`}
                  alt={item.variant.product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="text-sm font-medium">
                    {item.variant.product.name} - Size{" "}
                    {item.variant.size.number_size}
                  </p>
                  <span className="text-[#4bd963] text-sm">
                    {price.toLocaleString()}đ × {item.quantity}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="discound mt-4 flex gap-2">
          <input
            type="text"
            placeholder="Nhập mã giảm giá"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
            className="flex-1 px-3 py-2 rounded border border-gray-300"
          />
          <button
            onClick={() => applyCoupon(couponInput)}
            className="button bg-blue-600 text-white px-4 py-2 rounded"
          >
            Áp dụng
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        {appliedCoupons.map((coupon) => (
          <p key={coupon.code} className="text-green-600 mt-1">
            Đã áp dụng mã <strong>{coupon.code}</strong>{" "}
            <button
              className=" ml-2 text-blue-600 underline"
              onClick={() => resetCoupon(coupon.code)}
            >
              Hủy
            </button>
          </p>
        ))}

        <div className="tinhtien mt-4 space-y-2">
          <div className="tamtinh flex justify-between">
            <p>Tạm tính:</p>
            <span>{subtotal.toLocaleString("vi")}đ</span>
          </div>

          <div className="tamtinh flex justify-between">
            <p>Phí vận chuyển:</p>
            <span>
              {shippingFee === 0 ? (
                <span className="text-[#4bd963]">Miễn phí vận chuyển</span>
              ) : (
                `${shippingFee.toLocaleString("vi")}đ`
              )}
            </span>
          </div>

          {discountAmount > 0 && (
            <div className="tamtinh flex justify-between ">
              <p>Giảm giá:</p>
              <span>- {discountAmount.toLocaleString("vi")}đ</span>
            </div>
          )}

          <div className="freeship border-b pb-2">
            {subtotal < FREE_SHIPPING_THRESHOLD && (
              <p className="text-sm text-center mt-2">
                Mua thêm{" "}
                <span className="text-[#4bd963]">
                  {(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString("vi")}đ
                </span>{" "}
                để được miễn phí vận chuyển!
              </p>
            )}
          </div>
        </div>

        <h3 className="py-4 text-lg font-semibold !mt-2">
          Tổng cộng:{" "}
          <span className="text-[#4bd963]">
            {(subtotal + shippingFee - discountAmount).toLocaleString("vi")}đ
          </span>
        </h3>

        <button
          onClick={handleCheckout}
          className="button w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
        >
          ĐẶT HÀNG
        </button>

        <p id="order-status" className="text-green-600 mt-2 hidden">
          Đặt hàng thành công!
        </p>
      </div>
    </div>
  );
}
