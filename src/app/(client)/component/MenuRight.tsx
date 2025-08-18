"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getCategories } from "@/services/categoryService";
import { ICategory } from "@/types/ICategory";
import { getBrands } from "@/services/brandService";
import { IBrand } from "@/types/IBrand";
import { ChevronDown } from "lucide-react";

interface MenuRightProps {
  isMenuOpen: boolean;
  closeMenu: () => void;
}

export default function MenuRight({ isMenuOpen, closeMenu }: MenuRightProps) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);

  const [isSubmenuActive, setIsSubmenuActive] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleSubmenu = (index: number) => {
    setIsSubmenuActive((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedCategories = await getCategories();
        setCategories(
          Array.isArray(fetchedCategories) ? fetchedCategories : []
        );

        const fetchedBrands = await getBrands();
        setBrands(Array.isArray(fetchedBrands) ? fetchedBrands : []);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div
        className={`menu ${isMenuOpen ? "open" : ""}`}
        style={{ display: isMenuOpen ? "block" : "none" }}
      >
        <div className="menu-header">
          <div>
            <img src="/images/logo/NBDT__1_-removebg-preview.png" alt="Logo" />
          </div>
          <div className="close" onClick={closeMenu}>
            ×
          </div>
        </div>
        <ul>
          <li>
            <Link href="/">TRANG CHỦ</Link>
          </li>
          <li>
            <Link href="/about">GIỚI THIỆU</Link>
          </li>
          <li>
            <div className=" flex items-center gap-38">
              <Link href="/product" className="text-base font-medium">
                SẢN PHẨM
              </Link>
              <button
                type="button"
                className="cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  toggleSubmenu(1);
                }}
              >
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 mr-1 ${
                    isSubmenuActive[1] ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* Submenu chính */}
            <div
              className={`submenu transition-max-height duration-300 p-4 ease-in-out overflow-hidden ${
                isSubmenuActive[1] ? "max-h-[500px]" : "max-h-0"
              }`}
            >
              {/* Danh mục */}
              <div className="p-4">
                <div
                  className="cursor-pointer flex items-center font-semibold gap-43.5"
                  onClick={() => toggleSubmenu(2)}
                >
                  Danh mục
                  <ChevronDown
                    size={16}
                    className={`ml-10 inline-block transition-transform duration-300 ${
                      isSubmenuActive[2] ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <div
                  className={`transition-max-height duration-300 ease-in-out overflow-hidden px-4 ${
                    isSubmenuActive[2] ? "max-h-[400px]" : "max-h-0"
                  }`}
                >
                  {categories.map((cat) => (
                    <div key={cat.categories_id}>
                      <Link
                        href={`/category/${cat.slug}`}
                        className="block py-1"
                      >
                        {cat.name}
                      </Link>
                      {cat.children?.map((child) => (
                        <Link
                          key={child.categories_id}
                          href={`/category/${child.slug}`}
                          className="block pl-4 text-sm text-gray-600 py-1"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Nhãn hiệu */}
              <div className="p-4">
                <div
                  className="flex items-center gap-43.5 cursor-pointer font-semibold"
                  onClick={() => toggleSubmenu(3)}
                >
                  Nhãn hiệu
                  <ChevronDown
                    size={16}
                    className={`ml-2 inline-block transition-transform duration-300 ${
                      isSubmenuActive[3] ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <div
                  className={`transition-max-height duration-300 ease-in-out overflow-hidden px-4 ${
                    isSubmenuActive[3] ? "max-h-[400px]" : "max-h-0"
                  }`}
                >
                  {brands.map((brand) => (
                    <Link
                      key={brand.brand_id}
                      href={`/brand/${brand.brand_id}`}
                      className="block py-1"
                    >
                      {brand.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </li>

          {/* TIN TỨC */}
          <li>
            <Link href="/blog">
              TIN TỨC{" "}
              <span
                className="arrow"
                onClick={(e) => {
                  e.preventDefault();
                  toggleSubmenu(4);
                }}
              >
                <ChevronDown
                  size={16}
                  className={`ml-1 transition-transform duration-300 ${
                    isSubmenuActive[5] ? "rotate-180" : ""
                  }`}
                />
              </span>
            </Link>
            <div
              className={`submenu transition-max-height duration-300 ease-in-out overflow-hidden ${
                isSubmenuActive[4] ? "max-h-40" : "max-h-0"
              }`}
            >
              <Link href="/blog">Bài viết</Link>
              <Link href="/blog">Khuyến mãi</Link>
            </div>
          </li>

          <li>
            <Link href="/contact">LIÊN HỆ</Link>
          </li>
          <li>
            <Link href="/account">TÀI KHOẢN</Link>
          </li>
          <li>
            <Link href="/register">ĐĂNG KÍ</Link>
          </li>
          <li>
            <Link href="/login">ĐĂNG NHẬP</Link>
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div className="overlay" id="overlay" onClick={closeMenu}></div>
      )}
    </>
  );
}
