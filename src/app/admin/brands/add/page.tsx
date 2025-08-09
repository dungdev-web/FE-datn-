"use client";

import "@/app/admin/css/brand_add_admin.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addBrand } from "@/services/brandService";
import Swal from "sweetalert2"; // import SweetAlert2

export default function BrandAdd() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [status, setStatus] = useState("active");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Thiếu thông tin",
        text: "Vui lòng nhập tên nhãn hiệu",
      });
      return;
    }

    if (!logoFile) {
      Swal.fire({
        icon: "warning",
        title: "Thiếu ảnh",
        text: "Vui lòng chọn ảnh nhãn hiệu",
      });
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name,
        status: status === "active" ? 1 : 0,
        logo_url: logoFile!, // gửi File thay vì base64
      };
      await addBrand(payload);

      Swal.fire({
        icon: "success",
        title: "Thành công",
        text: "Thêm nhãn hiệu thành công!",
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => {
        router.push("/admin/brands");
      }, 1500);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: error.message || "Lỗi khi thêm nhãn hiệu",
      });
    } finally {
      setLoading(false);
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  }

  return (
    <div className="brand-container">
      <h2>Thêm nhãn hiệu mới</h2>

      <form className="brand-form" onSubmit={handleSubmit}>
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
              value={name}
              onChange={(e) => setName(e.target.value)}
       
            />
          </div>

          <div className="form-group">
            <label htmlFor="brand-status">Trạng thái</label>
            <select
              id="brand-status"
              className="input-field"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
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
              onChange={handleImageChange}
            />
            {logoPreview && (
              <div style={{ marginTop: "10px" }}>
                <img
                  src={logoPreview}
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
          <Link href={"/admin/brands"} type="button" className="btn btn-back">
            <i className="fa-solid fa-arrow-left"></i> Trở về
          </Link>
        </div>
      </form>
    </div>
  );
}
