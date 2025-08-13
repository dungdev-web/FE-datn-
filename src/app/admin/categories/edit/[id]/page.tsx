"use client";

import "@/app/admin/css/categories_add_admin.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  updateCategory,
  getCategories,
  getCategoryById,
} from "@/services/categoryService";
import Swal from "sweetalert2";
import { ICategory } from "@/types/ICategory";

export default function CategoryEdit() {
  const router = useRouter();
  const params = useParams();
  const categoryId = Number(params?.id);
  const [updatedAt, setUpdatedAt] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<number>(1);
  const [parentId, setParentId] = useState<number>(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getCategories({ limit: 1000 });
        setCategories(res.data);

        if (categoryId) {
          const category = await getCategoryById(categoryId);
          if (category) {
            setName(category.name);
            setStatus(Number(category.status));
            setCreatedAt(category.created_at || "");
            setUpdatedAt(category.updated_at || "");
            setParentId(category.parent_id || 0);
            if (category.image) {
              setImagePreview(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${category.image}`
              );
            }
          }
        }
      } catch (error) {
        console.error("Lỗi khi load dữ liệu:", error);
      }
    }
    fetchData();
  }, [categoryId]);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
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

    try {
      setLoading(true);

      await updateCategory(categoryId, {
        name,
        parent_id: parentId === 0 ? null : parentId,
        imageFile,
        status,
      });

      Swal.fire({
        icon: "success",
        title: "Thành công",
        text: "Cập nhật danh mục thành công!",
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
        text: error.message || "Lỗi khi cập nhật danh mục",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="category-container">
      <h2>Cập nhật danh mục</h2>

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
              {categories
                .filter((cate) => cate.categories_id !== categoryId) // tránh chọn chính nó
                .map((cate) => (
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
              value={createdAt || "Tự động tạo"}
              readOnly
            />
          </div>

          <div className="form-group readonly">
            <label>Ngày cập nhật</label>
            <input
              type="text"
              className="input-field"
              value={updatedAt || "Tự động cập nhật"}
              readOnly
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Đang cập nhật..." : "Cập nhật"}
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
