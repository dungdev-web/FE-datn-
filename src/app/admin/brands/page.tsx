"use client";
import { API_BASE_URL } from "@/config/env";
import "../../admin/css/brands_admin.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getBrands,
  updateBrandStatus,
  deleteBrand,
} from "@/services/brandService";
import { IBrand } from "@/types/IBrand";
import { ArrowUpDown } from "lucide-react";
import { toast } from "react-toastify";
import { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

export default function Brands() {
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    currentPage: 1,
  });

  const [filterId, setFilterId] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [sortConfig, setSortConfig] = useState<{
    sortBy: string;
    sortOrder: "asc" | "desc";
  }>({ sortBy: "", sortOrder: "asc" });

  const [loadingStatusId, setLoadingStatusId] = useState<number | null>(null);
  const [loadingDeleteId, setLoadingDeleteId] = useState<number | null>(null); // loading khi xóa

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
        return {
          sortBy: field,
          sortOrder: prev.sortOrder === "asc" ? "desc" : "asc",
        };
      }
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

  const handleToggleStatus = async (brandId: number, currentStatus: number) => {
    const newStatus = currentStatus === 1 ? 0 : 1;

    const result = await Swal.fire({
      title: "Xác nhận",
      text: `Bạn có chắc muốn ${
        newStatus === 1 ? "bật" : "tắt"
      } thương hiệu này?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Có",
      cancelButtonText: "Hủy",
    });

    if (!result.isConfirmed) return;

    setLoadingStatusId(brandId);

    try {
      const ok = await updateBrandStatus(brandId, newStatus);

      if (ok) {
        setBrands((prev) =>
          prev.map((b) =>
            b.brand_id === brandId ? { ...b, status: newStatus } : b
          )
        );

        Swal.fire({
          title: "Thành công",
          text: "Cập nhật trạng thái thành công!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          title: "Lỗi",
          text: "Cập nhật trạng thái thất bại!",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Lỗi đổi trạng thái:", error);
      Swal.fire({
        title: "Lỗi",
        text: "Cập nhật trạng thái thất bại!",
        icon: "error",
      });
    } finally {
      setLoadingStatusId(null);
    }
  };

  const handleDeleteBrand = async (brandId: number, brandName: string) => {
    const result = await Swal.fire({
      title: `Bạn có chắc muốn xóa nhãn hiệu "${brandName}" không?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có, xóa đi!",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      setLoadingDeleteId(brandId);
      try {
        await deleteBrand(brandId);
        setBrands((prev) => prev.filter((b) => b.brand_id !== brandId));

        Swal.fire("Đã xóa!", "Nhãn hiệu đã được xóa thành công.", "success");

        if (brands.length === 1 && pagination.currentPage > 1) {
          changePage(pagination.currentPage - 1);
        }
      } catch (error: any) {
        console.error("Lỗi khi xóa nhãn hiệu:", error);
        Swal.fire("Lỗi!", error.message || "Xóa nhãn hiệu thất bại!", "error");
      } finally {
        setLoadingDeleteId(null);
      }
    }
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
                    disabled={loadingStatusId === brand.brand_id}
                    onChange={() =>
                      handleToggleStatus(brand.brand_id, brand.status)
                    }
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
                  style={{
                    cursor:
                      loadingDeleteId === brand.brand_id
                        ? "not-allowed"
                        : "pointer",
                    opacity: loadingDeleteId === brand.brand_id ? 0.5 : 1,
                  }}
                  onClick={() => {
                    if (loadingDeleteId === brand.brand_id) return; // đang xóa thì không cho click
                    handleDeleteBrand(brand.brand_id, brand.name);
                  }}
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

      <Toaster position="top-right" />
    </div>
  );
}
