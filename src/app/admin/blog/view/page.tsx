"use client";
import { useEffect } from "react";
import "quill/dist/quill.snow.css";
import "filepond/dist/filepond.min.css";
import "@yaireo/tagify/dist/tagify.css";
import "../../css/css.css";
import "../../css/dashboard.css";
import "../../css/blog_add.css";

export default function Blog_View() {
  useEffect(() => {
    const init = async () => {
      // Import động chỉ chạy ở client
      const Quill = (await import("quill")).default;
      const { create } = await import("filepond");
      const Tagify = (await import("@yaireo/tagify")).default;

      // Khởi tạo Quill editor
      const editorElement = document.querySelector("#editor");
      if (editorElement) {
        new Quill(editorElement, {
          theme: "snow",
        });
      }

      // Khởi tạo FilePond
      const fileInput = document.querySelector("input.filepond");
      if (fileInput) create(fileInput);

      // Khởi tạo Tagify
      const tagInput = document.querySelector("#tags") as HTMLInputElement | null;
      if (tagInput) new Tagify(tagInput);

      // Tạo slug từ tiêu đề
      const titleInput = document.getElementById("title") as HTMLInputElement | null;
      const slugInput = document.getElementById("slug") as HTMLInputElement | null;

      const handleTitleInput = () => {
        if (titleInput && slugInput) {
          const title = titleInput.value;
          const slug = title
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/--+/g, "-");
          slugInput.value = slug;
        }
      };

      titleInput?.addEventListener("input", handleTitleInput);

      // Cleanup
      return () => {
        titleInput?.removeEventListener("input", handleTitleInput);
      };
    };

    init();
  }, []);

  return (
    <main className="main-content">
      <form className="form-add-post">
        <div className="form-header flex justify-between items-center !mb-[24px]">
          <h2 className="form-title">Thêm bài viết mới</h2>
          <div className="action-buttons flex !gap-[8px]">
            <button type="button" className="btn btn-back cursor-pointer">
              <i className="fa-solid fa-arrow-left"></i> Trở về
            </button>
            <button type="submit" className="btn bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded">
              <i className="fa-solid fa-plus"></i> Thêm bài viết
            </button>
          </div>
        </div>

        <div className="flex !flex-row gap-[20px]">
          <div className="w-1/2">
            <div className="!mb-[12px]">
              <label className="block text-lg/6 font-medium text-gray-900 !mb-[8px] !inline-block ">Tên bài viết</label>
              <input
                type="text"
                id="title"
                className="form-controls !w-full !px-4 !py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập tiêu đề bài viết"
              />
            </div>

            <div className="!mb-[12px]">
              <label className="block text-lg/6 font-medium text-gray-900  !mb-[8px] !inline-block">Slug</label>
              <input
                type="text"
                id="slug"
                className="form-controls !w-full !px-4 !py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Slug tự sinh hoặc chỉnh sửa"
              />
            </div>

            <div className="!mb-[12px]">
              <label className="block text-lg/6 font-medium text-gray-600 !mb-[8px] !inline-block">Danh mục</label>
              <select className="!w-full !px-4 !py-2 border border-gray-300 rounded-md shadow-sm bg-white text-base focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">-- Chọn danh mục --</option>
                <option value="tech">Công nghệ</option>
                <option value="life">Đời sống</option>
                <option value="news">Tin tức</option>
              </select>
            </div>


            <div className="!mb-[12px]">
              <label className="block text-lg/6 font-medium text-gray-900  !mb-[8px] !inline-block">Tags</label>
              <input
                type="text"
                id="tags"
                className="form-control w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập các tag, phân cách bằng dấu phẩy"
              />
            </div>

<div className="!mb-[12px]">
  <label className="block text-lg/6 font-medium text-gray-600 !mb-[8px] !inline-block">Trạng thái</label>
  <select className="!w-full !px-4 !py-2 border border-gray-300 rounded-md shadow-sm bg-white text-base focus:outline-none focus:ring-2 focus:ring-blue-500">
    <option value="public">Công khai</option>
    <option value="draft">Nháp</option>
    <option value="pending">Chờ duyệt</option>
  </select>
</div>
          </div>

          <div className="w-1/2">
<div className="!mb-[12px]">
  <label className="block text-lg/6 font-medium text-gray-900 !mb-[8px] !inline-block">Tóm tắt</label>
  <textarea 
    name="about" 
    id="about" 
    rows={5}
    placeholder="Tóm tắt ngắn gọn nội dung bài viết"
    className="w-full !px-4 !py-3 border border-gray-300 rounded-md shadow-sm bg-white text-base focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
  ></textarea>
</div>

            <div className="!mb-[12px]">
              <label className="block text-lg/6 font-medium text-gray-900">Ảnh đại diện</label>
              <input type="file" className="filepond" name="image" />
            </div>
          </div>
        </div>

        <div className="!mb-[12px]">
          <label className="block text-lg/6 font-medium text-gray-900">Nội dung bài viết</label>
          <div id="editor" className="min-h-[300px] border border-gray-300 rounded-md p-4 bg-white"></div>
        </div>
      </form>
    </main>
  );
}
