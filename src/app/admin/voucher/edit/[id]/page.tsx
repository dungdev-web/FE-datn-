"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";

import "../../../css/voucher_add_admin.css";

import { getCouponById, updateCoupon } from "@/services/couponService";
import { CreateCouponPayload, ICoupon } from "@/types/coupon";

export default function VoucherEdit() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params?.id);

  const [form, setForm] = useState<CreateCouponPayload>({
    code: "",
    discount_type: "percentage",
    discount_value: 0,
    start_date: "",
    end_date: "",
    usage_limit: 0,
    used_count: 0,
    min_order: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      (async () => {
        const coupon = await getCouponById(id);
        if (coupon) {
          setForm({
            code: coupon.code,
            discount_type: coupon.discount_type,
            discount_value: coupon.discount_value,
            start_date: coupon.start_date?.slice(0, 10) || "", // format yyyy-MM-dd
            end_date: coupon.end_date?.slice(0, 10) || "",
            usage_limit: coupon.usage_limit || 0,
            used_count: coupon.used_count || 0,
            min_order: coupon.min_order || 0,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Lỗi",
            text: "Không tìm thấy mã giảm giá.",
          });
          router.push("/admin/voucher");
        }
      })();
    }
  }, [id, router]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        e.target.type === "number"
          ? Number(value)
          : value,
    }));
  }

 async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  if (!form.code) {
    Swal.fire("Lỗi", "Mã code không được để trống.", "error");
    return;
  }
  if (!form.discount_type) {
    Swal.fire("Lỗi", "Vui lòng chọn loại giảm giá.", "error");
    return;
  }
  if (!form.discount_value || Number(form.discount_value) <= 0) {
    Swal.fire("Lỗi", "Giá trị giảm phải lớn hơn 0.", "error");
    return;
  }
  if (form.discount_type === "percentage" && Number(form.discount_value) > 100) {
    Swal.fire(
      "Lỗi",
      "Giá trị giảm phần trăm không được vượt quá 100%.",
      "error"
    );
    return;
  }
  if (!form.start_date) {
    Swal.fire("Lỗi", "Vui lòng nhập ngày bắt đầu.", "error");
    return;
  }
  if (!form.end_date) {
    Swal.fire("Lỗi", "Vui lòng nhập ngày hết hạn.", "error");
    return;
  }
  if (new Date(form.start_date) > new Date(form.end_date)) {
    Swal.fire("Lỗi", "Ngày bắt đầu phải trước ngày hết hạn.", "error");
    return;
  }

  // Validate usage_limit >= used_count
  if (form.usage_limit < form.used_count) {
    Swal.fire(
      "Lỗi",
      "Số lần dùng tối đa không được nhỏ hơn số lần đã dùng.",
      "error"
    );
    return;
  }

  setLoading(true);
  try {
    const updated = await updateCoupon(id, form);
    if (updated) {
      Swal.fire("Thành công", "Cập nhật mã giảm giá thành công!", "success");
      router.push("/admin/voucher");
    } else {
      throw new Error("Cập nhật thất bại");
    }
  } catch (error: any) {
    Swal.fire("Lỗi", error.message || "Lỗi khi cập nhật mã giảm giá", "error");
  } finally {
    setLoading(false);
  }
}


  return (
    <div className="promotion-container">
      <h2>Chỉnh sửa mã giảm giá</h2>

      <div className="promotion-actions">
        <Link href={"/admin/voucher"} className="btn btn-back">
          <i className="fa-solid fa-arrow-left"></i> Trở về
        </Link>
        <button
          className="btn btn-add"
          form="voucher-form"
          type="submit"
          disabled={loading}
        >
          {loading ? "Đang cập nhật..." : "Cập nhật"}
        </button>
      </div>

      <form id="voucher-form" className="promotion-form" onSubmit={handleSubmit}>
        {/* Mã code */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="code">
              Mã code <span className="required">*</span>
            </label>
            <input
              type="text"
              id="code"
              name="code"
              className="input-field"
              placeholder="Nhập mã code"
              pattern="^[A-Z0-9\-]{4,16}$"
              title="Chỉ gồm chữ hoa A-Z, số 0-9 và dấu gạch ngang, từ 4 đến 16 ký tự"
              value={form.code}
              onChange={handleChange}
            />
          </div>
          <div className="form-group" style={{ width: "100%" }}>
            <label htmlFor="min_order">Giới hạn đơn hàng tối thiểu (VNĐ)</label>
            <input
              type="number"
              id="min_order"
              name="min_order"
              className="input-field"
              placeholder="Nhập giới hạn đơn hàng tối thiểu"
              min={0}
              step={1000}
              value={form.min_order}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Loại giảm giá và giá trị giảm */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="discount_type">Loại giảm giá</label>
            <select
              id="discount_type"
              name="discount_type"
              className="input-field"
              value={form.discount_type}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                -- Chọn loại giảm giá --
              </option>
              <option value="percentage">Phần trăm</option>
              <option value="fixed">Cố định</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="discount_value">Giá trị giảm</label>
            <input
              type="number"
              id="discount_value"
              name="discount_value"
              className="input-field"
              placeholder="Nhập giá trị giảm (vd: 10 hoặc 10000)"
              min={0}
              step="any"
              value={form.discount_value}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Ngày bắt đầu và ngày hết hạn */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="start_date">Ngày bắt đầu</label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              className="input-field"
              value={form.start_date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="end_date">Ngày hết hạn</label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              className="input-field"
              value={form.end_date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Số lần dùng tối đa và đã dùng */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="usage_limit">Số lần dùng tối đa</label>
            <input
              type="number"
              id="usage_limit"
              name="usage_limit"
              className="input-field"
              placeholder="Nhập số lần dùng tối đa"
              min={0}
              value={form.usage_limit}
              onChange={handleChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
