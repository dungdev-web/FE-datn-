"use client"
import { API_BASE_URL } from "@/config/env";
import "../../admin/css/brands_admin.css";
import Link from "next/link";
import { useEffect, useState } from "react";import { getBrands } from "@/services/brandService";
import { IBrand } from "@/types/IBrand";
export default function Brands() {
   const [brands, setBrands] = useState<IBrand[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    async function fetchBrands() {
      const data = await getBrands();
      setBrands(data);
    }
    fetchBrands();
  }, []);
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
          {brands.map((brand) => (
            <tr key={brand.brand_id}>
              <td>{brand.brand_id}</td>
              <td>{brand.name}</td>
              <td>
                <img
                  src={brand.logo_url}
                  alt={brand.name}
                  className="brand-logo"
                />
              </td>
              <td>{brand.slug}</td>
              <td>
                <Link href={`/admin/brands/edit/${brand.brand_id}`}>
                  <i className="fa-solid fa-pen edit-icon" title="Sửa nhãn hiệu"></i>
                </Link>
                <i className="fa-solid fa-trash delete-icon" title="Xóa nhãn hiệu"></i>
              </td>
            </tr>
          ))}
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
