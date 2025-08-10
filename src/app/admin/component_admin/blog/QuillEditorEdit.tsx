"use client";
import { useEffect, useState, useRef } from "react";
import Quill from "quill";
import ImageUploader from "quill-image-uploader";
import "quill/dist/quill.snow.css";
import "quill-image-uploader/dist/quill.imageUploader.min.css";
import "filepond/dist/filepond.min.css";
import "@yaireo/tagify/dist/tagify.css";
import { useParams } from "next/navigation";
import "../../css/blog_add.css";
import { useUpdatePost } from "@/hooks/useAddBlog";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useCategories } from "@/hooks/useBlog";
import { ICategory } from "@/types/ICategory";
import { API_BASE_URL } from "@/config/env";
import { getPostById } from "@/services/blogService";
import { usePostsByCategory } from "@/hooks/useBlog";
import { IBlog } from "@/types/blog";
Quill.register("modules/imageUploader", ImageUploader);

export default function Blog_View() {
  const quillRef = useRef<any>(null);
  const isInitializedRef = useRef(false);
  const filePondRef = useRef<any>(null);
  const params = useParams();
  const idParam = params.id;
  const [post, setPost] = useState<IBlog | null>(null);
  const [strongTexts, setStrongTexts] = useState<string[]>([]);
  const [modifiedContent, setModifiedContent] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [status, setStatus] = useState<string>("");

  const {
    updatePost,
    loading: loadingAddPost,
    error: errorAddPost,
    success,
  } = useUpdatePost();

  const {
    categories,
    loading: loadingCategories,
    error: errorCategories,
  } = useCategories();

  const { user } = useAuthUser();

  useEffect(() => {
    const init = async () => {
      if (isInitializedRef.current || quillRef.current) return;

      const { create } = await import("filepond");
      const Tagify = (await import("@yaireo/tagify")).default;

      const editorElement = document.querySelector(
        "#editor"
      ) as HTMLElement | null;
      if (editorElement && !quillRef.current) {
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

      // ✅ Các phần khởi tạo khác
      if (filePondRef.current) {
        filePondRef.current.pond = create(filePondRef.current);
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
      isInitializedRef.current = true;
    };

    init();
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      if (typeof idParam !== "string") return;
      const id = parseInt(idParam, 10);
      if (isNaN(id)) return;

      try {
        const data = await getPostById(id);
        setPost(data);
        if (data?.category_post?.category_post_id) {
          setCategoryId(data.category_post.category_post_id);
        }
        if (data?.status !== undefined && data?.status !== null) {
          setStatus(String(data.status)); // gán giá trị status cho select
        }
        // Chờ Quill đã khởi tạo
        const interval = setInterval(() => {
          if (quillRef.current) {
            quillRef.current.root.innerHTML = data?.content || "";
            clearInterval(interval);
          }
        }, 100); // đợi tối đa vài lần
      } catch (error) {
        console.error("Lỗi khi lấy bài viết:", error);
      }
    };

    fetchPost();
  }, [idParam]);

  useEffect(() => {
    if (post?.content) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(post.content, "text/html");

      const strongElements = doc.querySelectorAll("strong");
      strongElements.forEach((el, index) => {
        el.setAttribute("id", `section-${index}`);
      });

      setModifiedContent(doc.body.innerHTML);
    }
  }, [post]);
  useEffect(() => {
    if (post?.content && quillRef.current) {
      // Set nội dung vào trình soạn thảo Quill
      quillRef.current.root.innerHTML = post.content;
    }
  }, [post]);
  const numericId = typeof idParam === "string" ? parseInt(idParam) : NaN;
  if (isNaN(numericId)) {
    console.error("❌ ID không hợp lệ");
    return;
  }

  // Dùng hook sau khi có categoryId
  const { posts, loading, error } = usePostsByCategory(
    categoryId ? categoryId : 0
  );
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
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("category_post_id", category_post_id);
    formData.append("status", status);

    formData.append("content", contentHtml);
    formData.append("author_id", String(user?.id));
    if (thumbnailFile) {
      formData.append("thumbnail", thumbnailFile);
    }

    const result = await updatePost(numericId, formData);

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
        <h2 className="form-title">Sửa bài viết</h2>
        <div className="action-buttons flex !gap-[8px]">
          <button type="button" className="btn btn-back cursor-pointer">
            <i className="fa-solid fa-arrow-left"></i> Trở về
          </button>
          <button
            type="submit"
            className="btn bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
          >
            <i className="fa-solid fa-plus"></i> Sửa bài viết
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
              defaultValue={post?.title || ""}
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
              defaultValue={post?.slug || ""}
            />
          </div>
          <div className="!mb-[12px]">
            <label className="text-lg/6 font-medium text-gray-600 !mb-[8px] !inline-block">
              Danh mục
            </label>
            <select
              id="category"
              value={categoryId ?? ""}
              onChange={(e) => setCategoryId(Number(e.target.value))}
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
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="1">Công khai</option>
              <option value="0">Riêng tư</option>
            </select>
          </div>
          <div className="!mb-[12px]">
            <label className="block text-lg/6 font-medium text-gray-900">
              Ảnh đại diện
            </label>

            {post?.thumbnail && (
              <div className="mb-2">
                <p className="text-gray-600 text-sm">Ảnh hiện tại:</p>
                <img
                  src={`${API_BASE_URL}/uploads/blog/${post.thumbnail}`}
                  alt="Ảnh đại diện cũ"
                  className="w-[150px] h-auto border rounded-md mt-1"
                />
              </div>
            )}

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
