"use client";
import "../css/voucher_admin.css";
import Link from "next/link";
import { useState } from "react";

export default function Voucher() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");

  return (
      <div className="promotion-list">
        <h2>Danh sách mã giảm giá</h2>

        <div className="promotion-actions">
          <Link href={"/admin/voucher/add"} className="btn btn-add">
            <i className="fa-solid fa-plus"></i> Thêm mới mã giảm giá
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

        <table className="promotion-table">
          <thead>
            <tr>
              <th>Mã khuyến mãi</th>
              <th>Loại</th>
              <th>Giá trị (%)</th>
              <th>Ngày bắt đầu</th>
              <th>Ngày hết hạn</th>
              <th>Giới hạn</th>
              <th>Đã dùng</th>
              <th>Thao tác</th>
            </tr>
            <tr className="promotion-filter-row">
              <th>
                <input type="text" placeholder="Lọc mã..." />
              </th>
              <th>
                <input type="text" placeholder="Lọc loại..." />
              </th>
              <th>
                <select>
                  <option value="">Tất cả</option>
                  <option value="true">Kích hoạt</option>
                  <option value="false">Vô hiệu</option>
                </select>
              </th>
              <th>
                <input type="date" name="" id="" />
              </th>
              <th>
                <input type="date" name="" id="" />
              </th>

              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>BLA01</td>
              <td>BLACK FRIDAY</td>
              <td>30%</td>
              <td>11-12-2021</td>
              <td>11-12-2021</td>
              <td>5</td>
              <td>5</td>
              <td>
                <Link href={"/admin/voucher/edit"}>
                  <i className="fa-solid fa-pen edit-icon" title="Sửa mã"></i>
                </Link>
                <i className="fa-solid fa-trash delete-icon" title="Xóa mã"></i>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="promotion-pagination">
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
