"use client";
import "../css/css.css";
import { useState, useEffect } from "react";
import "../css/dashboard.css";
import "../css/blog_add.css";
import { getPost } from "@/services/blogService"; 
import { IBlog } from "@/types/blog"; 
import Link from "next/link";
import { ArrowUpDown } from "lucide-react";
import { useDeletePost } from "@/hooks/useAddBlog";
export default function Blog() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState<IBlog[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"created_at" | "updated_at" | "title">(
    "created_at"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const { deletePost } = useDeletePost();
  const handleDelete = async (postId: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
      try {
        await deletePost(postId);
        setPosts((prevPosts) => prevPosts.filter((post) => post.post_id !== postId));
      } catch (error) {
        console.error("Lỗi khi xóa bài viết:", error);
      }
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);
  useEffect(() => {
    async function fetchData() {
      const result = await getPost(
        page,
        searchText,
        statusFilter,
        sortBy,
        sortOrder
      );
      setPosts(result.posts);
      setTotalPages(result.totalPages);
    }
    fetchData();
  }, [page, searchText, statusFilter, sortBy, sortOrder]);

  const fetchPosts = async () => {
    try {
      const res = await getPost(page);
      setPosts(res.posts);
      setTotalPages(res.totalPages);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách bài viết:", error);
    }
  };
  const toggleSort = (field: "created_at" | "updated_at" | "title") => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  return (
    <>
      <div className="post-list">
        <h2>Danh sách bài viết</h2>

        <div className="post-actions">
          <button className="btn btn-add">
            <Link href="/admin/blog/add"><i className="fa-solid fa-plus"></i> Thêm mới bài viết</Link>
          </button>
          <button
            className="btn btn-refresh"
            onClick={() => window.location.reload()}
          >
            <i className="fa-solid fa-rotate-right"></i> Refresh
          </button>

          <div className={`search-toggle ${isSearching ? "active" : ""}`}>
            {isSearching ? (
              <input
                type="text"
                className="search-input"
                autoFocus
                placeholder="Nhập từ khóa..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onBlur={() => {
                  if (searchText === "") setIsSearching(false);
                }}
              />
            ) : (
              <button
                className="btn btn-search"
                onClick={() => setIsSearching(true)}
              >
                <i className="fa-solid fa-magnifying-glass"></i> Tìm kiếm
              </button>
            )}
          </div>
        </div>

        <table className="post-table">
          <thead>
            <tr>
              <th>Id bài viết</th>
              <th>
                Tên bài viết
                <ArrowUpDown
                  className="inline-block ml-2 w-4 h-4 cursor-pointer"
                  onClick={() => toggleSort("title")}
                ></ArrowUpDown>
              </th>
              <th>Ảnh</th>
              <th>Trạng thái</th>
              <th>
                Ngày tạo
                <ArrowUpDown
                  onClick={() => toggleSort("created_at")}
                  className="inline-block ml-2 w-4 h-4 cursor-pointer"
                />
              </th>
              <th>
                Ngày sửa
                <ArrowUpDown
                  className="inline-block ml-2 w-4 h-4 cursor-pointer"
                  onClick={() => toggleSort("updated_at")}
                ></ArrowUpDown>
              </th>

              <th>Thao tác</th>
            </tr>
            <tr className="filter-row">
              <th></th>
              <th>
                <input
                  type="text"
                  placeholder="Tìm tên bài viết..."
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </th>
              <th></th>
              <th>
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="">Tất cả</option>
                  <option value="1">Công khai</option>
                  <option value="0">Riêng tư</option>
                </select>
              </th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={6}>Không có bài viết nào.</td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.post_id}>
                  <td>#{post.post_id}</td>
                  <td>{post.title}</td>
                  <td>
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/blog/${post.thumbnail}`}
                      alt={post.title}
                      style={{ width: "60px", height: "auto" }}
                    />
                  </td>
                  <td className="status-column">
                    <span
                      className={`badge badge-${
                        post.status === 1 ? "public" : "private"
                      }`}
                    >
                      {post.status === 1 ? "Công khai" : "Riêng tư"}
                    </span>
                  </td>
                  <td>
                    {new Date(post.created_at).toLocaleDateString("vi-VN")}
                  </td>
                  <td>
                    {new Date(post.updated_at).toLocaleDateString("vi-VN")}
                  </td>
                  <td>
                    <Link href={`/admin/blog/${post.post_id}`}>
                      <i
                        className="fa-solid fa-pen edit-icon"
                        title="Sửa bài viết"
                      ></i>
                    </Link>
                    <i
                      className="fa-solid fa-trash delete-icon"
                      title="Xóa bài viết"
                      onClick={() => handleDelete(post.post_id)}
                    ></i>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="post-pagination">
          <button
            className="page-btn"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`page-btn ${page === i + 1 ? "active" : ""}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="page-btn"
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            <i className="fa-solid fa-angle-right"></i>
          </button>
        </div>
      </div>
    </>
  );
}
