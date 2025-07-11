"use client";
import React, { useState, useEffect } from "react";
import "../css/coupon.css";
import { ICoupon } from "@/types/coupon";
import { getCouponList } from "@/services/couponService";

// Component hiển thị từng coupon
type CouponCardProps = {
  code: string;
  discount: string;
  desc: string;
  onApplyClick: (
    e: React.MouseEvent<HTMLAnchorElement>,
    code: string,
    desc: string
  ) => void;
};

function CouponCard({ code, discount, desc, onApplyClick }: CouponCardProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      alert("Đã sao chép mã: " + code);
    });
  };

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
          <button className="copy-button" onClick={handleCopy}>
            Sao chép mã
          </button>
        </div>
      </div>
      <div className="right-part">PHIẾU GIẢM GIÁ</div>
    </div>
  );
}

// Modal hiển thị khi click "Điều kiện áp dụng"
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
      alert("Đã sao chép mã: " + code);
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

// Component chính
export default function CouponApp() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCode, setSelectedCode] = useState("");
  const [selectedDesc, setSelectedDesc] = useState("");
  const [coupons, setCoupons] = useState<ICoupon[]>([]);
  const [selectedUsageLimit, setSelectedUsageLimit] = useState<number>(1);

  useEffect(() => {
    const fetchDataVoucher = async () => {
      try {
        const data = await getCouponList();
        setCoupons(data);
      } catch (err) {
        console.error("Lỗi khi lấy voucher:", err);
      }
    };
    fetchDataVoucher();
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
