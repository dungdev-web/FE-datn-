"use client";
import Link from "next/link";
import "../../css/blog.css";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getPostById } from "@/services/blogService";
import { IBlog } from "@/types/blog";
import AsideBlog from "src/app/(client)/component/Blog/AsideBlog";
import DOMPurify from "dompurify";
import { usePostsByCategory } from "@/hooks/useBlog";
import { updateViewPost } from "@/services/blogService";

export default function Detail_blog() {
  const params = useParams();
  const idParam = params.id;
  const [strongTexts, setStrongTexts] = useState<string[]>([]);
  const [modifiedContent, setModifiedContent] = useState("");
  const [post, setPost] = useState<IBlog | null>(null);
  const [categoryId, setCategoryId] = useState<number | null>(null);

  // Lấy bài viết
  useEffect(() => {
    if (typeof idParam === "string") {
      const id = parseInt(idParam, 10);
      if (!isNaN(id)) {
        const fetchPost = async () => {
          try {
            const data = await getPostById(id);
            setPost(data);
            if (data?.category_post?.category_post_id) {
              setCategoryId(data.category_post.category_post_id);
            }

            if (data?.content) {
              const parser = new DOMParser();
              const doc = parser.parseFromString(data.content, "text/html");
              const strongElements = doc.querySelectorAll("strong");
              const texts = Array.from(strongElements).map(
                (el) => el.textContent || ""
              );
              setStrongTexts(texts);
            }
          } catch (error) {
            console.error("Lỗi khi lấy bài viết:", error);
          }
        };
        fetchPost();
      }
    }
  }, [idParam]);

  // Đổi nội dung có gắn id vào các thẻ strong
  useEffect(() => {
    if (post?.content) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(post.content, "text/html");

      const strongElements = doc.querySelectorAll("strong");
      strongElements.forEach((el, index) => {
        el.setAttribute("id", `section-${index}`);
      });

      setModifiedContent(doc.body.innerHTML);
    }
  }, [post]);
  useEffect(() => {
    if (post?.post_id) {
      updateViewPost(post.post_id);
    }
  }, [post]);

  // Dùng hook sau khi có categoryId
  const { posts, loading, error } = usePostsByCategory(
    categoryId ? categoryId : 0
  );
  console.log("test:", categoryId);

  if (!post) return <div>Đang tải bài viết...</div>;

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
            <h2>Chi tiết bài viết</h2>
          </div>
          <ul className="breadcrumb">
            <li className="home">
              <Link href={"/"} title="Trang chủ">
                <span>Trang chủ</span>
              </Link>
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </li>
            <li className="home">
              <Link href={"/"} title="Tài khoản">
                <span>Tin tức</span>
              </Link>
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </li>
            <li>
              <strong>
                <span>Chi tiết tin tức</span>
              </strong>
            </li>
            <li></li>
          </ul>
        </div>
      </section>
      <main style={{ display: "flex" }}>
        <AsideBlog />
        <article className="article-main">
          <div className="row">
            <div className="col-lg-12">
              <h1 className="title-head">{post.title}</h1>
              <div className="postby">
                <span>
                  Đăng bởi <b>{post.author.name}</b> vào lúc{" "}
                  {new Date(post.created_at).toLocaleDateString("vi-VN")}
                </span>
              </div>
              <div className="article-details">
                <div className="article-content">
                  <div className="wrap-title-toc">
                    <h2>Nội dung bài viết</h2>
                    <div id="toc">
                      <ol className="toc-list" style={{paddingLeft:"30px"}}>
                        {strongTexts.map((text, idx) => (
                          <li className="toc-list-item" key={idx} style={{whiteSpace:"normal",overflowWrap:"anywhere"}}>
                            <a href={`#section-${idx}`} className="toc-link">
                              {text}
                            </a>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                  <div className="rte" id="article-content">
                    <p>&nbsp;</p>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(modifiedContent),
                      }}
                    ></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div
                className="social-media"
                data-permalink="https://halushoe.mysapo.net/top-cac-mau-nike-dunk-duoc-tim-kiem-nhieu-nhat-2023"
              >
                <label>Chia sẻ: </label>
                <a
                  target="_blank"
                  href="//www.facebook.com/sharer.php?u=https://halushoe.mysapo.net/top-cac-mau-nike-dunk-duoc-tim-kiem-nhieu-nhat-2023"
                  className="share-facebook"
                  title="Chia sẻ lên Facebook"
                >
                  <i className="fa-brands fa-facebook"></i>
                </a>
                <a
                  target="_blank"
                  href="//twitter.com/share?url=https://halushoe.mysapo.net/top-cac-mau-nike-dunk-duoc-tim-kiem-nhieu-nhat-2023"
                  className="share-twitter"
                  title="Chia sẻ lên Twitter"
                >
                  <i className="fa-brands fa-twitter"></i>
                </a>
                <a
                  target="_blank"
                  href="//pinterest.com/pin/create/button/?url=https://halushoe.mysapo.net/top-cac-mau-nike-dunk-duoc-tim-kiem-nhieu-nhat-2023&amp;media=http://bizweb.dktcdn.net/thumb/1024x1024/100/505/077/articles/layer-2.jpg?v=1706065248850"
                  className="share-pinterest"
                  title="Chia sẻ lên pinterest"
                >
                  <i className="fa-brands fa-pinterest"></i>
                </a>
                <a
                  target="_blank"
                  href="//plus.google.com/share?url=https://halushoe.mysapo.net/top-cac-mau-nike-dunk-duoc-tim-kiem-nhieu-nhat-2023"
                  className="share-google"
                  title="+1"
                >
                  <i className="fa-brands fa-google-plus-g"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-12 space-30">
              <div className="title-text related-blog-title">
                <h2> Tin liên quan</h2>
              </div>

              <div className="list-blogs related-blogs">
                {posts.map((post) => (
                  <div className="blog-item1 blog-item-list" key={post.post_id}>
                    <h3 className="blog-item-name">
                      <i className="fa fa-caret-right"></i>{" "}
                      <a href={`/blog/${post.post_id}`} title={post.title}>
                        {post.title}
                      </a>
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>
        {/* Nút mở sidebar (chỉ hiển thị trên mobile) */}
      </main>
    </>
  );
}
