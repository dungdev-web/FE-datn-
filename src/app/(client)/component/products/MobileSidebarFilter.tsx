"use client";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ICategory } from "@/types/ICategory";
import { IBrand } from "@/types/IBrand";
import { useEffect, useState } from "react"; // ✅ thêm useState
import { getFilteredProducts } from "@/services/productService";

interface Props {
  isActive: boolean;
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

export default function MobileSidebarFilter({
  isActive,
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
  sortBy,
  sortOrder,
}: Props) {
  // ✅ state lưu lịch sử filter
  const [filterHistory, setFilterHistory] = useState<
    { selectedBrandIds: number[]; selectedGender: string | null; selectedPriceRange: { min: number; max: number } | null }[]
  >([]);

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

    try {
      const res = await getFilteredProducts(params);
      onProductsChange(res.products, res.total, res.totalPages);
    } catch (error) {
      console.error("❌ Lỗi khi lọc sản phẩm (mobile):", error);
    }
  };

  // Gọi API khi filter thay đổi
  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedBrandIds,
    selectedGender,
    selectedPriceRange,
    searchKeyword,
    currentPage,
    limit,
    sortBy,
    sortOrder,
  ]);

  // ✅ Lưu lịch sử filter
  useEffect(() => {
    setFilterHistory((prev) => [
      ...prev,
      { selectedBrandIds, selectedGender, selectedPriceRange },
    ]);
  }, [selectedBrandIds, selectedGender, selectedPriceRange]);

  // ✅ Undo filter
  const handleUndo = () => {
    if (filterHistory.length > 1) {
      const newHistory = [...filterHistory];
      newHistory.pop(); // bỏ trạng thái hiện tại
      const last = newHistory[newHistory.length - 1];

      handleGenderChange(last.selectedGender || "");
      handlePriceChange(last.selectedPriceRange);
      if (last.selectedBrandIds.length > 0) {
        handleBrandCheckboxChange(last.selectedBrandIds[0]);
      } else {
        handleBrandCheckboxChange(-1);
      }

      setFilterHistory(newHistory);
    }
  };
  return (
    <div id="filter-sidebar" className={isActive ? "active" : ""}>
      {/* Danh mục */}
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
                <div className="flex justify-between items-center nav-button bg-white px-2 py-2">
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
                    <ul className="lv2 pl-4 py-2 bg-gray-50">
                      {cat.children.map((child) => (
                        <li key={child.categories_id} className="py-1">
                          <Link
                            href={`/category/${child.slug}`}
                            className="block text-sm text-gray-700 hover:text-red-500"
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

      {/* Bộ lọc */}
      <div className="aside-filter">
        <div className="aside-title">
          <h2 className="title-head margin-top-0">
            <span>Bộ lọc</span>
          </h2>
        </div>
        {/* ✅ Phần hiển thị filter đã chọn (giống Desktop) */}
        {(selectedBrandIds.length > 0 ||
          (selectedGender && selectedGender !== "") ||
          selectedPriceRange !== null) && (
          <div className="aside-item !px-3 !py-2">
            <div className="aside-title-me flex justify-between items-center">
              <div className="flex items-center !gap-2">
                {/* Nút Undo */}
                {filterHistory && filterHistory.length > 0 && (
                  <button
                    onClick={handleUndo}
                    className="text-blue-600 hover:text-blue-800 !gap-4"
                    title="Quay lại bộ lọc trước đó"
                  >
                    <i className="fa fa-undo"></i>
                  </button>
                )}
                <span className="font-semibold !mr-10">Bạn chọn</span>
              </div>

              {/* Nút Bỏ hết */}
              <button
                className="flex items-center gap-2 text-sm text-blue-600 hover:underline whitespace-nowrap"
                onClick={() => {
                  handleGenderChange("");
                  handlePriceChange(null);
                  handleBrandCheckboxChange(-1);
                }}
              >
                <i className="fa fa-times-circle !gap-5"></i> Bỏ hết
              </button>
            </div>

            {/* Danh sách filter đã chọn */}
            <ul className="mt-2 space-y-2 !p-2 text-sm ">
              {selectedPriceRange && (
                <li className="flex !gap-6">
                  <span>
                    {selectedPriceRange.min.toLocaleString("vi-VN")}đ -{" "}
                    {selectedPriceRange.max.toLocaleString("vi-VN")}đ
                  </span>
                  <button
                    onClick={() => handlePriceChange(null)}
                    className="text-red-500 ml-2"
                    title="Xoá giá"
                  >
                    <i className="fa fa-times-circle"></i>
                  </button>
                </li>
              )}

              {selectedBrandIds.map((id) => {
                const brand = brandsList.find((b) => b.brand_id === id);
                if (!brand) return null;
                return (
                  <li key={id} className="flex !gap-26.5 ">
                    <span>{brand.name}</span>
                    <button
                      onClick={() => handleBrandCheckboxChange(-1)}
                      className="text-red-500 ml-2"
                      title="Xoá thương hiệu"
                    >
                      <i className="fa fa-times-circle"></i>
                    </button>
                  </li>
                );
              })}

              {selectedGender && (
                <li className="flex !gap-25.5trưa">
                  <span>
                    {selectedGender === "nam"
                      ? "Giày Nam"
                      : selectedGender === "nữ"
                      ? "Giày Nữ"
                      : "Khác"}
                  </span>
                  <button
                    onClick={() => handleGenderChange("")}
                    className="text-red-500 ml-2"
                    title="Xoá loại"
                  >
                    <i className="fa fa-times-circle"></i>
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}

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

          {/* Loại (Giới tính) */}
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
                  { label: "Khác", value: "khác" },
                ].map((type) => (
                  <li
                    key={type.value}
                    className="filter-item filter-item--check-box"
                  >
                    <label
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <input
                        type="radio"
                        name="gender"
                        checked={selectedGender === type.value}
                        onChange={() => handleGenderChange(type.value)}
                        style={{ display: "none" }}
                      />
                      <span
                        style={{
                          width: "14px",
                          height: "14px",
                          borderRadius: "50%",
                          border: "2px solid #ccc",
                          backgroundColor:
                            selectedGender === type.value
                              ? "#007bff"
                              : "transparent",
                          position: "relative",
                          display: "inline-block",
                        }}
                      >
                        {selectedGender === type.value && (
                          <span
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              backgroundColor: "white",
                            }}
                          />
                        )}
                      </span>
                      {type.label}
                    </label>
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
            <div className="aside-content filter-group aside_vendor block md:hidden">
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
                          id={`filter-${brand.brand_id}`}
                          checked={selectedBrandIds.includes(brand.brand_id)}
                          onChange={() =>
                            handleBrandCheckboxChange(brand.brand_id)
                          }
                          className="mr-2"
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

      {/* Banner */}
      <aside className="aside-item hidden-767">
        <div className="aside-content">
          <a href="#" title="Thời trang nam">
            <img
              className="img-responsive center-block"
              src="/images/banner/aside_banner.webp"
              alt="Thời trang nam"
            />
          </a>
        </div>
      </aside>
    </div>
  );
};