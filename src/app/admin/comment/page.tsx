"use client";
import "../css/comment_admin.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllProductReview } from "@/services/productService"; // import hàm service

export default function CommentPage() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    product_reviews_id: "",
    user_name: "",
    product_name: "",
    rating: "",
    content: "",
  });

  useEffect(() => {
  const delay = setTimeout(() => {
    fetchReviews();
  }, 500); 

  return () => clearTimeout(delay);
}, [filters, page]);


  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await getAllProductReview({
        page,
        limit,
        product_reviews_id: filters.product_reviews_id
          ? Number(filters.product_reviews_id)
          : undefined,
        user_name: filters.user_name ||searchText || undefined,
        product_name: filters.product_name ||searchText || undefined,
        rating: filters.rating ? Number(filters.rating) : undefined,
        search: filters.content || searchText || undefined,
      });

      setReviews(res.data || []);
      setTotalPages(res.total ? Math.ceil(res.total / limit) : 1);
    } catch (error) {
      console.error("Lỗi khi load dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateFilter = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setPage(1);
  };

  return (
    <div className="review-container">
      <h2>Quản lý bình luận sản phẩm</h2>

      <div className="review-actions">
        <button className="btn btn-refresh" onClick={fetchReviews}>
          <i className="fa-solid fa-rotate-right"></i> Làm mới
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
                  fetchReviews();
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
        <button className="btn btn-export">
          <i className="fa-solid fa-file-export"></i> Xuất Excel
        </button>
        <button className="btn btn-statistics">
          <i className="fa-solid fa-chart-bar"></i> Thống kê
        </button>
      </div>
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <>
          <table className="review-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Người dùng</th>
                <th>Sản phẩm</th>
                <th>Đánh giá</th>
                <th>Nội dung</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
              <tr className="filter-row">
                <th>
                  <input
                    type="text"
                    placeholder="Lọc ID..."
                    value={filters.product_reviews_id}
                    onChange={(e) =>
                      updateFilter("product_reviews_id", e.target.value)
                    }
                  />
                </th>
                <th>
                  <input
                    type="text"
                    placeholder="Lọc người dùng..."
                    value={filters.user_name}
                    onChange={(e) => updateFilter("user_name", e.target.value)}
                  />
                </th>
                <th>
                  <input
                    type="text"
                    placeholder="Lọc sản phẩm..."
                    value={filters.product_name}
                    onChange={(e) =>
                      updateFilter("product_name", e.target.value)
                    }
                  />
                </th>
                <th>
                  <select
                    value={filters.rating}
                    onChange={(e) => updateFilter("rating", e.target.value)}
                  >
                    <option value="">Tất cả</option>
                    <option value="1">★☆☆☆☆</option>
                    <option value="2">★★☆☆☆</option>
                    <option value="3">★★★☆☆</option>
                    <option value="4">★★★★☆</option>
                    <option value="5">★★★★★</option>
                  </select>
                </th>
                <th>
                  <input
                    type="text"
                    placeholder="Tìm nội dung..."
                    value={filters.content}
                    onChange={(e) => updateFilter("content", e.target.value)}
                  />
                </th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {reviews.length > 0 ? (
                reviews.map((item) => (
                  <tr key={item.product_reviews_id}>
                    <td>{item.product_reviews_id}</td>
                    <td>{item.user?.name}</td>
                    <td>{item.product?.name}</td>
                    <td>
                      {"★".repeat(item.rating) + "☆".repeat(5 - item.rating)}
                    </td>
                    <td>{item.content}</td>
                    <td>
                      <span
                        className={`status ${
                          item.status === "approved" ? "approved" : "pending"
                        }`}
                      >
                        {item.status === "approved" ? "Đã duyệt" : "Chờ duyệt"}
                      </span>
                    </td>
                    <td>
                      <i
                        className="fa-solid fa-eye view-icon"
                        title="Xem chi tiết"
                      ></i>
                      <i
                        className="fa-solid fa-pen edit-icon"
                        title="Sửa bình luận"
                      ></i>
                      <i
                        className="fa-solid fa-trash delete-icon"
                        title="Xóa bình luận"
                      ></i>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>Không có bình luận nào</td>
                </tr>
              )}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="pagination">
            <button
              className="page-btn"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              <i className="fa-solid fa-angle-left"></i>
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`page-btn ${page === i + 1 ? "active" : ""}`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="page-btn"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              <i className="fa-solid fa-angle-right"></i>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
