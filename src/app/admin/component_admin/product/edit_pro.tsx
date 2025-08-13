"use client";
import React, { useEffect, useRef, useState } from "react";
import "../../css/product_add.css";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { API_BASE_URL } from "@/config/env";
import Select from "react-select";
import { Plus, Trash2 } from "lucide-react";
import {
  addProduct,
  getGenders,
  getProductAdminById,
  getSizes,
  updateAdminProduct,
} from "@/services/productService";
import { AddProductPayload, IGender, IProduct, ISize } from "@/types/product";
import { IBrand } from "@/types/IBrand";
import { ICategory } from "@/types/ICategory";
import { getAllBrands } from "@/services/brandService";
import { getAllCategories } from "@/services/categoryService";
import Swal from "sweetalert2";
import { useParams } from "next/navigation";

export default function Add_pro() {
  const { id } = useParams();
  const productId = id ? Number(id) : null;

  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const [sizes, setSizes] = useState<ISize[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [genders, setGenders] = useState<IGender[]>([]);
  const [mainImages, setMainImages] = useState<File[]>([]);
  const [variantImages, setVariantImages] = useState<Record<string, File>>({});
  const [variantImagesPreview, setVariantImagesPreview] = useState<
    Record<string, string>
  >({});
  const [product, setProduct] = useState<any>({});
  const [selectedBrand, setSelectedBrand] = useState<number | "">("");
  const [selectedCategory, setSelectedCategory] = useState<number | "">("");
  const [selectedGender, setSelectedGender] = useState<number | "">("");
  const [name, setName] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<string>("Mở bán");

  /** Kiểu dữ liệu biến thể */
  type Variant = {
    colorHex: string;
    imagePreview?: string;
    color: string;
    image: File | null;
    sizes: string[];
    quantity: number | string;
  };

  /** State biến thể */
  const [variants, setVariants] = useState<Variant[]>([
    {
      color: "black|Đen",
      colorHex: "#000000",
      image: null,
      sizes: [],
      quantity: "",
    },
  ]);

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
  const sizeOptions = sizes.map((s) => ({
    value: String(s.id),
    label: s.number_size,
  }));
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

  /** Quản lý màu cho biến thể */
  const handleColorSelect = (index: number, colorValue: string) => {
    const colorObj = colors.find((c) => c.value === colorValue);
    if (!colorObj) return;
    setVariants((prev) => {
      const newVariants = [...prev];
      newVariants[index] = {
        ...newVariants[index],
        color: colorObj.value,
        colorHex: colorObj.hex,
      };
      return newVariants;
    });
  };

  /** Thêm biến thể mới */
  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      {
        color: "black|Đen",
        colorHex: "#000000",
        image: null,
        sizes: [],
        quantity: "",
      },
    ]);
  };

  /** Xóa biến thể */
  const removeVariant = (index: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

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

  /** Lấy dữ liệu sizes, brands, categories, genders */
  useEffect(() => {
    async function fetchData() {
      try {
        const [brandData, categoryData, genderData, sizeData] =
          await Promise.all([
            getAllBrands(),
            getAllCategories(),
            getGenders(),
            getSizes(),
          ]);
        setBrands(brandData);
        setCategories(categoryData);
        setGenders(genderData.data);
        setSizes(Array.isArray(sizeData) ? sizeData : sizeData.data || []);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

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
    }
  }, []);

  /** Fetch product để edit */
  useEffect(() => {
    async function fetchProduct() {
      if (!productId || sizes.length === 0) return;

      try {
        const res = await getProductAdminById(productId);
        const data = res.data;
        setProduct(data);

        // Quill
        if (quillRef.current)
          quillRef.current.root.innerHTML = data.description || "";

        setSelectedBrand(data.brand_id || "");
        setSelectedCategory(data.categories_id || "");
        setSelectedGender(data.gender_id || "");
        setStatus(data.status === 1 ? "Mở bán" : "Ngưng bán");

        // Map variants
        const variantsMapped: Variant[] = data.product_variants.map(
          (v: any) => {
            const colorKey = `${v.color.code_color}|${v.color.name_color}`;
            const sizeIds = sizes
              .filter((s) => s.number_size === v.size.number_size)
              .map((s) => String(s.id));
            return {
              color: colorKey,
              colorHex: v.color.code_color,
              sizes: sizeIds,
              quantity: v.stock_quantity,
              image: null,
              imagePreview: v.color.images
                ? `${API_BASE_URL}/uploads/${v.color.images}`
                : undefined,
            };
          }
        );

        setVariants(variantsMapped);
        const previewMap: Record<string, string> = {};
        variantsMapped.forEach((v) => {
          if (v.imagePreview) previewMap[v.color] = v.imagePreview;
        });
        setVariantImagesPreview(previewMap);
      } catch (err) {
        console.error(err);
      }
    }

    fetchProduct();
  }, [productId, sizes]);

  /** Handle main image upload */
  const handleMainImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setMainImages(Array.from(e.target.files));
  };

  /** Handle variant image upload */
  const handleVariantImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    colorKey: string
  ) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setVariantImages((prev) => ({ ...prev, [colorKey]: file }));
    setVariantImagesPreview((prev) => ({
      ...prev,
      [colorKey]: URL.createObjectURL(file),
    }));
  };
  const handleUpdate = async () => {
    if (!productId) return;

    // Hàm đổi tên file an toàn
    const sanitizeFilename = (filename: string) =>
      filename.replace(/[\\/:*?"<>|#]/g, "_");

    try {
      const payload: AddProductPayload = {
        name,
        short_desc: shortDesc,
        description: quillRef.current?.root.innerHTML || "",
        price: Number(price),
        sale_price: Number(salePrice),
        categories_id: Number(selectedCategory),
        brand_id: Number(selectedBrand),
        gender_id: Number(selectedGender),
        status: status === "Mở bán" ? 1 : 0,
        images: mainImages,
        variantImages: variantImages,
        product_variants: variants.flatMap((v) =>
          v.sizes.map((sizeId) => ({
            code_color: v.color.split("|")[0],
            name_color: v.color.split("|")[1] || "",
            size_id: Number(sizeId),
            stock_quantity: Number(v.quantity),
          }))
        ),
      };

      // Tạo FormData
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("short_desc", payload.short_desc);
      formData.append("description", payload.description);
      formData.append("price", payload.price.toString());
      formData.append("sale_price", payload.sale_price.toString());
      formData.append("categories_id", payload.categories_id.toString());
      formData.append("brand_id", payload.brand_id.toString());
      formData.append("gender_id", payload.gender_id.toString());
      formData.append("status", payload.status.toString());

      // Thêm ảnh chính (sanitize tên)
      payload.images.forEach((file) => {
        formData.append(
          "images",
          new File([file], sanitizeFilename(file.name), { type: file.type })
        );
      });

      // Thêm ảnh variant (sanitize tên)
      Object.entries(payload.variantImages).forEach(([code, file]) => {
        formData.append(
          `variant_image_${code}`,
          new File([file], sanitizeFilename(file.name), { type: file.type })
        );
      });

      // Thêm product_variants JSON
      formData.append(
        "product_variants",
        JSON.stringify(payload.product_variants)
      );

      // Gửi request
      const res = await fetch(
        `${API_BASE_URL}/product/update-product/${productId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Cập nhật sản phẩm thất bại");
      }

      const json = await res.json();

      Swal.fire({
        icon: "success",
        title: "Cập nhật thành công",
        text: `Sản phẩm "${json.name}" đã được cập nhật.`,
      });
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Cập nhật thất bại",
        text: err.message || "Có lỗi xảy ra",
      });
    }
  };

  return (
    <>
      <div className="header-bar">
        <div className="header-left">
          <button className="btn btn-back">
            <i className="fa-solid fa-arrow-left"></i> Trở về
          </button>
          <button
            className="btn-add"
            type="submit"
            form="add-product-form"
            onClick={handleUpdate}
          >
            <i className="fa fa-plus"></i> Cập nhật sản phẩm
          </button>
        </div>
      </div>

      <div className="tabs">
        <div className="tab active">Thông tin sản phẩm</div>
        <div className="tab">Nhập số lượng sản phẩm</div>
      </div>

      <div className="tab-content" style={{ display: "block" }}>
        <form id="edit-product-form" className="edit-product-form">
          <div className="form-grid" id="edit-product-form">
            <div>
              <div className="form-group">
                <label htmlFor="ten_sp">Tên sản phẩm *</label>
                <input
                  type="text"
                  id="ten_sp"
                  name="ten_sp"
                  defaultValue={product?.name || ""}
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
                defaultValue={product?.short_desc || ""}
                rows={3}
                placeholder="Nhập mô tả ngắn cho sản phẩm..."
              ></textarea>
            </div>

            <div>
              <div className="form-group">
                <select
                  id="trang_thai"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="1">Mở bán</option>
                  <option value="0">Ngưng bán</option>
                </select>
              </div>

              <div className="form-group">
                <select
                  id="nhan_hieu"
                  value={selectedBrand}
                  onChange={(e) =>
                    setSelectedBrand(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                >
                  <option value="" disabled>
                    -- Chọn nhãn hiệu --
                  </option>
                  {brands?.map((b) => (
                    <option key={b.brand_id} value={b.brand_id}>
                      {b?.name || "Không có tên"}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <select
                  id="danh_muc"
                  value={selectedCategory} // number | ""
                  onChange={(e) =>
                    setSelectedCategory(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                >
                  <option value="" disabled>
                    -- Chọn danh mục --
                  </option>
                  {categories?.map((c) => (
                    <option key={c.categories_id} value={c.categories_id}>
                      {c?.name || "Không có tên"}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <select
                  id="gender"
                  value={selectedGender}
                  onChange={(e) =>
                    setSelectedGender(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                >
                  <option value="" disabled>
                    -- Chọn giới tính --
                  </option>
                  {genders?.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g?.name || "Không xác định"}
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
                  defaultValue={product?.price || ""}
                  placeholder="nhập giá sản phẩm..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="gia_ban">Giá khuyến mãi (VND)</label>
                <input
                  type="number"
                  id="gia_ban"
                  name="gia_ban"
                  defaultValue={product?.sale_price || ""}
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
            {product?.images?.length > 0
              ? product.images.map(
                  (img: {
                    images_id: React.Key | null | undefined;
                    url: any;
                    alt_text: any;
                  }) => (
                    <div className="image-thumb" key={img?.images_id}>
                      <img
                        src={`${API_BASE_URL}/uploads/${img?.url || ""}`}
                        alt={img?.alt_text || "Ảnh sản phẩm"}
                      />
                    </div>
                  )
                )
              : null}

            {mainImages?.length > 0 &&
              mainImages.map((file, index) => {
                const url = URL.createObjectURL(file);
                return (
                  <div className="image-thumb" key={index}>
                    <img src={url} alt={`Ảnh mới ${index + 1}`} />
                  </div>
                );
              })}

            {!product?.images?.length && !mainImages?.length && (
              <p className="w-full text-gray-500 italic select-none py-10">
                Chưa có ảnh sản phẩm
              </p>
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
            {Array.from(
              variants.reduce((map, v, idx) => {
                if (!map.has(v.color)) map.set(v.color, []);
                map.get(v.color)!.push(idx);
                return map;
              }, new Map<string, number[]>())
            ).map(([color, indices], displayIndex) => {
              const firstIndex = indices[0];
              const variant = variants[firstIndex];

              // Gộp tất cả size của các biến thể cùng màu để hiển thị
              const mergedSizes = Array.from(
                new Set(indices.flatMap((i) => variants[i].sizes))
              );

              return (
                <div
                  key={displayIndex}
                  className="variant-row"
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "10px",
                    alignItems: "center",
                  }}
                >
                  {/* Color select */}
                  <div className="custom-select-wrapper" style={{ flex: 1 }}>
                    <div className="custom-select">
                      <div className="selected-option">
                        <span
                          className="color-circle"
                          style={{
                            backgroundColor: variant.colorHex || "#000",
                          }}
                        ></span>
                        <span className="color-name">
                          {variant.color.split("|")[1]}
                        </span>
                      </div>
                      <div className="dropdown">
                        {colors.map((c, i) => (
                          <div
                            key={i}
                            className="dropdown-option"
                            onClick={() =>
                              handleColorSelect(firstIndex, c.value)
                            }
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

                  {/* Image upload */}
                  <input
                    type="file"
                    accept="image/*"
                    style={{ flex: 1 }}
                    onChange={(e) =>
                      handleVariantImagesChange(e, variant.color)
                    }
                  />

                  {/* Preview image */}
                  {variantImagesPreview[variant.color] && (
                    <img
                      src={variantImagesPreview[variant.color]}
                      alt="Preview"
                      style={{
                        width: 50,
                        height: 50,
                        objectFit: "cover",
                        marginRight: 4,
                        marginBottom: 4,
                      }}
                    />
                  )}

                  {/* Size select */}
                  <Select<{ value: string; label: string }, true>
                    options={sizeOptions}
                    isMulti
                    value={sizeOptions.filter((opt) =>
                      mergedSizes.includes(opt.value)
                    )}
                    onChange={(selected) =>
                      handleVariantChange(
                        firstIndex,
                        "sizes",
                        selected.map((s) => s.value)
                      )
                    }
                    placeholder="Chọn size"
                    styles={{ container: (base) => ({ ...base, flex: 1 }) }}
                  />

                  {/* Quantity */}
                  <input
                    type="number"
                    placeholder="Nhập số lượng..."
                    style={{ flex: 1 }}
                    value={variant.quantity || ""}
                    onChange={(e) =>
                      handleVariantChange(
                        firstIndex,
                        "quantity",
                        Number(e.target.value)
                      )
                    }
                  />

                  {/* Add / Remove */}
                  <button type="button" onClick={addVariant}>
                    <Plus size={20} color="#021688" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeVariant(firstIndex)}
                  >
                    <Trash2 size={20} color="red" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
