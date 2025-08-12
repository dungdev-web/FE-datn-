"use client";
import React, { useEffect, useRef, useState } from "react";
import "../../css/product_add.css";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { API_BASE_URL } from "@/config/env";
import Select from "react-select";
import { Plus, Trash2 } from "lucide-react";
import { values } from "lodash";

export default function Add_pro() {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  const defaultContent = `🔸 Chất lượng Rep 1:1 - Nên mang lên 1 size
so với tiêu chuẩn - Vận chuyển toàn quốc | Kiểm Tra Hàng
Trước Khi Thanh Toán - 100% Ảnh chụp trực tiếp tại Tu Shoes
- Bảo Hành Trọn Đời Sản Phẩm - Đổi Trả 7 Ngày Không Kể Lý Do`;

  /** Khởi tạo Quill editor */
  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Nhập nội dung...",
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            ["link", "image"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["clean"],
          ],
        },
      });
      quillRef.current.root.innerHTML = defaultContent;
    }
  }, []);

  /** Quản lý tab & custom select */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Tab switching
      if (target.classList.contains("tab")) {
        document
          .querySelectorAll(".tab")
          .forEach((t) => t.classList.remove("active"));
        target.classList.add("active");

        const index = Array.from(document.querySelectorAll(".tab")).indexOf(
          target
        );
        document.querySelectorAll(".tab-content").forEach((content, i) => {
          (content as HTMLElement).style.display =
            i === index ? "block" : "none";
        });
      }

      // Toggle custom select
      if (target.closest(".custom-select")) {
        const dropdown = target
          .closest(".custom-select")
          ?.querySelector(".dropdown");
        if (dropdown) dropdown.classList.toggle("show");
      } else {
        document
          .querySelectorAll(".dropdown")
          .forEach((dd) => dd.classList.remove("show"));
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  /** Multi-select danh mục */
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const toggleCategory = (value: string) => {
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  /** Options size */
  const sizeOptions = [
    { value: "30", label: "30" },
    { value: "31", label: "31" },
    { value: "32", label: "32" },
    { value: "33", label: "33" },
    { value: "34", label: "34" },
    { value: "35", label: "35" },
    { value: "36", label: "36" },
    { value: "37", label: "37" },
    { value: "38", label: "38" },
    { value: "39", label: "39" },
    { value: "40", label: "40" },
    { value: "41", label: "41" },
    { value: "42", label: "42" },
    { value: "43", label: "43" },
    { value: "44", label: "44" },
    { value: "45", label: "45" },
  ];

  /** Kiểu dữ liệu biến thể */
  type Variant = {
    color: string;
    image: File | null;
    sizes: string[];
    quantity: number | string;
  };

  /** State biến thể */
  const [variants, setVariants] = useState<Variant[]>([
    { color: "black|Đen", image: null, sizes: [], quantity: "" },
  ]);

  /** Cập nhật biến thể */
  const handleVariantChange = (
    index: number,
    field: keyof Variant,
    value: any
  ) => {
    setVariants((prev) => {
      const newVariants = [...prev];
      newVariants[index] = { ...newVariants[index], [field]: value };
      return newVariants;
    });
  };

  /** Thêm biến thể mới */
  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      { color: "black|Đen", image: null, sizes: [], quantity: "" },
    ]);
  };

  /** Xóa biến thể */
  const removeVariant = (index: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <>
      <div className="header-bar">
        <div className="header-left">
          <button className="btn btn-back">
            <i className="fa-solid fa-arrow-left"></i> Trở về
          </button>
          <button className="btn-add" type="submit" form="add-product-form">
            <i className="fa fa-plus"></i> Thêm sản phẩm
          </button>
        </div>
      </div>

      <div className="tabs">
        <div className="tab active">Thông tin sản phẩm</div>
        <div className="tab">Nhập số lượng sản phẩm</div>
      </div>

      <div className="tab-content" style={{ display: "block" }}>
        <form id="add-product-form" className="add-product-form">
          <div className="form-grid">
            <div>
              <div className="form-group">
                <label htmlFor="ten_sp">Tên sản phẩm *</label>
                <input
                  type="text"
                  id="ten_sp"
                  name="ten_sp"
                  defaultValue="VANS VAULT STYLE 36 BLACK"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="mo_ta">Mô tả *</label>
                <div
                  ref={editorRef}
                  style={{ height: "300px", backgroundColor: "#fff" }}
                />
              </div>
              <label htmlFor=""> Mô tả ngắn</label>
              <textarea
                id="mo_ta_ngan"
                name="mo_ta_ngan"
                rows={3}
                defaultValue="Mô tả ngắn về sản phẩm, ví dụ: Giày VANS VAULT STYLE 36 BLACK là một trong những mẫu giày thể thao hot nhất hiện nay với thiết kế đơn giản nhưng đầy phong cách."
              ></textarea>
            </div>

            <div>
              <div className="form-group">
                <label htmlFor="trang_thai">Trạng thái</label>
                <select id="trang_thai">
                  <option>Mở bán</option>
                  <option>Ngưng bán</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="nhan_hieu">Nhãn hiệu sản phẩm *</label>
                <select id="nhan_hieu" defaultValue="VANZ">
                  <option value="VANZ">VANZ</option>
                  <option value="Nike">Nike</option>
                  <option value="Adidas">Adidas</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="danh_muc">Danh mục sản phẩm *</label>
                <select id="danh_muc" defaultValue="VANZ">
                  <option value="VANZ">VANZ</option>
                  <option value="Nike">Nike</option>
                  <option value="Adidas">Adidas</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="gender">Giới tính *</label>
                <select id="gender" defaultValue="male">
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="gia_goc">
                  Giá bán (VND)
                  <small>
                    (Giá này sẽ được dùng mặc định nếu không nhập giá khuyến
                    mãi)
                  </small>
                </label>
                <input type="number" id="gia_goc" name="gia_goc" />
              </div>

              <div className="form-group">
                <label htmlFor="gia_ban">Giá khuyên mãi (VND)</label>
                <input type="number" id="gia_ban" name="gia_ban" />
              </div>
            </div>
          </div>
        </form>

        <div className="form-group">
          <label>
            Ảnh sản phẩm <small>(Lưu ý: Nền đế nền trắng)</small>
          </label>
          <div className="product-images">
            <div className="image-thumb">
              <img
                src={`${API_BASE_URL}/uploads/ConverseRunStarMotion(1).webp`}
                alt="Ảnh 1"
              />
            </div>
            <div className="image-thumb">
              <img
                src={`${API_BASE_URL}/uploads/ConverseRunStarMotion(2).webp`}
                alt="Ảnh 2"
              />
            </div>
            <div className="image-thumb">
              <img
                src={`${API_BASE_URL}/uploads/ConverseRunStarMotion(3).webp`}
                alt="Ảnh 3"
              />
            </div>
            <div className="image-thumb">
              <img
                src={`${API_BASE_URL}/uploads/ConverseRunStarMotion.webp`}
                alt="Ảnh 4"
              />
            </div>
          </div>
          <label htmlFor="fileInput" className="choose-image-btn">
            Chọn ảnh
          </label>
          <input type="file" id="fileInput" style={{ display: "none" }} />
        </div>
      </div>

      <div
        className="tab-content"
        id="so-luong-tab"
        style={{ display: "none" }}
      >
        <div className="form-group">
          <label>Nhập biến thể sản phẩm (Màu - Size - Giá - Số lượng)</label>

          <div id="variant-list">
            {variants.map((variant, index) => (
              <div
                key={index}
                className="variant-row"
                style={{
                  display: "flex",
                  gap: "10px",
                  marginBottom: "10px",
                  alignItems: "center",
                }}
              >
                {/* Chọn màu */}
                <div className="custom-select-wrapper" style={{ flex: "1" }}>
                  <div className="custom-select">
                    <div className="selected-option">
                      <span
                        className="color-circle"
                        style={{ backgroundColor: "black" }}
                      ></span>
                      <span className="color-name">Đen</span>
                    </div>

                    <div className="dropdown">
                      <input
                        type="text"
                        className="color-search"
                        placeholder="Tìm màu..."
                      />
                      {/* Nhóm màu cơ bản */}
                      <div
                        className="dropdown-option"
                        data-defaultvalue="black|Đen"
                        style={{ "--color": "#000000" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Đen</span>
                      </div>
                      <div
                        className="dropdown-option"
                        data-defaultvalue="white|Trắng"
                        style={{ "--color": "#FFFFFF" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Trắng</span>
                      </div>
                      <div
                        className="dropdown-option"
                        data-defaultvalue="gray|Xám"
                        style={{ "--color": "#808080" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Xám</span>
                      </div>
                      <div
                        className="dropdown-option"
                        data-defaultvalue="lightgray|Xám nhạt"
                        style={{ "--color": "#D3D3D3" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Xám nhạt</span>
                      </div>
                      <div
                        className="dropdown-option"
                        data-defaultvalue="silver|Bạc"
                        style={{ "--color": "#C0C0C0" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Bạc</span>
                      </div>
                      <div
                        className="dropdown-option"
                        data-defaultvalue="dimgray|Xám đậm"
                        style={{ "--color": "#696969" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Xám đậm</span>
                      </div>

                      {/* Nhóm đỏ - hồng */}
                      <div
                        className="dropdown-option"
                        data-defaultvalue="red|Đỏ"
                        style={{ "--color": "#FF0000" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Đỏ</span>
                      </div>
                      <div
                        className="dropdown-option"
                        data-defaultvalue="darkred|Đỏ đậm"
                        style={{ "--color": "#8B0000" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Đỏ đậm</span>
                      </div>
                      <div
                        className="dropdown-option"
                        data-defaultvalue="firebrick|Đỏ gạch"
                        style={{ "--color": "#B22222" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Đỏ gạch</span>
                      </div>
                      <div
                        className="dropdown-option"
                        data-defaultvalue="pink|Hồng"
                        style={{ "--color": "#FFC0CB" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Hồng</span>
                      </div>
                      <div
                        className="dropdown-option"
                        data-defaultvalue="deeppink|Hồng đậm"
                        style={{ "--color": "#FF1493" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Hồng đậm</span>
                      </div>
                      <div
                        className="dropdown-option"
                        data-defaultvalue="hotpink|Hồng nóng"
                        style={{ "--color": "#FF69B4" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Hồng nóng</span>
                      </div>
                      <div
                        className="dropdown-option"
                        data-defaultvalue="lightpink|Hồng nhạt"
                        style={{ "--color": "#FFB6C1" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Hồng nhạt</span>
                      </div>

                      {/* Nhóm cam - vàng */}
                      <div
                        className="dropdown-option"
                        data-defaultvalue="orange|Cam"
                        style={{ "--color": "#FFA500" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Cam</span>
                      </div>
                      <div
                        className="dropdown-option"
                        data-defaultvalue="darkorange|Cam đậm"
                        style={{ "--color": "#FF8C00" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Cam đậm</span>
                      </div>
                      <div
                        className="dropdown-option"
                        data-defaultvalue="coral|San hô"
                        style={{ "--color": "#FF7F50" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">San hô</span>
                      </div>
                      <div
                        className="dropdown-option"
                        data-defaultvalue="tomato|Cà chua"
                        style={{ "--color": "#FF6347" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Cà chua</span>
                      </div>
                      <div
                        className="dropdown-option"
                        data-defaultvalue="yellow|Vàng"
                        style={{ "--color": "#FFFF00" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Vàng</span>
                      </div>
                      <div
                        className="dropdown-option"
                        data-defaultvalue="gold|Vàng kim"
                        style={{ "--color": "#FFD700" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Vàng kim</span>
                      </div>
                      <div
                        className="dropdown-option"
                        data-defaultvalue="khaki|Vàng nhạt"
                        style={{ "--color": "#F0E68C" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Vàng nhạt</span>
                      </div>

                      {/* Nhóm xanh lá */}
                      <div
                        className="dropdown-option"
                        data-defaultvalue="green|Xanh lá"
                        style={{ "--color": "#008000" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Xanh lá</span>
                      </div>
                      <div
                        className="dropdown-option"
                        data-defaultvalue="darkgreen|Xanh lá đậm"
                        style={{ "--color": "#006400" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Xanh lá đậm</span>
                      </div>
                      <div
                        className="dropdown-option"
                        data-defaultvalue="lime|Xanh neon"
                        style={{ "--color": "#00FF00" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Xanh neon</span>
                      </div>
                      <div
                        className="dropdown-option"
                        data-defaultvalue="lightgreen|Xanh lá nhạt"
                        style={{ "--color": "#90EE90" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Xanh lá nhạt</span>
                      </div>
                      <div
                        className="dropdown-option"
                        data-defaultvalue="springgreen|Xanh xuân"
                        style={{ "--color": "#00FF7F" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Xanh xuân</span>
                      </div>
                      <div
                        className="dropdown-option"
                        data-defaultvalue="olive|Xanh oliu"
                        style={{ "--color": "#808000" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Xanh oliu</span>
                      </div>

                      {/* Nhóm xanh dương */}
                      <div
                        className="dropdown-option"
                        data-defaultvalue="blue|Xanh dương"
                        style={{ "--color": "#0000FF" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Xanh dương</span>
                      </div>
                      <div
                        className="dropdown-option"
                        data-defaultvalue="navy|Xanh navy"
                        style={{ "--color": "#000080" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Xanh navy</span>
                      </div>
                      <div
                        className="dropdown-option"
                        data-defaultvalue="skyblue|Xanh da trời"
                        style={{ "--color": "#87CEEB" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Xanh da trời</span>
                      </div>
                      <div
                        className="dropdown-option"
                        data-defaultvalue="deepskyblue|Xanh trời đậm"
                        style={{ "--color": "#00BFFF" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Xanh trời đậm</span>
                      </div>
                      <div
                        className="dropdown-option"
                        data-defaultvalue="royalblue|Xanh hoàng gia"
                        style={{ "--color": "#4169E1" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Xanh hoàng gia</span>
                      </div>
                      <div
                        className="dropdown-option"
                        data-defaultvalue="teal|Xanh ngọc"
                        style={{ "--color": "#008080" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Xanh ngọc</span>
                      </div>
                      <div
                        className="dropdown-option"
                        data-defaultvalue="turquoise|Ngọc lam"
                        style={{ "--color": "#40E0D0" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Ngọc lam</span>
                      </div>

                      {/* Nhóm tím */}
                      <div
                        className="dropdown-option"
                        data-defaultvalue="purple|Tím"
                        style={{ "--color": "#800080" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Tím</span>
                      </div>
                      <div
                        className="dropdown-option"
                        data-defaultvalue="indigo|Chàm"
                        style={{ "--color": "#4B0082" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Chàm</span>
                      </div>
                      <div
                        className="dropdown-option"
                        data-defaultvalue="violet|Tím nhạt"
                        style={{ "--color": "#EE82EE" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Tím nhạt</span>
                      </div>
                      <div
                        className="dropdown-option"
                        data-defaultvalue="plum|Mận"
                        style={{ "--color": "#DDA0DD" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Mận</span>
                      </div>
                      <div
                        className="dropdown-option"
                        data-defaultvalue="orchid|Phong lan"
                        style={{ "--color": "#DA70D6" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Phong lan</span>
                      </div>

                      {/* Nhóm nâu */}
                      <div
                        className="dropdown-option"
                        data-defaultvalue="brown|Nâu"
                        style={{ "--color": "#A52A2A" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Nâu</span>
                      </div>
                      <div
                        className="dropdown-option"
                        data-defaultvalue="saddlebrown|Nâu yên ngựa"
                        style={{ "--color": "#8B4513" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Nâu yên ngựa</span>
                      </div>
                      <div
                        className="dropdown-option"
                        data-defaultvalue="chocolate|Socola"
                        style={{ "--color": "#D2691E" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Socola</span>
                      </div>
                      <div
                        className="dropdown-option"
                        data-defaultvalue="tan|Nâu vàng"
                        style={{ "--color": "#D2B48C" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Nâu vàng</span>
                      </div>
                      <div
                        className="dropdown-option"
                        data-defaultvalue="burlywood|Gỗ sồi"
                        style={{ "--color": "#DEB887" } as React.CSSProperties}
                      >
                        <span className="color-circle"></span>
                        <span className="color-name">Gỗ sồi</span>
                      </div>
                    </div>
                  </div>
                  <input
                    type="hidden"
                    name="color[]"
                    defaultValue={variant.color || "black|Đen"}
                  />
                </div>

                {/* Upload ảnh */}
                <input type="file" style={{ flex: "1" }} />

                <Select<{ value: string; label: string }, true>
                  options={sizeOptions}
                  isMulti
                  value={sizeOptions.filter((opt) =>
                    Array.isArray(variant.sizes)
                      ? variant.sizes.includes(opt.value)
                      : false
                  )}
                  onChange={(selected) => {
                    handleVariantChange(
                      index,
                      "sizes",
                      selected.map((s) => s.value)
                    );
                  }}
                  placeholder="Chọn size"
                />

                {/* Số lượng */}
                <input
                  type="number"
                  name="số lượng[]"
                  placeholder="nhập số lượng sản phẩm..."
                  style={{ flex: "1" }}
                  value={variant.quantity || ""}
                  onChange={(e) => {
                    const updated = [...variants];
                    updated[index].quantity = Number(e.target.value);
                    setVariants(updated);
                  }}
                />
                {/* Thêm biến thể */}
                <button
                  type="button"
                  onClick={addVariant}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <Plus size={20} color="#021688" />
                </button>
                {/* Xóa biến thể */}
                <button
                  type="button"
                  onClick={() => removeVariant(index)}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <Trash2 size={20} color="red" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
