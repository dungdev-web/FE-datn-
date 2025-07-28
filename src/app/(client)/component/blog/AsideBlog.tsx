import { useCategories, usePostsByCategory } from "@/hooks/useBlog";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function AsideBlog() {
  const { categories, loading: catLoading } = useCategories();
  const [selectedCategoryId, setSelectedCategory] = useState<number | null>(
    null
  );

  const { posts, loading: postLoading } =
    usePostsByCategory(selectedCategoryId ?? 2);
console.log(selectedCategoryId);

  // Set danh mục mặc định là cái đầu tiên khi có data
  useEffect(() => {
    if (categories.length > 0 && selectedCategoryId === null) {
      setSelectedCategory(categories[1].category_post_id);
    }
  }, [categories, selectedCategoryId]);

  return (
    <aside className="desktop">
      {/* DANH MỤC BÀI VIẾT */}
      <div className="category-blog">
        <h2>DANH MỤC BÀI VIẾT</h2>
        {catLoading ? (
          <p>Đang tải danh mục...</p>
        ) : (
          <ul>
            {categories.map((cat) => (
              <li
                key={cat.category_post_id}
                onClick={() => setSelectedCategory(cat.category_post_id)}
                style={{
                  cursor: "pointer",
                  fontWeight:
                    selectedCategoryId === cat.category_post_id
                      ? "bold"
                      : "normal",
                }}
              >
                {cat.name}
              </li>
            ))}
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
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <Image
                    src={post.thumbnail || "/images/default.jpg"}
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
  );
}
