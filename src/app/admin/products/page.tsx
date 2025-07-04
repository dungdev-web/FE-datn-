"use client";
import "../css/product_admin.css";
import Link from "next/link";
import { useState } from "react";

export default function Products() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");

  return (
    <main className="main-content">
      {/* sản phẩm ở đây */}
      <div className="product-list">
        <h2>Danh sách sản phẩm</h2>

        <div className="actions">
          <Link href={"/admin/products/add"} className="btn btn-add">
            <i className="fa-solid fa-plus"></i> Thêm mới sản phẩm
          </Link>
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

          <button className="btn btn-refresh">
            <i className="fa-solid fa-rotate-right"></i> Refresh
          </button>
          <button className="btn btn-export">
            <i className="fa-solid fa-file-export"></i> Xuất dữ liệu
          </button>
        </div>

        <table className="product-table">
          <thead>
            <tr>
              <th>Mã SP</th>
              <th>Tên sản phẩm</th>
              <th>Ảnh</th>
              <th>Nhãn hiệu</th>
              <th>Danh mục</th>
              <th>Giá nhập</th>
              <th>Giá bán</th>
              <th>Ngày tạo</th>
              <th>Ngày sửa</th>
              <th>Đã bán</th>
              <th>Thao tác</th>
            </tr>
            <tr className="filter-row">
              <th>
                <input type="text" placeholder="Lọc mã..." />
              </th>
              <th>
                <input type="text" placeholder="Lọc tên..." />
              </th>
              <th></th>
              <th>
                <select>
                  <option value="">Tất cả</option>
                  <option value="Nike">Nike</option>
                  <option value="Adidas">Adidas</option>
                  <option value="Puma">Puma</option>
                  {/* Thêm các nhãn hiệu khác nếu cần */}
                </select>
              </th>
              <th>
                <select>
                  <option value="">Tất cả</option>
                  <option value="Giày thể thao">Giày thể thao</option>
                  <option value="Giày chạy bộ">Giày chạy bộ</option>
                  <option value="Giày thời trang">Giày thời trang</option>
                  {/* Thêm các danh mục khác nếu cần */}
                </select>
              </th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>4iKReQ</td>
              <td>VANS VAULT STYLE 36 BLACK</td>
              <td>
                <img
                  src="/images/products/chaybo/ConverseRunStarMotion.webp"
                  alt="Vans"
                  className="product-img"
                />
              </td>
              <td>VANZ</td>
              <td>
                <span className="category-tag">Giày Nam</span>
                <span className="category-tag">Giày Nữ</span>
                <span className="category-tag">Giày Trẻ em</span>
              </td>

              <td>550,000</td>
              <td>1,350,000</td>
              <td>27-11-2021</td>
              <td>27-11-2021</td>
              <td>0</td>
              <td>
                <i className="fa-solid fa-pen edit-icon" title="Sửa SP"></i>
                <i className="fa-solid fa-trash delete-icon" title="Xóa SP"></i>
              </td>
            </tr>
            {/* Thêm dòng khác */}
          </tbody>
        </table>

        <div className="pagination">
          <button className="page-btn" disabled>
            <i className="fa-solid fa-angle-left"></i>
          </button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <button className="page-btn">4</button>
          <button className="page-btn">...</button>
          <button className="page-btn">10</button>
          <button className="page-btn">
            <i className="fa-solid fa-angle-right"></i>
          </button>
        </div>
      </div>
    </main>
  );
}
