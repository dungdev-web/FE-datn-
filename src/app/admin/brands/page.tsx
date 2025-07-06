"use client";

import "../css/brands_admin.css";
import Link from "next/link";
import { useState } from "react"; 

export default function Brands() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  return (
    <>
      <div className="brand-list">
        <h2>Danh sách nhãn hiệu</h2>

        <div className="actions">
          <Link href="/admin/brands/add" className="btn btn-add">
            <i className="fa-solid fa-plus"></i> Thêm mới nhãn hiệu
          </Link>
          <button className="btn btn-refresh">
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

        <table className="brand-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên nhãn hiệu</th>
              <th>Ảnh nhãn hiệu</th>
              <th>Trạng thái nhãn hiệu</th>
              <th>Ngày tạo danh mục</th>
              <th>Ngày sửa danh mục</th>
              <th>Thao tác</th>
            </tr>
            <tr className="filter-row">
              <th>
                <input type="text" placeholder="Lọc ID..." />
              </th>
              <th>
                <input type="text" placeholder="Lọc tên..." />
              </th>
              <th></th>
              <th>
                <select>
                  <option value="">Tất cả</option>
                  <option value="true">Hoạt động</option>
                  <option value="false">Không hoạt động</option>
                </select>
              </th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>4</td>
              <td>NIKE</td>
              <td>
                <img
                  src="/images/products/chaybo/ConverseRunStarMotion.webp"
                  alt="NIKE"
                  className="brand-logo"
                />
              </td>
              <td className="status-column">
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider round"></span>
                </label>
              </td>
              <td>22-08-2021 20:50</td>
              <td>27-11-2021 19:08</td>
              <td>
                <Link href={"/admin/brands/edit"}>
                  <i className="fa-solid fa-pen edit-icon" title="Sửa mã"></i>
                </Link>
                <i className="fa-solid fa-trash delete-icon" title="Xóa mã"></i>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>NIKE</td>
              <td>
                <img
                  src="/images/products/chaybo/ConverseRunStarMotion.webp"
                  alt="NIKE"
                  className="brand-logo"
                />
              </td>
              <td className="status-column">
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider round"></span>
                </label>
              </td>
              <td>22-08-2021 20:50</td>
              <td>27-11-2021 19:08</td>
              <td>
                <Link href={"/admin/brands/edit"}>
                  <i className="fa-solid fa-pen edit-icon" title="Sửa mã"></i>
                </Link>
                <i className="fa-solid fa-trash delete-icon" title="Xóa mã"></i>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>NIKE</td>
              <td>
                <img
                  src="/images/products/chaybo/ConverseRunStarMotion.webp"
                  alt="NIKE"
                  className="brand-logo"
                />
              </td>
              <td className="status-column">
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider round"></span>
                </label>
              </td>
              <td>22-08-2021 20:50</td>
              <td>27-11-2021 19:08</td>
              <td>
                <Link href={"/admin/brands/edit"}>
                  <i className="fa-solid fa-pen edit-icon" title="Sửa mã"></i>
                </Link>
                <i className="fa-solid fa-trash delete-icon" title="Xóa mã"></i>
              </td>
            </tr>
            {/* Thêm các dòng khác tại đây */}
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
      </>
  );
}
