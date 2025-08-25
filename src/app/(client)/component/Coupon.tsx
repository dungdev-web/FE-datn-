"use client";
import React, { useState, useEffect } from "react";
import "../css/coupon.css";
import { ICoupon } from "@/types/coupon";
import { getCouponList, saveUserCoupon } from "@/services/couponService";
import { checkToken } from "@/services/authService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ======================= CouponCard =======================
type CouponCardProps = {
  code: string;
  discount: string;
  desc: string;
  onApplyClick: (
    e: React.MouseEvent<HTMLAnchorElement>,
    code: string,
    desc: string
  ) => void;
  onSaveCoupon: (code: string) => void;
};

function CouponCard({
  code,
  discount,
  desc,
  onApplyClick,
  onSaveCoupon,
}: CouponCardProps) {
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
            Lưu mã
          </button>
        </div>
      </div>
      <div className="right-part">PHIẾU GIẢM GIÁ</div>
    </div>
  );
}

// ======================= Modal =======================
type ModalProps = {
  visible: boolean;
  code: string;
  desc: string;
  usageLimit: number;
  onClose: () => void;
};

function Modal({ visible, code, desc, usageLimit, onClose }: ModalProps) {
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

// ======================= Main Component =======================
export default function CouponApp() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCode, setSelectedCode] = useState("");
  const [selectedDesc, setSelectedDesc] = useState("");
  const [selectedUsageLimit, setSelectedUsageLimit] = useState<number>(1);
  const [coupons, setCoupons] = useState<ICoupon[]>([]);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchDataVoucher = async () => {
      try {
        const data = await getCouponList();
        setCoupons(data);
      } catch (err) {
        console.error("Lỗi khi lấy voucher:", err);
      }
    };

    const fetchUserId = async () => {
      try {
        const tokenData = await checkToken();
        if (tokenData?.user?.id) {
          setUserId(tokenData.user.id);
        }
      } catch (err) {
        console.error("Lỗi khi lấy user từ token:", err);
      }
    };

    fetchDataVoucher();
    fetchUserId();
  }, []);

  const handleApplyClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    code: string,
    desc: string,
    usageLimit: number
  ) => {
    e.preventDefault();
    setSelectedCode(code);
    setSelectedDesc(desc);
    setModalVisible(true);
    setSelectedUsageLimit(usageLimit);
  };

  const handleSaveCoupon = async (code: string) => {
    if (!userId) {
      toast.warning("Vui lòng đăng nhập để lưu mã giảm giá.");
      return;
    }

    const result = await saveUserCoupon(userId, code);

    if (result.error) {
      toast.error(" " + result.error);
    } else {
      toast.success(" " + result.message);
    }
  };

  return (
    <>
      <div className="coupon-section">
        {coupons.map((coupon, index) => (
          <CouponCard
            key={index}
            code={coupon.code}
            discount={
              coupon.discount_type === "percentage"
                ? `Giảm ${parseFloat(coupon.discount_value)}%`
                : `Giảm ${parseInt(coupon.discount_value).toLocaleString(
                    "vi"
                  )}đ`
            }
            desc={`Áp dụng từ ${new Date(
              coupon.start_date
            ).toLocaleDateString()} đến ${new Date(
              coupon.end_date
            ).toLocaleDateString()}`}
            onApplyClick={(e) =>
              handleApplyClick(
                e,
                coupon.code,
                `Áp dụng từ ${new Date(
                  coupon.start_date
                ).toLocaleDateString()} đến ${new Date(
                  coupon.end_date
                ).toLocaleDateString()}`,
                coupon.usage_limit
              )
            }
            onSaveCoupon={handleSaveCoupon}
          />
        ))}
      </div>
      <Modal
        visible={modalVisible}
        code={selectedCode}
        desc={selectedDesc}
        usageLimit={selectedUsageLimit}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}
