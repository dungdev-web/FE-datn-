"use client";

import "@/app/admin/css/brand_add_admin.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addBrand } from "@/services/brandService"; // import service vừa tạo

export default function BrandAdd() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [status, setStatus] = useState("active");
  const [logoUrl, setLogoUrl] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      alert("Vui lòng nhập tên nhãn hiệu");
      return;
    }

    try {
      setLoading(true);

      const slug = name
        .toLowerCase()
        .normalize("NFD") // bỏ dấu tiếng Việt
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

      const payload = {
        name,
        slug,
        logo_url: logoUrl,
        status: status === "active" ? 1 : 0,
      };

      await addBrand(payload);

      alert("Thêm nhãn hiệu thành công!");
      router.push("/admin/brands");
    } catch (error: any) {
      alert(error.message || "Lỗi khi thêm nhãn hiệu");
    } finally {
      setLoading(false);
    }
  }

  // Xử lý upload ảnh (tạm thời chỉ đọc URL local preview)
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
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
              required
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
            {logoUrl && (
              <div style={{ marginTop: "10px" }}>
                <img
                  src={logoUrl}
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
