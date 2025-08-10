"use client";
import { useEffect, useState } from "react";
import "../css/categories_admin.css";
import Link from "next/link";
import { ArrowUpDown } from "lucide-react";

interface ICategory {
  categories_id: number;
  name: string;
  slug: string;
  parent_id: number | null;
  image: string;
  status: number;
  created_at: string;
  updated_at: string;
  children?: ICategory[];
}

type SortOrder = "asc" | "desc";

export default function Categories() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [filterId, setFilterId] = useState("");
  const [filterName, setFilterName] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // State sort
  const [sortConfig, setSortConfig] = useState<{ sortBy: string; sortOrder: SortOrder }>({
    sortBy: "",
    sortOrder: "asc",
  });

  // Hàm fetch categories theo params filter + sort + page
  const fetchCategories = async () => {
    try {
      const params = new URLSearchParams();
      params.append("page", String(page));
      params.append("limit", String(limit));

      if (filterId.trim() !== "") {
        params.append("id", filterId.trim());
      }
      if (filterName.trim() !== "") {
        params.append("name", filterName.trim());
      }
      if (searchText.trim()) {
        params.append("keyword", searchText.trim());
      }
      if (statusFilter === "true") params.append("status", "1");
      else if (statusFilter === "false") params.append("status", "0");

      if (sortConfig.sortBy) {
        params.append("sortBy", sortConfig.sortBy);
        params.append("sortOrder", sortConfig.sortOrder);
      }

      const res = await fetch(`http://localhost:3000/category?${params.toString()}`);
      if (!res.ok) throw new Error("Lỗi khi lấy danh mục");
      const json = await res.json();

      setCategories(json.data || []);
      setTotalPages(json.totalPages || 1);
    } catch (error) {
      console.error(error);
      setCategories([]);
    }
  };

  // Reset page khi filter hoặc sort thay đổi
  useEffect(() => {
    setPage(1);
  }, [filterId, filterName, statusFilter, searchText, sortConfig]);

  // Gọi API khi page, filter hoặc sort thay đổi
  useEffect(() => {
    fetchCategories();
  }, [page, filterId, filterName, statusFilter, searchText, sortConfig]);

  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  // Xử lý sort
  const handleSort = (field: string) => {
    setSortConfig((prev) => {
      if (prev.sortBy === field) {
        return {
          sortBy: field,
          sortOrder: prev.sortOrder === "asc" ? "desc" : "asc",
        };
      } else {
        return { sortBy: field, sortOrder: "asc" };
      }
    });
  };

  // Component icon sort với onClick truyền từ ngoài
  const SortIcon = ({
    field,
    onClick,
  }: {
    field: string;
    onClick: () => void;
  }) => {
    const active = sortConfig.sortBy === field;
    const direction = active ? sortConfig.sortOrder : undefined;
    return (
      <button
        type="button"
        title={`Sắp xếp theo ${field} (${direction ?? "chưa chọn"})`}
        className="inline-block ml-2 p-0 border-0 bg-transparent align-middle"
        onClick={onClick}
        style={{ lineHeight: 0 }}
        aria-label={`Sắp xếp theo ${field} (${direction ?? "chưa chọn"})`}
      >
        <ArrowUpDown
          className={`w-4 h-4 cursor-pointer ${
            active ? "text-blue-500" : "text-gray-400"
          } ${direction === "asc" ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
    );
  };

  return (
    <div className="category-list">
      <h2>Danh sách danh mục</h2>

      <div className="actions">
        <Link href={"/admin/categories/add"} className="btn btn-add">
          <i className="fa-solid fa-plus"></i> Thêm mới danh mục
        </Link>
        <button
          className="btn btn-refresh"
          onClick={() => {
            setSearchText("");
            setStatusFilter("");
            setFilterId("");
            setFilterName("");
            setSortConfig({ sortBy: "", sortOrder: "asc" });
            setPage(1);
          }}
        >
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
                  setPage(1);
                  setIsSearching(false);
                }
              }}
              onBlur={() => {
                if (searchText === "") setIsSearching(false);
              }}
            />
          ) : (
            <button className="btn btn-search" onClick={() => setIsSearching(true)}>
              <i className="fa-solid fa-magnifying-glass"></i> Tìm kiếm
            </button>
          )}
        </div>
      </div>

      <table className="category-table">
        <thead>
          <tr>
            <th className="px-4 py-2">
              ID <SortIcon field="categories_id" onClick={() => handleSort("categories_id")} />
            </th>
            <th>
              Tên danh mục <SortIcon field="name" onClick={() => handleSort("name")} />
            </th>
            <th>Trạng thái danh mục</th>
            <th>Ảnh</th>
            <th>
              Ngày tạo <SortIcon field="created_at" onClick={() => handleSort("created_at")} />
            </th>
            <th>
              Ngày sửa <SortIcon field="updated_at" onClick={() => handleSort("updated_at")} />
            </th>
            <th>Thao tác</th>
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
            <th>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                }}
              >
                <option value="">Tất cả</option>
                <option value="true">Hoạt động</option>
                <option value="false">Không hoạt động</option>
              </select>
            </th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ textAlign: "center" }}>
                Không có danh mục
              </td>
            </tr>
          ) : (
            categories.map((cat) => (
              <tr key={cat.categories_id}>
                <td>{cat.categories_id}</td>
                <td>{cat.name}</td>
                <td className="status-column">
                  <label className="switch">
                    <input type="checkbox" checked={cat.status === 1} readOnly />
                    <span className="slider round"></span>
                  </label>
                </td>
                <td>
                  <img
                    src={`http://localhost:3000/uploads/${cat.image}`}
                    alt={cat.name}
                    style={{ width: 50, height: 50, objectFit: "contain" }}
                  />
                </td>
                <td>{new Date(cat.created_at).toLocaleString("vi-VN")}</td>
                <td>{new Date(cat.updated_at).toLocaleString("vi-VN")}</td>
                <td>
                  <Link href={`/admin/categories/edit/${cat.categories_id}`}>
                    <i className="fa-solid fa-pen edit-icon" title="Sửa danh mục"></i>
                  </Link>
                  <i
                    className="fa-solid fa-trash delete-icon"
                    title="Xóa danh mục"
                    style={{ cursor: "pointer", marginLeft: 10 }}
                    onClick={() => alert(`Xóa danh mục ${cat.categories_id} - ${cat.name}`)}
                  ></i>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button className="page-btn" disabled={page <= 1} onClick={() => goToPage(page - 1)}>
          <i className="fa-solid fa-angle-left"></i>
        </button>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i + 1}
            className={`page-btn ${page === i + 1 ? "active" : ""}`}
            onClick={() => goToPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button className="page-btn" disabled={page >= totalPages} onClick={() => goToPage(page + 1)}>
          <i className="fa-solid fa-angle-right"></i>
        </button>
      </div>
    </div>
  );
}
