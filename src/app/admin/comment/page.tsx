"use client";
import "../css/comment_admin.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getAllProductReview,
  setStatusReview,
} from "@/services/productService";

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
        user_name: filters.user_name || searchText || undefined,
        product_name: filters.product_name || searchText || undefined,
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
  const handleToggleStatus = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "approved" ? "pending" : "approved";
    try {
      await setStatusReview(id, newStatus); // truyền đủ 2 tham số
      fetchReviews(); // load lại danh sách sau khi đổi
    } catch (err) {
      console.error("Lỗi khi đổi trạng thái:", err);
    }
  };
  return (
    <div className="review-container">
      <h2>Quản lý bình luận sản phẩm</h2>

        <div className="review-actions">
          <button className="btn btn-refresh">
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
                <input type="text" placeholder="Lọc ID..." />
              </th>
              <th>
                <input type="text" placeholder="Lọc người dùng..." />
              </th>
              <th>
                <input type="text" placeholder="Lọc sản phẩm..." />
              </th>
              <th>
                <select>
                  <option value="">Tất cả</option>
                  <option value="1">★☆☆☆☆</option>
                  <option value="2">★★☆☆☆</option>
                  <option value="3">★★★☆☆</option>
                  <option value="4">★★★★☆</option>
                  <option value="5">★★★★★</option>
                </select>
              </th>
              <th>
                <input type="text" placeholder="Tìm nội dung..." />
              </th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>101</td>
              <td>Lê Chí Bảo</td>
              <td>Giày NIKE</td>
              <td>★★★★☆</td>
              <td>
                Rất hài lòng với sản phẩm! Giao hàng cực kỳ nhanh, đóng gói cẩn
                thận. Sẽ tiếp tục ủng hộ shop trong những lần sau.
              </td>
              <td>
                <span className="status approved">Đã duyệt</span>
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
                <i
                  className="fa-solid fa-eye-slash hide-icon"
                  title="Ẩn bình luận"
                ></i>
              </td>
            </tr>
            <tr>
              <td>102</td>
              <td>Lưu Đức Dũng</td>
              <td>Giày NIKE</td>
              <td>★★★★★</td>
              <td>
                Giày đẹp đúng như hình, chất liệu tốt, mang êm chân và rất thời
                trang. Phù hợp cả đi học lẫn đi chơi.
              </td>
              <td>
                <span className="status approved">Đã duyệt</span>
              </td>
              <td>
                <i
                  className="fa-solid fa-check approve-icon"
                  title="Duyệt bình luận"
                ></i>
                <i
                  className="fa-solid fa-eye view-icon"
                  title="Xem chi tiết"
                ></i>
                <i
                  className="fa-solid fa-trash delete-icon"
                  title="Xóa bình luận"
                ></i>
              </td>
            </tr>
            <tr>
  <td>103</td>
  <td>Nguyễn Hoàng Anh</td>
  <td>Giày Adidas</td>
  <td>★★★★☆</td>
  <td>
    Chất lượng giày ổn, đế êm và form chuẩn. Mình rất thích màu sắc, mang
    lên nhìn trẻ trung. Giao hàng hơi chậm một chút.
  </td>
  <td>
    <span className="status approved">Đã duyệt</span>
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
    <i
      className="fa-solid fa-eye-slash hide-icon"
      title="Ẩn bình luận"
    ></i>
  </td>
</tr>

<tr>
  <td>104</td>
  <td>Trần Thu Hà</td>
  <td>Giày Converse</td>
  <td>★★★★★</td>
  <td>
    Giày đẹp xuất sắc! Đúng size, đi cực êm và phối đồ dễ dàng. Đóng gói
    rất chuyên nghiệp, chắc chắn sẽ mua thêm.
  </td>
  <td>
    <span className="status approved">Đã duyệt</span>
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
    <i
      className="fa-solid fa-eye-slash hide-icon"
      title="Ẩn bình luận"
    ></i>
  </td>
</tr>

<tr>
  <td>105</td>
  <td>Phạm Minh Khoa</td>
  <td>Giày Puma</td>
  <td>★★★☆☆</td>
  <td>
    Giày khá đẹp nhưng phần đế hơi cứng, cần đi vài lần mới quen. Giao hàng
    nhanh, shop tư vấn nhiệt tình.
  </td>
  <td>
    <span className="status approved">Đã duyệt</span>
  </td>
  <td>
    <i
      className="fa-solid fa-check approve-icon"
      title="Duyệt bình luận"
    ></i>
    <i
      className="fa-solid fa-eye view-icon"
      title="Xem chi tiết"
    ></i>
    <i
      className="fa-solid fa-trash delete-icon"
      title="Xóa bình luận"
    ></i>
  </td>
</tr>
<tr>
  <td>106</td>
  <td>Vũ Thị Mai</td>
  <td>Giày Vans</td>
  <td>★★★★★</td>
  <td>
    Rất hài lòng! Giày vừa chân, màu sắc trẻ trung, dễ phối đồ. Đóng gói kỹ
    và giao hàng nhanh chóng. Sẽ tiếp tục ủng hộ shop.
  </td>
  <td>
    <span className="status approved">Đã duyệt</span>
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
    <i
      className="fa-solid fa-eye-slash hide-icon"
      title="Ẩn bình luận"
    ></i>
  </td>
</tr>

<tr>
  <td>107</td>
  <td>Đặng Quang Huy</td>
  <td>Giày Balenciaga</td>
  <td>★★★★☆</td>
  <td>
    Giày đúng như mô tả, chất liệu cao cấp. Tuy nhiên hộp bị móp nhẹ khi
    nhận hàng, nhưng không ảnh hưởng tới sản phẩm.
  </td>
  <td>
    <span className="status approved">Đã duyệt</span>
  </td>
  <td>
    <i
      className="fa-solid fa-check approve-icon"
      title="Duyệt bình luận"
    ></i>
    <i
      className="fa-solid fa-eye view-icon"
      title="Xem chi tiết"
    ></i>
    <i
      className="fa-solid fa-trash delete-icon"
      title="Xóa bình luận"
    ></i>
  </td>
</tr>

          </tbody>
        </table>

        <div className="pagination">
          <button className="page-btn" disabled>
            <i className="fa-solid fa-angle-left"></i>
          </button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <button className="page-btn">
            <i className="fa-solid fa-angle-right"></i>
          </button>
        </div>
        <button className="btn btn-export">
          <i className="fa-solid fa-file-export"></i> Xuất Excel
        </button>
        <button className="btn btn-statistics">
          <i className="fa-solid fa-chart-bar"></i> Thống kê
        </button>
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
                        {item.status === "approved" ? "Đã duyệt" : "Đã ẩn"}
                      </span>
                    </td>
                    <td>
                      <Link href={`/admin/comment/${item.product_reviews_id}`}>
                        <i
                          className="fa-solid fa-pen view-icon"
                          title="Xem chi tiết"
                        ></i>
                      </Link>
                      {item.status === "approved" ? (
                        <i
                          className="fa-solid fa-eye-slash delete-icon"
                          title="Ẩn bình luận"
                          onClick={() =>
                            handleToggleStatus(
                              item.product_reviews_id,
                              item.status
                            )
                          }
                          style={{ cursor: "pointer" }}
                        ></i>
                      ) : (
                        <i
                          className="fa-solid fa-eye approve-icon"
                          title="Hiện bình luận"
                          onClick={() =>
                            handleToggleStatus(
                              item.product_reviews_id,
                              item.status
                            )
                          }
                          style={{ cursor: "pointer" }}
                        ></i>
                      )}
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
