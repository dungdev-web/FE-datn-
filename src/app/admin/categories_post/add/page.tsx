"use client";
import { useState } from "react";
import "@/app/admin/css/categories_add_admin.css";
import Link from "next/link";
import { useAddCategoryPost, useCategories } from "@/hooks/useBlog";
export default function CategoryAdd() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [parentId, setParentId] = useState<number | null>(null);

  const { loading, error, category, addCategoriesPost } = useAddCategoryPost();
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD") 
      .replace(/[\u0300-\u036f]/g, "") 
      .replace(/[^a-z0-9\s-]/g, "") 
      .trim()
      .replace(/\s+/g, "-"); 
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    setSlug(generateSlug(val));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Tên danh mục không được để trống");
      return;
    }

    try {
      const newCategory = await addCategoriesPost({
        name: name.trim(),
        slug: slug.trim() || generateSlug(name),
        parent_id: parentId, 
      });
      alert(`Tạo danh mục thành công: ${newCategory.name}`);
      // Reset form nếu cần
      setName("");
      setSlug("");
    } catch (err) {
      alert((err as Error).message || "Lỗi tạo danh mục");
    }
  };
  return (
    <div className="category-container">
      <h2>Thêm danh mục bài viết mới</h2>

      <form className="category-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category-name">
              Tên danh mục <span className="required">*</span>
            </label>
            <input
              type="text"
              id="category-name"
              className="input-field"
              placeholder="Nhập tên danh mục"
              required
              value={name}
              onChange={handleNameChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category-status">Danh mục con</label>
            {categoriesLoading ? (
              <p>Đang tải danh mục...</p>
            ) : categoriesError ? (
              <p style={{ color: "red" }}>Lỗi tải danh mục</p>
            ) : (
              <select
                id="category-parent"
                className="input-field"
                value={parentId ?? ""}
                onChange={(e) =>
                  setParentId(e.target.value ? Number(e.target.value) : null)
                }
              >
                <option value="">-- Không có danh mục cha --</option>
                {categories.map((cat) => (
                  <option key={cat.category_post_id} value={cat.category_post_id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category-slug">Slug</label>
            <input
              type="text"
              id="category-slug"
              className="input-field"
              placeholder="Ví dụ: tin-tuc"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>

          <div className="form-group readonly">
            <label>Ngày tạo</label>
            <input
              type="text"
              className="input-field"
              value="Tự động tạo"
              readOnly
            />
          </div>

          <div className="form-group readonly">
            <label>Ngày cập nhật</label>
            <input
              type="text"
              className="input-field"
              value="Tự động cập nhật"
              readOnly
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Đang tạo..." : "Thêm"}
          </button>
          <Link
            href={"/admin/categories"}
            className="btn btn-back"
            type="button"
          >
            <i className="fa-solid fa-arrow-left"></i> Trở về
          </Link>
        </div>

        {error && <p style={{ color: "red" }}>Lỗi: {error.message}</p>}
        {category && (
          <p style={{ color: "green" }}>
            Danh mục "{category.name}" đã được tạo.
          </p>
        )}
      </form>
    </div>
  );
}
