"use client";
import "../css/brand_add_admin.css";
import Link from "next/link";
export default function BrandAdd() {
  return (
    <main className="main-content">
      <div className="brand-container">
        <h2>Thêm nhãn hiệu mới</h2>

        <form className="brand-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="brand-name">
                Tên nhãn hiệu <span className="required">*</span>
              </label>
              <input
                type="text"
                id="brand-name"
                className="input-field"
                placeholder="Nhập tên nhãn hiệu"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="brand-status">Trạng thái</label>
              <select id="brand-status" className="input-field">
                <option value="active">Hiển thị</option>
                <option value="inactive">Ẩn</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="brand-image">Ảnh nhãn hiệu</label>
              <input
                type="file"
                id="brand-image"
                className="input-field"
                accept="image/*"
              />
            </div>

            <div className="form-group readonly">
              <label>Ngày tạo</label>
              <input
                type="text"
                className="input-field"
                value="Tự động tạo"
                readOnly
              />
            </div>

            <div className="form-group readonly">
              <label>Ngày cập nhật</label>
              <input
                type="text"
                className="input-field"
                value="Tự động cập nhật"
                readOnly
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Thêm
            </button>
            <Link href={"/admin/brands"} type="button" className="btn btn-back">
              <i className="fa-solid fa-arrow-left"></i> Trở về
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
