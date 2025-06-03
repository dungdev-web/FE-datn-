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
        <div className="form-header d-flex justify-content-between align-items-center mb-4">
          <h2 className="form-title">Thêm bài viết mới</h2>
          <div className="action-buttons d-flex gap-2">
            <button type="button" className="btn btn-back">
              <i className="fa-solid fa-arrow-left"></i> Trở về
            </button>
            <button type="submit" className="btn btn-success">
              <i className="fa-solid fa-plus"></i> Thêm bài viết
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Tên bài viết</label>
              <input
                type="text"
                id="title"
                className="form-control"
                placeholder="Nhập tiêu đề bài viết"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Slug</label>
              <input
                type="text"
                id="slug"
                className="form-control"
                placeholder="Slug tự sinh hoặc chỉnh sửa"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Danh mục</label>
              <select className="form-select">
                <option value="">-- Chọn danh mục --</option>
                <option value="tech">Công nghệ</option>
                <option value="life">Đời sống</option>
                <option value="news">Tin tức</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Tags</label>
              <input
                type="text"
                id="tags"
                className="form-control"
                placeholder="Nhập các tag, phân cách bằng dấu phẩy"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Trạng thái</label>
              <select className="form-select">
                <option value="public">Công khai</option>
                <option value="draft">Nháp</option>
                <option value="pending">Chờ duyệt</option>
              </select>
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Tóm tắt</label>
              <textarea
                className="form-control"
                rows={5}
                placeholder="Tóm tắt ngắn gọn nội dung bài viết"
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Ảnh đại diện</label>
              <input type="file" className="filepond" name="image" />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Nội dung bài viết</label>
          <div id="editor" className="quill-editor"></div>
        </div>
      </form>
    </main>
  );
}
