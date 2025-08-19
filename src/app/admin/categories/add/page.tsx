"use client";

import "@/app/admin/css/categories_add_admin.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addCategory, getCategories } from "@/services/categoryService"; // nhớ import đúng service
import Swal from "sweetalert2";
import { ICategory } from "@/types/ICategory";

export default function CategoryAdd() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [status, setStatus] = useState<number>(1); // 1: hiển thị, 0: ẩn
  const [parentId, setParentId] = useState<number>(0); // mặc định 0
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await getCategories({ limit: 1000 }); // lấy hết category để chọn cha
        setCategories(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    }
    fetchCategories();
  }, []);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) setImagePreview(URL.createObjectURL(file));
    else setImagePreview(null);
  }

 async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  if (!name.trim()) {
    Swal.fire({
      icon: "warning",
      title: "Thiếu thông tin",
      text: "Vui lòng nhập tên danh mục",
    });
    return;
  }

  if (!imageFile) { // ✅ Bắt buộc chọn ảnh
    Swal.fire({
      icon: "warning",
      title: "Thiếu ảnh",
      text: "Vui lòng chọn ảnh danh mục",
    });
    return;
  }

  try {
    setLoading(true);

    const payload = {
      name,
      parent_id: parentId === 0 ? null : parentId,
      imageFile,
      status,
    };

    await addCategory(payload);

    Swal.fire({
      icon: "success",
      title: "Thành công",
      text: "Thêm danh mục thành công!",
      timer: 1500,
      showConfirmButton: false,
    });

    setTimeout(() => {
      router.push("/admin/categories");
    }, 1500);
  } catch (error: any) {
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: error.message || "Lỗi khi thêm danh mục",
    });
  } finally {
    setLoading(false);
  }
}


  return (
    <div className="category-container">
      <h2>Thêm danh mục mới</h2>

      <form className="category-form" onSubmit={handleSubmit}>
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            
            />
          </div>

          <div className="form-group">
            <label htmlFor="category-status">Trạng thái</label>
            <select
              id="category-status"
              className="input-field"
              value={status}
              onChange={(e) => setStatus(Number(e.target.value))}
            >
              <option value={1}>Hiển thị</option>
              <option value={0}>Ẩn</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="category-parent">Danh mục cha</label>
            <select
              id="category-parent"
              className="input-field"
              value={parentId}
              onChange={(e) => setParentId(Number(e.target.value))}
            >
              <option value={0}>-- Không có --</option>
              {categories.map((cate) => (
                <option key={cate.categories_id} value={cate.categories_id}>
                  {cate.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category-image">Ảnh danh mục</label>
            <input
              type="file"
              id="category-image"
              className="input-field"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div style={{ marginTop: "10px" }}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ maxWidth: "150px", borderRadius: "8px" }}
                />
              </div>
            )}
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
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Đang thêm..." : "Thêm"}
          </button>
          <Link
            href={"/admin/categories"}
            className="btn btn-back"
            type="button"
          >
            <i className="fa-solid fa-arrow-left"></i> Trở về
          </Link>
        </div>
      </form>
    </div>
  );
}
