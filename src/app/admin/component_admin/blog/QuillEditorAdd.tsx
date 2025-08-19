"use client";
import { useEffect, useState, useRef } from "react";
import Quill from "quill";
import ImageUploader from "quill-image-uploader";
import "quill/dist/quill.snow.css";
import "quill-image-uploader/dist/quill.imageUploader.min.css";
import "filepond/dist/filepond.min.css";
import "@yaireo/tagify/dist/tagify.css";
import "quill-image-uploader/dist/quill.imageUploader.min.css";
import "filepond/dist/filepond.min.css";
import "@yaireo/tagify/dist/tagify.css";
import "../../css/blog_add.css";
import { useAddPost } from "@/hooks/useAddBlog";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useCategories } from "@/hooks/useBlog";
import { ICategory } from "@/types/ICategory";
import { API_BASE_URL } from "@/config/env";
import { log } from "console";
import Link from "next/link";
Quill.register("modules/imageUploader", ImageUploader);

export default function Blog_View() {
  const quillRef = useRef<any>(null);
  const isInitializedRef = useRef(false);
  const filePondRef = useRef<any>(null);

  const {
    addPost,
    loading: loadingAddPost,
    error: errorAddPost,
    success,
  } = useAddPost();

  const {
    categories,
    loading: loadingCategories,
    error: errorCategories,
  } = useCategories();

  const { user } = useAuthUser();

  useEffect(() => {
    const init = async () => {
      if (isInitializedRef.current) return;
      isInitializedRef.current = true;

      const { create } = await import("filepond");
      const Tagify = (await import("@yaireo/tagify")).default;

      const editorElement = document.querySelector(
        "#editor"
      ) as HTMLElement | null;
      if (editorElement) {
        quillRef.current = new Quill(editorElement, {
          theme: "snow",
          modules: {
            toolbar: [
              ["bold", "italic", "underline"],
              [{ header: [1, 2, 3, false] }],
              [{ list: "ordered" }, { list: "bullet" }],
              ["image", "link"],
            ],
            imageUploader: {
              upload: async (file: File) => {
                const formData = new FormData();
                formData.append("image", file);
                const res = await fetch(`${API_BASE_URL}/post/upload`, {
                  method: "POST",
                  body: formData,
                });
                const data = await res.json();
                return data.url;
              },
            },
          },
        });
      }

      const fileInput = filePondRef.current;
      if (fileInput) {
        filePondRef.current.pond = create(fileInput); // ✅ gắn FilePond instance vào ref
      }

      const tagInput = document.querySelector(
        "#tags"
      ) as HTMLInputElement | null;
      if (tagInput) new Tagify(tagInput);

      const titleInput = document.getElementById(
        "title"
      ) as HTMLInputElement | null;
      const slugInput = document.getElementById(
        "slug"
      ) as HTMLInputElement | null;

      const handleTitleInput = () => {
        if (titleInput && slugInput) {
          const slug = titleInput.value
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/--+/g, "-");
          slugInput.value = slug;
        }
      };

      titleInput?.addEventListener("input", handleTitleInput);
      return () => titleInput?.removeEventListener("input", handleTitleInput);
    };

    init();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = (document.getElementById("title") as HTMLInputElement)?.value;
    const slug = (document.getElementById("slug") as HTMLInputElement)?.value;
    const category_post_id = (
      document.getElementById("category") as HTMLSelectElement
    )?.value;
    const status = (document.getElementById("status") as HTMLSelectElement)
      ?.value;

    const contentHtml = quillRef.current?.root.innerHTML;

    const thumbnailFile = filePondRef.current?.pond?.getFiles?.()[0]?.file;

    if (
      !title ||
      !slug ||
      !category_post_id ||
      !contentHtml ||
      !thumbnailFile
    ) {
      console.error("❌ Thiếu dữ liệu, chi tiết:");
      console.log("🔸 title:", title);
      console.log("🔸 slug:", slug);
      console.log("🔸 category_post_id:", category_post_id);
      console.log("🔸 contentHtml:", contentHtml ? "[có nội dung]" : "[trống]");
      console.log(
        "🔸 thumbnailFile:",
        thumbnailFile ? "[đã chọn ảnh]" : "[chưa có ảnh]"
      );
      console.log("🔸 status:", status);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("category_post_id", category_post_id);
    formData.append("status", status);

    formData.append("content", contentHtml);
    formData.append("author_id", String(user?.id));
    formData.append("thumbnail", thumbnailFile);

    const result = await addPost(formData);

    if (result) {
      console.log("✅ Thêm bài viết thành công:", result);
    } else {
      console.error("❌ Thêm bài viết thất bại");
    }
  };

  return (
    <form className="form-add-post" onSubmit={handleSubmit}>
      {/* -- giữ nguyên phần HTML form như bạn đã có -- */}
      {loadingCategories && <p>Đang tải danh mục...</p>}
      {errorCategories && <p>{errorCategories}</p>}
      <div className="form-header flex justify-between items-center !mb-[24px]">
        <h2 className="form-title">Thêm bài viết mới</h2>
        <div className="action-buttons flex !gap-[8px]">
          <Link
            href="/admin/blog"
            className="btn btn-back flex items-center cursor-pointer"
          >
            <i className="fa-solid fa-arrow-left mr-2"></i> Trở về
          </Link>
          <button
            type="submit"
            className="btn bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
          >
            <i className="fa-solid fa-plus"></i> Thêm bài viết
          </button>
        </div>
      </div>

      <div className="flex !flex-row gap-[20px]">
        <div className="w-1/2">
          <div className="!mb-[12px]">
            <label className="text-lg/6 font-medium text-gray-900 !mb-[8px] !inline-block">
              Tên bài viết
            </label>
            <input
              type="text"
              id="title"
              className="form-controls !w-full !px-4 !py-2 border border-gray-300 rounded-md"
              placeholder="Nhập tiêu đề bài viết"
            />
          </div>
          <div className="!mb-[12px]">
            <label className="text-lg/6 font-medium text-gray-900 !mb-[8px] !inline-block">
              Slug
            </label>
            <input
              type="text"
              id="slug"
              className="form-controls !w-full !px-4 !py-2 border border-gray-300 rounded-md"
              placeholder="Slug tự sinh hoặc chỉnh sửa"
            />
          </div>
          <div className="!mb-[12px]">
            <label className="text-lg/6 font-medium text-gray-600 !mb-[8px] !inline-block">
              Danh mục
            </label>
            <select
              id="category"
              className="!w-full !px-4 !py-2 border border-gray-300 rounded-md bg-white text-gray-500"
            >
              <option value="">-- Chọn danh mục --</option>
              {categories?.data.map((cat) => (
                <option key={cat.category_post_id} value={cat.category_post_id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-1/2">
          <div className="!mb-[12px]">
            <label className="text-lg/6 font-medium text-gray-600 !mb-[8px] !inline-block">
              Trạng thái
            </label>
            <select
              id="status"
              className="!w-full !px-4 !py-2 border border-gray-300 rounded-md bg-white text-gray-500"
            >
              <option value="1">Công khai</option>
              <option value="0">Riêng tư</option>
            </select>
          </div>
          <div className="!mb-[12px]">
            <label className="block text-lg/6 font-medium text-gray-900">
              Ảnh đại diện
            </label>
            <input
              type="file"
              className="filepond"
              id="thumbnail"
              name="thumbnail"
              ref={filePondRef}
            />
          </div>
        </div>
      </div>

      <div className="!mb-[12px]">
        <label className="block text-lg/6 font-medium text-gray-900">
          Nội dung bài viết
        </label>
        <div
          id="editor"
          className="min-h-[300px] border border-gray-300 rounded-md p-4 bg-white"
        />
      </div>
    </form>
  );
}
