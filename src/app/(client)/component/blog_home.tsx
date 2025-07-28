"use client";
import "../css/home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { IBlog } from "@/types/blog";
import { getPost } from "@/services/blogService"; // hoặc blogApi nếu bạn dùng tên khác
import { API_BASE_URL } from "@/config/env";
import "swiper/css";
import "swiper/css/navigation";
export default function BlogHome() {
  const [blog, setBlog] = useState<IBlog[]>([]);

  useEffect(() => {
    const fetchDataBlog = async () => {
      try {
        const { posts } = await getPost(1);
        setBlog(posts);
      } catch (err) {
        console.error("Lỗi khi lấy bài viết blog:", err);
      }
    };
    fetchDataBlog();
  }, []);
  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={20}
      slidesPerView={4}
      loop={true}
      navigation
      breakpoints={{
        0: { slidesPerView: 2 },
        576: { slidesPerView: 3 },
        768: { slidesPerView: 3 },
        992: { slidesPerView: 4 },
      }}
    >
      {blog.map((item) => (
        <SwiperSlide key={item.post_id}>
          <div className="blog-item">
            <img src={`${API_BASE_URL}/uploads/blog/${item.images}`} alt={item.title} />
            <div className="blog-info">
              <p className="blog-date">
                {new Date(item.created_at).toLocaleDateString("vi-VN")}
              </p>
              <p className="blog-author">{item.author?.name || "Admin"}</p>
            </div>
            <h3 className="blog-title">{item.title}</h3>
            <p className="blog-desc">{item.content?.slice(0, 120)}...</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
