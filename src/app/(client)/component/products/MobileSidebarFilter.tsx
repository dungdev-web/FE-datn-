"use client";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ICategory } from "@/types/ICategory";
import { IBrand } from "@/types/IBrand";

interface Props {
  isActive: boolean;
  categories: ICategory[];
  openCategoryId: number | null;
  toggleCategory: (id: number) => void;
  brandsList: IBrand[];
  selectedBrandIds: number[];
  handleBrandCheckboxChange: (brandId: number) => void;
}

export default function MobileSidebarFilter({
  isActive,
  categories,
  openCategoryId,
  toggleCategory,
  brandsList,
  selectedBrandIds,
  handleBrandCheckboxChange,
}: Props) {
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
                  {/* Link danh mục cha */}
                  <Link
                    href={`/category/${cat.slug}`}
                    className="flex-1 hover:text-red-500"
                  >
                    {cat.name}
                  </Link>

                  {/* Nút mở rộng danh mục con */}
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

                {/* Danh mục con */}
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
                  { label: "Giá dưới 100.000đ", value: "(<100000)" },
                  { label: "100.000đ - 200.000đ", value: "(>=100000 AND <200000)" },
                  { label: "200.000đ - 300.000đ", value: "(>=200000 AND <300000)" },
                  { label: "300.000đ - 500.000đ", value: "(>=300000 AND <500000)" },
                  { label: "500.000đ - 1.000.000đ", value: "(>500000 AND <1000000)" },
                  { label: "Giá trên 1.000.000đ", value: "(>1000000)" },
                ].map((price, index) => (
                  <li key={index} className="filter-item filter-item--check-box filter-item--green">
                    <span>
                      <label>
                        <input type="checkbox" value={price.value} />
                        <i className="fa"></i>
                        {price.label}
                      </label>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Loại */}
          <aside className="aside-item filter-type">
            <div className="module-title">
              <h2 className="title-head margin-top-0">
                <span>Loại</span>
              </h2>
            </div>
            <div className="aside-content filter-group">
              <ul>
                {["Giày Nam", "Giày Nữ"].map((type) => (
                  <li key={type} className="filter-item filter-item--check-box filter-item--green">
                    <span>
                      <label>
                        <input type="checkbox" value={type} />
                        <i className="fa"></i>
                        {type}
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
            <div className="aside-content filter-group aside_vendor block md:hidden">
              <ul>
                {brandsList.map((brand) => (
                  <li key={brand.brand_id} className="filter-item filter-item--check-box filter-item--green">
                    <span>
                      <label className="label_relative">
                        <input
                          type="checkbox"
                          id={`filter-${brand.brand_id}`}
                          checked={selectedBrandIds.includes(brand.brand_id)}
                          onChange={() => handleBrandCheckboxChange(brand.brand_id)}
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
}
