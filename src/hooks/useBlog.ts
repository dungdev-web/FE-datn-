import { useEffect, useState } from "react";
import { getCategory } from "@/services/blogService";
import { getPostsByCategory,addCategoryPost } from "@/services/blogService";
import { IBlog,Category,AddCategory } from "@/types/blog";
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
export function useAddCategoryPost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [category, setCategory] = useState<Category | null>(null);

  async function addCategoriesPost(data: AddCategory) {
    setLoading(true);
    setError(null);
    try {
      const newCategory = await addCategoryPost(data);
      setCategory(newCategory);
      return newCategory;
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
      throw err;
    } finally {
      setLoading(false);
    }
  }
    return { loading, error, category, addCategoriesPost };

}