"use client";
import { useEffect, useState, useRef } from "react";
import Quill from "quill";
import ImageUploader from "quill-image-uploader";
import "quill/dist/quill.snow.css";
import "quill-image-uploader/dist/quill.imageUploader.min.css";
import "filepond/dist/filepond.min.css";
import "@yaireo/tagify/dist/tagify.css";
import { useParams, useRouter } from "next/navigation";
import "../../css/blog_add.css";
import { useUpdatePost } from "@/hooks/useAddBlog";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useCategories } from "@/hooks/useBlog";
import { API_BASE_URL } from "@/config/env";
import { getPostById } from "@/services/blogService";
import { IBlog } from "@/types/blog";

import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

Quill.register("modules/imageUploader", ImageUploader);
registerPlugin(FilePondPluginImagePreview);

export default function Blog_View() {
  const quillRef = useRef<Quill | null>(null);
  const isInitializedRef = useRef(false);
  const params = useParams();
  const router = useRouter();
  const idParam = params.id;

  const [post, setPost] = useState<IBlog | null>(null);

  // State quản lý form
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [status, setStatus] = useState("1"); // mặc định công khai

  const { updatePost, loading: loadingUpdate } = useUpdatePost();
  const { categories, loading: loadingCategories, error: errorCategories } = useCategories();
  const { user } = useAuthUser();

  // FilePond quản lý files (có preload file cũ)
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    const init = async () => {
      if (isInitializedRef.current || quillRef.current) return;

      // Khởi tạo Quill
      const editorElement = document.querySelector("#editor") as HTMLElement | null;
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

      // Khởi tạo Tagify (nếu cần)
      const tagInput = document.querySelector("#tags") as HTMLInputElement | null;
      if (tagInput) new (await import("@yaireo/tagify")).default(tagInput);

      isInitializedRef.current = true;
    };

    init();
  }, []);

  // Lấy dữ liệu bài viết khi có idParam
  useEffect(() => {
    const fetchPost = async () => {
      if (typeof idParam !== "string") return;
      const id = parseInt(idParam, 10);
      if (isNaN(id)) return;

      try {
        const data = await getPostById(id);
        setPost(data);

        // Set state form từ dữ liệu lấy về
        setTitle(data?.title || "");
        setSlug(data?.slug || "");
        setCategoryId(data?.category_post?.category_post_id ?? "");
        setStatus(data?.status !== undefined && data.status !== null ? String(data.status) : "1");

        // Set nội dung cho Quill sau khi nó đã khởi tạo
        const interval = setInterval(() => {
          if (quillRef.current) {
            quillRef.current.root.innerHTML = data?.content || "";
            clearInterval(interval);
          }
        }, 100);

        // Preload ảnh cũ vào FilePond
        if (data?.thumbnail) {
          setFiles([
            {
              source: `${API_BASE_URL}/uploads/blog/${data.thumbnail}`,
              options: {
                type: "local",
              },
            },
          ]);
        }
      } catch (error) {
        console.error("Lỗi khi lấy bài viết:", error);
      }
    };

    fetchPost();
  }, [idParam]);

  // Tự động tạo slug khi title thay đổi
  useEffect(() => {
    if (!title) {
      setSlug("");
      return;
    }
    const newSlug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-");
    setSlug(newSlug);
  }, [title]);

  const numericId = typeof idParam === "string" ? parseInt(idParam) : NaN;
  if (isNaN(numericId)) {
    console.error("❌ ID không hợp lệ");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !slug || !categoryId || !quillRef.current?.root.innerHTML) {
      console.error("❌ Thiếu dữ liệu bắt buộc");
      return;
    }

    const contentHtml = quillRef.current.root.innerHTML;

    // Lấy file ảnh thumbnail nếu có
    const thumbnailFile = files.length > 0 && files[0].file ? files[0].file : null;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("category_post_id", String(categoryId));
    formData.append("status", status);
    formData.append("content", contentHtml);
    formData.append("author_id", String(user?.id));

    if (thumbnailFile) {
      formData.append("thumbnail", thumbnailFile);
    }

    console.log("🔸 title:", title);
    console.log("🔸 slug:", slug);
    console.log("🔸 category_post_id:", categoryId);
    console.log("🔸 contentHtml:", contentHtml ? "[có nội dung]" : "[trống]");
    console.log("🔸 thumbnailFile:", thumbnailFile ? "[đã chọn ảnh]" : "[chưa có ảnh]");

    const result = await updatePost(numericId, formData);

    if (result) {
      console.log("✅ Cập nhật bài viết thành công:", result);
      router.push("/admin/blog");
    } else {
      console.error("❌ Cập nhật bài viết thất bại");
    }
  };

  return (
    <form className="form-add-post" onSubmit={handleSubmit}>
      {loadingCategories && <p>Đang tải danh mục...</p>}
      {errorCategories && <p>{errorCategories}</p>}

      <div className="form-header flex justify-between items-center !mb-[24px]">
        <h2 className="form-title">Sửa bài viết</h2>
        <div className="action-buttons flex !gap-[8px]">
          <button
            type="button"
            className="btn btn-back cursor-pointer"
            onClick={() => router.back()}
          >
            <i className="fa-solid fa-arrow-left"></i> Trở về
          </button>
          <button
            type="submit"
            className="btn bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
            disabled={loadingUpdate}
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>
          <div className="!mb-[12px]">
            <label className="text-lg/6 font-medium text-gray-600 !mb-[8px] !inline-block">
              Danh mục
            </label>
            <select
              id="category"
              value={categoryId}
              onChange={(e) =>
                setCategoryId(e.target.value ? Number(e.target.value) : "")
              }
              className="!w-full !px-4 !py-2 border border-gray-300 rounded-md bg-white text-gray-700"
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
              className="!w-full !px-4 !py-2 border border-gray-300 rounded-md bg-white text-gray-700"
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

            {/* Ảnh hiện tại bên dưới (không dùng FilePond để hiển thị ảnh cũ nữa) */}
            {/* Bạn có thể bỏ phần này nếu preload vào FilePond */}

            {/* <div className="mb-2">
              <p className="text-gray-600 text-sm">Ảnh hiện tại:</p>
              {post?.thumbnail && (
                <img
                  src={`${API_BASE_URL}/uploads/blog/${post.thumbnail}`}
                  alt="Ảnh đại diện cũ"
                  className="w-[150px] h-auto border rounded-md mt-1"
                />
              )}
            </div> */}

            <FilePond
              files={files}
              allowMultiple={false}
              onupdatefiles={setFiles}
              name="thumbnail"
              labelIdle='Kéo thả file hoặc <span class="filepond--label-action"> Chọn file </span>'
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
