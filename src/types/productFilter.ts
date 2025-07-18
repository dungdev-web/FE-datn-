import { IProduct } from "./product";

export interface FilterParams {
  keyword?: string;
  gender?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: number;
  limit?: number;
  offset?: number;
}

export interface ProductFilterResponse {
  products: IProduct[];
  total: number;
  currentPage: number;
  totalPages: number;
}
