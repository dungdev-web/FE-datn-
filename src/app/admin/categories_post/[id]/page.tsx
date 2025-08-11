"use client";
import { useState, useEffect } from "react";
import "@/app/admin/css/categories_add_admin.css";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getIdCategoryPost } from "@/services/blogService";
import { useAddCategoryPost, useCategories } from "@/hooks/useBlog";
import { Category } from "@/types/blog";
export default function CategoryEdit() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [parentId, setParentId] = useState<number | null>(null);
  const [categorypostId, setCategoryPostId] = useState<Category | null>(null);
  const { loading, error, category, addCategoriesPost } = useAddCategoryPost();
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();
  const params = useParams();
  const category_post_id = params.id;
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
      // Giả sử bạn có hook useUpdateCategoryPost tương tự useAddCategoryPost
      const updatedCategory = await updateCategoryPost({
        category_post_id: Number(params.category_post_id),
        name: name.trim(),
        slug: slug.trim() || generateSlug(name),
        parent_id: parentId,
      });
      alert(`Cập nhật danh mục thành công: ${updatedCategory.name}`);
    } catch (err) {
      alert((err as Error).message || "Lỗi cập nhật danh mục");
    }
  };

  useEffect(() => {
    async function fetchCategory() {
      const categoryId = Number(category_post_id);
      if (isNaN(categoryId)) {
        console.error("category_post_id không hợp lệ:", category_post_id);
        return;
      }
      try {
        const data = await getIdCategoryPost(categoryId);
        setCategoryPostId(data);
        setName(data.name);
        setSlug(data.slug);
        setParentId(data.parent_id ?? null);
        console.log(data.parent_id);
         // Nếu khác null thì sẽ set parentId, nếu null thì null
      } catch (err: any) {
        console.error("Lỗi khi lấy chi tiết danh mục:", err.message);
      }
    }
    fetchCategory();
  }, [params.category_post_id]);

  return (
    <div className="category-container">
      <h2>Sửa danh mục bài viết </h2>

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
              value={categorypostId?.name}
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
    <>
      {console.log("ParentId hiện tại:", parentId)}
      {console.log("Dữ liệu categories:", categories?.data)}
      <select
        id="category-parent"
        className="input-field"
        value={parentId ?? ""}
        onChange={(e) => {
          console.log("Giá trị chọn mới:", e.target.value);
          setParentId(e.target.value ? Number(e.target.value) : null);
        }}
      >
        <option value="">-- Không có danh mục cha --</option>
        {categories?.data.map((cat) => (
          <option key={cat.category_post_id} value={cat.category_post_id}>
            {cat.name}
          </option>
        ))}
      </select>
    </>
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
              value={categorypostId?.slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>

          <div className="form-group readonly">
            <label>Ngày tạo</label>
            <input
              type="text"
              className="input-field"
              value={
                categorypostId?.created_at
                  ? new Date(categorypostId.created_at).toLocaleDateString(
                      "vi-VN"
                    )
                  : ""
              }
              readOnly
            />
          </div>

          <div className="form-group readonly">
            <label>Ngày cập nhật</label>
            <input
              type="text"
              className="input-field"
              value={
                categorypostId?.updated_at
                  ? new Date(categorypostId.updated_at).toLocaleDateString(
                      "vi-VN"
                    )
                  : ""
              }
              readOnly
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Đang tạo..." : "Sửa"}
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
