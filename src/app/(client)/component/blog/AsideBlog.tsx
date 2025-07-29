import { useCategories, usePostsByCategory } from "@/hooks/useBlog";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { API_BASE_URL } from "@/config/env";

export default function AsideBlog() {
  const { categories, loading: catLoading } = useCategories();
  const [selectedCategoryId, setSelectedCategory] = useState<number | null>(
    null
  );
  const [openParentId, setOpenParentId] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { posts, loading: postLoading } = usePostsByCategory(
    selectedCategoryId ?? 2
  );
  console.log(selectedCategoryId);

  // Set danh mục mặc định là cái đầu tiên khi có data
  useEffect(() => {
    if (categories.length > 0 && selectedCategoryId === null) {
      setSelectedCategory(categories[1].category_post_id);
    }
  }, [categories, selectedCategoryId]);

  return (
    <>
      <button
        className="toggle-sidebar-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰ Danh mục & Liên quan
      </button>
      <aside className={`mobile-sidebar ${sidebarOpen ? "open" : ""}`}>
        <button
          className="close-sidebar-btn"
          onClick={() => setSidebarOpen(false)}
        >
          ×
        </button>
        <div className="category-blog">
          <h2>DANH MỤC BÀI VIẾT</h2>
          <ul>
              {categories
                .filter((cat) => cat.parent_id === null)
                .map((parent) => {
                  const isOpen = openParentId === parent.category_post_id;
                  const childCategories = categories.filter(
                    (cat) => cat.parent_id === parent.category_post_id
                  );

                  return (
                    <li key={parent.category_post_id}>
                      <div
                        onClick={() =>
                          setOpenParentId(
                            isOpen ? null : parent.category_post_id
                          )
                        }
                        className="flex justify-between items-center cursor-pointer "
                        style={{
                          fontWeight:
                            selectedCategoryId === parent.category_post_id
                              ? "bold"
                              : "normal",
                        }}
                      >
                        {parent.name}
                        {childCategories.length > 0 && (
                          <i
                            className={`fas fa-chevron-down transition-transform duration-300 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          ></i>
                        )}
                      </div>

                      {isOpen && childCategories.length > 0 && (
                        <ul className="!ml-4 !mt-1">
                          {childCategories.map((child) => (
                            <li
                              key={child.category_post_id}
                              className="cursor-pointer hover:text-blue-500"
                              onClick={() =>
                                setSelectedCategory(child.category_post_id)
                              }
                            >
                              + {child.name}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
            </ul>
        </div>

       <div className="relate-blog">
          <h2>BÀI VIẾT LIÊN QUAN</h2>

          {postLoading ? (
            <p>Đang tải bài viết...</p>
          ) : posts.length === 0 ? (
            <p>Không có bài viết.</p>
          ) : (
            posts.slice(0, 4).map((post) => (
              <div className="box-relate-blog" key={post.post_id}>
                <Link href={`/blog/${post.post_id}`}>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={`${API_BASE_URL}/uploads/blog/${post.images}`}
                      alt={post.title}
                      width={80}
                      height={60}
                      style={{ borderRadius: "4px", objectFit: "cover" }}
                    />
                    <p>{post.title}</p>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>

        <div className="banner-relate-blog">
          <img src="/images/banner/aside_banner.webp" alt="" />
        </div>
      </aside>
      <aside className="desktop">
        {/* DANH MỤC BÀI VIẾT */}
        <div className="category-blog">
          <h2>DANH MỤC BÀI VIẾT</h2>
          {catLoading ? (
            <p>Đang tải danh mục...</p>
          ) : (
            <ul className="space-y-1">
              {categories
                .filter((cat) => cat.parent_id === null)
                .map((parent) => {
                  const isOpen = openParentId === parent.category_post_id;
                  const childCategories = categories.filter(
                    (cat) => cat.parent_id === parent.category_post_id
                  );

                  return (
                    <li key={parent.category_post_id}>
                      <div
                        onClick={() =>
                          setOpenParentId(
                            isOpen ? null : parent.category_post_id
                          )
                        }
                        className="flex justify-between items-center cursor-pointer "
                        style={{
                          fontWeight:
                            selectedCategoryId === parent.category_post_id
                              ? "bold"
                              : "normal",
                        }}
                      >
                        {parent.name}
                        {childCategories.length > 0 && (
                          <i
                            className={`fas fa-chevron-down transition-transform duration-300 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          ></i>
                        )}
                      </div>

                      {isOpen && childCategories.length > 0 && (
                        <ul className="!ml-4 !mt-1 space-y-1">
                          {childCategories.map((child) => (
                            <li
                              key={child.category_post_id}
                              className="cursor-pointer hover:text-blue-500"
                              onClick={() =>
                                setSelectedCategory(child.category_post_id)
                              }
                            >
                              + {child.name}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
            </ul>
          )}
        </div>

        {/* BÀI VIẾT LIÊN QUAN */}
        <div className="relate-blog">
          <h2>BÀI VIẾT LIÊN QUAN</h2>

          {postLoading ? (
            <p>Đang tải bài viết...</p>
          ) : posts.length === 0 ? (
            <p>Không có bài viết.</p>
          ) : (
            posts.slice(0, 4).map((post) => (
              <div className="box-relate-blog" key={post.post_id}>
                <Link href={`/blog/${post.post_id}`}>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={`${API_BASE_URL}/uploads/blog/${post.images}`}
                      alt={post.title}
                      width={80}
                      height={60}
                      style={{ borderRadius: "4px", objectFit: "cover" }}
                    />
                    <p>{post.title}</p>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>

        {/* BANNER */}
        <div className="banner-relate-blog">
          <Image
            src="/images/banner/aside_banner.webp"
            alt="Banner"
            width={300}
            height={200}
          />
        </div>
      </aside>
    </>
  );
}
