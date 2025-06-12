"use client"
import '@/src/app/admin/css/voucher_add_admin.css'
import Link from 'next/link';
export default function VoucherAdd() {
  return (
    <main className="main-content">
      <div className="promotion-container">
        <h2>Tạo mã giảm giá</h2>

        <div className="promotion-actions">
          <Link href={'/admin/voucher'} className="btn btn-back">
            <i className="fa-solid fa-arrow-left"></i> Trở về
          </Link>
          <button className="btn btn-add">
             Tạo mã giảm giá
          </button>
        </div>

        <form className="promotion-form">
          {/* Thông tin chung */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="promo-code">
                Mã code <span className="required">*</span>
              </label>
              <input
                type="text"
                id="promo-code"
                className="input-field"
                placeholder="Nhập mã code"
                required
              />
              <small className="error-message">
                Mã kích hoạt chỉ gồm A-Z, 0-9, dấu gạch ngang (4 - 16 ký tự)
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="promo-name">Tên chương trình</label>
              <input
                type="text"
                id="promo-name"
                className="input-field"
                placeholder="Nhập tên chương trình"
              />
            </div>
          </div>

          {/* Loại giảm giá và mức giảm */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="discount-amount">Khuyến mãi (%)</label>
              <input
                type="number"
                id="discount-amount"
                className="input-field"
                placeholder="Nhập % khuyến mãi"
              />
            </div>
            <div className="form-group">
              <label htmlFor="discount-quantity">Số lượng</label>
              <input
                type="number"
                id="discount-quantity"
                className="input-field"
                placeholder="Nhập mức giảm"
              />
            </div>
          </div>

          {/* Ngày bắt đầu và hết hạn */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="start-date">Ngày bắt đầu</label>
              <input type="date" id="start-date" className="input-field" />
            </div>
            <div className="form-group">
              <label htmlFor="expiry-date">Ngày hết hạn</label>
              <input type="date" id="expiry-date" className="input-field" />
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
