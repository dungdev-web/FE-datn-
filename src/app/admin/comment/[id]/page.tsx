"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "../../css/comment_admin.css";
import {
  FaUser,
  FaBoxOpen,
  FaStar,
  FaRegClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { API_BASE_URL } from "@/config/env";
import { getByIdReview } from "@/services/productService";

export default function CommentDetailPage() {
  const router = useRouter();
  const [comment, setComment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const reviewId = Number(params.id); // Lấy id từ URL ?id=123
  console.log(reviewId);

  useEffect(() => {
    if (!reviewId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getByIdReview(Number(reviewId));
        setComment(data);
        console.log(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu bình luận:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [reviewId]);

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (!comment) return <p>Không tìm thấy bình luận.</p>;

  return (
    <div className="review-container">
      <h2>Chi tiết bình luận sản phẩm</h2>

      <div className="comment-card">
        <div className="comment-grid">
          <div className="comment-box">
            <div className="flex items-center gap-3">
              <FaUser />
              <strong>Người dùng:</strong>
              <p>{comment.user.name}</p>
            </div>
            <div className="flex items-center  gap-4 !p-4 ">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600">
                <img
                  src={`${API_BASE_URL}/uploads/${comment.user.avatar}`}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-sm ">
                <div className="flex items-center gap-2 ">
                  <strong>Email: </strong>
                  <p className="font-semibold">{comment.user.email}</p>
                </div>
                <div className="flex items-center gap-2 ">
                  <strong>Số điện thoại: </strong>
                  <p>{comment.user.phone}</p>
                </div>
                <div className="flex items-center gap-2 ">
                  <strong className="w-[20%]">Địa chỉ: </strong>
                  <p className="!mt-[20px]" >{comment.user.ship_addresses[0]?.address_line}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="comment-box ">
            <div className="flex items-center gap-3 !mb-3">
              <FaBoxOpen />
              <strong className="text-base">Sản phẩm:</strong>
              <p className="text-base font-medium">{comment.product.name}</p>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <img
                src={`${API_BASE_URL}/uploads/${comment.product.product_variants?.[0]?.color?.images}`}
                alt={comment.product.name}
                className="w-24 h-24 rounded object-cover border"
              />
              <div className="text-sm">
                <div className="flex gap-2 items-center">
                  <strong>Màu:</strong>
                  <p>
                    {comment.product.product_variants?.[0]?.color?.name_color}
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <strong>Size:</strong>{" "}
                  <p>
                    {comment.product.product_variants?.[0]?.size?.number_size}
                  </p>
                </div>
                <div className="flex  gap-2 items-center">
                  <strong>Mô tả:</strong>
                  <p> {comment.product.short_desc}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <strong>Đánh giá:</strong>
                  <p>
                    {"★".repeat(comment.rating)}{" "}
                    {"☆".repeat(5 - comment.rating)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="comment-box col-span-4">
            <div className="flex items-center gap-3">
              <FaRegClock />
              <strong>Thời gian:</strong>
              <p>{new Date(comment.created_at).toLocaleString('vi-VN')}</p>
            </div>
            <strong>Nội dung:</strong>
            <p>{comment.content}</p>
          </div>
          <div className="comment-box col-span-4 flex justify-between">
            {comment.status === "approved" ? (
              <span className="status approved-add">
                <FaCheckCircle /> Đã duyệt
              </span>
            ) : (
              <span className="status pending-add">
                <FaTimesCircle /> Chờ duyệt
              </span>
            )}
            <label className="switch">
              <input type="checkbox" defaultChecked />
              <span className="slider round"></span>
            </label>
          </div>
        </div>

        <div className="comment-actions">
          <button className="btn btn-back" onClick={() => router.back()}>
            <i className="fa-solid fa-arrow-left"></i> Quay lại
          </button>
        </div>
      </div>
    </div>
  );
}
