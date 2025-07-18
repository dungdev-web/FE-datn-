"use client";
import { useEffect, useState } from "react";
import {
  getCategories,
  getProductsByCategorySlug,
} from "@/services/categoryService";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { IProduct } from "@/types/product";
import { ICategory } from "@/types/ICategory";
import { getBrands, getProductsByBrandId } from "@/services/brandService";
import { IBrand } from "@/types/IBrand";
import "@/app/(client)/css/pagination.css";
import { ChevronDown, ChevronRight } from "lucide-react";
import SidebarFilter from "../../component/products/SidebarFilter";
import MobileSidebarFilter from "../../component/products/MobileSidebarFilter";

export default function CategoryPage() {
  const params = useParams();
  const brandId = Number(params.id);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [brands, setBrand] = useState<IBrand | null>(null); // thêm state cho brand
  const [brandsList, setBrandsList] = useState<IBrand[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const productsPerPage = viewMode === "grid" ? 12 : 6;
  const [openCategoryId, setOpenCategoryId] = useState<number | null>(null);
  const totalPages = Math.ceil(total / productsPerPage);
  const [selectedBrandIds, setSelectedBrandIds] = useState<number[]>([]);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const handleBrandCheckboxChange = (brandId: number) => {
    setSelectedBrandIds((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
  };
  useEffect(() => {
    async function fetchFilteredProducts() {
      if (selectedBrandIds.length === 0) {
        // nếu không chọn brand nào -> hiện tất cả
        const allProducts = await getProductsByBrandId(brandId); // hoặc get all nếu bạn có
        setProducts(allProducts);
        setTotal(allProducts.length);
        return;
      }

      let combinedProducts: IProduct[] = [];

      for (const id of selectedBrandIds) {
        const brandProducts = await getProductsByBrandId(id);
        combinedProducts = [...combinedProducts, ...brandProducts];
      }

      setProducts(combinedProducts);
      setTotal(combinedProducts.length);
    }

    fetchFilteredProducts();
  }, [selectedBrandIds]);

  useEffect(() => {
    async function fetchProducts() {
      if (!brandId) return;
      try {
        const fetched = await getProductsByBrandId(brandId);
        const fetchedBrands = await getBrands();
        const fetchedCategories = await getCategories();
        setCategories(
          Array.isArray(fetchedCategories) ? fetchedCategories : []
        );
        setProducts(fetched);
        setTotal(fetched.length);
        setBrandsList(Array.isArray(fetchedBrands) ? fetchedBrands : []);

        const matchedBrand = fetchedBrands.find((b) => b.brand_id === brandId);
        setBrand(matchedBrand || null);
      } catch (err) {
        console.error("Lỗi khi load sản phẩm theo brand:", err);
      }
    }

    fetchProducts();
  }, [brandId]);
  const paginatedProducts = products.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );
  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  const changeViewMode = (mode: "grid" | "list") => {
    setViewMode(mode);
    setPage(1);
  };
  const toggleCategory = (id: number) => {
    setOpenCategoryId(openCategoryId === id ? null : id);
  };
    const handleGenderChange = (gender: string) => {
    setSelectedGender(gender);
    setSelectedBrandIds([]); // Reset brand khi chọn lại giới tính (tuỳ logic)
  };

  return (
    <>
      <section
        className="bread-crumb background-cover relative"
        style={{
          backgroundImage: "url(/images/banner/banner_dieuhuong1.png)",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {/* Lớp phủ làm mờ nền */}
        <div className="absolute inset-0 bg-gray-500/50 backdrop-blur-none z-0"></div>

        <div className="breadcrumb-container">
          <div className="title-page">
            <h2>Tất cả sản phẩm</h2>
          </div>
          <ul className="breadcrumb">
            <li className="home">
              <a href="/" title="Trang chủ">
                <span>Trang chủ</span>
              </a>
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </li>
            <li>
              <strong>
                <span>{brands?.name || "Thương hiệu không xác định"}</span>
              </strong>
            </li>
            <li></li>
          </ul>
        </div>
      </section>
      <main>
        <div className="container1">
          <div className="row">
            <div className="wrapper">
       <SidebarFilter
                categories={categories}
                openCategoryId={openCategoryId}
                toggleCategory={toggleCategory}
                brandsList={brandsList}
                selectedBrandIds={selectedBrandIds}
                handleBrandCheckboxChange={handleBrandCheckboxChange}
                selectedGender={selectedGender}
                handleGenderChange={setSelectedGender}
                
              />
              <div className="main_container collection col-lg-9 col-md-9 col-md-push-3 col-lg-push-3">
                <div className="category-products products">
                  <div className="sortPagiBar">
                    <div className="row">
                      <div className="col-xs-5 col-md-6 col-sm-6">
                        <div className="hidden-xs">
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              changeViewMode("grid");
                            }}
                          >
                            <span
                              className={`btn button-view-mode view-mode-grid ${
                                viewMode === "grid" ? "active" : ""
                              }`}
                            >
                              <i className="fa fa-th" aria-hidden="true"></i>
                            </span>
                          </a>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              changeViewMode("list");
                            }}
                          >
                            <span
                              className={`btn button-view-mode view-mode-list ${
                                viewMode === "list" ? "active" : ""
                              }`}
                            >
                              <i
                                className="fa fa-th-list"
                                aria-hidden="true"
                              ></i>
                            </span>
                          </a>

                          <div className="tt hidden">
                            <div id="ttfix" className="hidden-sm hidden-xs">
                              Hiển thị <span>1</span> - <span>12</span> trong
                              tổng số <span></span> sản phẩm
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xs-12 col-md-6 col-sm-6 text-xs-left text-sm-right">
                        <div id="sort-by">
                          <label className="left">Sắp xếp: </label>
                          <ul>
                            <li>
                              <span className="val">Mặc định</span>
                              <ul className="ul_2">
                                <li>
                                  <a href="#">Mặc định</a>
                                </li>
                                <li>
                                  <a href="#">A → Z</a>
                                </li>
                                <li>
                                  <a href="#">Z → A</a>
                                </li>
                                <li>
                                  <a href="#">Giá tăng dần</a>
                                </li>
                                <li>
                                  <a href="#">Giá giảm dần</a>
                                </li>
                                <li>
                                  <a href="#">Hàng mới nhất</a>
                                </li>
                                <li>
                                  <a href="#">Hàng cũ nhất</a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {viewMode === "grid" && (
                  <div className="product-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {products.map((sp) => (
                      <div
                        className="product-itemlist-main !block"
                        key={sp.products_id}
                      >
                        <div className="product-card" style={{ width: "100%" }}>
                          <div className="product-image relative h-48">
                            <Link href={`/product/${sp.slug}`}>
                              <img
                                src={
                                  sp.images?.[0]?.url ||
                                  "/images/placeholder.png"
                                }
                                alt={sp.name}
                                className="w-full h-full object-cover rounded"
                              />
                            </Link>
                            <div className="product-icons absolute top-1 right-1">
                              <i className="fa-solid fa-heart always-show"></i>
                              <div className="hover-icons">
                                <i className="fa-solid fa-eye"></i>
                        <i className="fa fa-shopping-bag position-relative"></i>
                                <i className="fa fa-exchange"></i>
                              </div>
                            </div>
                            <span className="discount-tag absolute top-1 left-1 text-white text-xs px-2 py-0.5 rounded">
                              -
                              {Math.round(
                                ((Number(sp.price) - Number(sp.sale_price)) /
                                  Number(sp.price)) *
                                  100
                              )}
                              %
                            </span>
                          </div>

                          <div className="product-colors flex gap-1 mt-2">
                            {[
                              ...new Map(
                                sp.product_variants.map((v) => [
                                  v.color.id,
                                  v.color,
                                ])
                              ).values(),
                            ].map((color) => (
                              <span
                                key={color.id}
                                className="w-4 h-4 rounded-full border"
                                style={{ backgroundColor: color.code_color }}
                              ></span>
                            ))}
                          </div>

                          <h4 className="product-title text-sm font-semibold mt-2">
                            {sp.name}
                          </h4>

                          <div className="product-price text-red-500 font-bold">
                            <span className="old-price text-gray-400 text-sm line-through mr-2">
                              {Number(sp.price).toLocaleString("vi")}đ
                            </span>
                            <span className="new-price">
                              {Number(sp.sale_price).toLocaleString("vi")}đ
                            </span>
                          </div>

                          <div className="product-rating mt-1">
                            {Array.from({ length: 5 }, (_, i) =>
                              i <
                              (sp.reviews?.length
                                ? Math.round(
                                    sp.reviews.reduce(
                                      (s, r) => s + Number(r.rating),
                                      0
                                    ) / sp.reviews.length
                                  )
                                : 0) ? (
                                <i
                                  key={i}
                                  className="fa-solid fa-star text-yellow-400"
                                ></i>
                              ) : (
                                <i
                                  key={i}
                                  className="fa-regular fa-star text-gray-300"
                                ></i>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {viewMode === "list" && (
                  <div className="product-grid-column flex flex-col gap-4">
                    {products.map((sp) => (
                      <div
                        className="product-itemlist-main"
                        key={sp.products_id}
                      >
                        <div
                          className="product-card-list flex bg-white p-4 border border-gray-200 rounded"
                          style={{ width: "100%" }}
                        >
                          <div className="product-image w-48 h-48 flex-shrink-0 relative">
                            <Link href={`/product/${sp.slug}`}>
                              <img
                                src={
                                  sp.images?.[0]?.url ||
                                  "/images/placeholder.png"
                                }
                                alt={sp.name}
                                className="w-full h-full object-cover rounded"
                              />
                            </Link>
                            <div className="product-icons absolute top-1 right-1">
                              <i className="fa-solid fa-heart always-show"></i>
                              <div className="hover-icons">
                                <i className="fa-solid fa-eye"></i>
                        <i className="fa fa-shopping-bag position-relative"></i>
                                <i className="fa fa-exchange"></i>
                              </div>
                            </div>
                          </div>

                          <div className="ml-4 flex flex-col justify-between flex-grow">
                            <div>
                              <span className="discount-tag text-sm text-red-600 font-medium">
                                -
                                {Math.round(
                                  ((Number(sp.price) - Number(sp.sale_price)) /
                                    Number(sp.price)) *
                                    100
                                )}
                                %
                              </span>

                              <h4 className="product-title-column text-lg font-semibold mt-1">
                                {sp.name}
                              </h4>

                              <div className="product-price mt-1">
                                <span className="old-price text-gray-400 text-sm line-through mr-2">
                                  {sp.price.toLocaleString("vi")}đ
                                </span>
                                <span className="new-price text-red-500 font-bold">
                                  {sp.sale_price.toLocaleString("vi")}đ
                                </span>
                              </div>

                              <p className="text-sm mt-2 text-gray-600">
                                {sp.short_desc}...
                              </p>
                            </div>

                            <div className="flex flex-col gap-2 mt-2">
                              <div className="product-rating">
                                {Array.from({ length: 5 }, (_, i) =>
                                  i <
                                  (sp.reviews?.length
                                    ? Math.round(
                                        sp.reviews.reduce(
                                          (s, r) => s + Number(r.rating),
                                          0
                                        ) / sp.reviews.length
                                      )
                                    : 0) ? (
                                    <i
                                      key={i}
                                      className="fa-solid fa-star text-yellow-400"
                                    ></i>
                                  ) : (
                                    <i
                                      key={i}
                                      className="fa-regular fa-star text-gray-300"
                                    ></i>
                                  )
                                )}
                              </div>

                              <div className="product-colors flex gap-1">
                                {[
                                  ...new Map(
                                    sp.product_variants.map((v) => [
                                      v.color.id,
                                      v.color,
                                    ])
                                  ).values(),
                                ].map((color) => (
                                  <span
                                    key={color.id}
                                    className="w-4 h-4 rounded-full border"
                                    style={{
                                      backgroundColor: color.code_color,
                                    }}
                                  ></span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="pagination">
                  <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    className={`page-btn ${
                      page === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={page === 1}
                  >
                    <i className="fa-solid fa-chevron-left"></i>
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setPage(i + 1)}
                      className={`page-btn ${page === i + 1 ? "active" : ""}`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    className={`page-btn ${
                      page === totalPages ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={page === totalPages}
                  >
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div
        id="open-filters"
        className={isActive ? "move-left" : ""}
        onClick={toggleSidebar}
      >
        <i
          id="filter-icon"
          className={`fa ${isActive ? "fa-times" : "fa-filter"}`}
        ></i>
      </div>
                <MobileSidebarFilter
  isActive={isActive}
  categories={categories}
  openCategoryId={openCategoryId}
  toggleCategory={toggleCategory}
  brandsList={brandsList}
  selectedBrandIds={selectedBrandIds}
  handleBrandCheckboxChange={handleBrandCheckboxChange}
   selectedGender={selectedGender}
  handleGenderChange={handleGenderChange}
/>
    </>
  );
}
