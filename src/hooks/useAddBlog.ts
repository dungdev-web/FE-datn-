import { useState } from "react";
import Swal from "sweetalert2";
import { addPost, updatePost,deletePost } from "@/services/blogService";
import { IBlog } from "@/types/blog";
import { useRouter } from "next/navigation";
export function useAddPost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const handleAddPost = async (formData: FormData): Promise<IBlog | null> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await addPost(formData);
      if (result) {
        setSuccess(true);
        Swal.fire({
          icon: "success",
          title: "Thành công!",
          text: "Bài viết đã được thêm thành công.",
          timer: 2000,
          showConfirmButton: false,
        });
        router.push("/admin/blog");
      }
      return result;
    } catch (err: any) {
      setError(err.message || "Đã có lỗi xảy ra");
      Swal.fire({
        icon: "error",
        title: "Thất bại!",
        text: err.message || "Đã có lỗi xảy ra.",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    addPost: handleAddPost,
    loading,
    error,
    success,
  };
}
export function useUpdatePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const handleUpdatePost = async (
    postId: number,
    formData: FormData
  ): Promise<IBlog | null> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await updatePost(postId, formData);
      if (result) {
        setSuccess(true);
        Swal.fire({
          icon: "success",
          title: "Cập nhật thành công!",
          text: "Bài viết đã được cập nhật.",
          timer: 2000,
          showConfirmButton: false,
        });
        router.push("/admin/blog");
      }
      return result;
    } catch (err: any) {
      setError(err.message || "Đã có lỗi xảy ra");
      Swal.fire({
        icon: "error",
        title: "Cập nhật thất bại!",
        text: err.message || "Đã có lỗi xảy ra.",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    updatePost: handleUpdatePost,
    loading,
    error,
    success,
  };
}
export function useDeletePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  
  const handleDeletePost = async (postId: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await deletePost(postId);
      if (result) {
        setSuccess(true);
        Swal.fire({
          icon: "success",
          title: "Xóa thành công!",
          text: "Bài viết đã được xóa.",
          timer: 2000,
          showConfirmButton: false,
        });
        router.push("/admin/blog");
      }
      return result;
    } catch (err: any) {
      setError(err.message || "Đã có lỗi xảy ra");
      Swal.fire({
        icon: "error",
        title: "Xóa thất bại!",
        text: err.message || "Đã có lỗi xảy ra.",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    deletePost: handleDeletePost,
    loading,
    error,
    success,
  };
}
