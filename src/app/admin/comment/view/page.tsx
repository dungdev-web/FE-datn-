"use client";
import { useRouter } from "next/navigation";
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

const mockComment = {
  id: 101,
  user: {
    name: "Lê Chí Bảo",
    email: "lechibao@gmail.com",
    address: "76 duognd dos sdhdskdsdsds",
    phone: "0775895943",
    avatar: "/images/logo/anhdep.jpg",
  },
  product: "Giày NIKE",
  rating: 4,
  content:
    "Rất hài lòng với sản phẩm! Giao hàng cực kỳ nhanh, đóng gói cẩn thận. Sẽ tiếp tục ủng hộ shop trong những lần sau.Rất hài lòng với sản phẩm! Giao hàng cực kỳ nhanh, đóng gói cẩn thận. Sẽ tiếp tục ủng hộ shop trong những lần sau.Rất hài lòng với sản phẩm! Giao hàng cực kỳ nhanh, đóng gói cẩn thận. Sẽ tiếp tục ủng hộ shop trong những lần sau.Rất hài lòng với sản phẩm! Giao hàng cực kỳ nhanh, đóng gói cẩn thận. Sẽ tiếp tục ủng hộ shop trong những lần sau.Rất hài lòng với sản phẩm! Giao hàng cực kỳ nhanh, đóng gói cẩn thận. Sẽ tiếp tục ủng hộ shop trong những lần sau.Rất hài lòng với sản phẩm! Giao hàng cực kỳ nhanh, đóng gói cẩn thận. Sẽ tiếp tục ủng hộ shop trong những lần sau.",
  status: "pending", // or "pending-add"
  createdAt: "2025-07-05 14:32",
};

export default function CommentDetailPage() {
  const router = useRouter();
  const [comment, setComment] = useState<any>(null);

  useEffect(() => {
    setComment(mockComment);
  }, []);

  if (!comment) return <p>Đang tải dữ liệu...</p>;

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
                  src={comment.user.avatar}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-sm text-gray-800 dark:text-gray-200">
                <div className="flex items-center gap-2 "><strong>Email: </strong><p className="font-semibold">{comment.user.email}</p></div>
                <div className="flex items-center gap-2 "><strong>Số điện thoại: </strong><p className="text-gray-600 dark:text-gray-400">
                  {comment.user.phone}
                </p></div>
                <div className="flex items-center gap-2 ">
                <strong>Địa chỉ: </strong>
                  <p className="text-gray-600 dark:text-gray-400">
                  {comment.user.address}
                </p></div>
              </div>
            </div>
          </div>
          <div className="comment-box">
            <div className="flex items-center gap-3">
            <FaBoxOpen />
            <strong>Sản phẩm:</strong>
            <p>{comment.product}</p>
            </div>
          </div>
          {/* <div className="comment-box">
      <FaStar />
      <strong>Đánh giá:</strong>
      <p>
        {"★".repeat(comment.rating)}{" "}
        {"☆".repeat(5 - comment.rating)}
      </p>
    </div>
    <div className="comment-box">
      <FaRegClock />
      <strong>Thời gian:</strong>
      <p>{comment.createdAt}</p>
    </div> */}
          <div className="comment-box col-span-4">
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
            ⬅️ Quay lại
          </button>
        </div>
      </div>
    </div>
  );
}
