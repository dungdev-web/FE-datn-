export interface ICategory {
  image: any;
  status: number; // 0 hoặc 1
  categories_id: number;
  name: string;
  slug: string;
  parent_id: number | null;
  created_at: string;
  updated_at: string;
  children?: ICategory[]; // danh mục con (nếu có)
}
export interface CategoryFilters {
  id?: number;
  name?: string;
  keyword?: string;
  status?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
export interface CategoryResponse {
  data: ICategory[];
  total: number;
  totalPages: number;
  page: number;
}