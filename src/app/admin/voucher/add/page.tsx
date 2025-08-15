"use client";
import { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import "../../css/voucher_add_admin.css";

import { createCoupon } from "@/services/couponService";
import { CreateCouponPayload } from "@/types/coupon";
import { useRouter } from "next/navigation"; // <-- thêm import này

export default function VoucherAdd() {
  const [form, setForm] = useState<CreateCouponPayload>({
    code: "",
    discount_type: "percentage",
    discount_value: "", // để trống lúc đầu
    start_date: "",
    end_date: "",
    usage_limit: "", // để trống
    used_count: "", // để trống
    min_order: "", // để trống
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        e.target.type === "number"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validate các trường bắt buộc
    if (!form.code) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Mã code không được để trống.",
      });
      return;
    }

    if (!form.discount_type) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Vui lòng chọn loại giảm giá.",
      });
      return;
    }

    if (
      form.discount_value === null ||
      form.discount_value === undefined ||
      form.discount_value === "" ||
      form.discount_value === 0
    ) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Giá trị giảm phải lớn hơn 0.",
      });
      return;
    }

    if (form.discount_type === "percentage" && form.discount_value > 100) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Giá trị giảm phần trăm không được vượt quá 100%.",
      });
      return;
    }

    if (!form.start_date) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Vui lòng nhập ngày bắt đầu.",
      });
      return;
    }

    if (!form.end_date) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Vui lòng nhập ngày hết hạn.",
      });
      return;
    }

    const start = new Date(form.start_date);
    const end = new Date(form.end_date);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Ngày bắt đầu hoặc ngày hết hạn không hợp lệ.",
      });
      return;
    }
    if (start > end) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Ngày bắt đầu phải trước ngày hết hạn.",
      });
      return;
    }

    // Thêm validate usage_limit >= used_count
    if ((Number(form.usage_limit) || 0) < (Number(form.used_count) || 0)) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Số lần dùng tối đa không được nhỏ hơn số lần đã dùng.",
      });
      return;
    }

    // Chuyển các trường number | "" về number ("" sẽ thành 0)
    const payload: CreateCouponPayload = {
      ...form,
      discount_value: Math.floor(Number(form.discount_value)),
      min_order: Number(form.min_order) || 0,
      usage_limit: Number(form.usage_limit) || 0,
      used_count: Number(form.used_count) || 0,
    };

    setLoading(true);
    try {
      const createdCoupon = await createCoupon(payload);
      Swal.fire({
        icon: "success",
        title: "Thành công",
        text: createdCoupon
          ? `Tạo mã giảm giá thành công! ID: ${createdCoupon.coupons_id}`
          : "Tạo mã giảm giá thành công!",
      });
      // Reset form về trống
      setForm({
        code: "",
        discount_type: "percentage",
        discount_value: "",
        start_date: "",
        end_date: "",
        usage_limit: "",
        used_count: "",
        min_order: "",
      });
      router.push("/admin/voucher");
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: err.message || "Lỗi không xác định",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="promotion-container">
      <h2>Tạo mã giảm giá</h2>

      <div className="promotion-actions">
        <Link href={"/admin/voucher"} className="btn btn-back">
          <i className="fa-solid fa-arrow-left"></i> Trở về
        </Link>
        <button
          type="submit"
          form="voucher-form"
          className="btn btn-add"
          disabled={loading}
        >
          {loading ? "Đang tạo..." : "Tạo mã giảm giá"}
        </button>
      </div>

      <form
        id="voucher-form"
        className="promotion-form"
        onSubmit={handleSubmit}
      >
        {/* Mã code */}
        <div className="form-row">
          <div className="form-group" style={{ flex: 1 }}>
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

          <div className="form-group" style={{ flex: 1 }}>
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
          <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor="discount_type">
              Loại giảm giá <span className="required">*</span>
            </label>
            <select
              id="discount_type"
              name="discount_type"
              className="input-field"
              value={form.discount_type}
              onChange={handleChange}
            >
              <option value="percentage">Phần trăm</option>
              <option value="fixed">Cố định</option>
            </select>
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor="discount_value">
              Giá trị giảm <span className="required">*</span>
            </label>
            <input
              type="number"
              id="discount_value"
              name="discount_value"
              className="input-field"
              placeholder="Nhập giá trị giảm (vd: 10 hoặc 10000)"
              min={0}
              step={1}
              max={form.discount_type === "percentage" ? 100 : undefined}
              value={form.discount_value}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Ngày bắt đầu và ngày hết hạn */}
        <div className="form-row">
          <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor="start_date">Ngày bắt đầu</label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              className="input-field"
              value={form.start_date}
              onChange={handleChange}
            />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor="end_date">Ngày hết hạn</label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              className="input-field"
              value={form.end_date}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Số lần dùng tối đa và đã dùng */}
        <div className="form-row">
          <div className="form-group" style={{ flex: 1 }}>
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
