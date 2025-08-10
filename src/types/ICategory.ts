export interface ICategory {
  categories_id: number;
  name: string;
  slug: string;
  parent_id: number | null;
  children?: ICategory[];
  image?: string | null;
  status: number;
  created_at: string;
  updated_at: string;
}
