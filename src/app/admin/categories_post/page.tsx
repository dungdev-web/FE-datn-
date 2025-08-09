"use client";
import { useState, useEffect, useMemo } from "react";
import "../css/categories_admin.css";
import Link from "next/link";
import { Category } from "@/types/blog";
import { useCategories } from "@/hooks/useBlog";
import { ArrowUpDown } from "lucide-react";

export default function Categories() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [filterId, setFilterId] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterActive, setFilterActive] = useState("");

  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const { categories: fetchedCategories, loading, error } = useCategories();

  const [sortBy, setSortBy] = useState<"name" | "created_at" | "updated_at">(
    "created_at"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (fetchedCategories.length > 0) {
      setCategories(fetchedCategories);
    }
  }, [fetchedCategories]);

  const filteredCategories = useMemo(() => {
    let data = [...categories];

    if (filterId.trim() !== "") {
      data = data.filter((cat) =>
        cat.category_post_id.toString().includes(filterId.trim())
      );
    }

    if (filterName.trim() !== "") {
      data = data.filter((cat) =>
        cat.name.toLowerCase().includes(filterName.trim().toLowerCase())
      );
    }
    if (filterActive.trim() !== "") {
      data = data.filter((cat) =>
        cat.slug.toLowerCase().includes(filterActive.trim().toLowerCase())
      );
    }

    if (searchText.trim() !== "") {
      const s = searchText.trim().toLowerCase();
      data = data.filter(
        (cat) =>
          cat.name.toLowerCase().includes(s) ||
          cat.slug.toLowerCase().includes(s) ||
          cat.category_post_id.toString().includes(s)
      );
    }

    // Sort
    data.sort((a, b) => {
      let aVal: any = a[sortBy];
      let bVal: any = b[sortBy];

      if (sortBy === "created_at" || sortBy === "updated_at") {
        aVal = aVal ? new Date(aVal).getTime() : 0;
        bVal = bVal ? new Date(bVal).getTime() : 0;
      }

      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return data;
  }, [
    categories,
    filterId,
    filterName,
    filterActive,
    searchText,
    sortBy,
    sortOrder,
  ]);

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const currentPageData = filteredCategories.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  useEffect(() => {
    setPage(1);
  }, [filterId, filterName, filterActive, searchText]);

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
                style={{ cursor: "pointer" }}
                onClick={() => handleSort("name")}
              />{" "}
            </th>
            <th>Slug</th>
            <th>Parent ID</th>
            <th title="Sort by Created At">
              Ngày tạo{" "}
              <ArrowUpDown
                className="inline-block ml-2 w-4 h-4 cursor-pointer"
                style={{ cursor: "pointer" }}
                onClick={() => handleSort("created_at")}
              />{" "}
            </th>
            <th title="Sort by Updated At">
              Ngày sửa{" "}
              <ArrowUpDown
                className="inline-block ml-2 w-4 h-4 cursor-pointer"
                style={{ cursor: "pointer" }}
                onClick={() => handleSort("updated_at")}
              />{" "}
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
              {/* Lọc theo trạng thái active, nếu có */}
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
          {currentPageData.length > 0 ? (
            currentPageData.map((cat) => (
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
                    href={`/admin/categories/edit/${cat.category_post_id}`}
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
