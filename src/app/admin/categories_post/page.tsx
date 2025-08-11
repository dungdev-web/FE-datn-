"use client";
import { useState, useEffect } from "react";
import "../css/categories_admin.css";
import Link from "next/link";
import { Category } from "@/types/blog";
import { getCategory } from "@/services/blogService";
import { ArrowUpDown } from "lucide-react";

export default function Categories() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [filterId, setFilterId] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterActive, setFilterActive] = useState("");

  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [sortBy, setSortBy] = useState<"name" | "created_at" | "updated_at">(
    "created_at"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const [categories, setCategories] = useState<Category[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getCategory({
        page,
        name: filterName || searchText,
        id: filterId ? Number(filterId) : undefined,
        slug: filterActive || undefined,
        sortBy,
        sortOrder,
      });
      setCategories(res.data);
      setTotalPages(res.totalPages);
    } catch (error) {
      console.error("Lỗi khi load categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, filterId, filterName, filterActive, searchText, sortBy, sortOrder]);

  const handleSort = (field: "name" | "created_at" | "updated_at") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="category-list">
      <h2>Danh sách danh mục bài viết</h2>

      <div className="actions">
        <Link href={"/admin/categories_post/add"} className="btn btn-add">
          <i className="fa-solid fa-plus"></i> Thêm mới danh mục bài viết
        </Link>
        <button
          className="btn btn-refresh"
          onClick={() => {
            setPage(1);
            setFilterId("");
            setFilterName("");
            setFilterActive("");
            setSearchText("");
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

      <table className="category-table">
        <thead>
          <tr>
            <th>ID</th>
            <th title="Sort by Name">
              Tên danh mục{" "}
              <ArrowUpDown
                className="inline-block ml-2 w-4 h-4 cursor-pointer"
                onClick={() => handleSort("name")}
              />
            </th>
            <th>Slug</th>
            <th>Parent ID</th>
            <th title="Sort by Created At">
              Ngày tạo{" "}
              <ArrowUpDown
                className="inline-block ml-2 w-4 h-4 cursor-pointer"
                onClick={() => handleSort("created_at")}
              />
            </th>
            <th title="Sort by Updated At">
              Ngày sửa{" "}
              <ArrowUpDown
                className="inline-block ml-2 w-4 h-4 cursor-pointer"
                onClick={() => handleSort("updated_at")}
              />
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
              <input
                type="text"
                placeholder="Lọc slug..."
                value={filterActive}
                onChange={(e) => setFilterActive(e.target.value)}
              />
            </th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={7}>Đang tải...</td>
            </tr>
          ) : categories.length > 0 ? (
            categories.map((cat) => (
              <tr key={cat.category_post_id}>
                <td className="!text-center">{cat.category_post_id}</td>
                <td>{cat.name}</td>
                <td>{cat.slug}</td>
                <td>{cat.parent_id ?? "-"}</td>
                <td>
                  {cat.created_at
                    ? new Date(cat.created_at).toLocaleDateString("vi-VN")
                    : "-"}
                </td>
                <td>
                  {cat.updated_at
                    ? new Date(cat.updated_at).toLocaleDateString("vi-VN")
                    : "-"}
                </td>
                <td>
                  <Link
                    href={`/admin/categories_post/${cat.category_post_id}`}
                    className="btn btn-edit"
                  >
                    <i className="fa-solid fa-pen-to-square"></i> Sửa
                  </Link>
                  <button className="btn btn-delete">
                    <i className="fa-solid fa-trash"></i> Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button
          className="page-btn"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          <i className="fa-solid fa-angle-left"></i>
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`page-btn ${page === i + 1 ? "active" : ""}`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="page-btn"
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          <i className="fa-solid fa-angle-right"></i>
        </button>
      </div>
    </div>
  );
}
