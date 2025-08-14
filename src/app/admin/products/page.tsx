"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpDown } from "lucide-react";
import { API_BASE_URL } from "@/config/env";
import { deleteAdminProduct, getProductsDashboard } from "@/services/productService"; // import đúng đường dẫn service của bạn
import "../css/product_admin.css";
import { getAllBrands } from "@/services/brandService";
import { getAllCategories } from "@/services/categoryService";
import { IBrand } from "@/types/IBrand";
import { ICategory } from "@/types/ICategory";
import { IProduct } from "@/types/product";
import Swal from "sweetalert2";

export default function Products() {
  // State dữ liệu
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);

  // State filter + search
  const [filters, setFilters] = useState({
    productCode: "",
    productName: "",
    brandId: "",
    categoryId: "",
    minPrice: "",
    maxPrice: "",
    minQuantity: "",
    maxQuantity: "",
  });

  // Sort state
  const [sortConfig, setSortConfig] = useState<{
    sortBy: string;
    sortOrder: "asc" | "desc";
  }>({
    sortBy: "created_at",
    sortOrder: "desc",
  });

  // Hàm gọi API lấy dữ liệu theo trang, filter, sort
  async function fetchProducts() {
    setLoading(true);
    try {
      const res = await getProductsDashboard({
        page: currentPage,
        limit: 5,
        sortField: sortConfig.sortBy,
        sortOrder: sortConfig.sortOrder,
        productCode: filters.productCode || undefined,
        productName: filters.productName || undefined,
        brandId: filters.brandId ? Number(filters.brandId) : undefined,
        categoryId: filters.categoryId ? Number(filters.categoryId) : undefined,
        minSalePrice: filters.minPrice ? Number(filters.minPrice) : undefined,
        maxSalePrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
        minQuantity: filters.minQuantity
          ? Number(filters.minQuantity)
          : undefined,
        maxQuantity: filters.maxQuantity
          ? Number(filters.maxQuantity)
          : undefined,
      });
      setProducts(res.data);
      setTotalPages(res.totalPages);
      setCurrentPage(res.currentPage);
    } catch (error) {
      alert("Lấy dữ liệu thất bại");
    }
    setLoading(false);
  }
  useEffect(() => {
    async function fetchFilterData() {
      const brandsData = await getAllBrands();
      const categoriesData = await getAllCategories();
      setBrands(brandsData);
      setCategories(categoriesData);
    }
    fetchFilterData();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, filters, sortConfig]);

  // Handle sort click
  function handleSort(field: string) {
    if (sortConfig.sortBy === field) {
      // toggle sort order
      setSortConfig({
        sortBy: field,
        sortOrder: sortConfig.sortOrder === "asc" ? "desc" : "asc",
      });
    } else {
      setSortConfig({
        sortBy: field,
        sortOrder: "asc",
      });
    }
    setCurrentPage(1); // reset trang về 1 khi sort
  }

  // Handle filter input change
  function handleFilterChange(e: { target: { name: any; value: any } }) {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1); // reset trang khi filter thay đổi
  }

  // Component icon sort
  const SortIcon: React.FC<{ field: string }> = ({ field }) => {
    const active = sortConfig.sortBy === field;
    const direction = active ? sortConfig.sortOrder : undefined;
    return (
      <ArrowUpDown
        className={`inline-block ml-2 w-4 h-4 cursor-pointer ${
          active ? "text-blue-500" : "text-gray-400"
        } ${direction === "asc" ? "rotate-180" : ""}`}
        onClick={() => handleSort(field)}
      />
    );
  };

  // Render product rows
  const renderRows = () => {
    if (loading)
      return (
        <tr>
          <td colSpan={12}>Đang tải dữ liệu...</td>
        </tr>
      );
    if (products.length === 0)
      return (
        <tr>
          <td colSpan={12}>Không có dữ liệu</td>
        </tr>
      );

    return products.map((product) => {
      // Lấy variant đầu tiên để lấy sku và số lượng kho
      const firstVariant = product.product_variants?.[0] || {};
      const sku = firstVariant.sku || "";
      const stockQuantity = firstVariant.stock_quantity || 0;
      // Lấy ảnh main đầu tiên
      const mainImage =
        product.images?.find((img) => img.type === "main") ||
        product.images?.[0];
      return (
        <tr key={product.products_id}>
          <td>{sku}</td>
          <td>{product.name}</td>
          <td>
            {mainImage ? (
              <img
                src={`${API_BASE_URL}/uploads/${mainImage.url}`}
                alt={mainImage.alt_text || product.name}
                className="product-img"
              />
            ) : (
              <span>Không có ảnh</span>
            )}
          </td>
          <td>{product.brand?.name || ""}</td>
          <td>
            <span className="category-tag">{product.category?.name || ""}</span>
          </td>
          <td>{product.price?.toLocaleString()}</td>
          <td>{product.sale_price?.toLocaleString()}</td>
          <td>{new Date(product.created_at).toLocaleDateString()}</td>
          <td>{new Date(product.updated_at).toLocaleDateString()}</td>
          <td>{stockQuantity}</td>
          <td>
            {/* Sửa sản phẩm */}
            <a
              href={`/admin/products/edit/${product.products_id}`}
              title="Sửa SP"
            >
              <i className="fa-solid fa-pen edit-icon" />
            </a>

         <button
    type="button"
    title="Xóa SP"
    className="delete-icon"
    onClick={async () => {
      Swal.fire({
        title: "Bạn chắc chắn muốn xóa?",
        text: "Hành động này không thể hoàn tác!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Xóa",
        cancelButtonText: "Hủy",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await deleteAdminProduct(product.products_id);
            Swal.fire({
              icon: "success",
              title: "Đã xóa!",
              text: "Sản phẩm đã bị xóa.",
              timer: 1500,
              showConfirmButton: false,
            });
            // reload lại danh sách
            window.location.reload();
          } catch (error: any) {
            Swal.fire({
              icon: "error",
              title: "Xóa thất bại",
              text: error.message || "Có lỗi xảy ra",
            });
          }
        }
      });
    }}
  >
    <i className="fa-solid fa-trash" />
  </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <div className="product-list">
        <h2>Danh sách sản phẩm</h2>

        <div className="actions">
          <Link href={"/admin/products/add"} className="btn btn-add">
            <i className="fa-solid fa-plus"></i> Thêm mới sản phẩm
          </Link>

          <button
            className="btn btn-refresh"
            onClick={() => fetchProducts()}
            disabled={loading}
          >
            <i className="fa-solid fa-rotate-right"></i> Refresh
          </button>
          <button className="btn btn-export">
            <i className="fa-solid fa-file-export"></i> Xuất dữ liệu
          </button>
        </div>

        <table className="product-table">
          <thead>
            <tr>
              <th>
                Mã SP <SortIcon field="sku" />
              </th>
              <th>
                Tên sản phẩm <SortIcon field="name" />
              </th>
              <th>Ảnh</th>
              <th>
                Nhãn hiệu <SortIcon field="brand_id" />
              </th>
              <th>
                Danh mục <SortIcon field="category_id" />
              </th>
              <th>
                Giá nhập <SortIcon field="price" />
              </th>
              <th>
                Giá bán <SortIcon field="sale_price" />
              </th>
              <th>
                Ngày tạo <SortIcon field="created_at" />
              </th>
              <th>
                Ngày sửa <SortIcon field="updated_at" />
              </th>
              <th>
                Số lượng <SortIcon field="stock_quantity" />
              </th>
              <th>Thao tác</th>
            </tr>

            <tr className="filter-row">
              <th>
                <input
                  type="text"
                  placeholder="Lọc mã..."
                  name="productCode"
                  value={filters.productCode}
                  onChange={handleFilterChange}
                />
              </th>
              <th>
                <input
                  type="text"
                  placeholder="Lọc tên..."
                  name="productName"
                  value={filters.productName}
                  onChange={handleFilterChange}
                />
              </th>
              <th></th>
              <th>
                <select
                  name="brandId"
                  value={filters.brandId}
                  onChange={handleFilterChange}
                >
                  <option value="">Tất cả</option>
                  {brands.map((brand) => (
                    <option key={brand.brand_id} value={brand.brand_id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </th>
              <th>
                <select
                  name="categoryId"
                  value={filters.categoryId}
                  onChange={handleFilterChange}
                >
                  <option value="">Tất cả</option>
                  {categories.map((cat) => (
                    <option key={cat.categories_id} value={cat.categories_id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </th>
              <th>
                <input
                  type="number"
                  placeholder="Giá nhập từ..."
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                />
              </th>
              <th>
                <input
                  type="number"
                  placeholder="Giá bán đến..."
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                />
              </th>
              <th></th>
              <th></th>
              <th>
                <input
                  type="number"
                  placeholder="Số lượng từ..."
                  name="minQuantity"
                  value={filters.minQuantity}
                  onChange={handleFilterChange}
                />
              </th>
              <th></th>
            </tr>
          </thead>

          <tbody>{renderRows()}</tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          <button
            className="page-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <button
                  key={page}
                  className={`page-btn ${page === currentPage ? "active" : ""}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              );
            }
            if (page === currentPage - 2 || page === currentPage + 2) {
              return <span key={page}>...</span>;
            }
            return null;
          })}

          <button
            className="page-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            <i className="fa-solid fa-angle-right"></i>
          </button>
        </div>
      </div>
    </>
  );
}
