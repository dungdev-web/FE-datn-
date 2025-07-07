"use client";
import "@/app/admin/css/categories_add_admin.css";
import Link from "next/link";
export default function CategoryAdd() {
  return (
      <div className="category-container">


        <h2>Thêm danh mục mới</h2>

        <form className="category-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category-name">
                Tên danh mục <span className="required">*</span>
              </label>
              <input
                type="text"
                id="category-name"
                className="input-field"
                placeholder="Nhập tên danh mục"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category-status">Trạng thái</label>
              <select id="category-status" className="input-field">
                <option value="active">Hiển thị</option>
                <option value="inactive">Ẩn</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category-order">Thứ tự hiển thị</label>
              <input
                type="number"
                id="category-order"
                className="input-field"
                placeholder="Ví dụ: 1, 2, 3..."
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
              <Link href={'/admin/categories'} type="button" className="btn btn-back">
              <i className="fa-solid fa-arrow-left"></i> Trở về
            </Link>
          </div>
        </form>
      </div>

  );
}
