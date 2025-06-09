"use client";
import { useState } from "react";
import "@/src/app/admin/css/categories_admin.css";
import Link from "next/link";
export default function Categories() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  return (
    <main className="main-content">
      <div className="category-list">
        <h2>Danh sách danh mục</h2>

        <div className="actions">
          <Link href={"/admin/categories/add"} className="btn btn-add">
            <i className="fa-solid fa-plus"></i> Thêm mới danh mục
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

        <table className="category-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên danh mục</th>
              <th>Trạng thái danh mục</th>
              <th>Thứ tự danh mục</th>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>4</td>
              <td>Dép Summer</td>
              <td className="status-column">
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider round"></span>
                </label>
              </td>
              <td>0</td>
              <td>27-11-2021 19:07</td>
              <td></td>
              <td>
                <Link href={"/admin/categories/edit"}>
                  {" "}
                  <i className="fa-solid fa-pen edit-icon" title="Sửa mã"></i>
                </Link>
                <i className="fa-solid fa-trash delete-icon" title="Xóa mã"></i>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Giày Trẻ em</td>
              <td className="status-column">
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider round"></span>
                </label>
              </td>
              <td>0</td>
              <td>22-08-2021 20:49</td>
              <td>27-11-2021 19:07</td>
              <td>
                <Link href={"/admin/categories/edit"}>
                  {" "}
                  <i className="fa-solid fa-pen edit-icon" title="Sửa mã"></i>
                </Link>
                <i className="fa-solid fa-trash delete-icon" title="Xóa mã"></i>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Giày Nữ</td>
              <td className="status-column">
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider round"></span>
                </label>
              </td>
              <td>0</td>
              <td>22-08-2021 20:49</td>
              <td></td>
              <td>
                <Link href={"/admin/categories/edit"}>
                  {" "}
                  <i className="fa-solid fa-pen edit-icon" title="Sửa mã"></i>
                </Link>
                <i className="fa-solid fa-trash delete-icon" title="Xóa mã"></i>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Giày Nam</td>
              <td className="status-column">
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider round"></span>
                </label>
              </td>
              <td>0</td>
              <td>22-08-2021 20:48</td>
              <td></td>
              <td>
                <Link href={"/admin/categories/edit"}>
                  {" "}
                  <i className="fa-solid fa-pen edit-icon" title="Sửa mã"></i>
                </Link>
                <i className="fa-solid fa-trash delete-icon" title="Xóa mã"></i>
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
    </main>
  );
}
