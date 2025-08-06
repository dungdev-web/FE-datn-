"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getSavedUserCoupons, saveUserCoupon } from "@/services/couponService";
import { checkToken } from "@/services/authService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ICoupon } from "@/types/coupon";
import AccountSidebar from "../../component/Account/AccountSidebar";
import { useGlobalStore } from "@/store/useGlobalStore"; // ✅ Import thêm
import "../../css/account.css";
import { useAuthUser } from "@/hooks/useAuthUser";


// ======================= CouponCard =======================
function CouponCard({
  code,
  discount,
  desc,
  onApplyClick,
  onSaveCoupon,
}: {
  code: string;
  discount: string;
  desc: string;
  onApplyClick: (
    e: React.MouseEvent<HTMLAnchorElement>,
    code: string,
    desc: string
  ) => void;
  onSaveCoupon: (code: string) => void;
}) {
  return (
    <div className="coupon">
      <div className="left-part">
        <div className="code">Mã: {code}</div>
        <div className="discount-box">
          <div className="title">MÃ GIẢM</div>
          <div className="percent">{discount}</div>
        </div>
        <div className="desc">{desc}</div>
        <div className="action-row">
          <a
            className="apply-link"
            onClick={(e) => onApplyClick(e, code, desc)}
          >
            Điều kiện áp dụng
          </a>
          <button className="copy-button" onClick={() => onSaveCoupon(code)}>
            Đã lưu
          </button>
        </div>
      </div>
      <div className="right-part">PHIẾU GIẢM GIÁ</div>
    </div>
  );
}

// ======================= Modal =======================
function Modal({
  visible,
  code,
  desc,
  usageLimit,
  onClose,
}: {
  visible: boolean;
  code: string;
  desc: string;
  usageLimit: number;
  onClose: () => void;
}) {
  if (!visible) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      toast.success("Đã sao chép mã: " + code);
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-coupon">
        <h2>
          Mã : <span style={{ color: "#ff4500" }}>{code}</span>
        </h2>
        <p>
          <strong>Mã khuyến mãi:</strong> {code}
        </p>
        <p>
          <strong>Điều kiện:</strong>
        </p>
        <p>
          {desc} - Mỗi khách hàng được sử dụng tối đa {usageLimit} lần - Số
          lượng voucher có hạn
        </p>
        <div style={{ textAlign: "right", marginTop: "15px" }}>
          <button onClick={handleCopy} className="modal-btn copy">
            Sao chép mã
          </button>
          <button onClick={onClose} className="modal-btn close">
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

// ======================= MyVoucher =======================
export default function MyVoucher() {
  const [coupons, setCoupons] = useState<ICoupon[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
const { user } = useAuthUser();
  const setVoucherCount = useGlobalStore((state) => state.setVoucherCount); // ✅ dùng store

  // Modal states
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCode, setSelectedCode] = useState("");
  const [selectedDesc, setSelectedDesc] = useState("");
  const [selectedUsageLimit, setSelectedUsageLimit] = useState<number>(1);

  useEffect(() => {
    const fetchUserAndCoupons = async () => {
      try {
        const tokenData = await checkToken();
        if (tokenData?.user?.id) {
          const uid = tokenData.user.id;
          setUserId(uid);

          const savedCoupons = await getSavedUserCoupons(uid);
          setCoupons(savedCoupons);
          setVoucherCount(savedCoupons.length); // ✅ cập nhật voucherCount vào store
        }
      } catch (error) {
        console.error("Lỗi khi lấy user ID hoặc mã đã lưu:", error);
      }
    };

    fetchUserAndCoupons();
  }, [setVoucherCount]);

  const handleSaveCoupon = async (code: string) => {
    if (!userId) {
      toast.warning("⚠️ Vui lòng đăng nhập để lưu mã giảm giá.");
      return;
    }

    const result = await saveUserCoupon(userId, code);

    if (result.error) {
      toast.error("❌ " + result.error);
    } else {
      toast.success("✅ " + result.message);
    }
  };

  const handleApplyClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    code: string,
    desc: string
  ) => {
    e.preventDefault();
    setSelectedCode(code);
    setSelectedDesc(desc);
    const coupon = coupons.find((c) => c.code === code);
    setSelectedUsageLimit(coupon?.usage_limit || 1);
    setModalVisible(true);
  };

  return (
    <>
      {/* Breadcrumb */}
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
            <h2>Phiếu giảm giá</h2>
          </div>
          <ul className="breadcrumb">
            <li className="home">
              <Link href={"/"}>
                <span>Trang chủ</span>
              </Link>
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </li>
            <li className="home">
              <Link href={"/account"}>
                <span>Tài khoản</span>
              </Link>
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </li>
            <li>
              <strong>
                <span>Phiếu giảm giá</span>
              </strong>
            </li>
          </ul>
        </div>
      </section>

      {/* Main Content */}
      <main>
        <div className="container1">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-lg-3 col-left-ac">
              <AccountSidebar user={user} />
            </div>
            <div className="col-xs-12 col-sm-12 col-lg-9">
              <div className="coupon-section">
                {coupons.length > 0 ? (
                  coupons.map((coupon, index) => (
                    <CouponCard
                      key={index}
                      code={coupon.code}
                      discount={
                        coupon.discount_type === "percentage"
                          ? `Giảm ${parseFloat(coupon.discount_value)}%`
                          : `Giảm ${parseInt(
                              coupon.discount_value
                            ).toLocaleString("vi")}đ`
                      }
                      desc={`Áp dụng từ ${new Date(
                        coupon.start_date
                      ).toLocaleDateString()} đến ${new Date(
                        coupon.end_date
                      ).toLocaleDateString()}`}
                      onApplyClick={handleApplyClick}
                      onSaveCoupon={handleSaveCoupon}
                    />
                  ))
                ) : (
                  <p>Không có phiếu giảm giá nào.</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <Modal
          visible={modalVisible}
          code={selectedCode}
          desc={selectedDesc}
          usageLimit={selectedUsageLimit}
          onClose={() => setModalVisible(false)}
        />
        <ToastContainer position="top-right" autoClose={3000} />
      </main>
    </>
  );
}
