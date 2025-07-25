"use client";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ICategory } from "@/types/ICategory";
import { IBrand } from "@/types/IBrand";
import { useEffect } from "react";
import { getFilteredProducts } from "@/services/productService";

interface Props {
  categories: ICategory[];
  openCategoryId: number | null;
  toggleCategory: (id: number) => void;
  brandsList: IBrand[];
  selectedBrandIds: number[];
  handleBrandCheckboxChange: (brandId: number) => void;
  selectedGender: string | null;
  handleGenderChange: (gender: string) => void;
  selectedPriceRange: { min: number; max: number } | null;
  handlePriceChange: (range: { min: number; max: number } | null) => void;
  searchKeyword?: string;
  currentPage: number;
  limit?: number;
  onProductsChange: (
    products: any[],
    total: number,
    totalPages: number
  ) => void;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export default function SidebarFilter({
  categories,
  openCategoryId,
  toggleCategory,
  brandsList,
  selectedBrandIds,
  handleBrandCheckboxChange,
  selectedGender,
  handleGenderChange,
  selectedPriceRange,
  handlePriceChange,
  searchKeyword = "",
  currentPage,
  limit = 12,
  onProductsChange,
  sortBy, // <-- dùng props
  sortOrder, // <-- dùng props
}: Props) {
  // Hàm gọi API lọc
  const applyFilters = async () => {
    const brandSlug = selectedBrandIds.length
      ? brandsList.find((b) => b.brand_id === selectedBrandIds[0])?.slug
      : undefined;

    const params = {
      keyword: searchKeyword || undefined,
      gender: selectedGender || undefined,
      brand: brandSlug,
      minPrice: selectedPriceRange?.min,
      maxPrice: selectedPriceRange?.max,
      page: currentPage,
      limit,
      sortBy,
      sortOrder,
    };

    console.log("🔍 Dữ liệu lọc gửi đến API:", params);

    try {
      const res = await getFilteredProducts(params);
      console.log("Danh sách sản phẩm trả về:", res.products); 
      onProductsChange(res.products, res.total, res.totalPages);
    } catch (error) {
      console.error("Lỗi khi lọc sản phẩm:", error);
    }
  };

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedBrandIds,
    selectedGender,
    selectedPriceRange,
    searchKeyword,
    currentPage,
    sortBy,
    sortOrder, // <-- thêm vào đây
  ]);

  return (
    <div className="col-lg-3 col-test">
      {/* === Danh mục === */}
      <aside className="aside-item collection-category">
        <div className="aside-title">
          <h2 className="title-head margin-top-0">
            <span>Danh mục</span>
          </h2>
        </div>
        <div className="categories-box">
          <ul className="lv1">
            {categories.map((cat) => (
              <li key={cat.categories_id} className="nav-item nav-items">
                <div className="flex justify-between items-center nav-button">
                  <Link
                    href={`/category/${cat.slug}`}
                    className="flex-1 hover:text-red-500"
                  >
                    {cat.name}
                  </Link>
                  {cat.children && cat.children.length > 0 && (
                    <button
                      type="button"
                      onClick={() => toggleCategory(cat.categories_id)}
                      className="ml-2"
                    >
                      {openCategoryId === cat.categories_id ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </button>
                  )}
                </div>
                {cat.children &&
                  cat.children.length > 0 &&
                  openCategoryId === cat.categories_id && (
                    <ul className="lv2 pl-4 py-2">
                      {cat.children.map((child) => (
                        <li key={child.categories_id}>
                          <Link
                            href={`/category/${child.slug}`}
                            className="text-sm text-gray-700 hover:text-red-500 block py-1"
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* === Bộ lọc === */}
      <div className="aside-filter">
        <div className="aside-title">
          <h2 className="title-head margin-top-0">
            <span>Bộ lọc</span>
          </h2>
        </div>

        <div className="filter-container">
          {/* Giá */}
          <aside className="aside-item filter-price">
            <div className="module-title">
              <h2 className="title-head margin-top-0">
                <span>Giá sản phẩm</span>
              </h2>
            </div>
            <div className="aside-content filter-group">
              <ul>
                {[
                  { label: "Dưới 100.000đ", value: { min: 0, max: 100000 } },
                  {
                    label: "100.000đ - 200.000đ",
                    value: { min: 100000, max: 200000 },
                  },
                  {
                    label: "200.000đ - 300.000đ",
                    value: { min: 200000, max: 300000 },
                  },
                  {
                    label: "300.000đ - 500.000đ",
                    value: { min: 300000, max: 500000 },
                  },
                  {
                    label: "500.000đ - 1.000.000đ",
                    value: { min: 500000, max: 1000000 },
                  },
                  {
                    label: "Trên 1.000.000đ",
                    value: { min: 1000000, max: 100000000 },
                  },
                ].map((price, index) => (
                  <li
                    key={index}
                    className="filter-item filter-item--check-box filter-item--green"
                  >
                    <span>
                      <label>
                        <input
                          type="radio"
                          name="price"
                          checked={
                            selectedPriceRange?.min === price.value.min &&
                            selectedPriceRange?.max === price.value.max
                          }
                          onChange={() => handlePriceChange(price.value)}
                        />
                        <i className="fa"></i>
                        {price.label}
                      </label>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Giới tính */}
          <aside className="aside-item filter-type">
            <div className="module-title">
              <h2 className="title-head margin-top-0">
                <span>Loại</span>
              </h2>
            </div>
            <div className="aside-content filter-group">
              <ul>
                {[
                  { label: "Giày Nam", value: "nam" },
                  { label: "Giày Nữ", value: "nữ" },
                ].map((type) => (
                  <li
                    key={type.value}
                    className="filter-item filter-item--check-box filter-item--green"
                  >
                    <span>
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          checked={selectedGender === type.value}
                          onChange={() => handleGenderChange(type.value)}
                        />
                        <i className="fa"></i>
                        {type.label}
                      </label>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Thương hiệu */}
          <aside className="aside-item filter-vendor">
            <div className="module-title">
              <h2 className="title-head margin-top-0">
                <span>Thương hiệu</span>
              </h2>
            </div>
            <div className="aside-content filter-group aside_vendor">
              <ul>
                {brandsList.map((brand) => (
                  <li
                    key={brand.brand_id}
                    className="filter-item filter-item--check-box filter-item--green"
                  >
                    <span>
                      <label className="label_relative">
                        <input
                          type="radio"
                          name="brand" // ✅ để đảm bảo chỉ chọn 1 radio trong nhóm
                          checked={selectedBrandIds.includes(brand.brand_id)}
                          onChange={() =>
                            handleBrandCheckboxChange(brand.brand_id)
                          }
                        />
                        <i className="fa"></i>
                        <span className="filter_tt">{brand.name}</span>
                      </label>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>

      {/* Banner phụ */}
      <aside className="aside-item hidden-767">
        <div className="aside-content">
          <a href="#" title="Thời trang nam">
            <img
              className="img-responsive center-block"
              src="//bizweb.dktcdn.net/100/505/077/themes/934930/assets/aside_banner.png?1730865096645"
              alt="Thời trang nam"
            />
          </a>
        </div>
      </aside>
    </div>
  );
}
