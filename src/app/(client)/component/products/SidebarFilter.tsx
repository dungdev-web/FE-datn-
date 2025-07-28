"use client";
import Link from "next/link";
import { ChevronDown, ChevronRight, Undo2, XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { ICategory } from "@/types/ICategory";
import { IBrand } from "@/types/IBrand";
import { getFilteredProducts } from "@/services/productService";

interface Props {
  categories: ICategory[];
  openCategoryId: number | null;
  toggleCategory: (id: number) => void;
  brandsList: IBrand[];
  selectedBrandId: number | null; // 👈 thay vì array
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
  sortBy,
  sortOrder,
}: Props) {
  const [filterHistory, setFilterHistory] = useState<
    {
      brands: number[];
      gender: string | null;
      price: { min: number; max: number } | null;
    }[]
  >([]);
  const [localGender, setLocalGender] = useState<string | null>(selectedGender);
  const [localPrice, setLocalPrice] = useState<{
    min: number;
    max: number;
  } | null>(selectedPriceRange);
  const [localBrand, setLocalBrand] = useState<number | null>(
    selectedBrandIds.length > 0 ? selectedBrandIds[0] : null
  );

  useEffect(() => {
    setLocalGender(selectedGender);
  }, [selectedGender]);

  useEffect(() => {
    setLocalPrice(selectedPriceRange);
  }, [selectedPriceRange]);

  useEffect(() => {
    setLocalBrand(selectedBrandIds.length > 0 ? selectedBrandIds[0] : null);
  }, [selectedBrandIds]);

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
      console.error("Lỗi khi lọc sản phẩm:", error);
    }
  };

  useEffect(() => {
    applyFilters();

    // Lưu lịch sử filter để Undo
    setFilterHistory((prev) => [
      ...prev,
      {
        brands: [...selectedBrandIds],
        gender: selectedGender,
        price: selectedPriceRange,
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBrandIds, selectedGender, selectedPriceRange]);

  const hasFilter =
    selectedBrandIds.length > 0 || selectedGender || selectedPriceRange;

  const clearAllFilters = () => {
    setLocalBrand(null);
    setLocalGender(null);
    setLocalPrice(null);
    handleBrandCheckboxChange(-1);
    handleGenderChange("");
    handlePriceChange(null);
  };

  const handleUndo = () => {
    if (filterHistory.length < 2) return;
    const previous = filterHistory[filterHistory.length - 2];
    setLocalBrand(previous.brands[0] || null);
    setLocalGender(previous.gender);
    setLocalPrice(previous.price);
    handleBrandCheckboxChange(-1);
    handleGenderChange(previous.gender || "");
    handlePriceChange(previous.price);
    setFilterHistory((prev) => prev.slice(0, prev.length - 1));
  };
  return (
    <div className="col-lg-3 col-test">
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

      {/* Bộ lọc */}
      <div className="aside-filter">
        <div className="aside-title">
          <h2 className="title-head margin-top-0">
            <span>Bộ lọc</span>
          </h2>
        </div>

        {hasFilter && (
          <div className="aside-item !px-3 !py-2 ">
            <div className="aside-title-me flex justify-between items-center">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleUndo}
                  className="text-blue-600 hover:text-blue-800"
                  title="Quay lại bộ lọc trước đó"
                >
                  <Undo2 size={18} />
                </button>
                <span className="font-semibold">Bạn chọn</span>
              </div>

              <button
                className="text-sm text-blue-600 hover:underline whitespace-nowrap"
                onClick={clearAllFilters}
              >
                Bỏ hết
              </button>
            </div>

            <ul className="mt-2 space-y-2 !p-2">
              {selectedPriceRange && (
                <li className="flex items-center text-sm justify-between">
                  <span>
                    {selectedPriceRange.min.toLocaleString("vi-VN")}đ -{" "}
                    {selectedPriceRange.max.toLocaleString("vi-VN")}đ
                  </span>
                  <button
                    onClick={() => handlePriceChange(null)}
                    className="text-red-500 ml-2"
                    title="Xoá giá"
                  >
                    <XCircle size={16} />
                  </button>
                </li>
              )}
              {selectedBrandIds.map((id) => {
                const brand = brandsList.find((b) => b.brand_id === id);
                return (
                  <li
                    key={id}
                    className="flex items-center text-sm justify-between"
                  >
                    <span>{brand?.name}</span>
                    <button
                      onClick={() => handleBrandCheckboxChange(-1)}
                      className="text-red-500 ml-2"
                      title="Xoá thương hiệu"
                    >
                      <XCircle size={16} />
                    </button>
                  </li>
                );
              })}
              {selectedGender && (
                <li className="flex items-center text-sm justify-between">
                  <span>
                    {selectedGender === "nam" ? "Giày Nam" : "Giày Nữ"}
                  </span>
                  <button
                    onClick={() => handleGenderChange("")}
                    className="text-red-500 ml-2"
                    title="Xoá loại"
                  >
                    <XCircle size={16} />
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Bộ lọc chi tiết (Giá, Giới tính, Thương hiệu) */}
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
                    className="filter-item filter-item--check-box"
                  >
                    <label>
                      <input
                        key={
                          selectedPriceRange?.min === price.value.min &&
                          selectedPriceRange?.max === price.value.max
                            ? "checked"
                            : "unchecked"
                        }
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
                    className="filter-item filter-item--check-box"
                  >
                    <label>
                      <input
                        key={
                          selectedGender === type.value
                            ? "checked"
                            : "unchecked"
                        }
                        type="radio"
                        name="gender"
                        checked={selectedGender === type.value}
                        onChange={() => handleGenderChange(type.value)}
                      />

                      <i className="fa"></i>
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
            <div className="aside-content filter-group">
              <ul>
                {brandsList.map((brand) => (
                  <li
                    key={brand.brand_id}
                    className="filter-item filter-item--check-box"
                  >
                    <label>
                      <input
                        key={
                          selectedBrandIds.includes(brand.brand_id)
                            ? "checked"
                            : "unchecked"
                        }
                        type="radio"
                        name="brand"
                        checked={selectedBrandIds.includes(brand.brand_id)}
                        onChange={() =>
                          handleBrandCheckboxChange(brand.brand_id)
                        }
                      />

                      <i className="fa"></i>
                      {brand.name}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
