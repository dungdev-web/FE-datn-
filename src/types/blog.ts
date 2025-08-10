export interface IBlog {
  post_id: number;
  title: string;
  slug: string;
  content: string;
  thumbnail: string;
  images: string[] | null;
  status: number;
  category_post_id: number;
  author_id: number;
  created_at: string;
  updated_at: string;
  category_post: {
    category_post_id: number;
    name: string;
    slug: string;
    parent_id: number | null;
  };
  author: {
    user_id: number;
    name: string;
    avatar: string;
  };
}
export interface Category {
  category_post_id: number;
  name: string;
  slug: string;
  parent_id: number | null;
  created_at?: Date;
  updated_at?: Date;
  data:CategoryResponse[];
}
export interface AddCategory{
    name: string;
  slug: string;
  parent_id: number | null;

}
export interface IBlogCreate {
  title: string;
  slug: string;
  content: string;
  images?: string[];
  category_post_id: number;
  author_id: number;
  status?: number; 
  thumbnail?: string;
}
export interface CategoryResponse {
  data: Category[];
  total: number;
  currentPage: number;
  totalPages: number;
}