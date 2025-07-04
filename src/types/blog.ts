export interface IPost {
  posts_id: number;
  title: string;
  content: string;
  slug: string;
  thumbnail: string;
  status: boolean;
  image: string;
  created_at: Date;
  updated_at: Date;
  author?: {
    id: number;
    name: string;
    email?: string;
    avatar?: string;
  };
  categories?: {
    categories_id: number;
    name: string;
    slug: string;
  }[];
}
