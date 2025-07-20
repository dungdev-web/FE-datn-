"use client";
import React, { useEffect, useState } from "react";
import { addCompareProduct } from "@/services/productService";
import { checkToken } from "@/services/authService";
import { useCompare } from "./compare_context";
import Swal from "sweetalert2";
interface CompareButtonProps {
  productId: number;
}

export default function CompareButton({ productId }: CompareButtonProps) {
  const [userId, setUserId] = useState<number | null>(null);
  const [isCompared, setIsCompared] = useState(false);
  const [loading, setLoading] = useState(false);
  const { refresh } = useCompare(); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await checkToken();
        if(!user) return;
        setUserId(user?.user?.id);
      } catch (err) {
        console.error("Không thể xác thực người dùng:", err);
      }
    };

    fetchUser();
  }, []);

  const handleAddCompare = async () => {
    if (loading || isCompared || !userId) return;
    setLoading(true);
    try {
      await addCompareProduct(userId, productId);
      setIsCompared(true);
      Swal.fire({
        icon: "success",
        title: "Đã thêm vào so sánh!",
        showConfirmButton: false,
        timer: 1500,
      });
      await refresh();
    } catch (error) {
      console.error("Thêm vào so sánh thất bại:", error);
       Swal.fire({
        icon: "error",
        title: "Thêm vào so sánh thất bại!",
        text: "Vui lòng thử lại.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`compare-btn ${isCompared ? "active" : ""}`}
      onClick={handleAddCompare}
      title={isCompared ? "Đã thêm vào so sánh" : "Thêm vào so sánh"}
      disabled={loading || !userId}
    >
      <i className="fa fa-exchange" aria-hidden="true"></i>
    </button>
  );
}
