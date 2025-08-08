"use client";
import { useEffect, useState } from "react";
import {
  getCategories,
  getProductsByCategorySlug,
} from "@/services/categoryService";
import Link from "next/link";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { IProduct } from "@/types/product";
import { ICategory } from "@/types/ICategory";
import { getBrands, getProductsByBrandId } from "@/services/brandService";
import { IBrand } from "@/types/IBrand";
import "@/app/(client)/css/pagination.css";
import { ChevronDown, ChevronRight } from "lucide-react";
import SidebarFilter from "src/app/(client)/component/Products/SidebarFilter";
import MobileSidebarFilter from "src/app/(client)/component/Products/MobileSidebarFilter";
import ProductIcons from "src/app/(client)/component/Products/ProductIcons";

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
  const [totalPages, setTotalPages] = useState(1);
  const searchParams = useSearchParams();
  const keyword = searchParams.get("q") || "";
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>(
    undefined
  );
  const handleSortChange = (type: string) => {
    switch (type) {
      case "A → Z":
        setSortBy("name");
        setSortOrder("asc");
        break;
      case "Z → A":
        setSortBy("name");
        setSortOrder("desc");
        break;
      case "Giá tăng dần":
        setSortBy("price");
        setSortOrder("asc");
        break;
      case "Giá giảm dần":
        setSortBy("price");
        setSortOrder("desc");
        break;
      case "Hàng mới nhất":
        setSortBy("created_at");
        setSortOrder("desc");
        break;
      case "Hàng cũ nhất":
        setSortBy("created_at");
        setSortOrder("asc");
        break;
      default:
        setSortBy(undefined);
        setSortOrder(undefined);
    }

    setPage(1); // reset lại trang đầu tiên khi sort
  };
  const resetAllFilters = () => {
    setSelectedBrandIds([]);
    setSelectedGender(null);
    setSelectedPriceRange(null);
    setPage(1);
  };
  const [selectedBrandIds, setSelectedBrandIds] = useState<number[]>([]);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<{
    min: number;
    max: number;
  } | null>(null);
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
  const handlePriceChange = (range: { min: number; max: number } | null) => {
    setSelectedPriceRange(range);
    setPage(1);
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
                <span>Tất cả sản phẩm</span>
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
                handleGenderChange={handleGenderChange}
                selectedPriceRange={selectedPriceRange}
                handlePriceChange={handlePriceChange}
                searchKeyword={keyword}
                currentPage={page}
                limit={productsPerPage}
                onProductsChange={(products, total, totalPages) => {
                  setProducts(products);
                  setTotal(total);
                  setTotalPages(totalPages);
                }}
                sortBy={sortBy}
                sortOrder={sortOrder}
                resetAllFilters={resetAllFilters}
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
                                {[
                                  "Mặc định",
                                  "A → Z",
                                  "Z → A",
                                  "Giá tăng dần",
                                  "Giá giảm dần",
                                  "Hàng mới nhất",
                                  "Hàng cũ nhất",
                                ].map((option) => (
                                  <li key={option}>
                                    <a
                                      href="#"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleSortChange(option);
                                      }}
                                    >
                                      {option}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {viewMode === "grid" && Array.isArray(products) && (
                  <div className="product-grid">
                    {products.map((sp) => (
                      <div
                        className="product-itemlist-main !block"
                        key={sp.products_id}
                      >
                        <div
                          className="product-card"
                          style={{ width: "230px" }}
                        >
                          <div className="product-image">
                            <Link href={`/product/${sp.slug}`}>
                              <img
                                src={
                                  sp.images?.[0]?.url
                                    ? `/images/products/chaybo/${sp.images[0].url}`
                                    : "/images/placeholder.png"
                                }
                                alt={sp.name}
                              />
                            </Link>

                            <ProductIcons
                              productId={sp.products_id}
                              variant_id={
                                sp.product_variants?.[0]?.product_variants_id
                              }
                              price={sp.sale_price}
                            />

                            <span className="discount-tag">
                              -
                              {Math.round(
                                ((Number(sp.price) - Number(sp.sale_price)) /
                                  Number(sp.price)) *
                                  100
                              )}
                              %
                            </span>

                            <div className="product-colors">
                              {Array.isArray(sp.product_variants) &&
                                [
                                  ...new Map(
                                    sp.product_variants.map((v) => [
                                      v.color.id,
                                      v.color,
                                    ])
                                  ).values(),
                                ].map((color) => (
                                  <span
                                    key={color.id}
                                    className="color"
                                    data-color={color.name_color}
                                    style={{
                                      backgroundColor: color.code_color,
                                    }}
                                  ></span>
                                ))}
                            </div>

                            <h4 className="product-title">{sp.name}</h4>

                            <div className="product-price">
                              <span className="old-price">
                                <del>
                                  {Number(sp.price).toLocaleString("vi")}đ
                                </del>
                              </span>
                              <span className="new-price">
                                {Number(sp.sale_price).toLocaleString("vi")}đ
                              </span>
                            </div>

                            <div className="hot-product-progress">
                              <div className="progress-bar">
                                <div
                                  className="progress-fill"
                                  style={{ width: "87%" }}
                                >
                                  <span className="sold-info">
                                    Đã bán{" "}
                                    {sp.product_variants?.reduce(
                                      (sum, v) => sum + v.stock_quantity,
                                      0
                                    ) || 0}{" "}
                                    sản phẩm
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="product-rating">
                              {Array.from({ length: 5 }, (_, i) =>
                                i <
                                (sp.product_reviews?.length
                                  ? Math.round(
                                      sp.product_reviews.reduce(
                                        (s, r) => s + Number(r.rating),
                                        0
                                      ) / sp.product_reviews.length
                                    )
                                  : 0) ? (
                                  <i key={i} className="fa-solid fa-star"></i>
                                ) : (
                                  <i key={i} className="fa-regular fa-star"></i>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {viewMode === "list" && Array.isArray(products) && (
                  <div className="product-grid-column">
                    {products.map((sp) => (
                      <div
                        className="product-itemlist-main"
                        key={sp.products_id}
                      >
                        <div
                          className="product-card-list"
                          style={{
                            width: "100% !important",
                            display: "flex",
                            background: "none",
                          }}
                        >
                          <div className="product-image">
                            <Link href={`/product/${sp.slug}`}>
                              <img
                                src={
                                  sp.images?.[0]?.url
                                    ? `/images/products/chaybo/${sp.images[0].url}`
                                    : "/images/placeholder.png"
                                }
                                alt={sp.name}
                              />
                            </Link>

                            <ProductIcons
                              productId={sp.products_id}
                              variant_id={
                                sp.product_variants?.[0]?.product_variants_id
                              }
                              price={sp.sale_price}
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="discount-tag">
                              -
                              {Math.round(
                                ((sp.price - sp.sale_price) / sp.price) * 100
                              )}
                              %
                            </span>

                            <h4
                              className="product-title-column"
                              style={{ fontSize: "larger" }}
                            >
                              {sp.name}
                            </h4>
                            <div className="product-price">
                              <span className="old-price">
                                <del>{sp.price.toLocaleString("vi")}đ</del>
                              </span>
                              <span className="new-price">
                                {sp.sale_price.toLocaleString("vi")}đ
                              </span>
                            </div>
                            <p
                              style={{
                                margin: "10px 0 6px 10px",
                                fontSize: "14px",
                              }}
                            >
                              {sp.short_desc}...
                            </p>

                            <div className="product-rating">
                              {Array.from({ length: 5 }, (_, i) =>
                                i <
                                (sp.product_reviews?.length
                                  ? Math.round(
                                      sp.product_reviews.reduce(
                                        (s, r) => s + Number(r.rating),
                                        0
                                      ) / sp.product_reviews.length
                                    )
                                  : 0) ? (
                                  <i key={i} className="fa-solid fa-star"></i>
                                ) : (
                                  <i key={i} className="fa-regular fa-star"></i>
                                )
                              )}
                            </div>
                            <div className="product-colors">
                              {Array.isArray(sp.product_variants) &&
                                [
                                  ...new Map(
                                    sp.product_variants.map((v) => [
                                      v.color.id,
                                      v.color,
                                    ])
                                  ).values(),
                                ].map((color) => (
                                  <span
                                    key={color.id}
                                    className="color"
                                    data-color={color.name_color}
                                    style={{
                                      backgroundColor: color.code_color,
                                    }}
                                  ></span>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pagination">
                  {/* Previous button */}
                  <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    className={`page-btn ${
                      page === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={page === 1}
                  >
                    <i className="fa-solid fa-chevron-left"></i>
                  </button>

                  {/* Page numbers with dots */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((p) => {
                      return (
                        p === 1 || // Trang đầu
                        p === totalPages || // Trang cuối
                        Math.abs(p - page) <= 1 // Trang gần hiện tại
                      );
                    })
                    .reduce((acc: (number | "...")[], curr, i, arr) => {
                      if (i > 0 && curr - (arr[i - 1] as number) > 1) {
                        acc.push("...");
                      }
                      acc.push(curr);
                      return acc;
                    }, [])
                    .map((p, i) =>
                      p === "..." ? (
                        <span key={`dots-${i}`} className="page-btn dots">
                          ...
                        </span>
                      ) : (
                        <button
                          key={p}
                          onClick={() => setPage(p)}
                          className={`page-btn ${page === p ? "active" : ""}`}
                        >
                          {p}
                        </button>
                      )
                    )}

                  {/* Next button */}
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
        selectedPriceRange={selectedPriceRange}
        handlePriceChange={handlePriceChange}
        searchKeyword={keyword}
        currentPage={page}
        limit={productsPerPage}
        onProductsChange={(products, total, totalPages) => {
          setProducts(products);
          setTotal(total);
          setTotalPages(totalPages);
        }}
        sortBy={sortBy}
        sortOrder={sortOrder}
      />
    </>
  );
}
