"use client";
import { ArrowUpDown } from "lucide-react";
import "../css/voucher_admin.css";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

import { ICoupon } from "@/types/coupon";
import { getVoucherList } from "@/services/couponService";

export default function Voucher() {
  const [vouchers, setVouchers] = useState<ICoupon[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  // Các filter
  const [filterId, setFilterId] = useState("");
  const [filterCode, setFilterCode] = useState("");
  const [filterDiscountType, setFilterDiscountType] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [filterUsageLimit, setFilterUsageLimit] = useState("");
  const [filterUsedCount, setFilterUsedCount] = useState("");
  const [filterMinOrder, setFilterMinOrder] = useState("");

  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const [sortConfig, setSortConfig] = useState({
    sortBy: "coupons_id",
    sortOrder: "asc" as "asc" | "desc",
  });

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Hàm load data từ API với filter, sort, page
  const loadVouchers = async () => {
    const res = await getVoucherList({
      page,
      limit,
      keyword: searchText || undefined,
      sortBy: sortConfig.sortBy,
      sortOrder: sortConfig.sortOrder,
      id: filterId || undefined,
      code: filterCode || undefined,
      discount_type: filterDiscountType || undefined,
      start_date: filterStartDate || undefined,
      end_date: filterEndDate || undefined,
      usage_limit: filterUsageLimit ? Number(filterUsageLimit) : undefined,
      used_count: filterUsedCount ? Number(filterUsedCount) : undefined,
      min_order: filterMinOrder ? Number(filterMinOrder) : undefined,
    });

    if (res) {
      setVouchers(res.data);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    }
  };

  // Khi filter/sort/search thay đổi => reset page về 1
  useEffect(() => {
    setPage(1);
  }, [
    sortConfig,
    searchText,
    filterId,
    filterCode,
    filterDiscountType,
    filterStartDate,
    filterEndDate,
    filterUsageLimit,
    filterUsedCount,
    filterMinOrder,
  ]);

  // Khi page hoặc filter/sort/search thay đổi => load data
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      loadVouchers();
    }, 400);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [
    page,
    sortConfig,
    searchText,
    filterId,
    filterCode,
    filterDiscountType,
    filterStartDate,
    filterEndDate,
    filterUsageLimit,
    filterUsedCount,
    filterMinOrder,
  ]);

  const handleSort = (field: string) => {
    if (sortConfig.sortBy === field) {
      setSortConfig({
        sortBy: field,
        sortOrder: sortConfig.sortOrder === "asc" ? "desc" : "asc",
      });
    } else {
      setSortConfig({ sortBy: field, sortOrder: "asc" });
    }
  };

  const SortIcon = ({ field }: { field: string }) => {
    const active = sortConfig.sortBy === field;
    const direction = active ? sortConfig.sortOrder : undefined;
    return (
      <ArrowUpDown
        className={`inline-block ml-2 w-4 h-4 cursor-pointer ${
          active ? "text-blue-500" : "text-gray-400"
        } ${direction === "asc" ? "rotate-180" : ""}`}
        onClick={() => handleSort(field)}
      />
    );
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      setPage(newPage);
    }
  };

  return (
    <div className="promotion-list">
      <h2>Danh sách mã giảm giá</h2>

      <div className="promotion-actions">
        <Link href={"/admin/voucher/add"} className="btn btn-add">
          <i className="fa-solid fa-plus"></i> Thêm mới mã giảm giá
        </Link>
        <button
          className="btn btn-refresh"
          onClick={() => {
            setSearchText("");
            setFilterId("");
            setFilterCode("");
            setFilterDiscountType("");
            setFilterStartDate("");
            setFilterEndDate("");
            setFilterUsageLimit("");
            setFilterUsedCount("");
            setFilterMinOrder("");
            setPage(1);
            loadVouchers();
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
              onChange={(e) => {
                setSearchText(e.target.value);
                setPage(1);
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
      </div>

      <table className="promotion-table">
        <thead>
          <tr>
            <th>
              ID <SortIcon field="coupons_id" />
            </th>
            <th>
              Mã khuyến mãi <SortIcon field="code" />
            </th>
            <th>
              Loại giảm giá <SortIcon field="discount_type" />
            </th>
            <th>
              Giá trị ( % & VND ) <SortIcon field="discount_value" />
            </th>
            <th>
              Ngày bắt đầu <SortIcon field="start_date" />
            </th>
            <th>
              Ngày hết hạn <SortIcon field="end_date" />
            </th>
            <th>
              Số lần dùng <SortIcon field="usage_limit" />
            </th>
            <th>
              Đã dùng <SortIcon field="used_count" />
            </th>
            <th>
              Giới hạn DH <SortIcon field="min_order" />
            </th>
            <th>Thao tác</th>
          </tr>
          <tr className="promotion-filter-row">
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
                placeholder="Lọc mã..."
                value={filterCode}
                onChange={(e) => setFilterCode(e.target.value)}
              />
            </th>
            <th>
              <select
                value={filterDiscountType}
                onChange={(e) => setFilterDiscountType(e.target.value)}
              >
                <option value="">Tất cả</option>
                <option value="percentage">Phần trăm</option>
                <option value="fixed">Cố định</option>
              </select>
            </th>
            <th></th>
            <th>
              <input
                type="date"
                value={filterStartDate}
                onChange={(e) => setFilterStartDate(e.target.value)}
              />
            </th>
            <th>
              <input
                type="date"
                value={filterEndDate}
                onChange={(e) => setFilterEndDate(e.target.value)}
              />
            </th>
            <th>
              <input
                type="number"
                placeholder="Lọc số lần dùng..."
                value={filterUsageLimit}
                onChange={(e) => setFilterUsageLimit(e.target.value)}
              />
            </th>
            <th>
              <input
                type="number"
                placeholder="Lọc đã dùng..."
                value={filterUsedCount}
                onChange={(e) => setFilterUsedCount(e.target.value)}
              />
            </th>
            <th>
              <input
                type="number"
                placeholder="Lọc giới hạn DH..."
                value={filterMinOrder}
                onChange={(e) => setFilterMinOrder(e.target.value)}
              />
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {vouchers.length === 0 ? (
            <tr>
              <td colSpan={10} className="text-center">
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            vouchers.map((voucher) => (
              <tr key={voucher.coupons_id}>
                <td>{voucher.coupons_id}</td>
                <td>{voucher.code}</td>
                <td>
                  {voucher.discount_type === "percentage"
                    ? "Phần trăm"
                    : voucher.discount_type === "fixed"
                    ? "Cố định"
                    : voucher.discount_type}
                </td>
                <td>
                  {voucher.discount_type === "percentage"
                    ? `${voucher.discount_value}%`
                    : voucher.discount_value
                    ? Number(voucher.discount_value).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })
                    : ""}
                </td>
                <td>{new Date(voucher.start_date).toLocaleDateString()}</td>
                <td>{new Date(voucher.end_date).toLocaleDateString()}</td>
                <td>{voucher.usage_limit}</td>
                <td>{voucher.used_count}</td>
                <td>{voucher.min_order.toLocaleString("vi-VN")} đ</td>
                <td>
                  <Link href={`/admin/voucher/edit/${voucher.coupons_id}`}>
                    <i
                      className="fa-solid fa-pen edit-icon"
                      title="Sửa mã"
                    ></i>
                  </Link>
                  <i
                    className="fa-solid fa-trash delete-icon"
                    title="Xóa mã"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      alert(
                        `Xóa mã ${voucher.code} - ID ${voucher.coupons_id}`
                      )
                    }
                  ></i>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="promotion-pagination">
        <button
          className="page-btn"
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          <i className="fa-solid fa-angle-left"></i>
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            className={`page-btn ${p === page ? "active" : ""}`}
            onClick={() => handlePageChange(p)}
          >
            {p}
          </button>
        ))}

        <button
          className="page-btn"
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          <i className="fa-solid fa-angle-right"></i>
        </button>
      </div>
    </div>
  );
}
