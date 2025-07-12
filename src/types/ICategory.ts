export interface ICategory {
  categories_id: number;
  name: string;
  slug: string;
  parent_id: number | null;
  children?: ICategory[]; // danh mục con (nếu có)
}
