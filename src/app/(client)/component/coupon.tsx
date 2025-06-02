

import React, { useState } from 'react';
import '../css/coupon.css'; // Đảm bảo bạn đã có file CSS tương ứng trong public hoặc styles

type Coupon = {
  code: string;
  discount: string;
  desc: string;
};

const coupons: Coupon[] = [
  { code: 'FISHOES', discount: 'Giảm 10%', desc: 'Mã giảm 10% khi mua 1 sản phẩm' },
  { code: 'FISHOES2', discount: 'Giảm 13%', desc: 'Mã giảm 13% khi mua 2 sản phẩm' },
  { code: 'FISHOES3', discount: 'Giảm 18%', desc: 'Mã giảm 18% khi mua 3 sản phẩm' },
  { code: 'FISHOES4', discount: 'Giảm 20%', desc: 'Mã giảm 20% khi mua 4 sản phẩm' }
];

type CouponCardProps = Coupon & {
  onApplyClick: (e: React.MouseEvent<HTMLAnchorElement>, code: string, desc: string) => void;
};

function CouponCard({ code, discount, desc, onApplyClick }: CouponCardProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      alert('Đã sao chép mã: ' + code);
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
          <a className="apply-link" onClick={(e) => onApplyClick(e, code, desc)}>
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

type ModalProps = {
  visible: boolean;
  code: string;
  desc: string;
  onClose: () => void;
};

function Modal({ visible, code, desc, onClose }: ModalProps) {
  if (!visible) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      alert('Đã sao chép mã: ' + code);
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-coupon">
        <h2>
          Mã : <span style={{ color: '#ff4500' }}>{code}</span>
        </h2>
        <p>
          <strong>Mã khuyến mãi:</strong> {code}
        </p>
        <p>
          <strong>Điều kiện:</strong>
        </p>
        <p>{desc} - Mỗi khách hàng được sử dụng tối đa 1 lần - Số lượng voucher có hạn</p>
        <div style={{ textAlign: 'right', marginTop: '15px' }}>
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

export default function CouponApp() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCode, setSelectedCode] = useState('');
  const [selectedDesc, setSelectedDesc] = useState('');

const handleApplyClick = (e: React.MouseEvent<HTMLAnchorElement>, code: string, desc: string) => {
  e.preventDefault();
  console.log('Click mã:', code);
  setSelectedCode(code);
  setSelectedDesc(desc);
  setModalVisible(true);
};


  return (
    <>
      <div className="coupon-section">
        {coupons.map((coupon, index) => (
          <CouponCard
            key={index}
            code={coupon.code}
            discount={coupon.discount}
            desc={coupon.desc}
            onApplyClick={handleApplyClick}
          />
        ))}
      </div>
      <Modal
        visible={modalVisible}
        code={selectedCode}
        desc={selectedDesc}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}
