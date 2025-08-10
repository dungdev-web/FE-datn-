"use client";
import "@/app/admin/css/brand_add_admin.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { getBrandById, updateBrand } from "@/services/brandService";
import { API_BASE_URL } from "@/config/env";

export default function BrandEdit() {
  const { id } = useParams(); // Lấy ID từ URL
  const router = useRouter();
  const [name, setName] = useState("");
  const [status, setStatus] = useState(1);
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null); // thêm state preview

  useEffect(() => {
    if (!id) return;
    const fetchBrand = async () => {
      const brand = await getBrandById(Number(id));
      if (brand) {
        setName(brand.name || "");
        setStatus(brand.status ?? 1);
        setCreatedAt(brand.created_at || "");
        setUpdatedAt(brand.updated_at || "");
        if (brand.logo_url) {
          setLogoPreview(`${API_BASE_URL}/uploads/${brand.logo_url}`);
        }
      }
    };
    fetchBrand();
  }, [id]);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file)); // preview ảnh mới chọn
    }
  }
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const numericId = Number(id);
  if (!numericId) {
    Swal.fire({ icon: "error", text: "Không tìm thấy ID thương hiệu" });
    return;
  }

  try {
    await updateBrand(numericId, {
      name,
      status,
      ...(logoFile && { logo_url: logoFile }), // chỉ gửi khi có file mới
    });

    Swal.fire({
      icon: "success",
      title: "Thành công",
      text: "Cập nhật thương hiệu thành công!",
      confirmButtonText: "OK",
    }).then(() => {
      router.push("/admin/brands");
    });
  } catch (error: any) {
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: error.message || "Cập nhật thất bại!",
    });
  }
};


  return (
    <div className="brand-container">
      <h2>Chỉnh sửa nhãn hiệu</h2>

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
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên nhãn hiệu"
            />
          </div>

          <div className="form-group">
            <label htmlFor="brand-status">Trạng thái</label>
            <select
              id="brand-status"
              className="input-field"
              value={status}
              onChange={(e) => setStatus(Number(e.target.value))}
            >
              <option value={1}>Hiển thị</option>
              <option value={0}>Ẩn</option>
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
          <button type="submit" className="submit-btn">
            Cập nhật
          </button>
          <Link href={"/admin/brands"} type="button" className="btn btn-back">
            <i className="fa-solid fa-arrow-left"></i> Trở về
          </Link>
        </div>
      </form>
    </div>
  );
}
