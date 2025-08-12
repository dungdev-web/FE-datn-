"use client";
import React, { useEffect, useRef, useState } from "react";
import "../../css/product_add.css";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { API_BASE_URL } from "@/config/env";
import Select from "react-select";
import { Plus, Trash2 } from "lucide-react";
import { values } from "lodash";
import { addProduct, getGenders, getSizes } from "@/services/productService";
import { IGender, ISize } from "@/types/product";
import { IBrand } from "@/types/IBrand";
import { ICategory } from "@/types/ICategory";
import { getAllBrands } from "@/services/brandService";
import { getAllCategories } from "@/services/categoryService";
import Swal from "sweetalert2";
export default function Add_pro() {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const [sizes, setSizes] = useState<ISize[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [genders, setGenders] = useState<IGender[]>([]);
  const [mainImages, setMainImages] = useState<File[]>([]);
  const [variantImages, setVariantImages] = useState<Record<string, File>>({});

  // chọn ảnh chính
  const handleMainImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMainImages(Array.from(e.target.files));
    }
  };
  const handleVariantImageChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const originalFile = e.target.files[0];
      const colorFull = variants[index].color; // ví dụ: "white|Trắng"
      const colorCode = colorFull.split("|")[0]; // ví dụ: "white"

      // Tìm mã màu hex trong mảng colors, bỏ dấu # và viết hoa
      const colorObj = colors.find((c) => c.value.startsWith(colorCode + "|"));
      const hex = colorObj
        ? colorObj.hex.replace("#", "").toUpperCase()
        : "000000";

      // Lấy đuôi file gốc
      const ext = originalFile.name.split(".").pop();

      // Tạo tên file mới theo chuẩn
      const newFileName = `${Date.now()}-variant_image_${hex}.${ext}`;

      // Tạo file mới với tên mới
      const newFile = new File([originalFile], newFileName, {
        type: originalFile.type,
      });

      // Lưu file mới vào state với key là mã hex
      setVariantImages((prev) => ({
        ...prev,
        [hex]: newFile,
      }));

      // Cập nhật biến thể nếu cần (cái này bạn đã có)
      handleVariantChange(index, "image", newFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = (
      document.getElementById("ten_sp") as HTMLInputElement
    ).value.trim();
    const short_desc = (
      document.getElementById("mo_ta_ngan") as HTMLTextAreaElement
    ).value.trim();
    const description = quillRef.current?.root.innerHTML || "";
    const priceInput = (
      document.getElementById("gia_goc") as HTMLInputElement
    ).value.trim();
    const salePriceInput = (
      document.getElementById("gia_ban") as HTMLInputElement
    ).value.trim();
    const categories_id = Number(
      (document.getElementById("danh_muc") as HTMLSelectElement).value
    );
    const brand_id = Number(
      (document.getElementById("nhan_hieu") as HTMLSelectElement).value
    );
    const gender_id = Number(
      (document.getElementById("gender") as HTMLSelectElement).value
    );
    const statusText = (
      document.getElementById("trang_thai") as HTMLSelectElement
    ).value;
    const status = statusText === "Mở bán" ? 1 : 0;

    // Check required fields
    if (!name) {
      Swal.fire("Lỗi", "Tên sản phẩm không được để trống", "error");
      return;
    }
    if (!short_desc) {
      Swal.fire("Lỗi", "Mô tả ngắn không được để trống", "error");
      return;
    }
    if (!priceInput || isNaN(Number(priceInput))) {
      Swal.fire("Lỗi", "Giá gốc không hợp lệ", "error");
      return;
    }
    if (!salePriceInput || isNaN(Number(salePriceInput))) {
      Swal.fire("Lỗi", "Giá bán không hợp lệ", "error");
      return;
    }
    const price = Number(priceInput);
    const sale_price = Number(salePriceInput);
    if (sale_price > price) {
      Swal.fire("Lỗi", "Giá bán phải nhỏ hơn hoặc bằng giá gốc", "error");
      return;
    }

    if (!categories_id) {
      Swal.fire("Lỗi", "Vui lòng chọn danh mục sản phẩm", "error");
      return;
    }
    if (!brand_id) {
      Swal.fire("Lỗi", "Vui lòng chọn nhãn hiệu", "error");
      return;
    }
    if (!gender_id) {
      Swal.fire("Lỗi", "Vui lòng chọn giới tính sản phẩm", "error");
      return;
    }
    if (mainImages.length === 0) {
      Swal.fire("Lỗi", "Phải có ít nhất 1 ảnh chính của sản phẩm", "error");
      return;
    }

    for (let i = 0; i < variants.length; i++) {
      const v = variants[i];

      // Lấy code màu text (ví dụ "gold")
      const colorCode = v.color.split("|")[0];

      // Tìm mã hex tương ứng từ mảng colors
      const colorObj = colors.find((c) => c.value.startsWith(colorCode + "|"));

      // Nếu tìm thấy thì lấy mã hex (loại bỏ # và viết hoa), nếu không thì fallback colorCode
      const hexColor = colorObj
        ? colorObj.hex.replace("#", "").toUpperCase()
        : colorCode;

      // Kiểm tra xem ảnh biến thể có tồn tại không với key là mã hex
      if (!variantImages[hexColor]) {
        Swal.fire(
          "Lỗi",
          `Biến thể màu ${colorCode}: Chưa chọn ảnh biến thể`,
          "error"
        );
        return;
      }
    }

    // Nếu qua hết kiểm tra, gọi API
    try {
      const product_variants = variants.flatMap((v) => {
        const [code_color, name_color] = v.color.split("|");
        const colorObj = colors.find((c) =>
          c.value.startsWith(code_color + "|")
        );
        const hexColor = colorObj
          ? colorObj.hex.replace("#", "").toUpperCase()
          : code_color;

        return v.sizes.map((size_id) => ({
          code_color: hexColor,
          name_color,
          size_id: Number(size_id),
          stock_quantity: Number(v.quantity),
        }));
      });

      await addProduct({
        name,
        description,
        short_desc,
        price,
        sale_price,
        categories_id,
        brand_id,
        gender_id,
        status,
        product_variants,
        images: mainImages,
        variantImages,
      });

      Swal.fire("Thành công", "Thêm sản phẩm thành công!", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Lỗi", "Có lỗi khi thêm sản phẩm", "error");
    }
  };

  const defaultContent = ``;

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
  useEffect(() => {
    getSizes()
      .then((res) => {
        setSizes(Array.isArray(res) ? res : res.data || []);
      })
      .catch(console.error);
  }, []);

  const sizeOptions = sizes.map((s) => ({
    value: String(s.id),
    label: s.number_size,
  }));

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
  const colors = [
    { value: "black|Đen", hex: "#000000" },
    { value: "white|Trắng", hex: "#FFFFFF" },
    { value: "red|Đỏ", hex: "#FF0000" },
    { value: "blue|Xanh dương", hex: "#0000FF" },
    { value: "green|Xanh lá", hex: "#008000" },
    { value: "yellow|Vàng", hex: "#FFFF00" },
    { value: "purple|Tím", hex: "#800080" },
    { value: "pink|Hồng", hex: "#FFC0CB" },
    { value: "orange|Cam", hex: "#FFA500" },
    { value: "brown|Nâu", hex: "#8B4513" },
    { value: "gray|Xám", hex: "#808080" },
    { value: "silver|Bạc", hex: "#C0C0C0" },
    { value: "gold|Vàng ánh kim", hex: "#FFD700" },
    { value: "beige|Be", hex: "#F5F5DC" },
    { value: "navy|Xanh navy", hex: "#000080" },
    { value: "teal|Xanh teal", hex: "#008080" },
    { value: "cyan|Xanh cyan", hex: "#00FFFF" },
    { value: "magenta|Hồng magenta", hex: "#FF00FF" },
    { value: "lime|Xanh chanh", hex: "#00FF00" },
    { value: "maroon|Nâu đỏ", hex: "#800000" },
    { value: "olive|Xanh olive", hex: "#808000" },
    { value: "coral|San hô", hex: "#FF7F50" },
    { value: "turquoise|Ngọc lam", hex: "#40E0D0" },
    { value: "indigo|Chàm", hex: "#4B0082" },
    { value: "violet|Tím violet", hex: "#EE82EE" },
    { value: "khaki|Kaki", hex: "#F0E68C" },
    { value: "plum|Mận", hex: "#DDA0DD" },
    { value: "orchid|Lan tím", hex: "#DA70D6" },
    { value: "salmon|Cá hồi", hex: "#FA8072" },
    { value: "chocolate|Sô-cô-la", hex: "#D2691E" },
    { value: "tan|Da bò", hex: "#D2B48C" },
    { value: "skyblue|Xanh da trời", hex: "#87CEEB" },
    { value: "royalblue|Xanh hoàng gia", hex: "#4169E1" },
    { value: "seagreen|Xanh lá biển", hex: "#2E8B57" },
    { value: "forestgreen|Xanh rừng", hex: "#228B22" },
    { value: "lightgreen|Xanh lá nhạt", hex: "#90EE90" },
    { value: "lightblue|Xanh nhạt", hex: "#ADD8E6" },
    { value: "darkblue|Xanh đậm", hex: "#00008B" },
    { value: "darkred|Đỏ đậm", hex: "#8B0000" },
    { value: "darkgreen|Xanh đậm", hex: "#006400" },
    { value: "darkorange|Cam đậm", hex: "#FF8C00" },
    { value: "crimson|Đỏ thẫm", hex: "#DC143C" },
    { value: "firebrick|Gạch đỏ", hex: "#B22222" },
    { value: "lavender|Oải hương", hex: "#E6E6FA" },
    { value: "mint|Bạc hà", hex: "#98FF98" },
    { value: "peach|Đào", hex: "#FFE5B4" },
    { value: "apricot|Mơ", hex: "#FBCEB1" },
    { value: "amber|Hổ phách", hex: "#FFBF00" },
    { value: "aqua|Xanh nước", hex: "#00FFFF" },
    { value: "azure|Xanh da trời nhạt", hex: "#F0FFFF" },
    { value: "burgundy|Rượu vang", hex: "#800020" },
    { value: "charcoal|Xám than", hex: "#36454F" },
    { value: "copper|Đồng", hex: "#B87333" },
    { value: "cream|Kem", hex: "#FFFDD0" },
    { value: "fuchsia|Hồng fuchsia", hex: "#FF00FF" },
    { value: "honeydew|Sương mật", hex: "#F0FFF0" },
    { value: "ivory|Ngà", hex: "#FFFFF0" },
    { value: "jade|Ngọc bích", hex: "#00A86B" },
    { value: "lemon|Vàng chanh", hex: "#FFF44F" },
    { value: "mustard|Vàng mù tạt", hex: "#FFDB58" },
    { value: "pearl|Ngọc trai", hex: "#EAE0C8" },
    { value: "rose|Hồng rose", hex: "#FF007F" },
    { value: "ruby|Hồng ngọc", hex: "#E0115F" },
    { value: "sapphire|Lam ngọc", hex: "#0F52BA" },
    { value: "scarlet|Đỏ tươi", hex: "#FF2400" },
    { value: "seafoam|Bọt biển", hex: "#9FE2BF" },
    { value: "slate|Đá phiến", hex: "#708090" },
    { value: "snow|Tuyết", hex: "#FFFAFA" },
    { value: "steelblue|Xanh thép", hex: "#4682B4" },
    { value: "sunset|Hoàng hôn", hex: "#FD5E53" },
    { value: "tomato|Cà chua", hex: "#FF6347" },
    { value: "wheat|Lúa mì", hex: "#F5DEB3" },
    { value: "amethyst|Thạch anh tím", hex: "#9966CC" },
    { value: "antiqueWhite|Trắng cổ", hex: "#FAEBD7" },
    { value: "bisque|Màu sứ", hex: "#FFE4C4" },
    { value: "blanchedAlmond|Hạnh nhân", hex: "#FFEBCD" },
    { value: "cadetBlue|Xanh cadet", hex: "#5F9EA0" },
    { value: "chartreuse|Vàng lục", hex: "#7FFF00" },
    { value: "darkCyan|Xanh cyan đậm", hex: "#008B8B" },
    { value: "darkGoldenRod|Vàng gỗ đậm", hex: "#B8860B" },
    { value: "darkKhaki|Kaki đậm", hex: "#BDB76B" },
    { value: "darkMagenta|Tím đậm", hex: "#8B008B" },
    { value: "darkOliveGreen|Xanh olive đậm", hex: "#556B2F" },
    { value: "darkOrchid|Lan tím đậm", hex: "#9932CC" },
    { value: "darkSalmon|Cá hồi đậm", hex: "#E9967A" },
    { value: "darkSeaGreen|Xanh biển đậm", hex: "#8FBC8F" },
    { value: "darkSlateBlue|Xanh đá phiến đậm", hex: "#483D8B" },
    { value: "darkSlateGray|Xám đá đậm", hex: "#2F4F4F" },
    { value: "deepPink|Hồng đậm", hex: "#FF1493" },
    { value: "deepSkyBlue|Xanh trời đậm", hex: "#00BFFF" },
    { value: "dodgerBlue|Xanh dodger", hex: "#1E90FF" },
    { value: "floralWhite|Trắng hoa", hex: "#FFFAF0" },
    { value: "gainsboro|Xám gainsboro", hex: "#DCDCDC" },
    { value: "ghostWhite|Trắng ma", hex: "#F8F8FF" },
    { value: "greenYellow|Xanh vàng", hex: "#ADFF2F" },
    { value: "hotPink|Hồng nóng", hex: "#FF69B4" },
    { value: "lightCoral|San hô nhạt", hex: "#F08080" },
    { value: "lightCyan|Xanh cyan nhạt", hex: "#E0FFFF" },
  ];

  // Hàm chọn màu
  const handleColorSelect = (index: number, colorValue: string) => {
    handleVariantChange(index, "color", colorValue);
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const [brandData, categoryData, genderData] = await Promise.all([
          getAllBrands(),
          getAllCategories(),
          getGenders(),
        ]);
        setBrands(brandData);
        setCategories(categoryData);
        setGenders(genderData.data); // gender trả về { data: IGender[] }
      } catch (error) {
        console.error("Lỗi tải dữ liệu:", error);
      }
    }
    fetchData();
  }, []);
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
        <form
          id="add-product-form"
          onSubmit={handleSubmit}
          className="add-product-form"
        >
          <div className="form-grid">
            <div>
              <div className="form-group">
                <label htmlFor="ten_sp">Tên sản phẩm *</label>
                <input
                  type="text"
                  id="ten_sp"
                  name="ten_sp"
                  defaultValue=""
                  placeholder="Nhập tên sản phẩm..."
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
                placeholder="Nhập mô tả ngắn cho sản phẩm..."
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
                <select id="nhan_hieu" defaultValue="">
                  <option value="" disabled>
                    -- Chọn nhãn hiệu --
                  </option>
                  {brands.map((b) => (
                    <option key={b.brand_id} value={b.brand_id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="danh_muc">Danh mục sản phẩm *</label>
                <select id="danh_muc" defaultValue="">
                  <option value="" disabled>
                    -- Chọn danh mục --
                  </option>
                  {categories.map((c) => (
                    <option key={c.categories_id} value={c.categories_id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="gender">Giới tính *</label>
                <select id="gender" defaultValue="3">
                  <option value="" disabled>
                    -- Chọn giới tính --
                  </option>
                  {genders.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
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
                <input
                  type="number"
                  id="gia_goc"
                  name="gia_goc"
                  placeholder="nhập giá sản phẩm..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="gia_ban">Giá khuyên mãi (VND)</label>
                <input
                  type="number"
                  id="gia_ban"
                  name="gia_ban"
                  placeholder="nhập giá giảm..."
                />
              </div>
            </div>
          </div>
        </form>

        <div className="form-group">
          <label>
            Ảnh sản phẩm <small>(Lưu ý: Nền đế nền trắng)</small>
          </label>
          <div className="product-images">
            {/* Hiển thị ảnh preview từ mainImages */}
            {mainImages.length > 0 ? (
              mainImages.map((file, index) => {
                const url = URL.createObjectURL(file);
                return (
                  <div className="image-thumb" key={index}>
                    <img src={url} alt={`Ảnh ${index + 1}`} />
                  </div>
                );
              })
            ) : (
              <>
                <p className="w-full text-gray-500 italic select-none py-10">
                  Chưa có ảnh sản phẩm
                </p>
              </>
            )}
          </div>
          <label htmlFor="fileInput" className="choose-image-btn">
            Chọn ảnh
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            multiple
            accept="image/*"
            onChange={handleMainImagesChange}
          />
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
                <div className="custom-select-wrapper" style={{ flex: "1" }}>
                  <div className="custom-select">
                    {/* Màu đang chọn */}
                    <div className="selected-option">
                      <span
                        className="color-circle"
                        style={{
                          backgroundColor: variant.color
                            ? variant.color.split("|")[0]
                            : colors[0].hex,
                        }}
                      ></span>
                      <span className="color-name">
                        {variant.color
                          ? variant.color.split("|")[1]
                          : colors[0].value.split("|")[1]}
                      </span>
                    </div>

                    {/* Dropdown danh sách màu */}
                    <div className="dropdown">
                      <input
                        type="text"
                        className="color-search"
                        placeholder="Tìm màu..."
                        onChange={(e) => {
                          const search = e.target.value.toLowerCase();
                          document
                            .querySelectorAll(
                              `.dropdown-option[data-variant="${index}"]`
                            )
                            .forEach((el) => {
                              const name =
                                el.getAttribute("data-name")?.toLowerCase() ||
                                "";
                              (el as HTMLElement).style.display = name.includes(
                                search
                              )
                                ? "flex"
                                : "none";
                            });
                        }}
                      />
                      {colors.map((c, i) => (
                        <div
                          key={i}
                          className="dropdown-option"
                          data-variant={index}
                          data-name={c.value.split("|")[1]}
                          style={{ "--color": c.hex } as React.CSSProperties}
                          onClick={() => handleColorSelect(index, c.value)}
                        >
                          <span
                            className="color-circle"
                            style={{ backgroundColor: c.hex }}
                          ></span>
                          <span className="color-name">
                            {c.value.split("|")[1]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <input
                  type="file"
                  onChange={(e) => handleVariantImageChange(index, e)}
                  style={{ flex: "1" }}
                />
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
