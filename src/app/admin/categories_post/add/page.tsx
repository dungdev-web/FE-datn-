"use client";
import { useState } from "react";
import "@/app/admin/css/categories_add_admin.css";
import Link from "next/link";

export default function CategoryAdd() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  // Hàm tạo slug từ tên
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD") // tách dấu
      .replace(/[\u0300-\u036f]/g, "") // bỏ dấu
      .replace(/[^a-z0-9\s-]/g, "") // bỏ ký tự đặc biệt
      .trim()
      .replace(/\s+/g, "-"); // thay khoảng trắng thành dấu '-'
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    setSlug(generateSlug(val));
  };

  return (
    <div className="category-container">
      <h2>Thêm danh mục bài viết mới</h2>

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
              value={name}
              onChange={handleNameChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category-status">Danh mục con</label>
            <select id="category-status" className="input-field">
              <option value="active">Hiển thị</option>
              <option value="inactive">Ẩn</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category-slug">Slug</label>
            <input
              type="text"
              id="category-slug"
              className="input-field"
              placeholder="Ví dụ: tin-tuc"
              value={slug}
              onChange={(e) => setSlug(e.target.value)} 
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
          <Link href={"/admin/categories"} className="btn btn-back" type="button">
            <i className="fa-solid fa-arrow-left"></i> Trở về
          </Link>
        </div>
      </form>
    </div>
  );
}
