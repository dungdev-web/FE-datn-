"use client";
import "../../../css/blog.css";
import "../../../css/pagination.css";
import "../../../css/product.css";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { API_BASE_URL } from "@/config/env";
import Link from "next/link";
import { usePostsByCategory } from "@/hooks/useBlog";
import AsideBlog from "@/app/(client)/component/Blog/AsideBlog";
export default function Blog() {
  const params = useParams();
  const categoryId = Number(params.id);
  const { posts, loading, error } = usePostsByCategory(categoryId);

  const stripHtmlTags = (html: string): string => {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.innerText;
  };
  return (
    <>
      <section
        className="bread-crumb background-cover relative"
        style={{
          backgroundImage: "url(/images/banner/banner_dieuhuong1.png)",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {/* Lớp phủ làm mờ nền */}
        <div className="absolute inset-0 bg-gray-500/50 backdrop-blur-none z-0"></div>

        <div className="breadcrumb-container">
          <div className="title-page">
            <h2> Trang tin tức </h2>
          </div>
          <ul className="breadcrumb">
            <li className="home">
              <a href="/" title="Trang chủ">
                <span>Trang chủ</span>
              </a>
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </li>
            <li>
              <strong>
                <span>Tin tức</span>
              </strong>
            </li>
            <li></li>
          </ul>
        </div>
      </section>
      {/* Nút mở sidebar (chỉ hiển thị trên mobile) */}

      <main className="main_blog">
        <AsideBlog />
        <article>
          <div className="list-blog">
            {loading && <p>Đang tải bài viết...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && !error && posts.length === 0 && (
              <p>Không có bài viết nào trong danh mục này.</p>
            )}
            {!loading &&
              !error &&
              posts.length > 0 &&
              posts.map((item) => {
                const shortContent =
                  item.content.length > 500
                    ? item.content.slice(0, 500) + "..."
                    : item.content;

                const safeHTML = shortContent;
                const localViews = (item.view);

                const handleViewDetail = () => {
                  window.location.href = `/blog/${item.post_id}`;
                };

                return (
                  <div className="box-blog" key={item.post_id}>
                    <Link href="#" onClick={handleViewDetail}>
                      <img
                        src={`${API_BASE_URL}/uploads/blog/${item.thumbnail}`}
                        alt={item.title}
                      />
                    </Link>
                    <div className="content-blog" style={{ width: "70%" }}>
                      <h2 style={{ textTransform: "uppercase" }}>
                        {item.title}
                      </h2>
                      <p>
                        <span>{item.author?.name} -</span>{" "}
                        {new Date(item.created_at).toLocaleDateString("vi-VN")}{" "}
                        - <span>{localViews}</span> lượt xem
                      </p>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: stripHtmlTags(safeHTML),
                        }}
                      ></p>
                    </div>
                  </div>
                );
              })}
          </div>
        </article>
      </main>
    </>
  );
}
