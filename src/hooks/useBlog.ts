// hooks/useBlog.ts
import { useEffect, useState } from "react";
import { getCategory, getFeaturedPost } from "@/services/blogService";
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
export function useFeaturedPosts(page: number = 1, limit: number = 6) {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await getFeaturedPost(page, limit);
        setPosts(res.data); // lấy danh sách bài viết
        setPagination(res.pagination); // lưu thông tin phân trang
      } catch (error) {
        console.error("Lỗi khi fetch featured posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [page, limit]); // dependency để khi đổi page/limit sẽ fetch lại

  return { posts, loading, pagination };
}
