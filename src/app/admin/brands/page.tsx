"use client";
import { API_BASE_URL } from "@/config/env";
import "../../admin/css/brands_admin.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getBrands } from "@/services/brandService";
import { IBrand } from "@/types/IBrand";
import { ArrowUpDown } from "lucide-react";

export default function Brands() {
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    currentPage: 1,
  });

  // Bộ lọc
  const [filterId, setFilterId] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Sắp xếp
  const [sortConfig, setSortConfig] = useState<{
    sortBy: string;
    sortOrder: "asc" | "desc";
  }>({ sortBy: "", sortOrder: "asc" });

  const fetchBrands = async () => {
    const result = await getBrands({
      keyword: searchText || undefined,
      id: filterId ? Number(filterId) : undefined,
      name: filterName || undefined,
      status: filterStatus !== "" ? Number(filterStatus) : undefined,
      page: pagination.currentPage,
      limit: 5,
      sortBy: sortConfig.sortBy || undefined,
      sortOrder: sortConfig.sortBy ? sortConfig.sortOrder : undefined,
    });

    setBrands(result.data);
    setPagination({
      total: result.total,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
    });
  };

  const changePage = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const handleSort = (field: string) => {
    setSortConfig((prev) => {
      if (prev.sortBy === field) {
        // Đảo chiều sắp xếp
        return {
          sortBy: field,
          sortOrder: prev.sortOrder === "asc" ? "desc" : "asc",
        };
      }
      // Chuyển sang cột mới, mặc định asc
      return { sortBy: field, sortOrder: "asc" };
    });
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  useEffect(() => {
    fetchBrands();
  }, [
    filterId,
    filterName,
    filterStatus,
    pagination.currentPage,
    searchText,
    sortConfig,
  ]);

  const SortIcon = ({ field }: { field: string }) => {
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

  return (
    <div className="brand-list">
      <h2>Danh sách nhãn hiệu</h2>

      <div className="actions">
        <Link href="/admin/brands/add" className="btn btn-add">
          <i className="fa-solid fa-plus"></i> Thêm mới nhãn hiệu
        </Link>
        <button className="btn btn-refresh" onClick={fetchBrands}>
          <i className="fa-solid fa-rotate-right"></i> Refresh
        </button>
        <div className={`search-toggle ${isSearching ? "active" : ""}`}>
          {isSearching ? (
            <input
              type="text"
              className="search-input"
              autoFocus
              placeholder="Nhập từ khóa..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setPagination((prev) => ({ ...prev, currentPage: 1 }));
                  fetchBrands();
                }
              }}
              onBlur={() => {
                if (searchText === "") setIsSearching(false);
              }}
            />
          ) : (
            <button
              className="btn btn-search"
              onClick={() => setIsSearching(true)}
            >
              <i className="fa-solid fa-magnifying-glass"></i> Tìm kiếm
            </button>
          )}
        </div>
      </div>

      <table className="brand-table">
        <thead>
          <tr>
            <th className="px-4 py-2">
              ID <SortIcon field="brand_id" />
            </th>
            <th className="px-4 py-2">
              Tên nhãn hiệu <SortIcon field="name" />
            </th>
            <th className="px-4 py-2">Ảnh nhãn hiệu</th>
            <th className="px-4 py-2">
              Trạng thái nhãn hiệu <SortIcon field="status" />
            </th>
            <th className="px-4 py-2">
              Ngày tạo danh mục <SortIcon field="created_at" />
            </th>
            <th className="px-4 py-2">
              Ngày sửa danh mục <SortIcon field="updated_at" />
            </th>
            <th className="px-4 py-2">Thao tác</th>
          </tr>
          <tr className="filter-row">
            <th>
              <input
                type="text"
                placeholder="Lọc ID..."
                value={filterId}
                onChange={(e) => setFilterId(e.target.value)}
              />
            </th>
            <th>
              <input
                type="text"
                placeholder="Lọc tên..."
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
              />
            </th>
            <th></th>
            <th>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">Tất cả</option>
                <option value="1">Hoạt động</option>
                <option value="0">Không hoạt động</option>
              </select>
            </th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand) => (
            <tr key={brand.brand_id}>
              <td>{brand.brand_id}</td>
              <td>{brand.name}</td>
              <td>
                <img
                  src={
                    brand.logo_url
                      ? `${API_BASE_URL}/uploads/${brand.logo_url}`
                      : "/images/placeholder.png"
                  }
                  alt={brand.name}
                  className="brand-logo"
                />
              </td>
              <td className="status-column">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={brand.status === 1}
                    readOnly
                  />
                  <span className="slider round"></span>
                </label>
              </td>
              <td>{new Date(brand.created_at).toLocaleString("vi-VN")}</td>
              <td>{new Date(brand.updated_at).toLocaleString("vi-VN")}</td>
              <td>
                <Link href={`/admin/brands/edit/${brand.brand_id}`}>
                  <i
                    className="fa-solid fa-pen edit-icon"
                    title="Sửa nhãn hiệu"
                  ></i>
                </Link>
                <i
                  className="fa-solid fa-trash delete-icon"
                  title="Xóa nhãn hiệu"
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          className="page-btn"
          disabled={pagination.currentPage === 1}
          onClick={() => changePage(pagination.currentPage - 1)}
        >
          <i className="fa-solid fa-angle-left"></i>
        </button>
        {Array.from({ length: pagination.totalPages }, (_, i) => (
          <button
            key={i}
            className={`page-btn ${
              pagination.currentPage === i + 1 ? "active" : ""
            }`}
            onClick={() => changePage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="page-btn"
          disabled={pagination.currentPage === pagination.totalPages}
          onClick={() => changePage(pagination.currentPage + 1)}
        >
          <i className="fa-solid fa-angle-right"></i>
        </button>
      </div>
    </div>
  );
}
