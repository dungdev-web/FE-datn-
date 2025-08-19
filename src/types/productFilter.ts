import { IProduct } from "./product";

export interface FilterParams {
  page: number;
  keyword?: string;
  gender?: string;
  brand?: string[] | string; // chấp nhận cả chuỗi và mảng
  minPrice?: number;
  maxPrice?: number;
  status?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface ProductFilterResponse {
  products: IProduct[];
  total: number;
  currentPage: number;
  totalPages: number;
}
