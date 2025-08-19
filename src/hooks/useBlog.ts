// hooks/useBlog.ts
import { useEffect, useState } from "react";
import { getCategory } from "@/services/blogService";
import { Category, CategoryResponse, IBlog, AddCategory } from "@/types/blog";
import {
  getPostsByCategory,
  addCategoryPost,
  updateCategoryPost,
} from "@/services/blogService";

export function useCategories(params?: { page?: number; limit?: number }) {
  const [categories, setCategories] = useState<CategoryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCategory({
      page: params?.page ?? 1,
      limit: params?.limit ?? 1000, 
    })
      .then((res: CategoryResponse) => {
        setCategories(res);
        setLoading(false);
      })
      .catch(() => {
        setError("Lỗi khi tải danh mục");
        setLoading(false);
      });
  }, [params?.page, params?.limit]);

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
      .catch(() => {
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
export function useUpdateCategoryPost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [category, setCategory] = useState<Category | null>(null);

  async function updateCategoriesPost(categoryId: number, data: any) {
    setLoading(true);
    setError(null);
    try {
      const newCategory = await updateCategoryPost(categoryId, data);
      setCategory(newCategory);
      return newCategory;
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, category, updateCategoriesPost };
}

