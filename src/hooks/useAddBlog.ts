import { useState } from "react";
import Swal from "sweetalert2"; 
import { addPost } from "@/services/blogService";
import { IBlog } from "@/types/blog";

export function useAddPost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

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
