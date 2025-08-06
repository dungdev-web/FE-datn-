"use client";
import "../css/blog.css";
import "../css/pagination.css";
import "../css/product.css";
import { useState, useEffect } from "react";
import { IBlog } from "@/types/blog";
import { getPost } from "@/services/blogService";
import { API_BASE_URL } from "@/config/env";
import { getLocalViews, increaseLocalViews } from "@/shared/until/viewTracker";
import AsideBlog from "../component/Blog/AsideBlog";

import Link from "next/link";
export default function Blog() {
  const [post, setPost] = useState<IBlog[]>([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fetchDataBlog = async () => {
      try {
        const { posts, totalPages } = await getPost(page);
        setPost(posts);
        setTotalPages(totalPages);
        setHasNext(page < totalPages);
      } catch (err) {
        console.error("Lỗi khi lấy bài viết blog:", err);
        setPost([]);
      }
    };
    fetchDataBlog();
  }, [page]);
  const handleNext = () => {
    if (hasNext) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };
  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };
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
            {post.map((item) => {
              const shortContent =
                item.content.length > 500
                  ? item.content.slice(0, 500) + "..."
                  : item.content;

              const safeHTML = shortContent;
              const localViews = getLocalViews(item.post_id);
              const handleViewDetail = () => {
                increaseLocalViews(item.post_id);
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
                    <h2 style={{ textTransform: "uppercase" }}>{item.title}</h2>
                    <p>
                      <span>{item.author?.name} -</span>{" "}
                      {new Date(item.created_at).toLocaleDateString("vi-VN")} -{" "}
                      <span>{localViews}</span> lượt xem
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
            <div className="flex justify-center items-center gap-2.5">
              <button
                onClick={handlePrev}
                disabled={page === 1}
                className=" bg-gray-300 disabled:opacity-50 page-btn"
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>

              <div className="pagination !m-0 ">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={` border  page-btn   ${
                      page === i + 1 ? "active" : ""
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={!hasNext}
                className="px-4 py-2 rounded bg-blue-500 text-white disabled:opacity-50 page-btn"
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
