import { useEffect, useState } from "react";
import { getCategory } from "@/services/blogService";
import { getPostsByCategory } from "@/services/blogService";
import { IBlog,Category } from "@/types/blog";
export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCategory()
      .then((res) => {
        setCategories(res);
        setLoading(false);
      })
      .catch((err) => {
        setError("Lỗi khi tải danh mục");
        setLoading(false);
      });
  }, []);

  return { categories, loading, error };
}
export function usePostsByCategory(categoryId: number) {
  const [posts, setPosts] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!categoryId) return;

    setLoading(true);
    getPostsByCategory(categoryId)
      .then((res) => {
        setPosts(res.posts);
        setLoading(false);
      })
      .catch((err) => {
        setError("Lỗi khi tải bài viết");
        setLoading(false);
      });
  }, [categoryId]);

  return { posts, loading, error };
}