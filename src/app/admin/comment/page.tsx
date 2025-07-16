"use client";
import "../css/comment_admin.css";
import Link from "next/link";
import { useState } from "react";
export default function CommentPage() {
    const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");

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
              <td>Lưu Đức Chó</td>
              <td>Giày NIKE</td>
              <td>★★★★★</td>
              <td>
                Giày đẹp đúng như hình, chất liệu tốt, mang êm chân và rất thời
                trang. Phù hợp cả đi học lẫn đi chơi.
              </td>
              <td>
                <span className="status pending">Chờ duyệt</span>
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
      </div>
  );
}
