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
  product: {
    name: "Giày nike",
    image: "AirJordanDMP1Retro(xanhduong).webp",
    description: "Giày ngon bổ rẻ",
    variant: {
      color_name: "Xanh",
      number_size: 33,
    },
  },
  rating: 4,
  content:
    "Rất hài lòng với sản phẩm! Giao hàng cực kỳ nhanh, đóng gói cẩn thận. Sẽ tiếp tục ủng hộ shop trong những lần sau.Rất hài lòng với sản phẩm! Giao hàng cực kỳ nhanh, đóng gói cẩn thận. Sẽ tiếp tục ủng hộ shop trong những lần sau.Rất hài lòng với sản phẩm! Giao hàng cực kỳ nhanh, đóng gói cẩn thận. Sẽ tiếp tục ủng hộ shop trong những lần sau.Rất hài lòng với sản phẩm! Giao hàng cực kỳ nhanh, đóng gói cẩn thận. Sẽ tiếp tục ủng hộ shop trong những lần sau.Rất hài lòng với sản phẩm! Giao hàng cực kỳ nhanh, đóng gói cẩn thận. Sẽ tiếp tục ủng hộ shop trong những lần sau.Rất hài lòng với sản phẩm! Giao hàng cực kỳ nhanh, đóng gói cẩn thận. Sẽ tiếp tục ủng hộ shop trong những lần sau.",
  status: "pending",
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
              <div className="text-sm ">
                <div className="flex items-center gap-2 ">
                  <strong>Email: </strong>
                  <p className="font-semibold">{comment.user.email}</p>
                </div>
                <div className="flex items-center gap-2 ">
                  <strong>Số điện thoại: </strong>
                  <p>
                    {comment.user.phone}
                  </p>
                </div>
                <div className="flex items-center gap-2 ">
                  <strong>Địa chỉ: </strong>
                  <p >
                    {comment.user.address}
                  </p>
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
                src={`/images/products/chaybo/${comment.product.image}`}
                alt={comment.product.name}
                className="w-24 h-24 rounded object-cover border"
              />
              <div className="text-sm">
                <div className="flex gap-2 items-center">
                  <strong>Màu:</strong>
                  <p> {comment.product.variant.color_name}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <strong>Size:</strong>{" "}
                  <p>{comment.product.variant.number_size}</p>
                </div>
                <div className="flex  gap-2 items-center">
                  <strong>Mô tả:</strong>
                  <p> {comment.product.description}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <strong>Đánh giá:</strong>
              <p>
                {"★".repeat(comment.rating)} {"☆".repeat(5 - comment.rating)}
              </p>
                </div>
              </div>
            </div>
          </div>

          <div className="comment-box col-span-4">
              <div className="flex items-center gap-3">
              <FaRegClock />
              <strong>Thời gian:</strong>
              <p>{comment.createdAt}</p>
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
