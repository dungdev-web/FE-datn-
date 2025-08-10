export interface ICategory {
  image: any;
  status: number;
  categories_id: number;
  name: string;
  slug: string;
  parent_id: number | null;
  children?: ICategory[];
  created_at: string;
  updated_at: string;

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