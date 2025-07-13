"use client";
import { useState, useEffect } from "react";
import { IProduct } from "@/types/product";
import { getAllProducts } from "@/services/productService";
import Link from "next/link";
import { ICategory } from "@/types/ICategory";
import { getCategories } from "@/services/categoryService";
import "@/app/(client)/css/pagination.css";
import { ChevronDown, ChevronRight } from "lucide-react";
import { getBrands, getProductsByBrandId } from "@/services/brandService";
import { IBrand } from "@/types/IBrand";
import { useParams } from "next/navigation";

export default function Product() {
  const params = useParams();
  const brandId = Number(params.id);

  const [brandsList, setBrandsList] = useState<IBrand[]>([]);
  const [selectedBrandIds, setSelectedBrandIds] = useState<number[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [viewMode, setViewMode] = useState("grid");
  const [isActive, setIsActive] = useState(false);
  const [openCategoryId, setOpenCategoryId] = useState<number | null>(null);
  const productsPerPage = viewMode === "grid" ? 12 : 6;
  const totalPages = Math.ceil(total / productsPerPage);

  useEffect(() => {
    async function fetchBrands() {
      try {
        const fetchedBrands = await getBrands();
        setBrandsList(Array.isArray(fetchedBrands) ? fetchedBrands : []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách brand:", error);
      }
    }

    fetchBrands();
  }, []);


  useEffect(() => {
    async function fetchFilteredProducts() {
      try {
        if (selectedBrandIds.length === 0) {
          // Không chọn brand nào → lấy theo brandId
          const allProducts = await getProductsByBrandId(brandId);
          setProducts(allProducts);
          setTotal(allProducts.length);
        } else {
          let combined: IProduct[] = [];
          for (const id of selectedBrandIds) {
            const brandProducts = await getProductsByBrandId(id);
            combined = [...combined, ...brandProducts];
          }
          setProducts(combined);
          setTotal(combined.length);
        }
      } catch (error) {
        console.error("Lỗi khi lọc sản phẩm theo brand:", error);
      }
    }

    fetchFilteredProducts();
  }, [selectedBrandIds, brandId]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts(page, productsPerPage);
        const fetched = await getCategories();
        setCategories(Array.isArray(fetched) ? fetched : []);
        setProducts(res.data);
        setTotal(res.total);
      } catch (err) {
        console.error("Lỗi lấy sản phẩm hoặc danh mục:", err);
      }
    };

    fetchProducts();
  }, [page, viewMode]);


  const handleBrandCheckboxChange = (brandId: number) => {
    setSelectedBrandIds((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
  };

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
              <div className="col-lg-3 col-test">
                <aside className="aside-item collection-category">
                  <div className="aside-title">
                    <h2 className="title-head margin-top-0">
                      <span>Danh mục</span>
                    </h2>
                  </div>
                  <div className="categories-box">
                    <ul className="lv1">
                      {categories.map((cat) => (
                        <li
                          key={cat.categories_id}
                          className="nav-item nav-items"
                        >
                          <Link
                            href={`/category/${cat.slug}`}
                            type="button"
                            className={`nav-button ${
                              openCategoryId === cat.categories_id ? "open" : ""
                            }`}
                            onClick={() => toggleCategory(cat.categories_id)}
                          >
                            {cat.name}
                            {cat.children && cat.children.length > 0 && (
                              <span className="arrow">
                                {openCategoryId === cat.categories_id ? (
                                  <ChevronDown size={16} />
                                ) : (
                                  <ChevronRight size={16} />
                                )}
                              </span>
                            )}
                          </Link>

                          {cat.children &&
                            cat.children.length > 0 &&
                            openCategoryId === cat.categories_id && (
                              <ul className="lv2">
                                {cat.children.map((child) => (
                                  <li key={child.categories_id}>
                                    <Link href={`/category/${child.slug}`}>
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
                <div className="aside-filter">
                  <div className="aside-title">
                    <h2 className="title-head margin-top-0">
                      <span>Bộ lọc</span>
                    </h2>
                  </div>
                  <div className="filter-container">
                    <aside className="aside-item filter-price">
                      <div className="module-title">
                        <h2 className="title-head margin-top-0">
                          <span>Giá sản phẩm</span>
                        </h2>
                      </div>
                      <div className="aside-content filter-group">
                        <ul>
                          <li className="filter-item filter-item--check-box filter-item--green">
                            <span>
                              <label>
                                <input
                                  type="checkbox"
                                  id="filter-duoi-100-000d"
                                  data-group="Khoảng giá"
                                  data-field="price_min"
                                  data-text="Dưới 100.000đ"
                                  value="(<100000)"
                                  data-operator="OR"
                                />
                                <i className="fa"></i>
                                Giá dưới 100.000đ
                              </label>
                            </span>
                          </li>
                          <li className="filter-item filter-item--check-box filter-item--green">
                            <span>
                              <label>
                                <input
                                  type="checkbox"
                                  id="filter-100-000d-200-000d"
                                  data-group="Khoảng giá"
                                  data-field="price_min"
                                  data-text="100.000đ - 200.000đ"
                                  value="(>=100000 AND <200000)"
                                  data-operator="OR"
                                />
                                <i className="fa"></i>
                                100.000đ - 200.000đ
                              </label>
                            </span>
                          </li>
                          <li className="filter-item filter-item--check-box filter-item--green">
                            <span>
                              <label>
                                <input
                                  type="checkbox"
                                  id="filter-200-000d-300-000d"
                                  data-group="Khoảng giá"
                                  data-field="price_min"
                                  data-text="200.000đ - 300.000đ"
                                  value="(>=200000 AND <300000)"
                                  data-operator="OR"
                                />
                                <i className="fa"></i>
                                200.000đ - 300.000đ
                              </label>
                            </span>
                          </li>
                          <li className="filter-item filter-item--check-box filter-item--green">
                            <span>
                              <label>
                                <input
                                  type="checkbox"
                                  id="filter-300-000d-500-000d"
                                  data-group="Khoảng giá"
                                  data-field="price_min"
                                  data-text="300.000đ - 500.000đ"
                                  value="(>=300000 AND <500000)"
                                  data-operator="OR"
                                />
                                <i className="fa"></i>
                                300.000đ - 500.000đ
                              </label>
                            </span>
                          </li>
                          <li className="filter-item filter-item--check-box filter-item--green">
                            <span>
                              <label>
                                <input
                                  type="checkbox"
                                  id="filter-500-000d-1-000-000d"
                                  data-group="Khoảng giá"
                                  data-field="price_min"
                                  data-text="500.000đ - 1.000.000đ"
                                  value="(>500000 AND <1000000)"
                                  data-operator="OR"
                                />
                                <i className="fa"></i>
                                500.000đ - 1.000.000đ
                              </label>
                            </span>
                          </li>
                          <li className="filter-item filter-item--check-box filter-item--green">
                            <span>
                              <label>
                                <input
                                  type="checkbox"
                                  id="filter-tren1-000-000d"
                                  data-group="Khoảng giá"
                                  data-field="price_min"
                                  data-text="Trên 1.000.000đ"
                                  value="(>1000000)"
                                  data-operator="OR"
                                />
                                <i className="fa"></i>
                                Giá trên 1.000.000đ
                              </label>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </aside>
                    <aside className="aside-item filter-type">
                      <div className="module-title">
                        <h2 className="title-head margin-top-0">
                          <span>Loại</span>
                        </h2>
                      </div>
                      <div className="aside-content filter-group">
                        <ul>
                          <li className="filter-item filter-item--check-box filter-item--green">
                            <span>
                              <label>
                                <input
                                  type="checkbox"
                                  id="filter-giay-nam"
                                  data-group="Loại"
                                  data-field="product_type"
                                  data-text="Giày Nam"
                                  value="(Giày Nam)"
                                  data-operator="OR"
                                />
                                <i className="fa"></i>
                                Giày Nam
                              </label>
                            </span>
                          </li>
                          <li className="filter-item filter-item--check-box filter-item--green">
                            <span>
                              <label>
                                <input
                                  type="checkbox"
                                  id="filter-giay-nu"
                                  data-group="Loại"
                                  data-field="product_type"
                                  data-text="Giày Nữ"
                                  value="(Giày Nữ)"
                                  data-operator="OR"
                                />
                                <i className="fa"></i>
                                Giày Nữ
                              </label>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </aside>
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
                                    type="checkbox"
                                    id={`filter-${brand.brand_id}`}
                                    checked={selectedBrandIds.includes(
                                      brand.brand_id
                                    )}
                                    onChange={() =>
                                      handleBrandCheckboxChange(brand.brand_id)
                                    }
                                  />

                                  <i className="fa"></i>
                                  <span className="filter_tt">
                                    {brand.name}
                                  </span>
                                </label>
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </aside>
                  </div>
                </div>
                <aside className="aside-item hidden-767">
                  <div className="aside-content">
                    <a href="#" title="Thời trang nam">
                      <img
                        className="img-responsive center-block"
                        src="//bizweb.dktcdn.net/100/505/077/themes/934930/assets/aside_banner.png?1730865096645"
                        data-lazyload="//bizweb.dktcdn.net/100/505/077/themes/934930/assets/aside_banner.png?1730865096645"
                        alt="Thời trang nam"
                      />
                    </a>
                  </div>
                </aside>
              </div>
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
                                  sp.images?.[0]?.url ||
                                  "/images/placeholder.png"
                                }
                                alt={sp.name}
                              />
                            </Link>

                            <div className="product-icons">
                              <i className="fa-solid fa-heart always-show"></i>
                              <div className="hover-icons">
                                <i className="fa-solid fa-eye"></i>
                                <i className="fa-solid fa-list"></i>
                                <i className="fa fa-exchange"></i>
                              </div>
                            </div>

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
                                  className="color"
                                  data-color={color.name_color}
                                  style={{ backgroundColor: color.code_color }}
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
                                  style={{
                                    width: "87%",
                                  }}
                                >
                                  <span className="sold-info">
                                    Đã bán{" "}
                                    {sp.product_variants.reduce(
                                      (sum, v) => sum + v.stock_quantity,
                                      0
                                    )}{" "}
                                    sản phẩm
                                  </span>
                                </div>
                              </div>
                            </div>

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

                {viewMode === "list" && (
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
                                  sp.images?.[0]?.url ||
                                  "/images/placeholder.png"
                                }
                                alt={sp.name}
                              />
                            </Link>

                            <div className="product-icons">
                              <i className="fa-solid fa-heart always-show"></i>
                              <div className="hover-icons">
                                <i className="fa-solid fa-eye"></i>
                                <i className="fa-solid fa-list"></i>
                                <i className="fa fa-exchange"></i>
                              </div>
                            </div>
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
                                (sp.reviews?.length
                                  ? Math.round(
                                      sp.reviews.reduce(
                                        (s, r) => s + Number(r.rating),
                                        0
                                      ) / sp.reviews.length
                                    )
                                  : 0) ? (
                                  <i key={i} className="fa-solid fa-star"></i>
                                ) : (
                                  <i key={i} className="fa-regular fa-star"></i>
                                )
                              )}
                            </div>
                            <div className="product-colors">
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
                                  className="color"
                                  data-color={color.name_color}
                                  style={{ backgroundColor: color.code_color }}
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

      {/* <!-- Sidebar bộ lọc --> */}
      <div id="filter-sidebar" className={isActive ? "active" : ""}>
        <aside className="aside-item collection-category">
          <div className="aside-title">
            <h2 className="title-head margin-top-0">
              <span>Danh mục</span>
            </h2>
          </div>
          <div className="categories-box">
            <ul className="lv1">
              {categories.map((cat) => (
                <li key={cat.categories_id} className="nav-item nav-items ">
                  <Link
                    href={`/category/${cat.slug}`}
                    type="button"
                    className={` nav-button ${
                      openCategoryId === cat.categories_id ? "bg-gray-100" : ""
                    }`}
                    onClick={() => toggleCategory(cat.categories_id)}
                  >
                    <span>{cat.name}</span>
                    {cat.children && cat.children.length > 0 && (
                      <span className="arrow">
                        {openCategoryId === cat.categories_id ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                      </span>
                    )}
                  </Link>

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
        <div className="aside-filter">
          <div className="aside-title">
            <h2 className="title-head margin-top-0">
              <span>Bộ lọc</span>
            </h2>
          </div>
          <div className="filter-container">
            <aside className="aside-item filter-price">
              <div className="module-title">
                <h2 className="title-head margin-top-0">
                  <span>Giá sản phẩm</span>
                </h2>
              </div>
              <div className="aside-content filter-group">
                <ul>
                  <li className="filter-item filter-item--check-box filter-item--green">
                    <span>
                      <label>
                        <input
                          type="checkbox"
                          id="filter-duoi-100-000d"
                          data-group="Khoảng giá"
                          data-field="price_min"
                          data-text="Dưới 100.000đ"
                          value="(<100000)"
                          data-operator="OR"
                        />
                        <i className="fa"></i>
                        Giá dưới 100.000đ
                      </label>
                    </span>
                  </li>
                  <li className="filter-item filter-item--check-box filter-item--green">
                    <span>
                      <label>
                        <input
                          type="checkbox"
                          id="filter-100-000d-200-000d"
                          data-group="Khoảng giá"
                          data-field="price_min"
                          data-text="100.000đ - 200.000đ"
                          value="(>=100000 AND <200000)"
                          data-operator="OR"
                        />
                        <i className="fa"></i>
                        100.000đ - 200.000đ
                      </label>
                    </span>
                  </li>
                  <li className="filter-item filter-item--check-box filter-item--green">
                    <span>
                      <label>
                        <input
                          type="checkbox"
                          id="filter-200-000d-300-000d"
                          data-group="Khoảng giá"
                          data-field="price_min"
                          data-text="200.000đ - 300.000đ"
                          value="(>=200000 AND <300000)"
                          data-operator="OR"
                        />
                        <i className="fa"></i>
                        200.000đ - 300.000đ
                      </label>
                    </span>
                  </li>
                  <li className="filter-item filter-item--check-box filter-item--green">
                    <span>
                      <label>
                        <input
                          type="checkbox"
                          id="filter-300-000d-500-000d"
                          data-group="Khoảng giá"
                          data-field="price_min"
                          data-text="300.000đ - 500.000đ"
                          value="(>=300000 AND <500000)"
                          data-operator="OR"
                        />
                        <i className="fa"></i>
                        300.000đ - 500.000đ
                      </label>
                    </span>
                  </li>
                  <li className="filter-item filter-item--check-box filter-item--green">
                    <span>
                      <label>
                        <input
                          type="checkbox"
                          id="filter-500-000d-1-000-000d"
                          data-group="Khoảng giá"
                          data-field="price_min"
                          data-text="500.000đ - 1.000.000đ"
                          value="(>500000 AND <1000000)"
                          data-operator="OR"
                        />
                        <i className="fa"></i>
                        500.000đ - 1.000.000đ
                      </label>
                    </span>
                  </li>
                  <li className="filter-item filter-item--check-box filter-item--green">
                    <span>
                      <label>
                        <input
                          type="checkbox"
                          id="filter-tren1-000-000d"
                          data-group="Khoảng giá"
                          data-field="price_min"
                          data-text="Trên 1.000.000đ"
                          value="(>1000000)"
                          data-operator="OR"
                        />
                        <i className="fa"></i>
                        Giá trên 1.000.000đ
                      </label>
                    </span>
                  </li>
                </ul>
              </div>
            </aside>
            <aside className="aside-item filter-type">
              <div className="module-title">
                <h2 className="title-head margin-top-0">
                  <span>Loại</span>
                </h2>
              </div>
              <div className="aside-content filter-group">
                <ul>
                  <li className="filter-item filter-item--check-box filter-item--green">
                    <span>
                      <label>
                        <input
                          type="checkbox"
                          id="filter-giay-nam"
                          data-group="Loại"
                          data-field="product_type"
                          data-text="Giày Nam"
                          value="(Giày Nam)"
                          data-operator="OR"
                        />
                        <i className="fa"></i>
                        Giày Nam
                      </label>
                    </span>
                  </li>
                  <li className="filter-item filter-item--check-box filter-item--green">
                    <span>
                      <label>
                        <input
                          type="checkbox"
                          id="filter-giay-nu"
                          data-group="Loại"
                          data-field="product_type"
                          data-text="Giày Nữ"
                          value="(Giày Nữ)"
                          data-operator="OR"
                        />
                        <i className="fa"></i>
                        Giày Nữ
                      </label>
                    </span>
                  </li>
                </ul>
              </div>
            </aside>
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
                            type="checkbox"
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
        <aside className="aside-item hidden-767">
          <div className="aside-content">
            <a href="#" title="Thời trang nam">
              <img
                className="img-responsive center-block"
                src="/images/banner/aside_banner.webp"
                data-lazyload="/images/banner/aside_banner.webp"
                alt="Thời trang nam"
              />
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
