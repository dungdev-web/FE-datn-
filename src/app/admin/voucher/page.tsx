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

<tr>
  <td>WELCOME10</td>
  <td>WELCOME - Khách mới</td>
  <td>10%</td>
  <td>01-01-2025</td>
  <td>31-12-2025</td>
  <td>100</td>
  <td>12</td>
  <td>
    <Link href={"/admin/voucher/edit"}>
      <i className="fa-solid fa-pen edit-icon" title="Sửa mã"></i>
    </Link>
    <i className="fa-solid fa-trash delete-icon" title="Xóa mã"></i>
  </td>
</tr>

<tr>
  <td>SUMMER25</td>
  <td>SUMMER SALE</td>
  <td>25%</td>
  <td>01-06-2025</td>
  <td>31-08-2025</td>
  <td>200</td>
  <td>87</td>
  <td>
    <Link href={"/admin/voucher/edit"}>
      <i className="fa-solid fa-pen edit-icon" title="Sửa mã"></i>
    </Link>
    <i className="fa-solid fa-trash delete-icon" title="Xóa mã"></i>
  </td>
</tr>

<tr>
  <td>FREESHIP50</td>
  <td>Free Ship trên 500k</td>
  <td>100%</td>
  <td>01-07-2025</td>
  <td>31-12-2025</td>
  <td>500</td>
  <td>210</td>
  <td>
    <Link href={"/admin/voucher/edit"}>
      <i className="fa-solid fa-pen edit-icon" title="Sửa mã"></i>
    </Link>
    <i className="fa-solid fa-trash delete-icon" title="Xóa mã"></i>
  </td>
</tr>

<tr>
  <td>STUDENT15</td>
  <td>Ưu đãi Sinh viên</td>
  <td>15%</td>
  <td>01-09-2025</td>
  <td>30-11-2025</td>
  <td>300</td>
  <td>34</td>
  <td>
    <Link href={"/admin/voucher/edit"}>
      <i className="fa-solid fa-pen edit-icon" title="Sửa mã"></i>
    </Link>
    <i className="fa-solid fa-trash delete-icon" title="Xóa mã"></i>
  </td>
</tr>

<tr>
  <td>WEEKEND20</td>
  <td>Weekend Deal</td>
  <td>20%</td>
  <td>01-01-2025</td>
  <td>31-12-2025</td>
  <td>1000</td>
  <td>456</td>
  <td>
    <Link href={"/admin/voucher/edit"}>
      <i className="fa-solid fa-pen edit-icon" title="Sửa mã"></i>
    </Link>
    <i className="fa-solid fa-trash delete-icon" title="Xóa mã"></i>
  </td>
</tr>

<tr>
  <td>FLASH30</td>
  <td>Flash Sale 24H</td>
  <td>30%</td>
  <td>10-08-2025</td>
  <td>11-08-2025</td>
  <td>50</td>
  <td>50</td>
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
